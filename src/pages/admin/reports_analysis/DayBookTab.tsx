import React, { useState } from 'react';
import { Download, ChevronRight, Eye } from 'lucide-react';

export interface DayBookEntry {
  id: number;
  voucherNo: string;
  date: string;
  accountHead: string;
  particulars: string;
  debit: number;
  credit: number;
  balance: number;
  mode: string;
  branch: string;
  enteredBy: string;
}

export const DayBookTab: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('2026-10-14');
  const [appliedDate, setAppliedDate] = useState('2026-10-14');

  // Stats from Photo 2
  const stats = {
    policyCount: 42,
    policyPremium: 902964.28,
    cutNPay: 0,
    commissionPaid: 0,
  };

  const vouchers: DayBookEntry[] = [
    {
      id: 1,
      voucherNo: 'VCH-2026-0901',
      date: '14/10/2026',
      accountHead: 'Agent Commission Payout',
      particulars: 'Commission disbursement to Amit Deshmukh for Sept Batch',
      debit: 45000,
      credit: 0,
      balance: 1420500,
      mode: 'Bank',
      branch: 'BARAMATI HEAD OFFICE',
      enteredBy: 'Accounts Officer 1',
    },
    {
      id: 2,
      voucherNo: 'VCH-2026-0902',
      date: '14/10/2026',
      accountHead: 'Customer Premium Cash Collection',
      particulars: 'Cash premium received for POL-MOT-9912 by Arvind',
      debit: 0,
      credit: 38500,
      balance: 1459000,
      mode: 'Cash',
      branch: 'BARAMATI HEAD OFFICE',
      enteredBy: 'Cashier Desk',
    },
    {
      id: 3,
      voucherNo: 'VCH-2026-0903',
      date: '14/10/2026',
      accountHead: 'Office Utility & Facility',
      particulars: 'Electricity & Internet connectivity bill payment',
      debit: 8400,
      credit: 0,
      balance: 1450600,
      mode: 'Bank',
      branch: 'BARAMATI HEAD OFFICE',
      enteredBy: 'Admin Assistant',
    },
    {
      id: 4,
      voucherNo: 'VCH-2026-0904',
      date: '14/10/2026',
      accountHead: 'Franchise Share Remittance',
      particulars: 'Monthly franchise settlement from Hadapsar Hub',
      debit: 0,
      credit: 153600,
      balance: 1604200,
      mode: 'Bank',
      branch: 'PUNE',
      enteredBy: 'Accounts Officer 2',
    },
  ];

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    }).format(val);
  };

  const handleExport = () => {
    const headers = [
      'VOUCHER NO',
      'DATE',
      'ACCOUNT HEAD',
      'PARTICULARS',
      'DEBIT',
      'CREDIT',
      'BALANCE',
      'MODE',
      'BRANCH',
      'ENTERED BY',
    ];
    const rows = vouchers.map((v) => [
      `"${v.voucherNo}"`,
      `"${v.date}"`,
      `"${v.accountHead}"`,
      `"${v.particulars}"`,
      v.debit,
      v.credit,
      v.balance,
      `"${v.mode}"`,
      `"${v.branch}"`,
      `"${v.enteredBy}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `DayBook_${appliedDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 w-full font-sans">
      {/* Top Filter Card */}
      <div className="bg-white rounded-xl shadow-sm border border-brand-border overflow-hidden">
        <div className="bg-[#0B5ED7] text-white px-5 py-2.5 text-[13.5px] font-semibold flex items-center shadow-xs">
          <span className="mr-1 text-base font-serif">&raquo;</span>Day Book
        </div>

        <div className="p-6 space-y-6">
          {/* Date row + View button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAppliedDate(selectedDate);
            }}
            className="flex items-center gap-6"
          >
            <div className="flex items-center gap-3">
              <label className="text-[13px] text-slate-800 font-bold whitespace-nowrap">
                Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-44 px-3.5 py-1.5 bg-white border border-slate-300 rounded-[8px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="px-7 py-2 bg-[#0B5ED7] hover:bg-blue-700 text-white rounded-md text-[13px] font-bold shadow-sm transition-all cursor-pointer border-none active:scale-[0.98] min-w-[76px]"
            >
              view
            </button>
          </form>

          {/* 4 Summary Stat Boxes matching Photo 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-slate-200 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 bg-white">
            {/* Box 1: Policy Count */}
            <div className="p-5 flex flex-col justify-between">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-slate-800 font-bold text-sm">Policy Count</span>
                <span className="text-xl font-bold text-[#b91c1c]">{stats.policyCount}</span>
              </div>
              <div className="mt-4 text-center">
                <span className="text-[11.5px] text-[#0B5ED7] hover:underline font-semibold cursor-pointer inline-flex items-center gap-0.5">
                  View Details <ChevronRight size={13} />
                </span>
              </div>
            </div>

            {/* Box 2: Policy Premium */}
            <div className="p-5 flex flex-col justify-between">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-slate-800 font-bold text-sm">Policy Premium</span>
                <span className="text-xl font-bold text-[#b91c1c]">{stats.policyPremium}</span>
              </div>
              <div className="mt-4 text-center">
                <span className="text-[11.5px] text-[#0B5ED7] hover:underline font-semibold cursor-pointer inline-flex items-center gap-0.5">
                  View Details <ChevronRight size={13} />
                </span>
              </div>
            </div>

            {/* Box 3: Cut N Pay */}
            <div className="p-5 flex flex-col justify-between">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-slate-800 font-bold text-sm">Cut N Pay</span>
                <span className="text-xl font-bold text-[#b91c1c]">{stats.cutNPay}</span>
              </div>
              <div className="mt-4 text-center">
                <span className="text-[11.5px] text-[#0B5ED7] hover:underline font-semibold cursor-pointer inline-flex items-center gap-0.5">
                  View Details <ChevronRight size={13} />
                </span>
              </div>
            </div>

            {/* Box 4: Commission Paid */}
            <div className="p-5 flex flex-col justify-between">
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-slate-800 font-bold text-sm">Commission Paid</span>
                <span className="text-xl font-bold text-[#b91c1c]">{stats.commissionPaid}</span>
              </div>
              <div className="mt-4 text-center">
                <span className="text-[11.5px] text-[#0B5ED7] hover:underline font-semibold cursor-pointer inline-flex items-center gap-0.5">
                  View Details <ChevronRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayBookTab;
