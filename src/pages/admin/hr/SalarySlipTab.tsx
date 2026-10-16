import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const ORGANIZATIONS = [
    'JPB',
    'SHARVARI MARKETING',
    'SHARVARI MOTORS',
    'RELIABLE ASSOCIATES INSURANCE BROKERS PVT LTD'
];

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const EMPLOYEES = [
    { code: 'EMP0014', name: 'Shekharu S. Lab', org: 'JPB' },
    { code: 'EMP0028', name: 'Vinayak K. Kadam', org: 'JPB' },
    { code: 'EMP0035', name: 'Santosh Sawant', org: 'SHARVARI MARKETING' },
    { code: 'EMP0041', name: 'Sunita Ravindra Patil', org: 'SHARVARI MOTORS' },
    { code: 'EMP0059', name: 'Rameshwar Jadhav', org: 'JPB' },
    { code: 'EMP0062', name: 'Sneha Mohan Kulkarni', org: 'SHARVARI MARKETING' },
    { code: 'EMP0073', name: 'Arvind Dnyaneshwar Gawade', org: 'SHARVARI MOTORS' },
    { code: 'EMP0081', name: 'Jyoti Chandrakant Sonawane', org: 'JPB' }
];

export const SalarySlipTab: React.FC = () => {
    // Form Inputs matching Photo 2 exactly
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');

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
        if (!selectedEmployee) {
            showToast('Please select Employee Name', 'warning');
            return;
        }

        const emp = EMPLOYEES.find(e => e.code === selectedEmployee);
        showToast(
            `Salary Slip loaded for ${emp ? emp.name : selectedEmployee} (${selectedMonth} ${selectedYear})`,
            'success'
        );
    };

    // Filter employees by organization if chosen
    const availableEmployees = EMPLOYEES.filter(emp => {
        if (!selectedOrganization) return true;
        return emp.org.toLowerCase().includes(selectedOrganization.toLowerCase());
    });

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

            {/* MAIN SALARY SLIP CARD: MATCHING PHOTO 2 IN BLUE THEME */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden w-full min-w-0">
                {/* Banner Header: »Salary Slip in Light Blue Theme */}
                <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-brand-primary text-lg font-bold">»</span>
                        <span>Salary Slip</span>
                    </div>
                </div>

                {/* Form Controls: Organization, Month, Year, and Employee Name */}
                <div className="p-6 sm:p-7 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
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

                        {/* 4. Employee Name */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Employee Name
                            </label>
                            <select
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Employee Name--</option>
                                {availableEmployees.map(emp => (
                                    <option key={emp.code} value={emp.code}>
                                        {emp.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Action Button: Single "View" button matching Photo 2 in blue theme */}
                    <div className="flex items-center gap-3 pt-1">
                        <button
                            type="button"
                            onClick={handleViewClick}
                            className="px-8 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[100px] text-center"
                        >
                            View
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalarySlipTab;
