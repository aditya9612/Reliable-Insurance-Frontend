import React, { useState } from 'react';
import {
  Search, Download, DollarSign, Percent, FileText, CheckCircle2,
  Clock, AlertCircle, Filter, Calendar
} from 'lucide-react';
import { NonMotorCommissionReportRecord } from '../types';
import { initialNonMotorCommissionReports } from '../mockData';

interface NonMotorCommissionReportTabProps {
  showToast: (msg: string) => void;
}

const months = [
  '--Select Month Name--',
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const financialYears = ['2024', '2025', '2026', '2026-2027'];

export const NonMotorCommissionReportTab: React.FC<NonMotorCommissionReportTabProps> = ({ showToast }) => {
  const [reports, setReports] = useState<NonMotorCommissionReportRecord[]>(initialNonMotorCommissionReports);
  const [selectedMonth, setSelectedMonth] = useState('October');
  const [selectedFy, setSelectedFy] = useState('2024');
  const [searchEmp, setSearchEmp] = useState('');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'Approved' | 'Pending' | 'Cancelled'>('ALL');

  const handleViewApproval = () => {
    setFilterStatus('Approved');
    showToast(`Showing approved non-motor commission reports for FY ${selectedFy} - ${selectedMonth}`);
  };

  const handleCancelPending = () => {
    setFilterStatus('Pending');
    showToast(`Showing pending approval records for FY ${selectedFy} - ${selectedMonth}`);
  };

  const filteredReports = reports.filter(r => {
    const matchesMonth = selectedMonth === '--Select Month Name--' || r.month === selectedMonth;
    const matchesFy = !selectedFy || r.financialYear === selectedFy;
    const matchesStatus = filterStatus === 'ALL' || r.status === filterStatus;
    const matchesEmp =
      !searchEmp.trim() ||
      r.salesExecutive.toLowerCase().includes(searchEmp.toLowerCase()) ||
      r.clientName.toLowerCase().includes(searchEmp.toLowerCase()) ||
      r.policyNo.toLowerCase().includes(searchEmp.toLowerCase()) ||
      r.voucherNo.toLowerCase().includes(searchEmp.toLowerCase());

    return matchesMonth && matchesFy && matchesStatus && matchesEmp;
  });

  const totalGross = filteredReports.reduce((acc, r) => acc + r.grossPremium, 0);
  const totalComm = filteredReports.reduce((acc, r) => acc + r.commAmount, 0);
  const totalTds = filteredReports.reduce((acc, r) => acc + r.tdsAmount, 0);
  const totalNet = filteredReports.reduce((acc, r) => acc + r.netPayable, 0);

  const handleExportCSV = () => {
    const headers = [
      'VOUCHER NO,DATE,POLICY NO,CLIENT NAME,INSURANCE TYPE,SUB TYPE,COMPANY,BRANCH,SALES EXECUTIVE,GROSS PREMIUM,NET PREMIUM,COMM %,COMM AMOUNT,TDS %,TDS AMOUNT,NET PAYABLE,STATUS'
    ];
    const rows = filteredReports.map(r =>
      `"${r.voucherNo}","${r.date}","${r.policyNo}","${r.clientName}","${r.insuranceType}","${r.subType}","${r.companyName}","${r.branch}","${r.salesExecutive}","${r.grossPremium}","${r.netPremium}","${r.commPercent}%","${r.commAmount}","${r.tdsPercent}%","${r.tdsAmount}","${r.netPayable}","${r.status}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `non_motor_commission_report_${selectedFy}_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Non-motor commission report exported.');
  };

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* ========================================================= */}
      {/* TOP FILTER CARD (matching the exact layout from photo)    */}
      {/* ========================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-3.5">
        <div className="flex flex-wrap items-end gap-3.5">
          {/* Month Dropdown */}
          <div className="w-full sm:w-48">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Month Name
            </label>
            <select
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
            >
              {months.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Financial Year Dropdown */}
          <div className="w-full sm:w-40">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Financial Year
            </label>
            <select
              value={selectedFy}
              onChange={e => setSelectedFy(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary font-medium"
            >
              {financialYears.map(fy => (
                <option key={fy} value={fy}>{fy}</option>
              ))}
            </select>
          </div>

          {/* View Approval & Cancel/Pending Buttons (matching photo colors) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleViewApproval}
              className="px-6 py-2 bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
            >
              view Approval
            </button>
            <button
              onClick={handleCancelPending}
              className="px-6 py-2 bg-brand-navydark hover:bg-slate-800 text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
            >
              cancel/Pending
            </button>
            <button
              onClick={() => {
                setFilterStatus('ALL');
                showToast('Reset report filters to show all.');
              }}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-md transition-colors cursor-pointer"
            >
              Show All
            </button>
          </div>
        </div>

        {/* Search Emp Name Input (as shown in photo) */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchEmp}
              onChange={e => setSearchEmp(e.target.value)}
              placeholder="Search Emp Name Here"
              className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-md shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* KPI METRIC CARDS                                         */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Gross Premium</p>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              ₹{totalGross.toLocaleString('en-IN')}
            </h3>
            <span className="text-[11px] text-slate-500">{filteredReports.length} Policies</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center">
            <DollarSign size={20} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Total Commission</p>
            <h3 className="text-lg font-bold text-emerald-700 mt-0.5">
              ₹{totalComm.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-emerald-600 font-medium">Gross payout pool</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Percent size={20} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">TDS Deducted (5%)</p>
            <h3 className="text-lg font-bold text-amber-700 mt-0.5">
              ₹{totalTds.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-amber-600 font-medium">Under Section 194H</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <FileText size={20} />
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Net Commission Payable</p>
            <h3 className="text-lg font-bold text-blue-700 mt-0.5">
              ₹{totalNet.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </h3>
            <span className="text-[11px] text-blue-600 font-medium">Cleared for payout</span>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* LEDGER TABLE IN BLUE THEME                                */}
      {/* ========================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-brand-primary text-white font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 px-3">Voucher No</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Policy No</th>
                <th className="py-2.5 px-4 min-w-[200px]">Client / Insured</th>
                <th className="py-2.5 px-3">Insurance Type</th>
                <th className="py-2.5 px-3">Company</th>
                <th className="py-2.5 px-3">Executive</th>
                <th className="py-2.5 px-3 text-right">Gross Prem (₹)</th>
                <th className="py-2.5 px-3 text-right">Comm %</th>
                <th className="py-2.5 px-3 text-right">Comm (₹)</th>
                <th className="py-2.5 px-3 text-right">TDS (₹)</th>
                <th className="py-2.5 px-3 text-right font-bold">Net Payable (₹)</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan={13} className="py-8 text-center text-slate-400">
                    <AlertCircle size={26} className="mx-auto mb-1 text-slate-300" />
                    No non-motor commission report entries found.
                  </td>
                </tr>
              ) : (
                filteredReports.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-mono font-bold text-brand-primary">{item.voucherNo}</td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono">{item.date}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{item.policyNo}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-900">{item.clientName}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.insuranceType}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.companyName}</td>
                    <td className="py-2.5 px-3 font-medium">{item.salesExecutive}</td>
                    <td className="py-2.5 px-3 text-right font-medium">₹{item.grossPremium.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-800">{item.commPercent}%</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                      ₹{item.commAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 text-right text-amber-700">
                      ₹{item.tdsAmount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                      ₹{item.netPayable.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.status === 'Pending'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Non-Motor Commission Statement ({selectedMonth} {selectedFy})</span>
          <span className="font-semibold text-slate-700">
            Total Net Payout: ₹{totalNet.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
};
