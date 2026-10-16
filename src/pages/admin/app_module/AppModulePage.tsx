import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import {
  Send, MessageSquare, FileText, CheckCircle2, AlertCircle, Search,
  Upload, Download, Filter, RefreshCw, Smartphone, Eye, Calendar,
  HelpCircle, Lock, Image, CreditCard, Layers, FileSpreadsheet, Plus, X,
  Save, Trash2, Sparkles, Zap, Award
} from 'lucide-react';

export type AppSubTab =
  | 'sendSms'
  | 'appEndorsement'
  | 'appEndorsementRep'
  | 'circular'
  | 'sendMessage'
  | 'help'
  | 'closeEndorsement'
  | 'appLockDateRep'
  | 'runupUploadImg'
  | 'paymentMode'
  | 'gridForApp'
  | 'quotationReport';

interface TabItem {
  id: AppSubTab;
  label: string;
}

const appTabs: TabItem[] = [
  { id: 'sendSms', label: 'Send Sms' },
  { id: 'appEndorsement', label: 'App Endorsement' },
  { id: 'appEndorsementRep', label: 'App Endorsement Rep' },
  { id: 'circular', label: 'Circular' },
  { id: 'sendMessage', label: 'Send Message' },
  { id: 'help', label: 'Help' },
  { id: 'closeEndorsement', label: 'Close Endorsement' },
  { id: 'appLockDateRep', label: 'App LockDate Report' },
  { id: 'runupUploadImg', label: 'Runup Upload Img' },
  { id: 'paymentMode', label: 'Payment Mode' },
  { id: 'gridForApp', label: 'Grid For App' },
  { id: 'quotationReport', label: 'Quotation Report' },
];

const AppModulePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as AppSubTab) || 'sendSms';
  const [activeTab, setActiveTab] = useState<AppSubTab>(
    appTabs.some(t => t.id === initialTab) ? initialTab : 'sendSms'
  );

  const handleTabChange = (tabId: AppSubTab) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Tab 1: Send SMS States
  const [smsRecipients, setSmsRecipients] = useState('');
  const [smsMessage, setSmsMessage] = useState('');
  const [smsHistory, setSmsHistory] = useState([
    { id: 1, recipient: '9823045678, 9811234567', template: 'Direct SMS', date: '2026-10-12 11:30 AM', status: 'Delivered', cost: 'â‚¹0.24' },
    { id: 2, recipient: '9920192831', template: 'Direct SMS', date: '2026-10-11 04:15 PM', status: 'Delivered', cost: 'â‚¹0.12' },
    { id: 3, recipient: '+91 98230 45678', template: 'Policy OTP', date: '2026-10-10 09:20 AM', status: 'Delivered', cost: 'â‚¹0.10' },
  ]);

  const handleSendSms = (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsRecipients.trim() || !smsMessage.trim()) return;
    const recipientCount = smsRecipients.split(/[\n,]+/).filter(Boolean).length;
    const newEntry = {
      id: Date.now(),
      recipient: smsRecipients.trim(),
      template: 'Direct SMS',
      date: 'Just now',
      status: 'Delivered',
      cost: `â‚¹${(Math.max(1, recipientCount) * 0.12).toFixed(2)}`,
    };
    setSmsHistory([newEntry, ...smsHistory]);
    showToast('SMS dispatched successfully!');
    setSmsRecipients('');
    setSmsMessage('');
  };

  // Tab 2: App Endorsement Form
  const [endorsementType, setEndorsementType] = useState('');
  const [endorsementUserRole, setEndorsementUserRole] = useState('');
  const [endorsementAgentName, setEndorsementAgentName] = useState('');
  const [endorsementSalesExec, setEndorsementSalesExec] = useState('');
  const [endorsementDocName, setEndorsementDocName] = useState('');
  const [endorsementDocFile, setEndorsementDocFile] = useState<File | null>(null);
  const [uploadedDocuments, setUploadedDocuments] = useState<Array<{ name: string; fileName: string }>>([]);

  const handleUploadDocument = () => {
    if (!endorsementDocName.trim()) {
      showToast('Please enter Document Name before uploading');
      return;
    }
    const fileName = endorsementDocFile ? endorsementDocFile.name : 'Document.pdf';
    setUploadedDocuments([...uploadedDocuments, { name: endorsementDocName.trim(), fileName }]);
    showToast(`Document "${endorsementDocName.trim()}" attached successfully!`);
    setEndorsementDocName('');
    setEndorsementDocFile(null);
  };

  const handleSaveEndorsement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!endorsementType) {
      showToast('Please select Endorsement Type');
      return;
    }
    if (!endorsementUserRole) {
      showToast('Please select User Role');
      return;
    }
    if (!endorsementAgentName) {
      showToast('Please select Agent Name');
      return;
    }

    const newEntry = {
      id: Date.now(),
      type: endorsementType,
      agentName: endorsementAgentName,
      empName: endorsementSalesExec || 'SYSTEM ADMIN',
      transferorName: endorsementDocName || 'NA',
      transferDate: '13/10/2026 00:00:00',
      inspection: 'NO',
      wrongName: 'NA',
      correctName: 'NA',
      wrongEngineNo: 'NA',
      correctEngineNo: 'NA',
      wrongChaiseNo: 'NA',
      correctChaiseNo: 'NA',
      wrongAddress: 'NA',
      correctAddress: 'NA',
      wrongMake: 'NA',
      correctMake: 'NA',
      wrongModule: 'NA',
      correctModule: 'NA',
      other: 'NA',
      images: uploadedDocuments.map(d => d.fileName),
    };
    setEndorsementsList([newEntry, ...endorsementsList]);
    showToast('Endorsement request submitted successfully!');

    setEndorsementType('');
    setEndorsementUserRole('');
    setEndorsementAgentName('');
    setEndorsementSalesExec('');
    setEndorsementDocName('');
    setEndorsementDocFile(null);
    setUploadedDocuments([]);
  };

  // Tab 3: Endorsement Report Data
  const [repFromDate, setRepFromDate] = useState('2026-10-13');
  const [repToDate, setRepToDate] = useState('2026-10-13');
  const [endorsementReportSearch, setEndorsementReportSearch] = useState('');
  const [selectedImageRecord, setSelectedImageRecord] = useState<any | null>(null);
  const [endorsementsList, setEndorsementsList] = useState([
    {
      id: 1,
      type: 'TRANSFER ENDORSEMENT',
      agentName: 'RAM YASHVANT GORE',
      empName: 'HEMANT ARUN PATIL',
      transferorName: 'SAMADHAN PANDIT PAWAR',
      transferDate: '13/10/2026 00:00:00',
      inspection: 'YES',
      wrongName: 'NA',
      correctName: 'NA',
      wrongEngineNo: 'NA',
      correctEngineNo: 'NA',
      wrongChaiseNo: 'NA',
      correctChaiseNo: 'NA',
      wrongAddress: 'NA',
      correctAddress: 'NA',
      wrongMake: 'NA',
      correctMake: 'NA',
      wrongModule: 'NA',
      correctModule: 'NA',
      other: 'NA',
      images: ['RC_Book_Copy.jpg', 'Inspection_Photo_01.jpg', 'Inspection_Photo_02.jpg', 'Transfer_Form.pdf'],
    },
    {
      id: 2,
      type: 'TRANSFER ENDORSEMENT',
      agentName: 'VISHAL SURESH PHALKE',
      empName: 'RAJ DATTATRAY SATBHAI',
      transferorName: 'AGREJA KOMA PAWARA',
      transferDate: '13/10/2026 00:00:00',
      inspection: 'NO',
      wrongName: 'NA',
      correctName: 'NA',
      wrongEngineNo: 'NA',
      correctEngineNo: 'NA',
      wrongChaiseNo: 'NA',
      correctChaiseNo: 'NA',
      wrongAddress: 'NA',
      correctAddress: 'NA',
      wrongMake: 'NA',
      correctMake: 'NA',
      wrongModule: 'NA',
      correctModule: 'NA',
      other: 'NA',
      images: ['RC_Copy.jpg', 'Transferor_Aadhaar.pdf'],
    },
    {
      id: 3,
      type: 'TRANSFER ENDORSEMENT',
      agentName: 'JAHID MOHAMAD HUSEN',
      empName: 'SHEKHAR RAJENDRA KUMBHAR',
      transferorName: 'BALAJI VITTHAL TARODKAR',
      transferDate: '13/10/2026 00:00:00',
      inspection: 'NO',
      wrongName: 'NA',
      correctName: 'NA',
      wrongEngineNo: 'NA',
      correctEngineNo: 'NA',
      wrongChaiseNo: 'NA',
      correctChaiseNo: 'NA',
      wrongAddress: 'NA',
      correctAddress: 'NA',
      wrongMake: 'NA',
      correctMake: 'NA',
      wrongModule: 'NA',
      correctModule: 'NA',
      other: 'NA',
      images: ['Signed_Consent.jpg', 'Policy_Schedule.pdf'],
    },
    {
      id: 4,
      type: 'TRANSFER ENDORSEMENT',
      agentName: 'RAIS RASHID SHAIKH',
      empName: 'RUTUJA NITIN MANE',
      transferorName: 'ABHIJIT MAHADEV BHOSALE',
      transferDate: '13/10/2026 00:00:00',
      inspection: 'NO',
      wrongName: 'NA',
      correctName: 'NA',
      wrongEngineNo: 'NA',
      correctEngineNo: 'NA',
      wrongChaiseNo: 'NA',
      correctChaiseNo: 'NA',
      wrongAddress: 'NA',
      correctAddress: 'NA',
      wrongMake: 'NA',
      correctMake: 'NA',
      wrongModule: 'NA',
      correctModule: 'NA',
      other: 'NA',
      images: ['RC_Smart_Card.jpg'],
    },
    {
      id: 5,
      type: 'NIL ENDORSEMENT',
      agentName: 'SEEMA WAGHMARE',
      empName: 'SNEHAL SUNIL AGAWANE',
      transferorName: 'NA',
      transferDate: '13/10/2026 00:00:00',
      inspection: 'NA',
      wrongName: 'NA',
      correctName: 'NA',
      wrongEngineNo: 'NA',
      correctEngineNo: 'NA',
      wrongChaiseNo: 'NA',
      correctChaiseNo: 'NA',
      wrongAddress: 'NA',
      correctAddress: 'NA',
      wrongMake: 'NA',
      correctMake: 'NA',
      wrongModule: 'NA',
      correctModule: 'NA',
      other: 'NA',
      images: ['Nil_Endorsement_Form.pdf'],
    },
  ]);

  // Tab 4: Circular Form & List
  const [circularDate, setCircularDate] = useState('13/10/2026');
  const [circularSubject, setCircularSubject] = useState('');
  const [circularPdfFile, setCircularPdfFile] = useState<File | null>(null);
  const [circularPdfFileName, setCircularPdfFileName] = useState('');
  const [circularSearch, setCircularSearch] = useState('');
  const [selectedCircularView, setSelectedCircularView] = useState<{
    id: number;
    date: string;
    subject: string;
    pdfPath: string;
  } | null>(null);

  const [circularList, setCircularList] = useState([
    {
      id: 1,
      date: '24/11/2018 00:00:00',
      subject: 'COMMISSION INCREASE',
      pdfPath: 'PRODUCTINFORMATION.PDF',
    },
    {
      id: 2,
      date: '24/11/2018 00:00:00',
      subject: 'NEW COMMISSION',
      pdfPath: 'PRODUCTINFORMATION.PDF',
    },
    {
      id: 3,
      date: '24/11/2018 00:00:00',
      subject: 'IRDA NEW RULE',
      pdfPath: 'PRODUCTINFORMATION.PDF',
    },
    {
      id: 4,
      date: '10/10/2026 00:00:00',
      subject: 'REVISED COMMERCIAL MOTOR GRID Q3',
      pdfPath: 'COMMERCIAL_GRID_Q3.PDF',
    },
    {
      id: 5,
      date: '05/10/2026 00:00:00',
      subject: 'DIWALI MOTOR BUMPER INCENTIVE SCHEME',
      pdfPath: 'DIWALI_INCENTIVE_SCHEME.PDF',
    },
  ]);

  const handleSaveCircular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!circularSubject.trim()) {
      showToast('Please enter a circular Subject', 'error');
      return;
    }
    const fileName = circularPdfFileName || (circularPdfFile ? circularPdfFile.name : 'CIRCULAR_DOC.PDF');
    const newCircular = {
      id: Date.now(),
      date: `${circularDate || '13/10/2026'} 00:00:00`,
      subject: circularSubject.toUpperCase(),
      pdfPath: fileName.toUpperCase(),
    };
    setCircularList([newCircular, ...circularList]);
    showToast('Circular published successfully!');
    setCircularSubject('');
    setCircularPdfFile(null);
    setCircularPdfFileName('');
  };

  // Tab 5: Push Messages (Send Message)
  const [msgTargetType, setMsgTargetType] = useState<'Agent' | 'Sales Executive' | 'ALL'>('Agent');
  const [msgSearchAgent, setMsgSearchAgent] = useState('');
  const [msgSearchEmp, setMsgSearchEmp] = useState('');
  const [msgContent, setMsgContent] = useState('');
  const [msgHistorySearch, setMsgHistorySearch] = useState('');
  const [sentMessageHistory, setSentMessageHistory] = useState([
    {
      id: 1,
      targetType: 'ALL',
      targetName: 'All Registered App Users',
      message: 'Notice: Server maintenance scheduled on Sunday 12:00 AM to 02:00 AM.',
      sentAt: '13/10/2026 14:30:00',
      status: 'Delivered',
      recipientCount: 3420,
    },
    {
      id: 2,
      targetType: 'Agent',
      targetName: 'RAM YASHVANT GORE (AG-102)',
      message: 'Endorsement inspection approved. Please download revised policy copy.',
      sentAt: '13/10/2026 11:15:00',
      status: 'Delivered',
      recipientCount: 1,
    },
    {
      id: 3,
      targetType: 'Sales Executive',
      targetName: 'HEMANT ARUN PATIL (EMP-504)',
      message: 'Quarterly target achievement review meeting at 4:30 PM today.',
      sentAt: '12/10/2026 16:45:00',
      status: 'Delivered',
      recipientCount: 1,
    },
    {
      id: 4,
      targetType: 'ALL',
      targetName: 'All Sales Executives & Agents',
      message: 'Special Diwali bumper incentive grid is now live under Commission Grid tab.',
      sentAt: '10/10/2026 09:00:00',
      status: 'Delivered',
      recipientCount: 2890,
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgContent.trim()) {
      showToast('Please type a message before sending', 'error');
      return;
    }

    let targetDescription = 'All Users';
    let count = 3500;
    if (msgTargetType === 'Agent') {
      targetDescription = msgSearchAgent ? `Agent: ${msgSearchAgent}` : 'All Agents';
      count = msgSearchAgent ? 1 : 1420;
    } else if (msgTargetType === 'Sales Executive') {
      targetDescription = msgSearchEmp ? `Executive: ${msgSearchEmp}` : 'All Executives';
      count = msgSearchEmp ? 1 : 180;
    }

    const newRecord = {
      id: Date.now(),
      targetType: msgTargetType,
      targetName: targetDescription,
      message: msgContent,
      sentAt: '13/10/2026 16:05:00',
      status: 'Delivered',
      recipientCount: count,
    };

    setSentMessageHistory([newRecord, ...sentMessageHistory]);
    showToast(`Message dispatched to ${targetDescription}!`);
    setMsgContent('');
  };

  // Tab 6: Help
  const [helpFromDate, setHelpFromDate] = useState('13/10/2026');
  const [helpToDate, setHelpToDate] = useState('13/10/2026');
  const [helpSearch, setHelpSearch] = useState('');
  const [helpRecords] = useState([
    { id: 1, helpDate: '18/12/2019 00:00:00', salesexName: 'ROHITSHANKARPANCHMUKH', mobileNo: '9890053330', helpName: 'POLICY' },
    { id: 2, helpDate: '11/01/2020 00:00:00', salesexName: 'ROHITSHANKARPANCHMUKH', mobileNo: '9890053330', helpName: 'COMMISSION' },
    { id: 3, helpDate: '20/01/2020 00:00:00', salesexName: 'ANILLATIFSHINDE', mobileNo: '9225709412', helpName: 'COMMISSION' },
    { id: 4, helpDate: '23/01/2020 00:00:00', salesexName: 'ANILLATIFSHINDE', mobileNo: '9225709412', helpName: 'POLICY' },
    { id: 5, helpDate: '01/02/2020 00:00:00', salesexName: 'RAHULCHANDRAKANTKAMBLE', mobileNo: '9766388795', helpName: 'POLICY' },
    { id: 6, helpDate: '06/02/2020 00:00:00', salesexName: 'ARVINDDNYANESHWARGAWADE', mobileNo: '7745016111', helpName: 'COMMISSION' },
    { id: 7, helpDate: '08/02/2020 00:00:00', salesexName: 'ROHITSHANKARPANCHMUKH', mobileNo: '9890053330', helpName: 'COMMISSION' },
    { id: 8, helpDate: '07/04/2020 00:00:00', salesexName: 'RAHULCHANDRAKANTKAMBLE', mobileNo: '9766388795', helpName: 'SALES_SUPPORT' },
    { id: 9, helpDate: '02/07/2020 00:00:00', salesexName: 'ANILLATIFSHINDE', mobileNo: '9225709412', helpName: 'COMMISSION' },
    { id: 10, helpDate: '15/08/2026 00:00:00', salesexName: 'PRAVINRAMESHSHINDE', mobileNo: '9823045612', helpName: 'POLICY' },
    { id: 11, helpDate: '22/09/2026 00:00:00', salesexName: 'SUMITKAILASNAWATE', mobileNo: '9876534210', helpName: 'SALES_SUPPORT' },
    { id: 12, helpDate: '10/10/2026 00:00:00', salesexName: 'HEMANTARUNPATIL', mobileNo: '9765432109', helpName: 'COMMISSION' },
  ]);

  // Tab 7: Close Endorsement
  const [closeEndorseId, setCloseEndorseId] = useState('');
  const [closeEndorseReason, setCloseEndorseReason] = useState('POLICY EXPIRED / NOT REQUIRED');

  // Tab 8: App LockDate / Remaining Payment Due Report
  const [lockDateSearchAgent, setLockDateSearchAgent] = useState('');
  const [lockDateSearchCustomer, setLockDateSearchCustomer] = useState('');
  const [lockDateSearchVehicle, setLockDateSearchVehicle] = useState('');
  const [paymentDueRecords] = useState([
    { id: 77143, agentName: '-', mobileNo: '7796611972', transDate: '30/09/2022 13:18:00', customerName: 'MR.SANJAY KHANDU ZAKANE', registrationNo: 'MH23BC2716', cashPaidAmt: 6214, premium: 10045, cashPaidAmt2: 6214, remainingAmt: 6214 },
    { id: 77145, agentName: '-', mobileNo: '7796611972', transDate: '30/09/2022 13:53:52', customerName: 'MR.AMJAD KHA PATHAN', registrationNo: 'MH20CR0050', cashPaidAmt: 5341, premium: 8634, cashPaidAmt2: 5341, remainingAmt: 5341 },
    { id: 77148, agentName: '-', mobileNo: '7796611972', transDate: '30/09/2022 13:56:15', customerName: 'MR.ANKUSH BABURAO BHUSE', registrationNo: 'MH23AS8540', cashPaidAmt: 6034, premium: 9753, cashPaidAmt2: 6034, remainingAmt: 6034 },
    { id: 77150, agentName: '-', mobileNo: '7796611972', transDate: '30/09/2022 15:41:13', customerName: 'MR.GOVARDHAN HARIBHAU SHINDE', registrationNo: 'MH20EY2765', cashPaidAmt: 5140, premium: 8410, cashPaidAmt2: 5140, remainingAmt: 5140 },
    { id: 77152, agentName: '-', mobileNo: '7796611972', transDate: '30/09/2022 15:34:08', customerName: 'MR.CHANGDEO TRIMBAK ZOJE', registrationNo: 'MH20EE3284', cashPaidAmt: 6214, premium: 10045, cashPaidAmt2: 6214, remainingAmt: 6214 },
    { id: 77158, agentName: '-', mobileNo: '7796611972', transDate: '30/09/2022 15:48:00', customerName: 'MR.MARUTI JAGANATH SHELKE', registrationNo: 'MH21BF1688', cashPaidAmt: 6095, premium: 9852, cashPaidAmt2: 6095, remainingAmt: 6095 },
    { id: 77168, agentName: '-', mobileNo: '7796611972', transDate: '30/09/2022 16:59:58', customerName: 'MR.YOGESH ASHOK TALEKAR', registrationNo: 'MH17V0997', cashPaidAmt: 5807, premium: 9077, cashPaidAmt2: 5807, remainingAmt: 5807 },
    { id: 77972, agentName: 'NILESH SRICHAND KATARIA', mobileNo: '7447716111', transDate: '06/10/2022 12:34:48', customerName: 'ARVIND YASHWANT SURVE', registrationNo: 'MH08E7773', cashPaidAmt: 3868, premium: 7246, cashPaidAmt2: 3868, remainingAmt: 3868 },
    { id: 78101, agentName: 'NILESH SRICHAND KATARIA', mobileNo: '7447716111', transDate: '06/10/2022 18:28:09', customerName: 'DIPAK BAJIRAO BANDGAR', registrationNo: 'MH09FV9596', cashPaidAmt: 36037, premium: 43364, cashPaidAmt2: 36037, remainingAmt: 36037 },
    { id: 78268, agentName: 'NILESH SRICHAND KATARIA', mobileNo: '7447716111', transDate: '06/10/2022 16:04:44', customerName: 'SALIM BABALAL SHAIKH', registrationNo: 'MH07F1876', cashPaidAmt: 3830, premium: 7175, cashPaidAmt2: 3830, remainingAmt: 3830 },
    { id: 78412, agentName: 'RAMKRISHNA VITHAL KALE', mobileNo: '9823401123', transDate: '07/10/2022 10:15:00', customerName: 'SURESH PANDURANG MORE', registrationNo: 'MH15AB2341', cashPaidAmt: 4500, premium: 8200, cashPaidAmt2: 4500, remainingAmt: 4500 },
    { id: 78501, agentName: 'RAMKRISHNA VITHAL KALE', mobileNo: '9823401123', transDate: '08/10/2022 09:45:22', customerName: 'PRIYA SURESH SAWANT', registrationNo: 'MH16CD7890', cashPaidAmt: 5100, premium: 9100, cashPaidAmt2: 5100, remainingAmt: 5100 },
  ]);

  // Tab 9: Runup Upload Image
  const [runupTitle, setRunupTitle] = useState('');
  const [selectedRunupFile, setSelectedRunupFile] = useState<File | null>(null);
  const [selectedRunupFileName, setSelectedRunupFileName] = useState<string>('');
  const [runupBanners, setRunupBanners] = useState([
    {
      id: 1,
      title: 'Diwali Festive Offer Banner',
      target: 'App Home Slider',
      size: '1200x500',
      active: true,
      tag: 'Festive Offer',
      badgeColor: 'blue',
      headline: 'Diwali Mega Savings',
      subline: 'Flat 85% Off on OD Premium',
      footerLeft: 'Valid till 31 Oct',
      footerRight: 'CODE: DIWALI26',
      icon: 'sparkles',
    },
    {
      id: 2,
      title: 'Two-Wheeler Instant Policy Promo',
      target: 'Motor Section',
      size: '800x400',
      active: true,
      tag: 'Instant Policy',
      badgeColor: 'blue',
      headline: 'Two-Wheeler Cover',
      subline: 'Quick Renewal in 2 Mins',
      footerLeft: 'Starting ₹499/yr',
      footerRight: 'ZERO PAPER',
      icon: 'zap',
    },
    {
      id: 3,
      title: 'POSP Onboarding Referral Bonus',
      target: 'Agent Dashboard',
      size: '800x400',
      active: false,
      tag: 'Referral Bonus',
      badgeColor: 'blue',
      headline: 'POSP Referral Scheme',
      subline: 'Earn ₹2,000 per Active POSP',
      footerLeft: 'Unlimited Payout',
      footerRight: 'CLAIM NOW',
      icon: 'award',
    },
  ]);
  const [runupImageType, setRunupImageType] = useState<'agent' | 'executive'>('agent');

  // Tab 10: Payment Modes
  const [paymentTargetType, setPaymentTargetType] = useState<'agent' | 'executive' | 'franchise'>('agent');
  const [selectedPaymentPerson, setSelectedPaymentPerson] = useState('');
  const [paymentSettings, setPaymentSettings] = useState({
    cash: 'ON',
    cheque: 'ON',
    neft: 'ON',
    rtgs: 'ON',
    dd: 'ON',
    onlineToRa: 'ON',
    ewallet: 'ON',
    onlineToIc: 'ON',
    emi: 'ON',
  });

  // Tab 11: Grid For App
  const [gridAppText, setGridAppText] = useState('');
  const [gridAppFromDate, setGridAppFromDate] = useState('2026-10-13');
  const [gridAppFile, setGridAppFile] = useState<string | null>(null);
  const [appGridRecords, setAppGridRecords] = useState([
    {
      id: 1,
      text: 'Motor Comprehensive Commission Grid Q3',
      fromDate: '13/10/2026',
      fileName: 'motor_grid_q3.pdf',
    },
    {
      id: 2,
      text: 'Commercial Goods Vehicle Payout Grid 2026',
      fromDate: '10/10/2026',
      fileName: 'cgv_payout_2026.pdf',
    },
  ]);

  // Tab 12: Quotation Report
  const [quoteStatusFilter, setQuoteStatusFilter] = useState<'accepted' | 'cancel'>('accepted');
  const [quoteFromDate, setQuoteFromDate] = useState('2026-10-13');
  const [quoteToDate, setQuoteToDate] = useState('2026-10-13');
  const [quotationSearch, setQuotationSearch] = useState('');
  const [quotationsList, setQuotationsList] = useState([
    {
      id: 'QT-2026-501',
      customer: 'RAMESHWAR SURESH PAWAR',
      vehicle: 'MH-12-AB-1234 (Swift VXI)',
      premium: 14850,
      agent: 'RAMKRISHNA VITHAL KALE (AG-1029)',
      date: '13/10/2026',
      status: 'accepted',
    },
    {
      id: 'QT-2026-502',
      customer: 'SURESH PANDURANG MORE',
      vehicle: 'MH-14-CD-5678 (Activa 6G)',
      premium: 2340,
      agent: 'SNEHA PATIL (AG-1062)',
      date: '13/10/2026',
      status: 'accepted',
    },
    {
      id: 'QT-2026-503',
      customer: 'SUNITA VIKAS GAIKWAD',
      vehicle: 'MH-01-EF-9012 (Creta SX)',
      premium: 22100,
      agent: 'AMIT VERMA (AG-1077)',
      date: '12/10/2026',
      status: 'accepted',
    },
    {
      id: 'QT-2026-504',
      customer: 'DEEPAK ANIL MORE',
      vehicle: 'MH-04-GH-3456 (Eicher 1110)',
      premium: 34500,
      agent: 'KAVITA JOSHI (AG-1089)',
      date: '11/10/2026',
      status: 'cancel',
    },
    {
      id: 'QT-2026-505',
      customer: 'GANESH SHINDE',
      vehicle: 'MH-15-JK-4412 (i20 Sportz)',
      premium: 18200,
      agent: 'RAHUL SHARMA (AG-1050)',
      date: '10/10/2026',
      status: 'cancel',
    },
  ]);

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5 pb-10">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-brand-navy text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-brand-primary animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <PageHeader
        title="App Module"
        description="Mobile application control center, broadcast notifications, circulars, app endorsements, lock dates and reports"
      />

      {/* 2-Row Full-Width Sub-Tabs Navigation â€” Exact Policy Master & Dashboard UI */}
      <div className="bg-white rounded-2xl border border-brand-border p-3 space-y-2.5 shadow-sm w-full max-w-full">
        {/* Row 1: First 6 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full border-b border-slate-200 pb-2.5">
          {appTabs.slice(0, 6).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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

        {/* Row 2: Remaining 6 Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
          {appTabs.slice(6).map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
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

      {/* Tab Panels */}
      <div className="w-full">
        {/* Tab 1: Send SMS */}
        {activeTab === 'sendSms' && (
          <div className="flex flex-col gap-6 w-full">
            {/* Send SMS Card */}
            <div className="bg-white rounded-[12px] border border-brand-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
              <form onSubmit={handleSendSms} className="space-y-5">
                {/* Recipients */}
                <div>
                  <label htmlFor="sms-recipients" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Recipients (comma or newline separated)
                  </label>
                  <textarea
                    id="sms-recipients"
                    value={smsRecipients}
                    onChange={(e) => setSmsRecipients(e.target.value)}
                    rows={2}
                    placeholder="Enter phone numbers e.g. 9823045678, 9811234567"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="sms-message" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="sms-message"
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    rows={5}
                    placeholder="Type SMS message..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize"
                    required
                  />
                </div>

                {/* Send Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer border-none flex items-center gap-2"
                  >
                    <Send size={15} />
                    <span>Send SMS</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Logs Table Card (VehicleMaster Unified Layout) */}
            <div className="w-full bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
              <div className="p-4 bg-slate-50 border-b border-brand-border flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-brand-navy">Recent SMS Transmissions</h3>
                  <p className="text-xs text-slate-500">Live delivery records and DLT verification audit</p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('SMS logs refreshed')}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  title="Refresh"
                >
                  <RefreshCw size={14} />
                  <span>Refresh</span>
                </button>
              </div>

              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4">Recipient(s)</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Est. Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[13px] text-slate-800">
                    {smsHistory.map((s) => (
                      <tr key={s.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                        <td className="py-2.5 px-4 font-semibold text-brand-navy max-w-xs truncate">{s.recipient}</td>
                        <td className="py-2.5 px-4 text-slate-600">{s.template}</td>
                        <td className="py-2.5 px-4 text-slate-500 font-mono text-xs">{s.date}</td>
                        <td className="py-2.5 px-4">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={12} /> {s.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono font-bold text-slate-800">{s.cost.replace('â‚¹', '₹')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: App Endorsement Form */}
        {activeTab === 'appEndorsement' && (
          <form onSubmit={handleSaveEndorsement} className="w-full space-y-6">
            {/* Card 1: Endorsement Parameters */}
            <div className="bg-white rounded-[12px] border border-brand-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="mb-5 pb-3 border-b border-brand-border">
                <h3 className="text-sm font-bold text-brand-navy">Endorsement Parameters</h3>
                <p className="text-xs text-slate-500">Configure endorsement type, party role, and assigned agent</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Endorsement Type */}
                  <div>
                    <label htmlFor="endorsement-type" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Endorsement Type
                    </label>
                    <select
                      id="endorsement-type"
                      value={endorsementType}
                      onChange={(e) => setEndorsementType(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer"
                    >
                      <option value="">--Select Endorsement Type--</option>
                      <option value="TRANSFER ENDORSEMENT">TRANSFER ENDORSEMENT</option>
                      <option value="NIL ENDORSEMENT">NIL ENDORSEMENT</option>
                    </select>
                  </div>

                  {/* User Role */}
                  <div>
                    <label htmlFor="endorsement-user-role" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      User Role
                    </label>
                    <select
                      id="endorsement-user-role"
                      value={endorsementUserRole}
                      onChange={(e) => setEndorsementUserRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer"
                    >
                      <option value="">--Select User Role--</option>
                      <option value="AGENT">AGENT</option>
                      <option value="FRANCHISE">FRANCHISE</option>
                      <option value="FRANCHISE AGENT">FRANCHISE AGENT</option>
                      <option value="RELATIONSHIP MANAGER">RELATIONSHIP MANAGER</option>
                    </select>
                  </div>

                  {/* Agent Name */}
                  <div>
                    <label htmlFor="endorsement-agent-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Agent Name
                    </label>
                    <select
                      id="endorsement-agent-name"
                      value={endorsementAgentName}
                      onChange={(e) => setEndorsementAgentName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer"
                    >
                      <option value="">--Select Agent Name--</option>
                      <option value="AMOL LOKHANDE">AMOL LOKHANDE</option>
                      <option value="AMRIT DEDHIA">AMRIT DEDHIA</option>
                      <option value="ANANDKUMAR ARUN HADMODE">ANANDKUMAR ARUN HADMODE</option>
                      <option value="ATISH SHRINIVAS HAREL">ATISH SHRINIVAS HAREL</option>
                      <option value="DHULAPPA HARI KHARAT">DHULAPPA HARI KHARAT</option>
                      <option value="FARHAN PANJA">FARHAN PANJA</option>
                      <option value="HANUMANT NIVRUTTI JAGTAP">HANUMANT NIVRUTTI JAGTAP</option>
                      <option value="KARISHMA IRFAN MUJAWAR">KARISHMA IRFAN MUJAWAR</option>
                      <option value="LINSA PETER">LINSA PETER</option>
                      <option value="LLIYAS MEHBUB SHAIKH">LLIYAS MEHBUB SHAIKH</option>
                      <option value="MOHAMMAD SADIK SHAMI">MOHAMMAD SADIK SHAMI</option>
                      <option value="NIVRUTTI PANDHIRINATH PATIL">NIVRUTTI PANDHIRINATH PATIL</option>
                      <option value="PANKAJ SINGH">PANKAJ SINGH</option>
                      <option value="PRIYA SACHIN BANKAR">PRIYA SACHIN BANKAR</option>
                      <option value="RAHUL NAVANATH BHOSALE">RAHUL NAVANATH BHOSALE</option>
                      <option value="RAJAN NAGORAO SHINDE">RAJAN NAGORAO SHINDE</option>
                      <option value="REVATI RAJKUMAR BENDRE">REVATI RAJKUMAR BENDRE</option>
                      <option value="SANDIP BALKRUSHNA ABHANG">SANDIP BALKRUSHNA ABHANG</option>
                      <option value="SHRINIVAS VIDYADHAR MORE">SHRINIVAS VIDYADHAR MORE</option>
                    </select>
                  </div>
                </div>

                {/* Sales Executive (Row 2) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="endorsement-sales-exec" className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Sales Executive
                    </label>
                    <select
                      id="endorsement-sales-exec"
                      value={endorsementSalesExec}
                      onChange={(e) => setEndorsementSalesExec(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all cursor-pointer"
                    >
                      <option value="">--Select Sales Executive--</option>
                      <option value="MAHESH SHINDE">MAHESH SHINDE</option>
                      <option value="PRAVIN JADHAV">PRAVIN JADHAV</option>
                      <option value="SNEHAL PATIL">SNEHAL PATIL</option>
                      <option value="VIKRAM DESHMUKH">VIKRAM DESHMUKH</option>
                      <option value="ANIKET KULKARNI">ANIKET KULKARNI</option>
                      <option value="SWAPNIL GAWADE">SWAPNIL GAWADE</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Document Details */}
            <div className="bg-white rounded-[12px] border border-brand-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="mb-5 pb-3 border-b border-brand-border">
                <h3 className="text-sm font-bold text-brand-navy">Document Details</h3>
                <p className="text-xs text-slate-500">Attach supporting files and verification certificates</p>
              </div>

              {/* Form Controls */}
              <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
                {/* Document Name */}
                <div className="w-full md:w-72">
                  <label htmlFor="endorsement-doc-name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Document Name
                  </label>
                  <input
                    id="endorsement-doc-name"
                    type="text"
                    placeholder="e.g. RC Copy, Pan Card"
                    value={endorsementDocName}
                    onChange={(e) => setEndorsementDocName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>

                {/* Attach File */}
                <div className="w-full md:w-auto">
                  <label htmlFor="endorsement-doc-file" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Attach File
                  </label>
                  <div className="inline-block border border-slate-300 rounded-lg px-3 py-1.5 bg-white">
                    <input
                      id="endorsement-doc-file"
                      type="file"
                      onChange={(e) => setEndorsementDocFile(e.target.files?.[0] || null)}
                      className="text-xs text-slate-600 file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Upload Button */}
                <div className="pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={handleUploadDocument}
                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer border-none flex items-center gap-1.5"
                  >
                    <Upload size={14} />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              {/* Uploaded Documents List */}
              {uploadedDocuments.length > 0 && (
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 block">
                    Uploaded Documents ({uploadedDocuments.length})
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {uploadedDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700"
                      >
                        <FileText size={14} className="text-brand-primary" />
                        <span className="font-semibold">{doc.name}</span>
                        <span className="text-slate-400">({doc.fileName})</span>
                        <button
                          type="button"
                          onClick={() => setUploadedDocuments(uploadedDocuments.filter((_, i) => i !== idx))}
                          className="text-rose-500 hover:text-rose-700 ml-1 cursor-pointer bg-transparent border-none"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-9 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer border-none flex items-center gap-2"
              >
                <Save size={16} />
                <span>Save Endorsement</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 3: Endorsement Report */}
        {activeTab === 'appEndorsementRep' && (
          <div className="w-full space-y-6">
            {/* Filter Card */}
            <div className="bg-white rounded-[12px] border border-brand-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                {/* From Date */}
                <div className="w-full sm:w-60">
                  <label htmlFor="rep-from-date" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    From Date
                  </label>
                  <input
                    id="rep-from-date"
                    type="date"
                    value={repFromDate}
                    onChange={(e) => setRepFromDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>

                {/* To Date */}
                <div className="w-full sm:w-60">
                  <label htmlFor="rep-to-date" className="block text-xs font-semibold text-slate-700 mb-1.5">
                    To Date
                  </label>
                  <input
                    id="rep-to-date"
                    type="date"
                    value={repToDate}
                    onChange={(e) => setRepToDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>

                {/* Show Button */}
                <div className="pt-2 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => showToast(`Filtered endorsement records for ${repFromDate} to ${repToDate}`)}
                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-xs transition-all cursor-pointer border-none h-[38px] flex items-center justify-center gap-1.5"
                  >
                    <Eye size={15} />
                    <span>Show</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Endorsement Report Table Card (VehicleMaster Unified Layout) */}
            <div className="w-full bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
              <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="relative w-full sm:w-[350px]">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search agent, transferor, type..."
                    value={endorsementReportSearch}
                    onChange={(e) => setEndorsementReportSearch(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                  />
                  {endorsementReportSearch && (
                    <button
                      type="button"
                      onClick={() => setEndorsementReportSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
                    >
                      <X size={15} />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => showToast('Exporting Excel report...')}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-sm font-semibold shadow-xs transition-all cursor-pointer h-[40px] flex items-center justify-center gap-2"
                    title="Export Report"
                  >
                    <Download size={15} />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Data Table with 20 columns */}
              <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                <table className="w-full text-left border-collapse min-w-[1500px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-3.5 text-center w-28">ACTION</th>
                      <th className="py-3 px-3.5">TYPE</th>
                      <th className="py-3 px-3.5">AGENT NAME</th>
                      <th className="py-3 px-3.5">EMP NAME</th>
                      <th className="py-3 px-3.5">TRANSFEROR NAME</th>
                      <th className="py-3 px-3.5">TRANSFER DATE</th>
                      <th className="py-3 px-3 text-center">INSPECTION</th>
                      <th className="py-3 px-3 text-center">WRONG NAME</th>
                      <th className="py-3 px-3 text-center">CORRECT NAME</th>
                      <th className="py-3 px-3 text-center">WRONG ENGINENO</th>
                      <th className="py-3 px-3 text-center">CORRECT ENGINENO</th>
                      <th className="py-3 px-3 text-center">WRONG CHAISENO</th>
                      <th className="py-3 px-3 text-center">CORRECT CHAISENO</th>
                      <th className="py-3 px-3 text-center">WRONG ADDRESS</th>
                      <th className="py-3 px-3 text-center">CORRECT ADDRESS</th>
                      <th className="py-3 px-3 text-center">WRONG MAKE</th>
                      <th className="py-3 px-3 text-center">CORRECT MAKE</th>
                      <th className="py-3 px-3 text-center">WRONG MODULE</th>
                      <th className="py-3 px-3 text-center">CORRECT MODULE</th>
                      <th className="py-3 px-3 text-center">OTHER</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[13px] text-slate-800">
                    {(() => {
                      const filtered = endorsementsList.filter(e =>
                        e.agentName.toLowerCase().includes(endorsementReportSearch.toLowerCase()) ||
                        e.transferorName.toLowerCase().includes(endorsementReportSearch.toLowerCase()) ||
                        e.type.toLowerCase().includes(endorsementReportSearch.toLowerCase())
                      );
                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={20} className="py-16 text-center text-slate-500">
                              <p className="font-semibold text-slate-600 text-sm">No endorsement report records found.</p>
                              <p className="text-xs text-slate-400 mt-1">Try clearing the search query or adjusting dates.</p>
                            </td>
                          </tr>
                        );
                      }
                      return filtered.map((row) => (
                        <tr key={row.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                          <td className="py-2.5 px-3.5 text-center">
                            <button
                              type="button"
                              onClick={() => setSelectedImageRecord(row)}
                              className="font-bold text-brand-primary hover:text-blue-800 text-[11px] uppercase tracking-wider underline cursor-pointer bg-transparent border-none"
                            >
                              VIEW IMAGES
                            </button>
                          </td>
                          <td className="py-2.5 px-3.5 font-semibold text-brand-navy">{row.type}</td>
                          <td className="py-2.5 px-3.5 font-medium text-slate-800">{row.agentName}</td>
                          <td className="py-2.5 px-3.5 text-slate-700">{row.empName}</td>
                          <td className="py-2.5 px-3.5 font-medium text-slate-800">{row.transferorName}</td>
                          <td className="py-2.5 px-3.5 font-mono text-xs text-slate-500">{row.transferDate}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              row.inspection === 'YES' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              row.inspection === 'NO' ? 'bg-slate-100 text-slate-600' :
                              'text-slate-400'
                            }`}>
                              {row.inspection}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-500">{row.wrongName}</td>
                          <td className="py-2.5 px-3 text-center text-slate-700 font-medium">{row.correctName}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-xs text-slate-600">{row.wrongEngineNo}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-xs text-slate-800 font-medium">{row.correctEngineNo}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-xs text-slate-600">{row.wrongChaiseNo}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-xs text-slate-800 font-medium">{row.correctChaiseNo}</td>
                          <td className="py-2.5 px-3 text-center text-slate-500">{row.wrongAddress}</td>
                          <td className="py-2.5 px-3 text-center text-slate-700 font-medium">{row.correctAddress}</td>
                          <td className="py-2.5 px-3 text-center text-slate-500">{row.wrongMake}</td>
                          <td className="py-2.5 px-3 text-center text-slate-700 font-medium">{row.correctMake}</td>
                          <td className="py-2.5 px-3 text-center text-slate-500">{row.wrongModule}</td>
                          <td className="py-2.5 px-3 text-center text-slate-700 font-medium">{row.correctModule}</td>
                          <td className="py-2.5 px-3 text-center text-slate-500">{row.other}</td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal: View Images */}
            {selectedImageRecord && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-brand-navy flex items-center gap-2">
                        <FileText size={18} className="text-brand-primary" />
                        Endorsement Documents & Images
                      </h4>
                      <p className="text-xs text-slate-500">
                        {selectedImageRecord.type} â€¢ {selectedImageRecord.agentName}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedImageRecord(null)}
                      className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">Attached Documents:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedImageRecord.images && selectedImageRecord.images.length > 0 ? (
                        selectedImageRecord.images.map((img: string, idx: number) => (
                          <div
                            key={idx}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between hover:bg-blue-50/50 transition-colors"
                          >
                            <div className="flex items-center gap-2.5 truncate">
                              <Image size={18} className="text-brand-primary shrink-0" />
                              <span className="text-xs font-medium text-slate-800 truncate">{img}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => showToast(`Previewing ${img}`)}
                              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-slate-200 rounded-lg text-brand-primary hover:bg-brand-primary hover:text-white transition-colors cursor-pointer"
                            >
                              Preview
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="sm:col-span-2 text-center py-6 text-xs text-slate-500 bg-slate-50 rounded-xl">
                          No images attached for this record
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setSelectedImageRecord(null)}
                      className="px-5 py-2 bg-brand-primary hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Circular */}
        {activeTab === 'circular' && (
          <div className="w-full flex flex-col lg:flex-row items-start gap-6">
            {/* Left Card: Circular Form */}
            <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0">
              <div className="bg-white rounded-[12px] border border-brand-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
                <div className="mb-5 pb-3 border-b border-brand-border">
                  <h3 className="text-base font-bold text-brand-navy">Circular Form</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Publish new notifications and circulars for mobile app</p>
                </div>

                <form onSubmit={handleSaveCircular} className="space-y-4">
                  {/* Circular Date */}
                  <div>
                    <label htmlFor="circular-date" className="block text-slate-700 text-xs font-semibold mb-1.5 uppercase">
                      Circular Date
                    </label>
                    <input
                      id="circular-date"
                      type="text"
                      value={circularDate}
                      onChange={(e) => setCircularDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="circular-subject" className="block text-slate-700 text-xs font-semibold mb-1.5 uppercase">
                      Subject
                    </label>
                    <input
                      id="circular-subject"
                      type="text"
                      value={circularSubject}
                      onChange={(e) => setCircularSubject(e.target.value)}
                      placeholder="Enter circular subject"
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all"
                      required
                    />
                  </div>

                  {/* Attach PDF */}
                  <div>
                    <label htmlFor="circular-pdf" className="block text-slate-700 text-xs font-semibold mb-1.5 uppercase">
                      Attach PDF
                    </label>
                    <div className="relative w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 focus-within:ring-1 focus-within:ring-brand-primary focus-within:border-brand-primary transition-all">
                      <input
                        id="circular-pdf"
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setCircularPdfFile(file);
                            setCircularPdfFileName(file.name);
                          }
                        }}
                        className="w-full text-xs text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-slate-100 hover:file:bg-slate-200 file:text-slate-700 cursor-pointer"
                      />
                    </div>
                    {circularPdfFileName && (
                      <p className="text-xs text-emerald-600 font-medium mt-1.5 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Selected: {circularPdfFileName}
                      </p>
                    )}
                  </div>

                  {/* Save Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-7 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Card: Circular Table in VehicleMaster Theme */}
            <div className="w-full flex-1 min-w-0">
              <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                {/* Header row with search and actions */}
                <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h3 className="text-base font-bold text-brand-navy">Mobile App Circulars</h3>
                    <p className="text-xs text-slate-500">Official notifications and circulars published to agents & partners</p>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search circulars..."
                        value={circularSearch}
                        onChange={(e) => setCircularSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => showToast('Exporting Circular list to Excel...')}
                      className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:text-brand-primary hover:bg-slate-50 transition-colors cursor-pointer"
                      title="Export Circulars"
                    >
                      <Download size={15} />
                    </button>
                  </div>
                </div>

                {/* Table with Light-Blue Header */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap min-w-[700px]">
                    <thead className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                      <tr>
                        <th className="py-3 px-4 font-semibold text-brand-navy w-52">DATE</th>
                        <th className="py-3 px-4 font-semibold text-brand-navy">SUBJECT</th>
                        <th className="py-3 px-4 font-semibold text-brand-navy">PDF PATH</th>
                        <th className="py-3 px-4 font-semibold text-brand-navy text-center w-24">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-slate-800 bg-white">
                      {(() => {
                        const filtered = circularList.filter(
                          (c) =>
                            c.subject.toLowerCase().includes(circularSearch.toLowerCase()) ||
                            c.pdfPath.toLowerCase().includes(circularSearch.toLowerCase()) ||
                            c.date.toLowerCase().includes(circularSearch.toLowerCase())
                        );

                        if (filtered.length === 0) {
                          return (
                            <tr>
                              <td colSpan={4} className="py-16 text-center text-slate-400 font-medium">
                                No circular records found matching your search.
                              </td>
                            </tr>
                          );
                        }

                        return filtered.map((row) => (
                          <tr
                            key={row.id}
                            className="h-[48px] hover:bg-brand-mainbg transition-colors bg-white"
                          >
                            <td className="py-2.5 px-4 font-mono text-xs text-slate-600">
                              {row.date}
                            </td>
                            <td className="py-2.5 px-4 font-medium text-slate-800">
                              {row.subject}
                            </td>
                            <td className="py-2.5 px-4 font-mono text-xs text-slate-600">
                              {row.pdfPath}
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => setSelectedCircularView(row)}
                                className="font-semibold text-brand-primary hover:text-blue-800 text-xs uppercase tracking-wider hover:underline cursor-pointer"
                              >
                                VIEW
                              </button>
                            </td>
                          </tr>
                        ));
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Modal: View PDF */}
            {selectedCircularView && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-white rounded-[12px] shadow-2xl border border-brand-border max-w-xl w-full p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-brand-border pb-3">
                    <div>
                      <h4 className="text-base font-bold text-brand-navy flex items-center gap-2">
                        <FileText size={18} className="text-brand-primary" />
                        Circular Document Viewer
                      </h4>
                      <p className="text-xs text-slate-500">{selectedCircularView.subject}</p>
                    </div>
                    <button
                      onClick={() => setSelectedCircularView(null)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-brand-border space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Document File:</span>
                      <span className="font-mono font-bold text-slate-800">{selectedCircularView.pdfPath}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">Effective Date:</span>
                      <span className="font-mono text-slate-700">{selectedCircularView.date}</span>
                    </div>
                    <div className="h-44 bg-white border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2">
                      <FileText size={40} className="text-brand-primary/60" />
                      <span className="text-xs font-medium text-slate-600">{selectedCircularView.pdfPath}</span>
                      <span className="text-[11px] text-slate-400">PDF Document Ready for Preview / Download</span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => {
                        showToast(`Downloading ${selectedCircularView.pdfPath}...`);
                      }}
                      className="px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Download size={14} /> Download PDF
                    </button>
                    <button
                      onClick={() => setSelectedCircularView(null)}
                      className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 5: Send Message */}
        {activeTab === 'sendMessage' && (
          <div className="w-full space-y-6">
            {/* Form Card matching reference theme */}
            <div className="bg-white rounded-[12px] border border-brand-border p-6 sm:p-7 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
              <div className="mb-5 pb-3 border-b border-brand-border">
                <h3 className="text-base font-bold text-brand-navy">Send In-App Notification</h3>
                <p className="text-xs text-slate-500 mt-0.5">Broadcast push messages directly to Agent and Executive mobile devices</p>
              </div>

              <form onSubmit={handleSendMessage} className="space-y-5">
                {/* Radio selection: Agent / Sales Executive / ALL */}
                <div className="flex flex-wrap items-center gap-8 sm:gap-14 pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="msgTargetType"
                      value="Agent"
                      checked={msgTargetType === 'Agent'}
                      onChange={() => setMsgTargetType('Agent')}
                      className="w-4 h-4 text-brand-primary accent-brand-primary focus:ring-brand-primary cursor-pointer"
                    />
                    <span className="text-slate-800 font-semibold text-sm">Agent</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="msgTargetType"
                      value="Sales Executive"
                      checked={msgTargetType === 'Sales Executive'}
                      onChange={() => setMsgTargetType('Sales Executive')}
                      className="w-4 h-4 text-brand-primary accent-brand-primary focus:ring-brand-primary cursor-pointer"
                    />
                    <span className="text-slate-800 font-semibold text-sm">Sales Executive</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="msgTargetType"
                      value="ALL"
                      checked={msgTargetType === 'ALL'}
                      onChange={() => setMsgTargetType('ALL')}
                      className="w-4 h-4 text-brand-primary accent-brand-primary focus:ring-brand-primary cursor-pointer"
                    />
                    <span className="text-slate-800 font-semibold text-sm">ALL</span>
                  </label>
                </div>

                {/* Search inputs */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Search By Agent Name"
                      value={msgSearchAgent}
                      onChange={(e) => setMsgSearchAgent(e.target.value)}
                      disabled={msgTargetType === 'Sales Executive'}
                      className={`w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all placeholder:text-slate-400 ${
                        msgTargetType === 'Sales Executive' ? 'bg-slate-50 opacity-60 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>

                  <div className="w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Search By Emp Name"
                      value={msgSearchEmp}
                      onChange={(e) => setMsgSearchEmp(e.target.value)}
                      disabled={msgTargetType === 'Agent'}
                      className={`w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all placeholder:text-slate-400 ${
                        msgTargetType === 'Agent' ? 'bg-slate-50 opacity-60 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="send-message-text" className="block text-slate-700 font-semibold text-xs uppercase mb-1.5">
                    Message:
                  </label>
                  <textarea
                    id="send-message-text"
                    rows={4}
                    value={msgContent}
                    onChange={(e) => setMsgContent(e.target.value)}
                    placeholder="Type in-app broadcast message..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all resize-y"
                    required
                  />
                </div>

                {/* Send Button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    className="px-8 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab 6: Help */}
        {activeTab === 'help' && (
          <div className="w-full space-y-6">
            {/* Date Range Filter Card */}
            <div className="bg-white rounded-[12px] border border-brand-border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                {/* From Date */}
                <div className="w-full sm:w-56">
                  <label htmlFor="help-from-date" className="block text-slate-700 text-xs font-semibold uppercase mb-1.5">
                    From Date
                  </label>
                  <input
                    id="help-from-date"
                    type="text"
                    value={helpFromDate}
                    onChange={(e) => setHelpFromDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                {/* To Date */}
                <div className="w-full sm:w-56">
                  <label htmlFor="help-to-date" className="block text-slate-700 text-xs font-semibold uppercase mb-1.5">
                    To Date
                  </label>
                  <input
                    id="help-to-date"
                    type="text"
                    value={helpToDate}
                    onChange={(e) => setHelpToDate(e.target.value)}
                    placeholder="DD/MM/YYYY"
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                {/* Show Button */}
                <div className="pt-2 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => showToast(`Filtered help records from ${helpFromDate} to ${helpToDate}`)}
                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Show
                  </button>
                </div>
              </div>
            </div>

            {/* Help Records Table Card */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
              <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-base font-bold text-brand-navy">App Help Records</h3>
                  <p className="text-xs text-slate-500">Inbound help requests raised by agents from the mobile help center</p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search agent, mobile or help type..."
                      value={helpSearch}
                      onChange={(e) => setHelpSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Exporting Help Records...')}
                    className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:text-brand-primary hover:bg-slate-50 transition-colors cursor-pointer"
                    title="Export"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>

              {/* Table in VehicleMaster Theme */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap min-w-[700px]">
                  <thead className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                    <tr>
                      <th className="py-3 px-4 font-semibold text-brand-navy w-52">HELP DATE</th>
                      <th className="py-3 px-4 font-semibold text-brand-navy">SALESEX NAME</th>
                      <th className="py-3 px-4 font-semibold text-brand-navy w-36">MOBILE NO</th>
                      <th className="py-3 px-4 font-semibold text-brand-navy">HELP NAME</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-slate-800 bg-white">
                    {(() => {
                      const filtered = helpRecords.filter(
                        (r) =>
                          r.salesexName.toLowerCase().includes(helpSearch.toLowerCase()) ||
                          r.mobileNo.includes(helpSearch) ||
                          r.helpName.toLowerCase().includes(helpSearch.toLowerCase()) ||
                          r.helpDate.includes(helpSearch)
                      );

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={4} className="py-16 text-center text-slate-400 font-medium">
                              No help records found matching your search.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((row) => (
                        <tr
                          key={row.id}
                          className="h-[48px] hover:bg-brand-mainbg transition-colors bg-white"
                        >
                          <td className="py-2.5 px-4 font-mono text-xs text-slate-600">
                            {row.helpDate}
                          </td>
                          <td className="py-2.5 px-4 font-medium text-slate-800">
                            {row.salesexName}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-xs text-slate-700">
                            {row.mobileNo}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold ${
                              row.helpName === 'POLICY' ? 'bg-blue-100 text-blue-800' :
                              row.helpName === 'COMMISSION' ? 'bg-amber-100 text-amber-800' :
                              row.helpName === 'SALES_SUPPORT' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {row.helpName}
                            </span>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Close Endorsement */}
        {activeTab === 'closeEndorsement' && (
          <div className="bg-white rounded-[12px] border border-brand-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full max-w-2xl">
            <div className="mb-5 pb-3 border-b border-brand-border">
              <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                <X size={18} className="text-rose-500" />
                Close / Cancel Endorsement Request
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Mark an in-flight mobile app endorsement request as closed or rejected</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                showToast(`Endorsement ${closeEndorseId || 'END-SAMPLE'} marked as closed.`);
                setCloseEndorseId('');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Endorsement Request ID or Policy No</label>
                <input
                  type="text"
                  placeholder="e.g. END-2026-082 or POL/2026/88319"
                  value={closeEndorseId}
                  onChange={(e) => setCloseEndorseId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Closure Reason</label>
                <select
                  value={closeEndorseReason}
                  onChange={(e) => setCloseEndorseReason(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white"
                >
                  <option>POLICY EXPIRED / NOT REQUIRED</option>
                  <option>INSUFFICIENT SUPPORTING DOCUMENTS</option>
                  <option>INCORRECT RC COPY PROVIDED</option>
                  <option>REQUEST CANCELLED BY AGENT</option>
                  <option>DUPLICATE ENTRY</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Admin Closure Note</label>
                <textarea
                  rows={3}
                  placeholder="Explain why this endorsement was closed for audit..."
                  className="w-full p-3 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-rose-600 text-white font-semibold text-sm shadow-xs hover:bg-rose-700 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <X size={15} />
                  Confirm Closure
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 8: App LockDate / Payment Due Report */}
        {activeTab === 'appLockDateRep' && (
          <div className="w-full space-y-6">
            {/* Three Search Inputs matching reference theme */}
            <div className="bg-white rounded-[12px] border border-brand-border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-full sm:flex-1 relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search Agent Name Here"
                    value={lockDateSearchAgent}
                    onChange={(e) => setLockDateSearchAgent(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="w-full sm:flex-1 relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search Customer Name Here"
                    value={lockDateSearchCustomer}
                    onChange={(e) => setLockDateSearchCustomer(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all placeholder:text-slate-400"
                  />
                </div>
                <div className="w-full sm:flex-1 relative">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search Vehicle No Here"
                    value={lockDateSearchVehicle}
                    onChange={(e) => setLockDateSearchVehicle(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-slate-800 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Records Table in VehicleMaster Theme */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
              <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-base font-bold text-brand-navy">App Remaining Payment Due Report</h3>
                  <p className="text-xs text-slate-500">Mobile app transactions with outstanding payment balance</p>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Exporting Payment Due Report...')}
                  className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:text-brand-primary hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Export"
                >
                  <Download size={15} />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap min-w-[1100px]">
                  <thead className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                    <tr>
                      <th className="py-3 px-3 font-semibold text-brand-navy w-16">ID</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy">AGENT NAME</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy w-28">MOBILE NO</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy w-44">TRANS DATE</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy">CUSTOMER NAME</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy w-32">REGISTRATION NO</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy text-right w-28">CASHPAIDAMT</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy text-right w-24">PREMIUM</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy text-right w-28">CASHPAIDAMT</th>
                      <th className="py-3 px-3 font-semibold text-brand-navy text-right w-32">REMAINING AMT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-slate-800 bg-white">
                    {(() => {
                      const filtered = paymentDueRecords.filter((r) => {
                        const agentMatch = r.agentName.toLowerCase().includes(lockDateSearchAgent.toLowerCase());
                        const customerMatch = r.customerName.toLowerCase().includes(lockDateSearchCustomer.toLowerCase());
                        const vehicleMatch = r.registrationNo.toLowerCase().includes(lockDateSearchVehicle.toLowerCase());
                        return agentMatch && customerMatch && vehicleMatch;
                      });

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={10} className="py-16 text-center text-slate-400 font-medium">
                              No payment due records found matching your filters.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((row) => (
                        <tr
                          key={row.id}
                          className="h-[48px] hover:bg-brand-mainbg transition-colors bg-white"
                        >
                          <td className="py-2.5 px-3 font-mono font-bold text-brand-primary">{row.id}</td>
                          <td className="py-2.5 px-3 font-medium text-slate-800">{row.agentName}</td>
                          <td className="py-2.5 px-3 font-mono text-xs text-slate-700">{row.mobileNo}</td>
                          <td className="py-2.5 px-3 font-mono text-xs text-slate-600">{row.transDate}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">{row.customerName}</td>
                          <td className="py-2.5 px-3 font-mono font-bold text-brand-primary">{row.registrationNo}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">₹{row.cashPaidAmt.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-800">₹{row.premium.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-right font-mono text-slate-700">₹{row.cashPaidAmt2.toLocaleString('en-IN')}</td>
                          <td className="py-2.5 px-3 text-right">
                            <span className="font-mono font-bold text-rose-600">₹{row.remainingAmt.toLocaleString('en-IN')}</span>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 9: Runup Upload Image */}
        {activeTab === 'runupUploadImg' && (
          <div className="space-y-5">
            {/* Upload Form Card */}
            <div className="bg-white rounded-[12px] border border-brand-border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
                {/* Radio Buttons */}
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="runupImageType"
                      checked={runupImageType === 'agent'}
                      onChange={() => setRunupImageType('agent')}
                      className="w-4 h-4 accent-brand-primary cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-800">Agent</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="runupImageType"
                      checked={runupImageType === 'executive'}
                      onChange={() => setRunupImageType('executive')}
                      className="w-4 h-4 accent-brand-primary cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-800">Executive</span>
                  </label>
                </div>

                {/* File Input */}
                <div className="flex-1 min-w-[200px]">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedRunupFile(file);
                        setSelectedRunupFileName(file.name);
                      }
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-brand-primary file:text-white cursor-pointer"
                  />
                  {selectedRunupFileName && (
                    <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                      <CheckCircle2 size={12} /> Selected: {selectedRunupFileName}
                    </p>
                  )}
                </div>

                {/* Add New Themed Banner Button */}
                <button
                  type="button"
                  onClick={() => {
                    const newId = Date.now();
                    const newB = {
                      id: newId,
                      title: `${runupImageType === 'agent' ? 'Agent' : 'Executive'} Comprehensive Motor Promo`,
                      target: runupImageType === 'agent' ? 'App Home Slider' : 'Executive Dashboard',
                      size: '1200x500',
                      active: true,
                      tag: 'Special Promo',
                      badgeColor: 'emerald' as const,
                      headline: 'Commercial & Private Fleet',
                      subline: 'Instant Cashless Claims Across India',
                      footerLeft: 'Over 4,500 Garages',
                      footerRight: 'EXCLUSIVE',
                      icon: 'zap',
                    };
                    setRunupBanners([...runupBanners, newB]);
                    showToast('New themed promo banner asset added!');
                  }}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shadow-xs"
                >
                  Add New Image
                </button>

                {/* Upload Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (selectedRunupFile) {
                      const newB = {
                        id: Date.now(),
                        title: selectedRunupFileName.replace(/\.[^/.]+$/, "") || 'Uploaded Banner Asset',
                        target: runupImageType === 'agent' ? 'App Home Slider' : 'Executive Dashboard',
                        size: '1200x500',
                        active: true,
                        imageUrl: URL.createObjectURL(selectedRunupFile),
                        tag: 'Uploaded Asset',
                        badgeColor: 'blue' as const,
                        headline: selectedRunupFileName,
                        subline: `${(selectedRunupFile.size / 1024).toFixed(1)} KB • ${runupImageType.toUpperCase()}`,
                        footerLeft: 'Custom Upload',
                        footerRight: 'ACTIVE',
                        icon: 'award',
                      };
                      setRunupBanners([...runupBanners, newB]);
                      setSelectedRunupFile(null);
                      setSelectedRunupFileName('');
                      showToast('Image banner uploaded and added successfully!');
                    } else {
                      showToast('Runup image updated successfully!');
                    }
                  }}
                  className="px-6 py-2 rounded-lg bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Upload size={15} />
                  Upload
                </button>
              </div>
            </div>

            {/* Banners Image Table */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
              <div className="p-4 bg-slate-50 border-b border-brand-border flex justify-between items-center">
                <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <Image size={18} className="text-brand-primary" />
                  Active Runup Banners & Promo Assets
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-brand-primary rounded-full border border-blue-200">
                  {runupBanners.length} Uploaded Image{runupBanners.length === 1 ? '' : 's'}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
                  <thead className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                    <tr>
                      <th className="py-3 px-4 w-20 text-center font-semibold text-brand-navy">SR.NO.</th>
                      <th className="py-3 px-6 font-semibold text-brand-navy">IMAGE</th>
                      <th className="py-3 px-4 text-center w-32 font-semibold text-brand-navy">DELETE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-slate-800 bg-white">
                    {runupBanners.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="py-16 text-center text-slate-400 font-medium">
                          No banner images found. Use the form above to add and upload new assets.
                        </td>
                      </tr>
                    ) : (
                      runupBanners.map((b, idx) => (
                        <tr key={b.id} className="hover:bg-brand-mainbg transition-colors bg-white">
                          <td className="py-3.5 px-4 text-center font-bold text-slate-800">{idx + 1}</td>
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-4">
                              {/* Themed Photo Card Container */}
                              <div className="w-[220px] h-[95px] rounded-lg overflow-hidden border border-brand-border bg-gradient-to-br from-[#F8FAFD] via-[#F4F8FC] to-[#EAF2FF] shadow-xs shrink-0 select-none relative flex flex-col justify-between p-2.5">
                                {b.imageUrl ? (
                                  <div className="relative w-full h-full -m-2.5">
                                    <img
                                      src={b.imageUrl}
                                      alt={b.title}
                                      className="w-full h-full object-cover"
                                    />
                                    <span className="absolute top-1.5 left-1.5 bg-brand-navy/80 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                                      UPLOADED
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    {/* Top Row: Pill Tag + Brand Name */}
                                    <div className="flex items-center justify-between z-10">
                                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-50 text-brand-primary border border-blue-200/80">
                                        {b.icon === 'sparkles' ? (
                                          <Sparkles size={9} className="text-brand-primary" />
                                        ) : b.icon === 'zap' ? (
                                          <Zap size={9} className="text-brand-primary" />
                                        ) : (
                                          <Award size={9} className="text-brand-primary" />
                                        )}
                                        {b.tag || 'PROMO'}
                                      </span>
                                      <span className="text-[9px] font-bold text-slate-400 tracking-wider">RELIABLE</span>
                                    </div>

                                    {/* Middle: Headline + Subline in Brand Theme */}
                                    <div className="my-auto z-10">
                                      <p className="font-bold text-[12px] text-brand-navy leading-tight line-clamp-1">
                                        {b.headline || b.title}
                                      </p>
                                      <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                                        {b.subline || b.target}
                                      </p>
                                    </div>

                                    {/* Bottom: Detail + Code Badge */}
                                    <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 z-10">
                                      <span className="text-[9px] text-slate-600 font-medium truncate max-w-[120px]">
                                        {b.footerLeft || 'In-App Exclusive'}
                                      </span>
                                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-100/80 text-brand-primary border border-blue-200/60">
                                        {b.footerRight || 'ACTIVE'}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>

                              <div className="space-y-1">
                                <p className="font-semibold text-slate-900 text-sm">{b.title}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">{b.target}</span>
                                  <span>•</span>
                                  <span>{b.size}</span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => {
                                setRunupBanners(runupBanners.filter(x => x.id !== b.id));
                                showToast(`Deleted "${b.title}"`);
                              }}
                              className="font-semibold text-xs text-rose-600 hover:text-rose-800 uppercase tracking-wider hover:underline transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-rose-50"
                            >
                              DELETE
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

        {/* Tab 10: Payment Mode */}
        {activeTab === 'paymentMode' && (
          <div className="space-y-6 w-full">
            {/* Payment Mode Selection Form Card */}
            <div className="bg-white rounded-[12px] border border-brand-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
              <div className="mb-5 pb-3 border-b border-brand-border">
                <h3 className="text-base font-bold text-brand-navy">Payment Mode Configuration</h3>
                <p className="text-xs text-slate-500 mt-0.5">Enable or disable allowed payment instruments per agent, executive, or franchise</p>
              </div>

              {/* Target Type Radio Buttons */}
              <div className="flex items-center gap-6 sm:gap-10 mb-6 flex-wrap pb-4 border-b border-brand-border">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="paymentTargetType"
                    checked={paymentTargetType === 'agent'}
                    onChange={() => {
                      setPaymentTargetType('agent');
                      setSelectedPaymentPerson('');
                    }}
                    className="w-4 h-4 accent-brand-primary cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-slate-800">Agent</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="paymentTargetType"
                    checked={paymentTargetType === 'executive'}
                    onChange={() => {
                      setPaymentTargetType('executive');
                      setSelectedPaymentPerson('');
                    }}
                    className="w-4 h-4 accent-brand-primary cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-slate-800">Sales Executive</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="radio"
                    name="paymentTargetType"
                    checked={paymentTargetType === 'franchise'}
                    onChange={() => {
                      setPaymentTargetType('franchise');
                      setSelectedPaymentPerson('');
                    }}
                    className="w-4 h-4 accent-brand-primary cursor-pointer"
                  />
                  <span className="text-sm font-semibold text-slate-800">Franchise Agent</span>
                </label>
              </div>

              {/* Form Grid */}
              <div className="space-y-4">
                {/* Row 1: Agent / Person Selector, CASH, CHEQUE */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">
                      {paymentTargetType === 'agent'
                        ? 'Agent'
                        : paymentTargetType === 'executive'
                        ? 'Sales Executive'
                        : 'Franchise Agent'}
                    </label>
                    <select
                      value={selectedPaymentPerson}
                      onChange={(e) => setSelectedPaymentPerson(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="">
                        {paymentTargetType === 'agent'
                          ? '--Select Agent Name--'
                          : paymentTargetType === 'executive'
                          ? '--Select Executive Name--'
                          : '--Select Franchise Name--'}
                      </option>
                      {(paymentTargetType === 'agent'
                        ? [
                            'RAMKRISHNA VITHAL KALE (AG-1029)',
                            'SURESH PANDURANG MORE (AG-1033)',
                            'PRIYA SURESH SAWANT (AG-1045)',
                            'RAHUL SHARMA (AG-1050)',
                            'SNEHA PATIL (AG-1062)',
                            'AMIT VERMA (AG-1077)',
                            'KAVITA JOSHI (AG-1089)',
                            'VIKAS DESHMUKH (AG-1094)',
                            'ANIL JADHAV (AG-1102)',
                          ]
                        : paymentTargetType === 'executive'
                        ? [
                            'AMIT VIKRAM VERMA (EX-401)',
                            'PRIYANKA CHOUDHARY (EX-405)',
                            'SACHIN KAMBLE (EX-412)',
                            'ROHAN KULKARNI (EX-418)',
                          ]
                        : [
                            'BARAMATI APEX HUB (FR-88)',
                            'PUNE CENTRAL BRANCH (FR-92)',
                            'SATARA HIGHWAY POINT (FR-104)',
                            'SOLAPUR CITY LINK (FR-110)',
                          ]
                      ).map((name) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">CASH</label>
                    <select
                      value={paymentSettings.cash}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, cash: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">CHEQUE</label>
                    <select
                      value={paymentSettings.cheque}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, cheque: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>
                </div>

                {/* Row 2: NEFT, RTGS, DD */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">NEFT</label>
                    <select
                      value={paymentSettings.neft}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, neft: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">RTGS</label>
                    <select
                      value={paymentSettings.rtgs}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, rtgs: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">DD</label>
                    <select
                      value={paymentSettings.dd}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, dd: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Online To RA, Ewallet, Online To InsuranceCompany, EMI */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Online To RA</label>
                    <select
                      value={paymentSettings.onlineToRa}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, onlineToRa: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Ewallet</label>
                    <select
                      value={paymentSettings.ewallet}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, ewallet: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Online To InsuranceCompany</label>
                    <select
                      value={paymentSettings.onlineToIc}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, onlineToIc: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">EMI</label>
                    <select
                      value={paymentSettings.emi}
                      onChange={(e) => setPaymentSettings({ ...paymentSettings, emi: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:outline-none bg-white text-slate-800"
                    >
                      <option value="ON">ON</option>
                      <option value="OFF">OFF</option>
                    </select>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      if (!selectedPaymentPerson) {
                        showToast('Please select a target name first!');
                        return;
                      }
                      const targetLabel =
                        paymentTargetType === 'agent'
                          ? 'Agent'
                          : paymentTargetType === 'executive'
                          ? 'Sales Executive'
                          : 'Franchise Agent';
                      showToast(`Payment mode configuration saved for ${selectedPaymentPerson} (${targetLabel})`);
                    }}
                    className="px-8 py-2 rounded-lg bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save size={15} />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 11: Grid For App */}
        {activeTab === 'gridForApp' && (
          <div className="space-y-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Card (Left) */}
              <div className="bg-white rounded-[12px] border border-brand-border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] lg:col-span-1">
                <div className="mb-5 pb-3 border-b border-brand-border">
                  <h3 className="text-base font-bold text-brand-navy">Grid for App Form</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Attach commission payout and rate grid files</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!gridAppText.trim()) {
                      showToast('Please enter text description!');
                      return;
                    }
                    const newRecord = {
                      id: Date.now(),
                      text: gridAppText,
                      fromDate: gridAppFromDate,
                      fileName: gridAppFile || 'app_grid_attachment.pdf',
                    };
                    setAppGridRecords([newRecord, ...appGridRecords]);
                    showToast('Grid for App saved successfully!');
                    setGridAppText('');
                    setGridAppFile(null);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Text</label>
                    <input
                      type="text"
                      placeholder="e.g. Q3 Payout Grid Policy"
                      value={gridAppText}
                      onChange={(e) => setGridAppText(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">From Date</label>
                    <input
                      type="date"
                      value={gridAppFromDate}
                      onChange={(e) => setGridAppFromDate(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white text-slate-800"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1.5">Attachment File</label>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setGridAppFile(e.target.files[0].name);
                        }
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs file:mr-3 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-brand-primary file:text-white cursor-pointer"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-7 py-2 rounded-lg bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Save size={15} />
                      Save
                    </button>
                  </div>
                </form>
              </div>

              {/* Report Area / Table (Right) */}
              <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col lg:col-span-2 w-full">
                <div className="p-4 bg-slate-50 border-b border-brand-border flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-brand-navy flex items-center gap-2">
                      <Layers size={18} className="text-brand-primary" />
                      Active App Grids & Documents
                    </h3>
                    <p className="text-xs text-slate-500">Live grids deployed to the agent & partner mobile applications</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-brand-primary rounded-full border border-blue-200">
                    {appGridRecords.length} Record{appGridRecords.length === 1 ? '' : 's'}
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap">
                    <thead className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                      <tr>
                        <th className="py-3 px-3 text-center w-16 font-semibold text-brand-navy">SR.NO.</th>
                        <th className="py-3 px-4 font-semibold text-brand-navy">TEXT</th>
                        <th className="py-3 px-4 w-32 font-semibold text-brand-navy">FROM DATE</th>
                        <th className="py-3 px-4 w-44 font-semibold text-brand-navy">FILE</th>
                        <th className="py-3 px-3 text-center w-24 font-semibold text-brand-navy">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border text-slate-800 bg-white">
                      {appGridRecords.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-16 text-center text-slate-400 font-medium">
                            No grid records found. Upload a new grid file from the form on the left.
                          </td>
                        </tr>
                      ) : (
                        appGridRecords.map((r, idx) => (
                          <tr
                            key={r.id}
                            className="h-[48px] hover:bg-brand-mainbg transition-colors bg-white"
                          >
                            <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                              {idx + 1}
                            </td>
                            <td className="py-2.5 px-4 font-medium text-slate-900">
                              {r.text}
                            </td>
                            <td className="py-2.5 px-4 font-mono text-xs text-slate-600">
                              {r.fromDate}
                            </td>
                            <td className="py-2.5 px-4">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-brand-primary font-medium text-xs border border-blue-200">
                                <FileText size={12} />
                                {r.fileName}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={() => {
                                  setAppGridRecords(appGridRecords.filter((x) => x.id !== r.id));
                                  showToast(`Deleted grid record "${r.text}"`);
                                }}
                                className="font-semibold text-xs text-rose-600 hover:text-rose-800 uppercase tracking-wider hover:underline transition-colors cursor-pointer px-2 py-1 rounded hover:bg-rose-50"
                              >
                                DELETE
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

            {/* Back Button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  handleTabChange('paymentMode');
                  showToast('Navigated back to Payment Mode');
                }}
                className="px-6 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-all cursor-pointer flex items-center gap-2"
              >
                Back
              </button>
            </div>
          </div>
        )}

        {/* Tab 12: Quotation Report */}
        {activeTab === 'quotationReport' && (
          <div className="space-y-6 w-full">
            {/* Filter Card */}
            <div className="bg-white rounded-[12px] border border-brand-border p-5 shadow-[0_1px_2px_rgba(0,0,0,0.02)] w-full">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 flex-wrap">
                {/* Status Radio Buttons */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="quoteStatus"
                      checked={quoteStatusFilter === 'accepted'}
                      onChange={() => setQuoteStatusFilter('accepted')}
                      className="w-4 h-4 accent-brand-primary cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-800">Accepted</span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="radio"
                      name="quoteStatus"
                      checked={quoteStatusFilter === 'cancel'}
                      onChange={() => setQuoteStatusFilter('cancel')}
                      className="w-4 h-4 accent-brand-primary cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-800">Cancel</span>
                  </label>
                </div>

                {/* Date Filters & Show Button */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">From Date</label>
                    <input
                      type="date"
                      value={quoteFromDate}
                      onChange={(e) => setQuoteFromDate(e.target.value)}
                      className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">To Date</label>
                    <input
                      type="date"
                      value={quoteToDate}
                      onChange={(e) => setQuoteToDate(e.target.value)}
                      className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none bg-white text-slate-800"
                    />
                  </div>

                  <div className="pt-5">
                    <button
                      onClick={() => {
                        showToast(`Showing ${quoteStatusFilter === 'accepted' ? 'Accepted' : 'Cancelled'} quotations`);
                      }}
                      className="px-6 py-2 rounded-lg bg-brand-primary hover:bg-[#1D4ED8] text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      Show
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quotations Report Table Card in VehicleMaster Theme */}
            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
              {/* Controls Bar: Export Button & Search Filter */}
              <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => showToast('Exporting quotation report data to Excel...')}
                    className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:text-brand-primary hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download size={14} />
                    Export
                  </button>
                  <span className="text-xs font-semibold px-2.5 py-0.5 bg-blue-50 text-brand-primary rounded-full border border-blue-200">
                    {
                      quotationsList
                        .filter((q) => q.status === quoteStatusFilter)
                        .filter(
                          (q) =>
                            q.customer.toLowerCase().includes(quotationSearch.toLowerCase()) ||
                            q.vehicle.toLowerCase().includes(quotationSearch.toLowerCase()) ||
                            q.id.toLowerCase().includes(quotationSearch.toLowerCase()) ||
                            q.agent.toLowerCase().includes(quotationSearch.toLowerCase())
                        ).length
                    }{' '}
                    Records
                  </span>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search customer, vehicle, ID..."
                    value={quotationSearch}
                    onChange={(e) => setQuotationSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-lg border border-slate-300 text-xs focus:border-brand-primary focus:ring-1 focus:ring-brand-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Table with Light-Blue Header */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[13px] border-collapse whitespace-nowrap min-w-[950px]">
                  <thead className="bg-brand-lightbg text-brand-navy text-[13px] uppercase tracking-wider font-semibold select-none border-b border-brand-border">
                    <tr>
                      <th className="py-3 px-3 text-center w-14 font-semibold text-brand-navy">SR.NO.</th>
                      <th className="py-3 px-3.5 w-32 font-semibold text-brand-navy">QUOTE ID</th>
                      <th className="py-3 px-4 font-semibold text-brand-navy">CUSTOMER NAME</th>
                      <th className="py-3 px-4 font-semibold text-brand-navy">VEHICLE DETAILS</th>
                      <th className="py-3 px-4 font-semibold text-brand-navy">AGENT</th>
                      <th className="py-3 px-3 text-right w-28 font-semibold text-brand-navy">PREMIUM</th>
                      <th className="py-3 px-3 text-center w-28 font-semibold text-brand-navy">DATE</th>
                      <th className="py-3 px-3 text-center w-24 font-semibold text-brand-navy">STATUS</th>
                      <th className="py-3 px-3 text-center w-20 font-semibold text-brand-navy">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-slate-800 bg-white">
                    {(() => {
                      const filtered = quotationsList
                        .filter((q) => q.status === quoteStatusFilter)
                        .filter(
                          (q) =>
                            q.customer.toLowerCase().includes(quotationSearch.toLowerCase()) ||
                            q.vehicle.toLowerCase().includes(quotationSearch.toLowerCase()) ||
                            q.id.toLowerCase().includes(quotationSearch.toLowerCase()) ||
                            q.agent.toLowerCase().includes(quotationSearch.toLowerCase())
                        );

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={9} className="py-16 text-center text-slate-400 font-medium">
                              No quotation records matching the selected status and date range.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((q, idx) => (
                        <tr
                          key={q.id}
                          className="h-[48px] hover:bg-brand-mainbg transition-colors bg-white"
                        >
                          <td className="py-2.5 px-3 text-center font-bold text-slate-800">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3.5 font-mono font-bold text-brand-primary">
                            {q.id}
                          </td>
                          <td className="py-2.5 px-4 font-semibold text-slate-900">
                            {q.customer}
                          </td>
                          <td className="py-2.5 px-4 text-slate-700">{q.vehicle}</td>
                          <td className="py-2.5 px-4 text-slate-600">{q.agent}</td>
                          <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                            ₹{q.premium.toLocaleString('en-IN')}
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-xs">
                            {q.date}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                q.status === 'accepted'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {q.status === 'accepted' ? 'Accepted' : 'Cancelled'}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            <button
                              onClick={() => showToast(`Viewing quotation details for ${q.id}...`)}
                              className="font-semibold text-xs text-brand-primary hover:text-blue-800 uppercase tracking-wider hover:underline transition-colors cursor-pointer px-2 py-1 rounded hover:bg-blue-50"
                            >
                              VIEW
                            </button>
                          </td>
                        </tr>
                      ));
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppModulePage;
