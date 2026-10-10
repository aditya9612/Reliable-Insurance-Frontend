import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Search, Edit2, Eye, Download, X, Send } from 'lucide-react';

type MisSubTab =
  | 'commission'
  | 'agentSummary'
  | 'agentMIS'
  | 'paymentAdvice'
  | 'agentReport'
  | 'executiveMIS'
  | 'misReport'
  | 'executiveSummary'
  | 'statement'
  | 'outstanding'
  | 'target'
  | 'details';

interface CommissionProfitRow {
  id: number;
  riskStartDate: string;
  referenceType: string;
  companyName: string;
  policyNo: string;
  product: string;
  productType: string;
  productSubType: string;
  policyType: string;
  businessType: string;
  customerName: string;
  contactNo: string;
  vehicleMake: string;
  vehicleModelName: string;
  registrationNo: string;
  fuelType: string;
  mfgYear: string;
  transDate: string;
  gvwCc: string;
  branchName: string;
  agentName: string;
  location: string;
  employeeName: string;
  paymentType: string;
  remark: string;
  odPremium: number;
  tpPremium: number;
  other: number;
  netPremium: number;
  proposalAmt: number;
  brokerCommNetOd: string;
  brokerGridPct: number;
  brokerCommission: number;
  brokerTds: number;
  brokerNetCommission: number;
  executiveCommNetOd: string;
  executiveGridPct: number;
  executiveIncentive: number;
  executiveTds: number;
  executiveNetIncentive: number;
  franchiseCommNetOd: string;
  franchiseGridPct: number;
  franchiseCommission: number;
  franchiseTds: number;
  franchiseNetCommission: number;
  agentCommNetOd: string;
  agentGridPct: number;
  agentGrossComm: number;
  agentTds: number;
  agentNetCommission: number;
  cutNPay: number;
  instaPayment: number;
  regularPayment: number;
  netPay: number;
  passOn: number;
  cashBack: number;
  grossProfit: number;
  saving: number;
  paidStatement: string;
  gridAgent: string;
  portalId: string;
  brokerAgentName: string;
  paymentBy: string;
  broker: string;
  chequeNo: string;
  cheque: string;
  createUser: string;
  commVehAge: string;
  franchiseCode: string;
  appOdDiscount: number;
  erp: string;
}

const misMatrixCompanies = [
  'HDFC ERGO GENERAL INSURANCE CO. LTD',
  'TATA AIG GENERAL INSURANCE CO. LTD',
  'THE NEW INDIA ASSURANCE CO. LTD',
  'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED',
  'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED',
  'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
  'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
  'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
  'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
  'SBI GENERAL INSURANCE COMPANY LIMITED',
  'LIBERTY GENERAL INSURANCE LIMITED',
  'ZURICH KOTAK GENERAL INSURANCE',
  'GO DIGIT GENERAL INSURANCE LIMITED',
  'KIWI GENERAL INSURANCE LIMITED',
  'SHRIRAM GENERAL INSURANCE COMPANY LIMITED',
  'ICICI LOMBARD GENERAL INSURANCE CO. LTD',
  'UNITED INDIA INSURANCE CO. LTD',
  'INDUSIND GENERAL INSURANCE CO. LTD',
];

const misMatrixRows: { policyType: string; values: Record<string, string> }[] = [
  {
    policyType: 'FIRE',
    values: {
      'HDFC ERGO GENERAL INSURANCE CO. LTD': '4067',
      'THE NEW INDIA ASSURANCE CO. LTD': '61697',
    },
  },
  {
    policyType: 'HEALTH',
    values: {
      'TATA AIG GENERAL INSURANCE CO. LTD': '18115',
    },
  },
  {
    policyType: 'PRIVATE CAR',
    values: {
      'HDFC ERGO GENERAL INSURANCE CO. LTD': '424055',
      'TATA AIG GENERAL INSURANCE CO. LTD': '2223783',
      'THE NEW INDIA ASSURANCE CO. LTD': '56414',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '395217',
      'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED': '581198.1',
      'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD': '79875',
      'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD': '480076',
      'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD': '3478',
      'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED': '147',
    },
  },
  {
    policyType: 'GCV 3500 - 7500 GVW',
    values: {
      'TATA AIG GENERAL INSURANCE CO. LTD': '1193885',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '26752',
      'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED': '209698.65',
      'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD': '24987',
      'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD': '692551',
      'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED': '237',
    },
  },
  {
    policyType: 'GCV 7501 - 12000 GVW',
    values: {
      'TATA AIG GENERAL INSURANCE CO. LTD': '1005620',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '123234',
      'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD': '873398',
      'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED': '252',
    },
  },
  {
    policyType: 'GCV 12001 - 20000 GVW',
    values: {
      'TATA AIG GENERAL INSURANCE CO. LTD': '820497',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '3395309',
      'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD': '848355',
      'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED': '712',
    },
  },
  {
    policyType: 'GCV 20001 - 40000 GVW',
    values: {
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '1454018',
      'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED': '45352.02',
      'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD': '251989',
      'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD': '190200',
      'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED': '428',
    },
  },
  {
    policyType: 'TW-BIKE',
    values: {
      'TATA AIG GENERAL INSURANCE CO. LTD': '31271',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '5852',
    },
  },
  {
    policyType: 'TW-SCOOTER',
    values: {
      'TATA AIG GENERAL INSURANCE CO. LTD': '3704',
    },
  },
  {
    policyType: 'MISC-D-TRACTOR',
    values: {
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '294402',
    },
  },
  {
    policyType: 'MISC-D-OTHER',
    values: {
      'TATA AIG GENERAL INSURANCE CO. LTD': '49435',
      'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD': '29288',
    },
  },
];

const execSummaryCompanies = [
  'HDFC ERGO GENERAL INSURANCE CO. LTD',
  'INDUSIND GENERAL INSURANCE CO. LTD',
  'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED',
  'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED',
  'TATA AIG GENERAL INSURANCE CO. LTD',
  'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD',
  'UNITED INDIA INSURANCE CO. LTD',
  'SHRIRAM GENERAL INSURANCE COMPANY LIMITED',
  'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
  'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
  'SBI GENERAL INSURANCE COMPANY LIMITED',
];

const execSummaryRows = [
  {
    empName: 'AKLUJ-AVINASH BHARAT KORATKAR',
    total: '2056064.14',
    values: {
      'HDFC ERGO GENERAL INSURANCE CO. LTD': '190055',
      'INDUSIND GENERAL INSURANCE CO. LTD': '54103',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '322839',
      'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED': '57809.35',
      'TATA AIG GENERAL INSURANCE CO. LTD': '380694',
      'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD': '457961',
      'UNITED INDIA INSURANCE CO. LTD': '230462',
      'SHRIRAM GENERAL INSURANCE COMPANY LIMITED': '35512',
    },
  },
  {
    empName: 'AKOLA-NILESH BHAGWANRAO RAUT',
    total: '2427248.49',
    values: {
      'HDFC ERGO GENERAL INSURANCE CO. LTD': '35103',
      'INDUSIND GENERAL INSURANCE CO. LTD': '120280',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '90445',
      'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED': '81482.68',
      'TATA AIG GENERAL INSURANCE CO. LTD': '380090',
      'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD': '529744',
      'UNITED INDIA INSURANCE CO. LTD': '70623',
      'SHRIRAM GENERAL INSURANCE COMPANY LIMITED': '26557',
    },
  },
  {
    empName: 'BARAMATI-ABHISHEK VILAS GAIKWAD',
    total: '100540.00',
    values: {
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '94331',
      'TATA AIG GENERAL INSURANCE CO. LTD': '6209',
    },
  },
  {
    empName: 'BARAMATI-DNYANESHWAR GAWADE',
    total: '1783385.11',
    values: {
      'HDFC ERGO GENERAL INSURANCE CO. LTD': '105629',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '582154',
      'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED': '26438.65',
      'TATA AIG GENERAL INSURANCE CO. LTD': '519606',
      'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD': '184191',
    },
  },
  {
    empName: 'BARAMATI-SNEHA KULKARNI',
    total: '1748093.81',
    values: {
      'HDFC ERGO GENERAL INSURANCE CO. LTD': '289071',
      'INDUSIND GENERAL INSURANCE CO. LTD': '79313',
      'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED': '480787',
      'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED': '46810.04',
      'TATA AIG GENERAL INSURANCE CO. LTD': '377929',
    },
  },
];

