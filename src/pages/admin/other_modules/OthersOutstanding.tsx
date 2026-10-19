import React, { useState, useMemo } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import {
    Search, X, Download, Check, RefreshCw, ChevronDown, CheckCircle2,
    Building2, FileText, Calendar, Filter
} from 'lucide-react';

interface OutstandingItem {
    id: number;
    policyType: string;
    companyName: string;
    date: string;
    customerName: string;
    policyNo: string;
    regNo: string;
    paymentMode: string;
    companyChequeNo: string;
    amount: number;
    agentName: string;
    empName: string;
    referenceType: string;
    portalId: string;
    chequeStatus: string;
    brokerComm: number;
    dueDate: string;
    portalEntity?: 'RELIABLE' | 'OASIS';
    codeName?: string;
}

const INSURANCE_COMPANIES = [
    'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
    'Care Health Insurance',
    'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
    'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED',
    'GO DIGIT GENERAL INSURANCE LIMITED',
    'HDFC ERGO GENERAL INSURANCE CO. LTD',
    'ICICI LOMBARD GENERAL INSURANCE CO. LTD',
    'IFFCO TOKIO GENERAL INSURANCE CO. LTD',
    'INDUSIND GENERAL INSURANCE CO. LTD',
    'KIWI GENERAL INSURANCE LIMITED',
    'LIBERTY GENERAL INSURANCE LIMITED',
    'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
    'NATIONAL INSURANCE CO. LTD',
    'RAHEJA QBE GENERAL INSURANCE COMPANY LIMITED',
    'ROYAL SUNDARAM GENERAL INSURANCE CO. LTD',
    'SBI GENERAL INSURANCE COMPANY LIMITED',
    'SHRIRAM GENERAL INSURANCE COMPANY LIMITED',
    'TATA AIG GENERAL INSURANCE CO. LTD',
    'THE NEW INDIA ASSURANCE CO. LTD'
];

