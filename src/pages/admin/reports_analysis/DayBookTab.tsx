import React, { useState } from 'react';
import { Download, ChevronRight, Eye } from 'lucide-react';

export interface DayBookEntry {
  id: number;
  voucherNo: string;
  date: string;
  accountHead: string;
  particulars: string;
  debit: number;
  credit: number;
  balance: number;
  mode: string;
  branch: string;
  enteredBy: string;
}

export const DayBookTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2026-10-14');
  const [appliedDate, setAppliedDate] = useState('2026-10-14');

  // Stats from Photo 2
  const stats = {
    policyCount: 42,
    policyPremium: 902964.28,
    cutNPay: 0,
    commissionPaid: 0,
  };

  const vouchers: DayBookEntry[] = [
    {
      id: 1,
      voucherNo: 'VCH-2026-0901',
      date: '14/10/2026',
      accountHead: 'Agent Commission Payout',
      particulars: 'Commission disbursement to Amit Deshmukh for Sept Batch',
      debit: 45000,
      credit: 0,
      balance: 1420500,
      mode: 'Bank',
      branch: 'BARAMATI HEAD OFFICE',
      enteredBy: 'Accounts Officer 1',
    },
    {
      id: 2,
      voucherNo: 'VCH-2026-0902',
      date: '14/10/2026',
      accountHead: 'Customer Premium Cash Collection',
      particulars: 'Cash premium received for POL-MOT-9912 by Arvind',
      debit: 0,
      credit: 38500,
      balance: 1459000,
      mode: 'Cash',
      branch: 'BARAMATI HEAD OFFICE',
      enteredBy: 'Cashier Desk',
    },
    {
      id: 3,
      voucherNo: 'VCH-2026-0903',
      date: '14/10/2026',
      accountHead: 'Office Utility & Facility',
      particulars: 'Electricity & Internet connectivity bill payment',
      debit: 8400,
      credit: 0,
      balance: 1450600,
      mode: 'Bank',
      branch: 'BARAMATI HEAD OFFICE',
      enteredBy: 'Admin Assistant',
    },
    {
      id: 4,
      voucherNo: 'VCH-2026-0904',
      date: '14/10/2026',
      accountHead: 'Franchise Share Remittance',
      particulars: 'Monthly franchise settlement from Hadapsar Hub',
      debit: 0,
      credit: 153600,
      balance: 1604200,
      mode: 'Bank',
      branch: 'PUNE',
      enteredBy: 'Accounts Officer 2',
    },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleExport = () => {
    const headers = [
      'VOUCHER NO',
      'DATE',
      'ACCOUNT HEAD',
      'PARTICULARS',
      'DEBIT',
      'CREDIT',
      'BALANCE',
      'MODE',
      'BRANCH',
      'ENTERED BY',
    ];
    const rows = vouchers.map((v) => [
      `"${v.voucherNo}"`,
      `"${v.date}"`,
      `"${v.accountHead}"`,
      `"${v.particulars}"`,
      v.debit,
      v.credit,
      v.balance,
      `"${v.mode}"`,
      `"${v.branch}"`,
      `"${v.enteredBy}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `DayBook_${appliedDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tableSearch, setTableSearch] = useState('');

  const displayVouchers = vouchers.filter((v) => {
    if (!tableSearch.trim()) return true;
    const q = tableSearch.toLowerCase();
    return (
      v.voucherNo.toLowerCase().includes(q) ||
      v.accountHead.toLowerCase().includes(q) ||
      v.particulars.toLowerCase().includes(q) ||
      v.branch.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(displayVouchers.length / itemsPerPage));
  const paginatedVouchers = displayVouchers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card */}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden">

        <div className="p-5 space-y-6">
          {/* Date row + View button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAppliedDate(selectedDate);
            }}
            className="flex items-center gap-4"
          >
            <div className="flex items-center gap-2.5">
              <label className="text-[13px] text-slate-700 font-semibold whitespace-nowrap">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-44 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer border-none h-[38px] flex items-center justify-center gap-2"
            >
              <Eye size={15} />
              <span>View</span>
            </button>
          </form>

          {/* 4 Summary Stat Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-brand-border rounded-xl divide-y sm:divide-y-0 sm:divide-x divide-brand-border bg-white overflow-hidden shadow-xs">
            {/* Box 1: Policy Count */}
            <div className="p-4 flex flex-col justify-between">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">Policy Count</span>
                <span className="text-xl font-bold text-brand-navy">{stats.policyCount}</span>
              </div>
              <div className="mt-3 text-right">
                <span className="text-xs text-brand-primary hover:underline font-semibold cursor-pointer inline-flex items-center gap-0.5">
                  View Details <ChevronRight size={13} />
                </span>
              </div>
            </div>

            {/* Box 2: Policy Premium */}
            <div className="p-4 flex flex-col justify-between">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">Policy Premium</span>
                <span className="text-xl font-bold text-brand-primary">₹{formatCurrency(stats.policyPremium)}</span>
              </div>
              <div className="mt-3 text-right">
                <span className="text-xs text-brand-primary hover:underline font-semibold cursor-pointer inline-flex items-center gap-0.5">
                  View Details <ChevronRight size={13} />
                </span>
              </div>
            </div>

            {/* Box 3: Cut N Pay */}
            <div className="p-4 flex flex-col justify-between">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">Cut N Pay</span>
                <span className="text-xl font-bold text-slate-800">₹{formatCurrency(stats.cutNPay)}</span>
              </div>
              <div className="mt-3 text-right">
                <span className="text-xs text-brand-primary hover:underline font-semibold cursor-pointer inline-flex items-center gap-0.5">
                  View Details <ChevronRight size={13} />
                </span>
              </div>
            </div>

            {/* Box 4: Commission Paid */}
            <div className="p-4 flex flex-col justify-between">
              <div className="flex items-baseline justify-between">
                <span className="text-slate-600 font-semibold text-xs uppercase tracking-wider">Commission Paid</span>
                <span className="text-xl font-bold text-emerald-700">₹{formatCurrency(stats.commissionPaid)}</span>
              </div>
              <div className="mt-3 text-right">
                <span className="text-xs text-brand-primary hover:underline font-semibold cursor-pointer inline-flex items-center gap-0.5">
                  View Details <ChevronRight size={13} />
                </span>
              </div>
            </div>
          </div>
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
              placeholder="Search Day Book Vouchers..."
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
                <th className="py-3 px-4 font-mono">VOUCHER NO</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4">ACCOUNT HEAD</th>
                <th className="py-3 px-4">PARTICULARS</th>
                <th className="py-3 px-4 text-right">DEBIT (₹)</th>
                <th className="py-3 px-4 text-right">CREDIT (₹)</th>
                <th className="py-3 px-4 text-right">BALANCE (₹)</th>
                <th className="py-3 px-4 text-center">MODE</th>
                <th className="py-3 px-4">BRANCH</th>
                <th className="py-3 px-4">ENTERED BY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px]">
              {paginatedVouchers.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 font-medium">
                    No vouchers found for this date
                  </td>
                </tr>
              ) : (
                paginatedVouchers.map((v, idx) => (
                  <tr
                    key={v.id}
                    className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white"
                  >
                    <td className="py-2.5 px-4 font-medium text-brand-primary text-center">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-brand-primary">
                      {v.voucherNo}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 whitespace-nowrap">
                      {v.date}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">
                      {v.accountHead}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 max-w-[280px] truncate" title={v.particulars}>
                      {v.particulars}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-rose-700">
                      {v.debit > 0 ? formatCurrency(v.debit) : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-emerald-700">
                      {v.credit > 0 ? formatCurrency(v.credit) : '-'}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                      {formatCurrency(v.balance)}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        v.mode === 'Cash'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-blue-50 text-brand-primary border border-blue-200'
                      }`}>
                        {v.mode}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 whitespace-nowrap">
                      {v.branch}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700 text-xs">
                      {v.enteredBy}
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
            Showing {displayVouchers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, displayVouchers.length)} of {displayVouchers.length} records
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

export default DayBookTab;
