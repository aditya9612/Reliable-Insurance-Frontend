import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search } from 'lucide-react';

interface NcbReportRecord {
    id: number;
    transactionId: string;
    registrationNo: string;
    policyNo: string;
    amount: number;
    customerName: string;
    agentName: string;
    empName: string;
}

const NcbRecoveryReport: React.FC = () => {
    // Filter State
    const [searchCustomer, setSearchCustomer] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy Data Based on the Screenshot
    const [records] = useState<NcbReportRecord[]>([
        { id: 2, transactionId: '185719', registrationNo: 'MH12TK6192', policyNo: 'POCMGC0101841556', amount: 3139, customerName: 'SAGAR BHIMRAO KHAMKAR', agentName: 'SHEKHAR MARUTI ANBHULE', empName: 'NILAKSHI NARENDRA KULKARNI' },
        { id: 3, transactionId: '188411', registrationNo: 'MH14JL3719', policyNo: 'POCMGC0100437055', amount: 1874, customerName: 'NILESH DNYANESHWAR ABHANG', agentName: 'PRADEEP PRABHAKAR SUTAR', empName: 'RUPESH RAMESH GAIKWAD' },
        { id: 4, transactionId: '190103', registrationNo: 'MH10CQ3424', policyNo: 'POCMGC0100420078', amount: 432, customerName: 'PAIGAMBAR NABISAB TAMBOLI', agentName: 'VISHAL SHIVDAS MHETRE', empName: 'SARIKA NAMDEO BHANDALKAR' },
        { id: 7, transactionId: '192420', registrationNo: 'MH16DP0130', policyNo: 'POCMGC0100498370', amount: 2166, customerName: 'KISHOR RAMDAS WANDHEKAR', agentName: 'MOHAMMAD KAIF ASFAQUE ALI SAYYED', empName: 'SANTOSH MANIK UGALE' },
        { id: 9, transactionId: '195386', registrationNo: 'MH16CQ6928', policyNo: 'POCMGC0100538082', amount: 2067, customerName: 'KAMLESH RAMNATH PATHAK', agentName: 'MOHAMMAD KAIF ASFAQUE ALI SAYYED', empName: 'SANTOSH MANIK UGALE' },
        { id: 10, transactionId: '196098', registrationNo: 'MH09AP5231', policyNo: 'POCMGC0100558761', amount: 1067, customerName: 'PRAVIN PRAKASH LINGAYAT', agentName: 'YOGITA VIKRAM SAWANT', empName: 'SHEKHAR DAGADU KADAM' },
        { id: 11, transactionId: '197778', registrationNo: 'MH45AD5651', policyNo: 'POCMGC0100351916', amount: 639, customerName: 'BHAU GAUTAM KOKARE', agentName: 'PRAMOD VILAS KULKARNI', empName: 'SNEHAL SUNIL AGAWANE' },
        { id: 13, transactionId: '201622', registrationNo: 'MH16BH9441', policyNo: 'POPMCAR0102288795', amount: 755, customerName: 'JAYANT PRABHAKAR DESHPANDE', agentName: 'SHRUTI SUNIL JADHAV', empName: 'PRASHANT DILIPRAO MOHEKAR' },
    ]);

    const handleActionPaid = (id: number) => {
        alert(`Initiated action for PAID record ID: ${id}`);
    };

    // Filter Logic
    const filteredRecords = records.filter(record =>
        searchCustomer === '' || record.customerName.toLowerCase().includes(searchCustomer.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-6">
            <PageHeader
                title="NCB Recovery Report"
                description="View and trace recovered No Claim Bonus transactions."
            />

            {/* Data Grid Section with Integrated Single Filter */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Unified Data Grid Toolbar */}
                <div className="p-4 bg-white border-b border-brand-border">
                    <div className="w-full md:w-96">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                            <input
                                type="text"
                                placeholder="Search Customer Name Here"
                                value={searchCustomer}
                                onChange={(e) => {
                                    setSearchCustomer(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto w-full custom-scrollbar">
                    <table className="w-full text-left border-collapse min-w-[1200px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap tracking-wide">
                                <th className="py-3 px-4 w-[100px]">ID</th>
                                <th className="py-3 px-4">Transaction ID</th>
                                <th className="py-3 px-4">Registration No</th>
                                <th className="py-3 px-4">Policy No</th>
                                <th className="py-3 px-4">Amount</th>
                                <th className="py-3 px-4 min-w-[200px]">Customer Name</th>
                                <th className="py-3 px-4 min-w-[200px]">Agent Name</th>
                                <th className="py-3 px-4 min-w-[200px]">Emp Name</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[12px] text-slate-700">
                            {paginatedData.map((record) => (
                                <tr key={record.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                    <td className="py-2 px-4 whitespace-nowrap flex items-center h-[48px]">
                                        <button
                                            onClick={() => handleActionPaid(record.id)}
                                            className="text-blue-500 font-semibold hover:underline mr-3 uppercase tracking-wider text-[11px]"
                                        >
                                            PAID
                                        </button>
                                        <span className="font-medium text-slate-600">{record.id}</span>
                                    </td>
                                    <td className="py-2 px-4 font-mono font-medium">{record.transactionId}</td>
                                    <td className="py-2 px-4 font-mono font-medium">{record.registrationNo}</td>
                                    <td className="py-2 px-4 font-mono font-semibold text-slate-800">{record.policyNo}</td>
                                    <td className="py-2 px-4 font-semibold text-slate-800">{record.amount}</td>
                                    <td className="py-2 px-4 uppercase font-medium">{record.customerName}</td>
                                    <td className="py-2 px-4 uppercase">{record.agentName}</td>
                                    <td className="py-2 px-4 uppercase">{record.empName}</td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="py-12 text-center text-slate-500 font-medium">
                                        No customer records found matching "{searchCustomer}".
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

export default NcbRecoveryReport;
