import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Search } from 'lucide-react';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const FINANCIAL_YEARS = ['2026-2027', '2025-2026', '2024-2025', '2024', '2025', '2026'];

export const LeaveReportTab: React.FC = () => {
    // Form Inputs matching Photo 5 exactly
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedFinancialYear, setSelectedFinancialYear] = useState('2024');
    const [empSearch, setEmpSearch] = useState('');

    // Notification toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // When "view Approval" button is clicked
    const handleViewApproval = () => {
        if (!selectedMonth) {
            showToast('Please select Month Name', 'warning');
            return;
        }

        showToast(
            `Loaded Approved Leave Report for ${selectedMonth} (${selectedFinancialYear})`,
            'success'
        );
    };

    // When "cancel/Pending" button is clicked
    const handleCancelPending = () => {
        if (!selectedMonth) {
            showToast('Please select Month Name', 'warning');
            return;
        }

        showToast(
            `Loaded Cancelled & Pending Leave Report for ${selectedMonth} (${selectedFinancialYear})`,
            'success'
        );
    };

    return (
        <div className="tab-transition-wrapper space-y-6 w-full min-w-0">
            {/* Toast Notification */}
            {toast && (
                <div
                    className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-2xl border text-white text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-200 ${
                        toast.type === 'warning'
                            ? 'bg-[#1E293B] border-amber-500/40 text-amber-200'
                            : 'bg-[#0B203C] border-blue-500/40 text-blue-100'
                    }`}
                >
                    {toast.type === 'warning' ? (
                        <AlertCircle size={18} className="text-amber-400 shrink-0" />
                    ) : (
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    )}
                    <span>{toast.message}</span>
                </div>
            )}

            {/* Page Title: "Leave Report" matching Photo 5 */}
            <div className="text-center py-1">
                <h3 className="text-lg font-bold text-brand-navy tracking-wide">
                    Leave Report
                </h3>
            </div>

            {/* MAIN FILTER CARD: MATCHING PHOTO 5 IN BLUE THEME - FULL WIDTH */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden w-full min-w-0">
                <div className="p-6 sm:p-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 items-end">
                        {/* 1. Month */}
                        <div className="lg:col-span-4">
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Month
                            </label>
                            <select
                                value={selectedMonth}
                                onChange={(e) => setSelectedMonth(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Month Name--</option>
                                {MONTHS.map(m => (
                                    <option key={m} value={m}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 2. Financial Year */}
                        <div className="lg:col-span-4">
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Financial Year
                            </label>
                            <select
                                value={selectedFinancialYear}
                                onChange={(e) => setSelectedFinancialYear(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                {FINANCIAL_YEARS.map(yr => (
                                    <option key={yr} value={yr}>
                                        {yr}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 3. Action Buttons: view Approval and cancel/Pending */}
                        <div className="lg:col-span-4 flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleViewApproval}
                                className="px-6 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[13px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none whitespace-nowrap text-center"
                            >
                                view Approval
                            </button>

                            <button
                                type="button"
                                onClick={handleCancelPending}
                                className="px-6 py-2.5 bg-[#0B203C] hover:bg-[#102A4C] active:scale-95 text-white font-bold text-[13px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none whitespace-nowrap text-center"
                            >
                                cancel/Pending
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEARCH BOX BELOW CARD: MATCHING PHOTO 5 - FULL WIDTH CONTAINER */}
            <div className="w-full pt-1">
                <div className="relative w-full sm:w-96">
                    <input
                        type="text"
                        placeholder="Search Emp Name Here"
                        value={empSearch}
                        onChange={(e) => setEmpSearch(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-[8px] text-[13px] text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                    />
                </div>
            </div>
        </div>
    );
};

export default LeaveReportTab;
