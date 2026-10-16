import React, { useState } from 'react';
import {
  CommissionGridFor,
  NonMotorCommissionGridItem,
} from '../types';
import {
  mockCommissionEntities,
  mockInsuranceCompanies,
  initialInsuranceTypes,
  initialInsuranceSubTypes,
  initialCommissionGridItems,
} from '../mockData';
import {
  Search,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Download,
  Percent,
  CheckCircle2,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface NonMotorCommissionTabProps {
  showToast: (msg: string) => void;
}

const gridOptions: CommissionGridFor[] = [
  'Broker',
  'Self',
  'Reliable Agent',
  'Franchise',
  'Franchise Agent',
  'Insurance Exective',
];

export const NonMotorCommissionTab: React.FC<NonMotorCommissionTabProps> = ({ showToast }) => {
  // Grid Selection states
  const [selectedGridFor, setSelectedGridFor] = useState<CommissionGridFor>('Broker');
  const [selectedEntity, setSelectedEntity] = useState<string>(
    mockCommissionEntities['Broker'][0] || ''
  );

  // Form Fields states
  const [companyName, setCompanyName] = useState<string>('');
  const [policyType, setPolicyType] = useState<string>('');
  const [policySubType, setPolicySubType] = useState<string>('');
  const [validFrom, setValidFrom] = useState<string>('01/05/2026');
  const [commissionPercent, setCommissionPercent] = useState<string>('');

  // Table Data
  const [gridItems, setGridItems] = useState<NonMotorCommissionGridItem[]>(initialCommissionGridItems);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);

  // Handle Radio Change
  const handleGridForChange = (newVal: CommissionGridFor) => {
    setSelectedGridFor(newVal);
    const entities = mockCommissionEntities[newVal] || [];
    setSelectedEntity(entities[0] || '');
  };

  // Filtered Subtypes based on selected policy type
  const availableSubTypes = initialInsuranceSubTypes.filter(
    (st) => !policyType || st.insuranceType.toUpperCase() === policyType.toUpperCase()
  );

  // Handle Submit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName) {
      showToast('Please select a Company Name');
      return;
    }
    if (!policyType) {
      showToast('Please select Policy Type');
      return;
    }
    if (!policySubType) {
      showToast('Please select Policy Sub Type');
      return;
    }
    const commVal = parseFloat(commissionPercent);
    if (isNaN(commVal) || commVal < 0 || commVal > 100) {
      showToast('Please enter a valid Commission % (0 - 100)');
      return;
    }

    if (editingId) {
      setGridItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                gridFor: selectedGridFor,
                entityName: selectedEntity,
                companyName,
                policyType,
                policySubType,
                validFrom: validFrom || '01/05/2026',
                commissionPercent: commVal,
              }
            : item
        )
      );
      setEditingId(null);
      showToast(`Commission details updated successfully for ${selectedEntity}`);
    } else {
      const newItem: NonMotorCommissionGridItem = {
        id: Date.now(),
        gridFor: selectedGridFor,
        entityName: selectedEntity,
        companyName,
        policyType,
        policySubType,
        validFrom: validFrom || '01/05/2026',
        commissionPercent: commVal,
        status: 'ACTIVE',
      };
      setGridItems((prev) => [newItem, ...prev]);
      showToast(`Commission configured for ${companyName} (${policySubType})`);
    }

    // Reset Form fields
    setCompanyName('');
    setPolicyType('');
    setPolicySubType('');
    setCommissionPercent('');
  };

  const handleEdit = (item: NonMotorCommissionGridItem) => {
    setEditingId(item.id);
    setSelectedGridFor(item.gridFor);
    setSelectedEntity(item.entityName);
    setCompanyName(item.companyName);
    setPolicyType(item.policyType);
    setPolicySubType(item.policySubType);
    setValidFrom(item.validFrom);
    setCommissionPercent(item.commissionPercent.toString());
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this commission grid entry?')) {
      setGridItems((prev) => prev.filter((i) => i.id !== id));
      showToast('Commission entry deleted');
    }
  };

  const handleReset = () => {
    setSelectedGridFor('Broker');
    setSelectedEntity(mockCommissionEntities['Broker'][0] || '');
    setCompanyName('');
    setPolicyType('');
    setPolicySubType('');
    setCommissionPercent('');
    setEditingId(null);
    setSearchQuery('');
    showToast('Filters and form reset to default');
  };

  // Filtered rows for the table
  const filteredItems = gridItems.filter((item) => {
    const matchesSearch =
      item.entityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.policyType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.policySubType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* CARD 1: Commission Grid For Selector (Screenshot 1 Top) */}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border p-5 transition-all">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Left: Radio Options */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-brand-navy tracking-wide uppercase flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-primary" />
              Commission Grid For
            </label>
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
              {gridOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer select-none group"
                >
                  <input
                    type="radio"
                    name="commissionGridFor"
                    value={opt}
                    checked={selectedGridFor === opt}
                    onChange={() => handleGridForChange(opt)}
                    className="w-4 h-4 text-brand-primary border-slate-300 focus:ring-brand-primary focus:ring-offset-0 cursor-pointer"
                  />
                  <span
                    className={`transition-colors ${
                      selectedGridFor === opt
                        ? 'text-brand-primary font-semibold'
                        : 'text-slate-600 group-hover:text-brand-primary'
                    }`}
                  >
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Right: Target Dropdown + Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-[220px]">
              <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                {selectedGridFor.toUpperCase()}
              </label>
              <select
                value={selectedEntity}
                onChange={(e) => setSelectedEntity(e.target.value)}
                className="w-full h-9 rounded-lg border border-brand-border bg-white px-3 text-xs font-medium text-slate-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary shadow-xs"
              >
                {(mockCommissionEntities[selectedGridFor] || []).map((ent) => (
                  <option key={ent} value={ent}>
                    {ent}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end gap-2 pt-5">
              <button
                type="button"
                onClick={() => showToast(`Viewing Commission Grid for ${selectedEntity}`)}
                className="h-9 px-5 bg-brand-primary hover:bg-[#1D4ED8] active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                View
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="h-9 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 border border-brand-border text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw size={13} />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 2: Commission Details Form (Screenshot 1 Bottom) */}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden">
        {/* Banner Strip: » Commission Details */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-brand-primary font-bold text-sm">»</span>
            <h2 className="text-xs font-bold text-brand-navy tracking-wide uppercase">
              {editingId ? 'Edit Commission Details' : 'Commission Details'}
            </h2>
          </div>
          {editingId && (
            <span className="text-[11px] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full text-brand-primary font-semibold">
              Editing Record #{editingId}
            </span>
          )}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Company Name
              </label>
              <select
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner"
              >
                <option value="">--Select Company--</option>
                {mockInsuranceCompanies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Policy Type */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Policy Type
              </label>
              <select
                value={policyType}
                onChange={(e) => {
                  setPolicyType(e.target.value);
                  setPolicySubType('');
                }}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner"
              >
                <option value="">--Select Insurance Type--</option>
                {Array.from(new Set(initialInsuranceTypes.map((t) => t.insuranceType))).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Policy Sub Type */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Policy Sub Type
              </label>
              <select
                value={policySubType}
                onChange={(e) => setPolicySubType(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner"
              >
                <option value="">--Select Insurance Sub Type--</option>
                {Array.from(new Set(availableSubTypes.map((st) => st.insuranceSubType))).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Valid From */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Valid From
              </label>
              <input
                type="text"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner"
              />
            </div>

            {/* Commission(%) */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Commission(%)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={commissionPercent}
                  onChange={(e) => setCommissionPercent(e.target.value)}
                  placeholder="e.g. 15.00"
                  className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 pr-8 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner"
                />
                <Percent size={13} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-5 flex items-center gap-3">
            <button
              type="submit"
              className="h-9 px-6 bg-brand-primary hover:bg-[#1D4ED8] active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {editingId ? <CheckCircle2 size={14} /> : <Plus size={14} />}
              {editingId ? 'Update Commission' : 'Submit'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setCommissionPercent('');
                }}
                className="h-9 px-4 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* CARD 3: Configured Commission Rules Table */}
      <div className="bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden">
        {/* Table Top Bar */}
        <div className="p-3.5 border-b border-brand-border bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-primary" />
            <h3 className="text-xs font-bold text-brand-navy uppercase tracking-wider">
              Active Non Motor Commission Grid ({filteredItems.length})
            </h3>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search grid rules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 rounded-lg border border-brand-border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-brand-lightbg text-brand-navy text-[12px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
              <tr>
                <th className="py-3 px-3 font-semibold text-brand-navy">#</th>
                <th className="py-3 px-3 font-semibold text-brand-navy">Grid For</th>
                <th className="py-3 px-3 font-semibold text-brand-navy">Entity Name</th>
                <th className="py-3 px-3 font-semibold text-brand-navy">Company Name</th>
                <th className="py-3 px-3 font-semibold text-brand-navy">Policy Type</th>
                <th className="py-3 px-3 font-semibold text-brand-navy">Policy Sub Type</th>
                <th className="py-3 px-3 font-semibold text-brand-navy">Valid From</th>
                <th className="py-3 px-3 text-right font-semibold text-brand-navy">Commission (%)</th>
                <th className="py-3 px-3 text-center font-semibold text-brand-navy">Status</th>
                <th className="py-3 px-3 text-center font-semibold text-brand-navy">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-white text-slate-800">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400 font-medium">
                    NO DATA FOUND
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-brand-mainbg transition-colors bg-white">
                    <td className="py-2.5 px-3 text-slate-500 font-medium">{idx + 1}</td>
                    <td className="py-2.5 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-brand-primary border border-blue-200">
                        {item.gridFor}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.entityName}</td>
                    <td className="py-2.5 px-3 text-slate-700 font-medium">{item.companyName}</td>
                    <td className="py-2.5 px-3 font-semibold text-brand-primary">{item.policyType}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.policySubType}</td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">{item.validFrom}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-600 font-mono text-xs">
                      {item.commissionPercent.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="p-1 rounded text-brand-primary hover:bg-blue-100 transition-colors"
                          title="Edit Rule"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="p-1 rounded text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete Rule"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default NonMotorCommissionTab;
