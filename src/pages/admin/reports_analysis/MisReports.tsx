import React, { useState } from 'react';
import { Search, Edit2, Eye, Download, X, Send } from 'lucide-react';

type MisSubTab =
  | 'commission'
  | 'agentSummary'
  | 'agentMIS'
  | 'paymentAdvice'
  | 'agentReport'
  | 'executiveMIS'
  | 'misReport'
  | 'executiveSummary'
  | 'statement'
  | 'outstanding'
  | 'target'
  | 'details';

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
  const [activeTab, setActiveTab] = useState<MisSubTab>('commission');
  const [searchQuery, setSearchQuery] = useState('');

  // Form & Filter inputs
  const [dateType, setDateType] = useState<'trans' | 'risk'>('trans');
  const [fromDate, setFromDate] = useState('2026-10-06');
  const [toDate, setToDate] = useState('2026-10-06');
  const [entityType, setEntityType] = useState<'Agent' | 'Franchise' | 'Franchise Agent'>('Agent');
  const [locationChoice, setLocationChoice] = useState<'Branch' | 'Location'>('Location');

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState('');

  // Form Field Inputs for Agent Wise Summary
  const [commNetSum, setCommNetSum] = useState('');
  const [bankUtrNo, setBankUtrNo] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [differenceAmt, setDifferenceAmt] = useState('');
  const [checkNo, setCheckNo] = useState('');
  const [invNo, setInvNo] = useState('RA0101');

  // Form Modal State
  const [showModal, setShowModal] = useState(false);

  // Sample Data List
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

  // Complete list of all 12 Sub-Tabs from Image 1 dropdown menu
  const tabsList: { key: MisSubTab; label: string }[] = [
    { key: 'commission', label: 'Commission Profit' },
    { key: 'agentSummary', label: 'Agent Wise Summary' },
    { key: 'agentMIS', label: 'Agent MIS' },
    { key: 'paymentAdvice', label: 'Payment Advice' },
    { key: 'agentReport', label: 'Agent Wise Summary Report' },
    { key: 'executiveMIS', label: 'Executive MIS Report' },
    { key: 'misReport', label: 'MIS Report' },
    { key: 'executiveSummary', label: 'Executive Summary' },
    { key: 'statement', label: 'Agent Commission Statement' },
    { key: 'outstanding', label: 'Insurance company Outstanding' },
    { key: 'target', label: 'Executive Target Report' },
    { key: 'details', label: 'Agent MIS Details' }
  ];

  const getTabTitle = (tab: MisSubTab) => {
    return tabsList.find(t => t.key === tab)?.label || 'MIS Report';
  };

  return (
    <div className="w-full flex flex-col space-y-5 font-sans">
      {/* Top Header Bar (Policy Master Style) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#12284A]">MIS Reports</h1>
          <p className="text-sm text-slate-500">Manage commission profit, agent summaries, payment advice & reports</p>
        </div>
      </div>

      {/* Horizontal Scrollable Sub-Tabs List (Exact Policy Master Style) */}
      <div className="flex items-center gap-1.5 bg-white p-2 rounded-xl border border-slate-200 shadow-sm overflow-x-auto custom-scrollbar">
        {tabsList.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setCurrentPage(1); setSearchQuery(''); }}
            className={`px-4 py-2 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${
              activeTab === tab.key
                ? 'bg-[#00a896] text-white shadow-sm'
                : 'text-slate-600 hover:text-[#12284A] hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Full-Width Content Container (Policy Master Card Format) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
        
        {/* TAB 1: COMMISSION PROFIT (Image 2 exact match) */}
        {activeTab === 'commission' && (
          <div className="p-5 border-b border-slate-200 bg-slate-50 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">
              <div className="col-span-1 md:col-span-2 flex items-center gap-6 pb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="dateTypeComm"
                    checked={dateType === 'trans'}
                    onChange={() => setDateType('trans')}
                    className="accent-[#00a896]"
                  />
                  Trans Date
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="dateTypeComm"
                    checked={dateType === 'risk'}
                    onChange={() => setDateType('risk')}
                    className="accent-[#00a896]"
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

        {/* TAB 2: AGENT WISE SUMMARY (Image 3 exact match) */}
        {activeTab === 'agentSummary' && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-3 font-semibold text-sm rounded-lg flex items-center justify-between">
              <span>» Agent Wise Summary</span>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-1.5 bg-white text-[#00a896] hover:bg-slate-100 rounded text-xs font-bold transition shadow-sm cursor-pointer"
              >
                Open Form Modal
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">
              <div className="col-span-1 md:col-span-2 flex items-center gap-6 pb-2">
                <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="summaryEntity"
                    checked={entityType === 'Agent'}
                    onChange={() => setEntityType('Agent')}
                    className="accent-[#00a896]"
                  />
                  Agent
                </label>
                <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="summaryEntity"
                    checked={entityType === 'Franchise'}
                    onChange={() => setEntityType('Franchise')}
                    className="accent-[#00a896]"
                  />
                  Franchise
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
                >
                  <option value="">--Select Agent--</option>
                  <option value="Amit Deshmukh">Amit Deshmukh</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end pt-2 border-t border-slate-200">
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Difference Amt</label>
                <input
                  type="text"
                  placeholder="0.00"
                  value={differenceAmt}
                  onChange={(e) => setDifferenceAmt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Check</label>
                <input
                  type="text"
                  placeholder="Check No"
                  value={checkNo}
                  onChange={(e) => setCheckNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Inv No.</label>
                <input
                  type="text"
                  value={invNo}
                  onChange={(e) => setInvNo(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm font-mono text-slate-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button className="px-6 py-2 bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer">
                Save
              </button>
              <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer">
                View
              </button>
              <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer">
                Export Grid
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PAYMENT ADVICE (Image 5 exact match) */}
        {activeTab === 'paymentAdvice' && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-3 font-semibold text-sm rounded-lg">
              » Payment Advice Report
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <div className="flex items-center gap-6 pb-2">
                <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="payAdviceEntity"
                    checked={entityType === 'Agent'}
                    onChange={() => setEntityType('Agent')}
                    className="accent-[#00a896]"
                  />
                  Agent
                </label>
                <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="payAdviceEntity"
                    checked={entityType === 'Franchise'}
                    onChange={() => setEntityType('Franchise')}
                    className="accent-[#00a896]"
                  />
                  Franchise
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
                >
                  <option value="">--Select Month--</option>
                  <option value="October">October</option>
                </select>
              </div>

              <div>
                <button className="w-full px-5 py-2 bg-[#00a896] hover:bg-[#008f80] text-white rounded-lg text-sm font-semibold shadow-sm transition-all cursor-pointer">
                  View Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: COMMISSION STATEMENT (NEW IMAGE 1 exact match: Commission Paid Statement) */}
        {activeTab === 'statement' && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-3 font-semibold text-sm rounded-lg">
              » Commission Paid Statement
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div className="flex items-center gap-2 pb-2">
                <span className="text-xs font-bold text-slate-700">ALL</span>
                <input type="checkbox" className="w-4 h-4 accent-[#00a896] cursor-pointer" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer">
                  View
                </button>
                <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer">
                  Export Grid
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AGENT WISE SUMMARY REPORT (NEW IMAGE 2 exact match: Sales Ex. Commission Report) */}
        {activeTab === 'agentReport' && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-3 font-semibold text-sm rounded-lg">
              » Sales Ex. Commission Report
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="flex items-center gap-2 pb-2">
                <input
                  type="radio"
                  name="salesDirect"
                  checked
                  readOnly
                  className="w-4 h-4 accent-[#00a896]"
                />
                <span className="text-xs font-bold text-slate-700">Direct</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                <input
                  type="text"
                  placeholder="yyyy"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
                >
                  <option value="">--Select Month--</option>
                  <option value="October">October</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sales Executive</label>
                <select
                  value={selectedExecutive}
                  onChange={(e) => setSelectedExecutive(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
                >
                  <option value="">--Select Executive--</option>
                  <option value="Executive 1">Executive 1</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer">
                View
              </button>
              <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer">
                Export MIS
              </button>
              <button className="px-6 py-2 bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer">
                <Send size={16} />
                <span>Send Mail</span>
              </button>
              <button className="px-6 py-2 bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer">
                <Download size={16} />
                <span>Download pdf</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: MIS REPORT (NEW IMAGE 3 & 4 exact match: MIS Report) */}
        {activeTab === 'misReport' && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-3 font-semibold text-sm rounded-lg">
              » MIS Report
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#00a896]"
                />
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                  View
                </button>
                <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                  Export Grid
                </button>
              </div>
            </div>
          </div>
        )}

        {/* OTHER TABS FALLBACK DEFAULT FORM (Policy Master Format) */}
        {!['commission', 'agentSummary', 'paymentAdvice', 'statement', 'agentReport', 'misReport'].includes(activeTab) && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-[#00a896] text-white px-5 py-3 font-semibold text-sm rounded-lg flex items-center justify-between">
              <span>» {getTabTitle(activeTab)}</span>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-1.5 bg-white text-[#00a896] hover:bg-slate-100 rounded text-xs font-bold transition shadow-sm cursor-pointer"
              >
                Add / Form Modal
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#00a896]"
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
                  View Report
                </button>
                <button className="px-6 py-2 bg-[#ff9800] text-white rounded-lg font-semibold text-sm shadow-sm">
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Table Toolbar (Search bar inside Policy Master card) */}
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

        {/* Full Width Table View (Policy Master Style) */}
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
                    <td className="py-3.5 px-6 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
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

        {/* Footer Pagination (Policy Master Style) */}
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

      {/* FORM MODAL POPUP (Exact Policy Master Modal Style) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#00a896] text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>» {getTabTitle(activeTab)} Form Modal</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
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
