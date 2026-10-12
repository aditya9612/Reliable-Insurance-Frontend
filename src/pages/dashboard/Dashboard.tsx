import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import PageHeader from '../../components/page-header/PageHeader';
import {
    Zap, CreditCard, Clock, CheckCircle2, Send, FileText,
    Building2, Percent, Users, Headphones, Lock, ArrowUpRight,
    Search, FileCheck, Layers, LayoutGrid, Check, ArrowRight,
    ShieldAlert
} from 'lucide-react';

interface MetricItem {
    id: string;
    label: string;
    count?: number;
    amount?: number | string;
    isCurrency?: boolean;
    to?: string;
    statusBadge?: string;
    isAlert?: boolean;
}

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

    // Category 1: Digital Collections & Instant Payments
    const digitalMetrics: MetricItem[] = [
        { id: 'insta-pay', label: 'Insta Pay', count: 120, amount: '22,77,811', isCurrency: true, to: '/transactions/online-app-request' },
        { id: 'broker-approval', label: 'Online Broker/Cash Approval', count: 4, amount: '79,977', isCurrency: true, to: '/transactions/online-app-request' },
        { id: 'send-link', label: 'Send Link', count: 30, amount: '58,121', isCurrency: true, to: '/transactions/online-app-request' },
        { id: 'pre-broker', label: 'Pre Online Broker/Cash', count: 0, amount: '0', isCurrency: true, to: '/transactions/pending-premium-cash' },
        { id: 'pre-ewallet', label: 'Pre E-Wallet', count: 0, amount: '0', isCurrency: true, to: '/transactions/online-app-request' },
    ];

    // Category 2: Cheque & Account Processing
    const chequeMetrics: MetricItem[] = [
        { id: 'pending-trans', label: 'Pending Trans', count: 42, amount: '6,54,583', isCurrency: true, to: '/transactions/all-transaction-report' },
        { id: 'cashback', label: 'Cash Back Approval', count: 75, to: '/transactions/quality-check' },
        { id: 'receiving-amt', label: 'Receiving Amt', count: 36, to: '/transactions/pending-premium-cash' },
        { id: 'cheq-deposit', label: 'Cust Cheq Deposit', count: 3, to: '/transactions/premium-cheque-bounce' },
        { id: 'completed-entries', label: 'Completed Entries', count: 8, to: '/transactions/all-user-trans' },
    ];

    // Category 3: Service Operations & Desk
    const serviceMetrics: MetricItem[] = [
        { id: 'quotation', label: 'Quotation', count: 12, to: '/transactions/self-quotation' },
        { id: 'attended', label: 'Attended', count: 4, to: '/support' },
        { id: 'support-req', label: 'Support Request', count: 0, to: '/support' },
    ];

    return (
        <div className="w-full h-full pb-10 space-y-6">
            <Breadcrumbs />

            {/* Page Header with View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-brand-border">
                <PageHeader
                    title="Dashboard"
                    description="Real-time transaction queues, payment verifications & live metrics"
                />

                {/* View Mode Switcher */}
                <div className="flex items-center gap-1 p-1 bg-brand-lightbg/70 border border-brand-border rounded-lg self-start sm:self-auto">
                    <button
                        onClick={() => setViewMode('cards')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'cards'
                            ? 'bg-white text-brand-primary shadow-sm'
                            : 'text-brand-muted hover:text-brand-navy'
                            }`}
                    >
                        <LayoutGrid size={14} />
                        <span>Executive Cards</span>
                    </button>
                    <button
                        onClick={() => setViewMode('matrix')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${viewMode === 'matrix'
                            ? 'bg-white text-brand-primary shadow-sm'
                            : 'text-brand-muted hover:text-brand-navy'
                            }`}
                    >
                        <Layers size={14} />
                        <span>Quick Matrix</span>
                    </button>
                </div>
            </div>

            {/* Operational Priority Ribbon */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Pre Cheque Approval Banner */}
                <div
                    onClick={() => navigate('/transactions/premium-cheque-bounce')}
                    className="bg-white border border-brand-border hover:border-brand-primary/40 rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all cursor-pointer group flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-50 text-brand-error flex items-center justify-center font-bold">
                            <Clock size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-brand-error uppercase tracking-wider block">Priority Queue</span>
                            <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-primary transition-colors">
                                Pre Cheque Approval
                            </h4>
                        </div>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-semibold bg-red-50 text-brand-error border border-red-200/60 rounded-full flex items-center gap-1">
                        Action Required
                        <ArrowRight size={12} />
                    </span>
                </div>

                {/* LOCK ID Security Status Banner */}
                <div className="bg-white border border-brand-border rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-lightbg text-brand-navy flex items-center justify-center font-bold">
                            <Lock size={20} />
                        </div>
                        <div>
                            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider block">Security Status</span>
                            <h4 className="text-sm font-bold text-brand-navy flex items-center gap-2">
                                LOCK ID <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">ACTIVE</span>
                            </h4>
                        </div>
                    </div>
                    <span className="text-xs text-brand-muted font-mono bg-brand-mainbg px-2.5 py-1 rounded-md border border-brand-border">
                        SYS-SECURED
                    </span>
                </div>

                {/* Instant Pay Live Highlight */}
                <div
                    onClick={() => navigate('/transactions/online-app-request')}
                    className="bg-gradient-to-r from-brand-navy to-[#1a3d6b] text-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer group"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center">
                            <Zap size={20} className="text-yellow-400" />
                        </div>
                        <div>
                            <span className="text-xs font-medium text-blue-200 block">Today's Insta Pay</span>
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

            {/* VIEW MODE 1: EXECUTIVE CARDS */}
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
                                        onClick={() => item.to && navigate(item.to)}
                                        className="py-3 px-2 flex items-center justify-between hover:bg-brand-mainbg rounded-lg transition-colors cursor-pointer group"
                                    >
                                        <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                            {item.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary border border-blue-200/60">
                                                {item.count}
                                            </span>
                                            {item.amount !== undefined && (
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy text-white shadow-xs">
                                                    ₹{item.amount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 2: Cheque & Account Verification */}
                        <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
                            <div className="px-5 py-4 bg-brand-lightbg/40 border-b border-brand-border flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-brand-lightbg text-brand-primary rounded-lg">
                                        <Building2 size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-brand-navy">Cheques & Transaction Processing</h3>
                                        <p className="text-xs text-brand-muted">Deposits, cashbacks & clearing</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-lightbg text-brand-primary">
                                    5 Items
                                </span>
                            </div>

                            <div className="p-4 divide-y divide-brand-border/60">
                                {chequeMetrics.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => item.to && navigate(item.to)}
                                        className="py-3 px-2 flex items-center justify-between hover:bg-brand-mainbg rounded-lg transition-colors cursor-pointer group"
                                    >
                                        <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                            {item.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary border border-blue-200/60">
                                                {item.count}
                                            </span>
                                            {item.amount !== undefined && (
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-navy text-white shadow-xs">
                                                    ₹{item.amount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 3: Quotations, Attended & Service */}
                        <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
                            <div className="px-5 py-4 bg-brand-lightbg/40 border-b border-brand-border flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-brand-lightbg text-brand-primary rounded-lg">
                                        <FileCheck size={18} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-brand-navy">Service Desk & Quotations</h3>
                                        <p className="text-xs text-brand-muted">Customer quotations & service requests</p>
                                    </div>
                                </div>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-lightbg text-brand-primary">
                                    3 Items
                                </span>
                            </div>

                            <div className="p-4 divide-y divide-brand-border/60">
                                {serviceMetrics.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => item.to && navigate(item.to)}
                                        className="py-3 px-2 flex items-center justify-between hover:bg-brand-mainbg rounded-lg transition-colors cursor-pointer group"
                                    >
                                        <span className="text-sm font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                            {item.label}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-lightbg text-brand-primary border border-blue-200/60">
                                                {item.count}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Additional Service Summary Footnote */}
                            <div className="mt-auto p-4 bg-brand-mainbg/70 border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
                                <span>Support Desk Status:</span>
                                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                    <Check size={14} /> Normal Status
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Operational Navigation Tiles */}
                    <div className="bg-white rounded-xl border border-brand-border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-brand-navy">Quick Inquiries & Actions</h3>
                                <p className="text-xs text-brand-muted">Direct navigation to active policy search, commission grids, and posp lookup</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {/* Action 1: View Policy */}
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

                            {/* Action 2: Current Grid / System Grid */}
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

                            {/* Action 3: Search posp by agent */}
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
                <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                    <div className="mb-5 pb-3 border-b border-brand-border flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-bold text-brand-navy">Consolidated Grid</h3>
                            <p className="text-xs text-brand-muted">Complete status board with live transaction counters</p>
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-lightbg text-brand-primary">
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
            )}
        </div>
    );
};

export default Dashboard;

