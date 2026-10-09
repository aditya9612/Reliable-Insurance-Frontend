import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export interface HolidayItem {
    id: number;
    description: string;
    date: string;
}

const INITIAL_HOLIDAYS: HolidayItem[] = [
    { id: 1, description: 'PADWA', date: '08/03/2024 00:00:00' },
    { id: 2, description: 'MAHARASHTRA DIN', date: '01/05/2024 00:00:00' },
    { id: 3, description: 'INDEPENDENCE DAY', date: '15/08/2024 00:00:00' },
    { id: 4, description: 'GANESH CHATURTHI', date: '07/09/2024 00:00:00' },
    { id: 5, description: 'MAHATMA GANDHI JAYANTI', date: '02/10/2024 00:00:00' },
    { id: 6, description: 'DIWALI (LAXMI PUJAN)', date: '01/11/2024 00:00:00' },
    { id: 7, description: 'CHRISTMAS', date: '25/12/2024 00:00:00' },
    { id: 8, description: 'REPUBLIC DAY', date: '26/01/2025 00:00:00' }
];

const HolidayMasterTab: React.FC = () => {
    const [holidays, setHolidays] = useState<HolidayItem[]>(INITIAL_HOLIDAYS);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('09/10/2026');
    const [editingId, setEditingId] = useState<number | null>(null);

    // Toast Notification
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning' } | null>(null);

    const showToast = (message: string, type: 'success' | 'warning' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3500);
    };

    // Handle Edit Click
    const handleEdit = (item: HolidayItem) => {
        setEditingId(item.id);
        setDescription(item.description);
        // Strip the time part if present for cleaner editing
        const cleanDate = item.date.split(' ')[0] || item.date;
        setDate(cleanDate);
        showToast(`Editing holiday: ${item.description}`, 'success');
    };

    // Cancel Edit
    const handleCancelEdit = () => {
        setEditingId(null);
        setDescription('');
        setDate('09/10/2026');
    };

    // Handle Delete
    const handleDelete = (id: number) => {
        const item = holidays.find(h => h.id === id);
        setHolidays(prev => prev.filter(h => h.id !== id));
        if (editingId === id) {
            handleCancelEdit();
        }
        showToast(`Deleted holiday: ${item?.description || 'Item'}`, 'warning');
    };

    // Format date string to match ERP format: "DD/MM/YYYY 00:00:00"
    const formatErpDate = (rawDate: string): string => {
        const trimmed = rawDate.trim();
        if (trimmed.includes('00:00:00')) {
            return trimmed;
        }
        return `${trimmed} 00:00:00`;
    };

    // Handle Save / Update
    const handleSave = () => {
        if (!description.trim()) {
            showToast('Please enter Holiday Description', 'warning');
            return;
        }
        if (!date.trim()) {
            showToast('Please enter Date', 'warning');
            return;
        }

        const formattedDate = formatErpDate(date);

        if (editingId !== null) {
            setHolidays(prev =>
                prev.map(h =>
                    h.id === editingId
                        ? { ...h, description: description.trim().toUpperCase(), date: formattedDate }
                        : h
                )
            );
            showToast(`Updated holiday "${description.trim().toUpperCase()}" successfully`, 'success');
            setEditingId(null);
        } else {
            const newHoliday: HolidayItem = {
                id: Date.now(),
                description: description.trim().toUpperCase(),
                date: formattedDate
            };
            setHolidays(prev => [newHoliday, ...prev]);
            showToast(`Saved holiday "${newHoliday.description}" successfully`, 'success');
        }

        setDescription('');
        setDate('09/10/2026');
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

            {/* 2-COLUMN LAYOUT MATCHING USER SCREENSHOT IN BLUE THEME */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full min-w-0">
                {/* LEFT CARD: »Holiday Details (MATCHING SCREENSHOT) */}
                <div className="lg:col-span-4 xl:col-span-3.5 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Header Banner: »Holiday Details in Blue Theme */}
                    <div className="bg-brand-primary text-white px-5 py-3 flex items-center shadow-xs">
                        <div className="flex items-center gap-1.5 font-bold text-[15px] tracking-wide">
                            <span className="text-white/90 text-lg font-serif">»</span>
                            <span>Holiday Details</span>
                        </div>
                    </div>

                    {/* Card Form Body */}
                    <div className="p-6 space-y-5">
                        {/* 1. Holiday Description */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Holiday Description
                            </label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder=""
                                className="w-full px-4 py-2.5 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        {/* 2. Date */}
                        <div>
                            <label className="block text-[14px] font-medium text-slate-700 mb-2">
                                Date
                            </label>
                            <input
                                type="text"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                placeholder="DD/MM/YYYY"
                                className="w-full px-4 py-2.5 bg-white border border-[#CBD5E1] rounded-full text-[13px] text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary font-medium"
                            />
                        </div>

                        {/* 3. Action Buttons */}
                        <div className="pt-2 flex items-center gap-2.5">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="px-8 py-2.5 bg-[#004b93] hover:bg-[#003870] active:scale-95 text-white font-bold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none min-w-[90px] text-center"
                            >
                                {editingId ? 'Update' : 'Save'}
                            </button>

                            {editingId && (
                                <button
                                    type="button"
                                    onClick={handleCancelEdit}
                                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[13px] rounded-[6px] transition-all cursor-pointer border border-slate-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT TABLE: HOLIDAY DESCRIPTION, DATE, EDIT, DELETE (MATCHING SCREENSHOT) */}
                <div className="lg:col-span-8 xl:col-span-8.5 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-w-0">
                    <div className="w-full overflow-x-auto min-w-0">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="bg-brand-primary text-white font-bold text-[13px] tracking-wide uppercase border-b-2 border-blue-700 select-none">
                                    <th className="py-3 px-5 border-r border-white/20 whitespace-nowrap">
                                        HOLIDAY DESCRIPTION
                                    </th>
                                    <th className="py-3 px-5 border-r border-white/20 whitespace-nowrap">
                                        DATE
                                    </th>
                                    <th className="py-3 px-4 w-12 text-center border-r border-white/20">
                                        {/* Edit icon header */}
                                    </th>
                                    <th className="py-3 px-5 w-28 text-center">
                                        {/* Delete column header */}
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 text-[13px]">
                                {holidays.map((h, idx) => (
                                    <tr
                                        key={h.id}
                                        className={`transition-colors h-[48px] ${
                                            editingId === h.id
                                                ? 'bg-blue-50/80 font-medium'
                                                : idx % 2 === 0
                                                ? 'bg-white hover:bg-slate-50/70'
                                                : 'bg-slate-50/30 hover:bg-slate-50/70'
                                        }`}
                                    >
                                        {/* Description */}
                                        <td className="py-2.5 px-5 font-semibold text-slate-800 whitespace-nowrap">
                                            {h.description}
                                        </td>

                                        {/* Date */}
                                        <td className="py-2.5 px-5 text-slate-700 font-mono text-[13px] whitespace-nowrap">
                                            {h.date}
                                        </td>

                                        {/* Edit Button */}
                                        <td className="py-2.5 px-3 text-center whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => handleEdit(h)}
                                                className="text-[#00509d] hover:text-blue-700 p-1.5 rounded hover:bg-blue-100/50 transition-colors cursor-pointer border-none bg-transparent"
                                                title="Edit"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                        </td>

                                        {/* Delete Button matching screenshot with trash can + DELETE text */}
                                        <td className="py-2.5 px-4 text-center whitespace-nowrap">
                                            <button
                                                type="button"
                                                onClick={() => handleDelete(h.id)}
                                                className="inline-flex items-center gap-1.5 text-[#00509d] hover:text-rose-600 font-serif font-medium text-[13px] tracking-wide transition-colors cursor-pointer border-none bg-transparent p-1 rounded hover:bg-rose-50"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} className="shrink-0" />
                                                <span>DELETE</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {holidays.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-slate-400 text-sm">
                                            No holiday records available. Use the form on the left to add holidays.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HolidayMasterTab;
