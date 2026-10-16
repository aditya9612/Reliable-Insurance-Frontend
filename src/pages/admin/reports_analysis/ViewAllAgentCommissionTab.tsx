import React, { useState, useMemo } from 'react';
import {
  Download, Printer, Eye, Search, RefreshCw,
  FileSpreadsheet, CheckCircle2, Clock, X, DollarSign
} from 'lucide-react';

interface AgentCommissionRecord {
  id: number;
  agentCode: string;
  agentName: string;
  branch: string;
  policyNo: string;
  company: string;
  segment: string;
  paymentType: 'Cash' | 'Cheque' | 'Cash To Reliance' | 'Online';
  grossPremium: number;
  netPremium: number;
  odComm: number;
  tpComm: number;
  commAmount: number;
  payoutDate: string;
  status: 'Paid' | 'Unpaid';
  mobile?: string;
  panNo?: string;
}

export const ViewAllAgentCommissionTab: React.FC = () => {
  // Filter States (matching reliable-erp.com/Clerk/ViewAllAgentComm.aspx)
  const [allAgents, setAllAgents] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState('');

  const [allBranches, setAllBranches] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState('');

  const [fromDate, setFromDate] = useState('2026-10-01');
  const [toDate, setToDate] = useState('2026-10-14');

  const [paymentType, setPaymentType] = useState('All');
  const [paymentStatus, setPaymentStatus] = useState<'ALL' | 'PAID' | 'UNPAID'>('ALL');

  // Search & Pagination within results
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedPolicyDoc, setSelectedPolicyDoc] = useState<AgentCommissionRecord | null>(null);

  // Agent options (From ERP Screenshot 1)
  const agentsList = [
    'AMOL LOKHANDE',
    'AMRIT DEDHIA',
    'ANANDKUMAR ARUN HADMODE',
    'ATISH SHRINIVAS HAREL',
    'DHULAPPA HARI KHARAT',
    'FARHAN PANJA',
    'HANUMANT NIVRUTTI JAGTAP',
    'KARISHMA IRFAN MUJAWAR',
    'LINSA PETER',
    'LLIYAS MEHBUB SHAIKH',
    'MOHAMMAD SADIK SHAMI',
    'NIVRUTTI PANDHIRINATH PATIL',
    'PANKAJ SINGH',
    'PRIYA SACHIN BANKAR',
    'Amit Tukaram Deshmukh',
    'Sneha Shrikant Kulkarni',
    'Rahul Jagdish Sharma',
    'Priya Ramesh Verma',
    'Sanjay Bapurao Patil',
    'Rohit Sharad Kadam',
    'Aditya Rajendra Sapkal'
  ];

  // Branch options (From ERP Screenshot 2)
  const branchesList = [
    'AHILYANAGAR',
    'AKLUJ',
    'AKOLA',
    'AMRAVATI',
    'BARAMATI',
    'BARSHI',
    'BEED',
    'BHIGWAN',
    'BULDHANA',
    'CHANDRAPUR',
    'Chhatrapati Sambhajinagar',
    'CHOWPHULA',
    'DHULE',
    'FRANCHISES',
    'KOLHAPUR',
    'MUMBAI',
    'NAGPUR',
    'NASHIK',
    'PUNE',
    'SATARA',
    'SOLAPUR'
  ];

  // Mock comprehensive dataset
  const initialCommissionData: AgentCommissionRecord[] = [
    { id: 1, agentCode: 'AG-101', agentName: 'AMOL LOKHANDE', branch: 'BARAMATI', policyNo: 'POL-MOT-2026-901', company: 'Bajaj Allianz Gen Ins', segment: 'Private Car Motor', paymentType: 'Online', grossPremium: 42500, netPremium: 36000, odComm: 18.5, tpComm: 2.5, commAmount: 6660, payoutDate: '2026-10-12', status: 'Paid', mobile: '9822019284', panNo: 'ABCPL1029A' },
    { id: 2, agentCode: 'AG-102', agentName: 'AMRIT DEDHIA', branch: 'PUNE', policyNo: 'POL-MOT-2026-902', company: 'Tata AIG Gen Ins', segment: 'Two Wheeler Comprehensive', paymentType: 'Cash', grossPremium: 18900, netPremium: 16000, odComm: 22.0, tpComm: 2.5, commAmount: 3520, payoutDate: '2026-10-12', status: 'Paid', mobile: '9423088192', panNo: 'BCDKL2039B' },
    { id: 3, agentCode: 'AG-103', agentName: 'ANANDKUMAR ARUN HADMODE', branch: 'SOLAPUR', policyNo: 'POL-MOT-2026-903', company: 'HDFC ERGO General', segment: 'Commercial Goods Vehicle', paymentType: 'Cheque', grossPremium: 68000, netPremium: 57600, odComm: 16.0, tpComm: 2.0, commAmount: 9216, payoutDate: '2026-10-11', status: 'Unpaid', mobile: '9763190284', panNo: 'CDEMN3049C' },
    { id: 4, agentCode: 'AG-104', agentName: 'ATISH SHRINIVAS HAREL', branch: 'AHILYANAGAR', policyNo: 'POL-MOT-2026-904', company: 'ICICI Lombard Gen Ins', segment: 'Passenger Carrying (PCV)', paymentType: 'Cash To Reliance', grossPremium: 29400, netPremium: 24900, odComm: 15.0, tpComm: 2.0, commAmount: 3735, payoutDate: '2026-10-10', status: 'Paid', mobile: '9820391823', panNo: 'DEFOP4059D' },
    { id: 5, agentCode: 'AG-105', agentName: 'DHULAPPA HARI KHARAT', branch: 'BARSHI', policyNo: 'POL-MOT-2026-905', company: 'Go Digit Gen Ins', segment: 'Commercial Tractor / Agri', paymentType: 'Online', grossPremium: 52100, netPremium: 44100, odComm: 17.5, tpComm: 2.0, commAmount: 7718, payoutDate: '2026-10-09', status: 'Unpaid', mobile: '9881029145', panNo: 'EFGPQ5069E' },
    { id: 6, agentCode: 'AG-106', agentName: 'FARHAN PANJA', branch: 'MUMBAI', policyNo: 'POL-MOT-2026-906', company: 'SBI General Insurance', segment: 'Non Motor & Fire', paymentType: 'Cheque', grossPremium: 74000, netPremium: 62700, odComm: 20.0, tpComm: 0.0, commAmount: 12540, payoutDate: '2026-10-08', status: 'Paid', mobile: '9921049281', panNo: 'FGHRS6079F' },
    { id: 7, agentCode: 'AG-107', agentName: 'HANUMANT NIVRUTTI JAGTAP', branch: 'BARAMATI', policyNo: 'POL-MOT-2026-907', company: 'Bajaj Allianz Gen Ins', segment: 'Private Car Comprehensive', paymentType: 'Cash', grossPremium: 38700, netPremium: 32800, odComm: 18.0, tpComm: 2.5, commAmount: 5904, payoutDate: '2026-10-08', status: 'Paid', mobile: '9860124819', panNo: 'GHIQR7089G' },
    { id: 8, agentCode: 'AG-108', agentName: 'KARISHMA IRFAN MUJAWAR', branch: 'SATARA', policyNo: 'POL-MOT-2026-908', company: 'Reliance General Ins', segment: 'Health Insurance Multi-Plan', paymentType: 'Cash To Reliance', grossPremium: 24500, netPremium: 20700, odComm: 15.0, tpComm: 0.0, commAmount: 3105, payoutDate: '2026-10-07', status: 'Unpaid', mobile: '9765102938', panNo: 'HIJST8099H' },
    { id: 9, agentCode: 'AG-109', agentName: 'LINSA PETER', branch: 'NAGPUR', policyNo: 'POL-MOT-2026-909', company: 'Tata AIG Gen Ins', segment: 'Commercial Goods HCV', paymentType: 'Online', grossPremium: 82000, netPremium: 69500, odComm: 14.5, tpComm: 2.0, commAmount: 10078, payoutDate: '2026-10-06', status: 'Paid', mobile: '9882193847', panNo: 'IJKTU9109I' },
    { id: 10, agentCode: 'AG-110', agentName: 'LLIYAS MEHBUB SHAIKH', branch: 'KOLHAPUR', policyNo: 'POL-MOT-2026-910', company: 'HDFC ERGO General', segment: 'Two Wheeler OD Only', paymentType: 'Cash', grossPremium: 7800, netPremium: 6600, odComm: 25.0, tpComm: 0.0, commAmount: 1650, payoutDate: '2026-10-05', status: 'Paid', mobile: '9422910293', panNo: 'JKLUV0219J' },
    { id: 11, agentCode: 'AG-111', agentName: 'MOHAMMAD SADIK SHAMI', branch: 'Chhatrapati Sambhajinagar', policyNo: 'POL-MOT-2026-911', company: 'ICICI Lombard Gen', segment: 'Private Car Motor', paymentType: 'Online', grossPremium: 34500, netPremium: 29200, odComm: 18.0, tpComm: 2.5, commAmount: 5256, payoutDate: '2026-10-04', status: 'Unpaid', mobile: '9890182736', panNo: 'KLMVW1329K' },
    { id: 12, agentCode: 'AG-112', agentName: 'NIVRUTTI PANDHIRINATH PATIL', branch: 'AKLUJ', policyNo: 'POL-MOT-2026-912', company: 'Bajaj Allianz Gen', segment: 'Commercial Passenger Bus', paymentType: 'Cheque', grossPremium: 95000, netPremium: 80500, odComm: 13.0, tpComm: 2.0, commAmount: 10465, payoutDate: '2026-10-03', status: 'Paid', mobile: '9764019283', panNo: 'LMNWX2439L' },
    { id: 13, agentCode: 'AG-113', agentName: 'PANKAJ SINGH', branch: 'NASHIK', policyNo: 'POL-MOT-2026-913', company: 'Go Digit Gen Ins', segment: 'Electric 2-Wheeler Plan', paymentType: 'Cash To Reliance', grossPremium: 12400, netPremium: 10500, odComm: 22.5, tpComm: 2.5, commAmount: 2363, payoutDate: '2026-10-02', status: 'Paid', mobile: '9823485721', panNo: 'MNOXY3549M' },
    { id: 14, agentCode: 'AG-114', agentName: 'PRIYA SACHIN BANKAR', branch: 'BARAMATI', policyNo: 'POL-MOT-2026-914', company: 'Tata AIG Gen Ins', segment: 'Private Car Comprehensive', paymentType: 'Online', grossPremium: 46800, netPremium: 39600, odComm: 19.0, tpComm: 2.5, commAmount: 7524, payoutDate: '2026-10-01', status: 'Unpaid', mobile: '9421098234', panNo: 'NOPYZ4659N' }
  ];

  // Active filter state that gets applied when user clicks "View"
  const [appliedFilters, setAppliedFilters] = useState({
    allAgents: true,
    agent: '',
    allBranches: true,
    branch: '',
    fromDate: '2026-10-01',
    toDate: '2026-10-14',
    paymentType: 'All',
    paymentStatus: 'ALL'
  });

  const handleView = () => {
    setAppliedFilters({
      allAgents,
      agent: selectedAgent,
      allBranches,
      branch: selectedBranch,
      fromDate,
      toDate,
      paymentType,
      paymentStatus
    });
    setCurrentPage(1);
  };

  // Filter computation
  const filteredRecords = useMemo(() => {
    return initialCommissionData.filter(record => {
      // Agent filter
      if (!appliedFilters.allAgents && appliedFilters.agent) {
        if (!record.agentName.toLowerCase().includes(appliedFilters.agent.toLowerCase())) {
          return false;
        }
      }

      // Branch filter
      if (!appliedFilters.allBranches && appliedFilters.branch) {
        if (!record.branch.toLowerCase().includes(appliedFilters.branch.toLowerCase())) {
          return false;
        }
      }

      // Date range filter
      if (appliedFilters.fromDate && record.payoutDate < appliedFilters.fromDate) {
        return false;
      }
      if (appliedFilters.toDate && record.payoutDate > appliedFilters.toDate) {
        return false;
      }

      // Payment Type filter
      if (appliedFilters.paymentType !== 'All' && record.paymentType !== appliedFilters.paymentType) {
        return false;
      }

      // Payment Status (ALL / PAID / UNPAID)
      if (appliedFilters.paymentStatus === 'PAID' && record.status !== 'Paid') {
        return false;
      }
      if (appliedFilters.paymentStatus === 'UNPAID' && record.status !== 'Unpaid') {
        return false;
      }

      // Search keyword filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matches = Object.values(record).some(val =>
          val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        );
        if (!matches) return false;
      }

      return true;
    });
  }, [appliedFilters, searchQuery]);

  // Amount Metrics: Total, Paid, Unpaid
  const { totalAmount, paidAmount, unpaidAmount } = useMemo(() => {
    let total = 0;
    let paid = 0;
    let unpaid = 0;

    filteredRecords.forEach(r => {
      total += r.commAmount;
      if (r.status === 'Paid') {
        paid += r.commAmount;
      } else {
        unpaid += r.commAmount;
      }
    });

    return { totalAmount: total, paidAmount: paid, unpaidAmount: unpaid };
  }, [filteredRecords]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  // Helper currency format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredRecords.length === 0) {
      alert('No records available to export.');
      return;
    }

    const headers = [
      'SR NO',
      'AGENT CODE',
      'AGENT NAME',
      'BRANCH',
      'POLICY NO',
      'COMPANY',
      'SEGMENT',
      'PAYMENT TYPE',
      'GROSS PREMIUM',
      'NET PREMIUM',
      'OD COMM %',
      'TP COMM %',
      'COMM AMOUNT',
      'PAYOUT DATE',
      'STATUS'
    ];

    const rows = filteredRecords.map((r, index) => [
      index + 1,
      `"${r.agentCode}"`,
      `"${r.agentName}"`,
      `"${r.branch}"`,
      `"${r.policyNo}"`,
      `"${r.company}"`,
      `"${r.segment}"`,
      `"${r.paymentType}"`,
      r.grossPremium,
      r.netPremium,
      r.odComm,
      r.tpComm,
      r.commAmount,
      `"${r.payoutDate}"`,
      `"${r.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ViewAllAgentCommission_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export to PDF / Print view
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 w-full">
      {/* =========================================================================
          MAIN FILTER CARD (Matches legacy reliable-erp.com/Clerk/ViewAllAgentComm.aspx)
         ========================================================================= */}
      <div className="bg-white rounded-[12px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border">
        <div className="space-y-6">
          {/* Row 1: Agent, Branch, From Date, To Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            {/* Agent Field with "All" checkbox */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <input
                  type="checkbox"
                  id="all-agents"
                  checked={allAgents}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAllAgents(checked);
                    if (checked) setSelectedAgent('');
                  }}
                  className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                />
                <label htmlFor="all-agents" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  All
                </label>
                <label className="text-xs font-semibold text-slate-700 ml-3">
                  Agent
                </label>
              </div>

              <div className="relative">
                <select
                  value={selectedAgent}
                  disabled={allAgents}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary disabled:bg-slate-100 disabled:text-slate-400 transition-all cursor-pointer appearance-none pr-8"
                >
                  <option value="">--Select Agent Name--</option>
                  {agentsList.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Branch Field with "All" checkbox */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <input
                  type="checkbox"
                  id="all-branches"
                  checked={allBranches}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setAllBranches(checked);
                    if (checked) setSelectedBranch('');
                  }}
                  className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                />
                <label htmlFor="all-branches" className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
                  All
                </label>
                <label className="text-xs font-semibold text-slate-700 ml-3">
                  Branch
                </label>
              </div>

              <div className="relative">
                <select
                  value={selectedBranch}
                  disabled={allBranches}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary disabled:bg-slate-100 disabled:text-slate-400 transition-all cursor-pointer appearance-none pr-8"
                >
                  <option value="">--Select Branch Name--</option>
                  {branchesList.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* From Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>
          </div>

          {/* Row 2: Payment Type, Status Radios, Total Amount, Paid Amount, Unpaid Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            {/* Payment Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Payment Type</label>
              <div className="relative">
                <select
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer appearance-none pr-8"
                >
                  <option value="All">All</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash To Reliance">Cash To Reliance</option>
                  <option value="Online">Online</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Status Radios (ALL, PAID, UNPAID) */}
            <div className="flex items-center gap-3.5 pb-2">
              <label className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                <input
                  type="radio"
                  name="commStatus"
                  value="ALL"
                  checked={paymentStatus === 'ALL'}
                  onChange={() => setPaymentStatus('ALL')}
                  className="w-4 h-4 text-brand-primary focus:ring-brand-primary cursor-pointer accent-brand-primary"
                />
                ALL
              </label>

              <label className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                <input
                  type="radio"
                  name="commStatus"
                  value="PAID"
                  checked={paymentStatus === 'PAID'}
                  onChange={() => setPaymentStatus('PAID')}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-600 cursor-pointer accent-emerald-600"
                />
                PAID
              </label>

              <label className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 cursor-pointer select-none">
                <input
                  type="radio"
                  name="commStatus"
                  value="UNPAID"
                  checked={paymentStatus === 'UNPAID'}
                  onChange={() => setPaymentStatus('UNPAID')}
                  className="w-4 h-4 text-rose-600 focus:ring-rose-600 cursor-pointer accent-rose-600"
                />
                UNPAID
              </label>
            </div>

            {/* Total Amount Output */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Total Amount</label>
              <div className="w-full px-3.5 py-2 bg-slate-100 border border-slate-300 rounded-lg text-sm font-bold text-slate-800 min-h-[38px] flex items-center font-mono">
                {formatCurrency(totalAmount)}
              </div>
            </div>

            {/* Paid Amount Output */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Paid Amount</label>
              <div className="w-full px-3.5 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-bold text-emerald-700 min-h-[38px] flex items-center font-mono">
                {formatCurrency(paidAmount)}
              </div>
            </div>

            {/* Unpaid Amount Output */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Unpaid Amount</label>
              <div className="w-full px-3.5 py-2 bg-rose-50 border border-rose-200 rounded-lg text-sm font-bold text-rose-700 min-h-[38px] flex items-center font-mono">
                {formatCurrency(unpaidAmount)}
              </div>
            </div>
          </div>

          {/* Row 3: Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleView}
              className="px-5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-2 border-none active:scale-[0.98]"
            >
              <Eye size={16} />
              <span>View</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-2 border-none active:scale-[0.98]"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleExportPDF}
              className="px-5 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-2 border-none active:scale-[0.98]"
            >
              <Printer size={16} />
              <span>Export to PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          COMMISSION RESULTS TABLE CARD (With VehicleMaster Theme)
         ========================================================================= */}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden flex flex-col w-full">
        {/* Table Search & Title Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Table quick search */}
          <div className="relative w-full sm:w-[350px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search agent, policy, branch..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full font-semibold">
              {filteredRecords.length} Records
            </span>
          </div>
        </div>

        {/* Responsive Table Scroll Container */}
        <div className="overflow-x-auto w-full min-w-0">
          <table className="w-full text-left border-collapse min-w-[1300px]">
            {/* Table Header with VehicleMaster Blue Theme */}
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-3 px-4 text-center w-14">SR. NO.</th>
                <th className="py-3 px-4">AGENT CODE & NAME</th>
                <th className="py-3 px-4">BRANCH</th>
                <th className="py-3 px-4">POLICY NO</th>
                <th className="py-3 px-4">INSURANCE COMPANY</th>
                <th className="py-3 px-4">SEGMENT</th>
                <th className="py-3 px-4 text-center">PAYMENT TYPE</th>
                <th className="py-3 px-4 text-right">GROSS PREM (₹)</th>
                <th className="py-3 px-4 text-right">NET PREM (₹)</th>
                <th className="py-3 px-4 text-center">OD %</th>
                <th className="py-3 px-4 text-center">TP %</th>
                <th className="py-3 px-4 text-right">COMM AMOUNT (₹)</th>
                <th className="py-3 px-4 text-center">PAYOUT DATE</th>
                <th className="py-3 px-4 text-center">STATUS</th>
                <th className="py-3 px-4 text-center w-20">ACTION</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-brand-border text-[13px]">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((row, index) => {
                  const isPaid = row.status === 'Paid';
                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white"
                    >
                      <td className="py-2.5 px-4 text-center font-medium text-brand-primary">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td className="py-2.5 px-4">
                        <div className="font-semibold text-brand-navy">{row.agentName}</div>
                        <div className="text-[11px] font-mono text-brand-primary">
                          {row.agentCode} {row.mobile && `• ${row.mobile}`}
                        </div>
                      </td>

                      <td className="py-2.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                        {row.branch}
                      </td>

                      <td className="py-2.5 px-4 font-mono font-bold text-brand-primary whitespace-nowrap">
                        {row.policyNo}
                      </td>

                      <td className="py-2.5 px-4 text-slate-800 font-medium">
                        {row.company}
                      </td>

                      <td className="py-2.5 px-4 text-slate-700 whitespace-nowrap">
                        {row.segment}
                      </td>

                      <td className="py-2.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                          {row.paymentType}
                        </span>
                      </td>

                      <td className="py-2.5 px-4 text-right font-medium text-slate-700 font-mono whitespace-nowrap">
                        {formatCurrency(row.grossPremium)}
                      </td>

                      <td className="py-2.5 px-4 text-right font-medium text-slate-700 font-mono whitespace-nowrap">
                        {formatCurrency(row.netPremium)}
                      </td>

                      <td className="py-2.5 px-4 text-center font-bold text-brand-primary">
                        {row.odComm}%
                      </td>

                      <td className="py-2.5 px-4 text-center text-slate-600">
                        {row.tpComm}%
                      </td>

                      <td className="py-2.5 px-4 text-right font-bold text-emerald-700 font-mono whitespace-nowrap">
                        {formatCurrency(row.commAmount)}
                      </td>

                      <td className="py-2.5 px-4 text-center text-slate-600 whitespace-nowrap">
                        {row.payoutDate}
                      </td>

                      <td className="py-2.5 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${isPaid
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : 'bg-rose-50 text-rose-700 border-rose-300'
                            }`}
                        >
                          {row.status}
                        </span>
                      </td>

                      <td className="py-2.5 px-4 text-center">
                        <button
                          onClick={() => setSelectedPolicyDoc(row)}
                          className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                          title="View Details"
                        >
                          <Eye size={16} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={15} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No Commission Records Found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search keywords</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Standard Footer Pagination Bar matching VehicleMaster */}
        <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
            <span>Records per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-brand-border rounded px-2 py-1 text-sm bg-white text-brand-navy focus:outline-none focus:border-brand-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="text-sm text-brand-muted font-medium">
            Showing {filteredRecords.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm font-medium border border-brand-border ${
                currentPage === 1
                  ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'text-brand-navy hover:bg-brand-mainbg cursor-pointer'
              }`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  currentPage === page
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-navy hover:bg-brand-mainbg border border-brand-border'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded text-sm font-medium border border-brand-border ${
                currentPage === totalPages || totalPages === 0
                  ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'text-brand-navy hover:bg-brand-mainbg cursor-pointer'
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          POLICY / COMMISSION DETAIL MODAL
         ========================================================================= */}
      {selectedPolicyDoc && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-brand-primary text-white px-5 py-3.5 flex items-center justify-between">
              <span className="font-bold text-sm tracking-wide">
                Commission Payout Detail - {selectedPolicyDoc.policyNo}
              </span>
              <button
                onClick={() => setSelectedPolicyDoc(null)}
                className="text-white hover:text-rose-200 cursor-pointer border-none bg-transparent"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Agent Name</span>
                  <span className="font-bold text-slate-900">{selectedPolicyDoc.agentName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Agent Code</span>
                  <span className="font-mono font-bold text-brand-primary">{selectedPolicyDoc.agentCode}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Branch</span>
                  <span className="font-semibold text-slate-800">{selectedPolicyDoc.branch}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Company</span>
                  <span className="font-semibold text-slate-800">{selectedPolicyDoc.company}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Mode</span>
                  <span className="font-semibold text-slate-800">{selectedPolicyDoc.paymentType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payout Date</span>
                  <span className="font-semibold text-slate-800">{selectedPolicyDoc.payoutDate}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-200 pt-3">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Gross Premium:</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(selectedPolicyDoc.grossPremium)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">Net Premium:</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(selectedPolicyDoc.netPremium)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">OD Commission Rate:</span>
                  <span className="font-semibold text-indigo-700">{selectedPolicyDoc.odComm}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-600">TP Commission Rate:</span>
                  <span className="font-semibold text-indigo-700">{selectedPolicyDoc.tpComm}%</span>
                </div>
                <div className="flex justify-between py-1.5 font-bold text-sm bg-emerald-50 px-3 rounded text-emerald-800">
                  <span>Commission Payable:</span>
                  <span>{formatCurrency(selectedPolicyDoc.commAmount)}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedPolicyDoc(null)}
                  className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md font-semibold cursor-pointer border-none text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllAgentCommissionTab;
