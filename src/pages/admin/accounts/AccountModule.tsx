import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import {
    Search, X, Download, Filter, Eye, CheckCircle2, ArrowLeft,
    Calendar, Plus, RefreshCw, FileText, Check, AlertCircle, Trash2,
    DollarSign, CreditCard, Clock, ChevronDown
} from 'lucide-react';

export type AccountSubTab =
    | 'cash-approval'
    | 'voucher-entry'
    | 'ledger-report'
    | 'premium-shortfall'
    | 'pending-commission'
    | 'paid-commission'
    | 'commission-recalculate'
    | 'account-report'
    | 'insurance-outstanding'
    | 'paid-entry-recalc'
    | 'return-cash-approval'
    | 'cashback-approval'
    | 'cheque-recon'
    | 'receiving-amt'
    | 'riskdate-recalc'
    | 'pending-commission-new';

interface TabDef {
    id: AccountSubTab;
    label: string;
}

const tabs: TabDef[] = [
    { id: 'cash-approval', label: 'Cash Approval' },
    { id: 'voucher-entry', label: 'Voucher Entry' },
    { id: 'ledger-report', label: 'Account Ledger Report' },
    { id: 'premium-shortfall', label: 'Premium Shortfall' },
    { id: 'pending-commission', label: 'Pending Commission' },
    { id: 'paid-commission', label: 'Paid Commission' },
    { id: 'commission-recalculate', label: 'Commission Recalculate' },
    { id: 'account-report', label: 'Account Report' },
    { id: 'insurance-outstanding', label: 'Insurance Company Outstanding' },
    { id: 'paid-entry-recalc', label: 'Paid Entry Recalculation' },
    { id: 'return-cash-approval', label: 'Return To Cash Approval' },
    { id: 'cashback-approval', label: 'Cash Back Approval' },
    { id: 'cheque-recon', label: 'Cheque Recon' },
    { id: 'receiving-amt', label: 'Receiving Amt' },
    { id: 'riskdate-recalc', label: 'Riskstartdate Recalculate' },
    { id: 'pending-commission-new', label: 'Pending Commission New' },
];

// --- Interfaces ---
interface PolicyRequestItem {
    id: number;
    date: string;
    customerName: string;
    policyNo: string;
    regNo: string;
    paymentMode: string;
    agentCommAmt: number;
    amount: number;
    agentName: string;
    empName: string;
    referenceType: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface VoucherItem {
    id: number;
    voucherNo: string;
    date: string;
    voucherType: 'RECEIPT' | 'PAYMENT' | 'JOURNAL';
    accountHead: string;
    debit: number;
    credit: number;
    narration: string;
    status: 'ACTIVE' | 'POSTED';
}

interface LedgerReportItem {
    id: number;
    date: string;
    branchName: string;
    customerName: string;
    regNo: string;
    voucher: string;
    narration: string;
    debit: number;
    credit: number;
    balance: number;
}

interface PremiumShortfallItem {
    id: number;
    transId: string;
    date: string;
    regNo: string;
    amount: number;
    referenceType: string;
    custAgentEmpName: string;
    salesExecutive?: string;
    customerName?: string;
    status: 'PENDING' | 'APPROVED';
}

interface PendingCommissionItem {
    id: number;
    pospName: string;
    locationName: string;
    agentName: string;
    premiumAmt: number;
    tpComm: number;
    odComm: number;
    netComm: number;
    totalComm: number;
    advAmt: number;
    totalOutstandingAmount: number;
    balance: number;
    accountNo: string;
    ifscCode: string;
    agentTds: number;
    entityType: 'Agent' | 'Self' | 'Franchise';
    dateType: 'Trans Date' | 'Risk Start Date';
    date: string;
}

const AccountModule: React.FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    const activeTab = (tab as AccountSubTab) || 'cash-approval';

    const handleTabChange = (tabId: string) => {
        navigate(`/accounts/${tabId}`);
    };

    // Toast feedback helper
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // --- State for Tab 1: Cash Approval ---
    const [cashSubTab, setCashSubTab] = useState<'policy-request' | 'endorsement-request'>('policy-request');
    const [cashSearchQuery, setCashSearchQuery] = useState('');
    const [cashPage, setCashPage] = useState(1);
    const [cashPerPage, setCashPerPage] = useState(10);
    const [selectedRequest, setSelectedRequest] = useState<PolicyRequestItem | null>(null);

    // Initial 4 records matching Photo 2
    const [policyRequests, setPolicyRequests] = useState<PolicyRequestItem[]>([
        {
            id: 1,
            date: '01/02/2025',
            customerName: 'ARVIND VILAS SHIRSATH',
            policyNo: 'VD013446',
            regNo: 'MH42K3635',
            paymentMode: 'ONLINE TO RELIABLE',
            agentCommAmt: 2057,
            amount: 9700,
            agentName: 'GARJE BALAJI BABASAHEB',
            empName: 'SOURABH RAJESH PALANGE',
            referenceType: 'AGENT',
            status: 'PENDING'
        },
        {
            id: 2,
            date: '03/02/2025',
            customerName: 'PRABHAKAR MARUTI KULAM',
            policyNo: 'POCMVGC0100175796',
            regNo: 'GA01T8342',
            paymentMode: 'ONLINE TO RELIABLE',
            agentCommAmt: 7555,
            amount: 18417,
            agentName: 'LOBO EUFREGINA DEBORAH',
            empName: 'RUTUJA NITIN MANE',
            referenceType: 'AGENT',
            status: 'PENDING'
        },
        {
            id: 3,
            date: '17/02/2025',
            customerName: 'CAITAN SIL VEIRA',
            policyNo: 'POCMVGC0100210809',
            regNo: 'GA07F3329',
            paymentMode: 'ONLINE TO RELIABLE',
            agentCommAmt: 9304,
            amount: 19000,
            agentName: 'LOBO EUFREGINA DEBORAH',
            empName: 'RUTUJA NITIN MANE',
            referenceType: 'AGENT',
            status: 'PENDING'
        },
        {
            id: 4,
            date: '29/04/2025',
            customerName: 'VAIBHAV DOMBALE',
            policyNo: '6303008428',
            regNo: 'MH08CA3094',
            paymentMode: 'ONLINE TO RELIABLE',
            agentCommAmt: 6283,
            amount: 32852,
            agentName: 'BANDGAR SATISH ABASO',
            empName: 'SHEKHAR RAJENDRA KUMBHAR',
            referenceType: 'AGENT',
            status: 'PENDING'
        }
    ]);

    const [endorsementRequests, setEndorsementRequests] = useState<PolicyRequestItem[]>([
        {
            id: 101,
            date: '12/03/2025',
            customerName: 'RAMESHWAR JADHAV',
            policyNo: 'END-992144',
            regNo: 'MH12Q4567',
            paymentMode: 'ONLINE TO RELIABLE',
            agentCommAmt: 1200,
            amount: 14500,
            agentName: 'SUNIL SHINDE',
            empName: 'SOURABH RAJESH PALANGE',
            referenceType: 'AGENT',
            status: 'PENDING'
        },
        {
            id: 102,
            date: '15/03/2025',
            customerName: 'KALYAN TRANSPORT CORP',
            policyNo: 'END-992150',
            regNo: 'MH43B1122',
            paymentMode: 'ONLINE TO RELIABLE',
            agentCommAmt: 2450,
            amount: 20000,
            agentName: 'AMOL DESHMUKH',
            empName: 'RUTUJA NITIN MANE',
            referenceType: 'AGENT',
            status: 'PENDING'
        }
    ]);

    // --- State for Tab 2: Voucher Entry ---
    const [voucherSearch, setVoucherSearch] = useState('');
    const [voucherPage, setVoucherPage] = useState(1);
    const [voucherPerPage, setVoucherPerPage] = useState(10);
    const [vouchers] = useState<VoucherItem[]>([
        { id: 1, voucherNo: 'VCH-2025-001', date: '01/02/2025', voucherType: 'RECEIPT', accountHead: 'ONLINE POLICY PREMIUM', debit: 79977, credit: 0, narration: 'Premium collection via broker online portal', status: 'POSTED' },
        { id: 2, voucherNo: 'VCH-2025-002', date: '03/02/2025', voucherType: 'PAYMENT', accountHead: 'AGENT COMMISSION PAYOUT', debit: 0, credit: 25199, narration: 'Fortnightly commission disbursement', status: 'POSTED' },
        { id: 3, voucherNo: 'VCH-2025-003', date: '10/02/2025', voucherType: 'JOURNAL', accountHead: 'OFFICE ADMINISTRATIVE EXPENSE', debit: 12500, credit: 0, narration: 'Stationery and postage for Baramati branch', status: 'ACTIVE' },
        { id: 4, voucherNo: 'VCH-2025-004', date: '14/02/2025', voucherType: 'RECEIPT', accountHead: 'RECOVERY ACCOUNT', debit: 8400, credit: 0, narration: 'NCB recovery refund clearance', status: 'POSTED' },
        { id: 5, voucherNo: 'VCH-2025-005', date: '20/02/2025', voucherType: 'PAYMENT', accountHead: 'INSURER REMITTANCE - TATA AIG', debit: 0, credit: 54000, narration: 'Direct policy endorsement payout', status: 'POSTED' },
    ]);

    // --- State for Tab 3: Ledger Report (Screen from Rpt_AccountReport.aspx) ---
    const [ledgerSearch, setLedgerSearch] = useState('');
    const [ledgerPage, setLedgerPage] = useState(1);
    const [ledgerPerPage, setLedgerPerPage] = useState(10);
    const [allBranch, setAllBranch] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState('BARAMATI');
    const [selectedLedgerType, setSelectedLedgerType] = useState('AGENT');
    const [selectedLedgerName, setSelectedLedgerName] = useState('ENTERPRISES VIGHNAHARTA');
    const [fromDate, setFromDate] = useState('01/05/2026');
    const [toDate, setToDate] = useState('14/10/2026');

