import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Database, Users, Briefcase, FileText, Settings,
    ChevronDown, ChevronRight, UserPlus, FileSpreadsheet, Building2,
    Shield, Map, MessageSquare, Download, Layers, UserCheck, Percent
} from 'lucide-react';

interface SidebarProps {
    isCollapsed: boolean;
    setIsCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
    const location = useLocation();

    // Group 1 — Main
    // Group 2 — Master
    // Group 3 — User
    // Group 4 — Registration
    // Group 5 — HR Module
    // Group 6 — Business Operations
    // Group 7 — Reports
    // Group 8 — Other Modules

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
            title: 'USER',
            icon: Users,
            children: [
                { name: 'User Role Master', path: '/users/role-master' },
                { name: 'Designation Master', path: '/users/designation-master' },
                { name: 'Client App User', path: '/users/client-app-user' },
                { name: 'Assign Privileges', path: '/users/assign-privileges' },
                { name: 'Assign Location Head', path: '/users/assign-location-head' },
                { name: 'Temporary Operator', path: '/users/temporary-operator' },
                { name: 'Login History', path: '/users/login-history' },
            ]
        },
        {
            title: 'REGISTRATION',
            icon: UserPlus,
            children: [
                { name: 'Employee', path: '/registration/employee' },
                { name: 'Agent', path: '/registration/agent' },
                { name: 'View Agent', path: '/registration/view-agent' },
                { name: 'View Employee', path: '/registration/view-employee' },
                { name: 'Bank Beneficiary', path: '/registration/bank-beneficiary' },
                { name: 'Delete Vehicle', path: '/registration/delete-vehicle' },
                { name: 'Deactivated Agent List', path: '/registration/deactivated-agent-list' },
            ]
        },
        {
            title: 'HR MODULE',
            icon: UserCheck,
            children: [
                { name: 'Executive Attendance', path: '/hr/executive-attendance' },
                { name: 'Attendance', path: '/hr/attendance' },
                { name: 'Salary Process', path: '/hr/salary-process' },
                { name: 'Employee Payment', path: '/hr/employee-payment' },
                { name: 'Holiday Master', path: '/hr/holiday-master' },
                { name: 'Employee Master', path: '/hr/employee-master' },
                { name: 'View Employee', path: '/hr/view-employee' },
                { name: 'Leave Management', path: '/hr/leave-management' },
                { name: 'Leave Type', path: '/hr/leave-type' },
                { name: 'Organization Master', path: '/hr/organization-master' },
                { name: 'Department Master', path: '/hr/department-master' },
                { name: 'Salary Slip', path: '/hr/salary-slip' },
                { name: 'Employee Advance', path: '/hr/employee-advance' },
                { name: 'View Employee Advance', path: '/hr/view-employee-advance' },
                { name: 'Designation Master', path: '/hr/designation-master' },
                { name: 'Apply Leave', path: '/hr/apply-leave' },
                { name: 'Leave Report', path: '/hr/leave-report' },
            ]
        },
        {
            title: 'COMMISSION GRID',
            icon: Percent,
            children: [
                { name: 'Agent Commission', path: '/commission-grid/agent-commission' },
                { name: 'Multiple Agent Commission', path: '/commission-grid/multiple-agent-commission' },
                { name: 'Broker Commission', path: '/commission-grid/broker-commission' },
                { name: 'Multiple Broker Commission', path: '/commission-grid/multiple-broker-commission' },
                { name: 'Extra Commission Amount', path: '/commission-grid/extra-commission-amount' },
                { name: 'Latest Agent Commission', path: '/commission-grid/latest-agent-commission' },
                { name: 'Broker Latest Grid', path: '/commission-grid/broker-latest-grid' },
                { name: 'New Broker Commission', path: '/commission-grid/new-broker-commission' },
                { name: 'New Agent Commission', path: '/commission-grid/new-agent-commission' },
                { name: 'Executive Self Insentive', path: '/commission-grid/executive-self-incentive' },
                { name: 'Multiple Executive Self Insentive', path: '/commission-grid/multiple-executive-self-incentive' },
                { name: 'Check Grid', path: '/commission-grid/check-grid' },
                { name: 'Comm Veh Age', path: '/commission-grid/comm-veh-age' },
                { name: 'Year Slab', path: '/commission-grid/year-slab' },
                { name: 'Multiple Agent Broker Comm', path: '/commission-grid/multiple-agent-broker-comm' },
                { name: 'Import Broker Grid', path: '/commission-grid/import-broker-grid' },
                { name: 'Decline Model New', path: '/commission-grid/decline-model-new' },
            ]
        },
        {
            title: 'TRANSACTION',
            icon: FileText,
            children: [
                { name: 'Policy Endorsement', path: '/transactions/policy-endorsement' },
                { name: 'Corporate Client', path: '/transactions/corporate-client' },
                { name: 'View App Entry', path: '/transactions/view-app-entry' },
                { name: 'Policy No Update', path: '/transactions/policy-no-update' },
                { name: 'Permium Cheque Bouns', path: '/transactions/premium-cheque-bounce' },
                { name: 'Transaction Report', path: '/transactions/transaction-report' },
                { name: 'Update Customer', path: '/transactions/update-customer' },
                { name: 'Update Vehicle Details', path: '/transactions/update-vehicle' },
                { name: 'All Transaction Report', path: '/transactions/all-transaction-report' },
                { name: 'Remove Wrong Entries', path: '/transactions/remove-wrong-entries' },
                { name: 'Non Motor Transaction', path: '/transactions/non-motor' },
                { name: 'Update App Policy Entry', path: '/transactions/update-app-policy' },
                { name: 'Delete Transaction Entry', path: '/transactions/delete-transaction' },
                { name: 'View Policy Document', path: '/transactions/view-policy-document' },
                { name: 'Reopen Recalculate', path: '/transactions/reopen-recalculate' },
                { name: 'Pending Premium Cash', path: '/transactions/pending-premium-cash' },
                { name: 'All User Trans Entry', path: '/transactions/all-user-trans' },
                { name: 'Policy Cancel', path: '/transactions/policy-cancel' },
                { name: 'Quality Check', path: '/transactions/quality-check' },
                { name: 'Quality Report', path: '/transactions/quality-report' },
                { name: 'Self Quotation', path: '/transactions/self-quotation' },
                { name: 'Ncb Recovery', path: '/transactions/ncb-recovery' },
                { name: 'Ncb Recovery Report', path: '/transactions/ncb-recovery-report' },
                { name: 'Online App Request', path: '/transactions/online-app-request' }
            ]
        },
        {
            title: 'OPERATIONS',
            icon: Briefcase,
            children: [
                { name: 'Account', path: '/accounts' },
                { name: 'Claims', path: '/operations/claims' },
                { name: 'Renewal', path: '/operations/renewal' },
                { name: 'Caliber Policy', path: '/operations/caliber-policy' },
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
                { name: 'Recon', path: '/reports/recon' },
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
                { name: 'Old Data', path: '/other/old-data' },
                { name: 'Calling', path: '/other/calling' },
            ]
        }
    ];

    const isActive = (path: string) => location.pathname.startsWith(path);
    const isGroupActive = (children?: NavItem[]) => children?.some(c => isActive(c.path));

    const [expandedGroups, setExpandedGroups] = useState<string[]>(() => {
        const activeGroup = navGroups.find(g => isGroupActive(g.children) || (g.path && isActive(g.path)));
        return activeGroup ? [activeGroup.title] : [];
    });

    const sidebarRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (sidebarRef.current) {
            // Find active submenu item or main nav link
            const activeItem = sidebarRef.current.querySelector('.before\\:\\!bg-brand-primary, .\\!border-brand-primary');
            if (activeItem) {
                // Scroll it into view instantly on mount
                activeItem.scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        }
    }, []);

    const toggleGroup = (title: string) => {
        if (isCollapsed) {
            setIsCollapsed(false);
            setExpandedGroups(prev => prev.includes(title) ? prev : [...prev, title]);
            return;
        }
        setExpandedGroups(prev =>
            prev.includes(title) ? prev.filter(g => g !== title) : [...prev, title]
        );
    };

    return (
        <aside className={`bg-brand-navy text-[#B8C7D9] h-full flex flex-col transition-all duration-300 ease-in-out shrink-0 z-20 shadow-xl fixed md:static top-0 left-0 bottom-0 ${isCollapsed ? '-translate-x-full md:translate-x-0 w-[240px] md:w-[70px] lg:w-[80px]' : 'translate-x-0 w-[240px]'}`}>

            {/* Header Brand Area */}
            <div className="h-16 flex items-center justify-center bg-transparent border-b border-brand-navydark shrink-0 overflow-hidden px-4">
                {isCollapsed ? (
                    <div
                        className="flex items-center justify-center select-none tracking-tight"
                        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                        <span className="text-white font-bold text-[24px]">R</span>
                        <span className="text-brand-primary font-normal text-[24px]">A</span>
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
            <div ref={sidebarRef} className="flex-1 overflow-y-auto overflow-x-hidden py-4 sidebar-scrollbar">

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
                                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group ${groupActive && isCollapsed ? 'bg-brand-navydark text-white' : 'text-[#B8C7D9] hover:bg-brand-navydark hover:text-white'}`}
                                        title={isCollapsed ? group.title : ''}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon size={20} className={groupActive ? 'text-brand-primary' : 'text-[#8FA7C2] group-hover:text-white'} />
                                            {!isCollapsed && <span className={`text-sm font-medium ${groupActive ? 'text-white' : 'text-[#B8C7D9]'}`}>{group.title}</span>}
                                        </div>
                                        {!isCollapsed && (
                                            <ChevronDown size={16} className={`transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                                        )}
                                    </button>
                                ) : (
                                    <NavLink
                                        to={group.path || '#'}
                                        onClick={() => { if (window.innerWidth < 768) setIsCollapsed(true); }}
                                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group border-l-[3px] border-transparent ${isActive ? 'bg-brand-navydark text-white !border-brand-primary' : 'text-[#B8C7D9] hover:bg-brand-navydark hover:text-white'}`}
                                        title={isCollapsed ? group.title : ''}
                                    >
                                        <Icon size={20} className={(group.path && isActive(group.path)) ? 'text-brand-primary' : 'text-[#8FA7C2] group-hover:text-white'} />
                                        {!isCollapsed && <span className={`text-sm font-medium ${group.path && isActive(group.path) ? 'text-white' : 'text-[#B8C7D9]'}`}>{group.title}</span>}
                                    </NavLink>
                                )}

                                {/* Children Submenu */}
                                {hasChildren && !isCollapsed && (
                                    <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                        <div className="overflow-hidden">
                                            <div className="flex flex-col ml-9 border-l border-brand-navydark space-y-1 mb-1">
                                                {group.children?.map(child => (
                                                    <NavLink
                                                        key={child.name}
                                                        to={child.path}
                                                        onClick={() => { if (window.innerWidth < 768) setIsCollapsed(true); }}
                                                        className={({ isActive }) => `px-4 py-1.5 text-[13px] rounded-r-lg transition-colors relative before:absolute before:-left-[1px] before:top-1/2 before:-translate-y-1/2 before:h-[2px] before:w-2 before:bg-brand-navydark ${isActive ? 'text-white font-medium bg-brand-navydark before:!bg-brand-primary' : 'text-[#B8C7D9] hover:text-white hover:bg-brand-navydark'}`}
                                                    >
                                                        {child.name}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        </div>
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
