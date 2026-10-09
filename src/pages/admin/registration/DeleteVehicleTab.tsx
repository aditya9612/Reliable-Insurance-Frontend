import React, { useState, useRef, useMemo } from 'react';
import {
    Trash2, Search, X, Download, RefreshCw,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
    AlertTriangle, CheckCircle2, Car, ShieldAlert, Filter
} from 'lucide-react';

export interface VehicleRecord {
    id: number;
    erpId: number;
    custName: string;
    regNo: string;
    chassisNo: string;
    engineNo: string;
    mfgMonth: string;
    mfgYear: string;
    exShowroomPrice: string;
    fuelType: string;
    vehTypeName: string;
    vehSubTypeName: string;
    makeName: string;
    modelName: string;
    variance: string;
    vehiclePurDate: string;
    seatsCapacity: string;
    transTonnageCapacity: string;
    vehicleWeight: string;
    vehicleRegDate: string;
    rtoLocation: string;
    branchName: string;
}

const INITIAL_VEHICLES: VehicleRecord[] = [
    {
        id: 1,
        erpId: 427,
        custName: 'RAVINDRA APPASOBELANKE',
        regNo: 'MH09BX2340',
        chassisNo: 'NA',
        engineNo: 'NA',
        mfgMonth: 'NA',
        mfgYear: '2011',
        exShowroomPrice: '',
        fuelType: 'PETROL',
        vehTypeName: 'CAR',
        vehSubTypeName: 'NA',
        makeName: 'TATA',
        modelName: 'INDICA VISTA',
        variance: 'MACHISMO 350',
        vehiclePurDate: '01/04/2020 00:00:00',
        seatsCapacity: '5',
        transTonnageCapacity: '',
        vehicleWeight: '1248',
        vehicleRegDate: '12/06/2020 14:18:00',
        rtoLocation: 'MH-09 KOLHAPUR',
        branchName: 'BARAMATI'
    },
    {
        id: 2,
        erpId: 428,
        custName: 'SATISH DATTATRAY MORE',
        regNo: 'MH12PQ5678',
        chassisNo: 'MA3EJK81S00123456',
        engineNo: 'K14BN987654',
        mfgMonth: '05',
        mfgYear: '2018',
        exShowroomPrice: '6,50,000',
        fuelType: 'DIESEL',
        vehTypeName: 'CAR',
        vehSubTypeName: 'HATCHBACK',
        makeName: 'MARUTI SUZUKI',
        modelName: 'SWIFT',
        variance: 'VDI',
        vehiclePurDate: '15/05/2018 00:00:00',
        seatsCapacity: '5',
        transTonnageCapacity: '',
        vehicleWeight: '980',
        vehicleRegDate: '20/05/2018 11:30:00',
        rtoLocation: 'MH-12 PUNE',
        branchName: 'BARAMATI'
    },
    {
        id: 3,
        erpId: 429,
        custName: 'GANESH TUKARAM PATIL',
        regNo: 'MH14AB1234',
        chassisNo: 'ME123456789012345',
        engineNo: 'ENG987654321',
        mfgMonth: '08',
        mfgYear: '2021',
        exShowroomPrice: '12,00,000',
        fuelType: 'DIESEL',
        vehTypeName: 'COMMERCIAL',
        vehSubTypeName: 'GOODS CARRIER',
        makeName: 'MAHINDRA',
        modelName: 'BOLERO',
        variance: 'MAXI TRUCK',
        vehiclePurDate: '10/08/2021 00:00:00',
        seatsCapacity: '2',
        transTonnageCapacity: '1.5 TON',
        vehicleWeight: '1750',
        vehicleRegDate: '15/08/2021 16:00:00',
        rtoLocation: 'MH-14 PIMPRI CHINCHWAD',
        branchName: 'PUNE'
    },
    {
        id: 4,
        erpId: 430,
        custName: 'ANIL BABAN JADHAV',
        regNo: 'MH42E9911',
        chassisNo: 'MD2A1234567890123',
        engineNo: 'BAJAJ987654',
        mfgMonth: '03',
        mfgYear: '2019',
        exShowroomPrice: '85,000',
        fuelType: 'PETROL',
        vehTypeName: '2-WHEELER',
        vehSubTypeName: 'MOTORCYCLE',
        makeName: 'BAJAJ',
        modelName: 'PULSAR 150',
        variance: 'NEON',
        vehiclePurDate: '10/03/2019 00:00:00',
        seatsCapacity: '2',
        transTonnageCapacity: '',
        vehicleWeight: '144',
        vehicleRegDate: '18/03/2019 12:15:00',
        rtoLocation: 'MH-42 BARAMATI',
        branchName: 'BARAMATI'
    },
    {
        id: 5,
        erpId: 431,
        custName: 'SURESH RAMCHANDRA KALE',
        regNo: 'MH16CN4567',
        chassisNo: 'MALC181CLP1122334',
        engineNo: 'G4FL9988776',
        mfgMonth: '11',
        mfgYear: '2022',
        exShowroomPrice: '14,50,000',
        fuelType: 'PETROL',
        vehTypeName: 'CAR',
        vehSubTypeName: 'SUV',
        makeName: 'HYUNDAI',
        modelName: 'CRETA',
        variance: 'SX 1.5',
        vehiclePurDate: '22/11/2022 00:00:00',
        seatsCapacity: '5',
        transTonnageCapacity: '',
        vehicleWeight: '1340',
        vehicleRegDate: '28/11/2022 15:45:00',
        rtoLocation: 'MH-16 AHMEDNAGAR',
        branchName: 'AHILYANAGAR'
    },
    {
        id: 6,
        erpId: 432,
        custName: 'DINESH VASANT SHINDE',
        regNo: 'MH20DE7788',
        chassisNo: 'MAT445000A1234567',
        engineNo: '275NA789012',
        mfgMonth: '01',
        mfgYear: '2020',
        exShowroomPrice: '4,80,000',
        fuelType: 'PETROL',
        vehTypeName: 'COMMERCIAL',
        vehSubTypeName: 'MINI TRUCK',
        makeName: 'TATA',
        modelName: 'ACE GOLD',
        variance: 'PETROL PLUS',
        vehiclePurDate: '12/01/2020 00:00:00',
        seatsCapacity: '2',
        transTonnageCapacity: '0.75 TON',
        vehicleWeight: '900',
        vehicleRegDate: '18/01/2020 10:20:00',
        rtoLocation: 'MH-20 CHHATRAPATI SAMBHAJINAGAR',
        branchName: 'CHHATRAPATI SAMBHAJINAGAR'
    },
    {
        id: 7,
        erpId: 433,
        custName: 'VIKRAM ARUN DESHMUKH',
        regNo: 'MH13AZ3322',
        chassisNo: 'MBH12345678901234',
        engineNo: 'HONDA112233',
        mfgMonth: '07',
        mfgYear: '2021',
        exShowroomPrice: '78,000',
        fuelType: 'PETROL',
        vehTypeName: '2-WHEELER',
        vehSubTypeName: 'SCOOTER',
        makeName: 'HONDA',
        modelName: 'ACTIVA 6G',
        variance: 'DLX',
        vehiclePurDate: '05/07/2021 00:00:00',
        seatsCapacity: '2',
        transTonnageCapacity: '',
        vehicleWeight: '107',
        vehicleRegDate: '10/07/2021 13:00:00',
        rtoLocation: 'MH-13 SOLAPUR',
        branchName: 'AKLUJ'
    },
    {
        id: 8,
        erpId: 434,
        custName: 'PRADEEP SHANKAR PAWAR',
        regNo: 'MH11BK8899',
        chassisNo: 'MA123456789012345',
        engineNo: 'MAH7788990',
        mfgMonth: '09',
        mfgYear: '2023',
        exShowroomPrice: '18,00,000',
        fuelType: 'DIESEL',
        vehTypeName: 'CAR',
        vehSubTypeName: 'SUV',
        makeName: 'MAHINDRA',
        modelName: 'SCORPIO-N',
        variance: 'Z8 DIESEL',
        vehiclePurDate: '14/09/2023 00:00:00',
        seatsCapacity: '7',
        transTonnageCapacity: '',
        vehicleWeight: '1850',
        vehicleRegDate: '20/09/2023 17:10:00',
        rtoLocation: 'MH-11 SATARA',
        branchName: 'SATARA'
    },
    {
        id: 9,
        erpId: 435,
        custName: 'RAMESHWAR NAMDEV GHADGE',
        regNo: 'MH09CT5544',
        chassisNo: 'MB1KDA81SC0112233',
        engineNo: 'K15BN112244',
        mfgMonth: '04',
        mfgYear: '2019',
        exShowroomPrice: '9,80,000',
        fuelType: 'PETROL',
        vehTypeName: 'CAR',
        vehSubTypeName: 'SEDAN',
        makeName: 'MARUTI SUZUKI',
        modelName: 'CIAZ',
        variance: 'ALPHA',
        vehiclePurDate: '11/04/2019 00:00:00',
        seatsCapacity: '5',
        transTonnageCapacity: '',
        vehicleWeight: '1050',
        vehicleRegDate: '17/04/2019 14:00:00',
        rtoLocation: 'MH-09 KOLHAPUR',
        branchName: 'BARAMATI'
    },
    {
        id: 10,
        erpId: 436,
        custName: 'AMOL KISANRAO JAGTAP',
        regNo: 'MH42AK7890',
        chassisNo: 'ME311223344556677',
        engineNo: 'YAM998811',
        mfgMonth: '06',
        mfgYear: '2020',
        exShowroomPrice: '1,40,000',
        fuelType: 'PETROL',
        vehTypeName: '2-WHEELER',
        vehSubTypeName: 'MOTORCYCLE',
        makeName: 'YAMAHA',
        modelName: 'FZ-S V3',
        variance: 'STANDARD',
        vehiclePurDate: '19/06/2020 00:00:00',
        seatsCapacity: '2',
        transTonnageCapacity: '',
        vehicleWeight: '137',
        vehicleRegDate: '25/06/2020 11:45:00',
        rtoLocation: 'MH-42 BARAMATI',
        branchName: 'BARAMATI'
    },
    {
        id: 11,
        erpId: 437,
        custName: 'SUNIL POPAT CHAVAN',
        regNo: 'MH12TX9900',
        chassisNo: 'MAT665000B9876543',
        engineNo: 'TATA332211',
        mfgMonth: '02',
        mfgYear: '2017',
        exShowroomPrice: '7,20,000',
        fuelType: 'DIESEL',
        vehTypeName: 'COMMERCIAL',
        vehSubTypeName: 'PASSENGER VAN',
        makeName: 'TATA',
        modelName: 'MAGIC',
        variance: 'EX PASSENGER',
        vehiclePurDate: '08/02/2017 00:00:00',
        seatsCapacity: '8',
        transTonnageCapacity: '1.2 TON',
        vehicleWeight: '1100',
        vehicleRegDate: '14/02/2017 15:30:00',
        rtoLocation: 'MH-12 PUNE',
        branchName: 'PUNE'
    },
    {
        id: 12,
        erpId: 438,
        custName: 'PRAVIN DILIP BHOSALE',
        regNo: 'MH13CD3344',
        chassisNo: 'MD322334455667788',
        engineNo: 'TVS990011',
        mfgMonth: '10',
        mfgYear: '2022',
        exShowroomPrice: '92,000',
        fuelType: 'PETROL',
        vehTypeName: '2-WHEELER',
        vehSubTypeName: 'SCOOTER',
        makeName: 'TVS',
        modelName: 'JUPITER 125',
        variance: 'DISC',
        vehiclePurDate: '15/10/2022 00:00:00',
        seatsCapacity: '2',
        transTonnageCapacity: '',
        vehicleWeight: '108',
        vehicleRegDate: '22/10/2022 16:15:00',
        rtoLocation: 'MH-13 SOLAPUR',
        branchName: 'AKLUJ'
    }
];

