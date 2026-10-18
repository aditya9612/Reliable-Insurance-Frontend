import React from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search } from 'lucide-react';

const PolicyEndorsement = () => {
    return (
        <div className="tab-transition-wrapper space-y-6 w-full min-w-0">

            {/* Standard Modern Standardized Page Header */}
            <PageHeader
                title="Policy Endorsement"
                description="Search, view, and endorse existing policy details."
            />

            {/* Top Search Filter Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1">
                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Search By Vehicle No</label>
                    <input
                        type="text"
                        placeholder="Enter Vehicle No..."
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 shadow-inner focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Search By Policy No</label>
                    <input
                        type="text"
                        placeholder="Enter Policy No..."
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 shadow-inner focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                    />
                </div>

                <button className="px-6 flex items-center justify-center gap-2 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]">
                    <Search size={16} /> Search
                </button>
            </div>

            {/* Readonly Panel 1: Customer Details */}
            <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
                    <span className="mr-0.5 text-base font-serif">&raquo;</span>Customer Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-6 text-[13px]">
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Customer Type</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Company Name</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Customer Name</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Gender</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Address</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>

                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Date of Birth</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Marital Status</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Mobile No</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>

                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Email Id</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">PAN No</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Aadhar No</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Nominee Name</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                </div>
            </div>

            {/* Readonly Panel 2: Vehicle Details */}
            <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
                    <span className="mr-0.5 text-base font-serif">&raquo;</span>Vehicle Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-6 text-[13px]">
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Vehicle Type</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Vehicle Make</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Vehicle Model</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Fuel Type</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>

                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Registration No</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Chassis No</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Engine No</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                </div>
            </div>

            {/* Readonly Panel 3: Policy Details */}
            <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
                    <span className="mr-0.5 text-base font-serif">&raquo;</span>Policy Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-6 text-[13px]">
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Policy Type</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Policy No</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Policy Mode</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Policy Product</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>

                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Insurance Company</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Business Type</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                    <div>
                        <span className="block text-[13px] font-medium text-slate-700 mb-1">Agent</span>
                        <span className="text-slate-500 font-normal">-</span>
                    </div>
                </div>
            </div>

            {/* Editable Form Card - Registration Module Standardized */}
            <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
                    <span className="mr-0.5 text-base font-serif">&raquo;</span>Customer Details
                </div>

                <div className="space-y-5">
                    {/* Row 1: Customer Type, Company Name, Customer Code */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Customer Type</label>
                            <div className="flex items-center gap-6 py-2">
                                <label className="flex items-center gap-2 text-[13px] text-slate-700 cursor-pointer font-normal">
                                    <input type="radio" name="customerType" value="Single" defaultChecked className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                                    Single
                                </label>
                                <label className="flex items-center gap-2 text-[13px] text-slate-700 cursor-pointer font-normal">
                                    <input type="radio" name="customerType" value="Corporate" className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                                    Corporate
                                </label>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Company Name</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9">
                                    <option>Select Company</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Customer Code</label>
                            <input
                                type="text"
                                readOnly
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-[13px] text-slate-600 focus:outline-none cursor-not-allowed shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Row 2: Initial, First Name, Middle Name, Last Name, Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Initial</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9">
                                    <option>Title</option>
                                    <option>Mr.</option>
                                    <option>Ms.</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-3">
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">First Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Middle Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>

                        <div className="md:col-span-3">
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Last Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Gender</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9">
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 3: Address Lines */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Per AddressLine1</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>
                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Per AddressLine2</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Row 4: State, District, Taluka, Pin Code */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">State</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9">
                                    <option>--Select State--</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">District</label>
                            <input
                                type="text"
                                readOnly
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-[13px] text-slate-600 focus:outline-none cursor-not-allowed shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Taluka</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9">
                                    <option>Select Taluka</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Pin Code</label>
                            <input
                                type="text"
                                readOnly
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-[13px] text-slate-600 focus:outline-none cursor-not-allowed shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Row 5: DOB, Marital Status, Mobile 1, Mobile 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Date of Birth</label>
                            <input
                                type="text"
                                placeholder="DD/MM/YYYY"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Marital Status</label>
                            <div className="relative">
                                <select className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9">
                                    <option>Select</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Mobile No 1</label>
                            <input
                                type="text"
                                readOnly
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-[13px] text-slate-600 focus:outline-none cursor-not-allowed shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Mobile No 2</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Row 6: Email, PAN, Aadhar, Nominee */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Email ID</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">PAN No</label>
                            <input
                                type="text"
                                readOnly
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-[13px] text-slate-600 focus:outline-none cursor-not-allowed shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Aadhar No</label>
                            <input
                                type="text"
                                readOnly
                                className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-[13px] text-slate-600 focus:outline-none cursor-not-allowed shadow-inner"
                            />
                        </div>

                        <div>
                            <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Nominee Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end pt-4 border-t border-slate-100">
                        <button className="px-8 flex items-center justify-center gap-2 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                            Save Details
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PolicyEndorsement;
