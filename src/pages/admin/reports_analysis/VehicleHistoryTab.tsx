import React, { useState, useMemo } from 'react';
import { Search, Download, X, Eye, Car } from 'lucide-react';

export interface VehicleHistoryRecord {
  id: number;
  regNo: string;
  makeModel: string;
  mfgYear: number;
  chassisNo: string;
  engineNo: string;
  policyYear: string;
  policyNo: string;
  insurer: string;
  premium: number;
  claimFiled: string;
  ncb: number;
  status: string;
}

export const VehicleHistoryTab: React.FC = () => {
  const [financialYear, setFinancialYear] = useState('2026-2027');
  const [registrationNo, setRegistrationNo] = useState('');
  const [policyNo, setPolicyNo] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    financialYear: '2026-2027',
    registrationNo: '',
    policyNo: '',
  });

  const [records] = useState<VehicleHistoryRecord[]>([
    {
      id: 1,
      regNo: 'MH-12-PQ-4567',
      makeModel: 'Maruti Suzuki Swift VXI',
      mfgYear: 2022,
      chassisNo: 'MA3EWB32S00192834',
      engineNo: 'K12MN8921045',
      policyYear: '2026-2027',
      policyNo: 'POL-MOT-2026-8812',
      insurer: 'Bajaj Allianz Gen Ins',
      premium: 14850,
      claimFiled: 'No',
      ncb: 35,
      status: 'Active Policy',
    },
    {
      id: 2,
      regNo: 'MH-42-BA-9921',
      makeModel: 'Hyundai Creta 1.5 SX',
      mfgYear: 2023,
      chassisNo: 'MALC381CL00829142',
      engineNo: 'G4FLM7728190',
      policyYear: '2026-2027',
      policyNo: 'POL-MOT-2026-9914',
      insurer: 'Tata AIG Gen Ins',
      premium: 28400,
      claimFiled: 'Yes',
      ncb: 0,
      status: 'Active Policy',
    },
    {
      id: 3,
      regNo: 'MH-14-GH-1204',
      makeModel: 'Tata Ace Gold Petrol',
      mfgYear: 2021,
      chassisNo: 'MAT612019N0048192',
      engineNo: '275MPT091823',
      policyYear: '2025-2026',
      policyNo: 'POL-MOT-2025-3310',
      insurer: 'ICICI Lombard Gen Ins',
      premium: 21600,
      claimFiled: 'No',
      ncb: 25,
      status: 'Expired',
    },
    {
      id: 4,
      regNo: 'MH-11-AX-7788',
      makeModel: 'Mahindra Bolero Pickup Extra Long',
      mfgYear: 2020,
      chassisNo: 'MA1TA2WJ00591823',
      engineNo: 'MDI3200TC88192',
      policyYear: '2026-2027',
      policyNo: 'POL-MOT-2026-1102',
      insurer: 'HDFC ERGO Gen Ins',
      premium: 34200,
      claimFiled: 'No',
      ncb: 45,
      status: 'Active Policy',
    },
    {
      id: 5,
      regNo: 'MH-09-EF-3344',
      makeModel: 'Honda Activa 6G Deluxe',
      mfgYear: 2024,
      chassisNo: 'ME4JF9124P0081924',
      engineNo: 'JF91EP771928',
      policyYear: '2026-2027',
      policyNo: 'POL-MOT-2026-4401',
      insurer: 'Go Digit Gen Ins',
      premium: 3850,
      claimFiled: 'No',
      ncb: 20,
      status: 'Renewed',
    },
  ]);

  const handleView = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      financialYear,
      registrationNo,
      policyNo,
    });
  };

  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      if (appliedFilters.registrationNo.trim()) {
        const reg = appliedFilters.registrationNo.toLowerCase().replace(/[^a-z0-9]/g, '');
        const target = r.regNo.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (!target.includes(reg)) return false;
      }
      if (appliedFilters.policyNo.trim()) {
        if (!r.policyNo.toLowerCase().includes(appliedFilters.policyNo.toLowerCase())) return false;
      }
      return true;
    });
  }, [records, appliedFilters]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExport = () => {
    const headers = [
      'REGISTRATION NO',
      'MAKE & MODEL',
      'MFG YEAR',
      'CHASSIS NO',
      'ENGINE NO',
      'POLICY YEAR',
      'POLICY NO',
      'INSURER',
      'PREMIUM',
      'CLAIM',
      'NCB',
      'STATUS',
    ];
    const rows = filteredRecords.map((r) => [
      `"${r.regNo}"`,
      `"${r.makeModel}"`,
      r.mfgYear,
      `"${r.chassisNo}"`,
      `"${r.engineNo}"`,
      `"${r.policyYear}"`,
      `"${r.policyNo}"`,
      `"${r.insurer}"`,
      r.premium,
      `"${r.claimFiled}"`,
      `${r.ncb}%`,
      `"${r.status}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Vehicle_History_${appliedFilters.financialYear}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tableSearch, setTableSearch] = useState('');

  const displayRecords = useMemo(() => {
    if (!tableSearch.trim()) return filteredRecords;
    const q = tableSearch.toLowerCase();
    return filteredRecords.filter(
      (r) =>
        r.regNo.toLowerCase().includes(q) ||
        r.makeModel.toLowerCase().includes(q) ||
        r.policyNo.toLowerCase().includes(q) ||
        r.insurer.toLowerCase().includes(q)
    );
  }, [filteredRecords, tableSearch]);

  const totalPages = Math.max(1, Math.ceil(displayRecords.length / itemsPerPage));
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return displayRecords.slice(start, start + itemsPerPage);
  }, [displayRecords, currentPage, itemsPerPage]);

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card */}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden">

        <div className="p-4 sm:p-5">
          <form onSubmit={handleView} className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Financial Year */}
            <div className="flex items-center gap-2.5">
              <label className="text-[13px] text-slate-700 font-semibold whitespace-nowrap">
                Financial Year
              </label>
              <select
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                className="px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer min-w-[140px]"
              >
                <option value="2026-2027">2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            {/* Registration No */}
            <div className="flex items-center gap-2.5">
              <label className="text-[13px] text-slate-700 font-semibold whitespace-nowrap">
                Registration No.
              </label>
              <input
                type="text"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                placeholder="e.g. MH-12"
                className="w-40 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all uppercase font-mono"
              >
              </input>
            </div>

            {/* Policy No */}
            <div className="flex items-center gap-2.5">
              <label className="text-[13px] text-slate-700 font-semibold whitespace-nowrap">
                Policy No.
              </label>
              <input
                type="text"
                value={policyNo}
                onChange={(e) => setPolicyNo(e.target.value)}
                placeholder="e.g. POL-MOT"
                className="w-44 px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all font-mono"
              >
              </input>
            </div>

            {/* View Button */}
            <button
              type="submit"
              className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer border-none h-[38px] flex items-center justify-center gap-2"
            >
              <Eye size={15} />
              <span>View</span>
            </button>
          </form>
        </div>
      </div>

      {/* Table Container Card (Exact VehicleMaster Styling) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-[350px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search Vehicle History..."
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
            />
          </div>

          <button
            onClick={handleExport}
            className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer h-[40px] flex items-center justify-center gap-2 shadow-xs"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-3 px-4 text-center w-16">SR. NO.</th>
                <th className="py-3 px-4 font-mono">REGISTRATION NO</th>
                <th className="py-3 px-4">MAKE & MODEL</th>
                <th className="py-3 px-4 text-center">MFG YEAR</th>
                <th className="py-3 px-4 font-mono">CHASSIS NO</th>
                <th className="py-3 px-4">POLICY YEAR</th>
                <th className="py-3 px-4 font-mono">POLICY NO</th>
                <th className="py-3 px-4">INSURER</th>
                <th className="py-3 px-4 text-right">PREMIUM</th>
                <th className="py-3 px-4 text-center">CLAIM</th>
                <th className="py-3 px-4 text-center">NCB %</th>
                <th className="py-3 px-4 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px]">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={12} className="py-12 text-center text-slate-400 font-medium">
                    No vehicle records found
                  </td>
                </tr>
              ) : (
                paginatedRecords.map((r, idx) => (
                  <tr
                    key={r.id}
                    className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white"
                  >
                    <td className="py-2.5 px-4 font-medium text-brand-primary text-center">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-900">
                      {r.regNo}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800">
                      {r.makeModel}
                    </td>
                    <td className="py-2.5 px-4 text-center text-slate-600">
                      {r.mfgYear}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-slate-500">
                      {r.chassisNo}
                    </td>
                    <td className="py-2.5 px-4 text-slate-600">
                      {r.policyYear}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-semibold text-brand-primary">
                      {r.policyNo}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700">
                      {r.insurer}
                    </td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">
                      {formatCurrency(r.premium)}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        r.claimFiled === 'Yes'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {r.claimFiled}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-center font-bold text-slate-700">
                      {r.ncb}%
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        r.status.includes('Active')
                          ? 'bg-blue-50 text-brand-primary border border-blue-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Exact VehicleMaster Styling) */}
        <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#64748b]">
          <div className="flex items-center gap-2">
            <span>Records per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-white border border-slate-300 rounded px-2 py-1 text-sm text-brand-navy focus:outline-none focus:border-brand-primary cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div>
            Showing {displayRecords.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} -{' '}
            {Math.min(currentPage * itemsPerPage, displayRecords.length)} of {displayRecords.length} records
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded flex items-center justify-center font-medium transition-colors cursor-pointer ${
                  currentPage === i + 1
                    ? 'bg-brand-primary text-white'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleHistoryTab;
