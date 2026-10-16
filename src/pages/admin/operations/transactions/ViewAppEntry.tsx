import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search } from 'lucide-react';

const ViewAppEntry: React.FC = () => {
    // Top Filter State
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // Table Search Filter State
    const [searchCustomer, setSearchCustomer] = useState('');
    const [searchAgent, setSearchAgent] = useState('');
    const [searchVehicle, setSearchVehicle] = useState('');

    const [hasSearched, setHasSearched] = useState(false);

    const handleShowReport = () => {
        setHasSearched(true);
    };

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Standard Modern Standardized Page Header */}
            <PageHeader
                title="View App Entry"
                description="View App Sales Executive Wise Reports and Entries."
            />

            {/* Top Date Filter Card (Replaces the Floating box from legacy) */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-end gap-6 w-full max-w-2xl">
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

                <button
                    onClick={handleShowReport}
                    className="px-8 flex items-center justify-center gap-2 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px] w-full sm:w-auto shrink-0"
                >
                    Show
                </button>
            </div>

            {/* Main Content / Table Area */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden flex flex-col w-full">

                {/* Advanced Multi-Search Toolbar */}
                <div className="p-4 bg-slate-50 border-b border-brand-border grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Customer Name Here"
                            value={searchCustomer}
                            onChange={(e) => setSearchCustomer(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>

                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Agent Name Here"
                            value={searchAgent}
                            onChange={(e) => setSearchAgent(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>

                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Vehicle No Here"
                            value={searchVehicle}
                            onChange={(e) => setSearchVehicle(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>
                </div>

                {/* Table View matching VehicleMaster Theme */}
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse whitespace-nowrap min-w-[900px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                <th className="py-3 px-4">SR.NO.</th>
                                <th className="py-3 px-4">ENTRY DATE</th>
                                <th className="py-3 px-4">SALES EXECUTIVE</th>
                                <th className="py-3 px-4">AGENT NAME</th>
                                <th className="py-3 px-4">CUSTOMER NAME</th>
                                <th className="py-3 px-4">VEHICLE NO</th>
                                <th className="py-3 px-4 text-right">PREMIUM</th>
                                <th className="py-3 px-4 text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px] bg-white">
                            <tr>
                                <td colSpan={8} className="py-16 text-center text-slate-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                            <Search size={22} className="text-slate-400" />
                                        </div>
                                        {hasSearched ? (
                                            <>
                                                <p className="font-semibold text-slate-700 text-sm mb-1 uppercase tracking-wider">NO DATA FOUND</p>
                                                <p className="text-slate-400 text-xs">No app entries match the selected filters for this date range.</p>
                                            </>
                                        ) : (
                                            <>
                                                <p className="font-semibold text-slate-700 text-sm mb-1 uppercase tracking-wider">WAITING FOR FILTER</p>
                                                <p className="text-slate-400 text-xs">Select From and To date and click Show to view entries.</p>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ViewAppEntry;
