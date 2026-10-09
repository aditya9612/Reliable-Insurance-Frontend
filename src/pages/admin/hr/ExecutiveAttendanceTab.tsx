import React, { useState, useMemo } from 'react';
import {
    Search, X, Download, RefreshCw, Calendar, Clock,
    CheckCircle2, AlertTriangle, UserCheck, UserX, PhoneCall,
    Mail, Eye, Bell, ChevronLeft, ChevronRight, FileSpreadsheet
} from 'lucide-react';

export type AttendanceMode = 'Executive Attendance' | 'Presenty' | 'Daily Attendance' | 'Not Sign In';

export interface ExecutiveAttendanceRecord {
    id: number;
    empCode: string;
    name: string;
    designation: string;
    branch: string;
    totalDays: number;
    presentDays: number;
    absentDays: number;
    leaveDays: number;
    lateDays: number;
    dutyHours: string;
    status: 'EXCELLENT' | 'GOOD' | 'ATTENTION' | 'POOR';
}

export interface DailyAttendanceRecord {
    id: number;
    empCode: string;
    name: string;
    designation: string;
    branch: string;
    date: string;
    punchIn: string;
    punchOut: string;
    workHours: string;
    overtime: string;
    deviceLocation: string;
    status: 'PRESENT' | 'LATE' | 'HALF DAY' | 'ON LEAVE';
}

export interface NotSignInRecord {
    id: number;
    empCode: string;
    name: string;
    department: string;
    designation: string;
    branch: string;
    mobile: string;
    email: string;
    shiftTime: string;
    lastActive: string;
}

const MONTHS = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

const INITIAL_EMPLOYEES = [
    { code: 'ALL', name: 'All Employees' },
    { code: 'EMP0008', name: 'ABHIJEET HARIBHAU KADAM' },
    { code: 'EMP0014', name: 'SHEKHARU S. LAB' },
    { code: 'EMP0028', name: 'VINAYAK K. KADAM' },
    { code: 'EMP0035', name: 'SANTOSH SAWANT' },
    { code: 'EMP0041', name: 'SUNITA RAVINDRA PATIL' },
    { code: 'EMP0059', name: 'RAMESHWAR JADHAV' },
    { code: 'EMP0062', name: 'SNEHA MOHAN KULKARNI' },
    { code: 'EMP0073', name: 'RAVINDRA APPASOBELANKE' },
    { code: 'EMP0085', name: 'SATISH DATTATRAY MORE' },
];

const INITIAL_EXECUTIVE_DATA: ExecutiveAttendanceRecord[] = [
    { id: 1, empCode: 'EMP0008', name: 'ABHIJEET HARIBHAU KADAM', designation: 'General Manager (Operations)', branch: 'BARAMATI', totalDays: 31, presentDays: 27, absentDays: 0, leaveDays: 4, lateDays: 1, dutyHours: '234h 15m', status: 'EXCELLENT' },
    { id: 2, empCode: 'EMP0014', name: 'SHEKHARU S. LAB', designation: 'Branch Administrator', branch: 'BARAMATI', totalDays: 31, presentDays: 26, absentDays: 1, leaveDays: 4, lateDays: 2, dutyHours: '228h 40m', status: 'EXCELLENT' },
    { id: 3, empCode: 'EMP0028', name: 'VINAYAK K. KADAM', designation: 'Branch Manager', branch: 'SAMBHAJINAGAR', totalDays: 31, presentDays: 25, absentDays: 1, leaveDays: 5, lateDays: 3, dutyHours: '215h 10m', status: 'GOOD' },
    { id: 4, empCode: 'EMP0035', name: 'SANTOSH SAWANT', designation: 'Senior Executive', branch: 'AKLUJ', totalDays: 31, presentDays: 24, absentDays: 2, leaveDays: 5, lateDays: 5, dutyHours: '202h 50m', status: 'ATTENTION' },
    { id: 5, empCode: 'EMP0041', name: 'SUNITA RAVINDRA PATIL', designation: 'Chief Accountant', branch: 'PUNE', totalDays: 31, presentDays: 26, absentDays: 0, leaveDays: 5, lateDays: 1, dutyHours: '220h 30m', status: 'EXCELLENT' },
    { id: 6, empCode: 'EMP0059', name: 'RAMESHWAR JADHAV', designation: 'Head of Operations', branch: 'AHILYANAGAR', totalDays: 31, presentDays: 27, absentDays: 0, leaveDays: 4, lateDays: 0, dutyHours: '238h 00m', status: 'EXCELLENT' },
    { id: 7, empCode: 'EMP0062', name: 'SNEHA MOHAN KULKARNI', designation: 'Chief Underwriter', branch: 'BARAMATI', totalDays: 31, presentDays: 23, absentDays: 2, leaveDays: 6, lateDays: 4, dutyHours: '198h 45m', status: 'GOOD' },
    { id: 8, empCode: 'EMP0073', name: 'RAVINDRA APPASOBELANKE', designation: 'Regional Audit Officer', branch: 'KOLHAPUR', totalDays: 31, presentDays: 25, absentDays: 1, leaveDays: 5, lateDays: 2, dutyHours: '219h 15m', status: 'GOOD' },
    { id: 9, empCode: 'EMP0085', name: 'SATISH DATTATRAY MORE', designation: 'Business Development Manager', branch: 'SATARA', totalDays: 31, presentDays: 22, absentDays: 4, leaveDays: 5, lateDays: 6, dutyHours: '188h 10m', status: 'ATTENTION' },
];

