import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  user: any
  token: string | null
  loading: boolean
  login: (userData: any, authToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') || null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // TODO: validate token / fetch current user profile
    setLoading(false)
  }, [token])

  const login = (userData: any, authToken: string) => {
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

export const useAuthContext = (): AuthContextType => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}

export default AuthContext
