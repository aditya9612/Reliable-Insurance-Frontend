import React from 'react';

interface DirectBusinessRecord {
  id: number;
  representative: string;
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
  };
}

const directRecords: DirectBusinessRecord[] = [
  {
    id: 1,
    representative: 'ABHISHEK VILAS GAIKWAD',
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
    },
  },
  {
    id: 2,
    representative: 'ADITYA RAJENDRA SAPKAL',
    months: {
      april: 16764.00,
      may: 16003.80,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 120436.00,
      october: 37036.15,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
    },
  },
  {
    id: 3,
    representative: 'ANURAG CHANDRASHEKHAR JOSHI',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 66064.00,
      october: 69851.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
    },
  },
  {
    id: 4,
    representative: 'ARVIND DNYANESHWAR GAWADE',
    months: {
      april: 2401631.23,
      may: 2255177.87,
      june: 1770302.46,
      july: 1432850.89,
      august: 1783365.11,
      september: 2234526.12,
      october: 1144620.95,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
    },
  },
  {
    id: 5,
    representative: 'AVINASH BHARAT KORATKAR',
    months: {
      april: 1902488.10,
      may: 1792467.36,
      june: 1881841.62,
      july: 2335660.20,
      august: 2068064.14,
      september: 2223173.17,
      october: 872865.61,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
    },
  },
  {
    id: 6,
    representative: 'DEEPAK HARISHCHANDRA NAGALE',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 50611.00,
      october: 0.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
    },
  },
  {
    id: 7,
    representative: 'DEVENDRA NANA GODALKAR',
    months: {
      april: 417171.74,
      may: 21870.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 0.00,
      october: 0.00,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
    },
  },
];

export const DirectBusinessTab: React.FC = () => {
  const handleExportCSV = () => {
    const headers = [
      'RELATIONSHIP MANAGER / CUSTOMER SALES REPRESENTATIVE',
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
    ];

    const rows = directRecords.map((r) => [
      `"${r.representative}"`,
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
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Direct_Business_Report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Table Card */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Header Toolbar */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Direct Business Summary
          </span>
          <button
            type="button"
            onClick={handleExportCSV}
            className="h-8 px-4 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer border-none"
          >
            Export To Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-2.5 px-4 border-r border-brand-border min-w-[280px]">
                  RELATIONSHIP MANAGER / CUSTOMER SALES REPRESENTATIVE
                </th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">APRIL</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">MAY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">JUNE</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">JULY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[100px]">AUGUST</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[105px]">SEPTEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[95px]">OCTOBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[90px]">NOVEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[90px]">DECEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border min-w-[90px]">JANUARY</th>
                <th className="py-2.5 px-2 text-right min-w-[90px]">FEBRUARY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white text-slate-700">
              {directRecords.map((r) => (
                <tr key={r.id} className="hover:bg-brand-mainbg transition-colors h-[40px]">
                  <td className="py-2 px-4 font-semibold text-brand-navy border-r border-brand-border text-[11.5px]">
                    {r.representative}
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
                  <td className="py-2 px-2 text-right font-mono text-slate-400">0.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DirectBusinessTab;
