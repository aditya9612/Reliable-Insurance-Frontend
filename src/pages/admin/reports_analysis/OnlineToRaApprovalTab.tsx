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
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card matching Photo 5 */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="bg-[#0B5ED7] text-white px-5 py-2.5 text-[13.5px] font-semibold flex items-center shadow-xs">
          <span className="mr-1 text-base font-serif">&raquo;</span>Online To RA Approval Report
        </div>

        <div className="p-6">
          <form onSubmit={handleShow} className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <label className="text-[13px] text-slate-800 font-bold whitespace-nowrap">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-44 px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="text-[13px] text-slate-800 font-bold whitespace-nowrap">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-44 px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-2 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[76px]"
            >
              Show
            </button>

            {appliedDates.from === '2026-10-14' && appliedDates.to === '2026-10-14' && (
              <button
                type="button"
                onClick={() => {
                  setFromDate('2026-10-01');
                  setToDate('2026-10-14');
                  setAppliedDates({ from: '2026-10-01', to: '2026-10-14' });
                }}
                className="text-xs text-brand-primary hover:text-blue-800 hover:underline cursor-pointer bg-transparent border-none font-medium ml-2"
              >
                (View All Dates)
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Export Button below card matching Photo 5 */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleExport}
          className="px-7 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[80px]"
        >
          Export
        </button>
      </div>

      {/* Results Banner / Grid */}
      {filteredRecords.length === 0 ? (
        <div className="w-full bg-white rounded-lg border border-brand-border shadow-xs overflow-hidden">
          <div className="bg-[#EAEAEA] text-[#1E293B] px-4 py-3 font-semibold text-[13px] tracking-wide border-b border-slate-300">
            NO DATA FOUND
          </div>
          <div className="p-8 text-center text-slate-500 text-xs">
            No approval requests found for the selected date range ({appliedDates.from} to {appliedDates.to}).
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg border border-brand-border shadow-sm overflow-hidden flex flex-col">
          <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[13px] border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-brand-primary font-bold">»</span>
              <span>Online To RA Approval Entries</span>
              <span className="bg-brand-primary/10 text-brand-primary text-xs px-2.5 py-0.5 rounded-full font-bold ml-1">
                {filteredRecords.length} Records
              </span>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead>
                <tr className="bg-brand-primary text-white text-[11.5px] uppercase tracking-wider font-bold select-none border-b border-blue-700">
                  <th className="py-2.5 px-3.5 whitespace-nowrap font-mono">Request ID</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">Date</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">Customer Name</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap font-mono">Mobile</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">Product</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">Proposed Insurer</th>
                  <th className="py-2.5 px-3.5 text-right whitespace-nowrap">Premium (₹)</th>
                  <th className="py-2.5 px-3 text-center whitespace-nowrap">KYC</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">RA Reviewer</th>
                  <th className="py-2.5 px-3.5 text-center whitespace-nowrap">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-800">
                {filteredRecords.map((row) => (
                  <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
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
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineToRaApprovalTab;
