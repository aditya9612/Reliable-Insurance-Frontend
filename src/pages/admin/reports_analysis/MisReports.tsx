import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
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
      {/* Top Header Bar */}
      <PageHeader
        title="MIS Reports"
        description="Manage commission profit, agent summaries, payment advice & reports"
      />

      {/* Horizontal Sub-Tabs Bar */}
      <UnderlineTabs
        tabs={tabsList.map(tab => ({ id: tab.key, label: tab.label }))}
        activeTab={activeTab}
        onTabChange={(tabId) => { setActiveTab(tabId as MisSubTab); setCurrentPage(1); setSearchQuery(''); }}
      />

      {/* Main Full-Width Content Container */}
      <div key={activeTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
        
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
                    className="accent-[#0869D8]"
                  />
                  Trans Date
                </label>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="dateTypeComm"
                    checked={dateType === 'risk'}
                    onChange={() => setDateType('risk')}
                    className="accent-[#0869D8]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0869D8]"
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

        {/* TAB 2: AGENT WISE SUMMARY */}
        {activeTab === 'agentSummary' && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-3 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
              <span>» Agent Wise Summary</span>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-1.5 bg-[#0869D8] text-white hover:bg-[#0654B0] rounded text-xs font-bold transition shadow-sm cursor-pointer border-none"
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
                    className="accent-[#0869D8]"
                  />
                  Agent
                </label>
                <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="summaryEntity"
                    checked={entityType === 'Franchise'}
                    onChange={() => setEntityType('Franchise')}
                    className="accent-[#0869D8]"
                  />
                  Franchise
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Difference Amt</label>
                <input
                  type="text"
                  placeholder="0.00"
                  value={differenceAmt}
                  onChange={(e) => setDifferenceAmt(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Check</label>
                <input
                  type="text"
                  placeholder="Check No"
                  value={checkNo}
                  onChange={(e) => setCheckNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
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
              <button className="px-6 py-2 bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                Save
              </button>
              <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                View
              </button>
              <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                Export Grid
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: PAYMENT ADVICE */}
        {activeTab === 'paymentAdvice' && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-3 font-semibold text-sm rounded-lg shadow-xs">
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
                    className="accent-[#0869D8]"
                  />
                  Agent
                </label>
                <label className="flex items-center gap-2 font-semibold text-sm text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="payAdviceEntity"
                    checked={entityType === 'Franchise'}
                    onChange={() => setEntityType('Franchise')}
                    className="accent-[#0869D8]"
                  />
                  Franchise
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                >
                  <option value="">--Select Month--</option>
                  <option value="October">October</option>
                </select>
              </div>

              <div>
                <button className="w-full px-5 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-sm font-semibold shadow-sm transition-all cursor-pointer border-none">
                  View Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: COMMISSION STATEMENT */}
        {activeTab === 'statement' && (
          <div className="p-5 border-b border-brand-border bg-brand-mainbg/30 space-y-4">
            <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-3 font-semibold text-sm rounded-lg flex items-center shadow-xs">
              <span>» Commission Statement</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Agent</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                >
                  <option value="">--Select Agent--</option>
                  <option value="Amit Deshmukh">Amit Deshmukh</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div className="flex items-center gap-3">
                <button className="px-5 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                  View
                </button>
                <button className="px-5 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                  Export Grid
                </button>
                <button className="px-5 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none flex items-center gap-1.5">
                  <Download size={15} />
                  <span>Download Pdf</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: EXECUTIVE TARGET REPORT */}
        {activeTab === 'target' && (
          <div className="p-5 border-b border-brand-border bg-brand-mainbg/30 space-y-4">
            <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-3 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
              <span>» Executive Target Report</span>
              <button className="px-4 py-1.5 bg-[#ff9800] hover:bg-[#fb8c00] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none">
                Export To Excel
              </button>
            </div>

            {/* Matrix Table View for Executive Targets */}
            <div className="overflow-x-auto w-full border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse min-w-[1200px] text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold uppercase border-b border-slate-200">
                    <th className="py-2.5 px-3 border border-slate-200">SR.NO.</th>
                    <th className="py-2.5 px-3 border border-slate-200">BRANCH</th>
                    <th className="py-2.5 px-3 border border-slate-200">SALES PERSON NAME</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right">APRIL TAR</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right">APRIL ACHV</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right">MAY TAR</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right">MAY ACHV</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right">JUNE TAR</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right">JUNE ACHV</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right bg-slate-200">Q1 TOTAL ACHV</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right">JULY TAR</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right">JULY ACHV</th>
                    <th className="py-2.5 px-3 border border-slate-200 text-right bg-slate-200">YEAR TOTAL ACHV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2 px-3 border text-center font-medium">1</td>
                    <td className="py-2 px-3 border font-semibold">AHILYANAGAR</td>
                    <td className="py-2 px-3 border font-medium">AMIN DASTAGIR PATHAN</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right font-bold bg-slate-100">0.00</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right font-semibold text-green-700">85899.00</td>
                    <td className="py-2 px-3 border text-right font-bold text-blue-700 bg-slate-100">112978.00</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2 px-3 border text-center font-medium">2</td>
                    <td className="py-2 px-3 border font-semibold">AHILYANAGAR</td>
                    <td className="py-2 px-3 border font-medium">PRASHANT DILIPRAO MOHEKAR</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right font-semibold">1693762.92</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right font-semibold">329499.33</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right font-bold bg-slate-100 text-green-700">2023262.25</td>
                    <td className="py-2 px-3 border text-right">0.00</td>
                    <td className="py-2 px-3 border text-right font-semibold">397308.00</td>
                    <td className="py-2 px-3 border text-right font-bold text-blue-700 bg-slate-100">10254993.26</td>
                  </tr>
                  <tr className="bg-slate-200 font-bold text-slate-900">
                    <td colSpan={3} className="py-2.5 px-3 border">SUB TOTAL (AHILYANAGAR)</td>
                    <td className="py-2.5 px-3 border text-right">0.00</td>
                    <td className="py-2.5 px-3 border text-right text-green-800">2712653.99</td>
                    <td className="py-2.5 px-3 border text-right">0.00</td>
                    <td className="py-2.5 px-3 border text-right text-green-800">847535.41</td>
                    <td className="py-2.5 px-3 border text-right">0.00</td>
                    <td className="py-2.5 px-3 border text-right">0.00</td>
                    <td className="py-2.5 px-3 border text-right text-blue-800">3560189.40</td>
                    <td className="py-2.5 px-3 border text-right">0.00</td>
                    <td className="py-2.5 px-3 border text-right text-green-800">625563.00</td>
                    <td className="py-2.5 px-3 border text-right text-blue-800">26923789.90</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: AGENT WISE SUMMARY REPORT */}
        {activeTab === 'agentReport' && (
          <div className="p-5 border-b border-brand-border bg-brand-mainbg/30 space-y-4">
            <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-3 font-semibold text-sm rounded-lg flex items-center shadow-xs">
              <span>» Sales Ex. Commission Report</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="flex items-center gap-2 pb-2">
                <input
                  type="radio"
                  name="salesDirect"
                  checked
                  readOnly
                  className="w-4 h-4 accent-[#0869D8]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
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
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                >
                  <option value="">--Select Executive--</option>
                  <option value="Executive 1">Executive 1</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                View
              </button>
              <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                Export MIS
              </button>
              <button className="px-6 py-2 bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer border-none">
                <Send size={16} />
                <span>Send Mail</span>
              </button>
              <button className="px-6 py-2 bg-[#4CAF50] hover:bg-[#43a047] text-white font-semibold text-sm rounded-lg shadow-sm transition flex items-center gap-2 cursor-pointer border-none">
                <Download size={16} />
                <span>Download pdf</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: MIS REPORT */}
        {activeTab === 'misReport' && (
          <div className="p-5 border-b border-brand-border bg-brand-mainbg/30 space-y-4">
            <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-3 font-semibold text-sm rounded-lg flex items-center shadow-xs">
              <span>» MIS Report</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                />
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer border-none">
                  View
                </button>
                <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer border-none">
                  Export Grid
                </button>
              </div>
            </div>
          </div>
        )}

        {/* OTHER TABS FALLBACK DEFAULT FORM */}
        {!['commission', 'agentSummary', 'paymentAdvice', 'statement', 'agentReport', 'misReport'].includes(activeTab) && (
          <div className="p-5 border-b border-slate-200 space-y-4">
            <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-3 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
              <span>» {getTabTitle(activeTab)}</span>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-1.5 bg-[#0869D8] text-white hover:bg-[#0654B0] rounded text-xs font-bold transition shadow-sm cursor-pointer border-none"
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
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div className="col-span-2 flex items-center gap-3">
                <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg font-semibold text-sm shadow-sm cursor-pointer border-none">
                  View Report
                </button>
                <button className="px-6 py-2 bg-[#ff9800] text-white rounded-lg font-semibold text-sm shadow-sm cursor-pointer border-none">
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

        {/* Full Width Table View (BranchMaster Style) */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                <th className="py-3 px-6">SR. NO.</th>
                <th className="py-3 px-6">TRANS DATE</th>
                <th className="py-3 px-6">RISK START DATE</th>
                <th className="py-3 px-6">CUSTOMER NAME</th>
                <th className="py-3 px-6">AGENT NAME</th>
                <th className="py-3 px-6">BRANCH / LOCATION</th>
                <th className="py-3 px-6">COMM NET SUM</th>
                <th className="py-3 px-6">INV / UTR NO</th>
                <th className="py-3 px-6 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[14px]">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-brand-muted font-semibold uppercase bg-brand-mainbg">
                    NO DATA FOUND
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                    <td className="py-2 px-6 font-medium text-brand-muted">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td className="py-2 px-6 font-medium text-brand-navy">{item.transDate}</td>
                    <td className="py-2 px-6 font-medium text-brand-navy">{item.riskStartDate}</td>
                    <td className="py-2 px-6 font-medium text-brand-navy">{item.customerName}</td>
                    <td className="py-2 px-6 text-brand-navy">{item.agentName}</td>
                    <td className="py-2 px-6">
                      <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-lightbg text-brand-primary border border-brand-border">
                        {item.branch} / {item.location}
                      </span>
                    </td>
                    <td className="py-2 px-6 font-semibold text-green-700">₹{item.commNetSum.toLocaleString('en-IN')}</td>
                    <td className="py-2 px-6 font-mono text-xs text-brand-primary">{item.invNo} / {item.bankUtrNo}</td>
                    <td className="py-2 px-6 text-right">
                      <button
                        onClick={() => setShowModal(true)}
                        className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
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
    </div>

      {/* FORM MODAL POPUP (Exact Policy Master Modal Style) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between shrink-0">
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
                  className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold rounded-[8px] text-[14px] shadow-sm transition-all cursor-pointer border-none"
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