const INITIAL_DAILY_DATA: DailyAttendanceRecord[] = [
    { id: 1, empCode: 'EMP0008', name: 'ABHIJEET HARIBHAU KADAM', designation: 'General Manager', branch: 'BARAMATI', date: '09/10/2026', punchIn: '09:15 AM', punchOut: '06:45 PM', workHours: '9h 30m', overtime: '0h 30m', deviceLocation: 'Baramati HQ Bio-1', status: 'PRESENT' },
    { id: 2, empCode: 'EMP0014', name: 'SHEKHARU S. LAB', designation: 'Branch Admin', branch: 'BARAMATI', date: '09/10/2026', punchIn: '09:28 AM', punchOut: '06:35 PM', workHours: '9h 07m', overtime: '0h 07m', deviceLocation: 'Baramati HQ Bio-2', status: 'PRESENT' },
    { id: 3, empCode: 'EMP0028', name: 'VINAYAK K. KADAM', designation: 'Branch Manager', branch: 'SAMBHAJINAGAR', date: '09/10/2026', punchIn: '09:45 AM', punchOut: 'In Progress', workHours: 'In Progress', overtime: '—', deviceLocation: 'Sambhajinagar Bio-1', status: 'PRESENT' },
    { id: 4, empCode: 'EMP0035', name: 'SANTOSH SAWANT', designation: 'Branch Manager', branch: 'AKLUJ', date: '09/10/2026', punchIn: '10:18 AM', punchOut: 'In Progress', workHours: 'In Progress', overtime: '—', deviceLocation: 'Akluj Branch Bio', status: 'LATE' },
    { id: 5, empCode: 'EMP0041', name: 'SUNITA RAVINDRA PATIL', designation: 'Chief Accountant', branch: 'PUNE', date: '09/10/2026', punchIn: '—', punchOut: '—', workHours: '0h', overtime: '—', deviceLocation: '—', status: 'ON LEAVE' },
    { id: 6, empCode: 'EMP0059', name: 'RAMESHWAR JADHAV', designation: 'Operations Head', branch: 'AHILYANAGAR', date: '09/10/2026', punchIn: '09:10 AM', punchOut: '06:15 PM', workHours: '9h 05m', overtime: '0h 05m', deviceLocation: 'Ahilyanagar Bio-1', status: 'PRESENT' },
    { id: 7, empCode: 'EMP0062', name: 'SNEHA MOHAN KULKARNI', designation: 'Chief Underwriter', branch: 'BARAMATI', date: '09/10/2026', punchIn: '09:30 AM', punchOut: '01:45 PM', workHours: '4h 15m', overtime: '—', deviceLocation: 'Baramati HQ Bio-1', status: 'HALF DAY' },
    { id: 8, empCode: 'EMP0073', name: 'RAVINDRA APPASOBELANKE', designation: 'Audit Officer', branch: 'KOLHAPUR', date: '09/10/2026', punchIn: '09:20 AM', punchOut: '06:20 PM', workHours: '9h 00m', overtime: '—', deviceLocation: 'Kolhapur Bio-1', status: 'PRESENT' },
];

