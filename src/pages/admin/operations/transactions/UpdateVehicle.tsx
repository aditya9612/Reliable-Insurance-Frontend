import React, { useState } from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import { Search, CheckCircle2, Car } from 'lucide-react';

interface VehicleDetailsRecord {
    id: number;
    vehicleType: string;
    vehicleSubType: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleVariant: string;
    fuelType: string;
    registrationNo: string;
    chassisNo: string;
    engineNo: string;
    mfgMonth: string;
    mfgYear: string;
    seatsCapacity: string;
    engineCC: string;
    grossVehicleWeight: string;
    vehicleRegistrationDate: string;
    rto: string;
}

const SAMPLE_VEHICLES: VehicleDetailsRecord[] = [
    {
        id: 1,
        vehicleType: 'TWO WHEELER',
        vehicleSubType: 'MOTOR CYCLE',
        vehicleMake: 'HERO MOTOCORP',
        vehicleModel: 'SPLENDOR PLUS',
        vehicleVariant: 'DRUM SELF CAST',
        fuelType: 'PETROL',
        registrationNo: 'MH42C1111',
        chassisNo: 'MBLHA10EBL012345',
        engineNo: 'HA10EB01234567',
        mfgMonth: 'MARCH',
        mfgYear: '2022',
        seatsCapacity: '2',
        engineCC: '97.2',
        grossVehicleWeight: '112',
        vehicleRegistrationDate: '2022-04-10',
        rto: 'MH42 - BARAMATI'
    },
    {
        id: 2,
        vehicleType: 'FOUR WHEELER',
        vehicleSubType: 'PRIVATE CAR',
        vehicleMake: 'MARUTI SUZUKI',
        vehicleModel: 'SWIFT',
        vehicleVariant: 'VXI',
        fuelType: 'PETROL',
        registrationNo: 'MH12PQ5678',
        chassisNo: 'MA3EJK81S00123456',
        engineNo: 'K14BN987654',
        mfgMonth: 'MAY',
        mfgYear: '2019',
        seatsCapacity: '5',
        engineCC: '1197',
        grossVehicleWeight: '1330',
        vehicleRegistrationDate: '2019-06-15',
        rto: 'MH12 - PUNE'
    },
    {
        id: 3,
        vehicleType: 'FOUR WHEELER',
        vehicleSubType: 'PRIVATE CAR',
        vehicleMake: 'TATA MOTORS',
        vehicleModel: 'INDICA VISTA',
        vehicleVariant: 'AURA 1.3 QUADRAJET',
        fuelType: 'DIESEL',
        registrationNo: 'MH09BX2340',
        chassisNo: 'MAT613010B0192837',
        engineNo: '475IDT09283741',
        mfgMonth: 'NOVEMBER',
        mfgYear: '2011',
        seatsCapacity: '5',
        engineCC: '1248',
        grossVehicleWeight: '1480',
        vehicleRegistrationDate: '2011-12-05',
        rto: 'MH09 - KOLHAPUR'
    }
];

const INITIAL_VEHICLE_FORM: VehicleDetailsRecord = {
    id: 0,
    vehicleType: '--Select Vehicle Type--',
    vehicleSubType: '--Select Vehicle Sub Type--',
    vehicleMake: '--Select Vehicle Make--',
    vehicleModel: '--Select Vehicle Model--',
    vehicleVariant: '--Select Variant--',
    fuelType: '--Select Fuel Type--',
    registrationNo: '',
    chassisNo: '',
    engineNo: '',
    mfgMonth: 'Select Mfg Month',
    mfgYear: '',
    seatsCapacity: '',
    engineCC: '',
    grossVehicleWeight: '',
    vehicleRegistrationDate: '',
    rto: '--Select RTO--'
};

const VEHICLE_TYPES = [
    '--Select Vehicle Type--',
    'TWO WHEELER',
    'FOUR WHEELER',
    'COMMERCIAL VEHICLE',
    'PASSENGER CARRYING',
    'GOODS CARRYING',
    'MISCELLANEOUS'
];

