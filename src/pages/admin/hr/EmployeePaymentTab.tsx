import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const ORGANIZATIONS = [
    'JPB',
    'SHARVARI MARKETING',
    'SHARVARI MOTORS',
    'RELIABLE ASSOCIATES INSURANCE BROKERS PVT LTD'
];

const MONTHS = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
];

export const EmployeePaymentTab: React.FC = () => {
    // Form Inputs matching Photo 1 exactly
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'UNPAID'>('ALL');

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

        showToast(
            `Salary Payment loaded for ${selectedOrganization} (${selectedMonth} ${selectedYear}) - Status: ${statusFilter}`,
            'success'
        );
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
        const headers = ['EMP CODE', 'EMPLOYEE NAME', 'ORGANIZATION', 'DEPARTMENT', 'DESIGNATION', 'MONTH', 'YEAR', 'NET SALARY', 'MODE', 'BANK', 'STATUS'];
        const sampleRows = [
            ['"EMP0014"', '"Shekharu S. Lab"', `"${selectedOrganization}"`, '"Management"', '"Branch Administrator"', `"${selectedMonth}"`, `"${selectedYear}"`, '65500', '"NEFT"', '"Axis Bank"', `"${statusFilter === 'UNPAID' ? 'UNPAID' : 'PAID'}"`],
            ['"EMP0028"', '"Vinayak K. Kadam"', `"${selectedOrganization}"`, '"Operations"', '"Branch Manager"', `"${selectedMonth}"`, `"${selectedYear}"`, '60800', '"NEFT"', '"HDFC Bank"', `"${statusFilter === 'UNPAID' ? 'UNPAID' : 'PAID'}"`],
            ['"EMP0035"', '"Santosh Sawant"', `"${selectedOrganization}"`, '"Operations"', '"Branch Manager"', `"${selectedMonth}"`, `"${selectedYear}"`, '55200', '"NEFT"', '"ICICI Bank"', `"${statusFilter === 'UNPAID' ? 'UNPAID' : 'PAID'}"`],
            ['"EMP0041"', '"Sunita Ravindra Patil"', `"${selectedOrganization}"`, '"Accounts & Finance"', '"Senior Accountant"', `"${selectedMonth}"`, `"${selectedYear}"`, '50500', '"NEFT"', '"State Bank of India"', `"${statusFilter === 'UNPAID' ? 'UNPAID' : 'PAID'}"`],
            ['"EMP0059"', '"Rameshwar Jadhav"', `"${selectedOrganization}"`, '"Operations"', '"Operations Head"', `"${selectedMonth}"`, `"${selectedYear}"`, '52200', '"NEFT"', '"Bank of Maharashtra"', `"${statusFilter === 'PAID' ? 'PAID' : 'UNPAID'}"`],
            ['"EMP0062"', '"Sneha Mohan Kulkarni"', `"${selectedOrganization}"`, '"Underwriting"', '"Senior Underwriter"', `"${selectedMonth}"`, `"${selectedYear}"`, '44800', '"NEFT"', '"HDFC Bank"', `"${statusFilter === 'PAID' ? 'PAID' : 'UNPAID'}"`]
        ];

        const filteredRows = statusFilter === 'ALL'
            ? sampleRows
            : sampleRows.filter(row => row[10].replace(/"/g, '') === statusFilter);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...filteredRows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Salary_Payment_${selectedOrganization}_${selectedMonth}_${selectedYear}_${statusFilter}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast(`Exported Salary Payment file for ${selectedOrganization} (${selectedMonth} ${selectedYear})`, 'success');
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

            {/* MAIN SALARY PAYMENT CARD: MATCHING PHOTO 1 WITH BLUE THEME */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden w-full min-w-0">
                {/* Banner Header: »Salary Payment in Light Blue Theme */}
                <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-brand-primary text-lg font-bold">»</span>
                        <span>Salary Payment</span>
                    </div>
                </div>

                {/* Form Controls: Organization, Month, Year, and Radio Group (ALL, PAID, UNPAID) */}
                <div className="p-6 sm:p-7 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
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

                        {/* 4. Radio Group: ALL, PAID, UNPAID (matching screenshot layout) */}
                        <div className="pt-2 sm:pt-6">
                            <div className="flex items-center gap-5">
                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="paymentStatus"
                                        value="ALL"
                                        checked={statusFilter === 'ALL'}
                                        onChange={() => setStatusFilter('ALL')}
                                        className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                    />
                                    <span className="text-[14px] font-semibold text-slate-700">ALL</span>
                                </label>

                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="paymentStatus"
                                        value="PAID"
                                        checked={statusFilter === 'PAID'}
                                        onChange={() => setStatusFilter('PAID')}
                                        className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                    />
                                    <span className="text-[14px] font-semibold text-slate-700">PAID</span>
                                </label>

                                <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="radio"
                                        name="paymentStatus"
                                        value="UNPAID"
                                        checked={statusFilter === 'UNPAID'}
                                        onChange={() => setStatusFilter('UNPAID')}
                                        className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                    />
                                    <span className="text-[14px] font-semibold text-slate-700">UNPAID</span>
                                </label>
                            </div>
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

export default EmployeePaymentTab;
