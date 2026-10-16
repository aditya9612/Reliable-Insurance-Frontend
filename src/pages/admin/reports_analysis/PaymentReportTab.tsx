import React, { useState, useMemo } from 'react';
import { Mail, Download, Search, Eye } from 'lucide-react';

interface PaymentRecord {
  id: number;
  paymentId: string;
  paymentDate: string;
  payeeName: string;
  payeeType: string;
  bankAndAccount: string;
  mode: string;
  amount: number;
  utrNo: string;
  status: string;
}

export const PaymentReportTab: React.FC = () => {
  const [allSummary, setAllSummary] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [fromDate, setFromDate] = useState('2026-10-01');
  const [toDate, setToDate] = useState('2026-10-14');
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const paymentRecords: PaymentRecord[] = [
    {
      id: 1,
      paymentId: 'PAY-2026-901',
      paymentDate: '14/10/2026',
      payeeName: 'Amit Tukaram Deshmukh',
      payeeType: 'Agent',
      bankAndAccount: 'HDFC Bank - 5010041289',
      mode: 'NEFT',
      amount: 176130,
      utrNo: 'UTR20261014901',
      status: 'Processed',
    },
    {
      id: 2,
      paymentId: 'PAY-2026-902',
      paymentDate: '14/10/2026',
      payeeName: 'Sneha Shrikant Kulkarni',
      payeeType: 'Agent',
      bankAndAccount: 'SBI - 3891049281',
      mode: 'IMPS',
      amount: 229900,
      utrNo: 'UTR20261014902',
      status: 'Processed',
    },
    {
      id: 3,
      paymentId: 'PAY-2026-903',
      paymentDate: '13/10/2026',
      payeeName: 'Rahul Tukaram Sharma',
      payeeType: 'Agent',
      bankAndAccount: 'ICICI Bank - 001928374',
      mode: 'NEFT',
      amount: 98400,
      utrNo: 'UTR20261013903',
      status: 'Processed',
    },
    {
      id: 4,
      paymentId: 'PAY-2026-904',
      paymentDate: '12/10/2026',
      payeeName: 'Priya Vijay Verma',
      payeeType: 'Franchise Partner',
      bankAndAccount: 'Axis Bank - 9120491823',
      mode: 'RTGS',
      amount: 345000,
      utrNo: 'UTR20261012904',
      status: 'Processed',
    },
    {
      id: 5,
      paymentId: 'PAY-2026-905',
      paymentDate: '11/10/2026',
      payeeName: 'Sanjay Bapurao Patil',
      payeeType: 'Agent',
      bankAndAccount: 'Bank of Baroda - 7719283401',
      mode: 'NEFT',
      amount: 54200,
      utrNo: 'UTR20261011905',
      status: 'Pending Verification',
    },
  ];

  const filteredRecords = useMemo(() => {
    return paymentRecords.filter((r) => {
      if (agentName.trim() && !r.payeeName.toLowerCase().includes(agentName.toLowerCase())) {
        return false;
      }
      if (tableSearch.trim()) {
        const q = tableSearch.toLowerCase();
        return (
          r.paymentId.toLowerCase().includes(q) ||
          r.payeeName.toLowerCase().includes(q) ||
          r.payeeType.toLowerCase().includes(q) ||
          r.utrNo.toLowerCase().includes(q) ||
          r.bankAndAccount.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [paymentRecords, agentName, tableSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / itemsPerPage));
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExport = () => {
    const headers = [
      'PAYMENT ID',
      'PAYMENT DATE',
      'PAYEE NAME',
      'PAYEE TYPE',
      'BANK & A/C NO',
      'MODE',
      'AMOUNT',
      'UTR / REF NO',
      'STATUS',
    ];
    const rows = filteredRecords.map((r) => [
      `"${r.paymentId}"`,
      `"${r.paymentDate}"`,
      `"${r.payeeName}"`,
      `"${r.payeeType}"`,
      `"${r.bankAndAccount}"`,
      `"${r.mode}"`,
      r.amount,
      `"${r.utrNo}"`,
      `"${r.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Payment_Report_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendMail = () => {
    alert(`Payment report summary will be emailed to ${agentName || 'registered recipients'}.`);
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card */}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden">

        <div className="p-4 sm:p-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCurrentPage(1);
            }}
            className="flex flex-wrap items-center justify-between gap-4"
          >
            {/* Inputs group */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* ALL Summary Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="allSummary"
                  checked={allSummary}
                  onChange={(e) => setAllSummary(e.target.checked)}
                  className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
                />
                <label htmlFor="allSummary" className="text-[13px] text-slate-700 font-semibold cursor-pointer select-none">
                  ALL Summary
                </label>
              </div>

              {/* Enter Agent Name */}
              <div className="flex items-center gap-2.5">
                <label className="text-[13px] text-slate-700 font-semibold whitespace-nowrap">
                  Agent Name
                </label>
                <input
                  type="text"
                  placeholder="Search By Agent Name"
                  value={agentName}
                  onChange={(e) => {
                    setAgentName(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-48 sm:w-56 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
              </div>

              {/* From Date */}
              <div className="flex items-center gap-2.5">
                <label className="text-[13px] text-slate-700 font-semibold whitespace-nowrap">
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-40 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer"
                />
              </div>

              {/* To Date */}
              <div className="flex items-center gap-2.5">
                <label className="text-[13px] text-slate-700 font-semibold whitespace-nowrap">
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-40 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                type="submit"
                className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer border-none h-[38px] flex items-center justify-center gap-2"
              >
                <Eye size={15} />
                <span>Show</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Table Container Card (Exact VehicleMaster Styling) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-[350px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search Payments..."
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSendMail}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer h-[40px] flex items-center justify-center gap-2 shadow-xs"
            >
              <Mail size={16} />
              <span>Send Mail</span>
            </button>

            <button
              onClick={handleExport}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer h-[40px] flex items-center justify-center gap-2 shadow-xs"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-3 px-4 text-center w-16">SR. NO.</th>
                <th className="py-3 px-4 font-mono">PAYMENT ID</th>
                <th className="py-3 px-4">PAYMENT DATE</th>
                <th className="py-3 px-4">PAYEE NAME</th>
                <th className="py-3 px-4">PAYEE TYPE</th>
                <th className="py-3 px-4">BANK & A/C NO</th>
                <th className="py-3 px-4 text-center">MODE</th>
                <th className="py-3 px-4 text-right">AMOUNT</th>
                <th className="py-3 px-4 font-mono">UTR / REF NO</th>
                <th className="py-3 px-4 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px]">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 font-medium">
                    No payment records found
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((r, idx) => (
                  <tr
                    key={r.id}
                    className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white"
                  >
                    <td className="py-2.5 px-4 font-medium text-brand-primary text-center">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-brand-primary">
                      {r.paymentId}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 whitespace-nowrap">
                      {r.paymentDate}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">
                      {r.payeeName}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {r.payeeType}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-xs text-slate-600">
                      {r.bankAndAccount}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-brand-primary border border-blue-200">
                        {r.mode}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                      ₹{formatCurrency(r.amount)}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-xs text-slate-500">
                      {r.utrNo}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        r.status === 'Processed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Exact VehicleMaster Styling) */}
        <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#64748b]">
          <div className="flex items-center gap-2">
            <span>Records per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-sm text-brand-navy focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div>
            Showing {filteredRecords.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded flex items-center justify-center font-medium transition-colors cursor-pointer ${
                  currentPage === i + 1
                    ? 'bg-brand-primary text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReportTab;
