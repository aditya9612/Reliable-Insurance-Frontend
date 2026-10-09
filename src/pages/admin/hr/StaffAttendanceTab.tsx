import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const ORGANIZATIONS = [
    'JPB',
    'SHARVARI MARKETING',
    'SHARVARI MOTORS'
];

const MONTHS = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' }
];

const StaffAttendanceTab: React.FC = () => {
    // Form States matching user screenshot exactly
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [allDepartment, setAllDepartment] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // Notification toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // When "view" button is clicked
    const handleViewClick = () => {
        if (!selectedOrganization) {
            showToast('Please select Organization Name', 'warning');
            return;
        }
        if (!selectedMonth) {
            showToast('Please select Month Name', 'warning');
            return;
        }
        if (!selectedYear.trim()) {
            showToast('Please enter Year', 'warning');
            return;
        }

        const monthName = MONTHS.find(m => m.value === selectedMonth)?.name || selectedMonth;
        showToast(`Attendance details loaded for ${selectedOrganization} (${monthName} ${selectedYear})`, 'success');
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

            {/* MAIN ATTENDANCE CARD: FULL WIDTH MATCHING PHOTO 2 & BLUE THEME */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                {/* Banner Header: » Attendance in Blue Theme */}
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>Attendance</span>
                    </div>
                </div>

                {/* Form Controls: Organization, All Department, Month, Year */}
                <div className="p-6 sm:p-7 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
                        {/* 1. Organization */}
                        <div className="sm:col-span-1 lg:col-span-4">
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Organization
                            </label>
                            <select
                                value={selectedOrganization}
                                onChange={(e) => setSelectedOrganization(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Organization Name--</option>
                                {ORGANIZATIONS.map(org => (
                                    <option key={org} value={org}>
                                        {org}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 2. All Department */}
                        <div className="sm:col-span-1 lg:col-span-2">
                            <label className="block text-[14px] font-medium text-slate-700 leading-tight mb-2">
                                All<br />Department
                            </label>
                            <div className="pt-0.5">
                                <input
                                    type="checkbox"
                                    checked={allDepartment}
                                    onChange={(e) => setAllDepartment(e.target.checked)}
                                    className="w-4 h-4 text-brand-primary accent-brand-primary border-slate-300 rounded focus:ring-brand-primary cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* 3. Month */}
                        <div className="sm:col-span-1 lg:col-span-3">
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
                                    <option key={m.value} value={m.value}>
                                        {m.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 4. Year (rounded pill input matching screenshot) */}
                        <div className="sm:col-span-1 lg:col-span-3">
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Year
                            </label>
                            <input
                                type="text"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Centered "view" button matching screenshot in blue theme */}
                    <div className="flex items-center justify-center pt-2">
                        <button
                            type="button"
                            onClick={handleViewClick}
                            className="px-10 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[110px] text-center"
                        >
                            view
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffAttendanceTab;
