import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/page-header/PageHeader';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import {
    Clock, Lock, Zap, ArrowUpRight, ArrowRight,
    CreditCard, CheckCircle2, Headphones, FileText, Percent, Search,
    LayoutGrid, Layers
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const isAdmin = user?.role === 'admin';

    // View mode: 'matrix' (Consolidated Grid) or 'cards' (Executive Hub)
    const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('matrix');

    const digitalMetrics = [
        { id: 'pre-broker-cash', label: 'Pre Online Broker/Cash', count: 0, amount: '0', to: '/transactions/pending-premium-cash' },
        { id: 'pre-ewallet', label: 'Pre E-Wallet', count: 0, amount: '0', to: '/transactions/online-app-request' },
        { id: 'broker-cash-approval', label: 'Online Broker/Cash Approval', count: 4, amount: '79,977', to: '/transactions/online-app-request' },
        { id: 'insta-pay', label: 'Insta Pay', count: 120, amount: '22,77,811', to: '/transactions/online-app-request', highlight: true },
        { id: 'quotation', label: 'Quotation', count: 12, to: '/transactions/self-quotation' },
    ];

    const chequeMetrics = [
        { id: 'attended', label: 'Attended', count: 4, to: '/transactions/pending-premium-cheque' },
        { id: 'pre-cheque-app', label: 'Pre Cheque Approval', count: null, actionLabel: 'View Queue', to: '/transactions/premium-cheque-bounce', urgent: true },
        { id: 'cash-back-app', label: 'Cash Back Approval', count: 75, to: '/transactions/cashback-neft-search' },
        { id: 'cust-cheq-dep', label: 'Cust Cheq Deposit', count: 3, to: '/transactions/premium-cheque-bounce' },
    ];

    const serviceMetrics = [
        { id: 'pending-trans', label: 'Pending Trans', count: 42, amount: '6,54,583', to: '/transactions/all-transaction-report' },
        { id: 'receiving-amt', label: 'Receiving Amt', count: 36, to: '/transactions/all-transaction-report' },
        { id: 'send-link', label: 'Send Link', count: 30, amount: '58,121', to: '/transactions/all-user-trans' },
        { id: 'completed-entries', label: 'Completed Entries', count: 8, to: '/transactions/all-user-trans' },
        { id: 'lock-id', label: 'LOCK ID', count: null, actionLabel: 'Secured', to: '/other/lock-id', status: 'active' },
        { id: 'support-req', label: 'Support Request', count: 0, to: '/support' },
    ];

    // For non-admin roles, remove all operational data, queues, and cards
    if (!isAdmin) {
        return (
            <div className="w-full h-full pb-10 space-y-6">
                <Breadcrumbs />

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
                    <PageHeader
                        title="Dashboard"
                        description={`Operational dashboard for ${user?.name || 'User'} (${user?.roleTitle || user?.role || 'Employee'})`}
                    />
                </div>

                {/* Non-Admin Empty Dashboard Display */}
                <div className="bg-white rounded-2xl border border-brand-border p-12 text-center shadow-sm max-w-xl mx-auto mt-10">
                    <div className="w-16 h-16 rounded-2xl bg-brand-lightbg text-brand-primary flex items-center justify-center mx-auto mb-4 border border-blue-100">
                        <LayoutGrid size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-brand-navy mb-1">
                        Welcome, {user?.name || 'User'}
                    </h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-3">
                        Role: {user?.roleTitle || user?.role || 'User'} • {user?.branch || 'General'}
                    </p>
                    <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                        No active widgets or data are configured for this role. Live transaction counters, priority queues, and executive metrics are reserved for Administrator accounts.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full pb-10 space-y-6">
            <Breadcrumbs />

            {/* Page Header with Dual View Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
                <PageHeader
                    title="Executive Operations Hub"
                    description="Real-time transaction queues, payment verifications & quick inquiry workflows"
                />

                {/* View Mode Toggle: Quick Matrix vs Executive Cards */}
                <div className="flex items-center gap-1.5 p-1 bg-brand-lightbg/60 border border-brand-border rounded-xl self-start sm:self-auto">
                    <button
                        onClick={() => setViewMode('matrix')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${viewMode === 'matrix'
                            ? 'bg-white text-brand-navy shadow-sm border border-brand-border/60'
                            : 'text-brand-muted hover:text-brand-navy'
                            }`}
                    >
                        <LayoutGrid size={14} />
                        <span>Quick Matrix</span>
                    </button>
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${viewMode === 'cards'
                            ? 'bg-white text-brand-navy shadow-sm border border-brand-border/60'
                            : 'text-brand-muted hover:text-brand-navy'
                            }`}
                    >
                        <Layers size={14} />
                        <span>Executive Cards</span>
                    </button>
                </div>
            </div>

            {/* Operational Priority Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Pre Cheque Approval Urgent Alert */}
                <div
                    onClick={() => navigate('/transactions/premium-cheque-bounce')}
                    className="bg-white border-2 border-red-100 hover:border-brand-error/40 rounded-2xl p-4 shadow-xs transition-all cursor-pointer group flex items-center justify-between"
                >
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-red-50 text-brand-error flex items-center justify-center shrink-0">
                            <Clock size={20} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-brand-error uppercase tracking-wider block">Priority Queue</span>
                            <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                Pre Cheque Approval
                            </h4>
                        </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-brand-error border border-red-100 flex items-center gap-1">
                        Action Required
                        <ArrowRight size={12} />
                    </span>
                </div>

                {/* 2. Security Status / LOCK ID */}
                <div
                    onClick={() => navigate('/other/lock-id')}
                    className="bg-white border border-brand-border hover:border-brand-primary/40 rounded-2xl p-4 shadow-xs transition-all cursor-pointer group flex items-center justify-between"
                >
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-primary flex items-center justify-center shrink-0">
                            <Lock size={20} />
                        </div>
                        <div>
                            <span className="text-[10px] font-bold text-brand-muted uppercase tracking-wider block">Security Status</span>
                            <div className="flex items-center gap-2">
                                <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                    LOCK ID
                                </h4>
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-green-50 text-brand-success border border-green-200">
                                    ACTIVE
                                </span>
                            </div>
                        </div>
                    </div>
                    <span className="text-xs font-mono text-brand-muted bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                        SYS - SECURED
                    </span>
                </div>

                {/* 3. Today's Insta Pay Hero Counter */}
                <div
                    onClick={() => navigate('/transactions/online-app-request')}
                    className="bg-gradient-to-r from-brand-navy to-[#1a3d6b] text-white rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer group"
                >
                    <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                            <Zap size={22} className="text-yellow-400" />
                        </div>
                        <div>
                            <span className="text-[11px] font-medium text-blue-200 block">Today's Insta Pay</span>
                            <h4 className="text-base font-bold text-white flex items-center gap-2">
                                120 Trans <span className="text-xs font-normal text-blue-200">|</span> ₹22,77,811
                            </h4>
                        </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                        <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>

            {/* VIEW MODE 1: EXECUTIVE CATEGORIZED CARDS */}
            {viewMode === 'cards' && (
                <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Card 1: Digital Collections & Instant Payments */}
                        <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
                            <div className="px-5 py-4 bg-brand-lightbg/40 border-b border-brand-border flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-brand-lightbg text-brand-primary rounded-lg">
                                        <CreditCard size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-brand-navy">Digital & Broker Collections</h3>
                                        <p className="text-xs text-brand-muted">Instant payment queues & approvals</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-lightbg text-brand-primary">
                                    5 Items
                                </span>
                            </div>

                            <div className="p-4 divide-y divide-brand-border/60">
                                {digitalMetrics.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(item.to)}
                                        className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg cursor-pointer transition-colors group"
                                    >
                                        <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                            {item.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {item.amount && (
                                                <span className="text-xs font-mono font-semibold text-brand-navy">
                                                    ₹{item.amount}
                                                </span>
                                            )}
                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${item.highlight
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-brand-lightbg text-brand-primary'
                                                }`}>
                                                {item.count}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 2: Cheque & Account Processing */}
                        <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
                            <div className="px-5 py-4 bg-brand-lightbg/40 border-b border-brand-border flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-green-50 text-brand-success rounded-lg">
                                        <CheckCircle2 size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-brand-navy">Cheque & Account Processing</h3>
                                        <p className="text-xs text-brand-muted">Deposit verifications & settlements</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-brand-success">
                                    4 Items
                                </span>
                            </div>

                            <div className="p-4 divide-y divide-brand-border/60">
                                {chequeMetrics.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(item.to)}
                                        className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg cursor-pointer transition-colors group"
                                    >
                                        <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                            {item.label}
                                        </span>
                                        <div>
                                            {item.count !== null ? (
                                                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-brand-lightbg text-brand-primary">
                                                    {item.count}
                                                </span>
                                            ) : (
                                                <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${item.urgent
                                                    ? 'bg-red-50 text-brand-error border border-red-200'
                                                    : 'bg-brand-lightbg text-brand-primary'
                                                    }`}>
                                                    {item.actionLabel}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 3: Service Desk & Brokerage Operations */}
                        <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
                            <div className="px-5 py-4 bg-brand-lightbg/40 border-b border-brand-border flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <Headphones size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-brand-navy">Service Operations</h3>
                                        <p className="text-xs text-brand-muted">Support tickets & entry tracking</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                                    6 Items
                                </span>
                            </div>

                            <div className="p-4 divide-y divide-brand-border/60">
                                {serviceMetrics.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => navigate(item.to)}
                                        className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between hover:bg-slate-50/80 px-2 rounded-lg cursor-pointer transition-colors group"
                                    >
                                        <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                            {item.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {item.amount && (
                                                <span className="text-xs font-mono font-semibold text-brand-navy">
                                                    ₹{item.amount}
                                                </span>
                                            )}
                                            {item.count !== null ? (
                                                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-brand-lightbg text-brand-primary">
                                                    {item.count}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-green-50 text-brand-success border border-green-200">
                                                    {item.actionLabel}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Inquiries & Actions Grid */}
                    <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-brand-navy">Quick Inquiries & Actions</h3>
                            <p className="text-xs text-brand-muted">Direct navigation to active policy search, commission grids, and posp lookup</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => navigate('/transactions/view-policy-document')}
                                className="p-4 rounded-xl border border-brand-border hover:border-brand-primary hover:bg-brand-lightbg/30 flex items-center justify-between transition-all group text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-brand-lightbg text-brand-primary rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                            View Policy
                                        </h4>
                                        <p className="text-xs text-brand-muted">Search & view policy documents</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-brand-muted group-hover:text-brand-primary transition-colors" />
                            </button>

                            <button
                                onClick={() => navigate('/commission-grid')}
                                className="p-4 rounded-xl border border-brand-border hover:border-brand-primary hover:bg-brand-lightbg/30 flex items-center justify-between transition-all group text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-brand-lightbg text-brand-primary rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                        <Percent size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                            Current Grid / System Grid
                                        </h4>
                                        <p className="text-xs text-brand-muted">Broker & agent commission grids</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-brand-muted group-hover:text-brand-primary transition-colors" />
                            </button>

                            <button
                                onClick={() => navigate('/registration/agent')}
                                className="p-4 rounded-xl border border-brand-border hover:border-brand-primary hover:bg-brand-lightbg/30 flex items-center justify-between transition-all group text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-brand-lightbg text-brand-primary rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                        <Search size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                            Search POSP by Agent
                                        </h4>
                                        <p className="text-xs text-brand-muted">Find POSP registration & agents</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-brand-muted group-hover:text-brand-primary transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW MODE 2: QUICK CONSOLIDATED MATRIX */}
            {viewMode === 'matrix' && (
                <div className="space-y-6">
                    <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                        <div className="mb-5 pb-3 border-b border-brand-border flex items-center justify-between">
                            <div>
                                <h3 className="text-base font-bold text-brand-navy">Consolidated Grid</h3>
                                <p className="text-xs text-brand-muted">Complete status board with live transaction counters</p>
                            </div>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-lightbg text-brand-primary border border-blue-100">
                                18 Summary Items
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-8 items-center">
                            {/* Row 1 */}
                            <div
                                onClick={() => navigate('/transactions/pending-premium-cash')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Pre Online Broker/Cash
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">0</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy text-white">0</span>
                            </div>

                            <div
                                onClick={() => navigate('/transactions/online-app-request')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Pre E-Wallet
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">0</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy text-white">0</span>
                            </div>

                            <div className="hidden lg:block" />

                            <div
                                onClick={() => navigate('/transactions/online-app-request')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Online Broker/Cash Approval
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">4</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy text-white">79977</span>
                            </div>

                            {/* Row 2 */}
                            <div
                                onClick={() => navigate('/transactions/online-app-request')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Insta Pay
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">120</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy text-white">2277811</span>
                            </div>

                            <div
                                onClick={() => navigate('/transactions/self-quotation')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Quotation
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">12</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-brand-navy">Attended</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">4</span>
                            </div>

                            <div>
                                <span
                                    onClick={() => navigate('/transactions/premium-cheque-bounce')}
                                    className="text-sm font-semibold text-brand-error hover:underline cursor-pointer"
                                >
                                    Pre Cheque Approval
                                </span>
                            </div>

                            {/* Row 3 */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-brand-navy">Cash Back Approval</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">75</span>
                            </div>

                            <div
                                onClick={() => navigate('/transactions/all-transaction-report')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Pending Trans
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">42</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy text-white">654583</span>
                            </div>

                            <div
                                onClick={() => navigate('/transactions/premium-cheque-bounce')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Cust Cheq Deposit
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">3</span>
                            </div>

                            <div>
                                <span
                                    onClick={() => navigate('/transactions/view-policy-document')}
                                    className="text-sm font-semibold text-brand-primary hover:underline cursor-pointer flex items-center gap-1"
                                >
                                    View Policy
                                    <ArrowUpRight size={14} />
                                </span>
                            </div>

                            {/* Row 4 */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-brand-navy">Receiving Amt</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">36</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-brand-navy">Send Link</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">30</span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy text-white">58121</span>
                            </div>

                            <div>
                                <span
                                    onClick={() => navigate('/commission-grid')}
                                    className="text-sm font-semibold text-brand-primary hover:underline cursor-pointer flex items-center gap-1"
                                >
                                    Current Grid/ System Grid
                                    <ArrowUpRight size={14} />
                                </span>
                            </div>

                            <div>
                                <span
                                    onClick={() => navigate('/registration/agent')}
                                    className="text-sm font-semibold text-brand-primary hover:underline cursor-pointer flex items-center gap-1"
                                >
                                    Search posp by agent
                                    <ArrowUpRight size={14} />
                                </span>
                            </div>

                            {/* Row 5 */}
                            <div
                                onClick={() => navigate('/support')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Support Request
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">0</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <div
                                    onClick={() => navigate('/transactions/all-user-trans')}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                        Completed Entries
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary">8</span>
                                </div>
                                <span className="text-sm font-bold text-brand-error tracking-wide ml-2 cursor-pointer hover:underline">
                                    LOCK ID
                                </span>
                            </div>

                            <div className="hidden lg:block" />
                            <div className="hidden lg:block" />
                        </div>
                    </div>

                    {/* Quick Inquiries & Actions Grid */}
                    <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                        <div className="mb-4">
                            <h3 className="text-sm font-bold text-brand-navy">Quick Inquiries & Actions</h3>
                            <p className="text-xs text-brand-muted">Direct navigation to active policy search, commission grids, and posp lookup</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <button
                                onClick={() => navigate('/transactions/view-policy-document')}
                                className="p-4 rounded-xl border border-brand-border hover:border-brand-primary hover:bg-brand-lightbg/30 flex items-center justify-between transition-all group text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-brand-lightbg text-brand-primary rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                            View Policy
                                        </h4>
                                        <p className="text-xs text-brand-muted">Search & view policy documents</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-brand-muted group-hover:text-brand-primary transition-colors" />
                            </button>

                            <button
                                onClick={() => navigate('/commission-grid')}
                                className="p-4 rounded-xl border border-brand-border hover:border-brand-primary hover:bg-brand-lightbg/30 flex items-center justify-between transition-all group text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-brand-lightbg text-brand-primary rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                        <Percent size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                            Current Grid / System Grid
                                        </h4>
                                        <p className="text-xs text-brand-muted">Broker & agent commission grids</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-brand-muted group-hover:text-brand-primary transition-colors" />
                            </button>

                            <button
                                onClick={() => navigate('/registration/agent')}
                                className="p-4 rounded-xl border border-brand-border hover:border-brand-primary hover:bg-brand-lightbg/30 flex items-center justify-between transition-all group text-left cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-brand-lightbg text-brand-primary rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-colors">
                                        <Search size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                            Search POSP by Agent
                                        </h4>
                                        <p className="text-xs text-brand-muted">Find POSP registration & agents</p>
                                    </div>
                                </div>
                                <ArrowUpRight size={18} className="text-brand-muted group-hover:text-brand-primary transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
