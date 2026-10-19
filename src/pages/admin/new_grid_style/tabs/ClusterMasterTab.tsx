import React, { useState } from 'react';
import {
  ClusterItem,
  initialClusters,
  insuranceCompaniesList,
  statesList,
  rtoListMaharashtra
} from '../mockData';
import { Trash2, Edit2, Plus, Check } from 'lucide-react';

export const ClusterMasterTab: React.FC<{ showToast: (msg: string) => void }> = ({ showToast }) => {
  const [clusters, setClusters] = useState<ClusterItem[]>(initialClusters);

  // Form State
  const [selectedCompany, setSelectedCompany] = useState('');
  const [clusterName, setClusterName] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedRtos, setSelectedRtos] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Handle RTO toggle
  const toggleRto = (rto: string) => {
    if (selectedRtos.includes(rto)) {
      setSelectedRtos(selectedRtos.filter(r => r !== rto));
    } else {
      setSelectedRtos([...selectedRtos, rto]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clusterName.trim()) {
      showToast('Please enter Cluster Name!');
      return;
    }
    if (!selectedState) {
      showToast('Please select State!');
      return;
    }

    if (editingId) {
      setClusters(clusters.map(c => c.id === editingId ? {
        ...c,
        insuranceCompany: selectedCompany || c.insuranceCompany,
        clusterName: clusterName.trim().toUpperCase(),
        state: selectedState,
        locations: selectedRtos.length > 0 ? selectedRtos : c.locations
      } : c));
      showToast('Cluster updated successfully!');
      setEditingId(null);
    } else {
      const newCluster: ClusterItem = {
        id: clusters.length > 0 ? Math.max(...clusters.map(c => c.id)) + 1 : 1,
        insuranceCompany: selectedCompany || 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
        clusterName: clusterName.trim().toUpperCase(),
        state: selectedState,
        locations: selectedRtos.length > 0 ? selectedRtos : ['MH-12 PUNE', 'MH-42 BARAMATI']
      };
      setClusters([newCluster, ...clusters]);
      showToast('Cluster Master saved successfully!');
    }

    // Reset Form
    setSelectedCompany('');
    setClusterName('');
    setSelectedState('');
    setSelectedRtos([]);
  };

  const handleEdit = (item: ClusterItem) => {
    setEditingId(item.id);
    setSelectedCompany(item.insuranceCompany);
    setClusterName(item.clusterName);
    setSelectedState(item.state);
    setSelectedRtos(item.locations);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this Cluster record?')) {
      setClusters(clusters.filter(c => c.id !== id));
      showToast('Cluster record deleted successfully!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Card: » Cluster Master Form (Matching Screenshot 2 with Blue Theme) */}
      <div className="bg-white rounded-[10px] border border-brand-border shadow-sm p-6 sm:p-7 max-w-6xl">
        {/* Blue Header Banner » Cluster Master Form */}
        <div className="bg-[#0869D8] text-white px-5 py-2.5 rounded-[4px] font-bold text-sm tracking-wide shadow-xs flex items-center justify-between">
          <span>» Cluster Master Form</span>
          {editingId && (
            <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded text-white font-medium">
              Editing ID #{editingId}
            </span>
          )}
        </div>

        {/* Form Body matching Screenshot 2 */}
        <form onSubmit={handleSave} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start text-xs sm:text-sm">
            {/* Insurance Company */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Insurance Company
              </label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              >
                <option value="">--Select Company--</option>
                {insuranceCompaniesList.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp}
                  </option>
                ))}
              </select>
            </div>

            {/* Cluster Name * */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                Cluster Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Cluster Name"
                value={clusterName}
                onChange={(e) => setClusterName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              />
            </div>

            {/* State * */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition"
              >
                <option value="">--Select State--</option>
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* RTO Multi-select */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                RTO {selectedRtos.length > 0 && <span className="text-blue-600 font-semibold">({selectedRtos.length} selected)</span>}
              </label>
              <div className="relative">
                <select
                  onChange={(e) => {
                    if (e.target.value) toggleRto(e.target.value);
                  }}
                  value=""
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-[5px] text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869d8] transition cursor-pointer"
                >
                  <option value="">Choose RTO</option>
                  {rtoListMaharashtra.map((rto) => (
                    <option key={rto} value={rto}>
                      {rto} {selectedRtos.includes(rto) ? '✓' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Selected RTO pills */}
          {selectedRtos.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedRtos.map((rto) => (
                <span
                  key={rto}
                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-brand-primary border border-blue-200 rounded text-[11px] font-semibold"
                >
                  <span>{rto}</span>
                  <button
                    type="button"
                    onClick={() => toggleRto(rto)}
                    className="text-blue-400 hover:text-red-500 border-none bg-transparent cursor-pointer ml-0.5 text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons: Save matching Screenshot 2 */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="submit"
              className="px-8 py-2 bg-[#004e9a] hover:bg-[#003d7a] text-white font-semibold text-xs sm:text-sm rounded shadow-sm transition-all duration-150 cursor-pointer border-none"
            >
              {editingId ? 'Update' : 'Save'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setSelectedCompany('');
                  setClusterName('');
                  setSelectedState('');
                  setSelectedRtos([]);
                }}
                className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded transition cursor-pointer border-none"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Grid Table below matching Screenshot 2 with Light Blue Theme from Photo 2 */}
      <div className="bg-white rounded-[10px] border border-brand-border shadow-sm overflow-hidden max-w-6xl">
        <div className="overflow-x-auto w-full custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[750px]">
            <thead>
              {/* Light Blue Header matching Photo 2 */}
              <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                <th className="py-3 px-4 text-center w-16">ID</th>
                <th className="py-3 px-4 min-w-[260px]">INSURANCE COMPANY</th>
                <th className="py-3 px-4 min-w-[220px]">CLUSTER NAME</th>
                <th className="py-3 px-4 min-w-[280px]">LOCATION</th>
                <th className="py-3 px-4 text-center w-28">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border text-[13px] bg-white">
              {clusters.map((row) => (
                <tr key={row.id} className="hover:bg-brand-mainbg transition-colors bg-white">
                  <td className="py-3 px-4 text-center font-medium text-brand-primary align-top">
                    {row.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-[#12284A] uppercase align-top">
                    {row.insuranceCompany}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 uppercase align-top">
                    {row.clusterName}
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-medium align-top leading-relaxed">
                    {row.locations.map((loc, idx) => (
                      <div key={idx} className="py-0.5">
                        {loc}
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-center align-top">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(row)}
                        className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                        title="Edit Cluster"
                      >
                        <Edit2 size={15} strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="p-1.5 bg-red-50 text-red-500 hover:bg-red-100 rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                        title="Delete Cluster"
                      >
                        <Trash2 size={15} strokeWidth={1.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