const INITIAL_NOT_SIGN_IN_DATA: NotSignInRecord[] = [
    { id: 1, empCode: 'EMP0041', name: 'SUNITA RAVINDRA PATIL', department: 'Accounts', designation: 'Chief Accountant', branch: 'PUNE', mobile: '9890123456', email: 's.patil@reliable.in', shiftTime: '09:30 AM - 06:30 PM', lastActive: 'Yesterday, 06:32 PM' },
    { id: 2, empCode: 'EMP0085', name: 'SATISH DATTATRAY MORE', department: 'Sales', designation: 'Business Development Manager', branch: 'SATARA', mobile: '9822003344', email: 'satish.more@reliable.in', shiftTime: '09:30 AM - 06:30 PM', lastActive: 'Yesterday, 07:10 PM' },
    { id: 3, empCode: 'EMP0092', name: 'PRASHANT VILAS DESHMUKH', department: 'Claims', designation: 'Survey Coordinator', branch: 'SOLAPUR', mobile: '9860112233', email: 'prashant.d@reliable.in', shiftTime: '10:00 AM - 07:00 PM', lastActive: 'Yesterday, 06:45 PM' },
    { id: 4, empCode: 'EMP0104', name: 'DIPAK ARUN GAWARE', department: 'Operations', designation: 'Field Executive', branch: 'BARAMATI', mobile: '9422998877', email: 'dipak.g@reliable.in', shiftTime: '09:30 AM - 06:30 PM', lastActive: '07/10/2026, 06:15 PM' },
];

