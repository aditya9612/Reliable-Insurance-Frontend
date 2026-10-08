import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, Pencil } from 'lucide-react';

interface PolicyRecord {
    id: number;
    date: string;
    contactNo: string;
    premium: number;
    insuranceCompany: string;
    productType: string;
    policyMode: string;
    paymentMode: string;
    paymentDetails1: string;
    paymentDetails2: string;
    agentName: string;
    salesEx: string;
    documentList: string;
    registrationNo: string;
    note: string;
    quotationCode: string;
}

const UpdateAppPolicy: React.FC = () => {
    // Toolbar Search Filter
    const [searchVehicle, setSearchVehicle] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Initial dummy data matching screenshots
    const allRecords: PolicyRecord[] = [
        {
            id: 194774, date: '08/10/2026', contactNo: '9960330384', premium: 38137, insuranceCompany: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
            productType: 'COMPREHENSIVE', policyMode: 'CONTINUE', paymentMode: 'ONLINE TO INSURANCE COMPANY', paymentDetails1: 'NA', paymentDetails2: 'NA',
            agentName: 'PALLAVI HEMANT KAKULTE', salesEx: 'HEMANT RAJU KAKULTE', documentList: '', registrationNo: 'MH17BD8009', note: 'ERP ENTRY', quotationCode: 'Q184194773'
        },
        {
            id: 194773, date: '08/10/2026', contactNo: '', premium: 0, insuranceCompany: 'HDFC ERGO GENERAL INSURANCE CO. LTD',
            productType: '', policyMode: '', paymentMode: 'ONLINE TO INSURANCE COMPANY', paymentDetails1: 'NA', paymentDetails2: 'NA',
            agentName: 'RAIS RASHID SHAIKH', salesEx: 'RUTUJA NITIN MANE', documentList: '', registrationNo: 'MH03CD1563', note: 'ONLINE ERP ENTRY', quotationCode: 'Q488194772'
        },
        {
            id: 194772, date: '08/10/2026', contactNo: '', premium: 0, insuranceCompany: 'SBI GENERAL INSURANCE COMPANY LIMITED',
            productType: '', policyMode: '', paymentMode: 'ONLINE TO INSURANCE COMPANY', paymentDetails1: 'NA', paymentDetails2: 'NA',
            agentName: 'RAIS RASHID SHAIKH', salesEx: 'RUTUJA NITIN MANE', documentList: '', registrationNo: 'MH37T1787', note: 'ONLINE ERP ENTRY', quotationCode: 'Q488194771'
        },
        {
            id: 194771, date: '08/10/2026', contactNo: '8669383753', premium: 0, insuranceCompany: 'INDUSIND GENERAL INSURANCE CO. LTD',
            productType: '', policyMode: '', paymentMode: 'ONLINE TO INSURANCE COMPANY', paymentDetails1: 'NA', paymentDetails2: 'NA',
            agentName: 'RISHIKESH VILAS PAWAR', salesEx: 'HEMANT HANMANT BAGADE', documentList: '', registrationNo: 'MH50N3544', note: 'ONLINE ERP ENTRY', quotationCode: 'Q576194770'
        },
        {
            id: 194770, date: '08/10/2026', contactNo: '9168769293', premium: 0, insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
            productType: '', policyMode: '', paymentMode: 'ONLINE TO INSURANCE COMPANY', paymentDetails1: 'NA', paymentDetails2: 'NA',
            agentName: 'PRADEEP POPATRAO SHINDE', salesEx: 'SHEKHAR RAJENDRA KUMBHAR', documentList: '', registrationNo: 'MH12FZ3586', note: 'ONLINE APP ENTRY', quotationCode: 'Q37194769'
        },
        {
            id: 194769, date: '08/10/2026', contactNo: '7774002027', premium: 0, insuranceCompany: 'IFFCO TOKIO GENERAL INSURANCE CO. LTD',
            productType: '', policyMode: '', paymentMode: 'ONLINE TO INSURANCE COMPANY', paymentDetails1: 'NA', paymentDetails2: 'NA',
            agentName: 'MADHULIKA RAJBAHADUR SINGH', salesEx: 'NITIN YASHODHAN BALAKSHE', documentList: '', registrationNo: 'MH04GC9232', note: 'ONLINE ERP ENTRY', quotationCode: 'Q566194768'
        }
    ];

    const filteredRecords = allRecords.filter(record =>
        record.registrationNo.toLowerCase().includes(searchVehicle.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleEdit = (id: number) => {
        alert(`Opening Edit panel for Policy Entry ID: ${id}`);
    };

    return (
        <div className="w-full flex flex-col space-y-5">
            <PageHeader
                title="Update App Policy Entry"
                description="View and update application policies. Click on a record to edit its details."
            />

            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                {/* Advanced Search Toolbar */}
                <div className="p-4 bg-slate-50 border-b border-brand-border flex items-center">
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search Vehicle No Here"
                            value={searchVehicle}
                            onChange={(e) => setSearchVehicle(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all uppercase"
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
                                    <th className="py-3 px-4 min-w-[100px]">DATE</th>
                                    <th className="py-3 px-4">CONTACT NO</th>
                                    <th className="py-3 px-4">PREMIUM</th>
                                    <th className="py-3 px-4 min-w-[260px]">INSURANCE COMPANY</th>
                                    <th className="py-3 px-4 min-w-[150px]">PRODUCT TYPE</th>
                                    <th className="py-3 px-4">POLICY MODE</th>
                                    <th className="py-3 px-4 min-w-[200px]">PAYMENT MODE</th>
                                    <th className="py-3 px-4 min-w-[130px]">PAYMENTDETAILS1</th>
                                    <th className="py-3 px-4 min-w-[130px]">PAYMENTDETAILS2</th>
                                    <th className="py-3 px-4 min-w-[180px]">AGENT NAME</th>
                                    <th className="py-3 px-4 min-w-[180px]">SALES EX.</th>
                                    <th className="py-3 px-4">DOCUMENT_LIST</th>
                                    <th className="py-3 px-4">REGISTRATIONNO</th>
                                    <th className="py-3 px-4 min-w-[120px]">NOTE</th>
                                    <th className="py-3 px-4">QUATATION CODE</th>
                                    <th className="py-3 px-4 w-[80px] sticky right-0 bg-brand-lightbg z-10 shadow-[-1px_0_0_#E2E8F0] text-center">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-[13px]">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((record) => (
                                        <tr key={record.id} className="group hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                            <td className="py-2 px-4 font-medium text-slate-800">{record.id}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.date}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.contactNo}</td>
                                            <td className="py-2 px-4 font-semibold text-brand-navy">{record.premium}</td>
                                            <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.insuranceCompany}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.productType || '-'}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.policyMode || '-'}</td>
                                            <td className="py-2 px-4 text-slate-600 whitespace-normal leading-tight">{record.paymentMode}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.paymentDetails1}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.paymentDetails2}</td>
                                            <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.agentName}</td>
                                            <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.salesEx}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.documentList}</td>
                                            <td className="py-2 px-4 text-slate-800 font-mono font-medium text-[12px]">{record.registrationNo}</td>
                                            <td className="py-2 px-4 text-slate-600 font-medium whitespace-normal leading-tight">{record.note}</td>
                                            <td className="py-2 px-4 text-brand-navy font-mono tracking-tight">{record.quotationCode}</td>
                                            <td className="py-2 px-4 sticky right-0 bg-white group-hover:bg-brand-mainbg transition-colors shadow-[-1px_0_0_#E2E8F0] z-10 text-center">
                                                <button
                                                    onClick={() => handleEdit(record.id)}
                                                    className="inline-flex items-center justify-center p-1.5 text-brand-primary hover:bg-brand-primary/10 hover:text-brand-primary rounded-md transition-colors"
                                                    title="Edit Entry"
                                                >
                                                    <Pencil size={15} strokeWidth={2.5} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={17} className="py-12 text-center text-slate-500 sticky left-1/2 -ml-[100px] inline-block mt-4">
                                            No matching policy entries found.
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

export default UpdateAppPolicy;
