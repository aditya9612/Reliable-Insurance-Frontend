import React, { useState, useMemo } from 'react';
import { Search, Download, X, Eye, UserCheck, UserX } from 'lucide-react';

export interface ActiveInactiveAgentRecord {
  id: number;
  agentCode: string;
  agentName: string;
  branch: string;
  mobile: string;
  regDate: string;
  lastBusinessDate: string;
  policiesThisYear: number;
  premiumThisYear: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  reason: string;
  executive: string;
  inactivePeriod?: string;
}

export const ActiveInactiveAgentTab: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<'Active' | 'Inactive'>('Active');
  const [durationFilter, setDurationFilter] = useState('All');
  const [searchName, setSearchName] = useState('');

  const [appliedFilters, setAppliedFilters] = useState({
    status: 'Active' as 'Active' | 'Inactive',
    duration: 'All',
  });

  const allAgents: ActiveInactiveAgentRecord[] = [
    {
      id: 1,
      agentCode: 'AG-102',
      agentName: 'Amit Tukaram Deshmukh',
      branch: 'BARAMATI HEAD OFFICE',
      mobile: '9822019284',
      regDate: '15/03/2024',
      lastBusinessDate: '12/10/2026',
      policiesThisYear: 142,
      premiumThisYear: 3840000,
      status: 'Active',
      reason: 'High Performing Lead Agent',
      executive: 'Arvind Gawade',
    },
    {
      id: 2,
      agentCode: 'AG-204',
      agentName: 'Sneha Shrikant Kulkarni',
      branch: 'PUNE',
      mobile: '9423088192',
      regDate: '10/05/2024',
      lastBusinessDate: '11/10/2026',
      policiesThisYear: 198,
      premiumThisYear: 5120000,
      status: 'Active',
      reason: 'Consistent Top Volume',
      executive: 'Hemant Kakulte',
    },
    {
      id: 3,
      agentCode: 'AG-305',
      agentName: 'Rahul Jagdish Sharma',
      branch: 'SOLAPUR',
      mobile: '9763190284',
      regDate: '22/08/2024',
      lastBusinessDate: '09/10/2026',
      policiesThisYear: 84,
      premiumThisYear: 2450000,
      status: 'Active',
      reason: 'Commercial Specialist',
      executive: 'Aditya Sapkal',
    },
    {
      id: 4,
      agentCode: 'AG-388',
      agentName: 'Deepak Vasant Shinde',
      branch: 'BARAMATI HEAD OFFICE',
      mobile: '9890124419',
      regDate: '12/01/2025',
      lastBusinessDate: '18/05/2026',
      policiesThisYear: 4,
      premiumThisYear: 62000,
      status: 'Inactive',
      reason: 'No Business in Last 120 Days',
      executive: 'Arvind Gawade',
      inactivePeriod: 'Three Month',
    },
    {
      id: 5,
      agentCode: 'AG-412',
      agentName: 'Priya Ramesh Verma',
      branch: 'MUMBAI',
      mobile: '9820391823',
      regDate: '01/09/2024',
      lastBusinessDate: '08/10/2026',
      policiesThisYear: 112,
      premiumThisYear: 3240000,
      status: 'Active',
      reason: 'Active Mumbai Region',
      executive: 'Shekhar Jadhav',
    },
    {
      id: 6,
      agentCode: 'AG-499',
      agentName: 'Kishor Baburao Mane',
      branch: 'SATARA',
      mobile: '9921048192',
      regDate: '20/11/2024',
      lastBusinessDate: '01/03/2026',
      policiesThisYear: 0,
      premiumThisYear: 0,
      status: 'Inactive',
      reason: 'Compliance KYC Deficiency',
      executive: 'Rohit Shinde',
      inactivePeriod: 'Six Month',
    },
  ];

  const handleShow = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setAppliedFilters({
      status: statusFilter,
      duration: durationFilter,
    });
  };

  const filteredRecords = useMemo(() => {
    return allAgents.filter((agent) => {
      if (agent.status !== appliedFilters.status) return false;
      if (searchName.trim()) {
        const q = searchName.toLowerCase().trim();
        if (!agent.agentName.toLowerCase().includes(q) && !agent.agentCode.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [allAgents, appliedFilters, searchName]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleExport = () => {
    const headers = [
      'AGENT CODE',
      'AGENT NAME',
      'BRANCH',
      'MOBILE',
      'REG DATE',
      'LAST BUSINESS',
      'POLICIES',
      'TOTAL PREMIUM',
      'STATUS',
      'REASON',
      'EXECUTIVE',
    ];
    const rows = filteredRecords.map((r) => [
      `"${r.agentCode}"`,
      `"${r.agentName}"`,
      `"${r.branch}"`,
      `"${r.mobile}"`,
      `"${r.regDate}"`,
      `"${r.lastBusinessDate}"`,
      r.policiesThisYear,
      r.premiumThisYear,
      `"${r.status}"`,
      `"${r.reason}"`,
      `"${r.executive}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `Agents_${appliedFilters.status}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border p-6">
        <form onSubmit={handleShow} className="space-y-5">
          {/* Radio Buttons Row matching Photo 4 */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-10">
            {/* Active vs Inactive */}
            <div className="flex items-center gap-4">
              <label className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-800 cursor-pointer select-none">
                <input
                  type="radio"
                  name="agentStatus"
                  value="Active"
                  checked={statusFilter === 'Active'}
                  onChange={() => setStatusFilter('Active')}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                Active
              </label>

              <label className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-800 cursor-pointer select-none">
                <input
                  type="radio"
                  name="agentStatus"
                  value="Inactive"
                  checked={statusFilter === 'Inactive'}
                  onChange={() => setStatusFilter('Inactive')}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                Inactive
              </label>
            </div>

            {/* Time period options */}
            <div className="flex flex-wrap items-center gap-4">
              {['One Month', 'Three Month', 'Six Month', 'One Year', 'More than One Year'].map((opt) => (
                <label key={opt} className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-slate-700 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="durationFilter"
                    value={opt}
                    checked={durationFilter === opt}
                    onChange={() => setDurationFilter(opt)}
                    className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                  />
                  {opt === 'One Month' ? 'One Month' : opt}
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-1">
            <button
              type="submit"
              className="px-8 py-2 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[76px]"
            >
              Show
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="px-8 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[76px]"
            >
              Export
            </button>
          </div>
        </form>
      </div>

      {/* Secondary Search input matching Photo 4: "Search Customer Name Here" / Agent Name */}
      <div className="w-full max-w-sm">
        <input
          type="text"
          placeholder="Search Customer / Agent Name Here"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-slate-300 rounded-full text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
        />
      </div>

      {/* Data Grid */}
      <div className="w-full bg-white rounded-lg border border-brand-border shadow-sm overflow-hidden flex flex-col">
        <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[13px] border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-brand-primary font-bold">»</span>
            <span>
              {appliedFilters.status} Agents ({filteredRecords.length} Records)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-brand-primary text-white text-[11.5px] uppercase tracking-wider font-bold select-none border-b border-blue-700">
                <th className="py-2.5 px-3.5 whitespace-nowrap font-mono">Agent Code</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">Agent Name</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">Branch</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap font-mono">Mobile</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">Reg Date</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">Last Business</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">Policies</th>
                <th className="py-2.5 px-3.5 text-right whitespace-nowrap">Total Prem (₹)</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">Status</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">Reason / Note</th>
                <th className="py-2.5 px-3.5 whitespace-nowrap">Executive</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-800">
              {filteredRecords.map((row) => (
                <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="py-3 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                    {row.agentCode}
                  </td>
                  <td className="py-3 px-3.5 font-semibold text-slate-900">{row.agentName}</td>
                  <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">{row.branch}</td>
                  <td className="py-3 px-3.5 font-mono text-slate-700 whitespace-nowrap">{row.mobile}</td>
                  <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">{row.regDate}</td>
                  <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">{row.lastBusinessDate}</td>
                  <td className="py-3 px-3 text-center font-bold text-brand-primary">
                    {row.policiesThisYear}
                  </td>
                  <td className="py-3 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                    {formatCurrency(row.premiumThisYear)}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        row.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-600 max-w-[200px] truncate" title={row.reason}>
                    {row.reason}
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap font-medium">{row.executive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveInactiveAgentTab;