    const branchesList = ['BARAMATI', 'PUNE', 'MUMBAI', 'SATARA', 'NASHIK', 'KOLHAPUR', 'SOLAPUR'];
    const ledgerTypesList = ['AGENT', 'GENERAL', 'CUSTOMER', 'BANK', 'EXPENSE', 'INCOME', 'BROKER'];
    const ledgerNamesByType: Record<string, string[]> = {
        AGENT: ['ENTERPRISES VIGHNAHARTA', 'LOBO EUFREGINA DEBORAH', 'BANDGAR SATISH ABASO', 'GARJE BALAJI BABASAHEB', 'SUNIL SHINDE', 'AMOL DESHMUKH'],
        GENERAL: ['ONLINE POLICY PREMIUM', 'RECOVERY ACCOUNT', 'TDS PAYABLE', 'GST PAYABLE', 'COMMISSION CLEARING'],
        CUSTOMER: ['ARVIND VILAS SHIRSATH', 'PRABHAKAR MARUTI KULAM', 'CAITAN SIL VEIRA', 'VAIBHAV DOMBALE', 'RAMESHWAR JADHAV'],
        BANK: ['BANK OF MAHARASHTRA - A/C 9081', 'HDFC BANK - A/C 4452', 'ICICI BANK - A/C 1209', 'STATE BANK OF INDIA - A/C 8821'],
        EXPENSE: ['OFFICE ADMINISTRATIVE EXPENSE', 'RENT & ELECTRICITY', 'PRINTING & STATIONERY', 'TRAVEL & CONVEYANCE'],
        INCOME: ['BROKERAGE INWARD', 'DIRECT REWARD INCENTIVE', 'ENDORSEMENT PROCESSING FEE'],
        BROKER: ['TATA AIG GENERAL INSURANCE', 'ICICI LOMBARD GIC', 'HDFC ERGO GIC', 'BAJAJ ALLIANZ GIC', 'GO DIGIT GENERAL INSURANCE']
    };

    const availableLedgerNames = selectedLedgerType
        ? (ledgerNamesByType[selectedLedgerType] || [])
        : Object.values(ledgerNamesByType).flat();

    const [ledgerItems] = useState<LedgerReportItem[]>([
        { id: 1, date: '01/05/2026', branchName: 'BARAMATI', customerName: '', regNo: '', voucher: 'TO OPENING BALANCE', narration: '', debit: 0, credit: 0, balance: 0 },
        { id: 2, date: '10/05/2026', branchName: 'BARAMATI', customerName: 'ARVIND VILAS SHIRSATH', regNo: 'MH42K3635', voucher: 'RC-2026-081', narration: 'Online policy premium inward settlement', debit: 9700, credit: 0, balance: 9700 },
        { id: 3, date: '18/05/2026', branchName: 'BARAMATI', customerName: 'ENTERPRISES VIGHNAHARTA', regNo: 'MH42K3635', voucher: 'PAY-2026-112', narration: 'Agent commission disbursed', debit: 0, credit: 2057, balance: 7643 },
        { id: 4, date: '02/06/2026', branchName: 'BARAMATI', customerName: 'PRABHAKAR MARUTI KULAM', regNo: 'GA01T8342', voucher: 'RC-2026-145', narration: 'Comprehensive commercial policy inward', debit: 18417, credit: 0, balance: 26060 },
        { id: 5, date: '15/06/2026', branchName: 'BARAMATI', customerName: 'ENTERPRISES VIGHNAHARTA', regNo: 'GA01T8342', voucher: 'PAY-2026-189', narration: 'TDS deducted commission payout', debit: 0, credit: 7555, balance: 18505 },
        { id: 6, date: '28/07/2026', branchName: 'BARAMATI', customerName: 'VAIBHAV DOMBALE', regNo: 'MH08CA3094', voucher: 'RC-2026-240', narration: 'Endorsement recovery collected', debit: 32852, credit: 0, balance: 51357 },
        { id: 7, date: '14/10/2026', branchName: 'BARAMATI', customerName: 'ENTERPRISES VIGHNAHARTA', regNo: 'MH08CA3094', voucher: 'PAY-2026-310', narration: 'Broker commission final clearance', debit: 0, credit: 6283, balance: 45074 },
    ]);

    // --- State for Generic Master-Style Tables for other tabs ---
    const [genericSearch, setGenericSearch] = useState('');
    const [genericPage, setGenericPage] = useState(1);
    const [genericPerPage, setGenericPerPage] = useState(10);

    // CSV Exporter Helper
    const exportTableToCsv = (filename: string, headers: string[], rows: (string | number)[][]) => {
        const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Exported ${filename}.csv successfully!`);
    };

    // Handlers for Cash Approval
    const currentCashList = cashSubTab === 'policy-request' ? policyRequests : endorsementRequests;
    const filteredCashList = currentCashList.filter(item => {
        if (!cashSearchQuery.trim()) return true;
        const q = cashSearchQuery.toLowerCase();
        return (
            item.customerName.toLowerCase().includes(q) ||
            item.policyNo.toLowerCase().includes(q) ||
            item.regNo.toLowerCase().includes(q) ||
            item.agentName.toLowerCase().includes(q) ||
            item.empName.toLowerCase().includes(q)
        );
    });

    const totalCashCount = currentCashList.length;
    const totalCashAmount = currentCashList.reduce((acc, curr) => acc + curr.amount, 0);

    const totalCashPages = Math.ceil(filteredCashList.length / cashPerPage) || 1;
    const paginatedCashList = filteredCashList.slice((cashPage - 1) * cashPerPage, cashPage * cashPerPage);

    const handleApproveRequest = (id: number) => {
        if (cashSubTab === 'policy-request') {
            setPolicyRequests(prev => prev.map(p => p.id === id ? { ...p, status: 'APPROVED' } : p));
        } else {
            setEndorsementRequests(prev => prev.map(p => p.id === id ? { ...p, status: 'APPROVED' } : p));
        }
        setSelectedRequest(null);
        showToast('Cash request approved successfully!');
    };

    const handleRejectRequest = (id: number) => {
        if (cashSubTab === 'policy-request') {
            setPolicyRequests(prev => prev.map(p => p.id === id ? { ...p, status: 'REJECTED' } : p));
        } else {
            setEndorsementRequests(prev => prev.map(p => p.id === id ? { ...p, status: 'REJECTED' } : p));
        }
        setSelectedRequest(null);
        showToast('Cash request rejected.');
    };

    const handleExportApproved = () => {
        const approved = currentCashList.filter(i => i.status === 'APPROVED');
        const headers = ['DATE', 'CUSTOMER NAME', 'POLICYNO', 'REG. NO.', 'PAYMENT MODE', 'AGENTCOMMAMT', 'AMOUNT', 'AGENT NAME', 'EMPNAME', 'REFERENCETYPE'];
        const rows = approved.map(i => [i.date, i.customerName, i.policyNo, i.regNo, i.paymentMode, i.agentCommAmt, i.amount, i.agentName, i.empName, i.referenceType]);
        exportTableToCsv(`Approved_Cash_List_${cashSubTab}`, headers, rows);
    };

    const handleExportPending = () => {
        const headers = ['DATE', 'CUSTOMER NAME', 'POLICYNO', 'REG. NO.', 'PAYMENT MODE', 'AGENTCOMMAMT', 'AMOUNT', 'AGENT NAME', 'EMPNAME', 'REFERENCETYPE'];
        const rows = filteredCashList.map(i => [i.date, i.customerName, i.policyNo, i.regNo, i.paymentMode, i.agentCommAmt, i.amount, i.agentName, i.empName, i.referenceType]);
        exportTableToCsv(`Pending_Cash_List_${cashSubTab}`, headers, rows);
    };

    // --- State for Tab 4: Premium Shortfall ---
    const [shortfallItems, setShortfallItems] = useState<PremiumShortfallItem[]>([
        { id: 1, transId: '222575', date: '03/10/2026', regNo: 'MH09FM8840', amount: 671, referenceType: 'AGENT', custAgentEmpName: 'AGENT--NAJNEEN ASIF GHALWADE', salesExecutive: 'RAHUL PATIL', customerName: 'DILIP PATIL', status: 'PENDING' },
        { id: 2, transId: '222514', date: '02/10/2026', regNo: 'MH25U7108', amount: 545, referenceType: 'AGENT', custAgentEmpName: 'AGENT--GANGADHAR BHARAT GHAVATE', salesExecutive: 'AMIT SHINDE', customerName: 'SANTOSH JADHAV', status: 'PENDING' },
        { id: 3, transId: '222324', date: '30/09/2026', regNo: 'KA32D3068', amount: 243, referenceType: 'AGENT', custAgentEmpName: 'AGENT--NAJNEEN ASIF GHALWADE', salesExecutive: 'RAHUL PATIL', customerName: 'PRAKASH SHARMA', status: 'PENDING' },
        { id: 4, transId: '222244', date: '29/09/2026', regNo: 'MH12HF6319', amount: 103, referenceType: 'AGENT', custAgentEmpName: 'AGENT--NAJNEEN ASIF GHALWADE', salesExecutive: 'RAHUL PATIL', customerName: 'VIKRAM DESHMUKH', status: 'PENDING' },
        { id: 5, transId: '222119', date: '28/09/2026', regNo: 'MH45AF7747', amount: 31, referenceType: 'AGENT', custAgentEmpName: 'AGENT--SUNDARDAS MAGANDAS GORAD', salesExecutive: 'PRIYA DESHMUKH', customerName: 'ANIL KULKARNI', status: 'PENDING' },
        { id: 6, transId: '222189', date: '28/09/2026', regNo: 'MH09BC7225', amount: 888, referenceType: 'AGENT', custAgentEmpName: 'AGENT--GANGADHAR BHARAT GHAVATE', salesExecutive: 'AMIT SHINDE', customerName: 'RAMESH PAWAR', status: 'PENDING' },
        { id: 7, transId: '221792', date: '25/09/2026', regNo: 'MH12DG7747', amount: 720, referenceType: 'AGENT', custAgentEmpName: 'AGENT--GANGADHAR BHARAT GHAVATE', salesExecutive: 'AMIT SHINDE', customerName: 'SACHIN THORAT', status: 'PENDING' },
        { id: 8, transId: '221790', date: '25/09/2026', regNo: 'MH12HB9174', amount: 489, referenceType: 'AGENT', custAgentEmpName: 'AGENT--GANGADHAR BHARAT GHAVATE', salesExecutive: 'AMIT SHINDE', customerName: 'MAHESH JOSHI', status: 'PENDING' },
        { id: 9, transId: '220394', date: '09/09/2026', regNo: 'MH1240412', amount: 396, referenceType: 'AGENT', custAgentEmpName: 'AGENT--SAGAR UTTAM ARGADE', salesExecutive: 'SANDEEP JAGTAP', customerName: 'PRADEEP GAIKWAD', status: 'PENDING' },
        { id: 10, transId: '220244', date: '08/09/2026', regNo: 'MH51C6498', amount: 393, referenceType: 'AGENT', custAgentEmpName: 'AGENT--NAJNEEN ASIF GHALWADE', salesExecutive: 'RAHUL PATIL', customerName: 'AJAY MORE', status: 'PENDING' },
        { id: 11, transId: '220159', date: '07/09/2026', regNo: 'MH14JL4428', amount: 299, referenceType: 'AGENT', custAgentEmpName: 'AGENT--ADITYA RAJBAHADUR SINGH', salesExecutive: 'ROHIT SONAWANE', customerName: 'SUNIL SHETE', status: 'PENDING' },
        { id: 12, transId: '219981', date: '04/09/2026', regNo: 'MH20EG0770', amount: 113, referenceType: 'AGENT', custAgentEmpName: 'AGENT--ABHIJIT PANDHARINATH DHAMALE', salesExecutive: 'VISHAL SALUNKE', customerName: 'BALASAHEB MANE', status: 'PENDING' },
        { id: 13, transId: '219623', date: '31/08/2026', regNo: 'MH34BR2219', amount: 3841, referenceType: 'AGENT', custAgentEmpName: '--', salesExecutive: 'DIRECT', customerName: 'SWATI CHAVAN', status: 'PENDING' },
        { id: 14, transId: '219434', date: '28/08/2026', regNo: 'MH11AL6491', amount: 443, referenceType: 'AGENT', custAgentEmpName: 'AGENT--GANGADHAR BHARAT GHAVATE', salesExecutive: 'AMIT SHINDE', customerName: 'KIRAN BHOSALE', status: 'PENDING' },
        { id: 15, transId: '219266', date: '26/08/2026', regNo: 'MH51C5457', amount: 25, referenceType: 'AGENT', custAgentEmpName: 'AGENT--NAJNEEN ASIF GHALWADE', salesExecutive: 'RAHUL PATIL', customerName: 'DEEPAK KALE', status: 'PENDING' },
        { id: 16, transId: '219249', date: '25/08/2026', regNo: 'MH13DQ9656', amount: 154, referenceType: 'AGENT', custAgentEmpName: 'AGENT--SWAPNIL PANDURANG SALVE', salesExecutive: 'ROHIT SONAWANE', customerName: 'NITIN SHINDE', status: 'PENDING' },
    ]);

    const [shortfallSearch, setShortfallSearch] = useState('');
    const [shortfallPage, setShortfallPage] = useState(1);
    const [shortfallPerPage, setShortfallPerPage] = useState(10);
    const [selectedShortfall, setSelectedShortfall] = useState<PremiumShortfallItem | null>(null);

    const filteredShortfall = shortfallItems.filter((item) => {
        if (!shortfallSearch.trim()) return true;
        const q = shortfallSearch.toLowerCase();
        return (
            item.transId.toLowerCase().includes(q) ||
            item.regNo.toLowerCase().includes(q) ||
            item.custAgentEmpName.toLowerCase().includes(q) ||
            (item.salesExecutive && item.salesExecutive.toLowerCase().includes(q)) ||
            (item.customerName && item.customerName.toLowerCase().includes(q)) ||
            item.referenceType.toLowerCase().includes(q)
        );
    });

    const totalShortfallCount = filteredShortfall.length;
    const totalShortfallAmount = filteredShortfall.reduce((acc, curr) => acc + curr.amount, 0);
    const totalShortfallPages = Math.ceil(filteredShortfall.length / shortfallPerPage) || 1;
    const paginatedShortfall = filteredShortfall.slice(
        (shortfallPage - 1) * shortfallPerPage,
        shortfallPage * shortfallPerPage
    );

    const handleApproveShortfall = (id: number) => {
        setShortfallItems(prev => prev.map(item => item.id === id ? { ...item, status: 'APPROVED' } : item));
        showToast(`Shortfall record #${id} approved successfully!`);
    };

    const handleExportShortfall = () => {
        const headers = ['ID', 'TRANS ID', 'DATE', 'REGISTRATION NO.', 'AMOUNT', 'REFERANCE TYPE', 'CUST AGENT EMP NAME', 'SALES EXECUTIVE', 'CUSTOMER NAME', 'STATUS'];
        const rows = filteredShortfall.map(i => [
            i.id,
            i.transId,
            i.date,
            i.regNo,
            i.amount,
            i.referenceType,
            i.custAgentEmpName,
            i.salesExecutive || '-',
            i.customerName || '-',
            i.status
        ]);
        exportTableToCsv('Premium_Shortfall_Report', headers, rows);
    };

    // --- State for Tab 5: Pending Commission (matching ERP AgentCommisionPayment.aspx) ---
    const [pendingCommissions, setPendingCommissions] = useState<PendingCommissionItem[]>([
        {
            id: 1,
            pospName: '-',
            locationName: 'AHILYANAGAR',
            agentName: 'ANJALI DNYESHWAR SONAWANE',
            premiumAmt: 12235.00,
            tpComm: 0.00,
            odComm: 1539.00,
            netComm: 0.00,
            totalComm: 1539.00,
            advAmt: 0.00,
            totalOutstandingAmount: 0.00,
            balance: 1539.00,
            accountNo: '5340389547',
            ifscCode: 'CBIN0280674',
            agentTds: 2,
            entityType: 'Agent',
            dateType: 'Trans Date',
            date: '14/10/2026'
        },
        {
            id: 2,
            pospName: 'SONALI NILKANTH BORAKAR',
            locationName: 'AHILYANAGAR',
            agentName: 'SHEKHAR MARUTI ANBHULE',
            premiumAmt: 49084.52,
            tpComm: 12516.00,
            odComm: 0.00,
            netComm: 12516.00,
            totalComm: 12516.00,
            advAmt: 0.00,
            totalOutstandingAmount: 0.00,
            balance: 12516.00,
            accountNo: '50100213606577',
            ifscCode: 'HDFC0002986',
            agentTds: 2,
            entityType: 'Agent',
            dateType: 'Trans Date',
            date: '14/10/2026'
        },
        {
            id: 3,
            pospName: '-',
            locationName: 'AKLUJ',
            agentName: 'KIRAN LAXMAN KHADAKHADE',
            premiumAmt: 60835.00,
            tpComm: 33828.00,
            odComm: 0.00,
            netComm: 33828.00,
            totalComm: 33828.00,
            advAmt: 0.00,
            totalOutstandingAmount: 0.00,
            balance: 33828.00,
            accountNo: '100003962921',
            ifscCode: 'ESFB0009029',
            agentTds: 2,
            entityType: 'Agent',
            dateType: 'Trans Date',
            date: '14/10/2026'
        },
        {
            id: 4,
            pospName: 'MOHASIN ASAGAR JAMADAR',
            locationName: 'AKLUJ',
            agentName: 'MOHASIN ASAGAR JAMADAR',
            premiumAmt: 46266.00,
            tpComm: 14677.00,
            odComm: 0.00,
            netComm: 14677.00,
            totalComm: 14677.00,
            advAmt: 0.00,
            totalOutstandingAmount: 0.00,
            balance: 14677.00,
            accountNo: '919010077731140',
            ifscCode: 'UTIB0001256',
            agentTds: 2,
            entityType: 'Agent',
            dateType: 'Trans Date',
            date: '14/10/2026'
        },
        {
            id: 5,
            pospName: 'RESHMA AMOL WAGHMARE',
            locationName: 'AKLUJ',
            agentName: 'RAJENDRA LAXMAN WAGHMARE',
            premiumAmt: 4533.00,
            tpComm: 1581.00,
            odComm: 0.00,
            netComm: 1581.00,
            totalComm: 1581.00,
            advAmt: 0.00,
            totalOutstandingAmount: 0.00,
            balance: 1581.00,
            accountNo: '50100162030864',
            ifscCode: 'HDFC0004476',
            agentTds: 2,
            entityType: 'Agent',
            dateType: 'Trans Date',
            date: '14/10/2026'
        },
        {
            id: 6,
            pospName: 'ADITYA CHANDRASHEKHAR JOSHI',
            locationName: 'AKOLA',
            agentName: 'ASHWINI SHAILENDRA JOSHI',
            premiumAmt: 44839.00,
            tpComm: 14782.00,
            odComm: 0.00,
            netComm: 14782.00,
            totalComm: 14782.00,
            advAmt: 0.00,
            totalOutstandingAmount: 0.00,
            balance: 14782.00,
            accountNo: '898805602087 / 1026005016579',
            ifscCode: 'ICIC0006968 / YESB0AUB026',
            agentTds: 2,
            entityType: 'Agent',
            dateType: 'Trans Date',
            date: '14/10/2026'
        },
        {
            id: 7,
            pospName: 'KAVITA O KASHYAP',
            locationName: 'AKOLA',
            agentName: 'KAVITA RAMAVTAR KASHYAP',
            premiumAmt: 9280.00,
            tpComm: 3831.00,
            odComm: 0.00,
            netComm: 3831.00,
            totalComm: 3831.00,
            advAmt: 0.00,
            totalOutstandingAmount: 0.00,
            balance: 3831.00,
            accountNo: '50100507159807',
            ifscCode: 'HDFC0001656',
            agentTds: 2,
            entityType: 'Agent',
            dateType: 'Trans Date',
            date: '14/10/2026'
        },
        {
            id: 8,
            pospName: 'SHIVANI PRADIP',
            locationName: 'AKOLA',
            agentName: 'SHIVANI PRADIP',
            premiumAmt: 18363.00,
            tpComm: 7861.00,
            odComm: 0.00,
            netComm: 7861.00,
            totalComm: 7861.00,
            advAmt: 0.00,
            totalOutstandingAmount: 0.00,
            balance: 7861.00,
            accountNo: '60124890123',
            ifscCode: 'MAHB0000412',
            agentTds: 2,
            entityType: 'Agent',
            dateType: 'Trans Date',
            date: '14/10/2026'
        }
    ]);

    const [commEntity, setCommEntity] = useState<'Agent' | 'Self' | 'Franchise'>('Agent');
    const [commDateType, setCommDateType] = useState<'Trans Date' | 'Risk Start Date'>('Trans Date');
    const [commFromDate, setCommFromDate] = useState('14/10/2026');
    const [commToDate, setCommToDate] = useState('14/10/2026');
    const [commSearchQuery, setCommSearchQuery] = useState('');
    const [commPage, setCommPage] = useState(1);
    const [commPerPage, setCommPerPage] = useState(10);
    const [selectedCommIds, setSelectedCommIds] = useState<number[]>([]);

    const [commOutstandingRecover, setCommOutstandingRecover] = useState('0.00');
    const [commTotalOutstandingRecover] = useState('0.00');
    const [commEwalletAmountUsed, setCommEwalletAmountUsed] = useState('0.00');
    const [commPaymentMode, setCommPaymentMode] = useState('');
    const [commLedger, setCommLedger] = useState('');
    const [commNeftNo, setCommNeftNo] = useState('');
    const [commPaymentDate, setCommPaymentDate] = useState('14/10/2026');

    // Filtered commissions based on unified search bar (referencing Registration tables)
    const filteredCommissions = pendingCommissions.filter(item => {
        if (!commSearchQuery.trim()) return true;
        const q = commSearchQuery.toLowerCase();
        return (
            item.agentName.toLowerCase().includes(q) ||
            item.pospName.toLowerCase().includes(q) ||
            item.locationName.toLowerCase().includes(q) ||
            item.accountNo.toLowerCase().includes(q) ||
            item.ifscCode.toLowerCase().includes(q)
        );
    });

