import React, { useState } from 'react';
import { Menu, Bell, ChevronDown, User, LogOut, History, Shield, Clock } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface TopHeaderProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const TopHeader: React.FC<TopHeaderProps> = ({ isCollapsed, toggleSidebar }) => {
    const { logout, user } = useAuthContext();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-brand-border h-16 flex items-center justify-between px-4 shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.02)] z-10">
            {/* Left side actions */}
            <div className="flex items-center gap-3">
                <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md hover:bg-brand-lightbg text-brand-navy transition-colors"
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={20} />
                </button>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">

                {/* Branch Info */}
                <div className="hidden md:flex items-center px-3 py-1.5 bg-brand-lightbg text-brand-primary rounded-md text-sm font-medium border border-brand-border">
                    <span className="text-brand-muted mr-1">Branch:</span> Baramati
                </div>

                {/* Notifications */}
                <button className="relative p-2 rounded-full hover:bg-brand-lightbg text-brand-muted hover:text-brand-primary transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-error rounded-full border border-white"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-brand-mainbg border border-transparent hover:border-brand-border transition-all"
                    >
                        <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-semibold text-sm">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="hidden sm:block text-left mr-1">
                            <div className="text-sm font-semibold text-brand-navy leading-tight">
                                {user?.name || 'Admin User'}
                            </div>
                            <div className="text-xs text-brand-muted leading-tight">
                                {user?.role === 'admin' ? 'System Admin' : 'Employee'}
                            </div>
                        </div>
                        <ChevronDown size={16} className="text-brand-muted" />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsDropdownOpen(false)}
                            ></div>
                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-brand-border py-1 z-50 animate-in fade-in zoom-in-95 duration-100">

                                <div className="px-4 py-2 border-b border-brand-border">
                                    <p className="text-sm font-medium text-brand-navy truncate">Welcome, {user?.name || 'User'}</p>
                                </div>

                                <div className="p-1">
                                    <button className="w-full text-left px-3 py-2 text-sm text-brand-navy hover:bg-brand-lightbg rounded-md flex items-center gap-2 cursor-pointer transition-colors">
                                        <User size={16} className="text-brand-muted" /> My Profile
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-brand-navy hover:bg-brand-lightbg rounded-md flex items-center gap-2 cursor-pointer transition-colors">
                                        <Shield size={16} className="text-brand-muted" /> Change Password
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            navigate('/users/login-history');
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-brand-navy hover:bg-brand-lightbg rounded-md flex items-center gap-2 cursor-pointer transition-colors"
                                    >
                                        <History size={16} className="text-brand-muted" /> Login History
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-brand-navy hover:bg-brand-lightbg rounded-md flex items-center gap-2 cursor-pointer transition-colors">
                                        <Clock size={16} className="text-brand-muted" /> Punch IN / OUT
                                    </button>
                                </div>
                                <div className="border-t border-brand-border p-1">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 text-sm text-brand-error hover:bg-[#FEF2F2] rounded-md flex items-center gap-2 cursor-pointer transition-colors"
                                    >
                                        <LogOut size={16} className="text-brand-error" /> Logout
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
