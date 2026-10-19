import React, { useState } from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';

interface ViewDashboardTabProps {
  onNavigateTab?: (tabId: string) => void;
}

export const ViewDashboardTab: React.FC<ViewDashboardTabProps> = ({ onNavigateTab }) => {
  // Filters
  const [dateType, setDateType] = useState<'Trans Date' | 'Risk Start Date'>('Trans Date');
  const [selectedMonth, setSelectedMonth] = useState<string>('October');
  const [selectedFinancialYear, setSelectedFinancialYear] = useState<string>('2026-2027');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Calendar State
  const [calendarMonth, setCalendarMonth] = useState<'Sep' | 'October' | 'Nov'>('October');

  // Calendar Outstanding Data for October (Matching Screenshot 1)
  const calendarData: Record<number, string> = {
    1: 'R - 1211742.78',
    2: 'R - 1145482.03',
    3: 'R - 1762522.9',
    5: 'R - 68.79',
    6: 'R - 2249020.05',
    7: 'R - 2478759.29',
    8: 'R - 2487796',
    9: 'R - 2157714.44',
    10: 'R - 2387470.33',
    11: 'R - 2327590.06',
    12: 'R 77500.67',
    13: 'R 2040003.57',
    14: 'R 2541254.46',
    15: 'R 2803568.59',
    16: 'R 45063.0',
  };

  const currentActiveDay = 16; // Highlighted day in Screenshot 1

  // Broker Summary Cards (Screenshot 1)
  const brokerStats = [
    { name: 'Reliable', value: '8570' },
    { name: 'EFFICIENT', value: '0' },
    { name: 'DIGI SAFE', value: '0' },
    { name: 'LANDMARK', value: '0' },
    { name: 'IDEAL BROKERS', value: '26595010' },
  ];

  // Business Source Breakdown (Screenshot 1)
  const businessStats = [
    { name: 'Agent', value: '26031604.62' },
    { name: 'Direct', value: '514866.9' },
    { name: 'Self', value: '57108' },
    { name: 'Insurance Exec.', value: '0' },
    { name: 'Franchise Agent', value: '0' },
    { name: 'Total', value: '26603580' },
  ];

  // Renewal Stats (Screenshot 1)
  const renewalStats = {
    done: '0',
    pending: '2474',
  };

  // Category Wise Business (Screenshot 2 Top)
  const categoryBusinessData = [
    { category: 'STANDARD', business: '20316384.78' },
    { category: 'KEY CHANNEL', business: '4781862.67' },
    { category: 'SPECIAL', business: '933357.17' },
  ];
  const categoryTotal = '26031604.62';

  // Insurance Company Wise Business (Screenshot 2 Bottom)
  const insuranceCompanyBusinessData = [
    {
      company: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
      april: '414074.00', may: '385912.00', june: '543743.00', july: '87507.00',
      august: '259451.00', september: '657782.00', october: '99356.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '2447825.00',
    },
    {
      company: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
      april: '2294835.00', may: '1699512.00', june: '1721488.00', july: '1374695.00',
      august: '1092134.00', september: '1186766.00', october: '779189.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '10148619.00',
    },
    {
      company: 'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED',
      april: '885016.98', may: '962293.25', june: '813681.44', july: '656888.09',
      august: '903509.71', september: '775603.71', october: '588057.39', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '5585050.57',
    },
    {
      company: 'GO DIGIT GENERAL INSURANCE LIMITED',
      april: '51808.72', may: '58708.16', june: '130536.27', july: '119084.32',
      august: '131251.93', september: '403298.89', october: '70992.48', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '965680.77',
    },
    {
      company: 'HDFC ERGO GENERAL INSURANCE CO. LTD',
      april: '165430.00', may: '215400.00', june: '290120.00', july: '185600.00',
      august: '240100.00', september: '310500.00', october: '95400.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '1502550.00',
    },
    {
      company: 'INDUSIND GENERAL INSURANCE CO. LTD',
      april: '98450.00', may: '145000.00', june: '165200.00', july: '110200.00',
      august: '178500.00', september: '210400.00', october: '85600.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '993350.00',
    },
    {
      company: 'TATA AIG GENERAL INSURANCE CO. LTD',
      april: '452100.00', may: '521400.00', june: '610500.00', july: '480200.00',
      august: '540600.00', september: '690100.00', october: '210500.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '3505400.00',
    },
  ];

  // Product Wise Business Motor (Screenshot 3)
  const productMotorBusinessData = [
    {
      product: 'PRIVATE CAR',
      april: '4535165.06', may: '4078241.26', june: '3865895.11', july: '4543581.07',
      august: '4732389.08', september: '6268844.10', october: '3912562.25', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '31936677.93',
    },
    {
      product: 'GCV 0 - 2500 GVW',
      april: '212509.00', may: '850494.00', june: '1218286.10', july: '1786349.00',
      august: '1554310.00', september: '776338.00', october: '203059.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '6601345.10',
    },
    {
      product: 'GCV 0 - 2000 GVW',
      april: '4745409.33', may: '3397635.62', june: '4048229.50', july: '3645344.96',
      august: '3881199.92', september: '5105059.91', october: '2302973.63', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '27125852.87',
    },
    {
      product: 'GCV 2501 -3000 GVW',
      april: '1315699.00', may: '653248.00', june: '555222.00', july: '781523.69',
      august: '311718.00', september: '538095.86', october: '196737.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '4352243.55',
    },
    {
      product: 'GCV 2501 - 3500 GVW',
      april: '3878135.08', may: '4828703.68', june: '5436978.80', july: '6482335.25',
      august: '7121177.06', september: '8279077.81', october: '3495070.02', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '39521477.70',
    },
    {
      product: 'GCV 0-2300 GVW',
      april: '0.00', may: '0.00', june: '0.00', july: '0.00',
      august: '0.00', september: '20569.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '20569.00',
    },
    {
      product: 'GCV 2801-3500 GVW',
      april: '42487.00', may: '0.00', june: '0.00', july: '0.00',
      august: '35512.00', september: '126268.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '204267.00',
    },
    {
      product: 'GCV 3500 - 7500 GVW',
      april: '2319353.36', may: '1624698.98', june: '1685221.00', july: '1729091.35',
      august: '2193470.65', september: '2400272.11', october: '1116338.95', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '13068446.40',
    },
    {
      product: 'GCV 0-2800 GVW',
      april: '105050.00', may: '0.00', june: '0.00', july: '0.00',
      august: '34379.00', september: '36732.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '176161.00',
    },
    {
      product: 'GCV 35001-45000 GVW',
      april: '44717.00', may: '152542.00', june: '159475.00', july: '0.00',
      august: '0.00', september: '44050.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '400784.00',
    },
    {
      product: 'GCV 20001-35000 GVW',
      april: '310335.00', may: '463481.00', june: '710844.00', july: '223482.00',
      august: '309210.00', september: '492282.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '2509634.00',
    },
    {
      product: 'GCV 7501 - 12000',
      april: '2805572.00', may: '2057105.00', june: '2554340.00', july: '2392190.00',
      august: '2600318.00', september: '3021788.00', october: '1860640.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '17291953.00',
    },
  ];

  // Product Wise Business Non Motor (Screenshot 4)
  const productNonMotorBusinessData = [
    {
      product: 'BURGLARY',
      april: '0.00', may: '0.00', june: '0.00', july: '0.00',
      august: '0.00', september: '0.00', october: '8570.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '8570.00',
    },
    {
      product: 'COMMERCIAL LINE',
      april: '29048.00', may: '18950.00', june: '0.00', july: '0.00',
      august: '0.00', september: '21775.00', october: '60500.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '130273.00',
    },
    {
      product: 'CYBER',
      april: '0.00', may: '4853.00', june: '1933.00', july: '0.00',
      august: '0.00', september: '0.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '6786.00',
    },
    {
      product: 'FIRE',
      april: '0.00', may: '0.00', june: '186814.00', july: '33150.00',
      august: '66664.00', september: '130669.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '417297.00',
    },
    {
      product: 'HEALTH',
      april: '0.00', may: '51259.00', june: '26222.00', july: '53282.00',
      august: '18115.00', september: '710348.00', october: '30878.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '890104.00',
    },
    {
      product: 'PACKAGE',
      april: '0.00', may: '0.00', june: '0.00', july: '0.00',
      august: '0.00', september: '62052.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '62052.00',
    },
    {
      product: 'PERSONAL ACCIDENT',
      april: '1036.00', may: '0.00', june: '0.00', july: '87437.00',
      august: '0.00', september: '36400.00', october: '0.00', november: '0.00',
      december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '124873.00',
    },
  ];
  const totalNonMotor = {
    april: '30084.00', may: '75062.00', june: '214969.00', july: '173869.00',
    august: '84779.00', september: '961244.00', october: '99948.00', november: '0.00',
    december: '0.00', january: '0.00', february: '0.00', march: '0.00', total: '1639955.00',
  };

  const handleView = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  // Calendar days setup: October starts on Thursday (offset 4)
  const calendarDays = [];
  const startDayOffset = 4;
  for (let i = 0; i < 35; i++) {
    const dayNum = i - startDayOffset + 1;
    if (dayNum >= 1 && dayNum <= 31) {
      calendarDays.push({
        dayNumber: dayNum,
        inMonth: true,
        amountText: calendarData[dayNum] || null,
        isHighlighted: dayNum === currentActiveDay,
      });
    } else {
      const overflowDay = dayNum < 1 ? 26 + i : dayNum - 31;
      calendarDays.push({
        dayNumber: overflowDay,
        inMonth: false,
        amountText: null,
        isHighlighted: false,
      });
    }
  }

  return (
    <div className="space-y-5 w-full font-sans pb-10">

      {/* TOP BALANCED SECTION: 2 EQUAL-HEIGHT COLUMNS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

        {/* LEFT COLUMN: Calendar Showing Premium Outstanding */}
        <div className="lg:col-span-6 bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
          {/* Header matching BranchMaster / PolicyMaster */}
          <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
            <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
              Calendar Showing Premium Outstanding Of Insurance Company
            </span>
          </div>

          <div className="p-3.5 flex-1 flex flex-col">
            {/* Calendar Container with Integrated Month Navigator Header */}
            <div className="flex-1 flex flex-col border border-brand-border rounded-lg overflow-hidden bg-white shadow-2xs">
              {/* Month Navigator Bar */}
              <div className="flex items-center justify-between bg-slate-50 border-b border-brand-border px-4 py-2.5 text-xs font-bold text-slate-700">
                <button
                  type="button"
                  onClick={() => setCalendarMonth('Sep')}
                  className="text-brand-primary hover:text-[#1D4ED8] font-semibold text-xs cursor-pointer hover:underline flex items-center border-none bg-transparent"
                >
                  &lt; Sep
                </button>
                <span className="text-[14px] font-bold text-brand-navy tracking-wide">
                  October 2026
                </span>
                <button
                  type="button"
                  onClick={() => setCalendarMonth('Nov')}
                  className="text-brand-primary hover:text-[#1D4ED8] font-semibold text-xs cursor-pointer hover:underline flex items-center border-none bg-transparent"
                >
                  Nov &gt;
                </button>
              </div>

              {/* Day of Week Headers */}
              <div className="grid grid-cols-7 bg-brand-lightbg border-b border-brand-border text-center text-[12px] font-semibold uppercase text-brand-navy py-2">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* 5 Rows of Days - flex-1 with grid-rows-5 so cells expand evenly to fill height without blank space */}
              <div className="flex-1 grid grid-cols-7 grid-rows-5 divide-x divide-y divide-brand-border/60 text-[11px]">
                {calendarDays.map((cell, idx) => (
                  <div
                    key={idx}
                    className={`min-h-[58px] p-1.5 flex flex-col justify-between transition-colors ${
                      cell.isHighlighted
                        ? 'bg-amber-50/90 border border-amber-300'
                        : cell.inMonth
                        ? 'bg-white hover:bg-brand-mainbg'
                        : 'bg-slate-50/50 text-slate-300'
                    }`}
                  >
                    <div className="text-right pr-0.5 font-bold text-slate-600 text-[10.5px]">
                      {cell.dayNumber}
                    </div>

                    {cell.amountText && (
                      <div
                        className={`text-[9.5px] font-bold text-center py-0.5 px-1 rounded-full truncate shadow-2xs ${
                          cell.isHighlighted
                            ? 'bg-amber-600 text-white font-extrabold'
                            : 'bg-brand-primary text-white'
                        }`}
                        title={cell.amountText}
                      >
                        {cell.amountText}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Filters + Summary Cards + Category Wise Business (NO EXTRA SPACE!) */}
        <div className="lg:col-span-6 flex flex-col space-y-3.5">

          {/* 1. FILTER CARD */}
          <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              {/* Radio Group */}
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-800 select-none">
                  <input
                    type="radio"
                    name="mainDashDateType"
                    value="Trans Date"
                    checked={dateType === 'Trans Date'}
                    onChange={() => setDateType('Trans Date')}
                    className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                  />
                  <span>Trans Date</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-slate-800 select-none">
                  <input
                    type="radio"
                    name="mainDashDateType"
                    value="Risk Start Date"
                    checked={dateType === 'Risk Start Date'}
                    onChange={() => setDateType('Risk Start Date')}
                    className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                  />
                  <span>Risk Start Date</span>
                </label>
              </div>

              {/* Month Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Month</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                >
                  <option value="--Select Month--">--Select Month--</option>
                  <option value="October">October</option>
                  <option value="September">September</option>
                  <option value="August">August</option>
                </select>
              </div>

              {/* Financial Year Dropdown */}
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-700">Financial Year</span>
                <select
                  value={selectedFinancialYear}
                  onChange={(e) => setSelectedFinancialYear(e.target.value)}
                  className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
                >
                  <option value="2026-2027">2026-2027</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
              </div>

              {/* View Button - Matching Add New Branch Type in Photo */}
              <button
                type="button"
                onClick={handleView}
                disabled={isLoading}
                className="h-8 px-5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer active:scale-95 transition-all flex items-center gap-1.5 border-none"
              >
                {isLoading ? <RefreshCw size={12} className="animate-spin" /> : null}
                <span>view</span>
              </button>
            </div>
          </div>

          {/* 2. BROKER SUMMARY ROW (5 CARDS) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {brokerStats.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-[10px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden text-center"
              >
                <div className="bg-brand-lightbg text-brand-navy py-1.5 px-1 text-[11px] font-bold uppercase tracking-wider border-b border-brand-border truncate">
                  {item.name}
                </div>
                <div className="py-2 px-1 text-[13px] font-extrabold text-brand-navy">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* 3. BUSINESS SOURCE BREAKDOWN ROW (6 CARDS) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {businessStats.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-[10px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden text-center"
              >
                <div className="bg-brand-lightbg text-brand-navy py-1.5 px-1 text-[10.5px] font-bold uppercase tracking-wider border-b border-brand-border truncate">
                  {item.name}
                </div>
                <div className="py-2 px-1 text-[11.5px] font-extrabold text-brand-navy truncate" title={item.value}>
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* 4. RENEWAL STATUS (2 CARDS) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white rounded-[10px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden text-center">
              <div className="bg-brand-lightbg text-brand-navy py-1.5 px-2 text-[12px] font-bold tracking-wide border-b border-brand-border">
                Renewal Done
              </div>
              <div className="py-2 text-[15px] font-extrabold text-brand-navy">
                {renewalStats.done}
              </div>
            </div>

            <div className="bg-white rounded-[10px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden text-center">
              <div className="bg-brand-lightbg text-brand-navy py-1.5 px-2 text-[12px] font-bold tracking-wide border-b border-brand-border">
                Renewal Pending
              </div>
              <div className="py-2 text-[15px] font-extrabold text-brand-primary">
                {renewalStats.pending}
              </div>
            </div>
          </div>

          {/* 5. CATEGORY WISE BUSINESS (BALANCED IN RIGHT COLUMN) */}
          <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
              <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
                Category Wise Business
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[12.5px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-2.5 px-4 border-r border-brand-border">CATEGORY</th>
                    <th className="py-2.5 px-4 text-right">BUSINESS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border bg-white text-brand-navy">
                  {categoryBusinessData.map((row) => (
                    <tr key={row.category} className="hover:bg-brand-mainbg transition-colors h-[40px]">
                      <td className="py-2 px-4 font-semibold text-[#12284A] border-r border-brand-border">
                        {row.category}
                      </td>
                      <td className="py-2 px-4 text-right font-medium text-slate-700">
                        {row.business}
                      </td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-brand-lightbg/50 font-bold text-brand-navy border-t-2 border-brand-border h-[40px]">
                    <td className="py-2 px-4 uppercase border-r border-brand-border">TOTAL</td>
                    <td className="py-2 px-4 text-right font-extrabold text-brand-primary">
                      {categoryTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>

      {/* FULL-WIDTH SECTION 1: INSURANCE COMPANY WISE BUSINESS */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Insurance Company Wise Business
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[200px]">INSURANCE COMPANY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">APRIL</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">MAY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JUNE</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JULY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">AUGUST</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">SEPTEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">OCTOBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">NOVEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">DECEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JANUARY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">FEBRUARY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">MARCH</th>
                <th className="py-2.5 px-3 text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white text-slate-700">
              {insuranceCompanyBusinessData.map((row) => (
                <tr key={row.company} className="hover:bg-brand-mainbg transition-colors h-[42px]">
                  <td className="py-2 px-3 font-semibold text-brand-navy border-r border-brand-border text-[11px]">
                    {row.company}
                  </td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.april}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.may}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.june}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.july}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.august}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.september}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.october}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.november}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.december}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.january}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.february}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.march}</td>
                  <td className="py-2 px-3 text-right font-bold text-brand-navy">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL-WIDTH SECTION 2: PRODUCT WISE BUSINESS MOTOR */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Product Wise Business Motar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[180px]">PRODUCT</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">APRIL</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">MAY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JUNE</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JULY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">AUGUST</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">SEPTEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">OCTOBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">NOVEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">DECEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JANUARY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">FEBRUARY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">MARCH</th>
                <th className="py-2.5 px-3 text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white text-slate-700">
              {productMotorBusinessData.map((row) => (
                <tr key={row.product} className="hover:bg-brand-mainbg transition-colors h-[42px]">
                  <td className="py-2 px-3 font-semibold text-brand-navy border-r border-brand-border text-[11px]">
                    {row.product}
                  </td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.april}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.may}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.june}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.july}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.august}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.september}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.october}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.november}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.december}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.january}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.february}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.march}</td>
                  <td className="py-2 px-3 text-right font-bold text-brand-navy">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FULL-WIDTH SECTION 3: PRODUCT WISE BUSINESS NON MOTOR */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Product Wise Business Non Motar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-2.5 px-3 border-r border-brand-border min-w-[180px]">PRODUCT</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">APRIL</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">MAY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JUNE</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JULY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">AUGUST</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">SEPTEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">OCTOBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">NOVEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">DECEMBER</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">JANUARY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">FEBRUARY</th>
                <th className="py-2.5 px-2 text-right border-r border-brand-border">MARCH</th>
                <th className="py-2.5 px-3 text-right">TOTAL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white text-slate-700">
              {productNonMotorBusinessData.map((row) => (
                <tr key={row.product} className="hover:bg-brand-mainbg transition-colors h-[42px]">
                  <td className="py-2 px-3 font-semibold text-brand-navy border-r border-brand-border text-[11px]">
                    {row.product}
                  </td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.april}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.may}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.june}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.july}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.august}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.september}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.october}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.november}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.december}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.january}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.february}</td>
                  <td className="py-2 px-2 text-right border-r border-brand-border">{row.march}</td>
                  <td className="py-2 px-3 text-right font-bold text-brand-navy">{row.total}</td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-brand-lightbg/60 font-bold text-brand-navy border-t-2 border-brand-border h-[42px]">
                <td className="py-2.5 px-3 uppercase border-r border-brand-border">TOTAL</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.april}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.may}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.june}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.july}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.august}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.september}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.october}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.november}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.december}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.january}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.february}</td>
                <td className="py-2.5 px-2 text-right border-r border-brand-border">{totalNonMotor.march}</td>
                <td className="py-2.5 px-3 text-right font-extrabold text-brand-primary">{totalNonMotor.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-4 flex flex-wrap items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => onNavigateTab?.('executive-business')}
          className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white font-semibold text-xs rounded-lg shadow-xs transition-all flex items-center gap-2 cursor-pointer border-none"
        >
          <span>View Executive wise Business</span>
          <ArrowRight size={14} />
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab?.('broker-report')}
          className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white font-semibold text-xs rounded-lg shadow-xs transition-all flex items-center gap-2 cursor-pointer border-none"
        >
          <span>View Broker wise Business</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};

export default ViewDashboardTab;
