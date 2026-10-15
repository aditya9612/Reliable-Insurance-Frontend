import React, { useState, useMemo } from 'react';
import { Search, Download, X, RefreshCw } from 'lucide-react';

export interface PolicyTransactionRecord {
  id: number;
  policyNo: string;
  customerName: string;
  mobile: string;
  regNo: string;
  makeModel: string;
  chequeNo: string;
  chequeDate: string;
  bankName: string;
  insurer: string;
  product: string;
  issueDate: string;
  riskStartDate: string;
  riskEndDate: string;
  grossPremium: number;
  netPremium: number;
  branch: string;
  agentName: string;
  agentCode: string;
  status: 'Active Policy' | 'Expired' | 'Cancelled' | 'Pending Review';
  docType: string;
}

export const ViewPolicyTab: React.FC = () => {
  // 4 Top Form Filter Inputs (matching reliable-erp.com/Clerk/adm_AllTransactionExportNew.aspx)
  const [filterCustomerName, setFilterCustomerName] = useState('');
  const [filterVehicleNo, setFilterVehicleNo] = useState('');
  const [filterPolicyNo, setFilterPolicyNo] = useState('');
  const [filterChequeNo, setFilterChequeNo] = useState('');

  // Applied filters triggered by clicking "Show"
  const [appliedFilters, setAppliedFilters] = useState({
    customerName: '',
    vehicleNo: '',
    policyNo: '',
    chequeNo: ''
  });

  // Secondary Instant Search Field below card ("Search Customer Name Here")
  const [instantSearchName, setInstantSearchName] = useState('');

  // Mock comprehensive dataset
  const initialPolicies: PolicyTransactionRecord[] = [
    {
      id: 1,
      policyNo: 'POL-MOT-2026-8812',
      customerName: 'Rahul Tukaram Deshmukh',
      mobile: '9822019284',
      regNo: 'MH-12-PQ-4567',
      makeModel: 'Maruti Suzuki Swift VXI',
      chequeNo: 'CHQ-882190',
      chequeDate: '2026-10-01',
      bankName: 'HDFC Bank Ltd',
      insurer: 'Bajaj Allianz Gen Ins',
      product: 'Motor Private Car Package',
      issueDate: '2026-10-01',
      riskStartDate: '2026-10-02',
      riskEndDate: '2027-10-01',
      grossPremium: 14850,
      netPremium: 12580,
      branch: 'BARAMATI HEAD OFFICE',
      agentName: 'Amit Deshmukh',
      agentCode: 'AG-102',
      status: 'Active Policy',
      docType: 'E-Policy Schedule'
    },
    {
      id: 2,
      policyNo: 'POL-MOT-2026-9914',
      customerName: 'Rajendra Anantrao Pawar',
      mobile: '9423088192',
      regNo: 'MH-42-BA-9921',
      makeModel: 'Hyundai Creta 1.5 SX',
      chequeNo: 'CHQ-440192',
      chequeDate: '2026-10-04',
      bankName: 'State Bank of India',
      insurer: 'Tata AIG Gen Ins',
      product: 'Private Car Comprehensive',
      issueDate: '2026-10-04',
      riskStartDate: '2026-10-05',
      riskEndDate: '2027-10-04',
      grossPremium: 28400,
      netPremium: 24060,
      branch: 'PUNE',
      agentName: 'Sneha Kulkarni',
      agentCode: 'AG-204',
      status: 'Active Policy',
      docType: 'E-Policy Schedule'
    },
    {
      id: 3,
      policyNo: 'POL-MOT-2026-7712',
      customerName: 'Siddheshwar Namdeo Shinde',
      mobile: '9763190284',
      regNo: 'MH-11-AX-7788',
      makeModel: 'Mahindra Bolero Pickup Ext Long',
      chequeNo: 'CHQ-110293',
      chequeDate: '2026-10-06',
      bankName: 'Bank of Maharashtra',
      insurer: 'HDFC ERGO General',
      product: 'Commercial Goods Vehicle',
      issueDate: '2026-10-06',
      riskStartDate: '2026-10-07',
      riskEndDate: '2027-10-06',
      grossPremium: 38500,
      netPremium: 32620,
      branch: 'BARAMATI HEAD OFFICE',
      agentName: 'Arvind Gawade',
      agentCode: 'AG-108',
      status: 'Active Policy',
      docType: 'E-Policy Schedule'
    },
    {
      id: 4,
      policyNo: 'POL-MOT-2026-4401',
      customerName: 'Vijay Vasant Thorat',
      mobile: '9820391823',
      regNo: 'MH-09-EF-3344',
      makeModel: 'Honda Activa 6G Deluxe',
      chequeNo: 'CHQ-339102',
      chequeDate: '2026-10-08',
      bankName: 'ICICI Bank Ltd',
      insurer: 'Go Digit Gen Ins',
      product: 'Two Wheeler 1yr OD + 5yr TP',
      issueDate: '2026-10-08',
      riskStartDate: '2026-10-08',
      riskEndDate: '2027-10-07',
      grossPremium: 3850,
      netPremium: 3260,
      branch: 'SOLAPUR',
      agentName: 'Rahul Sharma',
      agentCode: 'AG-305',
      status: 'Active Policy',
      docType: 'E-Policy Schedule'
    },
    {
      id: 5,
      policyNo: 'POL-MOT-2025-3310',
      customerName: 'Kunal Ashok Jadhav',
      mobile: '9881029145',
      regNo: 'MH-14-GH-1204',
      makeModel: 'Tata Ace Gold Petrol',
      chequeNo: 'CHQ-991028',
      chequeDate: '2025-09-15',
      bankName: 'Axis Bank Ltd',
      insurer: 'ICICI Lombard Gen Ins',
      product: 'Commercial Vehicle Package',
      issueDate: '2025-09-15',
      riskStartDate: '2025-09-16',
      riskEndDate: '2026-09-15',
      grossPremium: 21600,
      netPremium: 18300,
      branch: 'MUMBAI',
      agentName: 'Priya Verma',
      agentCode: 'AG-412',
      status: 'Expired',
      docType: 'E-Policy Schedule'
    },
    {
      id: 6,
      policyNo: 'POL-CAN-4019',
      customerName: 'Hanumant Ramchandra Pawar',
      mobile: '9921049281',
      regNo: 'MH-12-KL-8822',
      makeModel: 'Maruti Suzuki Dzire VXI',
      chequeNo: 'CHQ-665120',
      chequeDate: '2026-09-28',
      bankName: 'Canara Bank',
      insurer: 'Bajaj Allianz Gen Ins',
      product: 'Motor Private Car Package',
      issueDate: '2026-09-28',
      riskStartDate: '2026-09-29',
      riskEndDate: '2027-09-28',
      grossPremium: 28500,
      netPremium: 24150,
      branch: 'BARAMATI HEAD OFFICE',
      agentName: 'Amit Deshmukh',
      agentCode: 'AG-102',
      status: 'Cancelled',
      docType: 'Cancellation Notice'
    },
    {
      id: 7,
      policyNo: 'POL-MOT-2026-1194',
      customerName: 'Pooja Sanjay Patil',
      mobile: '9765102938',
      regNo: 'MH-20-DJ-5511',
      makeModel: 'Kia Seltos HTX Diesel',
      chequeNo: 'CHQ-772183',
      chequeDate: '2026-10-10',
      bankName: 'HDFC Bank Ltd',
      insurer: 'Tata AIG Gen Ins',
      product: 'Private Car Comprehensive',
      issueDate: '2026-10-10',
      riskStartDate: '2026-10-11',
      riskEndDate: '2027-10-10',
      grossPremium: 32100,
      netPremium: 27200,
      branch: 'Chhatrapati Sambhajinagar',
      agentName: 'Mohammad Sadik Shami',
      agentCode: 'AG-111',
      status: 'Active Policy',
      docType: 'E-Policy Schedule'
    },
    {
      id: 8,
      policyNo: 'POL-MOT-2026-5521',
      customerName: 'Sandip Dattatray Shinde',
      mobile: '9882193847',
      regNo: 'MH-12-RS-3388',
      makeModel: 'Mahindra Scorpio-N Z8L',
      chequeNo: 'CHQ-331049',
      chequeDate: '2026-10-11',
      bankName: 'State Bank of India',
      insurer: 'ICICI Lombard Gen Ins',
      product: 'Private Car Comprehensive',
      issueDate: '2026-10-11',
      riskStartDate: '2026-10-12',
      riskEndDate: '2027-10-11',
      grossPremium: 41500,
      netPremium: 35170,
      branch: 'PUNE',
      agentName: 'Sneha Kulkarni',
      agentCode: 'AG-204',
      status: 'Active Policy',
      docType: 'E-Policy Schedule'
    }
  ];

  // Handle "Show" button click
  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      customerName: filterCustomerName,
      vehicleNo: filterVehicleNo,
      policyNo: filterPolicyNo,
      chequeNo: filterChequeNo
    });
  };

  // Reset filters
  const handleReset = () => {
    setFilterCustomerName('');
    setFilterVehicleNo('');
    setFilterPolicyNo('');
    setFilterChequeNo('');
    setAppliedFilters({
      customerName: '',
      vehicleNo: '',
      policyNo: '',
      chequeNo: ''
    });
    setInstantSearchName('');
  };

  // Filter records based on applied form filters and instant search
  const filteredRecords = useMemo(() => {
    return initialPolicies.filter(record => {
      // Form filters
      if (appliedFilters.customerName && !record.customerName.toLowerCase().includes(appliedFilters.customerName.toLowerCase())) {
        return false;
      }
      if (appliedFilters.vehicleNo && !record.regNo.replace(/[^a-zA-Z0-9]/g, '').toLowerCase().includes(appliedFilters.vehicleNo.replace(/[^a-zA-Z0-9]/g, '').toLowerCase())) {
        return false;
      }
      if (appliedFilters.policyNo && !record.policyNo.toLowerCase().includes(appliedFilters.policyNo.toLowerCase())) {
        return false;
      }
      if (appliedFilters.chequeNo && !record.chequeNo.toLowerCase().includes(appliedFilters.chequeNo.toLowerCase())) {
        return false;
      }

      // Secondary Instant Customer Name Search below card
      if (instantSearchName.trim() !== '' && !record.customerName.toLowerCase().includes(instantSearchName.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [appliedFilters, instantSearchName]);

  // Export to CSV
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No policy records available to export.');
      return;
    }

    const headers = [
      'SR NO',
      'POLICY NO',
      'CUSTOMER NAME',
      'MOBILE NO',
      'VEHICLE NO',
      'MAKE & MODEL',
      'CHEQUE NO',
      'CHEQUE DATE',
      'BANK NAME',
      'INSURER',
      'PRODUCT',
      'ISSUE DATE',
      'RISK START',
      'RISK END',
      'GROSS PREMIUM',
      'NET PREMIUM',
      'BRANCH',
      'AGENT NAME',
      'STATUS'
    ];

    const rows = filteredRecords.map((r, index) => [
      index + 1,
      `"${r.policyNo}"`,
      `"${r.customerName}"`,
      `"${r.mobile}"`,
      `"${r.regNo}"`,
      `"${r.makeModel}"`,
      `"${r.chequeNo}"`,
      `"${r.chequeDate}"`,
      `"${r.bankName}"`,
      `"${r.insurer}"`,
      `"${r.product}"`,
      `"${r.issueDate}"`,
      `"${r.riskStartDate}"`,
      `"${r.riskEndDate}"`,
      r.grossPremium,
      r.netPremium,
      `"${r.branch}"`,
      `"${r.agentName}"`,
      `"${r.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ViewPolicy_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 w-full font-sans">
      {/* =========================================================================
          TOP FILTER CARD (Replicating reliable-erp.com/Clerk/adm_AllTransactionExportNew.aspx)
         ========================================================================= */}
      <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
        {/* Blue Banner Header */}
        <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
          <span className="mr-0.5 text-base font-serif">&raquo;</span>View Policy Documents
        </div>

        <form onSubmit={handleShow} className="space-y-6">
          {/* Row of 4 Pill Inputs matching legacy screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Customer Name */}
            <div>
              <label className="block text-[13px] text-slate-700 font-semibold mb-1.5">
                Customer Name
              </label>
              <input
                type="text"
                value={filterCustomerName}
                onChange={(e) => setFilterCustomerName(e.target.value)}
                placeholder=""
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
              />
            </div>

            {/* 2. Vehicle No. */}
            <div>
              <label className="block text-[13px] text-slate-700 font-semibold mb-1.5">
                Vehicle No.
              </label>
              <input
                type="text"
                value={filterVehicleNo}
                onChange={(e) => setFilterVehicleNo(e.target.value)}
                placeholder=""
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner uppercase"
              />
            </div>

            {/* 3. Policy No. */}
            <div>
              <label className="block text-[13px] text-slate-700 font-semibold mb-1.5">
                Policy No.
              </label>
              <input
                type="text"
                value={filterPolicyNo}
                onChange={(e) => setFilterPolicyNo(e.target.value)}
                placeholder=""
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner uppercase"
              />
            </div>

            {/* 4. Customer Cheque No. */}
            <div>
              <label className="block text-[13px] text-slate-700 font-semibold mb-1.5">
                Customer Cheque No.
              </label>
              <input
                type="text"
                value={filterChequeNo}
                onChange={(e) => setFilterChequeNo(e.target.value)}
                placeholder=""
                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner uppercase"
              />
            </div>
          </div>

          {/* Action Buttons Row: Show (Blue) & Export (Amber/Orange) */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-8 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-md text-[13px] font-semibold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center gap-1.5"
            >
              <Search size={15} />
              <span>Show</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="px-8 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-semibold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center gap-1.5"
            >
              <Download size={15} />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-[13px] font-semibold transition-all cursor-pointer border-none"
              title="Reset Filters"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* =========================================================================
          SECONDARY INSTANT SEARCH FIELD (Directly below card in screenshot)
         ========================================================================= */}
      <div className="w-full max-w-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Customer Name Here"
            value={instantSearchName}
            onChange={(e) => {
              setInstantSearchName(e.target.value);
            }}
            className="w-full px-5 py-2.5 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
          />
          {instantSearchName && (
            <button
              onClick={() => setInstantSearchName('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPolicyTab;
