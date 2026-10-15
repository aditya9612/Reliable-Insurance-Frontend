import React, { useState } from 'react';
import {
  Building2, CheckCircle2, AlertCircle, FileText, Upload,
  X, Check, Search, Download, Edit2, Trash2, List, PlusCircle
} from 'lucide-react';
import { FranchiseItem, KycDocItem } from '../types';

interface FranchiseMasterTabProps {
  franchises: FranchiseItem[];
  setFranchises: React.Dispatch<React.SetStateAction<FranchiseItem[]>>;
  showToast: (msg: string) => void;
}

const branchList = [
  '--Select Branch Name--',
  'BARAMATI',
  'PUNE',
  'MUMBAI',
  'SOLAPUR',
  'AHILYANAGAR',
  'KOLHAPUR',
  'SATARA',
  'NASHIK',
  'NAGPUR',
  'CHHATRAPATI SAMBHAJINAGAR',
  'AKLUJ',
  'BARSHI',
  'BEED',
  'BULDHANA',
  'CHANDRAPUR'
];

const salesExecList = [
  '--Select Sales Executive--',
  'AMOL LOKHANDE',
  'AMRIT DEDHIA',
  'ANANDKUMAR ARUN HADMODE',
  'ATISH SHRINIVAS HAREL',
  'DHULAPPA HARI KHARAT',
  'FARHAN PANJA',
  'HANUMANT NIVRUTTI JAGTAP',
  'KARISHMA IRFAN MUJAWAR',
  'LINSA PETER',
  'MOHAMMAD SADIK SHAMI',
  'NIVRUTTI PANDHIRINATH PATIL'
];

const reportingList = [
  '--Select Reporting--',
  'BARAMATI HEAD OFFICE',
  'PUNE ZONAL OFFICE',
  'MUMBAI REGIONAL OFFICE',
  'BRANCH HEAD'
];

const coordinatorList = [
  '--Select Cordinator --',
  'SNEHAL PATIL',
  'PRIYA SHARMA',
  'RAHUL DESHMUKH',
  'SWAPNIL JADHAV'
];

const quotationCoordList = [
  '--Select Quotation Cordinator --',
  'POOJA KULKARNI',
  'NITIN PAWAR',
  'ANIKET SHINDE',
  'SONALI MORE'
];

const inspectionCoordList = [
  '--Select Inspection Cordinator --',
  'SACHIN MANE',
  'VIKAS GAIKWAD',
  'AJAY JOSHI',
  'MAHESH KAMBLE'
];

const endorsementCoordList = [
  '--Select Endrosment Cordinator --',
  'KAVITA MORE',
  'SANTOSH KALE',
  'SUNIL RATHOD',
  'MEENA SHETE'
];

const bankList = [
  '--Select Bank Type--',
  'HDFC BANK',
  'STATE BANK OF INDIA',
  'ICICI BANK',
  'AXIS BANK',
  'BANK OF MAHARASHTRA',
  'BANK OF BARODA',
  'CANARA BANK',
  'PUNJAB NATIONAL BANK',
  'KOTAK MAHINDRA BANK',
  'UNION BANK OF INDIA'
];

const stateList = [
  '--Select State--',
  'MAHARASHTRA',
  'GOA',
  'GUJARAT',
  'KARNATAKA',
  'MADHYA PRADESH',
  'DELHI',
  'ANDHRA PRADESH',
  'TAMIL NADU'
];

const initialKycRows: KycDocItem[] = [
  { id: 'adhar-front', name: 'ADHAR CARD', fileName: '' },
  { id: 'adhar-back', name: 'ADHAR CARD', fileName: '' },
  { id: 'pan-card', name: 'PAN CARD', fileName: '' },
  { id: 'cancel-cheque', name: 'CANCEL CHEQUE', fileName: '' },
  { id: 'passport', name: 'PASSPORT', fileName: '' },
];

