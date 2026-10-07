import React, { useState } from 'react';
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

const tabs: TabItem[] = [
    { id: 'agent-commission', label: 'Agent Commission' },
    { id: 'multiple-agent-commission', label: 'Multiple Agent Commission' },
    { id: 'broker-commission', label: 'Broker Commission' },
    { id: 'multiple-broker-commission', label: 'Multiple Broker Commission' },
    { id: 'extra-commission-amount', label: 'Extra Commission Amount' },
    { id: 'latest-agent-commission', label: 'Latest Agent Commission' },
    { id: 'broker-latest-grid', label: 'Broker Latest Grid' },
    { id: 'new-broker-commission', label: 'New Broker Commission' },
    { id: 'new-agent-commission', label: 'New Agent Commission' },
    { id: 'executive-self-incentive', label: 'Executive Self Insentive' },
    { id: 'multiple-executive-self-incentive', label: 'Multiple Executive Self Insentive' },
    { id: 'check-grid', label: 'Check Grid' },
    { id: 'comm-veh-age', label: 'Comm Veh Age' },
    { id: 'year-slab', label: 'Year Slab' },
    { id: 'multiple-agent-broker-comm', label: 'Multiple Agent Broker Comm' },
    { id: 'import-broker-grid', label: 'Import Broker Grid' },
    { id: 'decline-model-new', label: 'Decline Model New' },
];

