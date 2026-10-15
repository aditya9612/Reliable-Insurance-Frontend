import React, { useState } from 'react';
import { mockSalesExecutives } from '../analyticsData';

export const AnalyticDashboardExecutiveTab: React.FC = () => {
  const [selectedExecutive, setSelectedExecutive] = useState<string>('');
  const [financialYear, setFinancialYear] = useState<string>('2026-2027');

  const handleView = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* FILTER CARD */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden w-full">
        {/* Header Toolbar */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center justify-between">
          <span className="text-[13px] font-bold text-brand-navy tracking-wide uppercase">
            Analytic Dashboard - Sales Executive
          </span>
        </div>

        {/* Filter Form */}
        <form onSubmit={handleView} className="p-5">
          <div className="flex flex-col sm:flex-row items-end gap-4">
            {/* Sales Executive */}
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Sales Executive
              </label>
              <select
                value={selectedExecutive}
                onChange={(e) => setSelectedExecutive(e.target.value)}
                className="w-full h-9 rounded-lg border border-brand-border bg-white px-3.5 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary font-medium"
              >
                <option value="">--Select Sales Executive--</option>
                {mockSalesExecutives.map((exec) => (
                  <option key={exec} value={exec}>
                    {exec}
                  </option>
                ))}
              </select>
            </div>

            {/* Financial Year */}
            <div className="w-full sm:w-44">
              <label className="block text-xs font-semibold text-brand-navy mb-1.5">
                Financial Year
              </label>
              <select
                value={financialYear}
                onChange={(e) => setFinancialYear(e.target.value)}
                className="w-full h-9 rounded-lg border border-brand-border bg-white px-3 text-xs text-brand-navy focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
              >
                <option value="2026-2027">2026-2027</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2024-2025">2024-2025</option>
              </select>
            </div>

            {/* View Button */}
            <button
              type="submit"
              className="h-9 px-7 bg-brand-primary hover:bg-[#1D4ED8] active:scale-95 text-white text-xs font-semibold rounded-lg shadow-xs transition-all shrink-0 cursor-pointer border-none"
            >
              View
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnalyticDashboardExecutiveTab;
