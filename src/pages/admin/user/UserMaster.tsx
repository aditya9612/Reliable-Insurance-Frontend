import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import {
    Search, Plus, Edit2, Trash2, X, Shield, Check, CheckCircle2,
    AlertCircle, Key, Smartphone, MapPin, Clock, UserCheck, UserX,
    Calendar, Download, RefreshCw, Lock, Unlock, Eye, Filter, ArrowUpDown
} from 'lucide-react';

export type UserSubTab =
    | 'role-master'
    | 'designation-master'
    | 'client-app-user'
    | 'assign-privileges'
    | 'assign-location-head'
    | 'temporary-operator'
    | 'login-history';

const tabs: TabItem[] = [
    { id: 'role-master', label: 'User Role Master' },
    { id: 'designation-master', label: 'Designation Master' },
    { id: 'client-app-user', label: 'Client App User' },
    { id: 'assign-privileges', label: 'Assign Privileges' },
    { id: 'assign-location-head', label: 'Assign Location Head' },
    { id: 'temporary-operator', label: 'Temporary Operator' },
    { id: 'login-history', label: 'Login History' },
];

// --- Types ---
interface RoleItem {
    id: number;
    code: string;
    name: string;
    description: string;
    department: string;
    userCount: number;
    permissionsCount: number;
    status: 'ACTIVE' | 'INACTIVE';
}

interface DesignationItem {
    id: number;
    code: string;
    title: string;
    department: string;
    reportingTo: string;
    grade: string;
    status: 'ACTIVE' | 'INACTIVE';
}

interface ClientUserItem {
    id: number;
    userId: string;
    name: string;
    mobile: string;
    email: string;
    userType: 'CUSTOMER' | 'POSP' | 'CORPORATE';
    platform: 'Android' | 'iOS' | 'Web';
    appVersion: string;
    lastActive: string;
    status: 'ACTIVE' | 'LOCKED' | 'PENDING';
}

interface ModulePrivilege {
    id: string;
    moduleName: string;
    category: string;
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    exportData: boolean;
    approve: boolean;
}

interface LocationHeadItem {
    id: number;
    branchCode: string;
    branchName: string;
    region: string;
    currentHead: string;
    headEmail: string;
    headMobile: string;
    effectiveDate: string;
    status: 'ACTIVE' | 'IN-TRANSITION';
}

interface TemporaryOperatorItem {
    id: number;
    operatorId: string;
    name: string;
    assignedBranch: string;
    supervisor: string;
    scope: string;
    validFrom: string;
    validTo: string;
    daysRemaining: number;
    status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
}

interface LoginLogItem {
    id: number;
    timestamp: string;
    username: string;
    name: string;
    role: string;
    branch: string;
    ipAddress: string;
    device: string;
    status: 'SUCCESS' | 'FAILED';
    duration: string;
}

