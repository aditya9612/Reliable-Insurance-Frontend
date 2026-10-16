import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface DesignationItem {
    id: number;
    designation: string;
}

const INITIAL_DESIGNATIONS: DesignationItem[] = [
    { id: 1, designation: 'HR' },
    { id: 2, designation: 'ACCOUNT ASSISTANT' },
    { id: 3, designation: 'AREA MANAGER' },
    { id: 4, designation: 'ASST. BODY SHOP MANAGER' },
    { id: 5, designation: 'BACK OFFICE EXECUTIVE' },
    { id: 6, designation: 'BODY SHOP ADVISOR' },
    { id: 7, designation: 'DIRECTOR' },
    { id: 8, designation: 'FLOOR SUPERVISOR' },
    { id: 9, designation: 'GENERAL MANAGER' },
    { id: 10, designation: 'ADMIN & HR MANAGER' },
    { id: 11, designation: 'IT ENGINEER' },
    { id: 12, designation: 'IT- SUPPORT' },
    { id: 13, designation: 'LOCATION HEAD' },
    { id: 14, designation: 'MANAGER' },
];

export const DesignationMasterTab: React.FC = () => {
    const [designations, setDesignations] = useState<DesignationItem[]>(INITIAL_DESIGNATIONS);

    // Form inputs matching Photo 3
    const [designationName, setDesignationName] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleSave = () => {
        if (!designationName.trim()) {
            showToast('Please enter Designation', 'warning');
            return;
        }

        const nameUpper = designationName.trim().toUpperCase();

        if (editingId !== null) {
            setDesignations(prev =>
                prev.map(item =>
                    item.id === editingId
                        ? { ...item, designation: nameUpper }
                        : item
                )
            );
            showToast(`Designation "${nameUpper}" updated successfully`, 'success');
            setEditingId(null);
        } else {
            const nextId = designations.length > 0 ? Math.max(...designations.map(d => d.id)) + 1 : 1;
            const newItem: DesignationItem = {
                id: nextId,
                designation: nameUpper
            };
            setDesignations(prev => [...prev, newItem]);
            showToast(`Designation "${nameUpper}" added successfully`, 'success');
        }

        // Reset
        setDesignationName('');
    };

    const handleEdit = (item: DesignationItem) => {
        setEditingId(item.id);
        setDesignationName(item.designation);
        showToast(`Editing designation "${item.designation}"`, 'success');
    };

    const handleDelete = (id: number, name: string) => {
        setDesignations(prev => prev.filter(item => item.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setDesignationName('');
        }
        showToast(`Designation "${name}" deleted`, 'warning');
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

            {/* 2-COLUMN LAYOUT MATCHING PHOTO 3 - FULL WIDTH */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full min-w-0">
                {/* LEFT CARD: DESIGNATION MASTER FORM */}
                <div className="lg:col-span-4 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
                    {/* Header Banner: »Designation Master Form in Light Blue Theme */}
                    <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-5 py-3 flex items-center shadow-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                            <span className="text-brand-primary text-lg font-bold">»</span>
                            <span>Designation Master Form</span>
                        </div>
                    </div>

                    {/* Card Form matching Photo 3 */}
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Designation
                            </label>
                            <input
                                type="text"
                                value={designationName}
                                onChange={(e) => setDesignationName(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
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
                                        setDesignationName('');
                                    }}
                                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[13px] rounded-[6px] transition cursor-pointer border-none"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: DESIGNATION TABLE MATCHING POLICY MASTER BLUE THEME */}
                <div className="lg:col-span-8 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                    <th className="py-3 px-4">DESIGNATION</th>
                                    <th className="py-3 px-3 text-center w-12"></th>
                                    <th className="py-3 px-4 text-center w-28">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-[13px] font-medium text-slate-700">
                                {designations.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-brand-mainbg transition-colors bg-white h-[48px]"
                                    >
                                        <td className="py-2.5 px-4 font-semibold text-brand-navy">
                                            {item.designation}
                                        </td>
                                        <td className="py-2.5 px-3 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(item)}
                                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                                title="Edit Designation"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </td>
                                        <td className="py-2.5 px-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(item.id, item.designation)}
                                                className="inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] font-bold text-xs uppercase transition-colors p-1 rounded hover:bg-blue-50 cursor-pointer border-none bg-transparent"
                                                title="Delete Designation"
                                            >
                                                <Trash2 size={15} />
                                                <span>DELETE</span>
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

export default DesignationMasterTab;
