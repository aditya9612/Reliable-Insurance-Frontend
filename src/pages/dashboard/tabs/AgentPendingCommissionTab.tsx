import React, { useState } from 'react';

interface PendingCommissionRecord {
  id: number;
  agent: string;
  location: string;
  salesExecutive: string;
  category: 'STANDARD' | 'SPECIAL' | 'KEY CHANNEL';
  months: {
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
    january: number;
    february: number;
    march: number;
  };
  total: number;
}

// Exact data matching Screenshots 1 & 2
const initialPendingRecords: PendingCommissionRecord[] = [
  {
    id: 1,
    agent: 'ZUBEDA MASTAN SHAIKH',
    location: 'PUNE',
    salesExecutive: 'SAKSHI SUNIL MANE',
    category: 'STANDARD',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 3590.00,
      october: 0.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 3590.00,
  },
  {
    id: 2,
    agent: 'YOGITA VIKRAM SAWANT',
    location: 'KARAD',
    salesExecutive: 'SHEKHAR DAGADU KADAM',
    category: 'KEY CHANNEL',
    months: {
      april: 2.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 67340.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 67342.00,
  },
  {
    id: 3,
    agent: 'YOGESH VISHNU MALUSARE',
    location: 'NAVI MUMBAI',
    salesExecutive: 'NILAKSHI NARENDRA KULKARNI',
    category: 'STANDARD',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 5476.00,
      october: 14039.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 19515.00,
  },
  {
    id: 4,
    agent: 'YOGESH AJIT KADAM',
    location: 'KARAD',
    salesExecutive: 'SHEKHAR DAGADU KADAM',
    category: 'STANDARD',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 8279.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 8279.00,
  },
  {
    id: 5,
    agent: 'YOGESH SHIVAJI JADHAV',
    location: 'THANE',
    salesExecutive: 'NILAKSHI NARENDRA KULKARNI',
    category: 'KEY CHANNEL',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 57351.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 57351.00,
  },
  {
    id: 6,
    agent: 'YOGESH RAMCHANDRA RAUT',
    location: 'NASHIK',
    salesExecutive: 'ARVIND DNYANESHWAR GAWADE',
    category: 'STANDARD',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 19064.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 19064.00,
  },
  {
    id: 7,
    agent: 'VINAYAK SITARAM PATIL',
    location: 'KOLHAPUR',
    salesExecutive: 'MAYURI RAJENDRA MULE',
    category: 'SPECIAL',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 12450.00,
      october: 8900.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 21350.00,
  },
  {
    id: 8,
    agent: 'SANTOSH MADHUKAR SHINDE',
    location: 'SATARA',
    salesExecutive: 'SHEKHAR DAGADU KADAM',
    category: 'STANDARD',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 32180.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 32180.00,
  },
];

export const AgentPendingCommissionTab: React.FC = () => {
  const [financialYear, setFinancialYear] = useState<string>('2026-2027');
  const [records] = useState<PendingCommissionRecord[]>(initialPendingRecords);

  const handleView = () => {};

  // Calculate totals
  const totals = records.reduce(
    (acc, curr) => {
      acc.april += curr.months.april;
      acc.may += curr.months.may;
      acc.june += curr.months.june;
      acc.july += curr.months.july;
      acc.august += curr.months.august;
      acc.september += curr.months.september;
      acc.october += curr.months.october;
      acc.november += curr.months.november;
      acc.december += curr.months.december;
      acc.january += curr.months.january;
      acc.february += curr.months.february;
      acc.march += curr.months.march;
      acc.grandTotal += curr.total;
      return acc;
    },
    {
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
      january: 0,
      february: 0,
      march: 0,
      grandTotal: 0,
    }
  );

  const handleExportCSV = () => {
    const headers = [
      'AGENT',
      'LOCATION',
      'SALESEX',
      'CATEGORY',
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
    link.setAttribute('download', `Agent_Wise_Pending_Commission_${financialYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* FILTER CARD */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 w-full">
        <div className="flex flex-col sm:flex-row items-end justify-start gap-4">
          {/* Financial Year */}
          <div className="w-full sm:w-56">
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

          {/* Action Buttons */}
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
            Agent Wise Pending Commission
          </span>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[200px]">AGENT</th>
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[120px]">LOCATION</th>
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[180px]">SALESEX</th>
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[120px]">CATEGORY</th>
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
            {/* Grand Total Footer */}
            <tfoot>
              <tr className="bg-brand-lightbg/60 font-bold text-brand-navy border-t-2 border-brand-border h-[42px]">
                <td className="py-2.5 px-3 uppercase text-brand-navy font-extrabold border-r border-brand-border">
                  GRAND TOTAL ({records.length} AGENTS)
                </td>
                <td className="py-2.5 px-3 border-r border-brand-border">-</td>
                <td className="py-2.5 px-3 border-r border-brand-border">-</td>
                <td className="py-2.5 px-3 border-r border-brand-border">-</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">{totals.april.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">{totals.may.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">{totals.june.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">{totals.july.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">{totals.august.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">{totals.september.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">{totals.october.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">0.00</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">0.00</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">0.00</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">0.00</td>
                <td className="py-2.5 px-2 text-right font-mono border-r border-brand-border">0.00</td>
                <td className="py-2.5 px-3 text-right font-mono text-brand-primary font-extrabold">
                  {totals.grandTotal.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentPendingCommissionTab;
