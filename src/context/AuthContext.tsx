import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface UserData {
  id: number;
  name: string;
  role?: string;
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  loading: boolean;
  login: (userData: UserData, authToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // TODO: validate token / fetch current user profile
    setLoading(false)
  }, [token])

  const login = (userData: UserData, authToken: string) => {
    setUser(userData)
    setToken(authToken)
    localStorage.setItem('token', authToken)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}

export default AuthContext
