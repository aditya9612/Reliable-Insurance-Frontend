import React, { useState } from 'react';
import { Edit2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface DepartmentItem {
    id: number;
    organizationName: string;
    departmentName: string;
    location: string;
}

const ORGANIZATIONS = [
    'JPB CONSULTANCY PVT LTD',
    'SHARVARI MARKETING',
    'SHARVARI MOTORS',
    'RELIABLE ASSOCIATES INSURANCE BROKERS PVT LTD'
];

const INITIAL_DEPARTMENTS: DepartmentItem[] = [
    { id: 1, organizationName: 'JPB CONSULTANCY PVT LTD', departmentName: 'BACK OFFICE', location: 'BARAMATI' },
    { id: 2, organizationName: 'JPB CONSULTANCY PVT LTD', departmentName: 'SALES', location: 'BARAMATI' },
    { id: 3, organizationName: 'JPB CONSULTANCY PVT LTD', departmentName: 'OPERATION', location: 'BARAMATI' },
    { id: 4, organizationName: 'JPB CONSULTANCY PVT LTD', departmentName: 'ACCOUNT', location: 'BARAMATI' },
    { id: 5, organizationName: 'JPB CONSULTANCY PVT LTD', departmentName: 'IT', location: 'BARAMATI' },
    { id: 6, organizationName: 'JPB CONSULTANCY PVT LTD', departmentName: 'SENIOR MANAGEMENT', location: 'BARAMATI' },
    { id: 7, organizationName: 'JPB CONSULTANCY PVT LTD', departmentName: 'HR', location: 'BARAMATI' },
    { id: 8, organizationName: 'SHARVARI MARKETING', departmentName: 'SALES', location: 'BARAMATI' },
    { id: 9, organizationName: 'SHARVARI MARKETING', departmentName: 'OPERATION', location: 'BARAMATI' },
    { id: 10, organizationName: 'SHARVARI MARKETING', departmentName: 'ACCOUNT', location: 'BARAMATI' },
    { id: 11, organizationName: 'SHARVARI MARKETING', departmentName: 'IT', location: 'BARAMATI' },
    { id: 12, organizationName: 'SHARVARI MARKETING', departmentName: 'SENIOR MANAGEMENT', location: 'BARAMATI' },
    { id: 13, organizationName: 'SHARVARI MARKETING', departmentName: 'HR', location: 'BARAMATI' },
    { id: 14, organizationName: 'SHARVARI MARKETING', departmentName: 'BACK OFFICE', location: 'BARAMATI' },
];

export const DepartmentMasterTab: React.FC = () => {
    const [departments, setDepartments] = useState<DepartmentItem[]>(INITIAL_DEPARTMENTS);

    // Form inputs matching Photo 2
    const [selectedOrganization, setSelectedOrganization] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [departmentLocation, setDepartmentLocation] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleSave = () => {
        if (!selectedOrganization) {
            showToast('Please select Organization Name', 'warning');
            return;
        }
        if (!departmentName.trim()) {
            showToast('Please enter Department Name', 'warning');
            return;
        }

        if (editingId !== null) {
            setDepartments(prev =>
                prev.map(item =>
                    item.id === editingId
                        ? {
                              ...item,
                              organizationName: selectedOrganization,
                              departmentName: departmentName.trim().toUpperCase(),
                              location: departmentLocation.trim().toUpperCase() || 'BARAMATI'
                          }
                        : item
                )
            );
            showToast(`Department "${departmentName.trim().toUpperCase()}" updated successfully`, 'success');
            setEditingId(null);
        } else {
            const nextId = departments.length > 0 ? Math.max(...departments.map(d => d.id)) + 1 : 1;
            const newItem: DepartmentItem = {
                id: nextId,
                organizationName: selectedOrganization,
                departmentName: departmentName.trim().toUpperCase(),
                location: departmentLocation.trim().toUpperCase() || 'BARAMATI'
            };
            setDepartments(prev => [...prev, newItem]);
            showToast(`Department "${departmentName.trim().toUpperCase()}" added successfully`, 'success');
        }

        // Reset
        setSelectedOrganization('');
        setDepartmentName('');
        setDepartmentLocation('');
    };

    const handleEdit = (item: DepartmentItem) => {
        setEditingId(item.id);
        setSelectedOrganization(item.organizationName);
        setDepartmentName(item.departmentName);
        setDepartmentLocation(item.location);
        showToast(`Editing department "${item.departmentName}"`, 'success');
    };

    return (
        <div className="tab-transition-wrapper space-y-5 w-full min-w-0">
            {/* Toast Notification */}
            {toast && (
                <div
                    className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-2xl border text-white text-sm font-medium animate-in fade-in slide-in-from-top-4 duration-200 ${
                        toast.type === 'warning'
                            ? 'bg-[#1E293B] border-amber-500/40 text-amber-200'
                            : 'bg-[#0B203C] border-blue-500/40 text-blue-100'
                    }`}
                >
                    {toast.type === 'warning' ? (
                        <AlertCircle size={18} className="text-amber-400 shrink-0" />
                    ) : (
                        <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    )}
                    <span>{toast.message}</span>
                </div>
            )}

            {/* 2-COLUMN LAYOUT MATCHING PHOTO 2 - FULL WIDTH */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full min-w-0">
                {/* LEFT CARD: DEPARTMENT DETAILS */}
                <div className="lg:col-span-4 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
                    {/* Header Banner: »Deparment Details in Light Blue Theme */}
                    <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-5 py-3 flex items-center shadow-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                            <span className="text-brand-primary text-lg font-bold">»</span>
                            <span>Department Details</span>
                        </div>
                    </div>

                    {/* Card Form matching Photo 2 */}
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Organization
                            </label>
                            <select
                                value={selectedOrganization}
                                onChange={(e) => setSelectedOrganization(e.target.value)}
                                className="w-full px-3.5 py-2.5 bg-white border border-[#CBD5E1] rounded-[8px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer font-medium"
                            >
                                <option value="">--Select Organization Name--</option>
                                {ORGANIZATIONS.map(org => (
                                    <option key={org} value={org}>
                                        {org}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Deparment Name
                            </label>
                            <input
                                type="text"
                                value={departmentName}
                                onChange={(e) => setDepartmentName(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Deparment Location
                            </label>
                            <textarea
                                rows={3}
                                value={departmentLocation}
                                onChange={(e) => setDepartmentLocation(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-[10px] text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium resize-y"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-8 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[100px] text-center"
                            >
                                {editingId !== null ? 'Update' : 'Save'}
                            </button>

                            {editingId !== null && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditingId(null);
                                        setSelectedOrganization('');
                                        setDepartmentName('');
                                        setDepartmentLocation('');
                                    }}
                                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[13px] rounded-[6px] transition cursor-pointer border-none"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: DEPARTMENT TABLE MATCHING POLICY MASTER BLUE THEME */}
                <div className="lg:col-span-8 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                    <th className="py-3 px-4">ORGANIZATION NAME</th>
                                    <th className="py-3 px-4">DEPARTMENT NAME</th>
                                    <th className="py-3 px-4">LOCATION</th>
                                    <th className="py-3 px-3 text-center w-12">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-[13px] font-medium text-slate-700">
                                {departments.map((dept) => (
                                    <tr
                                        key={dept.id}
                                        className="hover:bg-brand-mainbg transition-colors bg-white h-[48px]"
                                    >
                                        <td className="py-2.5 px-4 font-medium text-slate-700">
                                            {dept.organizationName}
                                        </td>
                                        <td className="py-2.5 px-4 font-semibold text-brand-navy">
                                            {dept.departmentName}
                                        </td>
                                        <td className="py-2.5 px-4 text-slate-600">
                                            {dept.location}
                                        </td>
                                        <td className="py-2.5 px-3 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(dept)}
                                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                                title="Edit Department"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartmentMasterTab;
