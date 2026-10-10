import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Trash2 } from 'lucide-react';

interface DeleteRecord {
    id: number;
    typeOfInsurancePolicy: string;
    companyName: string;
    branchName: string;
    policyType: string;
    policyNo: string;
    transDate: string;
    customerName: string;
    communicationAddress: string;
    policyMode: string;
    leadNo: string;
    productType: string;
    businessType: string;
    vehicleMake: string;
    vehicleModelName: string;
    vehicleVariantName: string;
    registrationNo: string;
    mfgYear: string;
    agentName: string;
    employeeName: string;
    riskStartDate: string;
    expiryDate: string;
    sumInsured: number;
    imt23: string;
    imt47: string;
    addOn: string;
    towingCharges: number;
    ncb: number;
    ncbPremium: number;
    odDiscount: number;
    odPremium: number;
    netPremium: number;
    proposalAmt: number;
    paymentType: string;
    remark: string;
    createUser: string;
    createDate: string;
    referenceType: string;
}

const DeleteTransactionEntry: React.FC = () => {
    // Checkbox and Filter state
    const [customerName, setCustomerName] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');
    const [financialYear, setFinancialYear] = useState('2026-2027');

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const mockupData: DeleteRecord[] = [
        {
            id: 1, typeOfInsurancePolicy: 'MOTOR', companyName: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD', branchName: 'NAGPUR', policyType: 'GCV ABOVE 40000 GVW', policyNo: 'AVO/2315/20247350',
            transDate: '28/09/2026', customerName: 'RAM PRASAD VISHWAKARMA', communicationAddress: 'S/O TIRTHREJ, HOUSE NO 8, RAJAPUR, UTTAR PRADESH...',
            policyMode: 'CONTINUE', leadNo: 'NA', productType: 'COMPREHENSIVE', businessType: 'ROLL OVER', vehicleMake: 'TATA', vehicleModelName: 'LPS', vehicleVariantName: '',
            registrationNo: 'UP62DT6144', mfgYear: '2015', agentName: 'SANDEEP RAUT', employeeName: 'RUTUJA NITIN MANE', riskStartDate: '28/09/2026', expiryDate: '27/09/2027',
            sumInsured: 1260000, imt23: 'NO', imt47: 'NO', addOn: 'NO', towingCharges: 0, ncb: 0, ncbPremium: 0, odDiscount: 80, odPremium: 3053, netPremium: 42620, proposalAmt: 50440,
            paymentType: 'ONLINE TO INSURANCE COMPANY', remark: 'RUTUJA MANE', createUser: 'SNEHAL JADHAV', createDate: '28/09/2026 17:32:06', referenceType: 'AGENT'
        },
        {
            id: 2, typeOfInsurancePolicy: 'MOTOR', companyName: 'HDFC ERGO GENERAL INSURANCE CO. LTD', branchName: 'PUNE', policyType: 'PRIVATE CAR', policyNo: '2302209029232500000',
            transDate: '08/10/2026', customerName: 'M/S GOOD ENOUGH EDUCATION TRUST', communicationAddress: '8 TECH ZONE 4 GREATER NOIDA, GAUTAM BUDDHA NAGAR...',
            policyMode: 'CONTINUE', leadNo: 'NA', productType: 'SAOD', businessType: 'ROLL OVER', vehicleMake: 'MARUTI SUZUKI', vehicleModelName: 'GRAND VITARA', vehicleVariantName: '',
            registrationNo: 'UP16LP6081', mfgYear: '2024', agentName: 'ROHTASH BALAM SINGH', employeeName: 'NITIN YASHODHAN BALAKSHE', riskStartDate: '01/10/2026', expiryDate: '30/09/2027',
            sumInsured: 885480, imt23: 'NO', imt47: 'NO', addOn: 'NO', towingCharges: 0, ncb: 1, ncbPremium: 0, odDiscount: 0, odPremium: 8641, netPremium: 8641, proposalAmt: 10196,
            paymentType: 'ONLINE TO INSURANCE COMPANY', remark: 'SAMBHAJI', createUser: 'SIDDHESH SHINDE', createDate: '08/10/2026 14:54:03', referenceType: 'AGENT'
        },
        {
            id: 3, typeOfInsurancePolicy: 'MOTOR', companyName: 'TATA AIG GENERAL INSURANCE CO. LTD', branchName: 'PUNE', policyType: 'PRIVATE CAR', policyNo: '6270527139',
            transDate: '07/10/2026', customerName: 'UNITED EKTA ENGINEERING UDYOG PRIVATE LIMITED', communicationAddress: 'C 41 - 42, SECTOR 8, NOIDA, BANDA-UTTAR PRADESH...',
            policyMode: 'CONTINUE', leadNo: 'NA', productType: 'SAOD', businessType: 'ROLL OVER', vehicleMake: 'MARUTI SUZUKI', vehicleModelName: 'VITARA BREZZA', vehicleVariantName: '',
            registrationNo: 'UP16LP0878', mfgYear: '2024', agentName: 'ROHTASH BALAM SINGH', employeeName: 'NITIN YASHODHAN BALAKSHE', riskStartDate: '10/10/2026', expiryDate: '09/10/2027',
            sumInsured: 786000, imt23: 'NO', imt47: 'NO', addOn: 'NO', towingCharges: 0, ncb: 1, ncbPremium: 0, odDiscount: 0, odPremium: 6739, netPremium: 6739, proposalAmt: 7917,
            paymentType: 'ONLINE TO INSURANCE COMPANY', remark: 'SAMBHAJI', createUser: 'SIDDHESH SHINDE', createDate: '08/10/2026 13:53:06', referenceType: 'AGENT'
        },
        {
            id: 4, typeOfInsurancePolicy: 'NON-MOTOR', companyName: 'INDUSIND GENERAL INSURANCE CO. LTD', branchName: 'BARAMATI', policyType: 'COMMERCIAL LINE', policyNo: '170462522150020793',
            transDate: '22/05/2026', customerName: 'MANOJ PRABHAKAR BHOSALE', communicationAddress: 'A/P- RAJEGAON, GAT NO334, MAHARASHTRA 413105...',
            policyMode: 'NA', leadNo: 'NA', productType: 'CPM', businessType: '', vehicleMake: '', vehicleModelName: '', vehicleVariantName: 'NON-MOTOR',
            registrationNo: '', mfgYear: 'NA', agentName: '-', employeeName: 'ARVIND DNYANESHWAR GAWADE', riskStartDate: '21/05/2026', expiryDate: '20/05/2027',
            sumInsured: 4237288, imt23: 'NO', imt47: 'NO', addOn: 'NO', towingCharges: 0, ncb: 0, ncbPremium: 0, odDiscount: 0, odPremium: 0, netPremium: 9682, proposalAmt: 11425,
            paymentType: 'ONLINE TO RELIABLE', remark: 'SARIKA', createUser: 'BANSODE SANTOSH', createDate: '25/05/2026 10:55:06', referenceType: 'DIRECT'
        }
    ];

    const totalPages = Math.ceil(mockupData.length / itemsPerPage) || 1;
    const paginatedData = mockupData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleShow = () => {
        // trigger filter logic
    };

    const handleDelete = (id: number) => {
        if (confirm(`Are you sure you want to delete transaction ID ${id}?`)) {
            // delete trigger
        }
    };

    return (
        <div className="w-full flex flex-col space-y-5">
            <PageHeader
                title="Delete Transaction Entry"
                description="Search and delete transaction entries across financial years."
            />

            {/* Massive Grid Layout with Integrated Toolbar */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full relative z-0">

                {/* Embedded Toolbar */}
                <div className="p-4 bg-slate-50 border-b border-brand-border">
                    <div className="flex flex-wrap items-end gap-5">
                        <div className="w-[200px]">
                            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5">Customer First Name</label>
                            <input
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                            />
                        </div>
                        <div className="w-[180px]">
                            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5">Vehicle No.</label>
                            <input
                                type="text"
                                value={vehicleNo}
                                onChange={(e) => setVehicleNo(e.target.value)}
                                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all uppercase"
                            />
                        </div>
                        <div className="w-[150px]">
                            <label className="block text-[11px] uppercase tracking-wider font-semibold text-slate-500 mb-1.5">Financial Year</label>
                            <select
                                value={financialYear}
                                onChange={(e) => setFinancialYear(e.target.value)}
                                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md text-sm text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                            >
                                <option value="2026-2027">2026-2027</option>
                                <option value="2025-2026">2025-2026</option>
                            </select>
                        </div>
                        <div className="ml-auto">
                            <button
                                onClick={handleShow}
                                className="px-6 py-1.5 h-[34px] flex items-center justify-center bg-brand-primary text-white hover:bg-[#1D4ED8] font-semibold text-sm rounded-md shadow-sm transition-colors cursor-pointer"
                            >
                                Show
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                    <div className="min-w-max w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                    <th className="py-3 px-4 min-w-[140px]">TYPE OF INSURANCE</th>
                                    <th className="py-3 px-4 min-w-[240px]">COMPANY NAME</th>
                                    <th className="py-3 px-4 min-w-[120px]">BRANCH NAME</th>
                                    <th className="py-3 px-4 min-w-[160px]">POLICY TYPE</th>
                                    <th className="py-3 px-4 min-w-[180px]">POLICY NO</th>
                                    <th className="py-3 px-4 min-w-[100px]">TRANS DATE</th>
                                    <th className="py-3 px-4 min-w-[200px]">CUSTOMER NAME</th>
                                    <th className="py-3 px-4 min-w-[300px]">COMMUNICATION ADDRESS</th>
                                    <th className="py-3 px-4 min-w-[100px]">POLICY MODE</th>
                                    <th className="py-3 px-4 min-w-[100px]">LEAD NO</th>
                                    <th className="py-3 px-4 min-w-[140px]">PRODUCT TYPE</th>
                                    <th className="py-3 px-4 min-w-[130px]">BUSINESS TYPE</th>
                                    <th className="py-3 px-4 min-w-[130px]">VEHICLE MAKE</th>
                                    <th className="py-3 px-4 min-w-[150px]">MODEL NAME</th>
                                    <th className="py-3 px-4 min-w-[150px]">VARIANT NAME</th>
                                    <th className="py-3 px-4 min-w-[120px]">REGISTRATION NO</th>
                                    <th className="py-3 px-4 min-w-[80px]">MFG. YEAR</th>
                                    <th className="py-3 px-4 min-w-[180px]">AGENT NAME</th>
                                    <th className="py-3 px-4 min-w-[180px]">EMPLOYEE NAME</th>
                                    <th className="py-3 px-4 min-w-[100px]">RISK START DATE</th>
                                    <th className="py-3 px-4 min-w-[100px]">EXPIRY DATE</th>
                                    <th className="py-3 px-4 min-w-[100px]">SUM INSURED</th>
                                    <th className="py-3 px-4 min-w-[70px]">IMT 23</th>
                                    <th className="py-3 px-4 min-w-[70px]">IMT 47</th>
                                    <th className="py-3 px-4 min-w-[80px]">ADD ON</th>
                                    <th className="py-3 px-4 min-w-[130px]">TOWING CHARGES</th>
                                    <th className="py-3 px-4 min-w-[60px]">NCB</th>
                                    <th className="py-3 px-4 min-w-[100px]">NCB PREMIUM</th>
                                    <th className="py-3 px-4 min-w-[100px]">OD DISCOUNT</th>
                                    <th className="py-3 px-4 min-w-[100px]">OD PREMIUM</th>
                                    <th className="py-3 px-4 min-w-[100px]">NET PREMIUM</th>
                                    <th className="py-3 px-4 min-w-[120px]">PROPOSAL AMT</th>
                                    <th className="py-3 px-4 min-w-[200px]">PAYMENTTYPE</th>
                                    <th className="py-3 px-4 min-w-[120px]">REMARK</th>
                                    <th className="py-3 px-4 min-w-[150px]">CREATE USER</th>
                                    <th className="py-3 px-4 min-w-[150px]">CREATE DATE</th>
                                    <th className="py-3 px-4 min-w-[130px]">REFERENCE TYPE</th>

                                    <th className="py-3 px-4 w-[80px] sticky right-0 bg-brand-lightbg z-10 shadow-[-1px_0_0_#E2E8F0] text-center">ACTION</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-brand-border text-[13px]">
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((record) => (
                                        <tr key={record.id} className="group hover:bg-brand-mainbg transition-colors bg-white">
                                            <td className="py-2 px-4 text-slate-600">{record.typeOfInsurancePolicy}</td>
                                            <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.companyName}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.branchName}</td>
                                            <td className="py-2 px-4 text-slate-800 whitespace-normal leading-tight">{record.policyType}</td>
                                            <td className="py-2 px-4 text-brand-navy font-mono">{record.policyNo}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.transDate}</td>
                                            <td className="py-2 px-4 text-[#12284A] font-semibold whitespace-normal leading-tight">{record.customerName}</td>
                                            <td className="py-2 px-4 text-slate-500 whitespace-normal leading-tight text-xs">{record.communicationAddress}</td>

                                            <td className="py-2 px-4 text-slate-600">{record.policyMode}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.leadNo}</td>
                                            <td className="py-2 px-4 text-slate-700">{record.productType}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.businessType}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.vehicleMake}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.vehicleModelName}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.vehicleVariantName}</td>
                                            <td className="py-2 px-4 text-slate-800 font-mono text-[12px]">{record.registrationNo}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.mfgYear}</td>
                                            <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.agentName}</td>
                                            <td className="py-2 px-4 text-brand-navy whitespace-normal leading-tight">{record.employeeName}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.riskStartDate}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.expiryDate}</td>
                                            <td className="py-2 px-4 text-slate-800 font-medium">{record.sumInsured}</td>

                                            <td className="py-2 px-4 text-slate-500">{record.imt23}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.imt47}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.addOn}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.towingCharges}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.ncb}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.ncbPremium}</td>
                                            <td className="py-2 px-4 text-slate-500">{record.odDiscount}</td>

                                            <td className="py-2 px-4 text-brand-error font-medium">{record.odPremium}</td>
                                            <td className="py-2 px-4 text-brand-error font-medium">{record.netPremium}</td>
                                            <td className="py-2 px-4 text-slate-800 font-semibold">{record.proposalAmt}</td>

                                            <td className="py-2 px-4 text-slate-600 whitespace-normal leading-tight">{record.paymentType}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.remark}</td>
                                            <td className="py-2 px-4 text-slate-600 whitespace-normal leading-tight">{record.createUser}</td>
                                            <td className="py-2 px-4 text-slate-500 whitespace-normal text-xs">{record.createDate}</td>
                                            <td className="py-2 px-4 text-slate-600">{record.referenceType}</td>

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
                                        <td colSpan={38} className="py-12 text-center text-slate-500 sticky left-1/2 -ml-[100px] inline-block mt-4">
                                            No matching entries found.
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
                        Showing {mockupData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, mockupData.length)} of {mockupData.length} records
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

export default DeleteTransactionEntry;
