import React from 'react';

interface ExecutiveBusinessRecord {
  id: number;
  executiveType: string;
  salesExecutive: string;
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

// Exact data matching Photo 5
const executiveRecords: ExecutiveBusinessRecord[] = [
  {
    id: 1,
    executiveType: 'FIELD SALES EXECUTIVE',
    salesExecutive: 'ABHISHEK VILAS GAIKWAD',
    months: {
      april: 9903.00,
      may: 54801.00,
      june: 0.00,
      july: 0.00,
      august: 100540.00,
      september: 99615.00,
      october: 0.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 264859.00,
  },
  {
    id: 2,
    executiveType: 'FIELD SALES EXECUTIVE',
    salesExecutive: 'ARVIND DNYANESHWAR GAWADE',
    months: {
      april: 925153.00,
      may: 714771.60,
      june: 369526.00,
      july: 500032.00,
      august: 561067.58,
      september: 620792.00,
      october: 402097.95,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 4093440.13,
  },
  {
    id: 3,
    executiveType: 'FIELD SALES EXECUTIVE',
    salesExecutive: 'AVINASH BHARAT KORATKAR',
    months: {
      april: 98030.72,
      may: 262032.00,
      june: 461302.86,
      july: 310403.00,
      august: 109306.02,
      september: 154611.00,
      october: 28840.61,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 1424526.21,
  },
  {
    id: 4,
    executiveType: 'FIELD SALES EXECUTIVE',
    salesExecutive: 'MAHESH PRADIP PAWAR',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 5849.34,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 5849.34,
  },
  {
    id: 5,
    executiveType: 'FIELD SALES EXECUTIVE',
    salesExecutive: 'PRADIP DINKAR SHEWALE',
    months: {
      april: 0.00,
      may: 1366.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 0.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 1366.00,
  },
  {
    id: 6,
    executiveType: 'FIELD SALES EXECUTIVE',
    salesExecutive: 'RUPESH RAMESH GAIKWAD',
    months: {
      april: 0.00,
      may: 0.00,
      june: 18637.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 0.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 18637.00,
  },
  {
    id: 7,
    executiveType: 'FIELD SALES EXECUTIVE',
    salesExecutive: 'SHEKHAR DAGADU KADAM',
    months: {
      april: 25859.00,
      may: 8863.00,
      june: 1933.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 0.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 36455.00,
  },
];

export const ExecutiveBusinessTab: React.FC = () => {
  return (
    <div className="space-y-4 max-w-full">
      {/* TABLE CARD */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Header Toolbar */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Executive Wise Business
          </span>
        </div>

        {/* Scrollable Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[150px]">EXECUTIVE TYPE</th>
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[200px]">SALES EXECUTIVE</th>
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
              {executiveRecords.map((r) => (
                <tr key={r.id} className="hover:bg-brand-mainbg transition-colors h-[40px]">
                  <td className="py-2 px-3 text-slate-600 font-medium border-r border-brand-border text-[11.5px]">
                    {r.executiveType}
                  </td>
                  <td className="py-2 px-3 font-semibold text-brand-navy border-r border-brand-border text-[11.5px]">
                    {r.salesExecutive}
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

export default ExecutiveBusinessTab;