const VEHICLE_SUB_TYPES: Record<string, string[]> = {
    'TWO WHEELER': ['MOTOR CYCLE', 'SCOOTER', 'MOPED', 'ELECTRIC 2W'],
    'FOUR WHEELER': ['PRIVATE CAR', 'SUV', 'SEDAN', 'HATCHBACK', 'MUV'],
    'COMMERCIAL VEHICLE': ['TAXI / CAB', 'AUTO RICKSHAW', 'BUS', 'TEMPO', 'TRUCK / LORRY', 'TRACTOR'],
    'PASSENGER CARRYING': ['3 WHEELER PASSENGER', '4 WHEELER PASSENGER', 'BUS / SCHOOL BUS'],
    'GOODS CARRYING': ['3 WHEELER GOODS', 'LGV (LIGHT GOODS VEHICLE)', 'HGV (HEAVY GOODS VEHICLE)'],
    'MISCELLANEOUS': ['AMBULANCE', 'CRANE', 'FIRE BRIGADE', 'HEARSE']
};

const VEHICLE_MAKES = [
    '--Select Vehicle Make--',
    'HERO MOTOCORP',
    'HONDA',
    'BAJAJ AUTO',
    'TVS MOTORS',
    'YAMAHA',
    'ROYAL ENFIELD',
    'MARUTI SUZUKI',
    'HYUNDAI',
    'TATA MOTORS',
    'MAHINDRA',
    'TOYOTA',
    'KIA',
    'VOLKSWAGEN',
    'SKODA',
    'ASHOK LEYLAND',
    'EICHER'
];

const VEHICLE_MODELS: Record<string, string[]> = {
    'HERO MOTOCORP': ['SPLENDOR PLUS', 'HF DELUXE', 'PASSION PRO', 'GLAMOUR', 'XPULSE 200', 'PLEASURE PLUS', 'MAESTRO EDGE'],
    'HONDA': ['ACTIVA 6G', 'ACTIVA 125', 'SHINE 125', 'UNICORN 160', 'DIO', 'CITY', 'AMAZE', 'ELEVATE'],
    'BAJAJ AUTO': ['PULSAR 150', 'PULSAR NS200', 'PLATINA 110', 'AVENGER 220', 'CHETAK EV', 'COMPACT AUTO'],
    'MARUTI SUZUKI': ['SWIFT', 'DZIRE', 'BALENO', 'BREZZA', 'ALTO K10', 'WAGON R', 'ERTIGA', 'GRAND VITARA'],
    'TATA MOTORS': ['NEXON', 'PUNCH', 'TIAGO', 'TIGOR', 'HARRIER', 'SAFARI', 'INDICA VISTA', 'ACE GOLD'],
    'HYUNDAI': ['CRETA', 'VENUE', 'I20', 'GRAND I10 NIOS', 'VERNA', 'AURA', 'ALCAZAR'],
    'MAHINDRA': ['BOLERO', 'BOLERO NEO', 'SCORPIO-N', 'SCORPIO CLASSIC', 'XUV700', 'THAR', 'XYLO', 'PICKUP']
};

const FUEL_TYPES = [
    '--Select Fuel Type--',
    'PETROL',
    'DIESEL',
    'CNG',
    'ELECTRIC (EV)',
    'HYBRID (PETROL/ELECTRIC)',
    'LPG'
];

const MONTHS = [
    'Select Mfg Month',
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER'
];

const RTO_LIST = [
    '--Select RTO--',
    'MH42 - BARAMATI',
    'MH12 - PUNE',
    'MH14 - PIMPRI CHINCHWAD',
    'MH11 - SATARA',
    'MH13 - SOLAPUR',
    'MH45 - AKLUJ',
    'MH16 - AHMEDNAGAR',
    'MH09 - KOLHAPUR',
    'MH10 - SANGLI',
    'MH01 - MUMBAI SOUTH',
    'MH02 - MUMBAI WEST',
    'MH03 - MUMBAI EAST',
    'MH04 - THANE'
];

