import React, { useState, useMemo } from 'react';
import {
    Search, X, Download, RefreshCw, UserCheck, UserX,
    AlertTriangle, CheckCircle2, Filter, Eye, ShieldAlert,
    ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-react';

export interface AgentItemRecord {
    id: number;
    agentCode: string;
    fullName: string;
    branch: string;
    mobile: string;
    email?: string;
    type?: string;
    status: 'ACTIVE' | 'INACTIVE';
    date: string; // Reg date or deactivation date
    reason?: string;
    deactivatedBy?: string;
    pastPolicies: number;
    category?: string;
}

const INITIAL_INACTIVE_AGENTS: AgentItemRecord[] = [
    {
        id: 1,
        agentCode: 'AGT-7104',
        fullName: 'Mahesh B. Pawar',
        branch: 'AKLUJ',
        mobile: '9822991100',
        email: 'mahesh.pawar@reliable.in',
        type: 'POSP',
        status: 'INACTIVE',
        date: '15/08/2026',
        reason: 'Non-renewal of license / Inactive for 180 days',
        pastPolicies: 45,
        deactivatedBy: 'Shekharu Lab',
        category: 'NON-PERFORMANCE'
    },
    {
        id: 2,
        agentCode: 'AGT-6920',
        fullName: 'Sachin D. Bhosale',
        branch: 'BARAMATI',
        mobile: '9422003344',
        email: 'sachin.bhosale@reliable.in',
        type: 'DIRECT',
        status: 'INACTIVE',
        date: '28/07/2026',
        reason: 'Voluntary resignation & relocation to other state',
        pastPolicies: 82,
        deactivatedBy: 'Shekharu Lab',
        category: 'VOLUNTARY'
    },
    {
        id: 3,
        agentCode: 'AGT-5412',
        fullName: 'Dinesh Ramdas Shinde',
        branch: 'PUNE',
        mobile: '9850667788',
        email: 'dinesh.shinde@reliable.in',
        type: 'POSP',
        status: 'INACTIVE',
        date: '02/06/2026',
        reason: 'Violation of insurer guidelines / Code of Conduct',
        pastPolicies: 110,
        deactivatedBy: 'Vinayak Kadam',
        category: 'CONDUCT'
    },
    {
        id: 4,
        agentCode: 'AGT-4901',
        fullName: 'Nitin Suresh Kulkarni',
        branch: 'AHILYANAGAR',
        mobile: '9765332211',
        email: 'nitin.kulkarni@reliable.in',
        type: 'FRANCHISE',
        status: 'INACTIVE',
        date: '11/04/2026',
        reason: 'Dual registration conflict detected',
        pastPolicies: 18,
        deactivatedBy: 'Rameshwar Jadhav',
        category: 'BLACKLISTED'
    },
    {
        id: 5,
        agentCode: 'AGT-3882',
        fullName: 'Sunil Ashok More',
        branch: 'SATARA',
        mobile: '9823445566',
        email: 'sunil.more@reliable.in',
        type: 'POSP',
        status: 'INACTIVE',
        date: '19/02/2026',
        reason: 'Failed KYC verification audit documents',
        pastPolicies: 29,
        deactivatedBy: 'Shekharu Lab',
        category: 'DOCUMENTATION'
    },
    {
        id: 6,
        agentCode: 'AGT-2910',
        fullName: 'Aniket Vasant Gaikwad',
        branch: 'SOLAPUR',
        mobile: '9860112233',
        email: 'aniket.g@reliable.in',
        type: 'DIRECT',
        status: 'INACTIVE',
        date: '05/01/2026',
        reason: 'Zero policy logged for 3 consecutive quarters',
        pastPolicies: 12,
        deactivatedBy: 'Vinayak Kadam',
        category: 'NON-PERFORMANCE'
    }
];

const INITIAL_ACTIVE_AGENTS: AgentItemRecord[] = [
    {
        id: 101,
        agentCode: 'AGT-1001',
        fullName: 'Rahul S. Jadhav',
        branch: 'BARAMATI',
        mobile: '9822012345',
        email: 'rahul.j@reliable.in',
        type: 'POSP',
        status: 'ACTIVE',
        date: '14/01/2025',
        pastPolicies: 142,
        category: 'ACTIVE'
    },
    {
        id: 102,
        agentCode: 'AGT-1002',
        fullName: 'Pooja V. Kulkarni',
        branch: 'PUNE',
        mobile: '9822054321',
        email: 'pooja.k@reliable.in',
        type: 'DIRECT',
        status: 'ACTIVE',
        date: '20/02/2025',
        pastPolicies: 98,
        category: 'ACTIVE'
    },
    {
        id: 103,
        agentCode: 'AGT-1003',
        fullName: 'Ajay M. Deshmukh',
        branch: 'AKLUJ',
        mobile: '9822098765',
        email: 'ajay.d@reliable.in',
        type: 'POSP',
        status: 'ACTIVE',
        date: '05/03/2025',
        pastPolicies: 65,
        category: 'ACTIVE'
    },
    {
        id: 104,
        agentCode: 'AGT-1004',
        fullName: 'Sneha R. Patil',
        branch: 'AHILYANAGAR',
        mobile: '9822067890',
        email: 'sneha.p@reliable.in',
        type: 'FRANCHISE',
        status: 'ACTIVE',
        date: '18/04/2025',
        pastPolicies: 210,
        category: 'ACTIVE'
    },
    {
        id: 105,
        agentCode: 'AGT-1005',
        fullName: 'Vikas T. Shinde',
        branch: 'SATARA',
        mobile: '9822011223',
        email: 'vikas.s@reliable.in',
        type: 'POSP',
        status: 'ACTIVE',
        date: '10/05/2025',
        pastPolicies: 87,
        category: 'ACTIVE'
    },
    {
        id: 106,
        agentCode: 'AGT-1006',
        fullName: 'Ramesh K. Bhosale',
        branch: 'BARAMATI',
        mobile: '9822033445',
        email: 'ramesh.b@reliable.in',
        type: 'DIRECT',
        status: 'ACTIVE',
        date: '01/06/2025',
        pastPolicies: 115,
        category: 'ACTIVE'
    }
];

const DeactivatedAgentListTab: React.FC = () => {
    const [statusFilter, setStatusFilter] = useState<'Active' | 'InActive'>('Active');

    // Search query: "Search Agent Name Here" (matches screenshot rounded input)
    const [searchQuery, setSearchQuery] = useState('');

    // Datasets
    const [inactiveAgents, setInactiveAgents] = useState<AgentItemRecord[]>(INITIAL_INACTIVE_AGENTS);
    const [activeAgents, setActiveAgents] = useState<AgentItemRecord[]>(INITIAL_ACTIVE_AGENTS);

    // Modal state for Reactivate / Deactivate
    const [selectedAgent, setSelectedAgent] = useState<AgentItemRecord | null>(null);
    const [actionType, setActionType] = useState<'REACTIVATE' | 'DEACTIVATE' | null>(null);
    const [deactivationReason, setDeactivationReason] = useState('Non-renewal of license / Inactive for 180 days');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };



    // Get active dataset based on applied status
    const currentList = useMemo(() => {
        return statusFilter === 'Active' ? activeAgents : inactiveAgents;
    }, [statusFilter, activeAgents, inactiveAgents]);

    // Filter by "Search Agent Name Here"
    const filteredAgents = useMemo(() => {
        if (!searchQuery.trim()) return currentList;
        const q = searchQuery.toLowerCase().trim();
        return currentList.filter(a =>
            a.fullName.toLowerCase().includes(q) ||
            a.agentCode.toLowerCase().includes(q) ||
            a.branch.toLowerCase().includes(q) ||
            a.mobile.includes(q) ||
            (a.reason && a.reason.toLowerCase().includes(q))
        );
    }, [currentList, searchQuery]);

    // Paginated list
    const totalPages = Math.ceil(filteredAgents.length / itemsPerPage) || 1;
    const paginatedAgents = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredAgents.slice(start, start + itemsPerPage);
    }, [filteredAgents, currentPage, itemsPerPage]);

    // Export list to CSV
    const handleExportCSV = () => {
        if (statusFilter === 'InActive') {
            const headers = ['SR. NO.', 'AGENT CODE', 'AGENT NAME', 'BRANCH', 'MOBILE NO', 'DEACTIVATION DATE', 'REASON FOR DEACTIVATION', 'CATEGORY', 'DEACTIVATED BY', 'PAST POLICIES', 'STATUS'];
            const rows = filteredAgents.map((a, i) => [
                i + 1,
                `"${a.agentCode}"`,
                `"${a.fullName.replace(/"/g, '""')}"`,
                `"${a.branch}"`,
                `"${a.mobile}"`,
                `"${a.date}"`,
                `"${(a.reason || '').replace(/\"/g, '""')}"`,
                `"${a.category || ''}"`,
                `"${a.deactivatedBy || 'Admin'}"`,
                a.pastPolicies,
                'INACTIVE'
            ]);
            const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
            const link = document.createElement('a');
            link.href = encodeURI(csv);
            link.download = `reliable_deactivated_agents_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const headers = ['SR. NO.', 'AGENT CODE', 'AGENT NAME', 'BRANCH', 'MOBILE NO', 'EMAIL ID', 'TYPE', 'REGISTRATION DATE', 'TOTAL POLICIES', 'STATUS'];
            const rows = filteredAgents.map((a, i) => [
                i + 1,
                `"${a.agentCode}"`,
                `"${a.fullName.replace(/"/g, '""')}"`,
                `"${a.branch}"`,
                `"${a.mobile}"`,
                `"${a.email || ''}"`,
                `"${a.type || 'POSP'}"`,
                `"${a.date}"`,
                a.pastPolicies,
                'ACTIVE'
            ]);
            const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
            const link = document.createElement('a');
            link.href = encodeURI(csv);
            link.download = `reliable_active_agents_${new Date().toISOString().split('T')[0]}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        showToast(`Exported ${filteredAgents.length} ${statusFilter.toLowerCase()} agent records to CSV`);
    };

    // Confirm Reactivate
    const handleConfirmReactivate = () => {
        if (!selectedAgent) return;
        setInactiveAgents(prev => prev.filter(x => x.id !== selectedAgent.id));
        setActiveAgents(prev => [
            {
                ...selectedAgent,
                status: 'ACTIVE',
                date: new Date().toLocaleDateString('en-GB'),
                category: 'ACTIVE'
            },
            ...prev
        ]);
        showToast(`Agent ${selectedAgent.fullName} (${selectedAgent.agentCode}) reactivated and restored to active directory.`);
        setSelectedAgent(null);
        setActionType(null);
    };

    // Confirm Deactivate
    const handleConfirmDeactivate = () => {
        if (!selectedAgent) return;
        setActiveAgents(prev => prev.filter(x => x.id !== selectedAgent.id));
        setInactiveAgents(prev => [
            {
                ...selectedAgent,
                status: 'INACTIVE',
                date: new Date().toLocaleDateString('en-GB'),
                reason: deactivationReason,
                deactivatedBy: 'Admin User',
                category: 'VOLUNTARY'
            },
            ...prev
        ]);
        showToast(`Agent ${selectedAgent.fullName} (${selectedAgent.agentCode}) moved to deactivated agent list.`);
        setSelectedAgent(null);
        setActionType(null);
    };

    return (
        <div className="tab-transition-wrapper space-y-5 w-full min-w-0">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-[#0B203C] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Table Card Container with Integrated Toolbar & Horizontal Scroll */}
            <div className="bg-white rounded-[10px] border border-brand-border shadow-sm overflow-hidden flex flex-col w-full min-w-0">
                {/* Table Header Toolbar: Search + Status Filter Dropdown + Export */}
                <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Search Input */}
                        <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search agent name, code or branch"
                                className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                                    title="Clear search"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Status Filter Dropdown */}
                        <div className="relative inline-flex items-center h-[38px]">
                            <Filter size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value as 'Active' | 'InActive');
                                    setCurrentPage(1);
                                }}
                                className="h-[38px] pl-9 pr-8 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent cursor-pointer transition-all appearance-none"
                            >
                                <option value="Active">Active ({activeAgents.length})</option>
                                <option value="InActive">InActive ({inactiveAgents.length})</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-2.5 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Export Button */}
                    <button
                        type="button"
                        onClick={handleExportCSV}
                        className="h-[38px] flex items-center gap-1.5 px-4 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                    >
                        <Download size={15} />
                        <span>Export CSV</span>
                    </button>
                </div>

                {/* Table with Blue Header Theme */}
                <div className="w-full overflow-x-auto min-w-0 erp-horizontal-scrollbar">
                    <table className="text-left border-collapse w-full min-w-[950px] text-[13px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap select-none">
                                <th className="py-3.5 px-4 w-16 text-center whitespace-nowrap">
                                    SR. NO.
                                </th>
                                <th className="py-3.5 px-4 w-32 whitespace-nowrap">
                                    AGENT CODE
                                </th>
                                <th className="py-3.5 px-4 w-56 whitespace-nowrap">
                                    AGENT NAME
                                </th>
                                <th className="py-3.5 px-4 w-32 whitespace-nowrap">
                                    BRANCH
                                </th>
                                <th className="py-3.5 px-4 w-32 whitespace-nowrap">
                                    MOBILE
                                </th>
                                {statusFilter === 'InActive' ? (
                                    <>
                                        <th className="py-3.5 px-4 w-36 whitespace-nowrap">
                                            DEACTIVATION DATE
                                        </th>
                                        <th className="py-3.5 px-4 w-64 whitespace-nowrap">
                                            REASON FOR DEACTIVATION
                                        </th>
                                        <th className="py-3.5 px-4 w-36 whitespace-nowrap">
                                            DEACTIVATED BY
                                        </th>
                                        <th className="py-3.5 px-4 w-28 text-center whitespace-nowrap">
                                            PAST POLICIES
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th className="py-3.5 px-4 w-48 whitespace-nowrap">
                                            EMAIL ID
                                        </th>
                                        <th className="py-3.5 px-4 w-28 text-center whitespace-nowrap">
                                            TYPE
                                        </th>
                                        <th className="py-3.5 px-4 w-36 whitespace-nowrap">
                                            REGISTRATION DATE
                                        </th>
                                        <th className="py-3.5 px-4 w-28 text-center whitespace-nowrap">
                                            TOTAL POLICIES
                                        </th>
                                    </>
                                )}
                                <th className="py-3.5 px-4 w-28 text-center whitespace-nowrap">
                                    STATUS
                                </th>
                                <th className="py-3.5 px-4 w-32 text-right whitespace-nowrap">
                                    ACTION
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-slate-700 bg-white">
                            {paginatedAgents.length === 0 ? (
                                <tr>
                                    <td colSpan={11} className="py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <UserX size={36} className="text-slate-300" />
                                            <p className="text-base font-semibold text-slate-700">No {statusFilter.toLowerCase()} agents found</p>
                                            <p className="text-xs text-slate-400">
                                                {searchQuery ? `No records match "${searchQuery}"` : `There are currently no agents with ${statusFilter} status.`}
                                            </p>
                                            {searchQuery && (
                                                <button
                                                    type="button"
                                                    onClick={() => setSearchQuery('')}
                                                    className="mt-2 px-4 py-1.5 bg-blue-50 text-brand-primary text-xs font-semibold rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
                                                >
                                                    Clear Search Filter
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedAgents.map((agent, idx) => (
                                    <tr
                                        key={agent.id}
                                        className={`h-[52px] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                                            } hover:bg-blue-50/40`}
                                    >
                                        {/* SR. NO. */}
                                        <td className="py-2.5 px-4 text-center text-xs font-medium text-slate-500">
                                            {(currentPage - 1) * itemsPerPage + idx + 1}
                                        </td>

                                        {/* AGENT CODE */}
                                        <td className="py-2.5 px-4 font-mono font-bold text-xs text-brand-primary whitespace-nowrap">
                                            {agent.agentCode}
                                        </td>

                                        {/* AGENT NAME */}
                                        <td className="py-2.5 px-4 font-semibold text-brand-navy whitespace-nowrap">
                                            {agent.fullName}
                                        </td>

                                        {/* BRANCH */}
                                        <td className="py-2.5 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                                            {agent.branch}
                                        </td>

                                        {/* MOBILE */}
                                        <td className="py-2.5 px-4 font-mono text-xs text-slate-700 whitespace-nowrap">
                                            {agent.mobile}
                                        </td>

                                        {statusFilter === 'InActive' ? (
                                            <>
                                                {/* DEACTIVATION DATE */}
                                                <td className="py-2.5 px-4 font-mono text-xs text-slate-500 whitespace-nowrap">
                                                    {agent.date}
                                                </td>

                                                {/* REASON FOR DEACTIVATION */}
                                                <td className="py-2.5 px-4 text-xs text-slate-600 truncate max-w-xs" title={agent.reason}>
                                                    {agent.reason}
                                                </td>

                                                {/* DEACTIVATED BY */}
                                                <td className="py-2.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                                                    {agent.deactivatedBy || 'System Admin'}
                                                </td>

                                                {/* PAST POLICIES */}
                                                <td className="py-2.5 px-4 text-center font-semibold text-xs text-slate-700">
                                                    {agent.pastPolicies}
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                {/* EMAIL ID */}
                                                <td className="py-2.5 px-4 text-xs text-slate-600 whitespace-nowrap">
                                                    {agent.email || '-'}
                                                </td>

                                                {/* TYPE */}
                                                <td className="py-2.5 px-4 text-center text-xs whitespace-nowrap">
                                                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                                                        {agent.type || 'POSP'}
                                                    </span>
                                                </td>

                                                {/* REGISTRATION DATE */}
                                                <td className="py-2.5 px-4 font-mono text-xs text-slate-500 whitespace-nowrap">
                                                    {agent.date}
                                                </td>

                                                {/* TOTAL POLICIES */}
                                                <td className="py-2.5 px-4 text-center font-bold text-xs text-brand-primary">
                                                    {agent.pastPolicies}
                                                </td>
                                            </>
                                        )}

                                        {/* STATUS BADGE */}
                                        <td className="py-2.5 px-4 text-center whitespace-nowrap">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${agent.status === 'ACTIVE'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                                                }`}>
                                                {agent.status}
                                            </span>
                                        </td>

                                        {/* ACTION BUTTON */}
                                        <td className="py-2.5 px-4 text-right whitespace-nowrap">
                                            {statusFilter === 'InActive' ? (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedAgent(agent);
                                                        setActionType('REACTIVATE');
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 rounded-[6px] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                >
                                                    <UserCheck size={13} />
                                                    <span>Reactivate</span>
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedAgent(agent);
                                                        setActionType('DEACTIVATE');
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-300 rounded-[6px] text-xs font-bold transition-all cursor-pointer shadow-2xs"
                                                >
                                                    <UserX size={13} />
                                                    <span>Deactivate</span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Standard Master Page Pagination Bar */}
                <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                        <span>Records per page:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="px-2 py-1 bg-white border border-brand-border rounded-md text-sm font-semibold text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    <span className="text-sm text-brand-muted font-medium">
                        Showing {filteredAgents.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredAgents.length)} of {filteredAgents.length} records
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-brand-mainbg disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-all cursor-pointer ${currentPage === page
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-white text-brand-navy border border-brand-border hover:bg-brand-mainbg'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-brand-mainbg disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>

            {/* REACTIVATE AGENT MODAL */}
            {actionType === 'REACTIVATE' && selectedAgent && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-[#102A4C] text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-lg">
                                    <UserCheck size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base">Reactivate Agent</h3>
                                    <p className="text-xs text-slate-300">Restore partner to active directory</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setSelectedAgent(null); setActionType(null); }}
                                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-sm">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Agent Code</span>
                                    <span className="font-mono font-bold text-brand-primary">{selectedAgent.agentCode}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Agent Name</span>
                                    <span className="font-bold text-brand-navy">{selectedAgent.fullName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Branch / Mobile</span>
                                    <span className="text-xs text-slate-600">{selectedAgent.branch} • {selectedAgent.mobile}</span>
                                </div>
                            </div>

                            <p className="text-xs text-slate-600">
                                Are you sure you want to reactivate this partner? They will be allowed to log policies and access their portal immediately.
                            </p>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => { setSelectedAgent(null); setActionType(null); }}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmReactivate}
                                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center gap-1.5"
                                >
                                    <UserCheck size={15} />
                                    <span>Confirm Reactivate</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* DEACTIVATE AGENT MODAL */}
            {actionType === 'DEACTIVATE' && selectedAgent && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-[#102A4C] text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-rose-500/20 text-rose-300 rounded-lg">
                                    <AlertTriangle size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base">Deactivate Agent</h3>
                                    <p className="text-xs text-slate-300">Disable portal login & commission payouts</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => { setSelectedAgent(null); setActionType(null); }}
                                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-sm">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Agent Code</span>
                                    <span className="font-mono font-bold text-brand-primary">{selectedAgent.agentCode}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Agent Name</span>
                                    <span className="font-bold text-brand-navy">{selectedAgent.fullName}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Branch / Mobile</span>
                                    <span className="text-xs text-slate-600">{selectedAgent.branch} • {selectedAgent.mobile}</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                                    Reason for Deactivation <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={deactivationReason}
                                    onChange={(e) => setDeactivationReason(e.target.value)}
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                                >
                                    <option value="Non-renewal of license / Inactive for 180 days">Non-renewal of license / Inactive for 180 days</option>
                                    <option value="Voluntary resignation & relocation">Voluntary resignation & relocation</option>
                                    <option value="Violation of insurer guidelines / Code of Conduct">Violation of insurer guidelines / Code of Conduct</option>
                                    <option value="Dual registration conflict detected">Dual registration conflict detected</option>
                                    <option value="Failed KYC verification audit documents">Failed KYC verification audit documents</option>
                                    <option value="Zero policy logged for 3 consecutive quarters">Zero policy logged for 3 consecutive quarters</option>
                                </select>
                            </div>

                            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2.5 text-xs text-amber-800">
                                <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
                                <span>Agent will be moved to the Deactivated List and their login will be suspended.</span>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => { setSelectedAgent(null); setActionType(null); }}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmDeactivate}
                                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center gap-1.5"
                                >
                                    <UserX size={15} />
                                    <span>Confirm Deactivate</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeactivatedAgentListTab;
