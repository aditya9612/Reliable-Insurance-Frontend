import React, { useState, useMemo } from 'react';
import { Search, Download, RefreshCw, X, Eye, FileSpreadsheet, ArrowLeftRight } from 'lucide-react';

export interface EndorsementRecord {
  id: number;
  endorsementDate: string;
  endorsementNo: string;
  policyNo: string;
  transferorName: string; // Insured / Current / Transferor Name
  transfereeName?: string; // New Owner (for ownership transfer)
  vehicleNo: string;
  company: string;
  endorsementType: string;
  premiumDiff: number;
  oldValue: string;
  newValue: string;
  branch: string;
  status: 'Approved' | 'In Process' | 'Pending Approval' | 'Rejected';
}

export const EndorsementReportTab: React.FC = () => {
  // Form Filter Inputs matching reliable-erp.com/Clerk/Adm_EndorsementRtpExport.aspx
  // Screenshot shows: From Date: 14/10/2026, To Date: 14/10/2026
  const [fromDate, setFromDate] = useState('2026-10-14');
  const [toDate, setToDate] = useState('2026-10-14');

  // Applied filter state triggered by clicking "Show"
  const [appliedDateRange, setAppliedDateRange] = useState({
    from: '2026-10-14',
    to: '2026-10-14',
  });

  // Secondary Instant Search Field below card ("Search Transferor Name Here")
  const [instantSearchTransferor, setInstantSearchTransferor] = useState('');

  // Selected record for details modal
  const [selectedRecord, setSelectedRecord] = useState<EndorsementRecord | null>(null);

  // Dataset of Endorsement transactions
  const allEndorsements: EndorsementRecord[] = [
    {
      id: 1,
      endorsementDate: '2026-10-12',
      endorsementNo: 'END-2026-081',
      policyNo: 'POL-MOT-412098',
      transferorName: 'Mahesh Suresh Jagtap',
      transfereeName: 'Ganesh Tukaram Jagtap',
      vehicleNo: 'MH-12-DE-1049',
      company: 'Bajaj Allianz Gen Ins',
      endorsementType: 'Ownership Transfer',
      premiumDiff: 750,
      oldValue: 'Mahesh Suresh Jagtap',
      newValue: 'Ganesh Tukaram Jagtap',
      branch: 'BARAMATI HEAD OFFICE',
      status: 'Approved',
    },
    {
      id: 2,
      endorsementDate: '2026-10-11',
      endorsementNo: 'END-2026-082',
      policyNo: 'POL-MOT-553210',
      transferorName: 'Sagar Mahadev Koli',
      transfereeName: 'Rajendra Anantrao Pawar',
      vehicleNo: 'MH-42-BA-9921',
      company: 'ICICI Lombard Gen Ins',
      endorsementType: 'Ownership Transfer',
      premiumDiff: 1100,
      oldValue: 'Sagar Mahadev Koli',
      newValue: 'Rajendra Anantrao Pawar',
      branch: 'PUNE',
      status: 'Approved',
    },
    {
      id: 3,
      endorsementDate: '2026-10-10',
      endorsementNo: 'END-2026-083',
      policyNo: 'POL-MOT-119834',
      transferorName: 'Vijay Vasant Thorat',
      transfereeName: '-',
      vehicleNo: 'MH-11-AX-7788',
      company: 'Tata AIG Gen Ins',
      endorsementType: 'Add CNG Kit',
      premiumDiff: 2450,
      oldValue: 'Petrol Only',
      newValue: 'Petrol + CNG External',
      branch: 'SOLAPUR',
      status: 'In Process',
    },
    {
      id: 4,
      endorsementDate: '2026-10-09',
      endorsementNo: 'END-2026-084',
      policyNo: 'POL-MOT-990145',
      transferorName: 'Kiran Ramesh Chavan',
      transfereeName: 'Sunil Mohanrao Khot',
      vehicleNo: 'MH-04-ER-2244',
      company: 'HDFC ERGO General',
      endorsementType: 'Ownership Transfer',
      premiumDiff: 850,
      oldValue: 'Kiran Ramesh Chavan',
      newValue: 'Sunil Mohanrao Khot',
      branch: 'MUMBAI',
      status: 'Approved',
    },
    {
      id: 5,
      endorsementDate: '2026-10-08',
      endorsementNo: 'END-2026-085',
      policyNo: 'POL-MOT-778129',
      transferorName: 'Rahul Tukaram Deshmukh',
      transfereeName: '-',
      vehicleNo: 'MH-12-PQ-4567',
      company: 'Go Digit General Ins',
      endorsementType: 'Nil Dep Addition',
      premiumDiff: 3820,
      oldValue: 'Standard Comprehensive',
      newValue: 'Zero Depreciation Add-on',
      branch: 'BARAMATI HEAD OFFICE',
      status: 'Approved',
    },
    {
      id: 6,
      endorsementDate: '2026-10-06',
      endorsementNo: 'END-2026-086',
      policyNo: 'POL-MOT-332901',
      transferorName: 'Babasaheb Ramchandra Yadav',
      transfereeName: '-',
      vehicleNo: 'MH-14-GH-6612',
      company: 'New India Assurance',
      endorsementType: 'PA Cover Addition',
      premiumDiff: 375,
      oldValue: 'Without PA Cover',
      newValue: 'Owner Driver PA 15 Lakh',
      branch: 'SATARA',
      status: 'Approved',
    },
    {
      id: 7,
      endorsementDate: '2026-10-04',
      endorsementNo: 'END-2026-087',
      policyNo: 'POL-MOT-228190',
      transferorName: 'Hanumant Ramchandra Pawar',
      transfereeName: 'Dattatray Shamrao Jagtap',
      vehicleNo: 'MH-12-KL-8822',
      company: 'Bajaj Allianz Gen Ins',
      endorsementType: 'Ownership Transfer',
      premiumDiff: 950,
      oldValue: 'Hanumant Ramchandra Pawar',
      newValue: 'Dattatray Shamrao Jagtap',
      branch: 'BARAMATI HEAD OFFICE',
      status: 'Approved',
    },
    {
      id: 8,
      endorsementDate: '2026-10-02',
      endorsementNo: 'END-2026-088',
      policyNo: 'POL-MOT-889921',
      transferorName: 'Sandip Dattatray Shinde',
      transfereeName: '-',
      vehicleNo: 'MH-12-RS-3388',
      company: 'ICICI Lombard Gen Ins',
      endorsementType: 'Engine Number Correction',
      premiumDiff: 0,
      oldValue: 'ENG-4892019',
      newValue: 'ENG-4892091',
      branch: 'PUNE',
      status: 'Approved',
    },
  ];

  // Helper currency formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(val);
  };

  // Handle "Show" button click
  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedDateRange({
      from: fromDate,
      to: toDate,
    });
  };

  // Filter records based on Date Range and Instant Transferor Name Search
  const filteredRecords = useMemo(() => {
    return allEndorsements.filter((record) => {
      // Date filter
      if (appliedDateRange.from && record.endorsementDate < appliedDateRange.from) {
        return false;
      }
      if (appliedDateRange.to && record.endorsementDate > appliedDateRange.to) {
        return false;
      }

      // Transferor Name search
      if (instantSearchTransferor.trim()) {
        const query = instantSearchTransferor.toLowerCase();
        const matchesTransferor = record.transferorName.toLowerCase().includes(query);
        const matchesTransferee = record.transfereeName?.toLowerCase().includes(query);
        const matchesPolicy = record.policyNo.toLowerCase().includes(query);
        const matchesEndoNo = record.endorsementNo.toLowerCase().includes(query);
        if (!matchesTransferor && !matchesTransferee && !matchesPolicy && !matchesEndoNo) {
          return false;
        }
      }

      return true;
    });
  }, [allEndorsements, appliedDateRange, instantSearchTransferor]);

  // Export to CSV
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = [
      'SR NO',
      'ENDORSEMENT DATE',
      'ENDORSEMENT NO',
      'POLICY NO',
      'TRANSFEROR NAME',
      'TRANSFEREE NAME',
      'VEHICLE NO',
      'COMPANY',
      'ENDORSEMENT TYPE',
      'PREMIUM DIFF',
      'OLD VALUE',
      'NEW VALUE',
      'BRANCH',
      'STATUS',
    ];

    const rows = filteredRecords.map((r, index) => [
      index + 1,
      `"${r.endorsementDate}"`,
      `"${r.endorsementNo}"`,
      `"${r.policyNo}"`,
      `"${r.transferorName}"`,
      `"${r.transfereeName || '-'}"`,
      `"${r.vehicleNo}"`,
      `"${r.company}"`,
      `"${r.endorsementType}"`,
      r.premiumDiff,
      `"${r.oldValue}"`,
      `"${r.newValue}"`,
      `"${r.branch}"`,
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
      `Endorsement_Report_${appliedDateRange.from || 'all'}_to_${appliedDateRange.to || 'all'}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status badge styling with our blue & brand palette
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Approved
          </span>
        );
      case 'In Process':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-brand-primary border border-blue-200">
            In Process
          </span>
        );
      case 'Pending Approval':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* =========================================================================
          TOP FILTER CARD (Replicating reliable-erp.com/Clerk/Adm_EndorsementRtpExport.aspx)
         ========================================================================= */}
      <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-brand-border">
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

          {/* Action Buttons: Show (Blue Theme) & Export (Amber/Orange Theme) */}
          <div className="flex items-center gap-3 pt-2 sm:pt-0">
            <button
              type="submit"
              className="px-6 py-1.5 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center justify-center min-w-[76px]"
            >
              Show
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="px-6 py-1.5 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center justify-center min-w-[76px]"
            >
              Export
            </button>

            {/* Quick date range switcher helper */}
            {(appliedDateRange.from === '2026-10-14' && appliedDateRange.to === '2026-10-14') && (
              <button
                type="button"
                onClick={() => {
                  setFromDate('2026-10-01');
                  setToDate('2026-10-14');
                  setAppliedDateRange({ from: '2026-10-01', to: '2026-10-14' });
                }}
                className="text-xs text-brand-primary hover:text-blue-800 hover:underline cursor-pointer bg-transparent border-none font-medium ml-2"
                title="View earlier endorsement entries for testing"
              >
                (View All Dates)
              </button>
            )}
            {!(appliedDateRange.from === '2026-10-14' && appliedDateRange.to === '2026-10-14') && (
              <button
                type="button"
                onClick={() => {
                  setFromDate('2026-10-14');
                  setToDate('2026-10-14');
                  setAppliedDateRange({ from: '2026-10-14', to: '2026-10-14' });
                }}
                className="text-xs text-slate-500 hover:text-slate-700 hover:underline cursor-pointer bg-transparent border-none font-medium ml-2"
                title="Reset to 14/10/2026 (exact ERP screenshot date)"
              >
                (Reset to 14/10/2026)
              </button>
            )}
          </div>
        </form>
      </div>

      {/* =========================================================================
          SECONDARY SEARCH FIELD (Directly below card in screenshot)
         ========================================================================= */}
      <div className="w-full max-w-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Transferor Name Here"
            value={instantSearchTransferor}
            onChange={(e) => setInstantSearchTransferor(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-full text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
          />
          {instantSearchTransferor && (
            <button
              onClick={() => setInstantSearchTransferor('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
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
            <p className="font-medium text-slate-600">No endorsement records found for the selected date range ({appliedDateRange.from || 'start'} to {appliedDateRange.to || 'end'}).</p>
            <p className="text-[11px] text-slate-400 mt-1">Try selecting a broader date range or clearing the transferor search filter.</p>
          </div>
          {/* Horizontal scroll indicator bar matching ERP bottom bar */}
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
              <span>Endorsement Report Records</span>
              <span className="bg-brand-primary/10 text-brand-primary text-xs px-2.5 py-0.5 rounded-full font-bold ml-1">
                {filteredRecords.length} Records
              </span>
            </div>
            <div className="text-xs text-slate-500 font-normal">
              Showing entries from <strong className="text-slate-700">{appliedDateRange.from}</strong> to <strong className="text-slate-700">{appliedDateRange.to}</strong>
            </div>
          </div>

          {/* Scrollable Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[1100px]">
              <thead>
                <tr className="bg-brand-primary text-white text-[11px] uppercase tracking-wider font-semibold border-b border-blue-700 select-none">
                  <th className="py-2.5 px-3 text-center w-12">#</th>
                  <th className="py-2.5 px-3.5">Endorsement Date</th>
                  <th className="py-2.5 px-3.5">Endorsement No</th>
                  <th className="py-2.5 px-3.5">Policy No</th>
                  <th className="py-2.5 px-3.5">Transferor Name</th>
                  <th className="py-2.5 px-3.5">Transferee / New Owner</th>
                  <th className="py-2.5 px-3.5">Vehicle Reg No</th>
                  <th className="py-2.5 px-3.5">Company</th>
                  <th className="py-2.5 px-3.5">Endorsement Type</th>
                  <th className="py-2.5 px-3.5 text-right">Prem Diff (₹)</th>
                  <th className="py-2.5 px-3.5">Old Value</th>
                  <th className="py-2.5 px-3.5">New Value</th>
                  <th className="py-2.5 px-3.5">Branch</th>
                  <th className="py-2.5 px-3.5 text-center">Status</th>
                  <th className="py-2.5 px-3 text-center w-16">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredRecords.map((row, index) => (
                  <tr
                    key={row.id}
                    className="hover:bg-blue-50/40 transition-colors"
                  >
                    <td className="py-2.5 px-3 text-center text-slate-400 font-medium">{index + 1}</td>
                    <td className="py-2.5 px-3.5 whitespace-nowrap text-slate-700 font-medium">{row.endorsementDate}</td>
                    <td className="py-2.5 px-3.5 font-bold text-brand-primary whitespace-nowrap">{row.endorsementNo}</td>
                    <td className="py-2.5 px-3.5 font-semibold text-slate-800 whitespace-nowrap">{row.policyNo}</td>
                    <td className="py-2.5 px-3.5 font-semibold text-slate-900">{row.transferorName}</td>
                    <td className="py-2.5 px-3.5 text-slate-700">
                      {row.transfereeName && row.transfereeName !== '-' ? (
                        <span className="font-semibold text-emerald-800 flex items-center gap-1">
                          <ArrowLeftRight size={11} className="text-emerald-600" />
                          {row.transfereeName}
                        </span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-2.5 px-3.5 font-mono text-[11px] font-bold text-slate-800 whitespace-nowrap">{row.vehicleNo}</td>
                    <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">{row.company}</td>
                    <td className="py-2.5 px-3.5">
                      <span className="font-semibold text-brand-primary">{row.endorsementType}</span>
                    </td>
                    <td className="py-2.5 px-3.5 text-right font-bold text-slate-800 whitespace-nowrap">
                      {formatCurrency(row.premiumDiff)}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-500 text-[11px] max-w-[130px] truncate" title={row.oldValue}>
                      {row.oldValue}
                    </td>
                    <td className="py-2.5 px-3.5 text-emerald-700 font-medium text-[11px] max-w-[140px] truncate" title={row.newValue}>
                      {row.newValue}
                    </td>
                    <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">{row.branch}</td>
                    <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                      {renderStatusBadge(row.status)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => setSelectedRecord(row)}
                        className="p-1.5 rounded-md hover:bg-brand-lightbg text-slate-500 hover:text-brand-primary transition-all cursor-pointer border-none bg-transparent"
                        title="View Endorsement Details"
                      >
                        <Eye size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Summary & Horizontal Scrollbar */}
          <div className="bg-slate-50 border-t border-brand-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredRecords.length}</span> endorsement entries
            </div>
            <div className="flex items-center gap-4">
              <span>
                Total Premium Difference:{' '}
                <strong className="text-brand-primary font-bold">
                  {formatCurrency(filteredRecords.reduce((acc, curr) => acc + curr.premiumDiff, 0))}
                </strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          RECORD DETAILS MODAL (When clicking Eye icon)
         ========================================================================= */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-brand-border w-full max-w-xl overflow-hidden animate-fadeIn">
            <div className="bg-brand-primary text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold">&raquo; Endorsement Details</span>
                <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded font-mono">
                  {selectedRecord.endorsementNo}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-white/80 hover:text-white bg-transparent border-none cursor-pointer p-1"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs text-slate-700">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Endorsement Date</span>
                  <span className="text-slate-900 font-bold">{selectedRecord.endorsementDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Endorsement Type</span>
                  <span className="text-brand-primary font-bold">{selectedRecord.endorsementType}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Policy Number</span>
                  <span className="text-slate-900 font-bold font-mono">{selectedRecord.policyNo}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Vehicle Reg No</span>
                  <span className="text-slate-900 font-bold font-mono">{selectedRecord.vehicleNo}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-100">
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Transferor Name</span>
                  <span className="text-slate-900 font-bold">{selectedRecord.transferorName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Transferee Name</span>
                  <span className="text-emerald-700 font-bold">{selectedRecord.transfereeName || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Insurance Company</span>
                  <span className="text-slate-900 font-medium">{selectedRecord.company}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium mb-0.5">Branch</span>
                  <span className="text-slate-900 font-medium">{selectedRecord.branch}</span>
                </div>
              </div>

              <div className="bg-brand-lightbg p-3.5 rounded-lg border border-blue-200/60 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Old Value:</span>
                  <span className="text-slate-800 font-semibold">{selectedRecord.oldValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">New Value:</span>
                  <span className="text-emerald-700 font-bold">{selectedRecord.newValue}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-blue-200">
                  <span className="text-slate-700 font-bold">Premium Difference:</span>
                  <span className="text-brand-primary font-extrabold text-sm">
                    {formatCurrency(selectedRecord.premiumDiff)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-1.5 bg-brand-primary hover:bg-blue-700 text-white rounded-md text-xs font-semibold cursor-pointer border-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndorsementReportTab;
