import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    companyName: string;
    userName: string;
    password: string;
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

interface SalesExecutiveItem {
    id: number;
    name: string;
    mobile: string;
    assignedHead?: string;
}

interface TemporaryOperatorAssignment {
    id: number;
    operator: string;
    temporaryOperator: string;
}

interface LoginLogItem {
    id: number;
    loginDate: string;
    loginTime: string;
    role: string;
    userName: string;
    name: string;
    remark: string;
    ipAddress: string;
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
        { id: 1, code: 'ROLE_ACCOUNT', name: 'ACCOUNT', description: 'Financial ledger & voucher entries', department: 'Accounts', userCount: 8, permissionsCount: 19, status: 'ACTIVE' },
        { id: 2, code: 'ROLE_ACCOUNT_HEAD', name: 'ACCOUNT HEAD', description: 'Financial accounting and audit head', department: 'Accounts', userCount: 2, permissionsCount: 28, status: 'ACTIVE' },
        { id: 3, code: 'ROLE_ADMIN', name: 'ADMIN', description: 'System Administrator with master privileges', department: 'Management', userCount: 3, permissionsCount: 42, status: 'ACTIVE' },
        { id: 4, code: 'ROLE_AGENT', name: 'AGENT', description: 'POSP Agent portal access', department: 'Sales', userCount: 412, permissionsCount: 8, status: 'ACTIVE' },
        { id: 5, code: 'ROLE_ALL_USER', name: 'ALL USER', description: 'Universal base role for all system users', department: 'General', userCount: 520, permissionsCount: 6, status: 'ACTIVE' },
        { id: 6, code: 'ROLE_ASSISTANT_MANAGER', name: 'ASSISTANT MANAGER', description: 'Assistant branch and operations management', department: 'Operations', userCount: 12, permissionsCount: 24, status: 'ACTIVE' },
        { id: 7, code: 'ROLE_BACK_OFFICE', name: 'BACK OFFICE', description: 'Document processing and underwriting support', department: 'Operations', userCount: 34, permissionsCount: 14, status: 'ACTIVE' },
        { id: 8, code: 'ROLE_BRANCH_HEAD', name: 'BRANCH HEAD', description: 'Branch Head administrative control', department: 'Management', userCount: 18, permissionsCount: 35, status: 'ACTIVE' },
        { id: 9, code: 'ROLE_BROKER_PARTNER', name: 'BROKER PARTNER', description: 'External broker partnership integration', department: 'Sales', userCount: 26, permissionsCount: 11, status: 'ACTIVE' },
        { id: 10, code: 'ROLE_BUSINESS_HEAD', name: 'BUSINESS HEAD', description: 'Corporate business expansion and executive head', department: 'Management', userCount: 4, permissionsCount: 40, status: 'ACTIVE' },
        // Subsequent pages for 1 2 3 4 5 ... LAST
        { id: 11, code: 'ROLE_CLAIM_EXEC', name: 'CLAIM EXECUTIVE', description: 'Claim processing and surveyor liaison', department: 'Operations', userCount: 9, permissionsCount: 16, status: 'ACTIVE' },
        { id: 12, code: 'ROLE_CLAIM_HEAD', name: 'CLAIM HEAD', description: 'Claim approvals and hospital network settlement', department: 'Operations', userCount: 3, permissionsCount: 29, status: 'ACTIVE' },
        { id: 13, code: 'ROLE_COMPLIANCE', name: 'COMPLIANCE OFFICER', description: 'Regulatory statutory compliance audit', department: 'Compliance', userCount: 4, permissionsCount: 22, status: 'ACTIVE' },
        { id: 14, code: 'ROLE_DISPATCH', name: 'DISPATCH', description: 'Policy printing and courier dispatch', department: 'Operations', userCount: 6, permissionsCount: 10, status: 'ACTIVE' },
        { id: 15, code: 'ROLE_HR_MANAGER', name: 'HR MANAGER', description: 'Human resources and employee database', department: 'HR', userCount: 5, permissionsCount: 30, status: 'ACTIVE' },
        { id: 16, code: 'ROLE_IT_SUPPORT', name: 'IT SUPPORT', description: 'Technical infrastructure and user support', department: 'IT', userCount: 7, permissionsCount: 18, status: 'ACTIVE' },
        { id: 17, code: 'ROLE_LEGAL', name: 'LEGAL', description: 'Legal advisory and dispute resolution', department: 'Legal', userCount: 3, permissionsCount: 15, status: 'ACTIVE' },
        { id: 18, code: 'ROLE_RENEWAL', name: 'RENEWAL CALLER', description: 'Policy expiry renewal tele-calling', department: 'Sales', userCount: 22, permissionsCount: 12, status: 'ACTIVE' },
        { id: 19, code: 'ROLE_TELECALLER', name: 'TELECALLER', description: 'Customer care and telesales support', department: 'Sales', userCount: 30, permissionsCount: 9, status: 'ACTIVE' },
        { id: 20, code: 'ROLE_UNDERWRITER', name: 'UNDERWRITER', description: 'Motor and non-motor risk quotation', department: 'Underwriting', userCount: 11, permissionsCount: 25, status: 'ACTIVE' },
        { id: 21, code: 'ROLE_ZONAL_HEAD', name: 'ZONAL HEAD', description: 'Zonal branch oversight', department: 'Management', userCount: 2, permissionsCount: 38, status: 'ACTIVE' },
        { id: 22, code: 'ROLE_INSPECTION', name: 'INSPECTION OFFICER', description: 'Pre-inspection vehicle check', department: 'Operations', userCount: 8, permissionsCount: 12, status: 'ACTIVE' },
    ]);
    const [roleForm, setRoleForm] = useState({ code: '', name: '', department: 'Operations', description: '', status: 'ACTIVE' as 'ACTIVE' | 'INACTIVE' });
    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
    const [rolePage, setRolePage] = useState<number>(1);
    const rolesPerPage = 10;

    // ==========================================
    // 2. DESIGNATION MASTER STATE
    // ==========================================
    const [designations, setDesignations] = useState<DesignationItem[]>([
        { id: 1, code: 'DESG01', title: 'BACK OFFICE', department: 'OPERATIONS', reportingTo: 'BRANCH MANAGER', grade: 'L-1', status: 'ACTIVE' },
        { id: 2, code: 'DESG02', title: 'BUSINESS HEAD', department: 'MANAGEMENT', reportingTo: 'MANAGING DIRECTOR', grade: 'M-1', status: 'ACTIVE' },
        { id: 3, code: 'DESG03', title: 'HOUSE KEEPING', department: 'ADMINISTRATION', reportingTo: 'OFFICE ADMIN', grade: 'L-4', status: 'ACTIVE' },
        { id: 4, code: 'DESG04', title: 'LOCATION HEAD', department: 'MANAGEMENT', reportingTo: 'ZONAL HEAD', grade: 'M-2', status: 'ACTIVE' },
        { id: 5, code: 'DESG05', title: 'OFFICE STAFF', department: 'ADMINISTRATION', reportingTo: 'OPERATIONS LEAD', grade: 'L-3', status: 'ACTIVE' },
        { id: 6, code: 'DESG06', title: 'OPERATION HEAD', department: 'OPERATIONS', reportingTo: 'DIRECTOR', grade: 'M-1', status: 'ACTIVE' },
        { id: 7, code: 'DESG07', title: 'OPERATOR', department: 'OPERATIONS', reportingTo: 'OPERATION HEAD', grade: 'L-2', status: 'ACTIVE' },
        { id: 8, code: 'DESG08', title: 'SALES EXECUTIVE', department: 'SALES', reportingTo: 'SALES MANAGER', grade: 'L-2', status: 'ACTIVE' },
        { id: 9, code: 'DESG09', title: 'SALES MANAGER', department: 'SALES', reportingTo: 'BUSINESS HEAD', grade: 'M-2', status: 'ACTIVE' },
        { id: 10, code: 'DESG10', title: 'SR.SALES EXECUTIVE', department: 'SALES', reportingTo: 'SALES MANAGER', grade: 'L-1', status: 'ACTIVE' },
        // Subsequent page items for 1 2 pagination
        { id: 11, code: 'DESG11', title: 'SUPERVISOR', department: 'OPERATIONS', reportingTo: 'OPERATION HEAD', grade: 'L-1', status: 'ACTIVE' },
        { id: 12, code: 'DESG12', title: 'TELECALLER', department: 'CALLING', reportingTo: 'SUPERVISOR', grade: 'L-3', status: 'ACTIVE' },
        { id: 13, code: 'DESG13', title: 'UNDERWRITER', department: 'UNDERWRITING', reportingTo: 'OPERATION HEAD', grade: 'M-3', status: 'ACTIVE' },
        { id: 14, code: 'DESG14', title: 'ZONAL HEAD', department: 'MANAGEMENT', reportingTo: 'MANAGING DIRECTOR', grade: 'M-1', status: 'ACTIVE' },
    ]);
    const [desgForm, setDesgForm] = useState({ code: '', title: '', department: 'MANAGEMENT', reportingTo: '', grade: 'L-1' });
    const [editingDesgId, setEditingDesgId] = useState<number | null>(null);
    const [desgPage, setDesgPage] = useState<number>(1);
    const desgsPerPage = 10;

    // ==========================================
    // 3. CLIENT APP USER STATE
    // ==========================================
    const clientCompanyOptions = [
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
        'CHETAN CHANDRAKANT JAGTAP',
        'DATTA DIGAMBAR CONSTRUCTION',
        'GAJANAN PRAKASHRAO THAKARE',
        'HANUMANT TUKARAM GAVKARE',
        'HARISHCHANDRA ANANT GHARGE',
        'INFRAPROJECTS PVT LTD',
    ];

    const [clientUsers, setClientUsers] = useState<ClientUserItem[]>([
        { id: 1, companyName: 'NA', userName: 'SHEKHARU.LAB', password: 'SHEKHARU@123' },
        { id: 2, companyName: 'AJINATH PRAKASH TALEKAR', userName: 'AJINATH.TALEKAR', password: 'AJINATH@123' },
        { id: 3, companyName: 'AMIT ASHOK BHOITE', userName: 'AMIT.BHOITE', password: 'AMIT@2024' },
        { id: 4, companyName: 'DATTA DIGAMBAR CONSTRUCTION', userName: 'DATTA.CONST', password: 'DATTA@567' },
        { id: 5, companyName: 'INFRAPROJECTS PVT LTD', userName: 'INFRA.ADMIN', password: 'INFRA@999' },
    ]);
    const [clientForm, setClientForm] = useState({ companyName: '', userName: '', password: '' });
    const [editingClientId, setEditingClientId] = useState<number | null>(null);

    // ==========================================
    // 4. ASSIGN PRIVILEGES STATE
    // ==========================================
    const branchOptions = [
        'AHILYANAGAR',
        'AKLUJ',
        'AKOLA',
        'AMRAVATI',
        'BARAMATI',
        'BARSHI',
        'BEED',
        'BHIGWAN',
        'BULDHANA',
        'CHANDRAPUR',
        'Chhatrapati Sambhajinagar',
        'DHULE',
        'GADCHIROLI',
        'GONDIA',
        'HINGOLI',
        'JALGAON',
        'JALNA',
        'KOLHAPUR',
        'LATUR',
        'MUMBAI',
        'NAGPUR',
        'NANDED',
        'NANDURBAR',
        'NASHIK',
        'OSMANABAD',
        'PALGHAR',
        'PARBHANI',
        'PUNE',
        'RAIGAD',
        'RATNAGIRI',
        'SANGLI',
        'SATARA',
        'SINDHUDURG',
        'SOLAPUR',
        'THANE',
        'WARDHA',
        'WASHIM',
        'YAVATMAL',
    ];

    const privilegeRoleOptions = [
        'ACCOUNT',
        'ACCOUNT HEAD',
        'ADMIN',
        'AGENT',
        'ALL USER',
        'ASSISTANT MANAGER',
        'BACK OFFICE',
        'BRANCH HEAD',
        'Broker partner',
        'BUSINESS HEAD',
        'Calling Employee',
        'CLAIM EXECUTIVE',
        'CLAIM HEAD',
        'COMPLIANCE OFFICER',
        'DISPATCH',
        'HR MANAGER',
        'IT SUPPORT',
        'LEGAL',
        'RENEWAL CALLER',
        'TELECALLER',
        'UNDERWRITER',
        'ZONAL HEAD',
    ];

    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedPrivilegeRole, setSelectedPrivilegeRole] = useState('');
    const [showPages, setShowPages] = useState(false);
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
    const locationHeadOptions = [
        'ABHISHEK VILAS GAIKWAD (LOCATION HEAD)',
        'DEVENDRA ANURATH WAGH',
        'NILESH MAHESH BORSE',
    ];
    const [selectedLocationHead, setSelectedLocationHead] = useState('');
    const [salesExSearch, setSalesExSearch] = useState('');
    const [salesExecutives, setSalesExecutives] = useState<SalesExecutiveItem[]>([
        { id: 1, name: 'ADITYA RAJENDRA SAPKAL', mobile: '9763998855' },
        { id: 2, name: 'DIRECT EXECUTIVE', mobile: '9623240873' },
        { id: 3, name: 'KIRAN PANDURANG MALI', mobile: '7721946111' },
        { id: 4, name: 'MANGESH RAVINDRA KAMBLE', mobile: '7498905614' },
        { id: 5, name: 'MAYURI RAJENDRA MULE', mobile: '0' },
        { id: 6, name: 'NILAKSHI NARENDRA KULKARNI', mobile: '0' },
        { id: 7, name: 'PRATIKSHA DATTATRAY GUJAR', mobile: '7796611972' },
        { id: 8, name: 'RAJ DATTATRAY SATBHAI', mobile: '8956529072' },
        { id: 9, name: 'RUSHIKESH UTTAM KADAM', mobile: '0' },
        { id: 10, name: 'RUTUJA NITIN MANE', mobile: '8956923197' },
        { id: 11, name: 'SANDIP BABAN SAWANT', mobile: '9822334455' },
        { id: 12, name: 'SHASHIKANT SURESH PAWAR', mobile: '9890112233' },
        { id: 13, name: 'SUHAS DILIP SHINDE', mobile: '9422001122' },
        { id: 14, name: 'VIKRAM ANANDRAO PATIL', mobile: '9850445566' },
        { id: 15, name: 'YOGESH DINKAR MORE', mobile: '9860778899' },
    ]);
    const [selectedSalesExIds, setSelectedSalesExIds] = useState<number[]>([]);

    // ==========================================
    // 6. TEMPORARY OPERATOR STATE
    // ==========================================
    const employeeList = [
        'ADITYA RAJENDRA SAPKAL',
        'ANJALI MAKANSINGH RAWAT',
        'HARSHADA ABASO PATIL',
        'KIRAN PANDURANG MALI',
        'MANGESH RAVINDRA KAMBLE',
        'MAYURI RAJENDRA MULE',
        'NILAKSHI NARENDRA KULKARNI',
        'NITA ROHIT HANDE',
        'PRACHI GANPAT MORE',
        'PRATIKSHA DATTATRAY GUJAR',
        'RAHUL SHIVAJI BHAILUME',
        'RAJ DATTATRAY SATBHAI',
        'ROHINI MANOHAR SORAT',
        'RUTUJA NITIN MANE',
        'SAKSHI SUNIL MANE',
    ];
    const [selectedOperator, setSelectedOperator] = useState('');
    const [selectedTempOperator, setSelectedTempOperator] = useState('');
    const [tempAssignments, setTempAssignments] = useState<TemporaryOperatorAssignment[]>([
        { id: 1, operator: 'ADITYA RAJENDRA SAPKAL', temporaryOperator: 'ADITYA RAJENDRA SAPKAL' },
    ]);

    // ==========================================
    // 7. LOGIN HISTORY STATE
    // ==========================================
    const loginRoleOptions = [
        '--ALL--',
        'ACCOUNT',
        'ACCOUNT HEAD',
        'ADMIN',
        'AGENT',
        'ALL USER',
        'ASSISTANT MANAGER',
        'BACK OFFICE',
        'BRANCH HEAD',
        'Broker partner',
        'BUSINESS HEAD',
        'Calling Employee',
        'Calling Indivisional',
        'CASHIER',
        'CLAIM',
        'CLUSTER HEAD',
        'EMI',
        'RELATIONSHIP MANAGER',
    ];
    const [loginFromDate, setLoginFromDate] = useState('08/10/2026');
    const [loginToDate, setLoginToDate] = useState('08/10/2026');
    const [loginSelectedRole, setLoginSelectedRole] = useState('--ALL--');
    const [loginUserSearch, setLoginUserSearch] = useState('');
    const [loginLogs, setLoginLogs] = useState<LoginLogItem[]>([
        { id: 1, loginDate: '08/10/2026', loginTime: '00:02:22', role: 'RELATIONSHIP MANAGER', userName: 'VAIBHAV.SONMALE', name: 'VAIBHAV RAMCHANDRA SONMALE', remark: 'NEW APP', ipAddress: '223.228.32.247' },
        { id: 2, loginDate: '08/10/2026', loginTime: '01:05:08', role: 'RELATIONSHIP MANAGER', userName: 'VAIBHAV.SONMALE', name: 'VAIBHAV RAMCHANDRA SONMALE', remark: 'NEW APP', ipAddress: '223.228.32.247' },
        { id: 3, loginDate: '08/10/2026', loginTime: '01:20:29', role: 'AGENT', userName: 'AAQEEB.SHAIKH', name: 'DHOBI AAQEEB SHAIKH ASLAM', remark: 'NEW APP', ipAddress: '49.15.230.9' },
        { id: 4, loginDate: '08/10/2026', loginTime: '06:50:33', role: 'AGENT', userName: 'POOJA.SABALE', name: 'POOJA BHIKAJI SABALE', remark: 'NEW APP', ipAddress: '152.58.7.185' },
        { id: 5, loginDate: '08/10/2026', loginTime: '07:34:31', role: 'AGENT', userName: 'SANDIP.SHETEWAD', name: 'SANDIP PARASRAM SHETEWAD', remark: 'NEW APP', ipAddress: '27.97.172.45' },
        { id: 6, loginDate: '08/10/2026', loginTime: '07:40:23', role: 'AGENT', userName: 'PANDURANG.JADHAV', name: 'PANDURANG JANARDHAN JADHAV', remark: 'NEW APP', ipAddress: '157.33.249.143' },
        { id: 7, loginDate: '08/10/2026', loginTime: '07:51:27', role: 'AGENT', userName: 'DHULAPPA.KHARAT', name: 'DHULAPPA HARI KHARAT', remark: 'NEW APP', ipAddress: '27.59.108.158' },
        { id: 8, loginDate: '08/10/2026', loginTime: '08:00:02', role: 'AGENT', userName: 'JITENDRA.PATIL', name: 'JITENDRA BAPURAO PATIL', remark: 'NEW APP', ipAddress: '152.59.57.90' },
        { id: 9, loginDate: '08/10/2026', loginTime: '08:57:40', role: 'AGENT', userName: 'RAJU.LADNIYA', name: 'RAJU SHRINIWAS LADNIYA', remark: 'NEW APP', ipAddress: '152.56.7.162' },
        { id: 10, loginDate: '08/10/2026', loginTime: '09:12:57', role: 'AGENT', userName: 'HUMERA.SHAIKH', name: 'HUMERA FAKRUDDIN SHAIKH', remark: 'NEW APP', ipAddress: '115.98.235.196' },
        { id: 11, loginDate: '08/10/2026', loginTime: '09:28:14', role: 'ACCOUNT', userName: 'AMOL.BHOSALE', name: 'AMOL MARUTI BHOSALE', remark: 'NEW APP', ipAddress: '117.204.88.5' },
        { id: 12, loginDate: '08/10/2026', loginTime: '09:45:00', role: 'BACK OFFICE', userName: 'PRIYANKA.WAGH', name: 'PRIYANKA SHARAD WAGH', remark: 'NEW APP', ipAddress: '49.36.128.91' },
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
        <div className="w-full flex flex-col space-y-5">
            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
                    <CheckCircle2 size={18} className="text-emerald-400" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Top Bar Header */}
            <PageHeader
                title={`User Master — ${getActiveTabTitle()}`}
                description={getActiveTabDesc()}
            />

            {/* Horizontal Tabs */}
            <UnderlineTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />

            {/* TAB CONTENT 1: USER ROLE MASTER */}
            {activeTab === 'role-master' && (
                <div key={activeTab} className="tab-transition-wrapper">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Toolbar */}
                        <div className="p-4 bg-white border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by user role..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setRolePage(1); }}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>

                            <button
                                onClick={() => { setEditingRoleId(null); setRoleForm({ code: '', name: '', department: 'Operations', description: '', status: 'ACTIVE' }); setModalType('ROLE'); }}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] font-semibold text-[14px] shadow-sm transition-all duration-200 cursor-pointer border-none"
                            >
                                <Plus size={16} />
                                <span>Add New Role</span>
                            </button>
                        </div>

                        {/* Full Width Table View matching 2nd attached photo */}
                        {(() => {
                            const filteredRoles = roles.filter(r => !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()));
                            const totalRolePages = Math.max(1, Math.ceil(filteredRoles.length / rolesPerPage));
                            const paginatedRoles = filteredRoles.slice((rolePage - 1) * rolesPerPage, rolePage * rolesPerPage);

                            return (
                                <>
                                    <div className="overflow-x-auto w-full custom-scrollbar">
                                        <table className="w-full text-left border-collapse table-fixed">
                                            <thead>
                                                <tr className="bg-brand-primary text-white text-[13px] font-bold uppercase tracking-wider">
                                                    <th className="py-3 px-4 border-r border-white/20">USER ROLE</th>
                                                    <th className="py-3 px-4 w-[60px] text-center"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200 text-[13px]">
                                                {paginatedRoles.map((r) => (
                                                    <tr key={r.id} className="hover:bg-slate-50/80 h-[48px] transition-colors bg-white">
                                                        <td className="py-2.5 px-4 font-normal text-slate-800 text-[13px] tracking-wide border-r border-slate-200/80">
                                                            {r.name}
                                                        </td>
                                                        <td className="py-2.5 px-4 text-center">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingRoleId(r.id);
                                                                    setRoleForm({ code: r.code, name: r.name, department: r.department, description: r.description, status: r.status });
                                                                    setModalType('ROLE');
                                                                }}
                                                                className="p-1.5 text-[#1E88E5] hover:text-[#0D47A1] hover:bg-blue-50 rounded transition-colors cursor-pointer border-none bg-transparent inline-flex items-center justify-center"
                                                                title="Edit Role"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {paginatedRoles.length === 0 && (
                                                    <tr>
                                                        <td colSpan={2} className="py-8 text-center text-brand-muted text-sm">
                                                            No user roles found matching "{searchQuery}"
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination matching Image 2: 1 2 3 4 5 ... LAST */}
                                    <div className="px-4 py-3 bg-[#F8FAFC] border-t border-slate-200 flex items-center gap-2 text-[13px]">
                                        {[1, 2, 3, 4, 5].map((pageNum) => (
                                            <button
                                                key={pageNum}
                                                onClick={() => setRolePage(pageNum)}
                                                className={`px-1.5 py-0.5 rounded cursor-pointer border-none bg-transparent font-medium ${
                                                    rolePage === pageNum
                                                        ? 'text-[#0052CC] font-bold underline'
                                                        : 'text-[#0052CC] hover:underline'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                        <span className="text-[#0052CC] px-0.5">...</span>
                                        <button
                                            onClick={() => setRolePage(totalRolePages)}
                                            className="px-1.5 py-0.5 text-[#0052CC] hover:underline cursor-pointer border-none bg-transparent font-medium"
                                        >
                                            LAST
                                        </button>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}            {/* TAB CONTENT 2: DESIGNATION MASTER */}
            {activeTab === 'designation-master' && (
                <div key={activeTab} className="tab-transition-wrapper">
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Toolbar */}
                        <div className="p-4 bg-white border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-80">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by designation type..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setDesgPage(1); }}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    setEditingDesgId(null);
                                    setDesgForm({ code: '', title: '', department: 'OPERATIONS', reportingTo: '', grade: 'L-1' });
                                    setModalType('DESG');
                                }}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] font-semibold text-[14px] shadow-sm transition-all duration-200 cursor-pointer border-none"
                            >
                                <Plus size={16} />
                                <span>Add Designation</span>
                            </button>
                        </div>

                        {/* Full Width Table View matching 2nd attached photo */}
                        {(() => {
                            const filteredDesgs = designations.filter(d => !searchQuery || d.title.toLowerCase().includes(searchQuery.toLowerCase()));
                            const totalDesgPages = Math.max(1, Math.ceil(filteredDesgs.length / desgsPerPage));
                            const paginatedDesgs = filteredDesgs.slice((desgPage - 1) * desgsPerPage, desgPage * desgsPerPage);

                            return (
                                <>
                                    <div className="overflow-x-auto w-full custom-scrollbar">
                                        <table className="w-full text-left border-collapse table-fixed">
                                            <thead>
                                                <tr className="bg-brand-primary text-white text-[13px] font-bold uppercase tracking-wider">
                                                    <th className="py-3 px-4 border-r border-white/20">DESIGNATION TYPE</th>
                                                    <th className="py-3 px-3 w-[55px] border-r border-white/20 text-center"></th>
                                                    <th className="py-3 px-3 w-[120px] text-center"></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200 text-[13px]">
                                                {paginatedDesgs.map((d) => (
                                                    <tr key={d.id} className="hover:bg-slate-50/80 h-[48px] transition-colors bg-white">
                                                        <td className="py-2.5 px-4 font-normal text-slate-800 text-[13px] tracking-wide border-r border-slate-200/80">
                                                            {d.title}
                                                        </td>
                                                        <td className="py-2.5 px-3 text-center border-r border-slate-200/80 w-[55px]">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingDesgId(d.id);
                                                                    setDesgForm({ ...desgForm, title: d.title });
                                                                    setModalType('DESG');
                                                                }}
                                                                className="p-1 text-[#1E88E5] hover:text-[#0D47A1] hover:bg-blue-50 rounded transition-colors cursor-pointer border-none bg-transparent inline-flex items-center justify-center"
                                                                title="Edit Designation"
                                                            >
                                                                <Edit2 size={16} />
                                                            </button>
                                                        </td>
                                                        <td className="py-2.5 px-3 text-center w-[120px]">
                                                            <button
                                                                onClick={() => {
                                                                    setDesignations(prev => prev.filter(x => x.id !== d.id));
                                                                    showToast(`Designation "${d.title}" deleted.`);
                                                                }}
                                                                className="inline-flex items-center gap-1.5 text-[#1E88E5] hover:text-[#0D47A1] hover:underline cursor-pointer border-none bg-transparent text-[13px] font-normal"
                                                                title="Delete Designation"
                                                            >
                                                                <Trash2 size={16} />
                                                                <span>DELETE</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {paginatedDesgs.length === 0 && (
                                                    <tr>
                                                        <td colSpan={3} className="py-8 text-center text-brand-muted text-sm">
                                                            No designations found matching "{searchQuery}"
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination matching Image 2: 1 2 */}
                                    <div className="px-4 py-3 bg-[#F8FAFC] border-t border-slate-200 flex items-center gap-2 text-[14px]">
                                        {Array.from({ length: totalDesgPages }, (_, i) => i + 1).map((pageNum) => (
                                            <button
                                                key={pageNum}
                                                onClick={() => setDesgPage(pageNum)}
                                                className={`px-1.5 py-0.5 rounded cursor-pointer border-none bg-transparent font-medium ${
                                                    desgPage === pageNum
                                                        ? 'text-[#0052CC] font-bold underline'
                                                        : 'text-[#0052CC] hover:underline'
                                                }`}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* TAB CONTENT 3: CLIENT APP USER */}
            {activeTab === 'client-app-user' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-6">
                    {/* Top Card: »APP Client User Form matching Photo 1 & 2 */}
                    <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                        {/* Blue Banner Header */}
                        <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                            <span className="mr-0.5 text-base font-serif">&raquo;</span>APP Client User
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!clientForm.companyName || !clientForm.userName.trim()) {
                                    showToast('Please select Company Name and enter User Name');
                                    return;
                                }
                                const userUpper = clientForm.userName.trim().toUpperCase();
                                if (editingClientId) {
                                    setClientUsers(prev => prev.map(c => c.id === editingClientId ? {
                                        ...c,
                                        companyName: clientForm.companyName,
                                        userName: userUpper,
                                        password: clientForm.password.trim() || c.password
                                    } : c));
                                    showToast(`Client user "${userUpper}" updated successfully!`);
                                    setEditingClientId(null);
                                } else {
                                    const newId = Date.now();
                                    setClientUsers(prev => [
                                        ...prev,
                                        {
                                            id: newId,
                                            companyName: clientForm.companyName,
                                            userName: userUpper,
                                            password: clientForm.password.trim() || `${userUpper}@123`
                                        }
                                    ]);
                                    showToast(`Client user "${userUpper}" saved successfully!`);
                                }
                                setClientForm({ companyName: '', userName: '', password: '' });
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                <div>
                                    <label className="block text-[14px] text-slate-700 font-normal mb-2">Company Name</label>
                                    <div className="relative">
                                        <select
                                            value={clientForm.companyName}
                                            onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                        >
                                            <option value="">--Select Company Name--</option>
                                            {clientCompanyOptions.map((opt) => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[14px] text-slate-700 font-normal mb-2">User</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={clientForm.userName}
                                        onChange={(e) => setClientForm({ ...clientForm, userName: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[14px] text-slate-700 font-normal mb-2">Password</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={clientForm.password}
                                        onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                >
                                    {editingClientId ? 'Update' : 'Save'}
                                </button>
                                {editingClientId && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingClientId(null);
                                            setClientForm({ companyName: '', userName: '', password: '' });
                                        }}
                                        className="px-6 py-2.5 bg-[#D9534F] hover:bg-[#C9302C] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Bottom Table: matching Photo 1 & 2 */}
                    <div className="bg-white rounded-[10px] shadow-sm border border-slate-200/80 overflow-hidden">
                        <div className="overflow-x-auto w-full custom-scrollbar">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-primary text-white text-[13px] font-bold uppercase tracking-wider">
                                        <th className="py-3 px-4 w-[28%] border-r border-white/20">COMPANY NAME</th>
                                        <th className="py-3 px-4 w-[36%] border-r border-white/20">USER NAME</th>
                                        <th className="py-3 px-4 w-[31%] border-r border-white/20">PASSWORD</th>
                                        <th className="py-3 px-3 w-[5%] text-center"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-[13px]">
                                    {clientUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-50/80 h-[48px] transition-colors bg-white">
                                            <td className="py-2.5 px-4 font-normal text-slate-800 text-[13px] tracking-wide border-r border-slate-200/80">
                                                {user.companyName}
                                            </td>
                                            <td className="py-2.5 px-4 font-normal text-slate-800 text-[13px] tracking-wide border-r border-slate-200/80">
                                                {user.userName}
                                            </td>
                                            <td className="py-2.5 px-4 font-normal text-slate-800 text-[13px] tracking-wide border-r border-slate-200/80">
                                                {user.password}
                                            </td>
                                            <td className="py-2.5 px-3 text-center">
                                                <button
                                                    onClick={() => {
                                                        setEditingClientId(user.id);
                                                        setClientForm({
                                                            companyName: user.companyName,
                                                            userName: user.userName,
                                                            password: user.password
                                                        });
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className="p-1 text-[#1E88E5] hover:text-[#0D47A1] hover:bg-blue-50 rounded transition-colors cursor-pointer border-none bg-transparent inline-flex items-center justify-center"
                                                    title="Edit User"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {clientUsers.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-slate-400 text-sm">
                                                No client app users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 4: ASSIGN PRIVILEGES */}
            {activeTab === 'assign-privileges' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-6">
                    {/* Top Card: Menus matching Image 1 & 2 */}
                    <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                        {/* Blue Banner Header */}
                        <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                            Menus
                        </div>

                        {/* Form Controls Row matching Image 1 & 2 */}
                        <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                            {/* Branch Field */}
                            <div className="w-full sm:w-[220px]">
                                <label className="block text-[14px] text-slate-700 font-normal mb-2">Branch</label>
                                <div className="relative">
                                    <select
                                        value={selectedBranch}
                                        onChange={(e) => setSelectedBranch(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="">--Select Branch Name--</option>
                                        {branchOptions.map((branch) => (
                                            <option key={branch} value={branch}>{branch}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Role Field */}
                            <div className="w-full sm:w-[220px]">
                                <label className="block text-[14px] text-slate-700 font-normal mb-2">Role</label>
                                <div className="relative">
                                    <select
                                        value={selectedPrivilegeRole}
                                        onChange={(e) => setSelectedPrivilegeRole(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="">--Select Role Name--</option>
                                        {privilegeRoleOptions.map((role) => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Show Pages Button */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPages(true);
                                        showToast(`Loaded pages for ${selectedPrivilegeRole || 'all roles'} at ${selectedBranch || 'all branches'}`);
                                    }}
                                    className="px-5 py-2.5 bg-[#EAA144] hover:bg-[#d89133] text-white font-medium text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                >
                                    Show Pages
                                </button>
                            </div>

                            {/* Reset Button */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedBranch('');
                                        setSelectedPrivilegeRole('');
                                        setShowPages(false);
                                        showToast('Selections reset');
                                    }}
                                    className="px-5 py-2.5 bg-[#D9534F] hover:bg-[#c9302c] text-white font-medium text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                >
                                    Reset
                                </button>
                            </div>

                            {/* Go To Home Link */}
                            <div className="pb-2.5">
                                <button
                                    type="button"
                                    onClick={() => navigate('/dashboard')}
                                    className="text-slate-700 hover:text-brand-primary text-[14px] font-normal cursor-pointer bg-transparent border-none transition-colors"
                                >
                                    Go To Home
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pages Table displayed after clicking Show Pages */}
                    {showPages && (
                        <div className="bg-white rounded-[10px] shadow-sm border border-slate-200/80 overflow-hidden animate-in fade-in duration-200">
                            {/* Toolbar */}
                            <div className="p-4 bg-white border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-[14px] font-semibold text-slate-800">
                                    Privileges Matrix for <span className="text-brand-primary">{selectedPrivilegeRole || 'Default Role'}</span> ({selectedBranch || 'All Branches'})
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectAllPrivileges(true)}
                                        className="px-3.5 py-1.5 text-xs font-semibold text-brand-primary bg-blue-50 hover:bg-blue-100 rounded-[6px] transition-colors cursor-pointer border-none"
                                    >
                                        Grant All
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectAllPrivileges(false)}
                                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-[6px] transition-colors cursor-pointer border-none"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            {/* Full Width Table View */}
                            <div className="overflow-x-auto w-full custom-scrollbar">
                                <table className="w-full text-left border-collapse table-fixed">
                                    <thead>
                                        <tr className="bg-brand-primary text-white text-[13px] font-bold uppercase tracking-wider">
                                            <th className="py-3 px-4 w-[25%] border-r border-white/20">MODULE / PAGE NAME</th>
                                            <th className="py-3 px-4 w-[17%] border-r border-white/20">CATEGORY</th>
                                            <th className="py-3 px-2 text-center w-[9%] border-r border-white/20">VIEW</th>
                                            <th className="py-3 px-2 text-center w-[9%] border-r border-white/20">CREATE</th>
                                            <th className="py-3 px-2 text-center w-[9%] border-r border-white/20">EDIT</th>
                                            <th className="py-3 px-2 text-center w-[9%] border-r border-white/20">DELETE</th>
                                            <th className="py-3 px-2 text-center w-[9%] border-r border-white/20">EXPORT</th>
                                            <th className="py-3 px-2 text-center w-[13%]">APPROVE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 text-[13px]">
                                        {privileges.map((p) => (
                                            <tr key={p.id} className="hover:bg-slate-50/80 h-[48px] transition-colors bg-white">
                                                <td className="py-2.5 px-4 font-normal text-slate-800 text-[13px] tracking-wide border-r border-slate-200/80 truncate" title={p.moduleName}>
                                                    {p.moduleName}
                                                </td>
                                                <td className="py-2.5 px-4 text-xs text-slate-500 font-normal border-r border-slate-200/80 truncate" title={p.category}>
                                                    {p.category}
                                                </td>
                                                {(['view', 'create', 'edit', 'delete', 'exportData', 'approve'] as const).map(col => (
                                                    <td key={col} className="py-2.5 px-2 text-center border-r border-slate-200/80 last:border-r-0">
                                                        <input
                                                            type="checkbox"
                                                            checked={p[col]}
                                                            onChange={() => handleTogglePrivilege(p.id, col)}
                                                            className="w-4 h-4 rounded text-brand-primary focus:ring-brand-primary border-slate-300 cursor-pointer align-middle accent-brand-primary"
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 bg-white border-t border-slate-200 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => showToast(`Privileges updated successfully for ${selectedPrivilegeRole || 'selected role'} at ${selectedBranch || 'selected branch'}!`)}
                                    className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white text-[14px] font-semibold rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                >
                                    Save Privileges
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB CONTENT 5: ASSIGN LOCATION HEAD */}
            {activeTab === 'assign-location-head' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    {/* Top Card matching Photo 1 */}
                    <div className="bg-white rounded-[10px] shadow-sm border border-slate-200/80 p-6">
                        <label className="block text-[14px] text-slate-700 font-semibold mb-2">Location Head</label>
                        <div className="relative w-full sm:w-80">
                            <select
                                value={selectedLocationHead}
                                onChange={(e) => setSelectedLocationHead(e.target.value)}
                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                            >
                                <option value="">--Select Location Head--</option>
                                {locationHeadOptions.map((head) => (
                                    <option key={head} value={head}>{head}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Search Field matching Photo 2 */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Search SalesEx Name Here"
                                value={salesExSearch}
                                onChange={(e) => setSalesExSearch(e.target.value)}
                                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Table matching Photo 1 & 2 */}
                    {(() => {
                        const filteredExecutives = salesExecutives.filter(e =>
                            !salesExSearch ||
                            e.name.toLowerCase().includes(salesExSearch.toLowerCase()) ||
                            e.mobile.includes(salesExSearch)
                        );
                        const isAllSelected = filteredExecutives.length > 0 && filteredExecutives.every(e => selectedSalesExIds.includes(e.id));

                        const toggleSelectAll = () => {
                            if (isAllSelected) {
                                const filteredIds = new Set(filteredExecutives.map(e => e.id));
                                setSelectedSalesExIds(prev => prev.filter(id => !filteredIds.has(id)));
                            } else {
                                const filteredIds = filteredExecutives.map(e => e.id);
                                setSelectedSalesExIds(prev => Array.from(new Set([...prev, ...filteredIds])));
                            }
                        };

                        const toggleSelectRow = (id: number) => {
                            setSelectedSalesExIds(prev =>
                                prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                            );
                        };

                        const handleAssign = () => {
                            if (!selectedLocationHead) {
                                showToast('Please select a Location Head from the dropdown first');
                                return;
                            }
                            if (selectedSalesExIds.length === 0) {
                                showToast('Please select at least one Sales Executive to assign');
                                return;
                            }
                            showToast(`Assigned ${selectedSalesExIds.length} sales executive(s) to ${selectedLocationHead} successfully!`);
                            setSelectedSalesExIds([]);
                        };

                        return (
                            <>
                                <div className="bg-white rounded-[10px] shadow-sm border border-slate-200/80 overflow-hidden">
                                    <div className="overflow-x-auto w-full custom-scrollbar max-h-[540px] overflow-y-auto">
                                        <table className="w-full text-left border-collapse table-fixed">
                                            <thead className="sticky top-0 z-10 shadow-sm">
                                                <tr className="bg-brand-primary text-white text-[13px] font-bold uppercase tracking-wider">
                                                    <th className="py-2.5 px-4 w-[90px] border-r border-white/20">SR.NO.</th>
                                                    <th className="py-2.5 px-4 w-[55%] border-r border-white/20">SALES EXECUTIVE NAME</th>
                                                    <th className="py-2.5 px-4 w-[35%] border-r border-white/20">MOBILENO</th>
                                                    <th className="py-2.5 px-3 w-[60px] text-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isAllSelected}
                                                            onChange={toggleSelectAll}
                                                            className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                                            title="Select All"
                                                        />
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200 text-[13px]">
                                                {filteredExecutives.map((exec, idx) => {
                                                    const isChecked = selectedSalesExIds.includes(exec.id);
                                                    return (
                                                        <tr
                                                            key={exec.id}
                                                            className={`h-[42px] transition-colors ${isChecked ? 'bg-blue-50/60 hover:bg-blue-50/90' : 'bg-white hover:bg-slate-50/80'}`}
                                                        >
                                                            <td className="py-2 px-4 font-normal text-slate-800 text-[13px] border-r border-slate-200/80">
                                                                {idx + 1}
                                                            </td>
                                                            <td className="py-2 px-4 font-normal text-slate-800 text-[13px] tracking-wide border-r border-slate-200/80 uppercase">
                                                                {exec.name}
                                                            </td>
                                                            <td className="py-2 px-4 font-normal text-slate-800 text-[13px] border-r border-slate-200/80">
                                                                {exec.mobile}
                                                            </td>
                                                            <td className="py-2 px-3 text-center">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={isChecked}
                                                                    onChange={() => toggleSelectRow(exec.id)}
                                                                    className="w-4 h-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary cursor-pointer accent-brand-primary"
                                                                />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                                {filteredExecutives.length === 0 && (
                                                    <tr>
                                                        <td colSpan={4} className="py-8 text-center text-slate-500 text-[14px]">
                                                            No sales executives found matching "{salesExSearch}"
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Bottom Action Bar */}
                                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-[8px] border border-slate-200/80 shadow-sm">
                                    <div className="text-[13px] text-slate-600 font-medium">
                                        {selectedSalesExIds.length > 0 ? (
                                            <span>
                                                <span className="font-bold text-brand-primary">{selectedSalesExIds.length}</span> executive{selectedSalesExIds.length > 1 ? 's' : ''} selected
                                                {selectedLocationHead ? (
                                                    <> to assign to <span className="font-bold text-slate-800">{selectedLocationHead}</span></>
                                                ) : (
                                                    <span className="text-amber-600"> (Please select a Location Head above)</span>
                                                )}
                                            </span>
                                        ) : (
                                            <span>Select executives using the checkboxes to assign to a Location Head.</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={handleAssign}
                                            className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                        >
                                            Assign
                                        </button>
                                        {selectedSalesExIds.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => setSelectedSalesExIds([])}
                                                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-[14px] rounded-[6px] transition-colors cursor-pointer border border-slate-300"
                                            >
                                                Clear Selection
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>
            )}

            {/* TAB CONTENT 6: TEMPORARY OPERATOR */}
            {activeTab === 'temporary-operator' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-5">
                    {/* Top Card: Assign Temporary Operator matching Photos */}
                    <div className="bg-white rounded-[10px] p-6 shadow-sm border border-slate-200/80">
                        <h2 className="text-[16px] font-semibold text-slate-800 mb-5">Assign Temporary Operator</h2>

                        <div className="flex flex-wrap items-end gap-5">
                            {/* Operator Field */}
                            <div className="w-full sm:w-[260px]">
                                <label className="block text-[13px] text-slate-700 font-normal mb-2">Operator</label>
                                <div className="relative">
                                    <select
                                        value={selectedOperator}
                                        onChange={(e) => setSelectedOperator(e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="">--Select Emp Name--</option>
                                        {employeeList.map((emp) => (
                                            <option key={emp} value={emp}>{emp}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Temporary Operator Field */}
                            <div className="w-full sm:w-[260px]">
                                <label className="block text-[13px] text-slate-700 font-normal mb-2">Temporary Operator</label>
                                <div className="relative">
                                    <select
                                        value={selectedTempOperator}
                                        onChange={(e) => setSelectedTempOperator(e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                    >
                                        <option value="">--Select Emp Name--</option>
                                        {employeeList.map((emp) => (
                                            <option key={emp} value={emp}>{emp}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Transfer Button */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!selectedOperator) {
                                            showToast('Please select Operator');
                                            return;
                                        }
                                        if (!selectedTempOperator) {
                                            showToast('Please select Temporary Operator');
                                            return;
                                        }
                                        setTempAssignments(prev => [
                                            ...prev,
                                            {
                                                id: Date.now(),
                                                operator: selectedOperator,
                                                temporaryOperator: selectedTempOperator,
                                            }
                                        ]);
                                        showToast(`Transferred temporary rights from ${selectedOperator} to ${selectedTempOperator} successfully!`);
                                        setSelectedOperator('');
                                        setSelectedTempOperator('');
                                    }}
                                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none h-[38px] flex items-center justify-center"
                                >
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Table matching Photo 1, 2, and 3 */}
                    <div className="bg-white rounded-[10px] shadow-sm border border-slate-200/80 overflow-hidden">
                        <div className="overflow-x-auto w-full custom-scrollbar">
                            <table className="w-full text-left border-collapse table-fixed">
                                <thead>
                                    <tr className="bg-brand-primary text-white text-[13px] font-bold uppercase tracking-wider">
                                        <th className="py-2.5 px-4 w-[45%] border-r border-white/20">OPERATOR</th>
                                        <th className="py-2.5 px-4 w-[45%] border-r border-white/20">TEMPORARY OPERATOR</th>
                                        <th className="py-2.5 px-4 w-[10%] text-right pr-6"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200 text-[13px]">
                                    {tempAssignments.map((item) => (
                                        <tr key={item.id} className="h-[44px] hover:bg-slate-50/80 transition-colors bg-white">
                                            <td className="py-2 px-4 font-normal text-slate-800 text-[13px] uppercase border-r border-slate-200/80">
                                                {item.operator}
                                            </td>
                                            <td className="py-2 px-4 font-normal text-slate-800 text-[13px] uppercase border-r border-slate-200/80">
                                                {item.temporaryOperator}
                                            </td>
                                            <td className="py-2 px-4 text-right pr-6">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setTempAssignments(prev => prev.filter(a => a.id !== item.id));
                                                        showToast(`Deleted temporary operator assignment for ${item.operator}`);
                                                    }}
                                                    className="text-brand-primary hover:text-rose-600 transition-colors cursor-pointer inline-flex items-center gap-1 font-semibold text-[12px] tracking-wide border-none bg-transparent"
                                                    title="Delete Temporary Operator Assignment"
                                                >
                                                    <Trash2 size={13} className="inline stroke-[2.2]" />
                                                    <span>DELETE</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {tempAssignments.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="py-8 text-center text-slate-400 text-[14px]">
                                                No temporary operator assignments found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB CONTENT 7: LOGIN HISTORY */}
            {activeTab === 'login-history' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-4">
                    {/* Top Card: Filter Form matching Photo 1, 2, 3 */}
                    <div className="bg-white rounded-[10px] p-6 shadow-sm border border-slate-200/80">
                        <div className="flex flex-wrap items-center gap-5 sm:gap-6">
                            {/* From Date */}
                            <div className="w-full sm:w-[170px]">
                                <label className="block text-[13px] text-slate-700 font-normal mb-2">From Date</label>
                                <input
                                    type="text"
                                    value={loginFromDate}
                                    onChange={(e) => setLoginFromDate(e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 text-center focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* To Date */}
                            <div className="w-full sm:w-[170px]">
                                <label className="block text-[13px] text-slate-700 font-normal mb-2">To Date</label>
                                <input
                                    type="text"
                                    value={loginToDate}
                                    onChange={(e) => setLoginToDate(e.target.value)}
                                    className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 text-center focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                />
                            </div>

                            {/* Role */}
                            <div className="w-full sm:w-[200px]">
                                <label className="block text-[13px] text-slate-700 font-normal mb-2">Role</label>
                                <div className="relative">
                                    <select
                                        value={loginSelectedRole}
                                        onChange={(e) => setLoginSelectedRole(e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-8"
                                    >
                                        {loginRoleOptions.map((r) => (
                                            <option key={r} value={r}>{r}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Buttons stacked in column matching Photo 1, 2, 3 */}
                            <div className="flex flex-col gap-2 pt-5">
                                <button
                                    type="button"
                                    onClick={() => showToast('Login history records updated')}
                                    className="px-6 py-1.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-medium text-[13px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none min-w-[90px] h-[34px] flex items-center justify-center"
                                >
                                    Show
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const headers = ['SR.NO.', 'LOGIN DATE', 'LOGIN TIME', 'USER ROLE', 'USER NAME', 'NAME', 'REMARK', 'IP ADDRESS'];
                                        const filtered = loginLogs.filter(l =>
                                            (loginSelectedRole === '--ALL--' || l.role === loginSelectedRole) &&
                                            (!loginUserSearch || l.userName.toLowerCase().includes(loginUserSearch.toLowerCase()) || l.name.toLowerCase().includes(loginUserSearch.toLowerCase()))
                                        );
                                        const csvRows = [
                                            headers.join(','),
                                            ...filtered.map((item, idx) => [
                                                idx + 1,
                                                `"${item.loginDate}"`,
                                                `"${item.loginTime}"`,
                                                `"${item.role}"`,
                                                `"${item.userName}"`,
                                                `"${item.name}"`,
                                                `"${item.remark}"`,
                                                `"${item.ipAddress}"`
                                            ].join(','))
                                        ];
                                        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
                                        const url = URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.setAttribute('download', `Login_History_${loginFromDate.replace(/\//g, '-')}_to_${loginToDate.replace(/\//g, '-')}.csv`);
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                        showToast('Login history exported to CSV successfully!');
                                    }}
                                    className="px-6 py-1.5 bg-[#EAA144] hover:bg-[#D99B35] text-white font-medium text-[13px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none min-w-[90px] h-[34px] flex items-center justify-center"
                                >
                                    Export
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Search Field matching Photo 1, 2 */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Search User Name Here"
                                value={loginUserSearch}
                                onChange={(e) => setLoginUserSearch(e.target.value)}
                                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-[4px] text-[13px] text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Table matching Photo 1, 2 */}
                    {(() => {
                        const filtered = loginLogs.filter(l =>
                            (loginSelectedRole === '--ALL--' || l.role === loginSelectedRole) &&
                            (!loginUserSearch || l.userName.toLowerCase().includes(loginUserSearch.toLowerCase()) || l.name.toLowerCase().includes(loginUserSearch.toLowerCase()))
                        );

                        return (
                            <div className="bg-white rounded-[10px] shadow-sm border border-slate-200/80 overflow-hidden">
                                <div className="overflow-x-auto w-full custom-scrollbar max-h-[560px] overflow-y-auto">
                                    <table className="w-full text-left border-collapse table-fixed">
                                        <thead className="sticky top-0 z-10 shadow-sm">
                                            <tr className="bg-brand-primary text-white text-[13px] font-bold uppercase tracking-wider">
                                                <th className="py-2.5 px-4 w-[80px] border-r border-white/20">SR.NO.</th>
                                                <th className="py-2.5 px-4 w-[140px] border-r border-white/20">LOGIN DATE</th>
                                                <th className="py-2.5 px-4 w-[220px] border-r border-white/20">USER ROLE</th>
                                                <th className="py-2.5 px-4 w-[180px] border-r border-white/20">USER NAME</th>
                                                <th className="py-2.5 px-4 w-[280px] border-r border-white/20">NAME</th>
                                                <th className="py-2.5 px-4 w-[120px] border-r border-white/20">REMARK</th>
                                                <th className="py-2.5 px-4 w-[160px]">IP ADDRESS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 text-[13px]">
                                            {filtered.map((item, idx) => (
                                                <tr key={item.id} className="h-[46px] hover:bg-slate-50/80 transition-colors bg-white">
                                                    <td className="py-2 px-4 font-normal text-slate-800 text-[13px] border-r border-slate-200/80">
                                                        {idx + 1}
                                                    </td>
                                                    <td className="py-2 px-4 font-normal text-slate-800 text-[13px] border-r border-slate-200/80">
                                                        <div className="leading-snug">
                                                            <div>{item.loginDate}</div>
                                                            <div className="text-[12px] text-slate-600 font-mono">{item.loginTime}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4 font-normal text-slate-800 text-[13px] uppercase border-r border-slate-200/80">
                                                        {item.role}
                                                    </td>
                                                    <td className="py-2 px-4 font-normal text-slate-800 text-[13px] uppercase border-r border-slate-200/80">
                                                        {item.userName}
                                                    </td>
                                                    <td className="py-2 px-4 font-normal text-slate-800 text-[13px] uppercase border-r border-slate-200/80">
                                                        {item.name}
                                                    </td>
                                                    <td className="py-2 px-4 font-normal text-slate-800 text-[13px] uppercase border-r border-slate-200/80">
                                                        {item.remark}
                                                    </td>
                                                    <td className="py-2 px-4 font-normal text-slate-800 text-[13px] font-mono">
                                                        {item.ipAddress}
                                                    </td>
                                                </tr>
                                            ))}
                                            {filtered.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="py-8 text-center text-slate-400 text-[14px]">
                                                        No login history records found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* MODALS RENDERED IN PORTAL TO COVER FULL VIEWPORT */}
            {modalType && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-150"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) setModalType(null);
                    }}
                >
                    {/* Modal: Add/Edit Role - Matching 1st attached photo »User Role Form */}
                    {modalType === 'ROLE' && (
                        <div
                            className="bg-[#D3E7F8] p-5 sm:p-7 rounded-[16px] shadow-2xl relative max-w-[440px] w-full animate-in fade-in zoom-in-95 duration-150 my-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close icon button */}
                            <button
                                onClick={() => setModalType(null)}
                                className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 p-1 rounded-full cursor-pointer border-none bg-transparent transition-colors"
                                title="Close"
                            >
                                <X size={18} />
                            </button>

                            {/* Inner White Card matching Image 1 */}
                            <div className="bg-white p-6 sm:p-7 rounded-[12px] shadow-sm space-y-6">
                                {/* Blue Banner Header */}
                                <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs">
                                    <span className="mr-1 text-base">&raquo;</span>User Role Form
                                </div>

                                {/* Form */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!roleForm.name.trim()) return;
                                        const roleNameUpper = roleForm.name.trim().toUpperCase();
                                        if (editingRoleId) {
                                            setRoles(prev => prev.map(r => r.id === editingRoleId ? { ...r, name: roleNameUpper } : r));
                                            showToast(`User Role "${roleNameUpper}" updated successfully!`);
                                        } else {
                                            const newId = Date.now();
                                            const newCode = `ROLE_${roleNameUpper.replace(/\s+/g, '_')}`;
                                            setRoles(prev => [
                                                {
                                                    id: newId,
                                                    code: newCode,
                                                    name: roleNameUpper,
                                                    description: `${roleNameUpper} system access role`,
                                                    department: 'Operations',
                                                    userCount: 0,
                                                    permissionsCount: 10,
                                                    status: 'ACTIVE'
                                                },
                                                ...prev
                                            ]);
                                            showToast(`User Role "${roleNameUpper}" added successfully!`);
                                        }
                                        setModalType(null);
                                    }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-[14px] text-slate-700 font-normal mb-2">User Role</label>
                                        <input
                                            type="text"
                                            required
                                            autoFocus
                                            placeholder=""
                                            value={roleForm.name}
                                            onChange={(e) => setRoleForm({ ...roleForm, name: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div className="pt-1">
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                        >
                                            {editingRoleId ? 'Update' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* Modal: Add/Edit Designation - Matching 1st attached photo (Add) & 3rd attached photo (Edit) */}
                    {modalType === 'DESG' && (
                        <div
                            className="bg-[#D3E7F8] p-5 sm:p-7 rounded-[16px] shadow-2xl relative max-w-[440px] w-full animate-in fade-in zoom-in-95 duration-150 my-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close icon button */}
                            <button
                                onClick={() => setModalType(null)}
                                className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 p-1 rounded-full cursor-pointer border-none bg-transparent transition-colors"
                                title="Close"
                            >
                                <X size={18} />
                            </button>

                            {/* Inner White Card matching Image 1 & 3 */}
                            <div className="bg-white p-6 sm:p-7 rounded-[12px] shadow-sm space-y-6">
                                {/* Blue Banner Header */}
                                <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs">
                                    <span className="mr-0.5 text-base font-serif">&raquo;</span>Designation Form
                                </div>

                                {/* Form */}
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (!desgForm.title.trim()) return;
                                        const titleUpper = desgForm.title.trim().toUpperCase();
                                        if (editingDesgId) {
                                            setDesignations(prev => prev.map(d => d.id === editingDesgId ? { ...d, title: titleUpper } : d));
                                            showToast(`Designation "${titleUpper}" updated successfully!`);
                                        } else {
                                            const newId = Date.now();
                                            const newCode = `DESG_${titleUpper.replace(/\s+/g, '_')}`;
                                            setDesignations(prev => [
                                                {
                                                    id: newId,
                                                    code: newCode,
                                                    title: titleUpper,
                                                    department: 'OPERATIONS',
                                                    reportingTo: 'BRANCH MANAGER',
                                                    grade: 'L-1',
                                                    status: 'ACTIVE'
                                                },
                                                ...prev
                                            ]);
                                            showToast(`Designation "${titleUpper}" saved successfully!`);
                                        }
                                        setModalType(null);
                                    }}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-[14px] text-slate-700 font-normal mb-2">Designation Type</label>
                                        <input
                                            type="text"
                                            required
                                            autoFocus
                                            placeholder=""
                                            value={desgForm.title}
                                            onChange={(e) => setDesgForm({ ...desgForm, title: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-[22px] text-[14px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    {editingDesgId ? (
                                        /* Image 3: Update + Cancel buttons */
                                        <div className="flex items-center gap-3 pt-1">
                                            <button
                                                type="submit"
                                                className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                            >
                                                Update
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setModalType(null)}
                                                className="px-6 py-2.5 bg-[#D9534F] hover:bg-[#C9302C] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        /* Image 1: Save button only */
                                        <div className="pt-1">
                                            <button
                                                type="submit"
                                                className="px-6 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    )}




                </div>,
                document.body
            )}
        </div>
    );
};

export default UserMaster;
