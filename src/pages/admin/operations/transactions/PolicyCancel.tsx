import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, XCircle, Eye } from 'lucide-react';

interface PolicyRecord {
    id: number;
    policyNo: string;
    vehicleNo: string;
    financialYear: string;
    customerName: string;
    status: 'ACTIVE' | 'CANCELLED';
}

const PolicyCancel: React.FC = () => {
    // Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [financialYear, setFinancialYear] = useState('2025-2026');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy Data
    const [records] = useState<PolicyRecord[]>([
        { id: 1, policyNo: 'POL-10829399', vehicleNo: 'MH12AB1234', financialYear: '2025-2026', customerName: 'JOHN DOE', status: 'ACTIVE' },
        { id: 2, policyNo: 'POL-93827118', vehicleNo: 'MH14CD5678', financialYear: '2025-2026', customerName: 'AMIT SHARMA', status: 'ACTIVE' },
        { id: 3, policyNo: 'POL-33291048', vehicleNo: 'GJ01EF9012', financialYear: '2024-2025', customerName: 'RAJESH KUMAR', status: 'CANCELLED' },
    ]);

    // Handle Form Submit
    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setCurrentPage(1);
    };

    const handleCancelPolicy = (policyNo: string) => {
        if (window.confirm(`Are you sure you want to cancel policy ${policyNo}?`)) {
            // Placeholder logic
            alert(`Policy ${policyNo} cancellation requested.`);
        }
    };

    // Filter Logic
    const filteredRecords = records.filter(record => {
        const queryLower = searchQuery.toLowerCase();
        const matchesQuery = record.policyNo.toLowerCase().includes(queryLower) ||
            record.vehicleNo.toLowerCase().includes(queryLower);
        const matchesYear = financialYear === '' || record.financialYear === financialYear;
        return matchesQuery && matchesYear;
    });

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Header */}
            <PageHeader
                title="Policy Cancel"
                description="Search for active policies and manage cancellation requests."
            />

            {/* Filter Card */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Search Policy / Vehicle No.</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                            <input
                                type="text"
                                placeholder="Enter Policy / Vehicle No"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Financial Year</label>
                        <select
                            value={financialYear}
                            onChange={(e) => setFinancialYear(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px] cursor-pointer"
                        >
                            <option value="">All Years</option>
                            <option value="2025-2026">2025-2026</option>
                            <option value="2024-2025">2024-2025</option>
                            <option value="2023-2024">2023-2024</option>
                        </select>
                    </div>
                    <div className="flex items-center">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-8 flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px] border-none"
                        >
                            <Search size={16} />
                            <span>Search</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Data Grid */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap tracking-wide">
                                <th className="py-3 px-4 w-[60px]">ID</th>
                                <th className="py-3 px-4">Policy No</th>
                                <th className="py-3 px-4">Vehicle No</th>
                                <th className="py-3 px-4">Customer Name</th>
                                <th className="py-3 px-4">Financial Year</th>
                                <th className="py-3 px-4 text-center">Status</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                            {paginatedData.map((record) => (
                                <tr key={record.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                    <td className="py-2 px-4 font-medium text-brand-primary">{record.id}</td>
                                    <td className="py-2 px-4 font-mono font-bold text-slate-800">{record.policyNo}</td>
                                    <td className="py-2 px-4 font-mono font-medium">{record.vehicleNo}</td>
                                    <td className="py-2 px-4 font-medium uppercase">{record.customerName}</td>
                                    <td className="py-2 px-4">{record.financialYear}</td>
                                    <td className="py-2 px-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${record.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                                title="View Policy"
                                            >
                                                <Eye size={16} strokeWidth={2} />
                                            </button>
                                            {record.status === 'ACTIVE' && (
                                                <button
                                                    onClick={() => handleCancelPolicy(record.policyNo)}
                                                    className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                                    title="Cancel Policy"
                                                >
                                                    <XCircle size={16} strokeWidth={2} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                                        No policies found for the given search criteria.
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
                        Showing {filteredRecords.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
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
                                    ? 'bg-brand-primary text-white shadow-sm border border-brand-primary'
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

export default PolicyCancel;
