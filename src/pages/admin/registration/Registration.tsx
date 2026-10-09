import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import {
    Search, Plus, Edit2, Trash2, X, CheckCircle2, UserCheck, UserX,
    Building2, Phone, Mail, ShieldCheck, AlertCircle, RefreshCw,
    Download, Car, CreditCard, Eye, FileText, Check, AlertTriangle
} from 'lucide-react';

export type RegistrationSubTab =
    | 'employee'
    | 'agent'
    | 'view-agent'
    | 'view-employee'
    | 'bank-beneficiary'
    | 'delete-vehicle'
    | 'deactivated-agent-list';

const tabs: TabItem[] = [
    { id: 'employee', label: 'Employee' },
    { id: 'agent', label: 'Agent' },
    { id: 'view-agent', label: 'View Agent' },
    { id: 'view-employee', label: 'View Employee' },
    { id: 'bank-beneficiary', label: 'Bank Beneficiary' },
    { id: 'delete-vehicle', label: 'Delete Vehicle' },
    { id: 'deactivated-agent-list', label: 'Deactivated Agent List' },
];

// --- Interfaces ---
interface EmployeeItem {
    id: number;
    empCode: string;
    fullName: string;
    designation: string;
    department: string;
    branch: string;
    mobile: string;
    email: string;
    doj: string;
    status: 'ACTIVE' | 'ON LEAVE' | 'PROBATION';
}

interface AgentItem {
    id: number;
    agentCode: string;
    fullName: string;
    type: 'POSP' | 'DIRECT' | 'BROKER' | 'FRANCHISE';
    branch: string;
    mobile: string;
    email: string;
    panNo: string;
    kycStatus: 'VERIFIED' | 'PENDING' | 'UNDER REVIEW';
    totalPolicies: number;
    regDate: string;
    status: 'ACTIVE' | 'INACTIVE';
}

interface BankBeneficiaryItem {
    id: number;
    beneficiaryName: string;
    entityType: 'AGENT' | 'EMPLOYEE' | 'FRANCHISE' | 'VENDOR';
    entityCode: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: 'SAVINGS' | 'CURRENT';
    branch: string;
    verificationStatus: 'VERIFIED' | 'PENDING' | 'REJECTED';
}

interface VehicleRecord {
    id: number;
    regNo: string;
    makeModel: string;
    vehicleClass: string;
    engineNo: string;
    chassisNo: string;
    policyStatus: 'NO ACTIVE POLICY' | 'EXPIRED' | 'UNLINKED';
    addedDate: string;
    reasonForRemoval?: string;
}

interface DeactivatedAgentItem {
    id: number;
    agentCode: string;
    fullName: string;
    branch: string;
    mobile: string;
    deactivationDate: string;
    reason: string;
    pastPolicies: number;
    deactivatedBy: string;
    category: 'VOLUNTARY' | 'NON-PERFORMANCE' | 'CONDUCT' | 'BLACKLISTED';
}

