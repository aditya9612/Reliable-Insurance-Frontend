import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Zap, ArrowUpRight,
    Minimize2, Maximize2, ShieldCheck
} from 'lucide-react';

export const OperationsMatrixBanner: React.FC = () => {
    const navigate = useNavigate();
    const [isMinimized, setIsMinimized] = useState<boolean>(true);

    return (
        <div className="w-full bg-[#EDF3F9] border-b border-brand-border/80 px-4 sm:px-6 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.03)] shrink-0 transition-all duration-300 ease-in-out z-10">
            {/* Top Bar Header with live indicator & Minimize / Maximize Button */}
            <div className="flex items-center justify-between gap-3 min-h-[32px]">
                {/* Left: Indicator & Quick summary pills */}
                <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                    <div className="flex items-center gap-1.5 shrink-0">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary"></span>
                        </span>
                        <span className="text-xs font-bold text-brand-navy tracking-tight whitespace-nowrap">
                            Live Operations Matrix
                        </span>
                    </div>

                    {/* Quick Ticker Pills for compact visibility */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => navigate('/transactions/premium-cheque-bounce')}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-brand-error border border-red-200/80 hover:bg-red-100 transition-colors cursor-pointer"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-error animate-pulse"></span>
                            <span>Pre Cheque: Action Required</span>
                        </button>

                        <button
                            onClick={() => navigate('/transactions/online-app-request')}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                            <Zap size={11} className="text-amber-500 fill-amber-500" />
                            <span>Insta Pay: ₹22,77,811 (120)</span>
                        </button>

                        <button
                            onClick={() => navigate('/other/lock-id')}
                            className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 transition-colors cursor-pointer"
                        >
                            <ShieldCheck size={11} />
                            <span>LOCK ID: SECURED</span>
                        </button>

                        <span className="text-[11px] font-medium text-brand-muted hidden lg:inline">
                            18 Summary Items
                        </span>
                    </div>
                </div>

                {/* Right: Smooth Minimize / Maximize Button */}
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => setIsMinimized(!isMinimized)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-brand-primary border border-brand-primary/40 hover:bg-brand-lightbg hover:border-brand-primary transition-all cursor-pointer shadow-sm"
                        title={isMinimized ? 'Click to Maximize Operational Matrix' : 'Click to Minimize Operational Matrix'}
                    >
                        {isMinimized ? (
                            <>
                                <Maximize2 size={13} />
                                <span>Maximize Matrix</span>
                            </>
                        ) : (
                            <>
                                <Minimize2 size={13} />
                                <span>Minimize Matrix</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Smooth Collapsible Content (Expanded View) */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isMinimized ? 'max-h-0 opacity-0 pt-0' : 'max-h-[600px] opacity-100 pt-2.5'
                    }`}
            >
                {/* Consolidated Grid (Complete status board with live transaction counters) */}
                <div className="bg-white rounded-xl border border-brand-border shadow-xs p-4 sm:p-5">
                    <div className="mb-3 pb-2.5 border-b border-brand-border flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-bold text-brand-navy">Consolidated Grid</h3>
                            <p className="text-[11px] text-brand-muted">Complete status board with live transaction counters</p>
                        </div>
                        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-brand-lightbg text-brand-primary border border-blue-100">
                            18 Summary Items
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3.5 gap-x-6 items-center">
                        {/* Row 1 */}
                        <div
                            onClick={() => navigate('/transactions/pending-premium-cash')}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                Pre Online Broker/Cash
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">0</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-navy text-white">0</span>
                        </div>

                        <div
                            onClick={() => navigate('/transactions/online-app-request')}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                Pre E-Wallet
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">0</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-navy text-white">0</span>
                        </div>

                        <div className="hidden lg:block" />

                        <div
                            onClick={() => navigate('/transactions/online-app-request')}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                Online Broker/Cash Approval
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">4</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-navy text-white">79977</span>
                        </div>

                        {/* Row 2 */}
                        <div
                            onClick={() => navigate('/transactions/online-app-request')}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                Insta Pay
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">120</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-navy text-white">2277811</span>
                        </div>

                        <div
                            onClick={() => navigate('/transactions/self-quotation')}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                Quotation
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">12</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-brand-navy">Attended</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">4</span>
                        </div>

                        <div>
                            <span
                                onClick={() => navigate('/transactions/premium-cheque-bounce')}
                                className="text-xs font-semibold text-brand-error hover:underline cursor-pointer"
                            >
                                Pre Cheque Approval
                            </span>
                        </div>

                        {/* Row 3 */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-brand-navy">Cash Back Approval</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">75</span>
                        </div>

                        <div
                            onClick={() => navigate('/transactions/all-transaction-report')}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                Pending Trans
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">42</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-navy text-white">654583</span>
                        </div>

                        <div
                            onClick={() => navigate('/transactions/premium-cheque-bounce')}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                Cust Cheq Deposit
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">3</span>
                        </div>

                        <div>
                            <span
                                onClick={() => navigate('/transactions/view-policy-document')}
                                className="text-xs font-semibold text-brand-primary hover:underline cursor-pointer flex items-center gap-1"
                            >
                                View Policy
                                <ArrowUpRight size={12} />
                            </span>
                        </div>

                        {/* Row 4 */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-brand-navy">Receiving Amt</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">36</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-brand-navy">Send Link</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">30</span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-navy text-white">58121</span>
                        </div>

                        <div>
                            <span
                                onClick={() => navigate('/commission-grid')}
                                className="text-xs font-semibold text-brand-primary hover:underline cursor-pointer flex items-center gap-1"
                            >
                                Current Grid/ System Grid
                                <ArrowUpRight size={12} />
                            </span>
                        </div>

                        <div>
                            <span
                                onClick={() => navigate('/registration/agent')}
                                className="text-xs font-semibold text-brand-primary hover:underline cursor-pointer flex items-center gap-1"
                            >
                                Search posp by agent
                                <ArrowUpRight size={12} />
                            </span>
                        </div>

                        {/* Row 5 */}
                        <div
                            onClick={() => navigate('/support')}
                            className="flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                Support Request
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">0</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <div
                                onClick={() => navigate('/transactions/all-user-trans')}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <span className="text-xs font-medium text-brand-navy group-hover:text-brand-primary transition-colors">
                                    Completed Entries
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-lightbg text-brand-primary">8</span>
                            </div>
                            <span
                                onClick={() => navigate('/other/lock-id')}
                                className="text-xs font-bold text-brand-error tracking-wide ml-1 cursor-pointer hover:underline"
                            >
                                LOCK ID
                            </span>
                        </div>

                        <div className="hidden lg:block" />
                        <div className="hidden lg:block" />
                    </div>
                </div>
            </div>
        </div>
    );
};
