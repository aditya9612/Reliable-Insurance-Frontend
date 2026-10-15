import React, { useState } from 'react';
import { Mail, Download } from 'lucide-react';

export const PaymentReportTab: React.FC = () => {
  const [allSummary, setAllSummary] = useState(false);
  const [agentName, setAgentName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
    const mockRows = [
      ['PAY-2026-901', '14/10/2026', 'Amit Tukaram Deshmukh', 'Agent', 'HDFC Bank - 5010041289', 'NEFT', 176130, 'UTR20261014901', 'Processed'],
      ['PAY-2026-902', '14/10/2026', 'Sneha Shrikant Kulkarni', 'Agent', 'SBI - 3891049281', 'IMPS', 229900, 'UTR20261014902', 'Processed'],
    ];

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...mockRows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');
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
      {/* Top Card strictly matching Photo 2 */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border p-6">
        <form onSubmit={handleShow} className="flex flex-wrap items-center justify-between gap-6">
          {/* Left inputs group */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-8">
            {/* ALL Summery Checkbox */}
            <div className="flex items-center gap-2">
              <label htmlFor="allSummary" className="text-[13px] text-slate-800 font-bold cursor-pointer select-none">
                ALL Summery
              </label>
              <input
                type="checkbox"
                id="allSummary"
                checked={allSummary}
                onChange={(e) => setAllSummary(e.target.checked)}
                className="w-4 h-4 text-brand-primary rounded border-slate-300 focus:ring-brand-primary cursor-pointer accent-brand-primary"
              />
            </div>

            {/* Enter Agent Name */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                Enter Agent Name
              </label>
              <input
                type="text"
                placeholder="Search By Agent Name"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="w-48 sm:w-56 px-4 py-1.5 bg-white border border-slate-300 rounded-full text-[12.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
              />
            </div>

            {/* From Date */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                From Date
              </label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = 'text';
                }}
                className="w-36 px-4 py-1.5 bg-white border border-slate-300 rounded-full text-[12.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1">
                To Date
              </label>
              <input
                type="text"
                placeholder="dd/mm/yyyy"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                onFocus={(e) => (e.target.type = 'date')}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = 'text';
                }}
                className="w-36 px-4 py-1.5 bg-white border border-slate-300 rounded-full text-[12.5px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Right Action Buttons strictly matching Photo 2 layout */}
          <div className="flex flex-col gap-2.5 items-end">
            <div className="flex items-center gap-3">
              {/* Show Button (Blue Theme) */}
              <button
                type="submit"
                className="px-8 py-2 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[80px]"
              >
                Show
              </button>

              {/* Export Button (Amber Theme) */}
              <button
                type="button"
                onClick={handleExport}
                className="px-7 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[80px]"
              >
                Export
              </button>
            </div>

            {/* Send Mail Button (Amber Theme below Export) */}
            <div>
              <button
                type="button"
                onClick={handleSendMail}
                className="px-6 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[100px]"
              >
                Send Mail
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentReportTab;
