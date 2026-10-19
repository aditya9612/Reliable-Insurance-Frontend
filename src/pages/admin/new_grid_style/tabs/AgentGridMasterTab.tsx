import React, { useState } from 'react';
import {
  brokersList,
  insuranceCompaniesList,
  branchesList,
  agentsList,
  vehicleTypesList,
  statesList
} from '../mockData';

export const AgentGridMasterTab: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
  // Row 1 Form Fields
  const [selectedBroker, setSelectedBroker] = useState('RELIABLE INSURANCE BROKERS');
  const [selectedCompany, setSelectedCompany] = useState('BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD');
  const [selectedBranch, setSelectedBranch] = useState('BARAMATI HEAD OFFICE');

  // Row 2 Form Fields
  const [selectedAgent, setSelectedAgent] = useState('ANIL PATIL (AG-1002)');
  const [selectedVehicleType, setSelectedVehicleType] = useState('4W PRIVATE CAR (COMPREHENSIVE)');
  const [validFrom, setValidFrom] = useState('01/04/2026');
  const [selectedState, setSelectedState] = useState('MAHARASHTRA');

  // Below card controls
  const [fuelBothSame, setFuelBothSame] = useState(false);
  const [showGridTable, setShowGridTable] = useState(true);

  // Editable Agent Rates Grid
  const [ratesGrid, setRatesGrid] = useState([
    { id: 1, clusterName: 'PUNE R1', fuelType: 'PETROL', odRate: '15.5', tpRate: '2.0', netRate: '14.0' },
    { id: 2, clusterName: 'PUNE R1', fuelType: 'DIESEL', odRate: '14.0', tpRate: '1.5', netRate: '13.0' },
    { id: 3, clusterName: 'MUMBAI AND SURROUNDING + PUNE', fuelType: 'PETROL', odRate: '16.0', tpRate: '2.0', netRate: '14.5' },
    { id: 4, clusterName: 'MUMBAI AND SURROUNDING + PUNE', fuelType: 'DIESEL', odRate: '13.5', tpRate: '1.5', netRate: '12.5' },
    { id: 5, clusterName: 'WESTERN MAHARASHTRA CLUSTER', fuelType: 'ALL', odRate: '13.0', tpRate: '1.5', netRate: '12.0' }
  ]);

  const handleShow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBroker) {
      showToast('Please select Broker!');
      return;
    }
    if (!selectedCompany) {
      showToast('Please select Insurance Company!');
      return;
    }
    setShowGridTable(true);
    showToast('Agent commission grid loaded for selected configuration.');
  };

  const handleRateChange = (id: number, field: 'odRate' | 'tpRate' | 'netRate', value: string) => {
    setRatesGrid(ratesGrid.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleSaveAll = () => {
    showToast('Agent Commission Grid rules saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Top Form Card: » Broker Commission Grid (Matching Screenshot 5 with Blue Theme) */}
      <div className="bg-white rounded-[10px] border border-brand-border shadow-sm p-6 sm:p-7 max-w-6xl">
        {/* Blue Header Banner » Broker Commission Grid */}
        <div className="bg-[#0869D8] text-white px-5 py-2.5 rounded-[4px] font-bold text-sm tracking-wide shadow-xs flex items-center">
          <span>» Broker Commission Grid</span>
        </div>

        {/* Form Body matching Screenshot 5 */}
        <form onSubmit={handleShow} className="mt-6 space-y-4">
          {/* Row 1: Broker, Insurance Company, Branch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-end text-xs sm:text-sm">
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

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Insurance Company</label>
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

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              >
                <option value="">--Select Branch--</option>
                {branchesList.map((br) => (
                  <option key={br} value={br}>{br}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Agent Name, Vehicle Type, Valid From, State + Show Button */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-end text-xs sm:text-sm pt-2">
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Agent Name</label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              >
                <option value="">--Select Agent Name--</option>
                {agentsList.map((ag) => (
                  <option key={ag} value={ag}>{ag}</option>
                ))}
              </select>
            </div>

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

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">Valid From</label>
              <input
                type="text"
                placeholder="DD/MM/YYYY"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1.5">State</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              >
                <option value="">--Select State--</option>
                {statesList.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Show Button inside Card matching Screenshot 5 */}
          <div className="pt-2">
            <button
              type="submit"
              className="px-8 py-2 bg-[#004e9a] hover:bg-[#003d7a] text-white font-semibold text-xs sm:text-sm rounded shadow-sm transition cursor-pointer border-none"
            >
              Show
            </button>
          </div>
        </form>
      </div>

      {/* Controls below card matching Screenshot 5: Fuel both same checkbox & Save Button */}
      <div className="max-w-6xl space-y-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="fuelBothSameAgent"
            checked={fuelBothSame}
            onChange={(e) => setFuelBothSame(e.target.checked)}
            className="w-4 h-4 text-[#004e9a] rounded border-slate-300 focus:ring-[#004e9a] cursor-pointer"
          />
          <label htmlFor="fuelBothSameAgent" className="text-xs sm:text-sm font-semibold text-slate-800 cursor-pointer">
            Fuel both same
          </label>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSaveAll}
            className="px-8 py-2 bg-[#004e9a] hover:bg-[#003d7a] text-white font-semibold text-xs sm:text-sm rounded shadow-sm transition cursor-pointer border-none"
          >
            Save
          </button>
        </div>
      </div>

      {/* Rate Matrix Grid (shown on click Show or by default) */}
      {showGridTable && (
        <div className="bg-white rounded-[10px] border border-brand-border shadow-sm overflow-hidden max-w-6xl mt-4">
          <div className="p-4 bg-slate-50 border-b border-brand-border flex items-center justify-between">
            <span className="font-bold text-xs uppercase text-brand-navy tracking-wide">
              Agent Commission Grid Rates ({selectedAgent || 'All Agents'}) - {selectedCompany || 'BAJAJ ALLIANZ'}
            </span>
            <span className="text-xs text-slate-500 font-mono">Valid From: {validFrom}</span>
          </div>
          <div className="overflow-x-auto w-full custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[700px] text-[13px]">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                  <th className="py-3 px-4 text-center w-14">#</th>
                  <th className="py-3 px-4 min-w-[220px]">CLUSTER NAME</th>
                  <th className="py-3 px-4 w-32">FUEL TYPE</th>
                  <th className="py-3 px-4 w-32 text-center">OD RATE (%)</th>
                  <th className="py-3 px-4 w-32 text-center">TP RATE (%)</th>
                  <th className="py-3 px-4 w-32 text-center">NET RATE (%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border bg-white text-[13px]">
                {ratesGrid.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-brand-mainbg transition-colors bg-white">
                    <td className="py-2.5 px-4 text-center font-medium text-brand-primary">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-semibold text-[#12284A]">{row.clusterName}</td>
                    <td className="py-2.5 px-4 font-medium text-slate-600">{row.fuelType}</td>
                    <td className="py-2.5 px-4 text-center">
                      <input
                        type="text"
                        value={row.odRate}
                        onChange={(e) => handleRateChange(row.id, 'odRate', e.target.value)}
                        className="w-16 px-2 py-1 text-center font-bold text-brand-navy bg-white border border-brand-border rounded focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      /> %
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <input
                        type="text"
                        value={row.tpRate}
                        onChange={(e) => handleRateChange(row.id, 'tpRate', e.target.value)}
                        className="w-16 px-2 py-1 text-center font-bold text-brand-navy bg-white border border-brand-border rounded focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      /> %
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      <input
                        type="text"
                        value={row.netRate}
                        onChange={(e) => handleRateChange(row.id, 'netRate', e.target.value)}
                        className="w-16 px-2 py-1 text-center font-bold text-brand-primary bg-brand-lightbg/60 border border-brand-border rounded focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      /> %
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
