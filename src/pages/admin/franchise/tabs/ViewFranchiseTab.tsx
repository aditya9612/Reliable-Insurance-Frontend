import React, { useState } from 'react';
import {
  Search, Download, Edit2, Eye, X, Building2, Phone, Mail,
  CheckCircle2, AlertCircle, FileSpreadsheet, Lock, Unlock, ArrowRight
} from 'lucide-react';
import { FranchiseItem } from '../types';

interface ViewFranchiseTabProps {
  franchises: FranchiseItem[];
  setFranchises?: React.Dispatch<React.SetStateAction<FranchiseItem[]>>;
  showToast: (msg: string) => void;
}

export const ViewFranchiseTab: React.FC<ViewFranchiseTabProps> = ({
  franchises,
  setFranchises,
  showToast
}) => {
  // Filter states
  const [activeTab, setActiveTab] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
  const [searchName, setSearchName] = useState('');

  // Password visibility toggle per row or global
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // View Modal state
  const [viewingFranchise, setViewingFranchise] = useState<FranchiseItem | null>(null);

  // Edit Modal state
  const [editingFranchise, setEditingFranchise] = useState<FranchiseItem | null>(null);

  const togglePasswordVisibility = (code: string) => {
    setShowPasswords(prev => ({ ...prev, [code]: !prev[code] }));
  };

  // Filtered by status and search
  const filteredFranchises = franchises.filter(item => {
    const matchesStatus = (item.status || 'ACTIVE') === activeTab;
    const matchesSearch =
      !searchName.trim() ||
      item.name.toLowerCase().includes(searchName.toLowerCase()) ||
      item.code.toLowerCase().includes(searchName.toLowerCase()) ||
      (item.city && item.city.toLowerCase().includes(searchName.toLowerCase())) ||
      (item.panNo && item.panNo.toLowerCase().includes(searchName.toLowerCase())) ||
      (item.mobile && item.mobile.includes(searchName));

    return matchesStatus && matchesSearch;
  });

  const activeCount = franchises.filter(f => (f.status || 'ACTIVE') === 'ACTIVE').length;
  const inactiveCount = franchises.filter(f => f.status === 'INACTIVE').length;

  // Handle EXIT (toggle status between active/inactive)
  const handleToggleExit = (item: FranchiseItem) => {
    const newStatus = item.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const confirmMsg = item.status === 'ACTIVE'
      ? `Are you sure you want to mark Franchise ${item.code} (${item.name}) as INACTIVE?`
      : `Reactivate Franchise ${item.code} (${item.name})?`;

    if (window.confirm(confirmMsg)) {
      if (setFranchises) {
        setFranchises(prev =>
          prev.map(f => (f.id === item.id ? { ...f, status: newStatus } : f))
        );
      }
      showToast(`Franchise ${item.code} marked as ${newStatus}.`);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'SR.NO.,CODE,NAME,ADDRESS,MOBILE NO,GENDER,MARITAL STATUS,PAN NO,AADHAR NO,DATE OF BIRTH,EMAIL-ID,BANK NAME,BANK BRANCH,IFSC_CODE,ACCOUNT NO,BRANCH,USER NAME,USER PASSWORD,USER ROLE,QUOTATION CO-ORDINATOR,INSPECTION CO-ORDINATOR,ENDROSMENT CO-ORDINATOR,CO-ORDINATOR,SALES EXECUTIVE,FRANCHISETDS,BUSINESS PROCESS,LINE OF BUSINESS,FUNCTION TYPE,DESIGNATION,CLASS,REPORTING,STATUS'
    ];

    const rows = filteredFranchises.map((f, idx) =>
      [
        idx + 1,
        `"${f.code}"`,
        `"${f.name}"`,
        `"${(f.address || `${f.addressLine1 || ''} ${f.addressLine2 || ''}`).replace(/"/g, '""')}"`,
        `"${f.mobile}"`,
        `"${f.gender || 'MALE'}"`,
        `"${f.maritalStatus || 'MARRIED'}"`,
        `"${f.panNo}"`,
        `"${f.aadharNo || ''}"`,
        `"${f.dob || ''}"`,
        `"${f.email}"`,
        `"${f.bankName || ''}"`,
        `"${f.bankBranch || ''}"`,
        `"${f.ifscCode || ''}"`,
        `"${f.accountNo || ''}"`,
        `"${f.branch || 'FRANCHISES'}"`,
        `"${f.username || ''}"`,
        `"${f.password || ''}"`,
        `"${f.userRole || 'FRANCHISE'}"`,
        `"${f.quotationCoordinator || ''}"`,
        `"${f.inspectionCoordinator || ''}"`,
        `"${f.endorsementCoordinator || ''}"`,
        `"${f.coordinator || ''}"`,
        `"${f.salesExecutive || ''}"`,
        `"${f.franchiseTds || f.agentTds || '2'}"`,
        `"${f.businessProcess || 'AGENCY'}"`,
        `"${f.lineOfBusiness || 'MOTOR'}"`,
        `"${f.functionType || 'SALES'}"`,
        `"${f.designation || 'RELATIONSHIP MANAGER'}"`,
        `"${f.classType || 'CLASS 6'}"`,
        `"${f.reporting || ''}"`,
        `"${f.status}"`
      ].join(',')
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `view_franchise_${activeTab.toLowerCase()}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${filteredFranchises.length} ${activeTab.toLowerCase()} franchises to CSV.`);
  };

  // Save inline edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFranchise) return;

    if (setFranchises) {
      setFranchises(prev =>
        prev.map(f => (f.id === editingFranchise.id ? editingFranchise : f))
      );
    }
    showToast(`Franchise ${editingFranchise.code} updated successfully.`);
    setEditingFranchise(null);
  };

  return (
    <div className="space-y-3.5 w-full min-w-0">
      {/* ========================================================= */}
      {/* TOP BAR: Search & Active/Inactive Franchise Toggle Tabs    */}
      {/* ========================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input on the left */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            placeholder="Search Franchise Name Here"
            className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
          {searchName && (
            <button
              onClick={() => setSearchName('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Right Toggle Tabs: Active franchise | Inactive franchise */}
        <div className="flex items-center rounded-lg border border-slate-300 bg-slate-50 p-1 w-full md:w-auto shadow-2xs">
          <button
            onClick={() => setActiveTab('ACTIVE')}
            className={`flex-1 md:flex-none px-6 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'ACTIVE'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-brand-navy hover:text-brand-primary'
            }`}
          >
            <span>Active franchise</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
              activeTab === 'ACTIVE' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {activeCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('INACTIVE')}
            className={`flex-1 md:flex-none px-6 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'INACTIVE'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-brand-navy hover:text-brand-primary'
            }`}
          >
            <span>Inactive franchise</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
              activeTab === 'INACTIVE' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {inactiveCount}
            </span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* EXPORT BUTTON (Amber / Orange style matching the photo)   */}
      {/* ========================================================= */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={handleExportCSV}
          className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-6 py-1.5 rounded-md shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <Download size={14} /> Export
        </button>

        <span className="text-xs text-slate-500 font-medium">
          Showing {filteredFranchises.length} of {activeTab === 'ACTIVE' ? activeCount : inactiveCount} {activeTab.toLowerCase()} franchises
        </span>
      </div>

      {/* ========================================================= */}
      {/* COMPREHENSIVE HORIZONTAL SCROLL TABLE IN BLUE THEME       */}
      {/* ========================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[70vh]">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            {/* Table Header: Blue Theme */}
            <thead className="sticky top-0 z-20 bg-brand-primary text-white shadow-xs select-none">
              <tr className="font-bold uppercase tracking-wider text-[11px] divide-x divide-blue-400/40">
                {/* Action Columns Sticky Left */}
                <th className="py-2.5 px-3 sticky left-0 z-30 bg-brand-primary text-center w-14">
                  VIEW
                </th>
                <th className="py-2.5 px-3 sticky left-14 z-30 bg-brand-primary text-center w-14">
                  EXIT
                </th>
                <th className="py-2.5 px-2.5 sticky left-28 z-30 bg-brand-primary text-center w-10">
                  <Edit2 size={13} className="mx-auto" />
                </th>

                {/* Data Columns */}
                <th className="py-2.5 px-3 text-center">SR.NO.</th>
                <th className="py-2.5 px-3">CODE</th>
                <th className="py-2.5 px-4 min-w-[200px]">NAME</th>
                <th className="py-2.5 px-4 min-w-[280px]">ADDRESS</th>
                <th className="py-2.5 px-3">MOBILE NO</th>
                <th className="py-2.5 px-3">GENDER</th>
                <th className="py-2.5 px-3">MARITAL STATUS</th>
                <th className="py-2.5 px-3">PAN NO</th>
                <th className="py-2.5 px-3">AADHAR NO</th>
                <th className="py-2.5 px-3">DATE OF BIRTH</th>
                <th className="py-2.5 px-3">EMAIL-ID</th>
                <th className="py-2.5 px-3">BANK NAME</th>
                <th className="py-2.5 px-3">BANK BRANCH</th>
                <th className="py-2.5 px-3">IFSC_CODE</th>
                <th className="py-2.5 px-3">ACCOUNT NO</th>
                <th className="py-2.5 px-3">BRANCH</th>
                <th className="py-2.5 px-3">USER NAME</th>
                <th className="py-2.5 px-3">USER PASSWORD</th>
                <th className="py-2.5 px-3">USER ROLE</th>
                <th className="py-2.5 px-3">QUOTATION CO-ORDINATOR NAME</th>
                <th className="py-2.5 px-3">INSPECTION CO-ORDINATOR NAME</th>
                <th className="py-2.5 px-3">ENDROSMENT CO-ORDINATOR NAME</th>
                <th className="py-2.5 px-3">CO-ORDINATOR NAME</th>
                <th className="py-2.5 px-3">SALES EXECUTIVE</th>
                <th className="py-2.5 px-3 text-center">FRANCHISETDS</th>
                <th className="py-2.5 px-3">BUSINESS PROCESS</th>
                <th className="py-2.5 px-3">LINE OF BUSINESS</th>
                <th className="py-2.5 px-3">FUNCTION TYPE</th>
                <th className="py-2.5 px-3">DESIGNATION</th>
                <th className="py-2.5 px-3">CLASS</th>
                <th className="py-2.5 px-4">REPORTING</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-200 text-slate-700 bg-white">
              {filteredFranchises.length === 0 ? (
                <tr>
                  <td colSpan={34} className="py-12 text-center text-slate-400">
                    <AlertCircle size={32} className="mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold text-slate-600">No {activeTab.toLowerCase()} franchises found.</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Try adjusting your search criteria or switch tabs.</p>
                  </td>
                </tr>
              ) : (
                filteredFranchises.map((item, index) => {
                  const isPasswordVisible = !!showPasswords[item.code];

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-blue-50/60 transition-colors divide-x divide-slate-100 group"
                    >
                      {/* 1. VIEW Action */}
                      <td className="py-2.5 px-3 text-center font-bold sticky left-0 z-10 bg-white group-hover:bg-blue-50/90 shadow-2xs">
                        <button
                          onClick={() => setViewingFranchise(item)}
                          className="text-brand-primary hover:text-blue-800 uppercase font-bold text-xs tracking-wider cursor-pointer hover:underline"
                        >
                          VIEW
                        </button>
                      </td>

                      {/* 2. EXIT Action */}
                      <td className="py-2.5 px-3 text-center font-bold sticky left-14 z-10 bg-white group-hover:bg-blue-50/90 shadow-2xs">
                        <button
                          onClick={() => handleToggleExit(item)}
                          className="text-brand-primary hover:text-rose-700 uppercase font-bold text-xs tracking-wider cursor-pointer hover:underline"
                          title={item.status === 'ACTIVE' ? 'Deactivate Franchise' : 'Reactivate Franchise'}
                        >
                          EXIT
                        </button>
                      </td>

                      {/* 3. Edit Action */}
                      <td className="py-2.5 px-2.5 text-center sticky left-28 z-10 bg-white group-hover:bg-blue-50/90 shadow-2xs">
                        <button
                          onClick={() => setEditingFranchise(item)}
                          className="text-brand-primary hover:text-blue-800 transition-colors cursor-pointer p-0.5"
                          title="Edit Franchise Record"
                        >
                          <Edit2 size={13} />
                        </button>
                      </td>

                      {/* 4. SR.NO. */}
                      <td className="py-2.5 px-3 text-center font-medium text-slate-600">
                        {index + 1}
                      </td>

                      {/* 5. CODE */}
                      <td className="py-2.5 px-3 font-semibold text-brand-primary font-mono">
                        {item.code}
                      </td>

                      {/* 6. NAME */}
                      <td className="py-2.5 px-4 font-bold text-slate-900">
                        {item.name}
                      </td>

                      {/* 7. ADDRESS */}
                      <td className="py-2.5 px-4 text-slate-600 max-w-sm truncate" title={item.address || `${item.addressLine1} ${item.addressLine2}`}>
                        {item.address || `${item.addressLine1 || ''} ${item.addressLine2 || ''}`}
                      </td>

                      {/* 8. MOBILE NO */}
                      <td className="py-2.5 px-3 font-medium text-slate-800 font-mono">
                        {item.mobile}
                      </td>

                      {/* 9. GENDER */}
                      <td className="py-2.5 px-3 uppercase text-slate-700">
                        {item.gender || 'MALE'}
                      </td>

                      {/* 10. MARITAL STATUS */}
                      <td className="py-2.5 px-3 uppercase text-slate-700">
                        {item.maritalStatus || 'MARRIED'}
                      </td>

                      {/* 11. PAN NO */}
                      <td className="py-2.5 px-3 font-mono font-medium text-slate-800 uppercase">
                        {item.panNo}
                      </td>

                      {/* 12. AADHAR NO */}
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        {item.aadharNo || '-'}
                      </td>

                      {/* 13. DATE OF BIRTH */}
                      <td className="py-2.5 px-3 text-slate-600 font-mono">
                        {item.dob || '-'}
                      </td>

                      {/* 14. EMAIL-ID */}
                      <td className="py-2.5 px-3 text-slate-700">
                        {item.email}
                      </td>

                      {/* 15. BANK NAME */}
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {item.bankName || '-'}
                      </td>

                      {/* 16. BANK BRANCH */}
                      <td className="py-2.5 px-3 text-slate-700">
                        {item.bankBranch || '-'}
                      </td>

                      {/* 17. IFSC_CODE */}
                      <td className="py-2.5 px-3 font-mono font-medium text-slate-800 uppercase">
                        {item.ifscCode || '-'}
                      </td>

                      {/* 18. ACCOUNT NO */}
                      <td className="py-2.5 px-3 font-mono text-slate-800">
                        {item.accountNo || '-'}
                      </td>

                      {/* 19. BRANCH */}
                      <td className="py-2.5 px-3 text-slate-700 font-medium">
                        {item.branch || 'FRANCHISES'}
                      </td>

                      {/* 20. USER NAME */}
                      <td className="py-2.5 px-3 font-mono text-slate-900 font-medium">
                        {item.username || '-'}
                      </td>

                      {/* 21. USER PASSWORD */}
                      <td className="py-2.5 px-3 font-mono text-slate-700">
                        <div className="flex items-center gap-1.5">
                          <span>{isPasswordVisible ? (item.password || '-') : '••••••••'}</span>
                          {item.password && (
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(item.code)}
                              className="text-slate-400 hover:text-brand-primary"
                              title={isPasswordVisible ? 'Hide Password' : 'Show Password'}
                            >
                              {isPasswordVisible ? <Lock size={12} /> : <Unlock size={12} />}
                            </button>
                          )}
                        </div>
                      </td>

                      {/* 22. USER ROLE */}
                      <td className="py-2.5 px-3 font-semibold text-slate-700">
                        {item.userRole || 'FRANCHISE'}
                      </td>

                      {/* 23. QUOTATION CO-ORDINATOR NAME */}
                      <td className="py-2.5 px-3 text-slate-700 font-medium">
                        {item.quotationCoordinator || '-'}
                      </td>

                      {/* 24. INSPECTION CO-ORDINATOR NAME */}
                      <td className="py-2.5 px-3 text-slate-700 font-medium">
                        {item.inspectionCoordinator || '-'}
                      </td>

                      {/* 25. ENDROSMENT CO-ORDINATOR NAME */}
                      <td className="py-2.5 px-3 text-slate-700 font-medium">
                        {item.endorsementCoordinator || '-'}
                      </td>

                      {/* 26. CO-ORDINATOR NAME */}
                      <td className="py-2.5 px-3 text-slate-700 font-medium">
                        {item.coordinator || '-'}
                      </td>

                      {/* 27. SALES EXECUTIVE */}
                      <td className="py-2.5 px-3 text-slate-800 font-semibold">
                        {item.salesExecutive || '-'}
                      </td>

                      {/* 28. FRANCHISETDS */}
                      <td className="py-2.5 px-3 text-center font-bold text-amber-700">
                        {item.franchiseTds || item.agentTds || '2'}
                      </td>

                      {/* 29. BUSINESS PROCESS */}
                      <td className="py-2.5 px-3 uppercase text-slate-700">
                        {item.businessProcess || 'AGENCY'}
                      </td>

                      {/* 30. LINE OF BUSINESS */}
                      <td className="py-2.5 px-3 uppercase text-slate-700 font-medium">
                        {item.lineOfBusiness || 'MOTOR'}
                      </td>

                      {/* 31. FUNCTION TYPE */}
                      <td className="py-2.5 px-3 uppercase text-slate-700">
                        {item.functionType || 'SALES'}
                      </td>

                      {/* 32. DESIGNATION */}
                      <td className="py-2.5 px-3 uppercase text-slate-700 font-medium">
                        {item.designation || 'RELATIONSHIP MANAGER'}
                      </td>

                      {/* 33. CLASS */}
                      <td className="py-2.5 px-3 font-semibold text-slate-800 uppercase">
                        {item.classType || 'CLASS 6'}
                      </td>

                      {/* 34. REPORTING */}
                      <td className="py-2.5 px-4 font-medium text-slate-800">
                        {item.reporting || '-'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info bar */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Reliable Insurance Franchise Directory</span>
          <span className="font-semibold text-slate-700">
            Current Filter: <strong className="text-brand-primary">{activeTab}</strong> Franchises
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. VIEW FRANCHISE DOSSIER MODAL                           */}
      {/* ========================================================= */}
      {viewingFranchise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="px-5 py-3.5 border-b border-slate-200 bg-brand-primary text-white flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-2">
                <Building2 size={18} />
                <h3 className="font-bold text-sm tracking-wide">
                  Franchise Profile Dossier — {viewingFranchise.code}
                </h3>
              </div>
              <button
                onClick={() => setViewingFranchise(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 space-y-4 text-xs">
              {/* Profile Card Header */}
              <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-brand-primary bg-white px-2 py-0.5 rounded shadow-2xs">
                      {viewingFranchise.code}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      viewingFranchise.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {viewingFranchise.status}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Class: {viewingFranchise.classType || 'CLASS 6'}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mt-1">{viewingFranchise.name}</h2>
                  <p className="text-slate-600 text-xs mt-0.5">
                    {viewingFranchise.address || `${viewingFranchise.addressLine1} ${viewingFranchise.addressLine2}`}
                  </p>
                </div>
              </div>

              {/* Grid 1: Personal & Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[11px] block">Contact Details</span>
                  <div className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                    <Phone size={13} className="text-slate-500" /> {viewingFranchise.mobile}
                  </div>
                  <div className="text-slate-600 mt-1 flex items-center gap-1.5 truncate">
                    <Mail size={13} className="text-slate-500" /> {viewingFranchise.email}
                  </div>
                  <div className="text-slate-500 text-[11px] mt-1">DOB: {viewingFranchise.dob || '-'}</div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px] block">Statutory / KYC</span>
                  <div className="font-mono text-slate-800 mt-0.5">
                    PAN: <strong>{viewingFranchise.panNo}</strong>
                  </div>
                  <div className="font-mono text-slate-600 mt-1">
                    Aadhar: {viewingFranchise.aadharNo || '-'}
                  </div>
                  <div className="text-slate-500 text-[11px] mt-1">
                    TDS Rate: <strong className="text-amber-700">{viewingFranchise.franchiseTds || viewingFranchise.agentTds || '2'}%</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 text-[11px] block">Banking Information</span>
                  <div className="font-semibold text-slate-800 mt-0.5">{viewingFranchise.bankName || '-'}</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">Branch: {viewingFranchise.bankBranch || '-'}</div>
                  <div className="font-mono text-slate-700 text-[11px] mt-0.5">A/C: {viewingFranchise.accountNo || '-'}</div>
                  <div className="font-mono text-slate-500 text-[11px]">IFSC: {viewingFranchise.ifscCode || '-'}</div>
                </div>
              </div>

              {/* Grid 2: Coordinator & Operations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[11px] block">Sales Executive</span>
                  <span className="font-semibold text-slate-800">{viewingFranchise.salesExecutive || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Reporting Authority</span>
                  <span className="font-semibold text-slate-800">{viewingFranchise.reporting || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Quotation Coordinator</span>
                  <span className="font-semibold text-slate-800">{viewingFranchise.quotationCoordinator || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Inspection Coordinator</span>
                  <span className="font-semibold text-slate-800">{viewingFranchise.inspectionCoordinator || '-'}</span>
                </div>
              </div>

              {/* Grid 3: System Access */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 text-[11px] block">Portal Username</span>
                  <span className="font-mono font-semibold text-brand-primary">{viewingFranchise.username || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Portal Password</span>
                  <span className="font-mono text-slate-700">{viewingFranchise.password || '-'}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Assigned Role</span>
                  <span className="font-semibold text-slate-800">{viewingFranchise.userRole || 'FRANCHISE'}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                <span className="text-[11px] text-slate-400">Reliable Associates Franchise Record</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      window.print();
                      showToast(`Printing profile for ${viewingFranchise.name}`);
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Print Profile
                  </button>
                  <button
                    onClick={() => setViewingFranchise(null)}
                    className="px-4 py-1.5 text-xs font-semibold bg-brand-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. EDIT FRANCHISE MODAL                                   */}
      {/* ========================================================= */}
      {editingFranchise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-5 py-3.5 border-b border-slate-200 bg-brand-primary text-white flex items-center justify-between rounded-t-xl">
              <div className="flex items-center gap-2">
                <Edit2 size={16} />
                <h3 className="font-bold text-sm tracking-wide">
                  Edit Franchise Record — {editingFranchise.code}
                </h3>
              </div>
              <button
                onClick={() => setEditingFranchise(null)}
                className="text-white/80 hover:text-white p-1 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Franchise Name *</label>
                  <input
                    type="text"
                    required
                    value={editingFranchise.name}
                    onChange={e => setEditingFranchise({ ...editingFranchise, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mobile No *</label>
                  <input
                    type="text"
                    required
                    value={editingFranchise.mobile}
                    onChange={e => setEditingFranchise({ ...editingFranchise, mobile: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email ID *</label>
                  <input
                    type="email"
                    required
                    value={editingFranchise.email}
                    onChange={e => setEditingFranchise({ ...editingFranchise, email: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">PAN No</label>
                  <input
                    type="text"
                    value={editingFranchise.panNo}
                    onChange={e => setEditingFranchise({ ...editingFranchise, panNo: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg uppercase focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={editingFranchise.bankName || ''}
                    onChange={e => setEditingFranchise({ ...editingFranchise, bankName: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Bank Account No</label>
                  <input
                    type="text"
                    value={editingFranchise.accountNo || ''}
                    onChange={e => setEditingFranchise({ ...editingFranchise, accountNo: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Sales Executive</label>
                  <input
                    type="text"
                    value={editingFranchise.salesExecutive || ''}
                    onChange={e => setEditingFranchise({ ...editingFranchise, salesExecutive: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Status</label>
                  <select
                    value={editingFranchise.status}
                    onChange={e => setEditingFranchise({ ...editingFranchise, status: e.target.value as any })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingFranchise(null)}
                  className="px-4 py-1.5 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-brand-primary hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
