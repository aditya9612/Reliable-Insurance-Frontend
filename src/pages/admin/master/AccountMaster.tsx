import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Edit2, Trash2, Search, X } from 'lucide-react';

type SubTab = 'ledgerType' | 'ledgerMaster' | 'bankMaster';

interface SimpleItem {
  id: number;
  name: string;
  code?: string;
  type?: string;
  accountGroup?: string;
  description?: string;
  createdOn?: string;
  createdBy?: string;
  updatedOn?: string;
  updatedBy?: string;
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
    { id: 7, name: 'AGENT' },
  ]);

  const [ledgerMasters, setLedgerMasters] = useState<SimpleItem[]>([
    { id: 1, name: 'BHARTI RAMNATH', type: 'AGENT', accountGroup: 'SUNDRY DEBTOR', description: 'SUNDRY DEBTOR', createdOn: '25/09/2021', createdBy: '1', updatedOn: '25/09/2021', updatedBy: '1' },
    { id: 2, name: 'ICM', type: 'AGENT', accountGroup: 'SUNDRY DEBTOR', description: 'SUNDRY DEBTOR', createdOn: '24/05/2021', createdBy: '1', updatedOn: '24/05/2021', updatedBy: '1' },
    { id: 3, name: 'MANGALMURTI TRANSPORT', type: 'AGENT', accountGroup: 'SUNDRY DEBTOR', description: 'SUNDRY DEBTOR', createdOn: '06/05/2021', createdBy: '1', updatedOn: '06/05/2021', updatedBy: '1' },
    { id: 4, name: 'MILIND', type: 'AGENT', accountGroup: 'SUNDRY DEBTOR', description: 'SUNDRY DEBTOR', createdOn: '22/05/2021', createdBy: '1', updatedOn: '22/05/2021', updatedBy: '1' },
    { id: 5, name: 'NITIN', type: 'AGENT', accountGroup: 'SUNDRY DEBTOR', description: 'SUNDRY DEBTOR', createdOn: '31/05/2021', createdBy: '1', updatedOn: '31/05/2021', updatedBy: '1' },
    { id: 6, name: 'COMMISSION INCOME', type: 'INCOME', accountGroup: 'DIRECT INCOME', description: 'DIRECT INCOME', createdOn: '15/04/2024', createdBy: '1', updatedOn: '15/04/2024', updatedBy: '1' },
    { id: 7, name: 'OFFICE RENT EXPENSE', type: 'EXPENSE', accountGroup: 'INDIRECT EXPENSE', description: 'INDIRECT EXPENSE', createdOn: '10/03/2021', createdBy: '1', updatedOn: '10/03/2021', updatedBy: '1' },
  ]);

  const [bankMasters, setBankMasters] = useState<SimpleItem[]>([
    { id: 1, name: 'FINO PAYMENTS BANK' },
    { id: 2, name: 'ABHYUDAYA CO-OPERATIVE BANK LTD' },
    { id: 3, name: 'AIRTEL PAYMENTS BANK' },
    { id: 4, name: 'AKOLA-WASHIM DISTRICT CENTRAL CO-OPERATIVE BANK' },
    { id: 5, name: 'AMBARNATH JAI-HIND CO-OP BANK LTD' },
    { id: 6, name: 'ANDHRA BANK' },
    { id: 7, name: 'AU SMALL FINANCE BANK' },
    { id: 8, name: 'AXIS BANK' },
    { id: 9, name: 'BAJAJ FINANCE LIMITED' },
    { id: 10, name: 'BANDHAN BANK' },
    { id: 11, name: 'BANK OF BARODA' },
    { id: 12, name: 'BANK OF INDIA' },
    { id: 13, name: 'HDFC BANK' },
    { id: 14, name: 'ICICI BANK' },
  ]);

  // Form states
  const [nameInput, setNameInput] = useState('');
  const [typeInput, setTypeInput] = useState('');
  const [accountGroupInput, setAccountGroupInput] = useState('');

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
    setAccountGroupInput('');
    setShowModal(true);
  };

  const handleOpenEditModal = (item: SimpleItem) => {
    setEditingItem(item);
    setNameInput(item.name || '');
    setTypeInput(item.type || '');
    setAccountGroupInput(item.accountGroup || item.description || '');
    setShowModal(true);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    if (activeTab === 'ledgerType') {
      const newItem = {
        id: editingItem ? editingItem.id : Date.now(),
        name: nameInput.toUpperCase(),
      };
      if (editingItem) {
        setLedgerTypes(prev => prev.map(t => (t.id === editingItem.id ? newItem : t)));
      } else {
        setLedgerTypes(prev => [...prev, newItem]);
      }
    } else if (activeTab === 'ledgerMaster') {
      const today = new Date().toLocaleDateString('en-GB');
      const newItem: SimpleItem = {
        id: editingItem ? editingItem.id : Date.now(),
        name: nameInput.toUpperCase(),
        type: typeInput.toUpperCase() || 'AGENT',
        accountGroup: accountGroupInput || 'SUNDRY DEBTOR',
        description: accountGroupInput || 'SUNDRY DEBTOR',
        createdOn: editingItem?.createdOn || today,
        createdBy: editingItem?.createdBy || '1',
        updatedOn: today,
        updatedBy: '1',
      };
      if (editingItem) {
        setLedgerMasters(prev => prev.map(m => (m.id === editingItem.id ? newItem : m)));
      } else {
        setLedgerMasters(prev => [...prev, newItem]);
      }
    } else if (activeTab === 'bankMaster') {
      const newItem = {
        id: editingItem ? editingItem.id : Date.now(),
        name: nameInput.toUpperCase(),
      };
      if (editingItem) {
        setBankMasters(prev => prev.map(b => (b.id === editingItem.id ? newItem : b)));
      } else {
        setBankMasters(prev => [...prev, newItem]);
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
    (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedData = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const subTabs: SubTab[] = ['ledgerType', 'ledgerMaster', 'bankMaster'];

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5">
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
          <div className="overflow-x-auto w-full custom-scrollbar">
            {activeTab === 'ledgerMaster' ? (
              /* Ledger Master Table */
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3.5 px-4 w-16">Sr. No.</th>
                    <th className="py-3.5 px-6">LEDGER NAME</th>
                    <th className="py-3.5 px-4">TYPE</th>
                    <th className="py-3.5 px-6">DESCRIPTION</th>
                    <th className="py-3.5 px-4">CREATED ON</th>
                    <th className="py-3.5 px-4 text-center">CREATED BY</th>
                    <th className="py-3.5 px-4">UPDATED ON</th>
                    <th className="py-3.5 px-4 text-center">UPDATED BY</th>
                    <th className="py-3.5 px-6 text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                  {paginatedData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-3.5 px-4 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="py-3.5 px-6 font-semibold text-[#12284A]">{item.name}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-600">{item.type || 'AGENT'}</td>
                      <td className="py-3.5 px-6 font-medium text-slate-700">{item.description || item.accountGroup || 'SUNDRY DEBTOR'}</td>
                      <td className="py-3.5 px-4 text-slate-600">{item.createdOn || '25/09/2021'}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">{item.createdBy || '1'}</td>
                      <td className="py-3.5 px-4 text-slate-600">{item.updatedOn || '25/09/2021'}</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-600">{item.updatedBy || '1'}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Edit Ledger Master"
                        >
                          <Edit2 size={18} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400 font-medium">
                        No Ledger Master records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : activeTab === 'bankMaster' ? (
              /* Bank Master Table showing ONLY TYPE & Action (Images 1 & 2) */
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3.5 px-6">TYPE</th>
                    <th className="py-3.5 px-6 text-right w-28">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-3.5 px-6 font-semibold text-[#12284A]">{item.name}</td>
                      <td className="py-3.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Edit Bank"
                          >
                            <Edit2 size={18} strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => setBankMasters(prev => prev.filter(b => b.id !== item.id))}
                            className="p-1.5 bg-[#F4F8FC] text-brand-error hover:bg-[#FEE2E2] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Delete Bank"
                          >
                            <Trash2 size={18} strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={2} className="py-8 text-center text-slate-400 font-medium">
                        No Bank Master records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              /* Standard Ledger Type Table */
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                    <th className="py-3.5 px-6 w-20">Sr. No.</th>
                    <th className="py-3.5 px-6">LEDGER TYPE NAME</th>
                    <th className="py-3.5 px-6 text-right w-24">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                  {paginatedData.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-3.5 px-6 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                      <td className="py-3.5 px-6 font-semibold text-[#12284A]">{item.name}</td>
                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                          title="Edit Ledger Type"
                        >
                          <Edit2 size={18} strokeWidth={1.5} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-slate-400 font-medium">
                        No Ledger Type records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
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
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-brand-navy text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
              <h2 className="text-base sm:text-lg font-bold">
                {activeTab === 'bankMaster'
                  ? '» Bank Master Form'
                  : activeTab === 'ledgerMaster'
                  ? '» Ledger Master Form'
                  : editingItem
                  ? `Edit ${getTabLabel(activeTab)}`
                  : `Add New ${getTabLabel(activeTab)}`}
              </h2>
              <button
                onClick={() => { setShowModal(false); setEditingItem(null); }}
                className="text-white/80 hover:text-white transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            {activeTab === 'ledgerMaster' ? (
              /* Ledger Master Modal Form */
              <form onSubmit={handleSaveForm} className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-65px)] custom-scrollbar">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Account Group</label>
                  <select
                    value={accountGroupInput}
                    onChange={(e) => setAccountGroupInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">--Select Account Group--</option>
                    <option value="SUNDRY DEBTOR">SUNDRY DEBTOR</option>
                    <option value="SUNDRY CREDITOR">SUNDRY CREDITOR</option>
                    <option value="DIRECT INCOME">DIRECT INCOME</option>
                    <option value="INDIRECT EXPENSE">INDIRECT EXPENSE</option>
                    <option value="BANK ACCOUNTS">BANK ACCOUNTS</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ledger Type</label>
                  <select
                    value={typeInput}
                    onChange={(e) => setTypeInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">--Select Ledger Type--</option>
                    {ledgerTypes.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                    <option value="AGENT">AGENT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ledger Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Ledger Name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div className="flex items-center justify-start gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0056B3] hover:bg-[#004085] text-white font-semibold rounded-md text-sm shadow-md transition-all cursor-pointer"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : activeTab === 'bankMaster' ? (
              /* Bank Master Modal Form showing ONLY Bank field (Image 2) */
              <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bank</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Bank Name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="flex items-center justify-start gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#0056B3] hover:bg-[#004085] text-white font-semibold rounded-md text-sm shadow-md transition-all cursor-pointer"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                  {editingItem && (
                    <button
                      type="button"
                      onClick={() => { setShowModal(false); setEditingItem(null); }}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-sm cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            ) : (
              /* Standard Ledger Type Form */
              <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Ledger Type Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Ledger Type Name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountMaster;
