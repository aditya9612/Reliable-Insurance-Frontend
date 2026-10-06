import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Edit2, Search, X } from 'lucide-react';

type SubTab = 'ledgerType' | 'ledgerMaster' | 'bankMaster';

interface SimpleItem {
  id: number;
  name: string;
  code?: string;
  type?: string;
  accountNo?: string;
  ifsc?: string;
  branch?: string;
}

const AccountMaster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('ledgerType');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<SimpleItem | null>(null);

  // Sub-tab Data States
  const [ledgerTypes, setLedgerTypes] = useState<SimpleItem[]>([
    { id: 1, name: 'ASSET' },
    { id: 2, name: 'LIABILITY' },
    { id: 3, name: 'INCOME' },
    { id: 4, name: 'EXPENSE' },
    { id: 5, name: 'SUNDRY DEBTOR' },
    { id: 6, name: 'SUNDRY CREDITOR' },
  ]);

  const [ledgerMasters, setLedgerMasters] = useState<SimpleItem[]>([
    { id: 1, name: 'COMMISSION INCOME', type: 'INCOME', code: 'LED001' },
    { id: 2, name: 'OFFICE RENT EXPENSE', type: 'EXPENSE', code: 'LED002' },
    { id: 3, name: 'SALARY AC', type: 'EXPENSE', code: 'LED003' },
    { id: 4, name: 'ICICI BANK AC', type: 'ASSET', code: 'LED004' },
    { id: 5, name: 'HDFC BANK AC', type: 'ASSET', code: 'LED005' },
  ]);

  const [bankMasters, setBankMasters] = useState<SimpleItem[]>([
    { id: 1, name: 'HDFC BANK', accountNo: '50200012345678', ifsc: 'HDFC0000123', branch: 'PUNE MAIN' },
    { id: 2, name: 'ICICI BANK', accountNo: '000701554433', ifsc: 'ICIC0000007', branch: 'BARAMATI' },
    { id: 3, name: 'STATE BANK OF INDIA', accountNo: '30998877665', ifsc: 'SBIN0001234', branch: 'MUMBAI' },
    { id: 4, name: 'AXIS BANK', accountNo: '918020011223344', ifsc: 'UTIB0000456', branch: 'AHILYANAGAR' },
  ]);

  // Form states
  const [nameInput, setNameInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [accountNoInput, setAccountNoInput] = useState('');
  const [ifscInput, setIfscInput] = useState('');
  const [branchInput, setBranchInput] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getTabLabel = (tab: SubTab) => {
    switch (tab) {
      case 'ledgerType': return 'Ledger Type';
      case 'ledgerMaster': return 'Ledger Master';
      case 'bankMaster': return 'Bank Master';
    }
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setNameInput('');
    setTypeInput('');
    setAccountNoInput('');
    setIfscInput('');
    setBranchInput('');
    setShowModal(true);
  };

  const handleOpenEditModal = (item: SimpleItem) => {
    setEditingItem(item);
    setNameInput(item.name || '');
    setTypeInput(item.type || '');
    setAccountNoInput(item.accountNo || '');
    setIfscInput(item.ifsc || '');
    setBranchInput(item.branch || '');
    setShowModal(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    const newItem = {
      id: editingItem ? editingItem.id : Date.now(),
      name: nameInput.toUpperCase(),
      type: typeInput.toUpperCase(),
      accountNo: accountNoInput,
      ifsc: ifscInput.toUpperCase(),
      branch: branchInput.toUpperCase(),
    };

    if (activeTab === 'ledgerType') {
      if (editingItem) {
        setLedgerTypes(prev => prev.map(t => (t.id === editingItem.id ? newItem : t)));
      } else {
        setLedgerTypes([...ledgerTypes, newItem]);
      }
    } else if (activeTab === 'ledgerMaster') {
      if (editingItem) {
        setLedgerMasters(prev => prev.map(m => (m.id === editingItem.id ? newItem : m)));
      } else {
        setLedgerMasters([...ledgerMasters, newItem]);
      }
    } else if (activeTab === 'bankMaster') {
      if (editingItem) {
        setBankMasters(prev => prev.map(b => (b.id === editingItem.id ? newItem : b)));
      } else {
        setBankMasters([...bankMasters, newItem]);
      }
    }

    setShowModal(false);
    setEditingItem(null);
  };

  const getCurrentList = (): SimpleItem[] => {
    switch (activeTab) {
      case 'ledgerType': return ledgerTypes;
      case 'ledgerMaster': return ledgerMasters;
      case 'bankMaster': return bankMasters;
    }
  };

  const currentList = getCurrentList();
  const filteredList = currentList.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.accountNo && item.accountNo.includes(searchQuery))
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedData = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const subTabs: SubTab[] = ['ledgerType', 'ledgerMaster', 'bankMaster'];

  return (
    <div className="w-full flex flex-col space-y-5">
      {/* Top Header */}
      <PageHeader
        title="Account Master"
        description="Manage ledger types, ledger master accounts and bank masters"
      />

      {/* Navigation Sub-Tabs Bar */}
      <UnderlineTabs
        tabs={subTabs.map(tab => ({ id: tab, label: getTabLabel(tab) }))}
        activeTab={activeTab}
        onTabChange={(tabId) => { setActiveTab(tabId as SubTab); setCurrentPage(1); setSearchQuery(''); }}
      />

      {/* Directory Table Area */}
      <div key={activeTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
          {/* Table Search & Action Toolbar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder={`Search ${getTabLabel(activeTab)}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all"
              />
            </div>

            <button
              onClick={handleOpenCreateModal}
              className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer"
            >
              <span>Add New {getTabLabel(activeTab)}</span>
            </button>
          </div>

          {/* Dynamic Directory Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                  <th className="py-3.5 px-6 w-20">Sr. No.</th>
                  <th className="py-3.5 px-6">{getTabLabel(activeTab).toUpperCase()}</th>
                  {activeTab === 'ledgerMaster' && <th className="py-3.5 px-6">LEDGER TYPE</th>}
                  {activeTab === 'bankMaster' && (
                    <>
                      <th className="py-3.5 px-6">ACCOUNT NO.</th>
                      <th className="py-3.5 px-6">IFSC CODE</th>
                      <th className="py-3.5 px-6">BRANCH</th>
                    </>
                  )}
                  <th className="py-3.5 px-6 text-right w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                {paginatedData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                    <td className="py-3.5 px-6 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td className="py-3.5 px-6 font-semibold text-[#12284A]">{item.name}</td>
                    {activeTab === 'ledgerMaster' && <td className="py-3.5 px-6 font-medium text-slate-600">{item.type}</td>}
                    {activeTab === 'bankMaster' && (
                      <>
                        <td className="py-3.5 px-6 font-mono text-blue-600">{item.accountNo}</td>
                        <td className="py-3.5 px-6 font-mono text-brand-primary">{item.ifsc}</td>
                        <td className="py-3.5 px-6 text-slate-600">{item.branch}</td>
                      </>
                    )}
                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                        title={`Edit ${getTabLabel(activeTab)}`}
                      >
                        <Edit2 size={18} strokeWidth={1.5} />
                      </button>
                    </td>
                  </tr>
                ))}
                {paginatedData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400 font-medium">
                      No {getTabLabel(activeTab)} records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <span>Records per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
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
                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                &lt;
              </button>
              {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${currentPage === page
                    ? 'bg-brand-primary text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingItem ? `Edit ${getTabLabel(activeTab)}` : `Add New ${getTabLabel(activeTab)}`}
              </h2>
              <button
                onClick={() => { setShowModal(false); setEditingItem(null); }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {getTabLabel(activeTab)} Name
                </label>
                <input
                  type="text"
                  required
                  placeholder={`Enter ${getTabLabel(activeTab)} Name`}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary focus:border-transparent transition-all"
                />
              </div>

              {activeTab === 'ledgerMaster' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ledger Type</label>
                  <select
                    value={typeInput}
                    onChange={(e) => setTypeInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  >
                    <option value="">--Select Ledger Type--</option>
                    {ledgerTypes.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {activeTab === 'bankMaster' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
                    <input
                      type="text"
                      placeholder="Enter Account Number"
                      value={accountNoInput}
                      onChange={(e) => setAccountNoInput(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">IFSC Code</label>
                    <input
                      type="text"
                      placeholder="Enter IFSC Code"
                      value={ifscInput}
                      onChange={(e) => setIfscInput(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                </>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingItem(null); }}
                  className="px-4 py-2 text-sm font-medium text-brand-muted hover:bg-brand-mainbg rounded-lg transition-colors cursor-pointer"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMaster;