const Registration: React.FC = () => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();

    const activeTab = (tab && tabs.some(t => t.id === tab))
        ? (tab as RegistrationSubTab)
        : 'employee';

    const handleTabChange = (newTabId: string) => {
        navigate(`/registration/${newTabId}`);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    const [modalType, setModalType] = useState<string | null>(null);

    // ==========================================
    // 1 & 4: EMPLOYEE STATE
    // ==========================================
    const [employees, setEmployees] = useState<EmployeeItem[]>([
        { id: 1, empCode: 'EMP0014', fullName: 'Shekharu S. Lab', designation: 'Branch Admin', department: 'Management', branch: 'BARAMATI', mobile: '9822001122', email: 'shekharu.lab@reliable.in', doj: '12/04/2021', status: 'ACTIVE' },
        { id: 2, empCode: 'EMP0028', fullName: 'Vinayak K. Kadam', designation: 'Branch Manager', department: 'Operations', branch: 'CHHATRAPATI SAMBHAJINAGAR', mobile: '9822345678', email: 'v.kadam@reliable.in', doj: '01/08/2022', status: 'ACTIVE' },
        { id: 3, empCode: 'EMP0035', fullName: 'Santosh Sawant', designation: 'Branch Manager', department: 'Operations', branch: 'AKLUJ', mobile: '9422998877', email: 's.sawant@reliable.in', doj: '15/02/2022', status: 'ACTIVE' },
        { id: 4, empCode: 'EMP0041', fullName: 'Sunita Ravindra Patil', designation: 'Senior Accountant', department: 'Accounts', branch: 'PUNE', mobile: '9890123456', email: 's.patil@reliable.in', doj: '10/11/2022', status: 'ACTIVE' },
        { id: 5, empCode: 'EMP0059', fullName: 'Rameshwar Jadhav', designation: 'Operations Head', department: 'Operations', branch: 'AHILYANAGAR', mobile: '9850112233', email: 'r.jadhav@reliable.in', doj: '05/01/2023', status: 'ACTIVE' },
        { id: 6, empCode: 'EMP0062', fullName: 'Sneha Mohan Kulkarni', designation: 'Underwriter Executive', department: 'Underwriting', branch: 'BARAMATI', mobile: '9765123412', email: 's.kulkarni@reliable.in', doj: '18/06/2024', status: 'PROBATION' },
    ]);
    const [employeeForm, setEmployeeForm] = useState({ fullName: '', designation: 'Operations Executive', department: 'Operations', branch: 'BARAMATI', mobile: '', email: '', doj: new Date().toISOString().split('T')[0] });

    // ==========================================
    // 2 & 3: AGENT STATE
    // ==========================================
    const [agents, setAgents] = useState<AgentItem[]>([
        { id: 1, agentCode: 'AGT-8801', fullName: 'Santosh Vitthalrao Patil', type: 'POSP', branch: 'BARAMATI', mobile: '9822145678', email: 'santosh.posp@gmail.com', panNo: 'ABCDE1234F', kycStatus: 'VERIFIED', totalPolicies: 142, regDate: '10/01/2024', status: 'ACTIVE' },
        { id: 2, agentCode: 'AGT-8802', fullName: 'Kavita Rajesh Deshmukh', type: 'DIRECT', branch: 'PUNE', mobile: '9890451234', email: 'kavita.d@yahoo.com', panNo: 'PQRST5678K', kycStatus: 'VERIFIED', totalPolicies: 88, regDate: '15/02/2024', status: 'ACTIVE' },
        { id: 3, agentCode: 'AGT-8803', fullName: 'Ajay S. Salunkhe', type: 'FRANCHISE', branch: 'CHHATRAPATI SAMBHAJINAGAR', mobile: '9423567890', email: 'ajay.salunkhe@hotmail.com', panNo: 'LMNOP9012Z', kycStatus: 'PENDING', totalPolicies: 24, regDate: '01/04/2024', status: 'ACTIVE' },
        { id: 4, agentCode: 'AGT-8804', fullName: 'Balasaheb K. Shinde', type: 'POSP', branch: 'AHILYANAGAR', mobile: '9765123987', email: 'balasaheb.shinde@gmail.com', panNo: 'WXYZA3456M', kycStatus: 'VERIFIED', totalPolicies: 215, regDate: '12/11/2023', status: 'ACTIVE' },
        { id: 5, agentCode: 'AGT-8805', fullName: 'Prakash Madhavrao Joshi', type: 'BROKER', branch: 'MUMBAI', mobile: '9850987123', email: 'prakash.joshi@reliable.in', panNo: 'BCDEF7890P', kycStatus: 'UNDER REVIEW', totalPolicies: 67, regDate: '20/05/2024', status: 'ACTIVE' },
        { id: 6, agentCode: 'AGT-8806', fullName: 'Ganesh K. Jagtap', type: 'POSP', branch: 'BARAMATI', mobile: '9850123984', email: 'ganesh.posp@reliable.in', panNo: 'FGHIJ4567Y', kycStatus: 'VERIFIED', totalPolicies: 179, regDate: '03/09/2023', status: 'ACTIVE' },
    ]);
    const [agentForm, setAgentForm] = useState({ fullName: '', type: 'POSP' as 'POSP' | 'DIRECT' | 'FRANCHISE' | 'BROKER', branch: 'BARAMATI', mobile: '', email: '', panNo: '' });

    // ==========================================
    // 5: BANK BENEFICIARY STATE
    // ==========================================
    const [beneficiaries, setBeneficiaries] = useState<BankBeneficiaryItem[]>([
        { id: 1, beneficiaryName: 'Santosh Vitthalrao Patil', entityType: 'AGENT', entityCode: 'AGT-8801', bankName: 'HDFC BANK', accountNumber: '50100451234567', ifscCode: 'HDFC0000123', accountType: 'SAVINGS', branch: 'BARAMATI MAIN', verificationStatus: 'VERIFIED' },
        { id: 2, beneficiaryName: 'Kavita Rajesh Deshmukh', entityType: 'AGENT', entityCode: 'AGT-8802', bankName: 'STATE BANK OF INDIA', accountNumber: '309988776655', ifscCode: 'SBIN0001234', accountType: 'SAVINGS', branch: 'PUNE CAMP', verificationStatus: 'VERIFIED' },
        { id: 3, beneficiaryName: 'Ajay S. Salunkhe', entityType: 'FRANCHISE', entityCode: 'AGT-8803', bankName: 'ICICI BANK', accountNumber: '000701554433', ifscCode: 'ICIC0000007', accountType: 'CURRENT', branch: 'SAMBHAJINAGAR', verificationStatus: 'PENDING' },
        { id: 4, beneficiaryName: 'Shekharu S. Lab', entityType: 'EMPLOYEE', entityCode: 'EMP0014', bankName: 'AXIS BANK', accountNumber: '918020011223344', ifscCode: 'UTIB0000456', accountType: 'SAVINGS', branch: 'BARAMATI', verificationStatus: 'VERIFIED' },
        { id: 5, beneficiaryName: 'Balasaheb K. Shinde', entityType: 'AGENT', entityCode: 'AGT-8804', bankName: 'BANK OF MAHARASHTRA', accountNumber: '60123456789', ifscCode: 'MAHB0000789', accountType: 'SAVINGS', branch: 'AHILYANAGAR', verificationStatus: 'VERIFIED' },
    ]);
    const [beneficiaryForm, setBeneficiaryForm] = useState({ beneficiaryName: '', entityType: 'AGENT' as const, entityCode: '', bankName: 'HDFC BANK', accountNumber: '', ifscCode: '', accountType: 'SAVINGS' as const, branch: '' });

    // ==========================================
    // 6: DELETE VEHICLE STATE
    // ==========================================
    const [vehicles, setVehicles] = useState<VehicleRecord[]>([
        { id: 1, regNo: 'MH-12-PQ-4512', makeModel: 'MARUTI SUZUKI SWIFT VXI', vehicleClass: '4-WHEELER PRIVATE CAR', engineNo: 'K12M8901234', chassisNo: 'MA3EWB12S00123456', policyStatus: 'UNLINKED', addedDate: '12/08/2026' },
        { id: 2, regNo: 'MH-42-AB-9876', makeModel: 'HERO SPLENDOR PLUS BS6', vehicleClass: '2-WHEELER MOTORCYCLE', engineNo: 'HA10EF45678', chassisNo: 'MBLHA10AWP987654', policyStatus: 'EXPIRED', addedDate: '01/09/2026' },
        { id: 3, regNo: 'MH-20-CZ-3341', makeModel: 'TATA ACE GOLD PETROL', vehicleClass: 'GOODS CARRYING VEHICLE', engineNo: '275NA789012', chassisNo: 'MAT445000A1234567', policyStatus: 'NO ACTIVE POLICY', addedDate: '25/08/2026' },
        { id: 4, regNo: 'MH-16-DE-7721', makeModel: 'HYUNDAI CRETA SX 1.5', vehicleClass: '4-WHEELER PRIVATE CAR', engineNo: 'G4FL9988776', chassisNo: 'MALC181CLP1122334', policyStatus: 'UNLINKED', addedDate: '15/09/2026' },
    ]);
    const [selectedVehicleToDelete, setSelectedVehicleToDelete] = useState<VehicleRecord | null>(null);
    const [deleteReason, setDeleteReason] = useState('Duplicate registration entry');

    // ==========================================
    // 7: DEACTIVATED AGENT LIST STATE
    // ==========================================
    const [deactivatedAgents, setDeactivatedAgents] = useState<DeactivatedAgentItem[]>([
        { id: 1, agentCode: 'AGT-7104', fullName: 'Mahesh B. Pawar', branch: 'AKLUJ', mobile: '9822991100', deactivationDate: '15/08/2026', reason: 'Non-renewal of license / Inactive for 180 days', pastPolicies: 45, deactivatedBy: 'Shekharu Lab', category: 'NON-PERFORMANCE' },
        { id: 2, agentCode: 'AGT-6920', fullName: 'Sachin D. Bhosale', branch: 'BARAMATI', mobile: '9422003344', deactivationDate: '28/07/2026', reason: 'Voluntary resignation & relocation to other state', pastPolicies: 82, deactivatedBy: 'Shekharu Lab', category: 'VOLUNTARY' },
        { id: 3, agentCode: 'AGT-5412', fullName: 'Dinesh Ramdas Shinde', branch: 'PUNE', mobile: '9850667788', deactivationDate: '02/06/2026', reason: 'Violation of insurer guidelines / Code of Conduct', pastPolicies: 110, deactivatedBy: 'Vinayak Kadam', category: 'CONDUCT' },
        { id: 4, agentCode: 'AGT-4901', fullName: 'Nitin Suresh Kulkarni', branch: 'AHILYANAGAR', mobile: '9765332211', deactivationDate: '11/04/2026', reason: 'Dual registration conflict detected', pastPolicies: 18, deactivatedBy: 'Rameshwar Jadhav', category: 'BLACKLISTED' },
    ]);

    const getActiveTitle = () => {
        const found = tabs.find(t => t.id === activeTab);
        return found ? found.label : 'Registration';
    };

    const getActiveDesc = () => {
        switch (activeTab) {
            case 'employee': return 'Register and on-board new staff members and assign reporting hierarchy.';
            case 'agent': return 'Complete POSP, direct agent, and franchise partner registration details.';
            case 'view-agent': return 'Search, verify, and view all active agents, POSP network, and KYC credentials.';
            case 'view-employee': return 'Directory of internal employees across branches, departments, and roles.';
            case 'bank-beneficiary': return 'Manage verified payout bank accounts, IFSC mappings, and commission disbursement beneficiaries.';
            case 'delete-vehicle': return 'Safely de-register, archive, or purge duplicate and unlinked vehicle records with audit logs.';
            case 'deactivated-agent-list': return 'Log of deactivated and blacklisted agents with reactivation workflows.';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto min-h-screen">
            {/* Toast */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Header */}
            <PageHeader
                title={`Registration — ${getActiveTitle()}`}
                description={getActiveDesc()}
                action={
                    activeTab === 'employee' || activeTab === 'view-employee' ? (
                        <button
                            onClick={() => {
                                setEmployeeForm({ fullName: '', designation: 'Operations Executive', department: 'Operations', branch: 'BARAMATI', mobile: '', email: '', doj: new Date().toISOString().split('T')[0] });
                                setModalType('EMPLOYEE');
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <Plus size={16} /> Register New Employee
                        </button>
                    ) : activeTab === 'agent' || activeTab === 'view-agent' ? (
                        <button
                            onClick={() => {
                                setAgentForm({ fullName: '', type: 'POSP', branch: 'BARAMATI', mobile: '', email: '', panNo: '' });
                                setModalType('AGENT');
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <Plus size={16} /> Register New Agent
                        </button>
                    ) : activeTab === 'bank-beneficiary' ? (
                        <button
                            onClick={() => {
                                setBeneficiaryForm({ beneficiaryName: '', entityType: 'AGENT', entityCode: '', bankName: 'HDFC BANK', accountNumber: '', ifscCode: '', accountType: 'SAVINGS', branch: '' });
                                setModalType('BENEFICIARY');
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <Plus size={16} /> Add Beneficiary
                        </button>
                    ) : activeTab === 'delete-vehicle' ? (
                        <button
                            onClick={() => showToast('Vehicle database synced')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 shadow-sm transition-all"
                        >
                            <RefreshCw size={16} /> Refresh Vehicle List
                        </button>
                    ) : (
                        <button
                            onClick={() => showToast('Deactivated agent records exported as CSV')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 shadow-sm transition-all"
                        >
                            <Download size={16} /> Export List
                        </button>
                    )
                }
            />

            {/* Horizontal Submenu Tabs */}
            <div className="mb-6 rounded-xl border border-brand-border bg-white shadow-sm overflow-hidden">
                <UnderlineTabs
                    tabs={tabs}
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                />
            </div>

            {/* TAB 1: EMPLOYEE REGISTRATION FORM & QUICK LIST */}
            {activeTab === 'employee' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Registration Card */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                            <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-primary flex items-center justify-center font-bold">
                                <Plus size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base">New Employee On-boarding</h3>
                                <p className="text-xs text-slate-500">Add an internal team member</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const newEmp: EmployeeItem = {
                                id: Date.now(),
                                empCode: `EMP00${employees.length + 10}`,
                                ...employeeForm,
                                status: 'ACTIVE'
                            };
                            setEmployees([newEmp, ...employees]);
                            showToast(`Employee ${employeeForm.fullName} registered successfully!`);
                            setEmployeeForm({ fullName: '', designation: 'Operations Executive', department: 'Operations', branch: 'BARAMATI', mobile: '', email: '', doj: new Date().toISOString().split('T')[0] });
                        }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Ramesh S. Shinde"
                                    value={employeeForm.fullName}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, fullName: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Mobile</label>
                                    <input
                                        type="tel"
                                        required
                                        maxLength={10}
                                        placeholder="10-digit mobile"
                                        value={employeeForm.mobile}
                                        onChange={(e) => setEmployeeForm({ ...employeeForm, mobile: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Branch</label>
                                    <select
                                        value={employeeForm.branch}
                                        onChange={(e) => setEmployeeForm({ ...employeeForm, branch: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    >
                                        <option value="BARAMATI">BARAMATI</option>
                                        <option value="CHHATRAPATI SAMBHAJINAGAR">SAMBHAJINAGAR</option>
                                        <option value="AKLUJ">AKLUJ</option>
                                        <option value="AHILYANAGAR">AHILYANAGAR</option>
                                        <option value="PUNE">PUNE</option>
                                        <option value="MUMBAI">MUMBAI</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Work Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="name@reliable.in"
                                    value={employeeForm.email}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Designation</label>
                                    <select
                                        value={employeeForm.designation}
                                        onChange={(e) => setEmployeeForm({ ...employeeForm, designation: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    >
                                        <option value="Operations Executive">Operations Executive</option>
                                        <option value="Branch Manager">Branch Manager</option>
                                        <option value="Accountant">Accountant</option>
                                        <option value="Underwriter">Underwriter</option>
                                        <option value="Telecaller">Telecaller</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Department</label>
                                    <select
                                        value={employeeForm.department}
                                        onChange={(e) => setEmployeeForm({ ...employeeForm, department: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    >
                                        <option value="Operations">Operations</option>
                                        <option value="Management">Management</option>
                                        <option value="Accounts">Accounts</option>
                                        <option value="Underwriting">Underwriting</option>
                                        <option value="Calling">Calling</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Date of Joining</label>
                                <input
                                    type="date"
                                    required
                                    value={employeeForm.doj}
                                    onChange={(e) => setEmployeeForm({ ...employeeForm, doj: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-brand-primary hover:bg-blue-700 text-white rounded-lg font-semibold text-sm shadow-sm transition-all"
                            >
                                Submit Employee Registration
                            </button>
                        </form>
                    </div>

                    {/* Quick Preview Table */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">Recent Employee On-boardings</h4>
                            <button
                                onClick={() => navigate('/registration/view-employee')}
                                className="text-xs font-semibold text-brand-primary hover:underline"
                            >
                                View All ({employees.length}) →
                            </button>
                        </div>
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3 px-5">EMP CODE</th>
                                        <th className="py-3 px-5">NAME</th>
                                        <th className="py-3 px-5">DESIGNATION</th>
                                        <th className="py-3 px-5">BRANCH</th>
                                        <th className="py-3 px-5 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {employees.slice(0, 5).map(e => (
                                        <tr key={e.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="py-3 px-5 font-mono text-xs text-blue-700 font-medium">{e.empCode}</td>
                                            <td className="py-3 px-5 font-semibold text-slate-900">{e.fullName}</td>
                                            <td className="py-3 px-5 text-slate-600">{e.designation}</td>
                                            <td className="py-3 px-5">
                                                <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">{e.branch}</span>
                                            </td>
                                            <td className="py-3 px-5 text-center">
                                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
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

            {/* TAB 2: AGENT REGISTRATION FORM */}
            {activeTab === 'agent' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Agent Registration Form */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-slate-100">
                            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                                <Plus size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base">New Agent / POSP Sign-up</h3>
                                <p className="text-xs text-slate-500">Register business partner & POSP</p>
                            </div>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const newAgent: AgentItem = {
                                id: Date.now(),
                                agentCode: `AGT-${Math.floor(8800 + agents.length + 1)}`,
                                ...agentForm,
                                kycStatus: 'VERIFIED',
                                totalPolicies: 0,
                                regDate: new Date().toLocaleDateString('en-GB'),
                                status: 'ACTIVE'
                            };
                            setAgents([newAgent, ...agents]);
                            showToast(`Agent ${agentForm.fullName} registered!`);
                            setAgentForm({ fullName: '', type: 'POSP', branch: 'BARAMATI', mobile: '', email: '', panNo: '' });
                        }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Partner Type</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {(['POSP', 'DIRECT', 'FRANCHISE', 'BROKER'] as const).map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setAgentForm({ ...agentForm, type: t })}
                                            className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${agentForm.type === t ? 'border-brand-primary bg-blue-50 text-brand-primary' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Legal Name</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="As per PAN card"
                                    value={agentForm.fullName}
                                    onChange={(e) => setAgentForm({ ...agentForm, fullName: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Mobile No</label>
                                    <input
                                        type="tel"
                                        required
                                        maxLength={10}
                                        placeholder="Mobile"
                                        value={agentForm.mobile}
                                        onChange={(e) => setAgentForm({ ...agentForm, mobile: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">PAN Card</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={10}
                                        placeholder="PAN No"
                                        value={agentForm.panNo}
                                        onChange={(e) => setAgentForm({ ...agentForm, panNo: e.target.value.toUpperCase() })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email ID</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="agent@example.com"
                                    value={agentForm.email}
                                    onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Sponsoring Branch</label>
                                <select
                                    value={agentForm.branch}
                                    onChange={(e) => setAgentForm({ ...agentForm, branch: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                >
                                    <option value="BARAMATI">BARAMATI</option>
                                    <option value="CHHATRAPATI SAMBHAJINAGAR">SAMBHAJINAGAR</option>
                                    <option value="AKLUJ">AKLUJ</option>
                                    <option value="AHILYANAGAR">AHILYANAGAR</option>
                                    <option value="PUNE">PUNE</option>
                                    <option value="MUMBAI">MUMBAI</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm shadow-sm transition-all"
                            >
                                Register Agent & Generate Code
                            </button>
                        </form>
                    </div>

                    {/* Quick Preview Table */}
                    <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                            <h4 className="font-bold text-slate-900 text-sm">Recently Registered Agents</h4>
                            <button
                                onClick={() => navigate('/registration/view-agent')}
                                className="text-xs font-semibold text-brand-primary hover:underline"
                            >
                                View All ({agents.length}) →
                            </button>
                        </div>
                        <div className="overflow-x-auto flex-1">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3 px-5">AGENT CODE</th>
                                        <th className="py-3 px-5">NAME</th>
                                        <th className="py-3 px-5">TYPE</th>
                                        <th className="py-3 px-5">BRANCH</th>
                                        <th className="py-3 px-5 text-center">KYC</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {agents.slice(0, 5).map(a => (
                                        <tr key={a.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="py-3 px-5 font-mono text-xs text-blue-700 font-medium">{a.agentCode}</td>
                                            <td className="py-3 px-5 font-semibold text-slate-900">{a.fullName}</td>
                                            <td className="py-3 px-5">
                                                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700">{a.type}</span>
                                            </td>
                                            <td className="py-3 px-5 text-slate-700 text-xs font-medium">{a.branch}</td>
                                            <td className="py-3 px-5 text-center">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${a.kycStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                    {a.kycStatus}
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

            {/* TAB 3: VIEW AGENT */}
            {activeTab === 'view-agent' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search agent name, code, mobile, branch, PAN..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Active Agents: <span className="font-semibold text-slate-800">{agents.length}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">AGENT CODE</th>
                                        <th className="py-3.5 px-6">AGENT NAME</th>
                                        <th className="py-3.5 px-6">PARTNER TYPE</th>
                                        <th className="py-3.5 px-6">BRANCH</th>
                                        <th className="py-3.5 px-6">CONTACT DETAILS</th>
                                        <th className="py-3.5 px-6">PAN NO</th>
                                        <th className="py-3.5 px-6 text-center">KYC STATUS</th>
                                        <th className="py-3.5 px-6 text-center">POLICIES</th>
                                        <th className="py-3.5 px-6 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {agents
                                        .filter(a => !searchQuery || a.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || a.agentCode.toLowerCase().includes(searchQuery.toLowerCase()) || a.branch.toLowerCase().includes(searchQuery.toLowerCase()) || a.mobile.includes(searchQuery))
                                        .map((a) => (
                                            <tr key={a.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono font-medium text-blue-700 text-xs">{a.agentCode}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{a.fullName}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold">
                                                        {a.type}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-slate-700 font-medium">{a.branch}</td>
                                                <td className="py-4 px-6">
                                                    <div className="text-xs font-medium text-slate-800">{a.mobile}</div>
                                                    <div className="text-[11px] text-slate-400">{a.email}</div>
                                                </td>
                                                <td className="py-4 px-6 font-mono text-xs text-slate-700 font-medium">{a.panNo}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${a.kycStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                        {a.kycStatus}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center font-bold text-slate-800">{a.totalPolicies}</td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => {
                                                            // Move to deactivated list
                                                            setAgents(prev => prev.filter(x => x.id !== a.id));
                                                            setDeactivatedAgents([
                                                                {
                                                                    id: Date.now(),
                                                                    agentCode: a.agentCode,
                                                                    fullName: a.fullName,
                                                                    branch: a.branch,
                                                                    mobile: a.mobile,
                                                                    deactivationDate: new Date().toLocaleDateString('en-GB'),
                                                                    reason: 'Manual deactivation from directory',
                                                                    pastPolicies: a.totalPolicies,
                                                                    deactivatedBy: 'Shekharu Lab',
                                                                    category: 'VOLUNTARY'
                                                                },
                                                                ...deactivatedAgents
                                                            ]);
                                                            showToast(`Agent ${a.fullName} moved to Deactivated List`);
                                                        }}
                                                        className="px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                                                    >
                                                        Deactivate
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: VIEW EMPLOYEE */}
            {activeTab === 'view-employee' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, employee code, branch, designation..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Total Staff: <span className="font-semibold text-slate-800">{employees.length}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">EMP CODE</th>
                                        <th className="py-3.5 px-6">EMPLOYEE NAME</th>
                                        <th className="py-3.5 px-6">DESIGNATION</th>
                                        <th className="py-3.5 px-6">DEPARTMENT</th>
                                        <th className="py-3.5 px-6">BRANCH</th>
                                        <th className="py-3.5 px-6">CONTACT DETAILS</th>
                                        <th className="py-3.5 px-6">JOINING DATE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {employees
                                        .filter(e => !searchQuery || e.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || e.empCode.toLowerCase().includes(searchQuery.toLowerCase()) || e.branch.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((e) => (
                                            <tr key={e.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono font-medium text-blue-700 text-xs">{e.empCode}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{e.fullName}</td>
                                                <td className="py-4 px-6 font-medium text-slate-800">{e.designation}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                                                        {e.department}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-slate-700 font-medium">{e.branch}</td>
                                                <td className="py-4 px-6">
                                                    <div className="text-xs font-medium text-slate-800">{e.mobile}</div>
                                                    <div className="text-[11px] text-slate-400">{e.email}</div>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-600">{e.doj}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${e.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
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

            {/* TAB 5: BANK BENEFICIARY */}
            {activeTab === 'bank-beneficiary' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search beneficiary name, account no, bank, IFSC..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Beneficiaries: <span className="font-semibold text-slate-800">{beneficiaries.length}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">BENEFICIARY NAME</th>
                                        <th className="py-3.5 px-6">ENTITY TYPE</th>
                                        <th className="py-3.5 px-6">BANK NAME</th>
                                        <th className="py-3.5 px-6">ACCOUNT NUMBER</th>
                                        <th className="py-3.5 px-6">IFSC CODE</th>
                                        <th className="py-3.5 px-6">BRANCH</th>
                                        <th className="py-3.5 px-6 text-center">TYPE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {beneficiaries
                                        .filter(b => !searchQuery || b.beneficiaryName.toLowerCase().includes(searchQuery.toLowerCase()) || b.accountNumber.includes(searchQuery) || b.bankName.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((b) => (
                                            <tr key={b.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-semibold text-slate-900">{b.beneficiaryName}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-semibold">{b.entityType}</span>
                                                </td>
                                                <td className="py-4 px-6 font-medium text-slate-800">{b.bankName}</td>
                                                <td className="py-4 px-6 font-mono text-xs text-blue-700 font-medium">{b.accountNumber}</td>
                                                <td className="py-4 px-6 font-mono text-xs text-slate-600 font-medium">{b.ifscCode}</td>
                                                <td className="py-4 px-6 text-xs text-slate-600">{b.branch}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-semibold">{b.accountType}</span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${b.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                        {b.verificationStatus}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => {
                                                            setBeneficiaries(prev => prev.map(x => x.id === b.id ? { ...x, verificationStatus: 'VERIFIED' } : x));
                                                            showToast(`Bank account for ${b.beneficiaryName} verified via Penny Drop!`);
                                                        }}
                                                        className="px-2.5 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                    >
                                                        Penny Test
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 6: DELETE VEHICLE */}
            {activeTab === 'delete-vehicle' && (
                <div className="space-y-4">
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                        <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="text-sm font-bold text-amber-900">Vehicle De-registration & Record Management</h4>
                            <p className="text-xs text-amber-700 mt-0.5">
                                Delete unlinked, erroneous, or duplicate vehicle records. Deletion is logged in the system audit trail. Only vehicles without active policies can be removed.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search vehicle reg no, chassis, make model..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Candidates for deletion: <span className="font-semibold text-slate-800">{vehicles.length}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">VEHICLE REG. NO</th>
                                        <th className="py-3.5 px-6">MAKE & MODEL</th>
                                        <th className="py-3.5 px-6">CLASS</th>
                                        <th className="py-3.5 px-6">CHASSIS NO</th>
                                        <th className="py-3.5 px-6">ENGINE NO</th>
                                        <th className="py-3.5 px-6 text-center">POLICY STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {vehicles
                                        .filter(v => !searchQuery || v.regNo.toLowerCase().includes(searchQuery.toLowerCase()) || v.makeModel.toLowerCase().includes(searchQuery.toLowerCase()) || v.chassisNo.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((v) => (
                                            <tr key={v.id} className="hover:bg-rose-50/30 transition-colors">
                                                <td className="py-4 px-6 font-mono font-bold text-slate-900 text-xs">{v.regNo}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-800">{v.makeModel}</td>
                                                <td className="py-4 px-6 text-xs text-slate-600">{v.vehicleClass}</td>
                                                <td className="py-4 px-6 font-mono text-xs text-slate-500">{v.chassisNo}</td>
                                                <td className="py-4 px-6 font-mono text-xs text-slate-500">{v.engineNo}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                                                        {v.policyStatus}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedVehicleToDelete(v);
                                                            setModalType('DELETE_VEHICLE');
                                                        }}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={14} /> Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 7: DEACTIVATED AGENT LIST */}
            {activeTab === 'deactivated-agent-list' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search deactivated agent name, code, reason..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Deactivated Partners: <span className="font-semibold text-rose-600">{deactivatedAgents.length}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">AGENT CODE</th>
                                        <th className="py-3.5 px-6">AGENT NAME</th>
                                        <th className="py-3.5 px-6">BRANCH</th>
                                        <th className="py-3.5 px-6">MOBILE</th>
                                        <th className="py-3.5 px-6">DEACTIVATION DATE</th>
                                        <th className="py-3.5 px-6">REASON FOR DEACTIVATION</th>
                                        <th className="py-3.5 px-6 text-center">CATEGORY</th>
                                        <th className="py-3.5 px-6 text-right">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {deactivatedAgents
                                        .filter(d => !searchQuery || d.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || d.agentCode.toLowerCase().includes(searchQuery.toLowerCase()) || d.reason.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((d) => (
                                            <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                                                <td className="py-4 px-6 font-mono font-medium text-slate-600 text-xs">{d.agentCode}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{d.fullName}</td>
                                                <td className="py-4 px-6 text-xs text-slate-700 font-medium">{d.branch}</td>
                                                <td className="py-4 px-6 text-xs text-slate-700">{d.mobile}</td>
                                                <td className="py-4 px-6 text-xs font-mono text-slate-500">{d.deactivationDate}</td>
                                                <td className="py-4 px-6 text-xs text-slate-600 max-w-xs">{d.reason}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${d.category === 'BLACKLISTED' ? 'bg-rose-100 text-rose-800' : d.category === 'CONDUCT' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                                                        {d.category}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => {
                                                            setDeactivatedAgents(prev => prev.filter(x => x.id !== d.id));
                                                            setAgents([
                                                                {
                                                                    id: Date.now(),
                                                                    agentCode: d.agentCode,
                                                                    fullName: d.fullName,
                                                                    type: 'POSP',
                                                                    branch: d.branch,
                                                                    mobile: d.mobile,
                                                                    email: `${d.agentCode.toLowerCase()}@reliable.in`,
                                                                    panNo: 'XXXXX0000X',
                                                                    kycStatus: 'VERIFIED',
                                                                    totalPolicies: d.pastPolicies,
                                                                    regDate: new Date().toLocaleDateString('en-GB'),
                                                                    status: 'ACTIVE'
                                                                },
                                                                ...agents
                                                            ]);
                                                            showToast(`Agent ${d.fullName} reactivated and restored to active directory.`);
                                                        }}
                                                        className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold transition-colors"
                                                    >
                                                        Reactivate
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: DELETE VEHICLE CONFIRMATION */}
            {modalType === 'DELETE_VEHICLE' && selectedVehicleToDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-base">Confirm Vehicle Deletion</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <p className="text-sm text-slate-600">
                                Are you sure you want to delete vehicle <strong className="text-slate-900 font-mono">{selectedVehicleToDelete.regNo}</strong> ({selectedVehicleToDelete.makeModel})?
                            </p>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Reason for Deletion</label>
                                <select
                                    value={deleteReason}
                                    onChange={(e) => setDeleteReason(e.target.value)}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 focus:outline-none"
                                >
                                    <option value="Duplicate registration entry">Duplicate registration entry</option>
                                    <option value="Data entry typing error">Data entry typing error</option>
                                    <option value="Vehicle scrapped / Total loss">Vehicle scrapped / Total loss</option>
                                    <option value="RTO unlinked transfer">RTO unlinked transfer</option>
                                </select>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setVehicles(prev => prev.filter(v => v.id !== selectedVehicleToDelete.id));
                                        showToast(`Vehicle ${selectedVehicleToDelete.regNo} removed from records.`);
                                        setModalType(null);
                                    }}
                                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-lg"
                                >
                                    Confirm Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: BENEFICIARY */}
            {modalType === 'BENEFICIARY' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-900 text-base">Add Bank Beneficiary</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setBeneficiaries([
                                {
                                    id: Date.now(),
                                    ...beneficiaryForm,
                                    verificationStatus: 'PENDING'
                                },
                                ...beneficiaries
                            ]);
                            showToast(`Beneficiary account for ${beneficiaryForm.beneficiaryName} added.`);
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Beneficiary Legal Name</label>
                                <input
                                    type="text"
                                    required
                                    value={beneficiaryForm.beneficiaryName}
                                    onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, beneficiaryName: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Entity Type</label>
                                    <select
                                        value={beneficiaryForm.entityType}
                                        onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, entityType: e.target.value as any })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    >
                                        <option value="AGENT">AGENT</option>
                                        <option value="EMPLOYEE">EMPLOYEE</option>
                                        <option value="FRANCHISE">FRANCHISE</option>
                                        <option value="VENDOR">VENDOR</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Bank Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={beneficiaryForm.bankName}
                                        onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, bankName: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Account Number</label>
                                <input
                                    type="text"
                                    required
                                    value={beneficiaryForm.accountNumber}
                                    onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, accountNumber: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">IFSC Code</label>
                                    <input
                                        type="text"
                                        required
                                        value={beneficiaryForm.ifscCode}
                                        onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, ifscCode: e.target.value.toUpperCase() })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Branch Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={beneficiaryForm.branch}
                                        onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, branch: e.target.value })}
                                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Add Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Registration;
