import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, Download, Eye, FileText } from 'lucide-react';

interface PolicyDocument {
    id: number;
    customerFirstName: string;
    vehicleNo: string;
    policyNo: string;
    issueDate: string;
    status: string;
}

const ViewPolicyDocument: React.FC = () => {
    // Filter Form State
    const [filterCustomerName, setFilterCustomerName] = useState('');
    const [filterVehicleNo, setFilterVehicleNo] = useState('');

    // Table Search State
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy Data
    const [documents, setDocuments] = useState<PolicyDocument[]>([
        { id: 1, customerFirstName: 'JOHN', vehicleNo: 'MH12AB1234', policyNo: 'POL-100293', issueDate: '2025-10-12', status: 'Active' },
        { id: 2, customerFirstName: 'AMIT', vehicleNo: 'MH14CD5678', policyNo: 'POL-100294', issueDate: '2025-10-15', status: 'Pending' },
        { id: 3, customerFirstName: 'RAJESH', vehicleNo: 'MH42EF9012', policyNo: 'POL-100295', issueDate: '2025-10-18', status: 'Active' },
        { id: 4, customerFirstName: 'ANITA', vehicleNo: 'MH12GH3456', policyNo: 'POL-100296', issueDate: '2025-10-20', status: 'Expired' },
        { id: 5, customerFirstName: 'SURESH', vehicleNo: 'MH09IJ7890', policyNo: 'POL-100297', issueDate: '2025-10-22', status: 'Active' },
    ]);

    const handleShow = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, this would trigger an API call with filterCustomerName and filterVehicleNo
        setCurrentPage(1);
    };

    const handleExport = () => {
        // Export functionality placeholder
        alert('Exporting data...');
    };

    // Filter by form inputs (if applied) and table search query
    const filteredDocuments = documents.filter(doc => {
        const matchesForm =
            doc.customerFirstName.toLowerCase().includes(filterCustomerName.toLowerCase()) &&
            doc.vehicleNo.toLowerCase().includes(filterVehicleNo.toLowerCase());

        const matchesSearch =
            doc.customerFirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.policyNo.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesForm && matchesSearch;
    });

    const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
    const paginatedData = filteredDocuments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Header */}
            <PageHeader
                title="View Policy Document"
                description="Search and view customer policy documents."
            />

            {/* Filter Card */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                <form onSubmit={handleShow} className="flex flex-col sm:flex-row items-end gap-5">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Customer First Name</label>
                        <input
                            type="text"
                            value={filterCustomerName}
                            onChange={(e) => setFilterCustomerName(e.target.value)}
                            placeholder="Enter Customer Name"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Vehicle No.</label>
                        <input
                            type="text"
                            value={filterVehicleNo}
                            onChange={(e) => setFilterVehicleNo(e.target.value)}
                            placeholder="Enter Vehicle No."
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                        <button
                            type="submit"
                            className="flex-1 sm:flex-none px-8 flex items-center justify-center gap-2 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]"
                        >
                            <Search size={16} />
                            <span>Show</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleExport}
                            className="flex-1 sm:flex-none px-6 flex items-center justify-center gap-2 py-2 bg-white border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]"
                        >
                            <Download size={16} />
                            <span>Export</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Main Content Card / Table */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Table Toolbar */}
                <div className="p-4 bg-white border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                        <input
                            type="text"
                            placeholder="Search Customer Name Here..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>
                </div>

                {/* Full Width Table View */}
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                <th className="py-3 px-4 w-[60px]">ID</th>
                                <th className="py-3 px-4">CUSTOMER NAME</th>
                                <th className="py-3 px-4">VEHICLE NO</th>
                                <th className="py-3 px-4">POLICY NO</th>
                                <th className="py-3 px-4">ISSUE DATE</th>
                                <th className="py-3 px-4">STATUS</th>
                                <th className="py-3 px-4 text-center w-[120px]">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px]">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((doc) => (
                                    <tr key={doc.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                        <td className="py-2 px-4 font-medium text-brand-primary">{doc.id}</td>
                                        <td className="py-2 px-4 font-semibold text-[#12284A]">{doc.customerFirstName}</td>
                                        <td className="py-2 px-4 text-brand-navy font-medium">{doc.vehicleNo}</td>
                                        <td className="py-2 px-4 text-brand-navy">{doc.policyNo}</td>
                                        <td className="py-2 px-4 text-brand-muted">{doc.issueDate}</td>
                                        <td className="py-2 px-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${doc.status === 'Active' ? 'bg-green-100 text-green-700' :
                                                doc.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-red-100 text-red-700'
                                                }`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="py-2 px-4 text-center">
                                            <button
                                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center mr-2"
                                                title="View Document"
                                            >
                                                <Eye size={16} strokeWidth={2} />
                                            </button>
                                            <button
                                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                                title="Download PDF"
                                            >
                                                <FileText size={16} strokeWidth={2} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-slate-500">
                                        No documents found. Adjust filters or search query.
                                    </td>
                                </tr>
                            )}
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
                        Showing {filteredDocuments.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredDocuments.length)} of {filteredDocuments.length} records
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
    );
};

export default ViewPolicyDocument;
