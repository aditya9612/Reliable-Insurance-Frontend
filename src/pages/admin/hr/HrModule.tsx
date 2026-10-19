import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import { TabItem } from '../../../components/tabs/UnderlineTabs';
import ExecutiveAttendanceTab from './ExecutiveAttendanceTab';
import StaffAttendanceTab from './StaffAttendanceTab';
import HolidayMasterTab from './HolidayMasterTab';
import EmployeeMasterTab from './EmployeeMasterTab';
import ViewEmployeeTab from './ViewEmployeeTab';
import SalaryProcessTab from './SalaryProcessTab';
import EmployeePaymentTab from './EmployeePaymentTab';
import SalarySlipTab from './SalarySlipTab';
import EmployeeAdvanceTab from './EmployeeAdvanceTab';
import ViewEmployeeAdvanceTab from './ViewEmployeeAdvanceTab';
import LeaveManagementTab from './LeaveManagementTab';
import LeaveTypeTab from './LeaveTypeTab';
import ApplyLeaveTab from './ApplyLeaveTab';
import LeaveReportTab from './LeaveReportTab';
import OrganizationMasterTab from './OrganizationMasterTab';
import DepartmentMasterTab from './DepartmentMasterTab';
import DesignationMasterTab from './DesignationMasterTab';
import {
    Search, Plus, Edit2, Trash2, X, CheckCircle2, Clock, Calendar,
    DollarSign, CreditCard, Building, User, Users, FileText, Check,
    Download, AlertCircle, ArrowUpRight, ShieldCheck, RefreshCw, Send,
    Eye, Filter, Printer
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

export interface HrCategory {
    id: string;
    label: string;
    icon: React.ElementType;
    defaultTab: HrSubTab;
    tabs: TabItem[];
}

export const hrCategories: HrCategory[] = [
    {
        id: 'attendance',
        label: 'Attendance',
        icon: Clock,
        defaultTab: 'executive-attendance',
        tabs: [
            { id: 'executive-attendance', label: 'Executive Attendance' },
            { id: 'attendance', label: 'Attendance' },
            { id: 'holiday-master', label: 'Holiday Master' },
        ]
    },
    {
        id: 'employee',
        label: 'Employee Master',
        icon: Users,
        defaultTab: 'employee-master',
        tabs: [
            { id: 'employee-master', label: 'Employee Master' },
            { id: 'view-employee', label: 'View Employee' },
        ]
    },
    {
        id: 'payroll',
        label: 'Salary & Payroll',
        icon: DollarSign,
        defaultTab: 'salary-process',
        tabs: [
            { id: 'salary-process', label: 'Salary Process' },
            { id: 'employee-payment', label: 'Employee Payment' },
            { id: 'salary-slip', label: 'Salary Slip' },
        ]
    },
    {
        id: 'advance',
        label: 'Employee Advance',
        icon: CreditCard,
        defaultTab: 'employee-advance',
        tabs: [
            { id: 'employee-advance', label: 'Employee Advance' },
            { id: 'view-employee-advance', label: 'View Employee Advance' },
        ]
    },
    {
        id: 'leave',
        label: 'Leave Management',
        icon: Calendar,
        defaultTab: 'leave-management',
        tabs: [
            { id: 'leave-management', label: 'Leave Management' },
            { id: 'leave-type', label: 'Leave Type' },
            { id: 'apply-leave', label: 'Apply Leave' },
            { id: 'leave-report', label: 'Leave Report' },
        ]
    },
    {
        id: 'organization',
        label: 'Organization Master',
        icon: Building,
        defaultTab: 'organization-master',
        tabs: [
            { id: 'organization-master', label: 'Organization Master' },
            { id: 'department-master', label: 'Department Master' },
            { id: 'designation-master', label: 'Designation Master' },
        ]
    },
];

export const allHrTabs: TabItem[] = hrCategories.flatMap(c => c.tabs);

const HrModule: React.FC = () => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();

    const activeTab = (tab && allHrTabs.some(t => t.id === tab))
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

    const [leaveReports] = useState([
        { id: 1, empCode: 'EMP0014', name: 'Shekharu S. Lab', department: 'Management', quota: 40, taken: 4, balance: 36, lop: 0, utilization: '10%', status: 'HEALTHY' },
        { id: 2, empCode: 'EMP0028', name: 'Vinayak K. Kadam', department: 'Operations', quota: 40, taken: 6, balance: 34, lop: 0, utilization: '15%', status: 'HEALTHY' },
        { id: 3, empCode: 'EMP0035', name: 'Santosh Sawant', department: 'Operations', quota: 40, taken: 8, balance: 32, lop: 1, utilization: '20%', status: 'ATTENTION' },
        { id: 4, empCode: 'EMP0041', name: 'Sunita Ravindra Patil', department: 'Accounts', quota: 40, taken: 5, balance: 35, lop: 0, utilization: '12%', status: 'HEALTHY' },
        { id: 5, empCode: 'EMP0059', name: 'Rameshwar Jadhav', department: 'Operations', quota: 40, taken: 3, balance: 37, lop: 0, utilization: '8%', status: 'HEALTHY' },
        { id: 6, empCode: 'EMP0062', name: 'Sneha Mohan Kulkarni', department: 'Underwriting', quota: 40, taken: 7, balance: 33, lop: 0, utilization: '18%', status: 'HEALTHY' },
    ]);

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
    // 12: SALARY SLIP STATE & DATA
    // ==========================================
    const [selectedSlipEmpCode, setSelectedSlipEmpCode] = useState('EMP0014');
    const [selectedSlipMonth, setSelectedSlipMonth] = useState('September 2026');

    const salarySlipDataMap: Record<string, {
        empCode: string;
        name: string;
        designation: string;
        department: string;
        branch: string;
        bankName: string;
        bankAcc: string;
        pan: string;
        uan: string;
        doj: string;
        workingDays: number;
        paidDays: number;
        lopDays: number;
        basic: number;
        hra: number;
        specialAllowance: number;
        conveyance: number;
        medical: number;
        pf: number;
        pt: number;
        tds: number;
        advanceRecovery: number;
        amountInWords: string;
        txnRef: string;
    }> = {
        'EMP0014': {
            empCode: 'EMP0014',
            name: 'Shekharu S. Lab',
            designation: 'Branch Administrator',
            department: 'Management',
            branch: 'Baramati Head Office',
            bankName: 'Axis Bank',
            bankAcc: 'AXIS BANK ••••••3344',
            pan: 'ABCPL9912K',
            uan: '101299884411',
            doj: '12/04/2021',
            workingDays: 30,
            paidDays: 30,
            lopDays: 0,
            basic: 45000,
            hra: 18000,
            specialAllowance: 5000,
            conveyance: 2000,
            medical: 0,
            pf: 1800,
            pt: 200,
            tds: 2500,
            advanceRecovery: 0,
            amountInWords: 'Rupees Sixty-Five Thousand Five Hundred Only',
            txnRef: 'NEFT-AXIS-99214028',
        },
        'EMP0028': {
            empCode: 'EMP0028',
            name: 'Vinayak K. Kadam',
            designation: 'Branch Manager',
            department: 'Operations',
            branch: 'Chhatrapati Sambhajinagar',
            bankName: 'HDFC Bank',
            bankAcc: 'HDFC BANK ••••••8821',
            pan: 'BDCPK4419M',
            uan: '101299884422',
            doj: '01/08/2022',
            workingDays: 30,
            paidDays: 30,
            lopDays: 0,
            basic: 42000,
            hra: 16800,
            specialAllowance: 4200,
            conveyance: 2000,
            medical: 0,
            pf: 1800,
            pt: 200,
            tds: 2200,
            advanceRecovery: 0,
            amountInWords: 'Rupees Sixty Thousand Eight Hundred Only',
            txnRef: 'NEFT-HDFC-99214029',
        },
        'EMP0035': {
            empCode: 'EMP0035',
            name: 'Santosh Sawant',
            designation: 'Branch Manager',
            department: 'Operations',
            branch: 'Akluj Branch',
            bankName: 'ICICI Bank',
            bankAcc: 'ICICI BANK ••••••5512',
            pan: 'CKLPS8812R',
            uan: '101299884433',
            doj: '15/02/2022',
            workingDays: 30,
            paidDays: 29,
            lopDays: 1,
            basic: 38000,
            hra: 15200,
            specialAllowance: 3800,
            conveyance: 2000,
            medical: 0,
            pf: 1800,
            pt: 200,
            tds: 1800,
            advanceRecovery: 0,
            amountInWords: 'Rupees Fifty-Five Thousand Two Hundred Only',
            txnRef: 'NEFT-ICICI-99214030',
        },
        'EMP0041': {
            empCode: 'EMP0041',
            name: 'Sunita Ravindra Patil',
            designation: 'Senior Accountant',
            department: 'Accounts & Finance',
            branch: 'Pune Branch',
            bankName: 'State Bank of India',
            bankAcc: 'SBI ••••••7734',
            pan: 'DFGPS1234T',
            uan: '101299884444',
            doj: '10/11/2022',
            workingDays: 30,
            paidDays: 30,
            lopDays: 0,
            basic: 35000,
            hra: 14000,
            specialAllowance: 3500,
            conveyance: 1500,
            medical: 0,
            pf: 1800,
            pt: 200,
            tds: 1500,
            advanceRecovery: 0,
            amountInWords: 'Rupees Fifty Thousand Five Hundred Only',
            txnRef: 'NEFT-SBI-99214031',
        },
        'EMP0059': {
            empCode: 'EMP0059',
            name: 'Rameshwar Jadhav',
            designation: 'Operations Head',
            department: 'Operations',
            branch: 'Ahilyanagar Branch',
            bankName: 'Bank of Maharashtra',
            bankAcc: 'BOM ••••••1190',
            pan: 'ERTPJ9012K',
            uan: '101299884455',
            doj: '05/01/2023',
            workingDays: 30,
            paidDays: 30,
            lopDays: 0,
            basic: 36000,
            hra: 14400,
            specialAllowance: 3600,
            conveyance: 1800,
            medical: 0,
            pf: 1800,
            pt: 200,
            tds: 1600,
            advanceRecovery: 0,
            amountInWords: 'Rupees Fifty-Two Thousand Two Hundred Only',
            txnRef: 'NEFT-BOM-99214032',
        },
    };

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
        const found = allHrTabs.find(t => t.id === activeTab);
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
        <div className="w-full max-w-full flex flex-col space-y-5 min-w-0">
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
                            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[8px] text-[14px] font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            <DollarSign size={16} /> Process Payroll
                        </button>
                    ) : activeTab === 'holiday-master' ? (
                        <button
                            onClick={() => setModalType('HOLIDAY')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] text-[14px] font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            Add Holiday
                        </button>
                    ) : activeTab === 'apply-leave' || activeTab === 'leave-management' ? (
                        <button
                            onClick={() => setModalType('APPLY_LEAVE')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] text-[14px] font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            Submit Leave Request
                        </button>
                    ) : activeTab === 'employee-advance' || activeTab === 'view-employee-advance' ? (
                        <button
                            onClick={() => setModalType('ADVANCE')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] text-[14px] font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            Request Advance
                        </button>
                    ) : (
                        <button
                            onClick={() => showToast('HR data exported as CSV report')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-[8px] text-[14px] font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            <Download size={16} /> Export View
                        </button>
                    )
                }
            />

            {/* 2-Row Full-Width Sub-Tabs Navigation — Exact Policy Master UI */}
            <div className="bg-white rounded-2xl border border-brand-border p-3 space-y-2.5 shadow-sm w-full max-w-full">
                {/* Row 1: First 9 Tabs - Spreading Full Width with Separation Line */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 w-full border-b border-brand-border pb-2.5">
                    {allHrTabs.slice(0, 9).map((tabItem) => {
                        const isActive = activeTab === tabItem.id;
                        return (
                            <button
                                key={tabItem.id}
                                onClick={() => handleTabChange(tabItem.id)}
                                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${
                                    isActive
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                                }`}
                                title={tabItem.label}
                            >
                                <span className="truncate">{tabItem.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Row 2: Remaining 8 Tabs - Spreading Full Width */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 w-full">
                    {allHrTabs.slice(9).map((tabItem) => {
                        const isActive = activeTab === tabItem.id;
                        return (
                            <button
                                key={tabItem.id}
                                onClick={() => handleTabChange(tabItem.id)}
                                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${
                                    isActive
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                                }`}
                                title={tabItem.label}
                            >
                                <span className="truncate">{tabItem.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 1: EXECUTIVE ATTENDANCE */}
            {activeTab === 'executive-attendance' && (
                <ExecutiveAttendanceTab />
            )}

            {/* 2: ATTENDANCE */}
            {activeTab === 'attendance' && (
                <StaffAttendanceTab />
            )}

            {/* 3: SALARY PROCESS */}
            {activeTab === 'salary-process' && (
                <SalaryProcessTab />
            )}

            {/* 4: EMPLOYEE PAYMENT */}
            {activeTab === 'employee-payment' && (
                <EmployeePaymentTab />
            )}

            {/* 5: HOLIDAY MASTER */}
            {activeTab === 'holiday-master' && (
                <HolidayMasterTab />
            )}

            {/* 6: EMPLOYEE MASTER */}
            {activeTab === 'employee-master' && (
                <EmployeeMasterTab />
            )}

            {/* 7: VIEW EMPLOYEE */}
            {activeTab === 'view-employee' && (
                <ViewEmployeeTab />
            )}

            {/* 8: LEAVE MANAGEMENT */}
            {activeTab === 'leave-management' && (
                <LeaveManagementTab />
            )}

            {/* 16: APPLY LEAVE */}
            {activeTab === 'apply-leave' && (
                <ApplyLeaveTab />
            )}

            {/* 17: LEAVE REPORT */}
            {activeTab === 'leave-report' && (
                <LeaveReportTab />
            )}

            {/* 9: LEAVE TYPE */}
            {activeTab === 'leave-type' && (
                <LeaveTypeTab />
            )}

            {/* 10: ORGANIZATION MASTER */}
            {activeTab === 'organization-master' && (
                <OrganizationMasterTab />
            )}

            {/* 11: DEPARTMENT MASTER */}
            {activeTab === 'department-master' && (
                <DepartmentMasterTab />
            )}

            {/* 12: SALARY SLIP */}
            {activeTab === 'salary-slip' && (
                <SalarySlipTab />
            )}

            {/* 13: EMPLOYEE ADVANCE */}
            {activeTab === 'employee-advance' && (
                <EmployeeAdvanceTab />
            )}

            {/* 14: VIEW EMPLOYEE ADVANCE */}
            {activeTab === 'view-employee-advance' && (
                <ViewEmployeeAdvanceTab />
            )}

            {/* 15: DESIGNATION MASTER */}
            {activeTab === 'designation-master' && (
                <DesignationMasterTab />
            )}

            {/* MODALS */}
            {/* Modal: Add Holiday */}
            {modalType === 'HOLIDAY' && (
                <div className="fixed inset-0 z-[9999] bg-slate-900/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[12px] max-w-md w-full shadow-2xl border border-brand-border overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                            <h3 className="font-bold text-brand-navy text-base">Add Calendar Holiday</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-brand-muted hover:text-brand-navy rounded-[6px] cursor-pointer border-none bg-transparent">
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
                                <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">Occasion / Festival</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Maharashtra Day"
                                    value={holidayForm.occasion}
                                    onChange={(e) => setHolidayForm({ ...holidayForm, occasion: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={holidayForm.date}
                                        onChange={(e) => setHolidayForm({ ...holidayForm, date: e.target.value })}
                                        className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">Type</label>
                                    <select
                                        value={holidayForm.type}
                                        onChange={(e) => setHolidayForm({ ...holidayForm, type: e.target.value })}
                                        className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                    >
                                        <option value="MANDATORY">MANDATORY</option>
                                        <option value="NATIONAL">NATIONAL</option>
                                        <option value="OPTIONAL">OPTIONAL</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-brand-border text-brand-navy text-sm font-medium rounded-[8px] hover:bg-slate-50 cursor-pointer bg-white">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-[8px] hover:bg-[#1D4ED8] cursor-pointer border-none shadow-sm">Add Holiday</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Apply Leave */}
            {modalType === 'APPLY_LEAVE' && (
                <div className="fixed inset-0 z-[9999] bg-slate-900/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[12px] max-w-md w-full shadow-2xl border border-brand-border overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                            <h3 className="font-bold text-brand-navy text-base">Submit Leave Request</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-brand-muted hover:text-brand-navy rounded-[6px] cursor-pointer border-none bg-transparent">
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
                                <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">Leave Type</label>
                                <select
                                    value={applyLeaveForm.leaveType}
                                    onChange={(e) => setApplyLeaveForm({ ...applyLeaveForm, leaveType: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                >
                                    <option value="Casual Leave (CL)">Casual Leave (CL)</option>
                                    <option value="Sick Leave (SL)">Sick Leave (SL)</option>
                                    <option value="Privilege Leave (PL)">Privilege Leave (PL)</option>
                                    <option value="Loss of Pay (LOP)">Loss of Pay (LOP)</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">From Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={applyLeaveForm.from}
                                        onChange={(e) => setApplyLeaveForm({ ...applyLeaveForm, from: e.target.value })}
                                        className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">To Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={applyLeaveForm.to}
                                        onChange={(e) => setApplyLeaveForm({ ...applyLeaveForm, to: e.target.value })}
                                        className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">Reason for Leave</label>
                                <textarea
                                    required
                                    rows={2}
                                    placeholder="Enter reason..."
                                    value={applyLeaveForm.reason}
                                    onChange={(e) => setApplyLeaveForm({ ...applyLeaveForm, reason: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-brand-border text-brand-navy text-sm font-medium rounded-[8px] hover:bg-slate-50 cursor-pointer bg-white">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-[8px] hover:bg-[#1D4ED8] cursor-pointer border-none shadow-sm">Submit Request</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Request Advance */}
            {modalType === 'ADVANCE' && (
                <div className="fixed inset-0 z-[9999] bg-slate-900/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[12px] max-w-md w-full shadow-2xl border border-brand-border overflow-hidden">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                            <h3 className="font-bold text-brand-navy text-base">New Salary Advance Request</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-brand-muted hover:text-brand-navy rounded-[6px] cursor-pointer border-none bg-transparent">
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
                                <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">Advance Amount (₹)</label>
                                <input
                                    type="number"
                                    required
                                    placeholder="e.g. 25000"
                                    value={advanceForm.advanceAmount}
                                    onChange={(e) => setAdvanceForm({ ...advanceForm, advanceAmount: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">EMI Repayment Tenure</label>
                                <select
                                    value={advanceForm.emiCount}
                                    onChange={(e) => setAdvanceForm({ ...advanceForm, emiCount: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                >
                                    <option value="1">1 Month (Full Deduct)</option>
                                    <option value="2">2 Months</option>
                                    <option value="3">3 Months</option>
                                    <option value="5">5 Months</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-brand-navy uppercase mb-1">Reason for Advance</label>
                                <textarea
                                    required
                                    rows={2}
                                    placeholder="Medical / Personal requirement..."
                                    value={advanceForm.reason}
                                    onChange={(e) => setAdvanceForm({ ...advanceForm, reason: e.target.value })}
                                    className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-brand-border text-brand-navy text-sm font-medium rounded-[8px] hover:bg-slate-50 cursor-pointer bg-white">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-[8px] hover:bg-[#1D4ED8] cursor-pointer border-none shadow-sm">Submit Advance</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HrModule;
