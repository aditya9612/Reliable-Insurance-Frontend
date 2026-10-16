import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import {
  Search, Download, Eye, Calendar, RefreshCw, FileSpreadsheet,
  CheckCircle2, AlertCircle, Clock, X, ChevronLeft, ChevronRight,
  TrendingUp, Building2, UserCheck, ShieldCheck, ArrowUpRight, DollarSign,
  FileText, Percent, Printer
} from 'lucide-react';
import ViewAllAgentCommissionTab from './ViewAllAgentCommissionTab';
import ViewPolicyTab from './ViewPolicyTab';
import EndorsementReportTab from './EndorsementReportTab';
import ChequeBounceReportTab from './ChequeBounceReportTab';
import ProfitReportTab from './ProfitReportTab';
import CashbackReportTab from './CashbackReportTab';
import CompanyWiseAgentGridTab from './CompanyWiseAgentGridTab';
import PremiumCashApprovalReportTab from './PremiumCashApprovalReportTab';
import TdsReportTab from './TdsReportTab';
import VehicleHistoryTab from './VehicleHistoryTab';
import DayBookTab from './DayBookTab';
import AgentTdsReportTab from './AgentTdsReportTab';
import ActiveInactiveAgentTab from './ActiveInactiveAgentTab';
import OnlineToRaApprovalTab from './OnlineToRaApprovalTab';
import PolicyCancelReportTab from './PolicyCancelReportTab';
import PaymentReportTab from './PaymentReportTab';

// 18 Report Sub-Tabs arranged strictly according to ERP Report Menu (Image 1 & Image 2)
export type GeneralReportTab =
  | 'viewAllAgentCommission'
  | 'viewPolicy'
  | 'cutNPay'
  | 'endorsement'
  | 'chequeBounce'
  | 'profit'
  | 'franchiseProfit'
  | 'cashback'
  | 'companyWiseAgentGrid'
  | 'premiumCashApproval'
  | 'tdsReport'
  | 'vehicleHistory'
  | 'dayBook'
  | 'agentTdsReport'
  | 'activeInactiveAgent'
  | 'onlineToRaApproval'
  | 'policyCancelReport'
  | 'paymentReport';

export interface ReportTabMeta {
  key: GeneralReportTab;
  label: string;
}

