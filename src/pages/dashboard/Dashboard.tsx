import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/page-header/PageHeader';
import {
    ArrowUpRight, FileText, Percent, Search, BarChart2,
    Users, DollarSign, TrendingUp, Building2, Clock
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import CommissionSummaryTab from './CommissionSummaryTab';
import ViewDashboardTab from './tabs/ViewDashboardTab';
import AgentPaymentTab from './AgentPaymentTab';
import AnalyticDashboardAgentTab from './tabs/AnalyticDashboardAgentTab';
import AnalyticDashboardExecutiveTab from './tabs/AnalyticDashboardExecutiveTab';
import AnalyticDashboardLocationTab from './tabs/AnalyticDashboardLocationTab';
import AgentBusinessTab from './tabs/AgentBusinessTab';
import ExecutiveBusinessTab from './tabs/ExecutiveBusinessTab';
import InsuranceOutstandingTab from './tabs/InsuranceOutstandingTab';
import BrokerReportTab from './tabs/BrokerReportTab';
import DirectBusinessTab from './tabs/DirectBusinessTab';
import AgentPendingCommissionTab from './tabs/AgentPendingCommissionTab';

const dashboardTabs = [
    { id: 'view-dashboard', label: 'View Dashboard' },
    { id: 'commission-summary', label: 'Commission Summary' },
    { id: 'agent-payment', label: 'Agent Payment' },
    { id: 'analytic-agent', label: 'Analytic Dashboard Agent' },
    { id: 'analytic-executive', label: 'Analytic Dashboard Executive' },
    { id: 'analytic-location', label: 'Analytic Dashboard Location' },
    { id: 'agent-business', label: 'Agent Business' },
    { id: 'executive-business', label: 'Executive Business' },
    { id: 'insurance-outstanding', label: 'Insurance Company Outstanding' },
    { id: 'broker-report', label: 'Broker Report' },
    { id: 'direct-business', label: 'Direct Business' },
    { id: 'agent-pending-comm', label: 'Agent Pending Comm Report' },
];

const quickActions = [
    { id: 'view-policy', label: 'View Policy', desc: 'Search & view policy documents', icon: FileText, to: '/transactions/view-policy-document' },
    { id: 'commission-grid', label: 'Current Grid / System Grid', desc: 'Broker & agent commission grids', icon: Percent, to: '/commission-grid' },
    { id: 'search-posp', label: 'Search POSP by Agent', desc: 'Find POSP registration & agents', icon: Search, to: '/registration/agent' },
    { id: 'reports', label: 'Reports', desc: 'Cut N Pay, TDS, Endorsement & more', icon: BarChart2, to: '/reports' },
    { id: 'agent-commission', label: 'View All Agent Commissioners', desc: 'Commission summary by agent', icon: Users, to: '/reports?tab=viewAllAgentCommission' },
    { id: 'agent-payment-qa', label: 'Agent Payment', desc: 'View & process agent payments', icon: DollarSign, to: '/dashboard?tab=agent-payment' },
    { id: 'mis-reports', label: 'MIS Reports', desc: 'Management information system reports', icon: TrendingUp, to: '/reports/mis' },
    { id: 'hr-module', label: 'HR Module', desc: 'Attendance, salary & employee data', icon: Building2, to: '/hr' },
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
    const [searchParams, setSearchParams] = useSearchParams();
    const { user } = useAuthContext();
    const isAdmin = user?.role === 'admin';

    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState(tabParam || 'view-dashboard');

    useEffect(() => {
        if (tabParam && tabParam !== activeTab) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        setSearchParams(tabId === 'view-dashboard' ? {} : { tab: tabId });
    };

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
                                onClick={() => handleTabChange(tab.id)}
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
                                onClick={() => handleTabChange(tab.id)}
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
                <ViewDashboardTab onNavigateTab={handleTabChange} />
            )}

            {activeTab === 'commission-summary' && <CommissionSummaryTab />}
            {activeTab === 'agent-payment' && <AgentPaymentTab onBack={() => handleTabChange('view-dashboard')} />}
            {activeTab === 'analytic-agent' && <AnalyticDashboardAgentTab />}
            {activeTab === 'analytic-executive' && <AnalyticDashboardExecutiveTab />}
            {activeTab === 'analytic-location' && <AnalyticDashboardLocationTab />}
            {activeTab === 'agent-business' && <AgentBusinessTab />}
            {activeTab === 'executive-business' && <ExecutiveBusinessTab />}
            {activeTab === 'insurance-outstanding' && <InsuranceOutstandingTab />}
            {activeTab === 'broker-report' && <BrokerReportTab />}
            {activeTab === 'direct-business' && <DirectBusinessTab />}
            {activeTab === 'agent-pending-comm' && <AgentPendingCommissionTab />}

        </div>
    );
};

export default Dashboard;
