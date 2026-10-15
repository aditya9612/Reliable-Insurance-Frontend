import React, { useState, useMemo } from 'react';
import { Search, Download, Calendar, X, Eye, FileSpreadsheet, RefreshCw } from 'lucide-react';

export interface CashbackRecord {
  id: number;
  transDate: string;
  policyNo: string;
  customerName: string;
  agentName: string;
  productType: string;
  grossPremium: number;
  cashbackAmt: number;
  paymentMode: string;
  utrNo: string;
  approvedBy: string;
  status: 'Approved' | 'Pending' | 'Rejected' | 'Processing';
}

export const CashbackReportTab: React.FC = () => {
  // Date filters matching reliable-erp.com/Clerk/rpt_cashbackDateWise.aspx
  // Screenshot shows: From Date: 14/10/2026, To Date: 14/10/2026
  const [fromDate, setFromDate] = useState('2026-10-14');
  const [toDate, setToDate] = useState('2026-10-14');

  // Applied date filters triggered by clicking "Show"
  const [appliedDates, setAppliedDates] = useState({
    from: '2026-10-14',
    to: '2026-10-14',
  });

  // Search keyword for instant filtering
  const [searchQuery, setSearchQuery] = useState('');

  // Mock comprehensive cashback transactions dataset
  const allCashbackRecords: CashbackRecord[] = [
    {
      id: 1,
      transDate: '2026-10-12',
      policyNo: 'POL-CB-901',
      customerName: 'Abhay Chandrakant Jagdale',
      agentName: 'Amit Deshmukh',
      productType: 'Motor Private Car',
      grossPremium: 34500,
      cashbackAmt: 1500,
      paymentMode: 'IMPS Direct',
      utrNo: 'UTR202610129014',
      approvedBy: 'Admin Shekhar',
      status: 'Approved',
    },
    {
      id: 2,
      transDate: '2026-10-11',
      policyNo: 'POL-CB-902',
      customerName: 'Snehal Nitin Kulkarni',
      agentName: 'Sneha Kulkarni',
      productType: 'Commercial Goods Vehicle',
      grossPremium: 58000,
      cashbackAmt: 2500,
      paymentMode: 'Bank Transfer',
      utrNo: 'UTR202610118831',
      approvedBy: 'Admin Shekhar',
      status: 'Approved',
    },
    {
      id: 3,
      transDate: '2026-10-10',
      policyNo: 'POL-CB-903',
      customerName: 'Nagesh Baliram Jadhav',
      agentName: 'Rahul Sharma',
      productType: 'Two Wheeler Long Term',
      grossPremium: 8900,
      cashbackAmt: 450,
      paymentMode: 'UPI',
      utrNo: 'UPI9012448911',
      approvedBy: 'Pending Review',
      status: 'Pending',
    },
    {
      id: 4,
      transDate: '2026-10-09',
      policyNo: 'POL-CB-904',
      customerName: 'Dattatray Vitthal Pawar',
      agentName: 'Priya Verma',
      productType: 'Motor Private Car',
      grossPremium: 29800,
      cashbackAmt: 1200,
      paymentMode: 'NEFT',
      utrNo: 'NEFT00293149',
      approvedBy: 'Admin Shekhar',
      status: 'Approved',
    },
    {
      id: 5,
      transDate: '2026-10-07',
      policyNo: 'POL-CB-905',
      customerName: 'Mahindra Logistics Ltd',
      agentName: 'Sanjay Patil',
      productType: 'Fleet Commercial',
      grossPremium: 145000,
      cashbackAmt: 6000,
      paymentMode: 'RTGS',
      utrNo: 'RTGS7781290',
      approvedBy: 'Rejected - Policy Term',
      status: 'Rejected',
    },
    {
      id: 6,
      transDate: '2026-10-05',
      policyNo: 'POL-CB-906',
      customerName: 'Kunal Ashok Jadhav',
      agentName: 'Rohit Kadam',
      productType: 'Private Car Comprehensive',
      grossPremium: 22400,
      cashbackAmt: 1000,
      paymentMode: 'UPI',
      utrNo: 'UPI9912048190',
      approvedBy: 'Admin Shekhar',
      status: 'Approved',
    },
  ];

  // Helper currency formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Handle "Show" button click
  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedDates({
      from: fromDate,
      to: toDate,
    });
  };

  // Filter records based on Date Range and Search Query
  const filteredRecords = useMemo(() => {
    return allCashbackRecords.filter((record) => {
      // Date filtering
      if (appliedDates.from && record.transDate < appliedDates.from) {
        return false;
      }
      if (appliedDates.to && record.transDate > appliedDates.to) {
        return false;
      }

      // Search query filtering
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCustomer = record.customerName.toLowerCase().includes(q);
        const matchesAgent = record.agentName.toLowerCase().includes(q);
        const matchesPolicy = record.policyNo.toLowerCase().includes(q);
        const matchesUtr = record.utrNo.toLowerCase().includes(q);
        if (!matchesCustomer && !matchesAgent && !matchesPolicy && !matchesUtr) {
          return false;
        }
      }

      return true;
    });
  }, [allCashbackRecords, appliedDates, searchQuery]);

  // Export to CSV
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = [
      'SR NO',
      'DATE',
      'POLICY NO',
      'CUSTOMER NAME',
      'AGENT NAME',
      'PRODUCT TYPE',
      'GROSS PREMIUM',
      'CASHBACK AMOUNT',
      'PAYMENT MODE',
      'UTR / REF NO',
      'APPROVED BY',
      'STATUS',
    ];

    const rows = filteredRecords.map((r, index) => [
      index + 1,
      `"${r.transDate}"`,
      `"${r.policyNo}"`,
      `"${r.customerName}"`,
      `"${r.agentName}"`,
      `"${r.productType}"`,
      r.grossPremium,
      r.cashbackAmt,
      `"${r.paymentMode}"`,
      `"${r.utrNo}"`,
      `"${r.approvedBy}"`,
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
      `Cashback_Report_${appliedDates.from || 'all'}_to_${appliedDates.to || 'all'}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status badge styling
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Approved
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Pending
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-brand-primary border border-blue-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* =========================================================================
          TOP FILTER CARD (Replicating reliable-erp.com/Clerk/rpt_cashbackDateWise.aspx)
         ========================================================================= */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border overflow-hidden">
        {/* Banner Header with our Blue Theme */}
        <div className="bg-[#0B5ED7] text-white px-5 py-2 text-[13.5px] font-semibold flex items-center shadow-xs">
          <span className="mr-1 text-base font-serif">&raquo;</span>View Cashback Report
        </div>

        <div className="p-5 sm:p-6">
          <form onSubmit={handleShow} className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* 1. From Date */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
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

            {/* 2. To Date */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
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

            {/* Action Buttons: Show (Amber/Orange) & Export Report (Blue) matching screenshot */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0">
              <button
                type="submit"
                className="px-7 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center justify-center min-w-[80px]"
              >
                Show
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="px-6 py-2 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center justify-center min-w-[120px]"
              >
                Export Report
              </button>

              {/* Quick helper toggles */}
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
              {!(appliedDates.from === '2026-10-14' && appliedDates.to === '2026-10-14') && (
                <button
                  type="button"
                  onClick={() => {
                    setFromDate('2026-10-14');
                    setToDate('2026-10-14');
                    setAppliedDates({ from: '2026-10-14', to: '2026-10-14' });
                  }}
                  className="text-xs text-slate-500 hover:text-slate-700 hover:underline cursor-pointer bg-transparent border-none font-medium ml-2"
                >
                  (Reset to 14/10/2026)
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Instant Filter Search Bar */}
      <div className="w-full max-w-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Policy No, Customer, Agent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-full text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
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
          RESULTS TABLE / NO DATA FOUND GRID (Replicating exact layout with blue theme)
         ========================================================================= */}
      {filteredRecords.length === 0 ? (
        /* NO DATA FOUND Banner (matching the screenshot with our blue theme polish) */
        <div className="w-full bg-white rounded-lg border border-brand-border shadow-xs overflow-hidden">
          <div className="bg-[#EAEAEA] text-[#1E293B] px-4 py-3 font-semibold text-[13px] tracking-wide border-b border-slate-300 flex items-center justify-between">
            <span>NO DATA FOUND</span>
          </div>
          <div className="p-8 text-center text-slate-500 text-xs">
            <p className="font-medium text-slate-600">
              No cashback records found for the selected date range ({appliedDates.from || 'start'} to {appliedDates.to || 'end'}).
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Try selecting a broader date range or clearing the search keyword.
            </p>
          </div>
          {/* Bottom horizontal scroll indicator matching ERP bottom bar */}
          <div className="bg-slate-100 border-t border-slate-200 px-3 py-1 flex items-center justify-between text-[11px] text-slate-400 select-none">
            <span className="cursor-default">◄</span>
            <div className="h-2 bg-slate-300/60 rounded-full flex-1 mx-3" />
            <span className="cursor-default">►</span>
          </div>
        </div>
      ) : (
        /* POPULATED DATA GRID WITH OUR BLUE THEME */
        <div className="w-full bg-white rounded-lg border border-brand-border shadow-sm overflow-hidden flex flex-col">
          {/* Blue Theme Table Header Bar */}
          <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[13px] border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-brand-primary font-bold">»</span>
              <span>Cashback Report Records</span>
              <span className="bg-brand-primary/10 text-brand-primary text-xs px-2.5 py-0.5 rounded-full font-bold ml-1">
                {filteredRecords.length} Records
              </span>
            </div>
            <div className="text-xs text-slate-500 font-normal">
              Entries from <strong className="text-slate-700">{appliedDates.from}</strong> to <strong className="text-slate-700">{appliedDates.to}</strong>
            </div>
          </div>

          {/* Scrollable Table Area */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-brand-primary text-white text-[11.5px] uppercase tracking-wider font-bold select-none border-b border-blue-700">
                  <th className="py-2.5 px-3 text-center w-12">#</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">DATE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap font-mono">POLICY NO</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">CUSTOMER NAME</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">AGENT NAME</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">PRODUCT TYPE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap text-right">GROSS PREM (₹)</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap text-right">CASHBACK (₹)</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">PAYMENT MODE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap font-mono">UTR / REF NO</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">APPROVED BY</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-800">
                {filteredRecords.map((row, index) => (
                  <tr
                    key={row.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="py-3 px-3 text-center text-slate-400 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap text-slate-700 font-medium">
                      {row.transDate}
                    </td>
                    <td className="py-3 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                      {row.policyNo}
                    </td>
                    <td className="py-3 px-3.5 font-semibold text-slate-900">
                      {row.customerName}
                    </td>
                    <td className="py-3 px-3.5 text-slate-800 font-medium">
                      {row.agentName}
                    </td>
                    <td className="py-3 px-3.5 text-slate-700">
                      {row.productType}
                    </td>
                    <td className="py-3 px-3.5 text-right font-medium text-slate-800 whitespace-nowrap">
                      {formatCurrency(row.grossPremium)}
                    </td>
                    <td className="py-3 px-3.5 text-right font-bold text-emerald-700 whitespace-nowrap">
                      {formatCurrency(row.cashbackAmt)}
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">
                      {row.paymentMode}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                      {row.utrNo}
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">
                      {row.approvedBy}
                    </td>
                    <td className="py-3 px-3.5 text-center whitespace-nowrap">
                      {renderStatusBadge(row.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Summary */}
          <div className="bg-slate-50 border-t border-brand-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredRecords.length}</span> cashback entries
            </div>
            <div className="flex items-center gap-4">
              <span>
                Total Cashback Disbursed:{' '}
                <strong className="text-emerald-700 font-bold text-sm">
                  {formatCurrency(filteredRecords.reduce((acc, curr) => acc + curr.cashbackAmt, 0))}
                </strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CashbackReportTab;