    const totalPendingCommCount = filteredCommissions.length;
    const totalPendingCommBalance = filteredCommissions.reduce((acc, curr) => acc + curr.balance, 0);
    const totalCommPages = Math.ceil(filteredCommissions.length / commPerPage) || 1;
    const paginatedCommissions = filteredCommissions.slice(
        (commPage - 1) * commPerPage,
        commPage * commPerPage
    );

    const selectedCommItems = pendingCommissions.filter(i => selectedCommIds.includes(i.id));
    const selectedCommTotal = selectedCommItems.reduce((acc, curr) => acc + curr.balance, 0);
    const commPayAmount = Math.max(0, selectedCommTotal - (parseFloat(commOutstandingRecover) || 0) - (parseFloat(commEwalletAmountUsed) || 0));

    const handleToggleSelectAllCommissions = () => {
        const paginatedIds = paginatedCommissions.map(i => i.id);
        const allSelected = paginatedIds.length > 0 && paginatedIds.every(id => selectedCommIds.includes(id));
        if (allSelected) {
            setSelectedCommIds(prev => prev.filter(id => !paginatedIds.includes(id)));
        } else {
            setSelectedCommIds(prev => Array.from(new Set([...prev, ...paginatedIds])));
        }
    };

    const handleToggleCommission = (id: number) => {
        setSelectedCommIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleProcessPayment = () => {
        if (selectedCommIds.length === 0) {
            showToast('Please select at least one agent commission to pay.');
            return;
        }
        if (!commPaymentMode) {
            showToast('Please select a payment mode.');
            return;
        }
        setPendingCommissions(prev => prev.filter(i => !selectedCommIds.includes(i.id)));
        const paidCount = selectedCommIds.length;
        setSelectedCommIds([]);
        showToast(`Successfully processed payment of ₹${commPayAmount.toFixed(2)} for ${paidCount} agent(s)!`);
    };

    const handleExportCommissionSummary = () => {
        const headers = ['POSP NAME', 'LOCATION NAME', 'AGENT NAME', 'PREMIUM AMT', 'TOTAL COMM.', 'BALANCE', 'ACCOUNT NO', 'IFSC CODE', 'TDS %'];
        const rows = filteredCommissions.map(i => [
            i.pospName,
            i.locationName,
            i.agentName,
            i.premiumAmt.toFixed(2),
            i.totalComm.toFixed(2),
            i.balance.toFixed(2),
            i.accountNo,
            i.ifscCode,
            i.agentTds
        ]);
        exportTableToCsv('Pending_Commission_Summary', headers, rows);
    };

    const handleExportCommissionDetails = () => {
        const headers = ['POSP NAME', 'LOCATION NAME', 'AGENT NAME', 'PREMIUM AMT', 'TP COMM.', 'OD COMM.', 'NET COMM.', 'TOTAL COMM.', 'ADV. AMT', 'OUTSTANDING AMT', 'BALANCE', 'ACCOUNT NO', 'IFSC CODE', 'AGENT TDS %'];
        const rows = filteredCommissions.map(i => [
            i.pospName,
            i.locationName,
            i.agentName,
            i.premiumAmt.toFixed(2),
            i.tpComm.toFixed(2),
            i.odComm.toFixed(2),
            i.netComm.toFixed(2),
            i.totalComm.toFixed(2),
            i.advAmt.toFixed(2),
            i.totalOutstandingAmount.toFixed(2),
            i.balance.toFixed(2),
            i.accountNo,
            i.ifscCode,
            i.agentTds
        ]);
        exportTableToCsv('Pending_Commission_Details', headers, rows);
    };

    return (
        <div className="account-module-container space-y-5 pb-12 w-full max-w-full overflow-x-hidden">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-[100] bg-brand-navy text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 border border-brand-primary animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Header Bar */}
            <PageHeader
                title="Account Module"
                description="Financial Management, Cash Approvals, Commission Tracking & General Ledgers"
            />

            {/* 2-Row Full-Width Sub-Tabs Navigation (matching Policy Master specs - no scroll) */}
            <div className="bg-white rounded-2xl border border-brand-border p-3 space-y-2.5 shadow-sm w-full max-w-full">
                {/* Row 1: First 8 Tabs - Spreading Full Width in 8 Equal Columns */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full border-b border-slate-200 pb-2.5">
                    {tabs.slice(0, 8).map((tabItem) => {
                        const isActive = activeTab === tabItem.id;
                        return (
                            <button
                                key={tabItem.id}
                                onClick={() => handleTabChange(tabItem.id)}
                                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                                    }`}
                                title={tabItem.label}
                            >
                                <span className="truncate">{tabItem.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Row 2: Remaining 8 Tabs - Spreading Full Width in 8 Equal Columns */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full">
                    {tabs.slice(8).map((tabItem) => {
                        const isActive = activeTab === tabItem.id;
                        return (
                            <button
                                key={tabItem.id}
                                onClick={() => handleTabChange(tabItem.id)}
                                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                                    }`}
                                title={tabItem.label}
                            >
                                <span className="truncate">{tabItem.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* TAB CONTENT 1: CASH APPROVAL (REFERENCING MASTER TABLE SPECS & PHOTO 2 DATA) */}
            {activeTab === 'cash-approval' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Child Submenu Card (Policy Request / Endorsement Request & Summary Counters) */}
                    <div className="bg-white rounded-xl border border-brand-border p-4 shadow-sm flex flex-col items-center justify-center gap-3 w-full">
                        {/* Child Submenu Tabs */}
                        <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
                            <button
                                type="button"
                                onClick={() => {
                                    setCashSubTab('policy-request');
                                    setCashPage(1);
                                }}
                                className={`px-8 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer border-none ${cashSubTab === 'policy-request'
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'text-slate-600 hover:text-brand-navy hover:bg-white/60'
                                    }`}
                            >
                                Policy Request
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setCashSubTab('endorsement-request');
                                    setCashPage(1);
                                }}
                                className={`px-8 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer border-none ${cashSubTab === 'endorsement-request'
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'text-slate-600 hover:text-brand-navy hover:bg-white/60'
                                    }`}
                            >
                                Endorsement Request
                            </button>
                        </div>

                        {/* Summary Metrics directly under Child Submenu */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-700 pt-0.5">
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 uppercase tracking-wider text-xs font-bold">
                                    {cashSubTab === 'policy-request' ? 'Total Policy Request Count' : 'Total Endorsement Request Count'} :
                                </span>
                                <span className="text-brand-primary font-bold text-base">{totalCashCount}</span>
                            </div>
                            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <span className="text-slate-500 uppercase tracking-wider text-xs font-bold">
                                    {cashSubTab === 'policy-request' ? 'Total Policy Premium' : 'Total Endorsement Premium'} :
                                </span>
                                <span className="text-emerald-600 font-bold text-base">₹ {totalCashAmount.toLocaleString('en-IN')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Standardized Master Table Card */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Top Toolbar with Search & Export Buttons */}
                        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Left Side: Search Bar matching Master specs */}
                            <div className="relative w-full sm:w-[380px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    value={cashSearchQuery}
                                    onChange={(e) => {
                                        setCashSearchQuery(e.target.value);
                                        setCashPage(1);
                                    }}
                                    placeholder="Search customer, policy, reg no, agent..."
                                    className="w-full pl-9 pr-9 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[38px]"
                                />
                                {cashSearchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCashSearchQuery('');
                                            setCashPage(1);
                                        }}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Right Side: Export Buttons top of the table */}
                            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                <button
                                    type="button"
                                    onClick={handleExportApproved}
                                    className="h-[38px] px-4 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center gap-1.5"
                                    title="Export approved records"
                                >
                                    <Download size={14} />
                                    <span>Export Approved</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleExportPending}
                                    className="h-[38px] px-4 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center gap-1.5"
                                    title="Export pending records"
                                >
                                    <Download size={14} />
                                    <span>Export pending</span>
                                </button>
                            </div>
                        </div>

                        {/* Full Width Table View matching Master specs */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                            <table className="w-full text-left border-collapse min-w-[1100px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-4 w-[65px] text-center">SR.NO.</th>
                                        <th className="py-3 px-4">DATE</th>
                                        <th className="py-3 px-4">CUSTOMER NAME</th>
                                        <th className="py-3 px-4">POLICYNO</th>
                                        <th className="py-3 px-4">REG. NO.</th>
                                        <th className="py-3 px-4">PAYMENT MODE</th>
                                        <th className="py-3 px-4 text-right">AGENTCOMMAMT</th>
                                        <th className="py-3 px-4 text-right">AMOUNT</th>
                                        <th className="py-3 px-4">AGENT NAME</th>
                                        <th className="py-3 px-4">EMPNAME</th>
                                        <th className="py-3 px-4">REFERENCETYPE</th>
                                        <th className="py-3 px-4 text-center w-[80px]">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {paginatedCashList.map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                            <td className="py-2 px-4 text-center text-brand-muted font-mono">
                                                {(cashPage - 1) * cashPerPage + idx + 1}
                                            </td>
                                            <td className="py-2 px-4 text-slate-700 whitespace-nowrap">
                                                {item.date}
                                            </td>
                                            <td className="py-2 px-4 font-semibold text-[#12284A] uppercase">
                                                {item.customerName}
                                            </td>
                                            <td className="py-2 px-4 font-mono text-xs text-brand-navy uppercase">
                                                {item.policyNo}
                                            </td>
                                            <td className="py-2 px-4 font-mono text-xs text-slate-700 uppercase">
                                                {item.regNo}
                                            </td>
                                            <td className="py-2 px-4 font-semibold text-slate-700 uppercase text-xs">
                                                {item.paymentMode}
                                            </td>
                                            <td className="py-2 px-4 text-right font-medium text-slate-700">
                                                ₹ {item.agentCommAmt.toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-2 px-4 text-right font-bold text-emerald-600">
                                                ₹ {item.amount.toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-2 px-4 text-brand-navy uppercase">
                                                {item.agentName}
                                            </td>
                                            <td className="py-2 px-4 text-slate-700 uppercase">
                                                {item.empName}
                                            </td>
                                            <td className="py-2 px-4 font-semibold text-brand-navy uppercase text-xs">
                                                {item.referenceType}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedRequest(item)}
                                                    className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-blue-100 hover:text-blue-800 rounded-[6px] transition-colors cursor-pointer border-none inline-flex items-center justify-center"
                                                    title={`View Cash Request - ${item.customerName}`}
                                                >
                                                    <Eye size={16} strokeWidth={2} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedCashList.length === 0 && (
                                        <tr>
                                            <td colSpan={12} className="py-12 text-center text-slate-500">
                                                No cash approval records found matching "{cashSearchQuery}"
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Standardized Master Pagination Controls */}
                        <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
                            <div className="flex items-center gap-2">
                                <span>Records per page:</span>
                                <select
                                    value={cashPerPage}
                                    onChange={(e) => {
                                        setCashPerPage(Number(e.target.value));
                                        setCashPage(1);
                                    }}
                                    className="border border-slate-300 rounded px-2 py-1 text-xs bg-white text-slate-800 outline-none cursor-pointer"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>

                            <span className="font-medium text-slate-600">
                                Showing {filteredCashList.length === 0 ? 0 : (cashPage - 1) * cashPerPage + 1} - {Math.min(cashPage * cashPerPage, filteredCashList.length)} of {filteredCashList.length} records
                            </span>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => setCashPage(prev => Math.max(prev - 1, 1))}
                                    disabled={cashPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalCashPages || 1 }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => setCashPage(page)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${cashPage === page
                                            ? 'bg-brand-primary text-white shadow-sm'
                                            : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setCashPage(prev => Math.min(prev + 1, totalCashPages))}
                                    disabled={cashPage === totalCashPages || totalCashPages === 0}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 2: VOUCHER ENTRY (MATCHING MASTER TABLE SPECS) */}
            {activeTab === 'voucher-entry' && (() => {
                const filteredVouchers = vouchers.filter(v =>
                    !voucherSearch ||
                    v.voucherNo.toLowerCase().includes(voucherSearch.toLowerCase()) ||
                    v.accountHead.toLowerCase().includes(voucherSearch.toLowerCase()) ||
                    v.narration.toLowerCase().includes(voucherSearch.toLowerCase())
                );
                const totalVoucherPages = Math.ceil(filteredVouchers.length / voucherPerPage) || 1;
                const paginatedVouchers = filteredVouchers.slice((voucherPage - 1) * voucherPerPage, voucherPage * voucherPerPage);

                return (
                    <div className="tab-transition-wrapper space-y-4">
                        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                            <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="relative w-full sm:w-[400px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        value={voucherSearch}
                                        onChange={(e) => { setVoucherSearch(e.target.value); setVoucherPage(1); }}
                                        placeholder="Search by voucher no or account head..."
                                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => showToast('New voucher form opened')}
                                    className="w-full sm:w-auto px-5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg font-semibold text-sm shadow-xs transition-all duration-200 cursor-pointer border-none h-[40px] flex items-center justify-center gap-2 shrink-0"
                                >
                                    <Plus size={16} />
                                    <span>New Voucher Entry</span>
                                </button>
                            </div>

                            <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                                <table className="w-full text-left border-collapse min-w-[900px]">
                                    <thead>
                                        <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                            <th className="py-3 px-4 w-[140px]">VOUCHER NO</th>
                                            <th className="py-3 px-4 w-[110px]">DATE</th>
                                            <th className="py-3 px-4 w-[120px]">TYPE</th>
                                            <th className="py-3 px-4">ACCOUNT HEAD</th>
                                            <th className="py-3 px-4 text-right">DEBIT (₹)</th>
                                            <th className="py-3 px-4 text-right">CREDIT (₹)</th>
                                            <th className="py-3 px-4">NARRATION</th>
                                            <th className="py-3 px-4 text-center w-[100px]">STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-border text-[13px]">
                                        {paginatedVouchers.map((v) => (
                                            <tr key={v.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                                <td className="py-2 px-4 font-mono font-medium text-brand-navy">{v.voucherNo}</td>
                                                <td className="py-2 px-4 text-slate-600">{v.date}</td>
                                                <td className="py-2 px-4">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${v.voucherType === 'RECEIPT' ? 'bg-emerald-100 text-emerald-800' :
                                                        v.voucherType === 'PAYMENT' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                                                        }`}>
                                                        {v.voucherType}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 font-semibold text-[#12284A] uppercase">{v.accountHead}</td>
                                                <td className="py-2 px-4 text-right font-medium text-slate-700">{v.debit ? `₹ ${v.debit.toLocaleString('en-IN')}` : '-'}</td>
                                                <td className="py-2 px-4 text-right font-medium text-slate-700">{v.credit ? `₹ ${v.credit.toLocaleString('en-IN')}` : '-'}</td>
                                                <td className="py-2 px-4 text-slate-600 text-xs">{v.narration}</td>
                                                <td className="py-2 px-4 text-center">
                                                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-100 text-slate-700">
                                                        {v.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
                                <span>Showing {paginatedVouchers.length} of {filteredVouchers.length} entries</span>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* TAB CONTENT 3: ACCOUNT LEDGER REPORT (EXACT LAYOUT FROM Rpt_AccountReport.aspx) */}
            {activeTab === 'ledger-report' && (() => {
                const filteredLedger = ledgerItems.filter(l => {
                    if (!ledgerSearch.trim()) return true;
                    const q = ledgerSearch.toLowerCase();
                    return (
                        l.branchName.toLowerCase().includes(q) ||
                        l.customerName.toLowerCase().includes(q) ||
                        l.regNo.toLowerCase().includes(q) ||
                        l.voucher.toLowerCase().includes(q) ||
                        l.narration.toLowerCase().includes(q)
                    );
                });
                const totalLedgerPages = Math.ceil(filteredLedger.length / ledgerPerPage) || 1;
                const paginatedLedger = filteredLedger.slice((ledgerPage - 1) * ledgerPerPage, ledgerPage * ledgerPerPage);

                const totalDebit = filteredLedger.reduce((sum, item) => sum + (item.debit || 0), 0);
                const totalCredit = filteredLedger.reduce((sum, item) => sum + (item.credit || 0), 0);
                const closingBalance = filteredLedger.length > 0 ? filteredLedger[filteredLedger.length - 1].balance : 0;

                const handleViewReport = () => {
                    setLedgerPage(1);
                    const branchName = allBranch ? 'All Branches' : (selectedBranch || 'All Branches');
                    showToast(`Detailed Account Ledger Report generated for ${branchName}!`);
                };

                const handleView = () => {
                    setLedgerPage(1);
                    const branchName = allBranch ? 'All Branches' : (selectedBranch || 'All Branches');
                    const ledgerName = selectedLedgerName || (selectedLedgerType ? `${selectedLedgerType} Ledgers` : 'All Ledgers');
                    showToast(`Ledger loaded for ${branchName} • ${ledgerName} (${fromDate} - ${toDate})`);
                };

                const handleExportLedger = () => {
                    const headers = ['DATE', 'BRANCH NAME', 'CUSTOMER NAME', 'REGISTRATION NO.', 'VOUCHER', 'NARRATION', 'DEBIT', 'CREDIT', 'BALANCE'];
                    const rows = filteredLedger.map(l => [
                        l.date,
                        l.branchName,
                        l.customerName,
                        l.regNo,
                        l.voucher,
                        l.narration,
                        l.debit,
                        l.credit,
                        l.balance
                    ]);
                    exportTableToCsv(`Account_Ledger_${selectedBranch || 'All'}_${selectedLedgerName || 'Report'}`, headers, rows);
                };

                return (
                    <div className="tab-transition-wrapper flex flex-col lg:flex-row items-start gap-5 w-full">
                        {/* Left Side: Filter Form Card strictly matching Rpt_AccountReport.aspx */}
                        <div className="w-full lg:w-[320px] shrink-0 bg-white rounded-2xl border border-brand-border p-5 shadow-sm space-y-3.5">
                            {/* All Branch Checkbox */}
                            <div className="flex items-center gap-2.5">
                                <input
                                    id="all-branch-checkbox"
                                    type="checkbox"
                                    checked={allBranch}
                                    onChange={(e) => setAllBranch(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                />
                                <label htmlFor="all-branch-checkbox" className="text-sm font-semibold text-slate-700 cursor-pointer select-none">
                                    All Branch
                                </label>
                            </div>

                            {/* Branch Dropdown */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                                <select
                                    disabled={allBranch}
                                    value={allBranch ? '' : selectedBranch}
                                    onChange={(e) => setSelectedBranch(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all disabled:bg-slate-100 disabled:text-slate-400"
                                >
                                    <option value="">--Select Branch Name--</option>
                                    {branchesList.map(b => (
                                        <option key={b} value={b}>{b}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Ledger Type Dropdown */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Ledger Type</label>
                                <select
                                    value={selectedLedgerType}
                                    onChange={(e) => {
                                        setSelectedLedgerType(e.target.value);
                                        setSelectedLedgerName('');
                                    }}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                                >
                                    <option value="">--Select Ledger Type--</option>
                                    {ledgerTypesList.map(t => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Ledger Name Dropdown */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">Ledger Name</label>
                                <select
                                    value={selectedLedgerName}
                                    onChange={(e) => setSelectedLedgerName(e.target.value)}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all"
                                >
                                    <option value="">--Select Ledger Name--</option>
                                    {availableLedgerNames.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* From Date */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">From Date</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all h-[38px]"
                                    />
                                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* To Date */}
                            <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">To Date</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full pl-3 pr-9 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none transition-all h-[38px]"
                                    />
                                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Action Buttons: View Report (Green) & View (Blue) matching screenshot */}
                            <div className="flex items-center gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={handleViewReport}
                                    className="flex-1 py-2.5 px-3 bg-[#4CAF50] hover:bg-[#43A047] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <span>View Report</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleView}
                                    className="flex-1 py-2.5 px-3 bg-[#0070BA] hover:bg-[#005ea6] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <span>View</span>
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Master-Style Table Card */}
                        <div className="flex-1 min-w-0 w-full bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
                            {/* Table Top Toolbar matching Master specs */}
                            <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                {/* Search Bar matching Master specs */}
                                <div className="relative w-full sm:w-[380px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        value={ledgerSearch}
                                        onChange={(e) => { setLedgerSearch(e.target.value); setLedgerPage(1); }}
                                        placeholder="Search customer, reg no, voucher, narration..."
                                        className="w-full pl-9 pr-9 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[38px]"
                                    />
                                    {ledgerSearch && (
                                        <button
                                            type="button"
                                            onClick={() => { setLedgerSearch(''); setLedgerPage(1); }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Export Button at top of the table */}
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <button
                                        type="button"
                                        onClick={handleExportLedger}
                                        className="h-[38px] px-5 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center gap-1.5"
                                        title="Export ledger records"
                                    >
                                        <Download size={14} />
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>

                            {/* Full Width Table View matching Master specs */}
                            <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                            <th className="py-3 px-4 w-[65px] text-center">SR.NO.</th>
                                            <th className="py-3 px-4">DATE</th>
                                            <th className="py-3 px-4">BRANCH NAME</th>
                                            <th className="py-3 px-4">CUSTOMER NAME</th>
                                            <th className="py-3 px-4">REGISTRATION NO.</th>
                                            <th className="py-3 px-4">VOUCHER</th>
                                            <th className="py-3 px-4">NARRATION</th>
                                            <th className="py-3 px-4 text-right">DEBIT (₹)</th>
                                            <th className="py-3 px-4 text-right">CREDIT (₹)</th>
                                            <th className="py-3 px-4 text-right">BALANCE (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-border text-[13px]">
                                        {paginatedLedger.map((item, idx) => (
                                            <tr key={item.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                                <td className="py-2 px-4 text-center text-brand-muted font-mono">
                                                    {(ledgerPage - 1) * ledgerPerPage + idx + 1}
                                                </td>
                                                <td className="py-2 px-4 text-slate-700 whitespace-nowrap">
                                                    {item.date}
                                                </td>
                                                <td className="py-2 px-4 font-semibold text-brand-navy uppercase">
                                                    {item.branchName}
                                                </td>
                                                <td className="py-2 px-4 font-semibold text-slate-800 uppercase">
                                                    {item.customerName || '-'}
                                                </td>
                                                <td className="py-2 px-4 font-mono text-xs text-slate-700 uppercase">
                                                    {item.regNo || '-'}
                                                </td>
                                                <td className="py-2 px-4 font-medium text-brand-navy uppercase">
                                                    {item.voucher}
                                                </td>
                                                <td className="py-2 px-4 text-slate-600 text-xs">
                                                    {item.narration || '-'}
                                                </td>
                                                <td className="py-2 px-4 text-right font-medium text-slate-700">
                                                    {item.debit ? `₹ ${item.debit.toLocaleString('en-IN')}` : '0'}
                                                </td>
                                                <td className="py-2 px-4 text-right font-medium text-slate-700">
                                                    {item.credit ? `₹ ${item.credit.toLocaleString('en-IN')}` : '0'}
                                                </td>
                                                <td className="py-2 px-4 text-right font-bold text-brand-navy">
                                                    ₹ {item.balance.toLocaleString('en-IN')}
                                                </td>
                                            </tr>
                                        ))}
                                        {paginatedLedger.length === 0 && (
                                            <tr>
                                                <td colSpan={10} className="py-12 text-center text-slate-500">
                                                    No account ledger records found matching "{ledgerSearch}"
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    {/* TOTAL Summary Row */}
                                    <tfoot className="border-t-2 border-brand-border bg-brand-lightbg/60 font-bold text-[13px] text-brand-navy">
                                        <tr>
                                            <td colSpan={7} className="py-3 px-4 text-right uppercase tracking-wider text-slate-700">
                                                TOTAL
                                            </td>
                                            <td className="py-3 px-4 text-right text-slate-800">
                                                {totalDebit ? `₹ ${totalDebit.toLocaleString('en-IN')}` : '0'}
                                            </td>
                                            <td className="py-3 px-4 text-right text-slate-800">
                                                {totalCredit ? `₹ ${totalCredit.toLocaleString('en-IN')}` : '0'}
                                            </td>
                                            <td className="py-3 px-4 text-right text-brand-primary">
                                                ₹ {closingBalance.toLocaleString('en-IN')}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Standardized Master Pagination Controls */}
                            <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
                                <div className="flex items-center gap-2">
                                    <span>Records per page:</span>
                                    <select
                                        value={ledgerPerPage}
                                        onChange={(e) => {
                                            setLedgerPerPage(Number(e.target.value));
                                            setLedgerPage(1);
                                        }}
                                        className="border border-slate-300 rounded px-2 py-1 text-xs bg-white text-slate-800 outline-none cursor-pointer"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </div>

                                <span className="font-medium text-slate-600">
                                    Showing {filteredLedger.length === 0 ? 0 : (ledgerPage - 1) * ledgerPerPage + 1} - {Math.min(ledgerPage * ledgerPerPage, filteredLedger.length)} of {filteredLedger.length} records
                                </span>

                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setLedgerPage(prev => Math.max(prev - 1, 1))}
                                        disabled={ledgerPage === 1}
                                        className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        &lt;
                                    </button>
                                    {Array.from({ length: totalLedgerPages || 1 }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => setLedgerPage(page)}
                                            className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${ledgerPage === page
                                                ? 'bg-brand-primary text-white shadow-sm'
                                                : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setLedgerPage(prev => Math.min(prev + 1, totalLedgerPages))}
                                        disabled={ledgerPage === totalLedgerPages || totalLedgerPages === 0}
                                        className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* TAB CONTENT 4: PREMIUM SHORTFALL (MASTER STYLE) */}
            {activeTab === 'premium-shortfall' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Master Table Card */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Top Toolbar matching Registration tables */}
                        <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Single Merged Search Input */}
                                <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                    <input
                                        type="text"
                                        value={shortfallSearch}
                                        onChange={(e) => {
                                            setShortfallSearch(e.target.value);
                                            setShortfallPage(1);
                                        }}
                                        placeholder="Search Agent, Sales Executive or Customer..."
                                        className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                    />
                                    {shortfallSearch && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShortfallSearch('');
                                                setShortfallPage(1);
                                            }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Summary Counters */}
                                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-[6px]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Count :-</span>
                                        <span className="text-brand-primary font-bold text-sm">{totalShortfallCount}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Amount :-</span>
                                        <span className="text-emerald-600 font-bold text-sm">₹ {totalShortfallAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Export Button */}
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleExportShortfall}
                                    className="h-[38px] px-5 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center gap-1.5"
                                    title="Export Premium Shortfall records"
                                >
                                    <Download size={14} />
                                    <span>Export</span>
                                </button>
                            </div>
                        </div>

                        {/* Full Width Table View matching Master specs */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-4 w-[65px] text-center">ID</th>
                                        <th className="py-3 px-4">TRANS ID</th>
                                        <th className="py-3 px-4">DATE</th>
                                        <th className="py-3 px-4">REGISTRATIONNO</th>
                                        <th className="py-3 px-4 text-right">AMOUNT (₹)</th>
                                        <th className="py-3 px-4">REFERANCE TYPE</th>
                                        <th className="py-3 px-4">CUST AGENT EMP NAME</th>
                                        <th className="py-3 px-4 text-center w-[100px]">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {paginatedShortfall.map((item) => (
                                        <tr key={item.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                            <td className="py-2 px-4 text-center text-brand-muted font-mono font-medium">
                                                {item.id}
                                            </td>
                                            <td className="py-2 px-4 font-mono font-semibold text-brand-primary">
                                                {item.transId}
                                            </td>
                                            <td className="py-2 px-4 text-slate-700 whitespace-nowrap">
                                                {item.date}
                                            </td>
                                            <td className="py-2 px-4 font-mono text-xs font-semibold text-slate-800 uppercase">
                                                {item.regNo}
                                            </td>
                                            <td className="py-2 px-4 text-right font-bold text-slate-900">
                                                ₹ {item.amount.toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-2 px-4 font-medium text-slate-700 uppercase">
                                                {item.referenceType}
                                            </td>
                                            <td className="py-2 px-4 font-semibold text-slate-800 uppercase text-xs">
                                                {item.custAgentEmpName}
                                            </td>
                                            <td className="py-2 px-4 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {/* Approve Action Icon */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleApproveShortfall(item.id)}
                                                        className={`p-1.5 rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none ${
                                                            item.status === 'APPROVED'
                                                                ? 'bg-emerald-100 text-emerald-700 cursor-default'
                                                                : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700'
                                                        }`}
                                                        title={item.status === 'APPROVED' ? 'Approved' : 'Approve Premium Shortfall'}
                                                        disabled={item.status === 'APPROVED'}
                                                    >
                                                        <CheckCircle2 size={16} strokeWidth={2} />
                                                    </button>
                                                    {/* View Details Action Icon */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedShortfall(item)}
                                                        className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-blue-100 hover:text-blue-800 rounded-[6px] transition-colors cursor-pointer border-none inline-flex items-center justify-center"
                                                        title="View Shortfall Details"
                                                    >
                                                        <Eye size={16} strokeWidth={2} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {paginatedShortfall.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-12 text-center text-slate-500">
                                                No premium shortfall records found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Standardized Master Pagination Controls */}
                        <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
                            <div className="flex items-center gap-2">
                                <span>Records per page:</span>
                                <select
                                    value={shortfallPerPage}
                                    onChange={(e) => {
                                        setShortfallPerPage(Number(e.target.value));
                                        setShortfallPage(1);
                                    }}
                                    className="border border-slate-300 rounded px-2 py-1 text-xs bg-white text-slate-800 outline-none cursor-pointer"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>

                            <span className="font-medium text-slate-600">
                                Showing {filteredShortfall.length === 0 ? 0 : (shortfallPage - 1) * shortfallPerPage + 1} - {Math.min(shortfallPage * shortfallPerPage, filteredShortfall.length)} of {filteredShortfall.length} records
                            </span>

                            <div className="flex items-center gap-1">
                                <button
                                    type="button"
                                    onClick={() => setShortfallPage(prev => Math.max(prev - 1, 1))}
                                    disabled={shortfallPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalShortfallPages || 1 }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => setShortfallPage(page)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${shortfallPage === page
                                            ? 'bg-brand-primary text-white shadow-sm'
                                            : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setShortfallPage(prev => Math.min(prev + 1, totalShortfallPages))}
                                    disabled={shortfallPage === totalShortfallPages || totalShortfallPages === 0}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Details Modal */}
                    {selectedShortfall && (
                        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
                            <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-base font-bold text-slate-800">Shortfall Transaction Details</h3>
                                        <p className="text-xs text-slate-500 font-mono">TRANS ID: #{selectedShortfall.transId}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedShortfall(null)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-all border-none bg-transparent cursor-pointer"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4 text-sm">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-500 block uppercase font-medium">Date</span>
                                            <span className="font-semibold text-slate-800">{selectedShortfall.date}</span>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-500 block uppercase font-medium">Registration No</span>
                                            <span className="font-mono font-semibold text-slate-800">{selectedShortfall.regNo}</span>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-500 block uppercase font-medium">Shortfall Amount</span>
                                            <span className="font-bold text-emerald-600 text-base">₹ {selectedShortfall.amount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <span className="text-xs text-slate-500 block uppercase font-medium">Reference Type</span>
                                            <span className="font-semibold text-slate-800">{selectedShortfall.referenceType}</span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
                                        <div>
                                            <span className="text-xs text-slate-500 block uppercase font-medium">Cust Agent Emp Name</span>
                                            <span className="font-semibold text-slate-800">{selectedShortfall.custAgentEmpName}</span>
                                        </div>
                                        {selectedShortfall.customerName && (
                                            <div>
                                                <span className="text-xs text-slate-500 block uppercase font-medium">Customer Name</span>
                                                <span className="font-semibold text-slate-800">{selectedShortfall.customerName}</span>
                                            </div>
                                        )}
                                        {selectedShortfall.salesExecutive && (
                                            <div>
                                                <span className="text-xs text-slate-500 block uppercase font-medium">Sales Executive</span>
                                                <span className="font-semibold text-slate-800">{selectedShortfall.salesExecutive}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedShortfall(null)}
                                        className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200/80 rounded-lg transition-colors border-none bg-transparent cursor-pointer"
                                    >
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleApproveShortfall(selectedShortfall.id);
                                            setSelectedShortfall(null);
                                        }}
                                        className="px-5 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-[#1D4ED8] rounded-lg transition-colors border-none shadow-sm cursor-pointer"
                                    >
                                        Approve Shortfall
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB CONTENT 5: PENDING COMMISSION (MATCHING ERP AgentCommisionPayment.aspx) */}
            {activeTab === 'pending-commission' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Top Search & Filter Card matching screenshot */}
                    <div className="bg-white rounded-xl border border-brand-border p-5 shadow-sm space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-6">
                            {/* Entity Type Radio: Agent, Self, Franchise */}
                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                                {(['Agent', 'Self', 'Franchise'] as const).map((entity) => (
                                    <label key={entity} className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="commEntity"
                                            checked={commEntity === entity}
                                            onChange={() => setCommEntity(entity)}
                                            className="text-brand-primary focus:ring-brand-primary cursor-pointer"
                                        />
                                        <span>{entity}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Date Type Radio: Trans Date, Risk Start Date */}
                            <div className="flex items-center gap-4 text-xs font-semibold text-slate-700">
                                {(['Trans Date', 'Risk Start Date'] as const).map((dType) => (
                                    <label key={dType} className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="commDateType"
                                            checked={commDateType === dType}
                                            onChange={() => setCommDateType(dType)}
                                            className="text-brand-primary focus:ring-brand-primary cursor-pointer"
                                        />
                                        <span>{dType}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Date inputs: From Date & To Date */}
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-semibold text-slate-600 mb-1">From Date</span>
                                    <input
                                        type="text"
                                        value={commFromDate}
                                        onChange={(e) => setCommFromDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-32 h-[34px] px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] font-semibold text-slate-600 mb-1">To Date</span>
                                    <input
                                        type="text"
                                        value={commToDate}
                                        onChange={(e) => setCommToDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-32 h-[34px] px-2.5 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Top Filter Buttons: Show & Reset */}
                        <div className="flex flex-wrap items-center gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => showToast('Commission data filtered successfully!')}
                                className="h-[36px] px-6 bg-[#0052CC] hover:bg-[#0047B3] text-white font-bold text-xs rounded transition-colors cursor-pointer border-none shadow-sm"
                            >
                                Show
                            </button>
                            {(commSearchQuery || selectedCommIds.length > 0) && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCommSearchQuery('');
                                        setCommPage(1);
                                        setSelectedCommIds([]);
                                    }}
                                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 underline cursor-pointer bg-transparent border-none ml-2"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Split Layout: Table (Left/Main) + Payment Sidebar (Right) */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
                        {/* Left Side: Commission Data Table (Master & Registration Style) */}
                        <div className="flex-1 min-w-0 w-full bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
                            {/* Table Top Toolbar matching Registration tables */}
                            <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3 flex-wrap">
                                    {/* Single Merged Search Input referencing Registration tables */}
                                    <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                        <input
                                            type="text"
                                            value={commSearchQuery}
                                            onChange={(e) => {
                                                setCommSearchQuery(e.target.value);
                                                setCommPage(1);
                                            }}
                                            placeholder="Search Agent, POSP, Location, Account No..."
                                            className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                        />
                                        {commSearchQuery && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setCommSearchQuery('');
                                                    setCommPage(1);
                                                }}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Live Summary Counters badge matching Registration tables */}
                                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-[6px]">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-slate-500 font-bold">Total Count :-</span>
                                            <span className="text-brand-primary font-bold text-sm">{totalPendingCommCount}</span>
                                        </div>
                                        <div className="h-4 w-px bg-slate-300" />
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-slate-500 font-bold">Total Balance :-</span>
                                            <span className="text-emerald-600 font-bold text-sm">₹ {totalPendingCommBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Export Buttons on the right with Master orange button styling */}
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleExportCommissionSummary}
                                        className="h-[38px] px-4 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center gap-1.5"
                                        title="Export Summary"
                                    >
                                        <Download size={14} />
                                        <span>Export Summary</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleExportCommissionDetails}
                                        className="h-[38px] px-4 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center gap-1.5"
                                        title="Export Details"
                                    >
                                        <Download size={14} />
                                        <span>Export Details</span>
                                    </button>
                                </div>
                            </div>

                            {/* Full Width Table View matching Master specs */}
                            <div className="overflow-x-auto w-full custom-scrollbar min-h-[440px]">
                                <table className="w-full text-left border-collapse min-w-[1300px]">
                                    <thead>
                                        <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                            <th className="py-3 px-3.5">POSP NAME</th>
                                            <th className="py-3 px-3.5">LOCATION NAME</th>
                                            <th className="py-3 px-3.5">AGENT NAME</th>
                                            <th className="py-3 px-3.5 text-right">PREMIUM AMT</th>
                                            <th className="py-3 px-3.5 text-right">TP COMM.</th>
                                            <th className="py-3 px-3.5 text-right">OD COMM.</th>
                                            <th className="py-3 px-3.5 text-right">NET COMM.</th>
                                            <th className="py-3 px-3.5 text-right">TOTAL COMM.</th>
                                            <th className="py-3 px-3.5 text-right">ADV. AMT</th>
                                            <th className="py-3 px-3.5 text-right">TOTAL OUT STANDING AMOUNT</th>
                                            <th className="py-3 px-3.5 text-right">BALANCE</th>
                                            <th className="py-3 px-3.5 text-center w-[45px]">
                                                <input
                                                    type="checkbox"
                                                    checked={paginatedCommissions.length > 0 && paginatedCommissions.every(i => selectedCommIds.includes(i.id))}
                                                    onChange={handleToggleSelectAllCommissions}
                                                    className="w-4 h-4 rounded text-brand-primary cursor-pointer accent-brand-primary"
                                                    title="Select All"
                                                />
                                            </th>
                                            <th className="py-3 px-3.5">ACCOUNTNO</th>
                                            <th className="py-3 px-3.5">IFSC_CODE</th>
                                            <th className="py-3 px-3.5 text-center">AGENTTDS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-border text-[13px]">
                                        {paginatedCommissions.map((item) => {
                                            const isSelected = selectedCommIds.includes(item.id);
                                            return (
                                                <tr
                                                    key={item.id}
                                                    onClick={() => handleToggleCommission(item.id)}
                                                    className={`h-[48px] cursor-pointer transition-colors ${
                                                        isSelected ? 'bg-blue-50/70 font-medium' : 'hover:bg-brand-mainbg bg-white'
                                                    }`}
                                                >
                                                    <td className="py-2 px-3.5 text-slate-700 whitespace-nowrap">{item.pospName}</td>
                                                    <td className="py-2 px-3.5 font-semibold text-brand-navy">{item.locationName}</td>
                                                    <td className="py-2 px-3.5 font-semibold text-brand-primary">{item.agentName}</td>
                                                    <td className="py-2 px-3.5 text-right font-mono text-slate-800">₹ {item.premiumAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td className="py-2 px-3.5 text-right font-mono text-slate-700">{item.tpComm.toFixed(2)}</td>
                                                    <td className="py-2 px-3.5 text-right font-mono text-slate-700">{item.odComm.toFixed(2)}</td>
                                                    <td className="py-2 px-3.5 text-right font-mono text-slate-700">{item.netComm.toFixed(2)}</td>
                                                    <td className="py-2 px-3.5 text-right font-mono font-bold text-slate-900">{item.totalComm.toFixed(2)}</td>
                                                    <td className="py-2 px-3.5 text-right font-mono text-slate-500">{item.advAmt.toFixed(2)}</td>
                                                    <td className="py-2 px-3.5 text-right font-mono text-slate-500">{item.totalOutstandingAmount.toFixed(2)}</td>
                                                    <td className="py-2 px-3.5 text-right font-mono font-bold text-emerald-600">₹ {item.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                                    <td className="py-2 px-3.5 text-center" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleToggleCommission(item.id)}
                                                            className="w-4 h-4 rounded text-brand-primary cursor-pointer accent-brand-primary"
                                                        />
                                                    </td>
                                                    <td className="py-2 px-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">{item.accountNo}</td>
                                                    <td className="py-2 px-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">{item.ifscCode}</td>
                                                    <td className="py-2 px-3.5 text-center font-semibold text-slate-700">{item.agentTds}%</td>
                                                </tr>
                                            );
                                        })}
                                        {paginatedCommissions.length === 0 && (
                                            <tr>
                                                <td colSpan={15} className="py-12 text-center text-slate-500 font-medium">
                                                    No pending commission records found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Standardized Master Pagination Controls */}
                            <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
                                <div className="flex items-center gap-2">
                                    <span>Records per page:</span>
                                    <select
                                        value={commPerPage}
                                        onChange={(e) => {
                                            setCommPerPage(Number(e.target.value));
                                            setCommPage(1);
                                        }}
                                        className="border border-slate-300 rounded px-2 py-1 text-xs bg-white text-slate-800 outline-none cursor-pointer"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </div>

                                <span className="font-medium text-slate-600">
                                    Showing {filteredCommissions.length === 0 ? 0 : (commPage - 1) * commPerPage + 1} - {Math.min(commPage * commPerPage, filteredCommissions.length)} of {filteredCommissions.length} records ({selectedCommIds.length} selected)
                                </span>

                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setCommPage(prev => Math.max(prev - 1, 1))}
                                        disabled={commPage === 1}
                                        className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        &lt;
                                    </button>
                                    {Array.from({ length: totalCommPages || 1 }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            type="button"
                                            onClick={() => setCommPage(page)}
                                            className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${commPage === page
                                                ? 'bg-brand-primary text-white shadow-sm'
                                                : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => setCommPage(prev => Math.min(prev + 1, totalCommPages))}
                                        disabled={commPage === totalCommPages || totalCommPages === 0}
                                        className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Payment Panel matching ERP specs */}
                        <div className="w-full lg:w-[310px] shrink-0 bg-white rounded-[12px] border border-brand-border p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] space-y-3 sticky top-4">
                            <div className="border-b border-brand-border pb-2.5">
                                <h3 className="text-sm font-bold text-brand-navy">Payment Settlement</h3>
                                <p className="text-[11px] text-slate-500">Process commissions for selected agents</p>
                            </div>

                            {/* Total */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    Total
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    value={selectedCommTotal.toFixed(2)}
                                    className="w-full h-[34px] px-2.5 bg-slate-100 border border-[#CBD5E1] rounded-[6px] text-xs font-mono font-bold text-slate-800 outline-none"
                                />
                            </div>

                            {/* Outstanding Recover */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    Outstanding Recover
                                </span>
                                <input
                                    type="text"
                                    value={commOutstandingRecover}
                                    onChange={(e) => setCommOutstandingRecover(e.target.value)}
                                    className="w-full h-[34px] px-2.5 bg-white border border-[#CBD5E1] rounded-[6px] text-xs font-mono text-slate-800 outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>

                            {/* Total Outstanding Recover */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    Total Outstanding Recover
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    value={commTotalOutstandingRecover}
                                    className="w-full h-[34px] px-2.5 bg-slate-100 border border-[#CBD5E1] rounded-[6px] text-xs font-mono text-slate-800 outline-none"
                                />
                            </div>

                            {/* Total E-wallet Amount Used */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    Total E-wallet Amount Used
                                </span>
                                <input
                                    type="text"
                                    value={commEwalletAmountUsed}
                                    onChange={(e) => setCommEwalletAmountUsed(e.target.value)}
                                    className="w-full h-[34px] px-2.5 bg-white border border-[#CBD5E1] rounded-[6px] text-xs font-mono text-slate-800 outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>

                            {/* Pay */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    Pay
                                </span>
                                <input
                                    type="text"
                                    readOnly
                                    value={commPayAmount.toFixed(2)}
                                    className="w-full h-[34px] px-2.5 bg-emerald-50 border border-emerald-300 rounded-[6px] text-xs font-mono font-bold text-emerald-700 outline-none"
                                />
                            </div>

                            {/* Select Payment Mode */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    Select Payment Mode
                                </span>
                                <select
                                    value={commPaymentMode}
                                    onChange={(e) => setCommPaymentMode(e.target.value)}
                                    className="w-full h-[34px] px-2 bg-white border border-[#CBD5E1] rounded-[6px] text-xs text-slate-800 outline-none cursor-pointer focus:ring-2 focus:ring-brand-primary"
                                >
                                    <option value="">--Select Payment Mode--</option>
                                    <option value="CASH">Cash</option>
                                    <option value="NEFT">NEFT / RTGS</option>
                                    <option value="CHEQUE">Cheque</option>
                                    <option value="ONLINE">Online Transfer</option>
                                </select>
                            </div>

                            {/* Cash / Ledger */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    {commPaymentMode === 'CASH' ? 'Cash Account' : 'Bank Ledger'}
                                </span>
                                <select
                                    value={commLedger}
                                    onChange={(e) => setCommLedger(e.target.value)}
                                    className="w-full h-[34px] px-2 bg-white border border-[#CBD5E1] rounded-[6px] text-xs text-slate-800 outline-none cursor-pointer focus:ring-2 focus:ring-brand-primary"
                                >
                                    <option value="">--Select Ledger--</option>
                                    <option value="CASH_BARAMATI">CASH IN HAND - BARAMATI</option>
                                    <option value="BOM_9081">BANK OF MAHARASHTRA - A/C 9081</option>
                                    <option value="HDFC_4452">HDFC BANK - A/C 4452</option>
                                    <option value="ICICI_1209">ICICI BANK - A/C 1209</option>
                                    <option value="SBI_8821">STATE BANK OF INDIA - A/C 8821</option>
                                </select>
                            </div>

                            {/* NEFT No. */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    NEFT No.
                                </span>
                                <input
                                    type="text"
                                    value={commNeftNo}
                                    onChange={(e) => setCommNeftNo(e.target.value)}
                                    placeholder="Enter NEFT / Cheque / Ref No."
                                    className="w-full h-[34px] px-2.5 bg-white border border-[#CBD5E1] rounded-[6px] text-xs text-slate-800 outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>

                            {/* Payment Date */}
                            <div>
                                <span className="bg-[#0070BA] text-white text-[10px] font-bold px-2 py-0.5 rounded-[3px] inline-block mb-1">
                                    Payment Date
                                </span>
                                <input
                                    type="text"
                                    value={commPaymentDate}
                                    onChange={(e) => setCommPaymentDate(e.target.value)}
                                    placeholder="DD/MM/YYYY"
                                    className="w-full h-[34px] px-2.5 bg-white border border-[#CBD5E1] rounded-[6px] text-xs text-slate-800 outline-none focus:ring-2 focus:ring-brand-primary"
                                />
                            </div>

                            {/* Pay Button */}
                            <div className="pt-2">
                                <button
                                    type="button"
                                    onClick={handleProcessPayment}
                                    className="w-full h-[38px] bg-[#EAA144] hover:bg-[#D99B35] text-white font-bold text-xs rounded-lg transition-colors cursor-pointer border-none shadow-sm flex items-center justify-center gap-1.5"
                                >
                                    <span>Pay ({selectedCommIds.length})</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 6 TO 16: MASTER REFERENCE TABLES */}
            {activeTab !== 'cash-approval' && activeTab !== 'voucher-entry' && activeTab !== 'ledger-report' && activeTab !== 'premium-shortfall' && activeTab !== 'pending-commission' && (
                <div className="tab-transition-wrapper space-y-4">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Master Table Toolbar */}
                        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-[400px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    value={genericSearch}
                                    onChange={(e) => setGenericSearch(e.target.value)}
                                    placeholder={`Search in ${tabs.find(t => t.id === activeTab)?.label}...`}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                                />
                            </div>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                    type="button"
                                    onClick={() => showToast(`Sync completed for ${tabs.find(t => t.id === activeTab)?.label}`)}
                                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-sm rounded-lg transition-all cursor-pointer border-none h-[40px] flex items-center justify-center gap-1.5"
                                >
                                    <RefreshCw size={14} />
                                    <span>Sync</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => showToast(`Export initiated for ${tabs.find(t => t.id === activeTab)?.label}`)}
                                    className="px-5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg font-semibold text-sm shadow-xs transition-all duration-200 cursor-pointer border-none h-[40px] flex items-center justify-center gap-2"
                                >
                                    <Download size={14} />
                                    <span>Export CSV</span>
                                </button>
                            </div>
                        </div>

                        {/* Standardized Master Style Data Table */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                            <table className="w-full text-left border-collapse min-w-[900px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-4 w-[70px] text-center">SR.NO.</th>
                                        <th className="py-3 px-4">REFERENCE ID</th>
                                        <th className="py-3 px-4">DATE / TIME</th>
                                        <th className="py-3 px-4">PARTY / AGENT NAME</th>
                                        <th className="py-3 px-4 text-right">AMOUNT (₹)</th>
                                        <th className="py-3 px-4">REMARKS / DESCRIPTION</th>
                                        <th className="py-3 px-4 text-center w-[120px]">STATUS</th>
                                        <th className="py-3 px-4 text-center w-[90px]">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {[1, 2, 3, 4, 5].map((idx) => (
                                        <tr key={idx} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                            <td className="py-2 px-4 text-center text-brand-muted font-mono">{idx}</td>
                                            <td className="py-2 px-4 font-mono font-medium text-brand-primary uppercase">REF-{activeTab.substring(0, 4).toUpperCase()}-2025-00{idx}</td>
                                            <td className="py-2 px-4 text-slate-600">0{idx}/02/2025 10:3{idx} AM</td>
                                            <td className="py-2 px-4 font-semibold text-[#12284A] uppercase">{idx % 2 === 0 ? 'LOBO EUFREGINA DEBORAH' : 'GARJE BALAJI BABASAHEB'}</td>
                                            <td className="py-2 px-4 text-right font-bold text-slate-700">₹ {(idx * 8450).toLocaleString('en-IN')}</td>
                                            <td className="py-2 px-4 text-slate-600 text-xs">Automated transaction entry for {tabs.find(t => t.id === activeTab)?.label}</td>
                                            <td className="py-2 px-4 text-center">
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                    CONFIRMED
                                                </span>
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => showToast(`Record REF-00${idx} details opened`)}
                                                    className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-blue-100 hover:text-blue-800 rounded-[6px] transition-colors cursor-pointer border-none inline-flex items-center justify-center"
                                                    title="View Record Details"
                                                >
                                                    <Eye size={16} strokeWidth={2} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Standard Pagination Controls */}
                        <div className="p-4 bg-white border-t border-brand-border flex items-center justify-between text-xs text-brand-muted">
                            <span>Showing 5 of 5 records</span>
                            <div className="flex items-center gap-1">
                                <button className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md opacity-50 cursor-not-allowed">&lt;</button>
                                <button className="w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md bg-brand-primary text-white">1</button>
                                <button className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md opacity-50 cursor-not-allowed">&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW MODAL: Cash Approval Request Details */}
            {selectedRequest && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
                    <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150">
                        <div className="px-6 py-4 bg-brand-navy text-white flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <FileText size={18} className="text-brand-primary" />
                                <h3 className="text-base font-bold">Policy Cashier Approval Details</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedRequest(null)}
                                className="text-slate-300 hover:text-white p-1 rounded-lg cursor-pointer transition-colors border-none bg-transparent"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <div>
                                    <span className="block text-xs text-slate-500">Policy Number</span>
                                    <span className="font-mono font-bold text-sm text-brand-navy">{selectedRequest.policyNo}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-500">Registration No.</span>
                                    <span className="font-mono font-bold text-sm text-slate-800">{selectedRequest.regNo}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-500">Date</span>
                                    <span className="font-medium text-sm text-slate-800">{selectedRequest.date}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-500">Gross Premium</span>
                                    <span className="font-bold text-base text-emerald-600">₹ {selectedRequest.amount.toLocaleString('en-IN')}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-500">Agent Commission</span>
                                    <span className="font-bold text-base text-brand-primary">₹ {selectedRequest.agentCommAmt.toLocaleString('en-IN')}</span>
                                </div>
                                <div>
                                    <span className="block text-xs text-slate-500">Payment Mode</span>
                                    <span className="font-semibold text-xs text-slate-800 uppercase">{selectedRequest.paymentMode}</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between py-1 border-b border-slate-100">
                                    <span className="text-slate-500">Customer Name:</span>
                                    <span className="font-semibold text-slate-800 uppercase">{selectedRequest.customerName}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-100">
                                    <span className="text-slate-500">Agent Name:</span>
                                    <span className="font-semibold text-slate-800 uppercase">{selectedRequest.agentName}</span>
                                </div>
                                <div className="flex justify-between py-1 border-b border-slate-100">
                                    <span className="text-slate-500">Executive In-Charge:</span>
                                    <span className="font-semibold text-slate-800 uppercase">{selectedRequest.empName}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-slate-500">Approval Status:</span>
                                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${selectedRequest.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                                        selectedRequest.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                                        }`}>
                                        {selectedRequest.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                                <button
                                    type="button"
                                    onClick={() => handleRejectRequest(selectedRequest.id)}
                                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer border border-red-200"
                                >
                                    Reject Request
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleApproveRequest(selectedRequest.id)}
                                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center gap-1.5"
                                >
                                    <Check size={14} />
                                    <span>Approve Payment</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountModule;
