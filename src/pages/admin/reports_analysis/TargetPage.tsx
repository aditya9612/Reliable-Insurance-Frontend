import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import { Edit2, X, CheckCircle2 } from 'lucide-react';

export type TargetSubTab = 'assignTarget' | 'updateTarget' | 'targetReport' | 'monthlyTargetReport';

interface ExecutiveTarget {
  id: number;
  empCode: string;
  empName: string;
  branch: string;
  designation: string;
  motorTarget: number;
  nonMotorTarget: number;
  healthTarget: number;
  totalTarget: number;
  achievedTarget: number;
  month: string;
  finYear: string;
}

interface BranchTargetReport {
  id: number;
  branchName: string;
  month: string;
  finYear: string;
  executiveCount: number;
  targetAmount: number;
  achievedAmount: number;
  variance: number;
  percentage: number;
}

const tabs: TabItem[] = [
  { id: 'assignTarget', label: 'Assign Target' },
  { id: 'updateTarget', label: 'Update Target' },
  { id: 'targetReport', label: 'Target Report' },
  { id: 'monthlyTargetReport', label: 'Monthly Target Report' },
];

export const TargetPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TargetSubTab>('assignTarget');

  // Common Filter States
  const [finYear, setFinYear] = useState('2026-2027');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState('');
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sample Data: Executive Targets
  const [executiveTargets, setExecutiveTargets] = useState<ExecutiveTarget[]>([
    {
      id: 1,
      empCode: 'EMP0014',
      empName: 'ARVIND DNYANESHWAR GAWADE',
      branch: 'BARAMATI',
      designation: 'Senior Sales Manager',
      motorTarget: 250000,
      nonMotorTarget: 100000,
      healthTarget: 50000,
      totalTarget: 400000,
      achievedTarget: 320000,
      month: 'October',
      finYear: '2026-2027'
    },
    {
      id: 2,
      empCode: 'EMP0028',
      empName: 'ADITYA RAJENDRA SAPKAL',
      branch: 'PUNE',
      designation: 'Branch Executive',
      motorTarget: 180000,
      nonMotorTarget: 80000,
      healthTarget: 40000,
      totalTarget: 300000,
      achievedTarget: 290000,
      month: 'October',
      finYear: '2026-2027'
    },
    {
      id: 3,
      empCode: 'EMP0035',
      empName: 'AMOL RAMCHANDRA WANAVE',
      branch: 'BARAMATI',
      designation: 'Sales Officer',
      motorTarget: 150000,
      nonMotorTarget: 60000,
      healthTarget: 30000,
      totalTarget: 240000,
      achievedTarget: 180000,
      month: 'October',
      finYear: '2026-2027'
    },
    {
      id: 4,
      empCode: 'EMP0041',
      empName: 'AVINASH BHARAT KORATKAR',
      branch: 'AHILYANAGAR',
      designation: 'Senior Executive',
      motorTarget: 300000,
      nonMotorTarget: 120000,
      healthTarget: 60000,
      totalTarget: 480000,
      achievedTarget: 450000,
      month: 'October',
      finYear: '2026-2027'
    },
    {
      id: 5,
      empCode: 'EMP0059',
      empName: 'HEMANT RAJU KAKULTE',
      branch: 'PUNE',
      designation: 'Branch Manager',
      motorTarget: 350000,
      nonMotorTarget: 150000,
      healthTarget: 80000,
      totalTarget: 580000,
      achievedTarget: 610000,
      month: 'October',
      finYear: '2026-2027'
    }
  ]);

  // Sample Data: Branch Monthly Target Summary
  const [branchReports] = useState<BranchTargetReport[]>([
    { id: 1, branchName: 'BARAMATI', month: 'October', finYear: '2026-2027', executiveCount: 8, targetAmount: 2400000, achievedAmount: 2150000, variance: -250000, percentage: 89.5 },
    { id: 2, branchName: 'PUNE', month: 'October', finYear: '2026-2027', executiveCount: 14, targetAmount: 4500000, achievedAmount: 4680000, variance: 180000, percentage: 104.0 },
    { id: 3, branchName: 'AHILYANAGAR', month: 'October', finYear: '2026-2027', executiveCount: 6, targetAmount: 1800000, achievedAmount: 1620000, variance: -180000, percentage: 90.0 },
    { id: 4, branchName: 'AKLUJ', month: 'October', finYear: '2026-2027', executiveCount: 4, targetAmount: 1200000, achievedAmount: 1100000, variance: -100000, percentage: 91.6 },
    { id: 5, branchName: 'SAMBHAJINAGAR', month: 'October', finYear: '2026-2027', executiveCount: 10, targetAmount: 3200000, achievedAmount: 3100000, variance: -100000, percentage: 96.8 }
  ]);

  // Edit Target Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTargetItem, setEditingTargetItem] = useState<ExecutiveTarget | null>(null);
  const [modalMotorTarget, setModalMotorTarget] = useState(0);
  const [modalNonMotorTarget, setModalNonMotorTarget] = useState(0);
  const [modalHealthTarget, setModalHealthTarget] = useState(0);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Options lists
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const branchesList = [
    'AHILYANAGAR', 'AKLUJ', 'AKOLA', 'AMRAVATI', 'BARAMATI', 'BARSHI',
    'BEED', 'CHHATRAPATI SAMBHAJINAGAR', 'DHULE', 'LATUR', 'MUMBAI', 'NAGPUR', 'PUNE', 'SATARA', 'SOLAPUR'
  ];

  const salesExecutivesList = [
    'ABHISHEK VILAS GAIKWAD',
    'ADITYA RAJENDRA SAPKAL',
    'AMOL RAMCHANDRA WANAVE',
    'ARVIND DNYANESHWAR GAWADE',
    'AVINASH BHARAT KORATKAR',
    'HEMANT RAJU KAKULTE',
    'HEMANT ARUN PATIL',
    'SANTOSH SAWANT'
  ];

  // Editable row target state for Assign Target tab
  const handleAssignTargetChange = (id: number, field: 'motorTarget' | 'nonMotorTarget' | 'healthTarget', val: number) => {
    setExecutiveTargets(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: val };
        updated.totalTarget = updated.motorTarget + updated.nonMotorTarget + updated.healthTarget;
        return updated;
      }
      return item;
    }));
  };

  const handleSaveAnnualTargets = () => {
    showToast('Annual target details saved successfully!');
  };

  const handleOpenEditModal = (item: ExecutiveTarget) => {
    setEditingTargetItem(item);
    setModalMotorTarget(item.motorTarget);
    setModalNonMotorTarget(item.nonMotorTarget);
    setModalHealthTarget(item.healthTarget);
    setShowEditModal(true);
  };

  const handleSaveEditModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTargetItem) {
      const newTotal = modalMotorTarget + modalNonMotorTarget + modalHealthTarget;
      setExecutiveTargets(prev => prev.map(t => t.id === editingTargetItem.id ? {
        ...t,
        motorTarget: modalMotorTarget,
        nonMotorTarget: modalNonMotorTarget,
        healthTarget: modalHealthTarget,
        totalTarget: newTotal
      } : t));
      showToast(`Target for ${editingTargetItem.empName} updated successfully!`);
    }
    setShowEditModal(false);
  };

  // Filtered dataset calculation
  const getFilteredExecutiveTargets = () => {
    return executiveTargets.filter(item => {
      const matchBranch = !selectedBranch || selectedBranch === '--Select Branch Name--' || item.branch === selectedBranch;
      const matchMonth = !selectedMonth || selectedMonth === '--Select Month Name--' || item.month === selectedMonth;
      const matchExecutive = isAllSelected || !selectedExecutive || selectedExecutive === '--Select Emp Name--' || item.empName === selectedExecutive;
      return matchBranch && matchMonth && matchExecutive;
    });
  };

  const filteredExecTargets = getFilteredExecutiveTargets();
  const totalExecPages = Math.ceil(filteredExecTargets.length / itemsPerPage) || 1;
  const paginatedExecTargets = filteredExecTargets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const filteredBranchReports = branchReports.filter(item => {
    const matchBranch = isAllSelected || !selectedBranch || selectedBranch === '--Select Branch Name--' || item.branchName === selectedBranch;
    const matchMonth = !selectedMonth || selectedMonth === '--Select Month Name--' || item.month === selectedMonth;
    return matchBranch && matchMonth;
  });
  const totalBranchPages = Math.ceil(filteredBranchReports.length / itemsPerPage) || 1;
  const paginatedBranchReports = filteredBranchReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Target Management"
        description="Manage annual & monthly sales targets, updates, and executive performance reports"
      />

      {/* Sub-Tabs Bar */}
      <UnderlineTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId as TargetSubTab);
          setCurrentPage(1);
        }}
      />

      {/* Main Tab Content Card Wrapper */}
      <div key={activeTab} className="tab-transition-wrapper w-full max-w-full">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full max-w-full">

          {/* ========================================================================= */}
          {/* TAB 1: ASSIGN TARGET */}
          {/* ========================================================================= */}
          {activeTab === 'assignTarget' && (
            <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
              {/* Filter Card Container */}
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                {/* Standard Card Header Banner */}
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between">
                  <span>» Annual Target Details</span>
                </div>

                <div className="p-4 sm:p-6 space-y-4 bg-brand-mainbg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-bold text-brand-navy mb-1">Financial Year</label>
                      <input
                        type="text"
                        value={finYear}
                        onChange={(e) => setFinYear(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy mb-1">Month</label>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Month Name--</option>
                        {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Branch</label>
                      <select
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Branch Name--</option>
                        {branchesList.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => showToast('Target details loaded')}
                        className="w-full sm:w-auto px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none uppercase"
                      >
                        view
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assign Target Data Entry Table */}
              <div className="overflow-x-auto w-full max-w-full border border-brand-border rounded-[12px] bg-white custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[950px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] sm:text-[14px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4 text-center w-16">SR. NO.</th>
                      <th className="py-3 px-6">EXECUTIVE NAME</th>
                      <th className="py-3 px-4">BRANCH</th>
                      <th className="py-3 px-4 text-right">MOTOR TARGET (₹)</th>
                      <th className="py-3 px-4 text-right">NON-MOTOR TARGET (₹)</th>
                      <th className="py-3 px-4 text-right">HEALTH TARGET (₹)</th>
                      <th className="py-3 px-6 text-right font-bold">TOTAL TARGET (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[14px]">
                    {paginatedExecTargets.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                        <td className="py-2 px-4 text-center font-medium text-slate-500">{idx + 1}</td>
                        <td className="py-2 px-6 font-semibold text-brand-navy">{row.empName}</td>
                        <td className="py-2 px-4 font-medium text-slate-600">{row.branch}</td>
                        <td className="py-2 px-4 text-right">
                          <input
                            type="number"
                            value={row.motorTarget}
                            onChange={(e) => handleAssignTargetChange(row.id, 'motorTarget', Number(e.target.value))}
                            className="w-full max-w-[120px] min-w-[80px] px-2 py-1.5 border border-slate-300 rounded text-right font-mono text-xs font-semibold focus:ring-2 focus:ring-brand-primary"
                          />
                        </td>
                        <td className="py-2 px-4 text-right">
                          <input
                            type="number"
                            value={row.nonMotorTarget}
                            onChange={(e) => handleAssignTargetChange(row.id, 'nonMotorTarget', Number(e.target.value))}
                            className="w-full max-w-[120px] min-w-[80px] px-2 py-1.5 border border-slate-300 rounded text-right font-mono text-xs font-semibold focus:ring-2 focus:ring-brand-primary"
                          />
                        </td>
                        <td className="py-2 px-4 text-right">
                          <input
                            type="number"
                            value={row.healthTarget}
                            onChange={(e) => handleAssignTargetChange(row.id, 'healthTarget', Number(e.target.value))}
                            className="w-full max-w-[120px] min-w-[80px] px-2 py-1.5 border border-slate-300 rounded text-right font-mono text-xs font-semibold focus:ring-2 focus:ring-brand-primary"
                          />
                        </td>
                        <td className="py-2 px-6 text-right font-mono font-bold text-brand-primary text-base">
                          ₹{row.totalTarget.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Bottom Right Save Button */}
              <div className="flex items-center justify-end pt-2">
                <button
                  type="button"
                  onClick={handleSaveAnnualTargets}
                  className="w-full sm:w-auto px-8 py-2.5 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all duration-200 cursor-pointer border-none uppercase"
                >
                  save
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: UPDATE TARGET */}
          {/* ========================================================================= */}
          {activeTab === 'updateTarget' && (
            <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
              {/* Filter Card Container */}
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between">
                  <span>» Monthly Target Details</span>
                </div>

                <div className="p-4 sm:p-6 space-y-4 bg-brand-mainbg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-brand-navy mb-1">Sales Executive</label>
                      <select
                        value={selectedExecutive}
                        onChange={(e) => setSelectedExecutive(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Emp Name--</option>
                        {salesExecutivesList.map(emp => <option key={emp} value={emp}>{emp}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy mb-1">Financial Year</label>
                      <input
                        type="text"
                        value={finYear}
                        onChange={(e) => setFinYear(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => showToast('Monthly target loaded')}
                        className="w-full sm:w-auto px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none"
                      >
                        Show
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Executive Target Table */}
              <div className="overflow-x-auto w-full max-w-full border border-brand-border rounded-[12px] bg-white custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[950px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] sm:text-[14px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4 text-center w-16">SR. NO.</th>
                      <th className="py-3 px-6">EXECUTIVE NAME</th>
                      <th className="py-3 px-4">MONTH</th>
                      <th className="py-3 px-6 text-right">TARGET PREMIUM (₹)</th>
                      <th className="py-3 px-6 text-right">ACHIEVED PREMIUM (₹)</th>
                      <th className="py-3 px-4 text-center">COMPLETION %</th>
                      <th className="py-3 px-6 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[14px]">
                    {paginatedExecTargets.map((row, idx) => {
                      const pct = Math.round((row.achievedTarget / (row.totalTarget || 1)) * 100);
                      return (
                        <tr key={row.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                          <td className="py-2 px-4 text-center font-medium text-slate-500">{idx + 1}</td>
                          <td className="py-2 px-6 font-semibold text-brand-navy">{row.empName}</td>
                          <td className="py-2 px-4 font-medium text-slate-600">{row.month}</td>
                          <td className="py-2 px-6 text-right font-mono font-bold text-brand-navy">₹{row.totalTarget.toLocaleString()}</td>
                          <td className="py-2 px-6 text-right font-mono font-bold text-emerald-600">₹{row.achievedTarget.toLocaleString()}</td>
                          <td className="py-2 px-4 text-center">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                              pct >= 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {pct}%
                            </span>
                          </td>
                          <td className="py-2 px-6 text-center">
                            <button
                              type="button"
                              onClick={() => handleOpenEditModal(row)}
                              className="px-3 py-1 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] text-xs font-bold transition cursor-pointer border-none flex items-center justify-center gap-1 mx-auto"
                            >
                              <Edit2 size={14} />
                              <span>Update</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Bottom Back Button */}
              <div className="flex items-center justify-center pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('assignTarget')}
                  className="px-8 py-2 bg-[#5B9BD5] hover:bg-[#4A86C6] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none uppercase"
                >
                  BACK
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: TARGET REPORT */}
          {/* ========================================================================= */}
          {activeTab === 'targetReport' && (
            <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
              {/* Filter Card Container */}
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between">
                  <span>» Monthly Target Details</span>
                </div>

                <div className="p-4 sm:p-6 space-y-4 bg-brand-mainbg">
                  <div className="flex flex-wrap items-end gap-4 lg:gap-6">
                    <label className="flex items-center gap-2 text-xs font-bold text-brand-navy cursor-pointer pb-2">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={(e) => setIsAllSelected(e.target.checked)}
                        className="accent-brand-primary w-4 h-4 rounded"
                      />
                      <span>All</span>
                    </label>

                    <div className="flex-1 min-w-[200px] max-w-md">
                      <label className="block text-xs font-bold text-brand-navy mb-1">Sales Executive</label>
                      <select
                        disabled={isAllSelected}
                        value={selectedExecutive}
                        onChange={(e) => setSelectedExecutive(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary disabled:bg-slate-100"
                      >
                        <option value="">--Select Emp Name--</option>
                        {salesExecutivesList.map(emp => <option key={emp} value={emp}>{emp}</option>)}
                      </select>
                    </div>

                    <div className="w-full sm:w-48">
                      <label className="block text-xs font-bold text-brand-navy mb-1">Financial Year</label>
                      <input
                        type="text"
                        value={finYear}
                        onChange={(e) => setFinYear(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => showToast('Target report loaded')}
                        className="flex-1 sm:flex-none px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none"
                      >
                        Show
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast('Report exported as Excel file')}
                        className="flex-1 sm:flex-none px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Target Report Table */}
              <div className="overflow-x-auto w-full max-w-full border border-brand-border rounded-[12px] bg-white custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] sm:text-[14px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4 text-center w-16">SR. NO.</th>
                      <th className="py-3 px-6">EXECUTIVE NAME</th>
                      <th className="py-3 px-4">BRANCH</th>
                      <th className="py-3 px-4">DESIGNATION</th>
                      <th className="py-3 px-6 text-right">TARGET (₹)</th>
                      <th className="py-3 px-6 text-right">ACHIEVED (₹)</th>
                      <th className="py-3 px-6 text-right">VARIANCE (₹)</th>
                      <th className="py-3 px-4 text-center">ACHIEVEMENT %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[14px]">
                    {paginatedExecTargets.map((row, idx) => {
                      const variance = row.achievedTarget - row.totalTarget;
                      const pct = Math.round((row.achievedTarget / (row.totalTarget || 1)) * 100);
                      return (
                        <tr key={row.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                          <td className="py-2 px-4 text-center font-medium text-slate-500">{idx + 1}</td>
                          <td className="py-2 px-6 font-semibold text-brand-navy">{row.empName}</td>
                          <td className="py-2 px-4 font-medium text-slate-600">{row.branch}</td>
                          <td className="py-2 px-4 text-slate-600">{row.designation}</td>
                          <td className="py-2 px-6 text-right font-mono font-bold text-brand-navy">₹{row.totalTarget.toLocaleString()}</td>
                          <td className="py-2 px-6 text-right font-mono font-bold text-emerald-600">₹{row.achievedTarget.toLocaleString()}</td>
                          <td className={`py-2 px-6 text-right font-mono font-bold ${variance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {variance >= 0 ? `+₹${variance.toLocaleString()}` : `-₹${Math.abs(variance).toLocaleString()}`}
                          </td>
                          <td className="py-2 px-4 text-center">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                              pct >= 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {pct}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-[12px]">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <span>Records per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredExecTargets.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredExecTargets.length)} of {filteredExecTargets.length} records
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center text-xs text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 cursor-pointer">&lt;</button>
                  <button className="w-8 h-8 bg-brand-primary text-white font-bold text-xs rounded-md">{currentPage}</button>
                  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalExecPages))} disabled={currentPage === totalExecPages || totalExecPages === 0} className="w-8 h-8 flex items-center justify-center text-xs text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 cursor-pointer">&gt;</button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: MONTHLY TARGET REPORT */}
          {/* ========================================================================= */}
          {activeTab === 'monthlyTargetReport' && (
            <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
              {/* Filter Card Container */}
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between">
                  <span>» Monthly Target Details</span>
                </div>

                <div className="p-4 sm:p-6 space-y-4 bg-brand-mainbg">
                  <div className="flex flex-wrap items-end gap-4 lg:gap-6">
                    <label className="flex items-center gap-2 text-xs font-bold text-brand-navy cursor-pointer pb-2">
                      <input
                        type="checkbox"
                        checked={isAllSelected}
                        onChange={(e) => setIsAllSelected(e.target.checked)}
                        className="accent-brand-primary w-4 h-4 rounded"
                      />
                      <span>All</span>
                    </label>

                    <div className="flex-1 min-w-[180px] max-w-xs">
                      <label className="block text-xs font-bold text-brand-navy mb-1">Branch</label>
                      <select
                        disabled={isAllSelected}
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary disabled:bg-slate-100"
                      >
                        <option value="">--Select Branch Name--</option>
                        {branchesList.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>

                    <div className="w-full sm:w-44">
                      <label className="block text-xs font-bold text-brand-navy mb-1">Month</label>
                      <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Month Name--</option>
                        {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>

                    <div className="w-full sm:w-40">
                      <label className="block text-xs font-bold text-brand-navy mb-1">Financial Year</label>
                      <input
                        type="text"
                        value={finYear}
                        onChange={(e) => setFinYear(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => showToast('Monthly target report loaded')}
                        className="flex-1 sm:flex-none px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none"
                      >
                        Show
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast('Monthly report exported as Excel file')}
                        className="flex-1 sm:flex-none px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monthly Branch Target Report Table */}
              <div className="overflow-x-auto w-full max-w-full border border-brand-border rounded-[12px] bg-white custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] sm:text-[14px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4 text-center w-16">SR. NO.</th>
                      <th className="py-3 px-6">BRANCH NAME</th>
                      <th className="py-3 px-4">MONTH</th>
                      <th className="py-3 px-4 text-center">EXECUTIVE COUNT</th>
                      <th className="py-3 px-6 text-right">TARGET AMOUNT (₹)</th>
                      <th className="py-3 px-6 text-right">ACHIEVED AMOUNT (₹)</th>
                      <th className="py-3 px-6 text-right">VARIANCE (₹)</th>
                      <th className="py-3 px-4 text-center">BRANCH %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[14px]">
                    {paginatedBranchReports.map((row, idx) => (
                      <tr key={row.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                        <td className="py-2 px-4 text-center font-medium text-slate-500">{idx + 1}</td>
                        <td className="py-2 px-6 font-semibold text-brand-navy">{row.branchName}</td>
                        <td className="py-2 px-4 font-medium text-slate-600">{row.month}</td>
                        <td className="py-2 px-4 text-center font-bold text-slate-700">{row.executiveCount}</td>
                        <td className="py-2 px-6 text-right font-mono font-bold text-brand-navy">₹{row.targetAmount.toLocaleString()}</td>
                        <td className="py-2 px-6 text-right font-mono font-bold text-emerald-600">₹{row.achievedAmount.toLocaleString()}</td>
                        <td className={`py-2 px-6 text-right font-mono font-bold ${row.variance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {row.variance >= 0 ? `+₹${row.variance.toLocaleString()}` : `-₹${Math.abs(row.variance).toLocaleString()}`}
                        </td>
                        <td className="py-2 px-4 text-center">
                          <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                            row.percentage >= 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {row.percentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-[12px]">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <span>Records per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredBranchReports.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredBranchReports.length)} of {filteredBranchReports.length} records
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center text-xs text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 cursor-pointer">&lt;</button>
                  <button className="w-8 h-8 bg-brand-primary text-white font-bold text-xs rounded-md">{currentPage}</button>
                  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalBranchPages))} disabled={currentPage === totalBranchPages || totalBranchPages === 0} className="w-8 h-8 flex items-center justify-center text-xs text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 cursor-pointer">&gt;</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* EDIT TARGET MODAL FORM */}
      {showEditModal && editingTargetItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-brand-navy text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
              <h2 className="text-base sm:text-lg font-bold">» Update Executive Target</h2>
              <button onClick={() => setShowEditModal(false)} className="text-white/80 hover:text-white transition-colors cursor-pointer border-none bg-transparent">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditModal} className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-65px)] custom-scrollbar">
              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">Executive Name</label>
                <input type="text" readOnly value={editingTargetItem.empName} className="w-full px-3 py-2 border border-brand-border bg-brand-mainbg rounded-lg text-xs font-semibold text-brand-navy" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-brand-navy mb-1">Branch</label>
                <input type="text" readOnly value={editingTargetItem.branch} className="w-full px-3 py-2 border border-brand-border bg-brand-mainbg rounded-lg text-xs text-brand-navy" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">Motor Target (₹)</label>
                  <input
                    type="number"
                    value={modalMotorTarget}
                    onChange={(e) => setModalMotorTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">Non-Motor Target (₹)</label>
                  <input
                    type="number"
                    value={modalNonMotorTarget}
                    onChange={(e) => setModalNonMotorTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-navy mb-1">Health Target (₹)</label>
                  <input
                    type="number"
                    value={modalHealthTarget}
                    onChange={(e) => setModalHealthTarget(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div className="bg-brand-mainbg p-3 rounded-lg border border-brand-border flex items-center justify-between">
                <span className="text-xs font-bold text-brand-navy">Total Calculated Target:</span>
                <span className="text-base font-bold font-mono text-brand-primary">₹{(modalMotorTarget + modalNonMotorTarget + modalHealthTarget).toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md cursor-pointer border-none"
                >
                  Save Target
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TargetPage;
