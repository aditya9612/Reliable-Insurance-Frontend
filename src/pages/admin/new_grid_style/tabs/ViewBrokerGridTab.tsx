import React, { useState } from 'react';
import {
  brokersList,
  insuranceCompaniesList,
  vehicleTypesList,
  initialBrokerGridRules,
  BrokerGridRule
} from '../mockData';
import { Download, Search, Edit2 } from 'lucide-react';

export const ViewBrokerGridTab: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
  const [selectedBroker, setSelectedBroker] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedVehicleType, setSelectedVehicleType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [rules, setRules] = useState<BrokerGridRule[]>(initialBrokerGridRules);
  const [hasViewed, setHasViewed] = useState(true);

  const handleView = (e: React.FormEvent) => {
    e.preventDefault();
    setHasViewed(true);
    showToast('Broker Commission Grid loaded successfully.');
  };

  const filteredRules = rules.filter((r) => {
    const matchesBroker = !selectedBroker || r.broker === selectedBroker;
    const matchesCompany = !selectedCompany || r.insuranceCompany === selectedCompany;
    const matchesVehicle = !selectedVehicleType || r.vehicleType === selectedVehicleType;
    const matchesSearch =
      r.clusterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.insuranceCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.fuelType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBroker && matchesCompany && matchesVehicle && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter Card: » Broker Commission Grid (Matching Screenshot 4 with Blue Theme) */}
      <div className="bg-white rounded-[10px] border border-brand-border shadow-sm p-6 sm:p-7 max-w-6xl">
        {/* Blue Header Banner » Broker Commission Grid */}
        <div className="bg-[#0869D8] text-white px-5 py-2.5 rounded-[4px] font-bold text-sm tracking-wide shadow-xs flex items-center">
          <span>» Broker Commission Grid</span>
        </div>

        {/* Form Body matching Screenshot 4 */}
        <form onSubmit={handleView} className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end text-xs sm:text-sm">
            {/* Broker */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Broker</label>
              <select
                value={selectedBroker}
                onChange={(e) => setSelectedBroker(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              >
                <option value="">--Select Broker--</option>
                {brokersList.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Company Name */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Company Name</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              >
                <option value="">--Select Company--</option>
                {insuranceCompaniesList.map((comp) => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Vehicle Type</label>
              <select
                value={selectedVehicleType}
                onChange={(e) => setSelectedVehicleType(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              >
                <option value="">--Select Vehicle Type--</option>
                {vehicleTypesList.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            {/* View Orange Button matching Screenshot 4 */}
            <div className="pt-1">
              <button
                type="submit"
                className="px-8 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-xs sm:text-sm rounded shadow-sm transition cursor-pointer border-none"
              >
                View
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Results Table */}
      {hasViewed && (
        <div className="bg-white rounded-[10px] border border-brand-border shadow-sm overflow-hidden max-w-6xl">
          <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs font-bold text-brand-navy uppercase tracking-wide">
              Broker Commission Grid Records ({filteredRules.length})
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search grid..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-brand-border rounded text-xs text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary"
                />
              </div>
              <button
                onClick={() => showToast('Exporting to Excel...')}
                className="px-4 py-1.5 bg-brand-primary hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded shadow-xs transition flex items-center gap-1.5 border-none cursor-pointer"
              >
                <Download size={13} />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px] text-[13px]">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                  <th className="py-3 px-4 text-center w-14">#</th>
                  <th className="py-3 px-4">BROKER</th>
                  <th className="py-3 px-4 min-w-[200px]">INSURANCE COMPANY</th>
                  <th className="py-3 px-4 min-w-[180px]">CLUSTER NAME</th>
                  <th className="py-3 px-4 min-w-[160px]">VEHICLE TYPE</th>
                  <th className="py-3 px-4">FUEL</th>
                  <th className="py-3 px-4 text-center">OD %</th>
                  <th className="py-3 px-4 text-center">TP %</th>
                  <th className="py-3 px-4 text-center">NET %</th>
                  <th className="py-3 px-4 text-center">VALID FROM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border bg-white text-[13px]">
                {filteredRules.length > 0 ? (
                  filteredRules.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg transition-colors bg-white">
                      <td className="py-2.5 px-4 text-center font-medium text-brand-primary">{idx + 1}</td>
                      <td className="py-2.5 px-4 font-semibold text-brand-navy">{row.broker}</td>
                      <td className="py-2.5 px-4 font-semibold text-[#12284A] uppercase">{row.insuranceCompany}</td>
                      <td className="py-2.5 px-4 font-bold text-[#102A4C] uppercase">{row.clusterName}</td>
                      <td className="py-2.5 px-4 text-slate-600">{row.vehicleType}</td>
                      <td className="py-2.5 px-4 text-slate-600">{row.fuelType}</td>
                      <td className="py-2.5 px-4 text-center font-bold text-brand-navy">{row.odRate}</td>
                      <td className="py-2.5 px-4 text-center font-bold text-brand-navy">{row.tpRate}</td>
                      <td className="py-2.5 px-4 text-center font-bold text-brand-primary">
                        <span className="bg-brand-lightbg/60 px-2 py-0.5 rounded border border-brand-border/60">
                          {row.netRate}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono text-slate-600">{row.validFrom}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-slate-400 font-semibold uppercase">
                      No matching broker grid records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
