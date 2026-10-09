import React, { useState, useMemo } from 'react';
import {
    Search, X, Download, Eye, Edit2, Trash2, CheckCircle2,
    Users, Building, Phone, Mail, FileText, CreditCard, ChevronLeft, ChevronRight
} from 'lucide-react';

export interface EmployeeRecord {
    id: number;
    empName: string;
    address: string;
    mobileNo: string;
    emailId: string;
    gender: string;
    maritalStatus: string;
    qualification: string;
    dateOfJoining: string;
    currentExperience: string;
    salary: number;
    organizationName: string;
    departmentName: string;
    facilityName: string;
    bloodGroup: string;
    panNo: string;
    aadharNo: string;
    accountNo: string;
    drivingNo: string;
    bankName: string;
    branchName: string;
    ifscCode: string;
    designation: string;
}

const INITIAL_EMPLOYEES: EmployeeRecord[] = [
    {
        id: 1,
        empName: 'JYOTI CHANDRAKANT SONAWANE',
        address: 'BARAMATI',
        mobileNo: '0, 9225659203',
        emailId: 'reliableassurance1@gmail.com',
        gender: 'FEMALE',
        maritalStatus: 'Unmarried',
        qualification: 'MBA (Finance)',
        dateOfJoining: '05/01/2010',
        currentExperience: '14 Year 8 Months',
        salary: 70000,
        organizationName: 'JPB CONSULTANCY PVT LTD',
        departmentName: 'SENIOR MANAGEMENT',
        facilityName: 'Head Office',
        bloodGroup: 'A+',
        panNo: 'AAAPS1234F',
        aadharNo: '849201948201',
        accountNo: '918020019283011',
        drivingNo: 'MH42 20100019283',
        bankName: 'AXIS BANK',
        branchName: 'BARAMATI',
        ifscCode: 'UTIB0000456',
        designation: 'Business - Head'
    },
    {
        id: 2,
        empName: 'Arvind Dnyaneshwar Gawade',
        address: 'SAMBHAJINAGAR',
        mobileNo: '9960881549, 9960881549',
        emailId: 'arvindgawade2801@gmail.com',
        gender: 'MALE',
        maritalStatus: 'Married',
        qualification: 'B.Com',
        dateOfJoining: '12/02/2014',
        currentExperience: '10 Year 6 Months',
        salary: 38000,
        organizationName: 'JPB CONSULTANCY PVT LTD',
        departmentName: 'SALES',
        facilityName: 'Branch Office',
        bloodGroup: 'B+',
        panNo: 'CDIPG6277Q',
        aadharNo: '748531592365',
        accountNo: '061010110003008',
        drivingNo: 'MH12 20120019283',
        bankName: 'BANK OF INDIA',
        branchName: 'AURANGABAD',
        ifscCode: 'BKID0000610',
        designation: 'EXECUTIVE'
    },
    {
        id: 3,
        empName: 'Amol Ramchandra Wanave',
        address: 'AKLUJ',
        mobileNo: ', 9284796393',
        emailId: 'amolvanave9@gmail.com',
        gender: 'MALE',
        maritalStatus: 'Married',
        qualification: 'B.A',
        dateOfJoining: '09/02/2016',
        currentExperience: '8 Year 7 Months',
        salary: 36000,
        organizationName: 'JPB CONSULTANCY PVT LTD',
        departmentName: 'SALES',
        facilityName: 'Branch Office',
        bloodGroup: 'O+',
        panNo: 'BBMPV1529B',
        aadharNo: '420277288941',
        accountNo: '68012249255',
        drivingNo: 'MH13 20160012837',
        bankName: 'BANK OF MAHARASHTRA',
        branchName: 'AKLUJ',
        ifscCode: 'MAHB0000172',
        designation: 'EXECUTIVE'
    },
    {
        id: 4,
        empName: 'Abhishek Vilas Gaikwad',
        address: 'PUNE',
        mobileNo: ', 9881996262',
        emailId: 'rgranjan00@gmail.com',
        gender: 'MALE',
        maritalStatus: 'Married',
        qualification: 'B.Sc (Comp)',
        dateOfJoining: '21/06/2021',
        currentExperience: '3 Year 3 Months',
        salary: 45000,
        organizationName: 'JPB CONSULTANCY PVT LTD',
        departmentName: 'SALES',
        facilityName: 'Regional Office',
        bloodGroup: 'AB+',
        panNo: 'FMHPS3117Q',
        aadharNo: '627478455276',
        accountNo: '50100159192104',
        drivingNo: 'MH14 20180099882',
        bankName: 'HDFC BANK',
        branchName: 'PUNE CAMP',
        ifscCode: 'HDFC0002089',
        designation: 'SALES HEAD'
    },
    {
        id: 5,
        empName: 'KIRAN PANDURANG MALI',
        address: 'BARAMATI',
        mobileNo: '0, 7721946111',
        emailId: 'kiranpmali2014@gmail.com',
        gender: 'FEMALE',
        maritalStatus: 'Married',
        qualification: 'M.Com',
        dateOfJoining: '19/07/2017',
        currentExperience: '7 Year 11 Months 1Days',
        salary: 22500,
        organizationName: 'JPB CONSULTANCY PVT LTD',
        departmentName: 'Back Office',
        facilityName: 'HO',
        bloodGroup: 'B+',
        panNo: 'DIYPM2804R',
        aadharNo: '145236258569',
        accountNo: '471104000150901',
        drivingNo: '—',
        bankName: 'IDBI BANK',
        branchName: 'BARAMATI',
        ifscCode: 'IBKL000471',
        designation: 'Backend Operator'
    },
    {
        id: 6,
        empName: 'SNEHAL KUSHAL YADAV',
        address: 'BARAMATI',
        mobileNo: '0, 9970420691',
        emailId: 'yadavsnehalk@gmail.com',
        gender: 'FEMALE',
        maritalStatus: 'Married',
        qualification: 'MCA',
        dateOfJoining: '02/07/2021',
        currentExperience: '3 Year 11 Months 17Days',
        salary: 20000,
        organizationName: 'JPB CONSULTANCY PVT LTD',
        departmentName: 'IT',
        facilityName: 'HO',
        bloodGroup: 'A+',
        panNo: 'BLEPJ5998L',
        aadharNo: '690510932102',
        accountNo: '50100444496489',
        drivingNo: '—',
        bankName: 'HDFC BANK',
        branchName: 'BARAMATI',
        ifscCode: 'HDFC0002104',
        designation: 'Software Developer'
    },
    {
        id: 7,
        empName: 'SHEKHARU S. LAB',
        address: 'BARAMATI',
        mobileNo: '9822166111',
        emailId: 'shekhar.lab@reliable.in',
        gender: 'MALE',
        maritalStatus: 'Married',
        qualification: 'MBA (HR)',
        dateOfJoining: '10/01/2018',
        currentExperience: '6 Year 8 Months',
        salary: 42000,
        organizationName: 'SHARVARI MARKETING',
        departmentName: 'HR & ADMIN',
        facilityName: 'Branch Office',
        bloodGroup: 'O+',
        panNo: 'AAKPL8910Q',
        aadharNo: '901238475619',
        accountNo: '002810400019283',
        drivingNo: 'MH42 20140029183',
        bankName: 'STATE BANK OF INDIA',
        branchName: 'BARAMATI',
        ifscCode: 'SBIN0000321',
        designation: 'Branch Admin'
    },
    {
        id: 8,
        empName: 'VINAYAK K. KADAM',
        address: 'KOLHAPUR',
        mobileNo: '9422003344',
        emailId: 'vinayak.k@reliable.in',
        gender: 'MALE',
        maritalStatus: 'Married',
        qualification: 'B.E (Mechanical)',
        dateOfJoining: '15/03/2019',
        currentExperience: '5 Year 6 Months',
        salary: 48000,
        organizationName: 'SHARVARI MOTORS',
        departmentName: 'OPERATION',
        facilityName: 'Service Hub',
        bloodGroup: 'A-',
        panNo: 'BKNPL2019R',
        aadharNo: '819203948571',
        accountNo: '60192837465',
        drivingNo: 'MH09 20150019284',
        bankName: 'BANK OF MAHARASHTRA',
        branchName: 'KOLHAPUR',
        ifscCode: 'MAHB0000045',
        designation: 'Branch Manager'
    }
];

