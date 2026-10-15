import React, { useState, useMemo } from 'react';
import { Search, Download, X, Eye, CheckCircle2, Clock } from 'lucide-react';

export interface PremiumCashApprovalRecord {
  id: number;
  transId: string;
  pendingFrom: string;
  transDate: string;
  registrationNo: string;
  premium: number;
  agentName: string;
  insuranceCompany: string;
  productType: string;
  policyMode: 'CONTINUE' | 'BREAKING';
  paymentMode: 'CASH' | 'ONLINE TO RELIABLE' | 'CHEQUE';
  contactNo: string;
  paymentDetails1: string;
  paymentDetails2: string;
  empName: string;
  documentList: string;
  note: string;
  quotationCode: string;
  otherAgentName: string;
  operatorName: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export const PremiumCashApprovalReportTab: React.FC = () => {
  // Search input state matching screenshot: "Search Registration No Here"
  const [searchRegNo, setSearchRegNo] = useState('');

  // Initial records taken directly from both legacy ERP screenshots
  const [records, setRecords] = useState<PremiumCashApprovalRecord[]>([
    {
      id: 1,
      transId: '195389',
      pendingFrom: '0DAYS,18HOURS,37MINUTES,49SECONDS',
      transDate: '13/10/2026 18:13:36',
      registrationNo: 'MH12SX8095',
      premium: 57251,
      agentName: '-',
      insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
      productType: 'COMPREHENSIVE',
      policyMode: 'CONTINUE',
      paymentMode: 'CASH',
      contactNo: '8459892677',
      paymentDetails1: 'NA',
      paymentDetails2: 'NA',
      empName: 'SANTOSH PHULCHAND BANSODE',
      documentList: 'RC_Copy.pdf',
      note: 'ERP ENTRY',
      quotationCode: 'QS32195388',
      otherAgentName: 'DIRECT',
      operatorName: 'SANTOSH PHULCHAND BANSODE',
      status: 'Pending',
    },
    {
      id: 2,
      transId: '195324',
      pendingFrom: '0DAYS,20HOURS,55MINUTES,0SECONDS',
      transDate: '13/10/2026 15:56:25',
      registrationNo: 'MH12TS4841',
      premium: 17269,
      agentName: 'LLIYAS MEHBUB SHAIKH',
      insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
      productType: 'COMPREHENSIVE',
      policyMode: 'BREAKING',
      paymentMode: 'ONLINE TO RELIABLE',
      contactNo: '7028508990',
      paymentDetails1: 'NA',
      paymentDetails2: 'NA',
      empName: 'ARVIND DNYANESHWAR GAWADE',
      documentList: 'Inspection_Report.pdf',
      note: 'APP ENTRY',
      quotationCode: 'Q34195323',
      otherAgentName: 'AGENT',
      operatorName: 'SANTOSH PHULCHAND BANSODE',
      status: 'Pending',
    },
    {
      id: 3,
      transId: '195257',
      pendingFrom: '1DAYS,0HOURS,11MINUTES,34SECONDS',
      transDate: '13/10/2026 12:39:51',
      registrationNo: 'MH16DP2486',
      premium: 24299,
      agentName: 'PRAMOD VIJAY WAGHMARE',
      insuranceCompany: 'UNITED INDIA INSURANCE CO. LTD',
      productType: 'COMPREHENSIVE',
      policyMode: 'BREAKING',
      paymentMode: 'ONLINE TO RELIABLE',
      contactNo: '8956923197',
      paymentDetails1: 'NA',
      paymentDetails2: 'NA',
      empName: 'RUTUJA NITIN MANE',
      documentList: 'Previous_Policy.pdf',
      note: 'ERP ENTRY',
      quotationCode: 'Q488195256',
      otherAgentName: 'AGENT',
      operatorName: 'RUTUJA NITIN MANE',
      status: 'Pending',
    },
    {
      id: 4,
      transId: '195190',
      pendingFrom: '1DAYS,3HOURS,42MINUTES,12SECONDS',
      transDate: '13/10/2026 09:15:20',
      registrationNo: 'MH42BA9921',
      premium: 31450,
      agentName: 'SNEHA KULKARNI',
      insuranceCompany: 'ICICI LOMBARD GEN INSURANCE',
      productType: 'COMPREHENSIVE',
      policyMode: 'CONTINUE',
      paymentMode: 'CASH',
      contactNo: '9423088192',
      paymentDetails1: 'NA',
      paymentDetails2: 'NA',
      empName: 'HEMANT KAKULTE',
      documentList: 'Receipt_Slip.pdf',
      note: 'ERP ENTRY',
      quotationCode: 'QS32195190',
      otherAgentName: 'AGENT',
      operatorName: 'HEMANT KAKULTE',
      status: 'Pending',
    },
  ]);

  // Number formatter
  const formatNum = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Filter records based on "Search Registration No Here"
  const filteredRecords = useMemo(() => {
    if (!searchRegNo.trim()) return records;
    const q = searchRegNo.toLowerCase().trim();
    return records.filter((r) => {
      return (
        r.registrationNo.toLowerCase().includes(q) ||
        r.transId.toLowerCase().includes(q) ||
        r.agentName.toLowerCase().includes(q) ||
        r.insuranceCompany.toLowerCase().includes(q) ||
        r.contactNo.includes(q) ||
        r.quotationCode.toLowerCase().includes(q)
      );
    });
  }, [searchRegNo, records]);

  // Export to CSV
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = [
      'TRANSID',
      'PENDING FROM',
      'TRANS DATE',
      'REGISTRATION NO',
      'PREMIUM',
      'AGENT NAME',
      'INSURANCE COMPANY',
      'PRODUCT TYPE',
      'POLICY MODE',
      'PAYMENT MODE',
      'CONTACT NO',
      'PAYMENT DETAILS1',
      'PAYMENT DETAILS2',
      'EMP NAME',
      'DOCUMENT_LIST',
      'NOTE',
      'QUATATION CODE',
      'OTHERAGENTNAME',
      'OPERATOR NAME',
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.transId}"`,
      `"${r.pendingFrom}"`,
      `"${r.transDate}"`,
      `"${r.registrationNo}"`,
      r.premium,
      `"${r.agentName}"`,
      `"${r.insuranceCompany}"`,
      `"${r.productType}"`,
      `"${r.policyMode}"`,
      `"${r.paymentMode}"`,
      `"${r.contactNo}"`,
      `"${r.paymentDetails1}"`,
      `"${r.paymentDetails2}"`,
      `"${r.empName}"`,
      `"${r.documentList}"`,
      `"${r.note}"`,
      `"${r.quotationCode}"`,
      `"${r.otherAgentName}"`,
      `"${r.operatorName}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Premium_Cash_Approval_Report_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Total Premium Calculation
  const totalPremium = useMemo(() => {
    return filteredRecords.reduce((acc, curr) => acc + curr.premium, 0);
  }, [filteredRecords]);

  return (
    <div className="space-y-4 w-full font-sans">
      {/* =========================================================================
          TOP SEARCH & ACTION BAR (Replicating exact screenshot layout)
         ========================================================================= */}
      <div className="flex items-center gap-3 w-full">
        {/* Search Registration No Here */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search Registration No Here"
            value={searchRegNo}
            onChange={(e) => setSearchRegNo(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner uppercase font-mono"
          />
          {searchRegNo && (
            <button
              onClick={() => setSearchRegNo('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Export Button (Amber/Orange Theme from Screenshot) */}
        <button
          type="button"
          onClick={handleExport}
          className="px-7 py-2 bg-[#E89C35] hover:bg-[#d48824] text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] flex items-center justify-center min-w-[80px]"
        >
          Export
        </button>
      </div>

      {/* =========================================================================
          DATA GRID (Replicating all columns from both screenshots with our Blue Theme)
         ========================================================================= */}
      {filteredRecords.length === 0 ? (
        <div className="w-full bg-white rounded-lg border border-brand-border shadow-xs overflow-hidden">
          <div className="bg-[#EAEAEA] text-[#1E293B] px-4 py-3 font-semibold text-[13px] tracking-wide border-b border-slate-300">
            NO DATA FOUND
          </div>
          <div className="p-8 text-center text-slate-500 text-xs">
            No pending cash approvals found matching "{searchRegNo}".
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-lg border border-brand-border shadow-sm overflow-hidden flex flex-col">
          {/* Scrollable Table Area */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="bg-brand-primary text-white text-[11.5px] uppercase tracking-wider font-bold select-none border-b border-blue-700">
                  <th className="py-2.5 px-3.5 whitespace-nowrap">TRANSID</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">PENDING FROM</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">TRANS DATE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap font-mono">REGISTRATION NO</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap text-right">PREMIUM</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">AGENT NAME</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap max-w-[220px]">INSURANCE COMPANY</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">PRODUCT TYPE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">POLICY MODE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">PAYMENT MODE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">CONTACT NO</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">PAYMENT DETAILS1</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">PAYMENT DETAILS2</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">EMP NAME</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">DOCUMENT_LIST</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">NOTE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap font-mono">QUATATION CODE</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">OTHERAGENTNAME</th>
                  <th className="py-2.5 px-3.5 whitespace-nowrap">OPERATOR NAME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[12.5px] text-slate-800">
                {filteredRecords.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="py-3 px-3.5 font-mono font-bold text-brand-primary whitespace-nowrap">
                      {row.transId}
                    </td>
                    <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                      {row.pendingFrom}
                    </td>
                    <td className="py-3 px-3.5 whitespace-nowrap text-slate-700 font-medium">
                      {row.transDate}
                    </td>
                    <td className="py-3 px-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {row.registrationNo}
                    </td>
                    <td className="py-3 px-3.5 text-right font-bold text-slate-900 whitespace-nowrap">
                      {formatNum(row.premium)}
                    </td>
                    <td className="py-3 px-3.5 text-slate-800 font-medium">
                      {row.agentName}
                    </td>
                    <td className="py-3 px-3.5 font-medium text-slate-900 max-w-[220px] truncate" title={row.insuranceCompany}>
                      {row.insuranceCompany}
                    </td>
                    <td className="py-3 px-3.5 font-semibold text-indigo-700 whitespace-nowrap">
                      {row.productType}
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap font-medium">
                      {row.policyMode}
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap font-bold">
                      <span className={`inline-flex px-2 py-0.5 rounded text-[11px] ${
                        row.paymentMode === 'CASH'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {row.paymentMode}
                      </span>
                    </td>
                    <td className="py-3 px-3.5 font-mono text-slate-700 whitespace-nowrap">
                      {row.contactNo}
                    </td>
                    <td className="py-3 px-3.5 text-slate-500 whitespace-nowrap">
                      {row.paymentDetails1}
                    </td>
                    <td className="py-3 px-3.5 text-slate-500 whitespace-nowrap">
                      {row.paymentDetails2}
                    </td>
                    <td className="py-3 px-3.5 text-slate-800 whitespace-nowrap">
                      {row.empName}
                    </td>
                    <td className="py-3 px-3.5 text-brand-primary whitespace-nowrap font-medium">
                      {row.documentList ? (
                        <span className="cursor-pointer hover:underline flex items-center gap-1">
                          <Eye size={12} />
                          {row.documentList}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">
                      {row.note}
                    </td>
                    <td className="py-3 px-3.5 font-mono text-slate-700 whitespace-nowrap font-medium">
                      {row.quotationCode}
                    </td>
                    <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">
                      {row.otherAgentName}
                    </td>
                    <td className="py-3 px-3.5 text-slate-800 whitespace-nowrap font-medium">
                      {row.operatorName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Summary & Horizontal Scrollbar Indicator */}
          <div className="bg-slate-50 border-t border-brand-border px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <span className="font-bold text-slate-800">{filteredRecords.length}</span> pending cash approval entries
            </div>
            <div className="flex items-center gap-3">
              <span>
                Total Premium:{' '}
                <strong className="text-brand-primary font-bold text-sm">
                  ₹{formatNum(totalPremium)}
                </strong>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumCashApprovalReportTab;
