import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Database, Users, Briefcase, ChevronDown,
    FileSpreadsheet, Layers, Grid, PhoneCall, Shield, Home, Car, Sliders
} from 'lucide-react';

interface SidebarProps {
    isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
    const location = useLocation();

    type NavItem = { name: string; path: string; icon?: React.ElementType };
    type NavGroup = { title: string; icon: React.ElementType; children?: NavItem[]; path?: string };

    const navGroups: NavGroup[] = [
        {
            title: 'MAIN',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            title: 'MASTER',
            icon: Database,
            children: [
                { name: 'Branch Master', path: '/branch-master' },
                { name: 'Policy Master', path: '/policy-master' },
                { name: 'Vehicle Master', path: '/vehicle-master' },
                { name: 'Account Master', path: '/account-master' },
                { name: 'Business Master', path: '/operations/business-master' },
            ]
        },
        {
            title: 'USER & REGISTRATION',
            icon: Users,
            children: [
                { name: 'User', path: '/users' },
                { name: 'Registration', path: '/registration' },
                { name: 'POSP', path: '/operations/posp' },
            ]
        },
        {
            title: 'TRANSACTIONS & ACCOUNTS',
            icon: Briefcase,
            children: [
                { name: 'Transaction', path: '/transactions' },
                { name: 'Account', path: '/accounts' },
                { name: 'Sales', path: '/operations/sales' },
                { name: 'Claim', path: '/operations/claims' },
                { name: 'Renewal', path: '/operations/renewal' },
                { name: 'Franchise', path: '/operations/franchise' },
                { name: 'Target', path: '/reports/target' },
            ]
        },
        {
            title: 'COMMISSION & GRIDS',
            icon: Grid,
            children: [
                { name: 'Commission Grid', path: '/reports/commission-grid' },
                { name: 'New Grid Style', path: '/operations/new-grid-style' },
            ]
        },
        {
            title: 'INSURANCE & POLICY',
            icon: Shield,
            children: [
                { name: 'Non Motor', path: '/other/non-motor' },
                { name: 'Calliber Policy', path: '/other/calliber-policy' },
            ]
        },
        {
            title: 'REPORTS & ANALYSIS',
            icon: FileSpreadsheet,
            children: [
                { name: 'Report', path: '/reports' },
                { name: 'MIS', path: '/reports/mis' },
                { name: 'Recon', path: '/reports/recon' },
                { name: 'DashBoard', path: '/dashboard' },
            ]
        },
        {
            title: 'OTHER MODULES',
            icon: Layers,
            children: [
                { name: 'My Page', path: '/other/my-page' },
                { name: 'App', path: '/other/app' },
                { name: 'Download App', path: '/other/download' },
                { name: 'HR Module', path: '/other/hr' },
                { name: 'Support', path: '/operations/support' },
                { name: 'Others', path: '/other/others' },
                { name: 'Calling', path: '/other/calling' },
            ]
        }
    ];

    const [expandedGroups, setExpandedGroups] = useState<string[]>(['MASTER', 'MAIN', 'OPERATIONS']);

    const toggleGroup = (title: string) => {
        if (isCollapsed) return;
        setExpandedGroups(prev =>
            prev.includes(title) ? prev.filter(g => g !== title) : [...prev, title]
        );
    };

    const isActive = (path: string) => location.pathname.startsWith(path);
    const isGroupActive = (children?: NavItem[]) => children?.some(c => isActive(c.path));

    return (
        <aside className={`bg-white text-slate-600 border-r border-slate-200 h-full flex flex-col transition-all duration-300 ease-in-out shrink-0 z-20 shadow-sm ${isCollapsed ? 'w-[70px] sm:w-[80px]' : 'w-[260px]'}`}>

            {/* Header Brand Area */}
            <div className="h-16 flex items-center justify-center bg-white border-b border-slate-200 shrink-0 overflow-hidden px-4">
                {isCollapsed ? (
                    <div
                        className="flex items-center justify-center select-none tracking-tight"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        <span className="text-[#12284A] font-bold text-[24px]">R</span>
                        <span className="text-[#00a896] font-normal text-[24px]">A</span>
                    </div>
                ) : (
                    <img
                        src="/logo-dark.svg"
                        alt="Reliable Associates"
                        className="h-9 w-auto object-contain cursor-pointer"
                    />
                )}
            </div>

            {/* Navigation Drawer */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">

                <nav className="space-y-1 px-3">
                    {navGroups.map((group) => {
                        const Icon = group.icon;
                        const hasChildren = !!group.children;
                        const isExpanded = expandedGroups.includes(group.title) && !isCollapsed;
                        const groupActive = isGroupActive(group.children) || (group.path && isActive(group.path));

                        return (
                            <div key={group.title} className="flex flex-col">
                                {hasChildren ? (
                                    <button
                                        onClick={() => toggleGroup(group.title)}
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 group ${
                                            groupActive
                                                ? 'bg-teal-50 text-[#00a896] font-semibold'
                                                : 'text-slate-700 hover:bg-slate-100 hover:text-[#12284A]'
                                        }`}
                                        title={isCollapsed ? group.title : ''}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={20} className={groupActive ? 'text-[#00a896]' : 'text-slate-500 group-hover:text-[#00a896]'} />
                                            {!isCollapsed && <span className="text-sm">{group.title}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>
                                ) : (
                                    <NavLink
                                        to={group.path || '#'}
                                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group border-l-[3px] border-transparent ${
                                            isActive
                                                ? 'bg-[#00a896] text-white font-semibold shadow-sm !border-[#12284A]'
                                                : 'text-slate-700 hover:bg-slate-100 hover:text-[#12284A]'
                                        }`}
                                        title={isCollapsed ? group.title : ''}
                                    >
                                        <Icon size={20} className={(group.path && isActive(group.path)) ? 'text-white' : 'text-slate-500 group-hover:text-[#00a896]'} />
                                        {!isCollapsed && <span className="text-sm">{group.title}</span>}
                                    </NavLink>
                                )}

                                {/* Children Submenu */}
                                {hasChildren && isExpanded && !isCollapsed && (
                                    <div className="mt-1 flex flex-col ml-8 border-l-2 border-slate-200 space-y-1 my-1 pl-1">
                                        {group.children?.map(child => (
                                            <NavLink
                                                key={child.name}
                                                to={child.path}
                                                className={({ isActive }) => `px-3.5 py-2 text-[13px] rounded-lg transition-all ${
                                                    isActive
                                                        ? 'text-[#00a896] font-bold bg-teal-50 shadow-2xs'
                                                        : 'text-slate-600 hover:text-[#12284A] hover:bg-slate-100/80 font-medium'
                                                }`}
                                            >
                                                {child.name}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

            </div>

        </aside>
    );
};

export default Sidebar;
