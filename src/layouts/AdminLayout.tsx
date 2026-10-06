import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import TopHeader from '../components/header/TopHeader';
import './AdminLayout.css';

const AdminLayout = () => {
    // Start collapsed on mobile, open on desktop
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(window.innerWidth < 768);
    const location = useLocation();

    // Auto-close sidebar on mobile when navigating
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsSidebarCollapsed(true);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) setIsSidebarCollapsed(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="admin-layout flex h-screen w-full relative">

            {/* Mobile Backdrop Overlay */}
            {!isSidebarCollapsed && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-[15] transition-opacity"
                    onClick={() => setIsSidebarCollapsed(true)}
                ></div>
            )}

            <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
            <div className="admin-main flex-1 flex flex-col min-w-0">
                <TopHeader
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={toggleSidebar}
                />
                <main className="admin-content">
                    <div key={location.pathname} className="page-transition-wrapper">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
