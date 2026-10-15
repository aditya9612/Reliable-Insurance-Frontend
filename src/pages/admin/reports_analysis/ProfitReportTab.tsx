import React, { useState, useMemo } from 'react';
import { Search, Download, Calendar, X, Eye, FileSpreadsheet } from 'lucide-react';

export interface CommissionProfitRecord {
  id: number;
  date: string;
  referenceType: string;
  insuranceCompany: string;
  policyNo: string;
  salesExecutive: string;
  agent: string;
  franchise: string;
  franchiseAgent: string;
  vehicleType: string;
  vehicleNo: string;
  tpPremium: number;
  odPremium: number;
  netPremium: number;
  premiumAmt: number;
  paymentType: string;

  // Reliable Associates
  raTpPercent: number;
  raTp: number;
  raOdPercent: number;
  raOd: number;
  raNetPercent: number;
  raNet: number;
  raMispPercent: number;
  raMisp: number;
  raGross: number;
  raTds: number;
  raNetPaid: number;

  // Reliable Agent
  agentTpPercent: number;
  agentTp: number;
  agentOdPercent: number;
  agentOd: number;
  agentNetPercent: number;
  agentNet: number;
  agentMispPercent: number;
  agentMisp: number;
  agentGross: number;
  agentTds: number;
  agentNetPaid: number;

  // Franchise
  franchiseTpPercent: number;
  franchiseTp: number;
  franchiseOdPercent: number;
  franchiseOd: number;
  franchiseNetPercent: number;
  franchiseNet: number;
  franchiseMispPercent: number;
  franchiseMisp: number;
  franchiseGross: number;
  franchiseTds: number;
  franchiseNetPaid: number;

  // Franchise Agent
  franchiseAgentTpPercent: number;
  franchiseAgentTp: number;
  franchiseAgentOdPercent: number;
  franchiseAgentOd: number;
  franchiseAgentNetPercent: number;
  franchiseAgentNet: number;
  franchiseAgentMispPercent: number;
  franchiseAgentMisp: number;
  franchiseAgentGross: number;
  franchiseAgentTds: number;
  franchiseAgentNetPaid: number;

  // Profits
  reliableProfitTds: number;
  reliableProfitNet: number;
  franchiseProfitTds: number;
  franchiseProfitNet: number;

  // Vehicle Details
  policyType: string;
  productType: string;
  make: string;
  model: string;
  rto: string;
  fuelType: string;
  odDiscount: number;
  manufacturingYear: number;
  typeOfInsurancePolicy: string;
  ncbPremium: number;
  ncbPercent: number;
}

