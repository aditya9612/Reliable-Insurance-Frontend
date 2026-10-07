import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@context/AuthContext'

const ProtectedRoute: React.FC = () => {
  const { token, loading } = useAuthContext()

  if (loading) return <div className="loader">Loading...</div>

  if (!token) return <Navigate to="/login" replace />

  return <Outlet />
}

export default ProtectedRoute