const UpdateVehicle: React.FC = () => {
    const [searchVehicleNo, setSearchVehicleNo] = useState('');
    const [formData, setFormData] = useState<VehicleDetailsRecord>(INITIAL_VEHICLE_FORM);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const handleSearch = () => {
        const query = searchVehicleNo.trim().toUpperCase().replace(/\s+/g, '');
        if (!query) {
            showToast('Please enter a vehicle registration number to search');
            return;
        }

        const match = SAMPLE_CUSTOMERS_OR_VEHICLES(query);
        if (match) {
            setFormData({ ...match });
            showToast(`Loaded details for vehicle ${match.registrationNo} (${match.vehicleMake} ${match.vehicleModel})`);
        } else {
            showToast(`No vehicle details found matching "${searchVehicleNo}"`);
        }
    };

    const SAMPLE_CUSTOMERS_OR_VEHICLES = (query: string) => {
        return SAMPLE_VEHICLES.find(v =>
            v.registrationNo.replace(/\s+/g, '').toUpperCase().includes(query) ||
            v.chassisNo.toUpperCase().includes(query) ||
            v.engineNo.toUpperCase().includes(query)
        );
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const handleChange = (field: keyof VehicleDetailsRecord, value: string) => {
        setFormData(prev => {
            const next = { ...prev, [field]: value };

            if (field === 'vehicleType') {
                next.vehicleSubType = '--Select Vehicle Sub Type--';
            }
            if (field === 'vehicleMake') {
                next.vehicleModel = '--Select Vehicle Model--';
                next.vehicleVariant = '';
            }

            return next;
        });
    };

    const handleReset = () => {
        setFormData(INITIAL_VEHICLE_FORM);
        setSearchVehicleNo('');
        showToast('Vehicle details form reset to defaults');
    };

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.vehicleType === '--Select Vehicle Type--') {
            showToast('Please select Vehicle Type');
            return;
        }
        if (formData.vehicleMake === '--Select Vehicle Make--') {
            showToast('Please select Vehicle Make');
            return;
        }
        if (!formData.registrationNo.trim()) {
            showToast('Please enter Registration Number');
            return;
        }
        if (formData.fuelType === '--Select Fuel Type--') {
            showToast('Please select Fuel Type');
            return;
        }

        showToast(`Vehicle details for ${formData.registrationNo} updated successfully!`);
    };

    const availableSubTypes = VEHICLE_SUB_TYPES[formData.vehicleType] || [];
    const availableModels = VEHICLE_MODELS[formData.vehicleMake] || [];

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
                title="Update Vehicle Details"
                description="Search and update vehicle specifications, registration numbers, engine/chassis details, and RTO location."
            />

            {/* Search Toolbar matching Registration & DeactivatedAgentList styling */}
            <div className="p-3.5 sm:p-4 bg-white rounded-xl border border-brand-border shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 max-w-xl">
                    <div className="relative flex-1 h-[38px]">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                        <input
                            type="text"
                            value={searchVehicleNo}
                            onChange={(e) => setSearchVehicleNo(e.target.value.toUpperCase())}
                            onKeyDown={handleKeyDown}
                            placeholder="Search By Vehicle No (e.g. MH42C1111, MH12PQ5678)"
                            className="w-full h-[38px] pl-10 pr-4 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm uppercase focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
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
                {formData.registrationNo && (
                    <div className="text-[13px] text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 font-mono">
                        Active Vehicle: <strong className="text-brand-primary">{formData.registrationNo}</strong>
                    </div>
                )}
            </div>

            {/* Vehicle Details Form Card - matching Registration.tsx style */}
            <form onSubmit={handleUpdate} className="space-y-6 w-full min-w-0">
                <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                    
                    {/* Blue Banner Header strictly matching Registration Module */}
                    <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
                        <span className="mr-1 text-base font-serif">&raquo;</span>Vehicle Details
                    </div>

                    <div className="space-y-5">
                        
                        {/* Row 1: Vehicle Type, Vehicle Sub Type, Vehicle Make, Vehicle Model */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {/* Vehicle Type */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Vehicle Type <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.vehicleType}
                                        onChange={(e) => handleChange('vehicleType', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        {VEHICLE_TYPES.map(vt => (
                                            <option key={vt} value={vt}>{vt}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle sub Type */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Vehicle sub Type <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.vehicleSubType}
                                        onChange={(e) => handleChange('vehicleSubType', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="--Select Vehicle Sub Type--">--Select Vehicle Sub Type--</option>
                                        {availableSubTypes.map(st => (
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

                            {/* Vehicle Make */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Vehicle Make <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.vehicleMake}
                                        onChange={(e) => handleChange('vehicleMake', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        {VEHICLE_MAKES.map(vm => (
                                            <option key={vm} value={vm}>{vm}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Model */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Vehicle Model <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.vehicleModel}
                                        onChange={(e) => handleChange('vehicleModel', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="--Select Vehicle Model--">--Select Vehicle Model--</option>
                                        {availableModels.map(md => (
                                            <option key={md} value={md}>{md}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Vehicle Variants, Fuel Type, Registration No */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            {/* Vehicle Variants */}
                            <div className="md:col-span-4">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Vehicle Variants <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Variant (e.g. VXI, STD, DRUM CAST)"
                                    value={formData.vehicleVariant}
                                    onChange={(e) => handleChange('vehicleVariant', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Fuel Type */}
                            <div className="md:col-span-4">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Fuel Type <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.fuelType}
                                        onChange={(e) => handleChange('fuelType', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        {FUEL_TYPES.map(ft => (
                                            <option key={ft} value={ft}>{ft}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Registration No (eg. MH42C1111) */}
                            <div className="md:col-span-4">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Registration No <span className="text-red-500 font-bold">*</span>{' '}
                                    <span className="text-slate-400 text-xs font-normal">(eg. MH42C1111)</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="MH42C1111"
                                    value={formData.registrationNo}
                                    onChange={(e) => handleChange('registrationNo', e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 uppercase font-mono font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Row 3: Chassis No, Engine No, Mfg. Month */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Chassis No */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Chassis No
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Chassis No"
                                    value={formData.chassisNo}
                                    onChange={(e) => handleChange('chassisNo', e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 uppercase font-mono focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Engine No */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Engine No
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Engine No"
                                    value={formData.engineNo}
                                    onChange={(e) => handleChange('engineNo', e.target.value.toUpperCase())}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 uppercase font-mono focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Mfg. Month */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Mfg. Month <span className="text-red-500 font-bold">*</span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.mfgMonth}
                                        onChange={(e) => handleChange('mfgMonth', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        {MONTHS.map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 4: Mfg. Year, Seats Capacity, Engine CC */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Mfg. Year */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Mfg. Year <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    maxLength={4}
                                    placeholder="e.g. 2023"
                                    value={formData.mfgYear}
                                    onChange={(e) => handleChange('mfgYear', e.target.value.replace(/\D/g, ''))}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Seats Capacity */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Seats Capacity
                                </label>
                                <input
                                    type="text"
                                    maxLength={2}
                                    placeholder="e.g. 5"
                                    value={formData.seatsCapacity}
                                    onChange={(e) => handleChange('seatsCapacity', e.target.value.replace(/\D/g, ''))}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Engine CC */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Engine CC <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. 1197"
                                    value={formData.engineCC}
                                    onChange={(e) => handleChange('engineCC', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Row 5: Gross Vehicle Weight, Vehicle Registration Date, RTO */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Gross Vehicle Weight */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Gross Vehicle Weight <span className="text-red-500 font-bold">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Weight in KG (e.g. 1330)"
                                    value={formData.grossVehicleWeight}
                                    onChange={(e) => handleChange('grossVehicleWeight', e.target.value.replace(/\D/g, ''))}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Vehicle Registration Date */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    Vehicle Registration Date
                                </label>
                                <input
                                    type="date"
                                    value={formData.vehicleRegistrationDate}
                                    onChange={(e) => handleChange('vehicleRegistrationDate', e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer"
                                />
                            </div>

                            {/* RTO */}
                            <div>
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                    RTO
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.rto}
                                        onChange={(e) => handleChange('rto', e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        {RTO_LIST.map(rt => (
                                            <option key={rt} value={rt}>{rt}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Action Buttons: Update (Blue brand-primary) & Reset (Orange #F59E0B) matching Registration.tsx */}
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

export default UpdateVehicle;
