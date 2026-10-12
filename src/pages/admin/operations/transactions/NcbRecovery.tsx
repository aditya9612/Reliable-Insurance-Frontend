import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, Eye } from 'lucide-react';

interface NcbRecord {
    id: number;
    financialYear: string;
    registrationNo: string;
    policyNo: string;
    customerName: string;
    ncbAmount: number;
    status: 'RECOVERED' | 'PENDING';
}

const NcbRecovery: React.FC = () => {
    // Filter State
    const [financialYear, setFinancialYear] = useState('2025-2026');
    const [registrationNo, setRegistrationNo] = useState('');
    const [policyNo, setPolicyNo] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy Data
    const [records] = useState<NcbRecord[]>([
        { id: 1, financialYear: '2025-2026', registrationNo: 'MH12AB1234', policyNo: 'POL-9382104', customerName: 'JOHN DOE', ncbAmount: 1540, status: 'PENDING' },
        { id: 2, financialYear: '2025-2026', registrationNo: 'MH14CD5678', policyNo: 'POL-1029384', customerName: 'RAJESH KUMAR', ncbAmount: 3200, status: 'RECOVERED' },
        { id: 3, financialYear: '2024-2025', registrationNo: 'GJ01EF9012', policyNo: 'POL-3329482', customerName: 'SNEHAL MANE', ncbAmount: 850, status: 'PENDING' }
    ]);

    const handleView = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    // Filter Logic
    const filteredRecords = records.filter(record => {
        const matchYear = financialYear === '' || record.financialYear === financialYear;
        const matchReg = registrationNo === '' || record.registrationNo.toLowerCase().includes(registrationNo.toLowerCase());
        const matchPolicy = policyNo === '' || record.policyNo.toLowerCase().includes(policyNo.toLowerCase());
        return matchYear && matchReg && matchPolicy;
    });

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-6">
            <PageHeader
                title="NCB Recovery"
                description="Manage and track No Claim Bonus recovery transactions."
            />

            {/* Filter Card */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                <form onSubmit={handleView} className="flex flex-col space-y-5">

                    {/* Top Row: Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Financial Year</label>
                            <select
                                value={financialYear}
                                onChange={(e) => setFinancialYear(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px] cursor-pointer bg-white"
                            >
                                <option value="">Select Year</option>
                                <option value="2025-2026">2025-2026</option>
                                <option value="2024-2025">2024-2025</option>
                                <option value="2023-2024">2023-2024</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Registration No.</label>
                            <input
                                type="text"
                                value={registrationNo}
                                onChange={(e) => setRegistrationNo(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Policy No.</label>
                            <input
                                type="text"
                                value={policyNo}
                                onChange={(e) => setPolicyNo(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px]"
                            />
                        </div>
                    </div>

                    {/* Bottom Row: View Button */}
                    <div className="flex items-center pt-2">
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-8 flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]"
                        >
                            <span>View</span>
                        </button>
                    </div>
                </form>
            </div>

            {/* Data Grid */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap tracking-wide">
                                <th className="py-3 px-4 w-[60px] text-center">ID</th>
                                <th className="py-3 px-4">Financial Year</th>
                                <th className="py-3 px-4">Registration No</th>
                                <th className="py-3 px-4">Policy No</th>
                                <th className="py-3 px-4">Customer Name</th>
                                <th className="py-3 px-4 text-right">NCB Amount</th>
                                <th className="py-3 px-4 text-center">Status</th>
                                <th className="py-3 px-4 text-center sticky right-0 bg-brand-lightbg shadow-[-2px_0_4px_rgba(0,0,0,0.02)]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                            {paginatedData.map((record) => (
                                <tr key={record.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                    <td className="py-2 px-4 font-medium text-brand-primary text-center">{record.id}</td>
                                    <td className="py-2 px-4 font-medium">{record.financialYear}</td>
                                    <td className="py-2 px-4 font-mono font-medium">{record.registrationNo}</td>
                                    <td className="py-2 px-4 font-mono font-bold text-slate-800">{record.policyNo}</td>
                                    <td className="py-2 px-4 uppercase">{record.customerName}</td>
                                    <td className="py-2 px-4 text-right font-medium">₹{record.ncbAmount.toLocaleString('en-IN')}</td>
                                    <td className="py-2 px-4 text-center">
                                        <span className={`px-2 py-1 rounded-full text-[11px] font-semibold tracking-wide ${record.status === 'RECOVERED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                            {record.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 text-center sticky right-0 bg-white shadow-[-2px_0_4px_rgba(0,0,0,0.02)] group-hover:bg-brand-mainbg transition-colors">
                                        <button
                                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                            title="View Recovery Details"
                                        >
                                            <Eye size={16} strokeWidth={2} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-slate-500 font-medium">
                                        No recovery records found.
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

export default NcbRecovery;
