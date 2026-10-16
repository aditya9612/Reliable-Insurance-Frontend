import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const ApplyLeaveTab: React.FC = () => {
    // Form Inputs matching Photo 4 exactly
    const [fromDate, setFromDate] = useState('');
    const [fromDayType, setFromDayType] = useState<'Full Day' | 'Half Day'>('Full Day');
    const [toDate, setToDate] = useState('');
    const [toDayType, setToDayType] = useState<'Full Day' | 'Half Day'>('Full Day');
    const [duration, setDuration] = useState('');
    const [reason, setReason] = useState('');
    const [handoverTo, setHandoverTo] = useState('');

    // Notification toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // When "Apply Leave" is clicked
    const handleApply = () => {
        if (!fromDate.trim()) {
            showToast('Please select From Date', 'warning');
            return;
        }
        if (!toDate.trim()) {
            showToast('Please select To Date', 'warning');
            return;
        }
        if (!reason.trim()) {
            showToast('Please enter Reason for Leave', 'warning');
            return;
        }

        showToast(`Leave application submitted successfully from ${fromDate} to ${toDate}`, 'success');

        // Reset
        setFromDate('');
        setToDate('');
        setDuration('');
        setReason('');
        setHandoverTo('');
    };

    return (
        <div className="tab-transition-wrapper space-y-5 w-full min-w-0">
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

            {/* MAIN LEAVE APPLY CARD: MATCHING PHOTO 4 IN BLUE THEME */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden w-full min-w-0">
                {/* Banner Header: »Leave Apply in Light Blue Theme */}
                <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-brand-primary text-lg font-bold">»</span>
                        <span>Leave Apply</span>
                    </div>
                </div>

                {/* Form Controls matching Photo 4 */}
                <div className="p-6 sm:p-7 space-y-6">
                    {/* ROW 1: From Date & To Date with Full Day / Half Day Radios */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start w-full min-w-0">
                        {/* 1. From Date */}
                        <div className="space-y-2.5">
                            <label className="block text-[14px] font-medium text-slate-700">
                                From Date
                            </label>
                            <input
                                type="text"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                placeholder="Select Date from Calender"
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                            <div className="flex items-center gap-5 pt-1 pl-1">
                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="fromDayType"
                                        value="Full Day"
                                        checked={fromDayType === 'Full Day'}
                                        onChange={() => setFromDayType('Full Day')}
                                        className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                    />
                                    <span className="text-[13px] font-medium text-slate-700">Full Day</span>
                                </label>

                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="fromDayType"
                                        value="Half Day"
                                        checked={fromDayType === 'Half Day'}
                                        onChange={() => setFromDayType('Half Day')}
                                        className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                    />
                                    <span className="text-[13px] font-medium text-slate-700">Half Day</span>
                                </label>
                            </div>
                        </div>

                        {/* 2. To Date */}
                        <div className="space-y-2.5">
                            <label className="block text-[14px] font-medium text-slate-700">
                                To Date
                            </label>
                            <input
                                type="text"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                placeholder="Select Date from Calender"
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 placeholder-slate-400 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                            <div className="flex items-center gap-5 pt-1 pl-1">
                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="toDayType"
                                        value="Full Day"
                                        checked={toDayType === 'Full Day'}
                                        onChange={() => setToDayType('Full Day')}
                                        className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                    />
                                    <span className="text-[13px] font-medium text-slate-700">Full Day</span>
                                </label>

                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="toDayType"
                                        value="Half Day"
                                        checked={toDayType === 'Half Day'}
                                        onChange={() => setToDayType('Half Day')}
                                        className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                    />
                                    <span className="text-[13px] font-medium text-slate-700">Half Day</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ROW 2: Duration, Reason, Handover To */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                        {/* Duration */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Duration
                            </label>
                            <input
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Reason
                            </label>
                            <textarea
                                rows={3}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-white border border-[#CBD5E1] rounded-[10px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium resize-y"
                            />
                        </div>

                        {/* Handover To */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Handover To
                            </label>
                            <textarea
                                rows={3}
                                value={handoverTo}
                                onChange={(e) => setHandoverTo(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-white border border-[#CBD5E1] rounded-[10px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium resize-y"
                            />
                        </div>
                    </div>

                    {/* Action Button: Apply Leave */}
                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleApply}
                            className="px-8 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[120px] text-center"
                        >
                            Apply Leave
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplyLeaveTab;