const UserMaster: React.FC = () => {
    const { tab } = useParams<{ tab?: string }>();
    const navigate = useNavigate();

    const activeTab = (tab && tabs.some(t => t.id === tab))
        ? (tab as UserSubTab)
        : 'role-master';

    const handleTabChange = (newTabId: string) => {
        navigate(`/users/${newTabId}`);
    };

    // Shared Search & Toast
    const [searchQuery, setSearchQuery] = useState('');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const showToast = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3000);
    };

    // Modal Generic
    const [modalType, setModalType] = useState<string | null>(null);

    // ==========================================
    // 1. ROLE MASTER STATE
    // ==========================================
    const [roles, setRoles] = useState<RoleItem[]>([
        { id: 1, code: 'ROLE_ADMIN', name: 'System Administrator', description: 'Full access across all system modules and branches', department: 'Management', userCount: 3, permissionsCount: 42, status: 'ACTIVE' },
        { id: 2, code: 'ROLE_BM', name: 'Branch Manager', description: 'Branch-level administrative operations and approval authority', department: 'Operations', userCount: 14, permissionsCount: 35, status: 'ACTIVE' },
        { id: 3, code: 'ROLE_OPS', name: 'Operations Executive', description: 'Daily policy issuance, endorsement, and policy management', department: 'Operations', userCount: 28, permissionsCount: 22, status: 'ACTIVE' },
        { id: 4, code: 'ROLE_UW', name: 'Underwriter', description: 'Policy underwriting, inspection verification and quotation approval', department: 'Underwriting', userCount: 9, permissionsCount: 18, status: 'ACTIVE' },
        { id: 5, code: 'ROLE_ACC', name: 'Accountant', description: 'Ledger management, reconciliations, cheque entries and payouts', department: 'Accounts', userCount: 8, permissionsCount: 19, status: 'ACTIVE' },
        { id: 6, code: 'ROLE_POSP', name: 'POSP Agent', description: 'POSP partner portal view, quotation generator and sales log', department: 'Sales', userCount: 412, permissionsCount: 8, status: 'ACTIVE' },
        { id: 7, code: 'ROLE_AUDIT', name: 'Compliance Auditor', description: 'Read-only access to audit trails, logs and financial summaries', department: 'Compliance', userCount: 4, permissionsCount: 12, status: 'ACTIVE' },
    ]);
    const [roleForm, setRoleForm] = useState({ code: '', name: '', department: 'Operations', description: '', status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE' });
    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);

    // ==========================================
    // 2. DESIGNATION MASTER STATE
    // ==========================================
    const [designations, setDesignations] = useState<DesignationItem[]>([
        { id: 1, code: 'DESG01', title: 'BRANCH MANAGER', department: 'MANAGEMENT', reportingTo: 'REGIONAL DIRECTOR', grade: 'M-1', status: 'ACTIVE' },
        { id: 2, code: 'DESG02', title: 'ASSISTANT BRANCH MANAGER', department: 'MANAGEMENT', reportingTo: 'BRANCH MANAGER', grade: 'M-2', status: 'ACTIVE' },
        { id: 3, code: 'DESG03', title: 'SENIOR SALES EXECUTIVE', department: 'SALES', reportingTo: 'BRANCH MANAGER', grade: 'L-2', status: 'ACTIVE' },
        { id: 4, code: 'DESG04', title: 'OPERATIONS LEAD', department: 'OPERATIONS', reportingTo: 'BRANCH MANAGER', grade: 'L-1', status: 'ACTIVE' },
        { id: 5, code: 'DESG05', title: 'TELECALLER SUPERVISOR', department: 'CALLING', reportingTo: 'OPERATIONS LEAD', grade: 'L-2', status: 'ACTIVE' },
        { id: 6, code: 'DESG06', title: 'CHIEF ACCOUNTANT', department: 'ACCOUNTS', reportingTo: 'FINANCE CONTROLLER', grade: 'M-2', status: 'ACTIVE' },
        { id: 7, code: 'DESG07', title: 'POSP COORDINATOR', department: 'SALES', reportingTo: 'BRANCH MANAGER', grade: 'L-3', status: 'ACTIVE' },
    ]);
    const [desgForm, setDesgForm] = useState({ code: '', title: '', department: 'MANAGEMENT', reportingTo: '', grade: 'L-1' });
    const [editingDesgId, setEditingDesgId] = useState<number | null>(null);

    // ==========================================
    // 3. CLIENT APP USER STATE
    // ==========================================
    const [clientUsers, setClientUsers] = useState<ClientUserItem[]>([
        { id: 1, userId: 'CLI-89012', name: 'Amitabh S. Deshmukh', mobile: '9822014589', email: 'amitabh.d@gmail.com', userType: 'CUSTOMER', platform: 'Android', appVersion: 'v2.4.1', lastActive: '10 mins ago', status: 'ACTIVE' },
        { id: 2, userId: 'POSP-4412', name: 'Ganesh K. Jagtap', mobile: '9850123984', email: 'ganesh.posp@reliable.in', userType: 'POSP', platform: 'Android', appVersion: 'v2.4.1', lastActive: '2 hours ago', status: 'ACTIVE' },
        { id: 3, userId: 'CLI-90145', name: 'Pooja Nitin Shinde', mobile: '9423187265', email: 'pooja.shinde@yahoo.co.in', userType: 'CUSTOMER', platform: 'iOS', appVersion: 'v2.4.0', lastActive: 'Yesterday', status: 'ACTIVE' },
        { id: 4, userId: 'CORP-102', name: 'Apex Agro Transport Logistics', mobile: '9921456711', email: 'fleet@apexagro.com', userType: 'CORPORATE', platform: 'Web', appVersion: 'Portal v3.1', lastActive: '3 days ago', status: 'LOCKED' },
        { id: 5, userId: 'POSP-6721', name: 'Sachin Ramchandra More', mobile: '9765432109', email: 'sachin.more@gmail.com', userType: 'POSP', platform: 'Android', appVersion: 'v2.3.9', lastActive: '5 days ago', status: 'PENDING' },
    ]);
    const [clientForm, setClientForm] = useState({ name: '', mobile: '', email: '', userType: 'CUSTOMER' as const });

    // ==========================================
    // 4. ASSIGN PRIVILEGES STATE
    // ==========================================
    const [selectedPrivilegeRole, setSelectedPrivilegeRole] = useState('ROLE_BM');
    const [privileges, setPrivileges] = useState<ModulePrivilege[]>([
        { id: 'BRANCH_MASTER', moduleName: 'Branch Master', category: 'Master Data', view: true, create: true, edit: true, delete: false, exportData: true, approve: true },
        { id: 'POLICY_MASTER', moduleName: 'Policy Master', category: 'Master Data', view: true, create: true, edit: true, delete: false, exportData: true, approve: true },
        { id: 'VEHICLE_MASTER', moduleName: 'Vehicle Master', category: 'Master Data', view: true, create: false, edit: true, delete: false, exportData: false, approve: false },
        { id: 'ACCOUNT_MASTER', moduleName: 'Account Master', category: 'Master Data', view: true, create: false, edit: false, delete: false, exportData: true, approve: false },
        { id: 'USER_MANAGEMENT', moduleName: 'User Management', category: 'User & Admin', view: true, create: true, edit: true, delete: false, exportData: true, approve: true },
        { id: 'TRANSACTIONS', moduleName: 'Transaction / Issuance', category: 'Operations', view: true, create: true, edit: true, delete: false, exportData: true, approve: true },
        { id: 'CLAIMS', moduleName: 'Claims Processing', category: 'Operations', view: true, create: true, edit: true, delete: false, exportData: true, approve: true },
        { id: 'CASH_APPROVAL', moduleName: 'Cash / Cheque Approval', category: 'Finance', view: true, create: false, edit: true, delete: false, exportData: true, approve: true },
        { id: 'COMMISSION_GRID', moduleName: 'Commission & TDS Grid', category: 'Finance', view: true, create: false, edit: false, delete: false, exportData: true, approve: false },
        { id: 'REPORTS_MIS', moduleName: 'Reports & MIS Analytics', category: 'Reports', view: true, create: false, edit: false, delete: false, exportData: true, approve: false },
    ]);

    const handleTogglePrivilege = (id: string, field: keyof Omit<ModulePrivilege, 'id' | 'moduleName' | 'category'>) => {
        setPrivileges(prev => prev.map(p => p.id === id ? { ...p, [field]: !p[field] } : p));
    };

    const handleSelectAllPrivileges = (val: boolean) => {
        setPrivileges(prev => prev.map(p => ({
            ...p,
            view: val,
            create: val,
            edit: val,
            delete: val,
            exportData: val,
            approve: val,
        })));
    };

    // ==========================================
    // 5. ASSIGN LOCATION HEAD STATE
    // ==========================================
    const [locationHeads, setLocationHeads] = useState<LocationHeadItem[]>([
        { id: 1, branchCode: 'BR001', branchName: 'BARAMATI HEAD OFFICE', region: 'Pune Division', currentHead: 'Shekharu Lab', headEmail: 'shekharu.lab@reliable.in', headMobile: '9822001122', effectiveDate: '01/01/2023', status: 'ACTIVE' },
        { id: 2, branchCode: 'BR004', branchName: 'CHHATRAPATI SAMBHAJINAGAR', region: 'Marathwada', currentHead: 'Vinayak K. Kadam', headEmail: 'v.kadam@reliable.in', headMobile: '9822345678', effectiveDate: '15/03/2023', status: 'ACTIVE' },
        { id: 3, branchCode: 'BR005', branchName: 'AKLUJ', region: 'Solapur Division', currentHead: 'Santosh Sawant', headEmail: 's.sawant@reliable.in', headMobile: '9422998877', effectiveDate: '01/06/2023', status: 'ACTIVE' },
        { id: 4, branchCode: 'BR0121', branchName: 'CHANDRAPUR', region: 'Vidarbha', currentHead: 'Pravin R. Meshram', headEmail: 'p.meshram@reliable.in', headMobile: '9765123456', effectiveDate: '10/08/2024', status: 'IN-TRANSITION' },
        { id: 5, branchCode: 'BR0139', branchName: 'AHILYANAGAR', region: 'Western Zone', currentHead: 'Rameshwar Jadhav', headEmail: 'r.jadhav@reliable.in', headMobile: '9850112233', effectiveDate: '01/11/2023', status: 'ACTIVE' },
        { id: 6, branchCode: 'BR0125', branchName: 'AMRAVATI', region: 'Vidarbha', currentHead: 'Rajesh S. Deshmukh', headEmail: 'r.deshmukh@reliable.in', headMobile: '9890123412', effectiveDate: '12/01/2024', status: 'ACTIVE' },
    ]);
    const [headForm, setHeadForm] = useState({ branchCode: 'BR001', branchName: 'BARAMATI HEAD OFFICE', headName: '', headEmail: '', headMobile: '', effectiveDate: '' });

    // ==========================================
    // 6. TEMPORARY OPERATOR STATE
    // ==========================================
    const [tempOperators, setTempOperators] = useState<TemporaryOperatorItem[]>([
        { id: 1, operatorId: 'TEMP-2026-01', name: 'Pratik Ramesh Shinde', assignedBranch: 'BARAMATI', supervisor: 'Shekharu Lab', scope: 'Data Entry & Document Scanning', validFrom: '01/10/2026', validTo: '31/10/2026', daysRemaining: 24, status: 'ACTIVE' },
        { id: 2, operatorId: 'TEMP-2026-02', name: 'Snehal Vikas Ghorpade', assignedBranch: 'CHHATRAPATI SAMBHAJINAGAR', supervisor: 'Vinayak K. Kadam', scope: 'Cheque Clearance Data Feed', validFrom: '15/09/2026', validTo: '15/10/2026', daysRemaining: 8, status: 'ACTIVE' },
        { id: 3, operatorId: 'TEMP-2026-03', name: 'Mahesh B. Pawar', assignedBranch: 'AKLUJ', supervisor: 'Santosh Sawant', scope: 'Bulk Policy Uploading', validFrom: '01/09/2026', validTo: '30/09/2026', daysRemaining: 0, status: 'EXPIRED' },
        { id: 4, operatorId: 'TEMP-2026-04', name: 'Rohan Ashok Patil', assignedBranch: 'AHILYANAGAR', supervisor: 'Rameshwar Jadhav', scope: 'KYC Record Verification', validFrom: '05/10/2026', validTo: '05/11/2026', daysRemaining: 29, status: 'ACTIVE' },
    ]);
    const [tempForm, setTempForm] = useState({ name: '', branch: 'BARAMATI', supervisor: 'Shekharu Lab', scope: 'Data Entry', validFrom: '', validTo: '' });

    // ==========================================
    // 7. LOGIN HISTORY STATE
    // ==========================================
    const [loginLogs, setLoginLogs] = useState<LoginLogItem[]>([
        { id: 1, timestamp: '07/10/2026 11:32:15', username: 'shekharu.lab', name: 'Shekharu Lab', role: 'Branch Admin', branch: 'BARAMATI', ipAddress: '192.168.1.45', device: 'Chrome 128 / Windows 11', status: 'SUCCESS', duration: 'Active now' },
        { id: 2, timestamp: '07/10/2026 10:45:00', username: 'v.kadam', name: 'Vinayak K. Kadam', role: 'Branch Manager', branch: 'SAMBHAJINAGAR', ipAddress: '49.36.128.91', device: 'Edge 128 / Windows 10', status: 'SUCCESS', duration: '47 mins' },
        { id: 3, timestamp: '07/10/2026 09:58:22', username: 'unknown_agent', name: 'Unrecognized Attempt', role: 'Guest', branch: 'UNKNOWN', ipAddress: '157.34.201.88', device: 'Firefox 130 / Linux', status: 'FAILED', duration: '—' },
        { id: 4, timestamp: '07/10/2026 09:15:40', username: 's.sawant', name: 'Santosh Sawant', role: 'Branch Manager', branch: 'AKLUJ', ipAddress: '103.87.112.14', device: 'Chrome 128 / macOS', status: 'SUCCESS', duration: '2h 15m' },
        { id: 5, timestamp: '07/10/2026 08:30:11', username: 'r.jadhav', name: 'Rameshwar Jadhav', role: 'Operations Head', branch: 'AHILYANAGAR', ipAddress: '117.204.88.5', device: 'Mobile App / Android 14', status: 'SUCCESS', duration: '3h 01m' },
        { id: 6, timestamp: '06/10/2026 18:40:55', username: 'pratik.temp', name: 'Pratik Ramesh Shinde', role: 'Temporary Operator', branch: 'BARAMATI', ipAddress: '192.168.1.102', device: 'Chrome 127 / Windows 10', status: 'SUCCESS', duration: '1h 20m' },
        { id: 7, timestamp: '06/10/2026 17:10:04', username: 'shekharu.lab', name: 'Shekharu Lab', role: 'Branch Admin', branch: 'BARAMATI', ipAddress: '192.168.1.45', device: 'Chrome 128 / Windows 11', status: 'SUCCESS', duration: '4h 10m' },
    ]);

    // Helpers
    const getActiveTabTitle = () => {
        const found = tabs.find(t => t.id === activeTab);
        return found ? found.label : 'User Management';
    };

    const getActiveTabDesc = () => {
        switch (activeTab) {
            case 'role-master': return 'Define system roles, operational access bands, and user privileges.';
            case 'designation-master': return 'Maintain company designations, corporate hierarchy, and reporting lines.';
            case 'client-app-user': return 'Manage mobile customer portal and POSP mobile app registered users.';
            case 'assign-privileges': return 'Configure granular module-wise create, edit, view, delete, and approval permissions.';
            case 'assign-location-head': return 'Assign and manage branch heads, location in-charges, and supervisors.';
            case 'temporary-operator': return 'Issue time-bound restricted access for contract operators and data entry staff.';
            case 'login-history': return 'Complete audit log and IP tracking for system security and authentication events.';
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

            {/* Header */}
            <PageHeader
                title={`User Master — ${getActiveTabTitle()}`}
                description={getActiveTabDesc()}
                action={
                    activeTab === 'role-master' ? (
                        <button
                            onClick={() => { setEditingRoleId(null); setRoleForm({ code: `ROLE_0${roles.length + 1}`, name: '', department: 'Operations', description: '', status: 'ACTIVE' }); setModalType('ROLE'); }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <Plus size={16} /> Add New Role
                        </button>
                    ) : activeTab === 'designation-master' ? (
                        <button
                            onClick={() => { setEditingDesgId(null); setDesgForm({ code: `DESG0${designations.length + 1}`, title: '', department: 'MANAGEMENT', reportingTo: 'BRANCH MANAGER', grade: 'L-1' }); setModalType('DESG'); }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <Plus size={16} /> Add Designation
                        </button>
                    ) : activeTab === 'client-app-user' ? (
                        <button
                            onClick={() => { setClientForm({ name: '', mobile: '', email: '', userType: 'CUSTOMER' }); setModalType('CLIENT'); }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <Plus size={16} /> Register Client User
                        </button>
                    ) : activeTab === 'assign-privileges' ? (
                        <button
                            onClick={() => showToast('Privileges saved successfully for selected role!')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <Check size={16} /> Save Privileges
                        </button>
                    ) : activeTab === 'assign-location-head' ? (
                        <button
                            onClick={() => { setHeadForm({ branchCode: 'BR001', branchName: 'BARAMATI HEAD OFFICE', headName: '', headEmail: '', headMobile: '', effectiveDate: new Date().toISOString().split('T')[0] }); setModalType('HEAD'); }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <MapPin size={16} /> Assign Location Head
                        </button>
                    ) : activeTab === 'temporary-operator' ? (
                        <button
                            onClick={() => { setTempForm({ name: '', branch: 'BARAMATI', supervisor: 'Shekharu Lab', scope: 'Data Entry', validFrom: '', validTo: '' }); setModalType('TEMP'); }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all"
                        >
                            <Plus size={16} /> Create Temp Operator
                        </button>
                    ) : (
                        <button
                            onClick={() => showToast('Login Audit Trail exported as CSV!')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-semibold hover:bg-slate-900 shadow-sm transition-all"
                        >
                            <Download size={16} /> Export Audit Log
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

            {/* TAB CONTENT 1: USER ROLE MASTER */}
            {activeTab === 'role-master' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by role code, title, department..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Showing <span className="font-semibold text-slate-800">{roles.length}</span> Roles Configured
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">ROLE CODE</th>
                                        <th className="py-3.5 px-6">ROLE NAME</th>
                                        <th className="py-3.5 px-6">DEPARTMENT</th>
                                        <th className="py-3.5 px-6">DESCRIPTION</th>
                                        <th className="py-3.5 px-6 text-center">USERS</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {roles
                                        .filter(r => !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.code.toLowerCase().includes(searchQuery.toLowerCase()) || r.department.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((r) => (
                                            <tr key={r.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono font-medium text-blue-700 text-xs">{r.code}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{r.name}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                                                        {r.department}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-slate-500 max-w-xs truncate">{r.description}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                                                        {r.userCount}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${r.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                                        {r.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="inline-flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingRoleId(r.id);
                                                                setRoleForm({ code: r.code, name: r.name, department: r.department, description: r.description, status: r.status });
                                                                setModalType('ROLE');
                                                            }}
                                                            className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-md transition-colors"
                                                            title="Edit Role"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedPrivilegeRole(r.code);
                                                                navigate('/users/assign-privileges');
                                                            }}
                                                            className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-indigo-600 rounded-md transition-colors"
                                                            title="Manage Privileges"
                                                        >
                                                            <Shield size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 2: DESIGNATION MASTER */}
            {activeTab === 'designation-master' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by designation, code, department..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Showing <span className="font-semibold text-slate-800">{designations.length}</span> Active Designations
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">CODE</th>
                                        <th className="py-3.5 px-6">DESIGNATION TITLE</th>
                                        <th className="py-3.5 px-6">DEPARTMENT</th>
                                        <th className="py-3.5 px-6">REPORTING TO</th>
                                        <th className="py-3.5 px-6 text-center">GRADE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {designations
                                        .filter(d => !searchQuery || d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.code.toLowerCase().includes(searchQuery.toLowerCase()) || d.department.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((d) => (
                                            <tr key={d.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono font-medium text-slate-600 text-xs">{d.code}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{d.title}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                                                        {d.department}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-slate-600 font-medium">{d.reportingTo}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-800 rounded font-semibold text-xs">{d.grade}</span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                                                        {d.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="inline-flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingDesgId(d.id);
                                                                setDesgForm({ code: d.code, title: d.title, department: d.department, reportingTo: d.reportingTo, grade: d.grade });
                                                                setModalType('DESG');
                                                            }}
                                                            className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-blue-600 rounded-md transition-colors"
                                                            title="Edit Designation"
                                                        >
                                                            <Edit2 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setDesignations(prev => prev.filter(x => x.id !== d.id));
                                                                showToast(`Designation ${d.title} removed.`);
                                                            }}
                                                            className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-rose-600 rounded-md transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 3: CLIENT APP USER */}
            {activeTab === 'client-app-user' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by name, mobile number, email, user ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500 font-medium">Filter:</span>
                            <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold cursor-pointer">All Apps</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">USER ID</th>
                                        <th className="py-3.5 px-6">CLIENT NAME</th>
                                        <th className="py-3.5 px-6">CONTACT DETAILS</th>
                                        <th className="py-3.5 px-6">TYPE</th>
                                        <th className="py-3.5 px-6">DEVICE & VERSION</th>
                                        <th className="py-3.5 px-6">LAST ACTIVE</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {clientUsers
                                        .filter(c => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.mobile.includes(searchQuery) || c.userId.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((c) => (
                                            <tr key={c.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono font-medium text-blue-700 text-xs">{c.userId}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{c.name}</td>
                                                <td className="py-4 px-6">
                                                    <div className="text-xs font-medium text-slate-800">{c.mobile}</div>
                                                    <div className="text-[11px] text-slate-400">{c.email}</div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${c.userType === 'CUSTOMER' ? 'bg-emerald-50 text-emerald-700' : c.userType === 'POSP' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'}`}>
                                                        {c.userType}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-600">
                                                    <div className="flex items-center gap-1.5 font-medium">
                                                        <Smartphone size={14} className="text-slate-400" />
                                                        {c.platform} <span className="text-slate-400">•</span> {c.appVersion}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-500">{c.lastActive}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${c.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : c.status === 'LOCKED' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'}`}>
                                                        {c.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="inline-flex items-center gap-2">
                                                        <button
                                                            onClick={() => showToast(`Password/MPIN reset link dispatched to ${c.mobile}`)}
                                                            className="p-1.5 hover:bg-slate-100 text-slate-600 hover:text-amber-600 rounded-md transition-colors"
                                                            title="Reset MPIN / Password"
                                                        >
                                                            <Key size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setClientUsers(prev => prev.map(u => u.id === c.id ? { ...u, status: u.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE' } : u));
                                                                showToast(`Account status updated for ${c.name}`);
                                                            }}
                                                            className={`p-1.5 hover:bg-slate-100 rounded-md transition-colors ${c.status === 'ACTIVE' ? 'text-slate-600 hover:text-rose-600' : 'text-emerald-600 hover:text-emerald-700'}`}
                                                            title={c.status === 'ACTIVE' ? 'Lock Account' : 'Unlock Account'}
                                                        >
                                                            {c.status === 'ACTIVE' ? <Lock size={16} /> : <Unlock size={16} />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 4: ASSIGN PRIVILEGES */}
            {activeTab === 'assign-privileges' && (
                <div className="space-y-4">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <label className="text-sm font-semibold text-slate-700">Select Role to Configure:</label>
                            <select
                                value={selectedPrivilegeRole}
                                onChange={(e) => setSelectedPrivilegeRole(e.target.value)}
                                className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            >
                                {roles.map(r => (
                                    <option key={r.code} value={r.code}>{r.name} ({r.code})</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => handleSelectAllPrivileges(true)}
                                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                            >
                                Grant All Permissions
                            </button>
                            <button
                                onClick={() => handleSelectAllPrivileges(false)}
                                className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">MODULE NAME</th>
                                        <th className="py-3.5 px-6">CATEGORY</th>
                                        <th className="py-3.5 px-4 text-center">VIEW</th>
                                        <th className="py-3.5 px-4 text-center">CREATE</th>
                                        <th className="py-3.5 px-4 text-center">EDIT</th>
                                        <th className="py-3.5 px-4 text-center">DELETE</th>
                                        <th className="py-3.5 px-4 text-center">EXPORT</th>
                                        <th className="py-3.5 px-4 text-center">APPROVE</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {privileges.map((p) => (
                                        <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                                            <td className="py-3.5 px-6 font-semibold text-slate-900">{p.moduleName}</td>
                                            <td className="py-3.5 px-6 text-xs text-slate-500 font-medium">{p.category}</td>
                                            {(['view', 'create', 'edit', 'delete', 'exportData', 'approve'] as const).map(col => (
                                                <td key={col} className="py-3.5 px-4 text-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={p[col]}
                                                        onChange={() => handleTogglePrivilege(p.id, col)}
                                                        className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary border-slate-300 cursor-pointer"
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                            <button
                                onClick={() => showToast(`Privileges updated successfully for role ${selectedPrivilegeRole}!`)}
                                className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700 shadow-sm transition-all"
                            >
                                Save Privileges Matrix
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 5: ASSIGN LOCATION HEAD */}
            {activeTab === 'assign-location-head' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by branch name, code, current head..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Showing <span className="font-semibold text-slate-800">{locationHeads.length}</span> Branch Assignments
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">BRANCH CODE</th>
                                        <th className="py-3.5 px-6">BRANCH NAME</th>
                                        <th className="py-3.5 px-6">REGION / DIVISION</th>
                                        <th className="py-3.5 px-6">CURRENT LOCATION HEAD</th>
                                        <th className="py-3.5 px-6">CONTACT DETAILS</th>
                                        <th className="py-3.5 px-6">EFFECTIVE FROM</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {locationHeads
                                        .filter(h => !searchQuery || h.branchName.toLowerCase().includes(searchQuery.toLowerCase()) || h.currentHead.toLowerCase().includes(searchQuery.toLowerCase()) || h.branchCode.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((h) => (
                                            <tr key={h.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono font-medium text-blue-700 text-xs">{h.branchCode}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{h.branchName}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium">
                                                        {h.region}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 font-semibold text-slate-800">{h.currentHead}</td>
                                                <td className="py-4 px-6">
                                                    <div className="text-xs font-medium text-slate-800">{h.headMobile}</div>
                                                    <div className="text-[11px] text-slate-400">{h.headEmail}</div>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-600 font-medium">{h.effectiveDate}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${h.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                                                        {h.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        onClick={() => {
                                                            setHeadForm({
                                                                branchCode: h.branchCode,
                                                                branchName: h.branchName,
                                                                headName: h.currentHead,
                                                                headEmail: h.headEmail,
                                                                headMobile: h.headMobile,
                                                                effectiveDate: h.effectiveDate
                                                            });
                                                            setModalType('HEAD');
                                                        }}
                                                        className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
                                                    >
                                                        Change Head
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

            {/* TAB CONTENT 6: TEMPORARY OPERATOR */}
            {activeTab === 'temporary-operator' && (
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by operator name, ID, branch, supervisor..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                            Active Time-bound Operators: <span className="font-semibold text-emerald-600">{tempOperators.filter(t => t.status === 'ACTIVE').length}</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">OPERATOR ID</th>
                                        <th className="py-3.5 px-6">FULL NAME</th>
                                        <th className="py-3.5 px-6">ASSIGNED BRANCH</th>
                                        <th className="py-3.5 px-6">SUPERVISOR</th>
                                        <th className="py-3.5 px-6">PERMITTED SCOPE</th>
                                        <th className="py-3.5 px-6">VALIDITY PERIOD</th>
                                        <th className="py-3.5 px-6 text-center">TIME LEFT</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {tempOperators
                                        .filter(t => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.operatorId.toLowerCase().includes(searchQuery.toLowerCase()) || t.assignedBranch.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((t) => (
                                            <tr key={t.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono font-medium text-slate-600 text-xs">{t.operatorId}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{t.name}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2.5 py-1 bg-slate-100 text-slate-800 rounded-md text-xs font-medium">
                                                        {t.assignedBranch}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-xs text-slate-600 font-medium">{t.supervisor}</td>
                                                <td className="py-4 px-6 text-xs text-slate-600">{t.scope}</td>
                                                <td className="py-4 px-6 text-xs text-slate-500">{t.validFrom} — {t.validTo}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${t.daysRemaining > 10 ? 'bg-emerald-50 text-emerald-700' : t.daysRemaining > 0 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                                                        {t.daysRemaining > 0 ? `${t.daysRemaining} days` : 'Expired'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${t.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                                        {t.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="inline-flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setTempOperators(prev => prev.map(x => x.id === t.id ? { ...x, daysRemaining: x.daysRemaining + 30, status: 'ACTIVE' } : x));
                                                                showToast(`Extended 30 days validity for ${t.name}`);
                                                            }}
                                                            className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold transition-colors"
                                                            title="Extend Validity"
                                                        >
                                                            Extend +30d
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setTempOperators(prev => prev.map(x => x.id === t.id ? { ...x, status: x.status === 'ACTIVE' ? 'REVOKED' : 'ACTIVE' } : x));
                                                                showToast(`Access toggled for ${t.name}`);
                                                            }}
                                                            className={`p-1.5 hover:bg-slate-100 rounded transition-colors ${t.status === 'ACTIVE' ? 'text-rose-600' : 'text-emerald-600'}`}
                                                            title={t.status === 'ACTIVE' ? 'Revoke Access' : 'Reactivate'}
                                                        >
                                                            {t.status === 'ACTIVE' ? <UserX size={15} /> : <UserCheck size={15} />}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 7: LOGIN HISTORY */}
            {activeTab === 'login-history' && (
                <div className="space-y-5">
                    {/* Stat Badges */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Logins Today</div>
                            <div className="text-2xl font-bold text-slate-900">142</div>
                            <div className="text-[11px] text-emerald-600 font-medium mt-1">↑ 12% vs yesterday</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Active Sessions</div>
                            <div className="text-2xl font-bold text-blue-600">38</div>
                            <div className="text-[11px] text-slate-500 font-medium mt-1">Concurrent users</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Failed Attempts</div>
                            <div className="text-2xl font-bold text-rose-600">3</div>
                            <div className="text-[11px] text-rose-600 font-medium mt-1">IP auto-restricted</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Distinct Branches</div>
                            <div className="text-2xl font-bold text-slate-900">18</div>
                            <div className="text-[11px] text-slate-500 font-medium mt-1">Logged in today</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <div className="relative flex-1 max-w-md">
                            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search by username, IP address, branch name..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                            />
                        </div>
                        <button
                            onClick={() => showToast('Audit history refreshed!')}
                            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                        >
                            <RefreshCw size={14} /> Refresh
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-[12px] font-semibold text-slate-600 uppercase tracking-wider">
                                        <th className="py-3.5 px-6">TIMESTAMP</th>
                                        <th className="py-3.5 px-6">USER</th>
                                        <th className="py-3.5 px-6">ROLE</th>
                                        <th className="py-3.5 px-6">BRANCH</th>
                                        <th className="py-3.5 px-6">IP ADDRESS</th>
                                        <th className="py-3.5 px-6">CLIENT / BROWSER</th>
                                        <th className="py-3.5 px-6 text-center">STATUS</th>
                                        <th className="py-3.5 px-6 text-right">SESSION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                    {loginLogs
                                        .filter(l => !searchQuery || l.username.toLowerCase().includes(searchQuery.toLowerCase()) || l.ipAddress.includes(searchQuery) || l.branch.toLowerCase().includes(searchQuery.toLowerCase()))
                                        .map((l) => (
                                            <tr key={l.id} className="hover:bg-blue-50/40 transition-colors">
                                                <td className="py-4 px-6 font-mono text-xs text-slate-600">{l.timestamp}</td>
                                                <td className="py-4 px-6 font-semibold text-slate-900">{l.name}</td>
                                                <td className="py-4 px-6">
                                                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                                                        {l.role}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-xs font-semibold text-slate-800">{l.branch}</td>
                                                <td className="py-4 px-6 font-mono text-xs text-blue-700">{l.ipAddress}</td>
                                                <td className="py-4 px-6 text-xs text-slate-600">{l.device}</td>
                                                <td className="py-4 px-6 text-center">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${l.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                                        {l.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right text-xs font-medium text-slate-600">{l.duration}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* MODALS */}
            {/* Modal: Add/Edit Role */}
            {modalType === 'ROLE' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">{editingRoleId ? 'Edit Role' : 'Create New Role'}</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (editingRoleId) {
                                setRoles(prev => prev.map(r => r.id === editingRoleId ? { ...r, ...roleForm } : r));
                                showToast(`Role ${roleForm.name} updated!`);
                            } else {
                                setRoles(prev => [...prev, { id: Date.now(), ...roleForm, userCount: 0, permissionsCount: 10 }]);
                                showToast(`Role ${roleForm.name} created!`);
                            }
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Role Code</label>
                                <input
                                    type="text"
                                    required
                                    value={roleForm.code}
                                    onChange={(e) => setRoleForm({ ...roleForm, code: e.target.value.toUpperCase() })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Role Name</label>
                                <input
                                    type="text"
                                    required
                                    value={roleForm.name}
                                    onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Department</label>
                                <select
                                    value={roleForm.department}
                                    onChange={(e) => setRoleForm({ ...roleForm, department: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                >
                                    <option value="Management">Management</option>
                                    <option value="Operations">Operations</option>
                                    <option value="Underwriting">Underwriting</option>
                                    <option value="Accounts">Accounts</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Compliance">Compliance</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Description</label>
                                <textarea
                                    value={roleForm.description}
                                    onChange={(e) => setRoleForm({ ...roleForm, description: e.target.value })}
                                    rows={2}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Save Role</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Add/Edit Designation */}
            {modalType === 'DESG' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">{editingDesgId ? 'Edit Designation' : 'Add Designation'}</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (editingDesgId) {
                                setDesignations(prev => prev.map(d => d.id === editingDesgId ? { ...d, ...desgForm } : d));
                                showToast(`Designation ${desgForm.title} updated!`);
                            } else {
                                setDesignations(prev => [...prev, { id: Date.now(), ...desgForm, status: 'ACTIVE' }]);
                                showToast(`Designation ${desgForm.title} added!`);
                            }
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Designation Code</label>
                                <input
                                    type="text"
                                    required
                                    value={desgForm.code}
                                    onChange={(e) => setDesgForm({ ...desgForm, code: e.target.value.toUpperCase() })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Designation Title</label>
                                <input
                                    type="text"
                                    required
                                    value={desgForm.title}
                                    onChange={(e) => setDesgForm({ ...desgForm, title: e.target.value.toUpperCase() })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Department</label>
                                <input
                                    type="text"
                                    required
                                    value={desgForm.department}
                                    onChange={(e) => setDesgForm({ ...desgForm, department: e.target.value.toUpperCase() })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Reporting To</label>
                                <input
                                    type="text"
                                    required
                                    value={desgForm.reportingTo}
                                    onChange={(e) => setDesgForm({ ...desgForm, reportingTo: e.target.value.toUpperCase() })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Client User Register */}
            {modalType === 'CLIENT' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Register Client App User</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setClientUsers(prev => [...prev, {
                                id: Date.now(),
                                userId: `CLI-${Math.floor(10000 + Math.random() * 90000)}`,
                                ...clientForm,
                                platform: 'Android',
                                appVersion: 'v2.4.1',
                                lastActive: 'Just registered',
                                status: 'ACTIVE'
                            }]);
                            showToast(`Client ${clientForm.name} registered. MPIN set to default.`);
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={clientForm.name}
                                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    required
                                    maxLength={10}
                                    value={clientForm.mobile}
                                    onChange={(e) => setClientForm({ ...clientForm, mobile: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email ID</label>
                                <input
                                    type="email"
                                    required
                                    value={clientForm.email}
                                    onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Assign Location Head */}
            {modalType === 'HEAD' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Assign Location Head</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setLocationHeads(prev => prev.map(h => h.branchCode === headForm.branchCode ? {
                                ...h,
                                currentHead: headForm.headName,
                                headEmail: headForm.headEmail,
                                headMobile: headForm.headMobile,
                                effectiveDate: headForm.effectiveDate || new Date().toISOString().split('T')[0]
                            } : h));
                            showToast(`${headForm.headName} assigned as Head for ${headForm.branchName}`);
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Branch</label>
                                <input
                                    type="text"
                                    disabled
                                    value={`${headForm.branchCode} — ${headForm.branchName}`}
                                    className="w-full px-3.5 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">New Head Name</label>
                                <input
                                    type="text"
                                    required
                                    value={headForm.headName}
                                    onChange={(e) => setHeadForm({ ...headForm, headName: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={headForm.headEmail}
                                    onChange={(e) => setHeadForm({ ...headForm, headEmail: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Contact Mobile</label>
                                <input
                                    type="tel"
                                    required
                                    value={headForm.headMobile}
                                    onChange={(e) => setHeadForm({ ...headForm, headMobile: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Assign Head</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal: Create Temp Operator */}
            {modalType === 'TEMP' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Add Temporary Operator</h3>
                            <button onClick={() => setModalType(null)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            setTempOperators(prev => [...prev, {
                                id: Date.now(),
                                operatorId: `TEMP-2026-0${prev.length + 1}`,
                                name: tempForm.name,
                                assignedBranch: tempForm.branch,
                                supervisor: tempForm.supervisor,
                                scope: tempForm.scope,
                                validFrom: tempForm.validFrom || '07/10/2026',
                                validTo: tempForm.validTo || '07/11/2026',
                                daysRemaining: 30,
                                status: 'ACTIVE'
                            }]);
                            showToast(`Temporary Operator ${tempForm.name} created!`);
                            setModalType(null);
                        }} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Operator Name</label>
                                <input
                                    type="text"
                                    required
                                    value={tempForm.name}
                                    onChange={(e) => setTempForm({ ...tempForm, name: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Assigned Branch</label>
                                <select
                                    value={tempForm.branch}
                                    onChange={(e) => setTempForm({ ...tempForm, branch: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                >
                                    <option value="BARAMATI">BARAMATI</option>
                                    <option value="CHHATRAPATI SAMBHAJINAGAR">CHHATRAPATI SAMBHAJINAGAR</option>
                                    <option value="AKLUJ">AKLUJ</option>
                                    <option value="AHILYANAGAR">AHILYANAGAR</option>
                                    <option value="PUNE">PUNE</option>
                                    <option value="MUMBAI">MUMBAI</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Supervisor</label>
                                <input
                                    type="text"
                                    required
                                    value={tempForm.supervisor}
                                    onChange={(e) => setTempForm({ ...tempForm, supervisor: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Operational Scope</label>
                                <input
                                    type="text"
                                    required
                                    value={tempForm.scope}
                                    onChange={(e) => setTempForm({ ...tempForm, scope: e.target.value })}
                                    className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50">Cancel</button>
                                <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-700">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMaster;
