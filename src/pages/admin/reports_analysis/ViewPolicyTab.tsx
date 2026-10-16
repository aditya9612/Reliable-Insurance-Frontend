import React, { useState, useMemo } from 'react';
import { Search, Download, X, RefreshCw, Eye, FileText } from 'lucide-react';

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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState<PolicyTransactionRecord | null>(null);

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

  // Paginated records
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage, itemsPerPage]);

  return (
    <div className="space-y-6 w-full font-sans">
      {/* =========================================================================
          TOP FILTER CARD (VehicleMaster Theme)
         ========================================================================= */}
      <div className="bg-white rounded-[12px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border">
        <form onSubmit={handleShow} className="space-y-6">
          {/* Row of 4 Clean Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Customer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Customer Name
              </label>
              <input
                type="text"
                value={filterCustomerName}
                onChange={(e) => setFilterCustomerName(e.target.value)}
                placeholder="Enter Customer Name"
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>

            {/* 2. Vehicle No. */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Vehicle No.
              </label>
              <input
                type="text"
                value={filterVehicleNo}
                onChange={(e) => setFilterVehicleNo(e.target.value)}
                placeholder="e.g. MH-12-PQ-4567"
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all uppercase"
              />
            </div>

            {/* 3. Policy No. */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Policy No.
              </label>
              <input
                type="text"
                value={filterPolicyNo}
                onChange={(e) => setFilterPolicyNo(e.target.value)}
                placeholder="e.g. POL-MOT-2026-8812"
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all uppercase"
              />
            </div>

            {/* 4. Customer Cheque No. */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Customer Cheque No.
              </label>
              <input
                type="text"
                value={filterChequeNo}
                onChange={(e) => setFilterChequeNo(e.target.value)}
                placeholder="e.g. CHQ-882190"
                className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all uppercase"
              />
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer border-none active:scale-[0.98] flex items-center gap-1.5"
            >
              <Search size={15} />
              <span>Show</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer border-none active:scale-[0.98] flex items-center gap-1.5"
            >
              <Download size={15} />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-sm font-semibold transition-all cursor-pointer border-none"
              title="Reset Filters"
            >
              <RefreshCw size={14} />
            </button>
          </div>
        </form>
      </div>

      {/* =========================================================================
          POLICY RESULTS TABLE CARD (VehicleMaster Theme)
         ========================================================================= */}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden flex flex-col w-full">
        {/* Table Search & Title Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quick search input */}
          <div className="relative w-full sm:w-[350px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Customer Name Here..."
              value={instantSearchName}
              onChange={(e) => {
                setInstantSearchName(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-brand-primary/10 text-brand-primary px-2.5 py-1 rounded-full font-semibold">
              {filteredRecords.length} Records
            </span>
          </div>
        </div>

        {/* Scrollable Table Area */}
        <div className="overflow-x-auto w-full min-w-0">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-3 px-4 text-center w-14">SR. NO.</th>
                <th className="py-3 px-4">POLICY NO</th>
                <th className="py-3 px-4">CUSTOMER NAME</th>
                <th className="py-3 px-4">VEHICLE NO</th>
                <th className="py-3 px-4">MAKE & MODEL</th>
                <th className="py-3 px-4">INSURER</th>
                <th className="py-3 px-4">PRODUCT</th>
                <th className="py-3 px-4">CHEQUE NO</th>
                <th className="py-3 px-4 text-right">GROSS PREM (₹)</th>
                <th className="py-3 px-4 text-right">NET PREM (₹)</th>
                <th className="py-3 px-4">BRANCH</th>
                <th className="py-3 px-4 text-center">STATUS</th>
                <th className="py-3 px-4 text-center w-20">ACTION</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-brand-border text-[13px]">
              {paginatedRecords.length > 0 ? (
                paginatedRecords.map((row, index) => (
                  <tr
                    key={row.id}
                    className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white"
                  >
                    <td className="py-2.5 px-4 text-center font-medium text-brand-primary">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>

                    <td className="py-2.5 px-4 font-mono font-bold text-brand-primary whitespace-nowrap">
                      {row.policyNo}
                    </td>

                    <td className="py-2.5 px-4">
                      <div className="font-semibold text-brand-navy">{row.customerName}</div>
                      <div className="text-[11px] text-slate-500">{row.mobile}</div>
                    </td>

                    <td className="py-2.5 px-4 font-mono font-semibold text-slate-800 whitespace-nowrap">
                      {row.regNo}
                    </td>

                    <td className="py-2.5 px-4 text-slate-700 whitespace-nowrap">
                      {row.makeModel}
                    </td>

                    <td className="py-2.5 px-4 text-slate-800 font-medium">
                      {row.insurer}
                    </td>

                    <td className="py-2.5 px-4 text-slate-600">
                      {row.product}
                    </td>

                    <td className="py-2.5 px-4 font-mono text-xs text-slate-700 whitespace-nowrap">
                      {row.chequeNo}
                    </td>

                    <td className="py-2.5 px-4 text-right font-medium text-slate-700 font-mono whitespace-nowrap">
                      ₹{row.grossPremium.toLocaleString('en-IN')}
                    </td>

                    <td className="py-2.5 px-4 text-right font-medium text-slate-700 font-mono whitespace-nowrap">
                      ₹{row.netPremium.toLocaleString('en-IN')}
                    </td>

                    <td className="py-2.5 px-4 text-slate-700 whitespace-nowrap">
                      {row.branch}
                    </td>

                    <td className="py-2.5 px-4 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                        row.status === 'Active Policy'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : row.status === 'Expired'
                          ? 'bg-slate-100 text-slate-600 border-slate-300'
                          : 'bg-rose-50 text-rose-700 border-rose-300'
                      }`}>
                        {row.status}
                      </span>
                    </td>

                    <td className="py-2.5 px-4 text-center">
                      <button
                        onClick={() => setSelectedRecord(row)}
                        className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                        title="View Policy Details"
                      >
                        <Eye size={16} strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={13} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-semibold">No Policy Records Found</p>
                    <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search keywords</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Standard Footer Pagination Bar matching VehicleMaster */}
        <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
            <span>Records per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-brand-border rounded px-2 py-1 text-sm bg-white text-brand-navy focus:outline-none focus:border-brand-primary"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="text-sm text-brand-muted font-medium">
            Showing {filteredRecords.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm font-medium border border-brand-border ${
                currentPage === 1
                  ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'text-brand-navy hover:bg-brand-mainbg cursor-pointer'
              }`}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded text-sm font-medium ${
                  currentPage === page
                    ? 'bg-brand-primary text-white'
                    : 'text-brand-navy hover:bg-brand-mainbg border border-brand-border'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded text-sm font-medium border border-brand-border ${
                currentPage === totalPages || totalPages === 0
                  ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                  : 'text-brand-navy hover:bg-brand-mainbg cursor-pointer'
              }`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Policy Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
            <div className="bg-brand-navy text-white px-5 py-3.5 flex items-center justify-between">
              <span className="font-bold text-sm tracking-wide">
                Policy Document - {selectedRecord.policyNo}
              </span>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-white hover:text-rose-200 cursor-pointer border-none bg-transparent"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Customer Name</span>
                  <span className="font-bold text-slate-900">{selectedRecord.customerName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Vehicle Reg No</span>
                  <span className="font-mono font-bold text-brand-primary">{selectedRecord.regNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Insurer</span>
                  <span className="font-semibold text-slate-800">{selectedRecord.insurer}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Gross Premium</span>
                  <span className="font-bold text-emerald-700">₹{selectedRecord.grossPremium.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-semibold text-xs cursor-pointer border-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewPolicyTab;
