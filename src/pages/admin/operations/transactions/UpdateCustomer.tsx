import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, CheckCircle2, AlertCircle } from 'lucide-react';

interface CustomerRecord {
    id: number;
    customerCode: string;
    customerType: 'Single' | 'Corporate';
    companyName: string;
    referenceType: string;
    initial: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    addressLine1: string;
    addressLine2: string;
    state: string;
    district: string;
    taluka: string;
    pinCode: string;
    dob: string;
    maritalStatus: string;
    mobileNo1: string;
    mobileNo2: string;
    emailId: string;
    panNo: string;
    aadharNo: string;
    nomineeName: string;
}

const SAMPLE_CUSTOMERS: CustomerRecord[] = [
    {
        id: 1,
        customerCode: 'CUST-10492',
        customerType: 'Single',
        companyName: 'NA',
        referenceType: 'Direct',
        initial: 'Mr.',
        firstName: 'Suresh',
        middleName: 'Ramchandra',
        lastName: 'Jadhav',
        gender: 'MALE',
        addressLine1: 'Plot No. 42, Vasant Vihar',
        addressLine2: 'Near MIDC Water Tank, Baramati',
        state: 'MAHARASHTRA',
        district: 'PUNE',
        taluka: 'BARAMATI',
        pinCode: '413102',
        dob: '1988-06-14',
        maritalStatus: 'MARRIED',
        mobileNo1: '9822334455',
        mobileNo2: '9422116677',
        emailId: 'suresh.jadhav@gmail.com',
        panNo: 'ABCDE1234F',
        aadharNo: '4589-2231-9874',
        nomineeName: 'Sunita Suresh Jadhav'
    },
    {
        id: 2,
        customerCode: 'CUST-10493',
        customerType: 'Corporate',
        companyName: 'AJINATH PRAKASH TALEKAR',
        referenceType: 'Agent',
        initial: 'Mr.',
        firstName: 'Ajinath',
        middleName: 'Prakash',
        lastName: 'Talekar',
        gender: 'MALE',
        addressLine1: 'Talekar Chambers, Shop 4',
        addressLine2: 'Opposite ST Stand, Indapur Road',
        state: 'MAHARASHTRA',
        district: 'PUNE',
        taluka: 'BARAMATI',
        pinCode: '413102',
        dob: '1982-11-20',
        maritalStatus: 'MARRIED',
        mobileNo1: '9850123456',
        mobileNo2: '',
        emailId: 'ajinath.talekar@gmail.com',
        panNo: 'BLAPT9823K',
        aadharNo: '7741-9982-3321',
        nomineeName: 'Priya Ajinath Talekar'
    },
    {
        id: 3,
        customerCode: 'CUST-10494',
        customerType: 'Single',
        companyName: 'NA',
        referenceType: 'Direct',
        initial: 'Miss.',
        firstName: 'Pooja',
        middleName: 'Anil',
        lastName: 'Deshmukh',
        gender: 'FEMALE',
        addressLine1: 'Flat 302, Sai Residency',
        addressLine2: 'Bhigwan Road',
        state: 'MAHARASHTRA',
        district: 'PUNE',
        taluka: 'BARAMATI',
        pinCode: '413102',
        dob: '1996-03-22',
        maritalStatus: 'SINGLE',
        mobileNo1: '9130456789',
        mobileNo2: '',
        emailId: 'pooja.deshmukh@yahoo.com',
        panNo: 'PQRED4567M',
        aadharNo: '5562-4412-8890',
        nomineeName: 'Anil Shivajirao Deshmukh'
    }
];

const INITIAL_FORM: CustomerRecord = {
    id: 0,
    customerCode: 'CUST-10495',
    customerType: 'Single',
    companyName: 'NA',
    referenceType: 'Direct',
    initial: 'Miss.',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: 'SELECT',
    addressLine1: '',
    addressLine2: '',
    state: '--Select State--',
    district: '--Select District--',
    taluka: 'NA',
    pinCode: '',
    dob: '',
    maritalStatus: 'SELECT',
    mobileNo1: '',
    mobileNo2: '',
    emailId: '',
    panNo: '',
    aadharNo: '',
    nomineeName: ''
};

