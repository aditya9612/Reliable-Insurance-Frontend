import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import { CheckCircle2, Search, Eye, X, Paperclip } from 'lucide-react';

export type SupportSubTab = 'request' | 'report';

interface SupportTicket {
  id: number;
  ticketNo: string;
  supportDate: string;
  supportType: string;
  description: string;
  attachmentName?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  submittedBy: string;
  department: string;
}

const tabs: TabItem[] = [
  { id: 'request', label: 'Request' },
  { id: 'report', label: 'Report' },
];

export const SupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SupportSubTab>('request');

  // Request Form States (Matching image fields)
  const [supportDate, setSupportDate] = useState('08/10/2026 11:36:51');
  const [supportType, setSupportType] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  // Filter States for Report Tab
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Sample Support Tickets Data
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 1,
      ticketNo: 'IT-2026-0104',
      supportDate: '08/10/2026 11:36:51',
      supportType: 'Software Issue',
      description: 'Unable to access Policy Master creation page due to network timeout.',
      attachmentName: 'error_screenshot.png',
      status: 'Pending',
      submittedBy: 'ARVIND DNYANESHWAR GAWADE',
      department: 'Sales'
    },
    {
      id: 2,
      ticketNo: 'IT-2026-0098',
      supportDate: '07/10/2026 14:20:10',
      supportType: 'Hardware Issue',
      description: 'Desktop computer printer disconnected from local network.',
      attachmentName: 'printer_log.txt',
      status: 'In Progress',
      submittedBy: 'ADITYA RAJENDRA SAPKAL',
      department: 'Accounts'
    },
    {
      id: 3,
      ticketNo: 'IT-2026-0082',
      supportDate: '05/10/2026 09:45:30',
      supportType: 'Email & Account Access',
      description: 'Password reset request for official email account.',
      status: 'Resolved',
      submittedBy: 'AMOL RAMCHANDRA WANAVE',
      department: 'Operations'
    },
    {
      id: 4,
      ticketNo: 'IT-2026-0071',
      supportDate: '02/10/2026 16:15:00',
      supportType: 'Network / Internet',
      description: 'Wi-Fi connection fluctuating on 2nd floor branch office.',
      status: 'Resolved',
      submittedBy: 'AVINASH BHARAT KORATKAR',
      department: 'Underwriting'
    },
    {
      id: 5,
      ticketNo: 'IT-2026-0065',
      supportDate: '28/09/2026 10:05:44',
      supportType: 'ERP / Portal Bug',
      description: 'Target calculation total misaligned in monthly summary report.',
      attachmentName: 'target_bug_report.pdf',
      status: 'Resolved',
      submittedBy: 'HEMANT RAJU KAKULTE',
      department: 'Management'
    }
  ]);

  // Ticket Detail View Modal
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const supportTypeList = [
    'Hardware Issue',
    'Software Issue',
    'Network / Internet',
    'Email & Account Access',
    'Printer & Peripherals',
    'ERP / Portal Bug',
    'Other Support'
  ];

  // Handle Upload click
  const handleFileUpload = () => {
    if (!selectedFile) {
      showToast('Please select a file first!');
      return;
    }
    setIsFileUploaded(true);
    showToast(`File "${selectedFile.name}" uploaded successfully!`);
  };

  // Handle Form Submit
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportType || supportType === '--Select Support Type--') {
      showToast('Please select a Support Type!');
      return;
    }
    if (!description.trim()) {
      showToast('Please enter a Description!');
      return;
    }

    const newTicket: SupportTicket = {
      id: Date.now(),
      ticketNo: `IT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      supportDate: supportDate || new Date().toLocaleString(),
      supportType,
      description,
      attachmentName: isFileUploaded && selectedFile ? selectedFile.name : undefined,
      status: 'Pending',
      submittedBy: 'CURRENT USER',
      department: 'Operations'
    };

    setTickets(prev => [newTicket, ...prev]);
    showToast(`Request submitted successfully! Ticket #${newTicket.ticketNo}`);
    
    // Reset form
    setSupportType('');
    setDescription('');
    setSelectedFile(null);
    setIsFileUploaded(false);
  };

  // Filtered dataset for Report tab
  const filteredTickets = tickets.filter(item => {
    const matchQuery = !searchQuery ||
      item.ticketNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = !filterType || filterType === '--Select Support Type--' || item.supportType === filterType;
    return matchQuery && matchType;
  });

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage) || 1;
  const paginatedTickets = filteredTickets.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
        title="IT Support Portal"
        description="Raise IT support requests, track issues, and view support ticket resolution status"
      />

      {/* Sub-Tabs Bar (Request & Report) */}
      <UnderlineTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => {
          setActiveTab(tabId as SupportSubTab);
          setCurrentPage(1);
        }}
      />

      {/* Main Tab Content Wrapper */}
      <div key={activeTab} className="tab-transition-wrapper w-full max-w-full">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full max-w-full">

          {/* ========================================================================= */}
          {/* TAB 1: REQUEST (Target Page Color Palette Alignment) */}
          {/* ========================================================================= */}
          {activeTab === 'request' && (
            <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
              {/* Form Card Container */}
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                {/* Standard Card Header Banner (Matching TargetPage) */}
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between">
                  <span>» IT Support Portal</span>
                </div>

                <form onSubmit={handleSubmitRequest} className="p-5 sm:p-8 space-y-6 bg-brand-mainbg">
                  {/* Top Row: Support Date & Support Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
                    {/* Support Date */}
                    <div>
                      <label className="block text-xs font-bold text-brand-navy mb-1.5">
                        Support Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={supportDate}
                        onChange={(e) => setSupportDate(e.target.value)}
                        className="w-full max-w-xs px-3.5 py-2 border border-slate-300 rounded-lg text-xs bg-slate-100 text-brand-navy font-mono"
                      />
                    </div>

                    {/* Support Type */}
                    <div>
                      <label className="block text-xs font-bold text-brand-navy mb-1.5">
                        Support Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={supportType}
                        onChange={(e) => setSupportType(e.target.value)}
                        className="w-full max-w-xs px-3.5 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Support Type--</option>
                        {supportTypeList.map(st => <option key={st} value={st}>{st}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Description Row */}
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1.5">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter details about your issue..."
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary resize-y"
                    />
                  </div>

                  {/* File Upload Section */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-brand-navy">
                      Attach
                    </label>
                    <div className="flex flex-wrap items-center gap-4">
                      {/* Standard File Input */}
                      <input
                        type="file"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setSelectedFile(e.target.files[0]);
                            setIsFileUploaded(false);
                          }
                        }}
                        className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-white file:text-brand-navy hover:file:bg-slate-50 cursor-pointer"
                      />

                      {/* Upload Button (Matching TargetPage brand blue button) */}
                      <button
                        type="button"
                        onClick={handleFileUpload}
                        className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none uppercase"
                      >
                        Upload
                      </button>
                    </div>

                    {/* Red Warning Note below attachment */}
                    <p className="text-xs font-bold text-red-500 pt-1">
                      * after choose file Click on Upload
                    </p>
                  </div>

                  {/* Submit Button (Matching TargetPage brand blue button) */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-8 py-2.5 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-md transition-all duration-200 cursor-pointer border-none uppercase"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: REPORT (Target Page Color Palette Alignment) */}
          {/* ========================================================================= */}
          {activeTab === 'report' && (
            <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
              {/* Filter Box Container */}
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between">
                  <span>» IT Support Requests Report</span>
                </div>

                <div className="p-4 sm:p-6 space-y-4 bg-brand-mainbg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-brand-navy mb-1">Search Keyword / Ticket No</label>
                      <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="text"
                          placeholder="Search Ticket No, Executive Name, Description..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy mb-1">Support Type</label>
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Support Type--</option>
                        {supportTypeList.map(st => <option key={st} value={st}>{st}</option>)}
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => showToast('Support report loaded')}
                        className="flex-1 px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none uppercase"
                      >
                        Show
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast('Report exported as Excel file')}
                        className="flex-1 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none uppercase"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto w-full max-w-full border border-brand-border rounded-[12px] bg-white custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] sm:text-[14px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4 text-center w-16">SR. NO.</th>
                      <th className="py-3 px-4">TICKET NO.</th>
                      <th className="py-3 px-4">DATE & TIME</th>
                      <th className="py-3 px-4">SUPPORT TYPE</th>
                      <th className="py-3 px-6">SUBMITTED BY</th>
                      <th className="py-3 px-6">DESCRIPTION</th>
                      <th className="py-3 px-4 text-center">ATTACHMENT</th>
                      <th className="py-3 px-4 text-center">STATUS</th>
                      <th className="py-3 px-4 text-center">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[14px]">
                    {paginatedTickets.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-brand-muted font-semibold uppercase bg-brand-mainbg">
                          NO SUPPORT TICKETS FOUND
                        </td>
                      </tr>
                    ) : (
                      paginatedTickets.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                          <td className="py-2 px-4 text-center font-medium text-slate-500">{idx + 1}</td>
                          <td className="py-2 px-4 font-bold font-mono text-brand-primary">{row.ticketNo}</td>
                          <td className="py-2 px-4 font-medium text-slate-600 text-xs">{row.supportDate}</td>
                          <td className="py-2 px-4 font-semibold text-brand-navy">{row.supportType}</td>
                          <td className="py-2 px-6 font-medium text-slate-700">{row.submittedBy}</td>
                          <td className="py-2 px-6 text-slate-600 text-xs truncate max-w-xs" title={row.description}>
                            {row.description}
                          </td>
                          <td className="py-2 px-4 text-center">
                            {row.attachmentName ? (
                              <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline cursor-pointer">
                                <Paperclip size={14} />
                                {row.attachmentName}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-xs">-</span>
                            )}
                          </td>
                          <td className="py-2 px-4 text-center">
                            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                              row.status === 'Resolved'
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                : row.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                : 'bg-amber-100 text-amber-700 border border-amber-200'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                          <td className="py-2 px-4 text-center">
                            <button
                              type="button"
                              onClick={() => setSelectedTicket(row)}
                              className="px-3 py-1 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] text-xs font-bold transition cursor-pointer border-none flex items-center justify-center gap-1 mx-auto"
                            >
                              <Eye size={14} />
                              <span>View</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-[12px]">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <span>Records per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredTickets.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredTickets.length)} of {filteredTickets.length} records
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center text-xs text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 cursor-pointer">&lt;</button>
                  <button className="w-8 h-8 bg-brand-primary text-white font-bold text-xs rounded-md">{currentPage}</button>
                  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="w-8 h-8 flex items-center justify-center text-xs text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 cursor-pointer">&gt;</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-brand-navy text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
              <h2 className="text-base sm:text-lg font-bold">» Support Ticket Details (#{selectedTicket.ticketNo})</h2>
              <button onClick={() => setSelectedTicket(null)} className="text-white/80 hover:text-white transition-colors cursor-pointer border-none bg-transparent">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block">Ticket No:</span>
                  <span className="font-bold text-brand-navy font-mono text-sm">{selectedTicket.ticketNo}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Status:</span>
                  <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full mt-1 ${
                    selectedTicket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}>{selectedTicket.status}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Support Date:</span>
                  <span className="font-semibold text-slate-700">{selectedTicket.supportDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Support Type:</span>
                  <span className="font-semibold text-brand-navy">{selectedTicket.supportType}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Submitted By:</span>
                  <span className="font-semibold text-slate-700">{selectedTicket.submittedBy}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold block">Department:</span>
                  <span className="font-semibold text-slate-700">{selectedTicket.department}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs text-slate-500 font-semibold block mb-1">Description:</span>
                <p className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-800 leading-relaxed">
                  {selectedTicket.description}
                </p>
              </div>

              {selectedTicket.attachmentName && (
                <div className="pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500 font-semibold block mb-1">Attachment:</span>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700 font-semibold">
                    <Paperclip size={16} />
                    <span>{selectedTicket.attachmentName}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="px-5 py-2 bg-brand-primary text-white font-semibold rounded-lg text-xs shadow cursor-pointer border-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;
