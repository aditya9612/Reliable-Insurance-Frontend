import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import { CheckCircle2 } from 'lucide-react';

const tabs: TabItem[] = [
  { id: 'uploadPolicy', label: 'Upload Policy' },
];

export const CaliberPolicyPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('uploadPolicy');
  const [selectedPdfFile, setSelectedPdfFile] = useState<File | null>(null);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Update / Upload click
  const handleUpdatePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPdfFile) {
      showToast('Please Choose PDF File first!');
      return;
    }
    showToast(`Policy PDF file "${selectedPdfFile.name}" updated successfully!`);
    setSelectedPdfFile(null);
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Calliber Policy"
        description="Upload policy PDF documents for Calliber policy processing"
      />

      {/* Sub-Tabs Bar (Upload Policy) */}
      <UnderlineTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(tabId) => setActiveTab(tabId)}
      />

      {/* Main Tab Content Card Wrapper */}
      <div key={activeTab} className="tab-transition-wrapper w-full max-w-full">
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full max-w-full">
          <div className="p-4 sm:p-6 space-y-6 w-full max-w-full">
            {/* Form Card Container */}
            <div className="border border-brand-border rounded-[12px] overflow-hidden bg-white shadow-sm">
              {/* Header Banner » Upload Policy File (Matching TargetPage colors) */}
              <div className="bg-brand-lightbg text-brand-navy px-5 py-3 font-semibold text-[14px] border-b border-brand-border flex items-center justify-between">
                <span>» Upload Policy File</span>
              </div>

              <form onSubmit={handleUpdatePolicy} className="p-5 sm:p-8 space-y-6 bg-brand-mainbg">
                {/* File Upload Row */}
                <div className="space-y-3">
                  <label className="block text-xs sm:text-sm font-bold text-brand-navy">
                    Please Choose PDF File:
                  </label>
                  <div className="flex flex-wrap items-center gap-4">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setSelectedPdfFile(e.target.files[0]);
                        }
                      }}
                      className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-md file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-white file:text-brand-navy hover:file:bg-slate-50 cursor-pointer"
                    />

                    {/* Update Blue Button (Matching TargetPage button style) */}
                    <button
                      type="submit"
                      className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-xs shadow-sm transition-all duration-200 cursor-pointer border-none uppercase"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaliberPolicyPage;
