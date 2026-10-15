import React, { useState } from 'react';
import { InsuranceSubTypeItem } from '../types';
import {
  initialInsuranceSubTypes,
  initialInsuranceTypes,
  mockInsuranceCompanies,
} from '../mockData';
import {
  Save,
  Search,
  Trash2,
  Edit2,
  Filter,
  Layers,
} from 'lucide-react';

interface InsuranceSubTypeTabProps {
  showToast: (msg: string) => void;
}

export const InsuranceSubTypeTab: React.FC<InsuranceSubTypeTabProps> = ({ showToast }) => {
  const [subTypes, setSubTypes] = useState<InsuranceSubTypeItem[]>(initialInsuranceSubTypes);
  const [companyName, setCompanyName] = useState<string>('');
  const [parentType, setParentType] = useState<string>('');
  const [subTypeName, setSubTypeName] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('ALL');

  // Available unique insurance types
  const uniqueTypes = Array.from(
    new Set(initialInsuranceTypes.map((t) => t.insuranceType))
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName) {
      showToast('Please select Insurance Company Name');
      return;
    }
    if (!parentType) {
      showToast('Please select Insurance Type');
      return;
    }
    if (!subTypeName.trim()) {
      showToast('Please enter Insurance Sub Type');
      return;
    }

    if (editingId) {
      setSubTypes((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                insuranceCompany: companyName,
                insuranceType: parentType,
                insuranceSubType: subTypeName.trim().toUpperCase(),
              }
            : item
        )
      );
      setEditingId(null);
      showToast(`Updated Insurance Sub Type "${subTypeName.toUpperCase()}" successfully`);
    } else {
      const newItem: InsuranceSubTypeItem = {
        id: Date.now(),
        insuranceCompany: companyName,
        insuranceType: parentType,
        insuranceSubType: subTypeName.trim().toUpperCase(),
        status: 'ACTIVE',
      };
      setSubTypes((prev) => [newItem, ...prev]);
      showToast(`Added Insurance Sub Type "${subTypeName.toUpperCase()}" under ${parentType}`);
    }

    setSubTypeName('');
    setCompanyName('');
    setParentType('');
  };

  const handleEdit = (item: InsuranceSubTypeItem) => {
    setEditingId(item.id);
    setCompanyName(item.insuranceCompany);
    setParentType(item.insuranceType);
    setSubTypeName(item.insuranceSubType);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this Sub Type?')) {
      setSubTypes((prev) => prev.filter((i) => i.id !== id));
      showToast('Sub Type deleted');
    }
  };

  const filteredItems = subTypes.filter((item) => {
    const matchesSearch =
      item.insuranceSubType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.insuranceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.insuranceCompany.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'ALL' || item.insuranceType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Top Banner Stats */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-blue-50/70 border border-blue-100 rounded-lg p-2.5 px-4 text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5 text-blue-700">
          <Layers size={14} /> Total Sub Types Defined: <strong className="text-blue-900">{subTypes.length}</strong>
        </span>
        <span className="text-slate-500 font-normal">
          Mapped across {uniqueTypes.length} major insurance verticals
        </span>
      </div>

      {/* Grid: Left Form (approx 1/3) + Right Table (approx 2/3) matching Screenshot 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: » Insurance Sub Type Master Form */}
        <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 px-4 py-2.5 flex items-center justify-between text-white shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-blue-200 font-bold text-sm">»</span>
              <h2 className="text-xs font-bold tracking-wide uppercase">
                {editingId ? '» Edit Sub Type' : '» Insurance Sub Type Master'}
              </h2>
            </div>
            {editingId && (
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full text-blue-100 font-medium">
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

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Insurance Type
              </label>
              <select
                value={parentType}
                onChange={(e) => setParentType(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner"
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
              <input
                type="text"
                placeholder="e.g. INDIVIDUAL HEALTH, CPM"
                value={subTypeName}
                onChange={(e) => setSubTypeName(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-3.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner"
              />
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="h-9 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-1.5"
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
                    setParentType('');
                    setSubTypeName('');
                  }}
                  className="h-9 px-4 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Table matching Screenshot 3 */}
        <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
          {/* Table Header Filter Bar */}
          <div className="p-3 border-b border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter size={13} className="text-blue-600" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              >
                <option value="ALL">All Insurance Types</option>
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
                placeholder="Search sub types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 pl-8 pr-3 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto max-h-[560px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="bg-[#102A4C] text-white uppercase text-[11px] font-semibold tracking-wider">
                  <th className="py-2.5 px-4 w-44">INSURANCE TYPE</th>
                  <th className="py-2.5 px-4">INSURANCE SUB TYPE</th>
                  <th className="py-2.5 px-4 w-20 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/80">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-10 text-center text-slate-400 font-medium">
                      NO DATA FOUND
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-2.5 px-4 font-semibold text-blue-700 tracking-wide">
                        {item.insuranceType}
                      </td>
                      <td className="py-2.5 px-4 text-slate-800 font-medium">
                        {item.insuranceSubType}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="p-1 rounded text-blue-600 hover:bg-blue-100 transition-colors"
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InsuranceSubTypeTab;
