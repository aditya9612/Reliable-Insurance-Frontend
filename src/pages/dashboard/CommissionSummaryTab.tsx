import React, { useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';

interface BrokerProfitItem {
  broker: string;
  selfCommission: string;
  profit: string;
}

interface InwardSummaryItem {
  company: string;
  pendingCount: number;
  pendingAmount: number;
}

export const CommissionSummaryTab: React.FC = () => {
  // Filter States
  const [dateType, setDateType] = useState<'Trans Date' | 'Risk Start Date'>('Trans Date');
  const [selectedMonth, setSelectedMonth] = useState<string>('Oct');
  const [selectedFinancialYear, setSelectedFinancialYear] = useState<string>('--Select Financial Year--');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Profit Dashboard state
  const [profitDashboardData] = useState({
    netProfit: '0.00',
    selfCommission: '0.00',
    agentCommission: '0.00',
    instaPay: '0.00',
    cutNPay: '0.00',
    unpaid: '0.00',
    passOn: '0.00',
    executiveIncentive: '0.00',
    franchiseAgent: '0.00',
  });

  // Insurance Company Wise Profit Data (Empty by default as in Screenshot 1)
  const [insuranceProfitData] = useState<Array<{ company: string; selfCommission: string; profit: string }>>([]);

  // Broker Wise Profit Data (Screenshot 2)
  const [brokerProfitData] = useState<BrokerProfitItem[]>([
    { broker: 'DIGI SAFE - BROKING', selfCommission: '0.00', profit: '0.00' },
    { broker: 'EFFICIENT - BROKER', selfCommission: '0.00', profit: '0.00' },
    { broker: 'GIRNAR INSURANCE BOKER PVT LTD', selfCommission: '0.00', profit: '0.00' },
    { broker: 'IDEAL BROKERS - BROKING', selfCommission: '0.00', profit: '0.00' },
    { broker: 'LANDMARK - BROKING', selfCommission: '0.00', profit: '0.00' },
    { broker: 'RELIABLE - ASSOCIATES', selfCommission: '0.00', profit: '0.00' },
  ]);

  // Inward Summary of Year Data (Screenshots 2 & 3)
  const inwardSummaryData: InwardSummaryItem[] = [
    { company: 'HDFC ERGO GENERAL INSURANCE CO. LTD', pendingCount: 1, pendingAmount: 18276.00 },
    { company: 'INDUSIND GENERAL INSURANCE CO. LTD', pendingCount: 138, pendingAmount: 2834192.00 },
    { company: 'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED', pendingCount: 98, pendingAmount: 4025517.00 },
    { company: 'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED', pendingCount: 2, pendingAmount: 100416.00 },
    { company: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD', pendingCount: 1, pendingAmount: 20552.00 },
    { company: 'TATA AIG GENERAL INSURANCE CO. LTD', pendingCount: 38, pendingAmount: 1396592.00 },
    { company: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD', pendingCount: 3, pendingAmount: 206066.00 },
    { company: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD', pendingCount: 1, pendingAmount: 18483.00 },
    { company: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED', pendingCount: 11, pendingAmount: 553881.00 },
    { company: 'GO DIGIT GENERAL INSURANCE LIMITED', pendingCount: 1, pendingAmount: 1670.00 },
  ];

  // Business Partner Summary (Screenshot 4)
  const businessPartnerData = {
    agent: 2191,
    franchise: 15,
    franchiseAgent: 40,
  };

  const monthsList = [
    { label: '--Select Month--', value: '' },
    { label: 'Jan', value: 'Jan' },
    { label: 'Feb', value: 'Feb' },
    { label: 'Mar', value: 'Mar' },
    { label: 'Apr', value: 'Apr' },
    { label: 'May', value: 'May' },
    { label: 'Jun', value: 'Jun' },
    { label: 'Jul', value: 'Jul' },
    { label: 'Aug', value: 'Aug' },
    { label: 'Sep', value: 'Sep' },
    { label: 'Oct', value: 'Oct' },
    { label: 'Nov', value: 'Nov' },
    { label: 'Dec', value: 'Dec' },
  ];

  const financialYearsList = [
    '--Select Financial Year--',
    '2026-2027',
    '2025-2026',
    '2024-2025',
    '2023-2024',
    '2022-2023',
  ];

  const totalInwardPendingCount = inwardSummaryData.reduce((acc, curr) => acc + curr.pendingCount, 0);
  const totalInwardPendingAmount = inwardSummaryData.reduce((acc, curr) => acc + curr.pendingAmount, 0);

  const displayMonth = selectedMonth || 'Oct';

  const handleView = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleExportInward = () => {
    const headers = ['INSURANCE COMPANY', 'PENDING COUNT', 'TOTAL PENDING AMOUNT'];
    const rows = inwardSummaryData.map((d) => [
      `"${d.company}"`,
      d.pendingCount,
      d.pendingAmount.toFixed(2),
    ]);
    rows.push(['"TOTAL"', totalInwardPendingCount, totalInwardPendingAmount.toFixed(2)]);
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Inward_Summary_${selectedFinancialYear !== '--Select Financial Year--' ? selectedFinancialYear : 'Report'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportBrokerProfit = () => {
    const headers = ['BROKER', 'SELF COMMISSION', 'PROFIT'];
    const rows = brokerProfitData.map((d) => [`"${d.broker}"`, d.selfCommission, d.profit]);
    rows.push(['"TOTAL"', '0.00', '0.00']);
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Broker_Wise_Profit_Month_${displayMonth}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-5 w-full font-sans pb-10">

      {/* 1. COMMISSION SUMMARY OF MONTH (SCREENSHOT 1) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Header toolbar matching BranchMaster photo */}
        <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            commission Summery Of Month {displayMonth}
          </span>
        </div>

        <div className="p-4 sm:p-5 space-y-4">
          {/* Controls Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-700 text-xs">
            {/* Radio Group */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-brand-navy select-none">
                <input
                  type="radio"
                  name="summaryDateType"
                  value="Trans Date"
                  checked={dateType === 'Trans Date'}
                  onChange={() => setDateType('Trans Date')}
                  className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                />
                <span>Trans Date</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-brand-navy select-none">
                <input
                  type="radio"
                  name="summaryDateType"
                  value="Risk Start Date"
                  checked={dateType === 'Risk Start Date'}
                  onChange={() => setDateType('Risk Start Date')}
                  className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                />
                <span>Risk Start Date</span>
              </label>
            </div>

            {/* Month Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Month</span>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 py-0.5 text-xs text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              >
                {monthsList.map((m) => (
                  <option key={m.label} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Financial Year Dropdown */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">Financial Year</span>
              <select
                value={selectedFinancialYear}
                onChange={(e) => setSelectedFinancialYear(e.target.value)}
                className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 py-0.5 text-xs text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              >
                {financialYearsList.map((fy) => (
                  <option key={fy} value={fy}>
                    {fy}
                  </option>
                ))}
              </select>
            </div>

            {/* View Button */}
            <button
              type="button"
              onClick={handleView}
              disabled={isLoading}
              className="h-8 px-5 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer border-none"
            >
              {isLoading ? (
                <RefreshCw size={12} className="animate-spin" />
              ) : null}
              <span>view</span>
            </button>
          </div>

          {/* Sub Table Container: PROFIT DASHBORAD */}
          <div className="border border-brand-border rounded-lg overflow-hidden">
            <div className="bg-brand-lightbg text-brand-navy py-2 px-4 text-center text-xs font-bold tracking-wider uppercase border-b border-brand-border">
              PROFIT DASHBORAD
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse text-[11.5px] sm:text-[12px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy font-semibold uppercase border-b border-brand-border">
                    <th rowSpan={2} className="py-2.5 px-3 border-r border-brand-border whitespace-nowrap">
                      NET<br />PROFIT
                    </th>
                    <th rowSpan={2} className="py-2.5 px-3 border-r border-brand-border whitespace-nowrap">
                      SELF<br />COMMISSION
                    </th>
                    <th rowSpan={2} className="py-2.5 px-3 border-r border-brand-border whitespace-nowrap">
                      AGENT<br />COMMISSION
                    </th>
                    <th colSpan={2} className="py-1 px-3 border-r border-brand-border border-b border-brand-border">
                      PAID
                    </th>
                    <th rowSpan={2} className="py-2.5 px-3 border-r border-brand-border whitespace-nowrap">
                      UNPAID
                    </th>
                    <th rowSpan={2} className="py-2.5 px-3 border-r border-brand-border whitespace-nowrap">
                      PASS<br />ON
                    </th>
                    <th rowSpan={2} className="py-2.5 px-3 border-r border-brand-border whitespace-nowrap">
                      EXECUTIVE<br />INCENTIVE
                    </th>
                    <th rowSpan={2} className="py-2.5 px-3 whitespace-nowrap">
                      FRANCHISE<br />AGENT
                    </th>
                  </tr>
                  <tr className="bg-brand-lightbg text-brand-navy font-semibold uppercase border-b border-brand-border text-[11px]">
                    <th className="py-1.5 px-3 border-r border-brand-border whitespace-nowrap">
                      INSTA<br />PAY
                    </th>
                    <th className="py-1.5 px-3 border-r border-brand-border whitespace-nowrap">
                      CUT N<br />PAY
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border bg-white">
                  <tr className="text-brand-navy font-medium hover:bg-brand-mainbg transition-colors h-[42px]">
                    <td className="py-2 px-3 border-r border-brand-border text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.netProfit}
                    </td>
                    <td className="py-2 px-3 border-r border-brand-border text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.selfCommission}
                    </td>
                    <td className="py-2 px-3 border-r border-brand-border text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.agentCommission}
                    </td>
                    <td className="py-2 px-3 border-r border-brand-border text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.instaPay}
                    </td>
                    <td className="py-2 px-3 border-r border-brand-border text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.cutNPay}
                    </td>
                    <td className="py-2 px-3 border-r border-brand-border text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.unpaid}
                    </td>
                    <td className="py-2 px-3 border-r border-brand-border text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.passOn}
                    </td>
                    <td className="py-2 px-3 border-r border-brand-border text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.executiveIncentive}
                    </td>
                    <td className="py-2 px-3 text-right pr-4 font-semibold text-slate-700">
                      {profitDashboardData.franchiseAgent}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 2. INSURANCE COMPANY WISE PROFIT OF MONTH (SCREENSHOT 1 BOTTOM) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Insurance Company Wise Profit Of Month {displayMonth}
          </span>
        </div>

        <div className="p-4">
          {insuranceProfitData.length === 0 ? (
            <div className="border border-brand-border bg-brand-lightbg/30 rounded-lg p-4 text-left">
              <span className="text-xs font-bold text-brand-navy tracking-wider">
                NO DATA FOUND
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-[12px]">
                <thead>
                  <tr className="bg-brand-lightbg border-b border-brand-border text-brand-navy font-semibold uppercase text-[11.5px]">
                    <th className="py-2.5 px-4 border-r border-brand-border">INSURANCE COMPANY</th>
                    <th className="py-2.5 px-4 text-right border-r border-brand-border w-44">SELF COMMISSION</th>
                    <th className="py-2.5 px-4 text-right w-44">PROFIT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-brand-navy bg-white">
                  {insuranceProfitData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-brand-mainbg transition-colors h-[40px]">
                      <td className="py-2 px-4 border-r border-brand-border font-medium">{row.company}</td>
                      <td className="py-2 px-4 text-right border-r border-brand-border">{row.selfCommission}</td>
                      <td className="py-2 px-4 text-right font-medium">{row.profit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 3. BROKER WISE PROFIT OF MONTH (SCREENSHOT 2 TOP) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Broker Wise Profit Of Month {displayMonth}
          </span>
          <button
            type="button"
            onClick={handleExportBrokerProfit}
            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer border-none flex items-center"
            title="Export CSV"
          >
            <Download size={15} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px] sm:text-[12.5px]">
            <thead>
              <tr className="bg-brand-lightbg border-b border-brand-border text-brand-navy font-semibold uppercase text-[11.5px]">
                <th className="py-2.5 px-4 text-center border-r border-brand-border">BROKER</th>
                <th className="py-2.5 px-4 text-center border-r border-brand-border w-48 sm:w-60">SELF COMMISSION</th>
                <th className="py-2.5 px-4 text-center w-48 sm:w-60">PROFIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-navy bg-white">
              {brokerProfitData.map((row, idx) => (
                <tr key={idx} className="hover:bg-brand-mainbg transition-colors h-[40px]">
                  <td className="py-2 px-4 font-semibold text-[#12284A] border-r border-brand-border">
                    {row.broker}
                  </td>
                  <td className="py-2 px-4 text-right font-medium text-slate-700 border-r border-brand-border pr-8">
                    {row.selfCommission}
                  </td>
                  <td className="py-2 px-4 text-right font-medium text-slate-700 pr-8">
                    {row.profit}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-brand-lightbg/50 font-bold text-brand-navy border-t-2 border-brand-border h-[40px]">
                <td className="py-2 px-4 uppercase border-r border-brand-border font-bold">TOTAL</td>
                <td className="py-2 px-4 text-right border-r border-brand-border pr-8 font-bold text-brand-primary">0.00</td>
                <td className="py-2 px-4 text-right pr-8 font-bold text-brand-primary">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. INWARD SUMMARY OF YEAR (SCREENSHOTS 2 & 3) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Banner with Embedded Dropdown & CSV Export */}
        <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
              Inward Summary of Year
            </span>
            <select
              value={selectedFinancialYear}
              onChange={(e) => setSelectedFinancialYear(e.target.value)}
              className="bg-white text-brand-navy text-[12px] font-semibold px-2.5 py-1 rounded-lg border border-slate-300 cursor-pointer focus:outline-none focus:border-brand-primary"
            >
              {financialYearsList.map((fy) => (
                <option key={fy} value={fy}>
                  {fy}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleExportInward}
            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer border-none flex items-center"
            title="Export CSV"
          >
            <Download size={15} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-[12px] sm:text-[12.5px]">
            <thead>
              <tr className="bg-brand-lightbg border-b border-brand-border text-brand-navy font-semibold uppercase text-[11.5px]">
                <th className="py-2.5 px-4 text-center border-r border-brand-border">INSURANCE COMPANY</th>
                <th className="py-2.5 px-4 text-center border-r border-brand-border w-36 sm:w-44">PENDING COUNT</th>
                <th className="py-2.5 px-4 text-center w-52 sm:w-64">TOTAL PENDING AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-brand-navy bg-white">
              {inwardSummaryData.map((row, idx) => (
                <tr key={idx} className="hover:bg-brand-mainbg transition-colors h-[40px]">
                  <td className="py-2 px-4 font-semibold text-[#12284A] border-r border-brand-border">
                    {row.company}
                  </td>
                  <td className="py-2 px-4 text-right font-medium text-slate-700 border-r border-brand-border pr-8">
                    {row.pendingCount}
                  </td>
                  <td className="py-2 px-4 text-right font-bold text-brand-primary pr-8">
                    {row.pendingAmount.toFixed(2)}
                  </td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="bg-brand-lightbg/50 font-bold text-brand-navy border-t-2 border-brand-border h-[40px]">
                <td className="py-2 px-4 uppercase border-r border-brand-border font-bold">TOTAL</td>
                <td className="py-2 px-4 text-right border-r border-brand-border pr-8 font-bold">
                  {totalInwardPendingCount}
                </td>
                <td className="py-2 px-4 text-right font-extrabold text-brand-primary pr-8">
                  {totalInwardPendingAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. BUSINESS PARTNER CARD (SCREENSHOT 4) */}
      <div className="w-full sm:w-[440px] bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Business Partner
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse text-[12px] sm:text-[12.5px]">
            <thead>
              <tr className="bg-brand-lightbg border-b border-brand-border text-brand-navy font-semibold uppercase text-[11.5px]">
                <th className="py-2.5 px-3 border-r border-brand-border">AGENT</th>
                <th className="py-2.5 px-3 border-r border-brand-border">FRANCHISE</th>
                <th className="py-2.5 px-3">FRANCHISE AGENT</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="text-brand-navy font-bold h-[42px]">
                <td className="py-2.5 px-3 text-right pr-6 border-r border-brand-border font-extrabold text-brand-primary">
                  {businessPartnerData.agent}
                </td>
                <td className="py-2.5 px-3 text-right pr-6 border-r border-brand-border font-extrabold text-brand-primary">
                  {businessPartnerData.franchise}
                </td>
                <td className="py-2.5 px-3 text-right pr-6 font-extrabold text-brand-primary">
                  {businessPartnerData.franchiseAgent}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default CommissionSummaryTab;
