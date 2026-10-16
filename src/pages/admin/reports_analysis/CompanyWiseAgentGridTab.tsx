import React, { useState, useMemo } from 'react';
import { Search, Download, RefreshCw, X, Eye, FileSpreadsheet } from 'lucide-react';

export interface CompanyWiseAgentGridRecord {
  id: number;
  agentCode: string;
  agentName: string;
  branch: string;
  broker: string;
  entityType: 'Reliable Agent' | 'Franchise' | 'Franchise Agent' | 'Insurance Exective';
  company: string;
  segment: string;
  odComm: number;
  tpComm: number;
  netComm: number;
  reward: number;
  effectiveFrom: string;
  status: 'Active' | 'Review Due' | 'Inactive';
}

export const CompanyWiseAgentGridTab: React.FC = () => {
  // Radio Group 1: Agent vs Broker
  const [partyType, setPartyType] = useState<'Agent' | 'Broker'>('Agent');

  // Radio Group 2: Sub-types
  const [entitySubType, setEntitySubType] = useState<
    'Reliable Agent' | 'Franchise' | 'Franchise Agent' | 'Insurance Exective'
  >('Reliable Agent');

  // Dropdown States
  const [selectedBroker, setSelectedBroker] = useState('IDEAL BROKERS - BROKING');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Applied filter state
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Branches list
  const branches = [
    'BARAMATI HEAD OFFICE',
    'PUNE',
    'MUMBAI',
    'NAGPUR',
    'SATARA',
    'SOLAPUR',
    'AHILYANAGAR',
  ];

  // Agents list
  const agents = [
    'AMIT DESHMUKH (AG-102)',
    'SNEHA KULKARNI (AG-204)',
    'RAHUL SHARMA (AG-305)',
    'PRIYA VERMA (AG-412)',
    'SANJAY PATIL (AG-510)',
    'ROHIT KADAM (AG-601)',
  ];

  // Mock comprehensive dataset
  const allGridRecords: CompanyWiseAgentGridRecord[] = [
    {
      id: 1,
      agentCode: 'AG-102',
      agentName: 'Amit Deshmukh',
      branch: 'BARAMATI HEAD OFFICE',
      broker: 'IDEAL BROKERS - BROKING',
      entityType: 'Reliable Agent',
      company: 'Bajaj Allianz General Insurance',
      segment: 'Private Car (OD+TP)',
      odComm: 18.5,
      tpComm: 2.5,
      netComm: 15.0,
      reward: 2.0,
      effectiveFrom: '01/04/2026',
      status: 'Active',
    },
    {
      id: 2,
      agentCode: 'AG-102',
      agentName: 'Amit Deshmukh',
      branch: 'BARAMATI HEAD OFFICE',
      broker: 'IDEAL BROKERS - BROKING',
      entityType: 'Reliable Agent',
      company: 'ICICI Lombard Gen Insurance',
      segment: 'Commercial Goods Vehicle',
      odComm: 15.0,
      tpComm: 2.0,
      netComm: 12.5,
      reward: 1.5,
      effectiveFrom: '01/04/2026',
      status: 'Active',
    },
    {
      id: 3,
      agentCode: 'AG-204',
      agentName: 'Sneha Kulkarni',
      branch: 'PUNE',
      broker: 'IDEAL BROKERS - BROKING',
      entityType: 'Reliable Agent',
      company: 'Tata AIG General Insurance',
      segment: 'Two Wheeler Package',
      odComm: 22.0,
      tpComm: 2.5,
      netComm: 18.0,
      reward: 3.0,
      effectiveFrom: '01/04/2026',
      status: 'Active',
    },
    {
      id: 4,
      agentCode: 'AG-305',
      agentName: 'Rahul Sharma',
      branch: 'SOLAPUR',
      broker: 'IDEAL BROKERS - BROKING',
      entityType: 'Reliable Agent',
      company: 'HDFC ERGO General Insurance',
      segment: 'Passenger Carrying (PCV)',
      odComm: 16.0,
      tpComm: 2.0,
      netComm: 13.0,
      reward: 2.0,
      effectiveFrom: '01/04/2026',
      status: 'Active',
    },
    {
      id: 5,
      agentCode: 'AG-412',
      agentName: 'Priya Verma',
      branch: 'MUMBAI',
      broker: 'IDEAL BROKERS - BROKING',
      entityType: 'Reliable Agent',
      company: 'Go Digit General Insurance',
      segment: 'Private Car Comprehensive',
      odComm: 19.0,
      tpComm: 2.5,
      netComm: 16.0,
      reward: 2.5,
      effectiveFrom: '01/06/2026',
      status: 'Review Due',
    },
    {
      id: 6,
      agentCode: 'AG-510',
      agentName: 'Sanjay Patil',
      branch: 'AHILYANAGAR',
      broker: 'IDEAL BROKERS - BROKING',
      entityType: 'Reliable Agent',
      company: 'SBI General Insurance',
      segment: 'Commercial Tractor / Agri',
      odComm: 17.5,
      tpComm: 2.0,
      netComm: 14.0,
      reward: 1.5,
      effectiveFrom: '01/04/2026',
      status: 'Active',
    },
    {
      id: 7,
      agentCode: 'FR-BAR-01',
      agentName: 'Reliable Baramati Unit',
      branch: 'BARAMATI HEAD OFFICE',
      broker: 'IDEAL BROKERS - BROKING',
      entityType: 'Franchise',
      company: 'Bajaj Allianz General Insurance',
      segment: 'Motor Comprehensive All',
      odComm: 24.0,
      tpComm: 3.0,
      netComm: 20.0,
      reward: 2.0,
      effectiveFrom: '01/04/2026',
      status: 'Active',
    },
    {
      id: 8,
      agentCode: 'EX-PUN-09',
      agentName: 'Arvind Dnyaneshwar Gawade',
      branch: 'PUNE',
      broker: 'IDEAL BROKERS - BROKING',
      entityType: 'Insurance Exective',
      company: 'HDFC ERGO General Insurance',
      segment: 'Commercial Vehicles All',
      odComm: 8.0,
      tpComm: 1.5,
      netComm: 6.5,
      reward: 1.0,
      effectiveFrom: '01/04/2026',
      status: 'Active',
    },
  ];

  // Handle View
  const handleView = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsFiltered(true);
  };

  // Handle Reset
  const handleReset = () => {
    setPartyType('Agent');
    setEntitySubType('Reliable Agent');
    setSelectedBroker('IDEAL BROKERS - BROKING');
    setSelectedBranch('');
    setSelectedAgent('');
    setEffectiveDate('');
    setToDate('');
    setIsFiltered(false);
    setSearchQuery('');
  };

  // Filtered records
  const filteredRecords = useMemo(() => {
    return allGridRecords.filter((record) => {
      // Entity Subtype matching
      if (record.entityType !== entitySubType) {
        return false;
      }

      // Branch filter
      if (selectedBranch && record.branch !== selectedBranch) {
        return false;
      }

      // Agent filter
      if (selectedAgent && !record.agentName.toLowerCase().includes(selectedAgent.split(' ')[0].toLowerCase())) {
        return false;
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCompany = record.company.toLowerCase().includes(q);
        const matchesSegment = record.segment.toLowerCase().includes(q);
        const matchesAgent = record.agentName.toLowerCase().includes(q);
        const matchesCode = record.agentCode.toLowerCase().includes(q);
        if (!matchesCompany && !matchesSegment && !matchesAgent && !matchesCode) {
          return false;
        }
      }

      return true;
    });
  }, [allGridRecords, entitySubType, selectedBranch, selectedAgent, searchQuery]);

  // Export to CSV
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No data available to export.');
      return;
    }

    const headers = [
      'AGENT CODE',
      'AGENT NAME',
      'BRANCH',
      'ENTITY TYPE',
      'COMPANY',
      'SEGMENT',
      'OD COMM %',
      'TP COMM %',
      'NET COMM %',
      'REWARD %',
      'EFFECTIVE FROM',
      'STATUS',
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.agentCode}"`,
      `"${r.agentName}"`,
      `"${r.branch}"`,
      `"${r.entityType}"`,
      `"${r.company}"`,
      `"${r.segment}"`,
      r.odComm,
      r.tpComm,
      r.netComm,
      r.reward,
      `"${r.effectiveFrom}"`,
      `"${r.status}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Company_Wise_Agent_Grid_${entitySubType.replace(/\s+/g, '_')}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* =========================================================================
          TOP FILTER CARD (Replicating exact screenshot layout)
         ========================================================================= */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border p-6">
        <form onSubmit={handleView} className="space-y-6">
          {/* Row 1: Radio Groups + Dropdowns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Group 1: Agent vs Broker (Horizontal Radios) */}
            <div className="md:col-span-2 flex items-center gap-4 pt-1">
              <label className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-800 cursor-pointer select-none">
                <input
                  type="radio"
                  name="partyType"
                  value="Agent"
                  checked={partyType === 'Agent'}
                  onChange={() => setPartyType('Agent')}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                Agent
              </label>

              <label className="inline-flex items-center gap-1.5 text-[13px] font-bold text-slate-800 cursor-pointer select-none">
                <input
                  type="radio"
                  name="partyType"
                  value="Broker"
                  checked={partyType === 'Broker'}
                  onChange={() => setPartyType('Broker')}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                Broker
              </label>
            </div>

            {/* Group 2: Vertical Radios (Radio above Label matching screenshot) */}
            <div className="md:col-span-4 flex items-start gap-4 sm:gap-6 pt-1">
              {/* Reliable Agent */}
              <label className="flex flex-col items-center cursor-pointer select-none text-center">
                <input
                  type="radio"
                  name="entitySubType"
                  value="Reliable Agent"
                  checked={entitySubType === 'Reliable Agent'}
                  onChange={() => setEntitySubType('Reliable Agent')}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                <span className="text-[12px] font-bold text-slate-800 mt-1 leading-tight max-w-[60px]">
                  Reliable Agent
                </span>
              </label>

              {/* Franchise */}
              <label className="flex flex-col items-center cursor-pointer select-none text-center">
                <input
                  type="radio"
                  name="entitySubType"
                  value="Franchise"
                  checked={entitySubType === 'Franchise'}
                  onChange={() => setEntitySubType('Franchise')}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                <span className="text-[12px] font-bold text-slate-800 mt-1 leading-tight max-w-[65px]">
                  Franchise
                </span>
              </label>

              {/* Franchise Agent */}
              <label className="flex flex-col items-center cursor-pointer select-none text-center">
                <input
                  type="radio"
                  name="entitySubType"
                  value="Franchise Agent"
                  checked={entitySubType === 'Franchise Agent'}
                  onChange={() => setEntitySubType('Franchise Agent')}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                <span className="text-[12px] font-bold text-slate-800 mt-1 leading-tight max-w-[65px]">
                  Franchise Agent
                </span>
              </label>

              {/* Insurance Exective */}
              <label className="flex flex-col items-center cursor-pointer select-none text-center">
                <input
                  type="radio"
                  name="entitySubType"
                  value="Insurance Exective"
                  checked={entitySubType === 'Insurance Exective'}
                  onChange={() => setEntitySubType('Insurance Exective')}
                  className="w-4 h-4 text-brand-primary accent-brand-primary cursor-pointer"
                />
                <span className="text-[12px] font-bold text-slate-800 mt-1 leading-tight max-w-[65px]">
                  Insurance Exective
                </span>
              </label>
            </div>

            {/* Group 3: Dropdown Columns matching screenshot */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Column 1: Broker & Agent */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">
                    Broker
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBroker}
                      onChange={(e) => setSelectedBroker(e.target.value)}
                      className="w-full px-3.5 py-1.5 bg-slate-50/80 border border-slate-300 rounded-full text-[12.5px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner appearance-none pr-8 cursor-pointer"
                    >
                      <option value="IDEAL BROKERS - BROKING">IDEAL BROKERS - BROKING</option>
                      <option value="ALL BROKERS">ALL BROKERS</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">
                    Agent
                  </label>
                  <div className="relative">
                    <select
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-[12.5px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner appearance-none pr-8 cursor-pointer"
                    >
                      <option value="">--Select Agent Name--</option>
                      {agents.map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 2: Branch & Effective Date */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">
                    Branch
                  </label>
                  <div className="relative">
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer"
                    >
                      <option value="">--Select Branch--</option>
                      {branches.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-slate-700 mb-1">
                    Effective Date
                  </label>
                  <div className="relative">
                    <select
                      value={effectiveDate}
                      onChange={(e) => setEffectiveDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer"
                    >
                      <option value="">--Select Date--</option>
                      <option value="01/04/2026">01/04/2026</option>
                      <option value="01/06/2026">01/06/2026</option>
                      <option value="01/10/2026">01/10/2026</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                      ▼
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: To Date + View & Reset */}
          <div className="flex flex-wrap items-end gap-4 pt-2 border-t border-slate-100">
            <div className="w-56">
              <label className="block text-[12px] font-bold text-slate-700 mb-1">
                To Date
              </label>
              <div className="relative">
                <select
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer"
                >
                  <option value="">--Select Date--</option>
                  <option value="14/10/2026">14/10/2026</option>
                  <option value="31/10/2026">31/10/2026</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 text-xs">
                  ▼
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98]"
              >
                View
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-[0.98]"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer active:scale-[0.98] ml-1 flex items-center gap-1.5"
              >
                <Download size={14} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* =========================================================================
          DATA GRID (Styled with VehicleMaster layout)
         ========================================================================= */}
      <div className="w-full bg-white rounded-lg border border-brand-border shadow-sm overflow-hidden flex flex-col">
        {/* Top Toolbar matching VehicleMaster */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="Search Company, Segment, Agent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Broker: <strong className="text-slate-700">{selectedBroker}</strong></span>
            <span className="text-slate-300">|</span>
            <span>Category: <strong className="text-slate-700">{partyType} - {entitySubType}</strong></span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[950px]">
            <thead>
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                <th className="py-3 px-3.5 whitespace-nowrap">Agent Code</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Agent Name</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Branch</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Company</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Segment</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">OD Comm %</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">TP Comm %</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">Net Comm %</th>
                <th className="py-3 px-3 text-center whitespace-nowrap">Reward %</th>
                <th className="py-3 px-3.5 whitespace-nowrap">Effective Date</th>
                <th className="py-3 px-3.5 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px] text-slate-800">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-500 text-xs">
                    <p className="font-medium text-slate-600">
                      No commission grid records found for {entitySubType}.
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Select "Reliable Agent" or click Reset to view active grid mappings.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredRecords.map((row) => (
                  <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                    <td className="py-3 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                      {row.agentCode}
                    </td>
                    <td className="py-3 px-3.5 font-semibold text-slate-900">
                      {row.agentName}
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">
                      {row.branch}
                    </td>
                    <td className="py-3 px-3.5 font-medium text-slate-800">
                      {row.company}
                    </td>
                    <td className="py-3 px-3.5 text-slate-700">
                      {row.segment}
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-blue-700">
                      {row.odComm.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-slate-700">
                      {row.tpComm.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-emerald-700">
                      {row.netComm.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3 text-center font-bold text-indigo-700">
                      {row.reward.toFixed(1)}%
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap text-slate-600 font-medium">
                      {row.effectiveFrom}
                    </td>
                    <td className="py-3 px-3.5 text-center whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                          row.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredRecords.length > 0 && (
          <div className="bg-slate-50 border-t border-brand-border px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredRecords.length}</span> commission grid configurations
            </div>
            <div>
              Entity Category: <strong className="text-slate-800">{partyType} - {entitySubType}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyWiseAgentGridTab;
