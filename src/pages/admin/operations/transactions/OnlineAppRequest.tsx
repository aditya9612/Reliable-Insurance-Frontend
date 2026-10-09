import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Upload, Plus, Save, RotateCcw } from 'lucide-react';

interface FileUpload {
    id: string;
    file: File | null;
}

const OnlineAppRequest: React.FC = () => {
    // Form State
    const [formData, setFormData] = useState({
        referenceType: 'DIRECT',
        salesExecutive: '',
        customerMobile: '',
        registrationNo: '',
        insuranceCompany: '',
        vehicleType: '',
        policyType: '',
        paymentMode: 'ONLINE TO INSURANCE COMPANY'
    });

    const [uploads, setUploads] = useState<FileUpload[]>([{ id: 'init-1', file: null }]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddUpload = () => {
        setUploads(prev => [...prev, { id: `upload-${Date.now()}`, file: null }]);
    };

    const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setUploads(prev => prev.map(u => u.id === id ? { ...u, file } : u));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Online App Request Submitted Successfully!');
    };

    const handleReset = () => {
        setFormData({
            referenceType: 'DIRECT',
            salesExecutive: '',
            customerMobile: '',
            registrationNo: '',
            insuranceCompany: '',
            vehicleType: '',
            policyType: '',
            paymentMode: 'ONLINE TO INSURANCE COMPANY'
        });
        setUploads([{ id: 'init-1', file: null }]);
    };

    return (
        <div className="w-full flex flex-col space-y-6">
            <PageHeader
                title="Online App Policy Request"
                description="Process and submit online application requests for new policies."
            />

            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
                <form onSubmit={handleSubmit} className="flex flex-col p-8">

                    {/* Main Form Fields Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                        {/* Row 1 */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Reference Type <span className="text-red-500">*</span></label>
                            <select
                                name="referenceType"
                                value={formData.referenceType}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px] cursor-pointer bg-white"
                                required
                            >
                                <option value="DIRECT">DIRECT</option>
                                <option value="AGENT">AGENT</option>
                                <option value="BROKER">BROKER</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Sales Executive</label>
                            <select
                                name="salesExecutive"
                                value={formData.salesExecutive}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px] cursor-pointer bg-white"
                            >
                                <option value="">--Select Emp Name--</option>
                                <option value="emp1">JOHN DOE</option>
                                <option value="emp2">JANE SMITH</option>
                            </select>
                        </div>

                        {/* Row 2 */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Customer Mobile No</label>
                            <input
                                type="text"
                                name="customerMobile"
                                placeholder="Enter Customer Number"
                                value={formData.customerMobile}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Registration No <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="registrationNo"
                                placeholder="REGISTRATION NO."
                                value={formData.registrationNo}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all h-[38px]"
                            />
                        </div>

                        {/* Row 3 */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Vehicle Type <span className="text-red-500">*</span></label>
                            <select
                                name="vehicleType"
                                value={formData.vehicleType}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px] cursor-pointer bg-white"
                            >
                                <option value="">--Select Vehicle Type--</option>
                                <option value="two">TWO WHEELER</option>
                                <option value="four">FOUR WHEELER</option>
                                <option value="gcv">GCV</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Insurance Company <span className="text-red-500">*</span></label>
                            <select
                                name="insuranceCompany"
                                value={formData.insuranceCompany}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px] cursor-pointer bg-white"
                            >
                                <option value="">--Select Company--</option>
                                <option value="tata">TATA AIG</option>
                                <option value="sbi">SBI GENERAL</option>
                                <option value="bajaj">BAJAJ ALLIANZ</option>
                            </select>
                        </div>

                        {/* Row 4 */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Policy Type <span className="text-red-500">*</span></label>
                            <select
                                name="policyType"
                                value={formData.policyType}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px] cursor-pointer bg-white"
                            >
                                <option value="">--Select Policy Type--</option>
                                <option value="comprehensive">COMPREHENSIVE</option>
                                <option value="third-party">THIRD PARTY</option>
                                <option value="standalone-od">STANDALONE OD</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Payment Mode <span className="text-red-500">*</span></label>
                            <select
                                name="paymentMode"
                                value={formData.paymentMode}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary h-[38px] cursor-pointer bg-white"
                            >
                                <option value="ONLINE TO INSURANCE COMPANY">ONLINE TO INSURANCE COMPANY</option>
                                <option value="CASH">CASH</option>
                                <option value="CHEQUE">CHEQUE</option>
                                <option value="WALLET">WALLET / INSTA PAY</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload Area */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <label className="block text-sm font-semibold text-slate-800 mb-4">Document Uploads</label>
                        <div className="flex flex-col space-y-4">
                            {uploads.map((upload, index) => (
                                <div key={upload.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="flex-1 flex items-center gap-3">
                                        <label className="flex items-center justify-center px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 cursor-pointer transition-colors h-[38px]">
                                            <Upload size={16} className="mr-2" />
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleFileChange(upload.id, e)}
                                            />
                                        </label>
                                        <span className="text-sm text-slate-500 font-medium truncate max-w-xs">
                                            {upload.file ? upload.file.name : "No file chosen"}
                                        </span>
                                    </div>

                                    {/* Action buttons on the first row upload only (per screenshot pattern) */}
                                    {index === 0 && (
                                        <button
                                            type="button"
                                            onClick={handleAddUpload}
                                            className="px-4 py-2 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-medium text-sm rounded-lg shadow-sm transition-all h-[38px]"
                                        >
                                            <Plus size={16} />
                                            <span>Add New Image</span>
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4">
                        <button
                            type="submit"
                            className="px-10 py-2.5 flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all h-[42px]"
                        >
                            <Save size={18} />
                            <span>Submit Request</span>
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-10 py-2.5 flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm rounded-lg shadow-sm transition-all h-[42px]"
                        >
                            <RotateCcw size={18} />
                            <span>Reset Form</span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default OnlineAppRequest;
