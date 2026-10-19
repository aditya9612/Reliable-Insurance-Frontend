import React, { useState, useRef } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export const CaliberPolicyPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hasError, setHasError] = useState<boolean>(true); // initially true to show "Please select PDF file." matching screenshot
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.name.toLowerCase().endsWith('.pdf')) {
        showToast('Please select a valid PDF file.');
        setSelectedFile(null);
        setHasError(true);
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setSelectedFile(file);
      setHasError(false);
    } else {
      setSelectedFile(null);
      setHasError(true);
    }
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setHasError(true);
      showToast('Please select PDF file.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(`Policy file "${selectedFile.name}" updated successfully!`);
      setSelectedFile(null);
      setHasError(true);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }, 800);
  };

  return (
    <div className="w-full flex flex-col space-y-4 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Calliber Policy"
        description="Upload policy PDF documents for Calliber policy processing"
      />

      {/* Exact UI matching 2nd attached photo with our blue themed UI */}
      <div className="bg-white rounded-[10px] border border-brand-border shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6 sm:p-8 max-w-4xl">
        {/* Banner: » Upload Policy File in our blue themed UI */}
        <div className="bg-[#0869D8] text-white px-5 py-2.5 rounded-[4px] font-bold text-sm tracking-wide shadow-xs flex items-center">
          <span>» Upload Policy File</span>
        </div>

        {/* Form Body matching screenshot layout */}
        <form onSubmit={handleUpdate} className="mt-6 space-y-2">
          <label className="block text-sm font-bold text-slate-800">
            Please Choose PDF File:
          </label>

          <div className="flex flex-wrap items-start gap-6 sm:gap-10 pt-1">
            {/* Left: File input and red error message */}
            <div className="flex flex-col">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="text-xs text-slate-700 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border file:border-slate-300 file:text-xs file:font-semibold file:bg-[#F8FAFC] file:text-slate-800 hover:file:bg-slate-100 cursor-pointer"
              />
              {/* Red text directly below file input matching screenshot */}
              {hasError && (
                <div className="text-red-600 text-xs font-normal mt-1.5">
                  Please select PDF file.
                </div>
              )}
              {selectedFile && !hasError && (
                <div className="text-emerald-600 text-xs font-medium mt-1.5 flex items-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>{selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                </div>
              )}
            </div>

            {/* Right: Update Button matching blue theme & position in screenshot */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-7 py-2 bg-[#004e9a] hover:bg-[#003d7a] text-white font-medium text-sm rounded shadow-sm transition-all duration-150 cursor-pointer border-none flex items-center justify-center min-w-[85px] disabled:opacity-60"
            >
              {isSubmitting ? (
                <RefreshCw size={14} className="animate-spin" />
              ) : (
                <span>Update</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaliberPolicyPage;
