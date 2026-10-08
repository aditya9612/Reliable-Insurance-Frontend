import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, Trash2 } from 'lucide-react';

interface DeleteRecord {
    id: number;
    customerName: string;
    mobileNo: string;
    vehicleDetails: string;
    registrationNo: string;
    transDate: string;
    branchName: string;
    insuranceCompany: string;
    policyNo: string;
    policyMode: string;
    productType: string;
    businessType: string;
    agentName: string;
    odPremium: number;
    tpPremium: number;
    netPremium: number;
    agentCommAmt: number;
    amount: number;
}

const RemoveWrongEntries: React.FC = () => {
    // Toolbar Search Filters
    const [searchAgent, setSearchAgent] = useState('');
    const [searchCustomer, setSearchCustomer] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Initial dummy data matching screenshots
    const allRecords: DeleteRecord[] = [
        {
            id: 132489, customerName: 'NITIN BAPU CHOUDHARI', mobileNo: '9764983898', vehicleDetails: 'GCV TATA LPT 3 STR BS II', registrationNo: 'MH42AQ8017',
            transDate: '01/04/2020 00:00:00', branchName: 'BARAMATI', insuranceCompany: 'GO DIGIT GENERAL INSURANCE LIMITED', policyNo: 'D014502806',
            policyMode: 'CONTINUE', productType: 'COMPREHENSIVE', businessType: 'RENEWAL', agentName: 'VISHAL HANUMANT PAWAR', odPremium: -2241,
            tpPremium: -33418, netPremium: -36199, agentCommAmt: 0, amount: 0
        },
        {
            id: 44392, customerName: 'MAHESH POPATRAO MANSUKE', mobileNo: '9527211900', vehicleDetails: 'GCV ASHOK LEYLAND 2516IL', registrationNo: 'MH12HD6109_BOUNCE',
            transDate: '28/09/2021 10:13:14', branchName: 'BARAMATI', insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD', policyNo: '0162408580',
            policyMode: 'CONTINUE', productType: 'COMPREHENSIVE', businessType: 'RENEWAL', agentName: 'KRISHNA HALAPPA CHIKOP', odPremium: -2719,
            tpPremium: -43037, netPremium: -45966, agentCommAmt: 0, amount: 0
        }
    ];

    const filteredRecords = allRecords.filter(record =>
        record.agentName.toLowerCase().includes(searchAgent.toLowerCase()) &&
        record.customerName.toLowerCase().includes(searchCustomer.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleDelete = (id: number) => {
        alert(`Permanently delete entry ID: ${id}?`);
    };

    return (
        <div className="w-full flex flex-col space-y-5">
            <PageHeader
                title="Remove Wrong Entries"
                description="Search and permanently delete erroneous transaction entries from the system."
            />

            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Advanced Multi-Search Toolbar */}
                <div className="p-4 bg-slate-50 border-b border-brand-border grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
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
                            placeholder="Search Customer Name Here"
                            value={searchCustomer}
                            onChange={(e) => setSearchCustomer(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                    </div>
                </div>

                {/* Extremely Wide Data Table */}
                <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                    <div className="min-w-max w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                    <th className="py-3 px-4">ID</th>
                                    <th className="py-3 px-4 min-w-[200px]">CUSTNAME</th>
                                    <th className="py-3 px-4">MOBILENO1</th>
                                    <th className="py-3 px-4 min-w-[200px]">VEHICLEDETAILS</th>
                                    <th className="py-3 px-4">REGISTRATIONNO</th>
                                    <th className="py-3 px-4 min-w-[150px]">TRANSDATE</th>
                                    <th className="py-3 px-4">BRANCHNAME</th>
                                    <th className="py-3 px-4 min-w-[240px]">INSURANCECOMPANY</th>
                                    <th className="py-3 px-4">POLICYNO</th>
                                    <th className="py-3 px-4">POLICYMODE</th>
                                    <th className="py-3 px-4">PRODUCTTYPE</th>
                                    <th className="py-3 px-4">BUSINESSTYPE</th>
                                    <th className="py-3 px-4 min-w-[180px]">AGENTNAME</th>
                                    <th className="py-3 px-4">ODPREMIUM</th>
                                    <th className="py-3 px-4">TPPREMIUM</th>
                                    <th className="py-3 px-4">NETPREMIUM</th>
                                    <th className="py-3 px-4">AGENTCOMMAMT</th>
                                    <th className="py-3 px-4">AMOUNT</th>
                                    <th className="py-3 px-4 w-[80px] sticky right-0 bg-brand-lightbg z-10 shadow-[-1px_0_0_#E2E8F0] text-center">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-[13px]">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((record) => (
                                        <tr key={record.id} className="group hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                            <td className="py-2 px-4 font-medium text-slate-800">{record.id}</td>
                                            <td className="py-2 px-4 font-semibold text-[#12284A] whitespace-normal leading-tight">{record.customerName}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.mobileNo}</td>
                                            <td className="py-2 px-4 text-slate-600 whitespace-normal leading-tight">{record.vehicleDetails}</td>
                                            <td className="py-2 px-4 text-slate-800 font-mono text-[12px]">{record.registrationNo}</td>
                                            <td className="py-2 px-4 text-slate-600 whitespace-normal">{record.transDate}</td>
                                            <td className="py-2 px-4 text-brand-navy">{record.branchName}</td>
                                            <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.insuranceCompany}</td>
                                            <td className="py-2 px-4 text-brand-navy font-mono tracking-tight">{record.policyNo}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.policyMode}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.productType}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.businessType}</td>
                                            <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.agentName}</td>
                                            <td className="py-2 px-4 text-brand-error font-medium">{record.odPremium}</td>
                                            <td className="py-2 px-4 text-brand-error font-medium">{record.tpPremium}</td>
                                            <td className="py-2 px-4 text-brand-error font-medium">{record.netPremium}</td>
                                            <td className="py-2 px-4 text-slate-600 font-medium">{record.agentCommAmt}</td>
                                            <td className="py-2 px-4 text-slate-800 font-semibold">{record.amount}</td>
                                            <td className="py-2 px-4 sticky right-0 bg-white group-hover:bg-brand-mainbg transition-colors shadow-[-1px_0_0_#E2E8F0] z-10 text-center">
                                                <button
                                                    onClick={() => handleDelete(record.id)}
                                                    className="inline-flex items-center justify-center p-1.5 text-brand-error hover:bg-red-50 hover:text-red-700 rounded-md transition-colors"
                                                    title="Delete Entry"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={19} className="py-12 text-center text-slate-500 sticky left-0 w-full inline-block mt-4">
                                            No matching transaction entries found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
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
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

export default RemoveWrongEntries;