export const GeneralReports: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as GeneralReportTab) || 'viewAllAgentCommission';

  const [activeTab, setActiveTab] = useState<GeneralReportTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('ALL');
  const [fromDate, setFromDate] = useState('2026-10-01');
  const [toDate, setToDate] = useState('2026-10-13');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const [viewingPolicyDoc, setViewingPolicyDoc] = useState<any | null>(null);

  // Sync tab with URL search parameter if changed externally
  useEffect(() => {
    const tabParam = searchParams.get('tab') as GeneralReportTab;
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Tab definitions (Row 1: 9 buttons, Row 2: 9 buttons = 18 total)
  // Ordered strictly according to legacy ERP Report menu (Image 1 & Image 2):
  // 1. View All Agent Commissioners, 2. View Policy, 3. Cut N Pay Report, 4. Endorsement Report,
  // 5. Cheque Bounce Report, 6. Profit Report, 7. Franchise Profit Report, 8. Cashback Report,
  // 9. Company Wise Agent Grid, 10. Premium Cash Approval Report, 11. TDS Report, 12. Vehicle History,
  // 13. Day Book, 14. Agent TDS Report, 15. Active or InActive Agent, 16. Online To RA Approval,
  // 17. Policy Cancel Report, 18. Payment Report.
  const tabsList: ReportTabMeta[] = [
    // Row 1 (9 Tabs)
    { key: 'viewAllAgentCommission', label: 'View All Agent Commissioners' },
    { key: 'viewPolicy', label: 'View Policy' },
    { key: 'cutNPay', label: 'Cut N Pay Report' },
    { key: 'endorsement', label: 'Endorsement Report' },
    { key: 'chequeBounce', label: 'Cheque Bounce Report' },
    { key: 'profit', label: 'Profit Report' },
    { key: 'franchiseProfit', label: 'Franchise Profit Report' },
    { key: 'cashback', label: 'Cashback Report' },
    { key: 'companyWiseAgentGrid', label: 'Company Wise Agent Grid' },
    // Row 2 (9 Tabs)
    { key: 'premiumCashApproval', label: 'Premium Cash Approval Report' },
    { key: 'tdsReport', label: 'TDS Report' },
    { key: 'vehicleHistory', label: 'Vehicle History' },
    { key: 'dayBook', label: 'Day Book' },
    { key: 'agentTdsReport', label: 'Agent TDS Report' },
    { key: 'activeInactiveAgent', label: 'Active or InActive Agent' },
    { key: 'onlineToRaApproval', label: 'Online To RA Approval' },
    { key: 'policyCancelReport', label: 'Policy Cancel Report' },
    { key: 'paymentReport', label: 'Payment Report' },
  ];

  const branches = [
    'ALL', 'BARAMATI HEAD OFFICE', 'PUNE', 'MUMBAI', 'NAGPUR',
    'SATARA', 'SOLAPUR', 'AHILYANAGAR', 'KOLHAPUR', 'NASHIK'
  ];

  // Helper formatters
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(val);
  };

  // =========================================================================
  // MOCK DATASETS FOR EACH OF THE 18 REPORTS
  // =========================================================================

  // 1. Cut N Pay Report
  const cutNPayData = [
    { id: 1, transDate: '2026-10-11', riskDate: '2026-10-12', policyNo: 'POL-CNP-98421', insuredName: 'Rahul Tukaram Deshmukh', company: 'Bajaj Allianz Gen Ins', branch: 'BARAMATI HEAD OFFICE', agentName: 'Amit Deshmukh (AG-102)', grossPremium: 42500, cutNPayAmt: 34000, balanceDue: 8500, paymentMode: 'Cheque', status: 'Partially Paid' },
    { id: 2, transDate: '2026-10-10', riskDate: '2026-10-10', policyNo: 'POL-CNP-98422', insuredName: 'Pooja Sanjay Patil', company: 'Tata AIG Gen Ins', branch: 'PUNE', agentName: 'Sneha Kulkarni (AG-204)', grossPremium: 18900, cutNPayAmt: 18900, balanceDue: 0, paymentMode: 'Online NetBanking', status: 'Completed' },
    { id: 3, transDate: '2026-10-09', riskDate: '2026-10-09', policyNo: 'POL-CNP-98423', insuredName: 'Shrikant Vitthal Shinde', company: 'HDFC ERGO General', branch: 'SOLAPUR', agentName: 'Rahul Sharma (AG-305)', grossPremium: 68000, cutNPayAmt: 50000, balanceDue: 18000, paymentMode: 'Cash Deposit', status: 'Pending' },
    { id: 4, transDate: '2026-10-08', riskDate: '2026-10-08', policyNo: 'POL-CNP-98424', insuredName: 'Kunal Ashok Jadhav', company: 'ICICI Lombard Gen Ins', branch: 'MUMBAI', agentName: 'Priya Verma (AG-412)', grossPremium: 29400, cutNPayAmt: 29400, balanceDue: 0, paymentMode: 'UPI', status: 'Completed' },
    { id: 5, transDate: '2026-10-07', riskDate: '2026-10-07', policyNo: 'POL-CNP-98425', insuredName: 'Anil Bapurao Gaikwad', company: 'United India Insurance', branch: 'AHILYANAGAR', agentName: 'Sanjay Patil (AG-510)', grossPremium: 52100, cutNPayAmt: 40000, balanceDue: 12100, paymentMode: 'Cheque', status: 'Partially Paid' },
    { id: 6, transDate: '2026-10-06', riskDate: '2026-10-06', policyNo: 'POL-CNP-98426', insuredName: 'Vikas Datta More', company: 'Go Digit General Ins', branch: 'NAGPUR', agentName: 'Rohit Kadam (AG-601)', grossPremium: 14200, cutNPayAmt: 14200, balanceDue: 0, paymentMode: 'Online NetBanking', status: 'Completed' },
    { id: 7, transDate: '2026-10-05', riskDate: '2026-10-05', policyNo: 'POL-CNP-98427', insuredName: 'Nitin Prakash Salunkhe', company: 'SBI General Insurance', branch: 'SATARA', agentName: 'Aditya Sapkal (AG-708)', grossPremium: 38700, cutNPayAmt: 0, balanceDue: 38700, paymentMode: 'Pending Collection', status: 'Pending' },
  ];

  // 2. Endorsement Report
  const endorsementData = [
    { id: 1, endorsementDate: '2026-10-12', endorsementNo: 'END-2026-081', policyNo: 'POL-MOT-412098', customerName: 'Mahesh Suresh Jagtap', company: 'Bajaj Allianz', endorsementType: 'Add CNG Kit', premiumDiff: 2450, oldValue: 'Petrol Only', newValue: 'Petrol + CNG External', branch: 'BARAMATI HEAD OFFICE', status: 'Approved' },
    { id: 2, endorsementDate: '2026-10-11', endorsementNo: 'END-2026-082', policyNo: 'POL-MOT-553210', customerName: 'Rajendra Anantrao Pawar', company: 'ICICI Lombard', endorsementType: 'Ownership Transfer', premiumDiff: 750, oldValue: 'Sagar M. Koli', newValue: 'Rajendra Pawar', branch: 'PUNE', status: 'Approved' },
    { id: 3, endorsementDate: '2026-10-10', endorsementNo: 'END-2026-083', policyNo: 'POL-MOT-119834', customerName: 'Vijay Vasant Thorat', company: 'Tata AIG', endorsementType: 'Nil Dep Addition', premiumDiff: 4120, oldValue: 'Standard Comprehensive', newValue: 'Zero Depreciation Add-on', branch: 'SOLAPUR', status: 'In Process' },
    { id: 4, endorsementDate: '2026-10-09', endorsementNo: 'END-2026-084', policyNo: 'POL-MOT-990145', customerName: 'Kiran Ramesh Chavan', company: 'HDFC ERGO', endorsementType: 'Address Correction', premiumDiff: 0, oldValue: 'Flat 12 Pune', newValue: 'Sector 4 Hadapsar Pune', branch: 'PUNE', status: 'Approved' },
    { id: 5, endorsementDate: '2026-10-08', endorsementNo: 'END-2026-085', policyNo: 'POL-MOT-778129', customerName: 'Sunil Mohanrao Khot', company: 'Go Digit', endorsementType: 'Engine Number Correction', premiumDiff: 0, oldValue: 'K12M890123', newValue: 'K12M890128', branch: 'MUMBAI', status: 'Approved' },
    { id: 6, endorsementDate: '2026-10-06', endorsementNo: 'END-2026-086', policyNo: 'POL-MOT-332901', customerName: 'Babasaheb Yadav', company: 'New India Assurance', endorsementType: 'PA Cover Addition', premiumDiff: 375, oldValue: 'Without PA Cover', newValue: 'Owner Driver PA 15 Lakh', branch: 'SATARA', status: 'Inspection Required' },
  ];

  // 3. Cheque Bounce Report
  const chequeBounceData = [
    { id: 1, chequeNo: '004128', chequeDate: '2026-10-02', bounceDate: '2026-10-05', bankName: 'State Bank of India', policyNo: 'POL-CHQ-10029', customerName: 'Ganesh Pandurang Kale', agentName: 'Amit Deshmukh', chequeAmount: 28500, bounceReason: 'Insufficient Funds', penalty: 500, recoveryStatus: 'Pending', branch: 'BARAMATI HEAD OFFICE' },
    { id: 2, chequeNo: '883019', chequeDate: '2026-10-01', bounceDate: '2026-10-04', bankName: 'HDFC Bank Ltd', policyNo: 'POL-CHQ-10034', customerName: 'Santosh Sopanrao Raut', agentName: 'Sneha Kulkarni', chequeAmount: 46200, bounceReason: 'Signature Mismatch', penalty: 500, recoveryStatus: 'Recovered', branch: 'PUNE' },
    { id: 3, chequeNo: '124982', chequeDate: '2026-09-28', bounceDate: '2026-10-02', bankName: 'Bank of Maharashtra', policyNo: 'POL-CHQ-10051', customerName: 'Amol Dnyaneshwar Bhor', agentName: 'Rahul Sharma', chequeAmount: 15300, bounceReason: 'Account Dormant', penalty: 500, recoveryStatus: 'Notice Issued', branch: 'AHILYANAGAR' },
    { id: 4, chequeNo: '672044', chequeDate: '2026-09-27', bounceDate: '2026-09-30', bankName: 'Axis Bank Ltd', policyNo: 'POL-CHQ-10068', customerName: 'Tushar Ramdas Mane', agentName: 'Priya Verma', chequeAmount: 39800, bounceReason: 'Insufficient Funds', penalty: 500, recoveryStatus: 'Recovered', branch: 'MUMBAI' },
    { id: 5, chequeNo: '341098', chequeDate: '2026-09-25', bounceDate: '2026-09-29', bankName: 'ICICI Bank Ltd', policyNo: 'POL-CHQ-10082', customerName: 'Balaji Transport Corp', agentName: 'Sanjay Patil', chequeAmount: 94000, bounceReason: 'Payment Stopped by Drawer', penalty: 750, recoveryStatus: 'Pending', branch: 'SOLAPUR' },
  ];

  // 4. Profit Report
  const profitData = [
    { id: 1, company: 'Bajaj Allianz General Insurance', segment: 'Private Car Motor', branch: 'BARAMATI HEAD OFFICE', grossPremium: 1450000, netPremium: 1228800, companyComm: 245760, payoutComm: 172032, netProfit: 73728, profitMargin: 30.0 },
    { id: 2, company: 'ICICI Lombard Gen Insurance', segment: 'Commercial Vehicle (GCV)', branch: 'PUNE', grossPremium: 2120000, netPremium: 1796600, companyComm: 323388, payoutComm: 233558, netProfit: 89830, profitMargin: 27.8 },
    { id: 3, company: 'Tata AIG General Insurance', segment: 'Two Wheeler Comprehensive', branch: 'SOLAPUR', grossPremium: 580000, netPremium: 491500, companyComm: 122875, payoutComm: 78640, netProfit: 44235, profitMargin: 36.0 },
    { id: 4, company: 'HDFC ERGO General Insurance', segment: 'Commercial Passenger (PCV)', branch: 'MUMBAI', grossPremium: 1890000, netPremium: 1601700, companyComm: 288306, payoutComm: 208221, netProfit: 80085, profitMargin: 27.8 },
    { id: 5, company: 'Go Digit General Insurance', segment: 'Private Car Comprehensive', branch: 'NAGPUR', grossPremium: 980000, netPremium: 830500, companyComm: 174405, payoutComm: 124575, netProfit: 49830, profitMargin: 28.6 },
    { id: 6, company: 'SBI General Insurance', segment: 'Non Motor & Fire Policy', branch: 'SATARA', grossPremium: 740000, netPremium: 627100, companyComm: 156775, payoutComm: 100336, netProfit: 56439, profitMargin: 36.0 },
  ];

  // 5. Franchise Profit Report
  const franchiseProfitData = [
    { id: 1, franchiseCode: 'FR-BAR-01', franchiseName: 'Reliable Baramati City Point', location: 'Baramati MIDC', totalPolicies: 184, grossPremium: 3840000, franchiseShare: 345600, raShare: 115200, tdsDeducted: 17280, netPayable: 328320, payoutStatus: 'Paid' },
    { id: 2, franchiseCode: 'FR-PUN-04', franchiseName: 'Reliable Hadapsar Hub', location: 'Hadapsar, Pune', totalPolicies: 242, grossPremium: 5120000, franchiseShare: 460800, raShare: 153600, tdsDeducted: 23040, netPayable: 437760, payoutStatus: 'Processing' },
    { id: 3, franchiseCode: 'FR-SOL-02', franchiseName: 'Reliable Solapur Central', location: 'Old Pune Naka, Solapur', totalPolicies: 128, grossPremium: 2680000, franchiseShare: 241200, raShare: 80400, tdsDeducted: 12060, netPayable: 229140, payoutStatus: 'Paid' },
    { id: 4, franchiseCode: 'FR-MUM-03', franchiseName: 'Reliable Thane West Unit', location: 'Thane, Mumbai', totalPolicies: 196, grossPremium: 4450000, franchiseShare: 400500, raShare: 133500, tdsDeducted: 20025, netPayable: 380475, payoutStatus: 'On Hold' },
    { id: 5, franchiseCode: 'FR-AHI-01', franchiseName: 'Reliable Ahilyanagar Town', location: 'Savedi Road, Ahilyanagar', totalPolicies: 94, grossPremium: 1980000, franchiseShare: 178200, raShare: 59400, tdsDeducted: 8910, netPayable: 169290, payoutStatus: 'Paid' },
  ];

  // 6. Cashback Report
  const cashbackData = [
    { id: 1, transDate: '2026-10-12', policyNo: 'POL-CB-901', customerName: 'Abhay Chandrakant Jagdale', agentName: 'Amit Deshmukh', productType: 'Motor Private Car', grossPremium: 34500, cashbackAmt: 1500, paymentMode: 'IMPS Direct', utrNo: 'UTR202610129014', approvedBy: 'Admin Shekhar', status: 'Approved' },
    { id: 2, transDate: '2026-10-11', policyNo: 'POL-CB-902', customerName: 'Snehal Nitin Kulkarni', agentName: 'Sneha Kulkarni', productType: 'Commercial Goods Vehicle', grossPremium: 58000, cashbackAmt: 2500, paymentMode: 'Bank Transfer', utrNo: 'UTR202610118831', approvedBy: 'Admin Shekhar', status: 'Approved' },
    { id: 3, transDate: '2026-10-10', policyNo: 'POL-CB-903', customerName: 'Nagesh Baliram Jadhav', agentName: 'Rahul Sharma', productType: 'Two Wheeler Long Term', grossPremium: 8900, cashbackAmt: 450, paymentMode: 'UPI', utrNo: 'UPI9012448911', approvedBy: 'Pending Review', status: 'Pending' },
    { id: 4, transDate: '2026-10-09', policyNo: 'POL-CB-904', customerName: 'Dattatray Vitthal Pawar', agentName: 'Priya Verma', productType: 'Motor Private Car', grossPremium: 29800, cashbackAmt: 1200, paymentMode: 'NEFT', utrNo: 'NEFT00293149', approvedBy: 'Admin Shekhar', status: 'Approved' },
    { id: 5, transDate: '2026-10-07', policyNo: 'POL-CB-905', customerName: 'Mahindra Logistics Ltd', agentName: 'Sanjay Patil', productType: 'Fleet Commercial', grossPremium: 145000, cashbackAmt: 6000, paymentMode: 'RTGS', utrNo: 'RTGS7781290', approvedBy: 'Rejected - Policy Term', status: 'Rejected' },
  ];

  // 7. Company Wise Agent Grid
  const companyWiseAgentGridData = [
    { id: 1, agentCode: 'AG-102', agentName: 'Amit Deshmukh', branch: 'BARAMATI HEAD OFFICE', company: 'Bajaj Allianz General', segment: 'Private Car (OD+TP)', odComm: 18.5, tpComm: 2.5, netComm: 15.0, reward: 2.0, effectiveFrom: '2026-04-01', status: 'Active' },
    { id: 2, agentCode: 'AG-102', agentName: 'Amit Deshmukh', branch: 'BARAMATI HEAD OFFICE', company: 'ICICI Lombard Gen', segment: 'Commercial Goods Vehicle', odComm: 15.0, tpComm: 2.0, netComm: 12.5, reward: 1.5, effectiveFrom: '2026-04-01', status: 'Active' },
    { id: 3, agentCode: 'AG-204', agentName: 'Sneha Kulkarni', branch: 'PUNE', company: 'Tata AIG General', segment: 'Two Wheeler Package', odComm: 22.0, tpComm: 2.5, netComm: 18.0, reward: 3.0, effectiveFrom: '2026-04-01', status: 'Active' },
    { id: 4, agentCode: 'AG-305', agentName: 'Rahul Sharma', branch: 'SOLAPUR', company: 'HDFC ERGO General', segment: 'Passenger Carrying (PCV)', odComm: 16.0, tpComm: 2.0, netComm: 13.0, reward: 2.0, effectiveFrom: '2026-04-01', status: 'Active' },
    { id: 5, agentCode: 'AG-412', agentName: 'Priya Verma', branch: 'MUMBAI', company: 'Go Digit General', segment: 'Private Car Comprehensive', odComm: 19.0, tpComm: 2.5, netComm: 16.0, reward: 2.5, effectiveFrom: '2026-06-01', status: 'Review Due' },
    { id: 6, agentCode: 'AG-510', agentName: 'Sanjay Patil', branch: 'AHILYANAGAR', company: 'SBI General Insurance', segment: 'Commercial Tractor / Agri', odComm: 17.5, tpComm: 2.0, netComm: 14.0, reward: 1.5, effectiveFrom: '2026-04-01', status: 'Active' },
  ];

  // 8. Premium Cash Approval Report
  const premiumCashApprovalData = [
    { id: 1, collectionDate: '2026-10-12', policyNo: 'POL-CASH-7712', customerName: 'Siddheshwar Namdeo Shinde', executiveName: 'Arvind Gawade', branch: 'BARAMATI HEAD OFFICE', cashCollected: 38500, depositSlipNo: 'DEP-BMT-9811', handoverDate: '2026-10-12', raApprover: 'Accounts Desk 1', status: 'Approved' },
    { id: 2, collectionDate: '2026-10-11', policyNo: 'POL-CASH-7713', customerName: 'Chandrakant Bhausaheb Jagtap', executiveName: 'Hemant Kakulte', branch: 'PUNE', cashCollected: 52000, depositSlipNo: 'DEP-PUN-4012', handoverDate: '2026-10-11', raApprover: 'Accounts Desk 2', status: 'Approved' },
    { id: 3, collectionDate: '2026-10-11', policyNo: 'POL-CASH-7714', customerName: 'Prashant Pandurang Koli', executiveName: 'Aditya Sapkal', branch: 'SOLAPUR', cashCollected: 24800, depositSlipNo: 'DEP-SOL-1194', handoverDate: '2026-10-12', raApprover: 'Pending Review', status: 'Pending' },
    { id: 4, collectionDate: '2026-10-10', policyNo: 'POL-CASH-7715', customerName: 'Vishal Anandrao Khot', executiveName: 'Shekhar Jadhav', branch: 'MUMBAI', cashCollected: 16400, depositSlipNo: 'DEP-MUM-8831', handoverDate: '2026-10-10', raApprover: 'Accounts Desk 1', status: 'Approved' },
    { id: 5, collectionDate: '2026-10-09', policyNo: 'POL-CASH-7716', customerName: 'Kalyan Sugar Agro Mills', executiveName: 'Rohit Shinde', branch: 'AHILYANAGAR', cashCollected: 89000, depositSlipNo: 'DEP-AHI-3310', handoverDate: '2026-10-10', raApprover: 'Flagged: Slip Pending', status: 'Discrepancy' },
  ];

  // 9. View All Agent Commission (NEW)
  const viewAllAgentCommissionData = [
    { id: 1, agentCode: 'AG-102', agentName: 'Amit Tukaram Deshmukh', mobile: '9822019284', branch: 'BARAMATI HEAD OFFICE', policyNo: 'POL-2026-9901', company: 'Bajaj Allianz Gen Ins', segment: 'Private Car Motor', businessType: 'Roll Over', grossPremium: 42500, netPremium: 36000, odComm: 18.5, tpComm: 2.5, commAmount: 6660, payoutDate: '2026-10-12', status: 'Paid' },
    { id: 2, agentCode: 'AG-204', agentName: 'Sneha Shrikant Kulkarni', mobile: '9423088192', branch: 'PUNE', policyNo: 'POL-2026-9902', company: 'Tata AIG Gen Ins', segment: 'Two Wheeler Comprehensive', businessType: 'New Business', grossPremium: 18900, netPremium: 16000, odComm: 22.0, tpComm: 2.5, commAmount: 3520, payoutDate: '2026-10-12', status: 'Paid' },
    { id: 3, agentCode: 'AG-305', agentName: 'Rahul Jagdish Sharma', mobile: '9763190284', branch: 'SOLAPUR', policyNo: 'POL-2026-9903', company: 'HDFC ERGO General', segment: 'Commercial Goods Vehicle', businessType: 'Renewal', grossPremium: 68000, netPremium: 57600, odComm: 16.0, tpComm: 2.0, commAmount: 9216, payoutDate: '2026-10-11', status: 'Processing' },
    { id: 4, agentCode: 'AG-412', agentName: 'Priya Ramesh Verma', mobile: '9820391823', branch: 'MUMBAI', policyNo: 'POL-2026-9904', company: 'ICICI Lombard Gen Ins', segment: 'Passenger Carrying (PCV)', businessType: 'New Business', grossPremium: 29400, netPremium: 24900, odComm: 15.0, tpComm: 2.0, commAmount: 3735, payoutDate: '2026-10-10', status: 'Paid' },
    { id: 5, agentCode: 'AG-510', agentName: 'Sanjay Bapurao Patil', mobile: '9881029145', branch: 'AHILYANAGAR', policyNo: 'POL-2026-9905', company: 'Go Digit Gen Ins', segment: 'Commercial Tractor / Agri', businessType: 'Roll Over', grossPremium: 52100, netPremium: 44100, odComm: 17.5, tpComm: 2.0, commAmount: 7717.5, payoutDate: '2026-10-09', status: 'Pending' },
    { id: 6, agentCode: 'AG-601', agentName: 'Rohit Sharad Kadam', mobile: '9921049281', branch: 'NAGPUR', policyNo: 'POL-2026-9906', company: 'SBI General Insurance', segment: 'Non Motor & Fire', businessType: 'New Business', grossPremium: 74000, netPremium: 62700, odComm: 20.0, tpComm: 0.0, commAmount: 12540, payoutDate: '2026-10-08', status: 'Paid' },
    { id: 7, agentCode: 'AG-708', agentName: 'Aditya Rajendra Sapkal', mobile: '9860124819', branch: 'SATARA', policyNo: 'POL-2026-9907', company: 'Bajaj Allianz Gen Ins', segment: 'Private Car Comprehensive', businessType: 'Renewal', grossPremium: 38700, netPremium: 32800, odComm: 18.0, tpComm: 2.5, commAmount: 5904, payoutDate: '2026-10-08', status: 'Paid' },
  ];

  // 10. TDS Report
  const tdsReportData = [
    { id: 1, deducteeName: 'Amit Tukaram Deshmukh', deducteeCode: 'AG-102', panNo: 'ABCDE1234F', section: '194H', quarter: 'Q2 (Jul-Sep 2026)', grossCommission: 185400, tdsRate: 5.0, tdsAmount: 9270, surcharge: 0, challanRef: 'BSR0029144/CHQ01', status: 'Deposited' },
    { id: 2, deducteeName: 'Sneha Shrikant Kulkarni', deducteeCode: 'AG-204', panNo: 'BCDEF2345G', section: '194H', quarter: 'Q2 (Jul-Sep 2026)', grossCommission: 242000, tdsRate: 5.0, tdsAmount: 12100, surcharge: 0, challanRef: 'BSR0029144/CHQ02', status: 'Deposited' },
    { id: 3, deducteeName: 'Reliable Baramati City Point', deducteeCode: 'FR-BAR-01', panNo: 'AABFR8819M', section: '194H', quarter: 'Q2 (Jul-Sep 2026)', grossCommission: 345600, tdsRate: 5.0, tdsAmount: 17280, surcharge: 0, challanRef: 'BSR0029144/CHQ03', status: 'Deposited' },
    { id: 4, deducteeName: 'Rahul Jagdish Sharma', deducteeCode: 'AG-305', panNo: 'CDEFG3456H', section: '194H', quarter: 'Q2 (Jul-Sep 2026)', grossCommission: 156800, tdsRate: 5.0, tdsAmount: 7840, surcharge: 0, challanRef: 'BSR0029144/CHQ04', status: 'Deposited' },
    { id: 5, deducteeName: 'Reliable Hadapsar Hub', deducteeCode: 'FR-PUN-04', panNo: 'AABFR9912K', section: '194H', quarter: 'Q3 (Oct-Dec 2026)', grossCommission: 460800, tdsRate: 5.0, tdsAmount: 23040, surcharge: 0, challanRef: 'Draft / In Process', status: 'Pending Challan' },
    { id: 6, deducteeName: 'Priya Ramesh Verma', deducteeCode: 'AG-412', panNo: 'DEFGH4567J', section: '194H', quarter: 'Q2 (Jul-Sep 2026)', grossCommission: 198000, tdsRate: 5.0, tdsAmount: 9900, surcharge: 0, challanRef: 'BSR0029144/CHQ05', status: 'Deposited' },
  ];

  // 11. Vehicle History
  const vehicleHistoryData = [
    { id: 1, regNo: 'MH-12-PQ-4567', makeModel: 'Maruti Suzuki Swift VXI', mfgYear: 2022, chassisNo: 'MA3EWB32S00192834', engineNo: 'K12MN8921045', policyYear: '2026-2027', policyNo: 'POL-MOT-2026-8812', insurer: 'Bajaj Allianz Gen', premium: 14850, claimFiled: 'No', ncb: 35, status: 'Active Policy' },
    { id: 2, regNo: 'MH-42-BA-9921', makeModel: 'Hyundai Creta 1.5 SX', mfgYear: 2023, chassisNo: 'MALC381CL00829142', engineNo: 'G4FLM7728190', policyYear: '2026-2027', policyNo: 'POL-MOT-2026-9914', insurer: 'Tata AIG Gen Ins', premium: 28400, claimFiled: 'Yes', ncb: 0, status: 'Active Policy' },
    { id: 3, regNo: 'MH-14-GH-1204', makeModel: 'Tata Ace Gold Petrol', mfgYear: 2021, chassisNo: 'MAT612019N0048192', engineNo: '275MPT091823', policyYear: '2025-2026', policyNo: 'POL-MOT-2025-3310', insurer: 'ICICI Lombard Gen', premium: 21600, claimFiled: 'No', ncb: 25, status: 'Expired' },
    { id: 4, regNo: 'MH-11-AX-7788', makeModel: 'Mahindra Bolero Pickup Extra Long', mfgYear: 2020, chassisNo: 'MA1TA2WJ00591823', engineNo: 'MDI3200TC88192', policyYear: '2026-2027', policyNo: 'POL-MOT-2026-1102', insurer: 'HDFC ERGO Gen Ins', premium: 34200, claimFiled: 'No', ncb: 45, status: 'Active Policy' },
    { id: 5, regNo: 'MH-09-EF-3344', makeModel: 'Honda Activa 6G Deluxe', mfgYear: 2024, chassisNo: 'ME4JF9124P0081924', engineNo: 'JF91EP771928', policyYear: '2026-2027', policyNo: 'POL-MOT-2026-4401', insurer: 'Go Digit Gen Ins', premium: 3850, claimFiled: 'No', ncb: 20, status: 'Renewed' },
  ];

  // 12. Day Book
  const dayBookData = [
    { id: 1, voucherNo: 'VCH-2026-0901', date: '2026-10-12', accountHead: 'Agent Commission Payout', narration: 'Commission disbursement to Amit Deshmukh for Sept Batch', debit: 45000, credit: 0, balance: 1420500, mode: 'Bank', enteredBy: 'Accounts Officer 1', branch: 'BARAMATI HEAD OFFICE' },
    { id: 2, voucherNo: 'VCH-2026-0902', date: '2026-10-12', accountHead: 'Customer Premium Cash Collection', narration: 'Cash premium received for POL-MOT-9912 by Arvind', debit: 0, credit: 38500, balance: 1459000, mode: 'Cash', enteredBy: 'Cashier Desk', branch: 'BARAMATI HEAD OFFICE' },
    { id: 3, voucherNo: 'VCH-2026-0903', date: '2026-10-12', accountHead: 'Office Electricity & Utility Exp', narration: 'MSEDCL electricity bill payment Baramati Branch', debit: 8400, credit: 0, balance: 1450600, mode: 'Bank', enteredBy: 'Admin Assistant', branch: 'BARAMATI HEAD OFFICE' },
    { id: 4, voucherNo: 'VCH-2026-0904', date: '2026-10-12', accountHead: 'Franchise Royalty Receivable', narration: 'Monthly franchise share received from Hadapsar Hub', debit: 0, credit: 153600, balance: 1604200, mode: 'Bank', enteredBy: 'Accounts Officer 2', branch: 'PUNE' },
    { id: 5, voucherNo: 'VCH-2026-0905', date: '2026-10-12', accountHead: 'Cheque Bounce Penalty Recovery', narration: 'Bounce penalty collected from Santosh Raut', debit: 0, credit: 500, balance: 1604700, mode: 'Cash', enteredBy: 'Cashier Desk', branch: 'PUNE' },
  ];

  // 13. Agent TDS Report
  const agentTdsData = [
    { id: 1, agentCode: 'AG-102', agentName: 'Amit Tukaram Deshmukh', panNo: 'ABCDE1234F', branch: 'BARAMATI HEAD OFFICE', grossComm: 185400, tdsAmount: 9270, netPayout: 176130, financialYear: '2026-2027', quarter: 'Q2', form16AStatus: 'Issued', certNo: '16A-2026-Q2-102' },
    { id: 2, agentCode: 'AG-204', agentName: 'Sneha Shrikant Kulkarni', panNo: 'BCDEF2345G', branch: 'PUNE', grossComm: 242000, tdsAmount: 12100, netPayout: 229900, financialYear: '2026-2027', quarter: 'Q2', form16AStatus: 'Issued', certNo: '16A-2026-Q2-204' },
    { id: 3, agentCode: 'AG-305', agentName: 'Rahul Jagdish Sharma', panNo: 'CDEFG3456H', branch: 'SOLAPUR', grossComm: 156800, tdsAmount: 7840, netPayout: 148960, financialYear: '2026-2027', quarter: 'Q2', form16AStatus: 'Generated', certNo: '16A-2026-Q2-305' },
    { id: 4, agentCode: 'AG-412', agentName: 'Priya Ramesh Verma', panNo: 'DEFGH4567J', branch: 'MUMBAI', grossComm: 198000, tdsAmount: 9900, netPayout: 188100, financialYear: '2026-2027', quarter: 'Q2', form16AStatus: 'Pending', certNo: 'N/A' },
    { id: 5, agentCode: 'AG-510', agentName: 'Sanjay Bapurao Patil', panNo: 'EFGHI5678K', branch: 'AHILYANAGAR', grossComm: 124500, tdsAmount: 6225, netPayout: 118275, financialYear: '2026-2027', quarter: 'Q2', form16AStatus: 'Issued', certNo: '16A-2026-Q2-510' },
  ];

  // 14. Active or InActive Agent
  const activeInactiveAgentData = [
    { id: 1, agentCode: 'AG-102', agentName: 'Amit Tukaram Deshmukh', branch: 'BARAMATI HEAD OFFICE', mobile: '9822019284', regDate: '2024-03-15', lastBusinessDate: '2026-10-12', policiesThisYear: 142, premiumThisYear: 3840000, status: 'Active', reason: 'High Performing Lead Agent', executive: 'Arvind Gawade' },
    { id: 2, agentCode: 'AG-204', agentName: 'Sneha Shrikant Kulkarni', branch: 'PUNE', mobile: '9423088192', regDate: '2024-05-10', lastBusinessDate: '2026-10-11', policiesThisYear: 198, premiumThisYear: 5120000, status: 'Active', reason: 'Consistent Top Volume', executive: 'Hemant Kakulte' },
    { id: 3, agentCode: 'AG-305', agentName: 'Rahul Jagdish Sharma', branch: 'SOLAPUR', mobile: '9763190284', regDate: '2024-08-22', lastBusinessDate: '2026-10-09', policiesThisYear: 84, premiumThisYear: 2450000, status: 'Active', reason: 'Commercial Specialist', executive: 'Aditya Sapkal' },
    { id: 4, agentCode: 'AG-388', agentName: 'Deepak Vasant Shinde', branch: 'BARAMATI HEAD OFFICE', mobile: '9890124419', regDate: '2025-01-12', lastBusinessDate: '2026-05-18', policiesThisYear: 4, premiumThisYear: 62000, status: 'Inactive', reason: 'No Business in Last 120 Days', executive: 'Arvind Gawade' },
    { id: 5, agentCode: 'AG-412', agentName: 'Priya Ramesh Verma', branch: 'MUMBAI', mobile: '9820391823', regDate: '2024-09-01', lastBusinessDate: '2026-10-08', policiesThisYear: 112, premiumThisYear: 3240000, status: 'Active', reason: 'Active Mumbai Region', executive: 'Shekhar Jadhav' },
    { id: 6, agentCode: 'AG-499', agentName: 'Kishor Baburao Mane', branch: 'SATARA', mobile: '9921048192', regDate: '2024-11-20', lastBusinessDate: '2026-03-01', policiesThisYear: 0, premiumThisYear: 0, status: 'Suspended', reason: 'Compliance KYC Deficiency', executive: 'Rohit Shinde' },
  ];

  // 15. Online To RA Approval
  const onlineToRaApprovalData = [
    { id: 1, requestId: 'REQ-ONL-8821', requestDate: '2026-10-12', customerName: 'Swapnil Sanjay Gaikwad', mobile: '9881029182', product: 'Motor Two Wheeler Comprehensive', proposedInsurer: 'Bajaj Allianz Gen', premium: 3450, kycStatus: 'Verified', raReviewer: 'Senior Underwriter 1', status: 'Approved' },
    { id: 2, requestId: 'REQ-ONL-8822', requestDate: '2026-10-12', customerName: 'Pratibha Madhukar Kadam', mobile: '9422019842', product: 'Motor Private Car Package', proposedInsurer: 'Tata AIG Gen Ins', premium: 16800, kycStatus: 'Verified', raReviewer: 'Senior Underwriter 2', status: 'Under Review' },
    { id: 3, requestId: 'REQ-ONL-8823', requestDate: '2026-10-11', customerName: 'Rajdeep Sugar Transport', mobile: '9823190821', product: 'Commercial Heavy Goods (HCV)', proposedInsurer: 'ICICI Lombard Gen', premium: 78500, kycStatus: 'Pending', raReviewer: 'Awaiting Fitness & RC copy', status: 'Needs Clarification' },
    { id: 4, requestId: 'REQ-ONL-8824', requestDate: '2026-10-11', customerName: 'Dhananjay Bapu Thorat', mobile: '9764029183', product: 'Private Car Comprehensive', proposedInsurer: 'Go Digit Gen Ins', premium: 22400, kycStatus: 'Verified', raReviewer: 'Senior Underwriter 1', status: 'Approved' },
    { id: 5, requestId: 'REQ-ONL-8825', requestDate: '2026-10-10', customerName: 'Aniket Ravindra Patil', mobile: '9922104928', product: 'Health Optima Individual', proposedInsurer: 'Star Health & Allied', premium: 14200, kycStatus: 'Verified', raReviewer: 'Senior Underwriter 2', status: 'Approved' },
  ];

  // 16. Policy Cancel Report
  const policyCancelData = [
    { id: 1, cancelDate: '2026-10-10', policyNo: 'POL-CAN-4019', company: 'Bajaj Allianz Gen', customerName: 'Hanumant Ramchandra Pawar', agentName: 'Amit Deshmukh', issueDate: '2026-09-28', grossPremium: 28500, cancelReason: 'Customer Sold Vehicle to Dealer', refundAmt: 24200, clawbackAmt: 3400, branch: 'BARAMATI HEAD OFFICE', status: 'Cancelled' },
    { id: 2, cancelDate: '2026-10-08', policyNo: 'POL-CAN-4020', company: 'Tata AIG Gen Ins', customerName: 'Sandip Dattatray Shinde', agentName: 'Sneha Kulkarni', issueDate: '2026-09-25', grossPremium: 14800, cancelReason: 'Duplicate Policy Issued by Financer', refundAmt: 14800, clawbackAmt: 2200, branch: 'PUNE', status: 'Refund Processed' },
    { id: 3, cancelDate: '2026-10-05', policyNo: 'POL-CAN-4021', company: 'ICICI Lombard Gen', customerName: 'Ganesh Pandurang Kale', agentName: 'Amit Deshmukh', issueDate: '2026-09-20', grossPremium: 28500, cancelReason: 'Premium Cheque Dishonoured', refundAmt: 0, clawbackAmt: 4200, branch: 'BARAMATI HEAD OFFICE', status: 'Cancelled' },
    { id: 4, cancelDate: '2026-10-02', policyNo: 'POL-CAN-4022', company: 'Go Digit Gen Ins', customerName: 'Sunita Vijay Jagdale', agentName: 'Rahul Sharma', issueDate: '2026-09-15', grossPremium: 9800, cancelReason: 'Proposal Withdrawn (Cooling-off Period)', refundAmt: 9300, clawbackAmt: 1400, branch: 'SOLAPUR', status: 'Refund Processed' },
  ];

  // 17. Payment Report
  const paymentData = [
    { id: 1, paymentId: 'PAY-2026-1001', paymentDate: '2026-10-12', payeeName: 'Amit Tukaram Deshmukh', payeeType: 'Agent Commission', bankName: 'HDFC Bank Ltd', accountNo: '50100291823910', mode: 'NEFT', amount: 88500, utrNo: 'HDFCN26101290182', status: 'Success', processedBy: 'Shekhar (Admin)' },
    { id: 2, paymentId: 'PAY-2026-1002', paymentDate: '2026-10-12', payeeName: 'Sneha Shrikant Kulkarni', payeeType: 'Agent Commission', bankName: 'ICICI Bank Ltd', accountNo: '00290182391028', mode: 'IMPS', amount: 115000, utrNo: 'ICICIM26101244192', status: 'Success', processedBy: 'Shekhar (Admin)' },
    { id: 3, paymentId: 'PAY-2026-1003', paymentDate: '2026-10-11', payeeName: 'Reliable Baramati City Point', payeeType: 'Franchise Payout', bankName: 'State Bank of India', accountNo: '30291829102839', mode: 'RTGS', amount: 328320, utrNo: 'SBINR26101100291', status: 'Success', processedBy: 'Accounts Officer 1' },
    { id: 4, paymentId: 'PAY-2026-1004', paymentDate: '2026-10-11', payeeName: 'Sandip Dattatray Shinde', payeeType: 'Customer Refund', bankName: 'Bank of Maharashtra', accountNo: '60192839102844', mode: 'NEFT', amount: 14800, utrNo: 'MAHBN26101188391', status: 'Success', processedBy: 'Accounts Officer 2' },
    { id: 5, paymentId: 'PAY-2026-1005', paymentDate: '2026-10-10', payeeName: 'Abhay Chandrakant Jagdale', payeeType: 'Customer Cashback', bankName: 'Axis Bank Ltd', accountNo: '91201004819201', mode: 'UPI', amount: 1500, utrNo: 'AXISU26101033102', status: 'Success', processedBy: 'Admin Assistant' },
    { id: 6, paymentId: 'PAY-2026-1006', paymentDate: '2026-10-10', payeeName: 'Reliable Hadapsar Hub', payeeType: 'Franchise Payout', bankName: 'HDFC Bank Ltd', accountNo: '50200019283918', mode: 'RTGS', amount: 437760, utrNo: 'Pending Bank Clearance', status: 'Processing', processedBy: 'Accounts Officer 1' },
  ];

  // 18. View Policy (NEW)
  const viewPolicyData = [
    { id: 1, policyNo: 'POL-MOT-2026-8812', customerName: 'Rahul Tukaram Deshmukh', mobile: '9822019284', regNo: 'MH-12-PQ-4567', makeModel: 'Maruti Suzuki Swift VXI', insurer: 'Bajaj Allianz Gen Ins', product: 'Motor Private Car Package', issueDate: '2026-10-01', riskStartDate: '2026-10-02', riskEndDate: '2027-10-01', grossPremium: 14850, netPremium: 12580, branch: 'BARAMATI HEAD OFFICE', agentName: 'Amit Deshmukh', status: 'Active Policy', docType: 'E-Policy PDF' },
    { id: 2, policyNo: 'POL-MOT-2026-9914', customerName: 'Rajendra Anantrao Pawar', mobile: '9423088192', regNo: 'MH-42-BA-9921', makeModel: 'Hyundai Creta 1.5 SX', insurer: 'Tata AIG Gen Ins', product: 'Private Car Comprehensive', issueDate: '2026-10-04', riskStartDate: '2026-10-05', riskEndDate: '2027-10-04', grossPremium: 28400, netPremium: 24060, branch: 'PUNE', agentName: 'Sneha Kulkarni', status: 'Active Policy', docType: 'E-Policy PDF' },
    { id: 3, policyNo: 'POL-MOT-2026-7712', customerName: 'Siddheshwar Namdeo Shinde', mobile: '9763190284', regNo: 'MH-11-AX-7788', makeModel: 'Mahindra Bolero Pickup Ext Long', insurer: 'HDFC ERGO General', product: 'Commercial Goods Vehicle', issueDate: '2026-10-06', riskStartDate: '2026-10-07', riskEndDate: '2027-10-06', grossPremium: 38500, netPremium: 32620, branch: 'BARAMATI HEAD OFFICE', agentName: 'Arvind Gawade', status: 'Active Policy', docType: 'E-Policy PDF' },
    { id: 4, policyNo: 'POL-MOT-2026-4401', customerName: 'Vijay Vasant Thorat', mobile: '9820391823', regNo: 'MH-09-EF-3344', makeModel: 'Honda Activa 6G Deluxe', insurer: 'Go Digit Gen Ins', product: 'Two Wheeler 1yr OD + 5yr TP', issueDate: '2026-10-08', riskStartDate: '2026-10-08', riskEndDate: '2027-10-07', grossPremium: 3850, netPremium: 3260, branch: 'SOLAPUR', agentName: 'Rahul Sharma', status: 'Active Policy', docType: 'E-Policy PDF' },
    { id: 5, policyNo: 'POL-MOT-2025-3310', customerName: 'Kunal Ashok Jadhav', mobile: '9881029145', regNo: 'MH-14-GH-1204', makeModel: 'Tata Ace Gold Petrol', insurer: 'ICICI Lombard Gen Ins', product: 'Commercial Vehicle Package', issueDate: '2025-09-15', riskStartDate: '2025-09-16', riskEndDate: '2026-09-15', grossPremium: 21600, netPremium: 18300, branch: 'MUMBAI', agentName: 'Priya Verma', status: 'Expired', docType: 'E-Policy PDF' },
    { id: 6, policyNo: 'POL-CAN-4019', customerName: 'Hanumant Ramchandra Pawar', mobile: '9921049281', regNo: 'MH-12-KL-8822', makeModel: 'Maruti Suzuki Dzire VXI', insurer: 'Bajaj Allianz Gen Ins', product: 'Motor Private Car Package', issueDate: '2026-09-28', riskStartDate: '2026-09-29', riskEndDate: '2027-09-28', grossPremium: 28500, netPremium: 24150, branch: 'BARAMATI HEAD OFFICE', agentName: 'Amit Deshmukh', status: 'Cancelled', docType: 'Cancellation Notice' },
  ];

  // =========================================================================
  // ACTIVE DATA RESOLUTION & SEARCH FILTERING
  // =========================================================================

  const rawActiveData = useMemo(() => {
    switch (activeTab) {
      case 'cutNPay': return cutNPayData;
      case 'endorsement': return endorsementData;
      case 'chequeBounce': return chequeBounceData;
      case 'profit': return profitData;
      case 'franchiseProfit': return franchiseProfitData;
      case 'cashback': return cashbackData;
      case 'companyWiseAgentGrid': return companyWiseAgentGridData;
      case 'premiumCashApproval': return premiumCashApprovalData;
      case 'viewAllAgentCommission': return viewAllAgentCommissionData;
      case 'tdsReport': return tdsReportData;
      case 'vehicleHistory': return vehicleHistoryData;
      case 'dayBook': return dayBookData;
      case 'agentTdsReport': return agentTdsData;
      case 'activeInactiveAgent': return activeInactiveAgentData;
      case 'onlineToRaApproval': return onlineToRaApprovalData;
      case 'policyCancelReport': return policyCancelData;
      case 'paymentReport': return paymentData;
      case 'viewPolicy': return viewPolicyData;
      default: return [];
    }
  }, [activeTab]);

  const filteredData = useMemo(() => {
    return rawActiveData.filter((row: any) => {
      // Branch filter
      if (selectedBranch !== 'ALL' && row.branch && row.branch !== selectedBranch) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'ALL' && row.status && row.status !== statusFilter) {
        return false;
      }
      // Text Search
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match = Object.values(row).some((val) => {
          if (val === null || val === undefined) return false;
          return String(val).toLowerCase().includes(q);
        });
        if (!match) return false;
      }
      return true;
    });
  }, [rawActiveData, selectedBranch, statusFilter, searchQuery]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const activeTabMeta = tabsList.find(t => t.key === activeTab) || tabsList[0];

  // =========================================================================
  // EXPORT CSV HELPER
  // =========================================================================
  const exportToCSV = () => {
    if (filteredData.length === 0) {
      alert('No records available to export.');
      return;
    }
    const headers = Object.keys(filteredData[0]).filter(k => k !== 'id');
    const csvRows = [
      headers.join(','),
      ...filteredData.map((row: any) =>
        headers.map(h => `"${String(row[h] ?? '').replace(/"/g, '""')}"`).join(',')
      )
    ];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeTabMeta.label.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Status Badge Colors
  const renderStatusBadge = (status: string) => {
    const s = String(status).toLowerCase();
    let badgeClass = 'bg-slate-100 text-slate-700 border-slate-300';

    if (s.includes('active') || s.includes('approved') || s.includes('completed') || s.includes('paid') || s.includes('success') || s.includes('issued') || s.includes('deposited') || s.includes('verified')) {
      badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    } else if (s.includes('pending') || s.includes('process') || s.includes('review') || s.includes('clarification')) {
      badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
    } else if (s.includes('partially')) {
      badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
    } else if (s.includes('bounce') || s.includes('cancel') || s.includes('inactive') || s.includes('suspended') || s.includes('rejected') || s.includes('discrepancy') || s.includes('expired') || s.includes('failed')) {
      badgeClass = 'bg-rose-50 text-rose-700 border-rose-200';
    }

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeClass}`}>
        {status}
      </span>
    );
  };

  // KPI Metrics Calculation for active tab
  const kpiMetrics = useMemo(() => {
    const count = filteredData.length;
    let metric1Label = 'Total Records';
    let metric1Value = String(count);

    let metric2Label = 'Total Value / Amount';
    let totalAmt = 0;
    filteredData.forEach((r: any) => {
      const val = r.grossPremium || r.chequeAmount || r.netProfit || r.cashbackAmt || r.cashCollected || r.tdsAmount || r.amount || r.refundAmt || r.commAmount || 0;
      totalAmt += val;
    });
    let metric2Value = formatCurrency(totalAmt);

    let metric3Label = 'Active / Approved';
    let metric3Count = filteredData.filter((r: any) => {
      const s = String(r.status || '').toLowerCase();
      return s.includes('active') || s.includes('approved') || s.includes('completed') || s.includes('paid') || s.includes('success') || s.includes('deposited');
    }).length;

    let metric4Label = 'Pending / Action Req.';
    let metric4Count = filteredData.filter((r: any) => {
      const s = String(r.status || '').toLowerCase();
      return s.includes('pending') || s.includes('process') || s.includes('inspection') || s.includes('notice') || s.includes('discrepancy');
    }).length;

    return [
      { label: metric1Label, value: metric1Value, icon: FileSpreadsheet, color: 'text-blue-600 bg-blue-50' },
      { label: metric2Label, value: metric2Value, icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
      { label: metric3Label, value: String(metric3Count), icon: CheckCircle2, color: 'text-indigo-600 bg-indigo-50' },
      { label: metric4Label, value: String(metric4Count), icon: Clock, color: 'text-amber-600 bg-amber-50' },
    ];
  }, [filteredData, activeTab]);

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5 font-sans">
      {/* Top Header Bar */}
      <PageHeader
        title="Reports & Analytics"
        description="Comprehensive Cut N Pay, Endorsements, Profits, TDS, Cheque Bounce, Policies & Commission Reports"
      />

      {/* 2-Row Full-Width Sub-Tabs Navigation (18 Buttons = 9 in Row 1 + 9 in Row 2) */}
      <div className="bg-white rounded-2xl border border-brand-border p-3 space-y-2.5 shadow-sm w-full max-w-full">
        {/* Row 1: First 9 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-2 w-full border-b border-slate-200 pb-2.5">
          {tabsList.slice(0, 9).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setCurrentPage(1);
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setSearchParams({ tab: tab.key });
                }}
                className={`w-full py-2.5 px-2 rounded-full text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                  }`}
                title={tab.label}
              >
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Remaining 9 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-9 gap-2 w-full">
          {tabsList.slice(9).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setCurrentPage(1);
                  setSearchQuery('');
                  setStatusFilter('ALL');
                  setSearchParams({ tab: tab.key });
                }}
                className={`w-full py-2.5 px-2 rounded-full text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                  }`}
                title={tab.label}
              >
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dedicated ERP views for all reports matching legacy screenshots */}
      {activeTab === 'viewAllAgentCommission' ? (
        <ViewAllAgentCommissionTab />
      ) : activeTab === 'viewPolicy' ? (
        <ViewPolicyTab />
      ) : activeTab === 'endorsement' ? (
        <EndorsementReportTab />
      ) : activeTab === 'chequeBounce' ? (
        <ChequeBounceReportTab />
      ) : activeTab === 'profit' ? (
        <ProfitReportTab />
      ) : activeTab === 'cashback' ? (
        <CashbackReportTab />
      ) : activeTab === 'companyWiseAgentGrid' ? (
        <CompanyWiseAgentGridTab />
      ) : activeTab === 'premiumCashApproval' ? (
        <PremiumCashApprovalReportTab />
      ) : activeTab === 'tdsReport' ? (
        <TdsReportTab />
      ) : activeTab === 'vehicleHistory' ? (
        <VehicleHistoryTab />
      ) : activeTab === 'dayBook' ? (
        <DayBookTab />
      ) : activeTab === 'agentTdsReport' ? (
        <AgentTdsReportTab />
      ) : activeTab === 'activeInactiveAgent' ? (
        <ActiveInactiveAgentTab />
      ) : activeTab === 'onlineToRaApproval' ? (
        <OnlineToRaApprovalTab />
      ) : activeTab === 'policyCancelReport' ? (
        <PolicyCancelReportTab />
      ) : activeTab === 'paymentReport' ? (
        <PaymentReportTab />
      ) : (
        <>
          {/* KPI Overview Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {kpiMetrics.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-xl border border-brand-border p-4 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-[12px] font-medium text-slate-500 uppercase tracking-wider">{kpi.label}</p>
                <p className="text-xl font-bold text-slate-900 mt-1">{kpi.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${kpi.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Full-Width Content Container */}
      <div key={activeTab} className="tab-transition-wrapper w-full max-w-full">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full max-w-full">

          {/* Card Header Banner */}
          <div className="bg-brand-lightbg text-brand-navy px-4 py-3 font-semibold text-[14px] border-b border-brand-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-slate-900">{activeTabMeta.label}</span>
              <span className="text-xs bg-brand-primary/10 text-brand-primary px-2.5 py-0.5 rounded-full font-semibold ml-2">
                {filteredData.length} Records Found
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={exportToCSV}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer border-none"
                title="Download report data in CSV spreadsheet format"
              >
                <Download size={14} />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 items-end w-full">
            {/* From Date */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:outline-none"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:outline-none"
              />
            </div>

            {/* Branch Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Branch</label>
              <select
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:outline-none"
              >
                {branches.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:outline-none"
              >
                <option value="ALL">-- ALL STATUSES --</option>
                <option value="Approved">Approved / Active / Paid</option>
                <option value="Pending">Pending / In Process</option>
                <option value="Partially Paid">Partially Paid</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="lg:col-span-1">
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Search Keywords</label>
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Policy, Name, Code..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:outline-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                className="flex-1 py-1.5 px-3 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg text-xs font-bold uppercase shadow-sm transition-all cursor-pointer border-none flex items-center justify-center gap-1.5"
              >
                <Eye size={14} />
                <span>Show</span>
              </button>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBranch('ALL');
                  setStatusFilter('ALL');
                  setCurrentPage(1);
                }}
                className="py-1.5 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer border-none flex items-center justify-center"
                title="Reset Filters"
              >
                <RefreshCw size={14} />
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse text-[12px]">
              {/* Dynamic Header Based on Active Tab */}
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                  <th className="py-3 px-4 text-center w-14">SR. NO.</th>

                  {activeTab === 'cutNPay' && (
                    <>
                      <th className="py-3 px-3.5">Risk / Trans Date</th>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Insured Name</th>
                      <th className="py-3 px-3.5">Insurance Company</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5">Agent</th>
                      <th className="py-3 px-3.5 text-right">Gross Prem (₹)</th>
                      <th className="py-3 px-3.5 text-right">Cut N Pay (₹)</th>
                      <th className="py-3 px-3.5 text-right">Balance Due (₹)</th>
                      <th className="py-3 px-3.5">Mode</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'endorsement' && (
                    <>
                      <th className="py-3 px-3.5">Endorsement Date</th>
                      <th className="py-3 px-3.5">Endorsement No</th>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Customer Name</th>
                      <th className="py-3 px-3.5">Company</th>
                      <th className="py-3 px-3.5">Endorsement Type</th>
                      <th className="py-3 px-3.5 text-right">Prem Diff (₹)</th>
                      <th className="py-3 px-3.5">Old Value</th>
                      <th className="py-3 px-3.5">New Value</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'chequeBounce' && (
                    <>
                      <th className="py-3 px-3.5">Cheque No & Date</th>
                      <th className="py-3 px-3.5">Bounce Date</th>
                      <th className="py-3 px-3.5">Bank Name</th>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Customer Name</th>
                      <th className="py-3 px-3.5">Agent Name</th>
                      <th className="py-3 px-3.5 text-right">Cheque Amt (₹)</th>
                      <th className="py-3 px-3.5">Bounce Reason</th>
                      <th className="py-3 px-3.5 text-right">Penalty (₹)</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5 text-center">Recovery Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'profit' && (
                    <>
                      <th className="py-3 px-3.5">Insurance Company</th>
                      <th className="py-3 px-3.5">Segment / Product</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5 text-right">Gross Prem (₹)</th>
                      <th className="py-3 px-3.5 text-right">Net Prem (₹)</th>
                      <th className="py-3 px-3.5 text-right">Company Comm (₹)</th>
                      <th className="py-3 px-3.5 text-right">Payout Comm (₹)</th>
                      <th className="py-3 px-3.5 text-right">Reliable Profit (₹)</th>
                      <th className="py-3 px-3.5 text-center">Margin %</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'franchiseProfit' && (
                    <>
                      <th className="py-3 px-3.5">Franchise Code</th>
                      <th className="py-3 px-3.5">Franchise Name</th>
                      <th className="py-3 px-3.5">Location</th>
                      <th className="py-3 px-3.5 text-center">Policies</th>
                      <th className="py-3 px-3.5 text-right">Gross Prem (₹)</th>
                      <th className="py-3 px-3.5 text-right">Franchise Share (₹)</th>
                      <th className="py-3 px-3.5 text-right">RA Share (₹)</th>
                      <th className="py-3 px-3.5 text-right">TDS 5% (₹)</th>
                      <th className="py-3 px-3.5 text-right">Net Payable (₹)</th>
                      <th className="py-3 px-3.5 text-center">Payout Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'cashback' && (
                    <>
                      <th className="py-3 px-3.5">Date</th>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Customer Name</th>
                      <th className="py-3 px-3.5">Agent Name</th>
                      <th className="py-3 px-3.5">Product Type</th>
                      <th className="py-3 px-3.5 text-right">Gross Prem (₹)</th>
                      <th className="py-3 px-3.5 text-right">Cashback (₹)</th>
                      <th className="py-3 px-3.5">Payment Mode</th>
                      <th className="py-3 px-3.5">UTR / Ref No</th>
                      <th className="py-3 px-3.5">Approved By</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'companyWiseAgentGrid' && (
                    <>
                      <th className="py-3 px-3.5">Agent Code</th>
                      <th className="py-3 px-3.5">Agent Name</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5">Company</th>
                      <th className="py-3 px-3.5">Segment</th>
                      <th className="py-3 px-3.5 text-center">OD Comm %</th>
                      <th className="py-3 px-3.5 text-center">TP Comm %</th>
                      <th className="py-3 px-3.5 text-center">Net Comm %</th>
                      <th className="py-3 px-3.5 text-center">Reward %</th>
                      <th className="py-3 px-3.5">Effective Date</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'premiumCashApproval' && (
                    <>
                      <th className="py-3 px-3.5">Collection Date</th>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Customer Name</th>
                      <th className="py-3 px-3.5">Executive</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5 text-right">Collected (₹)</th>
                      <th className="py-3 px-3.5">Deposit Slip No</th>
                      <th className="py-3 px-3.5">Handover Date</th>
                      <th className="py-3 px-3.5">RA Approver</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'viewAllAgentCommission' && (
                    <>
                      <th className="py-3 px-3.5">Agent</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Company</th>
                      <th className="py-3 px-3.5">Segment</th>
                      <th className="py-3 px-3.5">Type</th>
                      <th className="py-3 px-3.5 text-right">Gross Prem (₹)</th>
                      <th className="py-3 px-3.5 text-right">Net Prem (₹)</th>
                      <th className="py-3 px-3.5 text-center">OD %</th>
                      <th className="py-3 px-3.5 text-center">TP %</th>
                      <th className="py-3 px-3.5 text-right">Comm Amount (₹)</th>
                      <th className="py-3 px-3.5">Payout Date</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'tdsReport' && (
                    <>
                      <th className="py-3 px-3.5">Deductee Name</th>
                      <th className="py-3 px-3.5">Code</th>
                      <th className="py-3 px-3.5">PAN No</th>
                      <th className="py-3 px-3.5">Section</th>
                      <th className="py-3 px-3.5">Quarter</th>
                      <th className="py-3 px-3.5 text-right">Gross Comm (₹)</th>
                      <th className="py-3 px-3.5 text-center">TDS Rate</th>
                      <th className="py-3 px-3.5 text-right">TDS Amt (₹)</th>
                      <th className="py-3 px-3.5">Challan Ref</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'vehicleHistory' && (
                    <>
                      <th className="py-3 px-3.5">Registration No</th>
                      <th className="py-3 px-3.5">Make & Model</th>
                      <th className="py-3 px-3.5 text-center">Mfg Year</th>
                      <th className="py-3 px-3.5">Chassis No</th>
                      <th className="py-3 px-3.5">Engine No</th>
                      <th className="py-3 px-3.5">Policy Year</th>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Insurer</th>
                      <th className="py-3 px-3.5 text-right">Premium (₹)</th>
                      <th className="py-3 px-3.5 text-center">Claim</th>
                      <th className="py-3 px-3.5 text-center">NCB %</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'dayBook' && (
                    <>
                      <th className="py-3 px-3.5">Voucher No</th>
                      <th className="py-3 px-3.5">Date</th>
                      <th className="py-3 px-3.5">Account Head</th>
                      <th className="py-3 px-3.5">Particulars / Narration</th>
                      <th className="py-3 px-3.5 text-right">Debit (₹)</th>
                      <th className="py-3 px-3.5 text-right">Credit (₹)</th>
                      <th className="py-3 px-3.5 text-right">Balance (₹)</th>
                      <th className="py-3 px-3.5 text-center">Mode</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5">Entered By</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'agentTdsReport' && (
                    <>
                      <th className="py-3 px-3.5">Agent Code</th>
                      <th className="py-3 px-3.5">Agent Name</th>
                      <th className="py-3 px-3.5">PAN No</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5 text-right">Gross Comm (₹)</th>
                      <th className="py-3 px-3.5 text-right">TDS (₹)</th>
                      <th className="py-3 px-3.5 text-right">Net Payout (₹)</th>
                      <th className="py-3 px-3.5 text-center">Quarter</th>
                      <th className="py-3 px-3.5 text-center">Form 16A</th>
                      <th className="py-3 px-3.5">Certificate No</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'activeInactiveAgent' && (
                    <>
                      <th className="py-3 px-3.5">Agent Code</th>
                      <th className="py-3 px-3.5">Agent Name</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5">Mobile</th>
                      <th className="py-3 px-3.5">Reg Date</th>
                      <th className="py-3 px-3.5">Last Business</th>
                      <th className="py-3 px-3.5 text-center">Policies</th>
                      <th className="py-3 px-3.5 text-right">Total Prem (₹)</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5">Reason / Note</th>
                      <th className="py-3 px-3.5">Executive</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'onlineToRaApproval' && (
                    <>
                      <th className="py-3 px-3.5">Request ID</th>
                      <th className="py-3 px-3.5">Date</th>
                      <th className="py-3 px-3.5">Customer Name</th>
                      <th className="py-3 px-3.5">Mobile</th>
                      <th className="py-3 px-3.5">Product</th>
                      <th className="py-3 px-3.5">Proposed Insurer</th>
                      <th className="py-3 px-3.5 text-right">Premium (₹)</th>
                      <th className="py-3 px-3.5 text-center">KYC</th>
                      <th className="py-3 px-3.5">RA Reviewer</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'policyCancelReport' && (
                    <>
                      <th className="py-3 px-3.5">Cancel Date</th>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Company</th>
                      <th className="py-3 px-3.5">Customer Name</th>
                      <th className="py-3 px-3.5">Agent Name</th>
                      <th className="py-3 px-3.5 text-right">Gross Prem (₹)</th>
                      <th className="py-3 px-3.5">Cancellation Reason</th>
                      <th className="py-3 px-3.5 text-right">Refund (₹)</th>
                      <th className="py-3 px-3.5 text-right">Clawback (₹)</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'paymentReport' && (
                    <>
                      <th className="py-3 px-3.5">Payment ID</th>
                      <th className="py-3 px-3.5">Payment Date</th>
                      <th className="py-3 px-3.5">Payee Name</th>
                      <th className="py-3 px-3.5">Payee Type</th>
                      <th className="py-3 px-3.5">Bank & A/C No</th>
                      <th className="py-3 px-3.5 text-center">Mode</th>
                      <th className="py-3 px-3.5 text-right">Amount (₹)</th>
                      <th className="py-3 px-3.5">UTR / Reference No</th>
                      <th className="py-3 px-3.5">Processed By</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Action</th>
                    </>
                  )}

                  {activeTab === 'viewPolicy' && (
                    <>
                      <th className="py-3 px-3.5">Policy No</th>
                      <th className="py-3 px-3.5">Customer Name</th>
                      <th className="py-3 px-3.5">Vehicle Reg No</th>
                      <th className="py-3 px-3.5">Make & Model</th>
                      <th className="py-3 px-3.5">Insurer</th>
                      <th className="py-3 px-3.5">Product Plan</th>
                      <th className="py-3 px-3.5">Issue Date</th>
                      <th className="py-3 px-3.5">Risk Period</th>
                      <th className="py-3 px-3.5 text-right">Gross Prem (₹)</th>
                      <th className="py-3 px-3.5">Branch</th>
                      <th className="py-3 px-3.5 text-center">Status</th>
                      <th className="py-3 px-3.5 text-center">Policy Doc</th>
                    </>
                  )}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-brand-border text-[13px]">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={14} className="py-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <AlertCircle size={32} className="text-slate-400" />
                        <span className="font-semibold text-slate-600">No records found matching your filters.</span>
                        <span className="text-xs text-slate-400">Try adjusting your date range, search terms, or branch selection.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row: any, idx: number) => {
                    const srNo = (currentPage - 1) * itemsPerPage + idx + 1;
                    return (
                      <tr
                        key={row.id || idx}
                        onClick={() => setSelectedRecord(row)}
                        className="hover:bg-brand-mainbg h-[48px] transition-colors cursor-pointer group bg-white"
                      >
                        <td className="py-3 px-3.5 text-center font-semibold text-slate-500">{srNo}</td>

                        {activeTab === 'cutNPay' && (
                          <>
                            <td className="py-3 px-3.5 whitespace-nowrap">
                              <span className="font-medium text-slate-800">{row.transDate}</span>
                              <div className="text-[10px] text-slate-400">Risk: {row.riskDate}</div>
                            </td>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.policyNo}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-900">{row.insuredName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.company}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.agentName}</td>
                            <td className="py-3 px-3.5 text-right font-medium text-slate-800">{formatCurrency(row.grossPremium)}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.cutNPayAmt)}</td>
                            <td className="py-3 px-3.5 text-right font-semibold text-rose-600">{formatCurrency(row.balanceDue)}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.paymentMode}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'endorsement' && (
                          <>
                            <td className="py-3 px-3.5 whitespace-nowrap text-slate-700">{row.endorsementDate}</td>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.endorsementNo}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-800">{row.policyNo}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-900">{row.customerName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.company}</td>
                            <td className="py-3 px-3.5 font-semibold text-indigo-700">{row.endorsementType}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-slate-800">{formatCurrency(row.premiumDiff)}</td>
                            <td className="py-3 px-3.5 text-slate-500 text-[11px] max-w-[120px] truncate" title={row.oldValue}>{row.oldValue}</td>
                            <td className="py-3 px-3.5 text-emerald-700 text-[11px] font-medium max-w-[140px] truncate" title={row.newValue}>{row.newValue}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'chequeBounce' && (
                          <>
                            <td className="py-3 px-3.5 whitespace-nowrap">
                              <span className="font-bold text-slate-800">{row.chequeNo}</span>
                              <div className="text-[10px] text-slate-400">{row.chequeDate}</div>
                            </td>
                            <td className="py-3 px-3.5 text-rose-700 font-semibold">{row.bounceDate}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.bankName}</td>
                            <td className="py-3 px-3.5 font-semibold text-brand-primary">{row.policyNo}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-900">{row.customerName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.agentName}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-rose-700">{formatCurrency(row.chequeAmount)}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-700">{row.bounceReason}</td>
                            <td className="py-3 px-3.5 text-right text-slate-600">{formatCurrency(row.penalty)}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.recoveryStatus)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'profit' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-slate-900">{row.company}</td>
                            <td className="py-3 px-3.5 font-semibold text-slate-700">{row.segment}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-right font-medium text-slate-800">{formatCurrency(row.grossPremium)}</td>
                            <td className="py-3 px-3.5 text-right text-slate-700">{formatCurrency(row.netPremium)}</td>
                            <td className="py-3 px-3.5 text-right font-medium text-indigo-700">{formatCurrency(row.companyComm)}</td>
                            <td className="py-3 px-3.5 text-right text-slate-700">{formatCurrency(row.payoutComm)}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.netProfit)}</td>
                            <td className="py-3 px-3.5 text-center font-bold text-brand-primary">{row.profitMargin}%</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'franchiseProfit' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.franchiseCode}</td>
                            <td className="py-3 px-3.5 font-bold text-slate-900">{row.franchiseName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.location}</td>
                            <td className="py-3 px-3.5 text-center font-semibold text-slate-700">{row.totalPolicies}</td>
                            <td className="py-3 px-3.5 text-right font-medium text-slate-800">{formatCurrency(row.grossPremium)}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-indigo-700">{formatCurrency(row.franchiseShare)}</td>
                            <td className="py-3 px-3.5 text-right text-slate-700">{formatCurrency(row.raShare)}</td>
                            <td className="py-3 px-3.5 text-right text-rose-600">{formatCurrency(row.tdsDeducted)}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.netPayable)}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.payoutStatus)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'cashback' && (
                          <>
                            <td className="py-3 px-3.5 whitespace-nowrap text-slate-700">{row.transDate}</td>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.policyNo}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-900">{row.customerName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.agentName}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.productType}</td>
                            <td className="py-3 px-3.5 text-right text-slate-700">{formatCurrency(row.grossPremium)}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.cashbackAmt)}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.paymentMode}</td>
                            <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600">{row.utrNo}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.approvedBy}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'companyWiseAgentGrid' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.agentCode}</td>
                            <td className="py-3 px-3.5 font-bold text-slate-900">{row.agentName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-800">{row.company}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.segment}</td>
                            <td className="py-3 px-3.5 text-center font-bold text-indigo-700">{row.odComm}%</td>
                            <td className="py-3 px-3.5 text-center text-slate-600">{row.tpComm}%</td>
                            <td className="py-3 px-3.5 text-center font-bold text-emerald-700">{row.netComm}%</td>
                            <td className="py-3 px-3.5 text-center text-amber-700 font-semibold">+{row.reward}%</td>
                            <td className="py-3 px-3.5 whitespace-nowrap text-slate-600">{row.effectiveFrom}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'premiumCashApproval' && (
                          <>
                            <td className="py-3 px-3.5 whitespace-nowrap text-slate-700">{row.collectionDate}</td>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.policyNo}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-900">{row.customerName}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.executiveName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.cashCollected)}</td>
                            <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600">{row.depositSlipNo}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.handoverDate}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.raApprover}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'viewAllAgentCommission' && (
                          <>
                            <td className="py-3 px-3.5">
                              <span className="font-bold text-slate-900">{row.agentName}</span>
                              <div className="text-[10px] text-brand-primary font-mono">{row.agentCode} • {row.mobile}</div>
                            </td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.policyNo}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.company}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-800">{row.segment}</td>
                            <td className="py-3 px-3.5 text-slate-600 text-[11px]">{row.businessType}</td>
                            <td className="py-3 px-3.5 text-right text-slate-700">{formatCurrency(row.grossPremium)}</td>
                            <td className="py-3 px-3.5 text-right text-slate-700">{formatCurrency(row.netPremium)}</td>
                            <td className="py-3 px-3.5 text-center font-semibold text-indigo-700">{row.odComm}%</td>
                            <td className="py-3 px-3.5 text-center text-slate-600">{row.tpComm}%</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.commAmount)}</td>
                            <td className="py-3 px-3.5 whitespace-nowrap text-slate-600">{row.payoutDate}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'tdsReport' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-slate-900">{row.deducteeName}</td>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.deducteeCode}</td>
                            <td className="py-3 px-3.5 font-mono text-slate-800 font-semibold">{row.panNo}</td>
                            <td className="py-3 px-3.5 text-slate-600 font-semibold">{row.section}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.quarter}</td>
                            <td className="py-3 px-3.5 text-right font-medium text-slate-800">{formatCurrency(row.grossCommission)}</td>
                            <td className="py-3 px-3.5 text-center text-slate-600">{row.tdsRate}%</td>
                            <td className="py-3 px-3.5 text-right font-bold text-rose-600">{formatCurrency(row.tdsAmount)}</td>
                            <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600">{row.challanRef}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'vehicleHistory' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-slate-900 bg-amber-50/50">{row.regNo}</td>
                            <td className="py-3 px-3.5 font-semibold text-slate-800">{row.makeModel}</td>
                            <td className="py-3 px-3.5 text-center text-slate-600">{row.mfgYear}</td>
                            <td className="py-3 px-3.5 font-mono text-[10px] text-slate-500">{row.chassisNo}</td>
                            <td className="py-3 px-3.5 font-mono text-[10px] text-slate-500">{row.engineNo}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.policyYear}</td>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.policyNo}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.insurer}</td>
                            <td className="py-3 px-3.5 text-right font-medium text-slate-800">{formatCurrency(row.premium)}</td>
                            <td className="py-3 px-3.5 text-center font-bold text-rose-600">{row.claimFiled}</td>
                            <td className="py-3 px-3.5 text-center font-bold text-emerald-700">{row.ncb}%</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'dayBook' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.voucherNo}</td>
                            <td className="py-3 px-3.5 whitespace-nowrap text-slate-700">{row.date}</td>
                            <td className="py-3 px-3.5 font-semibold text-slate-800">{row.accountHead}</td>
                            <td className="py-3 px-3.5 text-slate-600 max-w-[200px] truncate" title={row.narration}>{row.narration}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-rose-600">{row.debit > 0 ? formatCurrency(row.debit) : '-'}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{row.credit > 0 ? formatCurrency(row.credit) : '-'}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-slate-900">{formatCurrency(row.balance)}</td>
                            <td className="py-3 px-3.5 text-center font-medium text-slate-700">{row.mode}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.enteredBy}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'agentTdsReport' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.agentCode}</td>
                            <td className="py-3 px-3.5 font-bold text-slate-900">{row.agentName}</td>
                            <td className="py-3 px-3.5 font-mono text-slate-800 font-semibold">{row.panNo}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-right font-medium text-slate-800">{formatCurrency(row.grossComm)}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-rose-600">{formatCurrency(row.tdsAmount)}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.netPayout)}</td>
                            <td className="py-3 px-3.5 text-center text-slate-700">{row.quarter} ({row.financialYear})</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.form16AStatus)}</td>
                            <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600">{row.certNo}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'activeInactiveAgent' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.agentCode}</td>
                            <td className="py-3 px-3.5 font-bold text-slate-900">{row.agentName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 font-mono text-slate-700">{row.mobile}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.regDate}</td>
                            <td className="py-3 px-3.5 text-slate-700 font-medium">{row.lastBusinessDate}</td>
                            <td className="py-3 px-3.5 text-center font-bold text-slate-800">{row.policiesThisYear}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-indigo-700">{formatCurrency(row.premiumThisYear)}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-slate-500 text-[11px] max-w-[140px] truncate" title={row.reason}>{row.reason}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.executive}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'onlineToRaApproval' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.requestId}</td>
                            <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">{row.requestDate}</td>
                            <td className="py-3 px-3.5 font-bold text-slate-900">{row.customerName}</td>
                            <td className="py-3 px-3.5 font-mono text-slate-700">{row.mobile}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.product}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-800">{row.proposedInsurer}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.premium)}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.kycStatus)}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.raReviewer}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'policyCancelReport' && (
                          <>
                            <td className="py-3 px-3.5 text-rose-700 font-semibold whitespace-nowrap">{row.cancelDate}</td>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.policyNo}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.company}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-900">{row.customerName}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.agentName}</td>
                            <td className="py-3 px-3.5 text-right font-medium text-slate-800">{formatCurrency(row.grossPremium)}</td>
                            <td className="py-3 px-3.5 text-slate-600 text-[11px] max-w-[150px] truncate" title={row.cancelReason}>{row.cancelReason}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.refundAmt)}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-rose-600">{formatCurrency(row.clawbackAmt)}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'paymentReport' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.paymentId}</td>
                            <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">{row.paymentDate}</td>
                            <td className="py-3 px-3.5 font-bold text-slate-900">{row.payeeName}</td>
                            <td className="py-3 px-3.5 text-slate-600 font-medium">{row.payeeType}</td>
                            <td className="py-3 px-3.5 whitespace-nowrap">
                              <span className="font-semibold text-slate-800">{row.bankName}</span>
                              <div className="font-mono text-[10px] text-slate-400">A/C: {row.accountNo}</div>
                            </td>
                            <td className="py-3 px-3.5 text-center font-bold text-indigo-700">{row.mode}</td>
                            <td className="py-3 px-3.5 text-right font-bold text-emerald-700">{formatCurrency(row.amount)}</td>
                            <td className="py-3 px-3.5 font-mono text-[11px] text-slate-600 max-w-[140px] truncate" title={row.utrNo}>{row.utrNo}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.processedBy}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-brand-primary">
                                <Eye size={15} />
                              </button>
                            </td>
                          </>
                        )}

                        {activeTab === 'viewPolicy' && (
                          <>
                            <td className="py-3 px-3.5 font-bold text-brand-primary">{row.policyNo}</td>
                            <td className="py-3 px-3.5 font-bold text-slate-900">
                              {row.customerName}
                              <div className="text-[10px] text-slate-400 font-normal">{row.mobile}</div>
                            </td>
                            <td className="py-3 px-3.5 font-mono font-bold text-slate-800 bg-amber-50/50">{row.regNo}</td>
                            <td className="py-3 px-3.5 font-medium text-slate-700">{row.makeModel}</td>
                            <td className="py-3 px-3.5 text-slate-700">{row.insurer}</td>
                            <td className="py-3 px-3.5 text-slate-600 text-[11px]">{row.product}</td>
                            <td className="py-3 px-3.5 whitespace-nowrap text-slate-600">{row.issueDate}</td>
                            <td className="py-3 px-3.5 whitespace-nowrap text-slate-700 text-[11px]">
                              {row.riskStartDate} to {row.riskEndDate}
                            </td>
                            <td className="py-3 px-3.5 text-right font-bold text-slate-900">{formatCurrency(row.grossPremium)}</td>
                            <td className="py-3 px-3.5 text-slate-600">{row.branch}</td>
                            <td className="py-3 px-3.5 text-center">{renderStatusBadge(row.status)}</td>
                            <td className="py-3 px-3.5 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setViewingPolicyDoc(row);
                                }}
                                className="px-2 py-1 bg-brand-primary/10 hover:bg-brand-primary text-brand-primary hover:text-white rounded text-[11px] font-semibold transition-colors flex items-center gap-1 mx-auto"
                                title="View Complete Policy Document"
                              >
                                <FileText size={12} />
                                <span>View PDF</span>
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Standard Footer Pagination Bar matching VehicleMaster */}
          <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
              <span>Records per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border border-brand-border rounded px-2 py-1 text-sm bg-white text-brand-navy focus:outline-none focus:border-brand-primary"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="text-sm text-brand-muted font-medium">
              Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded text-sm font-medium border border-brand-border ${
                  currentPage === 1
                    ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                    : 'text-brand-navy hover:bg-brand-mainbg cursor-pointer'
                }`}
              >
                &lt;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    currentPage === page
                      ? 'bg-brand-primary text-white'
                      : 'text-brand-navy hover:bg-brand-mainbg border border-brand-border'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 rounded text-sm font-medium border border-brand-border ${
                  currentPage === totalPages || totalPages === 0
                    ? 'text-slate-300 cursor-not-allowed bg-slate-50'
                    : 'text-brand-navy hover:bg-brand-mainbg cursor-pointer'
                }`}
              >
                &gt;
              </button>
            </div>
          </div>

        </div>
      </div>
        </>
      )}

      {/* Record Details Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet size={18} className="text-brand-primary" />
                <h3 className="font-bold text-sm tracking-wide">{activeTabMeta.label} - Record Details</h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-5 max-h-[70vh] overflow-y-auto space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                {Object.entries(selectedRecord).map(([key, value]) => {
                  if (key === 'id') return null;
                  const formattedKey = key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase());
                  return (
                    <div key={key} className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{formattedKey}</span>
                      <span className="font-semibold text-slate-800 break-words mt-0.5">
                        {typeof value === 'number' && (key.toLowerCase().includes('amt') || key.toLowerCase().includes('prem') || key.toLowerCase().includes('comm') || key.toLowerCase().includes('profit') || key.toLowerCase().includes('share') || key.toLowerCase().includes('debit') || key.toLowerCase().includes('credit') || key.toLowerCase().includes('balance'))
                          ? formatCurrency(value)
                          : String(value)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-[#0654B0] transition-colors cursor-pointer border-none"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Policy Document Certificate Viewer Modal */}
      {viewingPolicyDoc && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={20} className="text-emerald-400" />
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Certificate of Insurance & Policy Document</h3>
                  <p className="text-[11px] text-slate-300 font-mono">{viewingPolicyDoc.policyNo}</p>
                </div>
              </div>
              <button
                onClick={() => setViewingPolicyDoc(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Document Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-xs font-sans">
              {/* Insurer & Watermark Banner */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <div className="text-lg font-bold text-brand-navy">Reliable Associates Insurance Services</div>
                  <div className="text-[11px] text-slate-500">Corporate Agency • IRDAI Registered</div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-800 text-sm">{viewingPolicyDoc.insurer}</span>
                  <div className="text-[10px] text-slate-500">Branch: {viewingPolicyDoc.branch}</div>
                </div>
              </div>

              {/* Policy & Insured Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Policyholder / Insured</span>
                  <div className="text-sm font-bold text-slate-900 mt-0.5">{viewingPolicyDoc.customerName}</div>
                  <div className="text-slate-600 mt-0.5">Mobile: {viewingPolicyDoc.mobile}</div>
                  <div className="text-slate-600">Servicing Agent: {viewingPolicyDoc.agentName}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Policy Details</span>
                  <div className="font-bold text-slate-900 mt-0.5">{viewingPolicyDoc.product}</div>
                  <div className="text-slate-600 mt-0.5">Issue Date: {viewingPolicyDoc.issueDate}</div>
                  <div className="text-slate-600">Period: {viewingPolicyDoc.riskStartDate} to {viewingPolicyDoc.riskEndDate}</div>
                </div>
              </div>

              {/* Vehicle Particulars */}
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Vehicle Particulars</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400">Registration No</span>
                    <p className="font-mono font-bold text-slate-800">{viewingPolicyDoc.regNo}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Make & Model</span>
                    <p className="font-semibold text-slate-800">{viewingPolicyDoc.makeModel}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Status</span>
                    <div>{renderStatusBadge(viewingPolicyDoc.status)}</div>
                  </div>
                </div>
              </div>

              {/* Premium Calculation */}
              <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Premium Computation</span>
                <div className="flex justify-between text-slate-700">
                  <span>Net OD & TP Premium:</span>
                  <span className="font-medium">{formatCurrency(viewingPolicyDoc.netPremium)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Integrated GST (18%):</span>
                  <span className="font-medium">{formatCurrency(viewingPolicyDoc.grossPremium - viewingPolicyDoc.netPremium)}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold border-t border-slate-200 pt-1.5 text-sm">
                  <span>Total Premium Collected:</span>
                  <span className="text-emerald-700">{formatCurrency(viewingPolicyDoc.grossPremium)}</span>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-600" />
                Digitally verified policy schedule
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Printing document ${viewingPolicyDoc.policyNo}...`)}
                  className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border-none"
                >
                  <Printer size={13} />
                  <span>Print</span>
                </button>
                <button
                  onClick={() => {
                    const csv = `Policy No,Insured,Vehicle,Premium\n"${viewingPolicyDoc.policyNo}","${viewingPolicyDoc.customerName}","${viewingPolicyDoc.regNo}","${viewingPolicyDoc.grossPremium}"`;
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `${viewingPolicyDoc.policyNo}.csv`;
                    link.click();
                  }}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border-none"
                >
                  <Download size={13} />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setViewingPolicyDoc(null)}
                  className="px-3 py-1.5 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer border-none"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GeneralReports;