const CommissionGrid: React.FC = () => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();

    const activeTab = (tab && tabs.some(t => t.id === tab))
        ? (tab as CommissionSubTab)
        : 'agent-commission';

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

    const getActiveTitle = () => {
        const found = tabs.find(t => t.id === activeTab);
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
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen">
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
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                        >
                            <Download size={16} /> Download Template
                        </button>
                    ) : activeTab === 'check-grid' ? (
                        <button
                            onClick={() => showToast('Simulation saved to report audit log!')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                        >
                            <FileText size={16} /> Save Simulation
                        </button>
                    ) : (
                        <button
                            onClick={() => showToast('Commission grid exported successfully!')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-all"
                        >
                            <Download size={16} /> Export Grid
                        </button>
                    )
                }
            />

            {/* Horizontal Tabs */}
            <div className="mb-6 rounded-xl border border-brand-border bg-white shadow-sm overflow-hidden">
                <UnderlineTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </div>

            {/* 1, 6, 8, 9: AGENT COMMISSION & LATEST AGENT COMMISSION */}
            {(activeTab === 'agent-commission' || activeTab === 'latest-agent-commission' || activeTab === 'new-agent-commission') && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search company, vehicle class, policy type..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-medium">Filter By:</span>
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">Active Schedules (5)</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">INSURANCE COMPANY</th>
                                        <th className="py-3.5 px-6">VEHICLE CLASS</th>
                                        <th className="py-3.5 px-6">POLICY TYPE</th>
                                        <th className="py-3.5 px-6">FUEL TYPE</th>
                                        <th className="py-3.5 px-6 text-right">OD COMM %</th>
                                        <th className="py-3.5 px-6 text-right">TP COMM %</th>
                                        <th className="py-3.5 px-6 text-right">NET COMM %</th>
                                        <th className="py-3.5 px-6 text-center">EFFECTIVE DATE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {agentCommissions
                                        .filter(a => !searchQuery || a.company.toLowerCase().includes(searchQuery.toLowerCase()) || a.vehicleClass.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map(a => (
                                            <tr key={a.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-semibold text-slate-900">{a.company}</td>
                                                <td className="py-4 px-6 text-xs font-bold text-slate-800">{a.vehicleClass}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-700">{a.policyType}</span>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-600">{a.fuel}</td>
                                                <td className="py-4 px-6 text-right font-mono font-bold text-emerald-700 text-sm">{a.odRate}</td>
                                                <td className="py-4 px-6 text-right font-mono text-xs font-medium text-slate-600">{a.tpRate}</td>
                                                <td className="py-4 px-6 text-right font-mono font-bold text-blue-700 text-sm">{a.netRate}</td>
                                                <td className="py-4 px-6 text-center text-xs text-slate-500 font-medium">{a.validFrom}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
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
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <h4 className="font-bold text-slate-900 text-sm">Tiered Performance Slab Structure</h4>
                            <p className="text-xs text-slate-500">Volume-based incentive escalation for registered POSP networks</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">PARTNER TIER</th>
                                        <th className="py-3.5 px-6">QUARTERLY VOLUME REQUIREMENT</th>
                                        <th className="py-3.5 px-6 text-right">BASE COMMISSION</th>
                                        <th className="py-3.5 px-6 text-right">KICKER BOOSTER</th>
                                        <th className="py-3.5 px-6 text-right">TOTAL EFFECTIVE COMM</th>
                                        <th className="py-3.5 px-6 text-center">ACTIVE AGENTS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {tieredAgentGrid.map(t => (
                                        <tr key={t.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">{t.tier}</td>
                                            <td className="py-4 px-6 text-xs text-slate-700 font-medium">{t.minPremium}</td>
                                            <td className="py-4 px-6 text-right font-mono font-medium text-slate-700">{t.baseComm}</td>
                                            <td className="py-4 px-6 text-right font-mono font-semibold text-emerald-600">{t.kickerBonus}</td>
                                            <td className="py-4 px-6 text-right font-mono font-bold text-blue-700 text-base">{t.totalComm}</td>
                                            <td className="py-4 px-6 text-center font-bold text-slate-800">{t.agentsCount} Partners</td>
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
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">INSURER / BROKER CARRIER</th>
                                        <th className="py-3.5 px-6">LOB / CATEGORY</th>
                                        <th className="py-3.5 px-6 text-right">INWARD BROKERAGE (OD)</th>
                                        <th className="py-3.5 px-6 text-right">INWARD BROKERAGE (TP)</th>
                                        <th className="py-3.5 px-6">SLA SETTLEMENT DAYS</th>
                                        <th className="py-3.5 px-6 text-center">TDS DEDUCTION</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {brokerCommissions.map(b => (
                                        <tr key={b.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-slate-900">{b.company}</td>
                                            <td className="py-4 px-6 text-xs text-slate-700 font-medium">{b.category}</td>
                                            <td className="py-4 px-6 text-right font-mono font-bold text-blue-700 text-sm">{b.brokerageOd}</td>
                                            <td className="py-4 px-6 text-right font-mono text-xs font-semibold text-slate-700">{b.brokerageTp}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600 font-medium">{b.slaDays}</td>
                                            <td className="py-4 px-6 text-center font-mono text-xs text-rose-600 font-semibold">{b.tdsRate}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
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
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <h4 className="font-bold text-slate-900 text-sm">Special Campaign Incentives & File Kickers</h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">CAMPAIGN SCHEME NAME</th>
                                        <th className="py-3.5 px-6">CARRIER</th>
                                        <th className="py-3.5 px-6">VEHICLE SCOPE</th>
                                        <th className="py-3.5 px-6 text-right">EXTRA PERCENTAGE</th>
                                        <th className="py-3.5 px-6 text-right">PER FILE KICKER</th>
                                        <th className="py-3.5 px-6">EXPIRY DATE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {extraCommissions.map(e => (
                                        <tr key={e.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-slate-900">{e.schemeName}</td>
                                            <td className="py-4 px-6 text-xs text-slate-700 font-medium">{e.company}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{e.vehicleClass}</td>
                                            <td className="py-4 px-6 text-right font-mono font-bold text-emerald-700">{e.extraPercent}</td>
                                            <td className="py-4 px-6 text-right font-mono font-bold text-blue-700">{e.fixedKicker}</td>
                                            <td className="py-4 px-6 text-xs text-slate-500 font-mono">{e.validUpto}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
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
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <h4 className="font-bold text-slate-900 text-sm">Staff & Executive Self-Sourced Business Matrix</h4>
                            <p className="text-xs text-slate-500">Incentive scale for direct sales generated by branch managers and operations staff</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">INCENTIVE LEVEL</th>
                                        <th className="py-3.5 px-6">MONTHLY NET OD PREMIUM VOLUME</th>
                                        <th className="py-3.5 px-6 text-right">INCENTIVE RATE</th>
                                        <th className="py-3.5 px-6 text-center">PAYOUT CYCLE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {executiveIncentives.map(x => (
                                        <tr key={x.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-slate-900">{x.level}</td>
                                            <td className="py-4 px-6 font-mono text-xs text-slate-700 font-medium">{x.minVolume}</td>
                                            <td className="py-4 px-6 text-right font-mono font-bold text-emerald-700 text-sm">{x.incentiveRate}</td>
                                            <td className="py-4 px-6 text-center text-xs text-slate-600 font-medium">{x.payoutFrequency}</td>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Calculator Form */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2 pb-4 mb-5 border-b border-slate-100">
                            <Calculator className="text-brand-primary" size={20} />
                            <h3 className="font-bold text-slate-900 text-base">Commission Simulator</h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Insurer</label>
                                <select
                                    value={calcCompany}
                                    onChange={(e) => setCalcCompany(e.target.value)}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                >
                                    <option value="HDFC ERGO">HDFC ERGO</option>
                                    <option value="ICICI LOMBARD">ICICI LOMBARD</option>
                                    <option value="BAJAJ ALLIANZ">BAJAJ ALLIANZ</option>
                                    <option value="TATA AIG">TATA AIG</option>
                                    <option value="GO DIGIT">GO DIGIT</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Vehicle Segment</label>
                                <select
                                    value={calcVehicleClass}
                                    onChange={(e) => setCalcVehicleClass(e.target.value)}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                >
                                    <option value="4W PRIVATE CAR">4W PRIVATE CAR</option>
                                    <option value="2W MOTORCYCLE">2W MOTORCYCLE</option>
                                    <option value="COMMERCIAL GCV">COMMERCIAL GCV</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Own Damage (OD) Premium (₹)</label>
                                <input
                                    type="number"
                                    value={calcOdPremium}
                                    onChange={(e) => setCalcOdPremium(Number(e.target.value) || 0)}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Third Party (TP) Premium (₹)</label>
                                <input
                                    type="number"
                                    value={calcTpPremium}
                                    onChange={(e) => setCalcTpPremium(Number(e.target.value) || 0)}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>

                            <div className="pt-2">
                                <div className="text-xs text-slate-500">Total Net Premium: <strong className="text-slate-800 font-mono font-bold">₹ {(calcOdPremium + calcTpPremium).toLocaleString()}</strong></div>
                            </div>
                        </div>
                    </div>

                    {/* Result Matrix */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-xs font-semibold text-slate-500 uppercase">Inward Brokerage (Gross)</div>
                                <div className="text-2xl font-bold font-mono text-blue-700 mt-2">₹ {calcTotalBrokerage.toLocaleString()}</div>
                                <div className="text-xs text-slate-500 mt-1">OD (22.5%) + TP (3.5%)</div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                <div className="text-xs font-semibold text-slate-500 uppercase">Agent / POSP Payout</div>
                                <div className="text-2xl font-bold font-mono text-amber-700 mt-2">₹ {calcTotalAgentPayout.toLocaleString()}</div>
                                <div className="text-xs text-slate-500 mt-1">OD (16.5%) + TP (2.5%)</div>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-sm">
                                <div className="text-xs font-semibold text-emerald-800 uppercase">Net Company Margin</div>
                                <div className="text-2xl font-black font-mono text-emerald-700 mt-2">₹ {calcNetCompanyMargin.toLocaleString()}</div>
                                <div className="text-xs text-emerald-700 font-medium mt-1">Spread: + {((calcNetCompanyMargin / (calcOdPremium + calcTpPremium || 1)) * 100).toFixed(1)}%</div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h4 className="font-bold text-slate-900 text-sm mb-4">Detailed Calculation Breakdown</h4>
                            <div className="space-y-3 text-xs">
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Insurer OD Brokerage (22.5% of ₹ {calcOdPremium.toLocaleString()})</span>
                                    <span className="font-mono font-semibold text-slate-900">₹ {calcBrokerOd.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Insurer TP Brokerage (3.5% of ₹ {calcTpPremium.toLocaleString()})</span>
                                    <span className="font-mono font-semibold text-slate-900">₹ {calcBrokerTp.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Agent OD Commission (16.5% of ₹ {calcOdPremium.toLocaleString()})</span>
                                    <span className="font-mono font-semibold text-rose-600">- ₹ {calcAgentOd.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-slate-100">
                                    <span className="text-slate-600">Agent TP Commission (2.5% of ₹ {calcTpPremium.toLocaleString()})</span>
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
            )}

            {/* 13 & 14: COMM VEH AGE & YEAR SLAB */}
            {(activeTab === 'comm-veh-age' || activeTab === 'year-slab') && (
                <div className="space-y-4">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-100">
                            <h4 className="font-bold text-slate-900 text-sm">Vehicle Age Depreciated Commission Rules</h4>
                            <p className="text-xs text-slate-500">Commission modifiers based on vehicle manufacturing age</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">VEHICLE AGE RANGE</th>
                                        <th className="py-3.5 px-6">OD COMM MODIFIER</th>
                                        <th className="py-3.5 px-6 text-center">MAX COMMISSION CAP</th>
                                        <th className="py-3.5 px-6">UNDERWRITING & INSPECTION REMARKS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {vehAgeSlabs.map(v => (
                                        <tr key={v.id} className="hover:bg-blue-50/40 transition-colors">
                                            <td className="py-4 px-6 font-semibold text-slate-900">{v.ageRange}</td>
                                            <td className="py-4 px-6 font-mono text-xs font-semibold text-blue-700">{v.odCommModifier}</td>
                                            <td className="py-4 px-6 text-center font-bold text-slate-800">{v.maxCap}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{v.remarks}</td>
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
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-slate-300 text-center hover:border-brand-primary transition-all">
                        <div className="w-14 h-14 bg-blue-50 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <Upload size={28} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">Import Broker Commission Spreadsheet</h3>
                        <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-6">
                            Upload insurer-provided grid (.xlsx or .csv) to auto-update brokerage percentages across all vehicle classes.
                        </p>
                        <button
                            onClick={() => showToast('Grid uploaded! 128 rate entries verified and updated.')}
                            className="px-6 py-2.5 bg-brand-primary hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm"
                        >
                            Select & Upload File
                        </button>
                    </div>

                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-xs space-y-2 text-slate-600">
                        <div className="font-bold text-slate-900 text-sm mb-2">Import Guidelines:</div>
                        <div>• Supported formats: <strong>.xlsx, .xls, .csv</strong></div>
                        <div>• Required columns: Company Name, Vehicle Subclass, Fuel, OD %, TP %, Effective Date</div>
                        <div>• Existing active rate card will automatically be archived into version history.</div>
                    </div>
                </div>
            )}

            {/* 17: DECLINE MODEL NEW */}
            {activeTab === 'decline-model-new' && (
                <div className="space-y-4">
                    <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="text-rose-600 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="text-sm font-bold text-rose-900">Decline & Negative Vehicle List (Zero Payout)</h4>
                            <p className="text-xs text-rose-700 mt-0.5">
                                Vehicles listed below are ineligible for commission payouts due to high loss ratios, obsolete parts, or commercial regulatory constraints.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">OEM MAKE</th>
                                        <th className="py-3.5 px-6">MODEL SPECIFICATION</th>
                                        <th className="py-3.5 px-6">CLASS</th>
                                        <th className="py-3.5 px-6">DECLINE RATIONALE</th>
                                        <th className="py-3.5 px-6 text-center">PAYOUT PERMITTED</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {declineModels.map(d => (
                                        <tr key={d.id} className="hover:bg-rose-50/20 transition-colors">
                                            <td className="py-4 px-6 font-bold text-slate-900">{d.make}</td>
                                            <td className="py-4 px-6 font-medium text-slate-800">{d.model}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{d.classType}</td>
                                            <td className="py-4 px-6 text-xs text-slate-600">{d.reason}</td>
                                            <td className="py-4 px-6 text-center font-mono font-bold text-rose-700 text-xs">{d.commPayout}</td>
                                            <td className="py-4 px-6 text-center">
                                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${d.status === 'BLOCKED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
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
