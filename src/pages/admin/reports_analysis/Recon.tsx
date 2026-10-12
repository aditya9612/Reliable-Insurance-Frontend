import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Search, Upload, FileText, Download } from 'lucide-react';

type ReconSubTab =
  | 'companyCommission'
  | 'dataMatch'
  | 'commissionRecon';

interface ReconRow {
  id: number;
  companyName: string;
  policyNo: string;
  insuredName: string;
  grossPremium: number;
  commAmount: number;
  reconStatus: 'Matched' | 'Pending' | 'Mismatch' | 'Not Found' | 'Partially Match';
  transDate: string;
}

export const Recon: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ReconSubTab>('companyCommission');
  const [searchQuery, setSearchQuery] = useState('');

  // Tab 1: Insurance Company Commission States
  const [brokerTab1, setBrokerTab1] = useState('RELIABLE - ASSOCIATES');
  const [companyTab1, setCompanyTab1] = useState('');

  // Tab 2: Company Commission Data Match States
  const [dateFilterTab2, setDateFilterTab2] = useState<'trans' | 'accounting'>('trans');
  const [matchStatusTab2, setMatchStatusTab2] = useState<'all' | 'notFound' | 'match' | 'partiallyMatch' | 'notReceived'>('all');
  const [brokerTab2, setBrokerTab2] = useState('RELIABLE - ASSOCIATES');
  const [companyTab2, setCompanyTab2] = useState('');
  const [fromDateTab2, setFromDateTab2] = useState('2026-10-06');
  const [toDateTab2, setToDateTab2] = useState('2026-10-06');
  const [accountingMonthTab2, setAccountingMonthTab2] = useState('OCT');
  const [accountingYearTab2, setAccountingYearTab2] = useState('2026-2027');

  // Month & Financial Year Options Lists (Matches Previous Project Dropdowns, Image 1 & 2)
  const reconMonthsList = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const financialYearsList = [
    '2026-2027',
    '2025-2026',
    '2024-2025',
    '2023-2024',
    '2022-2023',
    '2021-2022',
    '2020-2021',
    '2019-2020',
    '2018-2019'
  ];

  // Tab 3: Commission Reconciliation States
  const [reconMonthTab3, setReconMonthTab3] = useState('OCT');
  const [reconYearTab3, setReconYearTab3] = useState('2026-2027');

  // View Grid States (Triggered upon clicking View button, Image 4 & 5)
  const [showDataMatchGrid, setShowDataMatchGrid] = useState(false);
  const [showReconDataGrid, setShowReconDataGrid] = useState(false);

  // Sample Data
  const [reconData] = useState<ReconRow[]>([
    {
      id: 1,
      companyName: 'HDFC ERGO General Insurance',
      policyNo: 'POL99887711',
      insuredName: 'Rahul Sharma',
      grossPremium: 45000,
      commAmount: 6750,
      reconStatus: 'Matched',
      transDate: '2026-10-04'
    },
    {
      id: 2,
      companyName: 'ICICI Lombard General Insurance',
      policyNo: 'POL88776622',
      insuredName: 'Pooja Verma',
      grossPremium: 28000,
      commAmount: 4200,
      reconStatus: 'Pending',
      transDate: '2026-10-05'
    },
    {
      id: 3,
      companyName: 'Star Health Insurance',
      policyNo: 'POL77665533',
      insuredName: 'Vikram Joshi',
      grossPremium: 62000,
      commAmount: 9300,
      reconStatus: 'Partially Match',
      transDate: '2026-10-06'
    }
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // EXACT 3 Sub-Tabs matching user images
  const tabsList: { key: ReconSubTab; label: string }[] = [
    { key: 'companyCommission', label: 'Insurance Company Commission' },
    { key: 'dataMatch', label: 'Ideal Reconciliation' },
    { key: 'commissionRecon', label: 'Commission Reconciliation' }
  ];

  const filteredData = reconData.filter(item => {
    const matchSearch =
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.policyNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.insuredName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCompany = !companyTab2 || item.companyName.toLowerCase().includes(companyTab2.toLowerCase());
    return matchSearch && matchCompany;
  });

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  return (
    <div className="w-full flex flex-col space-y-5 font-sans">
      {/* Top Header Bar */}
      <PageHeader
        title="Recon Management"
        description="Insurance company commission import, transaction matching & reconciliation"
      />

      {/* Horizontal Sub-Tabs Bar (EXACTLY 3 TABS) */}
      <UnderlineTabs
        tabs={tabsList.map(tab => ({ id: tab.key, label: tab.label }))}
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId as ReconSubTab);
          setCurrentPage(1);
          setSearchQuery('');
          setShowDataMatchGrid(false);
          setShowReconDataGrid(false);
        }}
      />

      {/* Main Content Card */}
      <div key={activeTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

          {/* TAB 1: INSURANCE COMPANY COMMISSION (Exact Image 3 match) */}
          {activeTab === 'companyCommission' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center shadow-xs">
                <span>» Insurance Company Commission</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Broker</label>
                  <select
                    value={brokerTab1}
                    onChange={(e) => setBrokerTab1(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="RELIABLE - ASSOCIATES">RELIABLE - ASSOCIATES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <select
                    value={companyTab1}
                    onChange={(e) => setCompanyTab1(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Company--</option>
                    <option value="HDFC ERGO">HDFC ERGO</option>
                    <option value="ICICI Lombard">ICICI Lombard</option>
                    <option value="Star Health">Star Health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Please Select Excel File:</label>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button className="w-full px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none flex items-center justify-center gap-2">
                    <Upload size={16} />
                    <span>Import Data</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-start">
                <button className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                  Process
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: IDEAL RECONCILIATION (Exact Image 4 match) */}
          {activeTab === 'dataMatch' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="text-center font-semibold text-sm text-[#0869D8] pb-1">
                Company Commission Data Match with Transaction
              </div>

              {/* Radio Group Row 1 */}
              <div className="flex flex-wrap items-center gap-6 justify-start text-xs font-medium text-slate-700">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="dateTypeTab2"
                      checked={dateFilterTab2 === 'trans'}
                      onChange={() => setDateFilterTab2('trans')}
                      className="accent-[#0869D8]"
                    />
                    <span>Trans Date</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="dateTypeTab2"
                      checked={dateFilterTab2 === 'accounting'}
                      onChange={() => setDateFilterTab2('accounting')}
                      className="accent-[#0869D8]"
                    />
                    <span>Accounting Period Date</span>
                  </label>
                </div>

                {/* Match Type Radio Filters */}
                <div className="flex flex-wrap items-center gap-4 pl-4 border-l border-slate-300">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="matchStatusTab2"
                      checked={matchStatusTab2 === 'all'}
                      onChange={() => setMatchStatusTab2('all')}
                      className="accent-[#0869D8]"
                    />
                    <span>All Found</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="matchStatusTab2"
                      checked={matchStatusTab2 === 'notFound'}
                      onChange={() => setMatchStatusTab2('notFound')}
                      className="accent-[#0869D8]"
                    />
                    <span>Not Found</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="matchStatusTab2"
                      checked={matchStatusTab2 === 'match'}
                      onChange={() => setMatchStatusTab2('match')}
                      className="accent-[#0869D8]"
                    />
                    <span>Match</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="matchStatusTab2"
                      checked={matchStatusTab2 === 'partiallyMatch'}
                      onChange={() => setMatchStatusTab2('partiallyMatch')}
                      className="accent-[#0869D8]"
                    />
                    <span>Partially Match</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="matchStatusTab2"
                      checked={matchStatusTab2 === 'notReceived'}
                      onChange={() => setMatchStatusTab2('notReceived')}
                      className="accent-[#0869D8]"
                    />
                    <span>Commission Not Received</span>
                  </label>
                </div>
              </div>

              {/* Form Input Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Broker</label>
                  <select
                    value={brokerTab2}
                    onChange={(e) => setBrokerTab2(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="RELIABLE - ASSOCIATES">RELIABLE - ASSOCIATES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={companyTab2}
                    onChange={(e) => setCompanyTab2(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Company--</option>
                    <option value="ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED">ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED</option>
                    <option value="HDFC ERGO General Insurance">HDFC ERGO General Insurance</option>
                    <option value="ICICI Lombard General Insurance">ICICI Lombard General Insurance</option>
                    <option value="Star Health Insurance">Star Health Insurance</option>
                    <option value="TATA AIG General Insurance">TATA AIG General Insurance</option>
                  </select>
                </div>

                {dateFilterTab2 === 'accounting' ? (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Month <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={accountingMonthTab2}
                        onChange={(e) => setAccountingMonthTab2(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                      >
                        {reconMonthsList.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Financial Year <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={accountingYearTab2}
                        onChange={(e) => setAccountingYearTab2(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                      >
                        {financialYearsList.map(y => (
                          <option key={y} value={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        From Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={fromDateTab2}
                        onChange={(e) => setFromDateTab2(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        To Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        value={toDateTab2}
                        onChange={(e) => setToDateTab2(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                      />
                    </div>
                  </>
                )}

                <div>
                  <button
                    onClick={() => {
                      setCurrentPage(1);
                      setShowDataMatchGrid(true);
                    }}
                    className="w-full px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none uppercase"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Export Button & Entry Match with Grid section (Triggered by View button, Image 4) */}
              {showDataMatchGrid && (
                <div className="pt-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => alert('Exporting Grid...')}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg shadow-sm transition cursor-pointer border-none uppercase"
                  >
                    Export
                  </button>

                  <div className="bg-slate-100 text-slate-800 border border-slate-200 px-4 py-2 font-semibold text-xs rounded-md flex items-center justify-center tracking-wide">
                    <span>Entry Match with Grid</span>
                  </div>

                  {filteredData.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-lg text-slate-500 font-semibold text-xs tracking-wider">
                      NO DATA FOUND
                    </div>
                  ) : (
                    <div className="overflow-x-auto w-full custom-scrollbar border border-brand-border rounded-lg bg-white">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                            <th className="py-3 px-4">SR. NO.</th>
                            <th className="py-3 px-4">DATE</th>
                            <th className="py-3 px-4">INSURANCE COMPANY</th>
                            <th className="py-3 px-4">POLICY NO.</th>
                            <th className="py-3 px-4">INSURED NAME</th>
                            <th className="py-3 px-4 text-right">GROSS PREMIUM</th>
                            <th className="py-3 px-4 text-right">COMM. AMOUNT</th>
                            <th className="py-3 px-4 text-center">RECON STATUS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px]">
                          {paginatedData.map((row, idx) => (
                            <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                              <td className="py-2.5 px-4 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                              <td className="py-2.5 px-4 text-slate-700">{row.transDate}</td>
                              <td className="py-2.5 px-4 font-semibold text-slate-800">{row.companyName}</td>
                              <td className="py-2.5 px-4 font-mono text-[#0869D8]">{row.policyNo}</td>
                              <td className="py-2.5 px-4 font-medium text-slate-800">{row.insuredName}</td>
                              <td className="py-2.5 px-4 text-right font-semibold text-slate-800">₹{row.grossPremium.toLocaleString('en-IN')}</td>
                              <td className="py-2.5 px-4 text-right font-bold text-green-700">₹{row.commAmount.toLocaleString('en-IN')}</td>
                              <td className="py-2.5 px-4 text-center">
                                <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${
                                  row.reconStatus === 'Matched'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : row.reconStatus === 'Pending'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                }`}>
                                  {row.reconStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: COMMISSION RECONCILIATION (Exact Image 5 match) */}
          {activeTab === 'commissionRecon' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center shadow-xs">
                <span>» Commission reconciliation</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Month <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={reconMonthTab3}
                    onChange={(e) => setReconMonthTab3(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    {reconMonthsList.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Financial Year <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={reconYearTab3}
                    onChange={(e) => setReconYearTab3(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    {financialYearsList.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Please Select Excel File:</label>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-sm bg-white text-slate-700 focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none uppercase"
                >
                  Import Data
                </button>
                <button
                  type="button"
                  onClick={() => setShowReconDataGrid(true)}
                  className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none uppercase"
                >
                  View Recon Data
                </button>
                <button
                  type="button"
                  onClick={() => setShowReconDataGrid(false)}
                  className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none uppercase"
                >
                  Reset
                </button>
              </div>

              {/* Export Button & Entry Match Section (Image 5) */}
              {showReconDataGrid && (
                <div className="pt-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => alert('Exporting Recon Data...')}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg shadow-sm transition cursor-pointer border-none uppercase"
                  >
                    Export
                  </button>

                  <div className="bg-slate-100 text-slate-800 border border-slate-200 px-4 py-2 font-semibold text-xs rounded-md flex items-center justify-center tracking-wide">
                    <span>Entry Match</span>
                  </div>

                  <div className="overflow-x-auto w-full custom-scrollbar border border-brand-border rounded-lg bg-white">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                        <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                          <th className="py-3 px-4">SR. NO.</th>
                          <th className="py-3 px-4">DATE</th>
                          <th className="py-3 px-4">INSURANCE COMPANY</th>
                          <th className="py-3 px-4">POLICY NO.</th>
                          <th className="py-3 px-4">INSURED NAME</th>
                          <th className="py-3 px-4 text-right">GROSS PREMIUM</th>
                          <th className="py-3 px-4 text-right">COMM. AMOUNT</th>
                          <th className="py-3 px-4 text-center">RECON STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border text-[13px]">
                        {paginatedData.map((row, idx) => (
                          <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                            <td className="py-2.5 px-4 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                            <td className="py-2.5 px-4 text-slate-700">{row.transDate}</td>
                            <td className="py-2.5 px-4 font-semibold text-slate-800">{row.companyName}</td>
                            <td className="py-2.5 px-4 font-mono text-[#0869D8]">{row.policyNo}</td>
                            <td className="py-2.5 px-4 font-medium text-slate-800">{row.insuredName}</td>
                            <td className="py-2.5 px-4 text-right font-semibold text-slate-800">₹{row.grossPremium.toLocaleString('en-IN')}</td>
                            <td className="py-2.5 px-4 text-right font-bold text-green-700">₹{row.commAmount.toLocaleString('en-IN')}</td>
                            <td className="py-2.5 px-4 text-center">
                              <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full border ${
                                row.reconStatus === 'Matched'
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : row.reconStatus === 'Pending'
                                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                                  : 'bg-red-50 text-red-700 border-red-200'
                              }`}>
                                {row.reconStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Recon;
