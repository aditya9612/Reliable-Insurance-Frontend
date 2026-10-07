import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Search, Edit2, X, Download } from 'lucide-react';

type ClaimMainTab = 'claimReport' | 'claimRequest';
type ClaimStatusFilter = 'open' | 'closed';

interface DetailedClaimRow {
  id: number;
  claimNumber: string;
  insuranceCompany: string;
  claimsDate: string;
  registrationNo: string;
  dateOfAccident: string;
  dateOfTime: string;
  claimSpot: string;
  driverName: string;
  driverLicense: string;
  reason: string;
  garageName: string;
  garageAddress: string;
  garageContactNo: string;
  empName: string;
  agentName: string;
  status: 'Open' | 'Closed';
}

export const ClaimPage: React.FC = () => {
  // Main Sub-Tabs (Dropdown Options in Navigation Navbar)
  const [activeMainTab, setActiveMainTab] = useState<ClaimMainTab>('claimReport');
  
  // Status filter for Claim Report (Open vs Closed)
  const [reportFilterStatus, setReportFilterStatus] = useState<ClaimStatusFilter>('open');

  // Status filter for Claim Request (Open vs Closed)
  const [requestFilterStatus, setRequestFilterStatus] = useState<ClaimStatusFilter>('open');

  // Search & Modal Popup
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingRow, setEditingRow] = useState<DetailedClaimRow | null>(null);

  // Form Fields for Image 4 Modal Form (»Claim Details)
  const [formDate, setFormDate] = useState('07/10/2026');
  const [formCompany, setFormCompany] = useState('');
  const [formRegNo, setFormRegNo] = useState('');
  const [formCustName, setFormCustName] = useState('');
  const [formCustMobNo, setFormCustMobNo] = useState('');
  const [formAccidentDate, setFormAccidentDate] = useState('');
  const [formAccidentTime, setFormAccidentTime] = useState('');
  const [formClaimSpot, setFormClaimSpot] = useState('');
  const [formDriverName, setFormDriverName] = useState('');
  const [formDriverLicense, setFormDriverLicense] = useState('');
  const [formReason, setFormReason] = useState('');
  const [formGarageName, setFormGarageName] = useState('');
  const [formGarageAddress, setFormGarageAddress] = useState('');
  const [formGarageContact, setFormGarageContact] = useState('');
  const [formReferenceType, setFormReferenceType] = useState('DIRECT');
  const [formSalesEmp, setFormSalesEmp] = useState('');
  const [claimSettle, setClaimSettle] = useState<'Yes' | 'No'>('No');
  const [spotSettle, setSpotSettle] = useState<'Yes' | 'No'>('No');
  const [fileClose, setFileClose] = useState<'Yes' | 'No'>('No');
  const [formRemark, setFormRemark] = useState('');

  // Sample Claims Data
  const [claimsData, setClaimsData] = useState<DetailedClaimRow[]>([
    {
      id: 201,
      claimNumber: '',
      insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
      claimsDate: '07/04/2025',
      registrationNo: 'MH42AR5600',
      dateOfAccident: '14/03/2025',
      dateOfTime: '4.43',
      claimSpot: 'Bhigvan',
      driverName: 'yadav',
      driverLicense: 'na',
      reason: 'IV dashed with another vehicle',
      garageName: 'Exle Motors, Baramati',
      garageAddress: 'Baramati',
      garageContactNo: 'na',
      empName: 'ABHISHEK VILAS GAIKWAD',
      agentName: '-',
      status: 'Open'
    },
    {
      id: 200,
      claimNumber: '',
      insuranceCompany: 'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED',
      claimsDate: '07/04/2025',
      registrationNo: 'MH11DD4033',
      dateOfAccident: '14/03/2025',
      dateOfTime: '10.38',
      claimSpot: 'Goa',
      driverName: 'na',
      driverLicense: 'na',
      reason: 'Dashed with frontal vehicle',
      garageName: 'Satara',
      garageAddress: 'Satara',
      garageContactNo: 'na',
      empName: 'VAIBHAV RAMCHANDRA SONMALE',
      agentName: 'RAEE',
      status: 'Open'
    },
    {
      id: 199,
      claimNumber: '3379455721',
      insuranceCompany: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
      claimsDate: '01/04/2025',
      registrationNo: 'MH50N2793',
      dateOfAccident: '04/03/2025',
      dateOfTime: '0300',
      claimSpot: 'Karad',
      driverName: 'Self',
      driverLicense: 'NA',
      reason: 'Dashed',
      garageName: 'Karad',
      garageAddress: 'Karad',
      garageContactNo: 'na',
      empName: 'SHEKHAR DAGADU KADAM',
      agentName: '-',
      status: 'Closed'
    },
    {
      id: 198,
      claimNumber: 'C1254103119056',
      insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
      claimsDate: '01/04/2025',
      registrationNo: 'MH27BX7454',
      dateOfAccident: '15/03/2025',
      dateOfTime: '0200',
      claimSpot: 'Amravati',
      driverName: 'Dipak Ghugare',
      driverLicense: 'MH2720100005509',
      reason: 'Dashed with another vehicle',
      garageName: 'Jayka Motors',
      garageAddress: 'Nagpur',
      garageContactNo: '788020776',
      empName: 'NILESH BHAGWANRAO RAUT',
      agentName: '-',
      status: 'Closed'
    },
    {
      id: 197,
      claimNumber: '3379464026',
      insuranceCompany: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
      claimsDate: '02/04/2025',
      registrationNo: 'MH11DD8528',
      dateOfAccident: '24/03/2025',
      dateOfTime: '8.30',
      claimSpot: 'na',
      driverName: 'Pradeep Kale',
      driverLicense: 'MH11202200012504',
      reason: 'NA',
      garageName: 'Jay Motors',
      garageAddress: 'Satara',
      garageContactNo: 'na',
      empName: 'VAIBHAV RAMCHANDRA SONMALE',
      agentName: '-',
      status: 'Open'
    }
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const resetForm = () => {
    setFormDate('07/10/2026');
    setFormCompany('');
    setFormRegNo('');
    setFormCustName('');
    setFormCustMobNo('');
    setFormAccidentDate('');
    setFormAccidentTime('');
    setFormClaimSpot('');
    setFormDriverName('');
    setFormDriverLicense('');
    setFormReason('');
    setFormGarageName('');
    setFormGarageAddress('');
    setFormGarageContact('');
    setFormReferenceType('DIRECT');
    setFormSalesEmp('');
    setClaimSettle('No');
    setSpotSettle('No');
    setFileClose('No');
    setFormRemark('');
    setEditingRow(null);
  };

  const handleSaveClaimDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: DetailedClaimRow = {
      id: claimsData.length > 0 ? Math.max(...claimsData.map(c => c.id)) + 1 : 202,
      claimNumber: '',
      insuranceCompany: formCompany.toUpperCase() || 'TATA AIG GENERAL INSURANCE CO. LTD',
      claimsDate: formDate || '07/10/2026',
      registrationNo: formRegNo.toUpperCase() || 'MH12AB1234',
      dateOfAccident: formAccidentDate || '01/10/2026',
      dateOfTime: formAccidentTime || '12.00',
      claimSpot: formClaimSpot || 'Baramati',
      driverName: formDriverName || 'na',
      driverLicense: formDriverLicense || 'na',
      reason: formReason || 'Dashed',
      garageName: formGarageName || 'Local Garage',
      garageAddress: formGarageAddress || 'Baramati',
      garageContactNo: formGarageContact || 'na',
      empName: formCustName.toUpperCase() || 'ADMIN USER',
      agentName: '-',
      status: fileClose === 'Yes' ? 'Closed' : 'Open'
    };

    setClaimsData([newEntry, ...claimsData]);
    setShowModal(false);
    resetForm();
    alert('Claim Details saved successfully!');
  };

  // Filtered Claims depending on current Active Main Tab & Filter Status
  const getFilteredClaims = () => {
    const currentStatus = activeMainTab === 'claimReport' ? reportFilterStatus : requestFilterStatus;
    return claimsData.filter(item => {
      const matchesSearch =
        item.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.insuranceCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.registrationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.empName.toLowerCase().includes(searchQuery.toLowerCase());

      if (currentStatus === 'closed') {
        return matchesSearch && item.status === 'Closed';
      }
      return matchesSearch && item.status === 'Open';
    });
  };

  const filteredClaims = getFilteredClaims();

  return (
    <div className="w-full flex flex-col space-y-5 font-sans">
      {/* Page Header */}
      <PageHeader
        title="Claim Management"
        description="View and manage claim reports, open claims, closed claims and new claim requests"
      />

      {/* Underline Sub-Tabs (Navigation Header Navbar Dropdown) */}
      <UnderlineTabs
        tabs={[
          { id: 'claimReport', label: 'Claim Report' },
          { id: 'claimRequest', label: 'Claim Request' }
        ]}
        activeTab={activeMainTab}
        onTabChange={(tabId) => {
          setActiveMainTab(tabId as ClaimMainTab);
          setCurrentPage(1);
          setSearchQuery('');
        }}
      />

      {/* Main Content Card Container (MyPage styling) */}
      <div key={activeMainTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

          {/* TAB 1: CLAIM REPORT (IMAGE 2 — ONLY 2 BUTTONS: Closed Claim & Open Claim) */}
          {activeMainTab === 'claimReport' && (
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setReportFilterStatus('closed')}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border-none shadow-xs ${
                    reportFilterStatus === 'closed'
                      ? 'bg-[#0869D8] text-white'
                      : 'bg-white text-[#0869D8] border border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  Closed Claim
                </button>
                <button
                  onClick={() => setReportFilterStatus('open')}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border-none shadow-xs ${
                    reportFilterStatus === 'open'
                      ? 'bg-[#E54D42] text-white'
                      : 'bg-white text-[#E54D42] border border-red-300 hover:bg-red-50'
                  }`}
                >
                  Open Claim
                </button>
              </div>

              {/* Search & Export Toolbar */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search Claim Report..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                  />
                </div>
                <button className="px-4 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-xs rounded-lg shadow-xs transition cursor-pointer border-none flex items-center gap-1.5 shrink-0">
                  <Download size={14} />
                  <span>Export Grid</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CLAIM REQUEST (IMAGE 3 — 3 BUTTONS: Claim, Closed Claim, New Entry) */}
          {activeMainTab === 'claimRequest' && (
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setRequestFilterStatus('open')}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border-none shadow-xs ${
                    requestFilterStatus === 'open'
                      ? 'bg-[#0869D8] text-white'
                      : 'bg-white text-[#0869D8] border border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  Claim
                </button>

                <button
                  onClick={() => setRequestFilterStatus('closed')}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition cursor-pointer border-none shadow-xs ${
                    requestFilterStatus === 'closed'
                      ? 'bg-[#E54D42] text-white'
                      : 'bg-white text-[#E54D42] border border-red-300 hover:bg-red-50'
                  }`}
                >
                  Closed Claim
                </button>

                {/* Clicking New Entry Opens IMAGE 4 Form Modal */}
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(true);
                  }}
                  className="px-5 py-2 bg-[#E54D42] hover:bg-[#D03C31] text-white font-semibold text-xs rounded-lg shadow-xs transition cursor-pointer border-none"
                >
                  New Entry
                </button>
              </div>

              {/* Search & Export Toolbar */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search Claim Request..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#00a896] focus:border-transparent transition-all"
                  />
                </div>
                <button className="px-4 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-xs rounded-lg shadow-xs transition cursor-pointer border-none flex items-center gap-1.5 shrink-0">
                  <Download size={14} />
                  <span>Export Grid</span>
                </button>
              </div>
            </div>
          )}

          {/* GRID TABLE VIEW (MyPage light blue header bg-brand-lightbg & navy text-brand-navy) */}
          <div className="overflow-x-auto w-full custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1600px]">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                  <th className="py-3 px-3 text-center w-10">#</th>
                  <th className="py-3 px-3">View Images</th>
                  <th className="py-3 px-3">ID</th>
                  <th className="py-3 px-3">Claim Number</th>
                  <th className="py-3 px-3 min-w-[220px]">Insurance Company</th>
                  <th className="py-3 px-3">Claims Date</th>
                  <th className="py-3 px-3">Registration No</th>
                  <th className="py-3 px-3">Date Of Accident</th>
                  <th className="py-3 px-3">Date Of Time</th>
                  <th className="py-3 px-3">Claim Spot</th>
                  <th className="py-3 px-3">Driver Name</th>
                  <th className="py-3 px-3">Driver License</th>
                  <th className="py-3 px-3 min-w-[180px]">Reason</th>
                  <th className="py-3 px-3">Garage Name</th>
                  <th className="py-3 px-3">Garage Address</th>
                  <th className="py-3 px-3">Garage contact No</th>
                  <th className="py-3 px-3">EmpName</th>
                  <th className="py-3 px-3">AgentName</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-[13px] text-slate-700">
                {filteredClaims.length > 0 ? (
                  filteredClaims.map((row) => (
                    <tr key={row.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => {
                            setEditingRow(row);
                            setFormCompany(row.insuranceCompany);
                            setFormRegNo(row.registrationNo);
                            setShowModal(true);
                          }}
                          className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                          title="Edit Claim"
                        >
                          <Edit2 size={15} strokeWidth={1.5} />
                        </button>
                      </td>

                      <td className="py-2.5 px-3">
                        <button className="text-[#0869D8] font-bold hover:underline border-none bg-transparent cursor-pointer flex items-center gap-1">
                          <span>View Images</span>
                        </button>
                      </td>

                      <td className="py-2.5 px-3 font-semibold text-slate-800">{row.id}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-800">{row.claimNumber || '-'}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#12284A] uppercase">{row.insuranceCompany}</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono">{row.claimsDate}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-800">{row.registrationNo}</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono">{row.dateOfAccident}</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono">{row.dateOfTime}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.claimSpot}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.driverName}</td>
                      <td className="py-2.5 px-3 text-slate-700 font-mono">{row.driverLicense}</td>
                      <td className="py-2.5 px-3 text-slate-700 leading-snug">{row.reason}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.garageName}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.garageAddress}</td>
                      <td className="py-2.5 px-3 text-slate-700 font-mono">{row.garageContactNo}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800 uppercase">{row.empName}</td>
                      <td className="py-2.5 px-3 text-slate-700">{row.agentName}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={18} className="py-8 text-center text-brand-muted font-semibold uppercase bg-brand-mainbg">
                      NO DATA FOUND
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Pagination */}
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <div>Showing {filteredClaims.length} records</div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 border border-slate-300 rounded-lg disabled:opacity-50 cursor-pointer hover:bg-slate-50"
              >
                Previous
              </button>
              <button className="px-3 py-1.5 bg-[#0869D8] text-white rounded-lg font-bold">1</button>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                disabled={currentPage >= Math.ceil(filteredClaims.length / itemsPerPage)}
                className="px-3 py-1.5 border border-slate-300 rounded-lg disabled:opacity-50 cursor-pointer hover:bg-slate-50"
              >
                Next
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* POPUP FORM MODAL (MyPage bg-brand-navy header) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-4xl my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header matching MyPage (Navy bg-brand-navy header) */}
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between shrink-0">
              <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                <span>» Claim Details</span>
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer border-none bg-transparent"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body: MyPage style input boxes */}
            <form onSubmit={handleSaveClaimDetails} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Date</label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Insurance Company Name</label>
                  <select
                    value={formCompany}
                    onChange={(e) => setFormCompany(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all bg-white"
                  >
                    <option value="">--Select Company--</option>
                    <option value="TATA AIG GENERAL INSURANCE CO. LTD">TATA AIG GENERAL INSURANCE CO. LTD</option>
                    <option value="ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED">ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED</option>
                    <option value="CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD">CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD</option>
                    <option value="MAGMA HDI GENERAL INSURANCE COMPANY LIMITED">MAGMA HDI GENERAL INSURANCE COMPANY LIMITED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Registration No</label>
                  <input
                    type="text"
                    placeholder="Enter Registration No"
                    value={formRegNo}
                    onChange={(e) => setFormRegNo(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Customer Name</label>
                  <input
                    type="text"
                    placeholder="Enter Customer Name"
                    value={formCustName}
                    onChange={(e) => setFormCustName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Cust MobNo.</label>
                  <input
                    type="text"
                    placeholder="Enter Mobile No"
                    value={formCustMobNo}
                    onChange={(e) => setFormCustMobNo(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">DateOfAccident</label>
                  <input
                    type="text"
                    placeholder="dd/MM/yyyy"
                    value={formAccidentDate}
                    onChange={(e) => setFormAccidentDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">DateOfTime</label>
                  <input
                    type="text"
                    placeholder="e.g. 4.43"
                    value={formAccidentTime}
                    onChange={(e) => setFormAccidentTime(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">ClaimSpot</label>
                  <input
                    type="text"
                    placeholder="Enter Spot"
                    value={formClaimSpot}
                    onChange={(e) => setFormClaimSpot(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">DriverName</label>
                  <input
                    type="text"
                    placeholder="Driver Name"
                    value={formDriverName}
                    onChange={(e) => setFormDriverName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">DriverLicense</label>
                  <input
                    type="text"
                    placeholder="Driver License"
                    value={formDriverLicense}
                    onChange={(e) => setFormDriverLicense(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Reason</label>
                  <input
                    type="text"
                    placeholder="Reason for claim"
                    value={formReason}
                    onChange={(e) => setFormReason(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">GarageName</label>
                  <input
                    type="text"
                    placeholder="Garage Name"
                    value={formGarageName}
                    onChange={(e) => setFormGarageName(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">GarageAddress</label>
                  <input
                    type="text"
                    placeholder="Garage Address"
                    value={formGarageAddress}
                    onChange={(e) => setFormGarageAddress(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">GaragecontactNo</label>
                  <input
                    type="text"
                    placeholder="Garage Contact"
                    value={formGarageContact}
                    onChange={(e) => setFormGarageContact(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Reference Type <span className="text-red-500">*</span></label>
                  <select
                    value={formReferenceType}
                    onChange={(e) => setFormReferenceType(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all bg-white"
                  >
                    <option value="DIRECT">DIRECT</option>
                    <option value="AGENT">AGENT</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Sales Executive</label>
                  <select
                    value={formSalesEmp}
                    onChange={(e) => setFormSalesEmp(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all bg-white"
                  >
                    <option value="">--Select Emp Name--</option>
                    <option value="ABHISHEK VILAS GAIKWAD">ABHISHEK VILAS GAIKWAD</option>
                    <option value="VAIBHAV RAMCHANDRA SONMALE">VAIBHAV RAMCHANDRA SONMALE</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 justify-center">
                  <div className="flex items-center gap-2">
                    <input type="file" className="text-xs text-slate-600" />
                  </div>
                  <button type="button" className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-semibold rounded-lg w-fit mt-1 cursor-pointer">
                    Add New Image
                  </button>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
                  <span>Claim Settle</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="claimSettleModal" checked={claimSettle === 'Yes'} onChange={() => setClaimSettle('Yes')} className="text-[#0869D8] focus:ring-[#0869D8]" />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="claimSettleModal" checked={claimSettle === 'No'} onChange={() => setClaimSettle('No')} className="text-[#0869D8] focus:ring-[#0869D8]" />
                    <span>No</span>
                  </label>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
                  <span>Spot</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="spotSettleModal" checked={spotSettle === 'Yes'} onChange={() => setSpotSettle('Yes')} className="text-[#0869D8] focus:ring-[#0869D8]" />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="spotSettleModal" checked={spotSettle === 'No'} onChange={() => setSpotSettle('No')} className="text-[#0869D8] focus:ring-[#0869D8]" />
                    <span>No</span>
                  </label>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-700">
                  <span>File Close</span>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="fileCloseModal" checked={fileClose === 'Yes'} onChange={() => setFileClose('Yes')} className="text-[#0869D8] focus:ring-[#0869D8]" />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="fileCloseModal" checked={fileClose === 'No'} onChange={() => setFileClose('No')} className="text-[#0869D8] focus:ring-[#0869D8]" />
                    <span>No</span>
                  </label>
                </div>

                <div className="sm:col-span-2 md:col-span-3">
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Remark</label>
                  <input
                    type="text"
                    value={formRemark}
                    onChange={(e) => setFormRemark(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0869D8] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Modal Buttons (Matching MyPage / PolicyMaster) */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-xs rounded-lg shadow-sm transition-all cursor-pointer border-none"
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

export default ClaimPage;
