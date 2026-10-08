import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, Download } from 'lucide-react';

interface PendingPremiumRecord {
    id: number;
    transDate: string;
    customerName: string;
    registrationNo: string;
    contactNo: string;
    premium: number;
    pendingCash: number;
    cutNPayAmt: number;
    shortAmtStatus: string;
    shortfallAmt: number;
    cashStatus: string;
    agentName: string;
    salesExecutive: string;
}

const PendingPremiumCash: React.FC = () => {
    // Filters
    const [searchRegNo, setSearchRegNo] = useState('');
    const [searchAgent, setSearchAgent] = useState('');
    const [searchExecutive, setSearchExecutive] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy Data
    const [records] = useState<PendingPremiumRecord[]>([
        {
            id: 1, transDate: '29/09/2026 09:48:53', customerName: 'GOURISHANKAR WASUDEV AGASHE', registrationNo: 'MH36AR0530', contactNo: '8956923197',
            premium: 8523, pendingCash: 5569, cutNPayAmt: 3954, shortAmtStatus: 'CUT AND PAY', shortfallAmt: 0, cashStatus: 'CASH IN HAND', agentName: 'RAKESH SURESHRAO NAKSHINE', salesExecutive: 'RUTUJA NITIN MANE'
        },
        {
            id: 2, transDate: '29/09/2026 09:43:29', customerName: 'BHUSHAN GAJANAN ZANJAL', registrationNo: 'MH36AR1341', contactNo: '8956923197',
            premium: 8617, pendingCash: 5623, cutNPayAmt: 3994, shortAmtStatus: 'CUT AND PAY', shortfallAmt: 0, cashStatus: 'CASH IN HAND', agentName: 'RAKESH SURESHRAO NAKSHINE', salesExecutive: 'RUTUJA NITIN MANE'
        },
        {
            id: 3, transDate: '08/05/2025 16:37:58', customerName: 'MAHESH SAHEBRAO LOMATE TRANSFER', registrationNo: 'MH20CR5565', contactNo: '9763526678',
            premium: 9700, pendingCash: 6083, cutNPayAmt: 3617, shortAmtStatus: 'CUT AND PAY', shortfallAmt: 0, cashStatus: 'CASH IN HAND', agentName: 'RAVIKRAN VISHNU SHINDE', salesExecutive: 'JYOTSNA SHRIKANT MANE'
        },
        {
            id: 4, transDate: '08/05/2025 16:34:25', customerName: 'VITTHAL BABA LONDHE', registrationNo: 'MH16CY4447', contactNo: '9763526678',
            premium: 10185, pendingCash: 6387, cutNPayAmt: 3798, shortAmtStatus: 'CUT AND PAY', shortfallAmt: 0, cashStatus: 'CASH IN HAND', agentName: 'RAVIKRAN VISHNU SHINDE', salesExecutive: 'JYOTSNA SHRIKANT MANE'
        },
    ]);

    const handleExport = () => {
        alert('Exporting grid data...');
    };

    // Filter Logic
    const filteredRecords = records.filter(record =>
        record.registrationNo.toLowerCase().includes(searchRegNo.toLowerCase()) &&
        record.agentName.toLowerCase().includes(searchAgent.toLowerCase()) &&
        record.salesExecutive.toLowerCase().includes(searchExecutive.toLowerCase())
    );

    const totalCount = filteredRecords.length;
    const totalAmount = filteredRecords.reduce((sum, record) => sum + record.pendingCash, 0);

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Header */}
            <PageHeader
                title="Pending Premium Cash"
                description="View and authorize pending premium transactions holding cash balances."
            />

            {/* Action & Analytics Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleExport}
                        className="px-6 flex items-center justify-center gap-2 bg-white border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]"
                    >
                        <Download size={16} />
                        <span>Export</span>
                    </button>
                </div>
                <div className="flex items-center gap-6 text-sm text-brand-navy font-semibold px-4 py-2 bg-brand-lightbg rounded-lg border border-brand-border shadow-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-brand-muted">Total Count:</span>
                        <span>{totalCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-brand-muted">Total Amount:</span>
                        <span>₹ {totalAmount}</span>
                    </div>
                </div>
            </div>

            {/* Filter Card */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Registration No.</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                            <input
                                type="text"
                                placeholder="Search Registration No."
                                value={searchRegNo}
                                onChange={(e) => setSearchRegNo(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Agent Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                            <input
                                type="text"
                                placeholder="Search Agent Name"
                                value={searchAgent}
                                onChange={(e) => setSearchAgent(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Executive Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                            <input
                                type="text"
                                placeholder="Search Executive Name"
                                value={searchExecutive}
                                onChange={(e) => setSearchExecutive(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Grid */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1500px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap tracking-wide">
                                <th className="py-3 px-3 w-[40px] text-center">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary bg-white cursor-pointer" />
                                </th>
                                <th className="py-3 px-4">TRANSDATE</th>
                                <th className="py-3 px-4">CUSTOMER NAME</th>
                                <th className="py-3 px-4">REGISTRATION NO</th>
                                <th className="py-3 px-4">CONTACT NO</th>
                                <th className="py-3 px-4 text-right">PREMIUM</th>
                                <th className="py-3 px-4 text-right">PENDING CASH</th>
                                <th className="py-3 px-4 text-right">CUT N PAY AMT</th>
                                <th className="py-3 px-4">SHORT AMT STATUS</th>
                                <th className="py-3 px-4 text-center">SHORTFALL AMT</th>
                                <th className="py-3 px-4 text-center">CASH STATUS</th>
                                <th className="py-3 px-4">AGENT NAME</th>
                                <th className="py-3 px-4">SALES EXECUTIVE / FRANCHISE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                            {paginatedData.map((record) => (
                                <tr key={record.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                    <td className="py-2 px-3 text-center">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer" />
                                    </td>
                                    <td className="py-3 px-4 align-top">
                                        <div className="flex flex-col items-center opacity-80 whitespace-nowrap">
                                            <span>{record.transDate.split(' ')[0]}</span>
                                            <span>{record.transDate.split(' ')[1]}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-[12px] uppercase">{record.customerName}</td>
                                    <td className="py-3 px-4 font-mono font-medium">{record.registrationNo}</td>
                                    <td className="py-3 px-4 font-mono font-medium">{record.contactNo}</td>
                                    <td className="py-3 px-4 text-right font-medium">{record.premium}</td>
                                    <td className="py-3 px-4 text-right font-bold text-slate-900">{record.pendingCash}</td>
                                    <td className="py-3 px-4 text-right">{record.cutNPayAmt}</td>
                                    <td className="py-3 px-4 text-xs font-semibold">{record.shortAmtStatus}</td>
                                    <td className="py-3 px-4 text-center">{record.shortfallAmt}</td>
                                    <td className="py-3 px-4 text-center">
                                        <div className="flex flex-col items-center text-xs font-semibold">
                                            <span>{record.cashStatus.split(' ')[0]}</span>
                                            <span>{record.cashStatus.substring(record.cashStatus.indexOf(' ') + 1)}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-[11px] font-semibold text-slate-600 w-[180px]">{record.agentName}</td>
                                    <td className="py-3 px-4 text-[11px] font-semibold text-slate-600 w-[180px]">{record.salesExecutive}</td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={13} className="py-8 text-center text-slate-500 font-medium">
                                        No pending premium cash records found for the given search criteria.
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

export default PendingPremiumCash;
