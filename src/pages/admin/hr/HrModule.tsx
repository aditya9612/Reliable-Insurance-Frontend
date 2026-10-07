import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import {
    Search, Plus, Edit2, Trash2, X, CheckCircle2, Clock, Calendar,
    DollarSign, CreditCard, Building, User, Users, FileText, Check,
    Download, AlertCircle, ArrowUpRight, ShieldCheck, RefreshCw, Send,
    Eye, Filter
} from 'lucide-react';

export type HrSubTab =
    | 'executive-attendance'
    | 'attendance'
    | 'salary-process'
    | 'employee-payment'
    | 'holiday-master'
    | 'employee-master'
    | 'view-employee'
    | 'leave-management'
    | 'leave-type'
    | 'organization-master'
    | 'department-master'
    | 'salary-slip'
    | 'employee-advance'
    | 'view-employee-advance'
    | 'designation-master'
    | 'apply-leave'
    | 'leave-report';

const tabs: TabItem[] = [
    { id: 'executive-attendance', label: 'Executive Attendance' },
    { id: 'attendance', label: 'Attendance' },
    { id: 'salary-process', label: 'Salary Process' },
    { id: 'employee-payment', label: 'Employee Payment' },
    { id: 'holiday-master', label: 'Holiday Master' },
    { id: 'employee-master', label: 'Employee Master' },
    { id: 'view-employee', label: 'View Employee' },
    { id: 'leave-management', label: 'Leave Management' },
    { id: 'leave-type', label: 'Leave Type' },
    { id: 'organization-master', label: 'Organization Master' },
    { id: 'department-master', label: 'Department Master' },
    { id: 'salary-slip', label: 'Salary Slip' },
    { id: 'employee-advance', label: 'Employee Advance' },
    { id: 'view-employee-advance', label: 'View Employee Advance' },
    { id: 'designation-master', label: 'Designation Master' },
    { id: 'apply-leave', label: 'Apply Leave' },
    { id: 'leave-report', label: 'Leave Report' },
];

