import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, RotateCcw, Save } from 'lucide-react';

interface RecalculateRecord {
    id: number;
    policyNo: string;
    customerName: string;
    insuranceCompany: string;
    agent: string;
    issueDate: string;
    currentPremium: string;
}

const ReopenRecalculate: React.FC = () => {
    // Filter State
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [insuranceCompany, setInsuranceCompany] = useState('');
    const [branch, setBranch] = useState('');
    const [agent, setAgent] = useState('');
    const [policyType, setPolicyType] = useState('');

    const [hasSearched, setHasSearched] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy Data
    const [records] = useState<RecalculateRecord[]>([
        { id: 1, policyNo: 'POL-39912', customerName: 'Ramesh Patil', insuranceCompany: 'TATA AIG', agent: 'Santosh Vitthalrao (AGT-8801)', issueDate: '2026-10-01', currentPremium: '₹ 12,400' },
        { id: 2, policyNo: 'POL-39915', customerName: 'Kavita Deshmukh', insuranceCompany: 'BAJAJ ALLIANZ', agent: 'Kavita Rajesh (AGT-8802)', issueDate: '2026-10-05', currentPremium: '₹ 8,950' },
    ]);

    const handleView = (e: React.FormEvent) => {
        e.preventDefault();
        setHasSearched(true);
        setCurrentPage(1);
    };

    const handleSubmit = () => {
        alert('Data submitted successfully.');
    };

    // Filter Logic
    const displayedRecords = hasSearched
        ? records.filter(record =>
            record.policyNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.customerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    const totalPages = Math.ceil(displayedRecords.length / itemsPerPage);
    const paginatedData = displayedRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Header */}
            <PageHeader
                title="Reopen Recalculate"
                description="Reopen locked policies and recalculate premium entries."
            />

            {/* Filter Section */}
            <form onSubmit={handleView} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">From Date</label>
                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="w-full px-3.5 py-2 min-h-[38px] border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">To Date</label>
                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="w-full px-3.5 py-2 min-h-[38px] border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">Insurance Company</label>
                        <select
                            value={insuranceCompany}
                            onChange={(e) => setInsuranceCompany(e.target.value)}
                            className="w-full px-3.5 py-2 min-h-[38px] border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                        >
                            <option value="">--Select Company--</option>
                            <option value="TATA AIG">TATA AIG GENERAL INSURANCE</option>
                            <option value="BAJAJ">BAJAJ ALLIANZ GENERAL INSURANCE</option>
                            <option value="HDFC">HDFC ERGO</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">Branch</label>
                        <select
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                            className="w-full px-3.5 py-2 min-h-[38px] border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                        >
                            <option value="">--Select Branch--</option>
                            <option value="BARAMATI">BARAMATI</option>
                            <option value="PUNE">PUNE</option>
                            <option value="MUMBAI">MUMBAI</option>
                        </select>
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">Agent</label>
                        <select
                            value={agent}
                            onChange={(e) => setAgent(e.target.value)}
                            className="w-full px-3.5 py-2 min-h-[38px] border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                        >
                            <option value="">--Select Agent--</option>
                            <option value="AGT-8801">Santosh Vitthalrao Patil (AGT-8801)</option>
                            <option value="AGT-8802">Kavita Rajesh Deshmukh (AGT-8802)</option>
                        </select>
                    </div>
                    <div className="lg:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase">Policy Type</label>
                        <div className="flex gap-3">
                            <select
                                value={policyType}
                                onChange={(e) => setPolicyType(e.target.value)}
                                className="flex-1 px-3.5 py-2 min-h-[38px] border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                            >
                                <option value="">--Select Policy Type--</option>
                                <option value="COMPREHENSIVE">COMPREHENSIVE (PACKAGE)</option>
                                <option value="THIRD_PARTY">THIRD PARTY (LIABILITY)</option>
                                <option value="STANDALONE_OD">STANDALONE OD</option>
                            </select>
                            <button
                                type="submit"
                                className="px-8 flex items-center justify-center gap-2 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer min-h-[38px] border-none"
                            >
                                <Search size={16} />
                                <span>View</span>
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="flex justify-start">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-8 flex items-center justify-center gap-2 py-2.5 bg-brand-success hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer"
                >
                    <Save size={16} />
                    <span>Submit</span>
                </button>
            </div>

            {/* Content Table / Data Grid */}
            <div className="bg-white rounded-[12px] border border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                {/* Search Toolbar */}
                {hasSearched && (
                    <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Policy No or Customer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-[14px] text-slate-700 placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                            />
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto w-full custom-scrollbar">
                    {hasSearched && displayedRecords.length > 0 ? (
                        <table className="w-full text-left border-collapse min-w-[1000px]">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 text-[12px] font-semibold uppercase tracking-wider border-b border-slate-200">
                                    <th className="py-3 px-5">Policy No</th>
                                    <th className="py-3 px-5">Customer Name</th>
                                    <th className="py-3 px-5">Insurance Company</th>
                                    <th className="py-3 px-5">Agent</th>
                                    <th className="py-3 px-5">Issue Date</th>
                                    <th className="py-3 px-5 text-right">Premium</th>
                                    <th className="py-3 px-5 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-[13px] text-slate-700">
                                {paginatedData.map((record) => (
                                    <tr key={record.id} className="hover:bg-blue-50/30 transition-colors bg-white">
                                        <td className="py-3 px-5 font-medium text-brand-primary">{record.policyNo}</td>
                                        <td className="py-3 px-5 font-semibold text-slate-900">{record.customerName}</td>
                                        <td className="py-3 px-5">{record.insuranceCompany}</td>
                                        <td className="py-3 px-5 text-xs font-medium bg-slate-50 rounded inline-block mt-2 mb-2 ml-4 border border-slate-100 px-2 py-1">{record.agent}</td>
                                        <td className="py-3 px-5">{record.issueDate}</td>
                                        <td className="py-3 px-5 text-right font-bold text-slate-800">{record.currentPremium}</td>
                                        <td className="py-3 px-5 text-center">
                                            <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-1.5">
                                                <RotateCcw size={14} /> Recalculate
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-16 flex flex-col items-center justify-center text-center px-4 bg-slate-50">
                            <div className="w-16 h-16 bg-white shadow-sm rounded-full flex items-center justify-center border border-slate-200 mb-4">
                                <Search size={24} className="text-slate-400" />
                            </div>
                            <h3 className="text-slate-700 font-bold mb-1 uppercase tracking-wide">NO DATA FOUND</h3>
                            <p className="text-slate-500 text-sm max-w-sm">
                                {hasSearched ? 'No records match your selected criteria or search query.' : 'Complete the mandatory filters above and click View to load recalculation entries.'}
                            </p>
                        </div>
                    )}
                </div>

                {hasSearched && displayedRecords.length > 0 && (
                    <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <span>Records per page:</span>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="px-2 py-1 bg-white border border-slate-300 rounded-md text-sm font-semibold text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                        </div>

                        <span className="text-sm text-slate-500 font-medium">
                            Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, displayedRecords.length)} of {displayedRecords.length} records
                        </span>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                &lt;
                            </button>
                            {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-8 h-8 flex items-center justify-center text-sm font-semibold rounded-md transition-all ${currentPage === page
                                        ? 'bg-brand-primary text-white shadow-sm border border-brand-primary'
                                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="w-8 h-8 flex items-center justify-center text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReopenRecalculate;
