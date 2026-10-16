import React, { useState, useMemo } from 'react';
import { Search, Download, X, Eye, FileSpreadsheet, RefreshCw } from 'lucide-react';

export interface TdsRecord {
  id: number;
  deducteeType: 'Agent' | 'Franchise';
  deducteeName: string;
  deducteeCode: string;
  panNo: string;
  branch: string;
  section: string;
  quarter: string;
  date: string;
  grossCommission: number;
  tdsRate: number;
  tdsAmount: number;
  surcharge: number;
  challanRef: string;
  status: 'Deposited' | 'Pending Challan' | 'Processing';
}

export const TdsReportTab: React.FC = () => {
  // Radio: Agent vs Franchise
  const [deducteeType, setDeducteeType] = useState<'Agent' | 'Franchise'>('Agent');

  // Dropdown States matching screenshot
  const [selectedBranch, setSelectedBranch] = useState('--ALL--');
  const [selectedAgent, setSelectedAgent] = useState('--ALL--');
  const [fromDate, setFromDate] = useState('2026-10-14');
  const [toDate, setToDate] = useState('2026-10-14');

  // Applied filter state
  const [appliedFilters, setAppliedFilters] = useState({
    type: 'Agent' as 'Agent' | 'Franchise',
    branch: '--ALL--',
    agent: '--ALL--',
    from: '2026-10-14',
    to: '2026-10-14',
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<TdsRecord | null>(null);

  const branches = [
    '--ALL--',
    'BARAMATI HEAD OFFICE',
    'PUNE',
    'MUMBAI',
    'NAGPUR',
    'SATARA',
    'SOLAPUR',
    'AHILYANAGAR',
  ];

  const agentList = [
    '--ALL--',
    'Amit Tukaram Deshmukh (AG-102)',
    'Sneha Shrikant Kulkarni (AG-204)',
    'Rahul Jagdish Sharma (AG-305)',
    'Priya Ramesh Verma (AG-412)',
    'Sanjay Bapurao Patil (AG-510)',
    'Rohit Sharad Kadam (AG-601)',
  ];

  const franchiseList = [
    '--ALL--',
    'Reliable Baramati City Point (FR-BAR-01)',
    'Reliable Hadapsar Hub (FR-PUN-04)',
    'Reliable Solapur Central (FR-SOL-02)',
    'Reliable Thane West Unit (FR-MUM-03)',
  ];

  // Comprehensive mock TDS records
  const allTdsRecords: TdsRecord[] = [
    {
      id: 1,
      deducteeType: 'Agent',
      deducteeName: 'Amit Tukaram Deshmukh',
      deducteeCode: 'AG-102',
      panNo: 'ABCDE1234F',
      branch: 'BARAMATI HEAD OFFICE',
      section: '194H',
      quarter: 'Q2 (Jul-Sep 2026)',
      date: '2026-10-12',
      grossCommission: 185400,
      tdsRate: 5.0,
      tdsAmount: 9270,
      surcharge: 0,
      challanRef: 'BSR0029144/CHQ01',
      status: 'Deposited',
    },
    {
      id: 2,
      deducteeType: 'Agent',
      deducteeName: 'Sneha Shrikant Kulkarni',
      deducteeCode: 'AG-204',
      panNo: 'BCDEF2345G',
      branch: 'PUNE',
      section: '194H',
      quarter: 'Q2 (Jul-Sep 2026)',
      date: '2026-10-11',
      grossCommission: 242000,
      tdsRate: 5.0,
      tdsAmount: 12100,
      surcharge: 0,
      challanRef: 'BSR0029144/CHQ02',
      status: 'Deposited',
    },
    {
      id: 3,
      deducteeType: 'Franchise',
      deducteeName: 'Reliable Baramati City Point',
      deducteeCode: 'FR-BAR-01',
      panNo: 'AABFR8819M',
      branch: 'BARAMATI HEAD OFFICE',
      section: '194H',
      quarter: 'Q2 (Jul-Sep 2026)',
      date: '2026-10-10',
      grossCommission: 345600,
      tdsRate: 5.0,
      tdsAmount: 17280,
      surcharge: 0,
      challanRef: 'BSR0029144/CHQ03',
      status: 'Deposited',
    },
    {
      id: 4,
      deducteeType: 'Agent',
      deducteeName: 'Rahul Jagdish Sharma',
      deducteeCode: 'AG-305',
      panNo: 'CDEFG3456H',
      branch: 'SOLAPUR',
      section: '194H',
      quarter: 'Q2 (Jul-Sep 2026)',
      date: '2026-10-09',
      grossCommission: 156800,
      tdsRate: 5.0,
      tdsAmount: 7840,
      surcharge: 0,
      challanRef: 'BSR0029144/CHQ04',
      status: 'Deposited',
    },
    {
      id: 5,
      deducteeType: 'Franchise',
      deducteeName: 'Reliable Hadapsar Hub',
      deducteeCode: 'FR-PUN-04',
      panNo: 'AABFR9912K',
      branch: 'PUNE',
      section: '194H',
      quarter: 'Q3 (Oct-Dec 2026)',
      date: '2026-10-08',
      grossCommission: 460800,
      tdsRate: 5.0,
      tdsAmount: 23040,
      surcharge: 0,
      challanRef: 'Draft / In Process',
      status: 'Pending Challan',
    },
    {
      id: 6,
      deducteeType: 'Agent',
      deducteeName: 'Priya Ramesh Verma',
      deducteeCode: 'AG-412',
      panNo: 'DEFGH4567J',
      branch: 'MUMBAI',
      section: '194H',
      quarter: 'Q2 (Jul-Sep 2026)',
      date: '2026-10-06',
      grossCommission: 198000,
      tdsRate: 5.0,
      tdsAmount: 9900,
      surcharge: 0,
      challanRef: 'BSR0029144/CHQ05',
      status: 'Deposited',
    },
  ];

  // Helper currency format
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Handle Show
  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      type: deducteeType,
      branch: selectedBranch,
      agent: selectedAgent,
      from: fromDate,
      to: toDate,
    });
  };

  // Filter records
  const filteredRecords = useMemo(() => {
    return allTdsRecords.filter((record) => {
      // Type match (Agent vs Franchise)
      if (record.deducteeType !== appliedFilters.type) {
        return false;
      }

      // Branch match
      if (appliedFilters.branch !== '--ALL--' && record.branch !== appliedFilters.branch) {
        return false;
      }

      // Agent match
      if (appliedFilters.agent !== '--ALL--') {
        const agentNameClean = appliedFilters.agent.split('(')[0].trim().toLowerCase();
        if (!record.deducteeName.toLowerCase().includes(agentNameClean)) {
          return false;
        }
      }

      // Date match
      if (appliedFilters.from && record.date < appliedFilters.from) {
        return false;
      }
      if (appliedFilters.to && record.date > appliedFilters.to) {
        return false;
      }

      // Search keyword
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = record.deducteeName.toLowerCase().includes(q);
        const matchesCode = record.deducteeCode.toLowerCase().includes(q);
        const matchesPan = record.panNo.toLowerCase().includes(q);
        const matchesChallan = record.challanRef.toLowerCase().includes(q);
        if (!matchesName && !matchesCode && !matchesPan && !matchesChallan) {
          return false;
        }
      }

      return true;
    });
  }, [allTdsRecords, appliedFilters, searchQuery]);

  // Export to CSV
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = [
      'DEDUCTEE TYPE',
      'DEDUCTEE NAME',
      'CODE',
      'PAN NO',
      'BRANCH',
      'SECTION',
      'QUARTER',
      'GROSS COMMISSION',
      'TDS RATE %',
      'TDS AMOUNT',
      'CHALLAN REF',
      'STATUS',
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.deducteeType}"`,
      `"${r.deducteeName}"`,
      `"${r.deducteeCode}"`,
      `"${r.panNo}"`,
      `"${r.branch}"`,
      `"${r.section}"`,
      `"${r.quarter}"`,
      r.grossCommission,
      r.tdsRate,
      r.tdsAmount,
      `"${r.challanRef}"`,
      `"${r.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `TDS_Report_${appliedFilters.type}_${appliedFilters.from || 'all'}_to_${appliedFilters.to || 'all'}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* =========================================================================
          TOP FILTER CARD (Replicating exact screenshot layout)
         ========================================================================= */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border p-6">
        <form onSubmit={handleShow} className="space-y-5">
          {/* Row 1: Radios + Branch + Agent + From Date + To Date */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
            {/* Radio Group: Agent vs Franchise */}
            <div className="md:col-span-3 flex items-center gap-4 pb-2">
              <label className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-800 cursor-pointer select-none">
                <input
                  type="radio"
                  name="deducteeType"
                  value="Agent"
                  checked={deducteeType === 'Agent'}
                  onChange={() => {
                    setDeducteeType('Agent');
                    setSelectedAgent('--ALL--');
                  }}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                Agent
              </label>

              <label className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-800 cursor-pointer select-none">
                <input
                  type="radio"
                  name="deducteeType"
                  value="Franchise"
                  checked={deducteeType === 'Franchise'}
                  onChange={() => {
                    setDeducteeType('Franchise');
                    setSelectedAgent('--ALL--');
                  }}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                Franchise
              </label>
            </div>

            {/* Branch Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-slate-700 mb-1">
                Branch
              </label>
              <div className="relative">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer"
                >
                  {branches.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Agent / Franchise Dropdown */}
            <div className="md:col-span-3">
              <label className="block text-[12px] font-bold text-slate-700 mb-1">
                {deducteeType === 'Agent' ? 'Agent' : 'Franchise'}
              </label>
              <div className="relative">
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer"
                >
                  {(deducteeType === 'Agent' ? agentList : franchiseList).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* From Date */}
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-slate-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>

            {/* To Date */}
            <div className="md:col-span-2">
              <label className="block text-[12px] font-bold text-slate-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>
          </div>

          {/* Row 2: Show & Export Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-6 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98]"
            >
              Show
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              Export
            </button>

            {/* Quick date range switcher helper */}
            {appliedFilters.from === '2026-10-14' && appliedFilters.to === '2026-10-14' && (
              <button
                type="button"
                onClick={() => {
                  setFromDate('2026-10-01');
                  setToDate('2026-10-14');
                  setAppliedFilters((prev) => ({
                    ...prev,
                    from: '2026-10-01',
                    to: '2026-10-14',
                  }));
                }}
                className="text-xs text-brand-primary hover:text-blue-800 hover:underline cursor-pointer bg-transparent border-none font-medium ml-2"
              >
                (View All Dates)
              </button>
            )}
            {!(appliedFilters.from === '2026-10-14' && appliedFilters.to === '2026-10-14') && (
              <button
                type="button"
                onClick={() => {
                  setFromDate('2026-10-14');
                  setToDate('2026-10-14');
                  setAppliedFilters((prev) => ({
                    ...prev,
                    from: '2026-10-14',
                    to: '2026-10-14',
                  }));
                }}
                className="text-xs text-slate-500 hover:text-slate-700 hover:underline cursor-pointer bg-transparent border-none font-medium ml-2"
              >
                (Reset to 14/10/2026)
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Quick Search */}
      <div className="w-full max-w-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Deductee Name, Code, PAN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          DATA GRID (Styled with our Blue Theme)
         ========================================================================= */}
      {/* Table Card */}
      <div className="w-full bg-white rounded-lg border border-brand-border shadow-sm overflow-hidden flex flex-col">
        {/* Table Area */}
        <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                  <th className="py-3 px-3.5 whitespace-nowrap">Deductee Name</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Code</th>
                  <th className="py-3 px-3.5 whitespace-nowrap font-mono">PAN No</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Branch</th>
                  <th className="py-3 px-3 text-center whitespace-nowrap">Section</th>
                  <th className="py-3 px-3.5 whitespace-nowrap">Quarter</th>
                  <th className="py-3 px-3.5 whitespace-nowrap text-right">Gross Comm (₹)</th>
                  <th className="py-3 px-3 text-center whitespace-nowrap">TDS Rate</th>
                  <th className="py-3 px-3.5 whitespace-nowrap text-right">TDS Amt (₹)</th>
                  <th className="py-3 px-3.5 whitespace-nowrap font-mono">Challan Ref</th>
                  <th className="py-3 px-3.5 text-center whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-[13px] text-slate-800">
                {filteredRecords.map((row) => (
                  <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                    <td className="py-3 px-3.5 font-semibold text-slate-900">
                      {row.deducteeName}
                    </td>
                    <td className="py-3 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                      {row.deducteeCode}
                    </td>
                    <td className="py-3 px-3.5 font-mono font-semibold text-slate-700 whitespace-nowrap">
                      {row.panNo}
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">
                      {row.branch}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-700">
                      {row.section}
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">
                      {row.quarter}
                    </td>
                    <td className="py-3 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatCurrency(row.grossCommission)}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-indigo-700">
                      {row.tdsRate.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3.5 text-right font-bold text-rose-700 whitespace-nowrap">
                      {formatCurrency(row.tdsAmount)}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {row.challanRef}
                    </td>
                    <td className="py-3 px-3.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          row.status === 'Deposited'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={11} className="py-16 text-center text-slate-500">
                      <p className="font-semibold text-slate-600 text-sm">
                        No TDS records found for the selected criteria ({appliedFilters.from} to {appliedFilters.to}).
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Click "(View All Dates)" above to display historic TDS deductions and challans.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-slate-50 border-t border-brand-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredRecords.length}</span> TDS deduction records
            </div>
            <div className="flex items-center gap-4">
              <span>
                Total Gross Commission:{' '}
                <strong className="text-slate-900 font-bold">
                  {formatCurrency(filteredRecords.reduce((acc, curr) => acc + curr.grossCommission, 0))}
                </strong>
              </span>
              <span>
                Total TDS Deposited:{' '}
                <strong className="text-rose-700 font-bold text-sm">
                  {formatCurrency(filteredRecords.reduce((acc, curr) => acc + curr.tdsAmount, 0))}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default TdsReportTab;