export const FranchiseMasterTab: React.FC<FranchiseMasterTabProps> = ({
  franchises,
  setFranchises,
  showToast
}) => {
  // View mode: Form or Table
  const [viewMode, setViewMode] = useState<'form' | 'table'>('form');

  // --- Section 1: Coordinator Details State ---
  const [franchiseType, setFranchiseType] = useState('Type 1');
  const [branch, setBranch] = useState('--Select Branch Name--');
  const [salesExecutive, setSalesExecutive] = useState('--Select Sales Executive--');
  const [classType, setClassType] = useState('Class 6');
  const [reporting, setReporting] = useState('--Select Reporting--');
  const [coordinator, setCoordinator] = useState('--Select Cordinator --');
  const [quotationCoordinator, setQuotationCoordinator] = useState('--Select Quotation Cordinator --');
  const [inspectionCoordinator, setInspectionCoordinator] = useState('--Select Inspection Cordinator --');
  const [endorsementCoordinator, setEndorsementCoordinator] = useState('--Select Endrosment Cordinator --');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [agentTds, setAgentTds] = useState('');

  // --- Section 2: Franchise Details State ---
  const [franchiseCode, setFranchiseCode] = useState('FA1035');
  const [initialTitle, setInitialTitle] = useState('-SELECT-');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('SELECT');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [state, setState] = useState('MAHARASHTRA');
  const [district, setDistrict] = useState('');
  const [taluka, setTaluka] = useState('NA');
  const [pinCode, setPinCode] = useState('');
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('SELECT');
  const [mobile1, setMobile1] = useState('');
  const [mobile2, setMobile2] = useState('');
  const [emailId, setEmailId] = useState('');
  const [panNo, setPanNo] = useState('');
  const [aadharNo, setAadharNo] = useState('');
  const [nomineeName, setNomineeName] = useState('');

  // --- Section 3: Bank Details State ---
  const [bankName, setBankName] = useState('--Select Bank Type--');
  const [bankBranch, setBankBranch] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [bankAccountNo, setBankAccountNo] = useState('');

  // --- Section 4: User Details State ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [usernameCheckStatus, setUsernameCheckStatus] = useState<'idle' | 'available' | 'taken'>('idle');

  // --- Section 5: KYC Details State ---
  const [kycDocs, setKycDocs] = useState<KycDocItem[]>(initialKycRows);

  // Table search & filter state
  const [tableSearch, setTableSearch] = useState('');

  // Check username availability
  const handleCheckUsername = () => {
    if (!username.trim()) {
      showToast('Please enter a username to check.');
      return;
    }
    const taken = franchises.some(f => f.username?.toLowerCase() === username.trim().toLowerCase());
    if (taken || username.toLowerCase() === 'admin' || username.toLowerCase() === 'user') {
      setUsernameCheckStatus('taken');
      showToast(`Username "${username}" is already taken. Please choose another.`);
    } else {
      setUsernameCheckStatus('available');
      showToast(`Username "${username}" is available!`);
    }
  };

  // Handle KYC file upload simulation
  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setKycDocs(prev =>
        prev.map((doc, idx) =>
          idx === index ? { ...doc, fileName: file.name, fileSize: `${(file.size / 1024).toFixed(1)} KB` } : doc
        )
      );
      showToast(`Uploaded ${file.name} for ${kycDocs[index].name}`);
    }
  };

  const handleRemoveKycFile = (index: number) => {
    setKycDocs(prev =>
      prev.map((doc, idx) => (idx === index ? { ...doc, fileName: '' } : doc))
    );
  };

  // Reset form
  const handleReset = () => {
    setFranchiseType('Type 1');
    setBranch('--Select Branch Name--');
    setSalesExecutive('--Select Sales Executive--');
    setClassType('Class 6');
    setReporting('--Select Reporting--');
    setCoordinator('--Select Cordinator --');
    setQuotationCoordinator('--Select Quotation Cordinator --');
    setInspectionCoordinator('--Select Inspection Cordinator --');
    setEndorsementCoordinator('--Select Endrosment Cordinator --');
    setDateOfJoining('');
    setAgentTds('');

    setInitialTitle('-SELECT-');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setGender('SELECT');
    setAddressLine1('');
    setAddressLine2('');
    setState('MAHARASHTRA');
    setDistrict('');
    setTaluka('NA');
    setPinCode('');
    setDob('');
    setMaritalStatus('SELECT');
    setMobile1('');
    setMobile2('');
    setEmailId('');
    setPanNo('');
    setAadharNo('');
    setNomineeName('');

    setBankName('--Select Bank Type--');
    setBankBranch('');
    setIfscCode('');
    setBankAccountNo('');

    setUsername('');
    setPassword('');
    setRePassword('');
    setUsernameCheckStatus('idle');

    setKycDocs(initialKycRows);

    showToast('Form fields have been reset.');
  };

  // Save Franchise
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Required fields validation matching the asterisks in the photo:
    if (!firstName.trim()) {
      showToast('Please enter Franchise First Name.');
      return;
    }
    if (!lastName.trim()) {
      showToast('Please enter Franchise Last Name.');
      return;
    }
    if (!mobile1.trim()) {
      showToast('Please enter Mobile No 1.');
      return;
    }
    if (!emailId.trim()) {
      showToast('Please enter Email Id.');
      return;
    }
    if (password && password !== rePassword) {
      showToast('Password and Re-Password do not match.');
      return;
    }

    const fullName = `${initialTitle !== '-SELECT-' ? initialTitle + ' ' : ''}${firstName} ${middleName ? middleName + ' ' : ''}${lastName}`.trim();
    const effectiveBranch = branch !== '--Select Branch Name--' ? branch : 'BARAMATI HEAD OFFICE';

    const newFranchise: FranchiseItem = {
      id: Date.now(),
      code: franchiseCode,
      initial: initialTitle,
      firstName,
      middleName,
      lastName,
      name: fullName,
      branch: effectiveBranch,
      franchiseType,
      salesExecutive: salesExecutive !== '--Select Sales Executive--' ? salesExecutive : '',
      classType,
      reporting: reporting !== '--Select Reporting--' ? reporting : '',
      coordinator: coordinator !== '--Select Cordinator --' ? coordinator : '',
      quotationCoordinator: quotationCoordinator !== '--Select Quotation Cordinator --' ? quotationCoordinator : '',
      inspectionCoordinator: inspectionCoordinator !== '--Select Inspection Cordinator --' ? inspectionCoordinator : '',
      endorsementCoordinator: endorsementCoordinator !== '--Select Endrosment Cordinator --' ? endorsementCoordinator : '',
      dateOfJoining: dateOfJoining || new Date().toISOString().split('T')[0],
      agentTds,
      gender,
      addressLine1,
      addressLine2,
      address: `${addressLine1} ${addressLine2}`.trim(),
      city: district || 'Baramati',
      state,
      district,
      taluka,
      pincode: pinCode,
      dob,
      maritalStatus,
      mobile1,
      mobile2,
      mobile: mobile1,
      email: emailId,
      panNo: panNo.toUpperCase(),
      aadharNo,
      nomineeName,
      bankName: bankName !== '--Select Bank Type--' ? bankName : '',
      bankBranch,
      ifscCode: ifscCode.toUpperCase(),
      accountNo: bankAccountNo,
      username,
      password,
      kycDocuments: kycDocs.filter(d => d.fileName),
      contactPerson: fullName,
      category: 'Standard',
      commissionRate: 15,
      securityDeposit: 50000,
      totalAgents: 0,
      activePolicies: 0,
      monthlyTurnover: 0,
      status: 'ACTIVE',
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setFranchises(prev => [newFranchise, ...prev]);
    showToast(`Franchise ${franchiseCode} (${fullName}) registered successfully!`);

    // Increment code for next entry
    const match = franchiseCode.match(/^FA(\d+)$/);
    if (match) {
      const nextNum = parseInt(match[1], 10) + 1;
      setFranchiseCode(`FA${nextNum}`);
    } else {
      setFranchiseCode(`FA${Date.now().toString().slice(-4)}`);
    }

    handleReset();
  };

  const filteredFranchises = franchises.filter(f =>
    f.name.toLowerCase().includes(tableSearch.toLowerCase()) ||
    f.code.toLowerCase().includes(tableSearch.toLowerCase()) ||
    f.branch.toLowerCase().includes(tableSearch.toLowerCase()) ||
    f.mobile.includes(tableSearch)
  );

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* Top Controls / View Mode Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('form')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              viewMode === 'form'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <PlusCircle size={15} /> Franchise Entry Form
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              viewMode === 'table'
                ? 'bg-brand-primary text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <List size={15} /> Registered Franchises ({franchises.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium hidden sm:block">
          Active Code: <strong className="text-brand-primary font-mono">{franchiseCode}</strong>
        </div>
      </div>

      {viewMode === 'form' ? (
        <form onSubmit={handleSave} className="space-y-6">
          {/* ========================================================= */}
          {/* 1. FRANCHISE COORDINATOR DETAILS                          */}
          {/* ========================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
            <div className="bg-brand-primary text-white px-5 py-2.5 flex items-center shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                <span className="text-white/90 text-base font-serif">»</span>
                <span>Franchise Coordinator Details</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Row 1: Franchise Type, Branch, Sales Executive, Class * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Franchise Type
                  </label>
                  <select
                    value={franchiseType}
                    onChange={e => setFranchiseType(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    <option value="Type 1">Type 1</option>
                    <option value="Type 2">Type 2</option>
                    <option value="Type 3">Type 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Branch
                  </label>
                  <select
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {branchList.map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Sales Executive
                  </label>
                  <select
                    value={salesExecutive}
                    onChange={e => setSalesExecutive(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {salesExecList.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Class <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <select
                    value={classType}
                    onChange={e => setClassType(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    <option value="Class 1">Class 1</option>
                    <option value="Class 2">Class 2</option>
                    <option value="Class 3">Class 3</option>
                    <option value="Class 4">Class 4</option>
                    <option value="Class 5">Class 5</option>
                    <option value="Class 6">Class 6</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Reporting *, Co-Ordinator, Quotation Co-Ordinator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Reporting <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <select
                    value={reporting}
                    onChange={e => setReporting(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {reportingList.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Co-Ordinator
                  </label>
                  <select
                    value={coordinator}
                    onChange={e => setCoordinator(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {coordinatorList.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Quotation Co-Ordinator
                  </label>
                  <select
                    value={quotationCoordinator}
                    onChange={e => setQuotationCoordinator(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {quotationCoordList.map(q => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Inspection Co-Ordinator, Endrosment Co-Ordinator */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="hidden lg:block"></div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Inspection Co-Ordinator
                  </label>
                  <select
                    value={inspectionCoordinator}
                    onChange={e => setInspectionCoordinator(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {inspectionCoordList.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Endrosment Co-Ordinator
                  </label>
                  <select
                    value={endorsementCoordinator}
                    onChange={e => setEndorsementCoordinator(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {endorsementCoordList.map(ec => (
                      <option key={ec} value={ec}>{ec}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Date Of Joining, Agent Tds */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date Of Joining
                  </label>
                  <input
                    type="date"
                    value={dateOfJoining}
                    onChange={e => setDateOfJoining(e.target.value)}
                    placeholder="dd/MM/yyyy"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Agent Tds
                  </label>
                  <input
                    type="text"
                    value={agentTds}
                    onChange={e => setAgentTds(e.target.value)}
                    placeholder="e.g. 5.00"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. FRANCHISE DETAILS                                      */}
          {/* ========================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
            <div className="bg-brand-primary text-white px-5 py-2.5 flex items-center shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                <span className="text-white/90 text-base font-serif">»</span>
                <span>Franchise Details</span>
              </div>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              {/* Row 1: Franchise Code *, Initial *, First Name *, Middle Name *, Last Name * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Franchise Code <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={franchiseCode}
                    readOnly
                    className="w-full px-3.5 py-1.5 bg-slate-100 border border-slate-300 rounded-full text-xs text-brand-primary font-bold shadow-2xs cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Initial <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <select
                    value={initialTitle}
                    onChange={e => setInitialTitle(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    <option value="-SELECT-">-SELECT-</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="M/s.">M/s.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Franchise First Name <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Franchise Middle Name <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={middleName}
                    onChange={e => setMiddleName(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Franchise Last Name <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Row 2: Gender *, Per AddressLine1 *, Per AddressLine2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Gender <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <select
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    <option value="SELECT">SELECT</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                    <option value="OTHER">OTHER</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Per AddressLine1 <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={addressLine1}
                    onChange={e => setAddressLine1(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Per AddressLine2 <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={e => setAddressLine2(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Row 3: State *, District *, Taluka *, Pin Code * */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    State <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <select
                    value={state}
                    onChange={e => setState(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {stateList.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    District <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    placeholder="Enter District"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Taluka <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <select
                    value={taluka}
                    onChange={e => setTaluka(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    <option value="NA">NA</option>
                    <option value="BARAMATI">BARAMATI</option>
                    <option value="HAVELI">HAVELI</option>
                    <option value="DAUND">DAUND</option>
                    <option value="INDAPUR">INDAPUR</option>
                    <option value="SOLAPUR NORTH">SOLAPUR NORTH</option>
                    <option value="KARVE NAGAR">KARVE NAGAR</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Pin Code <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={pinCode}
                    onChange={e => setPinCode(e.target.value)}
                    placeholder="Enter Pin Code"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Row 4: Date Of Birth, Marital Status, Mobile No 1 *, Mobile No 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={e => setDob(e.target.value)}
                    placeholder="dd/mm/yyyy"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Marital Status
                  </label>
                  <select
                    value={maritalStatus}
                    onChange={e => setMaritalStatus(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    <option value="SELECT">SELECT</option>
                    <option value="MARRIED">MARRIED</option>
                    <option value="UNMARRIED">UNMARRIED</option>
                    <option value="DIVORCED">DIVORCED</option>
                    <option value="WIDOWED">WIDOWED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile No 1 <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={mobile1}
                    onChange={e => setMobile1(e.target.value)}
                    placeholder="Enter Number"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile No 2
                  </label>
                  <input
                    type="text"
                    value={mobile2}
                    onChange={e => setMobile2(e.target.value)}
                    placeholder="Enter Number"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Row 5: Email Id *, PAN No, Aadhar No, Nominee Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Id <span className="text-rose-500 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={emailId}
                    onChange={e => setEmailId(e.target.value)}
                    placeholder="Enter Email Id"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    PAN No
                  </label>
                  <input
                    type="text"
                    value={panNo}
                    onChange={e => setPanNo(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 uppercase shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Aadhar No
                  </label>
                  <input
                    type="text"
                    value={aadharNo}
                    onChange={e => setAadharNo(e.target.value)}
                    placeholder="Enter Aadhar No"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nominee Name
                  </label>
                  <input
                    type="text"
                    value={nomineeName}
                    onChange={e => setNomineeName(e.target.value)}
                    placeholder="Enter Nominee Name"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. BANK DETAILS                                           */}
          {/* ========================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
            <div className="bg-brand-primary text-white px-5 py-2.5 flex items-center shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                <span className="text-white/90 text-base font-serif">»</span>
                <span>Bank Details</span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Bank Name
                  </label>
                  <select
                    value={bankName}
                    onChange={e => setBankName(e.target.value)}
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                  >
                    {bankList.map(bk => (
                      <option key={bk} value={bk}>{bk}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Bank Branch
                  </label>
                  <input
                    type="text"
                    value={bankBranch}
                    onChange={e => setBankBranch(e.target.value)}
                    placeholder="Enter Branch Name"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={ifscCode}
                    onChange={e => setIfscCode(e.target.value.toUpperCase())}
                    placeholder="e.g. HDFC0001024"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 uppercase shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Bank Account No
                  </label>
                  <input
                    type="text"
                    value={bankAccountNo}
                    onChange={e => setBankAccountNo(e.target.value)}
                    placeholder="Enter Bank Account No"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 4. USER DETAILS                                           */}
          {/* ========================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
            <div className="bg-brand-primary text-white px-5 py-2.5 flex items-center shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                <span className="text-white/90 text-base font-serif">»</span>
                <span>User Details</span>
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Username
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={username}
                      onChange={e => {
                        setUsername(e.target.value);
                        setUsernameCheckStatus('idle');
                      }}
                      placeholder="Enter Username"
                      className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                    <button
                      type="button"
                      onClick={handleCheckUsername}
                      className="px-4 py-1.5 bg-brand-primary hover:bg-blue-700 text-white font-semibold text-xs rounded-md shadow-xs transition-colors cursor-pointer shrink-0"
                    >
                      Check
                    </button>
                  </div>
                  {usernameCheckStatus === 'available' && (
                    <span className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                      <Check size={12} /> Username available
                    </span>
                  )}
                  {usernameCheckStatus === 'taken' && (
                    <span className="text-[11px] text-rose-600 font-medium mt-1 flex items-center gap-1">
                      <X size={12} /> Already taken
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Re-Password
                  </label>
                  <input
                    type="password"
                    value={rePassword}
                    onChange={e => setRePassword(e.target.value)}
                    placeholder="Confirm Password"
                    className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 5. KYC DETAILS                                            */}
          {/* ========================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
            <div className="bg-brand-primary text-white px-5 py-2.5 flex items-center shadow-xs">
              <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                <span className="text-white/90 text-base font-serif">»</span>
                <span>KYC Details</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-brand-primary/10 text-brand-navy border-b border-slate-200 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-2.5 px-6 w-1/3">DOCUMENT NAME</th>
                    <th className="py-2.5 px-6">FILE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {kycDocs.map((doc, idx) => (
                    <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-6 font-semibold text-slate-800">
                        {doc.name}
                      </td>
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded border border-slate-300 shadow-2xs cursor-pointer transition-colors">
                            <Upload size={13} className="text-slate-500" />
                            <span>Choose File</span>
                            <input
                              type="file"
                              onChange={e => handleFileChange(idx, e)}
                              className="hidden"
                            />
                          </label>

                          <span className="text-xs text-slate-500">
                            {doc.fileName ? (
                              <span className="inline-flex items-center gap-1 text-slate-700 font-medium">
                                <FileText size={13} className="text-brand-primary" />
                                {doc.fileName}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveKycFile(idx)}
                                  className="text-slate-400 hover:text-rose-500 ml-1"
                                  title="Remove File"
                                >
                                  <X size={13} />
                                </button>
                              </span>
                            ) : (
                              'No file chosen'
                            )}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ========================================================= */}
          {/* BOTTOM BUTTONS: Save & Reset                              */}
          {/* ========================================================= */}
          <div className="flex items-center justify-center gap-3 pt-2 pb-6">
            <button
              type="submit"
              className="bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs px-10 py-2.5 rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-10 py-2.5 rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </form>
      ) : (
        /* ========================================================= */
        /* REGISTERED FRANCHISES LIST (TABLE VIEW)                  */
        /* ========================================================= */
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={tableSearch}
                onChange={e => setTableSearch(e.target.value)}
                placeholder="Search code, name, branch..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-primary"
              />
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Total {filteredFranchises.length} Registered Units
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-brand-primary text-white font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3">Franchise Code</th>
                  <th className="py-2.5 px-3">Franchise Name</th>
                  <th className="py-2.5 px-3">Branch Hub</th>
                  <th className="py-2.5 px-3">Contact</th>
                  <th className="py-2.5 px-3">Class / Type</th>
                  <th className="py-2.5 px-3">Bank Details</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                  <th className="py-2.5 px-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredFranchises.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-semibold text-brand-primary font-mono">{item.code}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{item.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.branch}</td>
                    <td className="py-2.5 px-3">
                      <div>{item.mobile}</div>
                      <div className="text-[11px] text-slate-400">{item.email}</div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div>{item.classType || 'Class 6'}</div>
                      <div className="text-[11px] text-slate-400">{item.franchiseType || 'Type 1'}</div>
                    </td>
                    <td className="py-2.5 px-3 text-[11px]">
                      <div>{item.bankName || '-'}</div>
                      <div className="text-slate-400 font-mono">{item.accountNo || '-'}</div>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        item.status === 'ACTIVE'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => {
                          setFirstName(item.firstName || item.name);
                          setLastName(item.lastName || '');
                          setMobile1(item.mobile);
                          setEmailId(item.email);
                          setFranchiseCode(item.code);
                          setBranch(item.branch);
                          setViewMode('form');
                          showToast(`Loaded ${item.code} into form.`);
                        }}
                        className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-blue-50 hover:bg-blue-100 rounded transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
