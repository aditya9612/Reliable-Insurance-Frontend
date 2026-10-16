import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import { Edit2, CheckCircle2 } from 'lucide-react';

type BusinessMasterTab = 'changeReporting' | 'designationHierarchy';
type ReportingMode = 'change' | 'remove';

interface HierarchyDesignationItem {
  id: number;
  designation: string;
  userRole: string;
  functionType: string;
  classGrade: string;
}

const BusinessMaster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BusinessMasterTab>('changeReporting');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ==========================================
  // PAGE 1: CHANGE EMPLOYEE REPORTING (Photo 1)
  // ==========================================
  const [reportingMode, setReportingMode] = useState<ReportingMode>('change');

  // Change Reporting Form States
  const [changeRole, setChangeRole] = useState('');
  const [changeDesignation, setChangeDesignation] = useState('');
  const [changeOldEmployee, setChangeOldEmployee] = useState('');
  const [changeNewEmployee, setChangeNewEmployee] = useState('');

  // Remove Reporting Form States
  const [removeRole, setRemoveRole] = useState('');
  const [removeDesignation, setRemoveDesignation] = useState('');
  const [removeEmployee, setRemoveEmployee] = useState('');

  const handleSaveChangeReporting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!changeDesignation) {
      showToast('Please select a designation');
      return;
    }
    showToast('Employee reporting changed successfully!');
    setChangeRole('');
    setChangeDesignation('');
    setChangeOldEmployee('');
    setChangeNewEmployee('');
  };

  const handleSaveRemoveReporting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!removeDesignation || !removeEmployee) {
      showToast('Please select designation and employee');
      return;
    }
    showToast('Employee reporting removed successfully!');
    setRemoveRole('');
    setRemoveDesignation('');
    setRemoveEmployee('');
  };

  // ==========================================
  // PAGE 2: HIERARCHY DESIGNATION (Photo 2)
  // ==========================================
  const [hierarchyList, setHierarchyList] = useState<HierarchyDesignationItem[]>([
    { id: 1, designation: 'NATIONAL HEAD', userRole: 'NATIONAL HEAD', functionType: 'SALES', classGrade: 'CLASS 2' },
    { id: 2, designation: 'ZONAL HEAD', userRole: 'ZONAL HEAD', functionType: 'SALES', classGrade: 'CLASS 3' },
    { id: 3, designation: 'STATE HEAD', userRole: 'STATE HEAD', functionType: 'SALES', classGrade: 'CLASS 4' },
    { id: 4, designation: 'BRANCH HEAD', userRole: 'BRANCH HEAD', functionType: 'SALES', classGrade: 'CLASS 5' },
    { id: 5, designation: 'RELATIONSHIP MANAGER', userRole: 'RELATIONSHIP MANAGER', functionType: 'SALES', classGrade: 'CLASS 6' },
    { id: 6, designation: 'OPERATIONS HEAD', userRole: 'OPERATIONS HEAD', functionType: 'OPERATIONS', classGrade: 'CLASS 2' },
    { id: 7, designation: 'REGIONAL OPS HEAD', userRole: 'REGIONAL OPS HEAD', functionType: 'OPERATIONS', classGrade: 'CLASS 4' },
    { id: 8, designation: 'TEAM LEADER', userRole: 'TEAM LEADER', functionType: 'OPERATIONS', classGrade: 'CLASS 5' },
  ]);

  const [hierarchyRole, setHierarchyRole] = useState('');
  const [hierarchyFunctionType, setHierarchyFunctionType] = useState('');
  const [hierarchyClass, setHierarchyClass] = useState('');
  const [hierarchyDesignation, setHierarchyDesignation] = useState('');
  const [editingHierarchyId, setEditingHierarchyId] = useState<number | null>(null);

  const handleEditHierarchy = (item: HierarchyDesignationItem) => {
    setEditingHierarchyId(item.id);
    setHierarchyRole(item.userRole);
    setHierarchyFunctionType(item.functionType);
    setHierarchyClass(item.classGrade);
    setHierarchyDesignation(item.designation);
    showToast(`Editing designation: ${item.designation}`);
  };

  const handleCancelHierarchyEdit = () => {
    setEditingHierarchyId(null);
    setHierarchyRole('');
    setHierarchyFunctionType('');
    setHierarchyClass('');
    setHierarchyDesignation('');
  };

  const handleSaveHierarchy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hierarchyDesignation.trim()) {
      showToast('Please enter Designation');
      return;
    }
    if (!hierarchyFunctionType) {
      showToast('Please select Function Type');
      return;
    }
    if (!hierarchyClass) {
      showToast('Please select Class');
      return;
    }

    if (editingHierarchyId) {
      setHierarchyList(prev => prev.map(item => item.id === editingHierarchyId ? {
        ...item,
        designation: hierarchyDesignation.toUpperCase(),
        userRole: hierarchyRole ? hierarchyRole.toUpperCase() : hierarchyDesignation.toUpperCase(),
        functionType: hierarchyFunctionType.toUpperCase(),
        classGrade: hierarchyClass.toUpperCase(),
      } : item));
      showToast('Hierarchy designation updated successfully!');
      handleCancelHierarchyEdit();
    } else {
      const nextId = hierarchyList.length > 0 ? Math.max(...hierarchyList.map(h => h.id)) + 1 : 1;
      const newItem: HierarchyDesignationItem = {
        id: nextId,
        designation: hierarchyDesignation.toUpperCase(),
        userRole: hierarchyRole ? hierarchyRole.toUpperCase() : hierarchyDesignation.toUpperCase(),
        functionType: hierarchyFunctionType.toUpperCase(),
        classGrade: hierarchyClass.toUpperCase(),
      };
      setHierarchyList(prev => [...prev, newItem]);
      showToast('Hierarchy designation created successfully!');
      setHierarchyRole('');
      setHierarchyFunctionType('');
      setHierarchyClass('');
      setHierarchyDesignation('');
    }
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Business Master"
        description="Manage employee reporting hierarchy and designation master structures"
      />

      {/* Top 2-Page Sub-Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-brand-border p-2.5 shadow-sm w-full max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('changeReporting')}
            className={`py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none ${
              activeTab === 'changeReporting'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
            }`}
          >
            Change Employee Reporting
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('designationHierarchy')}
            className={`py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer border-none ${
              activeTab === 'designationHierarchy'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
            }`}
          >
            Hierarchy Designation
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 1: CHANGE EMPLOYEE REPORTING (Photo 1) - NO EXTRA TABLES             */}
      {/* ========================================================================= */}
      {activeTab === 'changeReporting' && (
        <div className="space-y-6 w-full max-w-full">
          {/* Submenu Mode Toggle matching Photo 1 */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setReportingMode('change')}
                className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer border-none ${
                  reportingMode === 'change'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-brand-primary hover:bg-slate-100 bg-transparent'
                }`}
              >
                Change Employee Reporting
              </button>
              <button
                type="button"
                onClick={() => setReportingMode('remove')}
                className={`px-5 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all cursor-pointer border-none ${
                  reportingMode === 'remove'
                    ? 'bg-brand-primary text-white shadow-xs'
                    : 'text-brand-primary hover:bg-slate-100 bg-transparent'
                }`}
              >
                Remove Employee Reporting
              </button>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden w-full max-w-full">
            <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-5 py-3.5 font-bold text-sm flex items-center gap-1.5">
              <span>» {reportingMode === 'change' ? 'Change Employee Reporting' : 'Remove Employee Reporting'}</span>
            </div>

            <div className="p-6">
              {reportingMode === 'change' ? (
                <form onSubmit={handleSaveChangeReporting} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Role
                      </label>
                      <select
                        value={changeRole}
                        onChange={(e) => setChangeRole(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                      >
                        <option value="">--Select Role Name--</option>
                        <option value="NATIONAL HEAD">NATIONAL HEAD</option>
                        <option value="ZONAL HEAD">ZONAL HEAD</option>
                        <option value="STATE HEAD">STATE HEAD</option>
                        <option value="BRANCH HEAD">BRANCH HEAD</option>
                        <option value="RELATIONSHIP MANAGER">RELATIONSHIP MANAGER</option>
                        <option value="OPERATIONS HEAD">OPERATIONS HEAD</option>
                        <option value="REGIONAL OPS HEAD">REGIONAL OPS HEAD</option>
                        <option value="TEAM LEADER">TEAM LEADER</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Designation <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <select
                        value={changeDesignation}
                        onChange={(e) => setChangeDesignation(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                      >
                        <option value="">--Select Designation--</option>
                        <option value="NATIONAL HEAD">NATIONAL HEAD</option>
                        <option value="ZONAL HEAD">ZONAL HEAD</option>
                        <option value="STATE HEAD">STATE HEAD</option>
                        <option value="BRANCH HEAD">BRANCH HEAD</option>
                        <option value="RELATIONSHIP MANAGER">RELATIONSHIP MANAGER</option>
                        <option value="OPERATIONS HEAD">OPERATIONS HEAD</option>
                        <option value="REGIONAL OPS HEAD">REGIONAL OPS HEAD</option>
                        <option value="TEAM LEADER">TEAM LEADER</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Old Employee
                      </label>
                      <select
                        value={changeOldEmployee}
                        onChange={(e) => setChangeOldEmployee(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                      >
                        <option value="">--Select Employee--</option>
                        <option value="SANTOSH RAVINDRA GAWALI">SANTOSH RAVINDRA GAWALI</option>
                        <option value="SHAM MANIK PATIL">SHAM MANIK PATIL</option>
                        <option value="SHEKHAR DAGADU KADAM">SHEKHAR DAGADU KADAM</option>
                        <option value="ARVIND DNYANESHWAR">ARVIND DNYANESHWAR</option>
                        <option value="PRADIP DINKAR SHEWALE">PRADIP DINKAR SHEWALE</option>
                        <option value="NILESH MAHESH BORSE">NILESH MAHESH BORSE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        New Employee
                      </label>
                      <select
                        value={changeNewEmployee}
                        onChange={(e) => setChangeNewEmployee(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                      >
                        <option value="">--Select Employee--</option>
                        <option value="AMOL RAMCHANDRA WANAVE">AMOL RAMCHANDRA WANAVE</option>
                        <option value="AVINASH BHARAT KORATKAR">AVINASH BHARAT KORATKAR</option>
                        <option value="HEMANT RAJU KAKULTE">HEMANT RAJU KAKULTE</option>
                        <option value="SNEHAL SUNIL AGAWANE">SNEHAL SUNIL AGAWANE</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-brand-primary hover:bg-[#003870] text-white font-bold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                    >
                      Save
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSaveRemoveReporting} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Role
                      </label>
                      <select
                        value={removeRole}
                        onChange={(e) => setRemoveRole(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                      >
                        <option value="">--Select Role Name--</option>
                        <option value="NATIONAL HEAD">NATIONAL HEAD</option>
                        <option value="ZONAL HEAD">ZONAL HEAD</option>
                        <option value="STATE HEAD">STATE HEAD</option>
                        <option value="BRANCH HEAD">BRANCH HEAD</option>
                        <option value="RELATIONSHIP MANAGER">RELATIONSHIP MANAGER</option>
                        <option value="OPERATIONS HEAD">OPERATIONS HEAD</option>
                        <option value="REGIONAL OPS HEAD">REGIONAL OPS HEAD</option>
                        <option value="TEAM LEADER">TEAM LEADER</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Designation <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <select
                        value={removeDesignation}
                        onChange={(e) => setRemoveDesignation(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                      >
                        <option value="">--Select Designation--</option>
                        <option value="NATIONAL HEAD">NATIONAL HEAD</option>
                        <option value="ZONAL HEAD">ZONAL HEAD</option>
                        <option value="STATE HEAD">STATE HEAD</option>
                        <option value="BRANCH HEAD">BRANCH HEAD</option>
                        <option value="RELATIONSHIP MANAGER">RELATIONSHIP MANAGER</option>
                        <option value="OPERATIONS HEAD">OPERATIONS HEAD</option>
                        <option value="REGIONAL OPS HEAD">REGIONAL OPS HEAD</option>
                        <option value="TEAM LEADER">TEAM LEADER</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Employee <span className="text-rose-500 font-bold">*</span>
                      </label>
                      <select
                        value={removeEmployee}
                        onChange={(e) => setRemoveEmployee(e.target.value)}
                        required
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                      >
                        <option value="">--Select Employee--</option>
                        <option value="SANTOSH RAVINDRA GAWALI">SANTOSH RAVINDRA GAWALI</option>
                        <option value="SHAM MANIK PATIL">SHAM MANIK PATIL</option>
                        <option value="SHEKHAR DAGADU KADAM">SHEKHAR DAGADU KADAM</option>
                        <option value="ARVIND DNYANESHWAR">ARVIND DNYANESHWAR</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                    >
                      Remove
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PAGE 2: HIERARCHY DESIGNATION (Photo 2) - EXACT SIDE-BY-SIDE VIEW        */}
      {/* ========================================================================= */}
      {activeTab === 'designationHierarchy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
          {/* Left Column: Form Card */}
          <div className="lg:col-span-4 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
            <div className="bg-brand-lightbg text-brand-navy border-b border-brand-border px-5 py-3.5 font-bold text-sm">
              <span>» {editingHierarchyId ? 'Edit Hierarchy Designation' : 'Add Hierarchy Designation'}</span>
            </div>

            <form onSubmit={handleSaveHierarchy} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Role
                </label>
                <select
                  value={hierarchyRole}
                  onChange={(e) => setHierarchyRole(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                >
                  <option value="">--Select Role Name--</option>
                  <option value="NATIONAL HEAD">NATIONAL HEAD</option>
                  <option value="ZONAL HEAD">ZONAL HEAD</option>
                  <option value="STATE HEAD">STATE HEAD</option>
                  <option value="BRANCH HEAD">BRANCH HEAD</option>
                  <option value="RELATIONSHIP MANAGER">RELATIONSHIP MANAGER</option>
                  <option value="OPERATIONS HEAD">OPERATIONS HEAD</option>
                  <option value="REGIONAL OPS HEAD">REGIONAL OPS HEAD</option>
                  <option value="TEAM LEADER">TEAM LEADER</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Function Type <span className="text-rose-500 font-bold">*</span>
                </label>
                <select
                  value={hierarchyFunctionType}
                  onChange={(e) => setHierarchyFunctionType(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                >
                  <option value="">--Select Function--</option>
                  <option value="SALES">SALES</option>
                  <option value="OPERATIONS">OPERATIONS</option>
                  <option value="ACCOUNTS">ACCOUNTS</option>
                  <option value="CALLING">CALLING</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Class <span className="text-rose-500 font-bold">*</span>
                </label>
                <select
                  value={hierarchyClass}
                  onChange={(e) => setHierarchyClass(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                >
                  <option value="">--Select Class--</option>
                  <option value="CLASS 1">CLASS 1</option>
                  <option value="CLASS 2">CLASS 2</option>
                  <option value="CLASS 3">CLASS 3</option>
                  <option value="CLASS 4">CLASS 4</option>
                  <option value="CLASS 5">CLASS 5</option>
                  <option value="CLASS 6">CLASS 6</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Designation <span className="text-rose-500 font-bold">*</span>
                </label>
                <input
                  type="text"
                  value={hierarchyDesignation}
                  onChange={(e) => setHierarchyDesignation(e.target.value)}
                  required
                  placeholder="Enter designation"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-primary hover:bg-[#003870] text-white font-bold text-sm rounded-lg shadow-sm transition cursor-pointer border-none"
                >
                  {editingHierarchyId ? 'Update' : 'Save'}
                </button>
                {editingHierarchyId && (
                  <button
                    type="button"
                    onClick={handleCancelHierarchyEdit}
                    className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-sm rounded-lg transition cursor-pointer border-none"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Right Column: Table Card */}
          <div className="lg:col-span-8 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-bold uppercase tracking-wider border-b border-brand-border whitespace-nowrap">
                    <th className="py-3 px-4 border-r border-brand-border">DESIGNATION</th>
                    <th className="py-3 px-4 border-r border-brand-border">USER ROLE</th>
                    <th className="py-3 px-4 border-r border-brand-border">FUNCTION TYPE</th>
                    <th className="py-3 px-4 border-r border-brand-border">CLASS</th>
                    <th className="py-3 px-3 text-center w-14"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px] bg-white">
                  {hierarchyList.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-brand-mainbg/70 transition-colors h-[48px] ${
                        editingHierarchyId === item.id ? 'bg-blue-50/60 font-semibold' : ''
                      }`}
                    >
                      <td className="py-2.5 px-4 border-r border-brand-border font-bold text-brand-navy whitespace-nowrap uppercase">
                        {item.designation}
                      </td>
                      <td className="py-2.5 px-4 border-r border-brand-border text-slate-700 whitespace-nowrap uppercase">
                        {item.userRole}
                      </td>
                      <td className="py-2.5 px-4 border-r border-brand-border text-slate-700 font-medium whitespace-nowrap uppercase">
                        {item.functionType}
                      </td>
                      <td className="py-2.5 px-4 border-r border-brand-border font-mono text-slate-700 whitespace-nowrap uppercase">
                        {item.classGrade}
                      </td>
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleEditHierarchy(item)}
                          className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors cursor-pointer border-none bg-transparent"
                          title="Edit Designation"
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
      )}
    </div>
  );
};

export default BusinessMaster;
