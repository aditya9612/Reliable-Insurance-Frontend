import React, { useState } from 'react';
import { InsuranceTypeOfSubTypeItem } from '../types';
import {
  initialInsuranceTypeOfSubTypes,
  initialInsuranceTypes,
  initialInsuranceSubTypes,
  mockInsuranceCompanies,
} from '../mockData';
import {
  Save,
  Search,
  Trash2,
  Edit2,
  Filter,
  Layers,
  AlertCircle,
} from 'lucide-react';

interface InsuranceTypeOfSubTypeTabProps {
  showToast: (msg: string) => void;
}

export const InsuranceTypeOfSubTypeTab: React.FC<InsuranceTypeOfSubTypeTabProps> = ({ showToast }) => {
  const [items, setItems] = useState<InsuranceTypeOfSubTypeItem[]>(initialInsuranceTypeOfSubTypes);
  const [companyName, setCompanyName] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSubType, setSelectedSubType] = useState<string>('');
  const [typeOfSubType, setTypeOfSubType] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');

  const uniqueTypes = Array.from(new Set(initialInsuranceTypes.map((t) => t.insuranceType)));

  // Chained sub-types based on selectedType
  const availableSubTypes = initialInsuranceSubTypes.filter(
    (st) => !selectedType || st.insuranceType.toUpperCase() === selectedType.toUpperCase()
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName) {
      showToast('Please select Insurance Company Name');
      return;
    }
    if (!selectedType) {
      showToast('Please select Insurance Type');
      return;
    }
    if (!selectedSubType) {
      showToast('Please select Insurance Sub Type');
      return;
    }
    if (!typeOfSubType.trim()) {
      showToast('Please enter Insurance Type Of Sub Type');
      return;
    }

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                insuranceCompany: companyName,
                insuranceType: selectedType,
                insuranceSubType: selectedSubType,
                insuranceTypeOfSubType: typeOfSubType.trim().toUpperCase(),
              }
            : item
        )
      );
      setEditingId(null);
      showToast(`Updated "${typeOfSubType.toUpperCase()}" successfully`);
    } else {
      const newItem: InsuranceTypeOfSubTypeItem = {
        id: Date.now(),
        insuranceCompany: companyName,
        insuranceType: selectedType,
        insuranceSubType: selectedSubType,
        insuranceTypeOfSubType: typeOfSubType.trim().toUpperCase(),
        status: 'ACTIVE',
      };
      setItems((prev) => [newItem, ...prev]);
      showToast(`Added Type of Sub Type "${typeOfSubType.toUpperCase()}"`);
    }

    setTypeOfSubType('');
    setCompanyName('');
    setSelectedType('');
    setSelectedSubType('');
  };

  const handleEdit = (item: InsuranceTypeOfSubTypeItem) => {
    setEditingId(item.id);
    setCompanyName(item.insuranceCompany);
    setSelectedType(item.insuranceType);
    setSelectedSubType(item.insuranceSubType);
    setTypeOfSubType(item.insuranceTypeOfSubType);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this risk classification?')) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      showToast('Item deleted successfully');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.insuranceTypeOfSubType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.insuranceSubType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.insuranceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.insuranceCompany.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'ALL' || item.insuranceType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Top Banner Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-brand-border rounded-[12px] p-3 px-4 text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5 text-brand-primary">
          <Layers size={14} /> Granular Sub-Risk Classifications: <strong className="text-brand-navy">{items.length}</strong>
        </span>
        <span className="text-slate-500 font-normal">
          Tier-3 risk classifications for high-value commercial underwriting
        </span>
      </div>

      {/* Grid: Left Form (approx 1/3) + Right Table (approx 2/3) matching Screenshot 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: » Type of Sub Type Master Form */}
        <div className="lg:col-span-4 bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden">
          {/* Header Banner */}
          <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-brand-primary font-bold text-sm">»</span>
              <h2 className="text-xs font-bold text-brand-navy tracking-wide uppercase">
                {editingId ? 'Edit Type of Sub Type' : 'Type of Sub Type Master'}
              </h2>
            </div>
            {editingId && (
              <span className="text-[10px] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full text-brand-primary font-semibold">
                Edit Mode
              </span>
            )}
          </div>

          {/* Form Content */}
          <form onSubmit={handleSave} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Insurance Company Name
              </label>
              <select
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary shadow-inner"
              >
                <option value="">--Select Company--</option>
                {mockInsuranceCompanies.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Insurance Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setSelectedSubType('');
                }}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary shadow-inner"
              >
                <option value="">--Select Insurance Type--</option>
                {uniqueTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Insurance Sub Type
              </label>
              <select
                value={selectedSubType}
                onChange={(e) => setSelectedSubType(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary shadow-inner"
              >
                <option value="">--Select Insurance Sub Type--</option>
                {Array.from(new Set(availableSubTypes.map((st) => st.insuranceSubType))).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Insurance Type Of Sub Type
              </label>
              <input
                type="text"
                placeholder="e.g. COLD STORAGE & GRAIN WAREHOUSES"
                value={typeOfSubType}
                onChange={(e) => setTypeOfSubType(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary shadow-inner"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="h-9 px-6 bg-brand-primary hover:bg-[#1D4ED8] active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
              >
                <Save size={13} />
                {editingId ? 'Update' : 'Save'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setCompanyName('');
                    setSelectedType('');
                    setSelectedSubType('');
                    setTypeOfSubType('');
                  }}
                  className="h-9 px-4 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Table or NO DATA FOUND (as in Screenshot 4) */}
        <div className="lg:col-span-8 bg-white rounded-[12px] shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-brand-border overflow-hidden">
          {/* Header Filter Bar */}
          <div className="p-3.5 border-b border-brand-border bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter size={13} className="text-brand-primary" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-8 rounded-lg border border-brand-border bg-white px-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              >
                <option value="ALL">All Types</option>
                {uniqueTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span className="text-xs text-slate-500 font-medium">({filteredItems.length})</span>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={13} className="absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search risk types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 rounded-lg border border-brand-border text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
            </div>
          </div>

          {/* Table / NO DATA FOUND View */}
          {filteredItems.length === 0 ? (
            <div className="p-6">
              <div className="w-full bg-slate-50 border border-brand-border rounded-lg py-5 px-6 text-center text-slate-600 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                <AlertCircle size={15} className="text-slate-400" />
                NO DATA FOUND
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto max-h-[560px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 z-10 bg-brand-lightbg text-brand-navy text-[12px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                  <tr>
                    <th className="py-3 px-3 font-semibold text-brand-navy">TYPE OF SUB TYPE</th>
                    <th className="py-3 px-3 font-semibold text-brand-navy">INSURANCE SUB TYPE</th>
                    <th className="py-3 px-3 font-semibold text-brand-navy">INSURANCE TYPE</th>
                    <th className="py-3 px-3 font-semibold text-brand-navy">COMPANY</th>
                    <th className="py-3 px-3 w-16 text-center font-semibold text-brand-navy">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border bg-white text-slate-800">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-mainbg transition-colors bg-white">
                      <td className="py-2.5 px-3 font-semibold text-brand-primary">
                        {item.insuranceTypeOfSubType}
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 font-medium">
                        {item.insuranceSubType}
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-brand-primary border border-blue-200">
                          {item.insuranceType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                        {item.insuranceCompany}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="p-1 rounded text-brand-primary hover:bg-blue-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id)}
                            className="p-1 rounded text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default InsuranceTypeOfSubTypeTab;
