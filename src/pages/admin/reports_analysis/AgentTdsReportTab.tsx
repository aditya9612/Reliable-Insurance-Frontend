import React, { useState, useMemo } from 'react';
import { Search, Download, X, Eye, FileText } from 'lucide-react';

export interface AgentTdsRecord {
  id: number;
  agentCode: string;
  agentName: string;
  panNo: string;
  branch: string;
  bankName: string;
  grossComm: number;
  tdsAmount: number;
  netPayout: number;
  quarter: string;
  form16AStatus: string;
  certNo: string;
  date: string;
}

export const AgentTdsReportTab: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState('--ALL--');
  const [selectedBank, setSelectedBank] = useState('--Select Ledger Type--');
  const [fromDate, setFromDate] = useState('2026-10-14');
  const [toDate, setToDate] = useState('2026-10-14');

  const [appliedFilters, setAppliedFilters] = useState({
    agent: '--ALL--',
    bank: '--Select Ledger Type--',
    from: '2026-10-14',
    to: '2026-10-14',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const agents = [
    '--ALL--',
    'Amit Tukaram Deshmukh (AG-102)',
    'Sneha Shrikant Kulkarni (AG-204)',
    'Rahul Jagdish Sharma (AG-305)',
    'Priya Ramesh Verma (AG-412)',
    'Sanjay Bapurao Patil (AG-510)',
    'Rohit Sharad Kadam (AG-601)',
  ];

  const ledgerTypes = [
    '--Select Ledger Type--',
    'COMMISSION PAYABLE LEDGER',
    'TDS ON COMMISSION LEDGER (194H)',
    'BANK CURRENT ACCOUNT',
    'CASH IN HAND LEDGER',
  ];

  const records: AgentTdsRecord[] = [
    {
      id: 1,
      agentCode: 'AG-102',
      agentName: 'Amit Tukaram Deshmukh',
      panNo: 'ABCDE1234F',
      branch: 'BARAMATI HEAD OFFICE',
      bankName: 'COMMISSION PAYABLE LEDGER',
      grossComm: 185400,
      tdsAmount: 9270,
      netPayout: 176130,
      quarter: 'Q2 (Jul-Sep 2026)',
      form16AStatus: 'Issued',
      certNo: '16A-2026-Q2-102',
      date: '2026-10-12',
    },
    {
      id: 2,
      agentCode: 'AG-204',
      agentName: 'Sneha Shrikant Kulkarni',
      panNo: 'BCDEF2345G',
      branch: 'PUNE',
      bankName: 'COMMISSION PAYABLE LEDGER',
      grossComm: 242000,
      tdsAmount: 12100,
      netPayout: 229900,
      quarter: 'Q2 (Jul-Sep 2026)',
      form16AStatus: 'Issued',
      certNo: '16A-2026-Q2-204',
      date: '2026-10-11',
    },
    {
      id: 3,
      agentCode: 'AG-305',
      agentName: 'Rahul Jagdish Sharma',
      panNo: 'CDEFG3456H',
      branch: 'SOLAPUR',
      bankName: 'COMMISSION PAYABLE LEDGER',
      grossComm: 156800,
      tdsAmount: 7840,
      netPayout: 148960,
      quarter: 'Q2 (Jul-Sep 2026)',
      form16AStatus: 'Generated',
      certNo: '16A-2026-Q2-305',
      date: '2026-10-09',
    },
    {
      id: 4,
      agentCode: 'AG-412',
      agentName: 'Priya Ramesh Verma',
      panNo: 'DEFGH4567J',
      branch: 'MUMBAI',
      bankName: 'COMMISSION PAYABLE LEDGER',
      grossComm: 198000,
      tdsAmount: 9900,
      netPayout: 188100,
      quarter: 'Q2 (Jul-Sep 2026)',
      form16AStatus: 'Pending',
      certNo: 'N/A',
      date: '2026-10-08',
    },
  ];

  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      agent: selectedAgent,
      bank: selectedBank,
      from: fromDate,
      to: toDate,
    });
  };

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (appliedFilters.agent !== '--ALL--') {
        const clean = appliedFilters.agent.split('(')[0].trim().toLowerCase();
        if (!r.agentName.toLowerCase().includes(clean)) return false;
      }
      if (appliedFilters.from && r.date < appliedFilters.from) return false;
      if (appliedFilters.to && r.date > appliedFilters.to) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        if (!r.agentName.toLowerCase().includes(q) && !r.agentCode.toLowerCase().includes(q) && !r.panNo.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [records, appliedFilters, searchQuery]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExport = () => {
    const headers = [
      'AGENT CODE',
      'AGENT NAME',
      'PAN NO',
      'BRANCH',
      'GROSS COMM',
      'TDS AMOUNT',
      'NET PAYOUT',
      'QUARTER',
      'FORM 16A',
      'CERTIFICATE NO',
    ];
    const rows = filteredRecords.map((r) => [
      `"${r.agentCode}"`,
      `"${r.agentName}"`,
      `"${r.panNo}"`,
      `"${r.branch}"`,
      r.grossComm,
      r.tdsAmount,
      r.netPayout,
      `"${r.quarter}"`,
      `"${r.form16AStatus}"`,
      `"${r.certNo}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Agent_TDS_Report_${appliedFilters.from}_to_${appliedFilters.to}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border p-6">
        <form onSubmit={handleShow} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Agent */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                Agent
              </label>
              <div className="relative">
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer"
                >
                  {agents.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Bank Name / Ledger Type */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                Bank Name
              </label>
              <div className="relative">
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer"
                >
                  {ledgerTypes.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* From Date */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
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
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
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

          {/* Action Buttons */}
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

            {appliedFilters.from === '2026-10-14' && appliedFilters.to === '2026-10-14' && (
              <button
                type="button"
                onClick={() => {
                  setFromDate('2026-10-01');
                  setToDate('2026-10-14');
                  setAppliedFilters((prev) => ({ ...prev, from: '2026-10-01', to: '2026-10-14' }));
                }}
                className="text-xs text-brand-primary hover:text-blue-800 hover:underline cursor-pointer bg-transparent border-none font-medium ml-2"
              >
                (View All Dates)
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table Card */}
      <div className="w-full bg-white rounded-lg border border-brand-border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                <th className="py-3 px-3.5 whitespace-nowrap font-mono">Agent Code</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Agent Name</th>
                <th className="py-3 px-3.5 whitespace-nowrap font-mono">PAN No</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Branch</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Gross Comm (₹)</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">TDS (₹)</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Net Payout (₹)</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Quarter</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">Form 16A</th>
                <th className="py-3 px-3.5 whitespace-nowrap font-mono">Certificate No</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px] text-slate-800">
              {filteredRecords.map((row) => (
                <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                  <td className="py-3 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                    {row.agentCode}
                  </td>
                  <td className="py-3 px-3.5 font-semibold text-slate-900">{row.agentName}</td>
                  <td className="py-3 px-3.5 font-mono font-semibold text-slate-700">{row.panNo}</td>
                  <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                  <td className="py-3 px-3.5 text-right font-bold text-slate-900">
                    {formatCurrency(row.grossComm)}
                  </td>
                  <td className="py-3 px-3.5 text-right font-bold text-rose-700">
                    {formatCurrency(row.tdsAmount)}
                  </td>
                  <td className="py-3 px-3.5 text-right font-bold text-emerald-700">
                    {formatCurrency(row.netPayout)}
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">{row.quarter}</td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {row.form16AStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    {row.certNo}
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={10} className="py-16 text-center text-slate-500">
                    <p className="font-semibold text-slate-600 text-sm">
                      No agent TDS records found for {appliedFilters.from} to {appliedFilters.to}.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentTdsReportTab;
