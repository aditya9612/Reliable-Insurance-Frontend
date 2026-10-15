import React, { useState } from 'react';

const brokersList = [
  'RELIABLE',
  'EFFICIENT',
  'DIGI SAFE',
  'LANDMARK',
  'IDEAL BROKERS',
];

export const BrokerReportTab: React.FC = () => {
  // Photo 4 states
  const [dateType, setDateType] = useState<'Trans Date' | 'Risk Start Date'>('Trans Date');
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [financialYear, setFinancialYear] = useState<string>('2026-2027');

  // Photo 3 states
  const [selectedBroker, setSelectedBroker] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const handleExport = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Broker,Ideal Amount,Renewal Done,Renewal Pending\n' +
      'IDEAL BROKERS,462458.90,0,77';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Broker_Report_${financialYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 max-w-full">
      {/* SECTION 1 */}
      <div className="space-y-4 w-full">
        {/* Filter Card */}
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 w-full">
          <div className="flex flex-col sm:flex-row items-end gap-4">
            {/* Radio options: Trans Date / Risk Start Date */}
            <div className="flex items-center gap-4 text-xs font-semibold text-brand-navy pb-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="brokerDateType"
                  value="Trans Date"
                  checked={dateType === 'Trans Date'}
                  onChange={() => setDateType('Trans Date')}
                  className="w-4 h-4 text-brand-primary border-brand-border focus:ring-brand-primary cursor-pointer"
                />
                <span>Trans Date</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="brokerDateType"
                  value="Risk Start Date"
                  checked={dateType === 'Risk Start Date'}
                  onChange={() => setDateType('Risk Start Date')}
                  className="w-4 h-4 text-brand-primary border-brand-border focus:ring-brand-primary cursor-pointer"
                />
                <span>Risk Start Date</span>
              </label>
            </div>

            {/* Month */}
            <div className="w-full sm:w-44">
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Month
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full h-9 rounded-lg border border-brand-border bg-white px-3 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              >
                <option value="">--Select Month--</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
              </select>
            </div>

            {/* Financial Year */}
            <div className="w-full sm:w-40">
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Financial Year
              </label>
              <select
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                className="w-full h-9 rounded-lg border border-brand-border bg-white px-3 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              >
                <option value="2026-2027">2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            {/* View button */}
            <button
              type="button"
              className="h-9 px-6 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-xs transition-all shrink-0 cursor-pointer border-none"
            >
              View
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="space-y-4">
          {/* Row 1: Brokers */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['RELIABLE', 'EFFICIENT', 'DIGI SAFE', 'LANDMARK'].map((name) => (
              <div key={name} className="bg-white border border-brand-border rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-center">
                <div className="bg-slate-50 border-b border-brand-border text-brand-navy py-2 text-[11px] font-bold uppercase tracking-wider">
                  {name}
                </div>
                <div className="py-3.5 text-base font-bold text-slate-700 font-mono">0</div>
              </div>
            ))}

            <div className="bg-white border border-brand-border rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-center col-span-2 sm:col-span-1">
              <div className="bg-brand-lightbg border-b border-brand-border text-brand-navy py-2 text-[11px] font-bold uppercase tracking-wider">
                IDEAL BROKERS
              </div>
              <div className="py-3.5 text-base font-bold text-brand-primary font-mono">462458.9</div>
            </div>
          </div>

          {/* Row 2: Renewal Done / Pending */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="bg-white border border-brand-border rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-center">
              <div className="bg-slate-50 border-b border-brand-border text-brand-navy py-2 text-xs font-bold tracking-wide">
                Renewal Done
              </div>
              <div className="py-3 text-base font-bold text-brand-navy font-mono">0</div>
            </div>

            <div className="bg-white border border-brand-border rounded-[12px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-center">
              <div className="bg-slate-50 border-b border-brand-border text-brand-navy py-2 text-xs font-bold tracking-wide">
                Renewal Pending
              </div>
              <div className="py-3 text-base font-bold text-brand-primary font-mono">77</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 w-full">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          {/* Broker Name */}
          <div className="w-full sm:w-56">
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              Broker Name
            </label>
            <select
              value={selectedBroker}
              onChange={(e) => setSelectedBroker(e.target.value)}
              className="w-full h-9 rounded-lg border border-brand-border bg-white px-3 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="">--Select Broker--</option>
              {brokersList.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div className="w-full sm:w-44">
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              From Date
            </label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full h-9 rounded-lg border border-brand-border bg-white px-3 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary font-mono"
            />
          </div>

          {/* To Date */}
          <div className="w-full sm:w-44">
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              To Date
            </label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full h-9 rounded-lg border border-brand-border bg-white px-3 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary font-mono"
            />
          </div>

          {/* Action Buttons: Show & Export */}
          <div className="flex items-center gap-2 pt-2 sm:pt-0">
            <button
              type="button"
              className="h-9 px-6 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer border-none"
            >
              Show
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="h-9 px-6 bg-brand-lightbg hover:bg-blue-100 text-brand-navy text-xs font-semibold rounded-lg border border-brand-border transition-all cursor-pointer"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerReportTab;
