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
    <div className="w-full font-sans">
      {/* Unified Table Card matching VehicleMaster (Image 2) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
        {/* Table Toolbar: Search on left, Date Range & Actions on right */}
        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Instant Filter Search Bar */}
          <div className="relative w-full lg:w-[350px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search Policy No, Customer, Agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
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

          {/* Date Filter & Action Buttons */}
          <form onSubmit={handleShow} className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
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
              <span>Export</span>
            </button>

            {/* Quick helper toggles */}
            {appliedDates.from === '2026-10-14' && appliedDates.to === '2026-10-14' ? (
              <button
                type="button"
                onClick={() => {
                  setFromDate('2026-10-01');
                  setToDate('2026-10-14');
                  setAppliedDates({ from: '2026-10-01', to: '2026-10-14' });
                }}
                className="text-xs text-brand-primary hover:underline cursor-pointer bg-transparent border-none font-medium ml-1"
              >
                (View All)
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setFromDate('2026-10-14');
                  setToDate('2026-10-14');
                  setAppliedDates({ from: '2026-10-14', to: '2026-10-14' });
                }}
                className="text-xs text-slate-500 hover:underline cursor-pointer bg-transparent border-none font-medium ml-1"
              >
                (Reset)
              </button>
            )}
          </form>
        </div>

        {/* Scrollable Table Area starting immediately beneath toolbar */}
        <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border whitespace-nowrap">
                <th className="py-3 px-3 text-center w-12">SR. NO.</th>
                <th className="py-3 px-3.5 whitespace-nowrap">DATE</th>
                <th className="py-3 px-3.5 whitespace-nowrap font-mono">POLICY NO</th>
                <th className="py-3 px-3.5 whitespace-nowrap">CUSTOMER NAME</th>
                <th className="py-3 px-3.5 whitespace-nowrap">AGENT NAME</th>
                <th className="py-3 px-3.5 whitespace-nowrap">PRODUCT TYPE</th>
                <th className="py-3 px-3.5 whitespace-nowrap text-right">GROSS PREM (₹)</th>
                <th className="py-3 px-3.5 whitespace-nowrap text-right">CASHBACK (₹)</th>
                <th className="py-3 px-3.5 whitespace-nowrap">PAYMENT MODE</th>
                <th className="py-3 px-3.5 whitespace-nowrap font-mono">UTR / REF NO</th>
                <th className="py-3 px-3.5 whitespace-nowrap">APPROVED BY</th>
                <th className="py-3 px-3.5 whitespace-nowrap text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px] text-slate-800">
              {filteredRecords.map((row, index) => (
                <tr
                  key={row.id}
                  className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white"
                >
                  <td className="py-2.5 px-3 text-center text-brand-primary font-medium">
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
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={12} className="py-16 text-center text-slate-500">
                    <p className="font-semibold text-slate-600 text-sm">
                      No cashback records found for the selected date range ({appliedDates.from || 'all'} to {appliedDates.to || 'all'}).
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try selecting a broader date range or clearing the search keyword.
                    </p>
                  </td>
                </tr>
              )}
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
    </div>
  );
};

export default CashbackReportTab;
