import React, { useState, useMemo } from 'react';
import { Download, Search, Eye } from 'lucide-react';

interface CancelRecord {
  id: number;
  cancelDate: string;
  policyNo: string;
  company: string;
  customerName: string;
  agentName: string;
  grossPremium: number;
  reason: string;
  refundAmt: number;
  status: string;
}

export const PolicyCancelReportTab: React.FC = () => {
  const [fromDate, setFromDate] = useState('2026-10-01');
  const [toDate, setToDate] = useState('2026-10-14');
  const [isAll, setIsAll] = useState(false);
  const [selectedReason, setSelectedReason] = useState('--Select Reason--');
  const [tableSearch, setTableSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const cancellationReasons = [
    '--Select Reason--',
    'Customer Request / Sold Vehicle',
    'Double Insurance / Duplicate Policy',
    'Cheque Bounce / Non-Payment of Premium',
    'Incorrect Policy Details / Re-issuance',
    'Vehicle Total Loss / Scrapped',
    'Other / Administrative Reason',
  ];

  const cancelRecords: CancelRecord[] = [
    {
      id: 1,
      cancelDate: '12/10/2026',
      policyNo: 'POL-CAN-4019',
      company: 'Bajaj Allianz Gen Ins',
      customerName: 'Hanumant Ramchandra Pawar',
      agentName: 'Amit Deshmukh',
      grossPremium: 28500,
      reason: 'Customer Request / Sold Vehicle',
      refundAmt: 14250,
      status: 'Cancelled',
    },
    {
      id: 2,
      cancelDate: '08/10/2026',
      policyNo: 'POL-CAN-4020',
      company: 'Tata AIG Gen Ins',
      customerName: 'Vikas Datta More',
      agentName: 'Sneha Kulkarni',
      grossPremium: 18900,
      reason: 'Double Insurance / Duplicate Policy',
      refundAmt: 18900,
      status: 'Processed',
    },
    {
      id: 3,
      cancelDate: '06/10/2026',
      policyNo: 'POL-CAN-4021',
      company: 'ICICI Lombard Gen Ins',
      customerName: 'Sanjay Tukaram Kadam',
      agentName: 'Rahul Sharma',
      grossPremium: 42100,
      reason: 'Cheque Bounce / Non-Payment of Premium',
      refundAmt: 0,
      status: 'Cancelled',
    },
    {
      id: 4,
      cancelDate: '03/10/2026',
      policyNo: 'POL-CAN-4022',
      company: 'HDFC ERGO General',
      customerName: 'Kavita Suresh Shinde',
      agentName: 'Priya Verma',
      grossPremium: 15600,
      reason: 'Incorrect Policy Details / Re-issuance',
      refundAmt: 15600,
      status: 'Processed',
    },
  ];

  const filteredRecords = useMemo(() => {
    return cancelRecords.filter((r) => {
      if (selectedReason !== '--Select Reason--' && r.reason !== selectedReason) return false;
      if (tableSearch.trim()) {
        const q = tableSearch.toLowerCase();
        return (
          r.policyNo.toLowerCase().includes(q) ||
          r.customerName.toLowerCase().includes(q) ||
          r.agentName.toLowerCase().includes(q) ||
          r.company.toLowerCase().includes(q) ||
          r.reason.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [cancelRecords, selectedReason, tableSearch]);

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
      'CANCEL DATE',
      'POLICY NO',
      'COMPANY',
      'CUSTOMER NAME',
      'AGENT NAME',
      'GROSS PREMIUM',
      'CANCELLATION REASON',
      'REFUND',
      'STATUS',
    ];
    const rows = filteredRecords.map((r) => [
      `"${r.cancelDate}"`,
      `"${r.policyNo}"`,
      `"${r.company}"`,
      `"${r.customerName}"`,
      `"${r.agentName}"`,
      r.grossPremium,
      `"${r.reason}"`,
      r.refundAmt,
      `"${r.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Policy_Cancel_Report_${fromDate}_to_${toDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
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

            {/* All Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="policyCancelAll"
                checked={isAll}
                onChange={(e) => setIsAll(e.target.checked)}
                className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
              />
              <label htmlFor="policyCancelAll" className="text-[13px] text-slate-700 font-semibold cursor-pointer select-none">
                All
              </label>
            </div>

            {/* Reason Dropdown */}
            <div className="flex items-center gap-2.5">
              <label className="text-[13px] text-slate-700 font-semibold whitespace-nowrap">
                Reason
              </label>
              <select
                value={selectedReason}
                onChange={(e) => {
                  setSelectedReason(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer min-w-[200px]"
              >
                {cancellationReasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* View / Show Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer border-none h-[38px] flex items-center justify-center gap-2"
            >
              <Eye size={15} />
              <span>Show</span>
            </button>
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
              placeholder="Search Cancelled Policies..."
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
            />
          </div>

          <button
            onClick={handleExport}
            className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer h-[40px] flex items-center justify-center gap-2 shadow-xs"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-3 px-4 text-center w-16">SR. NO.</th>
                <th className="py-3 px-4">CANCEL DATE</th>
                <th className="py-3 px-4 font-mono">POLICY NO</th>
                <th className="py-3 px-4">INSURANCE COMPANY</th>
                <th className="py-3 px-4">CUSTOMER NAME</th>
                <th className="py-3 px-4">AGENT NAME</th>
                <th className="py-3 px-4 text-right">GROSS PREM (₹)</th>
                <th className="py-3 px-4">CANCELLATION REASON</th>
                <th className="py-3 px-4 text-right">REFUND (₹)</th>
                <th className="py-3 px-4 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px]">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 font-medium">
                    No cancelled policies found
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
                    <td className="py-2.5 px-4 text-slate-600 whitespace-nowrap">
                      {r.cancelDate}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-brand-primary">
                      {r.policyNo}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">
                      {r.company}
                    </td>
                    <td className="py-2.5 px-4 font-medium text-slate-800">
                      {r.customerName}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {r.agentName}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                      ₹{formatCurrency(r.grossPremium)}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700 max-w-[240px] truncate" title={r.reason}>
                      {r.reason}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-emerald-700">
                      ₹{formatCurrency(r.refundAmt)}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        r.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
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

export default PolicyCancelReportTab;
