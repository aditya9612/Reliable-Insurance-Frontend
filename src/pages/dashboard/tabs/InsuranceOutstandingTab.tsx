import React, { useState } from 'react';

interface OutstandingItem {
  id: number;
  companyName: string;
  total: number;
  overdue: number;
}

const initialOutstanding: OutstandingItem[] = [
  { id: 1, companyName: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD', total: 18483.00, overdue: 18483.00 },
  { id: 2, companyName: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD', total: 20552.00, overdue: 20552.00 },
  { id: 3, companyName: 'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED', total: 100416.00, overdue: 100416.00 },
  { id: 4, companyName: 'GO DIGIT GENERAL INSURANCE LIMITED', total: 1670.00, overdue: 1670.00 },
  { id: 5, companyName: 'HDFC ERGO GENERAL INSURANCE CO. LTD', total: 18276.00, overdue: 18276.00 },
  { id: 6, companyName: 'INDUSIND GENERAL INSURANCE CO. LTD', total: 2834192.00, overdue: 2834192.00 },
  { id: 7, companyName: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED', total: 553881.00, overdue: 553881.00 },
  { id: 8, companyName: 'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED', total: 4083415.00, overdue: 4083415.00 },
  { id: 9, companyName: 'TATA AIG GENERAL INSURANCE CO. LTD', total: 1396592.00, overdue: 1396592.00 },
  { id: 10, companyName: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD', total: 206066.00, overdue: 206066.00 },
];

export const InsuranceOutstandingTab: React.FC = () => {
  const [financialYear, setFinancialYear] = useState<string>('2026-2027');

  const grandTotal = initialOutstanding.reduce((sum, item) => sum + item.total, 0);
  const grandOverdue = initialOutstanding.reduce((sum, item) => sum + item.overdue, 0);

  const handleExportCSV = () => {
    const headers = ['INSURANCE COMPANY', 'TOTAL', 'OVERDUE'];
    const rows = initialOutstanding.map((r) => [
      `"${r.companyName}"`,
      r.total.toFixed(2),
      r.overdue.toFixed(2),
    ]);
    rows.push(['"TOTAL"', grandTotal.toFixed(2), grandOverdue.toFixed(2)]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Insurance_Company_Outstanding_${financialYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Filter Card */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 w-full">
        <div className="flex flex-col sm:flex-row items-end gap-4">
          <div className="w-full sm:w-60">
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

          <button
            type="button"
            onClick={handleExportCSV}
            className="h-9 px-6 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer border-none"
          >
            Export
          </button>
        </div>
      </div>

      {/* Table Card matching Reference Table */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden w-full">
        {/* Card Header Toolbar */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Insurance Company Outstanding
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-2.5 px-4 border-r border-brand-border">INSURANCE COMPANY</th>
                <th className="py-2.5 px-4 text-right border-r border-brand-border w-44">TOTAL</th>
                <th className="py-2.5 px-4 text-right w-44">OVERDUE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white text-slate-700">
              {initialOutstanding.map((item) => (
                <tr key={item.id} className="hover:bg-brand-mainbg transition-colors h-[40px]">
                  <td className="py-2 px-4 font-semibold text-brand-navy border-r border-brand-border text-[11.5px]">
                    {item.companyName}
                  </td>
                  <td className="py-2 px-4 text-right font-mono text-slate-700 border-r border-brand-border">
                    {item.total.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 text-right font-mono font-bold text-brand-primary">
                    {item.overdue.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-brand-lightbg/60 font-bold text-brand-navy border-t-2 border-brand-border h-[42px]">
                <td className="py-2.5 px-4 uppercase border-r border-brand-border font-extrabold text-brand-navy">
                  TOTAL
                </td>
                <td className="py-2.5 px-4 text-right font-mono font-extrabold text-brand-navy border-r border-brand-border">
                  {grandTotal.toFixed(2)}
                </td>
                <td className="py-2.5 px-4 text-right font-mono font-extrabold text-brand-primary">
                  {grandOverdue.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InsuranceOutstandingTab;
