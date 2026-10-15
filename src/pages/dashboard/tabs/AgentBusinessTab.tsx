import React, { useState } from 'react';
import { initialAgentBusinessRecords, AgentBusinessSummaryRecord } from '../analyticsData';

export const AgentBusinessTab: React.FC = () => {
  const [championWise, setChampionWise] = useState<string>('Regular');
  const [category, setCategory] = useState<string>('ALL');
  const [financialYear, setFinancialYear] = useState<string>('2026-2027');
  const [records] = useState<AgentBusinessSummaryRecord[]>(initialAgentBusinessRecords);

  const handleView = () => {};

  // CSV Export function
  const handleExportCSV = () => {
    const headers = [
      'AGENT',
      'LOCATION',
      'SALESEX',
      'CATEGORY',
      'POSP_NAME',
      'APRIL',
      'MAY',
      'JUNE',
      'JULY',
      'AUGUST',
      'SEPTEMBER',
      'OCTOBER',
      'NOVEMBER',
      'DECEMBER',
      'JANUARY',
      'FEBRUARY',
      'MARCH',
      'TOTAL',
    ];

    const rows = records.map((r) => [
      `"${r.agent}"`,
      `"${r.location}"`,
      `"${r.salesExecutive}"`,
      `"${r.category}"`,
      `"${r.pospName}"`,
      r.months.april.toFixed(2),
      r.months.may.toFixed(2),
      r.months.june.toFixed(2),
      r.months.july.toFixed(2),
      r.months.august.toFixed(2),
      r.months.september.toFixed(2),
      r.months.october.toFixed(2),
      r.months.november.toFixed(2),
      r.months.december.toFixed(2),
      r.months.january.toFixed(2),
      r.months.february.toFixed(2),
      r.months.march.toFixed(2),
      r.total.toFixed(2),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Agent_Wise_Net_Premium_${financialYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* FILTER CARD */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 w-full">
        <div className="flex flex-col sm:flex-row items-end justify-start gap-4">
          {/* Champion wise */}
          <div className="w-full sm:w-48">
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              Champanion wise
            </label>
            <select
              value={championWise}
              onChange={(e) => setChampionWise(e.target.value)}
              className="w-full h-9 rounded-lg border border-brand-border bg-white px-3.5 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="Regular">Regular</option>
              <option value="Champion">Champion</option>
              <option value="Super Champion">Super Champion</option>
              <option value="ALL">ALL</option>
            </select>
          </div>

          {/* Category */}
          <div className="w-full sm:w-48">
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-9 rounded-lg border border-brand-border bg-white px-3.5 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="ALL">ALL</option>
              <option value="STANDARD">STANDARD</option>
              <option value="SPECIAL">SPECIAL</option>
              <option value="KEY CHANNEL">KEY CHANNEL</option>
            </select>
          </div>

          {/* Financial Year */}
          <div className="w-full sm:w-44">
            <label className="block text-xs font-semibold text-brand-navy mb-1.5">
              Financial Year
            </label>
            <select
              value={financialYear}
              onChange={(e) => setFinancialYear(e.target.value)}
              className="w-full h-9 rounded-lg border border-brand-border bg-white px-3.5 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            >
              <option value="2026-2027">2026-2027</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          {/* Buttons: View & Export */}
          <div className="flex items-center gap-2 pt-2 sm:pt-0">
            <button
              type="button"
              onClick={handleView}
              className="h-9 px-6 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer border-none"
            >
              View
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="h-9 px-6 bg-brand-lightbg hover:bg-blue-100 text-brand-navy text-xs font-semibold rounded-lg border border-brand-border transition-all cursor-pointer"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Header Toolbar */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Agent Wise Net Premium
          </span>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[190px]">AGENT</th>
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[100px]">LOCATION</th>
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[150px]">SALESEX</th>
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[110px]">CATEGORY</th>
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[190px]">POSP_NAME</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">APRIL</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">MAY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">JUNE</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">JULY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">AUGUST</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[105px]">SEPTEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">OCTOBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[90px]">NOVEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[90px]">DECEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[90px]">JANUARY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[90px]">FEBRUARY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[90px]">MARCH</th>
                <th className="py-2.5 px-3 text-right min-w-[110px] font-bold text-brand-navy">
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white text-slate-700">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-brand-mainbg transition-colors h-[40px]">
                  <td className="py-2 px-3 font-semibold text-brand-navy border-r border-brand-border text-[11.5px]">
                    {r.agent}
                  </td>
                  <td className="py-2 px-3 text-slate-700 border-r border-brand-border">{r.location}</td>
                  <td className="py-2 px-3 text-slate-600 border-r border-brand-border">{r.salesExecutive}</td>
                  <td className="py-2 px-3 border-r border-brand-border">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-lightbg text-brand-navy border border-brand-border whitespace-nowrap">
                      {r.category}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-800 border-r border-brand-border font-medium">
                    {r.pospName}
                  </td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-700">
                    {r.months.april > 0 ? r.months.april.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-700">
                    {r.months.may > 0 ? r.months.may.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-700">
                    {r.months.june > 0 ? r.months.june.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-700">
                    {r.months.july > 0 ? r.months.july.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-700">
                    {r.months.august > 0 ? r.months.august.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-700">
                    {r.months.september > 0 ? r.months.september.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-700">
                    {r.months.october > 0 ? r.months.october.toFixed(2) : '0.00'}
                  </td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-400">0.00</td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-400">0.00</td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-400">0.00</td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-400">0.00</td>
                  <td className="py-2 px-2 text-right font-mono border-r border-brand-border text-slate-400">0.00</td>
                  <td className="py-2 px-3 text-right font-mono font-bold text-brand-navy">
                    {r.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentBusinessTab;
