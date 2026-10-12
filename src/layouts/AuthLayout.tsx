import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthContext } from '@context/AuthContext'

const AuthLayout: React.FC = () => {
  const { token, loading } = useAuthContext()
  const location = useLocation()

  if (loading) return null

  // If user is already logged in, redirect them seamlessly to the dashboard
  if (token) return <Navigate to="/dashboard" replace />

  return (
    <div className="w-full min-h-screen overflow-hidden">
      <div key={location.pathname} className="page-transition-wrapper min-h-screen">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
