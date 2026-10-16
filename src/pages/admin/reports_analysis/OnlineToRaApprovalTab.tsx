import React, { useState, useMemo } from 'react';
import { Search, Download, X, Eye, CheckCircle2 } from 'lucide-react';

export interface OnlineToRaApprovalRecord {
  id: number;
  requestId: string;
  date: string;
  customerName: string;
  mobile: string;
  product: string;
  proposedInsurer: string;
  premium: number;
  kycStatus: string;
  raReviewer: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Under Review';
}

export const OnlineToRaApprovalTab: React.FC = () => {
  const [fromDate, setFromDate] = useState('2026-10-14');
  const [toDate, setToDate] = useState('2026-10-14');

  const [appliedDates, setAppliedDates] = useState({
    from: '2026-10-14',
    to: '2026-10-14',
  });

  const [searchQuery, setSearchQuery] = useState('');

  const records: OnlineToRaApprovalRecord[] = [
    {
      id: 1,
      requestId: 'REQ-RA-9901',
      date: '2026-10-12',
      customerName: 'Mahesh Suresh Jagtap',
      mobile: '9822019284',
      product: 'Private Car Comprehensive',
      proposedInsurer: 'Bajaj Allianz Gen Ins',
      premium: 24500,
      kycStatus: 'Verified',
      raReviewer: 'Accounts Officer 1',
      status: 'Approved',
    },
    {
      id: 2,
      requestId: 'REQ-RA-9902',
      date: '2026-10-11',
      customerName: 'Pooja Sanjay Patil',
      mobile: '9423088192',
      product: 'Two Wheeler Package',
      proposedInsurer: 'Tata AIG Gen Ins',
      premium: 4200,
      kycStatus: 'Verified',
      raReviewer: 'Accounts Officer 2',
      status: 'Approved',
    },
    {
      id: 3,
      requestId: 'REQ-RA-9903',
      date: '2026-10-10',
      customerName: 'Shrikant Vitthal Shinde',
      mobile: '9763190284',
      product: 'Commercial Goods Vehicle',
      proposedInsurer: 'HDFC ERGO General',
      premium: 48900,
      kycStatus: 'Pending Aadhaar',
      raReviewer: 'Flagged for Docs',
      status: 'Pending',
    },
  ];

  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedDates({
      from: fromDate,
      to: toDate,
    });
  };

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (appliedDates.from && r.date < appliedDates.from) return false;
      if (appliedDates.to && r.date > appliedDates.to) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        if (!r.customerName.toLowerCase().includes(q) && !r.requestId.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [records, appliedDates, searchQuery]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No data to export');
      return;
    }
    const headers = [
      'REQUEST ID',
      'DATE',
      'CUSTOMER NAME',
      'MOBILE',
      'PRODUCT',
      'PROPOSED INSURER',
      'PREMIUM',
      'KYC STATUS',
      'RA REVIEWER',
      'STATUS',
    ];
    const rows = filteredRecords.map((r) => [
      `"${r.requestId}"`,
      `"${r.date}"`,
      `"${r.customerName}"`,
      `"${r.mobile}"`,
      `"${r.product}"`,
      `"${r.proposedInsurer}"`,
      r.premium,
      `"${r.kycStatus}"`,
      `"${r.raReviewer}"`,
      `"${r.status}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Online_To_RA_Approval_${appliedDates.from}_to_${appliedDates.to}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full font-sans">
      {/* Unified Table Card matching VehicleMaster (Image 2) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
        {/* Table Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Records: <span className="text-brand-primary font-bold">{filteredRecords.length}</span>
          </div>

          <form onSubmit={handleShow} className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">From:</span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary h-[38px] cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-600 whitespace-nowrap">To:</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary h-[38px] cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg font-semibold text-xs shadow-xs transition-all cursor-pointer border-none h-[38px] flex items-center gap-1.5"
            >
              <Eye size={14} />
              <span>Show</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-semibold text-xs shadow-xs transition-all cursor-pointer h-[38px] flex items-center gap-1.5"
            >
              <Download size={14} />
              <span>Export CSV</span>
            </button>
          </form>
        </div>

        {/* Scrollable Table Area starting immediately beneath toolbar */}
        <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border whitespace-nowrap">
                <th className="py-3 px-3.5 whitespace-nowrap font-mono">Request ID</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Date</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Customer Name</th>
                <th className="py-3 px-3.5 whitespace-nowrap font-mono">Mobile</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Product</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Proposed Insurer</th>
                <th className="py-3 px-3.5 text-right whitespace-nowrap">Premium (₹)</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">KYC</th>
                <th className="py-3 px-3.5 whitespace-nowrap">RA Reviewer</th>
                <th className="py-3 px-3.5 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px] text-slate-800">
              {filteredRecords.map((row) => (
                <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                  <td className="py-3 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                    {row.requestId}
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">{row.date}</td>
                  <td className="py-3 px-3.5 font-semibold text-slate-900">{row.customerName}</td>
                  <td className="py-3 px-3.5 font-mono text-slate-700 whitespace-nowrap">{row.mobile}</td>
                  <td className="py-3 px-3.5 text-slate-700">{row.product}</td>
                  <td className="py-3 px-3.5 text-slate-700">{row.proposedInsurer}</td>
                  <td className="py-3 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                    {formatCurrency(row.premium)}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-brand-primary border border-blue-200">
                      {row.kycStatus}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">{row.raReviewer}</td>
                  <td className="py-3 px-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        row.status === 'Approved'
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
                  <td colSpan={10} className="py-16 text-center text-slate-500">
                    <p className="font-semibold text-slate-600 text-sm">
                      No approval requests found for the selected date range ({appliedDates.from} to {appliedDates.to}).
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

export default OnlineToRaApprovalTab;
