import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Edit2, Search, X } from 'lucide-react';

interface BranchType {
  id: number;
  type: string;
}

interface Branch {
  code: string;
  name: string;
  address: string;
  type: string;
}

const BranchMaster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'type' | 'name'>('type');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<BranchType | Branch | null>(null);

  // Sample data for Branch Types
  const [branchTypes, setBranchTypes] = useState<BranchType[]>([
    { id: 1, type: 'BARAMATI HUB' },
    { id: 2, type: 'BRANCH' },
    { id: 3, type: 'FRANCHISE' },
    { id: 4, type: 'HEAD OFFICE' },
    { id: 5, type: 'KARVE NAGAR' },
    { id: 6, type: 'LOCATION' },
    { id: 7, type: 'MUMBAI' },
    { id: 8, type: 'RELIANCE EMP' },
    { id: 9, type: 'SMART OFFICE' },
    { id: 10, type: 'VIRTAUL OFFICE' },
  ]);

  // Sample data for Branches
  const [branches, setBranches] = useState<Branch[]>([
    { code: 'BR0139', name: 'AHILYANAGAR', address: 'AHILYANAGAR', type: 'LOCATION' },
    { code: 'BR005', name: 'AKLUJ', address: 'AKLUJ', type: 'VIRTAUL OFFICE' },
    { code: 'BR0115', name: 'AKOLA', address: 'AKOLA', type: 'VIRTAUL OFFICE' },
    { code: 'BR0125', name: 'AMRAVATI', address: 'AMRAVATI', type: 'VIRTAUL OFFICE' },
    { code: 'BR001', name: 'BARAMATI', address: 'BARAMATI', type: 'HEAD OFFICE' },
    { code: 'BR0135', name: 'BARSHI', address: 'BARSHI', type: 'VIRTAUL OFFICE' },
    { code: 'BR0130', name: 'BEED', address: 'BEED', type: 'VIRTAUL OFFICE' },
    { code: 'BR0118', name: 'BHIGWAN', address: 'BHIGWAN', type: 'VIRTAUL OFFICE' },
    { code: 'BR0134', name: 'BULDHANA', address: 'BULDHANA', type: 'VIRTAUL OFFICE' },
    { code: 'BR0121', name: 'CHANDRAPUR', address: 'CHANDRAPUR', type: 'LOCATION' },
    { code: 'BR004', name: 'CHHATRAPATI SAMBHAJINAGAR', address: 'CHHATRAPATI SAMBHAJINAGAR', type: 'BRANCH' },
    { code: 'BR0120', name: 'CHOWPHULA', address: 'CHOWPHULA', type: 'VIRTAUL OFFICE' },
  ]);

  // Form states
  const [newTypeName, setNewTypeName] = useState('');
  const [newBranchCode, setNewBranchCode] = useState('BR0140');
  const [newBranchName, setNewBranchName] = useState('');
  const [newBranchAddress, setNewBranchAddress] = useState('');
  const [newBranchType, setNewBranchType] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Open modal for Create
  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setNewTypeName('');
    setNewBranchCode(`BR0${branches.length + 100}`);
    setNewBranchName('');
    setNewBranchAddress('');
    setNewBranchType('');
    setShowModal(true);
  };

  // Open modal for Edit (Branch Type)
  const handleOpenEditTypeModal = (item: BranchType) => {
    setEditingItem(item);
    setNewTypeName(item.type);
    setShowModal(true);
  };

  // Open modal for Edit (Branch)
  const handleOpenEditBranchModal = (branch: Branch) => {
    setEditingItem(branch);
    setNewBranchCode(branch.code);
    setNewBranchName(branch.name);
    setNewBranchAddress(branch.address);
    setNewBranchType(branch.type);
    setShowModal(true);
  };

  // Save Branch Type (Create or Update)
  const handleSaveBranchType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTypeName.trim()) return;

    if (editingItem && 'id' in editingItem) {
      setBranchTypes(prev =>
        prev.map(t => (t.id === editingItem.id ? { ...t, type: newTypeName.toUpperCase() } : t))
      );
    } else {
      setBranchTypes([...branchTypes, { id: branchTypes.length + 1, type: newTypeName.toUpperCase() }]);
    }

    setNewTypeName('');
    setEditingItem(null);
    setShowModal(false);
  };

  // Save Branch (Create or Update)
  const handleSaveBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranchName.trim()) return;

    if (editingItem && 'code' in editingItem) {
      setBranches(prev =>
        prev.map(b =>
          b.code === editingItem.code
            ? {
              ...b,
              name: newBranchName.toUpperCase(),
              address: newBranchAddress.toUpperCase() || newBranchName.toUpperCase(),
              type: newBranchType || 'BRANCH'
            }
            : b
        )
      );
    } else {
      setBranches([
        ...branches,
        {
          code: newBranchCode,
          name: newBranchName.toUpperCase(),
          address: newBranchAddress.toUpperCase() || newBranchName.toUpperCase(),
          type: newBranchType || 'BRANCH'
        }
      ]);
    }

    setNewBranchName('');
    setNewBranchAddress('');
    setNewBranchType('');
    setEditingItem(null);
    setShowModal(false);
  };

  // Filtered data
  const filteredBranchTypes = branchTypes.filter(b => b.type.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredBranches = branches.filter(b =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentData = activeTab === 'type' ? filteredBranchTypes : filteredBranches;
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const paginatedData = currentData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full flex flex-col space-y-5">
      {/* Top Bar Header */}
      <PageHeader
        title="Branch Master"
        description="Manage branch types and full branch directory"
      />

      <UnderlineTabs
        tabs={[
          { id: 'type', label: 'Branch Type' },
          { id: 'name', label: 'Branch Name' }
        ]}
        activeTab={activeTab}
        onTabChange={(tabId) => { setActiveTab(tabId as 'type' | 'name'); setCurrentPage(1); }}
      />

      {/* Main Full-Width Content Table Card */}
      <div key={activeTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
          {/* Table Toolbar */}
          <div className="p-4 bg-white border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'type' ? 'Branch Type...' : 'Branch Name/Code...'}`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] font-semibold text-[14px] shadow-sm transition-all duration-200 cursor-pointer border-none"
            >
              <span>Add New {activeTab === 'type' ? 'Branch Type' : 'Branch'}</span>
            </button>
          </div>

          {/* Full Width Table View */}
          <div className="overflow-x-auto w-full">
            {activeTab === 'type' ? (
              <table className="w-full text-left border-collapse table-fixed">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-6 w-[10%]">SR. NO.</th>
                    <th className="py-3 px-6 w-[75%]">BRANCH TYPE</th>
                    <th className="py-3 px-6 text-right w-[15%]">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[14px]">
                  {(paginatedData as BranchType[]).map((item, idx) => (
                    <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-2 px-6 font-medium text-brand-muted">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="py-2 px-6 font-medium text-brand-navy">{item.type}</td>
                      <td className="py-2 px-6 text-right">
                        <button
                          onClick={() => handleOpenEditTypeModal(item)}
                          className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Edit Branch Type"
                        >
                          <Edit2 size={18} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3 px-6">CODE</th>
                    <th className="py-3 px-6">BRANCH NAME</th>
                    <th className="py-3 px-6">ADDRESS</th>
                    <th className="py-3 px-6">BRANCH TYPE</th>
                    <th className="py-3 px-6 text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[14px]">
                  {(paginatedData as Branch[]).map((b) => (
                    <tr key={b.code} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-2 px-6 font-medium text-brand-primary">{b.code}</td>
                      <td className="py-2 px-6 font-medium text-brand-navy">{b.name}</td>
                      <td className="py-2 px-6 text-brand-muted">{b.address}</td>
                      <td className="py-2 px-6">
                        <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-lightbg text-brand-primary border border-brand-border">
                          {b.type}
                        </span>
                      </td>
                      <td className="py-2 px-6 text-right">
                        <button
                          onClick={() => handleOpenEditBranchModal(b)}
                          className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Edit Branch"
                        >
                          <Edit2 size={18} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Footer Pagination */}
          <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
              <span>Records per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-white border border-brand-border rounded-md text-sm font-semibold text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <span className="text-sm text-brand-muted font-medium">
              Showing {currentData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, currentData.length)} of {currentData.length} records
            </span>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-brand-mainbg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-all ${currentPage === page
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-white text-brand-navy border border-brand-border hover:bg-brand-mainbg'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-brand-mainbg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal (Create / Edit) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span>
                  » {editingItem ? (activeTab === 'type' ? 'Edit Branch Type Form' : 'Edit Branch Master Form') : (activeTab === 'type' ? 'Branch Type Form' : 'Branch Master Form')}
                </span>
              </h3>
              <button
                onClick={() => { setShowModal(false); setEditingItem(null); }}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Content */}
            {activeTab === 'type' ? (
              <form onSubmit={handleSaveBranchType} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch Type</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Branch Type (e.g. HUB, FRANCHISE)"
                    value={newTypeName}
                    onChange={(e) => setNewTypeName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSaveBranch} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch Code</label>
                  <input
                    type="text"
                    disabled
                    value={newBranchCode}
                    className="w-full px-4 py-2.5 bg-brand-mainbg border border-brand-border rounded-[8px] text-[14px] text-brand-muted font-mono cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Branch Name"
                    value={newBranchName}
                    onChange={(e) => setNewBranchName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:ring-1 focus:border-brand-primary focus:ring-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                  <textarea
                    rows={2}
                    placeholder="Enter Branch Address"
                    value={newBranchAddress}
                    onChange={(e) => setNewBranchAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch Type</label>
                  <select
                    required
                    value={newBranchType}
                    onChange={(e) => setNewBranchType(e.target.value)}
                    className="w-full px-4 py-2.5 border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  >
                    <option value="">--Select Branch Type--</option>
                    {branchTypes.map(t => (
                      <option key={t.id} value={t.type}>{t.type}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="px-4 py-2 text-[14px] font-medium text-brand-muted hover:bg-brand-mainbg rounded-[8px] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold rounded-[8px] text-[14px] shadow-sm transition-all cursor-pointer"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchMaster;
