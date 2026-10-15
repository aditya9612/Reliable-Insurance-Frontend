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

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="bg-[#0B5ED7] text-white px-5 py-2.5 text-[13.5px] font-semibold flex items-center shadow-xs">
          <span className="mr-1 text-base font-serif">&raquo;</span>Vehicle History
        </div>

        <div className="p-5 sm:p-6">
          <form onSubmit={handleView} className="flex flex-wrap items-center gap-5 sm:gap-8">
            {/* Financial Year */}
            <div className="flex items-center gap-3">
              <label className="text-[13px] text-slate-800 font-bold whitespace-nowrap">
                Financial Year
              </label>
              <div className="relative">
                <select
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value)}
                  className="px-4 py-1.5 bg-white border border-slate-300 rounded-full text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner appearance-none pr-8 cursor-pointer min-w-[140px]"
                >
                  <option value="2026-2027">2026-2027</option>
                  <option value="2025-2026">2025-2026</option>
                  <option value="2024-2025">2024-2025</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Registration No */}
            <div className="flex items-center gap-3">
              <label className="text-[13px] text-slate-800 font-bold whitespace-nowrap">
                Registration No.
              </label>
              <input
                type="text"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                placeholder=""
                className="w-40 px-3.5 py-1.5 bg-white border border-slate-300 rounded-[10px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner uppercase font-mono"
              />
            </div>

            {/* Policy No */}
            <div className="flex items-center gap-3">
              <label className="text-[13px] text-slate-800 font-bold whitespace-nowrap">
                Policy No.
              </label>
              <input
                type="text"
                value={policyNo}
                onChange={(e) => setPolicyNo(e.target.value)}
                placeholder=""
                className="w-44 px-3.5 py-1.5 bg-white border border-slate-300 rounded-[10px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner uppercase font-mono"
              />
            </div>

            {/* View Button */}
            <button
              type="submit"
              className="px-7 py-2 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[76px]"
            >
              View
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleHistoryTab;
