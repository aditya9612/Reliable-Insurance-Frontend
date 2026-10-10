import React from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search } from 'lucide-react';

const PolicyEndorsement = () => {
    return (
        <div className="w-full flex flex-col space-y-5">

            {/* Standard Modern Standardized Page Header */}
            <PageHeader
                title="Policy Endorsement"
                description="Search, view, and endorse existing policy details."
            />

            {/* Top Search Filter Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-end gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Search By Vehicle No</label>
                    <input
                        type="text"
                        placeholder="Enter Vehicle No..."
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none"
                    />
                </div>

                <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Search By Policy No</label>
                    <input
                        type="text"
                        placeholder="Enter Policy No..."
                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all outline-none"
                    />
                </div>

                <button className="px-6 flex items-center justify-center gap-2 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer h-[38px]">
                    <Search size={16} /> Search
                </button>
            </div>

            {/* Readonly Panel 1: Customer Details */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
                <div className="bg-brand-navy text-white px-5 py-2.5 font-semibold text-sm flex items-center gap-2">
                    » Customer Details
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-[13px] text-slate-700">
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Customer Type</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Company Name</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Customer Name</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Gender</span>
                        <span className="text-slate-500">-</span>
                    </div>

                    <div className="col-span-1 sm:col-span-2">
                        <span className="font-semibold text-slate-900 block mb-1">Address</span>
                        <span className="text-slate-500">-</span>
                    </div>

                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Date of Birth</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Marital Status</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Mobile No</span>
                        <span className="text-slate-500">-</span>
                    </div>

                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Email Id</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">PAN No</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Aadhar No</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Nominee Name</span>
                        <span className="text-slate-500">-</span>
                    </div>
                </div>
            </div>

            {/* Readonly Panel 2: Vehicle Details */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
                <div className="bg-brand-navy text-white px-5 py-2.5 font-semibold text-sm flex items-center gap-2">
                    » Vehicle Details
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-[13px] text-slate-700">
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Vehicle Type</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Vehicle Make</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Vehicle Model</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Fuel Type</span>
                        <span className="text-slate-500">-</span>
                    </div>

                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Registration No</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Chassis No</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Engine No</span>
                        <span className="text-slate-500">-</span>
                    </div>
                </div>
            </div>

            {/* Readonly Panel 3: Policy Details */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
                <div className="bg-brand-navy text-white px-5 py-2.5 font-semibold text-sm flex items-center gap-2">
                    » Policy Details
                </div>
                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-6 text-[13px] text-slate-700">
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Policy Type</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Policy No</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Policy Mode</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Policy Product</span>
                        <span className="text-slate-500">-</span>
                    </div>

                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Insurance Company</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Business Type</span>
                        <span className="text-slate-500">-</span>
                    </div>
                    <div>
                        <span className="font-semibold text-slate-900 block mb-1">Agent</span>
                        <span className="text-slate-500">-</span>
                    </div>
                </div>
            </div>

            {/* Editable Form Card - Modern Update */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full mt-4">
                <div className="bg-brand-navy text-white px-5 py-3 font-semibold text-sm flex items-center gap-2">
                    » Customer Details
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5 text-sm font-normal text-slate-700">

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-2">Customer Type</label>
                        <div className="flex items-center gap-4 h-[38px]">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input type="radio" name="customerType" value="Single" className="accent-brand-primary" />
                                Single
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                                <input type="radio" name="customerType" value="Corporate" className="accent-brand-primary" />
                                Corporate
                            </label>
                        </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none">
                            <option>Select</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Customer Code</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:outline-none" readOnly />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-[80px] shrink-0">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Initial</label>
                            <select className="w-full px-2 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none">
                                <option>Title</option>
                                <option>Mr.</option>
                                <option>Ms.</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Middle Name</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                        </div>
                        <div className="w-[100px] shrink-0">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                            <select className="w-full px-2 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none">
                                <option>Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>
                    </div>


                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Per AddressLine1</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                    </div>
                    <div className="col-span-1 md:col-span-1">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Per AddressLine2</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none">
                            <option>--Select State--</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">District</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:outline-none" readOnly />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Taluka</label>
                            <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none">
                                <option>Select</option>
                            </select>
                        </div>
                        <div className="w-[100px] shrink-0">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Pin Code</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:outline-none" readOnly />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                        <input type="text" placeholder="DD/MM/YYYY" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Marital Status</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none">
                            <option>Select</option>
                            <option>Single</option>
                            <option>Married</option>
                        </select>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile No 1</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:outline-none" readOnly />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile No 2</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Email ID</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">PAN No</label>
                        <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:outline-none" readOnly />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Aadhar No</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:outline-none" readOnly />
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Nominee Name</label>
                            <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none" />
                        </div>
                    </div>

                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                    <button className="px-8 flex items-center justify-center gap-2 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                        Save Details
                    </button>
                </div>
            </div>

        </div>
    );
};

export default PolicyEndorsement;
