import React from 'react'
import AppRoutes from '@routes/AppRoutes'
import { AuthProvider } from '@context/AuthContext'
import '@styles/global.css'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
