import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, Download } from 'lucide-react';

const AllTransactionReport: React.FC = () => {
    // Top Filter State
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // Table Search Filter State
    const [searchCustomer, setSearchCustomer] = useState('');
    const [hasSearched, setHasSearched] = useState(false);

    const handleShowReport = () => {
        setHasSearched(true);
    };

    const handleExport = () => {
        // Logic for exporting will go here
        alert("Exporting Transactions...");
    };

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Standard Modern Standardized Page Header */}
            <PageHeader
                title="All Transaction Report"
                description="View and export comprehensive history of all system transactions."
            />

            {/* Top Date Filter Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-end gap-6 w-full max-w-3xl">
                <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">From Date</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                    />
                </div>

                <div className="flex-1 w-full">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">To Date</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0">
                    <button
                        onClick={handleShowReport}
                        className="flex-1 sm:flex-none px-8 flex items-center justify-center py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]"
                    >
                        Show
                    </button>

                    <button
                        onClick={handleExport}
                        className="flex-1 sm:flex-none px-6 flex items-center justify-center gap-2 py-2 bg-white border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]"
                    >
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Main Content / Table Area */}
            <div className="bg-white rounded-xl border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Advanced Multi-Search Toolbar */}
                <div className="p-4 bg-slate-50 border-b border-brand-border flex items-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Customer Name Here"
                            value={searchCustomer}
                            onChange={(e) => setSearchCustomer(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>
                </div>

                {/* Empty State / Table View */}
                <div className="p-20 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Search size={32} className="text-slate-400" />
                    </div>
                    {hasSearched ? (
                        <>
                            <h3 className="text-slate-700 font-semibold mb-1">NO DATA FOUND</h3>
                            <p className="text-slate-500 text-sm">No transaction reports found for the selected date range and criteria.</p>
                        </>
                    ) : (
                        <>
                            <h3 className="text-slate-700 font-semibold mb-1">WAITING FOR FILTER</h3>
                            <p className="text-slate-500 text-sm">Please select a From and To date and click Show to view transaction exports.</p>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllTransactionReport;