const COMPANY_LIST = [
    'NA',
    'AJINATH PRAKASH TALEKAR',
    'AMIT ASHOK BHOITE',
    'ANAND PRAKASHRAO KHANDAGALE',
    'ANIL SHANKAR DOIPHODE',
    'ANIL SHIVAJIRAO DESHMUKH',
    'ANJU BHAGWANDASS SINGHAL',
    'ARVIND JAGANNATH BHOSALE',
    'AVINASH ARJUN SAWANT',
    'BALKRISHNA HANUMANT JADHAV',
    'RELIABLE ASSOCIATES BARAMATI'
];

const STATES = [
    '--Select State--',
    'MAHARASHTRA',
    'GUJARAT',
    'GOA',
    'KARNATAKA',
    'MADHYA PRADESH',
    'DELHI',
    'RAJASTHAN',
    'TAMIL NADU'
];

const DISTRICTS: Record<string, string[]> = {
    MAHARASHTRA: ['PUNE', 'SATARA', 'SOLAPUR', 'AHMEDNAGAR', 'MUMBAI', 'THANE', 'NASHIK', 'AURANGABAD', 'KOLHAPUR', 'SANGLI'],
    GUJARAT: ['AHMEDABAD', 'SURAT', 'VADODARA', 'RAJKOT'],
    GOA: ['NORTH GOA', 'SOUTH GOA'],
    KARNATAKA: ['BENGALURU URBAN', 'BELAGAVI', 'MYSURU']
};

const TALUKAS: Record<string, string[]> = {
    PUNE: ['BARAMATI', 'INDAPUR', 'DAUND', 'HAVELI', 'PURANDAR', 'SHIRUR', 'BHOR', 'PUNE CITY', 'NA'],
    SATARA: ['PHALTAN', 'SATARA', 'KOREGAON', 'WAI', 'KARAD', 'NA'],
    SOLAPUR: ['MALSHIRAS', 'KARMALA', 'MADHA', 'PANDHARPUR', 'SOLAPUR NORTH', 'NA']
};