export const OthersOutstanding: React.FC = () => {
    // Top Sub-tabs
    const [subTab, setSubTab] = useState<'unclear-outstanding' | 'ra-premium-cheque'>('unclear-outstanding');

    // Filter Controls
    const [portalEntity, setPortalEntity] = useState<'RELIABLE' | 'OASIS'>('RELIABLE');
    const [selectedCompany, setSelectedCompany] = useState<string>('');
    const [isAll, setIsAll] = useState<boolean>(false);
    const [portalId, setPortalId] = useState<string>('');
    const [codeName, setCodeName] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [hasClickedShow, setHasClickedShow] = useState<boolean>(false);

    // Pagination & Selection
    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    // Toast Feedback
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Sample Data from Legacy ERP (reliable-erp.com/Clerk/adm_DebitFromBankAccount.aspx)
    const [outstandingRecords, setOutstandingRecords] = useState<OutstandingItem[]>([
        {
            id: 1,
            policyType: 'MOTOR',
            companyName: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
            date: '19/08/2025',
            customerName: 'ANAND GOVIND KAMBLE',
            policyNo: '12-1831-0007842236-00',
            regNo: 'MH11T7345',
            paymentMode: 'ONLINE TO RELIABLE',
            companyChequeNo: 'NA',
            amount: 18483.00,
            agentName: 'GANESH SHIVAJI PAWAR',
            empName: 'VAIBHAV RAMCHANDRA SONMALE',
            referenceType: 'AGENT',
            portalId: 'NA',
            chequeStatus: 'UNCLEARING',
            brokerComm: 10794.00,
            dueDate: '20/08/2025',
            portalEntity: 'RELIABLE',
            codeName: 'CODE-BAJAJ-01'
        },
        {
            id: 2,
            policyType: 'MOTOR',
            companyName: 'TATA AIG GENERAL INSURANCE CO. LTD',
            date: '20/08/2025',
            customerName: 'SAGAR SANJAY PADIYAR',
            policyNo: '6206841079',
            regNo: 'MH02DG1914',
            paymentMode: 'ONLINE TO RELIABLE',
            companyChequeNo: 'NA',
            amount: 4251.00,
            agentName: 'RUTURAJ PRAKASH JADHAV',
            empName: 'SOURABH RAJESH PALANGE',
            referenceType: 'AGENT',
            portalId: 'PORTAL-TATA-01',
            chequeStatus: 'UNCLEARING',
            brokerComm: 2250.00,
            dueDate: '22/08/2025',
            portalEntity: 'RELIABLE',
            codeName: 'CODE-TATA-01'
        },
        {
            id: 3,
            policyType: 'MOTOR',
            companyName: 'HDFC ERGO GENERAL INSURANCE CO. LTD',
            date: '21/08/2025',
            customerName: 'DATTATRYA MARUTI VIDHATE',
            policyNo: '2302209092387700000',
            regNo: 'MH17DC9113',
            paymentMode: 'ONLINE TO RELIABLE',
            companyChequeNo: 'NA',
            amount: 17587.00,
            agentName: 'SHEKHAR MARUTI ANBHULE',
            empName: 'VAIBHAV RAMCHANDRA SONMALE',
            referenceType: 'AGENT',
            portalId: 'PORTAL-HDFC-02',
            chequeStatus: 'UNCLEARING',
            brokerComm: 1724.00,
            dueDate: '23/08/2025',
            portalEntity: 'OASIS',
            codeName: 'CODE-HDFC-02'
        },
        {
            id: 4,
            policyType: 'MOTOR',
            companyName: 'SBI GENERAL INSURANCE COMPANY LIMITED',
            date: '22/08/2025',
            customerName: 'AKSHAY CHANDRASHEKHAR RATHOD',
            policyNo: 'POCMVMI0100555033',
            regNo: 'MH37AD1447',
            paymentMode: 'ONLINE TO RELIABLE',
            companyChequeNo: 'CHQ-890123',
            amount: 7932.83,
            agentName: 'SHRIKRUSHNA SOPAN PATIL',
            empName: 'SOURABH RAJESH PALANGE',
            referenceType: 'AGENT',
            portalId: 'PORTAL-SBI-01',
            chequeStatus: 'UNCLEARING',
            brokerComm: 3732.00,
            dueDate: '25/08/2025',
            portalEntity: 'RELIABLE',
            codeName: 'CODE-SBI-01'
        },
        {
            id: 5,
            policyType: 'MOTOR',
            companyName: 'ICICI LOMBARD GENERAL INSURANCE CO. LTD',
            date: '23/08/2025',
            customerName: 'BALIRAM TANHAJI DHORE',
            policyNo: 'POCMVMI0100554960',
            regNo: 'MH12RQ8821',
            paymentMode: 'ONLINE TO RELIABLE',
            companyChequeNo: 'NA',
            amount: 8328.07,
            agentName: 'AAYUSH UMESH TIJARE',
            empName: 'SOURABH RAJESH PALANGE',
            referenceType: 'AGENT',
            portalId: 'PORTAL-ICICI-03',
            chequeStatus: 'UNCLEARING',
            brokerComm: 3917.00,
            dueDate: '26/08/2025',
            portalEntity: 'OASIS',
            codeName: 'CODE-ICICI-03'
        }
    ]);

    // Filter Logic
    const filteredRecords = useMemo(() => {
        // Return empty when no company is selected and ALL is unchecked
        if (!selectedCompany && !isAll) {
            return [];
        }

        return outstandingRecords.filter(item => {
            // Portal Entity
            if (item.portalEntity !== portalEntity) return false;

            // Insurance Company filter (if selected)
            if (selectedCompany && item.companyName !== selectedCompany) return false;

            // When ALL is unchecked, filter by Portal ID / Code Name if provided
            if (!isAll) {
                if (portalId && item.portalId !== portalId) return false;
                if (codeName && !item.codeName?.toLowerCase().includes(codeName.toLowerCase())) return false;
            }

            // Search Query Filter
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                return (
                    item.customerName.toLowerCase().includes(q) ||
                    item.policyNo.toLowerCase().includes(q) ||
                    item.regNo.toLowerCase().includes(q) ||
                    item.companyChequeNo.toLowerCase().includes(q) ||
                    item.agentName.toLowerCase().includes(q) ||
                    item.companyName.toLowerCase().includes(q)
                );
            }

            return true;
        });
    }, [outstandingRecords, portalEntity, selectedCompany, isAll, portalId, codeName, searchQuery]);

    // Financial calculations
    const totalAmount = useMemo(() => {
        if (!hasClickedShow) return 0;
        if (!selectedCompany && !isAll) return 0;
        return filteredRecords.reduce((acc, curr) => acc + curr.amount, 0);
    }, [hasClickedShow, filteredRecords, selectedCompany, isAll]);

    const selectedAmount = useMemo(() => {
        if (!hasClickedShow) return 0;
        return filteredRecords
            .filter(r => selectedIds.includes(r.id))
            .reduce((acc, curr) => acc + curr.amount, 0);
    }, [hasClickedShow, filteredRecords, selectedIds]);

    // Pagination
    const totalPages = Math.ceil(filteredRecords.length / perPage) || 1;
    const paginatedRecords = useMemo(() => {
        return filteredRecords.slice((page - 1) * perPage, page * perPage);
    }, [filteredRecords, page, perPage]);

    // Checkbox toggling
    const handleToggleSelectAll = () => {
        const paginatedIds = paginatedRecords.map(r => r.id);
        const allSelected = paginatedIds.length > 0 && paginatedIds.every(id => selectedIds.includes(id));
        if (allSelected) {
            setSelectedIds(prev => prev.filter(id => !paginatedIds.includes(id)));
        } else {
            setSelectedIds(prev => Array.from(new Set([...prev, ...paginatedIds])));
        }
    };

    const handleToggleRow = (id: number) => {
        setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    // Show Action
    const handleShowClick = () => {
        if (!selectedCompany && !isAll) {
            showToast('Please select an Insurance Company or check ALL.');
            return;
        }
        setHasClickedShow(true);
        setPage(1);
        showToast('Outstanding records loaded successfully!');
    };

    // Submit Action
    const handleSubmit = () => {
        if (selectedIds.length === 0) {
            showToast('Please select at least one record to submit.');
            return;
        }
        showToast(`${selectedIds.length} debit record(s) submitted successfully!`);
        setSelectedIds([]);
    };

    // Reset Filters
    const handleReset = () => {
        setSelectedCompany('');
        setIsAll(false);
        setPortalId('');
        setCodeName('');
        setSearchQuery('');
        setPage(1);
        setSelectedIds([]);
        setHasClickedShow(false);
    };

    return (
        <div className="space-y-4 max-w-full overflow-hidden p-3 sm:p-5">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-[100] bg-brand-navy text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-brand-primary animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Page Header */}
            <PageHeader
                title="Others Outstanding"
                description="Manage Insurance Company Debit Approvals, Unclear Outstanding Entries & RA Premium Cheques"
            />

            {/* Top Sub-Tabs Navigation (Matching ERP: Unclear Outstanding | RA Premium Cheque) */}
            <div className="bg-white rounded-xl border border-brand-border p-2 shadow-sm flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => {
                        setSubTab('unclear-outstanding');
                        setHasClickedShow(false);
                        setSelectedIds([]);
                        setPage(1);
                    }}
                    className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
                        subTab === 'unclear-outstanding'
                            ? 'bg-brand-primary text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                >
                    <Building2 size={15} />
                    <span>Unclear Outstanding</span>
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setSubTab('ra-premium-cheque');
                        setHasClickedShow(false);
                        setSelectedIds([]);
                        setPage(1);
                    }}
                    className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border-none flex items-center gap-2 ${
                        subTab === 'ra-premium-cheque'
                            ? 'bg-brand-primary text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                >
                    <FileText size={15} />
                    <span>RA Premium Cheque</span>
                </button>
            </div>

            {/* Top Filter Card */}
            <div className="bg-white rounded-xl border border-brand-border p-4 sm:p-5 shadow-sm space-y-4">
                {/* Row 1: Radio Buttons, Insurance Company, ALL Checkbox, Portal Id (conditional) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 items-end w-full">
                    {/* Entity Radio Selection: Reliable / Oasis */}
                    <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-3">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Entity</span>
                        <div className="flex items-center gap-4 h-[38px] px-3 bg-slate-50 border border-[#CBD5E1] rounded-lg">
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                                <input
                                    type="radio"
                                    name="portalEntity"
                                    checked={portalEntity === 'RELIABLE'}
                                    onChange={() => {
                                        setPortalEntity('RELIABLE');
                                        setHasClickedShow(false);
                                        setSelectedIds([]);
                                        setPage(1);
                                    }}
                                    className="w-4 h-4 text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                />
                                <span>RELIABLE</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                                <input
                                    type="radio"
                                    name="portalEntity"
                                    checked={portalEntity === 'OASIS'}
                                    onChange={() => {
                                        setPortalEntity('OASIS');
                                        setHasClickedShow(false);
                                        setSelectedIds([]);
                                        setPage(1);
                                    }}
                                    className="w-4 h-4 text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                />
                                <span>OASIS</span>
                            </label>
                        </div>
                    </div>

                    {/* Insurance Company Dropdown */}
                    <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-5">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Insurance Company</span>
                            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-bold text-brand-navy">
                                <input
                                    type="checkbox"
                                    checked={isAll}
                                    onChange={(e) => {
                                        setIsAll(e.target.checked);
                                        setHasClickedShow(false);
                                        setSelectedIds([]);
                                    }}
                                    className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                />
                                <span>ALL</span>
                            </label>
                        </div>
                        <div className="relative w-full">
                            <select
                                value={selectedCompany}
                                onChange={(e) => {
                                    setSelectedCompany(e.target.value);
                                    setHasClickedShow(false);
                                    setSelectedIds([]);
                                    setPage(1);
                                }}
                                className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none truncate"
                            >
                                <option value="">--Select Company--</option>
                                {INSURANCE_COMPANIES.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* When ALL is unchecked: Portal Id */}
                    {!isAll && (
                        <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-4 animate-in fade-in duration-200">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Portal Id *</span>
                            <div className="relative w-full">
                                <select
                                    value={portalId}
                                    onChange={(e) => {
                                        setPortalId(e.target.value);
                                        setHasClickedShow(false);
                                        setSelectedIds([]);
                                        setPage(1);
                                    }}
                                    className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none truncate"
                                >
                                    <option value="">--Select Portal Id--</option>
                                    <option value="PORTAL-TATA-01">PORTAL-TATA-01</option>
                                    <option value="PORTAL-HDFC-02">PORTAL-HDFC-02</option>
                                    <option value="PORTAL-SBI-01">PORTAL-SBI-01</option>
                                    <option value="PORTAL-ICICI-03">PORTAL-ICICI-03</option>
                                    <option value="NA">NA</option>
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    )}

                    {/* Total Amount (When ALL is checked, spans remainder) */}
                    <div className={`flex flex-col gap-1.5 sm:col-span-1 ${isAll ? 'lg:col-span-4' : 'lg:col-span-3'}`}>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Amount</span>
                        <input
                            type="text"
                            readOnly
                            value={totalAmount > 0 ? totalAmount.toFixed(0) : '0'}
                            className="w-full h-[38px] px-3 bg-slate-100 border border-[#CBD5E1] rounded-lg text-xs font-mono font-bold text-slate-800 outline-none"
                        />
                    </div>
                </div>

                {/* Row 2: Code Name (conditional), Selected Amount, Show, Export, Reset */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 items-end w-full">
                    {/* Code Name (when ALL is unchecked) */}
                    {!isAll && (
                        <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-4 animate-in fade-in duration-200">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Code Name *</span>
                            <input
                                type="text"
                                value={codeName}
                                onChange={(e) => {
                                    setCodeName(e.target.value);
                                    setHasClickedShow(false);
                                    setSelectedIds([]);
                                    setPage(1);
                                }}
                                placeholder="Enter code name..."
                                className="w-full h-[38px] px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                            />
                        </div>
                    )}

                    {/* Selected Amount */}
                    <div className={`flex flex-col gap-1.5 sm:col-span-1 ${isAll ? 'lg:col-span-4' : 'lg:col-span-4'}`}>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Selected Amount</span>
                        <input
                            type="text"
                            readOnly
                            value={selectedAmount > 0 ? selectedAmount.toFixed(0) : '0'}
                            className="w-full h-[38px] px-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-mono font-bold text-emerald-700 outline-none"
                        />
                    </div>

                    {/* Action Buttons: Show, Export, Reset */}
                    <div className={`flex items-center gap-2 sm:col-span-2 ${isAll ? 'lg:col-span-8' : 'lg:col-span-4'} w-full`}>
                        <button
                            type="button"
                            onClick={handleShowClick}
                            className="flex-1 h-[38px] px-5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                        >
                            <span>Show</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => showToast('Exporting Outstanding records...')}
                            className="flex-1 h-[38px] px-4 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center justify-center gap-1.5 whitespace-nowrap"
                        >
                            <Download size={14} />
                            <span>Export</span>
                        </button>
                        {(selectedCompany || isAll || searchQuery || portalId || codeName) && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                title="Reset Filters"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Table Card */}
            {hasClickedShow && (
                <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full animate-in fade-in duration-200">
                {/* Table Top Toolbar */}
                <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                    {/* Left: Submit Action Button */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={selectedIds.length === 0}
                            className="h-[38px] px-5 bg-brand-primary hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                        >
                            <Check size={14} />
                            <span>Submit {selectedIds.length > 0 && `(${selectedIds.length})`}</span>
                        </button>
                    </div>

                    {/* Right: Search Input */}
                    <div className="relative w-72 sm:w-80 md:w-[350px] h-[38px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Search Cheque No, Policy No, Customer..."
                            className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    setPage(1);
                                }}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Data Table with all 17 Columns from ERP (adm_DebitFromBankAccount.aspx) */}
                <div className="overflow-x-auto w-full custom-scrollbar min-h-[420px]">
                    <table className="w-full text-left border-collapse min-w-[2100px]">
                        <thead>
                            <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-bold uppercase border-b border-brand-border whitespace-nowrap tracking-wider">
                                <th className="py-3 px-3 text-center w-[45px]">
                                    <input
                                        type="checkbox"
                                        checked={paginatedRecords.length > 0 && paginatedRecords.every(r => selectedIds.includes(r.id))}
                                        onChange={handleToggleSelectAll}
                                        className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                    />
                                </th>
                                <th className="py-3 px-3.5">TYPE OF INSURANCE POLICY</th>
                                <th className="py-3 px-3.5">COMPANY NAME</th>
                                <th className="py-3 px-3.5">DATE</th>
                                <th className="py-3 px-3.5">CUSTOMER NAME</th>
                                <th className="py-3 px-3.5 font-mono">POLICYNO</th>
                                <th className="py-3 px-3.5 font-mono">REG. NO.</th>
                                <th className="py-3 px-3.5">PAYMENT MODE</th>
                                <th className="py-3 px-3.5 font-mono">COMPANY CHEQUE NO</th>
                                <th className="py-3 px-3.5 text-right">AMOUNT</th>
                                <th className="py-3 px-3.5">AGENT NAME</th>
                                <th className="py-3 px-3.5">EMPNAME</th>
                                <th className="py-3 px-3.5">REFERENCETYPE</th>
                                <th className="py-3 px-3.5">PORTALID</th>
                                <th className="py-3 px-3.5">CHEQUE</th>
                                <th className="py-3 px-3.5 text-right">BROKER COMM.</th>
                                <th className="py-3 px-3.5">DUE DATE</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-[12px]">
                            {paginatedRecords.length === 0 ? (
                                <tr>
                                    <td colSpan={17} className="py-12 text-center text-slate-400 font-medium">
                                        {!selectedCompany && !isAll
                                            ? 'Please select an Insurance Company or check ALL to view outstanding records.'
                                            : 'No outstanding records found for the selected criteria.'}
                                    </td>
                                </tr>
                            ) : (
                                paginatedRecords.map((row) => {
                                    const isSelected = selectedIds.includes(row.id);
                                    return (
                                        <tr
                                            key={row.id}
                                            className={`transition-colors h-[48px] ${
                                                isSelected ? 'bg-blue-50/70 hover:bg-blue-100/60' : 'bg-white hover:bg-blue-50/40'
                                            }`}
                                        >
                                            <td className="py-2 px-3 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleToggleRow(row.id)}
                                                    className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                                />
                                            </td>
                                            <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                                                    {row.policyType}
                                                </span>
                                            </td>
                                            <td className="py-2.5 px-3.5 font-medium text-slate-800 max-w-[220px] truncate" title={row.companyName}>
                                                {row.companyName}
                                            </td>
                                            <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                                                {row.date}
                                            </td>
                                            <td className="py-2.5 px-3.5 font-bold text-brand-navy whitespace-nowrap">
                                                {row.customerName}
                                            </td>
                                            <td className="py-2.5 px-3.5 font-mono text-xs text-brand-primary whitespace-nowrap" title={row.policyNo}>
                                                {row.policyNo}
                                            </td>
                                            <td className="py-2.5 px-3.5 font-mono font-bold text-slate-700 whitespace-nowrap">
                                                {row.regNo}
                                            </td>
                                            <td className="py-2.5 px-3.5 text-slate-600 text-xs whitespace-nowrap">
                                                {row.paymentMode}
                                            </td>
                                            <td className="py-2.5 px-3.5 font-mono text-slate-500 whitespace-nowrap">
                                                {row.companyChequeNo}
                                            </td>
                                            <td className="py-2.5 px-3.5 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                                                {row.amount.toLocaleString('en-IN', { minimumFractionDigits: row.amount % 1 !== 0 ? 2 : 0 })}
                                            </td>
                                            <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                                                {row.agentName}
                                            </td>
                                            <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">
                                                {row.empName}
                                            </td>
                                            <td className="py-2.5 px-3.5 text-slate-600 font-semibold text-xs whitespace-nowrap">
                                                {row.referenceType}
                                            </td>
                                            <td className="py-2.5 px-3.5 font-mono text-slate-500 whitespace-nowrap">
                                                {row.portalId}
                                            </td>
                                            <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                                    {row.chequeStatus}
                                                </span>
                                            </td>
                                            <td className="py-2.5 px-3.5 text-right font-mono font-semibold text-brand-primary whitespace-nowrap">
                                                {row.brokerComm.toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                                                {row.dueDate}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                    <div className="flex items-center gap-3">
                        <span>
                            Showing {paginatedRecords.length === 0 ? 0 : (page - 1) * perPage + 1} to {Math.min(page * perPage, filteredRecords.length)} of {filteredRecords.length} records
                        </span>
                        <div className="flex items-center gap-1.5 ml-2">
                            <span className="text-slate-500 font-medium">Per page:</span>
                            <select
                                value={perPage}
                                onChange={(e) => {
                                    setPerPage(Number(e.target.value));
                                    setPage(1);
                                }}
                                className="h-7 px-2 bg-white border border-slate-200 rounded text-xs text-slate-700 focus:outline-none"
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                            <button
                                key={p}
                                onClick={() => setPage(p)}
                                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${
                                    p === page ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default OthersOutstanding;
