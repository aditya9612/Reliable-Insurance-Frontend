import React, { useState } from 'react';
import { NonMotorRecalculationItem } from '../types';
import { initialRecalculationRecords } from '../mockData';
import {
  Calendar,
  CheckCircle2,
  RefreshCw,
  Search,
  Download,
  AlertCircle,
  FileText,
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
} from 'lucide-react';

interface NonMotorRecalculationTabProps {
  showToast: (msg: string) => void;
}

export const NonMotorRecalculationTab: React.FC<NonMotorRecalculationTabProps> = ({ showToast }) => {
  const [fromDate, setFromDate] = useState<string>('2026-10-14');
  const [toDate, setToDate] = useState<string>('2026-10-14');
  const [recalcDate, setRecalcDate] = useState<string>('14/10/2026');
  const [records, setRecords] = useState<NonMotorRecalculationItem[]>(initialRecalculationRecords);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Handle View Button (Date Range search)
  const handleView = () => {
    showToast(`Loaded records between ${fromDate} and ${toDate}`);
  };

  // Handle Recalculation Submit
  const handleRecalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recalcDate) {
      showToast('Please specify Date For Recalculation');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setRecords((prev) =>
        prev.map((r) => {
          if (r.status === 'Pending') {
            return {
              ...r,
              status: 'Recalculated',
              recalculatedDate: recalcDate,
              recalculatedBy: 'Clerk / Admin User',
            };
          }
          return r;
        })
      );
      setIsProcessing(false);
      showToast(`Recalculation completed successfully for target date ${recalcDate}`);
    }, 600);
  };

  // Quick Action: Approve recalculation
  const handleApprove = (id: number) => {
    setRecords((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r))
    );
    showToast('Recalculated ledger approved and locked');
  };

  const filteredRecords = records.filter(
    (r) =>
      r.policyNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.policyType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDiffAmount = filteredRecords.reduce((sum, r) => sum + r.diffAmount, 0);

  return (
    <div className="space-y-5">
      {/* 1. TOP OPERATIONS MATRIX / STATUS PILLS (Matching Screenshot 5 Top) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-3.5 px-5">
        <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs font-semibold">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600">Cash Back Approval</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white">
              75
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600">Pending Trans</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-800 text-white">
              68
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-100 text-blue-900">
              227607
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600">Cust Cheq Deposit</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white">
              2
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600">Receiving Amt</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-700 text-white">
              36
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600">Send Link</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-800 text-white">
              60
            </span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-100 text-blue-900">
              24657
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600">Support Request</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-500 text-white">
              0
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-600">Completed Entries</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white">
              111
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-blue-700">
            <Shield size={13} />
            <span className="text-[11px] font-bold uppercase tracking-wider">LOCK ID ACTIVE</span>
          </div>
        </div>
      </div>

      {/* 2. CARD 1: Date Range Filter (Screenshot 5 Middle) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5">
        <div className="flex flex-col sm:flex-row items-end gap-4 max-w-2xl">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              From Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-4 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner font-mono"
              />
            </div>
          </div>

          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              To Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full h-9 rounded-full border border-slate-300 bg-white px-4 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner font-mono"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleView}
            className="h-9 px-7 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            View
          </button>
        </div>
      </div>

      {/* 3. CARD 2: Date For Recalculation (Screenshot 5 Bottom) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-5">
        <form onSubmit={handleRecalculateSubmit} className="flex flex-col sm:flex-row items-end gap-4 max-w-xl">
          <div className="w-full sm:w-64">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Date For Recalculation
            </label>
            <input
              type="text"
              placeholder="dd/mm/yyyy"
              value={recalcDate}
              onChange={(e) => setRecalcDate(e.target.value)}
              className="w-full h-9 rounded-full border border-slate-300 bg-white px-4 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-inner font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="h-9 px-7 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-50"
          >
            <RefreshCw size={13} className={isProcessing ? 'animate-spin' : ''} />
            {isProcessing ? 'Recalculating...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* 4. RECALCULATION AUDIT & RESULTS TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
        {/* Table Top Bar */}
        <div className="p-4 border-b border-slate-200/80 bg-slate-50/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Recalculation Ledger ({filteredRecords.length})
            </h3>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Total Adjustment: ₹{totalDiffAmount.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={13} className="absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search policy, client, company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#102A4C] text-white uppercase text-[11px] font-semibold tracking-wider">
                <th className="py-2.5 px-3">Policy No</th>
                <th className="py-2.5 px-3">Client Name</th>
                <th className="py-2.5 px-3">Company</th>
                <th className="py-2.5 px-3">Policy Type</th>
                <th className="py-2.5 px-3">Sub Type</th>
                <th className="py-2.5 px-3 text-right">Net Premium</th>
                <th className="py-2.5 px-3 text-center">Old Comm %</th>
                <th className="py-2.5 px-3 text-center">New Comm %</th>
                <th className="py-2.5 px-3 text-right">Diff Amount</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-400 font-medium">
                    NO DATA FOUND
                  </td>
                </tr>
              ) : (
                filteredRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-semibold font-mono text-blue-700">
                      {r.policyNo}
                    </td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      {r.clientName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 text-[11px]">
                      {r.companyName}
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">
                      {r.policyType}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">
                      {r.policySubType}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-800">
                      ₹{r.netPremium.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-500">
                      {r.currentCommPercent.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-700">
                      {r.newCommPercent.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">
                      +₹{r.diffAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : r.status === 'Recalculated'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {r.status !== 'Approved' ? (
                        <button
                          type="button"
                          onClick={() => handleApprove(r.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm transition-colors"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Locked</span>
                      )}
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
export default NonMotorRecalculationTab;
