import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/page-header/PageHeader';
import {
    ArrowUpRight, FileText, Percent, Search, BarChart2,
    Users, DollarSign, TrendingUp, Building2, Clock
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

const dashboardTabs = [
    { id: 'view-dashboard',        label: 'View Dashboard' },
    { id: 'commission-summary',    label: 'Commission Summary' },
    { id: 'agent-payment',         label: 'Agent Payment' },
    { id: 'analytic-agent',        label: 'Analytic Dashboard Agent' },
    { id: 'analytic-executive',    label: 'Analytic Dashboard Executive' },
    { id: 'analytic-location',     label: 'Analytic Dashboard Location' },
    { id: 'agent-business',        label: 'Agent Business' },
    { id: 'executive-business',    label: 'Executive Business' },
    { id: 'insurance-outstanding', label: 'Insurance Company Outstanding' },
    { id: 'broker-report',         label: 'Broker Report' },
    { id: 'direct-business',       label: 'Direct Business' },
    { id: 'agent-pending-comm',    label: 'Agent Pending Comm Report' },
];

const quickActions = [
    { id: 'view-policy',       label: 'View Policy',                  desc: 'Search & view policy documents',          icon: FileText,    to: '/transactions/view-policy-document' },
    { id: 'commission-grid',   label: 'Current Grid / System Grid',   desc: 'Broker & agent commission grids',          icon: Percent,     to: '/commission-grid' },
    { id: 'search-posp',       label: 'Search POSP by Agent',         desc: 'Find POSP registration & agents',          icon: Search,      to: '/registration/agent' },
    { id: 'reports',           label: 'Reports',                      desc: 'Cut N Pay, TDS, Endorsement & more',       icon: BarChart2,   to: '/reports' },
    { id: 'agent-commission',  label: 'View All Agent Commission',     desc: 'Commission summary by agent',              icon: Users,       to: '/reports?tab=viewAllAgentCommission' },
    { id: 'agent-payment-qa',  label: 'Agent Payment',                desc: 'View & process agent payments',            icon: DollarSign,  to: '/commission-grid/agent-commission' },
    { id: 'mis-reports',       label: 'MIS Reports',                  desc: 'Management information system reports',    icon: TrendingUp,  to: '/reports/mis' },
    { id: 'hr-module',         label: 'HR Module',                    desc: 'Attendance, salary & employee data',       icon: Building2,   to: '/hr' },
];

// Placeholder panel for tabs that don't have a dedicated page yet
const ComingSoonPanel: React.FC<{ label: string }> = ({ label }) => (
    <div className="bg-white rounded-xl border border-brand-border p-12 text-center shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-brand-lightbg text-brand-primary flex items-center justify-center mx-auto mb-4">
            <Clock size={28} />
        </div>
        <h3 className="text-base font-bold text-brand-navy mb-1">{label}</h3>
        <p className="text-sm text-brand-muted">This dashboard view is coming soon.</p>
    </div>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const isAdmin = user?.role === 'admin';
    const [activeTab, setActiveTab] = useState('view-dashboard');

    if (!isAdmin) {
        return (
            <div className="w-full h-full flex items-center justify-center py-20">
                <div className="bg-white rounded-2xl border border-brand-border p-12 text-center shadow-sm max-w-xl">
                    <h3 className="text-lg font-bold text-brand-navy mb-2">
                        Welcome, {user?.name || 'User'}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
                        {user?.roleTitle || user?.role || 'User'} • {user?.branch || 'General'}
                    </p>
                    <p className="text-sm text-brand-muted leading-relaxed">
                        No active widgets are configured for this role.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full pb-10 space-y-5">

            {/* Page Header */}
            <div className="pb-4 border-b border-brand-border">
                <PageHeader
                    title="Dashboard"
                    description="Live operational overview, analytics, commission and business performance reports"
                />
            </div>

            {/* 2-Row Full-Width Sub-Tabs Navigation — Exact Policy Master UI */}
            <div className="bg-white rounded-2xl border border-brand-border p-3 space-y-2.5 shadow-sm w-full max-w-full">
                {/* Row 1: First 6 Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full border-b border-slate-200 pb-2.5">
                    {dashboardTabs.slice(0, 6).map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                                }`}
                                title={tab.label}
                            >
                                <span className="truncate">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Row 2: Remaining 6 Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
                    {dashboardTabs.slice(6).map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                                }`}
                                title={tab.label}
                            >
                                <span className="truncate">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'view-dashboard' && (
                <div className="space-y-5">
                    {/* Quick Actions Grid */}
                    <div>
                        <h2 className="text-sm font-bold text-brand-navy mb-3">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {quickActions.map((action) => (
                                <button
                                    key={action.id}
                                    onClick={() => navigate(action.to)}
                                    className="p-4 rounded-xl border border-brand-border bg-white hover:border-brand-primary hover:bg-brand-lightbg/30 flex items-center justify-between transition-all group text-left cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-brand-lightbg text-brand-primary rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0">
                                            <action.icon size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors leading-tight">
                                                {action.label}
                                            </h4>
                                            <p className="text-xs text-brand-muted mt-0.5 leading-tight">{action.desc}</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight size={16} className="text-brand-muted group-hover:text-brand-primary transition-colors shrink-0 ml-2" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'commission-summary' && <ComingSoonPanel label="Commission Summary" />}
            {activeTab === 'agent-payment' && <ComingSoonPanel label="Agent Payment" />}
            {activeTab === 'analytic-agent' && <ComingSoonPanel label="Analytic Dashboard Agent" />}
            {activeTab === 'analytic-executive' && <ComingSoonPanel label="Analytic Dashboard Executive" />}
            {activeTab === 'analytic-location' && <ComingSoonPanel label="Analytic Dashboard Location" />}
            {activeTab === 'agent-business' && <ComingSoonPanel label="Agent Business" />}
            {activeTab === 'executive-business' && <ComingSoonPanel label="Executive Business" />}
            {activeTab === 'insurance-outstanding' && <ComingSoonPanel label="Insurance Co. Outstanding" />}
            {activeTab === 'broker-report' && <ComingSoonPanel label="Broker Report" />}
            {activeTab === 'direct-business' && <ComingSoonPanel label="Direct Business" />}
            {activeTab === 'agent-pending-comm' && <ComingSoonPanel label="Agent Pending Comm Rep" />}

        </div>
    );
};

export default Dashboard;
