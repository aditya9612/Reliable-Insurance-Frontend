import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Search, Edit2, Trash2, Download, X, AlertCircle } from 'lucide-react';

type RenewalSubTab = 'renewalReport' | 'dashboard' | 'renewalPolicyReassign' | 'renewFollowUpPolicy';

interface RenewalReportRow {
  id: number;
  policyNo: string;
  customerName: string;
  expiryDate: string;
  vehicleNo: string;
  grossPremium: number;
  companyName: string;
  agentName: string;
  status: 'Due Soon' | 'Expired' | 'Renewed';
}

export const RenewalPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<RenewalSubTab>('renewalReport');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Filters — Renewal Report (Image 2)
  const [companyFilter, setCompanyFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('October');
  const [yearFilter, setYearFilter] = useState('2026');

  // Renewal Policy Reassign state
  const [reassignAgent, setReassignAgent] = useState('');
  const [reassignBranch, setReassignBranch] = useState('');

  // Follow Up State
  const [followUpRemarks, setFollowUpRemarks] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState('2026-10-15');

  // Sample Data: Renewal Policies
  const [renewalData, setRenewalData] = useState<RenewalReportRow[]>([
    {
      id: 1,
      policyNo: 'POL-REN-1001',
      customerName: 'JYOTI CHANDRAKANT SONAWANE',
      expiryDate: '15/10/2026',
      vehicleNo: 'MH-12-PQ-9988',
      grossPremium: 18500,
      companyName: 'HDFC ERGO General Insurance',
      agentName: 'AMIN PATHAN',
      status: 'Due Soon'
    },
    {
      id: 2,
      policyNo: 'POL-REN-1002',
      customerName: 'KIRAN PANDURANG MALI',
      expiryDate: '10/10/2026',
      vehicleNo: 'MH-42-RS-7766',
      grossPremium: 24000,
      companyName: 'ICICI Lombard General Insurance',
      agentName: 'RAHUL SHARMA',
      status: 'Due Soon'
    },
    {
      id: 3,
      policyNo: 'POL-REN-1003',
      customerName: 'PRADIP DINKAR SHEWALE',
      expiryDate: '01/10/2026',
      vehicleNo: 'MH-14-XY-5544',
      grossPremium: 32000,
      companyName: 'Bajaj Allianz General Insurance',
      agentName: 'SANJAY PATIL',
      status: 'Expired'
    },
    {
      id: 4,
      policyNo: 'POL-REN-1004',
      customerName: 'ARVIND DNYANESHWAR GAWADE',
      expiryDate: '05/10/2026',
      vehicleNo: 'MH-09-AB-1122',
      grossPremium: 14500,
      companyName: 'TATA AIG General Insurance',
      agentName: 'KIRAN MALI',
      status: 'Renewed'
    }
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const tabsList: { key: RenewalSubTab; label: string }[] = [
    { key: 'renewalReport', label: 'Renewal Report' },
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'renewalPolicyReassign', label: 'Renewal Policy Reassign' },
    { key: 'renewFollowUpPolicy', label: 'Renew Follow up Policy' }
  ];

  const filteredData = renewalData.filter(
    item =>
      item.policyNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vehicleNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col space-y-5 font-sans">
      {/* Page Header */}
      <PageHeader
        title="Renewal Management"
        description="Monitor policy renewal reports, dashboard metrics, agent reassignments and client follow-ups"
      />

      {/* Sub-Tabs Navigation */}
      <UnderlineTabs
        tabs={tabsList.map(tab => ({ id: tab.key, label: tab.label }))}
        activeTab={activeTab}
        onTabChange={(tabId) => { setActiveTab(tabId as RenewalSubTab); setCurrentPage(1); setSearchQuery(''); }}
      />

      {/* Main Content Card Container */}
      <div key={activeTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

          {/* TAB 1: RENEWAL REPORT */}
          {activeTab === 'renewalReport' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg flex items-center justify-between shadow-xs">
                <span>» Renewal Report Filter</span>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-4 py-1.5 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded text-xs font-bold transition shadow-sm cursor-pointer border-none flex items-center gap-1.5"
                >
                  <span>Create Renewal Modal</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Insurance Company</label>
                  <select
                    value={companyFilter}
                    onChange={(e) => setCompanyFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Company--</option>
                    <option value="HDFC ERGO">HDFC ERGO General Insurance</option>
                    <option value="ICICI Lombard">ICICI Lombard General Insurance</option>
                    <option value="Bajaj Allianz">Bajaj Allianz General Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Renewal Month</label>
                  <select
                    value={monthFilter}
                    onChange={(e) => setMonthFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="October">October</option>
                    <option value="November">November</option>
                    <option value="December">December</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none flex-1">
                    view
                  </button>
                  <button className="px-6 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none flex-1">
                    Export
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="p-6 space-y-6">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg shadow-xs">
                <span>» Renewal Analytics Summary</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-center">
                  <div className="text-xs font-bold text-blue-600 uppercase">Total Due Renewals</div>
                  <div className="text-2xl font-extrabold text-blue-900 mt-1">128</div>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-center">
                  <div className="text-xs font-bold text-amber-600 uppercase">Pending Follow-ups</div>
                  <div className="text-2xl font-extrabold text-amber-900 mt-1">42</div>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-center">
                  <div className="text-xs font-bold text-emerald-600 uppercase">Successfully Renewed</div>
                  <div className="text-2xl font-extrabold text-emerald-900 mt-1">76</div>
                </div>
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-center">
                  <div className="text-xs font-bold text-rose-600 uppercase">Expired Policies</div>
                  <div className="text-2xl font-extrabold text-rose-900 mt-1">10</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: RENEWAL POLICY REASSIGN */}
          {activeTab === 'renewalPolicyReassign' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg shadow-xs">
                <span>» Reassign Policy Agent & Branch</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Agent Name</label>
                  <select
                    value={reassignAgent}
                    onChange={(e) => setReassignAgent(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select New Agent--</option>
                    <option value="AMIN PATHAN">AMIN PATHAN</option>
                    <option value="RAHUL SHARMA">RAHUL SHARMA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Branch</label>
                  <select
                    value={reassignBranch}
                    onChange={(e) => setReassignBranch(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-[#0869D8]"
                  >
                    <option value="">--Select Branch--</option>
                    <option value="BARAMATI">BARAMATI</option>
                    <option value="PUNE">PUNE</option>
                  </select>
                </div>

                <div>
                  <button className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    Reassign Selected Policies
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RENEW FOLLOW UP POLICY */}
          {activeTab === 'renewFollowUpPolicy' && (
            <div className="p-5 border-b border-slate-200 space-y-4">
              <div className="bg-slate-50 text-slate-800 border border-slate-200 px-5 py-2.5 font-semibold text-sm rounded-lg shadow-xs">
                <span>» Log Policy Renewal Follow-up Remarks</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Next Follow-up Date</label>
                  <input
                    type="date"
                    value={nextFollowUpDate}
                    onChange={(e) => setNextFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Follow-up Remarks</label>
                  <input
                    type="text"
                    placeholder="Enter customer response or call notes"
                    value={followUpRemarks}
                    onChange={(e) => setFollowUpRemarks(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0869D8]"
                  />
                </div>

                <div>
                  <button className="px-8 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition cursor-pointer border-none">
                    Save Follow-up Entry
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table Search Toolbar */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search Renewals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <button className="px-5 py-2 bg-[#ff9800] hover:bg-[#fb8c00] text-white font-semibold text-xs rounded-lg shadow-sm transition cursor-pointer border-none flex items-center gap-1.5">
                <Download size={14} />
                <span>Export Grid</span>
              </button>
            </div>
          </div>

          {/* TABLES VIEW */}
          <div className="overflow-x-auto w-full custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-[#00a896] text-white text-[13px] font-semibold uppercase">
                  <th className="py-3 px-4">POLICY NO</th>
                  <th className="py-3 px-4">CUSTOMER NAME</th>
                  <th className="py-3 px-4">EXPIRY DATE</th>
                  <th className="py-3 px-4">VEHICLE NO</th>
                  <th className="py-3 px-4">COMPANY</th>
                  <th className="py-3 px-4">AGENT</th>
                  <th className="py-3 px-4 text-right">PREMIUM (₹)</th>
                  <th className="py-3 px-4 text-center">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[13px]">
                {filteredData.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 h-[48px] transition-colors bg-white">
                    <td className="py-2.5 px-4 font-mono font-bold text-slate-800">{row.policyNo}</td>
                    <td className="py-2.5 px-4 font-semibold text-slate-800 uppercase">{row.customerName}</td>
                    <td className="py-2.5 px-4 font-mono text-slate-700">{row.expiryDate}</td>
                    <td className="py-2.5 px-4 font-mono text-slate-800 font-bold">{row.vehicleNo}</td>
                    <td className="py-2.5 px-4 text-slate-700">{row.companyName}</td>
                    <td className="py-2.5 px-4 text-slate-700">{row.agentName}</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-800">₹{row.grossPremium.toLocaleString()}</td>
                    <td className="py-2.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold inline-block ${
                        row.status === 'Due Soon' ? 'bg-amber-100 text-amber-700' :
                        row.status === 'Renewed' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-right flex items-center justify-end gap-3 text-blue-600">
                      <button onClick={() => setShowModal(true)} className="p-1 hover:bg-slate-100 rounded text-blue-600 border-none bg-transparent cursor-pointer">
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setRenewalData(prev => prev.filter(r => r.id !== row.id))}
                        className="p-1 hover:bg-red-50 text-red-600 rounded border-none bg-transparent cursor-pointer flex items-center gap-1 text-xs font-semibold"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* POPUP FORM MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-xl my-auto overflow-hidden">
            <div className="bg-[#12284A] px-6 py-4 text-white flex justify-between items-center">
              <h3 className="font-bold text-base">» Renewal Entry Modal Form</h3>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white border-none bg-transparent cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Policy Number</label>
                <input type="text" placeholder="Enter Policy Number" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Name</label>
                <input type="text" placeholder="Enter Customer Name" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100">
                  Cancel
                </button>
                <button onClick={() => setShowModal(false)} className="px-6 py-2 bg-[#0869D8] hover:bg-[#0654B0] text-white rounded-lg text-xs font-semibold border-none">
                  Save Renewal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenewalPage;