const HrModule: React.FC = () => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();

    const activeTab = (tab && tabs.some(t => t.id === tab))
        ? (tab as HrSubTab)
        : 'executive-attendance';

    const handleTabChange = (newTabId: string) => {
        navigate(`/hr/${newTabId}`);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [modalType, setModalType] = useState<string | null>(null);

    // ==========================================
    // 1 & 2: ATTENDANCE STATE
    // ==========================================
    const [attendanceLogs, setAttendanceLogs] = useState([
        { id: 1, empCode: 'EMP0014', name: 'Shekharu S. Lab', designation: 'Branch Admin', branch: 'BARAMATI', date: '07/10/2026', punchIn: '09:28 AM', punchOut: '06:35 PM', workHours: '9h 07m', status: 'PRESENT' },
        { id: 2, empCode: 'EMP0028', name: 'Vinayak K. Kadam', designation: 'Branch Manager', branch: 'SAMBHAJINAGAR', date: '07/10/2026', punchIn: '09:45 AM', punchOut: '—', workHours: 'In Progress', status: 'PRESENT' },
        { id: 3, empCode: 'EMP0035', name: 'Santosh Sawant', designation: 'Branch Manager', branch: 'AKLUJ', date: '07/10/2026', punchIn: '10:15 AM', punchOut: '—', workHours: 'In Progress', status: 'LATE' },
        { id: 4, empCode: 'EMP0041', name: 'Sunita Ravindra Patil', designation: 'Senior Accountant', branch: 'PUNE', date: '07/10/2026', punchIn: '—', punchOut: '—', workHours: '0h', status: 'ON LEAVE' },
        { id: 5, empCode: 'EMP0059', name: 'Rameshwar Jadhav', designation: 'Operations Head', branch: 'AHILYANAGAR', date: '07/10/2026', punchIn: '09:12 AM', punchOut: '06:10 PM', workHours: '8h 58m', status: 'PRESENT' },
        { id: 6, empCode: 'EMP0062', name: 'Sneha Mohan Kulkarni', designation: 'Underwriter', branch: 'BARAMATI', date: '07/10/2026', punchIn: '09:30 AM', punchOut: '01:30 PM', workHours: '4h 00m', status: 'HALF DAY' },
    ]);

    // ==========================================
    // 3: SALARY PROCESS
    // ==========================================
    const [salaryRecords, setSalaryRecords] = useState([
        { id: 1, empCode: 'EMP0014', name: 'Shekharu Lab', month: 'September 2026', basic: 45000, hra: 18000, allowances: 7000, deductions: 4500, netSalary: 65500, status: 'PROCESSED' },
        { id: 2, empCode: 'EMP0028', name: 'Vinayak Kadam', month: 'September 2026', basic: 42000, hra: 16800, allowances: 6200, deductions: 4200, netSalary: 60800, status: 'PROCESSED' },
        { id: 3, empCode: 'EMP0035', name: 'Santosh Sawant', month: 'September 2026', basic: 38000, hra: 15200, allowances: 5800, deductions: 3800, netSalary: 55200, status: 'PROCESSED' },
        { id: 4, empCode: 'EMP0041', name: 'Sunita Patil', month: 'September 2026', basic: 35000, hra: 14000, allowances: 5000, deductions: 3500, netSalary: 50500, status: 'PROCESSED' },
        { id: 5, empCode: 'EMP0059', name: 'Rameshwar Jadhav', month: 'September 2026', basic: 36000, hra: 14400, allowances: 5400, deductions: 3600, netSalary: 52200, status: 'PENDING' },
    ]);

    // ==========================================
    // 4: EMPLOYEE PAYMENT
    // ==========================================
    const [paymentDisbursements, setPaymentDisbursements] = useState([
        { id: 1, batchId: 'PAY-2026-SEP-01', totalEmployees: 64, totalAmount: '₹ 28,45,200', payDate: '01/10/2026', mode: 'DIRECT BANK NEFT', bank: 'HDFC BANK', status: 'DISBURSED' },
        { id: 2, batchId: 'PAY-2026-AUG-01', totalEmployees: 62, totalAmount: '₹ 27,80,450', payDate: '01/09/2026', mode: 'DIRECT BANK NEFT', bank: 'HDFC BANK', status: 'DISBURSED' },
        { id: 3, batchId: 'PAY-2026-JUL-01', totalEmployees: 61, totalAmount: '₹ 27,10,000', payDate: '01/08/2026', mode: 'DIRECT BANK NEFT', bank: 'HDFC BANK', status: 'DISBURSED' },
    ]);

    // ==========================================
    // 5: HOLIDAY MASTER
    // ==========================================
    const [holidays, setHolidays] = useState([
        { id: 1, occasion: 'Diwali (Laxmi Pujan)', date: '31/10/2026', day: 'Saturday', type: 'MANDATORY', status: 'UPCOMING' },
        { id: 2, occasion: 'Diwali (Balipratipada)', date: '02/11/2026', day: 'Monday', type: 'MANDATORY', status: 'UPCOMING' },
        { id: 3, occasion: 'Guru Nanak Jayanti', date: '15/11/2026', day: 'Sunday', type: 'OPTIONAL', status: 'UPCOMING' },
        { id: 4, occasion: 'Christmas Day', date: '25/12/2026', day: 'Friday', type: 'MANDATORY', status: 'UPCOMING' },
        { id: 5, occasion: 'Independence Day', date: '15/08/2026', day: 'Saturday', type: 'NATIONAL', status: 'COMPLETED' },
        { id: 6, occasion: 'Ganesh Chaturthi', date: '07/09/2026', day: 'Monday', type: 'MANDATORY', status: 'COMPLETED' },
    ]);
    const [holidayForm, setHolidayForm] = useState({ occasion: '', date: '', day: 'Monday', type: 'MANDATORY' });

    // ==========================================
    // 6 & 7: EMPLOYEE MASTER / VIEW EMPLOYEE
    // ==========================================
    const [employees, setEmployees] = useState([
        { id: 1, empCode: 'EMP0014', name: 'Shekharu S. Lab', designation: 'Branch Admin', department: 'Management', branch: 'BARAMATI', mobile: '9822001122', email: 'shekharu.lab@reliable.in', doj: '12/04/2021', salary: '₹ 70,000', status: 'ACTIVE' },
        { id: 2, empCode: 'EMP0028', name: 'Vinayak K. Kadam', designation: 'Branch Manager', department: 'Operations', branch: 'CHHATRAPATI SAMBHAJINAGAR', mobile: '9822345678', email: 'v.kadam@reliable.in', doj: '01/08/2022', salary: '₹ 65,000', status: 'ACTIVE' },
        { id: 3, empCode: 'EMP0035', name: 'Santosh Sawant', designation: 'Branch Manager', department: 'Operations', branch: 'AKLUJ', mobile: '9422998877', email: 's.sawant@reliable.in', doj: '15/02/2022', salary: '₹ 59,000', status: 'ACTIVE' },
        { id: 4, empCode: 'EMP0041', name: 'Sunita Ravindra Patil', designation: 'Senior Accountant', department: 'Accounts', branch: 'PUNE', mobile: '9890123456', email: 's.patil@reliable.in', doj: '10/11/2022', salary: '₹ 54,000', status: 'ACTIVE' },
        { id: 5, empCode: 'EMP0059', name: 'Rameshwar Jadhav', designation: 'Operations Head', department: 'Operations', branch: 'AHILYANAGAR', mobile: '9850112233', email: 'r.jadhav@reliable.in', doj: '05/01/2023', salary: '₹ 56,000', status: 'ACTIVE' },
    ]);

    // ==========================================
    // 8, 9, 16, 17: LEAVE STATE
    // ==========================================
    const [leaveTypes, setLeaveTypes] = useState([
        { id: 1, code: 'CL', name: 'Casual Leave', daysPerYear: 12, carryForward: false, encashable: false },
        { id: 2, code: 'SL', name: 'Sick Leave', daysPerYear: 10, carryForward: true, encashable: false },
        { id: 3, code: 'PL', name: 'Privilege / Earned Leave', daysPerYear: 18, carryForward: true, encashable: true },
        { id: 4, code: 'ML', name: 'Maternity Leave', daysPerYear: 180, carryForward: false, encashable: false },
        { id: 5, code: 'LOP', name: 'Loss of Pay (Unpaid)', daysPerYear: 30, carryForward: false, encashable: false },
    ]);

    const [leaveApplications, setLeaveApplications] = useState([
        { id: 1, empCode: 'EMP0041', name: 'Sunita Patil', leaveType: 'Casual Leave (CL)', from: '07/10/2026', to: '08/10/2026', days: 2, reason: 'Family Function in Satara', status: 'APPROVED' },
        { id: 2, empCode: 'EMP0062', name: 'Sneha Kulkarni', leaveType: 'Sick Leave (SL)', from: '09/10/2026', to: '10/10/2026', days: 2, reason: 'Viral Fever & Medical Rest', status: 'PENDING' },
        { id: 3, empCode: 'EMP0035', name: 'Santosh Sawant', leaveType: 'Privilege Leave (PL)', from: '15/10/2026', to: '18/10/2026', days: 4, reason: 'Personal Travel', status: 'PENDING' },
    ]);
    const [applyLeaveForm, setApplyLeaveForm] = useState({ empCode: 'EMP0014', leaveType: 'CL', from: '', to: '', reason: '' });

    // ==========================================
    // 10 & 11: ORGANIZATION & DEPARTMENT MASTER
    // ==========================================
    const [organizations, setOrganizations] = useState([
        { id: 1, orgCode: 'ORG-01', orgName: 'Reliable Associates Insurance Brokers Pvt. Ltd.', regNo: 'U66010PN2018PTC178942', cin: 'CIN991204', branchesCount: 18, headOffice: 'Baramati Hub, Pune', status: 'ACTIVE' },
        { id: 2, orgCode: 'ORG-02', orgName: 'Reliable Associates Finserv Network', regNo: 'U67190PN2020PTC192314', cin: 'CIN993412', branchesCount: 8, headOffice: 'Mumbai Corporate Office', status: 'ACTIVE' },
    ]);

    const [departments, setDepartments] = useState([
        { id: 1, code: 'DEPT-01', name: 'Management', head: 'Shekharu S. Lab', totalStaff: 4, budgetAllocation: '₹ 8.5L / mo' },
        { id: 2, code: 'DEPT-02', name: 'Operations & Policy Issuance', head: 'Vinayak K. Kadam', totalStaff: 28, budgetAllocation: '₹ 14.2L / mo' },
        { id: 3, code: 'DEPT-03', name: 'Accounts & Finance', head: 'Sunita Ravindra Patil', totalStaff: 9, budgetAllocation: '₹ 6.8L / mo' },
        { id: 4, code: 'DEPT-04', name: 'Underwriting & Risk', head: 'Sneha Kulkarni', totalStaff: 11, budgetAllocation: '₹ 7.4L / mo' },
        { id: 5, code: 'DEPT-05', name: 'POSP & Agency Development', head: 'Rameshwar Jadhav', totalStaff: 14, budgetAllocation: '₹ 9.1L / mo' },
        { id: 6, code: 'DEPT-06', name: 'Telecalling & Renewals', head: 'Santosh Sawant', totalStaff: 16, budgetAllocation: '₹ 5.6L / mo' },
    ]);

    // ==========================================
    // 13 & 14: EMPLOYEE ADVANCE STATE
    // ==========================================
    const [employeeAdvances, setEmployeeAdvances] = useState([
        { id: 1, empCode: 'EMP0059', name: 'Rameshwar Jadhav', advanceAmount: 30000, requestDate: '15/09/2026', emiCount: 3, emiAmount: 10000, recoveredAmount: 10000, balance: 20000, status: 'ACTIVE' },
        { id: 2, empCode: 'EMP0062', name: 'Sneha Kulkarni', advanceAmount: 15000, requestDate: '01/08/2026', emiCount: 3, emiAmount: 5000, recoveredAmount: 10000, balance: 5000, status: 'ACTIVE' },
        { id: 3, empCode: 'EMP0028', name: 'Vinayak Kadam', advanceAmount: 50000, requestDate: '10/05/2026', emiCount: 5, emiAmount: 10000, recoveredAmount: 50000, balance: 0, status: 'CLOSED' },
    ]);
    const [advanceForm, setAdvanceForm] = useState({ empCode: 'EMP0014', advanceAmount: '', emiCount: '3', reason: '' });

    // ==========================================
    // 15: DESIGNATION MASTER
    // ==========================================
    const [designations, setDesignations] = useState([
        { id: 1, code: 'DESG-01', title: 'Branch Administrator', department: 'Management', grade: 'M-1', reportingTo: 'Managing Director' },
        { id: 2, code: 'DESG-02', title: 'Branch Manager', department: 'Operations', grade: 'M-2', reportingTo: 'State Operations Head' },
        { id: 3, code: 'DESG-03', title: 'Senior Underwriting Officer', department: 'Underwriting', grade: 'L-1', reportingTo: 'Chief Underwriter' },
        { id: 4, code: 'DESG-04', title: 'Senior Accountant', department: 'Accounts', grade: 'L-2', reportingTo: 'Finance Controller' },
        { id: 5, code: 'DESG-05', title: 'POSP Relationship Manager', department: 'Sales', grade: 'L-2', reportingTo: 'Branch Manager' },
    ]);

    const getActiveTitle = () => {
        const found = tabs.find(t => t.id === activeTab);
        return found ? found.label : 'HR Module';
    };

    const getActiveDesc = () => {
        switch (activeTab) {
            case 'executive-attendance': return 'Review senior executive and management daily check-in logs and duty hours.';
            case 'attendance': return 'Daily biometric and web check-in logs, timings, working hours, and presence tracking.';
            case 'salary-process': return 'Calculate monthly compensation, allowances, deductions, and run payroll approval cycles.';
            case 'employee-payment': return 'Direct bank disbursement status, NEFT/RTGS transaction reference logs, and payout batches.';
            case 'holiday-master': return 'Manage corporate holiday calendar, national festivals, and optional holidays.';
            case 'employee-master': return 'Full employee records database, payroll bands, joining details, and departmental mappings.';
            case 'view-employee': return 'Directory view of all active employees across branches with search and quick actions.';
            case 'leave-management': return 'Review, approve, or reject employee leave requests and duty absences.';
            case 'leave-type': return 'Configure leave categories, annual quotas, carry-forward policies, and encashment terms.';
            case 'organization-master': return 'Maintain legal corporate entities, CIN, registration details, and central branches.';
            case 'department-master': return 'Define organizational departments, functional heads, and budgetary allocations.';
            case 'salary-slip': return 'Generate and preview monthly payslips with earnings and statutory deductions breakdown.';
            case 'employee-advance': return 'Process salary advance requests, approve disbursement, and schedule EMI recoveries.';
            case 'view-employee-advance': return 'Audit log of all issued employee advances, repayment status, and recovery balances.';
            case 'designation-master': return 'Corporate job designations, functional roles, reporting hierarchy, and grade bands.';
            case 'apply-leave': return 'Submit leave request applications for review and manager approval.';
            case 'leave-report': return 'Consolidated employee leave balance sheets, utilization trends, and absent days report.';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen">
            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <PageHeader
                title={`HR Module — ${getActiveTitle()}`}
                description={getActiveDesc()}
                action={
                    activeTab === 'salary-process' ? (
                        <button
                            onClick={() => showToast('Payroll calculation for September 2026 executed successfully!')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                        >
                            <DollarSign size={16} /> Process Payroll
                        </button>
                    ) : activeTab === 'holiday-master' ? (
                        <button
                            onClick={() => setModalType('HOLIDAY')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                        >
                            <Plus size={16} /> Add Holiday
                        </button>
                    ) : activeTab === 'apply-leave' ? (
                        <button
                            onClick={() => setModalType('APPLY_LEAVE')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                        >
                            <Plus size={16} /> Submit Leave Request
                        </button>
                    ) : activeTab === 'employee-advance' ? (
                        <button
                            onClick={() => setModalType('ADVANCE')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                        >
                            <Plus size={16} /> Request Advance
                        </button>
                    ) : (
                        <button
                            onClick={() => showToast('HR data exported as CSV report')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                        >
                            <Download size={16} /> Export View
                        </button>
                    )
                }
            />

            {/* Horizontal Tabs with scroll */}
            <div className="mb-6 rounded-xl border border-brand-border bg-white shadow-sm overflow-hidden">
                <UnderlineTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </div>

            {/* 1 & 2: ATTENDANCE & EXECUTIVE ATTENDANCE */}
            {(activeTab === 'attendance' || activeTab === 'executive-attendance') && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs font-semibold text-slate-500 uppercase">Total Present</div>
                            <div className="text-2xl font-bold text-slate-900 mt-1">58 <span className="text-xs text-emerald-600 font-normal">/ 64 Staff</span></div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs font-semibold text-slate-500 uppercase">On Leave</div>
                            <div className="text-2xl font-bold text-amber-600 mt-1">4</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs font-semibold text-slate-500 uppercase">Late Arrivals</div>
                            <div className="text-2xl font-bold text-rose-600 mt-1">2</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs font-semibold text-slate-500 uppercase">Average Work Hours</div>
                            <div className="text-2xl font-bold text-blue-600 mt-1">8h 45m</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search employee name, code, branch..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>
                            <button onClick={() => showToast('Attendance logs synced with biometric device')} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
                                <RefreshCw size={14} /> Sync Device
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">EMP CODE</th>
                                        <th className="py-3.5 px-6">NAME</th>
                                        <th className="py-3.5 px-6">DESIGNATION</th>
                                        <th className="py-3.5 px-6">BRANCH</th>
                                        <th className="py-3.5 px-6">DATE</th>
                                        <th className="py-3.5 px-6">PUNCH IN</th>
                                        <th className="py-3.5 px-6">PUNCH OUT</th>
                                        <th className="py-3.5 px-6 text-center">DURATION</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {attendanceLogs
                                        .filter(a => !searchQuery || a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.empCode.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(a => (
                                            <tr key={a.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono text-xs text-blue-700 font-medium">{a.empCode}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{a.name}</td>
                                                <td className="py-4 px-6 text-slate-600">{a.designation}</td>
                                                <td className="py-4 px-6 text-xs font-medium text-slate-700">{a.branch}</td>
                                                <td className="py-4 px-6 text-xs text-slate-500">{a.date}</td>
                                                <td className="py-4 px-6 font-mono text-xs font-semibold text-emerald-700">{a.punchIn}</td>
                                                <td className="py-4 px-6 font-mono text-xs font-semibold text-slate-700">{a.punchOut}</td>
                                                <td className="py-4 px-6 text-center text-xs font-medium text-slate-600">{a.workHours}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${a.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' : a.status === 'LATE' ? 'bg-amber-100 text-amber-800' : a.status === 'HALF DAY' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                                                        {a.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 3: SALARY PROCESS */}
            {activeTab === 'salary-process' && (
                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-slate-700">Payroll Cycle:</span>
                            <select className="px-3.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium">
                                <option>September 2026</option>
                                <option>August 2026</option>
                                <option>July 2026</option>
                            </select>
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Processed: <strong className="text-slate-800">4 / 5 Employees</strong>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">EMP CODE</th>
                                        <th className="py-3.5 px-6">EMPLOYEE NAME</th>
                                        <th className="py-3.5 px-6">CYCLE</th>
                                        <th className="py-3.5 px-6 text-right">BASIC PAY</th>
                                        <th className="py-3.5 px-6 text-right">HRA</th>
                                        <th className="py-3.5 px-6 text-right">ALLOWANCES</th>
                                        <th className="py-3.5 px-6 text-right">DEDUCTIONS</th>
                                        <th className="py-3.5 px-6 text-right">NET SALARY</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {salaryRecords.map(s => (
                                        <tr key={s.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-mono text-xs text-blue-700 font-medium">{s.empCode}</td>
                                            <td className="py-4 px-6 font-semibold text-slate-900">{s.name}</td>
                                            <td className="py-4 px-6 text-xs text-slate-500">{s.month}</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs">₹ {s.basic.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs">₹ {s.hra.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs">₹ {s.allowances.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs text-rose-600">-₹ {s.deductions.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-right font-mono text-sm font-bold text-emerald-700">₹ {s.netSalary.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${s.status === 'PROCESSED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 4: EMPLOYEE PAYMENT */}
            {activeTab === 'employee-payment' && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">BATCH ID</th>
                                        <th className="py-3.5 px-6">TOTAL EMPLOYEES</th>
                                        <th className="py-3.5 px-6">TOTAL AMOUNT</th>
                                        <th className="py-3.5 px-6">PAYMENT DATE</th>
                                        <th className="py-3.5 px-6">DISBURSEMENT MODE</th>
                                        <th className="py-3.5 px-6">BANK</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {paymentDisbursements.map(p => (
                                        <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-mono text-xs font-semibold text-blue-700">{p.batchId}</td>
                                            <td className="py-4 px-6 font-medium text-slate-800">{p.totalEmployees} Employees</td>
                                            <td className="py-4 px-6 font-bold text-slate-900">{p.totalAmount}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{p.payDate}</td>
                                            <td className="py-4 px-6 text-xs font-medium text-slate-700">{p.mode}</td>
                                            <td className="py-4 px-6 text-xs font-semibold text-slate-800">{p.bank}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button onClick={() => showToast(`Payment slip generated for batch ${p.batchId}`)} className="text-xs font-semibold text-blue-600 hover:underline">
                                                    Download Voucher
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 5: HOLIDAY MASTER */}
            {activeTab === 'holiday-master' && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">OCCASION / FESTIVAL</th>
                                        <th className="py-3.5 px-6">DATE</th>
                                        <th className="py-3.5 px-6">DAY OF WEEK</th>
                                        <th className="py-3.5 px-6 text-center">TYPE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {holidays.map(h => (
                                        <tr key={h.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-slate-900">{h.occasion}</td>
                                            <td className="py-4 px-6 font-mono text-xs text-blue-700 font-medium">{h.date}</td>
                                            <td className="py-4 px-6 text-slate-600">{h.day}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`px-2.5 py-0.5 rounded text-xs font-semibold ${h.type === 'MANDATORY' ? 'bg-blue-50 text-blue-700' : h.type === 'NATIONAL' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                                                    {h.type}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${h.status === 'UPCOMING' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}>
                                                    {h.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <button onClick={() => { setHolidays(prev => prev.filter(x => x.id !== h.id)); showToast(`Holiday ${h.occasion} removed`); }} className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 6 & 7: EMPLOYEE MASTER & VIEW EMPLOYEE */}
            {(activeTab === 'employee-master' || activeTab === 'view-employee') && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search employee code, name, designation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Total Records: <strong className="text-slate-800">{employees.length}</strong>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">EMP CODE</th>
                                        <th className="py-3.5 px-6">FULL NAME</th>
                                        <th className="py-3.5 px-6">DESIGNATION</th>
                                        <th className="py-3.5 px-6">DEPARTMENT</th>
                                        <th className="py-3.5 px-6">BRANCH</th>
                                        <th className="py-3.5 px-6">CONTACT DETAILS</th>
                                        <th className="py-3.5 px-6">JOINING DATE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {employees
                                        .filter(e => !searchQuery || e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.empCode.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(e => (
                                            <tr key={e.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono text-xs text-blue-700 font-medium">{e.empCode}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{e.name}</td>
                                                <td className="py-4 px-6 text-slate-700 font-medium">{e.designation}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">{e.department}</span>
                                                </td>
                                                <td className="py-4 px-6 text-slate-700">{e.branch}</td>
                                                <td className="py-4 px-6">
                                                    <div className="text-xs font-medium text-slate-800">{e.mobile}</div>
                                                    <div className="text-[11px] text-slate-400">{e.email}</div>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-600">{e.doj}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                        {e.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 8, 16, 17: LEAVE MANAGEMENT, APPLY LEAVE, LEAVE REPORT */}
            {(activeTab === 'leave-management' || activeTab === 'apply-leave' || activeTab === 'leave-report') && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">Leave Applications & Approval Queue</h4>
                            <button onClick={() => setModalType('APPLY_LEAVE')} className="px-3 py-1.5 bg-brand-primary text-white rounded-lg text-xs font-semibold hover:bg-blue-700">
                                + Apply Leave
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">EMP CODE</th>
                                        <th className="py-3.5 px-6">EMPLOYEE NAME</th>
                                        <th className="py-3.5 px-6">LEAVE TYPE</th>
                                        <th className="py-3.5 px-6">FROM</th>
                                        <th className="py-3.5 px-6">TO</th>
                                        <th className="py-3.5 px-6 text-center">DAYS</th>
                                        <th className="py-3.5 px-6">REASON</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {leaveApplications.map(l => (
                                        <tr key={l.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-mono text-xs text-blue-700 font-medium">{l.empCode}</td>
                                            <td className="py-4 px-6 font-semibold text-slate-900">{l.name}</td>
                                            <td className="py-4 px-6 text-slate-700 font-medium">{l.leaveType}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{l.from}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{l.to}</td>
                                            <td className="py-4 px-6 text-center font-bold text-slate-800">{l.days}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{l.reason}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${l.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                    {l.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                {l.status === 'PENDING' ? (
                                                    <div className="inline-flex gap-1.5">
                                                        <button onClick={() => { setLeaveApplications(prev => prev.map(x => x.id === l.id ? { ...x, status: 'APPROVED' } : x)); showToast(`Leave for ${l.name} approved.`); }} className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded">
                                                            Approve
                                                        </button>
                                                        <button onClick={() => { setLeaveApplications(prev => prev.map(x => x.id === l.id ? { ...x, status: 'REJECTED' } : x)); showToast(`Leave for ${l.name} rejected.`); }} className="px-2.5 py-1 text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 rounded">
                                                            Reject
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-slate-400 font-medium">Done</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 9: LEAVE TYPE */}
            {activeTab === 'leave-type' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">LEAVE CODE</th>
                                    <th className="py-3.5 px-6">LEAVE NAME</th>
                                    <th className="py-3.5 px-6 text-center">DAYS PER YEAR</th>
                                    <th className="py-3.5 px-6 text-center">CARRY FORWARD</th>
                                    <th className="py-3.5 px-6 text-center">ENCASHABLE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {leaveTypes.map(lt => (
                                    <tr key={lt.id} className="hover:bg-blue-50/40 transition-colors">
                                        <td className="py-4 px-6 font-mono font-medium text-blue-700 text-xs">{lt.code}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-900">{lt.name}</td>
                                        <td className="py-4 px-6 text-center font-bold text-slate-800">{lt.daysPerYear}</td>
                                        <td className="py-4 px-6 text-center">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${lt.carryForward ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {lt.carryForward ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${lt.encashable ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                                {lt.encashable ? 'Yes' : 'No'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 10: ORGANIZATION MASTER */}
            {activeTab === 'organization-master' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">CODE</th>
                                    <th className="py-3.5 px-6">ORGANIZATION LEGAL NAME</th>
                                    <th className="py-3.5 px-6">REGISTRATION / ROC NO</th>
                                    <th className="py-3.5 px-6">CIN NO</th>
                                    <th className="py-3.5 px-6">HEAD OFFICE</th>
                                    <th className="py-3.5 px-6 text-center">BRANCHES</th>
                                    <th className="py-3.5 px-6 text-center">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {organizations.map(org => (
                                    <tr key={org.id} className="hover:bg-blue-50/40 transition-colors">
                                        <td className="py-4 px-6 font-mono font-medium text-blue-700 text-xs">{org.orgCode}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-900">{org.orgName}</td>
                                        <td className="py-4 px-6 font-mono text-xs text-slate-600">{org.regNo}</td>
                                        <td className="py-4 px-6 font-mono text-xs text-slate-600">{org.cin}</td>
                                        <td className="py-4 px-6 text-xs text-slate-700">{org.headOffice}</td>
                                        <td className="py-4 px-6 text-center font-bold text-slate-800">{org.branchesCount}</td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                {org.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 11: DEPARTMENT MASTER */}
            {activeTab === 'department-master' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">CODE</th>
                                    <th className="py-3.5 px-6">DEPARTMENT NAME</th>
                                    <th className="py-3.5 px-6">FUNCTIONAL HEAD</th>
                                    <th className="py-3.5 px-6 text-center">STAFF COUNT</th>
                                    <th className="py-3.5 px-6 text-right">BUDGET ALLOCATION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {departments.map(d => (
                                    <tr key={d.id} className="hover:bg-blue-50/40 transition-colors">
                                        <td className="py-4 px-6 font-mono font-medium text-slate-600 text-xs">{d.code}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-900">{d.name}</td>
                                        <td className="py-4 px-6 text-slate-700 font-medium">{d.head}</td>
                                        <td className="py-4 px-6 text-center font-bold text-slate-800">{d.totalStaff}</td>
                                        <td className="py-4 px-6 text-right font-mono text-xs font-semibold text-slate-800">{d.budgetAllocation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* 12: SALARY SLIP */}
            {activeTab === 'salary-slip' && (
                <div className="space-y-4">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
                        <div className="border-b border-slate-200 pb-4 mb-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">Reliable Associates Insurance Brokers Pvt. Ltd.</h3>
                                <p className="text-xs text-slate-500">Salary Slip for Month: <strong>September 2026</strong></p>
                            </div>
                            <button onClick={() => showToast('Payslip downloaded as PDF')} className="px-3.5 py-1.5 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-blue-700 flex items-center gap-1.5">
                                <Download size={14} /> Download PDF
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs mb-6 bg-slate-50 p-4 rounded-xl">
                            <div><span className="text-slate-500">Employee Code:</span> <strong className="font-mono text-slate-800">EMP0014</strong></div>
                            <div><span className="text-slate-500">Employee Name:</span> <strong className="text-slate-800">Shekharu S. Lab</strong></div>
                            <div><span className="text-slate-500">Designation:</span> <strong className="text-slate-800">Branch Administrator</strong></div>
                            <div><span className="text-slate-500">Branch:</span> <strong className="text-slate-800">Baramati Head Office</strong></div>
                            <div><span className="text-slate-500">Bank Account:</span> <strong className="font-mono text-slate-800">AXIS BANK ••••••3344</strong></div>
                            <div><span className="text-slate-500">Total Working Days:</span> <strong className="text-slate-800">30 Days</strong></div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 text-sm">
                            {/* Earnings */}
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="bg-slate-100 px-4 py-2 font-bold text-xs text-slate-700 uppercase">Earnings</div>
                                <div className="p-3 space-y-2 text-xs">
                                    <div className="flex justify-between"><span>Basic Pay</span><span className="font-mono font-medium">₹ 45,000</span></div>
                                    <div className="flex justify-between"><span>House Rent Allowance (HRA)</span><span className="font-mono font-medium">₹ 18,000</span></div>
                                    <div className="flex justify-between"><span>Special Allowance</span><span className="font-mono font-medium">₹ 5,000</span></div>
                                    <div className="flex justify-between"><span>Conveyance Allowance</span><span className="font-mono font-medium">₹ 2,000</span></div>
                                    <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900">
                                        <span>Total Earnings (A)</span><span className="font-mono">₹ 70,000</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deductions */}
                            <div className="border border-slate-200 rounded-xl overflow-hidden">
                                <div className="bg-slate-100 px-4 py-2 font-bold text-xs text-slate-700 uppercase">Deductions</div>
                                <div className="p-3 space-y-2 text-xs">
                                    <div className="flex justify-between"><span>Provident Fund (PF)</span><span className="font-mono font-medium text-rose-600">₹ 1,800</span></div>
                                    <div className="flex justify-between"><span>Professional Tax (PT)</span><span className="font-mono font-medium text-rose-600">₹ 200</span></div>
                                    <div className="flex justify-between"><span>TDS / Income Tax</span><span className="font-mono font-medium text-rose-600">₹ 2,500</span></div>
                                    <div className="flex justify-between text-slate-400"><span>Advance Recovery</span><span className="font-mono">₹ 0</span></div>
                                    <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-rose-700">
                                        <span>Total Deductions (B)</span><span className="font-mono">₹ 4,500</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                            <span className="text-sm font-bold text-emerald-900">Net Take Home Pay (A - B):</span>
                            <span className="text-2xl font-black font-mono text-emerald-700">₹ 65,500</span>
                        </div>
                    </div>
                </div>
            )}

            {/* 13 & 14: EMPLOYEE ADVANCE & VIEW EMPLOYEE ADVANCE */}
            {(activeTab === 'employee-advance' || activeTab === 'view-employee-advance') && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">Salary Advance Records & EMI Recovery</h4>
                            <button onClick={() => setModalType('ADVANCE')} className="px-3 py-1.5 bg-brand-primary text-white rounded-lg text-xs font-semibold hover:bg-blue-700">
                                + New Advance Request
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">EMP CODE</th>
                                        <th className="py-3.5 px-6">EMPLOYEE NAME</th>
                                        <th className="py-3.5 px-6 text-right">ADVANCE AMOUNT</th>
                                        <th className="py-3.5 px-6">REQUEST DATE</th>
                                        <th className="py-3.5 px-6 text-center">EMI MONTHS</th>
                                        <th className="py-3.5 px-6 text-right">EMI / MONTH</th>
                                        <th className="py-3.5 px-6 text-right">RECOVERED</th>
                                        <th className="py-3.5 px-6 text-right">BALANCE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {employeeAdvances.map(a => (
                                        <tr key={a.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-mono text-xs text-blue-700 font-medium">{a.empCode}</td>
                                            <td className="py-4 px-6 font-semibold text-slate-900">{a.name}</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs font-bold text-slate-900">₹ {a.advanceAmount.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{a.requestDate}</td>
                                            <td className="py-4 px-6 text-center text-xs font-semibold text-slate-700">{a.emiCount} Mos</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs">₹ {a.emiAmount.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs text-emerald-700 font-medium">₹ {a.recoveredAmount.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs text-rose-700 font-bold">₹ {a.balance.toLocaleString()}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${a.status === 'ACTIVE' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                                                    {a.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 15: DESIGNATION MASTER */}
            {activeTab === 'designation-master' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                    <th className="py-3.5 px-6">CODE</th>
                                    <th className="py-3.5 px-6">DESIGNATION TITLE</th>
                                    <th className="py-3.5 px-6">DEPARTMENT</th>
                                    <th className="py-3.5 px-6 text-center">GRADE BAND</th>
                                    <th className="py-3.5 px-6">REPORTING AUTHORITY</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {designations.map(d => (
                                    <tr key={d.id} className="hover:bg-blue-50/40 transition-colors">
                                        <td className="py-4 px-6 font-mono text-xs text-slate-600 font-medium">{d.code}</td>
                                        <td className="py-4 px-6 font-semibold text-slate-900">{d.title}</td>
                                        <td className="py-4 px-6 text-slate-700 font-medium">{d.department}</td>
                                        <td className="py-4 px-6 text-center">
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-semibold text-xs">{d.grade}</span>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600">{d.reportingTo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODALS */}
            {/* Modal: Add Holiday */}
            {modalType === 'HOLIDAY' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-base">Add Calendar Holiday</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setHolidays([
                                {
                                    id: Date.now(),
                                    occasion: holidayForm.occasion,
                                    date: holidayForm.date,
                                    day: holidayForm.day,
                                    type: holidayForm.type as any,
                                    status: 'UPCOMING'
                                },
                                ...holidays
                            ]);
                            showToast(`Holiday ${holidayForm.occasion} created!`);
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Occasion / Festival</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Maharashtra Day"
                                    value={holidayForm.occasion}
                                    onChange={(e) => setHolidayForm({ ...holidayForm, occasion: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={holidayForm.date}
                                        onChange={(e) => setHolidayForm({ ...holidayForm, date: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Type</label>
                                    <select
                                        value={holidayForm.type}
                                        onChange={(e) => setHolidayForm({ ...holidayForm, type: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    >
                                        <option value="MANDATORY">MANDATORY</option>
                                        <option value="NATIONAL">NATIONAL</option>
                                        <option value="OPTIONAL">OPTIONAL</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Add Holiday</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Apply Leave */}
            {modalType === 'APPLY_LEAVE' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-base">Submit Leave Request</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setLeaveApplications([
                                {
                                    id: Date.now(),
                                    empCode: applyLeaveForm.empCode,
                                    name: 'Shekharu Lab',
                                    leaveType: applyLeaveForm.leaveType,
                                    from: applyLeaveForm.from,
                                    to: applyLeaveForm.to,
                                    days: 2,
                                    reason: applyLeaveForm.reason,
                                    status: 'PENDING'
                                },
                                ...leaveApplications
                            ]);
                            showToast('Leave application submitted for approval.');
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Leave Type</label>
                                <select
                                    value={applyLeaveForm.leaveType}
                                    onChange={(e) => setApplyLeaveForm({ ...applyLeaveForm, leaveType: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                >
                                    <option value="Casual Leave (CL)">Casual Leave (CL)</option>
                                    <option value="Sick Leave (SL)">Sick Leave (SL)</option>
                                    <option value="Privilege Leave (PL)">Privilege Leave (PL)</option>
                                    <option value="Loss of Pay (LOP)">Loss of Pay (LOP)</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">From Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={applyLeaveForm.from}
                                        onChange={(e) => setApplyLeaveForm({ ...applyLeaveForm, from: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">To Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={applyLeaveForm.to}
                                        onChange={(e) => setApplyLeaveForm({ ...applyLeaveForm, to: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Reason for Leave</label>
                                <textarea
                                    required
                                    rows={2}
                                    placeholder="Enter reason..."
                                    value={applyLeaveForm.reason}
                                    onChange={(e) => setApplyLeaveForm({ ...applyLeaveForm, reason: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Request Advance */}
            {modalType === 'ADVANCE' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-base">New Salary Advance Request</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const amt = Number(advanceForm.advanceAmount);
                            const emiMonths = Number(advanceForm.emiCount);
                            setEmployeeAdvances([
                                {
                                    id: Date.now(),
                                    empCode: advanceForm.empCode,
                                    name: 'Shekharu Lab',
                                    advanceAmount: amt,
                                    requestDate: new Date().toLocaleDateString('en-GB'),
                                    emiCount: emiMonths,
                                    emiAmount: Math.round(amt / emiMonths),
                                    recoveredAmount: 0,
                                    balance: amt,
                                    status: 'ACTIVE'
                                },
                                ...employeeAdvances
                            ]);
                            showToast(`Advance request of ₹ ${amt.toLocaleString()} submitted.`);
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Advance Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="e.g. 25000"
                                    value={advanceForm.advanceAmount}
                                    onChange={(e) => setAdvanceForm({ ...advanceForm, advanceAmount: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">EMI Repayment Tenure</label>
                                <select
                                    value={advanceForm.emiCount}
                                    onChange={(e) => setAdvanceForm({ ...advanceForm, emiCount: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                >
                                    <option value="1">1 Month (Full Deduct)</option>
                                    <option value="2">2 Months</option>
                                    <option value="3">3 Months</option>
                                    <option value="5">5 Months</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Reason for Advance</label>
                                <textarea
                                    required
                                    rows={2}
                                    placeholder="Medical / Personal requirement..."
                                    value={advanceForm.reason}
                                    onChange={(e) => setAdvanceForm({ ...advanceForm, reason: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Submit Advance</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HrModule;