const ViewEmployeeTab: React.FC = () => {
    const [employees, setEmployees] = useState<EmployeeRecord[]>(INITIAL_EMPLOYEES);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Modal States
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeRecord | null>(null);
    const [editingEmployee, setEditingEmployee] = useState<EmployeeRecord | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Filter employees by Search Query
    const filteredEmployees = useMemo(() => {
        if (!searchQuery.trim()) return employees;
        const q = searchQuery.toLowerCase().trim();
        return employees.filter(e =>
            e.empName.toLowerCase().includes(q) ||
            e.mobileNo.toLowerCase().includes(q) ||
            e.emailId.toLowerCase().includes(q) ||
            e.departmentName.toLowerCase().includes(q) ||
            e.organizationName.toLowerCase().includes(q) ||
            e.designation.toLowerCase().includes(q) ||
            e.panNo.toLowerCase().includes(q) ||
            e.aadharNo.toLowerCase().includes(q) ||
            e.bankName.toLowerCase().includes(q)
        );
    }, [employees, searchQuery]);

    // Pagination
    const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
    const paginatedEmployees = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredEmployees.slice(start, start + itemsPerPage);
    }, [filteredEmployees, currentPage, itemsPerPage]);

    // CSV Export
    const handleExportCSV = () => {
        const headers = [
            'ID', 'Emp Name', 'Address', 'Mobile No', 'Email Id', 'Gender',
            'Marital Status', 'Qualification', 'Date Of Joining', 'Current Experience',
            'Salary', 'Organization Name', 'Department Name', 'Facility Name', 'Blood Group',
            'PanNo', 'AadharNo', 'AccountNo', 'DrivingNo', 'Bank Name', 'Branch Name', 'IFSCcode', 'Designation'
        ];

        const rows = filteredEmployees.map(e => [
            e.id,
            `"${e.empName}"`,
            `"${e.address}"`,
            `"${e.mobileNo}"`,
            `"${e.emailId}"`,
            `"${e.gender}"`,
            `"${e.maritalStatus}"`,
            `"${e.qualification}"`,
            `"${e.dateOfJoining}"`,
            `"${e.currentExperience}"`,
            e.salary,
            `"${e.organizationName}"`,
            `"${e.departmentName}"`,
            `"${e.facilityName}"`,
            `"${e.bloodGroup}"`,
            `"${e.panNo}"`,
            `"${e.aadharNo}"`,
            `"${e.accountNo}"`,
            `"${e.drivingNo}"`,
            `"${e.bankName}"`,
            `"${e.branchName}"`,
            `"${e.ifscCode}"`,
            `"${e.designation}"`
        ]);

        const csv = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const link = document.createElement('a');
        link.href = encodeURI(csv);
        link.download = `reliable_employees_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Exported ${filteredEmployees.length} employee records to CSV`);
    };

    // Save Edited Employee
    const handleSaveEdit = () => {
        if (!editingEmployee) return;
        setEmployees(prev =>
            prev.map(e => (e.id === editingEmployee.id ? editingEmployee : e))
        );
        showToast(`Employee "${editingEmployee.empName}" updated successfully`);
        setEditingEmployee(null);
    };

    return (
        <div className="tab-transition-wrapper space-y-4 w-full min-w-0 pb-8">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-[#0B203C] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* TOP BAR MATCHING SCREENSHOT: SEARCH PILL + EXPORT BUTTON */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 pb-2">
                <div className="relative w-full sm:w-[380px]">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        placeholder="Search Employee Name Here"
                        className="w-full px-5 py-2.5 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                <button
                    type="button"
                    onClick={handleExportCSV}
                    className="px-8 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[100px] text-center"
                >
                    Export
                </button>
            </div>

            {/* TABLE CONTAINER IN ROYAL BLUE THEME */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full min-w-0">
                <div className="w-full overflow-x-auto min-w-0 erp-horizontal-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1900px] text-[13px]">
                        <thead>
                            <tr className="bg-brand-primary text-white font-bold text-[12px] uppercase tracking-wider border-b-2 border-blue-700 select-none">
                                <th className="py-3 px-3 w-16 text-center border-r border-white/20 whitespace-nowrap">View</th>
                                <th className="py-3 px-3 w-12 text-center border-r border-white/20 whitespace-nowrap">
                                    <Edit2 size={13} className="inline-block" />
                                </th>
                                <th className="py-3 px-3 w-14 text-center border-r border-white/20 whitespace-nowrap">ID</th>
                                <th className="py-3 px-4 min-w-[200px] border-r border-white/20 whitespace-nowrap">Emp Name</th>
                                <th className="py-3 px-3 min-w-[130px] border-r border-white/20 whitespace-nowrap">Address</th>
                                <th className="py-3 px-3 min-w-[150px] border-r border-white/20 whitespace-nowrap">Mobile No</th>
                                <th className="py-3 px-4 min-w-[210px] border-r border-white/20 whitespace-nowrap">Email Id</th>
                                <th className="py-3 px-3 w-24 text-center border-r border-white/20 whitespace-nowrap">Gender</th>
                                <th className="py-3 px-3 w-28 text-center border-r border-white/20 whitespace-nowrap">Marital Status</th>
                                <th className="py-3 px-3 min-w-[130px] border-r border-white/20 whitespace-nowrap">Qualification</th>
                                <th className="py-3 px-3 w-28 text-center border-r border-white/20 whitespace-nowrap">Date Of Joining</th>
                                <th className="py-3 px-3 min-w-[150px] border-r border-white/20 whitespace-nowrap">Current Exprience</th>
                                <th className="py-3 px-3 w-28 text-right pr-4 border-r border-white/20 whitespace-nowrap">Salary</th>
                                <th className="py-3 px-4 min-w-[200px] border-r border-white/20 whitespace-nowrap">Organization Name</th>
                                <th className="py-3 px-3 min-w-[170px] border-r border-white/20 whitespace-nowrap">Department Name</th>
                                <th className="py-3 px-3 min-w-[130px] border-r border-white/20 whitespace-nowrap">Facility Name</th>
                                <th className="py-3 px-3 w-24 text-center border-r border-white/20 whitespace-nowrap">Blood Group</th>
                                <th className="py-3 px-3 min-w-[130px] border-r border-white/20 whitespace-nowrap">PanNo</th>
                                <th className="py-3 px-3 min-w-[140px] border-r border-white/20 whitespace-nowrap">AadharNo</th>
                                <th className="py-3 px-3 min-w-[160px] border-r border-white/20 whitespace-nowrap">AccountNo</th>
                                <th className="py-3 px-3 min-w-[140px] border-r border-white/20 whitespace-nowrap">DrivingNo</th>
                                <th className="py-3 px-3 min-w-[160px] border-r border-white/20 whitespace-nowrap">Bank Name</th>
                                <th className="py-3 px-3 min-w-[140px] border-r border-white/20 whitespace-nowrap">Branch Name</th>
                                <th className="py-3 px-3 min-w-[130px] border-r border-white/20 whitespace-nowrap">IFSCcode</th>
                                <th className="py-3 px-4 min-w-[170px] whitespace-nowrap">Designation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {paginatedEmployees.map((emp, idx) => (
                                <tr
                                    key={emp.id}
                                    className={`transition-colors h-[48px] ${
                                        idx % 2 === 0 ? 'bg-white hover:bg-blue-50/40' : 'bg-slate-50/30 hover:bg-blue-50/40'
                                    }`}
                                >
                                    {/* Action: View */}
                                    <td className="py-2 px-3 text-center whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedEmployee(emp)}
                                            className="text-[#00509d] hover:text-blue-800 font-semibold text-xs underline cursor-pointer border-none bg-transparent"
                                        >
                                            View
                                        </button>
                                    </td>

                                    {/* Action: Edit */}
                                    <td className="py-2 px-3 text-center whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => setEditingEmployee({ ...emp })}
                                            className="text-[#00509d] hover:text-blue-800 p-1 cursor-pointer border-none bg-transparent"
                                            title="Edit"
                                        >
                                            <Edit2 size={15} />
                                        </button>
                                    </td>

                                    {/* ID */}
                                    <td className="py-2 px-3 text-center font-mono text-xs text-slate-600 whitespace-nowrap">
                                        {emp.id}
                                    </td>

                                    {/* Emp Name */}
                                    <td className="py-2 px-4 font-semibold text-slate-800 whitespace-nowrap">
                                        {emp.empName}
                                    </td>

                                    {/* Address */}
                                    <td className="py-2 px-3 text-slate-600 whitespace-nowrap">
                                        {emp.address || '—'}
                                    </td>

                                    {/* Mobile No */}
                                    <td className="py-2 px-3 font-mono text-xs text-slate-700 whitespace-nowrap">
                                        {emp.mobileNo}
                                    </td>

                                    {/* Email Id */}
                                    <td className="py-2 px-4 text-xs text-[#00509d] font-medium whitespace-nowrap">
                                        {emp.emailId}
                                    </td>

                                    {/* Gender */}
                                    <td className="py-2 px-3 text-center text-xs font-medium text-slate-700 whitespace-nowrap">
                                        {emp.gender}
                                    </td>

                                    {/* Marital Status */}
                                    <td className="py-2 px-3 text-center text-xs text-slate-600 whitespace-nowrap">
                                        {emp.maritalStatus}
                                    </td>

                                    {/* Qualification */}
                                    <td className="py-2 px-3 text-xs text-slate-700 whitespace-nowrap">
                                        {emp.qualification}
                                    </td>

                                    {/* Date Of Joining */}
                                    <td className="py-2 px-3 text-center font-mono text-xs text-slate-600 whitespace-nowrap">
                                        {emp.dateOfJoining}
                                    </td>

                                    {/* Current Experience */}
                                    <td className="py-2 px-3 text-xs text-slate-700 whitespace-nowrap">
                                        {emp.currentExperience}
                                    </td>

                                    {/* Salary */}
                                    <td className="py-2 px-3 text-right pr-4 font-mono text-xs font-semibold text-emerald-700 whitespace-nowrap">
                                        ₹ {emp.salary.toLocaleString()}
                                    </td>

                                    {/* Organization Name */}
                                    <td className="py-2 px-4 text-xs font-medium text-slate-800 whitespace-nowrap">
                                        {emp.organizationName}
                                    </td>

                                    {/* Department Name */}
                                    <td className="py-2 px-3 text-xs font-medium text-brand-primary whitespace-nowrap">
                                        {emp.departmentName}
                                    </td>

                                    {/* Facility Name */}
                                    <td className="py-2 px-3 text-xs text-slate-600 whitespace-nowrap">
                                        {emp.facilityName || '—'}
                                    </td>

                                    {/* Blood Group */}
                                    <td className="py-2 px-3 text-center text-xs font-semibold text-rose-700 whitespace-nowrap">
                                        {emp.bloodGroup}
                                    </td>

                                    {/* PanNo */}
                                    <td className="py-2 px-3 font-mono text-xs text-slate-700 whitespace-nowrap">
                                        {emp.panNo}
                                    </td>

                                    {/* AadharNo */}
                                    <td className="py-2 px-3 font-mono text-xs text-slate-700 whitespace-nowrap">
                                        {emp.aadharNo}
                                    </td>

                                    {/* AccountNo */}
                                    <td className="py-2 px-3 font-mono text-xs text-slate-700 whitespace-nowrap">
                                        {emp.accountNo}
                                    </td>

                                    {/* DrivingNo */}
                                    <td className="py-2 px-3 font-mono text-xs text-slate-600 whitespace-nowrap">
                                        {emp.drivingNo || '—'}
                                    </td>

                                    {/* Bank Name */}
                                    <td className="py-2 px-3 text-xs font-semibold text-slate-800 whitespace-nowrap">
                                        {emp.bankName}
                                    </td>

                                    {/* Branch Name */}
                                    <td className="py-2 px-3 text-xs text-slate-700 whitespace-nowrap">
                                        {emp.branchName}
                                    </td>

                                    {/* IFSCcode */}
                                    <td className="py-2 px-3 font-mono text-xs text-slate-700 whitespace-nowrap">
                                        {emp.ifscCode}
                                    </td>

                                    {/* Designation */}
                                    <td className="py-2 px-4 text-xs font-medium text-slate-800 whitespace-nowrap">
                                        {emp.designation}
                                    </td>
                                </tr>
                            ))}
                            {paginatedEmployees.length === 0 && (
                                <tr>
                                    <td colSpan={25} className="py-12 text-center text-slate-400 text-sm">
                                        No employee records found matching &ldquo;{searchQuery}&rdquo;
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* PAGINATION BAR */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-3">
                        <span>
                            Showing <strong>{paginatedEmployees.length}</strong> of <strong>{filteredEmployees.length}</strong> employees
                        </span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                            className="px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-700 cursor-pointer"
                        >
                            <option value={10}>10 per page</option>
                            <option value={25}>25 per page</option>
                            <option value={50}>50 per page</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            className="p-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronLeft size={14} />
                        </button>
                        <span className="px-3 font-semibold text-slate-800">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            type="button"
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            className="p-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ============================================================== */}
            {/* VIEW EMPLOYEE DETAILS MODAL                                    */}
            {/* ============================================================== */}
            {selectedEmployee && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                        {/* Header Banner */}
                        <div className="bg-brand-primary text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Users size={20} />
                                <h3 className="font-bold text-base">Employee Dossier</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedEmployee(null)}
                                className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer bg-transparent border-none"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <h4 className="text-xl font-bold text-slate-900">{selectedEmployee.empName}</h4>
                                    <p className="text-sm text-brand-primary font-medium mt-0.5">
                                        {selectedEmployee.designation} • {selectedEmployee.departmentName}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">{selectedEmployee.organizationName}</p>
                                </div>
                                <span className="px-3 py-1 bg-blue-50 text-brand-primary text-xs font-bold rounded-full border border-blue-200">
                                    ID: #{selectedEmployee.id}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">Mobile No</span>
                                    <strong className="text-slate-800">{selectedEmployee.mobileNo}</strong>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">Email</span>
                                    <strong className="text-slate-800 break-all">{selectedEmployee.emailId}</strong>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">Gender / Marital</span>
                                    <strong className="text-slate-800">{selectedEmployee.gender} / {selectedEmployee.maritalStatus}</strong>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">Joining Date</span>
                                    <strong className="text-slate-800">{selectedEmployee.dateOfJoining}</strong>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">Experience</span>
                                    <strong className="text-slate-800">{selectedEmployee.currentExperience}</strong>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">Monthly Salary</span>
                                    <strong className="text-emerald-700 font-bold">₹ {selectedEmployee.salary.toLocaleString()}</strong>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">PAN Card</span>
                                    <strong className="text-slate-800 font-mono">{selectedEmployee.panNo}</strong>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">Aadhaar Card</span>
                                    <strong className="text-slate-800 font-mono">{selectedEmployee.aadharNo}</strong>
                                </div>
                                <div className="p-3 bg-slate-50 rounded-lg">
                                    <span className="text-slate-500 block mb-0.5">Blood Group</span>
                                    <strong className="text-rose-700 font-bold">{selectedEmployee.bloodGroup}</strong>
                                </div>
                            </div>

                            {/* Bank Details Card */}
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-2 text-xs">
                                <span className="font-bold text-slate-800 block text-sm">Bank Account Details</span>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><span className="text-slate-500">Bank:</span> <strong>{selectedEmployee.bankName}</strong></div>
                                    <div><span className="text-slate-500">Branch:</span> <strong>{selectedEmployee.branchName}</strong></div>
                                    <div><span className="text-slate-500">Account No:</span> <strong className="font-mono">{selectedEmployee.accountNo}</strong></div>
                                    <div><span className="text-slate-500">IFSC Code:</span> <strong className="font-mono">{selectedEmployee.ifscCode}</strong></div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedEmployee(null)}
                                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg cursor-pointer"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ============================================================== */}
            {/* EDIT EMPLOYEE MODAL                                            */}
            {/* ============================================================== */}
            {editingEmployee && (
                <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-brand-primary text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Edit2 size={18} />
                                <h3 className="font-bold text-base">Edit Employee Details</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setEditingEmployee(null)}
                                className="text-white/80 hover:text-white p-1 rounded-full cursor-pointer bg-transparent border-none"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Name</label>
                                <input
                                    type="text"
                                    value={editingEmployee.empName}
                                    onChange={(e) => setEditingEmployee({ ...editingEmployee, empName: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile No</label>
                                    <input
                                        type="text"
                                        value={editingEmployee.mobileNo}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, mobileNo: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Id</label>
                                    <input
                                        type="email"
                                        value={editingEmployee.emailId}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, emailId: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                                    <input
                                        type="text"
                                        value={editingEmployee.designation}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, designation: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                                    <input
                                        type="text"
                                        value={editingEmployee.departmentName}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, departmentName: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Salary</label>
                                    <input
                                        type="number"
                                        value={editingEmployee.salary}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, salary: Number(e.target.value) })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Name</label>
                                    <input
                                        type="text"
                                        value={editingEmployee.bankName}
                                        onChange={(e) => setEditingEmployee({ ...editingEmployee, bankName: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-xs font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setEditingEmployee(null)}
                                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSaveEdit}
                                className="px-6 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-lg cursor-pointer"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewEmployeeTab;
