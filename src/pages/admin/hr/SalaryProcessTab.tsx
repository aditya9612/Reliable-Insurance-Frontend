import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const ORGANIZATIONS = [
    'JPB',
    'SHARVARI MARKETING',
    'SHARVARI MOTORS'
];

const MONTHS = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

const SalaryProcessTab: React.FC = () => {
    // Form Inputs matching screenshot
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');

    // Notification toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // When "View" button is clicked
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

        showToast(`Salary Process loaded for ${selectedOrganization} (${selectedMonth} ${selectedYear})`, 'success');
    };

    // When "Export" button is clicked
    const handleExportClick = () => {
        if (!selectedOrganization) {
            showToast('Please select Organization Name before exporting', 'warning');
            return;
        }
        if (!selectedMonth) {
            showToast('Please select Month Name before exporting', 'warning');
            return;
        }
        if (!selectedYear.trim()) {
            showToast('Please enter Year before exporting', 'warning');
            return;
        }

        // Generate sample export CSV for the selected parameters
        const headers = ['EMP CODE', 'EMPLOYEE NAME', 'ORGANIZATION', 'DEPARTMENT', 'DESIGNATION', 'MONTH', 'YEAR', 'NET SALARY', 'STATUS'];
        const sampleRows = [
            ['"EMP001"', '"JYOTI CHANDRAKANT SONAWANE"', `"${selectedOrganization}"`, '"SENIOR MANAGEMENT"', '"Business - Head"', `"${selectedMonth}"`, `"${selectedYear}"`, '65500', '"PROCESSED"'],
            ['"EMP002"', '"Arvind Dnyaneshwar Gawade"', `"${selectedOrganization}"`, '"SALES"', '"EXECUTIVE"', `"${selectedMonth}"`, `"${selectedYear}"`, '35200', '"PROCESSED"'],
            ['"EMP003"', '"Amol Ramchandra Wanave"', `"${selectedOrganization}"`, '"SALES"', '"EXECUTIVE"', `"${selectedMonth}"`, `"${selectedYear}"`, '33400', '"PROCESSED"'],
            ['"EMP004"', '"Abhishek Vilas Gaikwad"', `"${selectedOrganization}"`, '"SALES"', '"SALES HEAD"', `"${selectedMonth}"`, `"${selectedYear}"`, '41800', '"PROCESSED"'],
            ['"EMP005"', '"KIRAN PANDURANG MALI"', `"${selectedOrganization}"`, '"Back Office"', '"Backend Operator"', `"${selectedMonth}"`, `"${selectedYear}"`, '20700', '"PROCESSED"'],
        ];

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...sampleRows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Salary_Process_${selectedOrganization}_${selectedMonth}_${selectedYear}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast(`Exported Salary Process file for ${selectedOrganization} (${selectedMonth} ${selectedYear})`, 'success');
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

            {/* MAIN SALARY PROCESS CARD: FULL WIDTH MATCHING PHOTO & BLUE THEME */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full min-w-0">
                {/* Banner Header: »Salary Process in Blue Theme */}
                <div className="bg-brand-primary text-white px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-white/90 text-lg font-serif">»</span>
                        <span>Salary Process</span>
                    </div>
                </div>

                {/* Form Controls: Organization, Month, Year, and View / Export buttons */}
                <div className="p-6 sm:p-7 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start">
                        {/* 1. Organization */}
                        <div>
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

                        {/* 2. Month */}
                        <div>
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

                        {/* 3. Year */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Year
                            </label>
                            <input
                                type="text"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* Action Buttons: View and Export matching screenshot in blue theme */}
                    <div className="flex items-center gap-3 pt-1">
                        <button
                            type="button"
                            onClick={handleViewClick}
                            className="px-8 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[100px] text-center"
                        >
                            View
                        </button>

                        <button
                            type="button"
                            onClick={handleExportClick}
                            className="px-8 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[100px] text-center"
                        >
                            Export
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalaryProcessTab;
