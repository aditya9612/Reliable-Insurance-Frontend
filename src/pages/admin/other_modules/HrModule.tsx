import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Search, Plus, FileText, Download, X, Edit2, Trash2, UserPlus } from 'lucide-react';

type HrSubTab =
  | 'executiveAttendance'
  | 'attendance'
  | 'salaryProcess'
  | 'salaryPayment'
  | 'holidayMaster'
  | 'employeeMaster'
  | 'viewEmployee'
  | 'leaveManagement'
  | 'leaveType'
  | 'organizationMaster'
  | 'departmentMaster'
  | 'salarySlip'
  | 'employeeAdvance'
  | 'viewEmployeeAdvance'
  | 'designationMaster'
  | 'applyLeave'
  | 'leaveReport';

export const HrModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<HrSubTab>('executiveAttendance');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Tab 1: Executive Attendance States (User Image 1)
  const [execAttType, setExecAttType] = useState<'exec' | 'presenty' | 'daily' | 'notSignIn'>('exec');
  const [selectedMonthTab1, setSelectedMonthTab1] = useState('');
  const [selectedYearTab1, setSelectedYearTab1] = useState('');
  const [selectedEmployeeTab1, setSelectedEmployeeTab1] = useState('ABHIJEET HARIBHAU ATOLE');

  // Tab 2: Attendance States (User Image 2)
  const [selectedOrgTab2, setSelectedOrgTab2] = useState('');
  const [allDepartmentTab2, setAllDepartmentTab2] = useState(false);
  const [selectedMonthTab2, setSelectedMonthTab2] = useState('');
  const [selectedYearTab2, setSelectedYearTab2] = useState('');

  // Tab 3: Salary Process States (User Image 3)
  const [selectedOrgTab3, setSelectedOrgTab3] = useState('');
  const [selectedMonthTab3, setSelectedMonthTab3] = useState('');
  const [selectedYearTab3, setSelectedYearTab3] = useState('');

  // Tab 4: Salary Payment States (User Image 4)
  const [selectedOrgTab4, setSelectedOrgTab4] = useState('');
  const [selectedMonthTab4, setSelectedMonthTab4] = useState('');
  const [selectedYearTab4, setSelectedYearTab4] = useState('');
  const [paymentFilterTab4, setPaymentFilterTab4] = useState<'ALL' | 'PAID' | 'UNPAID'>('ALL');

  // Holiday Master State (Image 1 of first set)
  const [holidayList, setHolidayList] = useState([
    { id: 1, description: 'PADWA', date: '08/03/2024 00:00:00' },
    { id: 2, description: 'DIWALI', date: '01/11/2024 00:00:00' },
    { id: 3, description: 'INDEPENDENCE DAY', date: '15/08/2024 00:00:00' }
  ]);
  const [holidayDescInput, setHolidayDescInput] = useState('');
  const [holidayDateInput, setHolidayDateInput] = useState('2026-10-06');

  // Leave Master State (Image 5 of first set)
  const [leaveList, setLeaveList] = useState([
    { id: 1, orgName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'JYOTI CHANDRAKANT SONAWANE', leaveType: 'CL', appDate: '25/02/2021 00:00:00', fromDate: '26/02/2021 00:00:00', toDate: '27/02/2021 00:00:00', noOfDays: '2' },
    { id: 2, orgName: 'JPB CONSULTANCY PVT LTD', dName: 'SALES', empName: 'KIRAN PANDURANG MALI', leaveType: 'CL', appDate: '15/05/2024 00:00:00', fromDate: '12/12/2024 00:00:00', toDate: '13/12/2024 00:00:00', noOfDays: '1' },
    { id: 5, orgName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'PRADIP DINKAR SHEWALE', leaveType: 'CL', appDate: '10/12/2024 11:37:42', fromDate: '12/04/2025 00:00:00', toDate: '14/04/2025 00:00:00', noOfDays: '3' },
    { id: 7, orgName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'ANJALI DHANAJI MALI', leaveType: 'CL', appDate: '16/12/2024 15:56:13', fromDate: '18/12/2024 00:00:00', toDate: '19/12/2024 00:00:00', noOfDays: '2' },
    { id: 8, orgName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'ANJALI DHANAJI MALI', leaveType: 'CL', appDate: '26/12/2024 10:07:23', fromDate: '27/12/2024 00:00:00', toDate: '27/12/2024 00:00:00', noOfDays: '1' },
    { id: 13, orgName: 'JPB CONSULTANCY PVT LTD', dName: 'BACK OFFICE', empName: 'PRADIP DINKAR SHEWALE', leaveType: 'CL', appDate: '05/02/2025 10:43:21', fromDate: '06/05/2025 00:00:00', toDate: '10/05/2025 00:00:00', noOfDays: '5' }
  ]);
  const [leaveOrg, setLeaveOrg] = useState('');
  const [leaveDept, setLeaveDept] = useState('');
  const [leaveEmp, setLeaveEmp] = useState('');
  const [leaveTypeVal, setLeaveTypeVal] = useState('');
  const [leaveAppDate, setLeaveAppDate] = useState('');
  const [leaveFromDate, setLeaveFromDate] = useState('');
  const [leaveToDate, setLeaveToDate] = useState('');
  const [leaveNoOfDays, setLeaveNoOfDays] = useState('');

  // NEW TAB 1: LEAVE TYPE MASTER (New Image 1)
  const [leaveTypeList, setLeaveTypeList] = useState([
    { id: 1, type: 'CL' },
    { id: 2, type: 'SL' },
    { id: 3, type: 'PL' },
    { id: 4, type: 'ML' }
  ]);
  const [leaveTypeInput, setLeaveTypeInput] = useState('');

  // NEW TAB 2: ORGANIZATION DETAILS (New Image 2)
  const [orgList, setOrgList] = useState([
    { id: 1, name: 'JPB', address: 'BARAMATI', mobileNo: '9822166111' },
    { id: 2, name: 'SHARVARI MARKETING', address: 'BARAMATI', mobileNo: '9822166111' },
    { id: 3, name: 'SHARVARI MOTORS', address: 'BARAMATI', mobileNo: '9822166111' }
  ]);
  const [orgNameInput, setOrgNameInput] = useState('');
  const [orgAddressInput, setOrgAddressInput] = useState('');
  const [orgContactInput, setOrgContactInput] = useState('');

  // NEW TAB 3: DEPARTMENT DETAILS (New Image 3)
  const [deptList, setDeptList] = useState([
    { id: 1, orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'BACK OFFICE', location: 'BARAMATI' },
    { id: 2, orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'SALES', location: 'BARAMATI' },
    { id: 3, orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'OPERATION', location: 'BARAMATI' },
    { id: 4, orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'ACCOUNT', location: 'BARAMATI' },
    { id: 5, orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'IT', location: 'BARAMATI' },
    { id: 6, orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'SENIOR MANAGEMENT', location: 'BARAMATI' },
    { id: 7, orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'HR', location: 'BARAMATI' },
    { id: 8, orgName: 'SHARVARI MARKETING', deptName: 'SALES', location: 'BARAMATI' },
    { id: 9, orgName: 'SHARVARI MARKETING', deptName: 'OPERATION', location: 'BARAMATI' },
    { id: 10, orgName: 'SHARVARI MARKETING', deptName: 'ACCOUNT', location: 'BARAMATI' }
  ]);
  const [deptOrgInput, setDeptOrgInput] = useState('');
  const [deptNameInput, setDeptNameInput] = useState('');
  const [deptLocInput, setDeptLocInput] = useState('');

  // NEW TAB: DESIGNATION MASTER FORM (User Image 2)
  const [designationList, setDesignationList] = useState([
    { id: 1, name: 'HR' },
    { id: 2, name: 'ACCOUNT ASSISTANT' },
    { id: 3, name: 'AREA MANAGER' },
    { id: 4, name: 'ASST. BODY SHOP MANAGER' },
    { id: 5, name: 'BACK OFFICE EXECUTIVE' },
    { id: 6, name: 'BODY SHOP ADVISOR' },
    { id: 7, name: 'DIRECTOR' },
    { id: 8, name: 'FLOOR SUPERVISOR' },
    { id: 9, name: 'GENERAL MANAGER' },
    { id: 10, name: 'ADMIN & HR MANAGER' },
    { id: 11, name: 'IT ENGINEER' }
  ]);
  const [designationInput, setDesignationInput] = useState('');

  // NEW TAB 4: SALARY SLIP (New Image 4)
  const [salSlipOrg, setSalSlipOrg] = useState('');
  const [salSlipMonth, setSalSlipMonth] = useState('');
  const [salSlipYear, setSalSlipYear] = useState('');
  const [salSlipEmp, setSalSlipEmp] = useState('');

  // NEW TAB 5: EMPLOYEE ADVANCE (New Image 5)
  const [advOrg, setAdvOrg] = useState('');
  const [advDept, setAdvDept] = useState('');
  const [advEmp, setAdvEmp] = useState('');
  const [advDate, setAdvDate] = useState('');
  const [advAmount, setAdvAmount] = useState('');
  const [advInstallments, setAdvInstallments] = useState('');

  // Employee Master Form Detailed States (Images 2 & 3 of first set)
  const [empCode, setEmpCode] = useState('77');
  const [empOrg, setEmpOrg] = useState('');
  const [empDept, setEmpDept] = useState('');
  const [empLoc, setEmpLoc] = useState('');
  const [empDesig, setEmpDesig] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [emergencyMobile, setEmergencyMobile] = useState('');
  const [permAddress, setPermAddress] = useState('');
  const [currAddress, setCurrAddress] = useState('');
  const [empState, setEmpState] = useState('');
  const [empDistrict, setEmpDistrict] = useState('');
  const [empTaluka, setEmpTaluka] = useState('');
  const [pincode, setPincode] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [emailId, setEmailId] = useState('');
  const [qualification, setQualification] = useState('');
  const [doj, setDoj] = useState('');
  const [doe, setDoe] = useState('06/10/2026');
  const [currExp, setCurrExp] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [dob, setDob] = useState('');
  const [panNo, setPanNo] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [electionCardNo, setElectionCardNo] = useState('');
  const [drivingNo, setDrivingNo] = useState('');
  const [pfApplicable, setPfApplicable] = useState('NO');

  // Employee Detailed View List (Image 4 of first set)
  const [employeesList, setEmployeesList] = useState([
    { id: 1, empName: 'JYOTI CHANDRAKANT SONAWANE', address: '0', mobileNo: '9225659203', emailId: 'reliableassurance1@gmail.com', gender: 'FEMALE', maritalStatus: 'Unmarried', qualification: '0', doj: '05/01/2010', currentExp: '0', salary: '70000', orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'SENIOR MANAGEMENT' },
    { id: 2, empName: 'Arvind Dnyaneshwar Gawade', address: '0', mobileNo: '9960881549', emailId: 'arvindgawade2601@gmail.com', gender: 'MALE', maritalStatus: 'Married', qualification: '0', doj: '12/02/2014', currentExp: '0', salary: '38000', orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'SALES' },
    { id: 3, empName: 'Amol Ramchandra Warave', address: '0', mobileNo: '9284796393', emailId: 'amolvarave9@gmail.com', gender: 'MALE', maritalStatus: 'Married', qualification: '0', doj: '09/02/2016', currentExp: '0', salary: '36000', orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'SALES' },
    { id: 4, empName: 'Abhishek Vilas Gaikwad', address: '0', mobileNo: '9881996262', emailId: 'rgranjan00@gmail.com', gender: 'MALE', maritalStatus: 'Married', qualification: '0', doj: '21/06/2021', currentExp: '0', salary: '45000', orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'SALES' },
    { id: 5, empName: 'KIRAN PANDURANG MALI', address: '0', mobileNo: '7721946111', emailId: 'kiranpmali2014@gmail.com', gender: 'FEMALE', maritalStatus: 'Married', qualification: '0', doj: '19/07/2017', currentExp: '7 Year 11 Months 1Days', salary: '22500', orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'Back Office' },
    { id: 6, empName: 'SNEHAL KUSHAL YADAV', address: '0', mobileNo: '9970420691', emailId: 'yadavsnehalk@gmail.com', gender: 'FEMALE', maritalStatus: 'Married', qualification: '0', doj: '02/07/2021', currentExp: '3 Year 11 Months 17Days', salary: '20000', orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'IT' },
    { id: 7, empName: 'SNEHA SHIVAJI NIKAM', address: '0', mobileNo: '8381068253', emailId: 'nikamsneha5813@gmail.com', gender: 'FEMALE', maritalStatus: 'Unmarried', qualification: '0', doj: '01/10/2020', currentExp: '4 Year 8 Months', salary: '20500', orgName: 'JPB CONSULTANCY PVT LTD', deptName: 'IT' }
  ]);

  // Generic fallback filters
  const [genericEmp, setGenericEmp] = useState('');
  const [genericDept, setGenericDept] = useState('');
  const [fromDate, setFromDate] = useState('2026-10-06');
  const [toDate, setToDate] = useState('2026-10-06');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sub Tabs List
  const tabsList: { key: HrSubTab; label: string }[] = [
    { key: 'executiveAttendance', label: 'Executive Attendance' },
    { key: 'attendance', label: 'Attendance' },
    { key: 'salaryProcess', label: 'Salary Process' },
    { key: 'salaryPayment', label: 'Employee Payment' },
    { key: 'holidayMaster', label: 'Holiday Master' },
    { key: 'employeeMaster', label: 'Employee Master' },
    { key: 'viewEmployee', label: 'View Employee' },
    { key: 'leaveManagement', label: 'Leave Management' },
    { key: 'leaveType', label: 'Leave Type' },
    { key: 'organizationMaster', label: 'Organization Master' },
    { key: 'departmentMaster', label: 'Department Master' },
    { key: 'salarySlip', label: 'Salary Slip' },
    { key: 'employeeAdvance', label: 'Employee Advance' },
    { key: 'viewEmployeeAdvance', label: 'View Employee Advance' },
    { key: 'designationMaster', label: 'Designation Master' },
    { key: 'applyLeave', label: 'Apply Leave' },
    { key: 'leaveReport', label: 'Leave Report' }
  ];

  const getTabLabel = (tabKey: HrSubTab) => {
    return tabsList.find(t => t.key === tabKey)?.label || 'HR Module';
  };

  const handleSaveHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!holidayDescInput.trim()) return;
    setHolidayList([
      ...holidayList,
      { id: holidayList.length + 1, description: holidayDescInput.toUpperCase(), date: `${holidayDateInput} 00:00:00` }
    ]);
    setHolidayDescInput('');
    setShowModal(false);
  };

  const handleSaveLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveEmp.trim()) return;
    setLeaveList([
      ...leaveList,
      {
        id: leaveList.length + 1,
        orgName: leaveOrg || 'JPB CONSULTANCY PVT LTD',
        dName: leaveDept || 'BACK OFFICE',
        empName: leaveEmp.toUpperCase(),
        leaveType: leaveTypeVal || 'CL',
        appDate: leaveAppDate || '2026-10-06 00:00:00',
        fromDate: leaveFromDate || '2026-10-06 00:00:00',
        toDate: leaveToDate || '2026-10-06 00:00:00',
        noOfDays: leaveNoOfDays || '1'
      }
    ]);
    setShowModal(false);
  };

  const handleSaveLeaveType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leaveTypeInput.trim()) return;
    setLeaveTypeList([
      ...leaveTypeList,
      { id: leaveTypeList.length + 1, type: leaveTypeInput.toUpperCase() }
    ]);
    setLeaveTypeInput('');
    setShowModal(false);
  };

  const handleSaveOrganization = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgNameInput.trim()) return;
    setOrgList([
      ...orgList,
      { id: orgList.length + 1, name: orgNameInput.toUpperCase(), address: orgAddressInput || 'BARAMATI', mobileNo: orgContactInput || '9822166111' }
    ]);
    setOrgNameInput('');
    setOrgAddressInput('');
    setOrgContactInput('');
    setShowModal(false);
  };

  const handleSaveDepartment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deptNameInput.trim()) return;
    setDeptList([
      ...deptList,
      { id: deptList.length + 1, orgName: deptOrgInput || 'JPB CONSULTANCY PVT LTD', deptName: deptNameInput.toUpperCase(), location: deptLocInput || 'BARAMATI' }
    ]);
    setDeptNameInput('');
    setDeptLocInput('');
    setShowModal(false);
  };

  const handleSaveDesignation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!designationInput.trim()) return;
    setDesignationList([
      ...designationList,
      { id: designationList.length + 1, name: designationInput.toUpperCase() }
    ]);
    setDesignationInput('');
    setShowModal(false);
  };

  const handleSaveEmployeeFull = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${firstName} ${middleName} ${lastName}`.trim() || 'NEW EMPLOYEE';
    setEmployeesList([
      ...employeesList,
      {
        id: employeesList.length + 1,
        empName: fullName.toUpperCase(),
        address: permAddress || 'N/A',
        mobileNo: mobileNo || '0000000000',
        emailId: emailId || 'employee@domain.com',
        gender: gender || 'MALE',
        maritalStatus: maritalStatus || 'Single',
        qualification: qualification || 'Graduate',
        doj: doj || '01/01/2024',
        currentExp: currExp || '0 Years',
        salary: salary || '30000',
        orgName: empOrg || 'JPB CONSULTANCY PVT LTD',
        deptName: empDept || 'SALES'
      }
    ]);
    setShowModal(false);
  };

  // Generic data filter
  const filteredEmployees = employeesList.filter(
    item =>
      item.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.emailId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deptName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;

  return (
    <div className="w-full flex flex-col space-y-5 font-sans">
      {/* Top Header Bar */}
      <PageHeader
        title="HR Module"
        description="Manage employee attendance, payroll, leave management & HR masters"
      />

      {/* Horizontal Sub-Tabs Bar */}
      <UnderlineTabs
        tabs={tabsList.map(tab => ({ id: tab.key, label: tab.label }))}
        activeTab={activeTab}
        onTabChange={(tabId) => { setActiveTab(tabId as HrSubTab); setCurrentPage(1); setSearchQuery(''); }}
      />

      {/* Main Content Card Container */}
      <div key={activeTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

          {/* TAB 1: EXECUTIVE ATTENDANCE */}
          {activeTab === 'executiveAttendance' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Executive Attendance Filter</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              {/* Radio Group Row */}
              <div className="flex flex-wrap items-center gap-6 justify-start text-xs font-semibold text-slate-700">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="execAttType"
                    checked={execAttType === 'exec'}
                    onChange={() => setExecAttType('exec')}
                    className="accent-[#0869D8]"
                  />
                  <span>Executive Attendance</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="execAttType"
                    checked={execAttType === 'presenty'}
                    onChange={() => setExecAttType('presenty')}
                    className="accent-[#0869D8]"
                  />
                  <span>Presenty</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="execAttType"
                    checked={execAttType === 'daily'}
                    onChange={() => setExecAttType('daily')}
                    className="accent-[#0869D8]"
                  />
                  <span>Daily Attendance</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="execAttType"
                    checked={execAttType === 'notSignIn'}
                    onChange={() => setExecAttType('notSignIn')}
                    className="accent-[#0869D8]"
                  />
                  <span>Not Sign In</span>
                </label>
              </div>

              {/* Form Input Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                  <select
                    value={selectedMonthTab1}
                    onChange={(e) => setSelectedMonthTab1(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Month--</option>
                    <option value="October">October</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="yyyy"
                    value={selectedYearTab1}
                    onChange={(e) => setSelectedYearTab1(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee</label>
                  <select
                    value={selectedEmployeeTab1}
                    onChange={(e) => setSelectedEmployeeTab1(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="ABHIJEET HARIBHAU ATOLE">ABHIJEET HARIBHAU ATOLE</option>
                    <option value="Prashant Diliprao Mohekar">Prashant Diliprao Mohekar</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    Show
                  </button>
                  <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    Export
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Attendance</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                  <select
                    value={selectedOrgTab2}
                    onChange={(e) => setSelectedOrgTab2(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Organization Name--</option>
                    <option value="Reliable Insurances">Reliable Insurances</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pb-2">
                  <label className="text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-2">
                    <span>All Department</span>
                    <input
                      type="checkbox"
                      checked={allDepartmentTab2}
                      onChange={(e) => setAllDepartmentTab2(e.target.checked)}
                      className="w-4 h-4 accent-[#0869D8]"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                  <select
                    value={selectedMonthTab2}
                    onChange={(e) => setSelectedMonthTab2(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Month Name--</option>
                    <option value="October">October</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="yyyy"
                    value={selectedYearTab2}
                    onChange={(e) => setSelectedYearTab2(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    View
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SALARY PROCESS */}
          {activeTab === 'salaryProcess' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Salary Process</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                  <select
                    value={selectedOrgTab3}
                    onChange={(e) => setSelectedOrgTab3(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Organization Name--</option>
                    <option value="Reliable Insurances">Reliable Insurances</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                  <select
                    value={selectedMonthTab3}
                    onChange={(e) => setSelectedMonthTab3(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Month Name--</option>
                    <option value="October">October</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="yyyy"
                    value={selectedYearTab3}
                    onChange={(e) => setSelectedYearTab3(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    View
                  </button>
                  <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    Export
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SALARY PAYMENT */}
          {activeTab === 'salaryPayment' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Salary Payment</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                  <select
                    value={selectedOrgTab4}
                    onChange={(e) => setSelectedOrgTab4(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Organization Name--</option>
                    <option value="Reliable Insurances">Reliable Insurances</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                  <select
                    value={selectedMonthTab4}
                    onChange={(e) => setSelectedMonthTab4(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Month Name--</option>
                    <option value="October">October</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="yyyy"
                    value={selectedYearTab4}
                    onChange={(e) => setSelectedYearTab4(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div className="flex items-center gap-4 pb-2 text-xs font-semibold text-slate-700">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentFilterTab4"
                      checked={paymentFilterTab4 === 'ALL'}
                      onChange={() => setPaymentFilterTab4('ALL')}
                      className="accent-[#0869D8]"
                    />
                    <span>ALL</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentFilterTab4"
                      checked={paymentFilterTab4 === 'PAID'}
                      onChange={() => setPaymentFilterTab4('PAID')}
                      className="accent-[#0869D8]"
                    />
                    <span>PAID</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentFilterTab4"
                      checked={paymentFilterTab4 === 'UNPAID'}
                      onChange={() => setPaymentFilterTab4('UNPAID')}
                      className="accent-[#0869D8]"
                    />
                    <span>UNPAID</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    View
                  </button>
                  <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    Export
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: HOLIDAY MASTER */}
          {activeTab === 'holidayMaster' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Holiday Details</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Holiday Description</label>
                  <input
                    type="text"
                    placeholder="Enter Holiday Description"
                    value={holidayDescInput}
                    onChange={(e) => setHolidayDescInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={holidayDateInput}
                    onChange={(e) => setHolidayDateInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button
                    onClick={handleSaveHoliday}
                    className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: EMPLOYEE MASTER */}
          {activeTab === 'employeeMaster' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Employee Master Setup</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-2"
                >
                  <UserPlus size={16} />
                  <span>Add Employee (Form Modal)</span>
                </button>
              </div>
              <p className="text-xs text-slate-600">
                Click the <strong>Add Employee (Form Modal)</strong> button above to open the complete multi-section Employee Details, User Details, Bank Details, Family Details, Reference Details, Previous Company & Photo Upload modal form!
              </p>
            </div>
          )}

          {/* NEW TAB: LEAVE TYPE MASTER (New Prompt Image 1) */}
          {activeTab === 'leaveType' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Leave Type Master Form</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Type</label>
                  <input
                    type="text"
                    placeholder="Enter Leave Type (e.g. CL, SL, PL)"
                    value={leaveTypeInput}
                    onChange={(e) => setLeaveTypeInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button
                    onClick={handleSaveLeaveType}
                    className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NEW TAB: ORGANIZATION DETAILS (New Prompt Image 2) */}
          {activeTab === 'organizationMaster' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Organization Details</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization Name</label>
                  <input
                    type="text"
                    placeholder="Enter Organization Name"
                    value={orgNameInput}
                    onChange={(e) => setOrgNameInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Address</label>
                  <input
                    type="text"
                    placeholder="Enter Address"
                    value={orgAddressInput}
                    onChange={(e) => setOrgAddressInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Contact No</label>
                  <input
                    type="text"
                    placeholder="Enter Contact No"
                    value={orgContactInput}
                    onChange={(e) => setOrgContactInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button
                    onClick={handleSaveOrganization}
                    className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NEW TAB: DEPARTMENT DETAILS (New Prompt Image 3) */}
          {activeTab === 'departmentMaster' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Department Details</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                  <select
                    value={deptOrgInput}
                    onChange={(e) => setDeptOrgInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Organization Name--</option>
                    <option value="JPB CONSULTANCY PVT LTD">JPB CONSULTANCY PVT LTD</option>
                    <option value="SHARVARI MARKETING">SHARVARI MARKETING</option>
                    <option value="SHARVARI MOTORS">SHARVARI MOTORS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department Name</label>
                  <input
                    type="text"
                    placeholder="Enter Department Name"
                    value={deptNameInput}
                    onChange={(e) => setDeptNameInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department Location</label>
                  <input
                    type="text"
                    placeholder="Enter Location (e.g. BARAMATI)"
                    value={deptLocInput}
                    onChange={(e) => setDeptLocInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button
                    onClick={handleSaveDepartment}
                    className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NEW TAB: DESIGNATION MASTER FORM (User Image 2) */}
          {activeTab === 'designationMaster' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Designation Master Form</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="Enter Designation"
                    value={designationInput}
                    onChange={(e) => setDesignationInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button
                    onClick={handleSaveDesignation}
                    className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NEW TAB: SALARY SLIP (New Prompt Image 4) */}
          {activeTab === 'salarySlip' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Salary Slip</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                  <select
                    value={salSlipOrg}
                    onChange={(e) => setSalSlipOrg(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Organization Name--</option>
                    <option value="JPB CONSULTANCY PVT LTD">JPB CONSULTANCY PVT LTD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                  <select
                    value={salSlipMonth}
                    onChange={(e) => setSalSlipMonth(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Month Name--</option>
                    <option value="October">October</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="yyyy"
                    value={salSlipYear}
                    onChange={(e) => setSalSlipYear(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Name</label>
                  <select
                    value={salSlipEmp}
                    onChange={(e) => setSalSlipEmp(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Employee Name--</option>
                    <option value="JYOTI CHANDRAKANT SONAWANE">JYOTI CHANDRAKANT SONAWANE</option>
                  </select>
                </div>

                <div>
                  <button className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    View
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* NEW TAB: EMPLOYEE ADVANCE (New Prompt Image 5) */}
          {(activeTab === 'employeeAdvance' || activeTab === 'viewEmployeeAdvance') && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Advance</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                  <select
                    value={advOrg}
                    onChange={(e) => setAdvOrg(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Organization Name--</option>
                    <option value="JPB CONSULTANCY PVT LTD">JPB CONSULTANCY PVT LTD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={advDept}
                    onChange={(e) => setAdvDept(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Department Name--</option>
                    <option value="SALES">SALES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee Name</label>
                  <select
                    value={advEmp}
                    onChange={(e) => setAdvEmp(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Employee Name--</option>
                    <option value="JYOTI CHANDRAKANT SONAWANE">JYOTI CHANDRAKANT SONAWANE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={advDate}
                    onChange={(e) => setAdvDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Advance Amount</label>
                  <input
                    type="text"
                    placeholder="Enter Amount"
                    value={advAmount}
                    onChange={(e) => setAdvAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">No. of Installment Month</label>
                  <input
                    type="text"
                    placeholder="e.g. 6"
                    value={advInstallments}
                    onChange={(e) => setAdvInstallments(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    view
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: LEAVE MANAGEMENT / LEAVE MASTER */}
          {(activeTab === 'leaveManagement' || activeTab === 'applyLeave') && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Leave Master</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <Plus size={14} />
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                  <select
                    value={leaveOrg}
                    onChange={(e) => setLeaveOrg(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Organization Name--</option>
                    <option value="JPB CONSULTANCY PVT LTD">JPB CONSULTANCY PVT LTD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={leaveDept}
                    onChange={(e) => setLeaveDept(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Department Name--</option>
                    <option value="BACK OFFICE">BACK OFFICE</option>
                    <option value="SALES">SALES</option>
                    <option value="IT">IT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee</label>
                  <select
                    value={leaveEmp}
                    onChange={(e) => setLeaveEmp(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Employee Name--</option>
                    <option value="JYOTI CHANDRAKANT SONAWANE">JYOTI CHANDRAKANT SONAWANE</option>
                    <option value="KIRAN PANDURANG MALI">KIRAN PANDURANG MALI</option>
                    <option value="PRADIP DINKAR SHEWALE">PRADIP DINKAR SHEWALE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Type</label>
                  <select
                    value={leaveTypeVal}
                    onChange={(e) => setLeaveTypeVal(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Leave Type--</option>
                    <option value="CL">Casual Leave (CL)</option>
                    <option value="SL">Sick Leave (SL)</option>
                    <option value="PL">Paid Leave (PL)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Application Date</label>
                  <input
                    type="date"
                    value={leaveAppDate}
                    onChange={(e) => setLeaveAppDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={leaveFromDate}
                    onChange={(e) => setLeaveFromDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={leaveToDate}
                    onChange={(e) => setLeaveToDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">No Of Days</label>
                    <input
                      type="text"
                      placeholder="e.g. 1"
                      value={leaveNoOfDays}
                      onChange={(e) => setLeaveNoOfDays(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                    />
                  </div>
                  <button
                    onClick={handleSaveLeave}
                    className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* OTHER TABS FALLBACK DEFAULT FORM (Policy Master Format) */}
          {!['executiveAttendance', 'attendance', 'salaryProcess', 'salaryPayment', 'holidayMaster', 'employeeMaster', 'leaveManagement', 'applyLeave', 'leaveType', 'organizationMaster', 'departmentMaster', 'salarySlip', 'employeeAdvance', 'viewEmployeeAdvance'].includes(activeTab) && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-3 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» {getTabLabel(activeTab)}</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <span>Add / Form Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Employee</label>
                  <select
                    value={genericEmp}
                    onChange={(e) => setGenericEmp(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Employee--</option>
                    <option value="EMP001">Amin Dastagir Pathan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={genericDept}
                    onChange={(e) => setGenericDept(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Department--</option>
                    <option value="Sales">Sales & Executive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center gap-3">
                  <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none flex items-center gap-2">
                    <FileText size={16} />
                    <span>View</span>
                  </button>
                  <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    Export Grid
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table Toolbar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search Record..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="px-5 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-xs rounded-lg shadow-sm transition cursor-pointer border-none flex items-center gap-1.5">
                <Download size={14} />
                <span>Export Grid</span>
              </button>
            </div>
          </div>

          {/* TABLES VIEW BY ACTIVE TAB */}
          <div className="overflow-x-auto w-full custom-scrollbar">
            {activeTab === 'leaveType' ? (
              /* LEAVE TYPE TABLE (New Prompt Image 1) */
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-4">LEAVE TYPE</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                  {leaveTypeList.map((row) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                      <td className="py-2.5 px-4 font-semibold text-slate-800">{row.type}</td>
                      <td className="py-2.5 px-4 text-right flex items-center justify-end gap-3 text-blue-600">
                        <button onClick={() => setShowModal(true)} className="p-1 hover:bg-slate-100 rounded text-blue-600 border-none bg-transparent cursor-pointer">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setLeaveTypeList(prev => prev.filter(l => l.id !== row.id))}
                          className="p-1 hover:bg-red-50 text-red-600 rounded border-none bg-transparent cursor-pointer flex items-center gap-1 text-xs font-semibold"
                        >
                          <Trash2 size={16} />
                          <span>DELETE</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'organizationMaster' ? (
              /* ORGANIZATION MASTER TABLE (New Prompt Image 2) */
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-4">ORGANIZATION NAME</th>
                    <th className="py-3 px-4">ADDRESS</th>
                    <th className="py-3 px-4">MOBILE NO</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                  {orgList.map((row) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                      <td className="py-2.5 px-4 font-bold text-slate-800">{row.name}</td>
                      <td className="py-2.5 px-4 text-slate-700">{row.address}</td>
                      <td className="py-2.5 px-4 text-slate-700 font-mono">{row.mobileNo}</td>
                      <td className="py-2.5 px-4 text-right flex items-center justify-end gap-3 text-blue-600">
                        <button onClick={() => setShowModal(true)} className="p-1 hover:bg-slate-100 rounded text-blue-600 border-none bg-transparent cursor-pointer">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setOrgList(prev => prev.filter(o => o.id !== row.id))}
                          className="p-1 hover:bg-red-50 text-red-600 rounded border-none bg-transparent cursor-pointer flex items-center gap-1 text-xs font-semibold"
                        >
                          <Trash2 size={16} />
                          <span>DELETE</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'departmentMaster' ? (
              /* DEPARTMENT MASTER TABLE (New Prompt Image 3) */
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-4">ORGANIZATION NAME</th>
                    <th className="py-3 px-4">DEPARTMENT NAME</th>
                    <th className="py-3 px-4">LOCATION</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                  {deptList.map((row) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                      <td className="py-2.5 px-4 font-semibold text-slate-800">{row.orgName}</td>
                      <td className="py-2.5 px-4 text-slate-700 font-bold">{row.deptName}</td>
                      <td className="py-2.5 px-4 text-slate-700">{row.location}</td>
                      <td className="py-2.5 px-4 text-right">
                        <button onClick={() => setShowModal(true)} className="p-1 hover:bg-slate-100 rounded text-blue-600 border-none bg-transparent cursor-pointer">
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'designationMaster' ? (
              /* DESIGNATION MASTER TABLE (User Image 2) */
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-4">DESIGNATION</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                  {designationList.map((row) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                      <td className="py-2.5 px-4 font-bold text-slate-800 uppercase">{row.name}</td>
                      <td className="py-2.5 px-4 text-right flex items-center justify-end gap-3 text-blue-600">
                        <button onClick={() => setShowModal(true)} className="p-1 hover:bg-slate-100 rounded text-blue-600 border-none bg-transparent cursor-pointer">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDesignationList(prev => prev.filter(d => d.id !== row.id))}
                          className="p-1 hover:bg-red-50 text-red-600 rounded border-none bg-transparent cursor-pointer flex items-center gap-1 text-xs font-semibold"
                        >
                          <Trash2 size={16} />
                          <span>DELETE</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : activeTab === 'holidayMaster' ? (
              /* HOLIDAY MASTER TABLE (Prompt Image 1) */
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-4">HOLIDAY DESCRIPTION</th>
                    <th className="py-3 px-4">DATE</th>
                    <th className="py-3 px-4 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                  {holidayList.map((row) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                      <td className="py-2.5 px-4 font-semibold text-slate-800">{row.description}</td>
                      <td className="py-2.5 px-4 text-slate-700 font-mono">{row.date}</td>
                      <td className="py-2.5 px-4 text-right flex items-center justify-end gap-3 text-blue-600">
                        <button onClick={() => setShowModal(true)} className="p-1 hover:bg-slate-100 rounded text-blue-600 border-none bg-transparent cursor-pointer">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setHolidayList(prev => prev.filter(h => h.id !== row.id))}
                          className="p-1 hover:bg-red-50 text-red-600 rounded border-none bg-transparent cursor-pointer flex items-center gap-1 text-xs font-semibold"
                        >
                          <Trash2 size={16} />
                          <span>DELETE</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (activeTab === 'leaveManagement' || activeTab === 'applyLeave') ? (
              /* LEAVE MASTER TABLE (Prompt Image 5) */
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">ORGANIZATIONNAME</th>
                    <th className="py-3 px-3">DNAME</th>
                    <th className="py-3 px-3">EMPNAME</th>
                    <th className="py-3 px-3">LEAVE TYPE</th>
                    <th className="py-3 px-3">APPLICATIONDATE</th>
                    <th className="py-3 px-3">FROMDATE</th>
                    <th className="py-3 px-3">TODATE</th>
                    <th className="py-3 px-3">NOOFDAYS</th>
                    <th className="py-3 px-3 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                  {leaveList.map((row) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[46px] transition-colors bg-white">
                      <td className="py-2 px-3 font-semibold text-slate-700">{row.id}</td>
                      <td className="py-2 px-3 text-slate-700 font-medium">{row.orgName}</td>
                      <td className="py-2 px-3 text-slate-700 uppercase">{row.dName}</td>
                      <td className="py-2 px-3 font-bold text-slate-800">{row.empName}</td>
                      <td className="py-2 px-3 text-slate-700 font-semibold">{row.leaveType}</td>
                      <td className="py-2 px-3 text-slate-600 font-mono">{row.appDate}</td>
                      <td className="py-2 px-3 text-slate-600 font-mono">{row.fromDate}</td>
                      <td className="py-2 px-3 text-slate-600 font-mono">{row.toDate}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800">{row.noOfDays}</td>
                      <td className="py-2 px-3 text-right">
                        <button onClick={() => setShowModal(true)} className="p-1.5 hover:bg-slate-100 rounded text-blue-600 border-none bg-transparent cursor-pointer">
                          <Edit2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              /* VIEW EMPLOYEE / GENERAL HR TABLE (Prompt Image 4) */
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-3">ACTION</th>
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">EMP NAME</th>
                    <th className="py-3 px-3">ADDRESS</th>
                    <th className="py-3 px-3">MOBILE NO</th>
                    <th className="py-3 px-3">EMAIL ID</th>
                    <th className="py-3 px-3">GENDER</th>
                    <th className="py-3 px-3">MARITAL STATUS</th>
                    <th className="py-3 px-3">QUALIFICATION</th>
                    <th className="py-3 px-3">DATE OF JOINING</th>
                    <th className="py-3 px-3">CURRENT EXPERIENCE</th>
                    <th className="py-3 px-3">SALARY</th>
                    <th className="py-3 px-3">ORGANIZATION NAME</th>
                    <th className="py-3 px-3">DEPARTMENT NAME</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                  {paginatedEmployees.map((row) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                      <td className="py-2 px-3 text-blue-600 font-semibold cursor-pointer flex items-center gap-1">
                        <span onClick={() => setShowModal(true)}>View</span>
                        <Edit2 size={13} className="text-blue-600" />
                      </td>
                      <td className="py-2 px-3 font-semibold text-slate-700">{row.id}</td>
                      <td className="py-2 px-3 font-bold text-slate-800">{row.empName}</td>
                      <td className="py-2 px-3 text-slate-600">{row.address}</td>
                      <td className="py-2 px-3 font-mono text-slate-700">{row.mobileNo}</td>
                      <td className="py-2 px-3 text-blue-600 font-medium">{row.emailId}</td>
                      <td className="py-2 px-3 font-semibold text-slate-700">{row.gender}</td>
                      <td className="py-2 px-3 text-slate-600">{row.maritalStatus}</td>
                      <td className="py-2 px-3 text-slate-600">{row.qualification}</td>
                      <td className="py-2 px-3 text-slate-700">{row.doj}</td>
                      <td className="py-2 px-3 text-slate-700">{row.currentExp}</td>
                      <td className="py-2 px-3 font-bold text-slate-800">{row.salary}</td>
                      <td className="py-2 px-3 text-slate-600">{row.orgName}</td>
                      <td className="py-2 px-3 font-semibold text-slate-700">{row.deptName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer Pagination */}
          <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between">
            <div className="text-xs text-slate-500">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold disabled:opacity-50 cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold disabled:opacity-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* POPUP FORM MODAL (Policy Master Style for all tabs) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-navy px-6 py-4 text-white flex justify-between items-center shrink-0">
              <h3 className="font-bold text-base flex items-center gap-2">
                <span>» Add / Edit {getTabLabel(activeTab)} Details</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition cursor-pointer border-none bg-transparent"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">

              {/* EMPLOYEE MASTER MODAL FORM */}
              {activeTab === 'employeeMaster' ? (
                <form onSubmit={handleSaveEmployeeFull} className="space-y-6">
                  {/* 1. Employee Details */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                    <div className="bg-brand-navy text-white px-4 py-2 font-bold text-xs rounded">
                      » Employee Details
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Emp Code *</label>
                        <input type="text" value={empCode} onChange={(e) => setEmpCode(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Organization *</label>
                        <select value={empOrg} onChange={(e) => setEmpOrg(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
                          <option value="">--Select Organization Name--</option>
                          <option value="JPB CONSULTANCY PVT LTD">JPB CONSULTANCY PVT LTD</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                        <select value={empDept} onChange={(e) => setEmpDept(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
                          <option value="">--Select Department Name--</option>
                          <option value="SALES">SALES</option>
                          <option value="BACK OFFICE">BACK OFFICE</option>
                          <option value="IT">IT</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Location *</label>
                        <select value={empLoc} onChange={(e) => setEmpLoc(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
                          <option value="">--Select Location Name--</option>
                          <option value="PUNE">PUNE</option>
                          <option value="MUMBAI">MUMBAI</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Designation *</label>
                        <select value={empDesig} onChange={(e) => setEmpDesig(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
                          <option value="">--Select Designation Name--</option>
                          <option value="MANAGER">MANAGER</option>
                          <option value="EXECUTIVE">EXECUTIVE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Middle Name *</label>
                        <input type="text" value={middleName} onChange={(e) => setMiddleName(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Father/Husband Name *</label>
                        <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Mobile No *</label>
                        <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Emergency Mobile No *</label>
                        <input type="text" value={emergencyMobile} onChange={(e) => setEmergencyMobile(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Permanent Address *</label>
                        <input type="text" value={permAddress} onChange={(e) => setPermAddress(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Current Address *</label>
                        <input type="text" value={currAddress} onChange={(e) => setCurrAddress(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">State *</label>
                        <select value={empState} onChange={(e) => setEmpState(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
                          <option value="">--Select State--</option>
                          <option value="MAHARASHTRA">MAHARASHTRA</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">District *</label>
                        <input type="text" value={empDistrict} onChange={(e) => setEmpDistrict(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Taluka *</label>
                        <input type="text" value={empTaluka} onChange={(e) => setEmpTaluka(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Pin code *</label>
                        <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Gender *</label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
                          <option value="">SELECT</option>
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
                          <option value="">SELECT</option>
                          <option value="O+">O+</option>
                          <option value="A+">A+</option>
                          <option value="B+">B+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Marital Status *</label>
                        <select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white">
                          <option value="">Select</option>
                          <option value="Married">Married</option>
                          <option value="Unmarried">Unmarried</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Email Id *</label>
                        <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Qualification *</label>
                        <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">D.O.J *</label>
                        <input type="text" placeholder="dd/MM/yyyy" value={doj} onChange={(e) => setDoj(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">D.O.E *</label>
                        <input type="text" value={doe} onChange={(e) => setDoe(e.target.value)} className="w-full px-2.5 py-1.5 border border-slate-300 rounded bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-sm font-bold shadow transition cursor-pointer border-none"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-8 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white rounded-lg text-sm font-bold shadow transition cursor-pointer border-none"
                    >
                      Reset
                    </button>
                  </div>
                </form>
              ) : activeTab === 'leaveType' ? (
                /* LEAVE TYPE FORM MODAL (New Image 1) */
                <form onSubmit={handleSaveLeaveType} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Leave Type</label>
                    <input
                      type="text"
                      placeholder="Enter Leave Type"
                      value={leaveTypeInput}
                      onChange={(e) => setLeaveTypeInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-xs font-semibold transition border-none"
                    >
                      Save Leave Type
                    </button>
                  </div>
                </form>
              ) : activeTab === 'organizationMaster' ? (
                /* ORGANIZATION DETAILS FORM MODAL (New Image 2) */
                <form onSubmit={handleSaveOrganization} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Organization Name</label>
                    <input
                      type="text"
                      placeholder="Enter Organization Name"
                      value={orgNameInput}
                      onChange={(e) => setOrgNameInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Address</label>
                    <textarea
                      placeholder="Enter Address"
                      value={orgAddressInput}
                      onChange={(e) => setOrgAddressInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contact No</label>
                    <input
                      type="text"
                      placeholder="Enter Contact No"
                      value={orgContactInput}
                      onChange={(e) => setOrgContactInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-xs font-semibold transition border-none"
                    >
                      Save Organization
                    </button>
                  </div>
                </form>
              ) : activeTab === 'departmentMaster' ? (
                /* DEPARTMENT DETAILS FORM MODAL (New Image 3) */
                <form onSubmit={handleSaveDepartment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Organization</label>
                    <select
                      value={deptOrgInput}
                      onChange={(e) => setDeptOrgInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                    >
                      <option value="">--Select Organization Name--</option>
                      <option value="JPB CONSULTANCY PVT LTD">JPB CONSULTANCY PVT LTD</option>
                      <option value="SHARVARI MARKETING">SHARVARI MARKETING</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Department Name</label>
                    <input
                      type="text"
                      placeholder="Enter Department Name"
                      value={deptNameInput}
                      onChange={(e) => setDeptNameInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Department Location</label>
                    <input
                      type="text"
                      placeholder="Enter Location"
                      value={deptLocInput}
                      onChange={(e) => setDeptLocInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-xs font-semibold transition border-none"
                    >
                      Save Department
                    </button>
                  </div>
                </form>
              ) : activeTab === 'designationMaster' ? (
                /* DESIGNATION MASTER FORM MODAL (User Image 2) */
                <form onSubmit={handleSaveDesignation} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Designation</label>
                    <input
                      type="text"
                      placeholder="Enter Designation"
                      value={designationInput}
                      onChange={(e) => setDesignationInput(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-xs font-semibold transition border-none"
                    >
                      Save Designation
                    </button>
                  </div>
                </form>
              ) : (
                /* GENERIC FORM MODAL FOR OTHER TABS */
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Title / Name</label>
                    <input
                      type="text"
                      placeholder={`Enter ${getTabLabel(activeTab)} details`}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                    />
                  </div>
                  <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-5 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-xs font-semibold transition cursor-pointer border-none"
                    >
                      Save Record
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrModule;
