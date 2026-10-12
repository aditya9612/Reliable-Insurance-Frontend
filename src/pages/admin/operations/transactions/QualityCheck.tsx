import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, Eye, CheckCircle } from 'lucide-react';

interface QualityRecord {
    id: number;
    policyNo: string;
    customerName: string;
    agentName: string;
    insuranceCompany: string;
    date: string;
    status: 'PENDING' | 'CHECKED';
}

const QualityCheck: React.FC = () => {
    // Top Level Filters
    const [companyName, setCompanyName] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy Data
    const [records] = useState<QualityRecord[]>([
        { id: 1, policyNo: 'POL-1029384', customerName: 'RAJESH KUMAR', agentName: 'AMIT SHARMA', insuranceCompany: 'TATA AIG GENERAL', date: '2026-10-08', status: 'PENDING' },
        { id: 2, policyNo: 'POL-5928172', customerName: 'SNEHAL MANE', agentName: 'VAIBHAV RATHOD', insuranceCompany: 'HDFC ERGO', date: '2026-10-09', status: 'CHECKED' },
        { id: 3, policyNo: 'POL-8273615', customerName: 'JOHN DOE', agentName: 'AMIT SHARMA', insuranceCompany: 'SBI GENERAL', date: '2026-10-09', status: 'PENDING' },
    ]);

    const handleShow = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    // Filter Logic
    const filteredRecords = records.filter(record => {
        const queryLower = searchQuery.toLowerCase();
        // Table Searches (Merged)
        const matchQuery = record.policyNo.toLowerCase().includes(queryLower) ||
            record.agentName.toLowerCase().includes(queryLower) ||
            record.customerName.toLowerCase().includes(queryLower);

        // Top Filters
        const matchCompany = companyName === '' || record.insuranceCompany.toLowerCase().includes(companyName.toLowerCase());
        const matchFromDate = fromDate === '' || new Date(record.date) >= new Date(fromDate);
        const matchToDate = toDate === '' || new Date(record.date) <= new Date(toDate);

        return matchQuery && matchCompany && matchFromDate && matchToDate;
    });

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-5">
            <PageHeader
                title="Quality Check"
                description="Verify and audit complete application and transaction entries."
            />

            {/* Data Grid Section with Integrated Filters */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Unified Data Grid Toolbar */}
                <div className="p-4 bg-white border-b border-brand-border">
                    <form onSubmit={handleShow} className="flex flex-col md:flex-row gap-4 items-end justify-between">
                        {/* Left Side: Search Bar */}
                        <div className="w-full md:w-80 shrink-0">
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Search Records</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search Policy No, Agent, or Customer"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                                />
                            </div>
                        </div>

                        {/* Right Side: Filters and Button */}
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="w-full md:w-44 shrink-0">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Company</label>
                                <select
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px] cursor-pointer bg-white"
                                >
                                    <option value="">--ALL--</option>
                                    <option value="tata">Tata AIG</option>
                                    <option value="hdfc">HDFC Ergo</option>
                                    <option value="sbi">SBI General</option>
                                </select>
                            </div>
                            <div className="w-full md:w-36 shrink-0">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">From Date</label>
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => setFromDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px]"
                                />
                            </div>
                            <div className="w-full md:w-36 shrink-0">
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">To Date</label>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => setToDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px]"
                                />
                            </div>
                            <div className="w-full md:w-28 shrink-0 flex items-center">
                                <button
                                    type="submit"
                                    className="w-full px-6 flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]"
                                >
                                    <span>Show</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Table */}
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap tracking-wide">
                                <th className="py-3 px-4 w-[60px] text-center">ID</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4">Policy No</th>
                                <th className="py-3 px-4">Customer Name</th>
                                <th className="py-3 px-4">Agent Name</th>
                                <th className="py-3 px-4">Insurance Company</th>
                                <th className="py-3 px-4 text-center">QC Status</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                            {paginatedData.map((record) => (
                                <tr key={record.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                    <td className="py-2 px-4 font-medium text-brand-primary text-center">{record.id}</td>
                                    <td className="py-2 px-4">{record.date}</td>
                                    <td className="py-2 px-4 font-mono font-bold text-slate-800">{record.policyNo}</td>
                                    <td className="py-2 px-4 font-medium uppercase">{record.customerName}</td>
                                    <td className="py-2 px-4 uppercase">{record.agentName}</td>
                                    <td className="py-2 px-4 font-medium">{record.insuranceCompany}</td>
                                    <td className="py-2 px-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-[11px] font-semibold tracking-wide ${record.status === 'CHECKED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                                title="View Details"
                                            >
                                                <Eye size={16} strokeWidth={2} />
                                            </button>
                                            {record.status === 'PENDING' && (
                                                <button
                                                    className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                                    title="Mark as Checked"
                                                >
                                                    <CheckCircle size={16} strokeWidth={2} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-slate-500 font-medium">
                                        No quality check records found for the given search criteria.
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

export default QualityCheck;
