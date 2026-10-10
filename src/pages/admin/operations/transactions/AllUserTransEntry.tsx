import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, Trash2 } from 'lucide-react';

interface AllUserTransactionRecord {
    id: number;
    transactionId: string;
    date: string;
    contactNo: string;
    premium: string;
    insuranceCompany: string;
    productType: string;
    policyMode: string;
    paymentMode: string;
    paymentDetails1: string;
    paymentDetails2: string;
    noOfImages: number;
    clientName: string;
    mobileNo: string;
    salesEx: string;
    documentList: string;
    registrationNo: string;
    note: string;
    quotationCode: string;
    opName: string;
    transfer: string;
    policyType: string;
    grossVehicleWeightCc: string;
    status: 'VIEW' | 'WAIT FOR APPROVAL';
    hasRaPaymentStatus: boolean;
}

const AllUserTransEntry: React.FC = () => {
    // Filters
    const [searchOperator, setSearchOperator] = useState('');
    const [searchSalesEx, setSearchSalesEx] = useState('');
    const [searchVehicleNo, setSearchVehicleNo] = useState('');

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    // Dummy Data
    const [records] = useState<AllUserTransactionRecord[]>([
        {
            id: 1, transactionId: '194819', date: '08/10/2026 18:20:14', contactNo: '9823989653', premium: '0',
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD', productType: '', policyMode: '', paymentMode: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails1: 'NA', paymentDetails2: 'NA', noOfImages: 4, clientName: 'BHARTI PRAKASH RATHODE', mobileNo: '9823989653',
            salesEx: 'SONMALE VAIBHAV RAMCHANDRA', documentList: '', registrationNo: 'MH12FZ9465', note: 'ONLINE APP ENTRY', quotationCode: 'Q148194818',
            opName: 'MAYURI RAJENDRA MULE', transfer: 'NA', policyType: 'GCV 7501 - 12000 GVW', grossVehicleWeightCc: '9600',
            status: 'VIEW', hasRaPaymentStatus: false
        },
        {
            id: 2, transactionId: '194818', date: '08/10/2026 18:17:15', contactNo: '9597776565', premium: '10676',
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD', productType: 'COMPREHENSIVE', policyMode: 'CONTINUE', paymentMode: 'ONLINE TO RELIABLE',
            paymentDetails1: 'NA', paymentDetails2: 'NA', noOfImages: 3, clientName: 'SOMNATH DEV GAWAT', mobileNo: '9597776565',
            salesEx: 'GAWADE ARVIND DNYANESHWAR', documentList: '', registrationNo: 'MH42BE7790', note: 'APP ENTRY', quotationCode: 'Q34194817',
            opName: 'SANTOSH PHULCHAND BANSODE', transfer: 'NA', policyType: 'PRIVATE CAR', grossVehicleWeightCc: '',
            status: 'WAIT FOR APPROVAL', hasRaPaymentStatus: true
        },
        {
            id: 3, transactionId: '194817', date: '08/10/2026 18:15:29', contactNo: '9823989653', premium: '0',
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD', productType: '', policyMode: '', paymentMode: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails1: 'NA', paymentDetails2: 'NA', noOfImages: 7, clientName: 'BHARTI PRAKASH RATHODE', mobileNo: '9823989653',
            salesEx: 'SONMALE VAIBHAV RAMCHANDRA', documentList: '', registrationNo: 'MH14V0624', note: 'ONLINE APP ENTRY', quotationCode: 'Q148194816',
            opName: 'MAYURI RAJENDRA MULE', transfer: 'NA', policyType: 'GCV 3500 - 7500 GVW', grossVehicleWeightCc: '5600',
            status: 'VIEW', hasRaPaymentStatus: false
        },
        {
            id: 4, transactionId: '194815', date: '08/10/2026 18:12:32', contactNo: '8369108832', premium: '0',
            insuranceCompany: 'HDFC ERGO GENERAL INSURANCE CO. LTD', productType: '', policyMode: '', paymentMode: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails1: 'NA', paymentDetails2: 'NA', noOfImages: 4, clientName: 'ANITA VIKRAM KANT', mobileNo: '8369108832',
            salesEx: 'KADAM SHEKHAR DAGADU', documentList: '', registrationNo: 'MH08AP5279', note: 'ONLINE APP ENTRY', quotationCode: 'Q43194815',
            opName: 'KIRAN PANDURANG MALI', transfer: 'NA', policyType: 'GCV 2501 - 3500 GVW', grossVehicleWeightCc: '2805',
            status: 'VIEW', hasRaPaymentStatus: false
        },
        {
            id: 5, transactionId: '194814', date: '08/10/2026 18:09:47', contactNo: '9922541919', premium: '27190',
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD', productType: 'COMPREHENSIVE', policyMode: 'BREAKING', paymentMode: 'ONLINE TO RELIABLE',
            paymentDetails1: 'NA', paymentDetails2: 'NA', noOfImages: 6, clientName: 'DHANSHRI SHAJI BALE', mobileNo: '9970511595',
            salesEx: 'BANSODE SACHIN NATHURAM', documentList: '', registrationNo: 'MH10GJ0018', note: 'ONLINE APP ENTRY', quotationCode: 'Q452194814',
            opName: 'NILAKSHI NARENDRA KULKARNI', transfer: 'NA', policyType: 'GCV 2501 - 3500 GVW', grossVehicleWeightCc: '2910',
            status: 'WAIT FOR APPROVAL', hasRaPaymentStatus: true
        },
    ]);

    // Filter Logic
    const filteredRecords = records.filter(record =>
        record.opName.toLowerCase().includes(searchOperator.toLowerCase()) &&
        record.salesEx.toLowerCase().includes(searchSalesEx.toLowerCase()) &&
        record.registrationNo.toLowerCase().includes(searchVehicleNo.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
    const paginatedData = filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="w-full flex flex-col space-y-5">
            {/* Header */}
            <PageHeader
                title="All User Transaction Entry"
                description="View and verify detailed transaction histories authored by all users."
            />

            {/* Filter Card */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Operator Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                            <input
                                type="text"
                                placeholder="Search Operator Name Here"
                                value={searchOperator}
                                onChange={(e) => setSearchOperator(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Sales Ex. Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                            <input
                                type="text"
                                placeholder="Search Sales Ex Name Here"
                                value={searchSalesEx}
                                onChange={(e) => setSearchSalesEx(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Vehicle No.</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={16} />
                            <input
                                type="text"
                                placeholder="Search Vehicle No Here"
                                value={searchVehicleNo}
                                onChange={(e) => setSearchVehicleNo(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Data Grid */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                <div className="overflow-x-auto w-full custom-scrollbar">
                    {/* Highly extended table specifically designed to mirror the complex 25-column layout */}
                    <table className="w-full text-left border-collapse min-w-[2800px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap tracking-wide">
                                <th className="py-3 px-4 w-[110px]">Action</th>
                                <th className="py-3 px-4">RA Payment Status</th>
                                <th className="py-3 px-4">ID</th>
                                <th className="py-3 px-4 min-w-[140px]">Date</th>
                                <th className="py-3 px-4">Contact No</th>
                                <th className="py-3 px-4 text-right">Premium</th>
                                <th className="py-3 px-4 min-w-[240px]">Insurance Company</th>
                                <th className="py-3 px-4">Product Type</th>
                                <th className="py-3 px-4">Policy Mode</th>
                                <th className="py-3 px-4">Payment Mode</th>
                                <th className="py-3 px-4">Payment Details 1</th>
                                <th className="py-3 px-4">Payment Details 2</th>
                                <th className="py-3 px-4 text-center">No. of Images</th>
                                <th className="py-3 px-4 min-w-[200px]">Client Name</th>
                                <th className="py-3 px-4">Mobile No</th>
                                <th className="py-3 px-4 min-w-[200px]">Sales Ex. / Loc.Head</th>
                                <th className="py-3 px-4">Document List</th>
                                <th className="py-3 px-4">Registration No</th>
                                <th className="py-3 px-4">Note</th>
                                <th className="py-3 px-4">Quotation Code</th>
                                <th className="py-3 px-4 min-w-[200px]">Op Name</th>
                                <th className="py-3 px-4">Transfer</th>
                                <th className="py-3 px-4 min-w-[180px]">Policy Type</th>
                                <th className="py-3 px-4">Gross Vehicle Wght CC</th>
                                <th className="py-3 px-4 text-center sticky right-0 bg-brand-lightbg shadow-[-2px_0_4px_rgba(0,0,0,0.05)] z-10 w-[80px]">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                            {paginatedData.map((record) => (
                                <tr key={record.id} className="hover:bg-brand-mainbg h-[60px] transition-colors bg-white group">
                                    <td className="py-2 px-4 whitespace-nowrap align-top">
                                        <div className="flex flex-col gap-1 items-start">
                                            {record.status === 'VIEW' ? (
                                                <button className="text-blue-500 font-semibold hover:underline text-xs">VIEW</button>
                                            ) : (
                                                <span className="text-amber-600 font-bold text-[11px] leading-tight">WAIT FOR<br />APPROVAL</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 whitespace-nowrap align-top">
                                        {record.hasRaPaymentStatus && (
                                            <span className="text-blue-500 font-bold text-[11px] leading-tight">RA<br />PAYMENT<br />STATUS</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-4 text-slate-900 font-medium align-top">{record.transactionId}</td>
                                    <td className="py-2 px-4 align-top whitespace-nowrap">
                                        <div className="flex flex-col opacity-80 leading-tight text-xs font-mono">
                                            <span>{record.date.split(' ')[0]}</span>
                                            <span>{record.date.split(' ')[1]}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-4 font-mono font-medium align-top">{record.contactNo}</td>
                                    <td className="py-2 px-4 text-right font-medium align-top">{record.premium}</td>
                                    <td className="py-2 px-4 text-[12px] flex flex-col font-medium text-slate-700 min-w-[240px] whitespace-normal align-top leading-tight">
                                        {record.insuranceCompany}
                                    </td>
                                    <td className="py-2 px-4 text-xs font-semibold align-top whitespace-nowrap">{record.productType}</td>
                                    <td className="py-2 px-4 text-xs font-semibold align-top whitespace-nowrap">{record.policyMode}</td>
                                    <td className="py-2 px-4 text-[11px] font-semibold text-slate-600 align-top whitespace-normal w-[120px] leading-tight flex flex-col">
                                        {record.paymentMode}
                                    </td>
                                    <td className="py-2 px-4 text-xs font-medium align-top">{record.paymentDetails1}</td>
                                    <td className="py-2 px-4 text-xs font-medium align-top">{record.paymentDetails2}</td>
                                    <td className="py-2 px-4 text-center font-bold align-top">{record.noOfImages}</td>
                                    <td className="py-2 px-4 text-xs font-medium uppercase align-top min-w-[200px] whitespace-normal leading-tight">{record.clientName}</td>
                                    <td className="py-2 px-4 font-mono font-medium align-top">{record.mobileNo}</td>
                                    <td className="py-2 px-4 text-[11px] font-medium text-slate-600 uppercase align-top min-w-[200px] whitespace-normal leading-tight">{record.salesEx}</td>
                                    <td className="py-2 px-4 text-xs align-top">{record.documentList}</td>
                                    <td className="py-2 px-4 font-mono font-bold align-top text-slate-800">{record.registrationNo}</td>
                                    <td className="py-2 px-4 text-[11px] font-bold text-slate-600 uppercase align-top flex flex-col leading-tight whitespace-nowrap">{record.note}</td>
                                    <td className="py-2 px-4 font-mono text-xs font-semibold text-brand-primary align-top">{record.quotationCode}</td>
                                    <td className="py-2 px-4 text-[11px] font-semibold text-slate-600 uppercase align-top min-w-[200px] whitespace-normal leading-tight">{record.opName}</td>
                                    <td className="py-2 px-4 text-xs font-medium align-top">{record.transfer}</td>
                                    <td className="py-2 px-4 text-[11px] font-semibold text-slate-700 uppercase align-top min-w-[180px] whitespace-normal leading-tight">{record.policyType}</td>
                                    <td className="py-2 px-4 text-xs font-medium align-top">{record.grossVehicleWeightCc}</td>
                                    <td className="py-2 px-4 text-center sticky right-0 bg-white group-hover:bg-brand-mainbg shadow-[-2px_0_4px_rgba(0,0,0,0.02)] z-10 transition-colors align-top w-[80px]">
                                        <button className="flex items-center justify-center gap-1 text-slate-400 hover:text-red-500 font-semibold transition-colors mx-auto mt-1" title="Delete Entry">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {paginatedData.length === 0 && (
                                <tr>
                                    <td colSpan={25} className="py-12 text-center text-slate-500 font-medium">
                                        No transaction entries found for the given search criteria.
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

export default AllUserTransEntry;
