import React, { useState } from 'react';
import { DollarSign, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';

interface AgentPaymentTabProps {
  onBack?: () => void;
}

export const AgentPaymentTab: React.FC<AgentPaymentTabProps> = ({ onBack }) => {
  const [selectedMonth, setSelectedMonth] = useState('OCT');
  const [selectedYear, setSelectedYear] = useState('2026-2027');

  const months = [
    'ALL', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  const financialYears = [
    '2026-2027',
    '2025-2026',
    '2024-2025',
    '2023-2024',
  ];

  // Stats matching Legacy ERP
  const stats = {
    totalCommission: '16524928',
    totalCommissionPaid: '15855125',
    totalCommissionUnpaid: '669803',
  };

  const handleView = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
  };

  return (
    <div className="space-y-4 w-full font-sans pb-10">
      {/* Container Card */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden w-full">
        {/* Banner Header Toolbar */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Agent Payment
          </span>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-lg transition-colors cursor-pointer border border-brand-border flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          )}
        </div>

        {/* Filter Toolbar */}
        <div className="p-5 border-b border-brand-border">
          <form onSubmit={handleView} className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Month Filter */}
            <div className="flex items-center gap-2.5">
              <label className="text-xs text-brand-navy font-bold whitespace-nowrap">
                Month
              </label>
              <div className="relative">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-36 sm:w-44 px-3 py-2 bg-white border border-brand-border rounded-lg text-xs text-brand-navy font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer h-9"
                >
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-brand-muted text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Financial Year Filter */}
            <div className="flex items-center gap-2.5">
              <label className="text-xs text-brand-navy font-bold whitespace-nowrap">
                Financial Year
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-40 sm:w-48 px-3 py-2 bg-white border border-brand-border rounded-lg text-xs text-brand-navy font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none pr-8 cursor-pointer h-9"
                >
                  {financialYears.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-brand-muted text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Action Buttons: View */}
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-6 h-9 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer border-none"
              >
                View
              </button>
            </div>
          </form>
        </div>

        {/* 3 Full-Width Summary Stat Cards — No large side spaces */}
        <div className="p-5 bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Card 1: Agent Total Commission */}
            <div className="bg-brand-lightbg hover:bg-[#dbe7fd] border border-brand-border rounded-[12px] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all flex items-center gap-3.5">
              <div className="p-2.5 bg-white rounded-xl text-brand-primary shadow-xs border border-brand-border/60 shrink-0">
                <DollarSign size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  Agent Total Commission
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-brand-primary font-mono mt-0.5 truncate">
                  {stats.totalCommission}
                </p>
              </div>
            </div>

            {/* Card 2: Agent Total Commission Paid */}
            <div className="bg-brand-lightbg hover:bg-[#dbe7fd] border border-brand-border rounded-[12px] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all flex items-center gap-3.5">
              <div className="p-2.5 bg-white rounded-xl text-emerald-600 shadow-xs border border-brand-border/60 shrink-0">
                <CheckCircle2 size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  Agent Total Commission Paid
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-emerald-700 font-mono mt-0.5 truncate">
                  {stats.totalCommissionPaid}
                </p>
              </div>
            </div>

            {/* Card 3: Agent Total Commission UnPaid */}
            <div className="bg-brand-lightbg hover:bg-[#dbe7fd] border border-brand-border rounded-[12px] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all flex items-center gap-3.5">
              <div className="p-2.5 bg-white rounded-xl text-amber-600 shadow-xs border border-brand-border/60 shrink-0">
                <Clock size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 truncate">
                  Agent Total Commission UnPaid
                </p>
                <p className="text-lg sm:text-xl font-extrabold text-amber-700 font-mono mt-0.5 truncate">
                  {stats.totalCommissionUnpaid}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentPaymentTab;
