import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderNavbar from '@components/HeaderNavbar'

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout" style={{ minHeight: '100vh', backgroundColor: '#dbeafe' }}>
      <HeaderNavbar />
      <main className="page-content" style={{ padding: '20px' }}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
