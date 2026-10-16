import React, { useState, useMemo } from 'react';
import { Search, Download, X } from 'lucide-react';

export interface ChequeBounceRecord {
  id: number;
  paymentDate: string;
  customerName: string;
  agentName: string;
  salesExecutive: string; // SELES EX./FRANCHISE
  policyNo: string;
  paymentType: string;
  paymentDetails: string;
  amount: number;
}

export const ChequeBounceReportTab: React.FC = () => {
  // Search input state matching reliable-erp.com/Clerk/RptChequeBounce.aspx
  const [searchAgentName, setSearchAgentName] = useState('');

  // Initial mock records strictly matching the legacy screenshot
  const initialRecords: ChequeBounceRecord[] = [
    {
      id: 1,
      paymentDate: '26/02/2022',
      customerName: 'ANIL SHIVAJI DESHMUKH',
      agentName: 'ANAND VITTHAL DEVMANE',
      salesExecutive: 'ARVIND DNYANESHWAR GAWADE',
      policyNo: '0163043835',
      paymentType: 'CHEQUE',
      paymentDetails: 'BANK OF INDIA',
      amount: 27773,
    },
    {
      id: 2,
      paymentDate: '03/03/2022',
      customerName: 'ANIL SHIVAJI DESHMUKH',
      agentName: 'ANAND VITTHAL DEVMANE',
      salesExecutive: 'ARVIND DNYANESHWAR GAWADE',
      policyNo: '0163060586',
      paymentType: 'CHEQUE',
      paymentDetails: 'BANK OF INDIA',
      amount: 27773,
    },
    {
      id: 3,
      paymentDate: '05/08/2024',
      customerName: 'M/S.A S DESHMUKH AND CO',
      agentName: 'ANAND VITTHAL DEVMANE',
      salesExecutive: 'ARVIND DNYANESHWAR GAWADE',
      policyNo: 'VGC1194430000100',
      paymentType: 'CHEQUE',
      paymentDetails: 'BANK OF INDIA',
      amount: 97341,
    },
    {
      id: 4,
      paymentDate: '12/07/2021',
      customerName: 'RAJENDRA POPAT KHEDEKAR',
      agentName: 'PRASHANT ABHIMAN SHIRSAT',
      salesExecutive: 'AMOL RAMCHANDRA WANAVE',
      policyNo: '3101300822',
      paymentType: 'CHEQUE',
      paymentDetails: 'BANK OF MAHARASHTRA',
      amount: 21977,
    },
    {
      id: 5,
      paymentDate: '11/08/2021',
      customerName: 'MAHADEV SURESH CHAUDHARI',
      agentName: 'PRASHANT ABHIMAN SHIRSAT',
      salesExecutive: 'AMOL RAMCHANDRA',
      policyNo: '0162261893',
      paymentType: 'CHEQUE',
      paymentDetails: 'BANK OF MAH',
      amount: 54407,
    },
    {
      id: 6,
      paymentDate: '14/10/2026',
      customerName: 'GANESH PANDURANG KALE',
      agentName: 'AMIT DESHMUKH',
      salesExecutive: 'ROHIT KADAM',
      policyNo: 'POL-CHQ-10029',
      paymentType: 'CHEQUE',
      paymentDetails: 'STATE BANK OF INDIA',
      amount: 28500,
    },
    {
      id: 7,
      paymentDate: '08/10/2026',
      customerName: 'SANTOSH SOPANRAO RAUT',
      agentName: 'SNEHA KULKARNI',
      salesExecutive: 'ARVIND DNYANESHWAR GAWADE',
      policyNo: 'POL-CHQ-10034',
      paymentType: 'CHEQUE',
      paymentDetails: 'HDFC BANK LTD',
      amount: 46200,
    },
    {
      id: 8,
      paymentDate: '29/09/2026',
      customerName: 'BALAJI TRANSPORT CORP',
      agentName: 'SANJAY PATIL',
      salesExecutive: 'PRIYA VERMA',
      policyNo: 'POL-CHQ-10082',
      paymentType: 'CHEQUE',
      paymentDetails: 'ICICI BANK LTD',
      amount: 94000,
    },
  ];

  // Helper currency formatter
  const formatAmount = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Filter records based on "Search Agent Name"
  const filteredRecords = useMemo(() => {
    if (!searchAgentName.trim()) {
      return initialRecords;
    }
    const query = searchAgentName.toLowerCase().trim();
    return initialRecords.filter((record) => {
      return (
        record.agentName.toLowerCase().includes(query) ||
        record.customerName.toLowerCase().includes(query) ||
        record.policyNo.toLowerCase().includes(query) ||
        record.salesExecutive.toLowerCase().includes(query)
      );
    });
  }, [searchAgentName, initialRecords]);

  // Export to CSV
  const handleExport = () => {
    if (filteredRecords.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = [
      'PAYMENT DATE',
      'CUSTOMER NAME',
      'AGENT NAME',
      'SELES EX./FRANCHISE',
      'POLICY NO',
      'PAYMENT TYPE',
      'PAYMENT DETAILS',
      'AMOUNT',
    ];

    const rows = filteredRecords.map((r) => [
      `"${r.paymentDate}"`,
      `"${r.customerName}"`,
      `"${r.agentName}"`,
      `"${r.salesExecutive}"`,
      `"${r.policyNo}"`,
      `"${r.paymentType}"`,
      `"${r.paymentDetails}"`,
      r.amount,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Cheque_Bounce_Report_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Total amount calculation
  const totalAmount = useMemo(() => {
    return filteredRecords.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredRecords]);

  return (
    <div className="w-full font-sans">
      {/* Unified Table Card matching VehicleMaster (Image 2) */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
        {/* Table Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-[350px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Agent Name..."
              value={searchAgentName}
              onChange={(e) => setSearchAgentName(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
            />
            {searchAgentName && (
              <button
                onClick={() => setSearchAgentName('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="w-full sm:w-auto px-5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-sm font-semibold transition-all cursor-pointer h-[40px] flex items-center justify-center gap-2 shadow-xs"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Scrollable Table Area starting immediately beneath toolbar */}
        <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[980px]">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                  <th className="py-3 px-4 whitespace-nowrap">PAYMENT DATE</th>
                  <th className="py-3 px-4 whitespace-nowrap">CUSTOMER NAME</th>
                  <th className="py-3 px-4 whitespace-nowrap">AGENT NAME</th>
                  <th className="py-3 px-4 whitespace-nowrap">SALES EX./FRANCHISE</th>
                  <th className="py-3 px-4 whitespace-nowrap">POLICY NO</th>
                  <th className="py-3 px-4 whitespace-nowrap">PAYMENT TYPE</th>
                  <th className="py-3 px-4 whitespace-nowrap">PAYMENT DETAILS</th>
                  <th className="py-3 px-4 whitespace-nowrap text-right">AMOUNT (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-[13px]">
                {filteredRecords.map((row) => (
                  <tr
                    key={row.id}
                    className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white"
                  >
                    <td className="py-2.5 px-4 whitespace-nowrap text-slate-700 font-medium">
                      {row.paymentDate}
                    </td>
                    <td className="py-2.5 px-4 font-semibold text-brand-navy">
                      {row.customerName}
                    </td>
                    <td className="py-2.5 px-4 text-slate-800 font-medium">
                      {row.agentName}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700">
                      {row.salesExecutive}
                    </td>
                    <td className="py-2.5 px-4 font-mono font-medium text-brand-primary whitespace-nowrap">
                      {row.policyNo}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700 font-semibold whitespace-nowrap">
                      {row.paymentType}
                    </td>
                    <td className="py-2.5 px-4 text-slate-700 whitespace-nowrap">
                      {row.paymentDetails}
                    </td>
                    <td className="py-2.5 px-4 text-right font-medium text-rose-600 font-mono whitespace-nowrap">
                      {formatAmount(row.amount)}
                    </td>
                  </tr>
                ))}
                {filteredRecords.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-500">
                      <p className="font-semibold text-slate-600 text-sm">
                        No cheque bounce records found matching "{searchAgentName}".
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer with Summary & Total Amount */}
          <div className="bg-white border-t border-brand-border p-4 flex flex-wrap items-center justify-between gap-3 text-sm text-brand-muted font-medium">
            <div>
              Showing <span className="font-bold text-brand-navy">{filteredRecords.length}</span> cheque bounce records
            </div>
            <div className="flex items-center gap-3">
              <span>
                Total Amount:{' '}
                <strong className="text-brand-primary font-bold text-base font-mono">
                  ₹{formatAmount(totalAmount)}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ChequeBounceReportTab;
