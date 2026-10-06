import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Database, Users, Briefcase, FileText, Settings,
    ChevronDown, ChevronRight, UserPlus, FileSpreadsheet, Building2,
    Shield, Map, MessageSquare, Download, Layers
} from 'lucide-react';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();

    // Group 1 — Main
    // Group 2 — Master
    // Group 3 — User & Registration
    // Group 4 — Business Operations
    // Group 5 — Reports
    // Group 6 — Other Modules

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
            ]
        },
        {
            title: 'USER & REG.',
            icon: Users,
            children: [
                { name: 'User', path: '/users' },
                { name: 'Registration', path: '/registration' },
            ]
        },
        {
            title: 'OPERATIONS',
            icon: Briefcase,
            children: [
                { name: 'Transaction', path: '/transactions' },
                { name: 'Account', path: '/accounts' },
                { name: 'Claims', path: '/operations/claims' },
                { name: 'Renewal', path: '/operations/renewal' },
                { name: 'Sales', path: '/operations/sales' },
                { name: 'Franchise', path: '/operations/franchise' },
                { name: 'POSP', path: '/operations/posp' },
                { name: 'Business Master', path: '/operations/business-master' },
                { name: 'Support', path: '/operations/support' },
            ]
        },
        {
            title: 'REPORTS',
            icon: FileSpreadsheet,
            children: [
                { name: 'Reports', path: '/reports' },
                { name: 'MIS', path: '/reports/mis' },
                { name: 'Recon', path: '/reports/recon' },
                { name: 'Commission Grid', path: '/reports/commission-grid' },
                { name: 'Target', path: '/reports/target' },
            ]
        },
        {
            title: 'OTHER MODULES',
            icon: Layers,
            children: [
                { name: 'App', path: '/other/app' },
                { name: 'Non Motor', path: '/other/non-motor' },
                { name: 'My Page', path: '/other/my-page' },
                { name: 'Download App', path: '/other/download' },
                { name: 'Chat Board', path: '/other/chat' },
                { name: 'HR Module', path: '/other/hr' },
                { name: 'Old Data', path: '/other/old-data' },
                { name: 'Calling', path: '/other/calling' },
            ]
        }
    ];

    const [expandedGroups, setExpandedGroups] = useState<string[]>(['MASTER', 'MAIN', 'OPERATIONS']);

    const toggleGroup = (title: string) => {
        if (isCollapsed) return; // Prevent expansion when globally collapsed
        setExpandedGroups(prev =>
            prev.includes(title) ? prev.filter(g => g !== title) : [...prev, title]
        );
    };

    const isActive = (path: string) => location.pathname.startsWith(path);
    const isGroupActive = (children?: NavItem[]) => children?.some(c => isActive(c.path));

    return (
        <aside className={`bg-[#12284A] text-[#8BA4CA] h-full flex flex-col transition-all duration-300 ease-in-out shrink-0 z-20 shadow-xl fixed md:static top-0 left-0 bottom-0 ${isCollapsed ? '-translate-x-full md:translate-x-0 w-[260px] md:w-[70px] lg:w-[80px]' : 'translate-x-0 w-[260px]'}`}>

            {/* Header Brand Area */}
            <div className="h-16 flex items-center justify-center bg-[#0b192e] border-b border-[#0A2E5C] shrink-0 overflow-hidden px-4">
                {isCollapsed ? (
                    <div
                        className="flex items-center justify-center select-none tracking-tight"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        <span className="text-white font-bold text-[24px]">R</span>
                        <span className="text-[#0ea5e9] font-normal text-[24px]">A</span>
                    </div>
                ) : (
                    <img
                        src="/logo-light.svg"
                        alt="Reliable Associates"
                        className="h-9 w-auto object-contain cursor-pointer"
                    />
                )}
            </div>

            {/* Navigation Drawer */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 custom-scrollbar">

                <nav className="space-y-1.5 px-3">
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
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${groupActive && isCollapsed ? 'bg-[#0b192e] text-white' : 'hover:bg-[#0b192e] hover:text-white'}`}
                                        title={isCollapsed ? group.title : ''}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={20} className={groupActive ? 'text-[#0ea5e9]' : 'text-[#6484B0] group-hover:text-[#0ea5e9]'} />
                                            {!isCollapsed && <span className={`text-sm font-medium ${groupActive ? 'text-white' : ''}`}>{group.title}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>
                                ) : (
                                    <NavLink
                                        to={group.path || '#'}
                                        onClick={() => { if (window.innerWidth < 768) setIsCollapsed(true); }}
                                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group border-l-[3px] border-transparent ${isActive ? 'bg-[#0b192e] text-white !border-[#0869D8]' : 'hover:bg-[#0b192e] hover:text-white'}`}
                                        title={isCollapsed ? group.title : ''}
                                    >
                                        <Icon size={20} className={(group.path && isActive(group.path)) ? 'text-[#0869D8]' : 'text-[#6484B0] group-hover:text-[#0ea5e9]'} />
                                        {!isCollapsed && <span className="text-sm font-medium">{group.title}</span>}
                                    </NavLink>
                                )}

                                {/* Children Submenu */}
                                {hasChildren && isExpanded && !isCollapsed && (
                                    <div className="mt-1 flex flex-col ml-9 border-l border-[#133869] space-y-1 my-1">
                                        {group.children?.map(child => (
                                            <NavLink
                                                key={child.name}
                                                to={child.path}
                                                onClick={() => { if (window.innerWidth < 768) setIsCollapsed(true); }}
                                                className={({ isActive }) => `px-4 py-1.5 text-[13px] rounded-r-lg transition-colors relative before:absolute before:-left-[1px] before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:w-2 before:bg-[#204a82] ${isActive ? 'text-white font-medium bg-[#0b192e]/50 before:!bg-[#0ea5e9]' : 'text-[#8BA4CA] hover:text-white hover:bg-[#0b192e]/30'}`}
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
