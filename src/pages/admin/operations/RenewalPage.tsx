import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Search, X, Download, ListFilter, CheckCircle, XCircle } from 'lucide-react';

type RenewalSubTab = 'renewalReport' | 'dashboard' | 'renewalPolicyReassign' | 'renewalStatus';

interface RenewalItem {
  id: number;
  financialYear: string;
  createdDate: string;
  registrationNo: string;
  insuranceCompany: string;
  customerName: string;
  totalPremium: number;
  expiryDate: string;
  followupDate: string;
  remark: 'FOLLOW UP' | 'CLOSE' | 'DONE' | 'LOST';
  executive: string;
  productType?: string;
  branch?: string;
}

interface ExecutiveSummary {
  id: number;
  name: string;
  total: number;
  pending: number;
  follow: number;
  done: number;
  lost: number;
}

interface CompanySummary {
  id: number;
  companyName: string;
  totalRenewal: number;
  comprehensive: number;
  stp: number;
  done: number;
}

export const RenewalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RenewalSubTab>('renewalReport');

  // Search States
  const [searchRegNo, setSearchRegNo] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const [searchAgentName, setSearchAgentName] = useState('');
  const [generalSearch, setGeneralSearch] = useState('');

  // Renewal Report Filters (Image 1)
  const [filterYear, setFilterYear] = useState('2026-2027');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterBranch, setFilterBranch] = useState('--ALL--');
  const [filterExecutive, setFilterExecutive] = useState('--ALL--');
  const [filterCompany, setFilterCompany] = useState('--ALL--');
  const [filterProductType, setFilterProductType] = useState('--ALL--');

  // Dashboard Filters (Image 2)
  const [dashMonth, setDashMonth] = useState('');
  const [dashFinYear, setDashFinYear] = useState('2025-2026');

  // Policy Reassign Filters (Image 4)
  const [reassignRadio, setReassignRadio] = useState<'prevExec' | 'currExec' | 'prevFran' | 'currFran'>('prevExec');
  const [prevExecutive, setPrevExecutive] = useState('');
  const [reassignMonth, setReassignMonth] = useState('');
  const [reassignYear, setReassignYear] = useState('');
  const [referenceType, setReferenceType] = useState('DIRECT');

  // Modal State
  const [showFollowUpModal, setShowFollowUpModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RenewalItem | null>(null);
  const [modalRemark, setModalRemark] = useState<'FOLLOW UP' | 'CLOSE' | 'DONE' | 'LOST'>('FOLLOW UP');
  const [modalFollowDate, setModalFollowDate] = useState('2026-10-15');
  const [modalNotes, setModalNotes] = useState('');

  // Selected Checkboxes for Reassign
  const [selectedReassignIds, setSelectedReassignIds] = useState<number[]>([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Renewal Details Sample Data (Image 5)
  const [renewalList, setRenewalList] = useState<RenewalItem[]>([
    {
      id: 1,
      remark: 'FOLLOW UP',
      financialYear: '2023-2024',
      createdDate: '09/01/2025 07:53:10',
      registrationNo: 'MH12HD6757',
      insuranceCompany: 'MAGMA HDI',
      customerName: 'SANTOSH RAVINDRA GAWALI',
      totalPremium: 51947,
      expiryDate: '15/01/2025',
      followupDate: '10/01/2025',
      executive: 'ARVIND DNYANESHWAR GAWADE',
      productType: 'PRIVATE CAR',
      branch: 'BARAMATI'
    },
    {
      id: 2,
      remark: 'FOLLOW UP',
      financialYear: '2024-2025',
      createdDate: '06/10/2025 15:45:21',
      registrationNo: 'MH48AY0541',
      insuranceCompany: 'RELIANCE',
      customerName: 'SHAM MANIK PATIL',
      totalPremium: 16844,
      expiryDate: '04/10/2025',
      followupDate: '06/10/2025',
      executive: 'ADITYA RAJENDRA SAPKAL',
      productType: 'TWO WHEELER',
      branch: 'PUNE'
    },
    {
      id: 3,
      remark: 'FOLLOW UP',
      financialYear: '2023-2024',
      createdDate: '15/04/2024 13:35:10',
      registrationNo: 'MH50S930',
      insuranceCompany: 'RELIANCE GENERAL INSURANCE CO. LTD',
      customerName: 'SHEKHAR DAGADU KADAM',
      totalPremium: 19568,
      expiryDate: '03/04/2024',
      followupDate: '01/04/2024',
      executive: 'AMOL RAMCHANDRA WANAVE',
      productType: 'COMMERCIAL VEHICLE',
      branch: 'BARAMATI'
    },
    {
      id: 4,
      remark: 'FOLLOW UP',
      financialYear: '2023-2024',
      createdDate: '12/04/2024 11:04:46',
      registrationNo: 'MH10DT7170_BOUNCE',
      insuranceCompany: 'RELIANCE GENERAL INSURANCE CO. LTD',
      customerName: 'SHEKHAR DAGADU KADAM',
      totalPremium: 69877,
      expiryDate: '03/04/2024',
      followupDate: '01/04/2024',
      executive: 'AVINASH BHARAT KORATKAR',
      productType: 'COMPREHENSIVE',
      branch: 'BARAMATI'
    },
    {
      id: 5,
      remark: 'FOLLOW UP',
      financialYear: '2023-2024',
      createdDate: '27/07/2024 14:42:17',
      registrationNo: 'MH10CR0109',
      insuranceCompany: 'TATA AIG',
      customerName: 'SHEKHAR DAGADU KADAM',
      totalPremium: 20524,
      expiryDate: '01/07/2024',
      followupDate: '27/07/2024',
      executive: 'HEMANT RAJU KAKULTE',
      productType: 'PRIVATE CAR',
      branch: 'PUNE'
    },
    {
      id: 6,
      remark: 'FOLLOW UP',
      financialYear: '2023-2024',
      createdDate: '27/07/2024 13:15:36',
      registrationNo: 'MH41AU7799',
      insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
      customerName: 'NILESH MAHESH BORSE',
      totalPremium: 47267,
      expiryDate: '01/07/2024',
      followupDate: '27/07/2024',
      executive: 'HEMANT ARUN PATIL',
      productType: 'COMPREHENSIVE',
      branch: 'BARAMATI'
    },
    {
      id: 7,
      remark: 'FOLLOW UP',
      financialYear: '2023-2024',
      createdDate: '21/09/2024 17:06:06',
      registrationNo: 'MH50L7119',
      insuranceCompany: 'TATA AIG',
      customerName: 'PRADIP DINKAR SHEWALE',
      totalPremium: 11032,
      expiryDate: '03/09/2024',
      followupDate: '21/09/2024',
      executive: 'PRADIP DINKAR SHEWALE',
      productType: 'TWO WHEELER',
      branch: 'AHILYANAGAR'
    },
    {
      id: 8,
      remark: 'FOLLOW UP',
      financialYear: '2024-2025',
      createdDate: '18/07/2025 18:59:20',
      registrationNo: 'MH14JR9333',
      insuranceCompany: 'ROYAL',
      customerName: 'SNEHAL SUNIL AGAWANE',
      totalPremium: 18910,
      expiryDate: '01/07/2025',
      followupDate: '18/07/2025',
      executive: 'ARVIND DNYANESHWAR GAWADE',
      productType: 'PRIVATE CAR',
      branch: 'BARAMATI'
    },
    {
      id: 9,
      remark: 'FOLLOW UP',
      financialYear: '2024-2025',
      createdDate: '12/07/2025 16:55:51',
      registrationNo: 'MH42AQ7075',
      insuranceCompany: 'TATA AIG',
      customerName: 'ARVIND DNYANESHWAR GAWADE',
      totalPremium: 19313,
      expiryDate: '11/07/2025',
      followupDate: '14/07/2025',
      executive: 'ARVIND DNYANESHWAR GAWADE',
      productType: 'COMPREHENSIVE',
      branch: 'BARAMATI'
    },
    {
      id: 10,
      remark: 'FOLLOW UP',
      financialYear: '2024-2025',
      createdDate: '12/07/2025 16:57:08',
      registrationNo: 'MH42AY0151',
      insuranceCompany: 'ROYAL',
      customerName: 'ARVIND DNYANESHWAR GAWADE',
      totalPremium: 36837,
      expiryDate: '09/07/2025',
      followupDate: '14/07/2025',
      executive: 'ARVIND DNYANESHWAR GAWADE',
      productType: 'PRIVATE CAR',
      branch: 'BARAMATI'
    },
    {
      id: 11,
      remark: 'FOLLOW UP',
      financialYear: '2024-2025',
      createdDate: '12/07/2025 16:58:04',
      registrationNo: 'MH12TV4563',
      insuranceCompany: 'RELIANCE',
      customerName: 'ARVIND DNYANESHWAR GAWADE',
      totalPremium: 41848,
      expiryDate: '11/07/2025',
      followupDate: '14/07/2025',
      executive: 'ARVIND DNYANESHWAR GAWADE',
      productType: 'COMPREHENSIVE',
      branch: 'BARAMATI'
    },
  ]);

  // Executive Summary Data (Image 2)
  const executiveSummaries: ExecutiveSummary[] = [
    { id: 1, name: 'ABHISHEK VILAS GAIKWAD', total: 1, pending: 1, follow: 0, done: 0, lost: 0 },
    { id: 2, name: 'ADITYA RAJENDRA SAPKAL', total: 52, pending: 52, follow: 0, done: 0, lost: 0 },
    { id: 3, name: 'ALFIYA SAJID KHAN', total: 2, pending: 2, follow: 0, done: 0, lost: 0 },
    { id: 4, name: 'AMOL RAMCHANDRA WANAVE', total: 12, pending: 9, follow: 0, done: 3, lost: 0 },
    { id: 5, name: 'ARVIND DNYANESHWAR GAWADE', total: 131, pending: 118, follow: 0, done: 13, lost: 0 },
    { id: 6, name: 'AVINASH BHARAT KORATKAR', total: 124, pending: 118, follow: 0, done: 6, lost: 0 },
    { id: 7, name: 'DEVENDRA NANA GODALKAR', total: 34, pending: 34, follow: 0, done: 0, lost: 0 },
    { id: 8, name: 'DIRECT EXECUTIVE', total: 2, pending: 2, follow: 0, done: 0, lost: 0 },
    { id: 9, name: 'HEMANT RAJU KAKULTE', total: 62, pending: 61, follow: 0, done: 1, lost: 0 },
    { id: 10, name: 'HEMANT ARUN PATIL', total: 148, pending: 148, follow: 0, done: 0, lost: 0 },
    { id: 11, name: 'KIRAN BABAN NIKAM', total: 3, pending: 3, follow: 0, done: 0, lost: 0 },
    { id: 12, name: 'KIRAN PANDURANG MALI', total: 7, pending: 7, follow: 0, done: 0, lost: 0 },
    { id: 13, name: 'KRUSHNA RAJU GAIKWAD', total: 3, pending: 3, follow: 0, done: 0, lost: 0 },
  ];

  // Company Summary Data (Image 2)
  const companySummaries: CompanySummary[] = [
    { id: 1, companyName: 'HDFC ERGO GENERAL INSURANCE CO. LTD', totalRenewal: 7, comprehensive: 6, stp: 0, done: 0 },
    { id: 2, companyName: 'INDUSIND GENERAL INSURANCE CO. LTD', totalRenewal: 177, comprehensive: 149, stp: 21, done: 0 },
    { id: 3, companyName: 'ROYAL SUNDARAMAA GENERAL INSURANCE CO. LIMITED', totalRenewal: 302, comprehensive: 193, stp: 108, done: 0 },
    { id: 4, companyName: 'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED', totalRenewal: 49, comprehensive: 35, stp: 6, done: 0 },
    { id: 5, companyName: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD', totalRenewal: 184, comprehensive: 179, stp: 5, done: 0 },
    { id: 6, companyName: 'TATA AIG GENERAL INSURANCE CO. LTD', totalRenewal: 683, comprehensive: 423, stp: 226, done: 0 },
    { id: 7, companyName: 'UNIVERSAL SOMPO GENERAL INSURANCE CO. LTD', totalRenewal: 196, comprehensive: 196, stp: 0, done: 0 },
    { id: 8, companyName: 'UNITED INDIA INSURANCE CO. LTD', totalRenewal: 5, comprehensive: 0, stp: 5, done: 0 },
  ];

  const subTabs: { id: RenewalSubTab; label: string }[] = [
    { id: 'renewalReport', label: 'Renewal Report' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'renewalPolicyReassign', label: 'Renewal Policy Reassign' },
    { id: 'renewalStatus', label: 'Renewal Status' }
  ];

  // Handlers for modal
  const handleOpenFollowUp = (item: RenewalItem, defaultRemark: 'FOLLOW UP' | 'CLOSE') => {
    setSelectedItem(item);
    setModalRemark(defaultRemark);
    setModalNotes('');
    setShowFollowUpModal(true);
  };

  const handleSaveFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      setRenewalList(prev => prev.map(r => r.id === selectedItem.id ? { ...r, remark: modalRemark, followupDate: modalFollowDate } : r));
    }
    setShowFollowUpModal(false);
  };

  // Filtered List
  const getFilteredList = () => {
    return renewalList.filter(item => {
      const matchReg = !searchRegNo || item.registrationNo.toLowerCase().includes(searchRegNo.toLowerCase());
      const matchProd = !searchProduct || (item.productType && item.productType.toLowerCase().includes(searchProduct.toLowerCase()));
      const matchAgent = !searchAgentName || item.executive.toLowerCase().includes(searchAgentName.toLowerCase());
      const matchGeneral = !generalSearch ||
        item.registrationNo.toLowerCase().includes(generalSearch.toLowerCase()) ||
        item.customerName.toLowerCase().includes(generalSearch.toLowerCase()) ||
        item.insuranceCompany.toLowerCase().includes(generalSearch.toLowerCase());

      const matchBranch = filterBranch === '--ALL--' || !filterBranch || item.branch === filterBranch;
      const matchCompany = filterCompany === '--ALL--' || !filterCompany || item.insuranceCompany.includes(filterCompany);

      return matchReg && matchProd && matchAgent && matchGeneral && matchBranch && matchCompany;
    });
  };

  const filteredData = getFilteredList();
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelectAllReassign = () => {
    if (selectedReassignIds.length === filteredData.length) {
      setSelectedReassignIds([]);
    } else {
      setSelectedReassignIds(filteredData.map(d => d.id));
    }
  };

  const toggleSelectReassign = (id: number) => {
    setSelectedReassignIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5">
      {/* Top Header */}
      <PageHeader
        title="Renewal Management"
        description="Monitor renewal reports, analytics dashboard, policy reassignments and follow-ups"
      />

      {/* Navigation Sub-Tabs Bar (Matching MyPage styling) */}
      <UnderlineTabs
        tabs={subTabs}
        activeTab={activeTab}
        onTabChange={(tabId) => { setActiveTab(tabId as RenewalSubTab); setCurrentPage(1); }}
      />

      {/* Main Container */}
      <div key={activeTab} className="tab-transition-wrapper w-full max-w-full">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full max-w-full">

          {/* ========================================================================= */}
          {/* SUB-TAB 1: RENEWAL REPORT (Image 1 & Image 5) */}
          {/* ========================================================================= */}
          {activeTab === 'renewalReport' && (
            <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
              {/* Renewal Report Filter Box (Matching MyPage Card Layout) */}
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between">
                  <span>» Renewal Report Filter</span>
                </div>

                <div className="p-6 space-y-4 bg-brand-mainbg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                      <select
                        value={filterYear}
                        onChange={(e) => setFilterYear(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="2026-2027">2026-2027</option>
                        <option value="2025-2026">2025-2026</option>
                        <option value="2024-2025">2024-2025</option>
                        <option value="2023-2024">2023-2024</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                      <select
                        value={filterMonth}
                        onChange={(e) => setFilterMonth(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Month Name--</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                      <input
                        type="text"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Branch</label>
                      <select
                        value={filterBranch}
                        onChange={(e) => setFilterBranch(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="--ALL--">--ALL--</option>
                        <option value="BARAMATI">BARAMATI</option>
                        <option value="PUNE">PUNE</option>
                        <option value="AHILYANAGAR">AHILYANAGAR</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Executive</label>
                      <select
                        value={filterExecutive}
                        onChange={(e) => setFilterExecutive(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="--ALL--">--ALL--</option>
                        <option value="ABHISHEK VILAS GAIKWAD">ABHISHEK VILAS GAIKWAD</option>
                        <option value="ARVIND DNYANESHWAR GAWADE">ARVIND DNYANESHWAR GAWADE</option>
                        <option value="ADITYA RAJENDRA SAPKAL">ADITYA RAJENDRA SAPKAL</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Insurance Company</label>
                      <select
                        value={filterCompany}
                        onChange={(e) => setFilterCompany(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="--ALL--">--ALL--</option>
                        <option value="MAGMA HDI">MAGMA HDI</option>
                        <option value="RELIANCE">RELIANCE</option>
                        <option value="TATA AIG">TATA AIG</option>
                        <option value="ROYAL">ROYAL SUNDARAM</option>
                        <option value="HDFC ERGO">HDFC ERGO</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Product Type</label>
                      <select
                        value={filterProductType}
                        onChange={(e) => setFilterProductType(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="--ALL--">--ALL--</option>
                        <option value="PRIVATE CAR">PRIVATE CAR</option>
                        <option value="TWO WHEELER">TWO WHEELER</option>
                        <option value="COMPREHENSIVE">COMPREHENSIVE</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none flex-1"
                      >
                        Show
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none flex-1"
                      >
                        Export
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Registration & Product Below Filter Box */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
                <input
                  type="text"
                  placeholder="Search Registration Number Here"
                  value={searchRegNo}
                  onChange={(e) => setSearchRegNo(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  type="text"
                  placeholder="Search Product Here"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              {/* Renewal Details Table (Matching MyPage List Table Styling) */}
              <div className="overflow-x-auto w-full border border-brand-border rounded-[12px]">
                <table className="w-full text-left border-collapse min-w-[1200px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                      <th className="py-3 px-4 text-center">ACTION 1</th>
                      <th className="py-3 px-4 text-center">ACTION 2</th>
                      <th className="py-3 px-6">REMARK</th>
                      <th className="py-3 px-6">FINANCIAL YEAR</th>
                      <th className="py-3 px-6">CREATED DATE</th>
                      <th className="py-3 px-6">REGISTRATION NO</th>
                      <th className="py-3 px-6">INSURANCE COMPANY</th>
                      <th className="py-3 px-6">NAME</th>
                      <th className="py-3 px-6 text-right">TOTAL PREMIUM</th>
                      <th className="py-3 px-6">EXPIRY DATE</th>
                      <th className="py-3 px-6">FOLLOWUP DATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[14px]">
                    {paginatedData.map((row) => (
                      <tr key={row.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                        <td className="py-2 px-4 text-center">
                          <button
                            onClick={() => handleOpenFollowUp(row, 'FOLLOW UP')}
                            className="px-2.5 py-1 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] text-xs font-bold transition cursor-pointer border-none uppercase"
                          >
                            FOLLOW UP
                          </button>
                        </td>
                        <td className="py-2 px-4 text-center">
                          <button
                            onClick={() => handleOpenFollowUp(row, 'CLOSE')}
                            className="px-2.5 py-1 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] text-xs font-bold transition cursor-pointer border-none uppercase"
                          >
                            CLOSE
                          </button>
                        </td>
                        <td className="py-2 px-6 font-semibold text-brand-navy">{row.remark}</td>
                        <td className="py-2 px-6 text-brand-navy">{row.financialYear}</td>
                        <td className="py-2 px-6 font-mono text-brand-muted">{row.createdDate}</td>
                        <td className="py-2 px-6 font-mono font-semibold text-brand-navy">{row.registrationNo}</td>
                        <td className="py-2 px-6 text-brand-navy font-medium">{row.insuranceCompany}</td>
                        <td className="py-2 px-6 font-semibold text-brand-navy">{row.customerName}</td>
                        <td className="py-2 px-6 text-right font-mono font-bold text-brand-navy">₹{row.totalPremium.toLocaleString()}</td>
                        <td className="py-2 px-6 font-mono text-brand-muted">{row.expiryDate}</td>
                        <td className="py-2 px-6 font-mono text-brand-muted">{row.followupDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Pagination (Matching MyPage Footer) */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <span>Records per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                <span className="text-xs text-slate-500 font-medium">
                  Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} records
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center text-xs text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40">&lt;</button>
                  <button className="w-8 h-8 bg-brand-primary text-white font-bold text-xs rounded-md">{currentPage}</button>
                  <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="w-8 h-8 flex items-center justify-center text-xs text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40">&gt;</button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 2: DASHBOARD (Image 2 & Image 3) */}
          {/* ========================================================================= */}
          {activeTab === 'dashboard' && (
            <div className="p-6 space-y-6">
              <h3 className="text-center font-bold text-lg text-brand-navy">Dashboard</h3>

              {/* 3 Summary Color Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Follow up card */}
                <div className="bg-[#D9534F] text-white rounded-lg p-4 shadow-sm flex flex-col justify-between h-32">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wide">Follow up</div>
                      <div className="text-3xl font-extrabold mt-1">1</div>
                    </div>
                    <div className="opacity-80">
                      <ListFilter size={44} />
                    </div>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex items-center justify-end text-xs font-semibold cursor-pointer hover:underline">
                    <span>View Details &gt;</span>
                  </div>
                </div>

                {/* Done card */}
                <div className="bg-[#337AB7] text-white rounded-lg p-4 shadow-sm flex flex-col justify-between h-32">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wide">Done</div>
                      <div className="text-3xl font-extrabold mt-1">0</div>
                    </div>
                    <div className="opacity-80">
                      <CheckCircle size={44} />
                    </div>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex items-center justify-end text-xs font-semibold cursor-pointer hover:underline">
                    <span>View Details &gt;</span>
                  </div>
                </div>

                {/* Lost card */}
                <div className="bg-[#FF9800] text-white rounded-lg p-4 shadow-sm flex flex-col justify-between h-32">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-wide">Lost</div>
                      <div className="text-3xl font-extrabold mt-1">0</div>
                    </div>
                    <div className="opacity-80">
                      <XCircle size={44} />
                    </div>
                  </div>
                  <div className="border-t border-white/20 pt-2 flex items-center justify-end text-xs font-semibold cursor-pointer hover:underline">
                    <span>View Details &gt;</span>
                  </div>
                </div>
              </div>

              {/* Filters Row */}
              <div className="flex flex-wrap items-center gap-4 bg-brand-mainbg p-4 border border-brand-border rounded-xl">
                <div className="w-full sm:w-64">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                  <select
                    value={dashMonth}
                    onChange={(e) => setDashMonth(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
                  >
                    <option value="">--Select Month Name--</option>
                    <option value="October">October</option>
                    <option value="November">November</option>
                  </select>
                </div>

                <div className="w-full sm:w-64">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Financial Year</label>
                  <select
                    value={dashFinYear}
                    onChange={(e) => setDashFinYear(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
                  >
                    <option value="2025-2026">2025-2026</option>
                    <option value="2024-2025">2024-2025</option>
                  </select>
                </div>

                <div className="sm:self-end">
                  <button type="button" className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-md border-none cursor-pointer">
                    view
                  </button>
                </div>
              </div>

              {/* 2 Side-by-side Tables (Matching MyPage list styling) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Table 1: Renewal Executive */}
                <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-xs">
                  <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 text-center font-bold text-[14px] uppercase border-b border-brand-border">
                    Renewal Executive
                  </div>
                  <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
                    <table className="w-full text-left border-collapse text-[14px]">
                      <thead>
                        <tr className="bg-slate-50 text-brand-navy border-b border-brand-border font-semibold uppercase">
                          <th className="py-2.5 px-3">EXCUTIVE NAME</th>
                          <th className="py-2.5 px-3 text-center">TOTAL</th>
                          <th className="py-2.5 px-3 text-center">PENDING</th>
                          <th className="py-2.5 px-3 text-center">FOLLOW</th>
                          <th className="py-2.5 px-3 text-center">DONE</th>
                          <th className="py-2.5 px-3 text-center">LOST</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border text-brand-navy">
                        {executiveSummaries.map((exec) => (
                          <tr key={exec.id} className="hover:bg-brand-mainbg h-[48px] bg-white">
                            <td className="py-2 px-3 font-semibold text-brand-navy">{exec.name}</td>
                            <td className="py-2 px-3 text-center font-bold">{exec.total}</td>
                            <td className="py-2 px-3 text-center text-brand-primary font-semibold">{exec.pending}</td>
                            <td className="py-2 px-3 text-center">{exec.follow}</td>
                            <td className="py-2 px-3 text-center">{exec.done}</td>
                            <td className="py-2 px-3 text-center">{exec.lost}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2: Renewal Company */}
                <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-xs">
                  <div className="bg-brand-lightbg text-brand-navy px-4 py-2.5 text-center font-bold text-[14px] uppercase border-b border-brand-border">
                    Renewal Company
                  </div>
                  <div className="overflow-x-auto max-h-[400px] custom-scrollbar">
                    <table className="w-full text-left border-collapse text-[14px]">
                      <thead>
                        <tr className="bg-slate-50 text-brand-navy border-b border-brand-border font-semibold uppercase">
                          <th className="py-2.5 px-3">INSURANCE COMPANY</th>
                          <th className="py-2.5 px-3 text-center">TOTAL RENEWAL</th>
                          <th className="py-2.5 px-3 text-center">COMPREHENSIVE</th>
                          <th className="py-2.5 px-3 text-center">STP</th>
                          <th className="py-2.5 px-3 text-center">DONE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border text-brand-navy">
                        {companySummaries.map((comp) => (
                          <tr key={comp.id} className="hover:bg-brand-mainbg h-[48px] bg-white">
                            <td className="py-2 px-3 font-semibold text-brand-navy">{comp.companyName}</td>
                            <td className="py-2 px-3 text-center font-bold">{comp.totalRenewal}</td>
                            <td className="py-2 px-3 text-center font-medium">{comp.comprehensive}</td>
                            <td className="py-2 px-3 text-center">{comp.stp}</td>
                            <td className="py-2 px-3 text-center">{comp.done}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 3: RENEWAL POLICY REASSIGN (Image 4) */}
          {/* ========================================================================= */}
          {activeTab === 'renewalPolicyReassign' && (
            <div className="p-6 space-y-6">
              {/* Filter Card */}
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border">
                  <span>» Renewal Policy Reassign To Executive</span>
                </div>

                <div className="p-6 space-y-5 bg-brand-mainbg">
                  {/* Radio Selection Row */}
                  <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-brand-navy">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="reassignTarget"
                        checked={reassignRadio === 'prevExec'}
                        onChange={() => setReassignRadio('prevExec')}
                        className="accent-brand-primary"
                      />
                      <span>Previous Executive</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="reassignTarget"
                        checked={reassignRadio === 'currExec'}
                        onChange={() => setReassignRadio('currExec')}
                        className="accent-brand-primary"
                      />
                      <span>Current Executive</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="reassignTarget"
                        checked={reassignRadio === 'prevFran'}
                        onChange={() => setReassignRadio('prevFran')}
                        className="accent-brand-primary"
                      />
                      <span>Previous Franchise</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="reassignTarget"
                        checked={reassignRadio === 'currFran'}
                        onChange={() => setReassignRadio('currFran')}
                        className="accent-brand-primary"
                      />
                      <span>Current Franchise</span>
                    </label>
                  </div>

                  {/* Dropdowns Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Previous Executive</label>
                      <select
                        value={prevExecutive}
                        onChange={(e) => setPrevExecutive(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
                      >
                        <option value="">--Select Previous Executive--</option>
                        <option value="ABHISHEK VILAS GAIKWAD">ABHISHEK VILAS GAIKWAD</option>
                        <option value="ARVIND DNYANESHWAR GAWADE">ARVIND DNYANESHWAR GAWADE</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Month</label>
                      <select
                        value={reassignMonth}
                        onChange={(e) => setReassignMonth(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
                      >
                        <option value="">--Select Month--</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Financial Year</label>
                      <select
                        value={reassignYear}
                        onChange={(e) => setReassignYear(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
                      >
                        <option value="">--Select Year--</option>
                        <option value="2025-2026">2025-2026</option>
                        <option value="2024-2025">2024-2025</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Reference Type <span className="text-red-500">*</span></label>
                      <select
                        value={referenceType}
                        onChange={(e) => setReferenceType(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
                      >
                        <option value="DIRECT">DIRECT</option>
                        <option value="POSP">POSP</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button type="button" className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-md border-none cursor-pointer">
                      View
                    </button>
                    <button type="button" className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs shadow-md border-none cursor-pointer">
                      Reset
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Controls Row: Submit & Search Agent Name */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Successfully reassigned ${selectedReassignIds.length} policy(ies)!`)}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs shadow-md cursor-pointer border-none"
                >
                  Submit
                </button>

                <input
                  type="text"
                  placeholder="Search Agent Name Here"
                  value={searchAgentName}
                  onChange={(e) => setSearchAgentName(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 bg-white placeholder-slate-400 focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              {/* Reassign Policy List Table (Matching MyPage List Table Styling) */}
              <div className="overflow-x-auto w-full border border-brand-border rounded-[12px]">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                      <th className="py-3 px-4 text-center w-12">
                        <input
                          type="checkbox"
                          checked={selectedReassignIds.length === filteredData.length && filteredData.length > 0}
                          onChange={toggleSelectAllReassign}
                          className="accent-brand-primary rounded"
                        />
                      </th>
                      <th className="py-3 px-6">REGISTRATION NO</th>
                      <th className="py-3 px-6">CUSTOMER NAME</th>
                      <th className="py-3 px-6">EXECUTIVE</th>
                      <th className="py-3 px-6">INSURANCE COMPANY</th>
                      <th className="py-3 px-6 text-right">TOTAL PREMIUM</th>
                      <th className="py-3 px-6">EXPIRY DATE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[14px]">
                    {paginatedData.map((row) => (
                      <tr key={row.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                        <td className="py-2 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedReassignIds.includes(row.id)}
                            onChange={() => toggleSelectReassign(row.id)}
                            className="accent-brand-primary rounded"
                          />
                        </td>
                        <td className="py-2 px-6 font-mono font-bold text-brand-navy">{row.registrationNo}</td>
                        <td className="py-2 px-6 font-semibold text-brand-navy">{row.customerName}</td>
                        <td className="py-2 px-6 text-brand-navy">{row.executive}</td>
                        <td className="py-2 px-6 text-brand-navy">{row.insuranceCompany}</td>
                        <td className="py-2 px-6 text-right font-mono font-bold text-brand-navy">₹{row.totalPremium.toLocaleString()}</td>
                        <td className="py-2 px-6 font-mono text-brand-muted">{row.expiryDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SUB-TAB 4: RENEWAL STATUS (Image 3) */}
          {/* ========================================================================= */}
          {activeTab === 'renewalStatus' && (
            <div className="p-6 space-y-6">
              <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
                <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border">
                  <span>Renewal Status</span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-brand-mainbg rounded-lg border border-brand-border">
                      <div className="text-xs font-semibold text-brand-muted uppercase">Total Tracked Renewals</div>
                      <div className="text-2xl font-bold text-brand-navy mt-1">{renewalList.length}</div>
                    </div>
                    <div className="p-4 bg-brand-mainbg rounded-lg border border-brand-border">
                      <div className="text-xs font-semibold text-brand-muted uppercase">Active Follow Ups</div>
                      <div className="text-2xl font-bold text-brand-primary mt-1">{renewalList.filter(r => r.remark === 'FOLLOW UP').length}</div>
                    </div>
                    <div className="p-4 bg-brand-mainbg rounded-lg border border-brand-border">
                      <div className="text-xs font-semibold text-brand-muted uppercase">Closed / Completed</div>
                      <div className="text-2xl font-bold text-emerald-600 mt-1">{renewalList.filter(r => r.remark !== 'FOLLOW UP').length}</div>
                    </div>
                  </div>

                  <div className="overflow-x-auto border border-brand-border rounded-[12px]">
                    <table className="w-full text-left border-collapse text-[14px]">
                      <thead>
                        <tr className="bg-brand-lightbg text-brand-navy font-semibold uppercase border-b border-brand-border">
                          <th className="py-3 px-6">REGISTRATION NO</th>
                          <th className="py-3 px-6">CUSTOMER NAME</th>
                          <th className="py-3 px-6">EXECUTIVE</th>
                          <th className="py-3 px-6">STATUS</th>
                          <th className="py-3 px-6">EXPIRY DATE</th>
                          <th className="py-3 px-6">FOLLOWUP DATE</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border text-brand-navy bg-white">
                        {renewalList.map((row) => (
                          <tr key={row.id} className="hover:bg-brand-mainbg h-[52px]">
                            <td className="py-2 px-6 font-mono font-bold text-brand-navy">{row.registrationNo}</td>
                            <td className="py-2 px-6 font-semibold text-brand-navy">{row.customerName}</td>
                            <td className="py-2 px-6 text-brand-muted">{row.executive}</td>
                            <td className="py-2 px-6">
                              <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                                row.remark === 'FOLLOW UP' ? 'bg-brand-lightbg text-brand-primary border border-brand-border' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {row.remark}
                              </span>
                            </td>
                            <td className="py-2 px-6 font-mono text-brand-muted">{row.expiryDate}</td>
                            <td className="py-2 px-6 font-mono text-brand-muted">{row.followupDate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* RENEWAL FOLLOW UP MODAL FORM (Matching MyPage Modal Styling) */}
      {showFollowUpModal && selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-brand-navy text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
              <h2 className="text-base sm:text-lg font-bold">» Renewal Follow Up Form</h2>
              <button onClick={() => setShowFollowUpModal(false)} className="text-white/80 hover:text-white transition-colors cursor-pointer border-none bg-transparent">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveFollowUp} className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-65px)]">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Registration No</label>
                <input type="text" readOnly value={selectedItem.registrationNo} className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs font-mono font-bold text-slate-800" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
                <input type="text" readOnly value={selectedItem.customerName} className="w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg text-xs font-semibold text-slate-800" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Remark Status</label>
                  <select
                    value={modalRemark}
                    onChange={(e) => setModalRemark(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
                  >
                    <option value="FOLLOW UP">FOLLOW UP</option>
                    <option value="CLOSE">CLOSE</option>
                    <option value="DONE">DONE</option>
                    <option value="LOST">LOST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Next Followup Date</label>
                  <input
                    type="date"
                    value={modalFollowDate}
                    onChange={(e) => setModalFollowDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Remarks / Call Notes</label>
                <textarea
                  rows={3}
                  placeholder="Enter renewal discussion notes..."
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800 bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowFollowUpModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md cursor-pointer border-none"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenewalPage;
