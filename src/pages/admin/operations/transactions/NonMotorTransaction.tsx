import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';

const NonMotorTransaction: React.FC = () => {
    const [formData, setFormData] = useState({
        broker: '',
        referenceType: 'DIRECT',
        salesExecutive: '',
        branch: '',
        insuranceCompany: '',
        policyGenerationDate: '',
        customerType: 'Individual',
        corporateCompanyName: '',
        customerFirstName: '',
        addressLine1: '',
        pinCode: '',
        mobileNo: '',
        panNo: '',
        aadharNo: ''
    });

    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Validation definitions
    const rules = {
        broker: (val: string) => !val ? 'Broker is required' : '',
        referenceType: (val: string) => !val ? 'Reference Type is required' : '',
        salesExecutive: (val: string) => !val ? 'Sales Executive is required' : '',
        branch: (val: string) => !val ? 'Branch is required' : '',
        insuranceCompany: (val: string) => !val ? 'Insurance Company is required' : '',
        policyGenerationDate: (val: string) => !val ? 'Policy Generation Date is required' : '',
        customerFirstName: (val: string) => !val ? 'Customer Name is required' : '',
        addressLine1: (val: string) => !val ? 'Address is required' : '',
        pinCode: (val: string) => !val ? 'PIN Code is required' : '',
        mobileNo: (val: string) => {
            if (!val) return 'Mobile Number is required';
            if (!/^[0-9]{10}$/.test(val)) return 'Invalid mobile number';
            return '';
        },
        panNo: (val: string) => !val ? 'PAN No is required' : '',
        aadharNo: (val: string) => !val ? 'Aadhar No is required' : '',
        corporateCompanyName: (val: string) => {
            if (formData.customerType === 'Corporate' && !val) return 'Company Name is required';
            return '';
        }
    };

    const handleBlur = (field: string) => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Also clear error dynamically if they start typing
        if (touched[field]) {
            setTouched(prev => ({ ...prev, [field]: false }));
        }
    };

    // Helper to get error message
    const getError = (field: keyof typeof rules) => {
        if (!touched[field] && !isSubmitted) return '';
        return rules[field](formData[field]);
    };

    const handleNext = () => {
        setIsSubmitted(true);
        // Check if any errors exist
        const hasErrors = Object.keys(rules).some(key => rules[key as keyof typeof rules](formData[key as keyof typeof formData]) !== '');

        if (!hasErrors) {
            alert('Form is valid! Proceeding to next step...');
        } else {
            // Scroll top or alert
        }
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset the form?')) {
            setFormData({
                broker: '', referenceType: 'DIRECT', salesExecutive: '', branch: '',
                insuranceCompany: '', policyGenerationDate: '', customerType: 'Individual',
                corporateCompanyName: '', customerFirstName: '', addressLine1: '',
                pinCode: '', mobileNo: '', panNo: '', aadharNo: ''
            });
            setTouched({});
            setIsSubmitted(false);
        }
    };

    // Reusable field helpers
    const Label = ({ text, required = true }: { text: string, required?: boolean }) => (
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            {text} {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
    );

    const ErrorMsg = ({ error }: { error: string }) => {
        if (!error) return null;
        return <span className="text-xs text-red-500 mt-1 block font-medium animate-in fade-in slide-in-from-top-1">{error}</span>;
    };

    return (
        <div className="w-full flex flex-col space-y-5 pb-10">
            <PageHeader
                title="Customer Details (Non-Motor)"
                description="Enter the initial customer information for a non-motor transaction."
            />

            <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">

                <div className="p-8 space-y-8">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <Label text="Broker" />
                            <select
                                value={formData.broker} onChange={e => handleChange('broker', e.target.value)} onBlur={() => handleBlur('broker')}
                                className={`w-full px-4 py-2 bg-white border ${getError('broker') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            >
                                <option value="">Select Option</option>
                                <option value="BROKER_A">Broker A</option>
                                <option value="BROKER_B">Broker B</option>
                            </select>
                            <ErrorMsg error={getError('broker')} />
                        </div>
                        <div>
                            <Label text="Reference Type" />
                            <select
                                value={formData.referenceType} onChange={e => handleChange('referenceType', e.target.value)} onBlur={() => handleBlur('referenceType')}
                                className={`w-full px-4 py-2 bg-white border ${getError('referenceType') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            >
                                <option value="DIRECT">DIRECT</option>
                                <option value="AGENT">AGENT</option>
                            </select>
                            <ErrorMsg error={getError('referenceType')} />
                        </div>
                        <div>
                            <Label text="Sales Executive" />
                            <select
                                value={formData.salesExecutive} onChange={e => handleChange('salesExecutive', e.target.value)} onBlur={() => handleBlur('salesExecutive')}
                                className={`w-full px-4 py-2 bg-white border ${getError('salesExecutive') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            >
                                <option value="">Select Option</option>
                                <option value="EXEC_1">Executive 1</option>
                            </select>
                            <ErrorMsg error={getError('salesExecutive')} />
                        </div>
                        <div>
                            <Label text="Branch" />
                            <select
                                value={formData.branch} onChange={e => handleChange('branch', e.target.value)} onBlur={() => handleBlur('branch')}
                                className={`w-full px-4 py-2 bg-white border ${getError('branch') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            >
                                <option value="">Select Option</option>
                                <option value="BARAMATI">BARAMATI</option>
                                <option value="PUNE">PUNE</option>
                            </select>
                            <ErrorMsg error={getError('branch')} />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label text="Insurance Company" />
                            <select
                                value={formData.insuranceCompany} onChange={e => handleChange('insuranceCompany', e.target.value)} onBlur={() => handleBlur('insuranceCompany')}
                                className={`w-full px-4 py-2 bg-white border ${getError('insuranceCompany') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            >
                                <option value="">Select Option</option>
                                <option value="HDFC ERGO">HDFC ERGO</option>
                                <option value="TATA AIG">TATA AIG</option>
                            </select>
                            <ErrorMsg error={getError('insuranceCompany')} />
                        </div>
                        <div>
                            <Label text="Policy Generation Date" />
                            <input
                                type="date"
                                value={formData.policyGenerationDate} onChange={e => handleChange('policyGenerationDate', e.target.value)} onBlur={() => handleBlur('policyGenerationDate')}
                                className={`w-full px-4 py-2 bg-white border ${getError('policyGenerationDate') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            />
                            <ErrorMsg error={getError('policyGenerationDate')} />
                        </div>
                        <div>
                            <Label text="Customer Type" />
                            <div className="flex items-center gap-6 h-[40px]">
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-brand-navy">
                                    <input
                                        type="radio"
                                        name="customerType"
                                        value="Individual"
                                        checked={formData.customerType === 'Individual'}
                                        onChange={() => setFormData(prev => ({ ...prev, customerType: 'Individual', corporateCompanyName: '' }))}
                                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                    />
                                    Individual
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer text-sm text-brand-navy">
                                    <input
                                        type="radio"
                                        name="customerType"
                                        value="Corporate"
                                        checked={formData.customerType === 'Corporate'}
                                        onChange={() => setFormData(prev => ({ ...prev, customerType: 'Corporate' }))}
                                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary cursor-pointer"
                                    />
                                    Corporate
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Corporate Company Name (Always visible) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label text="Corporate Company Name" required={formData.customerType === 'Corporate'} />
                            <input
                                type="text"
                                disabled={formData.customerType !== 'Corporate'}
                                value={formData.corporateCompanyName} onChange={e => handleChange('corporateCompanyName', e.target.value)} onBlur={() => handleBlur('corporateCompanyName')}
                                className={`w-full px-4 py-2 bg-white border ${getError('corporateCompanyName') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy disabled:bg-slate-100 disabled:text-slate-400 outline-none transition-all`}
                            />
                            <ErrorMsg error={getError('corporateCompanyName')} />
                        </div>
                    </div>

                    {/* Row 4 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label text={formData.customerType === 'Corporate' ? "Contact Person First Name" : "Customer First Name"} />
                            <input
                                type="text"
                                value={formData.customerFirstName} onChange={e => handleChange('customerFirstName', e.target.value)} onBlur={() => handleBlur('customerFirstName')}
                                className={`w-full px-4 py-2 bg-white border ${getError('customerFirstName') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            />
                            <ErrorMsg error={getError('customerFirstName')} />
                        </div>
                        <div>
                            <Label text="Per AddressLine1" />
                            <input
                                type="text"
                                value={formData.addressLine1} onChange={e => handleChange('addressLine1', e.target.value)} onBlur={() => handleBlur('addressLine1')}
                                className={`w-full px-4 py-2 bg-white border ${getError('addressLine1') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            />
                            <ErrorMsg error={getError('addressLine1')} />
                        </div>
                    </div>

                    {/* Row 5 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label text="Pin Code" />
                            <input
                                type="text"
                                value={formData.pinCode} onChange={e => handleChange('pinCode', e.target.value)} onBlur={() => handleBlur('pinCode')}
                                maxLength={6}
                                className={`w-full px-4 py-2 bg-white border ${getError('pinCode') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            />
                            <ErrorMsg error={getError('pinCode')} />
                        </div>
                        <div>
                            <Label text="Mobile No 1" />
                            <input
                                type="text"
                                placeholder="Enter Number"
                                value={formData.mobileNo} onChange={e => handleChange('mobileNo', e.target.value)} onBlur={() => handleBlur('mobileNo')}
                                maxLength={10}
                                className={`w-full px-4 py-2 bg-white border ${getError('mobileNo') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy placeholder-slate-400 outline-none transition-all`}
                            />
                            <ErrorMsg error={getError('mobileNo')} />
                        </div>
                        <div>
                            <Label text="PAN No" />
                            <input
                                type="text"
                                value={formData.panNo} onChange={e => handleChange('panNo', e.target.value.toUpperCase())} onBlur={() => handleBlur('panNo')}
                                maxLength={10}
                                className={`w-full px-4 py-2 bg-white border ${getError('panNo') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all uppercase`}
                            />
                            <ErrorMsg error={getError('panNo')} />
                        </div>
                    </div>

                    {/* Row 6 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label text="Aadhar No" />
                            <input
                                type="text"
                                value={formData.aadharNo} onChange={e => handleChange('aadharNo', e.target.value)} onBlur={() => handleBlur('aadharNo')}
                                maxLength={12}
                                className={`w-full px-4 py-2 bg-white border ${getError('aadharNo') ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-primary focus:border-brand-primary'} rounded-lg text-sm text-brand-navy outline-none transition-all`}
                            />
                            <ErrorMsg error={getError('aadharNo')} />
                        </div>
                    </div>

                </div>

            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-4 mt-6">
                <button
                    onClick={handleReset}
                    className="px-8 py-2 h-[38px] flex items-center justify-center bg-white border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                    Reset
                </button>
                <button
                    onClick={handleNext}
                    className="px-8 py-2 h-[38px] flex items-center justify-center bg-brand-primary text-white hover:bg-[#1D4ED8] font-semibold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default NonMotorTransaction;
