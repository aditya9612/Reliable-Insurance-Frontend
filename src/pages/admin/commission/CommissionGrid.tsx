import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import {
    Search, Plus, Edit2, Trash2, X, CheckCircle2, Percent,
    Calculator, Upload, Download, RefreshCw, AlertTriangle,
    Sliders, Check, ArrowRight, ShieldCheck, Car, HelpCircle,
    Building2, FileText, TrendingUp
} from 'lucide-react';

export type CommissionSubTab =
    | 'agent-commission'
    | 'multiple-agent-commission'
    | 'broker-commission'
    | 'multiple-broker-commission'
    | 'extra-commission-amount'
    | 'latest-agent-commission'
    | 'broker-latest-grid'
    | 'new-broker-commission'
    | 'new-agent-commission'
    | 'executive-self-incentive'
    | 'multiple-executive-self-incentive'
    | 'check-grid'
    | 'comm-veh-age'
    | 'year-slab'
    | 'multiple-agent-broker-comm'
    | 'import-broker-grid'
    | 'decline-model-new';

export interface CommissionCategory {
    id: string;
    label: string;
    icon: React.ElementType;
    defaultTab: CommissionSubTab;
    tabs: TabItem[];
}

export const commissionCategories: CommissionCategory[] = [
    {
        id: 'agent',
        label: 'Agent Commission',
        icon: Percent,
        defaultTab: 'agent-commission',
        tabs: [
            { id: 'agent-commission', label: 'Agent Commission' },
            { id: 'multiple-agent-commission', label: 'Multiple Agent Commission' },
            { id: 'latest-agent-commission', label: 'Latest Agent Commission' },
            { id: 'new-agent-commission', label: 'New Agent Commission' },
        ]
    },
    {
        id: 'broker',
        label: 'Broker Commission',
        icon: Building2,
        defaultTab: 'broker-commission',
        tabs: [
            { id: 'broker-commission', label: 'Broker Commission' },
            { id: 'multiple-broker-commission', label: 'Multiple Broker Commission' },
            { id: 'broker-latest-grid', label: 'Broker Latest Grid' },
            { id: 'new-broker-commission', label: 'New Broker Commission' },
            { id: 'import-broker-grid', label: 'Import Broker Grid' },
        ]
    },
    {
        id: 'executive',
        label: 'Executive Incentive',
        icon: TrendingUp,
        defaultTab: 'executive-self-incentive',
        tabs: [
            { id: 'executive-self-incentive', label: 'Executive Self Insentive' },
            { id: 'multiple-executive-self-incentive', label: 'Multiple Executive Self Insentive' },
        ]
    },
    {
        id: 'extra',
        label: 'Extra Commission',
        icon: ShieldCheck,
        defaultTab: 'extra-commission-amount',
        tabs: [
            { id: 'extra-commission-amount', label: 'Extra Commission Amount' },
            { id: 'multiple-agent-broker-comm', label: 'Multiple Agent Broker Comm' },
        ]
    },
    {
        id: 'slabs',
        label: 'Vehicle & Year Slabs',
        icon: Car,
        defaultTab: 'comm-veh-age',
        tabs: [
            { id: 'comm-veh-age', label: 'Comm Veh Age' },
            { id: 'year-slab', label: 'Year Slab' },
            { id: 'decline-model-new', label: 'Decline Model New' },
        ]
    },
    {
        id: 'calculator',
        label: 'Check Grid',
        icon: Calculator,
        defaultTab: 'check-grid',
        tabs: [
            { id: 'check-grid', label: 'Check Grid Simulator' },
        ]
    },
];

export const allCommissionTabs: TabItem[] = commissionCategories.flatMap(c => c.tabs);

