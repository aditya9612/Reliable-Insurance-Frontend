import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Edit2, Search, X, Plus } from 'lucide-react';

interface CorporateClient {
    id: number;
    companyName: string;
    addressLine1: string;
    addressLine2: string;
    taluka: string;
    district: string;
    state: string;
    contactNo: string;
}

const CorporateClient: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<CorporateClient | null>(null);

    // Initial dummy data matching screenshot
    const [clients, setClients] = useState<CorporateClient[]>([
        { id: 1, companyName: 'NA', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 2, companyName: 'AJINATH PRAKASH TALEKAR', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 3, companyName: 'AMIT ASHOK BHOITE', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 4, companyName: 'ANAND PRAKASHRAO KHANDAGALE', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 5, companyName: 'ANIL SHANKAR DOIPHODE', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 6, companyName: 'ANIL SHIVAJIRAO DESHMUKH', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 7, companyName: 'ANJU BHAGWANDASS SINGHAL', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 8, companyName: 'ARVIND JAGANNATH BHOSALE', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 9, companyName: 'AVINASH ARJUN SAWANT', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' },
        { id: 10, companyName: 'BALKRISHNA HANUMANT JADHAV', addressLine1: '-', addressLine2: '-', taluka: 'BARAMATI', district: 'PUNE', state: 'MAHARASHTRA', contactNo: '--' }
    ]);

    // Form inputs state
    const [formData, setFormData] = useState({
        companyName: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        district: '',
        taluka: '',
        contactNo: ''
    });

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleOpenCreateModal = () => {
        setEditingItem(null);
        setFormData({
            companyName: '',
            addressLine1: '',
            addressLine2: '',
            state: '',
            district: '',
            taluka: '',
            contactNo: ''
        });
        setShowModal(true);
    };

    const handleOpenEditModal = (client: CorporateClient) => {
        setEditingItem(client);
        setFormData({
            companyName: client.companyName,
            addressLine1: client.addressLine1,
            addressLine2: client.addressLine2,
            state: client.state,
            district: client.district,
            taluka: client.taluka,
            contactNo: client.contactNo
        });
        setShowModal(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            setClients(prev => prev.map(c =>
                c.id === editingItem.id ? {
                    ...c,
                    ...formData,
                    companyName: formData.companyName.toUpperCase()
                } : c
            ));
        } else {
            setClients([
                ...clients,
                {
                    id: clients.length > 0 ? Math.max(...clients.map(c => c.id)) + 1 : 1,
                    ...formData,
                    companyName: formData.companyName.toUpperCase()
                }
            ]);
        }
        setShowModal(false);
    };

    // Filtered and Paginated data
    const filteredClients = clients.filter(c =>
        c.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.contactNo.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
    const paginatedData = filteredClients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Header */}
            <PageHeader
                title="Corporate Client"
                description="Manage and maintain corporate client directories and addresses."
            />

            {/* Main Content Card */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Table Toolbar */}
                <div className="p-4 bg-white border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                        <input
                            type="text"
                            placeholder="Search by Company Name or Contact No..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>

                    <button
                        onClick={handleOpenCreateModal}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] font-semibold text-[14px] shadow-sm transition-all duration-200 cursor-pointer border-none"
                    >
                        <span>Add New Client</span>
                    </button>
                </div>

                {/* Full Width Table View */}
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                <th className="py-3 px-4 w-[60px]">ID</th>
                                <th className="py-3 px-4">COMPANY NAME</th>
                                <th className="py-3 px-4">ADDRESSLINE1</th>
                                <th className="py-3 px-4">ADDRESSLINE2</th>
                                <th className="py-3 px-4">TALUKA</th>
                                <th className="py-3 px-4">DISTRICT</th>
                                <th className="py-3 px-4">STATE</th>
                                <th className="py-3 px-4 w-[120px]">CONTACT NO</th>
                                <th className="py-3 px-4 text-center w-[80px]">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px]">
                            {paginatedData.map((client) => (
                                <tr key={client.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                    <td className="py-2 px-4 font-medium text-brand-primary">{client.id}</td>
                                    <td className="py-2 px-4 font-semibold text-[#12284A]">{client.companyName}</td>
                                    <td className="py-2 px-4 text-brand-muted">{client.addressLine1}</td>
                                    <td className="py-2 px-4 text-brand-muted">{client.addressLine2}</td>
                                    <td className="py-2 px-4 text-brand-navy">{client.taluka}</td>
                                    <td className="py-2 px-4 text-brand-navy">{client.district}</td>
                                    <td className="py-2 px-4 text-brand-navy">{client.state}</td>
                                    <td className="py-2 px-4 font-medium">{client.contactNo}</td>
                                    <td className="py-2 px-4 text-center">
                                        <button
                                            onClick={() => handleOpenEditModal(client)}
                                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                            title="Edit Client"
                                        >
                                            <Edit2 size={16} strokeWidth={2} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
                            className="px-2 py-1 bg-white border border-brand-border rounded-md text-sm font-semibold text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>

                    <span className="text-sm text-brand-muted font-medium">
                        Showing {filteredClients.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredClients.length)} of {filteredClients.length} records
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

            {/* Modal for Add / Edit */}
            {showModal && createPortal(
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl my-auto flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between shrink-0">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <span>
                                    » {editingItem ? 'Edit Corporate Client' : 'Add Corporate Client'}
                                </span>
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSave} className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Address Line 1</label>
                                    <input
                                        type="text"
                                        value={formData.addressLine1}
                                        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Address Line 2</label>
                                    <input
                                        type="text"
                                        value={formData.addressLine2}
                                        onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">State</label>
                                    <select
                                        value={formData.state}
                                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                                    >
                                        <option value="">--Select State--</option>
                                        <option value="MAHARASHTRA">MAHARASHTRA</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">District</label>
                                    <select
                                        value={formData.district}
                                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                                    >
                                        <option value="">--Select District--</option>
                                        <option value="PUNE">PUNE</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Taluka</label>
                                    <select
                                        value={formData.taluka}
                                        onChange={(e) => setFormData({ ...formData, taluka: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                                    >
                                        <option value="">--Select Taluka--</option>
                                        <option value="NA">NA</option>
                                        <option value="BARAMATI">BARAMATI</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Contact No</label>
                                    <input
                                        type="text"
                                        value={formData.contactNo}
                                        onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold rounded-[8px] text-sm shadow-sm transition-all cursor-pointer"
                                >
                                    {editingItem ? 'Update Client' : 'Save Client'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default CorporateClient;
