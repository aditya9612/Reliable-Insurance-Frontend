import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search } from 'lucide-react';

interface BounceRecord {
    id: number;
    date: string;
    customerName: string;
    regNo: string;
    policyNo: string;
    amount: number;
    agentName: string;
    status: 'UNPAID' | 'PAID';
}

const PremiumChequeBounce: React.FC = () => {
    const [searchPolicy, setSearchPolicy] = useState('');
    const [statusFilter, setStatusFilter] = useState<'UNPAID' | 'PAID'>('UNPAID');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Initial dummy data matching screenshot
    const allRecords: BounceRecord[] = [
        { id: 202116, date: '07/10/2026', customerName: 'SAGAR HEIGHTS CO OP HOUSING SOCIETY LIMITED', regNo: 'NON MOTOR', policyNo: '2260313210', amount: 116820, agentName: 'DHIRAJ NANDKUMAR PAWAR', status: 'UNPAID' },
        { id: 201426, date: '30/09/2026', customerName: 'AKSHAY SATISH BELOSHE', regNo: 'MH43CQ1529', policyNo: 'P0027200038/4103/101635', amount: 41319, agentName: 'PRANAY VIJAY GAWDE', status: 'UNPAID' },
        { id: 200835, date: '25/09/2026', customerName: 'M/S.AVINASH ENTERPRISES', regNo: 'MH12X1034', policyNo: 'VGC1834493000100', amount: 48838.44, agentName: 'MADHULIKA RAJBAHADUR SINGH', status: 'UNPAID' },
        { id: 200682, date: '23/09/2026', customerName: 'SHREE SWAMI CONCRETE PRIVATE LIMITED', regNo: 'MH12VT2937', policyNo: '1-0ZLPQ0KS', amount: 18024.4, agentName: 'RAHUL CHANDRAKANT GAIKWAD', status: 'UNPAID' },
        { id: 200679, date: '23/09/2026', customerName: 'SHREE SWAMI CONCRETE PRIVATE LIMITED', regNo: 'MH12VT3937', policyNo: '1-0ZLPFPQF', amount: 18024.4, agentName: 'RAHUL CHANDRAKANT GAIKWAD', status: 'UNPAID' },
        { id: 200553, date: '22/09/2026', customerName: 'MAHADEV GAJANAN KOLHE', regNo: 'MH12VT0937', policyNo: 'AVO/2315/20238018', amount: 52088, agentName: 'RAHUL CHANDRAKANT GAIKWAD', status: 'UNPAID' },
        { id: 200555, date: '22/09/2026', customerName: 'MAHADEV GAJANAN KOLHE', regNo: 'MH12VT1937', policyNo: 'AVO/2315/20239820', amount: 52088, agentName: 'RAHUL CHANDRAKANT GAIKWAD', status: 'UNPAID' },
        { id: 200389, date: '21/09/2026', customerName: 'SANJAY VITTHAL PAWAR', regNo: 'MH12VT5080', policyNo: '6304342646', amount: 20120, agentName: 'MADHULIKA RAJBAHADUR SINGH', status: 'UNPAID' },
        { id: 199653, date: '11/09/2026', customerName: 'SUNIL SACHANAND THADDANI', regNo: 'MH37T7778', policyNo: 'AVO/2315/20232583', amount: 52365, agentName: 'SANTOSH KESHAVRAO DESHMUKH', status: 'UNPAID' },
        { id: 199652, date: '11/09/2026', customerName: 'SUNIL SACHANAND THADDANI', regNo: 'MH37T7773', policyNo: 'AVO/2315/20232588', amount: 52365, agentName: 'SANTOSH KESHAVRAO DESHMUKH', status: 'UNPAID' },
        { id: 199283, date: '07/09/2026', customerName: 'SACHIN VISHRAM PORJE', regNo: 'MH15HZ5155', policyNo: 'AVO/2315/20230459', amount: 55440, agentName: 'PALLAVI HEMANT KAKULTE', status: 'UNPAID' }
    ];

    const filteredRecords = allRecords.filter(record =>
        record.status === statusFilter &&
        record.policyNo.toLowerCase().includes(searchPolicy.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-5">
            <PageHeader
                title="Premium Cheque Bounce"
                description="Monitor unpaid and paid premium cheques and manage bounce resolutions."
            />

            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Custom Flex Toolbar for specific Radio + Search fields */}
                <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Modern Segmented Control Toggle */}
                    <div className="flex items-center bg-slate-100 border border-slate-200 rounded-[8px] p-1 shrink-0 h-[40px]">
                        <button
                            onClick={() => {
                                setStatusFilter('UNPAID');
                                setCurrentPage(1);
                            }}
                            className={`px-6 py-1.5 text-sm font-semibold rounded-[6px] transition-all duration-200 ${statusFilter === 'UNPAID'
                                    ? 'bg-white text-brand-primary shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            UNPAID
                        </button>
                        <button
                            onClick={() => {
                                setStatusFilter('PAID');
                                setCurrentPage(1);
                            }}
                            className={`px-6 py-1.5 text-sm font-semibold rounded-[6px] transition-all duration-200 ${statusFilter === 'PAID'
                                    ? 'bg-white text-brand-primary shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            PAID
                        </button>
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full sm:w-[400px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Policy No. Here"
                            value={searchPolicy}
                            onChange={(e) => setSearchPolicy(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                        />
                    </div>
                </div>

                {/* Data Table */}
                <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                <th className="py-3 px-4 w-[60px]">ID</th>
                                <th className="py-3 px-4">DATE</th>
                                <th className="py-3 px-4 min-w-[200px]">CUSTOMER NAME</th>
                                <th className="py-3 px-4">REG. NO.</th>
                                <th className="py-3 px-4">POLICY NO</th>
                                <th className="py-3 px-4">AMOUNT</th>
                                <th className="py-3 px-4 min-w-[180px]">AGENT NAME</th>
                                <th className="py-3 px-4 text-center w-[100px]">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px]">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((record) => (
                                    <tr key={record.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                        <td className="py-2 px-4 font-medium text-brand-primary">{record.id}</td>
                                        <td className="py-2 px-4 text-slate-600">{record.date}</td>
                                        <td className="py-2 px-4 font-semibold text-[#12284A] whitespace-normal leading-tight">{record.customerName}</td>
                                        <td className="py-2 px-4 text-slate-600">{record.regNo}</td>
                                        <td className="py-2 px-4 text-slate-600 font-mono tracking-tight">{record.policyNo}</td>
                                        <td className="py-2 px-4 text-slate-800 font-semibold">{record.amount}</td>
                                        <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.agentName}</td>
                                        <td className="py-2 px-4 text-center">
                                            <button className="px-3 py-1 bg-white border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-[6px] text-xs font-semibold transition-colors cursor-pointer">
                                                BOUNCE
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-slate-500">
                                        No records found for the selected matching criteria.
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

export default PremiumChequeBounce;
