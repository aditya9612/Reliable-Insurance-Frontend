import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import {
    Search, X, Download, Filter, Eye, CheckCircle2, ArrowLeft,
    Calendar, Plus, RefreshCw, FileText, Check, AlertCircle, Trash2,
    DollarSign, CreditCard, Clock, ChevronDown, RotateCcw
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
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED TO CASH APPROVAL';
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

    // Auto-navigate to Other's Outstanding page when insurance-outstanding is selected
    React.useEffect(() => {
        if (tab === 'insurance-outstanding') {
            navigate('/other/outstanding', { replace: true });
        }
    }, [tab, navigate]);

    const handleTabChange = (tabId: string) => {
        if (tabId === 'insurance-outstanding') {
            navigate('/other/outstanding');
            return;
        }
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

    // Paid Commission State (Matching ERP AgentCommisionPaymentReport.aspx)
    interface PaidCommissionItem {
        id: number;
        transDate: string;
        branchName: string;
        agentName: string;
        totalComm: number;
        advAmt: number;
        netAmount: number;
        narration: string;
        bankBranch: string;
        ifscCode: string;
        accountNo: string;
        status: string;
    }

    const [paidCommissions] = useState<PaidCommissionItem[]>([
        {
            id: 1,
            transDate: '01/10/2026',
            branchName: 'SOLAPUR',
            agentName: 'AJITKUMAR PRABHAKAR KATULE',
            totalComm: 2387.00,
            advAmt: 0.00,
            netAmount: 2387.00,
            narration: 'FEDERAL BANK - 3530 NEFT OK- PAID 14/10/2026- 14/10/2026',
            bankBranch: 'KARMALA',
            ifscCode: 'ICIC0003753',
            accountNo: '375301501029',
            status: 'PAID'
        },
        {
            id: 2,
            transDate: '01/10/2026',
            branchName: 'PUNE',
            agentName: 'AAYUSH UMESH TIJARE',
            totalComm: 1380.00,
            advAmt: 0.00,
            netAmount: 1380.00,
            narration: 'FEDERAL BANK - 3530 NEFT OK- PAID 06/10/2026- 06/10/2026',
            bankBranch: 'PIMPARICHINCHWAD',
            ifscCode: 'KKBK0000725',
            accountNo: '2914128825',
            status: 'PAID'
        },
        {
            id: 3,
            transDate: '01/10/2026',
            branchName: 'GOA',
            agentName: 'SIDDHARTH H GAD',
            totalComm: 18995.00,
            advAmt: 0.00,
            netAmount: 18995.00,
            narration: 'FEDERAL BANK - 3530 NEFT OK- PAID 10/10/2026- 10/10/2026',
            bankBranch: 'NORTH GOA',
            ifscCode: 'IDFB0041240',
            accountNo: '10176133729',
            status: 'PAID'
        },
        {
            id: 4,
            transDate: '02/10/2026',
            branchName: 'GOA',
            agentName: 'SIDDHARTH H GAD',
            totalComm: 19267.00,
            advAmt: 0.00,
            netAmount: 19267.00,
            narration: 'FEDERAL BANK - 3530 NEFT OK- PAID 10/10/2026- 10/10/2026',
            bankBranch: 'NORTH GOA',
            ifscCode: 'IDFB0041240',
            accountNo: '10176133729',
            status: 'PAID'
        },
        {
            id: 5,
            transDate: '02/10/2026',
            branchName: 'BEED',
            agentName: 'SANJAY PATIL',
            totalComm: 4306.00,
            advAmt: 0.00,
            netAmount: 4306.00,
            narration: 'FEDERAL BANK - 3530 NEFT OK- PAID 10/10/2026- 10/10/2026',
            bankBranch: 'BEED',
            ifscCode: 'HDFC0001784',
            accountNo: '50200080890424',
            status: 'PAID'
        },
        {
            id: 6,
            transDate: '03/10/2026',
            branchName: 'BARAMATI',
            agentName: 'SUNIL ARUN PANDHARE',
            totalComm: 7520.00,
            advAmt: 0.00,
            netAmount: 7520.00,
            narration: 'BOM BANK - 9081 NEFT OK- PAID 12/10/2026- 12/10/2026',
            bankBranch: 'BARAMATI',
            ifscCode: 'MAHB0000123',
            accountNo: '60124890123',
            status: 'PAID'
        },
        {
            id: 7,
            transDate: '04/10/2026',
            branchName: 'KOLHAPUR',
            agentName: 'PRAKASH KESHO DEOKAR',
            totalComm: 11450.00,
            advAmt: 0.00,
            netAmount: 11450.00,
            narration: 'HDFC BANK - 4452 NEFT OK- PAID 15/10/2026- 15/10/2026',
            bankBranch: 'KOLHAPUR CITY',
            ifscCode: 'HDFC0000180',
            accountNo: '50100234891102',
            status: 'PAID'
        },
        {
            id: 8,
            transDate: '05/10/2026',
            branchName: 'SATARA',
            agentName: 'SATARA STANDARD AGENT',
            totalComm: 9840.00,
            advAmt: 0.00,
            netAmount: 9840.00,
            narration: 'ICICI BANK - 1209 NEFT OK- PAID 15/10/2026- 15/10/2026',
            bankBranch: 'SATARA',
            ifscCode: 'ICIC0001045',
            accountNo: '104501509923',
            status: 'PAID'
        }
    ]);

    const [paidBranch, setPaidBranch] = useState('');
    const [paidFromDate, setPaidFromDate] = useState('01/10/2026');
    const [paidToDate, setPaidToDate] = useState('16/10/2026');
    const [paidSearchQuery, setPaidSearchQuery] = useState('');
    const [paidPage, setPaidPage] = useState(1);
    const [paidPerPage, setPaidPerPage] = useState(10);

    const filteredPaidCommissions = paidCommissions.filter(item => {
        if (paidBranch && item.branchName !== paidBranch) return false;
        if (!paidSearchQuery.trim()) return true;
        const q = paidSearchQuery.toLowerCase();
        return (
            item.agentName.toLowerCase().includes(q) ||
            item.branchName.toLowerCase().includes(q) ||
            item.accountNo.toLowerCase().includes(q) ||
            item.ifscCode.toLowerCase().includes(q) ||
            item.narration.toLowerCase().includes(q) ||
            item.bankBranch.toLowerCase().includes(q)
        );
    });

    const totalPaidCommCount = filteredPaidCommissions.length;
    const totalPaidCommAmount = filteredPaidCommissions.reduce((acc, curr) => acc + curr.netAmount, 0);
    const totalPaidPages = Math.ceil(filteredPaidCommissions.length / paidPerPage) || 1;
    const paginatedPaidCommissions = filteredPaidCommissions.slice(
        (paidPage - 1) * paidPerPage,
        paidPage * paidPerPage
    );

    // Commission Recalculate State (Matching all columns from ERP AgentCommissionRecalculation.aspx)
    interface CommissionRecalcItem {
        id: number;
        regNo: string;
        branch: string;
        agentName: string;
        productType: string;
        policyType: string;
        insuranceCompany: string;
        amount: number;
        paymentType: string;
        paymentDetails: string;
        premiumAmount: number;
        customerName: string;
        referenceType: string;
        odDiscount: number;
        tpPremium: number;
        odPremium: number;
        netPremium: number;
        policyNo: string;
        date: string;
        agentGridTp: number;
        agentCommAmtTp: number;
        tdsAmtTp: number;
        netCommTp: number;
        agentGridOd: number;
        agentCommAmtOd: number;
        tdsAmtOd: number;
        netCommOd: number;
        agentGridNet: number;
        agentCommAmtNet: number;
        tdsAmtNet: number;
        manufacturingYear: string;
        netCommNet: number;
        fuelType: string;
        brokerName: string;
    }

    const [recalcCommissions] = useState<CommissionRecalcItem[]>([
        {
            id: 1,
            regNo: 'MH02DG1914',
            branch: 'SANGLI',
            agentName: 'RUTURAJ PRAKASH JADHAV',
            productType: 'STP',
            policyType: 'PRIVATE CAR',
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 5017.00,
            customerName: 'SAGAR SANJAY PADIYAR',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 3416.00,
            odPremium: 0.00,
            netPremium: 4251.00,
            policyNo: '6206841079',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 54,
            agentCommAmtNet: 2296,
            tdsAmtNet: 46,
            manufacturingYear: '31/10/2013 00:00:00',
            netCommNet: 2250,
            fuelType: 'CNG',
            brokerName: 'IDEAL BROKERS - BROKING'
        },
        {
            id: 2,
            regNo: 'MH09GJ5408',
            branch: 'SANGLI',
            agentName: 'RUTURAJ PRAKASH JADHAV',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 3500 - 7000 GVW',
            insuranceCompany: 'LIBERTY GENERAL INSURANCE LIMITED',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 21862.00,
            customerName: 'DHANAJI MHAKU KATRAT',
            referenceType: 'AGENT',
            odDiscount: 80,
            tpPremium: 16049.00,
            odPremium: 3771.31,
            netPremium: 20295.00,
            policyNo: '201340040226790306000000',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 31,
            agentCommAmtNet: 6291,
            tdsAmtNet: 126,
            manufacturingYear: '31/07/2025 00:00:00',
            netCommNet: 6165,
            fuelType: 'DIESEL',
            brokerName: 'IDEAL BROKERS - BROKING'
        },
        {
            id: 3,
            regNo: 'MH37AD1447',
            branch: 'AKOLA',
            agentName: 'SHRIKRUSHNA SOPAN PATIL',
            productType: 'COMPREHENSIVE',
            policyType: 'MISC-D-TRACTOR',
            insuranceCompany: 'SBI GENERAL INSURANCE COMPANY LIMITED',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 9361.00,
            customerName: 'AKSHAY CHANDRASHEKHAR RATHOD',
            referenceType: 'AGENT',
            odDiscount: 75,
            tpPremium: 7267.00,
            odPremium: 616.00,
            netPremium: 7932.83,
            policyNo: 'POCMVMI0100555033',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 48,
            agentCommAmtNet: 3808,
            tdsAmtNet: 76,
            manufacturingYear: '11/12/2021 00:00:00',
            netCommNet: 3732,
            fuelType: 'DIESEL',
            brokerName: 'IDEAL BROKERS - BROKING'
        },
        {
            id: 4,
            regNo: 'MH30BD1515',
            branch: 'AKOLA',
            agentName: 'SHRIKRUSHNA SOPAN PATIL',
            productType: 'STP',
            policyType: 'GCV > 40001 - 45000 GVW',
            insuranceCompany: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 46572.00,
            customerName: 'OBEROI CONSTRUCTIONS',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 44242.00,
            odPremium: 0.00,
            netPremium: 44342.00,
            policyNo: 'AVO/2317/70265200',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 31,
            agentCommAmtNet: 13746,
            tdsAmtNet: 275,
            manufacturingYear: '23/10/2023 00:00:00',
            netCommNet: 13471,
            fuelType: 'DIESEL',
            brokerName: 'IDEAL BROKERS - BROKING'
        },
        {
            id: 5,
            regNo: 'MH17DC9113',
            branch: 'BARAMATI',
            agentName: 'SHEKHAR MARUTI ANBHULE',
            productType: 'SAOD',
            policyType: 'PRIVATE CAR',
            insuranceCompany: 'HDFC ERGO GENERAL INSURANCE CO. LTD',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 20753.00,
            customerName: 'DATTATRYA MARUTI VIDHATE',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 0.00,
            odPremium: 17587.00,
            netPremium: 17587.00,
            policyNo: '2302209092387700000',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 10,
            agentCommAmtOd: 1759,
            tdsAmtOd: 35,
            netCommOd: 1724,
            agentGridNet: 0,
            agentCommAmtNet: 0,
            tdsAmtNet: 0,
            manufacturingYear: '01/10/2024 00:00:00',
            netCommNet: 0,
            fuelType: 'DIESEL',
            brokerName: 'IDEAL BROKERS - BROKING'
        },
        {
            id: 6,
            regNo: 'MH14LX4025',
            branch: 'SANGLI',
            agentName: 'RUTURAJ PRAKASH JADHAV',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV ABOVE 40001 GVW',
            insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 62484.00,
            customerName: 'SHAKIR ALI KHAN',
            referenceType: 'AGENT',
            odDiscount: 84,
            tpPremium: 44242.00,
            odPremium: 13035.00,
            netPremium: 57827.00,
            policyNo: 'P0027200038/4103/101919',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 21,
            agentCommAmtNet: 12144,
            tdsAmtNet: 243,
            manufacturingYear: '12/11/2024 00:00:00',
            netCommNet: 11901,
            fuelType: 'DIESEL',
            brokerName: 'IDEAL BROKERS - BROKING'
        },
        {
            id: 7,
            regNo: 'MH12RQ8821',
            branch: 'PUNE',
            agentName: 'AAYUSH UMESH TIJARE',
            productType: 'COMPREHENSIVE',
            policyType: 'PRIVATE CAR',
            insuranceCompany: 'ICICI LOMBARD GENERAL INSURANCE CO. LTD',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 18450.00,
            customerName: 'BALIRAM TANHAJI DHORE',
            referenceType: 'AGENT',
            odDiscount: 70,
            tpPremium: 7267.00,
            odPremium: 686.00,
            netPremium: 8328.07,
            policyNo: 'POCMVMI0100554960',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 48,
            agentCommAmtNet: 3997,
            tdsAmtNet: 80,
            manufacturingYear: '02/03/2021 00:00:00',
            netCommNet: 3917,
            fuelType: 'DIESEL',
            brokerName: 'IDEAL BROKERS - BROKING'
        },
        {
            id: 8,
            regNo: 'MH11BV3309',
            branch: 'SATARA',
            agentName: 'SATARA STANDARD AGENT',
            productType: 'STP',
            policyType: 'TWO WHEELER',
            insuranceCompany: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 3290.00,
            customerName: 'SHAIKH TAYYAB SHAIKH MUNIR',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 35313.00,
            odPremium: 2418.00,
            netPremium: 38196.00,
            policyNo: '215007/31/27/001267',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 23,
            agentCommAmtNet: 8785,
            tdsAmtNet: 176,
            manufacturingYear: '17/11/2018 00:00:00',
            netCommNet: 8609,
            fuelType: 'DIESEL',
            brokerName: 'IDEAL BROKERS - BROKING'
        },
        {
            id: 9,
            regNo: 'MH14CL9901',
            branch: 'PUNE',
            agentName: 'AJITKUMAR PRABHAKAR KATULE',
            productType: 'COMPREHENSIVE',
            policyType: 'PASSENGER VEHICLE',
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
            amount: 0.00,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 54013.00,
            customerName: 'ADISHIV MERCANTILE LLP',
            referenceType: 'AGENT',
            odDiscount: 85,
            tpPremium: 35313.00,
            odPremium: 10480.00,
            netPremium: 54013.00,
            policyNo: 'VGC1648727000100',
            date: '16/10/2026',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 23.5,
            agentCommAmtNet: 12693,
            tdsAmtNet: 254,
            manufacturingYear: '15/10/2026 00:00:00',
            netCommNet: 12439,
            fuelType: 'DIESEL',
            brokerName: 'IDEAL BROKERS - BROKING'
        }
    ]);

    // Recalculate Filter State
    const [recalcFromDate, setRecalcFromDate] = useState('16/10/2026');
    const [recalcToDate, setRecalcToDate] = useState('16/10/2026');
    const [recalcCompany, setRecalcCompany] = useState('');
    const [recalcBranch, setRecalcBranch] = useState('');
    const [recalcAgent, setRecalcAgent] = useState('');
    const [recalcPolicyType, setRecalcPolicyType] = useState('');
    const [recalcSearchQuery, setRecalcSearchQuery] = useState('');
    const [selectedRecalcIds, setSelectedRecalcIds] = useState<number[]>([]);
    const [hasRecalcViewed, setHasRecalcViewed] = useState(false);
    const [recalcPage, setRecalcPage] = useState(1);
    const [recalcPerPage, setRecalcPerPage] = useState(10);

    const isRecalcFormFilled = Boolean(recalcCompany && recalcBranch && recalcAgent && recalcPolicyType);

    const filteredRecalcCommissions = (!hasRecalcViewed || !isRecalcFormFilled) ? [] : recalcCommissions.filter(item => {
        if (recalcCompany && item.insuranceCompany !== recalcCompany) return false;
        if (recalcBranch && item.branch !== recalcBranch) return false;
        if (recalcAgent && item.agentName !== recalcAgent) return false;
        if (recalcPolicyType && item.policyType !== recalcPolicyType) return false;
        if (!recalcSearchQuery.trim()) return true;
        const q = recalcSearchQuery.toLowerCase();
        return (
            item.regNo.toLowerCase().includes(q) ||
            item.agentName.toLowerCase().includes(q) ||
            item.branch.toLowerCase().includes(q) ||
            item.insuranceCompany.toLowerCase().includes(q) ||
            item.policyType.toLowerCase().includes(q) ||
            item.customerName.toLowerCase().includes(q) ||
            item.policyNo.toLowerCase().includes(q) ||
            item.brokerName.toLowerCase().includes(q) ||
            item.fuelType.toLowerCase().includes(q)
        );
    });

    const totalRecalcCount = filteredRecalcCommissions.length;
    const totalRecalcPremium = filteredRecalcCommissions.reduce((acc, curr) => acc + curr.premiumAmount, 0);
    const totalRecalcPages = Math.ceil(filteredRecalcCommissions.length / recalcPerPage) || 1;
    const paginatedRecalcCommissions = filteredRecalcCommissions.slice(
        (recalcPage - 1) * recalcPerPage,
        recalcPage * recalcPerPage
    );

    const handleToggleSelectAllRecalc = () => {
        const paginatedIds = paginatedRecalcCommissions.map(i => i.id);
        const allSelected = paginatedIds.length > 0 && paginatedIds.every(id => selectedRecalcIds.includes(id));
        if (allSelected) {
            setSelectedRecalcIds(prev => prev.filter(id => !paginatedIds.includes(id)));
        } else {
            setSelectedRecalcIds(prev => Array.from(new Set([...prev, ...paginatedIds])));
        }
    };

    const handleToggleRecalc = (id: number) => {
        setSelectedRecalcIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handleRecalcView = () => {
        if (!isRecalcFormFilled) {
            showToast('Please select all form fields (Company, Branch, Agent, Policy Type) before viewing.');
            setHasRecalcViewed(false);
            return;
        }
        setHasRecalcViewed(true);
        setRecalcPage(1);
        showToast('Commission recalculate records loaded!');
    };

    const handleRecalcReset = () => {
        setRecalcCompany('');
        setRecalcBranch('');
        setRecalcAgent('');
        setRecalcPolicyType('');
        setRecalcSearchQuery('');
        setSelectedRecalcIds([]);
        setHasRecalcViewed(false);
        setRecalcPage(1);
    };

    const handleSubmitRecalculate = () => {
        if (selectedRecalcIds.length === 0) {
            showToast('Please select at least one record to submit for recalculation.');
            return;
        }
        showToast(`${selectedRecalcIds.length} commission entries submitted for recalculation successfully!`);
        setSelectedRecalcIds([]);
    };

    // Paid Entry Recalculation State (Matching ERP Adm_CutNPayRecalculation.aspx)
    const [paidRecalcFromDate, setPaidRecalcFromDate] = useState('01/12/2024');
    const [paidRecalcToDate, setPaidRecalcToDate] = useState('16/10/2026');
    const [paidRecalcCompany, setPaidRecalcCompany] = useState('');
    const [paidRecalcBranch, setPaidRecalcBranch] = useState('');
    const [paidRecalcAgent, setPaidRecalcAgent] = useState('');
    const [paidRecalcPolicyType, setPaidRecalcPolicyType] = useState('');
    const [paidRecalcSearchQuery, setPaidRecalcSearchQuery] = useState('');
    const [selectedPaidRecalcIds, setSelectedPaidRecalcIds] = useState<number[]>([]);
    const [hasPaidRecalcViewed, setHasPaidRecalcViewed] = useState(false);
    const [paidRecalcPage, setPaidRecalcPage] = useState(1);
    const [paidRecalcPerPage, setPaidRecalcPerPage] = useState(10);

    const isPaidRecalcFormFilled = Boolean(
        paidRecalcFromDate.trim() &&
        paidRecalcToDate.trim() &&
        paidRecalcCompany.trim() &&
        paidRecalcBranch.trim() &&
        paidRecalcAgent.trim() &&
        paidRecalcPolicyType.trim()
    );

    const [paidRecalcRecords] = useState<CommissionRecalcItem[]>([
        {
            id: 1,
            regNo: 'MH12PT2922',
            branch: 'PUNE',
            agentName: 'PARMESHWAR VENKATRAO BIRADAR',
            productType: 'STP',
            policyType: 'PRIVATE CAR',
            insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
            amount: 0,
            paymentType: 'ONLINE TO RELIABLE',
            paymentDetails: 'NA',
            premiumAmount: 5031,
            customerName: 'ROSHANA SANTOSH CHINCHAWADE',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 3416,
            odPremium: 0,
            netPremium: 4266,
            policyNo: 'P0025200039/4190/100256',
            date: '02/12/2024',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 39,
            agentCommAmtNet: 1664,
            tdsAmtNet: 0,
            manufacturingYear: '10/11/2017 00:00:00',
            netCommNet: 1664,
            fuelType: 'DIESEL',
            brokerName: 'RELIABLE - ASSOCIATES'
        },
        {
            id: 2,
            regNo: 'MH14AH6422',
            branch: 'PUNE',
            agentName: 'PARMESHWAR VENKATRAO BIRADAR',
            productType: 'STP',
            policyType: 'GCV 7501 - 12000 GVW',
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
            amount: 0,
            paymentType: 'ONLINE TO RELIABLE',
            paymentDetails: 'FEDERAL BANK - 003787',
            premiumAmount: 31009,
            customerName: 'SANDEEP MARUTI JAGTAP',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 27186,
            odPremium: 0,
            netPremium: 27881,
            policyNo: '6302458756',
            date: '11/12/2024',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 41,
            agentCommAmtNet: 11341,
            tdsAmtNet: 0,
            manufacturingYear: '15/12/2023 00:00:00',
            netCommNet: 11341,
            fuelType: 'DIESEL',
            brokerName: 'RELIABLE - ASSOCIATES'
        },
        {
            id: 3,
            regNo: 'MH14HU5192',
            branch: 'PUNE',
            agentName: 'PARMESHWAR VENKATRAO BIRADAR',
            productType: 'COMPREHENSIVE',
            policyType: 'PCV - TAXI 4 + 1',
            insuranceCompany: 'INDUSIND GENERAL INSURANCE CO. LTD',
            amount: 0,
            paymentType: 'ONLINE TO RELIABLE',
            paymentDetails: 'NA',
            premiumAmount: 18599,
            customerName: 'SAIRAJ TOURS AND TRAVELS TRANSFER',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 11852,
            odPremium: 3800,
            netPremium: 15762,
            policyNo: '170422423380026504',
            date: '13/12/2024',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 22,
            agentCommAmtNet: 3468,
            tdsAmtNet: 0,
            manufacturingYear: '04/03/2020 00:00:00',
            netCommNet: 3468,
            fuelType: 'PETROL',
            brokerName: 'EFFICIENT - BROKER'
        },
        {
            id: 4,
            regNo: 'MH12PQ9009',
            branch: 'PUNE',
            agentName: 'PARMESHWAR VENKATRAO BIRADAR',
            productType: 'COMPREHENSIVE',
            policyType: 'EMPLOYEE BUS ABOVE 12 SEATERS',
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
            amount: 0,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 55125,
            customerName: 'BALAJI RATNA MULTISERVICES PVT LTD',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 45915,
            odPremium: 751,
            netPremium: 46716,
            policyNo: '6302477292',
            date: '16/12/2024',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 54,
            agentCommAmtNet: 25227,
            tdsAmtNet: 252,
            manufacturingYear: '21/12/2017 00:00:00',
            netCommNet: 24975,
            fuelType: 'DIESEL',
            brokerName: 'RELIABLE - ASSOCIATES'
        },
        {
            id: 5,
            regNo: 'MH12WJ1091',
            branch: 'PUNE',
            agentName: 'PARMESHWAR VENKATRAO BIRADAR',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 12001 - 20000 GVW',
            insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
            amount: 0,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 47775,
            customerName: 'SANJAY JADHAV',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 35313,
            odPremium: 6820,
            netPremium: 42283,
            policyNo: 'P0025200039/4103/102173',
            date: '26/12/2024',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 24,
            agentCommAmtNet: 10148,
            tdsAmtNet: 101,
            manufacturingYear: '31/01/2024 00:00:00',
            netCommNet: 10047,
            fuelType: 'DIESEL',
            brokerName: 'RELIABLE - ASSOCIATES'
        },
        {
            id: 6,
            regNo: 'MH12WJ1092',
            branch: 'PUNE',
            agentName: 'PARMESHWAR VENKATRAO BIRADAR',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 12001 - 20000 GVW',
            insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
            amount: 0,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 47775,
            customerName: 'SANJAY JADHAV',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 35313,
            odPremium: 6820,
            netPremium: 42283,
            policyNo: 'P0025200039/4103/102171',
            date: '26/12/2024',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 24,
            agentCommAmtNet: 10148,
            tdsAmtNet: 101,
            manufacturingYear: '31/01/2024 00:00:00',
            netCommNet: 10047,
            fuelType: 'DIESEL',
            brokerName: 'RELIABLE - ASSOCIATES'
        },
        {
            id: 7,
            regNo: 'MH12WJ1093',
            branch: 'PUNE',
            agentName: 'PARMESHWAR VENKATRAO BIRADAR',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 12001 - 20000 GVW',
            insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
            amount: 0,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            paymentDetails: 'NA',
            premiumAmount: 47775,
            customerName: 'SANJAY JADHAV',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 35313,
            odPremium: 6820,
            netPremium: 42283,
            policyNo: 'P0025200039/4103/102174',
            date: '28/12/2024',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 24,
            agentCommAmtNet: 10148,
            tdsAmtNet: 101,
            manufacturingYear: '31/01/2024 00:00:00',
            netCommNet: 10047,
            fuelType: 'DIESEL',
            brokerName: 'RELIABLE - ASSOCIATES'
        },
        {
            id: 8,
            regNo: 'MH12RN8801',
            branch: 'PUNE',
            agentName: 'PARMESHWAR VENKATRAO BIRADAR',
            productType: 'STP',
            policyType: 'GCV 0-2300 GVW',
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LTD',
            amount: 0,
            paymentType: 'ONLINE TO RELIABLE',
            paymentDetails: 'NA',
            premiumAmount: 18450,
            customerName: 'PRAVIN ANAND SHINDE',
            referenceType: 'AGENT',
            odDiscount: 0,
            tpPremium: 14200,
            odPremium: 0,
            netPremium: 15600,
            policyNo: 'RSG20240091823',
            date: '05/12/2024',
            agentGridTp: 0,
            agentCommAmtTp: 0,
            tdsAmtTp: 0,
            netCommTp: 0,
            agentGridOd: 0,
            agentCommAmtOd: 0,
            tdsAmtOd: 0,
            netCommOd: 0,
            agentGridNet: 35,
            agentCommAmtNet: 5460,
            tdsAmtNet: 55,
            manufacturingYear: '18/05/2021 00:00:00',
            netCommNet: 5405,
            fuelType: 'DIESEL',
            brokerName: 'RELIABLE - ASSOCIATES'
        }
    ]);

    const filteredPaidRecalcRecords = (!hasPaidRecalcViewed || !isPaidRecalcFormFilled) ? [] : paidRecalcRecords.filter(item => {
        if (paidRecalcCompany && !item.insuranceCompany.toLowerCase().includes(paidRecalcCompany.toLowerCase().trim())) return false;
        if (paidRecalcBranch && item.branch !== paidRecalcBranch) return false;
        if (paidRecalcAgent && item.agentName !== paidRecalcAgent) return false;
        if (paidRecalcPolicyType && item.policyType !== paidRecalcPolicyType) return false;
        if (!paidRecalcSearchQuery.trim()) return true;
        const q = paidRecalcSearchQuery.toLowerCase();
        return (
            item.regNo.toLowerCase().includes(q) ||
            item.agentName.toLowerCase().includes(q) ||
            item.branch.toLowerCase().includes(q) ||
            item.insuranceCompany.toLowerCase().includes(q) ||
            item.policyType.toLowerCase().includes(q) ||
            item.customerName.toLowerCase().includes(q) ||
            item.policyNo.toLowerCase().includes(q) ||
            item.brokerName.toLowerCase().includes(q) ||
            item.fuelType.toLowerCase().includes(q)
        );
    });

    const totalPaidRecalcPages = Math.ceil(filteredPaidRecalcRecords.length / paidRecalcPerPage) || 1;
    const paginatedPaidRecalcRecords = filteredPaidRecalcRecords.slice(
        (paidRecalcPage - 1) * paidRecalcPerPage,
        paidRecalcPage * paidRecalcPerPage
    );

    const handleToggleSelectAllPaidRecalc = () => {
        const paginatedIds = paginatedPaidRecalcRecords.map(i => i.id);
        const allSelected = paginatedIds.length > 0 && paginatedIds.every(id => selectedPaidRecalcIds.includes(id));
        if (allSelected) {
            setSelectedPaidRecalcIds(prev => prev.filter(id => !paginatedIds.includes(id)));
        } else {
            setSelectedPaidRecalcIds(prev => Array.from(new Set([...prev, ...paginatedIds])));
        }
    };

    const handleTogglePaidRecalc = (id: number) => {
        setSelectedPaidRecalcIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const handlePaidRecalcView = () => {
        if (!isPaidRecalcFormFilled) {
            showToast('Please fill all form fields before viewing records.');
            setHasPaidRecalcViewed(false);
            return;
        }
        setHasPaidRecalcViewed(true);
        setPaidRecalcPage(1);
        showToast('Paid entry recalculation records loaded!');
    };

    const handlePaidRecalcReset = () => {
        setPaidRecalcCompany('');
        setPaidRecalcBranch('');
        setPaidRecalcAgent('');
        setPaidRecalcPolicyType('');
        setPaidRecalcSearchQuery('');
        setSelectedPaidRecalcIds([]);
        setHasPaidRecalcViewed(false);
        setPaidRecalcPage(1);
    };

    const handleSubmitPaidRecalc = () => {
        if (selectedPaidRecalcIds.length === 0) {
            showToast('Please select at least one record to submit for recalculation.');
            return;
        }
        showToast(`${selectedPaidRecalcIds.length} paid entries submitted for recalculation successfully!`);
        setSelectedPaidRecalcIds([]);
    };

    // Account Report State (Matching ERP reliable-erp.com/Clerk/Rpt_AccountDetails.aspx)
    interface AccountReportItem {
        id: number;
        docNo: string;
        transactionType: string;
        accountDate: string;
        ledgerName: string;
        amount: number;
        narration: string;
        agentName: string;
        branchName: string;
        policyNo: string;
        customerName: string;
        registrationNo: string;
        paymentType: string;
        narration2: string;
        ledgerType: string;
    }

    const [accountReports] = useState<AccountReportItem[]>([
        {
            id: 1,
            docNo: '100145546',
            transactionType: 'PAYMENT',
            accountDate: '01/01/2025',
            ledgerName: 'RELIANCE PREMIUM PAYABLE',
            amount: 19420.00,
            narration: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167-MS SHREEJA ENTERPRISES',
            agentName: 'BAPURAO BUJANG MOHITE',
            branchName: 'BARAMATI',
            policyNo: '132/00/00/0526/FCP/0000182276',
            customerName: 'MS SHREEJA ENTERPRISES',
            registrationNo: 'NON-MOTOR',
            paymentType: 'CHEQUE',
            narration2: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167',
            ledgerType: 'BALANCE SHEET ITEM'
        },
        {
            id: 2,
            docNo: '100145546',
            transactionType: 'PAYMENT',
            accountDate: '01/01/2025',
            ledgerName: 'RELIANCE PREMIUM PAYABLE',
            amount: 9077.00,
            narration: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167-MS SHREEJA ENTERPRISES',
            agentName: 'BAPURAO BUJANG MOHITE',
            branchName: 'BARAMATI',
            policyNo: '132/00/00/0526/FCP/0000182276',
            customerName: 'MS SHREEJA ENTERPRISES',
            registrationNo: 'NON-MOTOR',
            paymentType: 'CHEQUE',
            narration2: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167',
            ledgerType: 'BALANCE SHEET ITEM'
        },
        {
            id: 3,
            docNo: '100145546',
            transactionType: 'PAYMENT',
            accountDate: '01/01/2025',
            ledgerName: 'RELIANCE PREMIUM PAYABLE',
            amount: 9077.00,
            narration: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167-MS SHREEJA ENTERPRISES',
            agentName: 'BAPURAO BUJANG MOHITE',
            branchName: 'BARAMATI',
            policyNo: '132/00/00/0526/FCP/0000182276',
            customerName: 'MS SHREEJA ENTERPRISES',
            registrationNo: 'NON-MOTOR',
            paymentType: 'CHEQUE',
            narration2: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167',
            ledgerType: 'BALANCE SHEET ITEM'
        },
        {
            id: 4,
            docNo: '100145546',
            transactionType: 'PAYMENT',
            accountDate: '01/01/2025',
            ledgerName: 'RELIANCE PREMIUM PAYABLE',
            amount: 19275.00,
            narration: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167-MS SHREEJA ENTERPRISES',
            agentName: 'BAPURAO BUJANG MOHITE',
            branchName: 'BARAMATI',
            policyNo: '132/00/00/0526/FCP/0000182276',
            customerName: 'MS SHREEJA ENTERPRISES',
            registrationNo: 'NON-MOTOR',
            paymentType: 'CHEQUE',
            narration2: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167',
            ledgerType: 'BALANCE SHEET ITEM'
        },
        {
            id: 5,
            docNo: '100145546',
            transactionType: 'PAYMENT',
            accountDate: '01/01/2025',
            ledgerName: 'RELIANCE PREMIUM PAYABLE',
            amount: 4827.00,
            narration: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167-MS SHREEJA ENTERPRISES',
            agentName: 'BAPURAO BUJANG MOHITE',
            branchName: 'BARAMATI',
            policyNo: '132/00/00/0526/FCP/0000182276',
            customerName: 'MS SHREEJA ENTERPRISES',
            registrationNo: 'NON-MOTOR',
            paymentType: 'CHEQUE',
            narration2: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167',
            ledgerType: 'BALANCE SHEET ITEM'
        },
        {
            id: 6,
            docNo: '100145546',
            transactionType: 'PAYMENT',
            accountDate: '01/01/2025',
            ledgerName: 'RELIANCE PREMIUM PAYABLE',
            amount: 18476.00,
            narration: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167-MS SHREEJA ENTERPRISES',
            agentName: 'BAPURAO BUJANG MOHITE',
            branchName: 'BARAMATI',
            policyNo: '132/00/00/0526/FCP/0000182276',
            customerName: 'MS SHREEJA ENTERPRISES',
            registrationNo: 'NON-MOTOR',
            paymentType: 'CHEQUE',
            narration2: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167',
            ledgerType: 'BALANCE SHEET ITEM'
        },
        {
            id: 7,
            docNo: '100145546',
            transactionType: 'PAYMENT',
            accountDate: '01/01/2025',
            ledgerName: 'RELIANCE PREMIUM PAYABLE',
            amount: 19420.00,
            narration: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167-MS SHREEJA ENTERPRISES',
            agentName: 'BAPURAO BUJANG MOHITE',
            branchName: 'BARAMATI',
            policyNo: '132/00/00/0526/FCP/0000182276',
            customerName: 'MS SHREEJA ENTERPRISES',
            registrationNo: 'NON-MOTOR',
            paymentType: 'CHEQUE',
            narration2: 'PAY TO RELIANCE PREMIUM PAYABLEWITH CHEQUE NO-104167',
            ledgerType: 'BALANCE SHEET ITEM'
        },
        {
            id: 8,
            docNo: '100145550',
            transactionType: 'PAYMENT',
            accountDate: '02/01/2025',
            ledgerName: 'HDFC ERGO PREMIUM PAYABLE',
            amount: 32450.00,
            narration: 'PAY TO HDFC ERGO PREMIUM PAYABLE WITH NEFT REF-901234-ADITYA MOTORS',
            agentName: 'ASHWINI SHAILENDRA JOSHI',
            branchName: 'AKOLA',
            policyNo: '2311200145890000',
            customerName: 'ADITYA MOTORS PVT LTD',
            registrationNo: 'MH30AF8812',
            paymentType: 'NEFT',
            narration2: 'PAY TO HDFC ERGO PREMIUM PAYABLE WITH NEFT REF-901234',
            ledgerType: 'BALANCE SHEET ITEM'
        },
        {
            id: 9,
            docNo: '100145555',
            transactionType: 'RECEIPT',
            accountDate: '03/01/2025',
            ledgerName: 'COMMISSION RECEIVABLE',
            amount: 14800.00,
            narration: 'COMMISSION RECEIVED VIA RTGS FROM TATA AIG GENERAL INSURANCE',
            agentName: 'RUTURAJ PRAKASH JADHAV',
            branchName: 'SANGLI',
            policyNo: '6206841079',
            customerName: 'SAGAR SANJAY PADIYAR',
            registrationNo: 'MH02DG1914',
            paymentType: 'ONLINE',
            narration2: 'COMMISSION RECEIVED VIA RTGS FROM TATA AIG',
            ledgerType: 'PROFIT & LOSS ITEM'
        }
    ]);

    const [rptFromDate, setRptFromDate] = useState('01/01/2025');
    const [rptToDate, setRptToDate] = useState('01/10/2026');
    const [rptBranch, setRptBranch] = useState('');
    const [rptTxnType, setRptTxnType] = useState('');
    const [rptSearchQuery, setRptSearchQuery] = useState('');
    const [rptPage, setRptPage] = useState(1);
    const [rptPerPage, setRptPerPage] = useState(10);

    const filteredAccountReports = accountReports.filter(item => {
        if (rptBranch && item.branchName !== rptBranch) return false;
        if (rptTxnType && item.transactionType !== rptTxnType) return false;
        if (!rptSearchQuery.trim()) return true;
        const q = rptSearchQuery.toLowerCase();
        return (
            item.customerName.toLowerCase().includes(q) ||
            item.registrationNo.toLowerCase().includes(q) ||
            item.docNo.toLowerCase().includes(q) ||
            item.policyNo.toLowerCase().includes(q) ||
            item.agentName.toLowerCase().includes(q) ||
            item.ledgerName.toLowerCase().includes(q)
        );
    });

    const totalRptCount = filteredAccountReports.length;
    const totalRptAmount = filteredAccountReports.reduce((acc, curr) => acc + curr.amount, 0);
    const totalRptPages = Math.ceil(filteredAccountReports.length / rptPerPage) || 1;
    const paginatedAccountReports = filteredAccountReports.slice(
        (rptPage - 1) * rptPerPage,
        rptPage * rptPerPage
    );

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

    // --- State for Tab: Return to Cash Approval (reliable-erp.com/Clerk/adm_returnToCashApproval.aspx) ---
    const [returnCashRegNo, setReturnCashRegNo] = useState('');
    const [hasReturnCashSearched, setHasReturnCashSearched] = useState(false);
    const [returnCashRecords, setReturnCashRecords] = useState<PolicyRequestItem[]>([
        {
            id: 201,
            date: '14/10/2026',
            customerName: 'SANTOSH PATIL',
            policyNo: 'POL-782137',
            regNo: '1237',
            paymentMode: 'CASH',
            agentCommAmt: 2450,
            amount: 18500,
            agentName: 'AMOL DESHMUKH',
            empName: 'RUTUJA NITIN MANE',
            referenceType: 'AGENT',
            status: 'APPROVED'
        },
        {
            id: 202,
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
            status: 'APPROVED'
        },
        {
            id: 203,
            date: '10/05/2026',
            customerName: 'ARVIND VILAS SHIRSATH',
            policyNo: 'POL-441209',
            regNo: 'MH42K3635',
            paymentMode: 'CASH',
            agentCommAmt: 2057,
            amount: 9700,
            agentName: 'ENTERPRISES VIGHNAHARTA',
            empName: 'RUTUJA NITIN MANE',
            referenceType: 'AGENT',
            status: 'APPROVED'
        }
    ]);

    const handleReturnCashView = () => {
        if (!returnCashRegNo.trim()) {
            showToast('Please enter Registration No to search.');
            return;
        }
        setHasReturnCashSearched(true);
        const matched = returnCashRecords.filter(r =>
            r.regNo.toLowerCase().includes(returnCashRegNo.trim().toLowerCase())
        );
        if (matched.length > 0) {
            showToast(`Found ${matched.length} record(s) for Registration No: ${returnCashRegNo.trim()}`);
        } else {
            showToast(`No records found for Registration No: ${returnCashRegNo.trim()}`);
        }
    };

    const handleReturnToCashApproval = (id: number, regNo: string) => {
        setReturnCashRecords(prev => prev.map(r => r.id === id ? { ...r, status: 'RETURNED TO CASH APPROVAL' } : r));
        showToast(`Registration No ${regNo} successfully returned to Cash Approval!`);
    };

    const filteredReturnCashRecords = !hasReturnCashSearched
        ? []
        : returnCashRecords.filter(r =>
            r.regNo.toLowerCase().includes(returnCashRegNo.trim().toLowerCase())
        );

    // --- State for Tab: Cash Back Approval (reliable-erp.com/Clerk/CashBackAmtApproval.aspx) ---
    interface CashBackApprovalItem {
        id: number;
        transDate: string;
        cashbackDate: string;
        registrationNo: string;
        customerName: string;
        salesExecutive: string;
        policyNo: string;
        insuranceCompany: string;
        productType: string;
        policyType: string;
        netPremium: number;
        paymentType: string;
        cashbackAmt: number;
        status: 'PENDING' | 'APPROVED';
    }

    const [cashbackSearchQuery, setCashbackSearchQuery] = useState('');
    const [cashbackPage, setCashbackPage] = useState(1);
    const [cashbackPerPage, setCashbackPerPage] = useState(10);

    const [cashbackRecords, setCashbackRecords] = useState<CashBackApprovalItem[]>([
        {
            id: 1,
            transDate: '09/06/2026',
            cashbackDate: '-',
            registrationNo: 'MH45MV4134',
            customerName: 'M/S.MAULI CONSTRUCTION',
            salesExecutive: 'AVINASH BHARAT KORATKAR',
            policyNo: 'VGC1559297000100',
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 20001 - 40000 GVW',
            netPremium: 59354,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            cashbackAmt: 13500,
            status: 'PENDING'
        },
        {
            id: 2,
            transDate: '09/06/2026',
            cashbackDate: '-',
            registrationNo: 'MH45MV8112',
            customerName: 'M/S.MAULI CONSTRUCTION',
            salesExecutive: 'AVINASH BHARAT KORATKAR',
            policyNo: 'VGC1559294000100',
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 20001 - 40000 GVW',
            netPremium: 59354,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            cashbackAmt: 13500,
            status: 'PENDING'
        },
        {
            id: 3,
            transDate: '09/06/2026',
            cashbackDate: '-',
            registrationNo: 'MH45MV8109',
            customerName: 'M/S.MAULI CONSTRUCTION',
            salesExecutive: 'AVINASH BHARAT KORATKAR',
            policyNo: 'VGC1559289000100',
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 20001 - 40000 GVW',
            netPremium: 59354,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            cashbackAmt: 13500,
            status: 'PENDING'
        },
        {
            id: 4,
            transDate: '09/06/2026',
            cashbackDate: '-',
            registrationNo: 'MH45MV8436',
            customerName: 'M/S.MAULI CONSTRUCTION',
            salesExecutive: 'AVINASH BHARAT KORATKAR',
            policyNo: 'VGC1559250000100',
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 20001 - 40000 GVW',
            netPremium: 59354,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            cashbackAmt: 13500,
            status: 'PENDING'
        },
        {
            id: 5,
            transDate: '09/06/2026',
            cashbackDate: '-',
            registrationNo: 'MH45MV4175',
            customerName: 'M/S.MAULI CONSTRUCTION',
            salesExecutive: 'AVINASH BHARAT KORATKAR',
            policyNo: 'VGC1559251000100',
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 20001 - 40000 GVW',
            netPremium: 59354,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            cashbackAmt: 13500,
            status: 'PENDING'
        },
        {
            id: 6,
            transDate: '09/06/2026',
            cashbackDate: '-',
            registrationNo: 'MH45MV8442',
            customerName: 'MAULI CONSTRUCTION',
            salesExecutive: 'AVINASH BHARAT KORATKAR',
            policyNo: 'VGC1559258000100',
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 20001 - 40000 GVW',
            netPremium: 59354,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            cashbackAmt: 13500,
            status: 'PENDING'
        },
        {
            id: 7,
            transDate: '09/06/2026',
            cashbackDate: '-',
            registrationNo: 'MH45MV4054',
            customerName: 'MAULI CONSTRUCTION',
            salesExecutive: 'AVINASH BHARAT KORATKAR',
            policyNo: 'VGC1559263000100',
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
            productType: 'COMPREHENSIVE',
            policyType: 'GCV 20001 - 40000 GVW',
            netPremium: 59354,
            paymentType: 'ONLINE TO INSURANCE COMPANY',
            cashbackAmt: 13500,
            status: 'PENDING'
        }
    ]);

    const filteredCashbackRecords = cashbackRecords.filter(item => {
        if (!cashbackSearchQuery.trim()) return true;
        const q = cashbackSearchQuery.toLowerCase().trim();
        return (
            item.registrationNo.toLowerCase().includes(q) ||
            item.customerName.toLowerCase().includes(q) ||
            item.salesExecutive.toLowerCase().includes(q) ||
            item.policyNo.toLowerCase().includes(q) ||
            item.insuranceCompany.toLowerCase().includes(q)
        );
    });

    const totalCashbackCount = filteredCashbackRecords.length;
    const totalCashbackAmount = filteredCashbackRecords.reduce((acc, curr) => acc + curr.cashbackAmt, 0);
    const totalCashbackPages = Math.ceil(filteredCashbackRecords.length / cashbackPerPage) || 1;
    const paginatedCashbackRecords = filteredCashbackRecords.slice(
        (cashbackPage - 1) * cashbackPerPage,
        cashbackPage * cashbackPerPage
    );

    const handleApproveCashback = (id: number, regNo: string) => {
        setCashbackRecords(prev => prev.map(c => c.id === id ? { ...c, status: 'APPROVED', cashbackDate: '16/10/2026' } : c));
        showToast(`Cash back for ${regNo} approved successfully!`);
    };

    const handleExportCashback = () => {
        const headers = ['TRANSDATE', 'CASHBACKDATE', 'REGISTRATIONNO', 'CUSTOMER NAME', 'SALES EXECUTIVE', 'POLICYNO', 'INSURANCECOMPANY', 'PRODUCTTYPE', 'POLICYTYPE', 'NETPERMIUM', 'PAYMENTTYPE', 'CASHBACKAMT', 'STATUS'];
        const rows = filteredCashbackRecords.map(i => [
            i.transDate,
            i.cashbackDate,
            i.registrationNo,
            i.customerName,
            i.salesExecutive,
            i.policyNo,
            i.insuranceCompany,
            i.productType,
            i.policyType,
            i.netPremium,
            i.paymentType,
            i.cashbackAmt,
            i.status
        ]);
        exportTableToCsv('CashBack_Approval_Report', headers, rows);
    };

    /* =========================================================================
       13. CHEQUE RECON (reliable-erp.com/Clerk/rptchequeDepositeStatusforbank.aspx)
       ========================================================================= */
    interface ChequeReconItem {
        id: number;
        reconType: 'RA' | 'CUSTOMER';
        companyName: string;
        branchName: string;
        policyType: string;
        policyNo: string;
        transDate: string;
        customerName: string;
        registrationNo: string;
        agentName: string;
        employeeName: string;
        proposalAmt: number;
        paymentType: string;
        chequeNo: string;
        remark: string;
        createUser: string;
        createDate: string;
        referenceType: 'AGENT' | 'DIRECT';
        status: 'PENDING' | 'DEPOSITED';
    }

    const [chequeReconType, setChequeReconType] = useState<'RA' | 'CUSTOMER'>('CUSTOMER');
    const [chequeReconFromDate, setChequeReconFromDate] = useState('16/10/2026');
    const [hasChequeReconSubmitted, setHasChequeReconSubmitted] = useState(false);
    const [chequeReconSearchQuery, setChequeReconSearchQuery] = useState('');
    const [selectedChequeReconIds, setSelectedChequeReconIds] = useState<number[]>([]);
    const [chequeReconPage, setChequeReconPage] = useState(1);
    const [chequeReconPerPage, setChequeReconPerPage] = useState(10);

    const [chequeReconRecords, setChequeReconRecords] = useState<ChequeReconItem[]>([
        {
            id: 1,
            reconType: 'CUSTOMER',
            companyName: 'TATA AIG GENERAL INSURANCE CO. LTD',
            branchName: 'KEY CHANNEL',
            policyType: 'PRIVATE CAR',
            policyNo: '6208019845',
            transDate: '12/10/2026',
            customerName: 'GOPAL PRAKASH RAUT',
            registrationNo: 'MH28BW2137',
            agentName: 'SHIVANI PRADIP BHUYAR',
            employeeName: 'MANGESH RAVINDRA KAMBLE',
            proposalAmt: 39525.00,
            paymentType: 'CHEQUE',
            chequeNo: '014010',
            remark: 'SANIYA GADADE',
            createUser: 'SNEHAL JADHAV',
            createDate: '13/10/2026 11:15:51',
            referenceType: 'AGENT',
            status: 'PENDING'
        },
        {
            id: 2,
            reconType: 'CUSTOMER',
            companyName: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
            branchName: 'BARAMATI',
            policyType: 'GCV ABOVE 45001 GVW',
            policyNo: 'AVO/2315/20258292',
            transDate: '10/10/2026',
            customerName: 'VISHNUKUMAR LOGISTIC',
            registrationNo: 'NL01AJ3646',
            agentName: '-',
            employeeName: 'ARVIND DNYANESHWAR GAWADE',
            proposalAmt: 59339.00,
            paymentType: 'CHEQUE',
            chequeNo: '134665',
            remark: 'SANTOSH BANSODE',
            createUser: 'SNEHAL JADHAV',
            createDate: '12/10/2026 12:59:42',
            referenceType: 'DIRECT',
            status: 'PENDING'
        },
        {
            id: 3,
            reconType: 'CUSTOMER',
            companyName: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
            branchName: 'BARAMATI',
            policyType: 'GCV ABOVE 45001 GVW',
            policyNo: 'AVO/2315/20258288',
            transDate: '10/10/2026',
            customerName: 'VISHNUKUMAR LOGISTIC',
            registrationNo: 'NL01AJ3647',
            agentName: '-',
            employeeName: 'ARVIND DNYANESHWAR GAWADE',
            proposalAmt: 59339.00,
            paymentType: 'CHEQUE',
            chequeNo: '134665',
            remark: 'SANTOSH BANSODE',
            createUser: 'SNEHAL JADHAV',
            createDate: '12/10/2026 12:55:15',
            referenceType: 'DIRECT',
            status: 'PENDING'
        },
        {
            id: 4,
            reconType: 'CUSTOMER',
            companyName: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
            branchName: 'BARAMATI',
            policyType: 'GCV ABOVE 45001 GVW',
            policyNo: 'AVO/2315/20257097',
            transDate: '10/10/2026',
            customerName: 'VISHNUKUMAR LOGISTIC',
            registrationNo: 'NL01AJ3650',
            agentName: '-',
            employeeName: 'ARVIND DNYANESHWAR GAWADE',
            proposalAmt: 58328.00,
            paymentType: 'CHEQUE',
            chequeNo: '134664',
            remark: 'SANTOSH BANSODE',
            createUser: 'SNEHAL JADHAV',
            createDate: '12/10/2026 12:40:19',
            referenceType: 'DIRECT',
            status: 'PENDING'
        },
        {
            id: 5,
            reconType: 'CUSTOMER',
            companyName: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
            branchName: 'BARAMATI',
            policyType: 'GCV ABOVE 45001 GVW',
            policyNo: 'AVO/2315/20257091',
            transDate: '10/10/2026',
            customerName: 'VISHNUKUMAR LOGISTIC',
            registrationNo: 'NL01AJ3648',
            agentName: '-',
            employeeName: 'ARVIND DNYANESHWAR GAWADE',
            proposalAmt: 58273.00,
            paymentType: 'CHEQUE',
            chequeNo: '134664',
            remark: 'SANTOSH BANSODE',
            createUser: 'SNEHAL JADHAV',
            createDate: '12/10/2026 12:33:56',
            referenceType: 'DIRECT',
            status: 'PENDING'
        },
        {
            id: 6,
            reconType: 'CUSTOMER',
            companyName: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
            branchName: 'BARAMATI',
            policyType: 'GCV > 40001 - 45000 GVW',
            policyNo: 'AVO/2315/20257088',
            transDate: '10/10/2026',
            customerName: 'HARSHVARDHAN HANUMANT KOKARE',
            registrationNo: 'MH12QW6022',
            agentName: '-',
            employeeName: 'ARVIND DNYANESHWAR GAWADE',
            proposalAmt: 54098.00,
            paymentType: 'CHEQUE',
            chequeNo: '134664',
            remark: 'SANTOSH BANSODE',
            createUser: 'SNEHAL JADHAV',
            createDate: '12/10/2026 12:50:34',
            referenceType: 'DIRECT',
            status: 'PENDING'
        },
        {
            id: 7,
            reconType: 'CUSTOMER',
            companyName: 'TATA AIG GENERAL INSURANCE CO. LTD',
            branchName: 'KEY CHANNEL',
            policyType: 'GCV 7501 - 12000 GVW',
            policyNo: '6304382177',
            transDate: '10/10/2026',
            customerName: 'RAMPHER YADAV',
            registrationNo: 'MH14RJ6117',
            agentName: 'MADHULIKA RAJBAHADUR SINGH',
            employeeName: 'NITIN YASHODHAN BALAKSHE',
            proposalAmt: 29107.00,
            paymentType: 'CHEQUE',
            chequeNo: '000117',
            remark: 'SIDDESH SHINDE',
            createUser: 'SNEHAL JADHAV',
            createDate: '13/10/2026 11:54:45',
            referenceType: 'AGENT',
            status: 'PENDING'
        },
        {
            id: 8,
            reconType: 'CUSTOMER',
            companyName: 'ROYAL SUNDARAM GENERAL INSURANCE CO.',
            branchName: 'PUNE',
            policyType: 'GCV 20001 - 40000 GVW',
            policyNo: 'VGC1643825000100',
            transDate: '07/10/2026',
            customerName: 'MANOJ BABAN BOTRE',
            registrationNo: 'MH42T7586',
            agentName: 'RAHUL CHANDRAKANT GAIKWAD',
            employeeName: 'NITIN YASHODHAN BALAKSHE',
            proposalAmt: 85334.12,
            paymentType: 'CHEQUE',
            chequeNo: '000201',
            remark: 'SIDDESH SHINDE',
            createUser: 'SNEHAL JADHAV',
            createDate: '12/10/2026 10:28:30',
            referenceType: 'AGENT',
            status: 'PENDING'
        },
        {
            id: 9,
            reconType: 'RA',
            companyName: 'RELIANCE GENERAL INSURANCE CO. LTD',
            branchName: 'SOLAPUR',
            policyType: 'COMMERCIAL VEHICLE',
            policyNo: '140122423340000142',
            transDate: '15/10/2026',
            customerName: 'SHREEJA ENTERPRISES',
            registrationNo: 'MH13CU7819',
            agentName: 'SANTOSH JADHAV',
            employeeName: 'ARVIND DNYANESHWAR GAWADE',
            proposalAmt: 42100.00,
            paymentType: 'CHEQUE',
            chequeNo: '104167',
            remark: 'DEPOSITED IN ICICI BANK',
            createUser: 'SNEHAL JADHAV',
            createDate: '15/10/2026 14:20:10',
            referenceType: 'AGENT',
            status: 'PENDING'
        },
        {
            id: 10,
            reconType: 'RA',
            companyName: 'HDFC ERGO GENERAL INSURANCE CO. LTD',
            branchName: 'PUNE',
            policyType: 'PRIVATE CAR',
            policyNo: '2311200456100',
            transDate: '14/10/2026',
            customerName: 'VINAYAK TRANSPORT',
            registrationNo: 'MH12RN4590',
            agentName: 'ANIKET KULKARNI',
            employeeName: 'NITIN YASHODHAN BALAKSHE',
            proposalAmt: 64200.00,
            paymentType: 'CHEQUE',
            chequeNo: '209841',
            remark: 'BRANCH CHEQUE DROP',
            createUser: 'SNEHAL JADHAV',
            createDate: '14/10/2026 16:45:00',
            referenceType: 'AGENT',
            status: 'PENDING'
        }
    ]);

    const filteredChequeReconRecords = chequeReconRecords.filter(item => {
        if (item.reconType !== chequeReconType) return false;
        if (!chequeReconSearchQuery.trim()) return true;
        const q = chequeReconSearchQuery.toLowerCase().trim();
        return (
            item.customerName.toLowerCase().includes(q) ||
            item.registrationNo.toLowerCase().includes(q) ||
            item.chequeNo.toLowerCase().includes(q) ||
            item.policyNo.toLowerCase().includes(q) ||
            item.companyName.toLowerCase().includes(q) ||
            item.branchName.toLowerCase().includes(q) ||
            item.agentName.toLowerCase().includes(q) ||
            item.employeeName.toLowerCase().includes(q) ||
            item.remark.toLowerCase().includes(q)
        );
    });

    const totalChequeCount = filteredChequeReconRecords.length;
    const totalChequeAmount = filteredChequeReconRecords.reduce((acc, curr) => acc + curr.proposalAmt, 0);
    const totalChequePages = Math.ceil(filteredChequeReconRecords.length / chequeReconPerPage) || 1;
    const paginatedChequeRecords = filteredChequeReconRecords.slice(
        (chequeReconPage - 1) * chequeReconPerPage,
        chequeReconPage * chequeReconPerPage
    );

    const handleChequeReconSubmit = () => {
        if (!chequeReconFromDate.trim()) {
            showToast('Please enter From Date');
            return;
        }
        setHasChequeReconSubmitted(true);
        setChequeReconPage(1);
        setSelectedChequeReconIds([]);
        showToast('Cheque records loaded successfully!');
    };

    const handleChequeReconReset = () => {
        setHasChequeReconSubmitted(false);
        setChequeReconSearchQuery('');
        setSelectedChequeReconIds([]);
        setChequeReconPage(1);
    };

    const handleToggleSelectAllCheques = () => {
        const pageIds = paginatedChequeRecords.map(item => item.id);
        const allSelected = pageIds.length > 0 && pageIds.every(id => selectedChequeReconIds.includes(id));
        if (allSelected) {
            setSelectedChequeReconIds(prev => prev.filter(id => !pageIds.includes(id)));
        } else {
            setSelectedChequeReconIds(prev => Array.from(new Set([...prev, ...pageIds])));
        }
    };

    const handleToggleCheque = (id: number) => {
        setSelectedChequeReconIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDepositSelectedCheques = () => {
        if (selectedChequeReconIds.length === 0) {
            showToast('Please select at least one cheque to reconcile / deposit');
            return;
        }
        setChequeReconRecords(prev => prev.map(c =>
            selectedChequeReconIds.includes(c.id) ? { ...c, status: 'DEPOSITED' } : c
        ));
        showToast(`${selectedChequeReconIds.length} cheque(s) marked as deposited/reconciled!`);
        setSelectedChequeReconIds([]);
    };

    const handleExportCheques = () => {
        const headers = [
            'COMPANY NAME', 'BRANCH NAME', 'POLICY TYPE', 'POLICY NO', 'TRANS DATE',
            'CUSTOMER NAME', 'REGISTRATION NO', 'AGENT NAME', 'EMPLOYEE NAME',
            'PROPOSAL AMT', 'PAYMENTTYPE', 'CHEQUE NO.', 'REMARK', 'CREATE USER',
            'CREATE DATE', 'REFERENCE TYPE', 'STATUS'
        ];
        const rows = filteredChequeReconRecords.map(i => [
            i.companyName,
            i.branchName,
            i.policyType,
            i.policyNo,
            i.transDate,
            i.customerName,
            i.registrationNo,
            i.agentName,
            i.employeeName,
            i.proposalAmt,
            i.paymentType,
            i.chequeNo,
            i.remark,
            i.createUser,
            i.createDate,
            i.referenceType,
            i.status
        ]);
        exportTableToCsv(`Cheque_Recon_${chequeReconType}_Report`, headers, rows);
    };

    /* =========================================================================
       14. RECEIVING AMOUNT (reliable-erp.com/Clerk/viewReceivingAmountt.aspx)
       ========================================================================= */
    interface ReceivingPolicyDetail {
        customerName: string;
        registrationNo: string;
        actualPremiumAmt: number;
    }

    interface ReceivingAmountItem {
        id: number;
        category: string;
        totalPremium: number;
        pendingPremium: number;
        depositPremium: number;
        cutNPay: number;
        shortfall: number;
        status: 'SHORT FALL' | 'CLEAR' | 'PENDING';
        createdDate: string;
        executiveName: string;
        policyDetails: ReceivingPolicyDetail[];
    }

    const receivingCategories = [
        { id: 'Online RA Pre Approval', label: 'Online RA Pre Approval', count: 3 },
        { id: 'Pending ERP Entry', label: 'Pending ERP Entry', count: 9 },
        { id: 'Online To Reliable Approval', label: 'Online To Reliable Approval', count: 4 },
        { id: 'Pending Premium Cash', label: 'Pending Premium Cash', count: 4 },
        { id: 'Cash Received Premium', label: 'Cash Received Premium', count: 38 },
        { id: 'Premium Shortfall', label: 'Premium Shortfall', count: 62 },
        { id: 'RA Cheque Recon', label: 'RA Cheque Recon', count: 0 },
    ];

    const [receivingActiveCategory, setReceivingActiveCategory] = useState('Cash Received Premium');
    const [receivingSearchQuery, setReceivingSearchQuery] = useState('');
    const [receivingPage, setReceivingPage] = useState(1);
    const [receivingPerPage, setReceivingPerPage] = useState(10);
    const [viewingReceivingRecord, setViewingReceivingRecord] = useState<ReceivingAmountItem | null>(null);

    const [receivingRecords, setReceivingRecords] = useState<ReceivingAmountItem[]>([
        {
            id: 1,
            category: 'Cash Received Premium',
            totalPremium: 19815,
            pendingPremium: 19815,
            depositPremium: 19815,
            cutNPay: 0,
            shortfall: 0,
            status: 'SHORT FALL',
            createdDate: '21/06/2024',
            executiveName: 'SANTOSH PHULCHAND BANSODE',
            policyDetails: [
                { customerName: 'SUSHANT SUNIL GALINDE', registrationNo: 'MH42AX3799', actualPremiumAmt: 19815 }
            ]
        },
        {
            id: 2,
            category: 'Cash Received Premium',
            totalPremium: 20205,
            pendingPremium: 20205,
            depositPremium: 0,
            cutNPay: 0,
            shortfall: 0,
            status: 'SHORT FALL',
            createdDate: '07/12/2024',
            executiveName: 'NILAKSHI NARENDRA KULKARNI',
            policyDetails: [
                { customerName: 'GANESH DATTU WAGHMARE', registrationNo: 'MH12TV0205', actualPremiumAmt: 20205 }
            ]
        },
        {
            id: 3,
            category: 'Cash Received Premium',
            totalPremium: 18093,
            pendingPremium: 16000,
            depositPremium: 16000,
            cutNPay: 2092,
            shortfall: 16000,
            status: 'SHORT FALL',
            createdDate: '03/03/2025',
            executiveName: 'ARVIND DNYANESHWAR GAWADE',
            policyDetails: [
                { customerName: 'PRAMOD PANDURANG SATAV', registrationNo: 'MH12AQ2375', actualPremiumAmt: 18093 }
            ]
        },
        {
            id: 4,
            category: 'Cash Received Premium',
            totalPremium: 31581,
            pendingPremium: 31581,
            depositPremium: 31581,
            cutNPay: 0,
            shortfall: 31581,
            status: 'SHORT FALL',
            createdDate: '31/05/2025',
            executiveName: 'ARVIND DNYANESHWAR GAWADE',
            policyDetails: [
                { customerName: 'ANIL SHANKAR DOIPHODE', registrationNo: 'MH12MV3232', actualPremiumAmt: 31581 }
            ]
        },
        {
            id: 5,
            category: 'Cash Received Premium',
            totalPremium: 18551,
            pendingPremium: 18550,
            depositPremium: 0,
            cutNPay: 0,
            shortfall: 18550,
            status: 'SHORT FALL',
            createdDate: '03/06/2025',
            executiveName: 'RUPESH RAMESH GAIKWAD',
            policyDetails: [
                { customerName: 'RIZA RAFIQ SHAIKH', registrationNo: 'MH12UJ9285', actualPremiumAmt: 18551 }
            ]
        },
        {
            id: 6,
            category: 'Cash Received Premium',
            totalPremium: 30280,
            pendingPremium: 30280,
            depositPremium: 30280,
            cutNPay: 0,
            shortfall: 0,
            status: 'CLEAR',
            createdDate: '06/06/2025',
            executiveName: 'ARVIND DNYANESHWAR GAWADE',
            policyDetails: [
                { customerName: 'MANISHA JEETENDRA BANSODE', registrationNo: 'NON-MOTOR', actualPremiumAmt: 30280 }
            ]
        },
        {
            id: 7,
            category: 'Cash Received Premium',
            totalPremium: 14031,
            pendingPremium: 14031,
            depositPremium: 0,
            cutNPay: 0,
            shortfall: 14031,
            status: 'SHORT FALL',
            createdDate: '15/06/2025',
            executiveName: 'ARVIND DNYANESHWAR GAWADE',
            policyDetails: [
                { customerName: 'MANISHA JEETENDRA BANSODE', registrationNo: 'MH42AS8003', actualPremiumAmt: 14031 }
            ]
        },
        {
            id: 8,
            category: 'Cash Received Premium',
            totalPremium: 12416,
            pendingPremium: 12416,
            depositPremium: 12416,
            cutNPay: 0,
            shortfall: 12416,
            status: 'SHORT FALL',
            createdDate: '22/11/2025',
            executiveName: 'ARVIND DNYANESHWAR GAWADE',
            policyDetails: [
                { customerName: 'SATYAWAN RAMCHANDRA NANAWARE', registrationNo: 'MH42AH7755', actualPremiumAmt: 12416 }
            ]
        },
        {
            id: 9,
            category: 'Cash Received Premium',
            totalPremium: 6914,
            pendingPremium: 6914,
            depositPremium: 6914,
            cutNPay: 0,
            shortfall: 6914,
            status: 'SHORT FALL',
            createdDate: '30/11/2025',
            executiveName: 'ARVIND DNYANESHWAR GAWADE',
            policyDetails: [
                { customerName: 'SHASHIKANTA SHANTILAL GADIYA', registrationNo: 'MH42AH1458', actualPremiumAmt: 6914 }
            ]
        },
        {
            id: 10,
            category: 'Online RA Pre Approval',
            totalPremium: 25400,
            pendingPremium: 25400,
            depositPremium: 25400,
            cutNPay: 0,
            shortfall: 0,
            status: 'CLEAR',
            createdDate: '10/01/2026',
            executiveName: 'SANTOSH PHULCHAND BANSODE',
            policyDetails: [
                { customerName: 'VIKRAM BALASAHEB PAWAR', registrationNo: 'MH12PQ4580', actualPremiumAmt: 25400 }
            ]
        },
        {
            id: 11,
            category: 'Pending ERP Entry',
            totalPremium: 45000,
            pendingPremium: 45000,
            depositPremium: 20000,
            cutNPay: 0,
            shortfall: 25000,
            status: 'SHORT FALL',
            createdDate: '12/02/2026',
            executiveName: 'RUPESH RAMESH GAIKWAD',
            policyDetails: [
                { customerName: 'SHREE BALAJI LOGISTICS', registrationNo: 'MH14CL9012', actualPremiumAmt: 45000 }
            ]
        },
        {
            id: 12,
            category: 'Premium Shortfall',
            totalPremium: 38200,
            pendingPremium: 38200,
            depositPremium: 10000,
            cutNPay: 0,
            shortfall: 28200,
            status: 'SHORT FALL',
            createdDate: '05/03/2026',
            executiveName: 'ARVIND DNYANESHWAR GAWADE',
            policyDetails: [
                { customerName: 'MAHESH DILIP SHINDE', registrationNo: 'MH45B8890', actualPremiumAmt: 38200 }
            ]
        }
    ]);

    const filteredReceivingRecords = receivingRecords.filter(item => {
        if (receivingActiveCategory && item.category !== receivingActiveCategory) return false;
        if (!receivingSearchQuery.trim()) return true;
        const q = receivingSearchQuery.toLowerCase().trim();
        const matchesMain = (
            item.executiveName.toLowerCase().includes(q) ||
            item.createdDate.toLowerCase().includes(q) ||
            item.status.toLowerCase().includes(q) ||
            item.totalPremium.toString().includes(q)
        );
        const matchesDetails = item.policyDetails.some(d =>
            d.customerName.toLowerCase().includes(q) ||
            d.registrationNo.toLowerCase().includes(q)
        );
        return matchesMain || matchesDetails;
    });

    const totalReceivingCount = filteredReceivingRecords.length;
    const totalReceivingPremium = filteredReceivingRecords.reduce((acc, curr) => acc + curr.totalPremium, 0);
    const totalReceivingPending = filteredReceivingRecords.reduce((acc, curr) => acc + curr.pendingPremium, 0);
    const totalReceivingDeposit = filteredReceivingRecords.reduce((acc, curr) => acc + curr.depositPremium, 0);
    const totalReceivingShortfall = filteredReceivingRecords.reduce((acc, curr) => acc + curr.shortfall, 0);

    const totalReceivingPages = Math.ceil(filteredReceivingRecords.length / receivingPerPage) || 1;
    const paginatedReceivingRecords = filteredReceivingRecords.slice(
        (receivingPage - 1) * receivingPerPage,
        receivingPage * receivingPerPage
    );

    const handleDeleteReceivingRecord = (id: number) => {
        setReceivingRecords(prev => prev.filter(r => r.id !== id));
        showToast('Receiving amount record deleted successfully');
    };

    const handleExportReceiving = () => {
        const headers = [
            'CATEGORY', 'TOTAL PREMIUM', 'TOTAL PENDING PREMIUM', 'DEPOSIT PREMIUM',
            'CUT N PAY', 'SHORT FALL', 'STATUS', 'CREATED DATE', 'EXECUTIVE NAME',
            'CUSTOMER NAME', 'REGISTRATION NO', 'ACTUAL PREMIUM'
        ];
        const rows: (string | number)[][] = [];
        filteredReceivingRecords.forEach(i => {
            if (i.policyDetails.length === 0) {
                rows.push([
                    i.category, i.totalPremium, i.pendingPremium, i.depositPremium,
                    i.cutNPay, i.shortfall, i.status, i.createdDate, i.executiveName,
                    '-', '-', '-'
                ]);
            } else {
                i.policyDetails.forEach(d => {
                    rows.push([
                        i.category, i.totalPremium, i.pendingPremium, i.depositPremium,
                        i.cutNPay, i.shortfall, i.status, i.createdDate, i.executiveName,
                        d.customerName, d.registrationNo, d.actualPremiumAmt
                    ]);
                });
            }
        });
        exportTableToCsv(`Receiving_Amount_${receivingActiveCategory.replace(/\s+/g, '_')}_Report`, headers, rows);
    };

    /* =========================================================================
       15. ONLINE RA PRE APPROVAL (reliable-erp.com/Clerk/viewAppTransactionAccountApproval.aspx)
       ========================================================================= */
    interface OnlineRAPreApprovalItem {
        id: string;
        date: string;
        premium: number;
        insuranceCompany: string;
        productType: string;
        policyMode: string;
        paymentMode: string;
        cashStatus: string;
        raPaymentStatus: string;
        paymentDetails2: string;
        noOfImages: number;
        agentName: string;
        salesExecutive: string;
        registrationNo: string;
        status: 'PENDING' | 'APPROVED';
    }

    const [raPreApprovalSearchQuery, setRaPreApprovalSearchQuery] = useState('');
    const [raPreApprovalPage, setRaPreApprovalPage] = useState(1);
    const [raPreApprovalPerPage, setRaPreApprovalPerPage] = useState(10);

    const [raPreApprovalRecords, setRaPreApprovalRecords] = useState<OnlineRAPreApprovalItem[]>([
        {
            id: '185783',
            date: '16/10/2026 15:20:06',
            premium: 82215,
            insuranceCompany: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
            productType: 'COMPREHENSIVE',
            policyMode: 'NEW',
            paymentMode: 'ONLINE TO RELIABLE',
            cashStatus: 'NA',
            raPaymentStatus: 'NA',
            paymentDetails2: 'NA',
            noOfImages: 1,
            agentName: 'NITIN HANUMANT SHENDE',
            salesExecutive: 'GAWADE ARVIND DNYANESHWAR',
            registrationNo: 'MH12QW6022',
            status: 'PENDING'
        },
        {
            id: '185784',
            date: '16/10/2026 14:10:22',
            premium: 39525,
            insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
            productType: 'COMPREHENSIVE',
            policyMode: 'RENEWAL',
            paymentMode: 'ONLINE TO RELIABLE',
            cashStatus: 'NA',
            raPaymentStatus: 'NA',
            paymentDetails2: 'NA',
            noOfImages: 2,
            agentName: 'SHIVANI PRADIP BHUYAR',
            salesExecutive: 'MANGESH RAVINDRA KAMBLE',
            registrationNo: 'MH28BW2137',
            status: 'PENDING'
        },
        {
            id: '185785',
            date: '16/10/2026 11:45:10',
            premium: 59354,
            insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
            productType: 'COMPREHENSIVE',
            policyMode: 'ROLLOVER',
            paymentMode: 'ONLINE TO RELIABLE',
            cashStatus: 'NA',
            raPaymentStatus: 'NA',
            paymentDetails2: 'NA',
            noOfImages: 1,
            agentName: 'ANIKET KULKARNI',
            salesExecutive: 'AVINASH BHARAT KORATKAR',
            registrationNo: 'MH45MV4134',
            status: 'PENDING'
        }
    ]);

    const filteredRaPreApprovalRecords = raPreApprovalRecords.filter(item => {
        if (!raPreApprovalSearchQuery.trim()) return true;
        const q = raPreApprovalSearchQuery.toLowerCase().trim();
        return (
            item.id.toLowerCase().includes(q) ||
            item.agentName.toLowerCase().includes(q) ||
            item.salesExecutive.toLowerCase().includes(q) ||
            item.registrationNo.toLowerCase().includes(q) ||
            item.insuranceCompany.toLowerCase().includes(q) ||
            item.productType.toLowerCase().includes(q) ||
            item.date.toLowerCase().includes(q)
        );
    });

    const totalRaPreApprovalCount = filteredRaPreApprovalRecords.length;
    const totalRaPreApprovalAmount = filteredRaPreApprovalRecords.reduce((acc, curr) => acc + curr.premium, 0);
    const totalRaPreApprovalPages = Math.ceil(filteredRaPreApprovalRecords.length / raPreApprovalPerPage) || 1;
    const paginatedRaPreApprovalRecords = filteredRaPreApprovalRecords.slice(
        (raPreApprovalPage - 1) * raPreApprovalPerPage,
        raPreApprovalPage * raPreApprovalPerPage
    );

    const handleApproveRAPreApproval = (id: string) => {
        setRaPreApprovalRecords(prev => prev.map(r => r.id === id ? { ...r, status: 'APPROVED' } : r));
        showToast(`Transaction ${id} approved successfully!`);
    };

    const handleExportRAPreApproval = () => {
        const headers = [
            'ID', 'DATE', 'PREMIUM', 'INSURANCE COMPANY', 'PRODUCT TYPE',
            'POLICY MODE', 'PAYMENT MODE', 'CASH STATUS', 'RAPAYMENTSTATUS',
            'PAYMENTDETAILS2', 'NO. OF IMAGES', 'AGENT NAME', 'SALES EX. / LOC.HEAD',
            'REGISTRATION NO', 'STATUS'
        ];
        const rows = filteredRaPreApprovalRecords.map(i => [
            i.id, i.date, i.premium, i.insuranceCompany, i.productType,
            i.policyMode, i.paymentMode, i.cashStatus, i.raPaymentStatus,
            i.paymentDetails2, i.noOfImages, i.agentName, i.salesExecutive,
            i.registrationNo, i.status
        ]);
        exportTableToCsv('Online_RA_Pre_Approval_Report', headers, rows);
    };

    /* =========================================================================
       16. PENDING COMMISSION NEW (reliable-erp.com/Clerk/POSP_AgentPendingCommission.aspx)
       ========================================================================= */
    interface PendingCommissionNewItem {
        id: string;
        pospName: string;
        branchName: string;
        agentName: string;
        premiumAmt: number;
        tpComm: number;
        odComm: number;
        netComm: number;
        totalComm: number;
        advAmt: number;
        totalOutstandingAmt: number;
        balance: number;
        accountNo: string;
        ifscCode: string;
        agentTds: number;
        entityType: 'Agent POSP' | 'RA POSP';
    }

    const [pcnEntity, setPcnEntity] = useState<'ALL' | 'Agent POSP' | 'RA POSP'>('ALL');
    const [pcnFromDate, setPcnFromDate] = useState('16/10/2026');
    const [pcnToDate, setPcnToDate] = useState('16/10/2026');
    const [pcnSearchQuery, setPcnSearchQuery] = useState('');
    const [pcnPage, setPcnPage] = useState(1);
    const [pcnPerPage, setPcnPerPage] = useState(10);
    const [pcnSelectedIds, setPcnSelectedIds] = useState<string[]>([]);

    // Payment Form States
    const [pcnOutstandingRecover, setPcnOutstandingRecover] = useState('0.00');
    const [pcnTotalOutstandingRecover, setPcnTotalOutstandingRecover] = useState('0.00');
    const [pcnEwalletAmountUsed, setPcnEwalletAmountUsed] = useState('0.00');
    const [pcnPaymentMode, setPcnPaymentMode] = useState('');
    const [pcnLedger, setPcnLedger] = useState('');
    const [pcnNeftNo, setPcnNeftNo] = useState('');
    const [pcnPaymentDate, setPcnPaymentDate] = useState('16/10/2026');

    const [pcnRecords, setPcnRecords] = useState<PendingCommissionNewItem[]>([
        {
            id: 'PCN-001',
            pospName: 'SONALI NILKANTHA BORAKAR',
            branchName: 'AHILYANAGAR',
            agentName: 'SHEKHAR MARUTI ANDHULE',
            premiumAmt: 68675.38,
            tpComm: 18348.00,
            odComm: 1896.00,
            netComm: 18348.00,
            totalComm: 20244.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 20244.00,
            accountNo: '50100213606577',
            ifscCode: 'HDFC0002986',
            agentTds: 2,
            entityType: 'Agent POSP'
        },
        {
            id: 'PCN-002',
            pospName: 'AISHWARYA NAGNATH PISE',
            branchName: 'AKLUJ',
            agentName: 'NAVNATH SAWATA PISE',
            premiumAmt: 18043.00,
            tpComm: 7887.00,
            odComm: 0.00,
            netComm: 7887.00,
            totalComm: 7887.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 7887.00,
            accountNo: '070710510002428',
            ifscCode: 'BKID0000707',
            agentTds: 2,
            entityType: 'Agent POSP'
        },
        {
            id: 'PCN-003',
            pospName: 'RESHMA AMOL WAGHMARE',
            branchName: 'AKLUJ',
            agentName: 'RAJENDRA LAXMAN WAGHMARE',
            premiumAmt: 9803.00,
            tpComm: 4152.00,
            odComm: 0.00,
            netComm: 4152.00,
            totalComm: 4152.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 4152.00,
            accountNo: '50100162030864',
            ifscCode: 'HDFC0004476',
            agentTds: 2,
            entityType: 'Agent POSP'
        },
        {
            id: 'PCN-004',
            pospName: 'SNEHAL SACHIN GHODAKE',
            branchName: 'AKLUJ',
            agentName: 'SHIVAJI LAXMAN GHODAKE',
            premiumAmt: 17971.00,
            tpComm: 6996.00,
            odComm: 0.00,
            netComm: 6996.00,
            totalComm: 6996.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 6996.00,
            accountNo: '20111533058',
            ifscCode: 'SBIN0000305',
            agentTds: 2,
            entityType: 'RA POSP'
        },
        {
            id: 'PCN-005',
            pospName: 'ADITYA CHANDRASHEKHAR JOSHI',
            branchName: 'AKOLA',
            agentName: 'ASHWINI SHAILENDRA JOSHI',
            premiumAmt: 19733.00,
            tpComm: 7865.00,
            odComm: 0.00,
            netComm: 7865.00,
            totalComm: 7865.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 7865.00,
            accountNo: '696805602087 / 1026005016579',
            ifscCode: 'ICIC0006968 / YESB0AUB026',
            agentTds: 2,
            entityType: 'Agent POSP'
        },
        {
            id: 'PCN-006',
            pospName: 'SHIVANI PRADIP BHUYAR',
            branchName: 'AKOLA',
            agentName: 'SHIVANI PRADIP BHUYAR',
            premiumAmt: 46086.00,
            tpComm: 1460.00,
            odComm: 8720.00,
            netComm: 1460.00,
            totalComm: 10180.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 10180.00,
            accountNo: '925010038096803',
            ifscCode: 'UTIB0000749',
            agentTds: 2,
            entityType: 'Agent POSP'
        },
        {
            id: 'PCN-007',
            pospName: 'SOPAN RAMBHAU PATIL',
            branchName: 'AKOLA',
            agentName: 'SHRIKRUSHNA SOPAN PATIL',
            premiumAmt: 76565.00,
            tpComm: 25316.00,
            odComm: 0.00,
            netComm: 25316.00,
            totalComm: 25316.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 25316.00,
            accountNo: '09641140000028',
            ifscCode: 'HDFC0000964',
            agentTds: 2,
            entityType: 'Agent POSP'
        },
        {
            id: 'PCN-008',
            pospName: 'SUPRIYA DHAIRYASHIL JAYSING',
            branchName: 'BARAMATI',
            agentName: 'DHAIRYASHIL JAYSING',
            premiumAmt: 7003.00,
            tpComm: 0.00,
            odComm: 416.00,
            netComm: 0.00,
            totalComm: 416.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 416.00,
            accountNo: '50200050498765',
            ifscCode: 'HDFC0002089',
            agentTds: 2,
            entityType: 'RA POSP'
        },
        {
            id: 'PCN-009',
            pospName: 'ANURADHA RAMDAS KALE',
            branchName: 'PUNE',
            agentName: 'RAMDAS TUKARAM KALE',
            premiumAmt: 34200.00,
            tpComm: 6200.00,
            odComm: 1200.00,
            netComm: 6200.00,
            totalComm: 7400.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 7400.00,
            accountNo: '4039101004523',
            ifscCode: 'MAHB0000123',
            agentTds: 2,
            entityType: 'Agent POSP'
        },
        {
            id: 'PCN-010',
            pospName: 'SANDIP BABANRAO DESHMUKH',
            branchName: 'CHHATRAPATI SAMBHAJINAGAR',
            agentName: 'SANDIP BABANRAO DESHMUKH',
            premiumAmt: 52180.00,
            tpComm: 11400.00,
            odComm: 3500.00,
            netComm: 11400.00,
            totalComm: 14900.00,
            advAmt: 0.00,
            totalOutstandingAmt: 0.00,
            balance: 14900.00,
            accountNo: '309812450098',
            ifscCode: 'SBIN0001423',
            agentTds: 2,
            entityType: 'RA POSP'
        }
    ]);

    const filteredPcnRecords = pcnRecords.filter(item => {
        if (pcnEntity !== 'ALL' && item.entityType !== pcnEntity) return false;
        if (!pcnSearchQuery.trim()) return true;
        const q = pcnSearchQuery.toLowerCase().trim();
        return (
            item.pospName.toLowerCase().includes(q) ||
            item.branchName.toLowerCase().includes(q) ||
            item.agentName.toLowerCase().includes(q) ||
            item.accountNo.toLowerCase().includes(q) ||
            item.ifscCode.toLowerCase().includes(q) ||
            item.balance.toString().includes(q) ||
            item.premiumAmt.toString().includes(q)
        );
    });

    const totalPcnCount = filteredPcnRecords.length;
    const totalPcnPremium = filteredPcnRecords.reduce((acc, curr) => acc + curr.premiumAmt, 0);
    const totalPcnComm = filteredPcnRecords.reduce((acc, curr) => acc + curr.totalComm, 0);
    const totalPcnBalance = filteredPcnRecords.reduce((acc, curr) => acc + curr.balance, 0);

    const totalPcnPages = Math.ceil(filteredPcnRecords.length / pcnPerPage) || 1;
    const paginatedPcnRecords = filteredPcnRecords.slice(
        (pcnPage - 1) * pcnPerPage,
        pcnPage * pcnPerPage
    );

    const selectedPcnTotalBalance = filteredPcnRecords
        .filter(item => pcnSelectedIds.includes(item.id))
        .reduce((acc, curr) => acc + curr.balance, 0);

    const handleToggleSelectPcn = (id: string) => {
        setPcnSelectedIds(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleSelectAllPcn = () => {
        const paginatedIds = paginatedPcnRecords.map(item => item.id);
        const allSelected = paginatedIds.length > 0 && paginatedIds.every(id => pcnSelectedIds.includes(id));
        if (allSelected) {
            setPcnSelectedIds(prev => prev.filter(id => !paginatedIds.includes(id)));
        } else {
            setPcnSelectedIds(prev => Array.from(new Set([...prev, ...paginatedIds])));
        }
    };

    const handlePcnPay = () => {
        if (pcnSelectedIds.length === 0) {
            showToast('Please select at least one agent record using the checkboxes.');
            return;
        }
        if (!pcnPaymentMode) {
            showToast('Please select a Payment Mode.');
            return;
        }
        if (!pcnLedger) {
            showToast('Please select a Ledger / Cash Account.');
            return;
        }
        const paidCount = pcnSelectedIds.length;
        const paidAmt = selectedPcnTotalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        setPcnRecords(prev => prev.filter(r => !pcnSelectedIds.includes(r.id)));
        setPcnSelectedIds([]);
        showToast(`Payment of ₹ ${paidAmt} processed successfully for ${paidCount} agent(s)!`);
    };

    const handleExportPcnSummary = () => {
        const headers = ['BRANCH NAME', 'NO. OF AGENTS', 'TOTAL PREMIUM', 'TOTAL COMM', 'TOTAL BALANCE'];
        const branchMap = new Map<string, { count: number; premium: number; comm: number; balance: number }>();
        filteredPcnRecords.forEach(r => {
            const current = branchMap.get(r.branchName) || { count: 0, premium: 0, comm: 0, balance: 0 };
            branchMap.set(r.branchName, {
                count: current.count + 1,
                premium: current.premium + r.premiumAmt,
                comm: current.comm + r.totalComm,
                balance: current.balance + r.balance
            });
        });
        const rows: (string | number)[][] = [];
        branchMap.forEach((val, branch) => {
            rows.push([branch, val.count, val.premium.toFixed(2), val.comm.toFixed(2), val.balance.toFixed(2)]);
        });
        exportTableToCsv(`Pending_Commission_New_Summary_${pcnEntity.replace(/\s+/g, '_')}`, headers, rows);
    };

    const handleExportPcnDetails = () => {
        const headers = [
            'POSP NAME', 'BRANCH NAME', 'AGENT NAME', 'PREMIUM AMT', 'TP COMM.',
            'OD COMM.', 'NET COMM.', 'TOTAL COMM.', 'ADV. AMT', 'TOTAL OUT STANDING AMOUNT',
            'BALANCE', 'ACCOUNTNO', 'IFSC CODE', 'AGENTTDS'
        ];
        const rows = filteredPcnRecords.map(i => [
            i.pospName, i.branchName, i.agentName, i.premiumAmt, i.tpComm,
            i.odComm, i.netComm, i.totalComm, i.advAmt, i.totalOutstandingAmt,
            i.balance, i.accountNo, i.ifscCode, i.agentTds
        ]);
        exportTableToCsv(`Pending_Commission_New_Details_${pcnEntity.replace(/\s+/g, '_')}`, headers, rows);
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
                                                        className={`p-1.5 rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none ${item.status === 'APPROVED'
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
                    {/* Top Search & Filter Bar (Full-Width Responsive Grid) */}
                    <div className="bg-white rounded-xl border border-brand-border p-4 sm:p-5 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 xl:gap-6 items-end w-full">
                            {/* Entity Type Radio */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-3">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Entity</span>
                                <div className="flex items-center justify-start gap-4 sm:gap-5 h-[38px]">
                                    {(['Agent', 'Self', 'Franchise'] as const).map((entity) => (
                                        <label key={entity} className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-brand-navy select-none hover:text-brand-primary transition-colors whitespace-nowrap">
                                            <input
                                                type="radio"
                                                name="commEntity"
                                                checked={commEntity === entity}
                                                onChange={() => setCommEntity(entity)}
                                                className="w-4 h-4 text-brand-primary accent-blue-600 cursor-pointer"
                                            />
                                            <span>{entity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Date Type Radio */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-3">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Date Criteria</span>
                                <div className="flex items-center justify-start gap-4 sm:gap-5 h-[38px]">
                                    {(['Trans Date', 'Risk Start Date'] as const).map((dType) => (
                                        <label key={dType} className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-brand-navy select-none hover:text-brand-primary transition-colors whitespace-nowrap">
                                            <input
                                                type="radio"
                                                name="commDateType"
                                                checked={commDateType === dType}
                                                onChange={() => setCommDateType(dType)}
                                                className="w-4 h-4 text-brand-primary accent-blue-600 cursor-pointer"
                                            />
                                            <span>{dType}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* From Date */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">From Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={commFromDate}
                                        onChange={(e) => setCommFromDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* To Date */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-2">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">To Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={commToDate}
                                        onChange={(e) => setCommToDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-2 w-full">
                                <button
                                    type="button"
                                    onClick={() => showToast('Commission data filtered successfully!')}
                                    className="w-full h-[38px] px-5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <span>Show</span>
                                </button>

                                {(commSearchQuery || selectedCommIds.length > 0) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCommSearchQuery('');
                                            setCommPage(1);
                                            setSelectedCommIds([]);
                                        }}
                                        className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                    >
                                        Reset Filters
                                    </button>
                                )}
                            </div>
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
                                                    className={`h-[48px] cursor-pointer transition-colors ${isSelected ? 'bg-blue-50/70 font-medium' : 'hover:bg-brand-mainbg bg-white'
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

            {/* TAB CONTENT 6: PAID COMMISSION (MATCHING ERP AgentCommisionPaymentReport.aspx) */}
            {activeTab === 'paid-commission' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Top Search & Filter Bar (Matching Pending Commission style & full-width grid) */}
                    <div className="bg-white rounded-xl border border-brand-border p-4 sm:p-5 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 xl:gap-6 items-end w-full">
                            {/* Branch Filter */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-3">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Branch</span>
                                <div className="relative w-full">
                                    <select
                                        value={paidBranch}
                                        onChange={(e) => {
                                            setPaidBranch(e.target.value);
                                            setPaidPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none"
                                    >
                                        <option value="">--All Branches--</option>
                                        {['SOLAPUR', 'PUNE', 'GOA', 'BEED', 'BARAMATI', 'KOLHAPUR', 'SATARA', 'AHILYANAGAR', 'AKLUJ', 'NASHIK'].map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* From Date */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-3">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">From Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={paidFromDate}
                                        onChange={(e) => setPaidFromDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* To Date */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-3">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">To Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={paidToDate}
                                        onChange={(e) => setPaidToDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Action Buttons: Show & Export */}
                            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-3 w-full">
                                <button
                                    type="button"
                                    onClick={() => showToast('Commission payment report loaded!')}
                                    className="flex-1 h-[38px] px-4 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <span>Show</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => showToast('Exporting Paid Commission Report...')}
                                    className="flex-1 h-[38px] px-4 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <Download size={14} />
                                    <span>Export</span>
                                </button>
                                {(paidSearchQuery || paidBranch) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPaidSearchQuery('');
                                            setPaidBranch('');
                                            setPaidPage(1);
                                        }}
                                        className="h-[38px] px-3 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                        title="Reset Filters"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Paid Commission Table Card */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Top Toolbar */}
                        <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Search Input */}
                                <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                    <input
                                        type="text"
                                        value={paidSearchQuery}
                                        onChange={(e) => {
                                            setPaidSearchQuery(e.target.value);
                                            setPaidPage(1);
                                        }}
                                        placeholder="Search Agent, Branch, Account No, Narration..."
                                        className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                    />
                                    {paidSearchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setPaidSearchQuery('');
                                                setPaidPage(1);
                                            }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Summary Badges */}
                                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-[6px]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Paid Records :-</span>
                                        <span className="text-brand-primary font-bold text-sm">{totalPaidCommCount}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Net Paid :-</span>
                                        <span className="text-emerald-600 font-bold text-sm">₹ {totalPaidCommAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                            <table className="w-full text-left border-collapse min-w-[1200px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-3.5 text-center w-[50px]">SR</th>
                                        <th className="py-3 px-3.5">TRANS DATE</th>
                                        <th className="py-3 px-3.5">BRANCH NAME</th>
                                        <th className="py-3 px-3.5">AGENT NAME</th>
                                        <th className="py-3 px-3.5 text-right">TOTAL COMM (₹)</th>
                                        <th className="py-3 px-3.5 text-right">ADV AMT (₹)</th>
                                        <th className="py-3 px-3.5 text-right">NET AMOUNT (₹)</th>
                                        <th className="py-3 px-3.5">NARRATION</th>
                                        <th className="py-3 px-3.5">BANK BRANCH</th>
                                        <th className="py-3 px-3.5">IFSC CODE</th>
                                        <th className="py-3 px-3.5">ACCOUNT NO</th>
                                        <th className="py-3 px-3.5 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[12px]">
                                    {paginatedPaidCommissions.length === 0 ? (
                                        <tr>
                                            <td colSpan={12} className="py-12 text-center text-slate-400 font-medium">
                                                No paid commission records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedPaidCommissions.map((row, idx) => (
                                            <tr key={row.id} className="hover:bg-blue-50/40 transition-colors h-[48px] bg-white">
                                                <td className="py-2.5 px-3.5 text-center text-slate-500 font-mono">
                                                    {(paidPage - 1) * paidPerPage + idx + 1}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-medium text-slate-800 whitespace-nowrap">{row.transDate}</td>
                                                <td className="py-2.5 px-3.5 font-semibold text-brand-navy whitespace-nowrap">{row.branchName}</td>
                                                <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">{row.agentName}</td>
                                                <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 whitespace-nowrap">
                                                    ₹ {row.totalComm.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-right font-medium text-slate-500 whitespace-nowrap">
                                                    ₹ {row.advAmt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-right font-bold text-emerald-600 whitespace-nowrap">
                                                    ₹ {row.netAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-600 max-w-[240px] truncate" title={row.narration}>
                                                    {row.narration}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">{row.bankBranch}</td>
                                                <td className="py-2.5 px-3.5 font-mono text-slate-600 whitespace-nowrap">{row.ifscCode}</td>
                                                <td className="py-2.5 px-3.5 font-mono font-medium text-slate-800 whitespace-nowrap">{row.accountNo}</td>
                                                <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                                                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                                        {row.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Standard Pagination Controls */}
                        <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                            <div className="flex items-center gap-3">
                                <span>
                                    Showing {paginatedPaidCommissions.length === 0 ? 0 : (paidPage - 1) * paidPerPage + 1} to {Math.min(paidPage * paidPerPage, filteredPaidCommissions.length)} of {filteredPaidCommissions.length} records
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">Per page:</span>
                                    <select
                                        value={paidPerPage}
                                        onChange={(e) => {
                                            setPaidPerPage(Number(e.target.value));
                                            setPaidPage(1);
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
                                    onClick={() => setPaidPage(p => Math.max(1, p - 1))}
                                    disabled={paidPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPaidPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPaidPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === paidPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPaidPage(p => Math.min(totalPaidPages, p + 1))}
                                    disabled={paidPage === totalPaidPages}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 7: COMMISSION RECALCULATE (MATCHING ERP AgentCommissionRecalculation.aspx) */}
            {activeTab === 'commission-recalculate' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Top Search & Filter Bar (Matching Paid Commission full-width responsive grid) */}
                    <div className="bg-white rounded-xl border border-brand-border p-4 sm:p-5 shadow-sm space-y-4">
                        {/* Row 1: 4 columns across full width */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 items-end w-full">
                            {/* From Date */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">From Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={recalcFromDate}
                                        onChange={(e) => setRecalcFromDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* To Date */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">To Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={recalcToDate}
                                        onChange={(e) => setRecalcToDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Insurance Company */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Insurance Company</span>
                                <div className="relative w-full">
                                    <select
                                        value={recalcCompany}
                                        onChange={(e) => {
                                            setRecalcCompany(e.target.value);
                                            setHasRecalcViewed(false);
                                            setSelectedRecalcIds([]);
                                            setRecalcPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none truncate"
                                    >
                                        <option value="">--Select Company--</option>
                                        {[
                                            'TATA AIG GENERAL INSURANCE CO. LTD',
                                            'LIBERTY GENERAL INSURANCE LIMITED',
                                            'SBI GENERAL INSURANCE COMPANY LIMITED',
                                            'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
                                            'HDFC ERGO GENERAL INSURANCE CO. LTD',
                                            'MAGMA HDI GENERAL INSURANCE COMPANY',
                                            'ICICI LOMBARD GENERAL INSURANCE CO. LTD',
                                            'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD'
                                        ].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Branch */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Branch</span>
                                <div className="relative w-full">
                                    <select
                                        value={recalcBranch}
                                        onChange={(e) => {
                                            setRecalcBranch(e.target.value);
                                            setHasRecalcViewed(false);
                                            setSelectedRecalcIds([]);
                                            setRecalcPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none"
                                    >
                                        <option value="">--Select Branch--</option>
                                        {['SANGLI', 'AKOLA', 'BARAMATI', 'PUNE', 'SATARA', 'SOLAPUR', 'KOLHAPUR', 'BEED', 'GOA'].map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Agent, Policy Type, and Action Buttons spanning full width */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 items-end w-full">
                            {/* Agent */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-5">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Agent</span>
                                <div className="relative w-full">
                                    <select
                                        value={recalcAgent}
                                        onChange={(e) => {
                                            setRecalcAgent(e.target.value);
                                            setHasRecalcViewed(false);
                                            setSelectedRecalcIds([]);
                                            setRecalcPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none truncate"
                                    >
                                        <option value="">--Select Agent--</option>
                                        {[
                                            'RUTURAJ PRAKASH JADHAV',
                                            'SHRIKRUSHNA SOPAN PATIL',
                                            'SHEKHAR MARUTI ANBHULE',
                                            'AAYUSH UMESH TIJARE',
                                            'SATARA STANDARD AGENT',
                                            'AJITKUMAR PRABHAKAR KATULE'
                                        ].map(a => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Policy Type */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-4">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Policy Type</span>
                                <div className="relative w-full">
                                    <select
                                        value={recalcPolicyType}
                                        onChange={(e) => {
                                            setRecalcPolicyType(e.target.value);
                                            setHasRecalcViewed(false);
                                            setSelectedRecalcIds([]);
                                            setRecalcPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none truncate"
                                    >
                                        <option value="">--Select Policy Type--</option>
                                        {[
                                            'PRIVATE CAR',
                                            'GCV 3500 - 7000 GVW',
                                            'MISC-D-TRACTOR',
                                            'GCV > 40001 - 45000 GVW',
                                            'GCV ABOVE 40001 GVW',
                                            'TWO WHEELER'
                                        ].map(pt => (
                                            <option key={pt} value={pt}>{pt}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Action Buttons: View & Reset */}
                            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-3 w-full">
                                <button
                                    type="button"
                                    onClick={handleRecalcView}
                                    className="flex-1 h-[38px] px-5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <span>View</span>
                                </button>
                                {(recalcCompany || recalcBranch || recalcAgent || recalcPolicyType || recalcSearchQuery || hasRecalcViewed) && (
                                    <button
                                        type="button"
                                        onClick={handleRecalcReset}
                                        className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                        title="Reset Filters"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Commission Recalculate Table Card */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Top Toolbar */}
                        <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            {/* Search Input on Left */}
                            <div className="relative w-72 sm:w-80 md:w-[350px] h-[38px]">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                <input
                                    type="text"
                                    value={recalcSearchQuery}
                                    onChange={(e) => {
                                        setRecalcSearchQuery(e.target.value);
                                        setRecalcPage(1);
                                    }}
                                    placeholder="Search Reg No, Agent, Company..."
                                    className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                />
                                {recalcSearchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRecalcSearchQuery('');
                                            setRecalcPage(1);
                                        }}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Submit Action Button on Right (Moved to right side) */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleSubmitRecalculate}
                                    disabled={selectedRecalcIds.length === 0}
                                    className="h-[38px] px-5 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <Check size={14} />
                                    <span>Submit {selectedRecalcIds.length > 0 && `(${selectedRecalcIds.length})`}</span>
                                </button>
                            </div>
                        </div>

                        {/* Data Table with all 34 Columns from ERP (Screenshot Reference) */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[420px]">
                            <table className="w-full text-left border-collapse min-w-[3400px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-bold uppercase border-b border-brand-border whitespace-nowrap tracking-wider">
                                        <th className="py-3 px-3 text-center w-[45px] sticky left-0 bg-brand-lightbg z-10 border-r border-brand-border/60">
                                            <input
                                                type="checkbox"
                                                checked={paginatedRecalcCommissions.length > 0 && paginatedRecalcCommissions.every(i => selectedRecalcIds.includes(i.id))}
                                                onChange={handleToggleSelectAllRecalc}
                                                className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                            />
                                        </th>
                                        <th className="py-3 px-3.5 sticky left-[45px] bg-brand-lightbg z-10 border-r border-brand-border/60">REG. NO.</th>
                                        <th className="py-3 px-3.5">BRANCH</th>
                                        <th className="py-3 px-3.5">AGENT NAME</th>
                                        <th className="py-3 px-3.5">PRODUCT TYPE</th>
                                        <th className="py-3 px-3.5">POLICYTYPE</th>
                                        <th className="py-3 px-3.5">INSURANCECOMPANY</th>
                                        <th className="py-3 px-3.5 text-right">AMOUNT</th>
                                        <th className="py-3 px-3.5">PAYMENT TYPE</th>
                                        <th className="py-3 px-3.5">PAYMENTDETAILS</th>
                                        <th className="py-3 px-3.5 text-right">PREMIUM AMOUNT</th>
                                        <th className="py-3 px-3.5">CUSTOMER NAME</th>
                                        <th className="py-3 px-3.5">REFERENCETYPE</th>
                                        <th className="py-3 px-3.5 text-right">OD DISCOUNT(%)</th>
                                        <th className="py-3 px-3.5 text-right">TP PERMIUM</th>
                                        <th className="py-3 px-3.5 text-right">OD PERMIUM</th>
                                        <th className="py-3 px-3.5 text-right">NET PERMIUM</th>
                                        <th className="py-3 px-3.5 font-mono">POLICY NO</th>
                                        <th className="py-3 px-3.5">DATE</th>
                                        <th className="py-3 px-3.5 text-right">AGENT GRID TP(%)</th>
                                        <th className="py-3 px-3.5 text-right">AGENT COMM AMT TP</th>
                                        <th className="py-3 px-3.5 text-right">TDS AMT TP</th>
                                        <th className="py-3 px-3.5 text-right">NET COMMISSION TP</th>
                                        <th className="py-3 px-3.5 text-right">AGENT GRID OD(%)</th>
                                        <th className="py-3 px-3.5 text-right">AGENT COMM AMT OD</th>
                                        <th className="py-3 px-3.5 text-right">TDS AMT OD</th>
                                        <th className="py-3 px-3.5 text-right">NET COMMISSION OD</th>
                                        <th className="py-3 px-3.5 text-right">AGENT GRID NET(%)</th>
                                        <th className="py-3 px-3.5 text-right">AGENT COMM AMT NET</th>
                                        <th className="py-3 px-3.5 text-right">TDS AMT NET</th>
                                        <th className="py-3 px-3.5">MANUFACTURING YEAR</th>
                                        <th className="py-3 px-3.5 text-right">NET COMMISSION NET</th>
                                        <th className="py-3 px-3.5">FUELTYPE</th>
                                        <th className="py-3 px-3.5">BROKER NAME</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[12px]">
                                    {!hasRecalcViewed || !isRecalcFormFilled ? (
                                        <tr>
                                            <td colSpan={34} className="py-16 text-center text-slate-400 font-medium">
                                                Please select all required form fields above and click View to load recalculation entries.
                                            </td>
                                        </tr>
                                    ) : paginatedRecalcCommissions.length === 0 ? (
                                        <tr>
                                            <td colSpan={34} className="py-12 text-center text-slate-400 font-medium">
                                                No commission recalculation records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedRecalcCommissions.map((row) => {
                                            const isSelected = selectedRecalcIds.includes(row.id);
                                            return (
                                                <tr
                                                    key={row.id}
                                                    className={`transition-colors h-[48px] ${isSelected ? 'bg-blue-50/70 hover:bg-blue-100/60' : 'bg-white hover:bg-blue-50/40'
                                                        }`}
                                                >
                                                    <td className={`py-2 px-3 text-center sticky left-0 z-10 border-r border-slate-100 ${isSelected ? 'bg-[#EEF6FF]' : 'bg-white'}`}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleToggleRecalc(row.id)}
                                                            className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                                        />
                                                    </td>
                                                    <td className={`py-2.5 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap sticky left-[45px] z-10 border-r border-slate-100 ${isSelected ? 'bg-[#EEF6FF]' : 'bg-white'}`}>
                                                        {row.regNo}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-semibold text-brand-navy whitespace-nowrap">
                                                        {row.branch}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                                                        {row.agentName}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                                                            {row.productType}
                                                        </span>
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">
                                                        {row.policyType}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-medium text-slate-800 max-w-[220px] truncate" title={row.insuranceCompany}>
                                                        {row.insuranceCompany}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-600 whitespace-nowrap">
                                                        {row.amount}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-600 text-xs whitespace-nowrap">
                                                        {row.paymentType}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-500 whitespace-nowrap">
                                                        {row.paymentDetails}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                        {row.premiumAmount.toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-bold text-brand-navy whitespace-nowrap">
                                                        {row.customerName}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-600 font-semibold text-xs whitespace-nowrap">
                                                        {row.referenceType}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-700 whitespace-nowrap">
                                                        {row.odDiscount}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-700 whitespace-nowrap">
                                                        {row.tpPremium.toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-700 whitespace-nowrap">
                                                        {row.odPremium.toLocaleString('en-IN', { minimumFractionDigits: row.odPremium % 1 !== 0 ? 2 : 0 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                                                        {row.netPremium.toLocaleString('en-IN', { minimumFractionDigits: row.netPremium % 1 !== 0 ? 2 : 0 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-mono text-xs text-brand-primary whitespace-nowrap" title={row.policyNo}>
                                                        {row.policyNo}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                                                        {row.date}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.agentGridTp}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.agentCommAmtTp}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.tdsAmtTp}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.netCommTp}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.agentGridOd}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.agentCommAmtOd}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.tdsAmtOd}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.netCommOd}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono font-semibold text-brand-primary whitespace-nowrap">
                                                        {row.agentGridNet}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                                                        {row.agentCommAmtNet.toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-rose-600 whitespace-nowrap">
                                                        {row.tdsAmtNet}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-600 text-xs whitespace-nowrap font-mono">
                                                        {row.manufacturingYear}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono font-bold text-emerald-600 whitespace-nowrap">
                                                        ₹ {row.netCommNet.toLocaleString('en-IN')}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
                                                            {row.fuelType}
                                                        </span>
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap font-medium">
                                                        {row.brokerName}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Standard Pagination Controls */}
                        <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                            <div className="flex items-center gap-3">
                                <span>
                                    Showing {paginatedRecalcCommissions.length === 0 ? 0 : (recalcPage - 1) * recalcPerPage + 1} to {Math.min(recalcPage * recalcPerPage, filteredRecalcCommissions.length)} of {filteredRecalcCommissions.length} records
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">Per page:</span>
                                    <select
                                        value={recalcPerPage}
                                        onChange={(e) => {
                                            setRecalcPerPage(Number(e.target.value));
                                            setRecalcPage(1);
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
                                    onClick={() => setRecalcPage(p => Math.max(1, p - 1))}
                                    disabled={recalcPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalRecalcPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setRecalcPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === recalcPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setRecalcPage(p => Math.min(totalRecalcPages, p + 1))}
                                    disabled={recalcPage === totalRecalcPages}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 8: ACCOUNT REPORT (MATCHING ERP reliable-erp.com/Clerk/Rpt_AccountDetails.aspx) */}
            {activeTab === 'account-report' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Top Search & Filter Bar */}
                    <div className="bg-white rounded-xl border border-brand-border p-4 sm:p-5 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 items-end w-full">
                            {/* From Date */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-3">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">From Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={rptFromDate}
                                        onChange={(e) => setRptFromDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* To Date */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-3">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">To Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={rptToDate}
                                        onChange={(e) => setRptToDate(e.target.value)}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Branch Filter */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-2">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Branch</span>
                                <div className="relative w-full">
                                    <select
                                        value={rptBranch}
                                        onChange={(e) => {
                                            setRptBranch(e.target.value);
                                            setRptPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none"
                                    >
                                        <option value="">--All Branches--</option>
                                        {['BARAMATI', 'PUNE', 'SOLAPUR', 'AKOLA', 'SANGLI', 'SATARA', 'KOLHAPUR', 'BEED', 'GOA'].map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Action Buttons: View, Export To Excel, Reset */}
                            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-4 w-full">
                                <button
                                    type="button"
                                    onClick={() => showToast('Account Report records refreshed!')}
                                    className="flex-1 h-[38px] px-4 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <span>View</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => showToast('Exporting Account Report to Excel...')}
                                    className="flex-1 h-[38px] px-3.5 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-colors cursor-pointer border-none flex items-center justify-center gap-1.5 whitespace-nowrap"
                                >
                                    <Download size={14} />
                                    <span>Export To Excel</span>
                                </button>
                                {(rptBranch || rptSearchQuery || rptTxnType) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRptBranch('');
                                            setRptTxnType('');
                                            setRptSearchQuery('');
                                            setRptPage(1);
                                        }}
                                        className="h-[38px] px-3 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                        title="Reset Filters"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Account Report Table Card */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Top Toolbar */}
                        <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            {/* Merged Single Search Bar */}
                            <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                <input
                                    type="text"
                                    value={rptSearchQuery}
                                    onChange={(e) => {
                                        setRptSearchQuery(e.target.value);
                                        setRptPage(1);
                                    }}
                                    placeholder="Search Customer Name, Reg No, Doc No, Policy No..."
                                    className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                />
                                {rptSearchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setRptSearchQuery('');
                                            setRptPage(1);
                                        }}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Data Table with all 14 Columns */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[420px]">
                            <table className="w-full text-left border-collapse min-w-[1900px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[11px] font-bold uppercase border-b border-brand-border whitespace-nowrap tracking-wider">
                                        <th className="py-3 px-3.5 font-mono">DOC NO</th>
                                        <th className="py-3 px-3.5">TRANSACTION TYPE</th>
                                        <th className="py-3 px-3.5">ACCOUNT DATE</th>
                                        <th className="py-3 px-3.5">LEDGER NAME</th>
                                        <th className="py-3 px-3.5 text-right">AMOUNT</th>
                                        <th className="py-3 px-3.5">NARRATION</th>
                                        <th className="py-3 px-3.5">AGENT NAME</th>
                                        <th className="py-3 px-3.5">BRANCH NAME</th>
                                        <th className="py-3 px-3.5 font-mono">POLICY NO</th>
                                        <th className="py-3 px-3.5">CUSTOMER NAME</th>
                                        <th className="py-3 px-3.5">REGISTRATION NO.</th>
                                        <th className="py-3 px-3.5">PAYMENT TYPE</th>
                                        <th className="py-3 px-3.5">NARRATION2</th>
                                        <th className="py-3 px-3.5">LEDGER TYPE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[12px]">
                                    {paginatedAccountReports.length === 0 ? (
                                        <tr>
                                            <td colSpan={14} className="py-12 text-center text-slate-400 font-medium">
                                                No account report records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedAccountReports.map((row) => (
                                            <tr key={row.id} className="transition-colors h-[48px] bg-white hover:bg-blue-50/40">
                                                <td className="py-2.5 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                                                    {row.docNo}
                                                </td>
                                                <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${row.transactionType === 'PAYMENT'
                                                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                                            : row.transactionType === 'RECEIPT'
                                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                        }`}>
                                                        {row.transactionType}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                                                    {row.accountDate}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-semibold text-brand-navy whitespace-nowrap">
                                                    {row.ledgerName}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                                                    {row.amount.toLocaleString('en-IN', { minimumFractionDigits: row.amount % 1 !== 0 ? 2 : 0 })}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-600 text-xs max-w-[280px] truncate whitespace-nowrap" title={row.narration}>
                                                    {row.narration}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                                                    {row.agentName}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-semibold text-slate-700 whitespace-nowrap">
                                                    {row.branchName}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-mono text-xs text-brand-primary whitespace-nowrap" title={row.policyNo}>
                                                    {row.policyNo}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-bold text-brand-navy whitespace-nowrap">
                                                    {row.customerName}
                                                </td>
                                                <td className="py-2.5 px-3.5 whitespace-nowrap font-mono">
                                                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                                                        {row.registrationNo}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap font-medium">
                                                    {row.paymentType}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-500 text-xs max-w-[240px] truncate whitespace-nowrap" title={row.narration2}>
                                                    {row.narration2}
                                                </td>
                                                <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                                                        {row.ledgerType}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                            <div className="flex items-center gap-3">
                                <span>
                                    Showing {paginatedAccountReports.length === 0 ? 0 : (rptPage - 1) * rptPerPage + 1} to {Math.min(rptPage * rptPerPage, filteredAccountReports.length)} of {filteredAccountReports.length} records
                                </span>
                                <div className="flex items-center gap-1.5 ml-2">
                                    <span className="text-slate-500 font-medium">Per page:</span>
                                    <select
                                        value={rptPerPage}
                                        onChange={(e) => {
                                            setRptPerPage(Number(e.target.value));
                                            setRptPage(1);
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
                                    onClick={() => setRptPage(p => Math.max(1, p - 1))}
                                    disabled={rptPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalRptPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setRptPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === rptPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setRptPage(p => Math.min(totalRptPages, p + 1))}
                                    disabled={rptPage === totalRptPages}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 10: PAID ENTRY RECALCULATION (reliable-erp.com/Clerk/Adm_CutNPayRecalculation.aspx) */}
            {activeTab === 'paid-entry-recalc' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Top Search & Filter Bar */}
                    <div className="bg-white rounded-xl border border-brand-border p-4 sm:p-5 shadow-sm space-y-4">
                        {/* Row 1: From Date, To Date, Insurance Company, Branch, Agent */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-end w-full">
                            {/* From Date */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">From Date *</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={paidRecalcFromDate}
                                        onChange={(e) => {
                                            setPaidRecalcFromDate(e.target.value);
                                            setHasPaidRecalcViewed(false);
                                            setSelectedPaidRecalcIds([]);
                                        }}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* To Date */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">To Date *</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={paidRecalcToDate}
                                        onChange={(e) => {
                                            setPaidRecalcToDate(e.target.value);
                                            setHasPaidRecalcViewed(false);
                                            setSelectedPaidRecalcIds([]);
                                        }}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Insurance Company */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Insurance Company *</span>
                                <div className="relative w-full">
                                    <select
                                        value={paidRecalcCompany}
                                        onChange={(e) => {
                                            setPaidRecalcCompany(e.target.value);
                                            setHasPaidRecalcViewed(false);
                                            setSelectedPaidRecalcIds([]);
                                            setPaidRecalcPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none truncate"
                                    >
                                        <option value="">--Select Company--</option>
                                        {[
                                            'ROYAL SUNDARAM GENERAL INSURANCE CO. LTD',
                                            'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
                                            'TATA AIG GENERAL INSURANCE CO. LTD',
                                            'INDUSIND GENERAL INSURANCE CO. LTD',
                                            'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
                                            'HDFC ERGO GENERAL INSURANCE CO. LTD',
                                            'ICICI LOMBARD GENERAL INSURANCE CO. LTD',
                                            'SBI GENERAL INSURANCE COMPANY LIMITED',
                                            'LIBERTY GENERAL INSURANCE LIMITED',
                                            'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD'
                                        ].map(c => (
                                            <option key={c} value={c}>{c}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Branch */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Branch *</span>
                                <div className="relative w-full">
                                    <select
                                        value={paidRecalcBranch}
                                        onChange={(e) => {
                                            setPaidRecalcBranch(e.target.value);
                                            setHasPaidRecalcViewed(false);
                                            setSelectedPaidRecalcIds([]);
                                            setPaidRecalcPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none"
                                    >
                                        <option value="">--Select Branch--</option>
                                        {['PUNE', 'SANGLI', 'AKOLA', 'BARAMATI', 'SATARA', 'SOLAPUR', 'KOLHAPUR', 'BEED', 'GOA'].map(b => (
                                            <option key={b} value={b}>{b}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Agent */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Agent *</span>
                                <div className="relative w-full">
                                    <select
                                        value={paidRecalcAgent}
                                        onChange={(e) => {
                                            setPaidRecalcAgent(e.target.value);
                                            setHasPaidRecalcViewed(false);
                                            setSelectedPaidRecalcIds([]);
                                            setPaidRecalcPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none truncate"
                                    >
                                        <option value="">--Select Agent--</option>
                                        {[
                                            'PARMESHWAR VENKATRAO BIRADAR',
                                            'RUTURAJ PRAKASH JADHAV',
                                            'SHRIKRUSHNA SOPAN PATIL',
                                            'SHEKHAR MARUTI ANBHULE',
                                            'AAYUSH UMESH TIJARE',
                                            'SATARA STANDARD AGENT',
                                            'AJITKUMAR PRABHAKAR KATULE'
                                        ].map(a => (
                                            <option key={a} value={a}>{a}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Policy Type, View button, Reset button */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 items-end w-full">
                            {/* Policy Type */}
                            <div className="flex flex-col gap-1.5 sm:col-span-1 lg:col-span-4">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Policy Type *</span>
                                <div className="relative w-full">
                                    <select
                                        value={paidRecalcPolicyType}
                                        onChange={(e) => {
                                            setPaidRecalcPolicyType(e.target.value);
                                            setHasPaidRecalcViewed(false);
                                            setSelectedPaidRecalcIds([]);
                                            setPaidRecalcPage(1);
                                        }}
                                        className="w-full h-[38px] px-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs cursor-pointer appearance-none truncate"
                                    >
                                        <option value="">--Select Policy Type--</option>
                                        {[
                                            'GCV 0-2300 GVW',
                                            'PRIVATE CAR',
                                            'GCV 7501 - 12000 GVW',
                                            'PCV - TAXI 4 + 1',
                                            'EMPLOYEE BUS ABOVE 12 SEATERS',
                                            'GCV 12001 - 20000 GVW',
                                            'GCV 3500 - 7000 GVW',
                                            'MISC-D-TRACTOR',
                                            'GCV > 40001 - 45000 GVW',
                                            'GCV ABOVE 40001 GVW',
                                            'TWO WHEELER'
                                        ].map(pt => (
                                            <option key={pt} value={pt}>{pt}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            {/* Action Buttons: View & Reset */}
                            <div className="flex items-center gap-2 sm:col-span-2 lg:col-span-3 w-full">
                                <button
                                    type="button"
                                    onClick={handlePaidRecalcView}
                                    className="flex-1 h-[38px] px-5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <span>View</span>
                                </button>
                                {(paidRecalcCompany || paidRecalcBranch || paidRecalcAgent || paidRecalcPolicyType || paidRecalcSearchQuery || hasPaidRecalcViewed) && (
                                    <button
                                        type="button"
                                        onClick={handlePaidRecalcReset}
                                        className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                        title="Reset Filters"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Paid Entry Recalculation Table Card */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Top Toolbar */}
                        <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            {/* Search Input on Left */}
                            <div className="relative w-72 sm:w-80 md:w-[350px] h-[38px]">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                <input
                                    type="text"
                                    value={paidRecalcSearchQuery}
                                    onChange={(e) => {
                                        setPaidRecalcSearchQuery(e.target.value);
                                        setPaidRecalcPage(1);
                                    }}
                                    placeholder="Search Reg No, Agent, Company, Policy..."
                                    className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                />
                                {paidRecalcSearchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPaidRecalcSearchQuery('');
                                            setPaidRecalcPage(1);
                                        }}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Submit Action Button on Right */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleSubmitPaidRecalc}
                                    disabled={selectedPaidRecalcIds.length === 0}
                                    className="h-[38px] px-5 bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <Check size={14} />
                                    <span>Submit {selectedPaidRecalcIds.length > 0 && `(${selectedPaidRecalcIds.length})`}</span>
                                </button>
                            </div>
                        </div>

                        {/* Data Table with all 34 Columns from ERP Adm_CutNPayRecalculation.aspx */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                            <table className="w-full text-left border-collapse min-w-[3400px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-3 text-center w-[45px] sticky left-0 z-20 bg-brand-lightbg text-brand-navy border-r border-brand-border">
                                            <input
                                                type="checkbox"
                                                checked={paginatedPaidRecalcRecords.length > 0 && paginatedPaidRecalcRecords.every(i => selectedPaidRecalcIds.includes(i.id))}
                                                onChange={handleToggleSelectAllPaidRecalc}
                                                className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                            />
                                        </th>
                                        <th className="py-3 px-3.5 sticky left-[45px] z-20 bg-brand-lightbg text-brand-navy border-r border-brand-border">REG. NO.</th>
                                        <th className="py-3 px-3.5">BRANCH</th>
                                        <th className="py-3 px-3.5">AGENT NAME</th>
                                        <th className="py-3 px-3.5">PRODUCT TYPE</th>
                                        <th className="py-3 px-3.5">POLICYTYPE</th>
                                        <th className="py-3 px-3.5">INSURANCECOMPANY</th>
                                        <th className="py-3 px-3.5 text-right">AMOUNT (₹)</th>
                                        <th className="py-3 px-3.5">PAYMENT TYPE</th>
                                        <th className="py-3 px-3.5">PAYMENTDETAILS</th>
                                        <th className="py-3 px-3.5 text-right">PREMIUM AMOUNT (₹)</th>
                                        <th className="py-3 px-3.5">CUSTOMER NAME</th>
                                        <th className="py-3 px-3.5">REFERENCETYPE</th>
                                        <th className="py-3 px-3.5 text-right">OD DISCOUNT(%)</th>
                                        <th className="py-3 px-3.5 text-right">TP PERMIUM (₹)</th>
                                        <th className="py-3 px-3.5 text-right">OD PERMIUM (₹)</th>
                                        <th className="py-3 px-3.5 text-right">NET PERMIUM (₹)</th>
                                        <th className="py-3 px-3.5">POLICY NO</th>
                                        <th className="py-3 px-3.5">DATE</th>
                                        <th className="py-3 px-3.5 text-right">AGENT GRID TP(%)</th>
                                        <th className="py-3 px-3.5 text-right">AGENT COMM AMT TP (₹)</th>
                                        <th className="py-3 px-3.5 text-right">TDS AMT TP (₹)</th>
                                        <th className="py-3 px-3.5 text-right">NET COMMISSION TP (₹)</th>
                                        <th className="py-3 px-3.5 text-right">AGENT GRID OD(%)</th>
                                        <th className="py-3 px-3.5 text-right">AGENT COMM AMT OD (₹)</th>
                                        <th className="py-3 px-3.5 text-right">TDS AMT OD (₹)</th>
                                        <th className="py-3 px-3.5 text-right">NET COMMISSION OD (₹)</th>
                                        <th className="py-3 px-3.5 text-right">AGENT GRID NET(%)</th>
                                        <th className="py-3 px-3.5 text-right">AGENT COMM AMT NET (₹)</th>
                                        <th className="py-3 px-3.5 text-right">TDS AMT NET (₹)</th>
                                        <th className="py-3 px-3.5">MANUFACTURING YEAR</th>
                                        <th className="py-3 px-3.5 text-right">NET COMMISSION NET (₹)</th>
                                        <th className="py-3 px-3.5">FUELTYPE</th>
                                        <th className="py-3 px-3.5">BROKER NAME</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[12px]">
                                    {!hasPaidRecalcViewed || !isPaidRecalcFormFilled ? (
                                        <tr>
                                            <td colSpan={34} className="py-16 text-center text-slate-400 font-medium">
                                                Please select all required form fields above and click View to load recalculation entries.
                                            </td>
                                        </tr>
                                    ) : paginatedPaidRecalcRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan={34} className="py-12 text-center text-slate-400 font-medium">
                                                No paid entry recalculation records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedPaidRecalcRecords.map((row) => {
                                            const isSelected = selectedPaidRecalcIds.includes(row.id);
                                            return (
                                                <tr
                                                    key={row.id}
                                                    className={`hover:bg-blue-50/40 transition-colors h-[48px] ${isSelected ? 'bg-[#EEF6FF]' : 'bg-white'
                                                        }`}
                                                >
                                                    <td className={`py-2 px-3 text-center sticky left-0 z-10 border-r border-slate-100 ${isSelected ? 'bg-[#EEF6FF]' : 'bg-white'}`}>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleTogglePaidRecalc(row.id)}
                                                            className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                                        />
                                                    </td>
                                                    <td className={`py-2.5 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap sticky left-[45px] z-10 border-r border-slate-100 ${isSelected ? 'bg-[#EEF6FF]' : 'bg-white'}`}>
                                                        {row.regNo}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-semibold text-brand-navy whitespace-nowrap">
                                                        {row.branch}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                                                        {row.agentName}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap text-slate-700">
                                                        {row.productType}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap text-slate-700 font-medium">
                                                        {row.policyType}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap text-slate-800 font-medium">
                                                        {row.insuranceCompany}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 whitespace-nowrap">
                                                        ₹ {row.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap text-slate-700 font-medium">
                                                        {row.paymentType}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-600 font-mono text-xs whitespace-nowrap">
                                                        {row.paymentDetails}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                        ₹ {row.premiumAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                                                        {row.customerName}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap text-slate-700 font-medium">
                                                        {row.referenceType}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.odDiscount}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 whitespace-nowrap">
                                                        ₹ {row.tpPremium.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 whitespace-nowrap">
                                                        ₹ {row.odPremium.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                        ₹ {row.netPremium.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-mono text-xs text-brand-primary whitespace-nowrap">
                                                        {row.policyNo}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">
                                                        {row.date}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.agentGridTp}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 whitespace-nowrap">
                                                        ₹ {row.agentCommAmtTp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-500 whitespace-nowrap">
                                                        ₹ {row.tdsAmtTp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-bold text-emerald-600 whitespace-nowrap">
                                                        ₹ {row.netCommTp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono text-slate-600 whitespace-nowrap">
                                                        {row.agentGridOd}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 whitespace-nowrap">
                                                        ₹ {row.agentCommAmtOd.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-500 whitespace-nowrap">
                                                        ₹ {row.tdsAmtOd.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-bold text-emerald-600 whitespace-nowrap">
                                                        ₹ {row.netCommOd.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-mono font-bold text-emerald-600 whitespace-nowrap">
                                                        {row.agentGridNet}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 whitespace-nowrap">
                                                        ₹ {row.agentCommAmtNet.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-medium text-slate-500 whitespace-nowrap">
                                                        ₹ {row.tdsAmtNet.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-600 text-xs whitespace-nowrap">
                                                        {row.manufacturingYear}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-right font-bold text-emerald-600 whitespace-nowrap">
                                                        ₹ {row.netCommNet.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap text-slate-700">
                                                        {row.fuelType}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-700 font-semibold whitespace-nowrap">
                                                        {row.brokerName}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Standard Pagination Controls */}
                        <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                            <div className="flex items-center gap-3">
                                <span>
                                    Showing {paginatedPaidRecalcRecords.length === 0 ? 0 : (paidRecalcPage - 1) * paidRecalcPerPage + 1} to {Math.min(paidRecalcPage * paidRecalcPerPage, filteredPaidRecalcRecords.length)} of {filteredPaidRecalcRecords.length} records
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">Per page:</span>
                                    <select
                                        value={paidRecalcPerPage}
                                        onChange={(e) => {
                                            setPaidRecalcPerPage(Number(e.target.value));
                                            setPaidRecalcPage(1);
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
                                    onClick={() => setPaidRecalcPage(p => Math.max(1, p - 1))}
                                    disabled={paidRecalcPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPaidRecalcPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setPaidRecalcPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === paidRecalcPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPaidRecalcPage(p => Math.min(totalPaidRecalcPages, p + 1))}
                                    disabled={paidRecalcPage === totalPaidRecalcPages}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: RETURN TO CASH APPROVAL (reliable-erp.com/Clerk/adm_returnToCashApproval.aspx) */}
            {activeTab === 'return-cash-approval' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Search Card matching Registration.tsx standard layout */}
                    <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-200/80">
                        {/* Blue Banner Header matching Registration page */}
                        <div className="bg-brand-primary text-white px-5 py-2 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-5">
                            <span className="mr-1 text-base font-serif">&raquo;</span>Return To Cash Approval
                        </div>

                        <div className="flex flex-wrap items-end gap-3 sm:gap-4 max-w-lg">
                            <div className="flex flex-col gap-1.5 flex-1 min-w-[240px]">
                                <label className="text-[13px] text-slate-700 font-normal">
                                    Registration No
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={returnCashRegNo}
                                        onChange={(e) => setReturnCashRegNo(e.target.value)}
                                        placeholder="Enter Registration No (e.g. 1237)..."
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleReturnCashView();
                                        }}
                                    />
                                    {returnCashRegNo && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReturnCashRegNo('');
                                                setHasReturnCashSearched(false);
                                            }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleReturnCashView}
                                className="h-[38px] px-6 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5 shrink-0"
                            >
                                <span>View</span>
                            </button>
                            {returnCashRegNo && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setReturnCashRegNo('');
                                        setHasReturnCashSearched(false);
                                    }}
                                    className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                >
                                    Reset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Data Table Card matching our design system */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[220px]">
                            <table className="w-full text-left border-collapse min-w-[1200px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-3.5 text-center w-[60px]">SR.NO.</th>
                                        <th className="py-3 px-3.5">DATE</th>
                                        <th className="py-3 px-3.5">CUSTOMER NAME</th>
                                        <th className="py-3 px-3.5">POLICY NO</th>
                                        <th className="py-3 px-3.5">REG. NO.</th>
                                        <th className="py-3 px-3.5">PAYMENT MODE</th>
                                        <th className="py-3 px-3.5 text-right">AGENT COMM AMT (₹)</th>
                                        <th className="py-3 px-3.5 text-right">AMOUNT (₹)</th>
                                        <th className="py-3 px-3.5">AGENT NAME</th>
                                        <th className="py-3 px-3.5">EMP NAME</th>
                                        <th className="py-3 px-3.5">REFERENCE TYPE</th>
                                        <th className="py-3 px-3.5 text-center">STATUS</th>
                                        <th className="py-3 px-3.5 text-center w-[130px]">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[12px]">
                                    {!hasReturnCashSearched || filteredReturnCashRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan={13} className="py-12 text-center text-slate-500 font-bold uppercase tracking-wider text-xs bg-slate-50/50">
                                                NO DATA FOUND
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredReturnCashRecords.map((item, idx) => (
                                            <tr key={item.id} className="hover:bg-blue-50/40 h-[48px] transition-colors bg-white">
                                                <td className="py-2.5 px-3.5 text-center text-slate-500 font-mono">
                                                    {idx + 1}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">
                                                    {item.date}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                                                    {item.customerName}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-mono text-xs text-brand-primary whitespace-nowrap">
                                                    {item.policyNo}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-mono font-bold text-brand-navy whitespace-nowrap">
                                                    {item.regNo}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-semibold text-slate-700 text-xs whitespace-nowrap">
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                                                        {item.paymentMode}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-3.5 text-right font-medium text-slate-700 whitespace-nowrap">
                                                    ₹ {item.agentCommAmt.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                    ₹ {item.amount.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-800 whitespace-nowrap">
                                                    {item.agentName}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">
                                                    {item.empName}
                                                </td>
                                                <td className="py-2.5 px-3.5 font-semibold text-brand-navy text-xs whitespace-nowrap">
                                                    {item.referenceType}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${item.status === 'RETURNED TO CASH APPROVAL'
                                                            ? 'bg-amber-100 text-amber-800'
                                                            : 'bg-emerald-100 text-emerald-800'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleReturnToCashApproval(item.id, item.regNo)}
                                                        disabled={item.status === 'RETURNED TO CASH APPROVAL'}
                                                        className="px-3 py-1.5 bg-[#00897B] hover:bg-[#00796B] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-lg shadow-xs transition-all cursor-pointer border-none flex items-center justify-center gap-1 mx-auto"
                                                        title="Return this entry to Cash Approval"
                                                    >
                                                        <RotateCcw size={12} />
                                                        <span>Return</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: CASH BACK APPROVAL (reliable-erp.com/Clerk/CashBackAmtApproval.aspx) */}
            {activeTab === 'cashback-approval' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Cash Back Approval Table Card (Matching Paid Commission style with merged top searchbar) */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Top Toolbar with Merged Searchbar & Summary Badges */}
                        <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Merged Search Input */}
                                <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                    <input
                                        type="text"
                                        value={cashbackSearchQuery}
                                        onChange={(e) => {
                                            setCashbackSearchQuery(e.target.value);
                                            setCashbackPage(1);
                                        }}
                                        placeholder="Search Registration No, Executive, Customer..."
                                        className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                    />
                                    {cashbackSearchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setCashbackSearchQuery('');
                                                setCashbackPage(1);
                                            }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Summary Badges */}
                                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-[6px]">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Count :-</span>
                                        <span className="text-brand-primary font-bold text-sm">{totalCashbackCount}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Amount :-</span>
                                        <span className="text-emerald-600 font-bold text-sm">₹ {totalCashbackAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Export & Reset Buttons */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleExportCashback}
                                    className="h-[38px] px-5 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <Download size={14} />
                                    <span>Export</span>
                                </button>
                                {cashbackSearchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setCashbackSearchQuery('');
                                            setCashbackPage(1);
                                        }}
                                        className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                            <table className="w-full text-left border-collapse min-w-[1500px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-3.5 text-center w-[50px]">SR</th>
                                        <th className="py-3 px-3.5">TRANSDATE</th>
                                        <th className="py-3 px-3.5">CASHBACKDATE</th>
                                        <th className="py-3 px-3.5">REGISTRATIONNO</th>
                                        <th className="py-3 px-3.5">CUSTOMER NAME</th>
                                        <th className="py-3 px-3.5">SALES EXECUTIVE</th>
                                        <th className="py-3 px-3.5">POLICYNO</th>
                                        <th className="py-3 px-3.5">INSURANCECOMPANY</th>
                                        <th className="py-3 px-3.5">PRODUCTTYPE</th>
                                        <th className="py-3 px-3.5">POLICYTYPE</th>
                                        <th className="py-3 px-3.5 text-right">NETPERMIUM (₹)</th>
                                        <th className="py-3 px-3.5">PAYMENTTYPE</th>
                                        <th className="py-3 px-3.5 text-right">CASHBACKAMT (₹)</th>
                                        <th className="py-3 px-3.5 text-center w-[110px]">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[12px]">
                                    {paginatedCashbackRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan={14} className="py-12 text-center text-slate-400 font-medium">
                                                No cash back approval records found.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedCashbackRecords.map((item, idx) => (
                                            <tr key={item.id} className="hover:bg-blue-50/40 transition-colors h-[48px] bg-white">
                                                <td className="py-2.5 px-3.5 text-center text-slate-500 font-mono">
                                                    {(cashbackPage - 1) * cashbackPerPage + idx + 1}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">{item.transDate}</td>
                                                <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">{item.cashbackDate}</td>
                                                <td className="py-2.5 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">{item.registrationNo}</td>
                                                <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">{item.customerName}</td>
                                                <td className="py-2.5 px-3.5 text-slate-800 font-semibold whitespace-nowrap">{item.salesExecutive}</td>
                                                <td className="py-2.5 px-3.5 font-mono text-xs text-brand-navy whitespace-nowrap">{item.policyNo}</td>
                                                <td className="py-2.5 px-3.5 text-slate-700 font-medium whitespace-nowrap">{item.insuranceCompany}</td>
                                                <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                                                        {item.productType}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">{item.policyType}</td>
                                                <td className="py-2.5 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                    ₹ {item.netPremium.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                        {item.paymentType}
                                                    </span>
                                                </td>
                                                <td className="py-2.5 px-3.5 text-right font-bold text-emerald-600 whitespace-nowrap">
                                                    ₹ {item.cashbackAmt.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                                                    {item.status === 'APPROVED' ? (
                                                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                                            APPROVED
                                                        </span>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleApproveCashback(item.id, item.registrationNo)}
                                                            className="px-3 py-1 bg-brand-primary hover:bg-[#1D4ED8] text-white font-bold text-[11px] rounded shadow-xs transition-all cursor-pointer border-none flex items-center justify-center gap-1 mx-auto"
                                                        >
                                                            <span>APPROVE</span>
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Standard Pagination Controls (Matching paid-commission) */}
                        <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                            <div className="flex items-center gap-3">
                                <span>
                                    Showing {paginatedCashbackRecords.length === 0 ? 0 : (cashbackPage - 1) * cashbackPerPage + 1} to {Math.min(cashbackPage * cashbackPerPage, filteredCashbackRecords.length)} of {filteredCashbackRecords.length} records
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">Per page:</span>
                                    <select
                                        value={cashbackPerPage}
                                        onChange={(e) => {
                                            setCashbackPerPage(Number(e.target.value));
                                            setCashbackPage(1);
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
                                    onClick={() => setCashbackPage(p => Math.max(1, p - 1))}
                                    disabled={cashbackPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalCashbackPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setCashbackPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === cashbackPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setCashbackPage(p => Math.min(totalCashbackPages, p + 1))}
                                    disabled={cashbackPage === totalCashbackPages}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: CHEQUE RECON (reliable-erp.com/Clerk/rptchequeDepositeStatusforbank.aspx) */}
            {activeTab === 'cheque-recon' && (
                <div className="tab-transition-wrapper space-y-5">
                    {/* Sub-tab Navigation (RA Premium Cheque vs Customer Cheque) */}
                    <div className="flex items-center justify-center w-full">
                        <div className="inline-flex p-1.5 bg-slate-100 rounded-xl border border-brand-border shadow-xs w-full sm:w-auto">
                            <button
                                type="button"
                                onClick={() => {
                                    setChequeReconType('RA');
                                    setSelectedChequeReconIds([]);
                                    setChequeReconSearchQuery('');
                                    setChequeReconPage(1);
                                }}
                                className={`px-8 sm:px-14 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer border-none text-center flex-1 sm:flex-initial ${chequeReconType === 'RA'
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                    }`}
                            >
                                RA Premium Cheque
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setChequeReconType('CUSTOMER');
                                    setSelectedChequeReconIds([]);
                                    setChequeReconSearchQuery('');
                                    setChequeReconPage(1);
                                }}
                                className={`px-8 sm:px-14 py-2.5 text-xs font-bold rounded-lg transition-all cursor-pointer border-none text-center flex-1 sm:flex-initial ${chequeReconType === 'CUSTOMER'
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900 bg-transparent'
                                    }`}
                            >
                                Customer Cheque
                            </button>
                        </div>
                    </div>

                    {/* Filter Card (Full Width Matching ERP »Customer cheque / »RA Premium Cheque Card) */}
                    <div className="bg-white rounded-xl border border-brand-border shadow-sm w-full overflow-hidden">
                        <div className="bg-brand-primary px-5 py-2.5 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                            <span>»</span>
                            <span>{chequeReconType === 'CUSTOMER' ? 'Customer cheque' : 'RA Premium Cheque'}</span>
                        </div>
                        <div className="p-4 sm:p-5 flex flex-wrap items-end gap-4 w-full">
                            <div className="flex flex-col gap-1.5 w-full sm:w-72">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">From Date</label>
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={chequeReconFromDate}
                                        onChange={(e) => {
                                            setChequeReconFromDate(e.target.value);
                                        }}
                                        placeholder="DD/MM/YYYY"
                                        className="w-full h-[38px] pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all shadow-xs"
                                    />
                                    <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleChequeReconSubmit}
                                className="h-[38px] px-8 bg-brand-primary hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5 shrink-0"
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    {/* Data Table Card (Matching Paid Commission styling) */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full animate-in fade-in duration-200">
                        {/* Table Top Toolbar with Merged Searchbar & Summary Badges */}
                        <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Merged Search Input */}
                                <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                    <input
                                        type="text"
                                        value={chequeReconSearchQuery}
                                        onChange={(e) => {
                                            setChequeReconSearchQuery(e.target.value);
                                            setChequeReconPage(1);
                                        }}
                                        placeholder="Search Customer, Reg No, Cheque No, Policy No..."
                                        className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                    />
                                    {chequeReconSearchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setChequeReconSearchQuery('');
                                                setChequeReconPage(1);
                                            }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Summary Badges */}
                                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-[6px] flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Count :-</span>
                                        <span className="text-brand-primary font-bold text-sm">{totalChequeCount}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Amount :-</span>
                                        <span className="text-emerald-600 font-bold text-sm">₹ {totalChequeAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                                    </div>
                                    {selectedChequeReconIds.length > 0 && (
                                        <>
                                            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                                            <div className="flex items-center gap-1.5 text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
                                                <span className="font-bold">Selected:</span>
                                                <span className="font-extrabold">{selectedChequeReconIds.length}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Right Actions: Deposit Selected, Export & Reset */}
                            <div className="flex items-center gap-2">
                                {selectedChequeReconIds.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={handleDepositSelectedCheques}
                                        className="h-[38px] px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                    >
                                        <CheckCircle2 size={14} />
                                        <span>Deposit ({selectedChequeReconIds.length})</span>
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={handleExportCheques}
                                    className="h-[38px] px-5 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <Download size={14} />
                                    <span>Export</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleChequeReconReset}
                                    className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[380px]">
                            <table className="w-full text-left border-collapse min-w-[1800px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-3.5 text-center w-[45px]">
                                            <input
                                                type="checkbox"
                                                checked={paginatedChequeRecords.length > 0 && paginatedChequeRecords.every(r => selectedChequeReconIds.includes(r.id))}
                                                onChange={handleToggleSelectAllCheques}
                                                className="w-4 h-4 rounded text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                                            />
                                        </th>
                                        <th className="py-3 px-3.5 text-center w-[50px]">SR</th>
                                        <th className="py-3 px-3.5">COMPANY NAME</th>
                                        <th className="py-3 px-3.5">BRANCH NAME</th>
                                        <th className="py-3 px-3.5">POLICY TYPE</th>
                                        <th className="py-3 px-3.5">POLICY NO</th>
                                        <th className="py-3 px-3.5">TRANS DATE</th>
                                        <th className="py-3 px-3.5">CUSTOMER NAME</th>
                                        <th className="py-3 px-3.5">REGISTRATION NO</th>
                                        <th className="py-3 px-3.5">AGENT NAME</th>
                                        <th className="py-3 px-3.5">EMPLOYEE NAME</th>
                                        <th className="py-3 px-3.5 text-right">PROPOSAL AMT (₹)</th>
                                        <th className="py-3 px-3.5">PAYMENTTYPE</th>
                                        <th className="py-3 px-3.5 font-mono">CHEQUE NO.</th>
                                        <th className="py-3 px-3.5">REMARK</th>
                                        <th className="py-3 px-3.5">CREATE USER</th>
                                        <th className="py-3 px-3.5">CREATE DATE</th>
                                        <th className="py-3 px-3.5">REFERENCE TYPE</th>
                                        <th className="py-3 px-3.5 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[12px]">
                                    {paginatedChequeRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan={19} className="py-12 text-center text-slate-400 font-medium">
                                                No cheque records found for the selected criteria.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedChequeRecords.map((item, idx) => {
                                            const isSelected = selectedChequeReconIds.includes(item.id);
                                            return (
                                                <tr
                                                    key={item.id}
                                                    className={`transition-colors h-[48px] ${isSelected ? 'bg-blue-50/60' : 'hover:bg-blue-50/30 bg-white'
                                                        }`}
                                                >
                                                    <td className="py-2.5 px-3.5 text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => handleToggleCheque(item.id)}
                                                            className="w-4 h-4 rounded text-brand-primary border-slate-300 focus:ring-brand-primary cursor-pointer"
                                                        />
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-center text-slate-500 font-mono">
                                                        {(chequeReconPage - 1) * chequeReconPerPage + idx + 1}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-slate-800 font-medium whitespace-nowrap">{item.companyName}</td>
                                                    <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">{item.branchName}</td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
                                                            {item.policyType}
                                                        </span>
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-mono text-xs text-brand-navy whitespace-nowrap">{item.policyNo}</td>
                                                    <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">{item.transDate}</td>
                                                    <td className="py-2.5 px-3.5 font-bold text-slate-900 whitespace-nowrap">{item.customerName}</td>
                                                    <td className="py-2.5 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">{item.registrationNo}</td>
                                                    <td className="py-2.5 px-3.5 text-slate-700 whitespace-nowrap">{item.agentName}</td>
                                                    <td className="py-2.5 px-3.5 text-slate-800 font-semibold whitespace-nowrap">{item.employeeName}</td>
                                                    <td className="py-2.5 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                        ₹ {item.proposalAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                    </td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                                                            {item.paymentType}
                                                        </span>
                                                    </td>
                                                    <td className="py-2.5 px-3.5 font-mono font-bold text-blue-700 whitespace-nowrap">{item.chequeNo}</td>
                                                    <td className="py-2.5 px-3.5 text-slate-600 whitespace-nowrap">{item.remark}</td>
                                                    <td className="py-2.5 px-3.5 text-slate-700 font-medium whitespace-nowrap">{item.createUser}</td>
                                                    <td className="py-2.5 px-3.5 text-slate-500 whitespace-nowrap font-mono text-[11px]">{item.createDate}</td>
                                                    <td className="py-2.5 px-3.5 whitespace-nowrap">
                                                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                                                            {item.referenceType}
                                                        </span>
                                                    </td>
                                                    <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                                                        {item.status === 'DEPOSITED' ? (
                                                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                                                DEPOSITED
                                                            </span>
                                                        ) : (
                                                            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">
                                                                PENDING
                                                            </span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Standard Pagination Controls (Matching Paid Commission) */}
                        <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                            <div className="flex items-center gap-3">
                                <span>
                                    Showing {paginatedChequeRecords.length === 0 ? 0 : (chequeReconPage - 1) * chequeReconPerPage + 1} to {Math.min(chequeReconPage * chequeReconPerPage, filteredChequeReconRecords.length)} of {filteredChequeReconRecords.length} records
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">Per page:</span>
                                    <select
                                        value={chequeReconPerPage}
                                        onChange={(e) => {
                                            setChequeReconPerPage(Number(e.target.value));
                                            setChequeReconPage(1);
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
                                    onClick={() => setChequeReconPage(p => Math.max(1, p - 1))}
                                    disabled={chequeReconPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalChequePages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setChequeReconPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === chequeReconPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setChequeReconPage(p => Math.min(totalChequePages, p + 1))}
                                    disabled={chequeReconPage === totalChequePages}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT: RECEIVING AMOUNT (reliable-erp.com/Clerk/viewReceivingAmountt.aspx) */}
            {activeTab === 'receiving-amt' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Top Workflow Queue Pills with Notification Counts */}
                    <div className="bg-white rounded-xl border border-brand-border p-3 sm:p-4 shadow-sm w-full">
                        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 custom-scrollbar">
                            {receivingCategories.map(cat => {
                                const isActive = receivingActiveCategory === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => {
                                            setReceivingActiveCategory(cat.id);
                                            setReceivingPage(1);
                                        }}
                                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border flex items-center gap-2.5 whitespace-nowrap shrink-0 ${isActive
                                                ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                                            }`}
                                    >
                                        <span>{cat.label}</span>
                                        {cat.count > 0 && (
                                            <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold bg-rose-500 text-white shadow-xs">
                                                {cat.count}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {receivingActiveCategory === 'Online RA Pre Approval' ? (
                        <div className="space-y-4">
                            {/* Centered Title & Action Buttons */}
                            <div className="bg-white rounded-xl border border-brand-border p-4 shadow-sm flex flex-col items-center justify-center gap-3">
                                <h2 className="text-lg font-bold text-slate-800">Online RA Pre Approval</h2>
                                <div className="flex items-center justify-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setReceivingActiveCategory('Cash Received Premium')}
                                        className="h-9 px-6 bg-[#1E40AF] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center gap-1.5"
                                    >
                                        <span>Back</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleExportRAPreApproval}
                                        className="h-9 px-6 bg-[#EAA144] hover:bg-[#D99B35] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center gap-1.5"
                                    >
                                        <Download size={14} />
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>

                            {/* Table Card */}
                            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                                {/* Merged Searchbar & Summary Badges */}
                                <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                            <input
                                                type="text"
                                                value={raPreApprovalSearchQuery}
                                                onChange={(e) => {
                                                    setRaPreApprovalSearchQuery(e.target.value);
                                                    setRaPreApprovalPage(1);
                                                }}
                                                placeholder="Search Agent Name, Vehicle No, ID, Company..."
                                                className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                            />
                                            {raPreApprovalSearchQuery && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setRaPreApprovalSearchQuery('');
                                                        setRaPreApprovalPage(1);
                                                    }}
                                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                                >
                                                    <X size={14} />
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-[6px] flex-wrap">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-slate-500 font-bold">Total Count :-</span>
                                                <span className="text-brand-primary font-bold text-sm">{totalRaPreApprovalCount}</span>
                                            </div>
                                            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-slate-500 font-bold">Total Amount :-</span>
                                                <span className="text-emerald-700 font-bold text-sm">₹ {totalRaPreApprovalAmount.toLocaleString('en-IN')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {raPreApprovalSearchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setRaPreApprovalSearchQuery('');
                                                setRaPreApprovalPage(1);
                                            }}
                                            className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                        >
                                            Reset
                                        </button>
                                    )}
                                </div>

                                {/* Table */}
                                <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                                    <table className="w-full text-left border-collapse min-w-[1700px]">
                                        <thead>
                                            <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                                <th className="py-3 px-3.5 text-center w-[90px]">ACTION</th>
                                                <th className="py-3 px-3.5 font-mono">ID</th>
                                                <th className="py-3 px-3.5">DATE</th>
                                                <th className="py-3 px-3.5 text-right">PREMIUM (₹)</th>
                                                <th className="py-3 px-3.5 min-w-[220px]">INSURANCE COMPANY</th>
                                                <th className="py-3 px-3.5">PRODUCT TYPE</th>
                                                <th className="py-3 px-3.5">POLICY MODE</th>
                                                <th className="py-3 px-3.5">PAYMENT MODE</th>
                                                <th className="py-3 px-3.5 text-center">CASH STATUS</th>
                                                <th className="py-3 px-3.5 text-center">RAPAYMENTSTATUS</th>
                                                <th className="py-3 px-3.5 text-center">PAYMENTDETAILS2</th>
                                                <th className="py-3 px-3.5 text-center">NO. OF IMAGES</th>
                                                <th className="py-3 px-3.5 min-w-[180px]">AGENT NAME</th>
                                                <th className="py-3 px-3.5 min-w-[200px]">SALES EX. / LOC.HEAD</th>
                                                <th className="py-3 px-3.5">REGISTRATION NO</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-brand-border text-[12px]">
                                            {paginatedRaPreApprovalRecords.length === 0 ? (
                                                <tr>
                                                    <td colSpan={15} className="py-12 text-center text-slate-400 font-medium">
                                                        No Online RA Pre Approval records found.
                                                    </td>
                                                </tr>
                                            ) : (
                                                paginatedRaPreApprovalRecords.map((item) => (
                                                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors bg-white">
                                                        <td className="py-3 px-3.5 text-center whitespace-nowrap">
                                                            {item.status === 'APPROVED' ? (
                                                                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">
                                                                    APPROVED
                                                                </span>
                                                            ) : (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleApproveRAPreApproval(item.id)}
                                                                    className="text-cyan-600 hover:text-cyan-800 font-bold underline cursor-pointer border-none bg-transparent"
                                                                >
                                                                    APPROVE
                                                                </button>
                                                            )}
                                                        </td>
                                                        <td className="py-3 px-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">{item.id}</td>
                                                        <td className="py-3 px-3.5 font-mono text-slate-700 whitespace-nowrap">{item.date}</td>
                                                        <td className="py-3 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                            {item.premium.toLocaleString('en-IN')}
                                                        </td>
                                                        <td className="py-3 px-3.5 font-medium text-slate-800">{item.insuranceCompany}</td>
                                                        <td className="py-3 px-3.5 font-semibold text-slate-700 whitespace-nowrap">{item.productType}</td>
                                                        <td className="py-3 px-3.5 whitespace-nowrap">{item.policyMode}</td>
                                                        <td className="py-3 px-3.5 whitespace-nowrap">
                                                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                                                                {item.paymentMode}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-3.5 text-center text-slate-500 whitespace-nowrap">{item.cashStatus}</td>
                                                        <td className="py-3 px-3.5 text-center text-slate-500 whitespace-nowrap">{item.raPaymentStatus}</td>
                                                        <td className="py-3 px-3.5 text-center text-slate-500 whitespace-nowrap">{item.paymentDetails2}</td>
                                                        <td className="py-3 px-3.5 text-center font-bold text-slate-800 whitespace-nowrap">{item.noOfImages}</td>
                                                        <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{item.agentName}</td>
                                                        <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">{item.salesExecutive}</td>
                                                        <td className="py-3 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">{item.registrationNo}</td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                                    <div className="flex items-center gap-3">
                                        <span>
                                            Showing {paginatedRaPreApprovalRecords.length === 0 ? 0 : (raPreApprovalPage - 1) * raPreApprovalPerPage + 1} to {Math.min(raPreApprovalPage * raPreApprovalPerPage, filteredRaPreApprovalRecords.length)} of {filteredRaPreApprovalRecords.length} records
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-slate-500">Per page:</span>
                                            <select
                                                value={raPreApprovalPerPage}
                                                onChange={(e) => {
                                                    setRaPreApprovalPerPage(Number(e.target.value));
                                                    setRaPreApprovalPage(1);
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
                                            onClick={() => setRaPreApprovalPage(p => Math.max(1, p - 1))}
                                            disabled={raPreApprovalPage === 1}
                                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                        >
                                            &lt;
                                        </button>
                                        {Array.from({ length: totalRaPreApprovalPages }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => setRaPreApprovalPage(p)}
                                                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === raPreApprovalPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setRaPreApprovalPage(p => Math.min(totalRaPreApprovalPages, p + 1))}
                                            disabled={raPreApprovalPage === totalRaPreApprovalPages}
                                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Receiving Amount Data Table Card (Matching Paid Commission style) */
                        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Top Toolbar with Merged Searchbar & Summary Badges */}
                        <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3 flex-wrap">
                                {/* Merged Search Input */}
                                <div className="relative w-72 sm:w-80 md:w-[380px] h-[38px]">
                                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                    <input
                                        type="text"
                                        value={receivingSearchQuery}
                                        onChange={(e) => {
                                            setReceivingSearchQuery(e.target.value);
                                            setReceivingPage(1);
                                        }}
                                        placeholder="Search Customer, Reg No, Executive..."
                                        className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                    />
                                    {receivingSearchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setReceivingSearchQuery('');
                                                setReceivingPage(1);
                                            }}
                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                        >
                                            <X size={14} />
                                        </button>
                                    )}
                                </div>

                                {/* Summary Badges */}
                                <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-[6px] flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Records :-</span>
                                        <span className="text-brand-primary font-bold text-sm">{totalReceivingCount}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Total Premium :-</span>
                                        <span className="text-slate-800 font-bold text-sm">₹ {totalReceivingPremium.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Deposit :-</span>
                                        <span className="text-emerald-600 font-bold text-sm">₹ {totalReceivingDeposit.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500 font-bold">Shortfall :-</span>
                                        <span className="text-rose-600 font-bold text-sm">₹ {totalReceivingShortfall.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Actions: Export & Reset */}
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={handleExportReceiving}
                                    className="h-[38px] px-5 bg-[#EAA144] hover:bg-[#D99B35] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <Download size={14} />
                                    <span>Export</span>
                                </button>
                                {receivingSearchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setReceivingSearchQuery('');
                                            setReceivingPage(1);
                                        }}
                                        className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Centered Category Heading Banner (as in ERP) */}
                        <div className="bg-slate-100/70 border-b border-brand-border py-2 text-center">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                {receivingActiveCategory}
                            </span>
                        </div>

                        {/* Data Table */}
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                            <table className="w-full text-left border-collapse min-w-[1550px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-3.5 text-center w-[90px]">ACTIONS</th>
                                        <th className="py-3 px-3.5 text-right">TOTAL PREMIUM</th>
                                        <th className="py-3 px-3.5 text-right">TOTAL PENDING PREMIUM</th>
                                        <th className="py-3 px-3.5 text-right">DEPOSIT PREMIUM</th>
                                        <th className="py-3 px-3.5 text-right">CUT N PAY</th>
                                        <th className="py-3 px-3.5 text-right">SHORT FALL</th>
                                        <th className="py-3 px-3.5 text-center">STATUS</th>
                                        <th className="py-3 px-3.5">CREATED DATE</th>
                                        <th className="py-3 px-3.5">NAME</th>
                                        <th className="py-3 px-3.5 min-w-[480px]">POLICY DETAILS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[12px]">
                                    {paginatedReceivingRecords.length === 0 ? (
                                        <tr>
                                            <td colSpan={10} className="py-12 text-center text-slate-400 font-medium">
                                                No records found for {receivingActiveCategory}.
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedReceivingRecords.map((item) => (
                                            <tr key={item.id} className="hover:bg-blue-50/30 transition-colors bg-white">
                                                <td className="py-3 px-3.5 text-center whitespace-nowrap">
                                                    <div className="flex items-center justify-center gap-1.5">
                                                        <button
                                                            type="button"
                                                            onClick={() => setViewingReceivingRecord(item)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-brand-primary hover:text-white hover:bg-brand-primary bg-blue-50 border border-blue-200 transition-all cursor-pointer shadow-2xs"
                                                            title="View Details"
                                                        >
                                                            <Eye size={15} />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteReceivingRecord(item.id)}
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-rose-600 hover:text-white hover:bg-rose-600 bg-rose-50 border border-rose-200 transition-all cursor-pointer shadow-2xs"
                                                            title="Delete Record"
                                                        >
                                                            <Trash2 size={15} />
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                    {item.totalPremium.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-3 px-3.5 text-right font-semibold text-slate-800 whitespace-nowrap">
                                                    {item.pendingPremium.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-3 px-3.5 text-right font-bold text-emerald-700 whitespace-nowrap">
                                                    {item.depositPremium.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-3 px-3.5 text-right text-slate-700 whitespace-nowrap">
                                                    {item.cutNPay.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-3 px-3.5 text-right font-bold text-rose-600 whitespace-nowrap">
                                                    {item.shortfall.toLocaleString('en-IN')}
                                                </td>
                                                <td className="py-3 px-3.5 text-center whitespace-nowrap">
                                                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${item.status === 'SHORT FALL'
                                                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap font-mono text-[11px]">
                                                    {item.createdDate}
                                                </td>
                                                <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                                                    {item.executiveName}
                                                </td>
                                                <td className="py-3 px-3.5">
                                                    {/* Nested Policy Details Table Matching ERP */}
                                                    <div className="border border-slate-300 rounded overflow-hidden shadow-2xs bg-white">
                                                        <table className="w-full text-[11px] border-collapse">
                                                            <thead>
                                                                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                                                    <th className="py-1 px-2.5 text-left border-r border-slate-200">CUSTOMER NAME</th>
                                                                    <th className="py-1 px-2.5 text-left border-r border-slate-200">REGISTRATION NO.</th>
                                                                    <th className="py-1 px-2.5 text-right">ACTUAL PREMIUM AMT</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="divide-y divide-slate-100">
                                                                {item.policyDetails.map((pd, pidx) => (
                                                                    <tr key={pidx} className="hover:bg-slate-50/80">
                                                                        <td className="py-1 px-2.5 font-semibold text-slate-800 border-r border-slate-200">
                                                                            {pd.customerName}
                                                                        </td>
                                                                        <td className="py-1 px-2.5 font-mono text-brand-primary font-bold border-r border-slate-200">
                                                                            {pd.registrationNo}
                                                                        </td>
                                                                        <td className="py-1 px-2.5 text-right font-bold text-slate-900">
                                                                            {pd.actualPremiumAmt.toLocaleString('en-IN')}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Standard Pagination Controls (Matching Paid Commission) */}
                        <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                            <div className="flex items-center gap-3">
                                <span>
                                    Showing {paginatedReceivingRecords.length === 0 ? 0 : (receivingPage - 1) * receivingPerPage + 1} to {Math.min(receivingPage * receivingPerPage, filteredReceivingRecords.length)} of {filteredReceivingRecords.length} records
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-slate-500">Per page:</span>
                                    <select
                                        value={receivingPerPage}
                                        onChange={(e) => {
                                            setReceivingPerPage(Number(e.target.value));
                                            setReceivingPage(1);
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
                                    onClick={() => setReceivingPage(p => Math.max(1, p - 1))}
                                    disabled={receivingPage === 1}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalReceivingPages }, (_, i) => i + 1).map(p => (
                                    <button
                                        key={p}
                                        onClick={() => setReceivingPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === receivingPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setReceivingPage(p => Math.min(totalReceivingPages, p + 1))}
                                    disabled={receivingPage === totalReceivingPages}
                                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                >
                                    &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                    )}

                    {/* View Details Modal */}
                    {viewingReceivingRecord && (
                        <div className="fixed inset-0 z-[150] bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
                            <div className="bg-white rounded-xl shadow-2xl border border-brand-border max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-150">
                                <div className="px-5 py-4 bg-brand-navy text-white flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <FileText size={18} className="text-brand-primary" />
                                        <h3 className="font-bold text-sm">Receiving Transaction Details</h3>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setViewingReceivingRecord(null)}
                                        className="text-slate-300 hover:text-white p-1 rounded-md transition-colors border-none bg-transparent cursor-pointer"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="p-5 space-y-4">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                                        <div>
                                            <span className="text-slate-500 block font-medium">Category</span>
                                            <span className="font-bold text-slate-800">{viewingReceivingRecord.category}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Created Date</span>
                                            <span className="font-bold text-slate-800">{viewingReceivingRecord.createdDate}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Status</span>
                                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${viewingReceivingRecord.status === 'SHORT FALL' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                                                }`}>
                                                {viewingReceivingRecord.status}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Executive Name</span>
                                            <span className="font-bold text-slate-800">{viewingReceivingRecord.executiveName}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Total Premium</span>
                                            <span className="font-bold text-slate-900">₹ {viewingReceivingRecord.totalPremium.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Pending Premium</span>
                                            <span className="font-bold text-amber-700">₹ {viewingReceivingRecord.pendingPremium.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Deposit Premium</span>
                                            <span className="font-bold text-emerald-700">₹ {viewingReceivingRecord.depositPremium.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Cut N Pay</span>
                                            <span className="font-bold text-slate-800">₹ {viewingReceivingRecord.cutNPay.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 block font-medium">Short Fall</span>
                                            <span className="font-bold text-rose-600">₹ {viewingReceivingRecord.shortfall.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Policy Details</h4>
                                        <div className="border border-slate-200 rounded-lg overflow-hidden">
                                            <table className="w-full text-xs">
                                                <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                                                    <tr>
                                                        <th className="py-2 px-3 text-left">CUSTOMER NAME</th>
                                                        <th className="py-2 px-3 text-left">REGISTRATION NO.</th>
                                                        <th className="py-2 px-3 text-right">ACTUAL PREMIUM</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {viewingReceivingRecord.policyDetails.map((pd, idx) => (
                                                        <tr key={idx} className="hover:bg-slate-50">
                                                            <td className="py-2 px-3 font-semibold text-slate-800">{pd.customerName}</td>
                                                            <td className="py-2 px-3 font-mono text-brand-primary font-bold">{pd.registrationNo}</td>
                                                            <td className="py-2 px-3 text-right font-bold text-slate-900">₹ {pd.actualPremiumAmt.toLocaleString('en-IN')}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setViewingReceivingRecord(null)}
                                        className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer border-none"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB CONTENT: PENDING COMMISSION NEW (reliable-erp.com/Clerk/POSP_AgentPendingCommission.aspx) */}
            {activeTab === 'pending-commission-new' && (
                <div className="tab-transition-wrapper space-y-4">
                    {/* Top Filter Card */}
                    <div className="bg-white rounded-xl border border-brand-border p-4 sm:p-5 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
                                {/* Entity Radio */}
                                <div className="flex items-center gap-4">
                                    {(['ALL', 'Agent POSP', 'RA POSP'] as const).map((entity) => (
                                        <label key={entity} className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800 hover:text-brand-primary transition-colors select-none">
                                            <input
                                                type="radio"
                                                name="pcnEntity"
                                                checked={pcnEntity === entity}
                                                onChange={() => {
                                                    setPcnEntity(entity);
                                                    setPcnPage(1);
                                                }}
                                                className="w-4 h-4 text-brand-primary accent-blue-600 cursor-pointer"
                                            />
                                            <span>{entity}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* From Date */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-bold text-slate-600 whitespace-nowrap">From Date</label>
                                    <div className="relative w-36">
                                        <input
                                            type="text"
                                            value={pcnFromDate}
                                            onChange={(e) => setPcnFromDate(e.target.value)}
                                            placeholder="DD/MM/YYYY"
                                            className="w-full h-9 pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary shadow-2xs"
                                        />
                                        <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* To Date */}
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-bold text-slate-600 whitespace-nowrap">To Date</label>
                                    <div className="relative w-36">
                                        <input
                                            type="text"
                                            value={pcnToDate}
                                            onChange={(e) => setPcnToDate(e.target.value)}
                                            placeholder="DD/MM/YYYY"
                                            className="w-full h-9 pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary shadow-2xs"
                                        />
                                        <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons: Show, Export Summary, Export Details */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <button
                                    type="button"
                                    onClick={() => showToast(`Filtered ${filteredPcnRecords.length} pending commission records.`)}
                                    className="h-9 px-5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <span>Show</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleExportPcnSummary}
                                    className="h-9 px-4 bg-[#EAA144] hover:bg-[#D99B35] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <Download size={13} />
                                    <span>Export Summary</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={handleExportPcnDetails}
                                    className="h-9 px-4 bg-[#EAA144] hover:bg-[#D99B35] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                >
                                    <Download size={13} />
                                    <span>Export Details</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Layout: Table (Left/Center) + Payment Side Panel (Right) */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
                        {/* Left / Center Table Card */}
                        <div className="xl:col-span-9 bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                            {/* Toolbar: Merged Searchbar & Summary Badges */}
                            <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className="relative w-72 sm:w-80 md:w-[360px] h-[38px]">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                        <input
                                            type="text"
                                            value={pcnSearchQuery}
                                            onChange={(e) => {
                                                setPcnSearchQuery(e.target.value);
                                                setPcnPage(1);
                                            }}
                                            placeholder="Search Branch, Agent, POSP, Account No, IFSC..."
                                            className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                        />
                                        {pcnSearchQuery && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPcnSearchQuery('');
                                                    setPcnPage(1);
                                                }}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer border-none bg-transparent"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>

                                    {pcnSelectedIds.length > 0 && (
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-[6px]">
                                            <span className="font-bold">Selected :-</span>
                                            <span className="font-extrabold">{pcnSelectedIds.length} items (₹ {selectedPcnTotalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})</span>
                                        </div>
                                    )}
                                </div>

                                {(pcnSearchQuery || pcnSelectedIds.length > 0) && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPcnSearchQuery('');
                                            setPcnSelectedIds([]);
                                            setPcnPage(1);
                                        }}
                                        className="h-[38px] px-3.5 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer border border-rose-200 shrink-0"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto w-full custom-scrollbar min-h-[460px]">
                                <table className="w-full text-left border-collapse min-w-[1700px]">
                                    <thead>
                                        <tr className="bg-brand-lightbg text-brand-navy text-[12px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                            <th className="py-3 px-3.5">POSP NAME</th>
                                            <th className="py-3 px-3.5">BRANCH NAME</th>
                                            <th className="py-3 px-3.5">AGENT NAME</th>
                                            <th className="py-3 px-3.5 text-right">PREMIUM AMT</th>
                                            <th className="py-3 px-3.5 text-right">TP COMM.</th>
                                            <th className="py-3 px-3.5 text-right">OD COMM.</th>
                                            <th className="py-3 px-3.5 text-right">NET COMM.</th>
                                            <th className="py-3 px-3.5 text-right">TOTAL COMM.</th>
                                            <th className="py-3 px-3.5 text-right">ADV. AMT</th>
                                            <th className="py-3 px-3.5 text-right">TOTAL OUT STANDING AMOUNT</th>
                                            <th className="py-3 px-3.5 text-right">BALANCE</th>
                                            <th className="py-3 px-3.5 text-center w-[60px]">
                                                <input
                                                    type="checkbox"
                                                    checked={paginatedPcnRecords.length > 0 && paginatedPcnRecords.every(r => pcnSelectedIds.includes(r.id))}
                                                    onChange={handleSelectAllPcn}
                                                    className="w-4 h-4 rounded text-brand-primary accent-blue-600 cursor-pointer"
                                                    title="Select All"
                                                />
                                            </th>
                                            <th className="py-3 px-3.5">ACCOUNTNO</th>
                                            <th className="py-3 px-3.5">IFSC CODE</th>
                                            <th className="py-3 px-3.5 text-center">AGENTTDS</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-border text-[12px]">
                                        {paginatedPcnRecords.length === 0 ? (
                                            <tr>
                                                <td colSpan={15} className="py-12 text-center text-slate-400 font-medium">
                                                    No pending commission records found.
                                                </td>
                                            </tr>
                                        ) : (
                                            paginatedPcnRecords.map((item) => {
                                                const isSelected = pcnSelectedIds.includes(item.id);
                                                return (
                                                    <tr key={item.id} className={`transition-colors ${isSelected ? 'bg-blue-50/60' : 'hover:bg-slate-50/80 bg-white'}`}>
                                                        <td className="py-3 px-3.5 font-semibold text-slate-800 whitespace-nowrap">{item.pospName}</td>
                                                        <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap font-medium">{item.branchName}</td>
                                                        <td className="py-3 px-3.5 font-bold text-blue-700 whitespace-nowrap hover:underline cursor-pointer">{item.agentName}</td>
                                                        <td className="py-3 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                            {item.premiumAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="py-3 px-3.5 text-right text-slate-700 whitespace-nowrap">
                                                            {item.tpComm.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="py-3 px-3.5 text-right text-slate-700 whitespace-nowrap">
                                                            {item.odComm.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="py-3 px-3.5 text-right text-slate-700 whitespace-nowrap">
                                                            {item.netComm.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="py-3 px-3.5 text-right font-semibold text-slate-800 whitespace-nowrap">
                                                            {item.totalComm.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="py-3 px-3.5 text-right text-slate-500 whitespace-nowrap">
                                                            {item.advAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="py-3 px-3.5 text-right text-slate-500 whitespace-nowrap">
                                                            {item.totalOutstandingAmt.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="py-3 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                                                            {item.balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                        </td>
                                                        <td className="py-3 px-3.5 text-center whitespace-nowrap">
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                onChange={() => handleToggleSelectPcn(item.id)}
                                                                className="w-4 h-4 rounded text-brand-primary accent-blue-600 cursor-pointer"
                                                            />
                                                        </td>
                                                        <td className="py-3 px-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">{item.accountNo}</td>
                                                        <td className="py-3 px-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">{item.ifscCode}</td>
                                                        <td className="py-3 px-3.5 text-center font-bold text-slate-700 whitespace-nowrap">{item.agentTds}</td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Standard Pagination Controls */}
                            <div className="p-3.5 sm:p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                                <div className="flex items-center gap-3">
                                    <span>
                                        Showing {paginatedPcnRecords.length === 0 ? 0 : (pcnPage - 1) * pcnPerPage + 1} to {Math.min(pcnPage * pcnPerPage, filteredPcnRecords.length)} of {filteredPcnRecords.length} records
                                    </span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-slate-500">Per page:</span>
                                        <select
                                            value={pcnPerPage}
                                            onChange={(e) => {
                                                setPcnPerPage(Number(e.target.value));
                                                setPcnPage(1);
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
                                        onClick={() => setPcnPage(p => Math.max(1, p - 1))}
                                        disabled={pcnPage === 1}
                                        className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                    >
                                        &lt;
                                    </button>
                                    {Array.from({ length: totalPcnPages }, (_, i) => i + 1).map(p => (
                                        <button
                                            key={p}
                                            onClick={() => setPcnPage(p)}
                                            className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-colors cursor-pointer ${p === pcnPage ? 'bg-brand-primary text-white' : 'bg-white border border-brand-border text-brand-navy hover:bg-slate-50'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setPcnPage(p => Math.min(totalPcnPages, p + 1))}
                                        disabled={pcnPage === totalPcnPages}
                                        className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right / Payment Side Panel Card */}
                        <div className="xl:col-span-3 bg-white rounded-[12px] border border-brand-border shadow-sm p-4 sm:p-5 space-y-3.5 xl:sticky xl:top-4">
                            <h3 className="text-sm font-bold text-slate-800 pb-2 border-b border-slate-200 flex items-center justify-between">
                                <span>Payment Details</span>
                                {pcnSelectedIds.length > 0 && (
                                    <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                                        {pcnSelectedIds.length} Selected
                                    </span>
                                )}
                            </h3>

                            <div className="space-y-3 text-xs">
                                {/* Total */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">Total</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={selectedPcnTotalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg font-bold text-slate-800 shadow-2xs focus:outline-none"
                                    />
                                </div>

                                {/* Outstanding Recover */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">Outstanding Recover</label>
                                    <input
                                        type="text"
                                        value={pcnOutstandingRecover}
                                        onChange={(e) => setPcnOutstandingRecover(e.target.value)}
                                        className="w-full h-9 px-3 bg-white border border-[#CBD5E1] rounded-lg font-medium text-slate-800 shadow-2xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                    />
                                </div>

                                {/* Total Outstanding Recover */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">Total Outstanding Recover</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={pcnTotalOutstandingRecover}
                                        className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700 shadow-2xs focus:outline-none"
                                    />
                                </div>

                                {/* Total E-wallet Amount Used */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">Total E-wallet Amount Used</label>
                                    <input
                                        type="text"
                                        value={pcnEwalletAmountUsed}
                                        onChange={(e) => setPcnEwalletAmountUsed(e.target.value)}
                                        className="w-full h-9 px-3 bg-white border border-[#CBD5E1] rounded-lg font-medium text-slate-800 shadow-2xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                    />
                                </div>

                                {/* Pay */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">Pay</label>
                                    <input
                                        type="text"
                                        readOnly
                                        value={selectedPcnTotalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        className="w-full h-9 px-3 bg-emerald-50 border border-emerald-200 rounded-lg font-bold text-emerald-800 text-sm shadow-2xs focus:outline-none"
                                    />
                                </div>

                                {/* Select Payment Mode */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">Select Payment Mode</label>
                                    <select
                                        value={pcnPaymentMode}
                                        onChange={(e) => setPcnPaymentMode(e.target.value)}
                                        className="w-full h-9 px-2.5 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-primary shadow-2xs cursor-pointer"
                                    >
                                        <option value="">--Select Payment Mode--</option>
                                        <option value="NEFT">NEFT</option>
                                        <option value="RTGS">RTGS</option>
                                        <option value="Cheque">Cheque</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="E-Wallet">E-Wallet</option>
                                    </select>
                                </div>

                                {/* Cash / Ledger */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">Cash / Ledger</label>
                                    <select
                                        value={pcnLedger}
                                        onChange={(e) => setPcnLedger(e.target.value)}
                                        className="w-full h-9 px-2.5 bg-white border border-[#CBD5E1] rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-brand-primary shadow-2xs cursor-pointer"
                                    >
                                        <option value="">--Select Ledger--</option>
                                        <option value="HDFC Bank Current A/c - 501002">HDFC Bank Current A/c - 501002</option>
                                        <option value="SBI Main Operations A/c - 201115">SBI Main Operations A/c - 201115</option>
                                        <option value="ICICI Payout Ledger - 696805">ICICI Payout Ledger - 696805</option>
                                        <option value="Bank of India A/c - 070710">Bank of India A/c - 070710</option>
                                        <option value="Cash in Hand - Baramati Branch">Cash in Hand - Baramati Branch</option>
                                    </select>
                                </div>

                                {/* NEFT No. */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">NEFT No.</label>
                                    <input
                                        type="text"
                                        value={pcnNeftNo}
                                        onChange={(e) => setPcnNeftNo(e.target.value)}
                                        placeholder="Enter NEFT / UTR reference"
                                        className="w-full h-9 px-3 bg-white border border-[#CBD5E1] rounded-lg font-medium text-slate-800 shadow-2xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                    />
                                </div>

                                {/* Payment Date */}
                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-600 uppercase">Payment Date</label>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            value={pcnPaymentDate}
                                            onChange={(e) => setPcnPaymentDate(e.target.value)}
                                            placeholder="DD/MM/YYYY"
                                            className="w-full h-9 pl-3 pr-8 bg-white border border-[#CBD5E1] rounded-lg font-medium text-slate-800 shadow-2xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
                                        />
                                        <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Pay Button */}
                                <div className="pt-2">
                                    <button
                                        type="button"
                                        onClick={handlePcnPay}
                                        className="w-full h-10 bg-[#EAA144] hover:bg-[#D99B35] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
                                    >
                                        <span>Pay</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 9 TO 16: MASTER REFERENCE TABLES */}
            {activeTab !== 'cash-approval' && activeTab !== 'voucher-entry' && activeTab !== 'ledger-report' && activeTab !== 'premium-shortfall' && activeTab !== 'pending-commission' && activeTab !== 'paid-commission' && activeTab !== 'commission-recalculate' && activeTab !== 'account-report' && activeTab !== 'paid-entry-recalc' && activeTab !== 'return-cash-approval' && activeTab !== 'cashback-approval' && activeTab !== 'cheque-recon' && activeTab !== 'receiving-amt' && activeTab !== 'pending-commission-new' && (
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
