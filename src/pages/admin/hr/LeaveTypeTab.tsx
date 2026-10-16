import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface LeaveTypeItem {
    id: number;
    name: string;
}

const INITIAL_LEAVE_TYPES: LeaveTypeItem[] = [
    { id: 1, name: 'CL' },
    { id: 2, name: 'SL' },
    { id: 3, name: 'PL' },
    { id: 4, name: 'ML' },
];

export const LeaveTypeTab: React.FC = () => {
    // Form Inputs matching Photo 3 exactly
    const [leaveTypeName, setLeaveTypeName] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [types, setTypes] = useState<LeaveTypeItem[]>(INITIAL_LEAVE_TYPES);

    // Notification toast state
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // When "Save" button is clicked
    const handleSave = () => {
        if (!leaveTypeName.trim()) {
            showToast('Please enter Leave Type', 'warning');
            return;
        }

        const trimmed = leaveTypeName.trim().toUpperCase();

        if (editingId !== null) {
            setTypes(prev =>
                prev.map(t => (t.id === editingId ? { ...t, name: trimmed } : t))
            );
            showToast(`Leave Type updated to ${trimmed}`, 'success');
            setEditingId(null);
        } else {
            const nextId = types.length > 0 ? Math.max(...types.map(t => t.id)) + 1 : 1;
            setTypes(prev => [...prev, { id: nextId, name: trimmed }]);
            showToast(`Leave Type ${trimmed} added successfully`, 'success');
        }

        setLeaveTypeName('');
    };

    // When Edit pencil icon in table is clicked
    const handleEdit = (item: LeaveTypeItem) => {
        setEditingId(item.id);
        setLeaveTypeName(item.name);
        showToast(`Editing Leave Type: ${item.name}`, 'success');
    };

    // When Delete is clicked
    const handleDelete = (id: number) => {
        const item = types.find(t => t.id === id);
        setTypes(prev => prev.filter(t => t.id !== id));
        if (editingId === id) {
            setEditingId(null);
            setLeaveTypeName('');
        }
        showToast(`Deleted Leave Type: ${item?.name || 'Item'}`, 'warning');
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

            {/* 2-COLUMN LAYOUT MATCHING PHOTO 3 */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start w-full min-w-0">
                {/* LEFT CARD: LEAVE TYPE MASTER FORM */}
                <div className="md:col-span-5 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
                    {/* Header Banner: »Leave Type Master Form in Light Blue Theme */}
                    <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-5 py-3 flex items-center shadow-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                            <span className="text-brand-primary text-lg font-bold">»</span>
                            <span>Leave Type Master Form</span>
                        </div>
                    </div>

                    {/* Card Form */}
                    <div className="p-6 space-y-5">
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Leave Type
                            </label>
                            <input
                                type="text"
                                value={leaveTypeName}
                                onChange={(e) => setLeaveTypeName(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-[#F1F5F9] border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-1">
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
                                        setLeaveTypeName('');
                                    }}
                                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-[13px] rounded-[6px] transition cursor-pointer border-none"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT TABLE: MATCHING POLICY MASTER BLUE THEME */}
                <div className="md:col-span-7 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                <th className="py-3 px-4">LEAVE TYPE</th>
                                <th className="py-3 px-3 w-16 text-center"></th>
                                <th className="py-3 px-4 w-28 text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px]">
                            {types.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-brand-mainbg transition-colors bg-white h-[48px]"
                                >
                                    <td className="py-3 px-4 font-semibold text-brand-navy tracking-wide">
                                        {item.name}
                                    </td>
                                    <td className="py-3 px-3 text-center whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(item)}
                                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                            title="Edit Leave Type"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                    </td>
                                    <td className="py-3 px-4 text-center whitespace-nowrap">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(item.id)}
                                            className="inline-flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] font-bold text-xs uppercase cursor-pointer hover:bg-blue-50 px-2 py-1 rounded transition border-none bg-transparent"
                                            title="Delete Leave Type"
                                        >
                                            <Trash2 size={14} />
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
    );
};

export default LeaveTypeTab;
