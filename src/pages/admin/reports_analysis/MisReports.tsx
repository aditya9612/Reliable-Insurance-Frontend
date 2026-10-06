import React, { useState } from 'react';
import { Search, Edit2, Eye, Download, X, Plus } from 'lucide-react';

interface ReportRow {
  id: number;
  transDate: string;
  riskStartDate: string;
  customerName: string;
  agentName: string;
  branch: string;
  location: string;
  commNetSum: number;
  bankUtrNo: string;
  date: string;
  differenceAmt: number;
  checkNo: string;
  invNo: string;
}

export const MisReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'commission' | 'agentSummary' | 'paymentAdvice' | 'statement' | 'misReport'>('commission');

  // Filter States
  const [dateType, setDateType] = useState<'trans' | 'risk'>('trans');
  const [fromDate, setFromDate] = useState('2026-10-06');
  const [toDate, setToDate] = useState('2026-10-06');
  const [searchQuery, setSearchQuery] = useState('');

  // Form Filter Inputs
  const [entityType, setEntityType] = useState<'Agent' | 'Franchise' | 'Franchise Agent'>('Agent');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');

  // Form Field Inputs for Agent Wise Summary
  const [commNetSum, setCommNetSum] = useState('');
  const [bankUtrNo, setBankUtrNo] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [differenceAmt, setDifferenceAmt] = useState('');
  const [checkNo, setCheckNo] = useState('');
  const [invNo, setInvNo] = useState('RA0101');

  // Modals
  const [showModal, setShowModal] = useState(false);

  // Sample MIS Data
  const [reportsData] = useState<ReportRow[]>([
    {
      id: 1,
      transDate: '2026-10-06',
      riskStartDate: '2026-10-01',
      customerName: 'Ramesh Patel',
      agentName: 'Amit Deshmukh',
      branch: 'BARAMATI',
      location: 'PUNE',
      commNetSum: 15400,
      bankUtrNo: 'UTR99887766',
      date: '2026-10-05',
      differenceAmt: 0,
      checkNo: 'CHK55441',
      invNo: 'RA0101'
    },
    {
      id: 2,
      transDate: '2026-10-06',
      riskStartDate: '2026-10-04',
      customerName: 'Sunita Sharma',
      agentName: 'Sneha Kulkarni',
      branch: 'MUMBAI',
      location: 'MUMBAI',
      commNetSum: 28900,
      bankUtrNo: 'UTR11223344',
      date: '2026-10-06',
      differenceAmt: 250,
      checkNo: 'CHK88990',
      invNo: 'RA0102'
    }
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtered List
  const filteredData = reportsData.filter(
    item =>
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.invNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  return (
    <div className="w-full flex flex-col space-y-5">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#12284A]">MIS & Reports</h1>
          <p className="text-sm text-slate-500">View commission, agent summaries, payment advice & statement reports</p>
        </div>

        {/* Tab Selector Buttons (Branch Master Style) */}
        <div className="flex items-center gap-1 sm:gap-2 bg-[#F5FAFF] p-1.5 rounded-lg border border-slate-200 overflow-x-auto">
          {[
            { key: 'commission', label: 'Commission Profit' },
            { key: 'agentSummary', label: 'Agent Wise Summary' },
            { key: 'paymentAdvice', label: 'Payment Advice' },
            { key: 'statement', label: 'Commission Statement' },
            { key: 'misReport', label: 'MIS Report' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key as any); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-md font-medium text-xs sm:text-sm transition-all duration-200 whitespace-nowrap cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-[#00a896] text-white shadow-md'
                  : 'text-slate-600 hover:text-[#12284A] hover:bg-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area Based on Active Tab */}

      {/* TAB 1: COMMISSION PROFIT (In-line Filter Bar + Table) */}
      {activeTab === 'commission' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full space-y-4 p-5">
          {/* Filter Bar (Image 2 style) */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">
            <div className="col-span-1 md:col-span-2 flex items-center gap-6 pb-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="dateTypeComm"
                  checked={dateType === 'trans'}
                  onChange={() => setDateType('trans')}
                  className="text-[#00a896] focus:ring-[#00a896]"
                />
                Trans Date
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="dateTypeComm"
                  checked={dateType === 'risk'}
                  onChange={() => setDateType('risk')}
                  className="text-[#00a896] focus:ring-[#00a896]"
                />
                Risk Start Date
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#00a896]"
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(1)}
                className="flex-1 px-5 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg font-semibold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Eye size={16} />
                <span>Show</span>
              </button>
              <button
                onClick={() => alert('Exporting Grid...')}
                className="flex-1 px-5 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white rounded-lg font-semibold text-sm shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Download size={16} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AGENT WISE SUMMARY (Tab Specific Form Modal Button + Form Modal) */}
      {activeTab === 'agentSummary' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#12284A]">Agent Wise Summary</h3>
              <p className="text-xs text-slate-500">Open form modal or view summary records</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg font-semibold text-sm shadow-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Agent Wise Summary Form</span>
            </button>
          </div>

          {/* Inline Form View (Image 3 exact layout) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
              » Agent Wise Summary
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="summaryEntity"
                  checked={entityType === 'Agent'}
                  onChange={() => setEntityType('Agent')}
                  className="text-[#00a896] focus:ring-[#00a896]"
                />
                Agent
              </label>
              <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="summaryEntity"
                  checked={entityType === 'Franchise'}
                  onChange={() => setEntityType('Franchise')}
                  className="text-[#00a896] focus:ring-[#00a896]"
                />
                Franchise
              </label>

              <div className="ml-auto flex items-center gap-3">
                <button className="px-5 py-2 bg-[#0869D8] text-white rounded-lg text-xs font-semibold">View</button>
                <button className="px-5 py-2 bg-[#ff9800] text-white rounded-lg text-xs font-semibold">Export Grid</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option value="">--Select Branch--</option>
                  <option value="BARAMATI">BARAMATI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Agent</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option value="">--Select Agent--</option>
                  <option value="Amit Deshmukh">Amit Deshmukh</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Comm. NET Sum</label>
                <input
                  type="text"
                  placeholder="0.00"
                  value={commNetSum}
                  onChange={(e) => setCommNetSum(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bank UTR No.</label>
                <input
                  type="text"
                  placeholder="Enter UTR No"
                  value={bankUtrNo}
                  onChange={(e) => setBankUtrNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Difference Amt</label>
                <input
                  type="text"
                  placeholder="0.00"
                  value={differenceAmt}
                  onChange={(e) => setDifferenceAmt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Check</label>
                <input
                  type="text"
                  placeholder="Enter check info"
                  value={checkNo}
                  onChange={(e) => setCheckNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Inv No.</label>
                <input
                  type="text"
                  value={invNo}
                  onChange={(e) => setInvNo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm font-mono"
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => alert('Saved successfully!')}
                  className="px-6 py-2 bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PAYMENT ADVICE (Image 5 exact layout) */}
      {activeTab === 'paymentAdvice' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
              » Payment Advice Report
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="paymentEntity"
                  checked={entityType === 'Agent'}
                  onChange={() => setEntityType('Agent')}
                  className="text-[#00a896] focus:ring-[#00a896]"
                />
                Agent
              </label>
              <label className="flex items-center gap-2 font-semibold text-slate-700 cursor-pointer">
                <input
                  type="radio"
                  name="paymentEntity"
                  checked={entityType === 'Franchise'}
                  onChange={() => setEntityType('Franchise')}
                  className="text-[#00a896] focus:ring-[#00a896]"
                />
                Franchise
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option value="">--Select Branch--</option>
                  <option value="BARAMATI">BARAMATI</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Agent</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                >
                  <option value="">--Select Agent--</option>
                  <option value="Amit Deshmukh">Amit Deshmukh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <button className="w-full px-5 py-2 bg-[#00a896] hover:bg-[#008f80] text-white rounded-lg text-sm font-semibold shadow-sm">
                  View Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMMISSION STATEMENT (Image 4 exact layout) */}
      {activeTab === 'statement' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
              » Commission Paid Statement
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="allCheck" className="text-[#00a896] focus:ring-[#00a896]" />
                <label htmlFor="allCheck" className="text-xs font-bold text-slate-700">ALL</label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button className="px-6 py-2 bg-[#0869D8] text-white rounded-lg font-semibold text-sm shadow-sm">
                View
              </button>
              <button className="px-6 py-2 bg-[#ff9800] text-white rounded-lg font-semibold text-sm shadow-sm">
                Export Grid
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MIS REPORT (Image 1 bottom form) */}
      {activeTab === 'misReport' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-2.5 rounded-lg font-semibold text-sm">
              » MIS Report
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <button className="px-6 py-2 bg-[#0869D8] text-white rounded-lg font-semibold text-sm shadow-sm">
                  View
                </button>
                <button className="px-6 py-2 bg-[#ff9800] text-white rounded-lg font-semibold text-sm shadow-sm">
                  Export Grid
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Width Data Table (Branch Master Style) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
        {/* Table Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search Customer / Agent / Inv No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
            />
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredData.length} records found
          </span>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#00a896] text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6">Sr. No.</th>
                <th className="py-3.5 px-6">Trans Date</th>
                <th className="py-3.5 px-6">Risk Start Date</th>
                <th className="py-3.5 px-6">Customer Name</th>
                <th className="py-3.5 px-6">Agent Name</th>
                <th className="py-3.5 px-6">Branch / Location</th>
                <th className="py-3.5 px-6">Comm Net Sum</th>
                <th className="py-3.5 px-6">Inv / UTR No</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400 font-semibold uppercase bg-slate-50/50">
                    NO DATA FOUND
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-slate-500">{idx + 1}</td>
                    <td className="py-3.5 px-6 font-medium text-slate-800">{item.transDate}</td>
                    <td className="py-3.5 px-6 font-medium text-slate-800">{item.riskStartDate}</td>
                    <td className="py-3.5 px-6 font-semibold text-[#12284A]">{item.customerName}</td>
                    <td className="py-3.5 px-6">{item.agentName}</td>
                    <td className="py-3.5 px-6">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        {item.branch} / {item.location}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-green-700">₹{item.commNetSum.toLocaleString('en-IN')}</td>
                    <td className="py-3.5 px-6 font-mono text-xs text-blue-600">{item.invNo} / {item.bankUtrNo}</td>
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => setShowModal(true)}
                        className="p-1.5 text-[#8BA4CA] hover:text-[#0869D8] hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                        title="Edit Record"
                      >
                        <Edit2 size={18} strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination (Branch Master Style) */}
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
            Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
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

      {/* FORM MODAL (Shown only when triggered inside Tab) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#00a896] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>» MIS Record Entry Form</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Saved successfully!');
                setShowModal(false);
              }}
              className="p-6 space-y-4 overflow-y-auto custom-scrollbar text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
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
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="">--Select Branch--</option>
                    <option value="BARAMATI">BARAMATI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Agent</label>
                  <select
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="">--Select Agent--</option>
                    <option value="Amit Deshmukh">Amit Deshmukh</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
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
    </div>
  );
};

export default MisReports;