const agentCommissionStatementRows = [
  { id: 1, branch: 'AHILYA NAGAR', agent: 'GAIKWAD DADASAHEB LAXMAN', bankName: 'YES BANK', ifsc: 'YESB0000021', bankAc: '092190600000149', commAmt: 77.00 },
  { id: 2, branch: 'AHILYA NAGAR', agent: 'NAVANDAR SATISH MAHESH', bankName: 'HDFC BANK', ifsc: 'HDFC0000885', bankAc: '50100483578720', commAmt: 14661.00 },
  { id: 3, branch: 'AKLUJ', agent: 'SAYYAD VASIM VAJIR', bankName: 'UNION BANK OF INDIA', ifsc: 'UBIN0564257', bankAc: '642502010006598', commAmt: 17349.00 },
  { id: 4, branch: 'AKLUJ', agent: 'PISE NAVNATH SAWATA', bankName: 'BANK OF INDIA', ifsc: 'BKID0000707', bankAc: '070710510002425', commAmt: 51174.00 },
  { id: 5, branch: 'AKLUJ', agent: 'ATTAR IRFAN AKBAR', bankName: 'ICICI BANK', ifsc: 'ICIC0006481', bankAc: '648101000438', commAmt: 14614.00 },
  { id: 6, branch: 'AKLUJ', agent: 'BHINTADE TUSHAR JAYSING', bankName: 'HDFC BANK', ifsc: 'HDFC0008197', bankAc: '50100825975908', commAmt: 11543.00 },
  { id: 7, branch: 'AKLUJ', agent: 'SUTAR ADITI ASHOK', bankName: 'KALLAPPANNA AWADE BANK', ifsc: 'KAIJ0000024', bankAc: '24001800000373', commAmt: 1849.00 },
  { id: 8, branch: 'BARAMATI', agent: 'PAWAR VISHAL HANUMANT', bankName: 'UNION BANK OF INDIA', ifsc: 'UTIB0000135', bankAc: '915010017807322', commAmt: 981.00 },
];

const execTargetReportRows = [
  { id: 1, branch: 'AHILYANAGAR', name: 'AMIN DASTAGIR PATHAN', aprTar: '0.00', aprAchv: '0.00', mayTar: '0.00', mayAchv: '0.00', junTar: '0.00', junAchv: '0.00', q1Tar: '0.00', q1Achv: '0.00' },
  { id: 2, branch: 'AHILYANAGAR', name: 'PRASHANT DILIPRAO MOHEKAR', aprTar: '0.00', aprAchv: '1693762.92', mayTar: '0.00', mayAchv: '329499.33', junTar: '0.00', junAchv: '0.00', q1Tar: '0.00', q1Achv: '2023262.25' },
  { id: 3, branch: 'AHILYANAGAR', name: 'DEVENDRA ANURATH WAGH', aprTar: '0.00', aprAchv: '0.00', mayTar: '0.00', mayAchv: '0.00', junTar: '0.00', junAchv: '0.00', q1Tar: '0.00', q1Achv: '0.00' },
  { id: 4, branch: 'AHILYANAGAR', name: 'KRUSHNA RAJU GAIKWAD', aprTar: '0.00', aprAchv: '0.00', mayTar: '0.00', mayAchv: '0.00', junTar: '0.00', junAchv: '0.00', q1Tar: '0.00', q1Achv: '0.00' },
  { id: 5, branch: 'AHILYANAGAR', name: 'MORESHWAR VITTHALRAO BORGAONKAR', aprTar: '0.00', aprAchv: '0.00', mayTar: '0.00', mayAchv: '0.00', junTar: '0.00', junAchv: '0.00', q1Tar: '0.00', q1Achv: '0.00' },
  { isSubTotal: true, branch: 'SUB TOTAL (AHILYANAGAR)', name: '', aprTar: '0.00', aprAchv: '2712653.99', mayTar: '0.00', mayAchv: '847537.41', junTar: '0.00', junAchv: '0.00', q1Tar: '0.00', q1Achv: '3560191.40' },
  { id: 6, branch: 'BARAMATI', name: 'ABHISHEK VILAS GAIKWAD', aprTar: '0.00', aprAchv: '850000.00', mayTar: '0.00', mayAchv: '620000.00', junTar: '0.00', junAchv: '0.00', q1Tar: '0.00', q1Achv: '1470000.00' },
  { isSubTotal: true, branch: 'SUB TOTAL (BARAMATI)', name: '', aprTar: '0.00', aprAchv: '850000.00', mayTar: '0.00', mayAchv: '620000.00', junTar: '0.00', junAchv: '0.00', q1Tar: '0.00', q1Achv: '1470000.00' },
];

