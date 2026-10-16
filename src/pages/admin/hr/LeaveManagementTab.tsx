import React, { useState } from 'react';
import { Edit2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface LeaveMasterItem {
    id: number;
    organizationName: string;
    dName: string;
    empName: string;
    leaveType: string;
    applicationDate: string;
    fromDate: string;
    toDate: string;
    noOfDays: number;
}

const ORGANIZATIONS = [
    'JPB CONSULTANCY PVT LTD',
    'SHARVARI MARKETING',
    'SHARVARI MOTORS',
    'RELIABLE ASSOCIATES INSURANCE BROKERS PVT LTD'
];

const DEPARTMENTS = [
    'BACK OFFICE',
    'SALES',
    'OPERATIONS',
    'MANAGEMENT',
    'ACCOUNTS & FINANCE',
    'UNDERWRITING'
];

const EMPLOYEES = [
    'JYOTI CHANDRAKANT SONAWANE',
    'KIRAN PANDURANG MALI',
    'PRADIP DINKAR SHEWALE',
    'ANJALI DHANAJI MALI',
    'DIKSHA SANJAY RANDHAVE',
    'SNEHAL KUSHAL YADAV',
    'ARVIND DNYANESHWAR GAWADE',
    'SHEKHARU S. LAB',
    'VINAYAK K. KADAM'
];

const LEAVE_TYPES = ['CL', 'SL', 'PL', 'ML'];

const INITIAL_LEAVE_RECORDS: LeaveMasterItem[] = [
    { id: 1, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'JYOTI CHANDRAKANT SONAWANE', leaveType: 'CL', applicationDate: '25/02/2021 00:00:00', fromDate: '26/02/2021 00:00:00', toDate: '27/02/2021 00:00:00', noOfDays: 2 },
    { id: 2, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'SALES', empName: 'KIRAN PANDURANG MALI', leaveType: 'CL', applicationDate: '15/05/2024 00:00:00', fromDate: '12/12/2024 00:00:00', toDate: '13/12/2024 00:00:00', noOfDays: 1 },
    { id: 5, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'PRADIP DINKAR SHEWALE', leaveType: 'CL', applicationDate: '10/12/2024 11:37:42', fromDate: '12/04/2025 00:00:00', toDate: '14/04/2025 00:00:00', noOfDays: 3 },
    { id: 7, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'ANJALI DHANAJI MALI', leaveType: 'CL', applicationDate: '16/12/2024 15:56:13', fromDate: '18/12/2024 00:00:00', toDate: '19/12/2024 00:00:00', noOfDays: 2 },
    { id: 8, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'ANJALI DHANAJI MALI', leaveType: 'CL', applicationDate: '26/12/2024 10:07:23', fromDate: '27/12/2024 00:00:00', toDate: '27/12/2024 00:00:00', noOfDays: 1 },
    { id: 13, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'PRADIP DINKAR SHEWALE', leaveType: 'CL', applicationDate: '05/02/2025 10:43:21', fromDate: '06/05/2025 00:00:00', toDate: '10/05/2025 00:00:00', noOfDays: 5 },
    { id: 14, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'DIKSHA SANJAY RANDHAVE', leaveType: 'CL', applicationDate: '17/05/2025 11:19:48', fromDate: '17/05/2025 00:00:00', toDate: '19/05/2025 00:00:00', noOfDays: 3 },
    { id: 16, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'SNEHAL KUSHAL YADAV', leaveType: 'CL', applicationDate: '19/05/2025 11:12:12', fromDate: '19/05/2025 00:00:00', toDate: '19/05/2025 00:00:00', noOfDays: 0.5 },
    { id: 22, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'PRADIP DINKAR SHEWALE', leaveType: 'CL', applicationDate: '19/06/2025 12:14:01', fromDate: '20/06/2025 00:00:00', toDate: '20/06/2025 00:00:00', noOfDays: 1 },
    { id: 23, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'SNEHAL KUSHAL YADAV', leaveType: 'CL', applicationDate: '05/07/2025 17:02:32', fromDate: '11/07/2025 00:00:00', toDate: '11/07/2025 00:00:00', noOfDays: 1 },
    { id: 24, organizationName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'SNEHAL KUSHAL YADAV', leaveType: 'CL', applicationDate: '18/07/2025 10:53:07', fromDate: '18/07/2025 00:00:00', toDate: '18/07/2025 00:00:00', noOfDays: 0.5 },
];

export const LeaveManagementTab: React.FC = () => {
    // Form Inputs matching Photo 1 exactly
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [selectedLeaveType, setSelectedLeaveType] = useState('');
    const [applicationDate, setApplicationDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [noOfDays, setNoOfDays] = useState('');

    const [editingId, setEditingId] = useState<number | null>(null);
    const [records, setRecords] = useState<LeaveMasterItem[]>(INITIAL_LEAVE_RECORDS);

    // Notification toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // When "Save" button is clicked
    const handleSave = () => {
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
        if (!selectedLeaveType) {
            showToast('Please select Leave Type', 'warning');
            return;
        }

        const days = parseFloat(noOfDays) || 1;

        if (editingId !== null) {
            setRecords(prev =>
                prev.map(r =>
                    r.id === editingId
                        ? {
                              ...r,
                              organizationName: selectedOrganization,
                              dName: selectedDepartment,
                              empName: selectedEmployee,
                              leaveType: selectedLeaveType,
                              applicationDate: applicationDate.trim() ? applicationDate : r.applicationDate,
                              fromDate: fromDate.trim() ? fromDate : r.fromDate,
                              toDate: toDate.trim() ? toDate : r.toDate,
                              noOfDays: days
                          }
                        : r
                )
            );
            showToast(`Leave application updated successfully for ${selectedEmployee}`, 'success');
            setEditingId(null);
        } else {
            const nextId = records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1;
            const newRecord: LeaveMasterItem = {
                id: nextId,
                organizationName: selectedOrganization,
                dName: selectedDepartment,
                empName: selectedEmployee,
                leaveType: selectedLeaveType,
                applicationDate: applicationDate.trim() || '16/10/2026 00:00:00',
                fromDate: fromDate.trim() || '17/10/2026 00:00:00',
                toDate: toDate.trim() || '18/10/2026 00:00:00',
                noOfDays: days
            };
            setRecords(prev => [newRecord, ...prev]);
            showToast(`Leave recorded for ${selectedEmployee}`, 'success');
        }

        // Reset inputs
        setSelectedEmployee('');
        setSelectedLeaveType('');
        setApplicationDate('');
        setFromDate('');
        setToDate('');
        setNoOfDays('');
    };

    // When Edit pencil icon in table is clicked
    const handleEdit = (item: LeaveMasterItem) => {
        setEditingId(item.id);
        setSelectedOrganization(item.organizationName);
        setSelectedDepartment(item.dName);
        setSelectedEmployee(item.empName);
        setSelectedLeaveType(item.leaveType);
        setApplicationDate(item.applicationDate);
        setFromDate(item.fromDate);
        setToDate(item.toDate);
        setNoOfDays(item.noOfDays.toString());
        showToast(`Editing leave record #${item.id} for ${item.empName}`, 'success');
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

            {/* 1. TOP CARD: LEAVE MASTER FORM (MATCHING PHOTO 1) */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden w-full min-w-0">
                {/* Banner Header: »Leave Master in Light Blue Theme */}
                <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-6 py-3.5 flex items-center shadow-xs">
                    <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                        <span className="text-brand-primary text-lg font-bold">»</span>
                        <span>Leave Master</span>
                    </div>
                </div>

                {/* Form Controls */}
                <div className="p-6 sm:p-7 space-y-6">
                    {/* ROW 1: Organization, Department, Employee, Leave Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                        {/* Organization */}
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

                        {/* Department */}
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

                        {/* Employee */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Employee
                            </label>
                            <select
                                value={selectedEmployee}
                                onChange={(e) => setSelectedEmployee(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Employee Name--</option>
                                {EMPLOYEES.map(emp => (
                                    <option key={emp} value={emp}>
                                        {emp}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Leave Type */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Leave Type
                            </label>
                            <select
                                value={selectedLeaveType}
                                onChange={(e) => setSelectedLeaveType(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Leave Type--</option>
                                {LEAVE_TYPES.map(lt => (
                                    <option key={lt} value={lt}>
                                        {lt}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* ROW 2: Application Date, From Date, To Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Application Date
                            </label>
                            <input
                                type="text"
                                value={applicationDate}
                                onChange={(e) => setApplicationDate(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                From Date
                            </label>
                            <input
                                type="text"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                To Date
                            </label>
                            <input
                                type="text"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>
                    </div>

                    {/* ROW 3: No Of Days & Save Button */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                No Of Days
                            </label>
                            <input
                                type="text"
                                value={noOfDays}
                                onChange={(e) => setNoOfDays(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-8 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[100px] text-center"
                            >
                                {editingId !== null ? 'Update' : 'Save'}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setSelectedEmployee('');
                                        setSelectedLeaveType('');
                                        setApplicationDate('');
                                        setFromDate('');
                                        setToDate('');
                                        setNoOfDays('');
                                    }}
                                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[13px] rounded-[6px] transition cursor-pointer border-none"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. BOTTOM TABLE: MATCHING POLICY MASTER BLUE THEME */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden w-full">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                <th className="py-3 px-3 w-12 text-center">ID</th>
                                <th className="py-3 px-3">ORGANIZATIONNAME</th>
                                <th className="py-3 px-3">DNAME</th>
                                <th className="py-3 px-3">EMPNAME</th>
                                <th className="py-3 px-3">LEAVE TYPE</th>
                                <th className="py-3 px-3">APPLICATIONDATE</th>
                                <th className="py-3 px-3">FROMDATE</th>
                                <th className="py-3 px-3">TODATE</th>
                                <th className="py-3 px-3 text-center">NOOFDAYS</th>
                                <th className="py-3 px-3 w-12 text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[12px]">
                            {records.map((item) => (
                                <tr
                                    key={item.id}
                                    className={`hover:bg-brand-mainbg transition-colors h-[48px] ${
                                        editingId === item.id ? 'bg-blue-50/70 font-semibold' : 'bg-white'
                                    }`}
                                >
                                    <td className="py-2.5 px-3 text-center font-mono text-brand-primary font-medium">
                                        {item.id}
                                    </td>
                                    <td className="py-2.5 px-3 text-slate-800 font-medium whitespace-nowrap">
                                        {item.organizationName}
                                    </td>
                                    <td className="py-2.5 px-3 text-slate-700 font-medium whitespace-nowrap">
                                        {item.dName}
                                    </td>
                                    <td className="py-2.5 px-3 text-brand-navy font-semibold whitespace-nowrap">
                                        {item.empName}
                                    </td>
                                    <td className="py-2.5 px-3 font-bold text-brand-primary whitespace-nowrap">
                                        {item.leaveType}
                                    </td>
                                    <td className="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap text-[11px]">
                                        {item.applicationDate}
                                    </td>
                                    <td className="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap text-[11px]">
                                        {item.fromDate}
                                    </td>
                                    <td className="py-2.5 px-3 font-mono text-slate-600 whitespace-nowrap text-[11px]">
                                        {item.toDate}
                                    </td>
                                    <td className="py-2.5 px-3 text-center font-bold text-slate-800 font-mono">
                                        {item.noOfDays}
                                    </td>
                                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(item)}
                                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                            title="Edit Leave"
                                        >
                                            <Edit2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LeaveManagementTab;