const UpdateCustomer: React.FC = () => {
    const [searchName, setSearchName] = useState('');
    const [formData, setFormData] = useState<CustomerRecord>(INITIAL_FORM);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleSearch = () => {
        const query = searchName.trim().toLowerCase();
        if (!query) {
            showToast('Please enter a customer name to search');
            return;
        }

        const match = SAMPLE_CUSTOMERS.find(c =>
            `${c.firstName} ${c.middleName} ${c.lastName}`.toLowerCase().includes(query) ||
            c.customerCode.toLowerCase().includes(query) ||
            c.mobileNo1.includes(query)
        );

        if (match) {
            setFormData({ ...match });
            showToast(`Loaded details for ${match.firstName} ${match.lastName} (${match.customerCode})`);
        } else {
            showToast(`No customer record found matching "${searchName}"`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleChange = (field: keyof CustomerRecord, value: string) => {
        setFormData(prev => {
            const next = { ...prev, [field]: value };

            if (field === 'customerType') {
                if (value === 'Single') {
                    next.companyName = 'NA';
                }
            }

            if (field === 'state') {
                next.district = '--Select District--';
                next.taluka = 'NA';
            }
            if (field === 'district') {
                next.taluka = 'NA';
            }

            return next;
        });
    };

    const handleReset = () => {
        setFormData({ ...INITIAL_FORM, customerCode: `CUST-${Math.floor(10000 + Math.random() * 90000)}` });
        setSearchName('');
        showToast('Customer form reset to defaults');
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.firstName.trim()) {
            showToast('Please enter Customer First Name');
            return;
        }
        if (!formData.lastName.trim()) {
            showToast('Please enter Customer Last Name');
            return;
        }
        if (formData.gender === 'SELECT') {
            showToast('Please select Gender');
            return;
        }
        if (!formData.addressLine1.trim()) {
            showToast('Please enter Address Line 1');
            return;
        }
        if (formData.state === '--Select State--') {
            showToast('Please select State');
            return;
        }
        if (!formData.mobileNo1.trim() || formData.mobileNo1.length < 10) {
            showToast('Please enter a valid 10-digit Mobile No 1');
            return;
        }

        showToast(`Customer ${formData.firstName} ${formData.lastName} updated successfully!`);
    };

    const availableDistricts = DISTRICTS[formData.state] || ['PUNE', 'SATARA', 'SOLAPUR', 'AHMEDNAGAR'];
    const availableTalukas = TALUKAS[formData.district] || ['BARAMATI', 'INDAPUR', 'DAUND', 'HAVELI', 'NA'];

    return (
        <div className="tab-transition-wrapper space-y-5 w-full min-w-0">
            {/* Toast Notification matching Registration module */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-[#0B203C] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Standard Modern Standardized Page Header */}
            <PageHeader
                title="Update Customer"
                description="Search and update customer master details, address records, contact info, and tax identifiers."
            />

            {/* Search Toolbar matching Registration & DeactivatedAgentList styling */}
            <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-brand-border shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 max-w-xl">
                    <div className="relative flex-1 h-[38px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                        <input
                            type="text"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search by customer name, code, or mobile no"
                            className="w-full h-[38px] pl-10 pr-4 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="h-[38px] px-5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-medium text-[13px] rounded-[6px] shadow-sm transition-colors flex items-center gap-2 cursor-pointer border-none shrink-0"
                    >
                        <Search size={15} />
                        Search
                    </button>
                </div>
                {formData.customerCode && (
                    <div className="text-[13px] text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 font-mono">
                        Active Code: <strong className="text-brand-primary">{formData.customerCode}</strong>
                    </div>
                )}
            </div>

            {/* Customer Details Form Card - matching Registration.tsx lines 2650-3240 */}
            <form onSubmit={handleUpdate} className="space-y-6 w-full min-w-0">
                <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                    
                    {/* Blue Banner Header strictly matching Registration Module */}
                    <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
                        <span className="mr-1 text-base font-serif">&raquo;</span>Customer Details
                    </div>

                    <div className="space-y-5">
                        
                        {/* Row 1: Customer Type, Company Name, Customer Code, Reference Type */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            {/* Customer Type */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Customer Type <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="flex items-center gap-6 py-2">
                                    <label className="flex items-center gap-2 text-[13px] text-slate-700 cursor-pointer font-normal">
                                        <input
                                            type="radio"
                                            name="customerType"
                                            value="Single"
                                            checked={formData.customerType === 'Single'}
                                            onChange={() => handleChange('customerType', 'Single')}
                                            className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
                                        />
                                        Single
                                    </label>
                                    <label className="flex items-center gap-2 text-[13px] text-slate-700 cursor-pointer font-normal">
                                        <input
                                            type="radio"
                                            name="customerType"
                                            value="Corporate"
                                            checked={formData.customerType === 'Corporate'}
                                            onChange={() => handleChange('customerType', 'Corporate')}
                                            className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
                                        />
                                        Corporate
                                    </label>
                                </div>
                            </div>

                            {/* Company Name */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Company Name <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.companyName}
                                        disabled={formData.customerType === 'Single'}
                                        onChange={(e) => handleChange('companyName', e.target.value)}
                                        className={`w-full px-4 py-2 border rounded-lg text-[13px] shadow-inner transition-all appearance-none pr-9 focus:outline-none focus:ring-1 focus:ring-brand-primary ${
                                            formData.customerType === 'Single'
                                                ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                                                : 'bg-white border-slate-300 text-slate-800 focus:border-brand-primary cursor-pointer'
                                        }`}
                                    >
                                        {COMPANY_LIST.map((comp) => (
                                            <option key={comp} value={comp}>{comp}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Customer Code */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Customer Code <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value={formData.customerCode}
                                    className="w-full px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-[13px] text-slate-600 font-mono cursor-not-allowed outline-none shadow-inner"
                                />
                            </div>

                            {/* Reference Type */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Reference Type <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.referenceType}
                                        onChange={(e) => handleChange('referenceType', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="Direct">Direct</option>
                                        <option value="Agent">Agent</option>
                                        <option value="Broker">Broker</option>
                                        <option value="POSP">POSP</option>
                                        <option value="Employee">Employee</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Initial, First Name, Middle Name, Last Name, Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Initial */}
                            <div className="md:col-span-2">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Initial <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.initial}
                                        onChange={(e) => handleChange('initial', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="Miss.">Miss.</option>
                                        <option value="Mr.">Mr.</option>
                                        <option value="Mrs.">Mrs.</option>
                                        <option value="Dr.">Dr.</option>
                                        <option value="M/s">M/s</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Customer First Name */}
                            <div className="md:col-span-3">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Customer First Name <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={formData.firstName}
                                    onChange={(e) => handleChange('firstName', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Customer Middle Name */}
                            <div className="md:col-span-3">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Customer Middle Name <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Middle Name"
                                    value={formData.middleName}
                                    onChange={(e) => handleChange('middleName', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Customer Last Name */}
                            <div className="md:col-span-2">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Customer Last Name <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => handleChange('lastName', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Gender */}
                            <div className="md:col-span-2">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Gender <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.gender}
                                        onChange={(e) => handleChange('gender', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="SELECT">SELECT</option>
                                        <option value="MALE">MALE</option>
                                        <option value="FEMALE">FEMALE</option>
                                        <option value="OTHER">OTHER</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Address Line 1 and Address Line 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Per AddressLine1 <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="House / Flat / Building No, Street Name"
                                    value={formData.addressLine1}
                                    onChange={(e) => handleChange('addressLine1', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Per AddressLine2 <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Area, Landmark, Colony"
                                    value={formData.addressLine2}
                                    onChange={(e) => handleChange('addressLine2', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Row 4: State, District, Taluka, Pin Code */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* State */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    State <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.state}
                                        onChange={(e) => handleChange('state', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        {STATES.map(st => (
                                            <option key={st} value={st}>{st}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* District */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    District <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.district}
                                        onChange={(e) => handleChange('district', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="--Select District--">--Select District--</option>
                                        {availableDistricts.map(dt => (
                                            <option key={dt} value={dt}>{dt}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Taluka */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Taluka <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.taluka}
                                        onChange={(e) => handleChange('taluka', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        {availableTalukas.map(tk => (
                                            <option key={tk} value={tk}>{tk}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Pin Code */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Pin Code <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={6}
                                    placeholder="6 Digit PIN"
                                    value={formData.pinCode}
                                    onChange={(e) => handleChange('pinCode', e.target.value.replace(/\D/g, ''))}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Row 5: DOB, Marital Status, Mobile No 1, Mobile No 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Date of Birth */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => handleChange('dob', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer"
                                />
                            </div>

                            {/* Marital Status */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Marital Status <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.maritalStatus}
                                        onChange={(e) => handleChange('maritalStatus', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="SELECT">SELECT</option>
                                        <option value="SINGLE">SINGLE</option>
                                        <option value="MARRIED">MARRIED</option>
                                        <option value="UNMARRIED">UNMARRIED</option>
                                        <option value="DIVORCED">DIVORCED</option>
                                        <option value="WIDOWED">WIDOWED</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Mobile No 1 */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Mobile No 1 <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    placeholder="10 Digit Mobile No"
                                    value={formData.mobileNo1}
                                    onChange={(e) => handleChange('mobileNo1', e.target.value.replace(/\D/g, ''))}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Mobile No 2 */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Mobile No 2
                                </label>
                                <input
                                    type="tel"
                                    maxLength={10}
                                    placeholder="Alternate Mobile No"
                                    value={formData.mobileNo2}
                                    onChange={(e) => handleChange('mobileNo2', e.target.value.replace(/\D/g, ''))}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Row 6: Email Id, PAN No, Aadhar No, Nominee Name */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Email Id */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Email Id <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="name@domain.com"
                                    value={formData.emailId}
                                    onChange={(e) => handleChange('emailId', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* PAN No */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    PAN No
                                </label>
                                <input
                                    type="text"
                                    maxLength={10}
                                    placeholder="ABCDE1234F"
                                    value={formData.panNo}
                                    onChange={(e) => handleChange('panNo', e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] font-mono text-slate-800 uppercase focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Aadhar No */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Aadhar No
                                </label>
                                <input
                                    type="text"
                                    maxLength={14}
                                    placeholder="XXXX-XXXX-XXXX"
                                    value={formData.aadharNo}
                                    onChange={(e) => handleChange('aadharNo', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Nominee Name */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Nominee Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Nominee Name"
                                    value={formData.nomineeName}
                                    onChange={(e) => handleChange('nomineeName', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Action Buttons: Save/Update (Blue brand-primary) & Reset (Orange #F59E0B) matching Registration.tsx lines 3225-3240 */}
                    <div className="flex items-center justify-center gap-4 pt-8 pb-2">
                        <button
                            type="submit"
                            className="px-9 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none min-w-[100px]"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-9 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none min-w-[100px]"
                        >
                            Reset
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default UpdateCustomer;
