import React, { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';

export const PolicyCancelReportTab: React.FC = () => {
  const [fromDate, setFromDate] = useState('2026-10-01');
  const [toDate, setToDate] = useState('2026-10-14');
  const [isAll, setIsAll] = useState(false);
  const [selectedReason, setSelectedReason] = useState('--Select Reason--');

  const cancellationReasons = [
    '--Select Reason--',
    'Customer Request / Sold Vehicle',
    'Double Insurance / Duplicate Policy',
    'Cheque Bounce / Non-Payment of Premium',
    'Incorrect Policy Details / Re-issuance',
    'Vehicle Total Loss / Scrapped',
    'Other / Administrative Reason',
  ];

  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
    const mockRows = [
      ['12/10/2026', 'POL-CAN-4019', 'Bajaj Allianz Gen Ins', 'Hanumant Ramchandra Pawar', 'Amit Deshmukh', 28500, 'Customer Request / Sold Vehicle', 14250, 'Cancelled'],
      ['08/10/2026', 'POL-CAN-4020', 'Tata AIG Gen Ins', 'Vikas Datta More', 'Sneha Kulkarni', 18900, 'Double Insurance / Duplicate Policy', 18900, 'Processed'],
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...mockRows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Policy_Cancel_Report_${fromDate}_to_${toDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card strictly matching Photo 1 */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border overflow-hidden">
        {/* Banner Header with our Blue Theme */}
        <div className="bg-[#0B5ED7] text-white px-5 py-2.5 text-[13.5px] font-semibold flex items-center shadow-xs">
          <span className="mr-1 text-base font-serif">&raquo;</span>Policy Cancel Report
        </div>

        <div className="p-6">
          <form onSubmit={handleShow} className="flex flex-wrap items-center gap-5 sm:gap-7">
            {/* From Date */}
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

            {/* To Date */}
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

            {/* All Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="policyCancelAll"
                checked={isAll}
                onChange={(e) => setIsAll(e.target.checked)}
                className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
              />
              <label htmlFor="policyCancelAll" className="text-[13px] text-slate-700 font-bold cursor-pointer select-none">
                All
              </label>
            </div>

            {/* Reason Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
              <label className="text-[13px] text-slate-800 font-bold whitespace-nowrap">
                Reason
              </label>
              <div className="relative">
                <select
                  value={selectedReason}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-56 px-4 py-1.5 bg-white border border-slate-300 rounded-full text-[12.5px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner appearance-none pr-8 cursor-pointer"
                >
                  {cancellationReasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Action Buttons: Show (Amber) & Export Report (Blue) matching Photo 1 */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0">
              <button
                type="submit"
                className="px-7 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[76px]"
              >
                Show
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="px-6 py-2 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center gap-1.5 min-w-[130px]"
              >
                <span>Export Report</span>
                <FileSpreadsheet size={15} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PolicyCancelReportTab;