const CommissionGrid: React.FC = () => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();

    const activeTab = (tab && allCommissionTabs.some(t => t.id === tab))
        ? (tab as CommissionSubTab)
        : 'agent-commission';

    const currentCategory = commissionCategories.find(c =>
        c.tabs.some(t => t.id === activeTab)
    ) || commissionCategories[0];

    const handleTabChange = (newTabId: string) => {
        navigate(`/commission-grid/${newTabId}`);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [modalType, setModalType] = useState<string | null>(null);

    // ==========================================
    // 1 & 6: AGENT COMMISSION DATA
    // ==========================================
    const [agentCommissions, setAgentCommissions] = useState([
        { id: 1, company: 'HDFC ERGO', vehicleClass: '4W PRIVATE CAR', policyType: 'COMPREHENSIVE', fuel: 'PETROL / DIESEL', odRate: '16.5%', tpRate: '2.5%', netRate: '15.0%', validFrom: '01/04/2026', status: 'ACTIVE' },
        { id: 2, company: 'ICICI LOMBARD', vehicleClass: '2W MOTORCYCLE', policyType: 'COMPREHENSIVE', fuel: 'ALL', odRate: '19.0%', tpRate: '2.5%', netRate: '17.5%', validFrom: '01/04/2026', status: 'ACTIVE' },
        { id: 3, company: 'BAJAJ ALLIANZ', vehicleClass: 'COMMERCIAL GOODS (GCV)', policyType: 'PACKAGE', fuel: 'DIESEL', odRate: '12.0%', tpRate: '2.0%', netRate: '11.0%', validFrom: '01/05/2026', status: 'ACTIVE' },
        { id: 4, company: 'TATA AIG', vehicleClass: '4W PRIVATE CAR', policyType: 'SAOD', fuel: 'ALL', odRate: '18.0%', tpRate: '0.0%', netRate: '16.5%', validFrom: '15/05/2026', status: 'ACTIVE' },
        { id: 5, company: 'GO DIGIT', vehicleClass: '2W SCOOTER', policyType: 'COMPREHENSIVE', fuel: 'ELECTRIC / EV', odRate: '21.0%', tpRate: '2.5%', netRate: '19.0%', validFrom: '01/06/2026', status: 'ACTIVE' },
    ]);

    // ==========================================
    // 2: MULTIPLE AGENT COMMISSION (TIERED)
    // ==========================================
    const [tieredAgentGrid, setTieredAgentGrid] = useState([
        { id: 1, tier: 'PLATINUM PARTNER', minPremium: '₹ 15,00,000+', baseComm: '18.0%', kickerBonus: '+ 3.5%', totalComm: '21.5%', agentsCount: 14 },
        { id: 2, tier: 'GOLD PARTNER', minPremium: '₹ 8,00,000 - 14,99,999', baseComm: '16.5%', kickerBonus: '+ 2.0%', totalComm: '18.5%', agentsCount: 38 },
        { id: 3, tier: 'SILVER PARTNER', minPremium: '₹ 3,00,000 - 7,99,999', baseComm: '15.0%', kickerBonus: '+ 1.0%', totalComm: '16.0%', agentsCount: 92 },
        { id: 4, tier: 'BRONZE / NEW POSP', minPremium: '₹ 0 - 2,99,999', baseComm: '14.0%', kickerBonus: '0.0%', totalComm: '14.0%', agentsCount: 268 },
    ]);

    // ==========================================
    // 3 & 7: BROKER COMMISSION DATA
    // ==========================================
    const [brokerCommissions, setBrokerCommissions] = useState([
        { id: 1, company: 'HDFC ERGO', category: 'MOTOR PRIVATE CAR', brokerageOd: '22.5%', brokerageTp: '3.5%', slaDays: '15 Days', tdsRate: '5.0%', status: 'ACTIVE' },
        { id: 2, company: 'ICICI LOMBARD', category: 'MOTOR TWO WHEELER', brokerageOd: '25.0%', brokerageTp: '3.5%', slaDays: '15 Days', tdsRate: '5.0%', status: 'ACTIVE' },
        { id: 3, company: 'TATA AIG', category: 'COMMERCIAL VEHICLE', brokerageOd: '17.5%', brokerageTp: '2.5%', slaDays: '30 Days', tdsRate: '5.0%', status: 'ACTIVE' },
        { id: 4, company: 'RELIANCE GENERAL', category: 'MOTOR PRIVATE CAR', brokerageOd: '21.0%', brokerageTp: '3.0%', slaDays: '20 Days', tdsRate: '5.0%', status: 'ACTIVE' },
        { id: 5, company: 'GO DIGIT', category: 'MOTOR EV & HYBRID', brokerageOd: '26.0%', brokerageTp: '3.5%', slaDays: '10 Days', tdsRate: '5.0%', status: 'ACTIVE' },
    ]);

    // ==========================================
    // 5: EXTRA COMMISSION AMOUNT
    // ==========================================
    const [extraCommissions, setExtraCommissions] = useState([
        { id: 1, schemeName: 'FESTIVE DIWALI OD BOOST', company: 'HDFC ERGO', vehicleClass: '4W PRIVATE CAR', extraPercent: '+ 2.5% OD', fixedKicker: '₹ 250 / file', validUpto: '05/11/2026', status: 'ACTIVE' },
        { id: 2, schemeName: 'TWO WHEELER RENEWAL ACCELERATOR', company: 'ALL INSURERS', vehicleClass: '2W ALL', extraPercent: '+ 1.5% OD', fixedKicker: '₹ 50 / file', validUpto: '31/10/2026', status: 'ACTIVE' },
        { id: 3, schemeName: 'NEW EV INCENTIVE CAMPAIGN', company: 'GO DIGIT', vehicleClass: 'EV 2W & 4W', extraPercent: '+ 3.0% OD', fixedKicker: '₹ 500 / file', validUpto: '31/12/2026', status: 'ACTIVE' },
    ]);

    // ==========================================
    // 10 & 11: EXECUTIVE SELF INCENTIVE
    // ==========================================
    const [executiveIncentives, setExecutiveIncentives] = useState([
        { id: 1, level: 'DIRECT BUSINESS (LEVEL 1)', minVolume: '₹ 50,000 - 2,00,000', incentiveRate: '2.5% OD', payoutFrequency: 'MONTHLY' },
        { id: 2, level: 'INTERMEDIATE SCALE (LEVEL 2)', minVolume: '₹ 2,00,001 - 5,00,000', incentiveRate: '3.5% OD', payoutFrequency: 'MONTHLY' },
        { id: 3, level: 'HIGH VALUE PRODUCER (LEVEL 3)', minVolume: '₹ 5,00,001 - 10,00,000', incentiveRate: '4.5% OD', payoutFrequency: 'MONTHLY' },
        { id: 4, level: 'BRANCH APEX CLUB (LEVEL 4)', minVolume: '₹ 10,00,000+', incentiveRate: '6.0% OD + ₹ 10,000 BONUS', payoutFrequency: 'MONTHLY' },
    ]);

    // ==========================================
    // 12: CHECK GRID (SIMULATOR)
    // ==========================================
    const [calcCompany, setCalcCompany] = useState('HDFC ERGO');
    const [calcVehicleClass, setCalcVehicleClass] = useState('4W PRIVATE CAR');
    const [calcOdPremium, setCalcOdPremium] = useState<number>(24000);
    const [calcTpPremium, setCalcTpPremium] = useState<number>(4500);

    const calcBrokerOd = calcOdPremium * 0.225;
    const calcBrokerTp = calcTpPremium * 0.035;
    const calcTotalBrokerage = calcBrokerOd + calcBrokerTp;

    const calcAgentOd = calcOdPremium * 0.165;
    const calcAgentTp = calcTpPremium * 0.025;
    const calcTotalAgentPayout = calcAgentOd + calcAgentTp;

    const calcNetCompanyMargin = calcTotalBrokerage - calcTotalAgentPayout;

    // ==========================================
    // 13 & 14: VEHICLE AGE & YEAR SLAB
    // ==========================================
    const [vehAgeSlabs, setVehAgeSlabs] = useState([
        { id: 1, ageRange: '0 to 1 Year (Brand New)', odCommModifier: '100% of Grid Rate', maxCap: '22%', remarks: 'Standard OEM Grid' },
        { id: 2, ageRange: '1 to 3 Years', odCommModifier: '95% of Grid Rate', maxCap: '20%', remarks: 'Standard Renewal' },
        { id: 3, ageRange: '3 to 5 Years', odCommModifier: '85% of Grid Rate', maxCap: '17%', remarks: 'Inspection Waiver' },
        { id: 4, ageRange: '5 to 10 Years', odCommModifier: '70% of Grid Rate', maxCap: '14%', remarks: 'Mandatory Inspection' },
        { id: 5, ageRange: '10+ Years (Vintage/Old)', odCommModifier: '50% of Grid Rate', maxCap: '9%', remarks: 'Underwriting Clearance' },
    ]);

    // ==========================================
    // 17: DECLINE MODEL NEW
    // ==========================================
    const [declineModels, setDeclineModels] = useState([
        { id: 1, make: 'HYUNDAI', model: 'SANTRO (OLD 2005-2009)', classType: 'PRIVATE CAR', reason: 'High Parts Scarcity & Claim Ratio', commPayout: '0% (NO COMMISSION)', status: 'BLOCKED' },
        { id: 2, make: 'TATA MOTORS', model: 'INDICA V2 DIESEL (COMMERCIAL PERMIT)', classType: 'TAXI / TOURIST', reason: 'Severe Adverse Loss Ratio', commPayout: '0% (NO COMMISSION)', status: 'BLOCKED' },
        { id: 3, make: 'CHEVROLET', model: 'ALL MODELS (BEAT / CRUZE / SPARK)', classType: 'PRIVATE CAR', reason: 'Manufacturer OEM Exited India', commPayout: '0% (NO COMMISSION)', status: 'BLOCKED' },
        { id: 4, make: 'MAHINDRA', model: 'MAXIMO / GIO COMMERCIAL', classType: 'GOODS CARRYING', reason: 'High Overturning Frequency', commPayout: '2.5% TP ONLY', status: 'RESTRICTED' },
    ]);

    // ==========================================
    // 16: IMPORT BROKER GRID STATE
    // ==========================================
    const [importCarrier, setImportCarrier] = useState('ALL');
    const [importCycle, setImportCycle] = useState('OCTOBER 2026');
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [importHistory] = useState([
        { id: 1, batchId: 'IMP-2026-SEP-01', insurer: 'HDFC ERGO', fileName: 'hdfc_broker_grid_sep26.xlsx', uploadedBy: 'Admin User', date: '02/10/2026', records: '128 Entries', status: 'APPLIED' },
        { id: 2, batchId: 'IMP-2026-AUG-02', insurer: 'ICICI LOMBARD', fileName: 'icici_ratecard_aug26.csv', uploadedBy: 'Admin User', date: '15/08/2026', records: '94 Entries', status: 'APPLIED' },
        { id: 3, batchId: 'IMP-2026-JUL-01', insurer: 'TATA AIG', fileName: 'tata_aig_cv_grid_jul26.xlsx', uploadedBy: 'Admin User', date: '01/07/2026', records: '112 Entries', status: 'ARCHIVED' },
    ]);

    const getActiveTitle = () => {
        const found = allCommissionTabs.find(t => t.id === activeTab);
        return found ? found.label : 'Commission Grid';
    };

    const getActiveDesc = () => {
        switch (activeTab) {
            case 'agent-commission': return 'Define and view outbound commission percentage slabs payable to POSP and field agents.';
            case 'multiple-agent-commission': return 'Multi-tier volume milestone grids and performance-based booster payout rates.';
            case 'broker-commission': return 'Inbound brokerage schedules contracted with general and life insurance carriers.';
            case 'multiple-broker-commission': return 'Comparative multi-broker commission matrices and reinsurance treaty shares.';
            case 'extra-commission-amount': return 'Campaign incentives, file-level bonus kickers, and festive period rewards.';
            case 'latest-agent-commission': return 'Current active version of POSP rate cards with valid date thresholds.';
            case 'broker-latest-grid': return 'Real-time updated insurer brokerage agreements and SLA settlement terms.';
            case 'new-broker-commission': return 'Create and register new carrier brokerage payout formulas and master agreements.';
            case 'new-agent-commission': return 'Configure custom agent commissions by vehicle subclass and coverage code.';
            case 'executive-self-incentive': return 'Direct employee and executive sales incentives for self-sourced insurance files.';
            case 'multiple-executive-self-incentive': return 'Tiered branch management commission thresholds and milestone accelerators.';
            case 'check-grid': return 'Interactive Commission Simulator — calculate real-time broker margin and agent payouts.';
            case 'comm-veh-age': return 'Vehicle age-dependent commission percentage modifiers and inspection criteria.';
            case 'year-slab': return 'Model manufacturing year slabs and age depreciation payout adjustments.';
            case 'multiple-agent-broker-comm': return 'Cross-commission sharing matrix between direct agent and co-broker entities.';
            case 'import-broker-grid': return 'Upload and parse insurer brokerage schedules via Excel or CSV bulk files.';
            case 'decline-model-new': return 'Excluded vehicle models and negative category vehicles ineligible for commission.';
        }
    };

    return (
        <div className="w-full max-w-full flex flex-col space-y-5 min-w-0">
            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Page Header */}
            <PageHeader
                title={`Commission Grid — ${getActiveTitle()}`}
                description={getActiveDesc()}
                action={
                    activeTab === 'import-broker-grid' ? (
                        <button
                            onClick={() => showToast('Broker commission template downloaded!')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-[8px] text-[14px] font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            <Download size={16} /> Download Template
                        </button>
                    ) : activeTab === 'check-grid' ? (
                        <button
                            onClick={() => showToast('Simulation saved to report audit log!')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] text-[14px] font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            <FileText size={16} /> Save Simulation
                        </button>
                    ) : (
                        <button
                            onClick={() => showToast('Commission grid exported successfully!')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] text-[14px] font-semibold shadow-sm transition-all cursor-pointer border-none"
                        >
                            <Download size={16} /> Export Grid
                        </button>
                    )
                }
            />

            {/* Commission Category Navigation Bar (Page Top Side) */}
            <div className="bg-white p-1.5 sm:p-2 rounded-xl border border-brand-border/80 shadow-xs w-full overflow-hidden">
                <div className="flex items-center w-full flex-nowrap gap-1 sm:gap-1.5 justify-between">
                    {commissionCategories.map(cat => {
                        const isSelected = cat.id === currentCategory.id;
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => handleTabChange(cat.defaultTab)}
                                className={`flex-1 flex items-center justify-center gap-1.5 px-2 sm:px-2.5 py-2 rounded-lg text-xs xl:text-[13px] font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer border-none min-w-0 ${
                                    isSelected
                                        ? 'bg-brand-primary text-white shadow-xs'
                                        : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/90'
                                }`}
                            >
                                <Icon size={14} className={isSelected ? 'text-white shrink-0' : 'text-slate-400 shrink-0'} />
                                <span className="truncate">{cat.label}</span>
                                <span className={`px-1.5 py-0.5 rounded-full text-[10px] xl:text-[11px] font-bold shrink-0 ${
                                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {cat.tabs.length}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Horizontal Sub-Tabs for Active Category */}
            <UnderlineTabs
                tabs={currentCategory.tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {/* 1, 6, 8, 9: AGENT COMMISSION & LATEST AGENT COMMISSION */}
            {(activeTab === 'agent-commission' || activeTab === 'latest-agent-commission' || activeTab === 'new-agent-commission') && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full min-w-0">
                        <div className="p-4 bg-white border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search company, vehicle class, policy type..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-brand-muted font-medium">Filter By:</span>
                                <span className="px-2.5 py-1 bg-brand-lightbg text-brand-navy border border-brand-border rounded-[6px] text-xs font-semibold">Active Schedules ({agentCommissions.length})</span>
                            </div>
                        </div>

                        <div className="w-full overflow-hidden min-w-0">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                        <th className="py-3 px-3 w-[15%]">INSURANCE COMPANY</th>
                                        <th className="py-3 px-3 w-[16%]">VEHICLE CLASS</th>
                                        <th className="py-3 px-3 w-[13%]">POLICY TYPE</th>
                                        <th className="py-3 px-3 w-[11%]">FUEL TYPE</th>
                                        <th className="py-3 px-3 text-right w-[9%]">OD COMM %</th>
                                        <th className="py-3 px-3 text-right w-[9%]">TP COMM %</th>
                                        <th className="py-3 px-3 text-right w-[9%]">NET COMM %</th>
                                        <th className="py-3 px-3 text-center w-[10%]">EFFECTIVE DATE</th>
                                        <th className="py-3 px-3 text-center w-[8%]">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {agentCommissions
                                        .filter(a => !searchQuery || a.company.toLowerCase().includes(searchQuery.toLowerCase()) || a.vehicleClass.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(a => (
                                            <tr key={a.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                                                <td className="py-2.5 px-3 font-semibold text-brand-navy truncate text-xs" title={a.company}>{a.company}</td>
                                                <td className="py-2.5 px-3 text-xs font-medium text-brand-navy truncate" title={a.vehicleClass}>{a.vehicleClass}</td>
                                                <td className="py-2.5 px-3">
                                                    <span className="px-2 py-0.5 rounded-[6px] text-xs font-medium bg-brand-lightbg text-brand-navy whitespace-nowrap">{a.policyType}</span>
                                                </td>
                                                <td className="py-2.5 px-3 text-xs text-brand-muted truncate" title={a.fuel}>{a.fuel}</td>
                                                <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 text-xs whitespace-nowrap">{a.odRate}</td>
                                                <td className="py-2.5 px-3 text-right font-mono text-xs font-medium text-brand-muted whitespace-nowrap">{a.tpRate}</td>
                                                <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-primary text-xs whitespace-nowrap">{a.netRate}</td>
                                                <td className="py-2.5 px-3 text-center text-xs text-brand-muted font-mono whitespace-nowrap">{a.validFrom}</td>
                                                <td className="py-2.5 px-3 text-center">
                                                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">
                                                        {a.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 2: MULTIPLE AGENT COMMISSION (TIERED) */}
            {activeTab === 'multiple-agent-commission' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full min-w-0">
                        <div className="p-4 bg-white border-b border-brand-border">
                            <h4 className="font-bold text-brand-navy text-sm">Tiered Performance Slab Structure</h4>
                            <p className="text-xs text-brand-muted">Volume-based incentive escalation for registered POSP networks</p>
                        </div>
                        <div className="w-full overflow-hidden min-w-0">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                        <th className="py-3 px-3 w-[18%]">PARTNER TIER</th>
                                        <th className="py-3 px-3 w-[26%]">QUARTERLY VOLUME REQUIREMENT</th>
                                        <th className="py-3 px-3 text-right w-[14%]">BASE COMMISSION</th>
                                        <th className="py-3 px-3 text-right w-[14%]">KICKER BOOSTER</th>
                                        <th className="py-3 px-3 text-right w-[14%]">TOTAL EFFECTIVE COMM</th>
                                        <th className="py-3 px-3 text-center w-[14%]">ACTIVE AGENTS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {tieredAgentGrid.map(t => (
                                        <tr key={t.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                                            <td className="py-2.5 px-3 font-bold text-brand-navy text-xs truncate" title={t.tier}>{t.tier}</td>
                                            <td className="py-2.5 px-3 text-xs text-brand-navy font-medium truncate" title={t.minPremium}>{t.minPremium}</td>
                                            <td className="py-2.5 px-3 text-right font-mono font-medium text-brand-navy text-xs whitespace-nowrap">{t.baseComm}</td>
                                            <td className="py-2.5 px-3 text-right font-mono font-semibold text-emerald-600 text-xs whitespace-nowrap">{t.kickerBonus}</td>
                                            <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-primary text-sm whitespace-nowrap">{t.totalComm}</td>
                                            <td className="py-2.5 px-3 text-center font-bold text-brand-navy text-xs whitespace-nowrap">{t.agentsCount} Partners</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 3, 4, 7, 8, 15: BROKER COMMISSION & MULTIPLE BROKER COMMISSION */}
            {(activeTab === 'broker-commission' || activeTab === 'multiple-broker-commission' || activeTab === 'broker-latest-grid' || activeTab === 'new-broker-commission' || activeTab === 'multiple-agent-broker-comm') && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full min-w-0">
                        <div className="w-full overflow-hidden min-w-0">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                        <th className="py-3 px-3 w-[20%]">INSURER / BROKER CARRIER</th>
                                        <th className="py-3 px-3 w-[20%]">LOB / CATEGORY</th>
                                        <th className="py-3 px-3 text-right w-[14%]">INWARD BROKERAGE (OD)</th>
                                        <th className="py-3 px-3 text-right w-[14%]">INWARD BROKERAGE (TP)</th>
                                        <th className="py-3 px-3 text-center w-[12%]">SLA SETTLEMENT</th>
                                        <th className="py-3 px-3 text-center w-[10%]">TDS DEDUCTION</th>
                                        <th className="py-3 px-3 text-center w-[10%]">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {brokerCommissions.map(b => (
                                        <tr key={b.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                                            <td className="py-2.5 px-3 font-semibold text-brand-navy truncate text-xs" title={b.company}>{b.company}</td>
                                            <td className="py-2.5 px-3 text-xs text-brand-navy font-medium truncate" title={b.category}>{b.category}</td>
                                            <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-primary text-xs whitespace-nowrap">{b.brokerageOd}</td>
                                            <td className="py-2.5 px-3 text-right font-mono text-xs font-semibold text-brand-navy whitespace-nowrap">{b.brokerageTp}</td>
                                            <td className="py-2.5 px-3 text-center text-xs text-brand-muted font-medium whitespace-nowrap">{b.slaDays}</td>
                                            <td className="py-2.5 px-3 text-center font-mono text-xs text-rose-600 font-semibold whitespace-nowrap">{b.tdsRate}</td>
                                            <td className="py-2.5 px-3 text-center">
                                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">
                                                    {b.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 5: EXTRA COMMISSION AMOUNT */}
            {activeTab === 'extra-commission-amount' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full min-w-0">
                        <div className="p-4 bg-white border-b border-brand-border">
                            <h4 className="font-bold text-brand-navy text-sm">Special Campaign Incentives & File Kickers</h4>
                        </div>
                        <div className="w-full overflow-hidden min-w-0">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                        <th className="py-3 px-3 w-[26%]">CAMPAIGN SCHEME NAME</th>
                                        <th className="py-3 px-3 w-[15%]">CARRIER</th>
                                        <th className="py-3 px-3 w-[14%]">VEHICLE SCOPE</th>
                                        <th className="py-3 px-3 text-right w-[13%]">EXTRA PERCENTAGE</th>
                                        <th className="py-3 px-3 text-right w-[12%]">PER FILE KICKER</th>
                                        <th className="py-3 px-3 text-center w-[10%]">EXPIRY DATE</th>
                                        <th className="py-3 px-3 text-center w-[10%]">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {extraCommissions.map(e => (
                                        <tr key={e.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                                            <td className="py-2.5 px-3 font-semibold text-brand-navy truncate text-xs" title={e.schemeName}>{e.schemeName}</td>
                                            <td className="py-2.5 px-3 text-xs text-brand-navy font-medium truncate" title={e.company}>{e.company}</td>
                                            <td className="py-2.5 px-3 text-xs text-brand-muted truncate" title={e.vehicleClass}>{e.vehicleClass}</td>
                                            <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 text-xs whitespace-nowrap">{e.extraPercent}</td>
                                            <td className="py-2.5 px-3 text-right font-mono font-bold text-brand-primary text-xs whitespace-nowrap">{e.fixedKicker}</td>
                                            <td className="py-2.5 px-3 text-center text-xs text-brand-muted font-mono whitespace-nowrap">{e.validUpto}</td>
                                            <td className="py-2.5 px-3 text-center">
                                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 whitespace-nowrap">
                                                    {e.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 10 & 11: EXECUTIVE SELF INCENTIVE */}
            {(activeTab === 'executive-self-incentive' || activeTab === 'multiple-executive-self-incentive') && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full min-w-0">
                        <div className="p-4 bg-white border-b border-brand-border">
                            <h4 className="font-bold text-brand-navy text-sm">Staff & Executive Self-Sourced Business Matrix</h4>
                            <p className="text-xs text-brand-muted">Incentive scale for direct sales generated by branch managers and operations staff</p>
                        </div>
                        <div className="w-full overflow-hidden min-w-0">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                        <th className="py-3 px-3 w-[25%]">INCENTIVE LEVEL</th>
                                        <th className="py-3 px-3 w-[35%]">MONTHLY NET OD PREMIUM VOLUME</th>
                                        <th className="py-3 px-3 text-right w-[20%]">INCENTIVE RATE</th>
                                        <th className="py-3 px-3 text-center w-[20%]">PAYOUT CYCLE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {executiveIncentives.map(x => (
                                        <tr key={x.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                                            <td className="py-2.5 px-3 font-semibold text-brand-navy text-xs truncate" title={x.level}>{x.level}</td>
                                            <td className="py-2.5 px-3 font-mono text-xs text-brand-navy font-medium truncate" title={x.minVolume}>{x.minVolume}</td>
                                            <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 text-xs whitespace-nowrap">{x.incentiveRate}</td>
                                            <td className="py-2.5 px-3 text-center text-xs text-brand-muted font-medium whitespace-nowrap">{x.payoutFrequency}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 12: CHECK GRID (SIMULATOR) */}
            {activeTab === 'check-grid' && (
                <div key={activeTab} className="tab-transition-wrapper">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full min-w-0">
                        {/* Calculator Form */}
                        <div className="lg:col-span-1 bg-white p-6 rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-w-0">
                            <div className="flex items-center gap-2 pb-4 mb-5 border-b border-brand-border">
                                <Calculator className="text-brand-primary" size={20} />
                                <h3 className="font-bold text-brand-navy text-base">Commission Simulator</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">Insurer</label>
                                    <select
                                        value={calcCompany}
                                        onChange={(e) => setCalcCompany(e.target.value)}
                                        className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-xs font-semibold text-brand-navy bg-white focus:outline-none focus:border-brand-primary"
                                    >
                                        <option value="HDFC ERGO">HDFC ERGO</option>
                                        <option value="ICICI LOMBARD">ICICI LOMBARD</option>
                                        <option value="BAJAJ ALLIANZ">BAJAJ ALLIANZ</option>
                                        <option value="TATA AIG">TATA AIG</option>
                                        <option value="GO DIGIT">GO DIGIT</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">Vehicle Segment</label>
                                    <select
                                        value={calcVehicleClass}
                                        onChange={(e) => setCalcVehicleClass(e.target.value)}
                                        className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-xs font-semibold text-brand-navy bg-white focus:outline-none focus:border-brand-primary"
                                    >
                                        <option value="4W PRIVATE CAR">4W PRIVATE CAR</option>
                                        <option value="2W MOTORCYCLE">2W MOTORCYCLE</option>
                                        <option value="COMMERCIAL GCV">COMMERCIAL GCV</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">Own Damage (OD) Premium (₹)</label>
                                    <input
                                        type="number"
                                        value={calcOdPremium}
                                        onChange={(e) => setCalcOdPremium(Number(e.target.value) || 0)}
                                        className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-xs font-mono font-semibold text-brand-navy focus:outline-none focus:border-brand-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">Third Party (TP) Premium (₹)</label>
                                    <input
                                        type="number"
                                        value={calcTpPremium}
                                        onChange={(e) => setCalcTpPremium(Number(e.target.value) || 0)}
                                        className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-xs font-mono font-semibold text-brand-navy focus:outline-none focus:border-brand-primary"
                                    />
                                </div>

                                <div className="pt-2">
                                    <div className="text-xs text-brand-muted">Total Net Premium: <strong className="text-brand-navy font-mono font-bold">₹ {(calcOdPremium + calcTpPremium).toLocaleString()}</strong></div>
                                </div>
                            </div>
                        </div>

                        {/* Result Matrix */}
                        <div className="lg:col-span-2 space-y-4 min-w-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full min-w-0">
                                <div className="bg-white p-5 rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-w-0">
                                    <div className="text-xs font-semibold text-brand-muted uppercase">Inward Brokerage (Gross)</div>
                                    <div className="text-2xl font-bold font-mono text-brand-primary mt-2">₹ {calcTotalBrokerage.toLocaleString()}</div>
                                    <div className="text-xs text-brand-muted mt-1">OD (22.5%) + TP (3.5%)</div>
                                </div>

                                <div className="bg-white p-5 rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-w-0">
                                    <div className="text-xs font-semibold text-brand-muted uppercase">Agent / POSP Payout</div>
                                    <div className="text-2xl font-bold font-mono text-amber-700 mt-2">₹ {calcTotalAgentPayout.toLocaleString()}</div>
                                    <div className="text-xs text-brand-muted mt-1">OD (16.5%) + TP (2.5%)</div>
                                </div>

                                <div className="bg-white p-5 rounded-[12px] border border-emerald-200 bg-emerald-50/40 shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-w-0">
                                    <div className="text-xs font-semibold text-emerald-800 uppercase">Net Company Margin</div>
                                    <div className="text-2xl font-black font-mono text-emerald-700 mt-2">₹ {calcNetCompanyMargin.toLocaleString()}</div>
                                    <div className="text-xs text-emerald-700 font-medium mt-1">Spread: + {((calcNetCompanyMargin / (calcOdPremium + calcTpPremium || 1)) * 100).toFixed(1)}%</div>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] min-w-0">
                                <h4 className="font-bold text-brand-navy text-sm mb-4">Detailed Calculation Breakdown</h4>
                                <div className="space-y-3 text-xs">
                                    <div className="flex justify-between py-2 border-b border-brand-border">
                                        <span className="text-brand-navy font-medium">Insurer OD Brokerage (22.5% of ₹ {calcOdPremium.toLocaleString()})</span>
                                        <span className="font-mono font-semibold text-brand-navy">₹ {calcBrokerOd.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-brand-border">
                                        <span className="text-brand-navy font-medium">Insurer TP Brokerage (3.5% of ₹ {calcTpPremium.toLocaleString()})</span>
                                        <span className="font-mono font-semibold text-brand-navy">₹ {calcBrokerTp.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-brand-border">
                                        <span className="text-brand-navy font-medium">Agent OD Commission (16.5% of ₹ {calcOdPremium.toLocaleString()})</span>
                                        <span className="font-mono font-semibold text-rose-600">- ₹ {calcAgentOd.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b border-brand-border">
                                        <span className="text-brand-navy font-medium">Agent TP Commission (2.5% of ₹ {calcTpPremium.toLocaleString()})</span>
                                        <span className="font-mono font-semibold text-rose-600">- ₹ {calcAgentTp.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between py-2 font-bold text-sm text-emerald-800">
                                        <span>Net Retained Brokerage Surplus</span>
                                        <span className="font-mono">₹ {calcNetCompanyMargin.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* 13 & 14: COMM VEH AGE & YEAR SLAB */}
            {(activeTab === 'comm-veh-age' || activeTab === 'year-slab') && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full min-w-0">
                        <div className="p-4 bg-white border-b border-brand-border">
                            <h4 className="font-bold text-brand-navy text-sm">Vehicle Age Depreciated Commission Rules</h4>
                            <p className="text-xs text-brand-muted">Commission modifiers based on vehicle manufacturing age</p>
                        </div>
                        <div className="w-full overflow-hidden min-w-0">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                        <th className="py-3 px-3 w-[20%]">VEHICLE AGE RANGE</th>
                                        <th className="py-3 px-3 text-center w-[18%]">OD COMM MODIFIER</th>
                                        <th className="py-3 px-3 text-center w-[18%]">MAX COMMISSION CAP</th>
                                        <th className="py-3 px-3 w-[44%]">UNDERWRITING & INSPECTION REMARKS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {vehAgeSlabs.map(v => (
                                        <tr key={v.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                                            <td className="py-2.5 px-3 font-semibold text-brand-navy text-xs truncate" title={v.ageRange}>{v.ageRange}</td>
                                            <td className="py-2.5 px-3 text-center font-mono text-xs font-semibold text-brand-primary whitespace-nowrap">{v.odCommModifier}</td>
                                            <td className="py-2.5 px-3 text-center font-bold text-brand-navy text-xs whitespace-nowrap">{v.maxCap}</td>
                                            <td className="py-2.5 px-3 text-xs text-brand-muted truncate" title={v.remarks}>{v.remarks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 16: IMPORT BROKER GRID */}
            {activeTab === 'import-broker-grid' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-5 w-full min-w-0">
                    {/* Top Section: Upload Box & Guidelines (Full-width grid) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 w-full min-w-0">
                        {/* Upload & Parser Box */}
                        <div className="lg:col-span-7 bg-white p-6 rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between space-y-5 min-w-0">
                            <div>
                                <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-border">
                                    <div className="flex items-center gap-2">
                                        <Upload className="text-brand-primary" size={20} />
                                        <h3 className="font-bold text-brand-navy text-base">Upload Broker Commission Spreadsheet</h3>
                                    </div>
                                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-primary border border-blue-200/60">
                                        Bulk Parser
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">Target Insurer</label>
                                        <select
                                            value={importCarrier}
                                            onChange={(e) => setImportCarrier(e.target.value)}
                                            className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-xs font-semibold text-brand-navy bg-white focus:outline-none focus:border-brand-primary cursor-pointer"
                                        >
                                            <option value="ALL">All Insurers (Multi-Carrier File)</option>
                                            <option value="HDFC ERGO">HDFC ERGO</option>
                                            <option value="ICICI LOMBARD">ICICI LOMBARD</option>
                                            <option value="BAJAJ ALLIANZ">BAJAJ ALLIANZ</option>
                                            <option value="TATA AIG">TATA AIG</option>
                                            <option value="GO DIGIT">GO DIGIT</option>
                                            <option value="RELIANCE GENERAL">RELIANCE GENERAL</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-brand-muted uppercase mb-1">Effective Month / Cycle</label>
                                        <select
                                            value={importCycle}
                                            onChange={(e) => setImportCycle(e.target.value)}
                                            className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-xs font-semibold text-brand-navy bg-white focus:outline-none focus:border-brand-primary cursor-pointer"
                                        >
                                            <option value="OCTOBER 2026">October 2026 (Immediate Active)</option>
                                            <option value="NOVEMBER 2026">November 2026 (Upcoming Schedule)</option>
                                            <option value="SEPTEMBER 2026">September 2026 (Historical Adjustment)</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Drag and drop upload zone */}
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="p-8 rounded-[10px] border-2 border-dashed border-brand-border bg-slate-50/50 hover:bg-blue-50/30 hover:border-brand-primary transition-all text-center cursor-pointer group"
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".xlsx,.xls,.csv"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                setSelectedFileName(file.name);
                                                showToast(`File "${file.name}" selected. Ready to process.`);
                                            }
                                        }}
                                    />
                                    <div className="w-12 h-12 bg-white text-brand-primary rounded-full flex items-center justify-center mx-auto mb-3 border border-brand-border shadow-xs group-hover:scale-105 transition-transform">
                                        <Upload size={22} />
                                    </div>
                                    <div className="font-bold text-brand-navy text-sm mb-1">
                                        {selectedFileName ? selectedFileName : 'Click to select or drag & drop spreadsheet file'}
                                    </div>
                                    <p className="text-xs text-brand-muted max-w-sm mx-auto">
                                        Supports <strong className="text-brand-navy">.xlsx, .xls, .csv</strong> files up to 15MB. Automatic schema matching.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-brand-border">
                                <div className="text-xs text-brand-muted">
                                    {selectedFileName ? (
                                        <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                                            <CheckCircle2 size={14} /> Ready: {selectedFileName}
                                        </span>
                                    ) : (
                                        'No file selected yet'
                                    )}
                                </div>
                                <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                                    {selectedFileName && (
                                        <button
                                            type="button"
                                            onClick={() => setSelectedFileName(null)}
                                            className="px-3 py-2 text-xs font-semibold text-brand-muted hover:text-rose-600 cursor-pointer bg-transparent border-none"
                                        >
                                            Clear
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            showToast('Grid uploaded! 128 rate entries verified and updated.');
                                            setSelectedFileName(null);
                                        }}
                                        className="px-5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-xs rounded-[8px] shadow-sm cursor-pointer border-none transition-colors flex items-center gap-2"
                                    >
                                        <Upload size={14} />
                                        Process & Import Grid
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Guidelines & Template Box */}
                        <div className="lg:col-span-5 space-y-4 min-w-0">
                            {/* Guidelines */}
                            <div className="bg-white p-5 rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-xs space-y-3 min-w-0">
                                <div className="flex items-center justify-between pb-2.5 border-b border-brand-border">
                                    <h4 className="font-bold text-brand-navy text-sm">Import Guidelines</h4>
                                    <span className="text-[11px] font-semibold text-brand-muted uppercase">Specification</span>
                                </div>
                                <div className="space-y-2.5 text-brand-muted text-[12px] leading-relaxed">
                                    <div className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                                        <span><strong className="text-brand-navy font-semibold">Accepted File Formats:</strong> .xlsx, .xls, .csv (maximum file size 15 MB).</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                                        <span><strong className="text-brand-navy font-semibold">Required Columns:</strong> Company Name, Vehicle Subclass, Fuel Type, OD %, TP %, Effective Date.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                                        <span><strong className="text-brand-navy font-semibold">Versioning:</strong> Active rate card will automatically be archived into version history upon confirmation.</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0" />
                                        <span><strong className="text-brand-navy font-semibold">Data Validation:</strong> Percentages must be between 0.00% and 50.00% and date format in DD/MM/YYYY.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Download Template Box */}
                            <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 p-5 rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-between gap-4">
                                <div>
                                    <div className="font-bold text-brand-navy text-xs">Standard Brokerage Template</div>
                                    <div className="text-[11px] text-brand-muted mt-0.5">Pre-formatted columns with sample values</div>
                                </div>
                                <button
                                    onClick={() => showToast('Broker commission template downloaded!')}
                                    className="px-3.5 py-2 bg-white hover:bg-slate-50 text-brand-navy border border-brand-border rounded-[8px] text-xs font-semibold cursor-pointer shadow-xs transition-colors flex items-center gap-1.5 shrink-0"
                                >
                                    <Download size={13} />
                                    Download .XLSX
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom: Recent Import History Log (Full-width table) */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full min-w-0">
                        <div className="p-4 bg-white border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div>
                                <h4 className="font-bold text-brand-navy text-sm">Recent Broker Grid Import History</h4>
                                <p className="text-xs text-brand-muted">Log of recently imported rate cards and schedules</p>
                            </div>
                            <span className="text-xs text-brand-muted font-medium">
                                Total Batches: <strong className="text-brand-navy">{importHistory.length}</strong>
                            </span>
                        </div>
                        <div className="w-full overflow-hidden min-w-0">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                        <th className="py-3 px-3 w-[15%]">BATCH ID</th>
                                        <th className="py-3 px-3 w-[16%]">INSURER / CARRIER</th>
                                        <th className="py-3 px-3 w-[22%]">FILE NAME</th>
                                        <th className="py-3 px-3 w-[13%]">UPLOADED BY</th>
                                        <th className="py-3 px-3 w-[11%]">DATE</th>
                                        <th className="py-3 px-3 text-center w-[11%]">RECORDS</th>
                                        <th className="py-3 px-3 text-center w-[12%]">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {importHistory.map(item => (
                                        <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                                            <td className="py-2.5 px-3 font-mono text-xs font-semibold text-brand-primary whitespace-nowrap">{item.batchId}</td>
                                            <td className="py-2.5 px-3 font-semibold text-brand-navy text-xs truncate" title={item.insurer}>{item.insurer}</td>
                                            <td className="py-2.5 px-3 text-xs font-mono text-brand-navy truncate" title={item.fileName}>{item.fileName}</td>
                                            <td className="py-2.5 px-3 text-xs text-brand-muted truncate" title={item.uploadedBy}>{item.uploadedBy}</td>
                                            <td className="py-2.5 px-3 font-mono text-xs text-brand-muted whitespace-nowrap">{item.date}</td>
                                            <td className="py-2.5 px-3 text-center text-xs font-medium text-brand-navy">{item.records}</td>
                                            <td className="py-2.5 px-3 text-center">
                                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${item.status === 'APPLIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* 17: DECLINE MODEL NEW */}
            {activeTab === 'decline-model-new' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    <div className="bg-rose-50 border border-rose-200 p-4 rounded-[12px] flex items-start gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                        <AlertTriangle className="text-rose-600 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="text-sm font-bold text-rose-900">Decline & Negative Vehicle List (Zero Payout)</h4>
                            <p className="text-xs text-rose-700 mt-0.5">
                                Vehicles listed below are ineligible for commission payouts due to high loss ratios, obsolete parts, or commercial regulatory constraints.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full min-w-0">
                        <div className="w-full overflow-hidden min-w-0">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border">
                                        <th className="py-3 px-3 w-[14%]">OEM MAKE</th>
                                        <th className="py-3 px-3 w-[20%]">MODEL SPECIFICATION</th>
                                        <th className="py-3 px-3 w-[14%]">CLASS</th>
                                        <th className="py-3 px-3 w-[28%]">DECLINE RATIONALE</th>
                                        <th className="py-3 px-3 text-center w-[12%]">PAYOUT PERMITTED</th>
                                        <th className="py-3 px-3 text-center w-[12%]">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {declineModels.map(d => (
                                        <tr key={d.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                                            <td className="py-2.5 px-3 font-bold text-brand-navy text-xs truncate" title={d.make}>{d.make}</td>
                                            <td className="py-2.5 px-3 font-medium text-brand-navy text-xs truncate" title={d.model}>{d.model}</td>
                                            <td className="py-2.5 px-3 text-xs text-brand-muted truncate" title={d.classType}>{d.classType}</td>
                                            <td className="py-2.5 px-3 text-xs text-brand-muted truncate" title={d.reason}>{d.reason}</td>
                                            <td className="py-2.5 px-3 text-center font-mono font-bold text-rose-700 text-xs whitespace-nowrap">{d.commPayout}</td>
                                            <td className="py-2.5 px-3 text-center">
                                                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${d.status === 'BLOCKED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                                                    {d.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommissionGrid;

