import React, { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const ORGANIZATIONS = [
    'JPB',
    'SHARVARI MARKETING',
    'SHARVARI MOTORS',
    'RELIABLE ASSOCIATES INSURANCE BROKERS PVT LTD'
];

const DEPARTMENTS = [
    'Management',
    'Operations',
    'Sales',
    'Accounts & Finance',
    'Underwriting',
    'Back Office',
    'IT'
];

const EMPLOYEES = [
    { code: 'EMP0014', name: 'Shekharu S. Lab', org: 'JPB', dept: 'Management' },
    { code: 'EMP0028', name: 'Vinayak K. Kadam', org: 'JPB', dept: 'Operations' },
    { code: 'EMP0035', name: 'Santosh Sawant', org: 'SHARVARI MARKETING', dept: 'Operations' },
    { code: 'EMP0041', name: 'Sunita Ravindra Patil', org: 'SHARVARI MOTORS', dept: 'Accounts & Finance' },
    { code: 'EMP0059', name: 'Rameshwar Jadhav', org: 'JPB', dept: 'Operations' },
    { code: 'EMP0062', name: 'Sneha Mohan Kulkarni', org: 'SHARVARI MARKETING', dept: 'Underwriting' },
    { code: 'EMP0073', name: 'Arvind Dnyaneshwar Gawade', org: 'SHARVARI MOTORS', dept: 'Sales' },
    { code: 'EMP0081', name: 'Jyoti Chandrakant Sonawane', org: 'JPB', dept: 'Management' }
];

export const EmployeeAdvanceTab: React.FC = () => {
    // Form Inputs matching Photo 1 exactly
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [advanceDate, setAdvanceDate] = useState('');
    const [advanceAmount, setAdvanceAmount] = useState('');
    const [installmentMonths, setInstallmentMonths] = useState('');

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
        if (!selectedDepartment) {
            showToast('Please select Department Name', 'warning');
            return;
        }
        if (!selectedEmployee) {
            showToast('Please select Employee Name', 'warning');
            return;
        }
        if (!advanceDate.trim()) {
            showToast('Please select or enter Date', 'warning');
            return;
        }
        if (!advanceAmount.trim()) {
            showToast('Please enter Advance Amount', 'warning');
            return;
        }
        if (!installmentMonths.trim()) {
            showToast('Please enter No. of Installment Month', 'warning');
            return;
        }

        const emp = EMPLOYEES.find(e => e.code === selectedEmployee);
        showToast(
            `Advance of ₹${advanceAmount} recorded for ${emp ? emp.name : selectedEmployee} (${installmentMonths} months installment)`,
            'success'
        );
    };

    // Filter employees by organization/department if selected
    const availableEmployees = EMPLOYEES.filter(emp => {
        if (selectedOrganization && !emp.org.toLowerCase().includes(selectedOrganization.toLowerCase())) {
            return false;
        }
        if (selectedDepartment && !emp.dept.toLowerCase().includes(selectedDepartment.toLowerCase())) {
            return false;
        }
        return true;
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

            {/* MAIN ADVANCE CARD: MATCHING PHOTO 1 IN BLUE THEME */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden w-full min-w-0">
                {/* Banner Header: »Advance in Light Blue Theme */}
                <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-brand-primary text-lg font-bold">»</span>
                        <span>Advance</span>
                    </div>
                </div>

                {/* Form Controls: Row 1 (Organization, Department, Employee Name, Date), Row 2 (Advance Amount, No. of Installment Month, view button) */}
                <div className="p-6 sm:p-7 space-y-6">
                    {/* ROW 1: 4 columns */}
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

                        {/* 2. Department */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Department
                            </label>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Deparment Name--</option>
                                {DEPARTMENTS.map(dept => (
                                    <option key={dept} value={dept}>
                                        {dept}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 3. Employee Name */}
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

                        {/* 4. Date */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Date
                            </label>
                            <input
                                type="text"
                                value={advanceDate}
                                onChange={(e) => setAdvanceDate(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* ROW 2: Advance Amount, No. of Installment Month, and view Button */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                        {/* 5. Advance Amount */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Advance Amount
                            </label>
                            <input
                                type="text"
                                value={advanceAmount}
                                onChange={(e) => setAdvanceAmount(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        {/* 6. No. of Installment Month */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                No. of Installment Month
                            </label>
                            <input
                                type="text"
                                value={installmentMonths}
                                onChange={(e) => setInstallmentMonths(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        {/* 7. Action Button: view matching screenshot exactly */}
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={handleViewClick}
                                className="px-8 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[100px] text-center"
                            >
                                view
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeAdvanceTab;