export const ProfitReportTab: React.FC = () => {
  // Date filters matching reliable-erp.com/Clerk/CommissionReport.aspx
  const [fromDate, setFromDate] = useState('2026-10-14');
  const [toDate, setToDate] = useState('2026-10-14');

  // Search keyword for instant filtering across company/policy/agent
  const [searchQuery, setSearchQuery] = useState('');

  // Initial records taken directly from the legacy ERP Commission Report screenshots
  const initialRecords: CommissionProfitRecord[] = [
    {
      id: 1,
      date: '14/10/2026',
      referenceType: 'AGENT',
      insuranceCompany: 'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED',
      policyNo: '132/02/11/1027/MTP/1010646956',
      salesExecutive: 'VAIBHAV RAMCHANDRA SONMALE',
      agent: 'SADHANA SACHIN CHORAT',
      franchise: '-',
      franchiseAgent: '-',
      vehicleType: 'CAR',
      vehicleNo: 'MH12VQ1647',
      tpPremium: 3416,
      odPremium: 13992,
      netPremium: 18098,
      premiumAmt: 21356.0,
      paymentType: 'ONLINE TO INSURANCE COMPANY',

      raTpPercent: 0,
      raTp: 0,
      raOdPercent: 25,
      raOd: 3498,
      raNetPercent: 0,
      raNet: 0,
      raMispPercent: 0,
      raMisp: 0,
      raGross: 3498,
      raTds: 70,
      raNetPaid: 3428,

      agentTpPercent: 0,
      agentTp: 0,
      agentOdPercent: 21,
      agentOd: 2938,
      agentNetPercent: 0,
      agentNet: 0,
      agentMispPercent: 0,
      agentMisp: 0,
      agentGross: 2938,
      agentTds: 59,
      agentNetPaid: 2879,

      franchiseTpPercent: 0,
      franchiseTp: 0,
      franchiseOdPercent: 0,
      franchiseOd: 0,
      franchiseNetPercent: 0,
      franchiseNet: 0,
      franchiseMispPercent: 0,
      franchiseMisp: 0,
      franchiseGross: 0,
      franchiseTds: 0,
      franchiseNetPaid: 0,

      franchiseAgentTpPercent: 0,
      franchiseAgentTp: 0,
      franchiseAgentOdPercent: 0,
      franchiseAgentOd: 0,
      franchiseAgentNetPercent: 0,
      franchiseAgentNet: 0,
      franchiseAgentMispPercent: 0,
      franchiseAgentMisp: 0,
      franchiseAgentGross: 0,
      franchiseAgentTds: 0,
      franchiseAgentNetPaid: 0,

      reliableProfitTds: 11,
      reliableProfitNet: 549,
      franchiseProfitTds: 0,
      franchiseProfitNet: 0,

      policyType: 'PRIVATE CAR',
      productType: 'COMPREHENSIVE',
      make: 'TATA',
      model: 'ALTROZ',
      rto: 'MH-12 PUNE',
      fuelType: 'PETROL',
      odDiscount: 70,
      manufacturingYear: 2023,
      typeOfInsurancePolicy: 'MOTOR',
      ncbPremium: 0,
      ncbPercent: 1,
    },
    {
      id: 2,
      date: '14/10/2026',
      referenceType: 'AGENT',
      insuranceCompany: 'HDFC ERGO GENERAL INSURANCE CO. LTD',
      policyNo: '2315209078962700000',
      salesExecutive: 'MAHESH PRADIP PAWAR',
      agent: 'HUMERA FAKRUDDIN SHAIKH',
      franchise: '-',
      franchiseAgent: '-',
      vehicleType: 'GCV',
      vehicleNo: 'MH03CV8912',
      tpPremium: 16049,
      odPremium: 906,
      netPremium: 17380,
      premiumAmt: 18422.0,
      paymentType: 'ONLINE TO INSURANCE COMPANY',

      raTpPercent: 0,
      raTp: 0,
      raOdPercent: 0,
      raOd: 0,
      raNetPercent: 59,
      raNet: 10049,
      raMispPercent: 0,
      raMisp: 0,
      raGross: 10254,
      raTds: 205,
      raNetPaid: 10049,

      agentTpPercent: 0,
      agentTp: 0,
      agentOdPercent: 0,
      agentOd: 0,
      agentNetPercent: 55,
      agentNet: 9559,
      agentMispPercent: 0,
      agentMisp: 0,
      agentGross: 9559,
      agentTds: 191,
      agentNetPaid: 9368,

      franchiseTpPercent: 0,
      franchiseTp: 0,
      franchiseOdPercent: 0,
      franchiseOd: 0,
      franchiseNetPercent: 0,
      franchiseNet: 0,
      franchiseMispPercent: 0,
      franchiseMisp: 0,
      franchiseGross: 0,
      franchiseTds: 0,
      franchiseNetPaid: 0,

      franchiseAgentTpPercent: 0,
      franchiseAgentTp: 0,
      franchiseAgentOdPercent: 0,
      franchiseAgentOd: 0,
      franchiseAgentNetPercent: 0,
      franchiseAgentNet: 0,
      franchiseAgentMispPercent: 0,
      franchiseAgentMisp: 0,
      franchiseAgentGross: 0,
      franchiseAgentTds: 0,
      franchiseAgentNetPaid: 0,

      reliableProfitTds: 14,
      reliableProfitNet: 681,
      franchiseProfitTds: 0,
      franchiseProfitNet: 0,

      policyType: 'GCV 2501 - 3500 GVW',
      productType: 'COMPREHENSIVE',
      make: 'ASHOK LEYLAND',
      model: 'DOST',
      rto: 'MH-03 MUMBAI EASTERN',
      fuelType: 'DIESEL',
      odDiscount: 0,
      manufacturingYear: 2021,
      typeOfInsurancePolicy: 'MOTOR',
      ncbPremium: 0,
      ncbPercent: 0,
    },
    {
      id: 3,
      date: '14/10/2026',
      referenceType: 'AGENT',
      insuranceCompany: 'HDFC ERGO GENERAL INSURANCE CO. LTD',
      policyNo: '2315209081414400000',
      salesExecutive: 'PALLAVI VIJAY GAWDE',
      agent: 'PRANAY VIJAY GAWDE',
      franchise: '-',
      franchiseAgent: '-',
      vehicleType: 'GCV',
      vehicleNo: 'MH43CQ2351',
      tpPremium: 16049,
      odPremium: 9222,
      netPremium: 25371,
      premiumAmt: 27851.0,
      paymentType: 'ONLINE TO INSURANCE COMPANY',

      raTpPercent: 0,
      raTp: 0,
      raOdPercent: 0,
      raOd: 0,
      raNetPercent: 56.5,
      raNet: 14048,
      raMispPercent: 0,
      raMisp: 0,
      raGross: 14335,
      raTds: 287,
      raNetPaid: 14048,

      agentTpPercent: 0,
      agentTp: 0,
      agentOdPercent: 0,
      agentOd: 0,
      agentNetPercent: 53,
      agentNet: 13447,
      agentMispPercent: 0,
      agentMisp: 0,
      agentGross: 13447,
      agentTds: 269,
      agentNetPaid: 13178,

      franchiseTpPercent: 0,
      franchiseTp: 0,
      franchiseOdPercent: 0,
      franchiseOd: 0,
      franchiseNetPercent: 0,
      franchiseNet: 0,
      franchiseMispPercent: 0,
      franchiseMisp: 0,
      franchiseGross: 0,
      franchiseTds: 0,
      franchiseNetPaid: 0,

      franchiseAgentTpPercent: 0,
      franchiseAgentTp: 0,
      franchiseAgentOdPercent: 0,
      franchiseAgentOd: 0,
      franchiseAgentNetPercent: 0,
      franchiseAgentNet: 0,
      franchiseAgentMispPercent: 0,
      franchiseAgentMisp: 0,
      franchiseAgentGross: 0,
      franchiseAgentTds: 0,
      franchiseAgentNetPaid: 0,

      reliableProfitTds: 18,
      reliableProfitNet: 870,
      franchiseProfitTds: 0,
      franchiseProfitNet: 0,

      policyType: 'GCV 2501 - 3500 GVW',
      productType: 'COMPREHENSIVE',
      make: 'MAHINDRA',
      model: 'BOLERO',
      rto: 'MH-43 NAVI MUMBAI',
      fuelType: 'DIESEL',
      odDiscount: 80,
      manufacturingYear: 2025,
      typeOfInsurancePolicy: 'MOTOR',
      ncbPremium: 0,
      ncbPercent: 0,
    },
    {
      id: 4,
      date: '14/10/2026',
      referenceType: 'AGENT',
      insuranceCompany: 'HDFC ERGO GENERAL INSURANCE CO. LTD',
      policyNo: '2315209078572100000',
      salesExecutive: 'PALLAVI VIJAY GAWDE',
      agent: 'PRANAY VIJAY GAWDE',
      franchise: '-',
      franchiseAgent: '-',
      vehicleType: 'GCV',
      vehicleNo: 'MH43CQ2690',
      tpPremium: 16049,
      odPremium: 8565,
      netPremium: 24714,
      premiumAmt: 27076.0,
      paymentType: 'ONLINE TO INSURANCE COMPANY',

      raTpPercent: 0,
      raTp: 0,
      raOdPercent: 0,
      raOd: 0,
      raNetPercent: 56.5,
      raNet: 13884,
      raMispPercent: 0,
      raMisp: 0,
      raGross: 13963,
      raTds: 279,
      raNetPaid: 13884,

      agentTpPercent: 0,
      agentTp: 0,
      agentOdPercent: 0,
      agentOd: 0,
      agentNetPercent: 53,
      agentNet: 13098,
      agentMispPercent: 0,
      agentMisp: 0,
      agentGross: 13098,
      agentTds: 262,
      agentNetPaid: 12836,

      franchiseTpPercent: 0,
      franchiseTp: 0,
      franchiseOdPercent: 0,
      franchiseOd: 0,
      franchiseNetPercent: 0,
      franchiseNet: 0,
      franchiseMispPercent: 0,
      franchiseMisp: 0,
      franchiseGross: 0,
      franchiseTds: 0,
      franchiseNetPaid: 0,

      franchiseAgentTpPercent: 0,
      franchiseAgentTp: 0,
      franchiseAgentOdPercent: 0,
      franchiseAgentOd: 0,
      franchiseAgentNetPercent: 0,
      franchiseAgentNet: 0,
      franchiseAgentMispPercent: 0,
      franchiseAgentMisp: 0,
      franchiseAgentGross: 0,
      franchiseAgentTds: 0,
      franchiseAgentNetPaid: 0,

      reliableProfitTds: 17,
      reliableProfitNet: 848,
      franchiseProfitTds: 0,
      franchiseProfitNet: 0,

      policyType: 'GCV 2501 - 3500 GVW',
      productType: 'COMPREHENSIVE',
      make: 'MAHINDRA',
      model: 'BOLERO',
      rto: 'MH-43 NAVI MUMBAI',
      fuelType: 'DIESEL',
      odDiscount: 0,
      manufacturingYear: 2025,
      typeOfInsurancePolicy: 'MOTOR',
      ncbPremium: 0,
      ncbPercent: 0,
    },
  ];

  // Helper number formatter
  const formatNum = (val: number | undefined) => {
    if (val === undefined || val === null) return '-';
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  // Filter records
  const filteredRecords = useMemo(() => {
    if (!searchQuery.trim()) return initialRecords;
    const q = searchQuery.toLowerCase().trim();
    return initialRecords.filter((r) => {
      return (
        r.policyNo.toLowerCase().includes(q) ||
        r.insuranceCompany.toLowerCase().includes(q) ||
        r.agent.toLowerCase().includes(q) ||
        r.salesExecutive.toLowerCase().includes(q) ||
        r.vehicleNo.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, initialRecords]);

  // Export to Excel / CSV
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = [
      'DATE',
      'REFERENCE TYPE',
      'INSURANCE COMPANY',
      'POLICY NO',
      'SALES EXE',
      'AGENT',
      'FRANCHISE',
      'FRANCHISE AGENT',
      'VEHICLE TYPE',
      'VEHICLE NO.',
      'TP PREMIUM',
      'OD PREMIUM',
      'NET PREMIUM',
      'PREMIUM AMT',
      'PAYMENT TYPE',
      'RA TP %',
      'RA TP',
      'RA OD %',
      'RA OD',
      'RA NET %',
      'RA NET',
      'RA GROSS',
      'RA TDS',
      'RA NET PAID',
      'AGENT TP %',
      'AGENT TP',
      'AGENT OD %',
      'AGENT OD',
      'AGENT NET %',
      'AGENT NET',
      'AGENT GROSS',
      'AGENT TDS',
      'AGENT NET PAID',
      'RELIABLE PROFIT TDS',
      'RELIABLE PROFIT NET',
      'POLICY TYPE',
      'PRODUCT TYPE',
      'MAKE',
      'MODEL',
      'RTO',
      'FUEL TYPE',
      'OD DISCOUNT',
      'MANUFACTURING YEAR',
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.date}"`,
      `"${r.referenceType}"`,
      `"${r.insuranceCompany}"`,
      `"${r.policyNo}"`,
      `"${r.salesExecutive}"`,
      `"${r.agent}"`,
      `"${r.franchise}"`,
      `"${r.franchiseAgent}"`,
      `"${r.vehicleType}"`,
      `"${r.vehicleNo}"`,
      r.tpPremium,
      r.odPremium,
      r.netPremium,
      r.premiumAmt,
      `"${r.paymentType}"`,
      r.raTpPercent,
      r.raTp,
      r.raOdPercent,
      r.raOd,
      r.raNetPercent,
      r.raNet,
      r.raGross,
      r.raTds,
      r.raNetPaid,
      r.agentTpPercent,
      r.agentTp,
      r.agentOdPercent,
      r.agentOd,
      r.agentNetPercent,
      r.agentNet,
      r.agentGross,
      r.agentTds,
      r.agentNetPaid,
      r.reliableProfitTds,
      r.reliableProfitNet,
      `"${r.policyType}"`,
      `"${r.productType}"`,
      `"${r.make}"`,
      `"${r.model}"`,
      `"${r.rto}"`,
      `"${r.fuelType}"`,
      r.odDiscount,
      r.manufacturingYear,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Commission_Profit_Report_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Totals calculations
  const totalNetPremium = useMemo(
    () => filteredRecords.reduce((acc, r) => acc + r.netPremium, 0),
    [filteredRecords]
  );
  const totalPremiumAmt = useMemo(
    () => filteredRecords.reduce((acc, r) => acc + r.premiumAmt, 0),
    [filteredRecords]
  );
  const totalRaNetPaid = useMemo(
    () => filteredRecords.reduce((acc, r) => acc + r.raNetPaid, 0),
    [filteredRecords]
  );
  const totalAgentNetPaid = useMemo(
    () => filteredRecords.reduce((acc, r) => acc + r.agentNetPaid, 0),
    [filteredRecords]
  );
  const totalReliableProfitNet = useMemo(
    () => filteredRecords.reduce((acc, r) => acc + r.reliableProfitNet, 0),
    [filteredRecords]
  );

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Title above card matching screenshot: "Commission Report" */}
      <div className="text-center">
        <h3 className="text-sm font-bold text-brand-navy tracking-wide">
          Commission Report
        </h3>
      </div>

      {/* =========================================================================
          TOP FILTER CARD (Replicating reliable-erp.com/Clerk/CommissionReport.aspx)
         ========================================================================= */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border overflow-hidden">
        {/* Banner Header with our Blue Theme */}
        <div className="bg-[#0B5ED7] text-white px-5 py-2 text-[13.5px] font-semibold flex items-center shadow-xs">
          <span className="mr-1 text-base font-serif">&raquo;</span>Commission Report
        </div>

        <div className="p-5 sm:p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
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

            {/* Action Buttons: View (Blue Theme) & Export To Excel (Amber Theme) */}
            <div className="flex items-center gap-3 pt-2 sm:pt-0">
              <button
                type="submit"
                className="px-7 py-2 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center justify-center min-w-[80px]"
              >
                View
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="px-6 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center justify-center min-w-[130px]"
              >
                Export To Excel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Instant Filter Search Bar */}
      <div className="w-full max-w-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Policy No, Agent, Vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-full text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          MULTI-GROUP DATA GRID (Replicating all 4 screenshots with our Blue Theme)
         ========================================================================= */}
      <div className="w-full bg-white rounded-lg border border-brand-border shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full text-left border-collapse text-[11px] whitespace-nowrap">
            {/* Header Level 1: Primary Column Names & Group Super-Headers */}
            <thead>
              <tr className="bg-brand-primary text-white uppercase tracking-wider font-bold border-b border-blue-600 select-none">
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600 sticky left-0 z-20 bg-brand-primary">
                  DATE
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  REFERENCE TYPE
                </th>
                <th rowSpan={2} className="py-2.5 px-3.5 border-r border-blue-600 max-w-[200px]">
                  INSURANCE COMPANY
                </th>
                <th rowSpan={2} className="py-2.5 px-3.5 border-r border-blue-600 font-mono">
                  POLICY NO
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  SALES EXE
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  AGENT
                </th>
                <th rowSpan={2} className="py-2.5 px-2.5 border-r border-blue-600 text-center">
                  FRANCHISE
                </th>
                <th rowSpan={2} className="py-2.5 px-2.5 border-r border-blue-600 text-center">
                  FRANCHISE AGENT
                </th>
                <th rowSpan={2} className="py-2.5 px-2.5 border-r border-blue-600 text-center">
                  VEHICLE TYPE
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600 font-mono">
                  VEHICLE NO.
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600 text-right">
                  TP PREMIUM
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600 text-right">
                  OD PREMIUM
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600 text-right">
                  NET PREMIUM
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600 text-right">
                  PREMIUM AMT
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  PAYMENT TYPE
                </th>

                {/* Group 1: RELIABLE ASSOCIATES (11 sub-columns) */}
                <th colSpan={11} className="py-2 px-3 text-center border-r border-blue-800 bg-[#1D4ED8]">
                  RELIABLE ASSOCIATES
                </th>

                {/* Group 2: RELIABLE AGENT (11 sub-columns) */}
                <th colSpan={11} className="py-2 px-3 text-center border-r border-blue-800 bg-[#1E40AF]">
                  RELIABLE AGENT
                </th>

                {/* Group 3: FRANCHISE (11 sub-columns) */}
                <th colSpan={11} className="py-2 px-3 text-center border-r border-blue-800 bg-[#1D4ED8]">
                  FRANCHISE
                </th>

                {/* Group 4: FRANCHISE AGENT (11 sub-columns) */}
                <th colSpan={11} className="py-2 px-3 text-center border-r border-blue-800 bg-[#1E40AF]">
                  FRANCHISE AGENT
                </th>

                {/* Group 5: RELIABLE PROFIT (2 sub-columns) */}
                <th colSpan={2} className="py-2 px-3 text-center border-r border-blue-800 bg-[#166534]">
                  RELIABLE PROFIT
                </th>

                {/* Group 6: FRANCHISE PROFIT (2 sub-columns) */}
                <th colSpan={2} className="py-2 px-3 text-center border-r border-blue-800 bg-[#0F766E]">
                  FRANCHISE PROFIT
                </th>

                {/* Remaining Columns from Image 3 & 4 */}
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  POLICY TYPE
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  PRODUCT TYPE
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  MAKE
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  MODEL
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  RTO
                </th>
                <th rowSpan={2} className="py-2.5 px-2.5 border-r border-blue-600 text-center">
                  FUEL TYPE
                </th>
                <th rowSpan={2} className="py-2.5 px-2.5 border-r border-blue-600 text-center">
                  OD DISCOUNT
                </th>
                <th rowSpan={2} className="py-2.5 px-2.5 border-r border-blue-600 text-center">
                  MANUFACTURING YEAR
                </th>
                <th rowSpan={2} className="py-2.5 px-3 border-r border-blue-600">
                  TYPE OF INSURANCE POLICY
                </th>
                <th rowSpan={2} className="py-2.5 px-2.5 border-r border-blue-600 text-right">
                  NCB PREMIUM
                </th>
                <th rowSpan={2} className="py-2.5 px-2.5 text-center">
                  NCB(%)
                </th>
              </tr>

              {/* Header Level 2: Sub-columns for Groups */}
              <tr className="bg-[#1E40AF] text-white text-[10px] font-bold tracking-wider border-b border-blue-800 select-none">
                {/* RELIABLE ASSOCIATES Subheaders */}
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TP %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TP</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">OD %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">OD</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">NET %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">NET</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">MISP %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">MISP</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">GROSS</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TDS</th>
                <th className="py-1.5 px-2.5 text-right border-r border-blue-800 font-extrabold bg-[#1D4ED8]">NET PAID</th>

                {/* RELIABLE AGENT Subheaders */}
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TP %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TP</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">OD %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">OD</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">NET %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">NET</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">MISP %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">MISP</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">GROSS</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TDS</th>
                <th className="py-1.5 px-2.5 text-right border-r border-blue-800 font-extrabold bg-[#1E3A8A]">NET PAID</th>

                {/* FRANCHISE Subheaders */}
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TP %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TP</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">OD %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">OD</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">NET %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">NET</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">MISP %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">MISP</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">GROSS</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TDS</th>
                <th className="py-1.5 px-2.5 text-right border-r border-blue-800">NET PAID</th>

                {/* FRANCHISE AGENT Subheaders */}
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TP %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TP</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">OD %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">OD</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">NET %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">NET</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">MISP %</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">MISP</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">GROSS</th>
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60">TDS</th>
                <th className="py-1.5 px-2.5 text-right border-r border-blue-800">NET PAID</th>

                {/* RELIABLE PROFIT Subheaders */}
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60 bg-[#15803D]">TDS</th>
                <th className="py-1.5 px-2.5 text-right border-r border-blue-800 font-extrabold bg-[#166534]">NET</th>

                {/* FRANCHISE PROFIT Subheaders */}
                <th className="py-1.5 px-2 text-right border-r border-blue-800/60 bg-[#0F766E]">TDS</th>
                <th className="py-1.5 px-2.5 text-right border-r border-blue-800 bg-[#115E59]">NET</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {filteredRecords.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`hover:bg-blue-50/60 transition-colors ${
                    idx % 2 === 1 ? 'bg-slate-50/50' : 'bg-white'
                  }`}
                >
                  <td className="py-2.5 px-3 border-r border-slate-200 font-medium sticky left-0 z-10 bg-inherit">
                    {row.date}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-bold text-slate-700">
                    {row.referenceType}
                  </td>
                  <td className="py-2.5 px-3.5 border-r border-slate-200 font-semibold text-slate-900 max-w-[220px] truncate" title={row.insuranceCompany}>
                    {row.insuranceCompany}
                  </td>
                  <td className="py-2.5 px-3.5 border-r border-slate-200 font-mono font-semibold text-brand-primary">
                    {row.policyNo}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-medium text-slate-800">
                    {row.salesExecutive}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-900">
                    {row.agent}
                  </td>
                  <td className="py-2.5 px-2.5 border-r border-slate-200 text-center text-slate-400">
                    {row.franchise}
                  </td>
                  <td className="py-2.5 px-2.5 border-r border-slate-200 text-center text-slate-400">
                    {row.franchiseAgent}
                  </td>
                  <td className="py-2.5 px-2.5 border-r border-slate-200 text-center font-bold text-indigo-700">
                    {row.vehicleType}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-mono font-bold text-slate-900">
                    {row.vehicleNo}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-right font-medium">
                    {formatNum(row.tpPremium)}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-right font-medium">
                    {formatNum(row.odPremium)}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-right font-bold text-slate-900">
                    {formatNum(row.netPremium)}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-right font-bold text-slate-900">
                    {row.premiumAmt.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-[10.5px] font-medium text-slate-700">
                    {row.paymentType}
                  </td>

                  {/* RELIABLE ASSOCIATES Data */}
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{row.raTpPercent}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{row.raTp}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right font-semibold text-blue-700">{row.raOdPercent}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{formatNum(row.raOd)}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right font-semibold text-blue-700">{row.raNetPercent}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{formatNum(row.raNet)}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{row.raMispPercent}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{row.raMisp}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right font-bold text-slate-800">{formatNum(row.raGross)}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-rose-600">{row.raTds}</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-300 text-right font-bold text-brand-primary bg-blue-50/40">
                    {formatNum(row.raNetPaid)}
                  </td>

                  {/* RELIABLE AGENT Data */}
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{row.agentTpPercent}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{row.agentTp}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right font-semibold text-indigo-700">{row.agentOdPercent}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{formatNum(row.agentOd)}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right font-semibold text-indigo-700">{row.agentNetPercent}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{formatNum(row.agentNet)}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{row.agentMispPercent}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right">{row.agentMisp}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right font-bold text-slate-800">{formatNum(row.agentGross)}</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-rose-600">{row.agentTds}</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-300 text-right font-bold text-indigo-700 bg-indigo-50/30">
                    {formatNum(row.agentNetPaid)}
                  </td>

                  {/* FRANCHISE Data */}
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-300 text-right text-slate-400">0</td>

                  {/* FRANCHISE AGENT Data */}
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-300 text-right text-slate-400">0</td>

                  {/* RELIABLE PROFIT Data */}
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right font-medium text-slate-700 bg-emerald-50/20">
                    {row.reliableProfitTds}
                  </td>
                  <td className="py-2.5 px-2.5 border-r border-slate-300 text-right font-extrabold text-emerald-700 bg-emerald-50/50">
                    {formatNum(row.reliableProfitNet)}
                  </td>

                  {/* FRANCHISE PROFIT Data */}
                  <td className="py-2.5 px-2 border-r border-slate-200 text-right text-slate-400">0</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-300 text-right text-slate-400">0</td>

                  {/* Vehicle & Policy Details */}
                  <td className="py-2.5 px-3 border-r border-slate-200 font-medium">{row.policyType}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-semibold text-slate-800">{row.productType}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-bold">{row.make}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 font-semibold">{row.model}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-slate-700">{row.rto}</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-200 text-center font-medium">{row.fuelType}</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-200 text-center">{row.odDiscount}</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-200 text-center font-bold">{row.manufacturingYear}</td>
                  <td className="py-2.5 px-3 border-r border-slate-200 text-slate-700">{row.typeOfInsurancePolicy}</td>
                  <td className="py-2.5 px-2.5 border-r border-slate-200 text-right">{row.ncbPremium}</td>
                  <td className="py-2.5 px-2.5 text-center font-bold">{row.ncbPercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Summary Bar */}
        <div className="bg-slate-50 border-t border-brand-border px-4 py-3 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-700">
          <div>
            Showing <strong className="text-slate-900">{filteredRecords.length}</strong> policies in Commission & Profit report
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div>
              Total Net Premium:{' '}
              <strong className="text-slate-900 font-bold">₹{formatNum(totalNetPremium)}</strong>
            </div>
            <div>
              Total Premium Amt:{' '}
              <strong className="text-slate-900 font-bold">₹{formatNum(totalPremiumAmt)}</strong>
            </div>
            <div>
              Total RA Payout:{' '}
              <strong className="text-brand-primary font-bold">₹{formatNum(totalRaNetPaid)}</strong>
            </div>
            <div>
              Total Agent Payout:{' '}
              <strong className="text-indigo-700 font-bold">₹{formatNum(totalAgentNetPaid)}</strong>
            </div>
            <div className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-lg border border-emerald-200 font-bold">
              Total Reliable Net Profit: ₹{formatNum(totalReliableProfitNet)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitReportTab;
