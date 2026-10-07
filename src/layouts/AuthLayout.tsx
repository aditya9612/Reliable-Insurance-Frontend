import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@context/AuthContext'

const AuthLayout: React.FC = () => {
  const { token, loading } = useAuthContext()

  if (loading) return null

  // If user is already logged in, redirect them seamlessly to the dashboard
  if (token) return <Navigate to="/dashboard" replace />

  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  )
}

export default AuthLayout
