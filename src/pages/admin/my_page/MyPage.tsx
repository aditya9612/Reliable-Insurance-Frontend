import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Calendar, Clock, FileText, Search, X, Edit2, KeyRound } from 'lucide-react';

interface LeaveRequest {
  id: number;
  fromDate: string;
  toDate: string;
  leaveType: 'Full Day' | 'Half Day';
  duration: string;
  reason: string;
  handoverTo: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedOn: string;
}

interface TodaysLeaveItem {
  id: number;
  empName: string;
  empCode: string;
  department: string;
  leaveType: string;
  duration: string;
  contactNo: string;
}

interface LeaveReportItem {
  id: number;
  empCode: string;
  empName: string;
  month: string;
  financialYear: string;
  totalLeave: number;
  approved: number;
  pending: number;
  cancelled: number;
}

export const MyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'todays' | 'report'>('apply');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Apply Leave Form State
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [dayType, setDayType] = useState<'Full Day' | 'Half Day'>('Full Day');
  const [duration, setDuration] = useState('1 Day');
  const [reason, setReason] = useState('');
  const [handoverTo, setHandoverTo] = useState('');

  // Sample Leave History
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: 1,
      fromDate: '2024-10-10',
      toDate: '2024-10-12',
      leaveType: 'Full Day',
      duration: '3 Days',
      reason: 'Personal Work',
      handoverTo: 'Rahul Sharma',
      status: 'Approved',
      appliedOn: '2024-10-01'
    },
    {
      id: 2,
      fromDate: '2024-10-18',
      toDate: '2024-10-18',
      leaveType: 'Half Day',
      duration: '0.5 Day',
      reason: 'Medical Checkup',
      handoverTo: 'Priya Verma',
      status: 'Pending',
      appliedOn: '2024-10-05'
    }
  ]);

  // Today's Leave Data
  const [todaysLeaves] = useState<TodaysLeaveItem[]>([
    {
      id: 1,
      empCode: 'EMP0042',
      empName: 'Sanjay Patil',
      department: 'Accounts',
      leaveType: 'Casual Leave',
      duration: 'Full Day',
      contactNo: '+91 9876543210'
    },
    {
      id: 2,
      empCode: 'EMP0089',
      empName: 'Priya Verma',
      department: 'Underwriting',
      leaveType: 'Medical Leave',
      duration: 'Half Day',
      contactNo: '+91 9812345678'
    }
  ]);

  // Leave Report Data
  const [reportMonth, setReportMonth] = useState('');
  const [reportYear, setReportYear] = useState('2024-2025');
  const [reportStatusFilter, setReportStatusFilter] = useState<'all' | 'approval' | 'pending'>('all');

  const [leaveReports] = useState<LeaveReportItem[]>([
    {
      id: 1,
      empCode: 'EMP0012',
      empName: 'Amit Deshmukh',
      month: 'October',
      financialYear: '2024-2025',
      totalLeave: 12,
      approved: 4,
      pending: 1,
      cancelled: 0
    },
    {
      id: 2,
      empCode: 'EMP0025',
      empName: 'Sneha Kulkarni',
      month: 'October',
      financialYear: '2024-2025',
      totalLeave: 12,
      approved: 2,
      pending: 0,
      cancelled: 1
    }
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Password Submit
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('All fields are required!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New Password & Confirm Password do not match!');
      return;
    }
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(false);
  };

  // Leave Submit
  const handleApplyLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromDate || !toDate) {
      alert('Please select From Date and To Date');
      return;
    }

    const newReq: LeaveRequest = {
      id: leaveRequests.length + 1,
      fromDate,
      toDate,
      leaveType: dayType,
      duration: duration || '1 Day',
      reason,
      handoverTo,
      status: 'Pending',
      appliedOn: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([newReq, ...leaveRequests]);
    setFromDate('');
    setToDate('');
    setReason('');
    setHandoverTo('');
    setShowApplyModal(false);
    alert('Leave Application submitted successfully!');
  };

  // Filtered Lists
  const filteredLeaveRequests = leaveRequests.filter(
    r =>
      r.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.handoverTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.leaveType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTodaysLeaves = todaysLeaves.filter(
    item =>
      item.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.empCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLeaveReports = leaveReports.filter(item => {
    const matchesEmp =
      item.empName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.empCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMonth = !reportMonth || item.month.toLowerCase() === reportMonth.toLowerCase();
    const matchesFilter =
      reportStatusFilter === 'all'
        ? true
        : reportStatusFilter === 'approval'
        ? item.approved > 0
        : item.pending > 0;
    return matchesEmp && matchesMonth && matchesFilter;
  });

  // Calculate current active tab dataset for pagination
  const getCurrentDataLength = () => {
    if (activeTab === 'apply') return filteredLeaveRequests.length;
    if (activeTab === 'todays') return filteredTodaysLeaves.length;
    return filteredLeaveReports.length;
  };

  const totalRecords = getCurrentDataLength();
  const totalPages = Math.ceil(totalRecords / itemsPerPage) || 1;

  return (
    <div className="w-full flex flex-col space-y-5">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="My Page"
          description="Manage password, leave applications, daily schedules & reports"
        />

        {/* Change Password Button */}
        <button
          onClick={() => setShowPasswordModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] font-semibold text-[14px] shadow-sm transition-all duration-200 cursor-pointer border-none"
        >
          <KeyRound size={16} />
          <span>Change Password</span>
        </button>
      </div>

      <UnderlineTabs
        tabs={[
          { id: 'apply', label: 'Apply Leave' },
          { id: 'todays', label: "Today's Leave List" },
          { id: 'report', label: 'Leave Summary Report' }
        ]}
        activeTab={activeTab}
        onTabChange={(tabId) => { setActiveTab(tabId as 'apply' | 'todays' | 'report'); setCurrentPage(1); }}
      />

      {/* Main Full-Width Content Card */}
      <div key={activeTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={
                activeTab === 'apply'
                  ? 'Search Leave History...'
                  : activeTab === 'todays'
                  ? 'Search Emp Name/Code...'
                  : 'Search Leave Report...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {activeTab === 'apply' && (
              <button
                onClick={() => setShowApplyModal(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>Apply New Leave</span>
              </button>
            )}

            {activeTab === 'report' && (
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={reportMonth}
                  onChange={(e) => setReportMonth(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                >
                  <option value="">--Select Month--</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="December">December</option>
                </select>
                <select
                  value={reportYear}
                  onChange={(e) => setReportYear(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                >
                  <option value="2024-2025">2024-2025</option>
                  <option value="2023-2024">2023-2024</option>
                </select>
                <button
                  onClick={() => setReportStatusFilter(prev => prev === 'approval' ? 'all' : 'approval')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    reportStatusFilter === 'approval'
                      ? 'bg-[#0869D8] text-white shadow-sm'
                      : 'bg-white text-[#0869D8] border border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  view Approval
                </button>
                <button
                  onClick={() => setReportStatusFilter(prev => prev === 'pending' ? 'all' : 'pending')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                    reportStatusFilter === 'pending'
                      ? 'bg-[#0869D8] text-white shadow-sm'
                      : 'bg-white text-[#0869D8] border border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  cancel/Pending
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Full-Width Table View */}
        <div className="overflow-x-auto w-full">
          {/* TAB 1: Leave Apply History Table */}
          {activeTab === 'apply' && (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                  <th className="py-3 px-6">SR. NO.</th>
                  <th className="py-3 px-6">FROM DATE</th>
                  <th className="py-3 px-6">TO DATE</th>
                  <th className="py-3 px-6">LEAVE TYPE</th>
                  <th className="py-3 px-6">DURATION</th>
                  <th className="py-3 px-6">REASON</th>
                  <th className="py-3 px-6">HANDOVER TO</th>
                  <th className="py-3 px-6">STATUS</th>
                  <th className="py-3 px-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-[14px]">
                {filteredLeaveRequests.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-brand-muted font-semibold uppercase bg-brand-mainbg">
                      NO DATA FOUND
                    </td>
                  </tr>
                ) : (
                  filteredLeaveRequests.map((req, idx) => (
                    <tr key={req.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-2 px-6 font-medium text-brand-muted">{idx + 1}</td>
                      <td className="py-2 px-6 font-medium text-brand-navy">{req.fromDate}</td>
                      <td className="py-2 px-6 font-medium text-brand-navy">{req.toDate}</td>
                      <td className="py-2 px-6 text-brand-navy">{req.leaveType}</td>
                      <td className="py-2 px-6 text-brand-navy">{req.duration}</td>
                      <td className="py-2 px-6 text-brand-muted">{req.reason}</td>
                      <td className="py-2 px-6 text-brand-muted">{req.handoverTo}</td>
                      <td className="py-2 px-6">
                        <span
                          className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                            req.status === 'Approved'
                              ? 'bg-green-50 text-green-700 border border-green-200'
                              : req.status === 'Pending'
                              ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="py-2 px-6 text-right">
                        <button
                          onClick={() => setShowApplyModal(true)}
                          className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Edit Leave Request"
                        >
                          <Edit2 size={18} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* TAB 2: Today's Leave Table */}
          {activeTab === 'todays' && (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                  <th className="py-3 px-6">SR. NO.</th>
                  <th className="py-3 px-6">EMP CODE</th>
                  <th className="py-3 px-6">EMPLOYEE NAME</th>
                  <th className="py-3 px-6">DEPARTMENT</th>
                  <th className="py-3 px-6">LEAVE TYPE</th>
                  <th className="py-3 px-6">DURATION</th>
                  <th className="py-3 px-6">CONTACT NO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-[14px]">
                {filteredTodaysLeaves.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-brand-muted font-semibold uppercase bg-brand-mainbg">
                      NO DATA FOUND
                    </td>
                  </tr>
                ) : (
                  filteredTodaysLeaves.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-2 px-6 font-medium text-brand-muted">{idx + 1}</td>
                      <td className="py-2 px-6 font-mono font-medium text-brand-primary">{item.empCode}</td>
                      <td className="py-2 px-6 font-medium text-brand-navy">{item.empName}</td>
                      <td className="py-2 px-6 text-brand-muted">{item.department}</td>
                      <td className="py-2 px-6">
                        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-lightbg text-brand-primary border border-brand-border">
                          {item.leaveType}
                        </span>
                      </td>
                      <td className="py-2 px-6 text-brand-navy">{item.duration}</td>
                      <td className="py-2 px-6 text-brand-muted">{item.contactNo}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {/* TAB 3: Leave Report Table */}
          {activeTab === 'report' && (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                  <th className="py-3 px-6">SR. NO.</th>
                  <th className="py-3 px-6">EMP CODE</th>
                  <th className="py-3 px-6">EMP NAME</th>
                  <th className="py-3 px-6">MONTH</th>
                  <th className="py-3 px-6">FINANCIAL YEAR</th>
                  <th className="py-3 px-6">TOTAL LEAVE</th>
                  <th className="py-3 px-6">APPROVED</th>
                  <th className="py-3 px-6">PENDING</th>
                  <th className="py-3 px-6">CANCELLED</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-[14px]">
                {filteredLeaveReports.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-brand-muted font-semibold uppercase bg-brand-mainbg">
                      NO DATA FOUND
                    </td>
                  </tr>
                ) : (
                  filteredLeaveReports.map((report, idx) => (
                    <tr key={report.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-2 px-6 font-medium text-brand-muted">{idx + 1}</td>
                      <td className="py-2 px-6 font-mono font-medium text-brand-primary">{report.empCode}</td>
                      <td className="py-2 px-6 font-medium text-brand-navy">{report.empName}</td>
                      <td className="py-2 px-6 text-brand-navy">{report.month}</td>
                      <td className="py-2 px-6 text-brand-muted">{report.financialYear}</td>
                      <td className="py-2 px-6 font-semibold text-brand-navy">{report.totalLeave}</td>
                      <td className="py-2 px-6 text-green-600 font-semibold">{report.approved}</td>
                      <td className="py-2 px-6 text-yellow-600 font-semibold">{report.pending}</td>
                      <td className="py-2 px-6 text-red-600 font-semibold">{report.cancelled}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Pagination */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Records per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0869D8] cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing {totalRecords === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalRecords)} of {totalRecords} records
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${
                  currentPage === page
                    ? 'bg-[#0869D8] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>

      {/* FORM MODAL 1: Change Password Form Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>» Change Password Form</span>
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Confirm Password</label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORM MODAL 2: Apply Leave Form Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>» Leave Apply Form</span>
              </h3>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleApplyLeaveSubmit} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">From Date</label>
                  <input
                    type="date"
                    required
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                  />
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="modalDayTypeFrom"
                        checked={dayType === 'Full Day'}
                        onChange={() => setDayType('Full Day')}
                        className="text-[#00a896] focus:ring-[#00a896]"
                      />
                      Full Day
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="modalDayTypeFrom"
                        checked={dayType === 'Half Day'}
                        onChange={() => setDayType('Half Day')}
                        className="text-[#00a896] focus:ring-[#00a896]"
                      />
                      Half Day
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">To Date</label>
                  <input
                    type="date"
                    required
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                  />
                  <div className="flex items-center gap-4 mt-2">
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="modalDayTypeTo"
                        checked={dayType === 'Full Day'}
                        onChange={() => setDayType('Full Day')}
                        className="text-[#00a896] focus:ring-[#00a896]"
                      />
                      Full Day
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="modalDayTypeTo"
                        checked={dayType === 'Half Day'}
                        onChange={() => setDayType('Half Day')}
                        className="text-[#00a896] focus:ring-[#00a896]"
                      />
                      Half Day
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 1 Day"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason</label>
                <textarea
                  rows={2}
                  placeholder="Enter leave reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Handover To</label>
                <textarea
                  rows={2}
                  placeholder="Colleague name & duties assigned"
                  value={handoverTo}
                  onChange={(e) => setHandoverTo(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
