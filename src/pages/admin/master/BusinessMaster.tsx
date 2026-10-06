import React, { useState } from 'react';
import { Edit2, Search, X } from 'lucide-react';

type SubTab = 'changeReporting' | 'designationMaster';

interface SimpleItem {
  id: number;
  title: string;
  code?: string;
  department?: string;
  reportingTo?: string;
}

const BusinessMaster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('changeReporting');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SimpleItem | null>(null);

  const [designations, setDesignations] = useState<SimpleItem[]>([
    { id: 1, title: 'BRANCH MANAGER', department: 'MANAGEMENT', code: 'DESG01' },
    { id: 2, title: 'SALES EXECUTIVE', department: 'SALES', code: 'DESG02' },
    { id: 3, title: 'OPERATIONS MANAGER', department: 'OPERATIONS', code: 'DESG03' },
    { id: 4, title: 'TELECALLER', department: 'CALLING', code: 'DESG04' },
    { id: 5, title: 'ACCOUNTANT', department: 'ACCOUNTS', code: 'DESG05' },
  ]);

  const [reportingRules, setReportingRules] = useState<SimpleItem[]>([
    { id: 1, title: 'SALES EXECUTIVE', reportingTo: 'BRANCH MANAGER', department: 'SALES' },
    { id: 2, title: 'TELECALLER', reportingTo: 'OPERATIONS MANAGER', department: 'CALLING' },
    { id: 3, title: 'ACCOUNTANT', reportingTo: 'BRANCH MANAGER', department: 'ACCOUNTS' },
  ]);

  const [titleInput, setTitleInput] = useState('');
  const [deptInput, setDeptInput] = useState('');
  const [reportingInput, setReportingInput] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getTabLabel = (tab: SubTab) => {
    switch (tab) {
      case 'changeReporting': return 'Change Reporting';
      case 'designationMaster': return 'Designation Master';
    }
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setTitleInput('');
    setDeptInput('');
    setReportingInput('');
    setShowModal(true);
  };

  const handleOpenEditModal = (item: SimpleItem) => {
    setEditingItem(item);
    setTitleInput(item.title || '');
    setDeptInput(item.department || '');
    setReportingInput(item.reportingTo || '');
    setShowModal(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;

    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      title: titleInput.toUpperCase(),
      department: deptInput.toUpperCase(),
      reportingTo: reportingInput.toUpperCase(),
    };

    if (activeTab === 'designationMaster') {
      if (editingItem) {
        setDesignations(prev => prev.map(d => (d.id === editingItem.id ? newItem : d)));
      } else {
        setDesignations([...designations, newItem]);
      }
    } else {
      if (editingItem) {
        setReportingRules(prev => prev.map(r => (r.id === editingItem.id ? newItem : r)));
      } else {
        setReportingRules([...reportingRules, newItem]);
      }
    }

    setShowModal(false);
    setEditingItem(null);
  };

  const currentList = activeTab === 'designationMaster' ? designations : reportingRules;
  const filteredList = currentList.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.department && item.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedData = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full flex flex-col space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#12284A]">Business Master</h1>
          <p className="text-sm text-slate-500">Manage change reporting hierarchy and designation masters</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
        <button
          onClick={() => { setActiveTab('changeReporting'); setCurrentPage(1); }}
          className={`px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
            activeTab === 'changeReporting'
              ? 'bg-[#00a896] text-white shadow-md font-semibold'
              : 'text-slate-600 hover:text-[#12284A] hover:bg-slate-100'
          }`}
        >
          Change Reporting
        </button>
        <button
          onClick={() => { setActiveTab('designationMaster'); setCurrentPage(1); }}
          className={`px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
            activeTab === 'designationMaster'
              ? 'bg-[#00a896] text-white shadow-md font-semibold'
              : 'text-slate-600 hover:text-[#12284A] hover:bg-slate-100'
          }`}
        >
          Designation Master
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder={`Search ${getTabLabel(activeTab)}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a896]"
            />
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg font-medium text-sm shadow-sm transition-all cursor-pointer"
          >
            <span>Add New {getTabLabel(activeTab)}</span>
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#00a896] text-white text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-6 w-20">Sr. No.</th>
                <th className="py-3.5 px-6">DESIGNATION</th>
                {activeTab === 'changeReporting' ? (
                  <th className="py-3.5 px-6">REPORTING TO</th>
                ) : (
                  <th className="py-3.5 px-6">DEPARTMENT</th>
                )}
                <th className="py-3.5 px-6 text-right w-24">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {paginatedData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                  <td className="py-3.5 px-6 font-semibold text-[#12284A]">{item.title}</td>
                  {activeTab === 'changeReporting' ? (
                    <td className="py-3.5 px-6 font-medium text-teal-700">{item.reportingTo}</td>
                  ) : (
                    <td className="py-3.5 px-6 text-slate-600">{item.department}</td>
                  )}
                  <td className="py-3.5 px-6 text-right">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 text-[#8BA4CA] hover:text-[#0869D8] hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                      title={`Edit ${getTabLabel(activeTab)}`}
                    >
                      <Edit2 size={18} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span>Records per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0869D8] cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredList.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredList.length)} of {filteredList.length} records
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 transition-all"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${
                  currentPage === page
                    ? 'bg-[#0869D8] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 transition-all"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden">
            <div className="bg-[#00a896] text-white p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingItem ? `Edit ${getTabLabel(activeTab)}` : `Add New ${getTabLabel(activeTab)}`}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Designation Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enter Designation Title"
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              {activeTab === 'changeReporting' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reporting To</label>
                  <input
                    type="text"
                    placeholder="Enter Reporting Designation"
                    value={reportingInput}
                    onChange={(e) => setReportingInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    placeholder="Enter Department"
                    value={deptInput}
                    onChange={(e) => setDeptInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md"
                >
                  {editingItem ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessMaster;