const DeleteVehicleTab: React.FC = () => {
    const [vehicles, setVehicles] = useState<VehicleRecord[]>(INITIAL_VEHICLES);
    const [custNameSearch, setCustNameSearch] = useState('');
    const [vehicleNoSearch, setVehicleNoSearch] = useState('');
    const [selectedVehicleToDelete, setSelectedVehicleToDelete] = useState<VehicleRecord | null>(null);
    const [deleteReason, setDeleteReason] = useState('Duplicate registration entry');
    const [customReason, setCustomReason] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const tableScrollRef = useRef<HTMLDivElement>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const scrollTable = (amount: number) => {
        if (tableScrollRef.current) {
            tableScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    const scrollTableToEdge = (edge: 'start' | 'end') => {
        if (tableScrollRef.current) {
            tableScrollRef.current.scrollTo({
                left: edge === 'start' ? 0 : tableScrollRef.current.scrollWidth,
                behavior: 'smooth'
            });
        }
    };

    // Filter vehicles by customer name and vehicle number
    const filteredVehicles = useMemo(() => {
        return vehicles.filter(v => {
            const matchesCustName = !custNameSearch.trim() ||
                (v.custName && v.custName.toLowerCase().includes(custNameSearch.trim().toLowerCase()));
            const matchesVehNo = !vehicleNoSearch.trim() ||
                (v.regNo && v.regNo.toLowerCase().includes(vehicleNoSearch.trim().toLowerCase()));
            return matchesCustName && matchesVehNo;
        });
    }, [vehicles, custNameSearch, vehicleNoSearch]);

    // Paginated records
    const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage) || 1;
    const paginatedVehicles = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredVehicles, currentPage, itemsPerPage]);

    // Handle delete confirmation
    const handleConfirmDelete = () => {
        if (!selectedVehicleToDelete) return;
        const regNo = selectedVehicleToDelete.regNo;
        const custName = selectedVehicleToDelete.custName;
        const erpId = selectedVehicleToDelete.erpId;

        setVehicles(prev => prev.filter(v => v.id !== selectedVehicleToDelete.id));
        setSelectedVehicleToDelete(null);
        setDeleteReason('Duplicate registration entry');
        setCustomReason('');

        showToast(`Vehicle ID #${erpId} [${regNo} - ${custName}] deleted successfully.`);
    };

    // Export to CSV
    const handleExportCSV = () => {
        const headers = [
            'ID', 'CUSTNAME', 'REGISTRATIONNO', 'CHAISENO', 'ENGINENO', 'MFGMONTH', 'MFGYEAR',
            'EX_SHOWROOMPRICE', 'FUELTYPE', 'VEH_TYPE_NAME', 'VEH_SUB_TYPE_NAME', 'MAKE_NAME',
            'MODEL_NAME', 'VARIANCE', 'VEHICLEPURDATE', 'SEATSCAPACITY', 'TRANSTONNAGECAPACITY',
            'VEHICLEWEIGHT', 'VEHICLEREGDATE', 'RTOLOCATION', 'BRANCHNAME'
        ];

        const rows = filteredVehicles.map(v => [
            v.erpId,
            `"${(v.custName || '').replace(/"/g, '""')}"`,
            `"${v.regNo || ''}"`,
            `"${v.chassisNo || 'NA'}"`,
            `"${v.engineNo || 'NA'}"`,
            `"${v.mfgMonth || 'NA'}"`,
            v.mfgYear || '',
            `"${v.exShowroomPrice || '-'}"`,
            `"${v.fuelType || ''}"`,
            `"${v.vehTypeName || ''}"`,
            `"${v.vehSubTypeName || 'NA'}"`,
            `"${v.makeName || ''}"`,
            `"${v.modelName || ''}"`,
            `"${v.variance || ''}"`,
            `"${v.vehiclePurDate || ''}"`,
            v.seatsCapacity || '5',
            `"${v.transTonnageCapacity || '-'}"`,
            v.vehicleWeight || '',
            `"${v.vehicleRegDate || ''}"`,
            `"${v.rtoLocation || ''}"`,
            `"${v.branchName || ''}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `reliable_deleted_vehicles_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Exported ${filteredVehicles.length} records to CSV`);
    };

    const handleResetFilters = () => {
        setCustNameSearch('');
        setVehicleNoSearch('');
        setCurrentPage(1);
    };

    return (
        <div className="tab-transition-wrapper space-y-4 w-full min-w-0">
            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 bg-[#0B203C] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* ERP Header Information Stats Ribbon (Matches Legacy ERP Top Stats in Blue Theme) */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center font-bold">
                        <Car size={22} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold text-brand-navy">Delete Vehicle Record</h3>
                        <p className="text-xs text-brand-muted">
                            Search customer or vehicle registration number to identify and safely purge vehicle details
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    {/* Completed Entries Badge matching screenshot */}
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-blue-50/80 border border-blue-200/80 rounded-lg">
                        <span className="text-xs font-semibold text-slate-600">Completed Entries</span>
                        <span className="px-2 py-0.5 bg-brand-primary text-white text-xs font-bold rounded-full">
                            {vehicles.length}
                        </span>
                    </div>

                    {/* Support Request Badge */}
                    <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg">
                        <span className="text-xs font-semibold text-slate-600">Support Request</span>
                        <span className="px-2 py-0.5 bg-slate-600 text-white text-xs font-bold rounded-full">
                            0
                        </span>
                    </div>

                    {/* Current System Status */}
                    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-lg">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Current Grid / System Grid Active</span>
                    </div>
                </div>
            </div>

            {/* Search Toolbar with the 2 exact search inputs from the screenshot */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm p-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* The 2 search inputs from the screenshot */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 max-w-3xl">
                        {/* 1. Search customer name Here */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                            <input
                                type="text"
                                value={custNameSearch}
                                onChange={(e) => {
                                    setCustNameSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search customer name Here"
                                className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#CBD5E1] rounded-lg text-sm text-slate-800 placeholder-[#94A3B8] shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-medium"
                            />
                            {custNameSearch && (
                                <button
                                    type="button"
                                    onClick={() => setCustNameSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                                    title="Clear customer name search"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        {/* 2. Search Vehicle No Here */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                            <input
                                type="text"
                                value={vehicleNoSearch}
                                onChange={(e) => {
                                    setVehicleNoSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                placeholder="Search Vehicle No Here"
                                className="w-full pl-10 pr-9 py-2.5 bg-white border border-[#CBD5E1] rounded-lg text-sm text-slate-800 placeholder-[#94A3B8] shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-mono uppercase font-medium"
                            />
                            {vehicleNoSearch && (
                                <button
                                    type="button"
                                    onClick={() => setVehicleNoSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                                    title="Clear vehicle number search"
                                >
                                    <X size={15} />
                                </button>
                            )}
                        </div>

                        {(custNameSearch || vehicleNoSearch) && (
                            <button
                                type="button"
                                onClick={handleResetFilters}
                                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                            >
                                <RefreshCw size={13} />
                                <span>Reset</span>
                            </button>
                        )}
                    </div>

                    {/* Action buttons on the right: Export + Horizontal Scroll Navigator */}
                    <div className="flex items-center gap-3 flex-wrap justify-between lg:justify-end">
                        {/* Horizontal Quick Scroll Navigation Controls */}
                        <div className="inline-flex items-center bg-white border border-brand-border rounded-lg p-0.5 shadow-2xs">
                            <button
                                type="button"
                                onClick={() => scrollTableToEdge('start')}
                                className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded cursor-pointer border-none transition-colors"
                                title="Scroll to beginning (Column 1: DELETE)"
                            >
                                <ChevronsLeft size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollTable(-500)}
                                className="px-2 py-1 text-xs font-medium text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded flex items-center gap-1 cursor-pointer border-none transition-colors"
                                title="Scroll left"
                            >
                                <ChevronLeft size={14} />
                                <span className="hidden sm:inline">Left</span>
                            </button>
                            <span className="h-4 w-px bg-slate-200 mx-0.5"></span>
                            <button
                                type="button"
                                onClick={() => scrollTable(500)}
                                className="px-2 py-1 text-xs font-medium text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded flex items-center gap-1 cursor-pointer border-none transition-colors"
                                title="Scroll right"
                            >
                                <span className="hidden sm:inline">Right</span>
                                <ChevronRight size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollTableToEdge('end')}
                                className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded cursor-pointer border-none transition-colors"
                                title="Scroll to end (Column 22: BRANCHNAME)"
                            >
                                <ChevronsRight size={16} />
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleExportCSV}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            <Download size={15} />
                            <span>Export CSV</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Container Card */}
            <div className="bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden flex flex-col w-full min-w-0">
                {/* Table Header Status Banner */}
                <div className="bg-blue-50/60 px-4 py-2.5 border-b border-brand-border flex items-center justify-between text-xs text-brand-navy">
                    <div className="flex items-center gap-2 font-medium">
                        <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                        <span>
                            Showing <strong className="text-slate-900 font-bold">{filteredVehicles.length}</strong> matching records
                            {custNameSearch && <span> for customer "<strong className="text-brand-primary">{custNameSearch}</strong>"</span>}
                            {vehicleNoSearch && <span> with vehicle number "<strong className="text-brand-primary">{vehicleNoSearch}</strong>"</span>}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-brand-primary bg-white px-2.5 py-1 rounded border border-blue-200/80 font-medium">
                        <span>↔</span>
                        <span>Scroll horizontally to view all 22 columns</span>
                    </div>
                </div>

                {/* Horizontal Scrolling Grid with all 22 Columns */}
                <div
                    ref={tableScrollRef}
                    className="w-full overflow-x-auto min-w-0 erp-horizontal-scrollbar"
                    style={{ maxWidth: '100%' }}
                >
                    <table className="text-left border-collapse min-w-[3400px] w-full text-[13px]">
                        <thead>
                            {/* Blue Header Theme matching the application style */}
                            <tr className="bg-brand-primary text-white font-bold text-[12px] tracking-wider uppercase border-b-2 border-blue-700 select-none">
                                {/* Col 1: DELETE (Matches legacy screenshot) */}
                                <th className="py-3.5 px-4 w-[110px] min-w-[110px] text-center border-r border-white/20 whitespace-nowrap sticky left-0 z-20 bg-brand-primary shadow-[2px_0_4px_rgba(0,0,0,0.1)]">
                                    DELETE
                                </th>
                                {/* Col 2: ID */}
                                <th className="py-3.5 px-4 w-[90px] min-w-[90px] text-center border-r border-white/20 whitespace-nowrap">
                                    ID
                                </th>
                                {/* Col 3: CUSTNAME */}
                                <th className="py-3.5 px-4 w-[280px] min-w-[280px] border-r border-white/20 whitespace-nowrap">
                                    CUSTNAME
                                </th>
                                {/* Col 4: REGISTRATIONNO */}
                                <th className="py-3.5 px-4 w-[180px] min-w-[180px] border-r border-white/20 whitespace-nowrap">
                                    REGISTRATIONNO
                                </th>
                                {/* Col 5: CHAISENO */}
                                <th className="py-3.5 px-4 w-[200px] min-w-[200px] border-r border-white/20 whitespace-nowrap">
                                    CHAISENO
                                </th>
                                {/* Col 6: ENGINENO */}
                                <th className="py-3.5 px-4 w-[180px] min-w-[180px] border-r border-white/20 whitespace-nowrap">
                                    ENGINENO
                                </th>
                                {/* Col 7: MFGMONTH */}
                                <th className="py-3.5 px-4 w-[120px] min-w-[120px] text-center border-r border-white/20 whitespace-nowrap">
                                    MFGMONTH
                                </th>
                                {/* Col 8: MFGYEAR */}
                                <th className="py-3.5 px-4 w-[110px] min-w-[110px] text-center border-r border-white/20 whitespace-nowrap">
                                    MFGYEAR
                                </th>
                                {/* Col 9: EX_SHOWROOMPRICE */}
                                <th className="py-3.5 px-4 w-[180px] min-w-[180px] border-r border-white/20 whitespace-nowrap text-right">
                                    EX_SHOWROOMPRICE
                                </th>
                                {/* Col 10: FUELTYPE */}
                                <th className="py-3.5 px-4 w-[130px] min-w-[130px] border-r border-white/20 whitespace-nowrap">
                                    FUELTYPE
                                </th>
                                {/* Col 11: VEH_TYPE_NAME */}
                                <th className="py-3.5 px-4 w-[160px] min-w-[160px] border-r border-white/20 whitespace-nowrap">
                                    VEH_TYPE_NAME
                                </th>
                                {/* Col 12: VEH_SUB_TYPE_NAME */}
                                <th className="py-3.5 px-4 w-[180px] min-w-[180px] border-r border-white/20 whitespace-nowrap">
                                    VEH_SUB_TYPE_NAME
                                </th>
                                {/* Col 13: MAKE_NAME */}
                                <th className="py-3.5 px-4 w-[180px] min-w-[180px] border-r border-white/20 whitespace-nowrap">
                                    MAKE_NAME
                                </th>
                                {/* Col 14: MODEL_NAME */}
                                <th className="py-3.5 px-4 w-[200px] min-w-[200px] border-r border-white/20 whitespace-nowrap">
                                    MODEL_NAME
                                </th>
                                {/* Col 15: VARIANCE */}
                                <th className="py-3.5 px-4 w-[180px] min-w-[180px] border-r border-white/20 whitespace-nowrap">
                                    VARIANCE
                                </th>
                                {/* Col 16: VEHICLEPURDATE */}
                                <th className="py-3.5 px-4 w-[190px] min-w-[190px] border-r border-white/20 whitespace-nowrap">
                                    VEHICLEPURDATE
                                </th>
                                {/* Col 17: SEATSCAPACITY */}
                                <th className="py-3.5 px-4 w-[130px] min-w-[130px] text-center border-r border-white/20 whitespace-nowrap">
                                    SEATSCAPACITY
                                </th>
                                {/* Col 18: TRANSTONNAGECAPACITY */}
                                <th className="py-3.5 px-4 w-[200px] min-w-[200px] border-r border-white/20 whitespace-nowrap">
                                    TRANSTONNAGECAPACITY
                                </th>
                                {/* Col 19: VEHICLEWEIGHT */}
                                <th className="py-3.5 px-4 w-[150px] min-w-[150px] text-center border-r border-white/20 whitespace-nowrap">
                                    VEHICLEWEIGHT
                                </th>
                                {/* Col 20: VEHICLEREGDATE */}
                                <th className="py-3.5 px-4 w-[190px] min-w-[190px] border-r border-white/20 whitespace-nowrap">
                                    VEHICLEREGDATE
                                </th>
                                {/* Col 21: RTOLOCATION */}
                                <th className="py-3.5 px-4 w-[210px] min-w-[210px] border-r border-white/20 whitespace-nowrap">
                                    RTOLOCATION
                                </th>
                                {/* Col 22: BRANCHNAME */}
                                <th className="py-3.5 px-4 w-[160px] min-w-[160px] whitespace-nowrap">
                                    BRANCHNAME
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-border text-slate-700 bg-white">
                            {paginatedVehicles.length === 0 ? (
                                <tr>
                                    <td colSpan={22} className="py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Car size={36} className="text-slate-300" />
                                            <p className="text-base font-semibold text-slate-700">No vehicles match your search criteria</p>
                                            <p className="text-xs text-slate-400">Try modifying customer name or vehicle registration number filter</p>
                                            <button
                                                type="button"
                                                onClick={handleResetFilters}
                                                className="mt-2 px-4 py-1.5 bg-blue-50 text-brand-primary text-xs font-semibold rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
                                            >
                                                Clear Search Filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                paginatedVehicles.map((v, idx) => (
                                    <tr
                                        key={v.id}
                                        className={`h-[52px] transition-colors ${
                                            idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                                        } hover:bg-blue-50/40`}
                                    >
                                        {/* Col 1: DELETE (Sticky action button matching screenshot trash link) */}
                                        <td className={`py-2 px-3 text-center border-r border-slate-200 sticky left-0 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.06)] ${
                                            idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFCFE]'
                                        }`}>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedVehicleToDelete(v)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-brand-primary hover:text-rose-600 hover:bg-rose-50 rounded-md border border-blue-200/90 hover:border-rose-300 transition-colors cursor-pointer"
                                                title={`Delete vehicle ${v.regNo}`}
                                            >
                                                <Trash2 size={13} strokeWidth={2.2} />
                                                <span className="tracking-wide">DELETE</span>
                                            </button>
                                        </td>

                                        {/* Col 2: ID */}
                                        <td className="py-2 px-4 text-center border-r border-slate-200 font-mono font-semibold text-slate-700">
                                            {v.erpId}
                                        </td>

                                        {/* Col 3: CUSTNAME */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-semibold text-brand-navy whitespace-nowrap">
                                            {v.custName}
                                        </td>

                                        {/* Col 4: REGISTRATIONNO */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-mono font-bold text-brand-primary whitespace-nowrap">
                                            {v.regNo}
                                        </td>

                                        {/* Col 5: CHAISENO */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-mono text-xs text-slate-600 whitespace-nowrap">
                                            {v.chassisNo}
                                        </td>

                                        {/* Col 6: ENGINENO */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-mono text-xs text-slate-600 whitespace-nowrap">
                                            {v.engineNo}
                                        </td>

                                        {/* Col 7: MFGMONTH */}
                                        <td className="py-2 px-4 text-center border-r border-slate-200 text-slate-600">
                                            {v.mfgMonth}
                                        </td>

                                        {/* Col 8: MFGYEAR */}
                                        <td className="py-2 px-4 text-center border-r border-slate-200 font-medium text-slate-700">
                                            {v.mfgYear}
                                        </td>

                                        {/* Col 9: EX_SHOWROOMPRICE */}
                                        <td className="py-2 px-4 text-right border-r border-slate-200 font-medium text-slate-700 whitespace-nowrap">
                                            {v.exShowroomPrice ? `₹ ${v.exShowroomPrice}` : '-'}
                                        </td>

                                        {/* Col 10: FUELTYPE */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-semibold text-xs whitespace-nowrap">
                                            <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                                                v.fuelType === 'PETROL' ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                                                v.fuelType === 'DIESEL' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                                                v.fuelType === 'CNG' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                                                'bg-purple-50 text-purple-800 border border-purple-200'
                                            }`}>
                                                {v.fuelType}
                                            </span>
                                        </td>

                                        {/* Col 11: VEH_TYPE_NAME */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-medium text-slate-700 whitespace-nowrap">
                                            {v.vehTypeName}
                                        </td>

                                        {/* Col 12: VEH_SUB_TYPE_NAME */}
                                        <td className="py-2 px-4 border-r border-slate-200 text-slate-600 whitespace-nowrap">
                                            {v.vehSubTypeName}
                                        </td>

                                        {/* Col 13: MAKE_NAME */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-semibold text-brand-navy whitespace-nowrap">
                                            {v.makeName}
                                        </td>

                                        {/* Col 14: MODEL_NAME */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-medium text-slate-800 whitespace-nowrap">
                                            {v.modelName}
                                        </td>

                                        {/* Col 15: VARIANCE */}
                                        <td className="py-2 px-4 border-r border-slate-200 text-slate-700 whitespace-nowrap">
                                            {v.variance}
                                        </td>

                                        {/* Col 16: VEHICLEPURDATE */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-mono text-xs text-slate-600 whitespace-nowrap">
                                            {v.vehiclePurDate}
                                        </td>

                                        {/* Col 17: SEATSCAPACITY */}
                                        <td className="py-2 px-4 text-center border-r border-slate-200 font-medium text-slate-700">
                                            {v.seatsCapacity}
                                        </td>

                                        {/* Col 18: TRANSTONNAGECAPACITY */}
                                        <td className="py-2 px-4 border-r border-slate-200 text-slate-600 whitespace-nowrap">
                                            {v.transTonnageCapacity || '-'}
                                        </td>

                                        {/* Col 19: VEHICLEWEIGHT */}
                                        <td className="py-2 px-4 text-center border-r border-slate-200 font-mono text-xs text-slate-700">
                                            {v.vehicleWeight ? `${v.vehicleWeight} kg` : '-'}
                                        </td>

                                        {/* Col 20: VEHICLEREGDATE */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-mono text-xs text-slate-600 whitespace-nowrap">
                                            {v.vehicleRegDate}
                                        </td>

                                        {/* Col 21: RTOLOCATION */}
                                        <td className="py-2 px-4 border-r border-slate-200 font-medium text-slate-700 whitespace-nowrap">
                                            {v.rtoLocation}
                                        </td>

                                        {/* Col 22: BRANCHNAME */}
                                        <td className="py-2 px-4 font-semibold text-brand-primary whitespace-nowrap">
                                            {v.branchName}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer: Pagination & Record Count (Matching BranchMaster and other pages) */}
                <div className="p-4 bg-slate-50 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                        <span>Records per page:</span>
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                setItemsPerPage(Number(e.target.value));
                                setCurrentPage(1);
                            }}
                            className="px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    <span className="text-xs text-slate-500 font-medium">
                        Showing {filteredVehicles.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredVehicles.length)} of {filteredVehicles.length} records
                    </span>

                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all cursor-pointer ${
                                    currentPage === page
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirm Vehicle Deletion Modal with Blue Theme & Details */}
            {selectedVehicleToDelete && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        {/* Modal Header */}
                        <div className="bg-[#102A4C] text-white px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 bg-rose-500/20 text-rose-300 rounded-lg">
                                    <AlertTriangle size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-base">Confirm Vehicle Deletion</h3>
                                    <p className="text-xs text-slate-300">Permanent record removal from ERP database</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedVehicleToDelete(null)}
                                className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-4">
                            {/* Vehicle Details Card */}
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-sm">
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Customer Name</span>
                                    <span className="font-bold text-brand-navy">{selectedVehicleToDelete.custName}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Registration No</span>
                                    <span className="font-mono font-bold text-brand-primary">{selectedVehicleToDelete.regNo}</span>
                                </div>
                                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">Make & Model</span>
                                    <span className="font-medium text-slate-800">{selectedVehicleToDelete.makeName} - {selectedVehicleToDelete.modelName} ({selectedVehicleToDelete.variance})</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-semibold text-slate-500 uppercase">ERP ID / Branch</span>
                                    <span className="font-mono text-xs text-slate-600">ID #{selectedVehicleToDelete.erpId} • {selectedVehicleToDelete.branchName}</span>
                                </div>
                            </div>

                            {/* Deletion Reason Selector */}
                            <div>
                                <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                                    Reason for Deletion <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={deleteReason}
                                    onChange={(e) => setDeleteReason(e.target.value)}
                                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                                >
                                    <option value="Duplicate registration entry">Duplicate registration entry</option>
                                    <option value="Data entry typing error">Data entry typing error</option>
                                    <option value="Customer request / Policy cancelled">Customer request / Policy cancelled</option>
                                    <option value="Vehicle scrapped / Total loss">Vehicle scrapped / Total loss</option>
                                    <option value="RTO unlinked transfer">RTO unlinked transfer</option>
                                    <option value="Other">Other reason...</option>
                                </select>
                            </div>

                            {deleteReason === 'Other' && (
                                <div>
                                    <label className="block text-xs font-bold text-brand-navy uppercase mb-1.5">
                                        Specify Reason
                                    </label>
                                    <input
                                        type="text"
                                        value={customReason}
                                        onChange={(e) => setCustomReason(e.target.value)}
                                        placeholder="Enter specific audit remarks"
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                                    />
                                </div>
                            )}

                            {/* Audit Warning */}
                            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 flex items-start gap-2.5 text-xs text-amber-800">
                                <ShieldAlert size={16} className="text-amber-600 shrink-0 mt-0.5" />
                                <span>This action will be logged with user ID and timestamp in the system audit trail.</span>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setSelectedVehicleToDelete(null)}
                                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmDelete}
                                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer border-none flex items-center gap-1.5"
                                >
                                    <Trash2 size={15} />
                                    <span>Delete Vehicle</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeleteVehicleTab;
