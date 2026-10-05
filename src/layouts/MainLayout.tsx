import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="main-layout">
      {/* Sidebar */}
      <aside className="sidebar">{/* <Sidebar /> */}</aside>

      <div className="main-content">
        {/* Navbar */}
        <header className="navbar">{/* <Navbar /> */}</header>

        {/* Page content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