const ExecutiveAttendanceTab: React.FC = () => {
    // Radio buttons: exactly matching screenshot
    const [selectedMode, setSelectedMode] = useState<AttendanceMode>('Executive Attendance');

    // Form inputs: Month, Year, Employee
    const [selectedMonth, setSelectedMonth] = useState('10');
    const [selectedYear, setSelectedYear] = useState('2026');
    const [selectedEmployee, setSelectedEmployee] = useState('ALL');

    // Search query
    const [searchQuery, setSearchQuery] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Selected record for details modal
    const [viewDetailModal, setViewDetailModal] = useState<any | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Triggered when "Show" button is clicked (Blue button)
    const handleShow = () => {
        setCurrentPage(1);
        const empObj = INITIAL_EMPLOYEES.find(e => e.code === selectedEmployee);
        const monthObj = MONTHS.find(m => m.value === selectedMonth);
        showToast(`Loaded ${selectedMode} for ${monthObj?.label || selectedMonth} ${selectedYear} (${empObj?.name || 'All Staff'})`);
    };

    // Filtered Executive Attendance Records
    const filteredExecutiveList = useMemo(() => {
        return INITIAL_EXECUTIVE_DATA.filter(item => {
            const matchesEmp = selectedEmployee === 'ALL' || item.empCode === selectedEmployee;
            const matchesSearch = !searchQuery.trim() ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.empCode.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.branch.toLowerCase().includes(searchQuery.toLowerCase().trim());
            return matchesEmp && matchesSearch;
        });
    }, [selectedEmployee, searchQuery]);

    // Filtered Daily Records
    const filteredDailyList = useMemo(() => {
        return INITIAL_DAILY_DATA.filter(item => {
            const matchesEmp = selectedEmployee === 'ALL' || item.empCode === selectedEmployee;
            const matchesSearch = !searchQuery.trim() ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.empCode.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.branch.toLowerCase().includes(searchQuery.toLowerCase().trim());
            return matchesEmp && matchesSearch;
        });
    }, [selectedEmployee, searchQuery]);

    // Filtered Not Sign In Records
    const filteredNotSignInList = useMemo(() => {
        return INITIAL_NOT_SIGN_IN_DATA.filter(item => {
            const matchesEmp = selectedEmployee === 'ALL' || item.empCode === selectedEmployee;
            const matchesSearch = !searchQuery.trim() ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.empCode.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
                item.branch.toLowerCase().includes(searchQuery.toLowerCase().trim());
            return matchesEmp && matchesSearch;
        });
    }, [selectedEmployee, searchQuery]);

    // Handle CSV Export (Orange/Amber button)
    const handleExportCSV = () => {
        let headers: string[] = [];
        let rows: any[][] = [];
        const monthLabel = MONTHS.find(m => m.value === selectedMonth)?.label || 'Month';

        if (selectedMode === 'Executive Attendance') {
            headers = ['SR. NO.', 'EMP CODE', 'EMPLOYEE NAME', 'DESIGNATION', 'BRANCH', 'TOTAL DAYS', 'PRESENT', 'ABSENT', 'LEAVE', 'LATE', 'DUTY HOURS', 'RATING'];
            rows = filteredExecutiveList.map((x, i) => [
                i + 1, `"${x.empCode}"`, `"${x.name}"`, `"${x.designation}"`, `"${x.branch}"`,
                x.totalDays, x.presentDays, x.absentDays, x.leaveDays, x.lateDays, `"${x.dutyHours}"`, x.status
            ]);
        } else if (selectedMode === 'Daily Attendance') {
            headers = ['SR. NO.', 'EMP CODE', 'EMPLOYEE NAME', 'BRANCH', 'DATE', 'PUNCH IN', 'PUNCH OUT', 'WORK HOURS', 'OVERTIME', 'LOCATION', 'STATUS'];
            rows = filteredDailyList.map((x, i) => [
                i + 1, `"${x.empCode}"`, `"${x.name}"`, `"${x.branch}"`, x.date, x.punchIn, x.punchOut, x.workHours, x.overtime, `"${x.deviceLocation}"`, x.status
            ]);
        } else if (selectedMode === 'Not Sign In') {
            headers = ['SR. NO.', 'EMP CODE', 'EMPLOYEE NAME', 'DEPARTMENT', 'BRANCH', 'MOBILE NUMBER', 'EMAIL', 'SHIFT TIMING', 'LAST ACTIVE'];
            rows = filteredNotSignInList.map((x, i) => [
                i + 1, `"${x.empCode}"`, `"${x.name}"`, `"${x.department}"`, `"${x.branch}"`, `"${x.mobile}"`, x.email, `"${x.shiftTime}"`, `"${x.lastActive}"`
            ]);
        } else {
            // Presenty
            headers = ['SR. NO.', 'EMP CODE', 'EMPLOYEE NAME', 'BRANCH', 'TOTAL DAYS', 'P', 'A', 'L', 'WO', 'PERCENTAGE'];
            rows = filteredExecutiveList.map((x, i) => [
                i + 1, `"${x.empCode}"`, `"${x.name}"`, `"${x.branch}"`, x.totalDays, x.presentDays, x.absentDays, x.leaveDays, 4,
                `${Math.round((x.presentDays / x.totalDays) * 100)}%`
            ]);
        }

        const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const link = document.createElement('a');
        link.href = encodeURI(csv);
        link.download = `reliable_${selectedMode.toLowerCase().replace(/\s+/g, '_')}_${monthLabel}_${selectedYear}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Exported ${selectedMode} (${rows.length} rows) to CSV`);
    };

    return (
        <div className="tab-transition-wrapper space-y-5 w-full min-w-0">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-[#0B203C] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* TOP CARD: EXACT UI FROM USER SCREENSHOT */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-7">
                {/* 1. Radio Buttons Row */}
                <div className="flex flex-wrap items-center gap-6 sm:gap-10 pb-5 border-b border-slate-100">
                    {/* Radio 1: Executive Attendance */}
                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input
                            type="radio"
                            name="attendanceType"
                            value="Executive Attendance"
                            checked={selectedMode === 'Executive Attendance'}
                            onChange={() => { setSelectedMode('Executive Attendance'); setCurrentPage(1); }}
                            className="w-4 h-4 text-brand-primary accent-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                        />
                        <span className={`text-[15px] font-bold tracking-wide transition-colors ${
                            selectedMode === 'Executive Attendance' ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                        }`}>
                            Executive Attendance
                        </span>
                    </label>

                    {/* Radio 2: Presenty */}
                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input
                            type="radio"
                            name="attendanceType"
                            value="Presenty"
                            checked={selectedMode === 'Presenty'}
                            onChange={() => { setSelectedMode('Presenty'); setCurrentPage(1); }}
                            className="w-4 h-4 text-brand-primary accent-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                        />
                        <span className={`text-[15px] font-bold tracking-wide transition-colors ${
                            selectedMode === 'Presenty' ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                        }`}>
                            Presenty
                        </span>
                    </label>

                    {/* Radio 3: Daily Attendance */}
                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input
                            type="radio"
                            name="attendanceType"
                            value="Daily Attendance"
                            checked={selectedMode === 'Daily Attendance'}
                            onChange={() => { setSelectedMode('Daily Attendance'); setCurrentPage(1); }}
                            className="w-4 h-4 text-brand-primary accent-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                        />
                        <span className={`text-[15px] font-bold tracking-wide transition-colors ${
                            selectedMode === 'Daily Attendance' ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                        }`}>
                            Daily Attendance
                        </span>
                    </label>

                    {/* Radio 4: Not Sign In */}
                    <label className="flex items-center gap-2 cursor-pointer select-none group">
                        <input
                            type="radio"
                            name="attendanceType"
                            value="Not Sign In"
                            checked={selectedMode === 'Not Sign In'}
                            onChange={() => { setSelectedMode('Not Sign In'); setCurrentPage(1); }}
                            className="w-4 h-4 text-brand-primary accent-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                        />
                        <span className={`text-[15px] font-bold tracking-wide transition-colors ${
                            selectedMode === 'Not Sign In' ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'
                        }`}>
                            Not Sign In
                        </span>
                    </label>
                </div>

                {/* 2. Form Row Below Radio Buttons matching screenshot */}
                <div className="pt-5 flex flex-wrap items-end gap-5 sm:gap-7">
                    {/* Month Dropdown */}
                    <div className="w-44">
                        <label className="block text-[14px] font-bold text-slate-900 mb-1.5">
                            Month
                        </label>
                        <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-[6px] text-sm text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                        >
                            <option value="">--Select Month--</option>
                            {MONTHS.map(m => (
                                <option key={m.value} value={m.value}>{m.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Year Input */}
                    <div className="w-36">
                        <label className="block text-[14px] font-bold text-slate-900 mb-1.5">
                            Year
                        </label>
                        <input
                            type="text"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            placeholder="Year"
                            className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-[6px] text-sm text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-mono font-medium"
                        />
                    </div>

                    {/* Employee Dropdown */}
                    <div className="flex-1 min-w-[260px] max-w-md">
                        <label className="block text-[14px] font-bold text-slate-900 mb-1.5">
                            Employee
                        </label>
                        <select
                            value={selectedEmployee}
                            onChange={(e) => setSelectedEmployee(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-[#CBD5E1] rounded-[6px] text-sm text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium uppercase"
                        >
                            {INITIAL_EMPLOYEES.map(emp => (
                                <option key={emp.code} value={emp.code}>
                                    {emp.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Action Buttons: Show (Blue) & Export (Amber) matching screenshot */}
                    <div className="flex items-center gap-3">
                        {/* Show Button (Blue Theme #00509d / bg-brand-primary) */}
                        <button
                            type="button"
                            onClick={handleShow}
                            className="px-8 py-2 bg-brand-primary hover:bg-[#00509d] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[90px] text-center"
                        >
                            Show
                        </button>

                        {/* Export Button (Orange / Amber #e59838) */}
                        <button
                            type="button"
                            onClick={handleExportCSV}
                            className="px-8 py-2 bg-[#e59838] hover:bg-[#d48729] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[90px] text-center"
                        >
                            Export
                        </button>
                    </div>
                </div>
            </div>

            {/* SEARCH AND SUMMARY BAR */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="relative w-full sm:w-96">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        placeholder="Search employee name, code, branch..."
                        className="w-full pl-5 pr-10 py-2.5 bg-white border border-[#CBD5E1] rounded-full text-[14px] text-slate-800 placeholder-[#94A3B8] shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-medium"
                    />
                    {searchQuery ? (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    ) : (
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <div className="px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 rounded-lg text-xs font-semibold text-brand-primary flex items-center gap-2">
                        <Clock size={14} />
                        <span>Mode: {selectedMode}</span>
                    </div>
                </div>
            </div>

            {/* DATA TABLE CONTAINER WITH BLUE THEME */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden flex flex-col w-full min-w-0">
                {/* Header status bar */}
                <div className="bg-blue-50/60 px-5 py-2.5 border-b border-brand-border flex items-center justify-between text-xs text-brand-navy">
                    <div className="flex items-center gap-2 font-medium">
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                        <span>
                            Displaying <strong>
                                {selectedMode === 'Executive Attendance' || selectedMode === 'Presenty' ? filteredExecutiveList.length :
                                 selectedMode === 'Daily Attendance' ? filteredDailyList.length : filteredNotSignInList.length}
                            </strong> records for {MONTHS.find(m => m.value === selectedMonth)?.label || 'Month'} {selectedYear}
                        </span>
                    </div>
                    <span className="text-[11px] text-brand-primary bg-white px-2.5 py-1 rounded border border-blue-200/80 font-medium">
                        Reliable Insurance ERP • HR & Executive Attendance
                    </span>
                </div>

                {/* Table Content According to Mode */}
                <div className="w-full overflow-x-auto min-w-0 erp-horizontal-scrollbar">
                    {/* MODE 1: EXECUTIVE ATTENDANCE */}
                    {selectedMode === 'Executive Attendance' && (
                        <table className="text-left border-collapse w-full min-w-[1050px] text-[13px]">
                            <thead>
                                <tr className="bg-brand-primary text-white font-bold text-[12px] tracking-wider uppercase border-b-2 border-blue-700 select-none">
                                    <th className="py-3.5 px-4 w-16 text-center border-r border-white/20 whitespace-nowrap">SR. NO.</th>
                                    <th className="py-3.5 px-4 w-32 border-r border-white/20 whitespace-nowrap">EMP CODE</th>
                                    <th className="py-3.5 px-4 w-64 border-r border-white/20 whitespace-nowrap">EMPLOYEE NAME</th>
                                    <th className="py-3.5 px-4 w-52 border-r border-white/20 whitespace-nowrap">DESIGNATION</th>
                                    <th className="py-3.5 px-4 w-36 border-r border-white/20 whitespace-nowrap">BRANCH</th>
                                    <th className="py-3.5 px-4 w-24 text-center border-r border-white/20 whitespace-nowrap">TOTAL DAYS</th>
                                    <th className="py-3.5 px-4 w-24 text-center border-r border-white/20 whitespace-nowrap">PRESENT</th>
                                    <th className="py-3.5 px-4 w-24 text-center border-r border-white/20 whitespace-nowrap">ABSENT</th>
                                    <th className="py-3.5 px-4 w-24 text-center border-r border-white/20 whitespace-nowrap">LEAVE</th>
                                    <th className="py-3.5 px-4 w-24 text-center border-r border-white/20 whitespace-nowrap">LATE</th>
                                    <th className="py-3.5 px-4 w-32 text-center border-r border-white/20 whitespace-nowrap">DUTY HOURS</th>
                                    <th className="py-3.5 px-4 w-28 text-center border-r border-white/20 whitespace-nowrap">RATING</th>
                                    <th className="py-3.5 px-4 w-28 text-right whitespace-nowrap">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-slate-700 bg-white">
                                {filteredExecutiveList.map((x, idx) => (
                                    <tr key={x.id} className={`h-[52px] transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'} hover:bg-blue-50/40`}>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 text-xs font-medium text-slate-500">{idx + 1}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-mono font-bold text-xs text-brand-primary">{x.empCode}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-brand-navy">{x.name}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 text-xs text-slate-600">{x.designation}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 text-xs font-medium text-slate-700">{x.branch}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 font-medium text-xs">{x.totalDays}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 font-bold text-xs text-emerald-700 bg-emerald-50/50">{x.presentDays}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 font-bold text-xs text-rose-700">{x.absentDays}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 font-medium text-xs text-amber-700">{x.leaveDays}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 font-medium text-xs text-slate-600">{x.lateDays}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 font-mono text-xs font-semibold text-brand-primary">{x.dutyHours}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                                x.status === 'EXCELLENT' ? 'bg-emerald-100 text-emerald-800' :
                                                x.status === 'GOOD' ? 'bg-blue-100 text-blue-800' :
                                                x.status === 'ATTENTION' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                                {x.status}
                                            </span>
                                        </td>
                                        <td className="py-2.5 px-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => setViewDetailModal(x)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-brand-primary hover:bg-blue-50 rounded border border-blue-200 transition-colors cursor-pointer"
                                            >
                                                <Eye size={13} />
                                                <span>Log</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* MODE 2: PRESENTY (Day-by-Day Roster View) */}
                    {selectedMode === 'Presenty' && (
                        <table className="text-left border-collapse w-full min-w-[1200px] text-[12px]">
                            <thead>
                                <tr className="bg-brand-primary text-white font-bold text-[11px] tracking-wider uppercase border-b-2 border-blue-700 select-none">
                                    <th className="py-3 px-3 w-14 text-center border-r border-white/20">SR.</th>
                                    <th className="py-3 px-3 w-28 border-r border-white/20">EMP CODE</th>
                                    <th className="py-3 px-4 w-52 border-r border-white/20">EMPLOYEE NAME</th>
                                    <th className="py-3 px-3 w-28 border-r border-white/20">BRANCH</th>
                                    {/* 15 Sample Days for month */}
                                    {Array.from({ length: 15 }, (_, i) => (
                                        <th key={i} className="py-2 px-2 text-center w-8 border-r border-white/20">
                                            {i + 1}
                                        </th>
                                    ))}
                                    <th className="py-3 px-3 w-16 text-center border-r border-white/20">P</th>
                                    <th className="py-3 px-3 w-16 text-center border-r border-white/20">A</th>
                                    <th className="py-3 px-3 w-16 text-center border-r border-white/20">L</th>
                                    <th className="py-3 px-3 w-20 text-center">RATE</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-slate-700 bg-white">
                                {filteredExecutiveList.map((x, idx) => (
                                    <tr key={x.id} className="h-[46px] hover:bg-blue-50/30">
                                        <td className="py-2 px-3 text-center border-r border-slate-200 text-slate-500 font-medium">{idx + 1}</td>
                                        <td className="py-2 px-3 border-r border-slate-200 font-mono font-bold text-xs text-brand-primary">{x.empCode}</td>
                                        <td className="py-2 px-4 border-r border-slate-200 font-semibold text-brand-navy truncate">{x.name}</td>
                                        <td className="py-2 px-3 border-r border-slate-200 text-xs text-slate-600">{x.branch}</td>
                                        {Array.from({ length: 15 }, (_, d) => {
                                            const isSunday = d === 6 || d === 13;
                                            const isLeave = (x.id + d) % 9 === 0;
                                            const isAbsent = (x.id * 3 + d) % 17 === 0;
                                            return (
                                                <td key={d} className="py-1 px-1 text-center border-r border-slate-200">
                                                    <span className={`inline-block w-6 h-6 rounded leading-6 text-[11px] font-bold ${
                                                        isSunday ? 'bg-blue-100 text-blue-700 font-semibold' :
                                                        isLeave ? 'bg-amber-100 text-amber-800' :
                                                        isAbsent ? 'bg-rose-100 text-rose-700' :
                                                        'bg-emerald-100 text-emerald-800'
                                                    }`}>
                                                        {isSunday ? 'WO' : isLeave ? 'L' : isAbsent ? 'A' : 'P'}
                                                    </span>
                                                </td>
                                            );
                                        })}
                                        <td className="py-2 px-3 text-center border-r border-slate-200 font-bold text-emerald-700">{x.presentDays}</td>
                                        <td className="py-2 px-3 text-center border-r border-slate-200 font-bold text-rose-700">{x.absentDays}</td>
                                        <td className="py-2 px-3 text-center border-r border-slate-200 font-bold text-amber-700">{x.leaveDays}</td>
                                        <td className="py-2 px-3 text-center font-bold text-brand-primary">
                                            {Math.round((x.presentDays / x.totalDays) * 100)}%
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* MODE 3: DAILY ATTENDANCE */}
                    {selectedMode === 'Daily Attendance' && (
                        <table className="text-left border-collapse w-full min-w-[1000px] text-[13px]">
                            <thead>
                                <tr className="bg-brand-primary text-white font-bold text-[12px] tracking-wider uppercase border-b-2 border-blue-700 select-none">
                                    <th className="py-3.5 px-4 w-16 text-center border-r border-white/20 whitespace-nowrap">SR.</th>
                                    <th className="py-3.5 px-4 w-32 border-r border-white/20 whitespace-nowrap">EMP CODE</th>
                                    <th className="py-3.5 px-4 w-60 border-r border-white/20 whitespace-nowrap">EMPLOYEE NAME</th>
                                    <th className="py-3.5 px-4 w-36 border-r border-white/20 whitespace-nowrap">BRANCH</th>
                                    <th className="py-3.5 px-4 w-32 border-r border-white/20 whitespace-nowrap">DATE</th>
                                    <th className="py-3.5 px-4 w-32 border-r border-white/20 whitespace-nowrap">PUNCH IN</th>
                                    <th className="py-3.5 px-4 w-32 border-r border-white/20 whitespace-nowrap">PUNCH OUT</th>
                                    <th className="py-3.5 px-4 w-32 text-center border-r border-white/20 whitespace-nowrap">WORK HOURS</th>
                                    <th className="py-3.5 px-4 w-28 text-center border-r border-white/20 whitespace-nowrap">OVERTIME</th>
                                    <th className="py-3.5 px-4 w-44 border-r border-white/20 whitespace-nowrap">BIOMETRIC DEVICE</th>
                                    <th className="py-3.5 px-4 w-28 text-center whitespace-nowrap">STATUS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-slate-700 bg-white">
                                {filteredDailyList.map((d, idx) => (
                                    <tr key={d.id} className={`h-[52px] ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'} hover:bg-blue-50/40`}>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 text-xs font-medium text-slate-500">{idx + 1}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-mono font-bold text-xs text-brand-primary">{d.empCode}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-brand-navy">{d.name}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 text-xs font-medium text-slate-700">{d.branch}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-mono text-xs text-slate-600">{d.date}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-mono text-xs font-semibold text-emerald-700">{d.punchIn}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-mono text-xs font-semibold text-brand-navy">{d.punchOut}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 font-medium text-xs text-slate-700">{d.workHours}</td>
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 font-mono text-xs text-slate-500">{d.overtime}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 text-xs text-slate-600">{d.deviceLocation}</td>
                                        <td className="py-2.5 px-4 text-center">
                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                                d.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' :
                                                d.status === 'LATE' ? 'bg-amber-100 text-amber-800' :
                                                d.status === 'HALF DAY' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                                            }`}>
                                                {d.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* MODE 4: NOT SIGN IN */}
                    {selectedMode === 'Not Sign In' && (
                        <table className="text-left border-collapse w-full min-w-[1000px] text-[13px]">
                            <thead>
                                <tr className="bg-brand-primary text-white font-bold text-[12px] tracking-wider uppercase border-b-2 border-blue-700 select-none">
                                    <th className="py-3.5 px-4 w-16 text-center border-r border-white/20 whitespace-nowrap">SR.</th>
                                    <th className="py-3.5 px-4 w-32 border-r border-white/20 whitespace-nowrap">EMP CODE</th>
                                    <th className="py-3.5 px-4 w-60 border-r border-white/20 whitespace-nowrap">EMPLOYEE NAME</th>
                                    <th className="py-3.5 px-4 w-36 border-r border-white/20 whitespace-nowrap">DEPARTMENT</th>
                                    <th className="py-3.5 px-4 w-36 border-r border-white/20 whitespace-nowrap">BRANCH</th>
                                    <th className="py-3.5 px-4 w-36 border-r border-white/20 whitespace-nowrap">MOBILE NUMBER</th>
                                    <th className="py-3.5 px-4 w-48 border-r border-white/20 whitespace-nowrap">EMAIL ID</th>
                                    <th className="py-3.5 px-4 w-44 border-r border-white/20 whitespace-nowrap">SHIFT TIMING</th>
                                    <th className="py-3.5 px-4 w-44 border-r border-white/20 whitespace-nowrap">LAST ACTIVE</th>
                                    <th className="py-3.5 px-4 w-32 text-right whitespace-nowrap">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-slate-700 bg-white">
                                {filteredNotSignInList.map((ns, idx) => (
                                    <tr key={ns.id} className="h-[52px] bg-rose-50/20 hover:bg-rose-50/50">
                                        <td className="py-2.5 px-4 text-center border-r border-slate-200 text-xs font-medium text-slate-500">{idx + 1}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-mono font-bold text-xs text-rose-600">{ns.empCode}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-semibold text-brand-navy">{ns.name}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 text-xs text-slate-700">{ns.department}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 text-xs font-medium text-slate-700">{ns.branch}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-mono text-xs text-slate-800">{ns.mobile}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 text-xs text-slate-600">{ns.email}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 text-xs text-slate-700">{ns.shiftTime}</td>
                                        <td className="py-2.5 px-4 border-r border-slate-200 font-mono text-xs text-slate-500">{ns.lastActive}</td>
                                        <td className="py-2.5 px-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => showToast(`Sent attendance check-in reminder SMS to ${ns.name}`)}
                                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-[6px] text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                                            >
                                                <Bell size={13} />
                                                <span>Remind</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Table Footer with Pagination */}
                <div className="p-4 bg-slate-50 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <span>Records per page:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <span className="text-xs text-slate-500 font-medium">
                        Showing 1 to {selectedMode === 'Executive Attendance' || selectedMode === 'Presenty' ? filteredExecutiveList.length :
                                      selectedMode === 'Daily Attendance' ? filteredDailyList.length : filteredNotSignInList.length} of records
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            &lt;
                        </button>
                        <button
                            type="button"
                            className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md bg-brand-primary text-white shadow-sm"
                        >
                            1
                        </button>
                        <button
                            type="button"
                            disabled
                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>

            {/* DETAIL MODAL FOR EXECUTIVE ATTENDANCE LOG */}
            {viewDetailModal && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-[#102A4C] text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-blue-500/20 text-blue-300 rounded-lg">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base">Executive Attendance Card</h3>
                                    <p className="text-xs text-slate-300">{viewDetailModal.name} • {viewDetailModal.empCode}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setViewDetailModal(null)}
                                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                                <div>
                                    <span className="text-slate-400 uppercase font-semibold">Designation</span>
                                    <p className="font-bold text-brand-navy mt-0.5">{viewDetailModal.designation}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 uppercase font-semibold">Branch</span>
                                    <p className="font-bold text-brand-navy mt-0.5">{viewDetailModal.branch}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 uppercase font-semibold">Present Days</span>
                                    <p className="font-bold text-emerald-700 text-sm mt-0.5">{viewDetailModal.presentDays} Days</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 uppercase font-semibold">Total Duty Hours</span>
                                    <p className="font-bold text-brand-primary font-mono text-sm mt-0.5">{viewDetailModal.dutyHours}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider">Attendance Breakdown</h4>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="flex-1 p-2 bg-emerald-50 text-emerald-800 rounded-lg text-center font-bold">Present: {viewDetailModal.presentDays}</span>
                                    <span className="flex-1 p-2 bg-rose-50 text-rose-800 rounded-lg text-center font-bold">Absent: {viewDetailModal.absentDays}</span>
                                    <span className="flex-1 p-2 bg-amber-50 text-amber-800 rounded-lg text-center font-bold">Leave: {viewDetailModal.leaveDays}</span>
                                    <span className="flex-1 p-2 bg-blue-50 text-blue-800 rounded-lg text-center font-bold">Late: {viewDetailModal.lateDays}</span>
                                </div>
                            </div>

                            <div className="flex justify-end pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setViewDetailModal(null)}
                                    className="px-5 py-2 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-[#00509d] cursor-pointer border-none"
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExecutiveAttendanceTab;