export const MisReports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MisSubTab>('commission');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMisMatrix, setShowMisMatrix] = useState(true);

  // Form & Filter inputs
  const [dateType, setDateType] = useState<'trans' | 'risk'>('trans');
  const [fromDate, setFromDate] = useState('2026-10-06');
  const [toDate, setToDate] = useState('2026-10-06');
  const [entityType, setEntityType] = useState<'Agent' | 'Franchise' | 'Franchise Agent'>('Agent');

  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [filterMode, setFilterMode] = useState<'branch' | 'location'>('location');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [selectedExecutive, setSelectedExecutive] = useState('');

  // Form Field Inputs for Agent Wise Summary
  const [commNetSum, setCommNetSum] = useState('');
  const [bankUtrNo, setBankUtrNo] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [differenceAmt, setDifferenceAmt] = useState('');
  const [checkNo, setCheckNo] = useState('');
  const [invNo, setInvNo] = useState('RA0101');

  // Form Modal State
  const [showModal, setShowModal] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const branchesList = [
    'AHILYANAGAR', 'AKLUJ', 'AKOLA', 'AMRAVATI', 'BARAMATI', 'BARSHI',
    'BEED', 'CHHATRAPATI SAMBHAJINAGAR', 'DHULE', 'LATUR', 'MUMBAI', 'NAGPUR', 'PUNE', 'SATARA', 'SOLAPUR'
  ];

  const agentsList = [
    'Amit Deshmukh',
    'Sneha Kulkarni',
    'Rahul Sharma',
    'Priya Verma',
    'Sanjay Patil'
  ];

  const executivesList = [
    'ARVIND DNYANESHWAR GAWADE',
    'ADITYA RAJENDRA SAPKAL',
    'HEMANT KAKULTE',
    'SHEKHAR JADHAV',
    'ROHIT SHINDE'
  ];

  // Full 71-column dataset for Commission Profit Table
  const [commissionRows] = useState<CommissionProfitRow[]>([
    {
      id: 1,
      riskStartDate: '10/10/2026',
      referenceType: 'AGENT',
      companyName: 'LIBERTY GENERAL INSURANCE LIMITED',
      policyNo: '201440030226790207800000',
      product: 'MOTOR',
      productType: 'MISC-D',
      productSubType: 'MISC-D-TRACTOR',
      policyType: 'COMPREHENSIVE',
      businessType: 'ROLL OVER',
      customerName: 'RAMESH PATEL',
      contactNo: '9876543210',
      vehicleMake: 'MAHINDRA',
      vehicleModelName: '575 DI',
      registrationNo: 'MH12PA1020',
      fuelType: 'DIESEL',
      mfgYear: '2022',
      transDate: '06/10/2026',
      gvwCc: '2500 CC',
      branchName: 'BARAMATI',
      agentName: 'Amit Deshmukh',
      location: 'PUNE',
      employeeName: 'ARVIND GAWADE',
      paymentType: 'ONLINE',
      remark: 'COMPLETED',
      odPremium: 12500,
      tpPremium: 4500,
      other: 0,
      netPremium: 17000,
      proposalAmt: 17000,
      brokerCommNetOd: 'OD',
      brokerGridPct: 15,
      brokerCommission: 1875,
      brokerTds: 93.75,
      brokerNetCommission: 1781.25,
      executiveCommNetOd: 'OD',
      executiveGridPct: 5,
      executiveIncentive: 625,
      executiveTds: 31.25,
      executiveNetIncentive: 593.75,
      franchiseCommNetOd: 'OD',
      franchiseGridPct: 0,
      franchiseCommission: 0,
      franchiseTds: 0,
      franchiseNetCommission: 0,
      agentCommNetOd: 'OD',
      agentGridPct: 10,
      agentGrossComm: 1250,
      agentTds: 62.5,
      agentNetCommission: 1187.5,
      cutNPay: 0,
      instaPayment: 0,
      regularPayment: 1187.5,
      netPay: 1187.5,
      passOn: 0,
      cashBack: 0,
      grossProfit: 625,
      saving: 0,
      paidStatement: 'PAID',
      gridAgent: 'AGENT GRID A',
      portalId: 'PORTAL-01',
      brokerAgentName: 'LIBERTY DIRECT',
      paymentBy: 'CHEQUE',
      broker: 'RELIABLE ASSOCIATES',
      chequeNo: 'CHK99001',
      cheque: 'CLEARED',
      createUser: 'ADMIN',
      commVehAge: '4 YEARS',
      franchiseCode: 'FR-001',
      appOdDiscount: 50,
      erp: 'ERP-101'
    },
    {
      id: 2,
      riskStartDate: '09/10/2026',
      referenceType: 'AGENT',
      companyName: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
      policyNo: 'VGC1425171000101',
      product: 'MOTOR',
      productType: 'GCV',
      productSubType: 'PUBLIC GCV 12001-20000 GVW',
      policyType: 'COMPREHENSIVE',
      businessType: 'RENEWAL',
      customerName: 'SUNITA SHARMA',
      contactNo: '9812345678',
      vehicleMake: 'TATA',
      vehicleModelName: 'LPT 1613',
      registrationNo: 'VGC1425171000101',
      fuelType: 'DIESEL',
      mfgYear: '2021',
      transDate: '06/10/2026',
      gvwCc: '16000 GVW',
      branchName: 'MUMBAI',
      agentName: 'Sneha Kulkarni',
      location: 'MUMBAI',
      employeeName: 'HEMANT KAKULTE',
      paymentType: 'CHEQUE',
      remark: 'VERIFIED',
      odPremium: 22000,
      tpPremium: 8900,
      other: 0,
      netPremium: 30900,
      proposalAmt: 30900,
      brokerCommNetOd: 'NET',
      brokerGridPct: 18,
      brokerCommission: 5562,
      brokerTds: 278.1,
      brokerNetCommission: 5283.9,
      executiveCommNetOd: 'NET',
      executiveGridPct: 6,
      executiveIncentive: 1854,
      executiveTds: 92.7,
      executiveNetIncentive: 1761.3,
      franchiseCommNetOd: 'NET',
      franchiseGridPct: 0,
      franchiseCommission: 0,
      franchiseTds: 0,
      franchiseNetCommission: 0,
      agentCommNetOd: 'NET',
      agentGridPct: 12,
      agentGrossComm: 3708,
      agentTds: 185.4,
      agentNetCommission: 3522.6,
      cutNPay: 0,
      instaPayment: 0,
      regularPayment: 3522.6,
      netPay: 3522.6,
      passOn: 0,
      cashBack: 0,
      grossProfit: 1854,
      saving: 0,
      paidStatement: 'PAID',
      gridAgent: 'AGENT GRID B',
      portalId: 'PORTAL-02',
      brokerAgentName: 'ROYAL DIRECT',
      paymentBy: 'ONLINE',
      broker: 'RELIABLE ASSOCIATES',
      chequeNo: 'CHK88112',
      cheque: 'CLEARED',
      createUser: 'ADMIN',
      commVehAge: '5 YEARS',
      franchiseCode: 'FR-002',
      appOdDiscount: 45,
      erp: 'ERP-102'
    },
    {
      id: 3,
      riskStartDate: '11/10/2026',
      referenceType: 'AGENT',
      companyName: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
      policyNo: 'P0027200038/4193/100875',
      product: 'MOTOR',
      productType: 'GCV',
      productSubType: 'PUBLIC GCV 20001-40000 GVW',
      policyType: 'STP',
      businessType: 'NEW',
      customerName: 'NILESH MAHESH BORSE',
      contactNo: '9765432109',
      vehicleMake: 'EICHER',
      vehicleModelName: 'PRO 3019',
      registrationNo: 'MH41AU7799',
      fuelType: 'DIESEL',
      mfgYear: '2023',
      transDate: '06/10/2026',
      gvwCc: '18500 GVW',
      branchName: 'BARAMATI',
      agentName: 'Rahul Sharma',
      location: 'BARAMATI',
      employeeName: 'AMOL WANAVE',
      paymentType: 'NEFT',
      remark: 'PENDING',
      odPremium: 18500,
      tpPremium: 7200,
      other: 0,
      netPremium: 25700,
      proposalAmt: 25700,
      brokerCommNetOd: 'OD',
      brokerGridPct: 15,
      brokerCommission: 2775,
      brokerTds: 138.75,
      brokerNetCommission: 2636.25,
      executiveCommNetOd: 'OD',
      executiveGridPct: 5,
      executiveIncentive: 925,
      executiveTds: 46.25,
      executiveNetIncentive: 878.75,
      franchiseCommNetOd: 'OD',
      franchiseGridPct: 0,
      franchiseCommission: 0,
      franchiseTds: 0,
      franchiseNetCommission: 0,
      agentCommNetOd: 'OD',
      agentGridPct: 10,
      agentGrossComm: 1850,
      agentTds: 92.5,
      agentNetCommission: 1757.5,
      cutNPay: 0,
      instaPayment: 0,
      regularPayment: 1757.5,
      netPay: 1757.5,
      passOn: 0,
      cashBack: 0,
      grossProfit: 925,
      saving: 0,
      paidStatement: 'PENDING',
      gridAgent: 'AGENT GRID A',
      portalId: 'PORTAL-03',
      brokerAgentName: 'MAGMA DIRECT',
      paymentBy: 'NEFT',
      broker: 'RELIABLE ASSOCIATES',
      chequeNo: 'CHK33221',
      cheque: 'PENDING',
      createUser: 'OPERATOR1',
      commVehAge: '3 YEARS',
      franchiseCode: 'FR-003',
      appOdDiscount: 55,
      erp: 'ERP-103'
    }
  ]);

  // Filtered dataset
  const filteredCommissionRows = commissionRows.filter(row =>
    !searchQuery ||
    row.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.policyNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.registrationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCommissionRows.length / itemsPerPage) || 1;
  const paginatedCommissionRows = filteredCommissionRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // 12 Sub-Tabs List
  const tabsList: { key: MisSubTab; label: string }[] = [
    { key: 'commission', label: 'Commission Profit' },
    { key: 'agentSummary', label: 'Agent Wise Summary' },
    { key: 'agentMIS', label: 'Agent MIS' },
    { key: 'paymentAdvice', label: 'Payment Advice' },
    { key: 'agentReport', label: 'Agent Wise Summary Report' },
    { key: 'executiveMIS', label: 'Executive MIS Report' },
    { key: 'misReport', label: 'MIS Report' },
    { key: 'executiveSummary', label: 'Executive Summary' },
    { key: 'statement', label: 'Agent Commission Statement' },
    { key: 'outstanding', label: 'Insurance company Outstanding' },
    { key: 'target', label: 'Executive Target Report' },
    { key: 'details', label: 'Agent MIS Details' }
  ];

  const getTabTitle = (tab: MisSubTab) => {
    return tabsList.find(t => t.key === tab)?.label || 'MIS Report';
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5 font-sans">
      {/* Top Header Bar */}
      <PageHeader
        title="MIS Reports"
        description="Manage commission profit, agent summaries, payment advice & reports"
      />

      {/* 2-Row Full-Width Sub-Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-brand-border p-3 space-y-2.5 shadow-sm w-full max-w-full">
        {/* Row 1: First 8 Tabs - Spreading Full Width in 8 Equal Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full border-b border-slate-200 pb-2.5">
          {tabsList.slice(0, 8).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setCurrentPage(1);
                  setSearchQuery('');
                }}
                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
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

        {/* Row 2: Remaining 4 Tabs - Spreading Full Width in 4 Equal Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          {tabsList.slice(8).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setCurrentPage(1);
                  setSearchQuery('');
                }}
                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
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

      {/* Main Full-Width Content Container */}
      <div key={activeTab} className="tab-transition-wrapper w-full max-w-full">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full max-w-full">

          {/* ========================================================================= */}
          {/* TAB 1: COMMISSION PROFIT */}
          {/* ========================================================================= */}
          {activeTab === 'commission' && (
            <div className="border-b border-slate-200 bg-brand-mainbg">
              {/* Card Header Banner */}
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Commission Profit</span>
              </div>

              <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto_1fr_1fr_auto_auto] gap-3.5 items-end w-full">
                {/* Radio Options on Left */}
                <div className="flex items-center gap-4 pb-1">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-brand-navy cursor-pointer whitespace-nowrap">
                    <input
                      type="radio"
                      name="dateTypeComm"
                      checked={dateType === 'trans'}
                      onChange={() => setDateType('trans')}
                      className="accent-brand-primary w-4 h-4"
                    />
                    Trans Date
                  </label>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-brand-navy cursor-pointer whitespace-nowrap">
                    <input
                      type="radio"
                      name="dateTypeComm"
                      checked={dateType === 'risk'}
                      onChange={() => setDateType('risk')}
                      className="accent-brand-primary w-4 h-4"
                    />
                    Risk Start Date
                  </label>
                </div>

                {/* From Date - Expanded to fill width */}
                <div className="w-full">
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1">FROM DATE</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                {/* To Date - Expanded to fill width */}
                <div className="w-full">
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1">TO DATE</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                {/* Action Buttons */}
                <button
                  onClick={() => setCurrentPage(1)}
                  className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Eye size={15} />
                  <span>SHOW</span>
                </button>
                <button
                  onClick={() => alert('Exporting Grid...')}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                >
                  <Download size={15} />
                  <span>EXPORT</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: AGENT WISE SUMMARY */}
          {/* ========================================================================= */}
          {activeTab === 'agentSummary' && (
            <div className="border-b border-slate-200 bg-brand-mainbg">
              {/* Card Header Banner */}
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Agent Wise Summary</span>
              </div>

              <div className="p-3 sm:p-4 space-y-3">
                {/* Form Controls Row 1: Full-width grid without empty middle gap */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[auto_1fr_1fr_1fr_1fr] gap-3.5 items-end w-full">
                  <div className="flex items-center gap-5 pb-1">
                    <label className="flex items-center gap-1.5 font-bold text-xs text-brand-navy cursor-pointer whitespace-nowrap">
                      <input
                        type="radio"
                        name="summaryEntity"
                        checked={entityType === 'Agent'}
                        onChange={() => setEntityType('Agent')}
                        className="accent-brand-primary w-4 h-4"
                      />
                      Agent
                    </label>
                    <label className="flex items-center gap-1.5 font-bold text-xs text-brand-navy cursor-pointer whitespace-nowrap">
                      <input
                        type="radio"
                        name="summaryEntity"
                        checked={entityType === 'Franchise'}
                        onChange={() => setEntityType('Franchise')}
                        className="accent-brand-primary w-4 h-4"
                      />
                      Franchise
                    </label>
                  </div>

                  <div className="w-full">
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">--Select Month--</option>
                      {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Year</label>
                    <input
                      type="text"
                      placeholder="yyyy"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Branch</label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">--Select Branch--</option>
                      {branchesList.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div className="w-full">
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Agent</label>
                    <select
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">--Select Agent--</option>
                      {agentsList.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                {/* Form Controls Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end pt-2 border-t border-slate-200 w-full">
                  <div>
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Comm. NET Sum</label>
                    <input
                      type="text"
                      placeholder="0.00"
                      value={commNetSum}
                      onChange={(e) => setCommNetSum(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-slate-100 text-brand-navy font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Bank UTR No.</label>
                    <input
                      type="text"
                      placeholder="Enter UTR No"
                      value={bankUtrNo}
                      onChange={(e) => setBankUtrNo(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Date</label>
                    <input
                      type="date"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Difference Amt</label>
                    <input
                      type="text"
                      placeholder="0.00"
                      value={differenceAmt}
                      onChange={(e) => setDifferenceAmt(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Check</label>
                    <input
                      type="text"
                      placeholder="Check No"
                      value={checkNo}
                      onChange={(e) => setCheckNo(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-md text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-brand-navy mb-0.5">Inv No.</label>
                    <input
                      type="text"
                      value={invNo}
                      onChange={(e) => setInvNo(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-100 border border-slate-300 rounded-md text-xs font-mono text-brand-navy"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2.5 pt-1.5">
                  <button className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md shadow-sm transition cursor-pointer border-none uppercase">
                    SAVE
                  </button>
                  <button className="px-5 py-1.5 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-xs rounded-md shadow-sm transition cursor-pointer border-none uppercase">
                    VIEW
                  </button>
                  <button className="px-5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-md shadow-sm transition cursor-pointer border-none uppercase">
                    EXPORT GRID
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: AGENT MIS */}
          {/* ========================================================================= */}
          {activeTab === 'agentMIS' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-3">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Agent MIS</span>
              </div>

              <div className="space-y-3">
                {/* Row 1: Entity Radio Buttons */}
                <div className="flex flex-wrap items-center gap-6">
                  <label className="flex items-center gap-2 font-bold text-xs text-brand-navy cursor-pointer">
                    <input
                      type="radio"
                      name="agentMisEntityType"
                      checked={entityType === 'Agent'}
                      onChange={() => setEntityType('Agent')}
                      className="accent-brand-primary w-4 h-4"
                    />
                    Agent
                  </label>
                  <label className="flex items-center gap-2 font-bold text-xs text-brand-navy cursor-pointer">
                    <input
                      type="radio"
                      name="agentMisEntityType"
                      checked={entityType === 'Franchise'}
                      onChange={() => setEntityType('Franchise')}
                      className="accent-brand-primary w-4 h-4"
                    />
                    Franchise
                  </label>
                  <label className="flex items-center gap-2 font-bold text-xs text-brand-navy cursor-pointer">
                    <input
                      type="radio"
                      name="agentMisEntityType"
                      checked={entityType === 'Franchise Agent'}
                      onChange={() => setEntityType('Franchise Agent')}
                      className="accent-brand-primary w-4 h-4"
                    />
                    Franchise Agent
                  </label>
                </div>

                {/* Row 2: Month, Year, Branch/Location, Agent */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">--Select Month--</option>
                      {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Year</label>
                    <input
                      type="text"
                      placeholder="yyyy"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <label className="flex items-center gap-1 text-[11px] font-bold text-brand-navy cursor-pointer">
                        <input
                          type="radio"
                          name="branchLocToggle"
                          checked={filterMode === 'branch'}
                          onChange={() => setFilterMode('branch')}
                          className="accent-brand-primary w-3.5 h-3.5"
                        />
                        Branch
                      </label>
                      <label className="flex items-center gap-1 text-[11px] font-bold text-brand-navy cursor-pointer">
                        <input
                          type="radio"
                          name="branchLocToggle"
                          checked={filterMode === 'location'}
                          onChange={() => setFilterMode('location')}
                          className="accent-brand-primary w-3.5 h-3.5"
                        />
                        Location
                      </label>
                    </div>
                    <select
                      value={filterMode === 'branch' ? selectedBranch : selectedLocation}
                      onChange={(e) => filterMode === 'branch' ? setSelectedBranch(e.target.value) : setSelectedLocation(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">{filterMode === 'branch' ? '--Select Branch--' : '--Select Location--'}</option>
                      {branchesList.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1">Agent</label>
                    <select
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">--Select Agent--</option>
                      {agentsList.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                </div>

                {/* Row 3: Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-5 py-1.5 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5"
                  >
                    <Eye size={15} />
                    <span>VIEW</span>
                  </button>
                  <button
                    onClick={() => alert('Exporting Agent MIS...')}
                    className="px-5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5"
                  >
                    <Download size={15} />
                    <span>EXPORT MIS</span>
                  </button>
                  <button
                    onClick={() => alert('Sending Mail...')}
                    className="px-5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5"
                  >
                    <Send size={15} />
                    <span>SEND MAIL</span>
                  </button>
                  <button
                    onClick={() => alert('Downloading PDF...')}
                    className="px-5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5"
                  >
                    <Download size={15} />
                    <span>DOWNLOAD PDF</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ========================================================================= */}
          {/* TAB 4: PAYMENT ADVICE */}
          {/* ========================================================================= */}
          {activeTab === 'paymentAdvice' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-3">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Payment Advice Report</span>
              </div>

              <div className="flex flex-wrap items-end gap-3.5 w-full">
                {/* Agent / Franchise Radio */}
                <div className="flex items-center gap-4 py-2 shrink-0">
                  <label className="flex items-center gap-1.5 font-bold text-xs text-brand-navy cursor-pointer whitespace-nowrap">
                    <input
                      type="radio"
                      name="paEntityType"
                      checked={entityType === 'Agent'}
                      onChange={() => setEntityType('Agent')}
                      className="accent-brand-primary w-4 h-4"
                    />
                    Agent
                  </label>
                  <label className="flex items-center gap-1.5 font-bold text-xs text-brand-navy cursor-pointer whitespace-nowrap">
                    <input
                      type="radio"
                      name="paEntityType"
                      checked={entityType === 'Franchise'}
                      onChange={() => setEntityType('Franchise')}
                      className="accent-brand-primary w-4 h-4"
                    />
                    Franchise
                  </label>
                </div>

                {/* Branch Dropdown */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">--Select Branch--</option>
                    {branchesList.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                {/* Agent Dropdown */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Agent</label>
                  <select
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">--Select Agent--</option>
                    {agentsList.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>

                {/* Month Dropdown - All 12 Months */}
                <div className="flex-1 min-w-[140px]">
                  <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">--Select Month--</option>
                    {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                {/* Year Field */}
                <div className="w-24 min-w-[90px]">
                  <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Year</label>
                  <input
                    type="text"
                    placeholder="YYYY"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                {/* View Report Button */}
                <div className="shrink-0">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    View Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: AGENT WISE SUMMARY REPORT (Commission Paid Statement - Image 2) */}
          {/* ========================================================================= */}
          {activeTab === 'agentReport' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-4">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Commission Paid Statement</span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-end gap-4 w-full">
                  {/* ALL Checkbox */}
                  <div className="flex items-center gap-2 py-2 shrink-0">
                    <label className="flex items-center gap-1.5 font-bold text-xs text-brand-navy cursor-pointer whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="accent-brand-primary w-4 h-4 rounded cursor-pointer"
                      />
                      ALL
                    </label>
                  </div>

                  {/* Month Dropdown */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary cursor-pointer"
                    >
                      <option value="">--Select Month--</option>
                      {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  {/* Year Input */}
                  <div className="w-28 min-w-[100px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Year</label>
                    <input
                      type="text"
                      placeholder="YYYY"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => alert('Exporting Grid...')}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Export Grid</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: EXECUTIVE MIS REPORT (Sales Ex. Commission Report - Image 3) */}
          {/* ========================================================================= */}
          {activeTab === 'executiveMIS' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-4">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Sales Ex. Commission Report</span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-end gap-4 w-full">
                  {/* Direct Radio */}
                  <div className="flex items-center gap-2 py-2 shrink-0">
                    <label className="flex items-center gap-1.5 font-bold text-xs text-brand-navy cursor-pointer whitespace-nowrap">
                      <input
                        type="radio"
                        name="execDirectRadio"
                        checked
                        readOnly
                        className="accent-brand-primary w-4 h-4 cursor-pointer"
                      />
                      Direct
                    </label>
                  </div>

                  {/* Year Input */}
                  <div className="w-28 min-w-[100px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Year</label>
                    <input
                      type="text"
                      placeholder="YYYY"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  {/* Month Dropdown */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary cursor-pointer"
                    >
                      <option value="">--Select Month--</option>
                      {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  {/* Sales Executive Dropdown */}
                  <div className="flex-1 min-w-[180px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Sales Executive</label>
                    <select
                      value={selectedExecutive}
                      onChange={(e) => setSelectedExecutive(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary cursor-pointer"
                    >
                      <option value="">--Select Executive--</option>
                      {executivesList.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => alert('Exporting MIS...')}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Export MIS</span>
                  </button>
                  <button
                    onClick={() => alert('Sending Mail...')}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Send size={14} />
                    <span>Send Mail</span>
                  </button>
                  <button
                    onClick={() => alert('Downloading PDF...')}
                    className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Download size={14} />
                    <span>Download pdf</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: MIS REPORT (Policy Type vs Insurance Companies Matrix - Image 3, 4, 5) */}
          {/* ========================================================================= */}
          {activeTab === 'misReport' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-4">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» MIS Report</span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-end gap-4 w-full">
                  {/* Month Dropdown - All 12 Months */}
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary cursor-pointer"
                    >
                      <option value="">--Select Month--</option>
                      {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  {/* Year Input */}
                  <div className="w-32 min-w-[110px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Year</label>
                    <input
                      type="text"
                      placeholder="yyyy"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      onClick={() => setShowMisMatrix(true)}
                      className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => alert('Exporting Grid...')}
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Export Grid</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: EXECUTIVE SUMMARY (Image 1) */}
          {/* ========================================================================= */}
          {activeTab === 'executiveSummary' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-4">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Executive Summary</span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-end gap-4 w-full">
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary cursor-pointer"
                    >
                      <option value="">--Select Month--</option>
                      {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  <div className="w-32 min-w-[110px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Year</label>
                    <input
                      type="text"
                      placeholder="yyyy"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => alert('Exporting Grid...')}
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Export Grid</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: AGENT COMMISSION STATEMENT (Image 2) */}
          {/* ========================================================================= */}
          {activeTab === 'statement' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-4">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Commission Paid Statement</span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-end gap-4 w-full">
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Month</label>
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary cursor-pointer"
                    >
                      <option value="">--Select Month--</option>
                      {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>

                  <div className="w-32 min-w-[110px]">
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Year</label>
                    <input
                      type="text"
                      placeholder="yyyy"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => alert('Exporting Grid...')}
                      className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                    >
                      <span>Export Grid</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 10: INSURANCE COMPANY OUTSTANDING */}
          {/* ========================================================================= */}
          {activeTab === 'outstanding' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-3">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Insurance company Outstanding</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy"
                  >
                    <option value="">--Select Month--</option>
                    {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="yyyy"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy"
                  >
                    <option value="">--Select Branch--</option>
                    {branchesList.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-5 py-1.5 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm cursor-pointer border-none uppercase">
                    View Report
                  </button>
                  <button className="px-5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm cursor-pointer border-none uppercase">
                    Export
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 11: EXECUTIVE TARGET REPORT (Image 3) */}
          {/* ========================================================================= */}
          {activeTab === 'target' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Executive Target Report</span>
                <button
                  onClick={() => alert('Exporting to Excel...')}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Export To Excel</span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 12: AGENT MIS DETAILS (Image 4) */}
          {/* ========================================================================= */}
          {activeTab === 'details' && (
            <div className="p-4 sm:p-5 border-b border-slate-200 bg-brand-mainbg space-y-4">
              <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between rounded-t-lg">
                <span>» Commission Statement</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">Agent</label>
                    <select
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary cursor-pointer"
                    >
                      <option value="">--Select Agent--</option>
                      {agentsList.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">From Date</label>
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1 uppercase">To Date</label>
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-white text-brand-navy focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => alert('Exporting Grid...')}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <span>Export Grid</span>
                  </button>
                  <button
                    onClick={() => alert('Downloading PDF...')}
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-xs shadow-sm transition-all cursor-pointer border-none uppercase flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Download size={14} />
                    <span>Download Pdf</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table Toolbar, Data Table & Pagination - Only rendered for data-table tabs */}
          {['commission', 'agentSummary', 'agentMIS'].includes(activeTab) && (
            <>
              {/* Table Toolbar (Search Box with placeholder "Search Customer Name...") */}
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search Customer Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Full-Width Data Table Section */}
              <div className="overflow-x-auto w-full max-w-full custom-scrollbar">
                {/* 1. COMMISSION PROFIT TABLE */}
                {activeTab === 'commission' && (
                  <table className="w-full text-left border-collapse min-w-[3600px]">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                        <th className="py-3 px-4 text-center w-14">SR. NO.</th>
                        <th className="py-3 px-4">Risk Start Date</th>
                        <th className="py-3 px-4">Reference Type</th>
                        <th className="py-3 px-6">Company Name</th>
                        <th className="py-3 px-6">Policy No</th>
                        <th className="py-3 px-4">Product</th>
                        <th className="py-3 px-4">Product Type</th>
                        <th className="py-3 px-4">Product Sub Type</th>
                        <th className="py-3 px-4">Policy Type</th>
                        <th className="py-3 px-4">Business Type</th>
                        <th className="py-3 px-6">Customer Name</th>
                        <th className="py-3 px-4">Contact No</th>
                        <th className="py-3 px-4">Vehicle Make</th>
                        <th className="py-3 px-4">Vehicle Model Name</th>
                        <th className="py-3 px-4">Registration No</th>
                        <th className="py-3 px-4">Fuel Type</th>
                        <th className="py-3 px-4">Mfg. Year</th>
                        <th className="py-3 px-4">Trans Date</th>
                        <th className="py-3 px-4">GVW/CC</th>
                        <th className="py-3 px-4">Branch Name</th>
                        <th className="py-3 px-6">Agent Name</th>
                        <th className="py-3 px-4">Location</th>
                        <th className="py-3 px-4">Employee Name</th>
                        <th className="py-3 px-4">Payment Type</th>
                        <th className="py-3 px-4">Remark</th>
                        <th className="py-3 px-4 text-right">OD Premium (₹)</th>
                        <th className="py-3 px-4 text-right">TP Premium (₹)</th>
                        <th className="py-3 px-4 text-right">Other (₹)</th>
                        <th className="py-3 px-4 text-right">Net Premium (₹)</th>
                        <th className="py-3 px-4 text-right">Proposal Amt (₹)</th>
                        <th className="py-3 px-4">Broker Comm. NET/OD</th>
                        <th className="py-3 px-4 text-right">Broker Grid %</th>
                        <th className="py-3 px-4 text-right">Broker Commission (₹)</th>
                        <th className="py-3 px-4 text-right">Broker TDS (₹)</th>
                        <th className="py-3 px-4 text-right">Broker NetCommission (₹)</th>
                        <th className="py-3 px-4">Executive Comm. NET/OD</th>
                        <th className="py-3 px-4 text-right">Executive Grid %</th>
                        <th className="py-3 px-4 text-right">Executive Insentive (₹)</th>
                        <th className="py-3 px-4 text-right">Executive TDS (₹)</th>
                        <th className="py-3 px-4 text-right">Executive Net Insentive (₹)</th>
                        <th className="py-3 px-4">Franchise Comm NET/OD</th>
                        <th className="py-3 px-4 text-right">Franchise Grid %</th>
                        <th className="py-3 px-4 text-right">Franchise Commission (₹)</th>
                        <th className="py-3 px-4 text-right">Franchise TDS (₹)</th>
                        <th className="py-3 px-4 text-right">Franchise NetCommission (₹)</th>
                        <th className="py-3 px-4">Agent Comm. NET/OD</th>
                        <th className="py-3 px-4 text-right">Agent Grid %</th>
                        <th className="py-3 px-4 text-right">Agent Gross Comm (₹)</th>
                        <th className="py-3 px-4 text-right">Agent TDS (₹)</th>
                        <th className="py-3 px-4 text-right">Agent NetCommission (₹)</th>
                        <th className="py-3 px-4 text-right">Cut N Pay (₹)</th>
                        <th className="py-3 px-4 text-right">Insta Payment (₹)</th>
                        <th className="py-3 px-4 text-right">Regular Payment (₹)</th>
                        <th className="py-3 px-4 text-right">NetPay (₹)</th>
                        <th className="py-3 px-4 text-right">Pass On (₹)</th>
                        <th className="py-3 px-4 text-right">Cash Back (₹)</th>
                        <th className="py-3 px-4 text-right">Gross Profit (₹)</th>
                        <th className="py-3 px-4 text-right">Saving (₹)</th>
                        <th className="py-3 px-4">Paid Statement</th>
                        <th className="py-3 px-4">Grid Agent</th>
                        <th className="py-3 px-4">Portal Id</th>
                        <th className="py-3 px-6">Broker Agent Name</th>
                        <th className="py-3 px-4">Payment By</th>
                        <th className="py-3 px-6">Broker</th>
                        <th className="py-3 px-4">ChequeNo</th>
                        <th className="py-3 px-4">Cheque</th>
                        <th className="py-3 px-4">CreateUser</th>
                        <th className="py-3 px-4">Comm Veh Age</th>
                        <th className="py-3 px-4">Franchise Code</th>
                        <th className="py-3 px-4 text-right">App ODDiscount (%)</th>
                        <th className="py-3 px-4">ERP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-[13px]">
                      {paginatedCommissionRows.map((row, idx) => (
                        <tr key={row.id} className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white whitespace-nowrap">
                          <td className="py-2 px-4 text-center font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                          <td className="py-2 px-4 text-slate-700 font-mono">{row.riskStartDate}</td>
                          <td className="py-2 px-4 font-semibold text-brand-primary">{row.referenceType}</td>
                          <td className="py-2 px-6 font-semibold text-brand-navy">{row.companyName}</td>
                          <td className="py-2 px-6 font-mono font-bold text-brand-primary">{row.policyNo}</td>
                          <td className="py-2 px-4 font-semibold text-slate-700">{row.product}</td>
                          <td className="py-2 px-4 text-slate-600">{row.productType}</td>
                          <td className="py-2 px-4 text-slate-600">{row.productSubType}</td>
                          <td className="py-2 px-4 font-semibold text-slate-700">{row.policyType}</td>
                          <td className="py-2 px-4 font-semibold text-slate-800">{row.businessType}</td>
                          <td className="py-2 px-6 font-bold text-brand-navy">{row.customerName}</td>
                          <td className="py-2 px-4 font-mono text-slate-600">{row.contactNo}</td>
                          <td className="py-2 px-4 font-medium text-slate-700">{row.vehicleMake}</td>
                          <td className="py-2 px-4 font-medium text-slate-700">{row.vehicleModelName}</td>
                          <td className="py-2 px-4 font-mono font-bold text-slate-800">{row.registrationNo}</td>
                          <td className="py-2 px-4 text-slate-600">{row.fuelType}</td>
                          <td className="py-2 px-4 font-mono text-slate-600">{row.mfgYear}</td>
                          <td className="py-2 px-4 font-mono text-slate-600">{row.transDate}</td>
                          <td className="py-2 px-4 text-slate-600">{row.gvwCc}</td>
                          <td className="py-2 px-4 font-semibold text-slate-700">{row.branchName}</td>
                          <td className="py-2 px-6 font-semibold text-brand-navy">{row.agentName}</td>
                          <td className="py-2 px-4 text-slate-600">{row.location}</td>
                          <td className="py-2 px-4 text-slate-600">{row.employeeName}</td>
                          <td className="py-2 px-4 text-slate-600">{row.paymentType}</td>
                          <td className="py-2 px-4 text-slate-600">{row.remark}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹{row.odPremium.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹{row.tpPremium.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono text-slate-600">₹{row.other.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-brand-navy">₹{row.netPremium.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono text-slate-700">₹{row.proposalAmt.toLocaleString()}</td>
                          <td className="py-2 px-4 text-slate-600">{row.brokerCommNetOd}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold">{row.brokerGridPct}%</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹{row.brokerCommission.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono text-slate-600">₹{row.brokerTds}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹{row.brokerNetCommission.toLocaleString()}</td>
                          <td className="py-2 px-4 text-slate-600">{row.executiveCommNetOd}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold">{row.executiveGridPct}%</td>
                          <td className="py-2 px-4 text-right font-mono text-emerald-600">₹{row.executiveIncentive.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono text-slate-600">₹{row.executiveTds}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹{row.executiveNetIncentive.toLocaleString()}</td>
                          <td className="py-2 px-4 text-slate-600">{row.franchiseCommNetOd}</td>
                          <td className="py-2 px-4 text-right font-mono">{row.franchiseGridPct}%</td>
                          <td className="py-2 px-4 text-right font-mono">₹{row.franchiseCommission}</td>
                          <td className="py-2 px-4 text-right font-mono">₹{row.franchiseTds}</td>
                          <td className="py-2 px-4 text-right font-mono">₹{row.franchiseNetCommission}</td>
                          <td className="py-2 px-4 text-slate-600">{row.agentCommNetOd}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold">{row.agentGridPct}%</td>
                          <td className="py-2 px-4 text-right font-mono text-emerald-600">₹{row.agentGrossComm.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono text-slate-600">₹{row.agentTds}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹{row.agentNetCommission.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono">₹{row.cutNPay}</td>
                          <td className="py-2 px-4 text-right font-mono">₹{row.instaPayment}</td>
                          <td className="py-2 px-4 text-right font-mono text-emerald-600">₹{row.regularPayment.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹{row.netPay.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono">₹{row.passOn}</td>
                          <td className="py-2 px-4 text-right font-mono">₹{row.cashBack}</td>
                          <td className="py-2 px-4 text-right font-mono font-bold text-brand-primary">₹{row.grossProfit.toLocaleString()}</td>
                          <td className="py-2 px-4 text-right font-mono">₹{row.saving}</td>
                          <td className="py-2 px-4 font-bold text-emerald-700">{row.paidStatement}</td>
                          <td className="py-2 px-4 text-slate-600">{row.gridAgent}</td>
                          <td className="py-2 px-4 text-slate-600">{row.portalId}</td>
                          <td className="py-2 px-6 text-slate-700">{row.brokerAgentName}</td>
                          <td className="py-2 px-4 text-slate-600">{row.paymentBy}</td>
                          <td className="py-2 px-6 font-semibold text-slate-700">{row.broker}</td>
                          <td className="py-2 px-4 font-mono text-slate-600">{row.chequeNo}</td>
                          <td className="py-2 px-4 text-slate-600">{row.cheque}</td>
                          <td className="py-2 px-4 text-slate-600">{row.createUser}</td>
                          <td className="py-2 px-4 text-slate-600">{row.commVehAge}</td>
                          <td className="py-2 px-4 font-mono text-slate-600">{row.franchiseCode}</td>
                          <td className="py-2 px-4 text-right font-mono">{row.appOdDiscount}%</td>
                          <td className="py-2 px-4 font-mono text-slate-600">{row.erp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* 2. AGENT WISE SUMMARY TABLE */}
                {activeTab === 'agentSummary' && (
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                        <th className="py-3 px-6">SR. NO.</th>
                        <th className="py-3 px-6">TRANS DATE</th>
                        <th className="py-3 px-6">RISK START DATE</th>
                        <th className="py-3 px-6">CUSTOMER NAME</th>
                        <th className="py-3 px-6">AGENT NAME</th>
                        <th className="py-3 px-6">BRANCH / LOCATION</th>
                        <th className="py-3 px-6">COMM NET SUM</th>
                        <th className="py-3 px-6">INV / UTR NO</th>
                        <th className="py-3 px-6 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-[13px]">
                      <tr className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white">
                        <td className="py-2 px-6 font-medium text-slate-500">1</td>
                        <td className="py-2 px-6 font-mono text-slate-700">2026-10-06</td>
                        <td className="py-2 px-6 font-mono text-slate-700">2026-10-01</td>
                        <td className="py-2 px-6 font-bold text-brand-navy">Ramesh Patel</td>
                        <td className="py-2 px-6 text-slate-700 font-semibold">Amit Deshmukh</td>
                        <td className="py-2 px-6">
                          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-lightbg text-brand-primary border border-brand-border">
                            BARAMATI / PUNE
                          </span>
                        </td>
                        <td className="py-2 px-6 font-bold text-emerald-600 font-mono">₹15,400</td>
                        <td className="py-2 px-6 font-mono text-xs text-brand-primary">RA0101 / UTR99887766</td>
                        <td className="py-2 px-6 text-right">
                          <button
                            onClick={() => setShowModal(true)}
                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Edit Record"
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white">
                        <td className="py-2 px-6 font-medium text-slate-500">2</td>
                        <td className="py-2 px-6 font-mono text-slate-700">2026-10-06</td>
                        <td className="py-2 px-6 font-mono text-slate-700">2026-10-04</td>
                        <td className="py-2 px-6 font-bold text-brand-navy">Sunita Sharma</td>
                        <td className="py-2 px-6 text-slate-700 font-semibold">Sneha Kulkarni</td>
                        <td className="py-2 px-6">
                          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-brand-lightbg text-brand-primary border border-brand-border">
                            MUMBAI / MUMBAI
                          </span>
                        </td>
                        <td className="py-2 px-6 font-bold text-emerald-600 font-mono">₹28,900</td>
                        <td className="py-2 px-6 font-mono text-xs text-brand-primary">RA0102 / UTR11223344</td>
                        <td className="py-2 px-6 text-right">
                          <button
                            onClick={() => setShowModal(true)}
                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                            title="Edit Record"
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* 3. AGENT MIS TABLE */}
                {activeTab === 'agentMIS' && (
                  <table className="w-full text-left border-collapse min-w-[1200px]">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                        <th className="py-3 px-4 text-center">SR. NO.</th>
                        <th className="py-3 px-4">MONTH / YEAR</th>
                        <th className="py-3 px-4">AGENT CODE</th>
                        <th className="py-3 px-6">AGENT NAME</th>
                        <th className="py-3 px-4 text-center">POLICIES</th>
                        <th className="py-3 px-4 text-right">OD PREMIUM (₹)</th>
                        <th className="py-3 px-4 text-right">TP PREMIUM (₹)</th>
                        <th className="py-3 px-4 text-right">NET PREMIUM (₹)</th>
                        <th className="py-3 px-4 text-right">GROSS COMM (₹)</th>
                        <th className="py-3 px-4 text-right">TDS (₹)</th>
                        <th className="py-3 px-4 text-right">NET COMM (₹)</th>
                        <th className="py-3 px-4 text-center">STATUS</th>
                        <th className="py-3 px-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-[13px]">
                      <tr className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white whitespace-nowrap">
                        <td className="py-2 px-4 text-center font-medium text-slate-500">1</td>
                        <td className="py-2 px-4 font-semibold text-slate-700">October 2026</td>
                        <td className="py-2 px-4 font-mono font-bold text-brand-primary">AG-101</td>
                        <td className="py-2 px-6 font-bold text-brand-navy">Amit Deshmukh</td>
                        <td className="py-2 px-4 text-center font-bold text-slate-800">21</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹245,000</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹100,000</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-brand-navy">₹345,000</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹40,500</td>
                        <td className="py-2 px-4 text-right font-mono text-slate-600">₹2,025</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹38,475</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">GENERATED</span>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px]" title="View Details">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white whitespace-nowrap">
                        <td className="py-2 px-4 text-center font-medium text-slate-500">2</td>
                        <td className="py-2 px-4 font-semibold text-slate-700">October 2026</td>
                        <td className="py-2 px-4 font-mono font-bold text-brand-primary">AG-102</td>
                        <td className="py-2 px-6 font-bold text-brand-navy">Sneha Kulkarni</td>
                        <td className="py-2 px-4 text-center font-bold text-slate-800">46</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹560,000</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹220,000</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-brand-navy">₹780,000</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹90,300</td>
                        <td className="py-2 px-4 text-right font-mono text-slate-600">₹4,515</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹85,785</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">GENERATED</span>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px]" title="View Details">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* 4. PAYMENT ADVICE TABLE */}
                {activeTab === 'paymentAdvice' && (
                  <table className="w-full text-left border-collapse min-w-[1100px]">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                        <th className="py-3 px-4 text-center">SR. NO.</th>
                        <th className="py-3 px-4">ADVICE NO</th>
                        <th className="py-3 px-4">ADVICE DATE</th>
                        <th className="py-3 px-6">BENEFICIARY NAME</th>
                        <th className="py-3 px-4">BANK NAME</th>
                        <th className="py-3 px-4">ACCOUNT NO</th>
                        <th className="py-3 px-4">IFSC CODE</th>
                        <th className="py-3 px-4 text-right">GROSS AMOUNT (₹)</th>
                        <th className="py-3 px-4 text-right">TDS (₹)</th>
                        <th className="py-3 px-4 text-right">NET PAYABLE (₹)</th>
                        <th className="py-3 px-4 text-center">STATUS</th>
                        <th className="py-3 px-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-[13px]">
                      <tr className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white">
                        <td className="py-2 px-4 text-center font-medium text-slate-500">1</td>
                        <td className="py-2 px-4 font-mono font-bold text-brand-primary">PA-2026-001</td>
                        <td className="py-2 px-4 font-mono text-slate-700">05/10/2026</td>
                        <td className="py-2 px-6 font-bold text-brand-navy">Amit Deshmukh</td>
                        <td className="py-2 px-4 font-semibold text-slate-700">HDFC Bank</td>
                        <td className="py-2 px-4 font-mono text-slate-600">50100234567890</td>
                        <td className="py-2 px-4 font-mono text-slate-600">HDFC0000241</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹16,500</td>
                        <td className="py-2 px-4 text-right font-mono text-slate-600">₹825</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹15,675</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">PAID</span>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px]" title="Download Advice">
                            <Download size={16} />
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white">
                        <td className="py-2 px-4 text-center font-medium text-slate-500">2</td>
                        <td className="py-2 px-4 font-mono font-bold text-brand-primary">PA-2026-002</td>
                        <td className="py-2 px-4 font-mono text-slate-700">06/10/2026</td>
                        <td className="py-2 px-6 font-bold text-brand-navy">Sneha Kulkarni</td>
                        <td className="py-2 px-4 font-semibold text-slate-700">ICICI Bank</td>
                        <td className="py-2 px-4 font-mono text-slate-600">001105001234</td>
                        <td className="py-2 px-4 font-mono text-slate-600">ICIC0000011</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹31,000</td>
                        <td className="py-2 px-4 text-right font-mono text-slate-600">₹1,550</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹29,450</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-100 text-amber-800">PENDING</span>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px]" title="Download Advice">
                            <Download size={16} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* 5. DEFAULT TABLE FOR OTHER REPORTS */}
                {!['commission', 'agentSummary', 'agentMIS', 'paymentAdvice'].includes(activeTab) && (
                  <table className="w-full text-left border-collapse min-w-[1000px]">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                        <th className="py-3 px-4 text-center">SR. NO.</th>
                        <th className="py-3 px-6">REPORT TITLE / ENTITY</th>
                        <th className="py-3 px-4">BRANCH / REGION</th>
                        <th className="py-3 px-4 text-center">POLICIES COUNT</th>
                        <th className="py-3 px-4 text-right">TOTAL PREMIUM (₹)</th>
                        <th className="py-3 px-4 text-right">COMMISSION / MARGIN (₹)</th>
                        <th className="py-3 px-4 text-center">STATUS</th>
                        <th className="py-3 px-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-[13px]">
                      <tr className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white">
                        <td className="py-2 px-4 text-center font-medium text-slate-500">1</td>
                        <td className="py-2 px-6 font-bold text-brand-navy">Baramati Branch MIS Report</td>
                        <td className="py-2 px-4 font-semibold text-slate-700">BARAMATI</td>
                        <td className="py-2 px-4 text-center font-bold text-slate-800">142</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹1,850,000</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹215,000</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">COMPLETED</span>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px]">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                      <tr className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white">
                        <td className="py-2 px-4 text-center font-medium text-slate-500">2</td>
                        <td className="py-2 px-6 font-bold text-brand-navy">Mumbai Region MIS Report</td>
                        <td className="py-2 px-4 font-semibold text-slate-700">MUMBAI</td>
                        <td className="py-2 px-4 text-center font-bold text-slate-800">289</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-600">₹4,200,000</td>
                        <td className="py-2 px-4 text-right font-mono font-bold text-emerald-700">₹480,000</td>
                        <td className="py-2 px-4 text-center">
                          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">COMPLETED</span>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <button className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px]">
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>

              {/* Footer Pagination */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <span>Records per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${currentPage === page
                          ? 'bg-brand-primary text-white shadow-sm'
                          : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </>
          )}


          {/* ========================================================================= */}
          {/* TAB 7: MIS REPORT MATRIX TABLE (Policy Type vs Insurance Companies) */}
          {/* ========================================================================= */}
          {activeTab === 'misReport' && showMisMatrix && (
            <div className="overflow-x-auto w-full max-w-full custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[3600px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                    <th className="py-3.5 px-4 font-bold min-w-[200px] text-left border-r border-brand-border/60">
                      POLICYTYPE
                    </th>
                    {misMatrixCompanies.map((company, idx) => (
                      <th key={idx} className="py-3.5 px-3 font-semibold max-w-[210px] whitespace-normal leading-tight text-center border-r border-brand-border/60">
                        {company}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px]">
                  {misMatrixRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-brand-mainbg h-[50px] transition-colors bg-white whitespace-nowrap">
                      <td className="py-3 px-4 font-bold text-brand-navy border-r border-slate-200 font-mono text-xs">
                        {row.policyType}
                      </td>
                      {misMatrixCompanies.map((company, cIdx) => {
                        const val = row.values[company];
                        return (
                          <td key={cIdx} className="py-3 px-3 text-center border-r border-slate-200 font-mono text-slate-700">
                            {val ? (
                              <span className="inline-block font-bold text-brand-primary bg-brand-lightbg px-2.5 py-1 rounded-md text-xs">
                                {val}
                              </span>
                            ) : (
                              <span className="text-slate-300 font-normal">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: EXECUTIVE SUMMARY MATRIX TABLE (Image 1) */}
          {/* ========================================================================= */}
          {activeTab === 'executiveSummary' && (
            <div className="overflow-x-auto w-full max-w-full custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[2400px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                    <th className="py-3.5 px-4 font-bold min-w-[240px] text-left border-r border-brand-border/60">
                      EMPNAME
                    </th>
                    <th className="py-3.5 px-4 font-bold min-w-[140px] text-right border-r border-brand-border/60">
                      TOTAL
                    </th>
                    {execSummaryCompanies.map((company, idx) => (
                      <th key={idx} className="py-3.5 px-3 font-semibold max-w-[210px] whitespace-normal leading-tight text-center border-r border-brand-border/60">
                        {company}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px]">
                  {execSummaryRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white whitespace-nowrap">
                      <td className="py-2.5 px-4 font-semibold text-brand-navy border-r border-slate-200 text-xs">
                        {row.empName}
                      </td>
                      <td className="py-2.5 px-4 font-mono font-bold text-brand-primary text-right border-r border-slate-200">
                        {row.total}
                      </td>
                      {execSummaryCompanies.map((company, cIdx) => {
                        const val = (row.values as Record<string, string>)[company];
                        return (
                          <td key={cIdx} className="py-2.5 px-3 text-center border-r border-slate-200 font-mono text-slate-700">
                            {val ? (
                              <span className="font-semibold text-slate-800">
                                {val}
                              </span>
                            ) : (
                              <span className="text-slate-300">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: AGENT COMMISSION STATEMENT TABLE (Image 2) */}
          {/* ========================================================================= */}
          {activeTab === 'statement' && (
            <div className="overflow-x-auto w-full max-w-full custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1100px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                    <th className="py-3 px-4 text-center w-16">SR.NO.</th>
                    <th className="py-3 px-4">BRANCH NAME</th>
                    <th className="py-3 px-6">AGENT NAME</th>
                    <th className="py-3 px-6">BANK NAME</th>
                    <th className="py-3 px-4">IFSC CODE</th>
                    <th className="py-3 px-6">BANK A/C</th>
                    <th className="py-3 px-4 text-right">COMM. AMT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px]">
                  {agentCommissionStatementRows.map((row, idx) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white whitespace-nowrap">
                      <td className="py-2.5 px-4 text-center font-medium text-slate-500">{idx + 1}</td>
                      <td className="py-2.5 px-4 font-semibold text-slate-700">{row.branch}</td>
                      <td className="py-2.5 px-6 font-bold text-brand-navy">{row.agent}</td>
                      <td className="py-2.5 px-6 font-semibold text-slate-700">{row.bankName}</td>
                      <td className="py-2.5 px-4 font-mono font-medium text-brand-primary">{row.ifsc}</td>
                      <td className="py-2.5 px-6 font-mono text-slate-700">{row.bankAc}</td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-600">
                        {row.commAmt.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 11: EXECUTIVE TARGET REPORT TABLE (Image 3) */}
          {/* ========================================================================= */}
          {activeTab === 'target' && (
            <div className="overflow-x-auto w-full max-w-full custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1250px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                    <th className="py-3 px-4 text-center w-16">SR.NO.</th>
                    <th className="py-3 px-4">BRANCH</th>
                    <th className="py-3 px-6">SALES PERSON NAME</th>
                    <th className="py-3 px-4 text-right">APRIL TAR</th>
                    <th className="py-3 px-4 text-right">APRIL ACHV</th>
                    <th className="py-3 px-4 text-right">MAY TAR</th>
                    <th className="py-3 px-4 text-right">MAY ACHV</th>
                    <th className="py-3 px-4 text-right">JUNE TAR</th>
                    <th className="py-3 px-4 text-right">JUNE ACHV</th>
                    <th className="py-3 px-4 text-right">Q1 TOTAL TAR</th>
                    <th className="py-3 px-4 text-right">Q1 TOTAL ACHV</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px]">
                  {execTargetReportRows.map((row, idx) => {
                    if (row.isSubTotal) {
                      return (
                        <tr key={`sub-${idx}`} className="bg-slate-100/90 font-bold text-slate-800 border-y border-slate-300 whitespace-nowrap">
                          <td colSpan={3} className="py-2.5 px-4 font-bold text-brand-navy uppercase tracking-wide">
                            {row.branch}
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono">{row.aprTar}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-emerald-700">{row.aprAchv}</td>
                          <td className="py-2.5 px-4 text-right font-mono">{row.mayTar}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-emerald-700">{row.mayAchv}</td>
                          <td className="py-2.5 px-4 text-right font-mono">{row.junTar}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-emerald-700">{row.junAchv}</td>
                          <td className="py-2.5 px-4 text-right font-mono">{row.q1Tar}</td>
                          <td className="py-2.5 px-4 text-right font-mono text-emerald-700">{row.q1Achv}</td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white whitespace-nowrap">
                        <td className="py-2.5 px-4 text-center font-medium text-slate-500">{row.id}</td>
                        <td className="py-2.5 px-4 font-semibold text-slate-700">{row.branch}</td>
                        <td className="py-2.5 px-6 font-bold text-brand-navy">{row.name}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-700">{row.aprTar}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-semibold text-emerald-600">{row.aprAchv}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-700">{row.mayTar}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-semibold text-emerald-600">{row.mayAchv}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-700">{row.junTar}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-semibold text-emerald-600">{row.junAchv}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-700">{row.q1Tar}</td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-brand-primary">{row.q1Achv}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 12: AGENT MIS DETAILS TABLE (Image 4) */}
          {/* ========================================================================= */}
          {activeTab === 'details' && (
            <div className="overflow-x-auto w-full max-w-full custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead>
                  <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                    <th className="py-3 px-4 text-center w-16">SR.NO.</th>
                    <th className="py-3 px-4">TRANS DATE</th>
                    <th className="py-3 px-4">RISK DATE</th>
                    <th className="py-3 px-6">CUSTOMER NAME</th>
                    <th className="py-3 px-6">POLICY NO</th>
                    <th className="py-3 px-4">VEHICLE NO</th>
                    <th className="py-3 px-4 text-right">NET PREMIUM (₹)</th>
                    <th className="py-3 px-4 text-right">COMMISSION (₹)</th>
                    <th className="py-3 px-4 text-right">TDS (₹)</th>
                    <th className="py-3 px-4 text-right">NET PAYABLE (₹)</th>
                    <th className="py-3 px-4 text-center">PAYMENT STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border text-[13px]">
                  <tr className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white whitespace-nowrap">
                    <td className="py-2.5 px-4 text-center font-medium text-slate-500">1</td>
                    <td className="py-2.5 px-4 font-mono text-slate-700">06/10/2026</td>
                    <td className="py-2.5 px-4 font-mono text-slate-700">01/10/2026</td>
                    <td className="py-2.5 px-6 font-bold text-brand-navy">Ramesh Patel</td>
                    <td className="py-2.5 px-6 font-mono text-brand-primary font-bold">2014400302267902</td>
                    <td className="py-2.5 px-4 font-mono text-slate-800">MH12PA1020</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-brand-navy">₹17,000</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-600">₹1,250</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">₹62.50</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">₹1,187.50</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-emerald-100 text-emerald-800">PAID</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white whitespace-nowrap">
                    <td className="py-2.5 px-4 text-center font-medium text-slate-500">2</td>
                    <td className="py-2.5 px-4 font-mono text-slate-700">06/10/2026</td>
                    <td className="py-2.5 px-4 font-mono text-slate-700">04/10/2026</td>
                    <td className="py-2.5 px-6 font-bold text-brand-navy">Sunita Sharma</td>
                    <td className="py-2.5 px-6 font-mono text-brand-primary font-bold">VGC1425171000101</td>
                    <td className="py-2.5 px-4 font-mono text-slate-800">MH14DE8833</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-brand-navy">₹32,500</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-600">₹2,800</td>
                    <td className="py-2.5 px-4 text-right font-mono text-slate-600">₹140.00</td>
                    <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700">₹2,660.00</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-amber-100 text-amber-800">PENDING</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* FORM MODAL POPUP */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>» {getTabTitle(activeTab)} Form Modal</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer shrink-0 border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Saved successfully!');
                setShowModal(false);
              }}
              className="p-6 space-y-4 overflow-y-auto custom-scrollbar text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="">--Select Month--</option>
                    {monthsList.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    placeholder="yyyy"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="">--Select Branch--</option>
                    {branchesList.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Agent</label>
                  <select
                    value={selectedAgent}
                    onChange={(e) => setSelectedAgent(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white"
                  >
                    <option value="">--Select Agent--</option>
                    {agentsList.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-[8px] text-[14px] shadow-sm transition-all cursor-pointer border-none"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MisReports;
