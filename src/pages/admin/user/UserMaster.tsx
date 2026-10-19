import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import {
    Search, Plus, Edit2, Trash2, X, Shield, Check, CheckCircle2,
    AlertCircle, Key, Smartphone, MapPin, Clock, UserCheck, UserX,
    Calendar, Download, RefreshCw, Lock, Unlock, Eye, Filter, ArrowUpDown, ChevronDown
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
    const [rolesPerPage, setRolesPerPage] = useState<number>(10);

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
    const [desgsPerPage, setDesgsPerPage] = useState<number>(10);

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
        { id: 6, companyName: 'ANAND PRAKASHRAO KHANDAGALE', userName: 'ANAND.KHANDAGALE', password: 'ANAND@123' },
        { id: 7, companyName: 'ANIL SHANKAR DOIPHODE', userName: 'ANIL.DOIPHODE', password: 'ANIL@123' },
        { id: 8, companyName: 'ANIL SHIVAJIRAO DESHMUKH', userName: 'ANIL.DESHMUKH', password: 'ANIL@2024' },
        { id: 9, companyName: 'ANJU BHAGWANDASS SINGHAL', userName: 'ANJU.SINGHAL', password: 'ANJU@567' },
        { id: 10, companyName: 'ARVIND JAGANNATH BHOSALE', userName: 'ARVIND.BHOSALE', password: 'ARVIND@999' },
        { id: 11, companyName: 'AVINASH ARJUN SAWANT', userName: 'AVINASH.SAWANT', password: 'AVINASH@123' },
        { id: 12, companyName: 'BALKRISHNA HANUMANT JADHAV', userName: 'BALKRISHNA.JADHAV', password: 'BALKRISHNA@123' },
        { id: 13, companyName: 'CHETAN CHANDRAKANT JAGTAP', userName: 'CHETAN.JAGTAP', password: 'CHETAN@2024' },
        { id: 14, companyName: 'GAJANAN PRAKASHRAO THAKARE', userName: 'GAJANAN.THAKARE', password: 'GAJANAN@567' },
        { id: 15, companyName: 'HANUMANT TUKARAM GAVKARE', userName: 'HANUMANT.GAVKARE', password: 'HANUMANT@999' },
    ]);
    const [clientForm, setClientForm] = useState({ companyName: '', userName: '', password: '' });
    const [editingClientId, setEditingClientId] = useState<number | null>(null);
    const [clientPage, setClientPage] = useState<number>(1);
    const [clientsPerPage, setClientsPerPage] = useState<number>(10);

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
    const [salesExPage, setSalesExPage] = useState<number>(1);
    const [salesExPerPage, setSalesExPerPage] = useState<number>(10);

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
    const [loginPage, setLoginPage] = useState<number>(1);
    const [loginsPerPage, setLoginsPerPage] = useState<number>(10);
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
        <div className="w-full flex flex-col space-y-3">
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
                        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-[400px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by user role..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setRolePage(1); }}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                                />
                            </div>

                            <button
                                onClick={() => { setEditingRoleId(null); setRoleForm({ code: '', name: '', department: 'Operations', description: '', status: 'ACTIVE' }); setModalType('ROLE'); }}
                                className="w-full sm:w-auto px-5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg font-semibold text-sm shadow-xs transition-all duration-200 cursor-pointer border-none h-[40px] flex items-center justify-center gap-2 shrink-0"
                            >
                                <Plus size={16} />
                                <span>Add New Role</span>
                            </button>
                        </div>

                        {/* Full Width Table View matching BranchMaster */}
                        {(() => {
                            const filteredRoles = roles.filter(r => !searchQuery || r.name.toLowerCase().includes(searchQuery.toLowerCase()));
                            const totalRolePages = Math.max(1, Math.ceil(filteredRoles.length / rolesPerPage));
                            const paginatedRoles = filteredRoles.slice((rolePage - 1) * rolesPerPage, rolePage * rolesPerPage);

                            return (
                                <>
                                    <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                                        <table className="w-full text-left border-collapse min-w-[1000px]">
                                            <thead>
                                                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                                    <th className="py-3 px-4">USER ROLE</th>
                                                    <th className="py-3 px-4 text-center w-[120px]">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-brand-border text-[13px]">
                                                {paginatedRoles.map((r) => (
                                                    <tr key={r.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                                        <td className="py-2 px-4 font-semibold text-[#12284A]">
                                                            {r.name}
                                                        </td>
                                                        <td className="py-2 px-4 text-center">
                                                            <button
                                                                onClick={() => {
                                                                    setEditingRoleId(r.id);
                                                                    setRoleForm({ code: r.code, name: r.name, department: r.department, description: r.description, status: r.status });
                                                                    setModalType('ROLE');
                                                                }}
                                                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                                                title="Edit Role"
                                                            >
                                                                <Edit2 size={16} strokeWidth={1.5} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {paginatedRoles.length === 0 && (
                                                    <tr>
                                                        <td colSpan={2} className="py-12 text-center text-slate-500">
                                                            No user roles found matching "{searchQuery}"
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination matching BranchMaster */}
                                    <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                                            <span>Records per page:</span>
                                            <select
                                                value={rolesPerPage}
                                                onChange={(e) => {
                                                    setRolesPerPage(Number(e.target.value));
                                                    setRolePage(1);
                                                }}
                                                className="px-2 py-1 bg-white border border-brand-border rounded-md text-sm font-semibold text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                                            >
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>
                                        </div>

                                        <span className="text-sm text-brand-muted font-medium">
                                            Showing {filteredRoles.length === 0 ? 0 : (rolePage - 1) * rolesPerPage + 1} - {Math.min(rolePage * rolesPerPage, filteredRoles.length)} of {filteredRoles.length} records
                                        </span>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setRolePage(prev => Math.max(prev - 1, 1))}
                                                disabled={rolePage === 1}
                                                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                &lt;
                                            </button>
                                            {Array.from({ length: totalRolePages || 1 }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setRolePage(page)}
                                                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${rolePage === page
                                                        ? 'bg-brand-primary text-white shadow-sm'
                                                        : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setRolePage(prev => Math.min(prev + 1, totalRolePages))}
                                                disabled={rolePage === totalRolePages || totalRolePages === 0}
                                                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                &gt;
                                            </button>
                                        </div>
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
                        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-[400px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by designation type..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setDesgPage(1); }}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                                />
                            </div>

                            <button
                                onClick={() => {
                                    setEditingDesgId(null);
                                    setDesgForm({ code: '', title: '', department: 'OPERATIONS', reportingTo: '', grade: 'L-1' });
                                    setModalType('DESG');
                                }}
                                className="w-full sm:w-auto px-5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg font-semibold text-sm shadow-xs transition-all duration-200 cursor-pointer border-none h-[40px] flex items-center justify-center gap-2 shrink-0"
                            >
                                <Plus size={16} />
                                <span>Add Designation</span>
                            </button>
                        </div>

                        {/* Full Width Table View matching BranchMaster */}
                        {(() => {
                            const filteredDesgs = designations.filter(d => !searchQuery || d.title.toLowerCase().includes(searchQuery.toLowerCase()));
                            const totalDesgPages = Math.max(1, Math.ceil(filteredDesgs.length / desgsPerPage));
                            const paginatedDesgs = filteredDesgs.slice((desgPage - 1) * desgsPerPage, desgPage * desgsPerPage);

                            return (
                                <>
                                    <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                                        <table className="w-full text-left border-collapse min-w-[1000px]">
                                            <thead>
                                                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                                    <th className="py-3 px-4">DESIGNATION TYPE</th>
                                                    <th className="py-3 px-4 text-center w-[120px]">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-brand-border text-[13px]">
                                                {paginatedDesgs.map((d) => (
                                                    <tr key={d.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                                        <td className="py-2 px-4 font-semibold text-[#12284A]">
                                                            {d.title}
                                                        </td>
                                                        <td className="py-2 px-4 text-center">
                                                            <div className="flex items-center justify-center gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingDesgId(d.id);
                                                                        setDesgForm({ ...desgForm, title: d.title });
                                                                        setModalType('DESG');
                                                                    }}
                                                                    className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                                                    title="Edit Designation"
                                                                >
                                                                    <Edit2 size={16} strokeWidth={1.5} />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setDesignations(prev => prev.filter(x => x.id !== d.id));
                                                                        showToast(`Designation "${d.title}" deleted.`);
                                                                    }}
                                                                    className="p-1.5 bg-[#F4F8FC] text-brand-error hover:bg-[#FEE2E2] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                                                    title="Delete Designation"
                                                                >
                                                                    <Trash2 size={16} strokeWidth={1.5} />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {paginatedDesgs.length === 0 && (
                                                    <tr>
                                                        <td colSpan={2} className="py-12 text-center text-brand-muted text-sm">
                                                            No designations found matching "{searchQuery}"
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination matching BranchMaster */}
                                    <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                                            <span>Records per page:</span>
                                            <select
                                                value={desgsPerPage}
                                                onChange={(e) => {
                                                    setDesgsPerPage(Number(e.target.value));
                                                    setDesgPage(1);
                                                }}
                                                className="px-2 py-1 bg-white border border-brand-border rounded-md text-sm font-semibold text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                                            >
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>
                                        </div>

                                        <span className="text-sm text-brand-muted font-medium">
                                            Showing {filteredDesgs.length === 0 ? 0 : (desgPage - 1) * desgsPerPage + 1} - {Math.min(desgPage * desgsPerPage, filteredDesgs.length)} of {filteredDesgs.length} records
                                        </span>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setDesgPage(prev => Math.max(prev - 1, 1))}
                                                disabled={desgPage === 1}
                                                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                &lt;
                                            </button>
                                            {Array.from({ length: totalDesgPages || 1 }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setDesgPage(page)}
                                                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${desgPage === page
                                                        ? 'bg-brand-primary text-white shadow-sm'
                                                        : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setDesgPage(prev => Math.min(prev + 1, totalDesgPages))}
                                                disabled={desgPage === totalDesgPages || totalDesgPages === 0}
                                                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                &gt;
                                            </button>
                                        </div>
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
                    {/* Top Card: »APP Client User Form matching Registration Employee Tab */}
                    <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                        {/* Blue Banner Header */}
                        <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
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
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Company Name</label>
                                    <div className="relative">
                                        <select
                                            value={clientForm.companyName}
                                            onChange={(e) => setClientForm({ ...clientForm, companyName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
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
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">User</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={clientForm.userName}
                                        onChange={(e) => setClientForm({ ...clientForm, userName: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Password</label>
                                    <input
                                        type="text"
                                        placeholder=""
                                        value={clientForm.password}
                                        onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-lg shadow-sm transition-colors cursor-pointer border-none"
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
                                        className="px-6 py-2 bg-[#D9534F] hover:bg-[#C9302C] text-white font-semibold text-[13px] rounded-lg shadow-sm transition-colors cursor-pointer border-none"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Bottom Table: matching Designation Master */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        {/* Table Toolbar */}
                        <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="relative w-full sm:w-[400px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search by company or user name..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setClientPage(1); }}
                                    className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                                />
                            </div>
                        </div>

                        {/* Full Width Table View matching Designation Master */}
                        {(() => {
                            const filteredClients = clientUsers.filter(u =>
                                !searchQuery ||
                                u.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                u.userName.toLowerCase().includes(searchQuery.toLowerCase())
                            );
                            const totalClientPages = Math.max(1, Math.ceil(filteredClients.length / clientsPerPage));
                            const paginatedClients = filteredClients.slice((clientPage - 1) * clientsPerPage, clientPage * clientsPerPage);

                            return (
                                <>
                                    <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                                        <table className="w-full text-left border-collapse min-w-[1000px]">
                                            <thead>
                                                <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                                    <th className="py-3 px-4">COMPANY NAME</th>
                                                    <th className="py-3 px-4">USER NAME</th>
                                                    <th className="py-3 px-4">PASSWORD</th>
                                                    <th className="py-3 px-4 text-center w-[120px]">ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-brand-border text-[13px]">
                                                {paginatedClients.map((user) => (
                                                    <tr key={user.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                                        <td className="py-2 px-4 font-semibold text-[#12284A]">
                                                            {user.companyName}
                                                        </td>
                                                        <td className="py-2 px-4 text-brand-navy">
                                                            {user.userName}
                                                        </td>
                                                        <td className="py-2 px-4 text-brand-muted font-mono text-xs">
                                                            {user.password}
                                                        </td>
                                                        <td className="py-2 px-4 text-center">
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
                                                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                                                title="Edit User"
                                                            >
                                                                <Edit2 size={16} strokeWidth={1.5} />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                {paginatedClients.length === 0 && (
                                                    <tr>
                                                        <td colSpan={4} className="py-12 text-center text-slate-500">
                                                            No client app users found{searchQuery ? ` matching "${searchQuery}"` : ''}.
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination matching Designation Master */}
                                    <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                        <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                                            <span>Records per page:</span>
                                            <select
                                                value={clientsPerPage}
                                                onChange={(e) => {
                                                    setClientsPerPage(Number(e.target.value));
                                                    setClientPage(1);
                                                }}
                                                className="px-2 py-1 bg-white border border-brand-border rounded-md text-sm font-semibold text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                                            >
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                                <option value={50}>50</option>
                                                <option value={100}>100</option>
                                            </select>
                                        </div>

                                        <span className="text-sm text-brand-muted font-medium">
                                            Showing {filteredClients.length === 0 ? 0 : (clientPage - 1) * clientsPerPage + 1} - {Math.min(clientPage * clientsPerPage, filteredClients.length)} of {filteredClients.length} records
                                        </span>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => setClientPage(prev => Math.max(prev - 1, 1))}
                                                disabled={clientPage === 1}
                                                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                &lt;
                                            </button>
                                            {Array.from({ length: totalClientPages || 1 }, (_, i) => i + 1).map((page) => (
                                                <button
                                                    key={page}
                                                    onClick={() => setClientPage(page)}
                                                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${clientPage === page
                                                        ? 'bg-brand-primary text-white shadow-sm'
                                                        : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                                        }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setClientPage(prev => Math.min(prev + 1, totalClientPages))}
                                                disabled={clientPage === totalClientPages || totalClientPages === 0}
                                                className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                            >
                                                &gt;
                                            </button>
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                </div>
            )}

            {/* TAB CONTENT 4: ASSIGN PRIVILEGES */}
            {activeTab === 'assign-privileges' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-6">
                    {/* Top Card: Menus matching Registration Employee Tab */}
                    <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                        {/* Blue Banner Header */}
                        <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
                            <span className="mr-0.5 text-base font-serif">&raquo;</span>Menus
                        </div>

                        {/* Form Controls Row matching Registration Employee Tab */}
                        <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                            {/* Branch Field */}
                            <div className="w-full sm:w-[220px]">
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Branch</label>
                                <div className="relative">
                                    <select
                                        value={selectedBranch}
                                        onChange={(e) => setSelectedBranch(e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
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
                                <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Role</label>
                                <div className="relative">
                                    <select
                                        value={selectedPrivilegeRole}
                                        onChange={(e) => setSelectedPrivilegeRole(e.target.value)}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
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
                                    className="px-5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-lg shadow-sm transition-colors cursor-pointer border-none"
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
                                    className="px-5 py-2 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold text-[13px] rounded-lg shadow-sm transition-colors cursor-pointer border-none"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Pages Table displayed after clicking Show Pages */}
                    {showPages && (
                        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full animate-in fade-in duration-200">
                            {/* Toolbar */}
                            <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="text-sm font-semibold text-brand-navy">
                                    Privileges Matrix for <span className="text-brand-primary font-bold">{selectedPrivilegeRole || 'Default Role'}</span> ({selectedBranch || 'All Branches'})
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => handleSelectAllPrivileges(true)}
                                        className="px-3.5 py-1.5 text-xs font-semibold text-brand-primary bg-blue-50 hover:bg-blue-100 rounded-md transition-colors cursor-pointer border border-brand-primary/20"
                                    >
                                        Grant All
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSelectAllPrivileges(false)}
                                        className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 rounded-md transition-colors cursor-pointer border border-brand-border"
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>

                            {/* Full Width Table View */}
                            <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                            <th className="py-3 px-4">MODULE / PAGE NAME</th>
                                            <th className="py-3 px-4">CATEGORY</th>
                                            <th className="py-3 px-2 text-center w-[90px]">VIEW</th>
                                            <th className="py-3 px-2 text-center w-[90px]">CREATE</th>
                                            <th className="py-3 px-2 text-center w-[90px]">EDIT</th>
                                            <th className="py-3 px-2 text-center w-[90px]">DELETE</th>
                                            <th className="py-3 px-2 text-center w-[90px]">EXPORT</th>
                                            <th className="py-3 px-2 text-center w-[110px]">APPROVE</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-border text-[13px]">
                                        {privileges.map((p) => (
                                            <tr key={p.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                                                <td className="py-2 px-4 font-semibold text-[#12284A] truncate" title={p.moduleName}>
                                                    {p.moduleName}
                                                </td>
                                                <td className="py-2 px-4 text-xs text-brand-muted font-normal truncate" title={p.category}>
                                                    {p.category}
                                                </td>
                                                {(['view', 'create', 'edit', 'delete', 'exportData', 'approve'] as const).map(col => (
                                                    <td key={col} className="py-2 px-2 text-center">
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

                            <div className="p-4 bg-white border-t border-brand-border flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => showToast(`Privileges updated successfully for ${selectedPrivilegeRole || 'selected role'} at ${selectedBranch || 'selected branch'}!`)}
                                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white text-[13px] font-semibold rounded-lg shadow-sm transition-colors cursor-pointer border-none"
                                >
                                    Save Privileges
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB CONTENT 5: ASSIGN LOCATION HEAD */}
            {activeTab === 'assign-location-head' && (() => {
                const handleSaveLocationHead = () => {
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

                const filteredExecutives = salesExecutives.filter(e =>
                    !salesExSearch ||
                    e.name.toLowerCase().includes(salesExSearch.toLowerCase()) ||
                    e.mobile.includes(salesExSearch)
                );
                const totalSalesExPages = Math.max(1, Math.ceil(filteredExecutives.length / salesExPerPage));
                const paginatedExecutives = filteredExecutives.slice((salesExPage - 1) * salesExPerPage, salesExPage * salesExPerPage);

                const isAllSelected = paginatedExecutives.length > 0 && paginatedExecutives.every(e => selectedSalesExIds.includes(e.id));

                const toggleSelectAll = () => {
                    if (isAllSelected) {
                        const pageIds = new Set(paginatedExecutives.map(e => e.id));
                        setSelectedSalesExIds(prev => prev.filter(id => !pageIds.has(id)));
                    } else {
                        const pageIds = paginatedExecutives.map(e => e.id);
                        setSelectedSalesExIds(prev => Array.from(new Set([...prev, ...pageIds])));
                    }
                };

                const toggleSelectRow = (id: number) => {
                    setSelectedSalesExIds(prev =>
                        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
                    );
                };

                return (
                    <div key={activeTab} className="tab-transition-wrapper space-y-4">
                        {/* Top Card: Assign Location Head matching Registration Employee Tab */}
                        <div className="bg-white rounded-xl p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-5 py-1.5 rounded-lg font-semibold text-sm flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>Assign Location Head
                            </div>

                            <div className="flex flex-wrap items-end gap-4">
                                <div className="w-full sm:w-80">
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Location Head</label>
                                    <div className="relative">
                                        <select
                                            value={selectedLocationHead}
                                            onChange={(e) => setSelectedLocationHead(e.target.value)}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
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

                                <button
                                    type="button"
                                    onClick={handleSaveLocationHead}
                                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-lg shadow-sm transition-colors cursor-pointer border-none"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        {/* Table matching Designation Master */}
                        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                            {/* Table Toolbar */}
                            <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="relative w-full sm:w-[400px]">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search sales executive name or mobile..."
                                        value={salesExSearch}
                                        onChange={(e) => { setSalesExSearch(e.target.value); setSalesExPage(1); }}
                                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead>
                                        <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                            <th className="py-3 px-4 w-[90px]">SR.NO.</th>
                                            <th className="py-3 px-4">SALES EXECUTIVE NAME</th>
                                            <th className="py-3 px-4">MOBILENO</th>
                                            <th className="py-3 px-4 w-[80px] text-center">
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
                                    <tbody className="divide-y divide-brand-border text-[13px]">
                                        {paginatedExecutives.map((exec, idx) => {
                                            const isChecked = selectedSalesExIds.includes(exec.id);
                                            return (
                                                <tr
                                                    key={exec.id}
                                                    className={`h-[48px] transition-colors ${isChecked ? 'bg-blue-50/60 hover:bg-blue-50/90' : 'bg-white hover:bg-brand-mainbg'}`}
                                                >
                                                    <td className="py-2 px-4 text-brand-muted">
                                                        {(salesExPage - 1) * salesExPerPage + idx + 1}
                                                    </td>
                                                    <td className="py-2 px-4 font-semibold text-[#12284A] uppercase">
                                                        {exec.name}
                                                    </td>
                                                    <td className="py-2 px-4 text-brand-navy font-mono text-xs">
                                                        {exec.mobile}
                                                    </td>
                                                    <td className="py-2 px-4 text-center">
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
                                        {paginatedExecutives.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="py-12 text-center text-slate-500">
                                                    No sales executives found{salesExSearch ? ` matching "${salesExSearch}"` : ''}.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination matching Designation Master */}
                            <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                                    <span>Records per page:</span>
                                    <select
                                        value={salesExPerPage}
                                        onChange={(e) => {
                                            setSalesExPerPage(Number(e.target.value));
                                            setSalesExPage(1);
                                        }}
                                        className="px-2 py-1 bg-white border border-brand-border rounded-md text-sm font-semibold text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                                    >
                                        <option value={10}>10</option>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                </div>

                                <span className="text-sm text-brand-muted font-medium">
                                    Showing {filteredExecutives.length === 0 ? 0 : (salesExPage - 1) * salesExPerPage + 1} - {Math.min(salesExPage * salesExPerPage, filteredExecutives.length)} of {filteredExecutives.length} records
                                </span>

                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setSalesExPage(prev => Math.max(prev - 1, 1))}
                                        disabled={salesExPage === 1}
                                        className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        &lt;
                                    </button>
                                    {Array.from({ length: totalSalesExPages || 1 }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setSalesExPage(page)}
                                            className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${salesExPage === page
                                                ? 'bg-brand-primary text-white shadow-sm'
                                                : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setSalesExPage(prev => Math.min(prev + 1, totalSalesExPages))}
                                        disabled={salesExPage === totalSalesExPages || totalSalesExPages === 0}
                                        className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>

                            {/* Table Footer with Save Button matching Assign Privileges */}
                            <div className="p-4 bg-white border-t border-brand-border flex justify-end">
                                <button
                                    type="button"
                                    onClick={handleSaveLocationHead}
                                    className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-lg shadow-sm transition-colors cursor-pointer border-none"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })()}

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

                    {/* Table matching BranchMaster */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                        <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead>
                                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                        <th className="py-3 px-4">OPERATOR</th>
                                        <th className="py-3 px-4">TEMPORARY OPERATOR</th>
                                        <th className="py-3 px-4 text-center w-[120px]">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-border text-[13px]">
                                    {tempAssignments.map((item) => (
                                        <tr key={item.id} className="h-[48px] hover:bg-brand-mainbg transition-colors bg-white">
                                            <td className="py-2 px-4 font-semibold text-[#12284A] uppercase">
                                                {item.operator}
                                            </td>
                                            <td className="py-2 px-4 text-brand-navy uppercase">
                                                {item.temporaryOperator}
                                            </td>
                                            <td className="py-2 px-4 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setTempAssignments(prev => prev.filter(a => a.id !== item.id));
                                                        showToast(`Deleted temporary operator assignment for ${item.operator}`);
                                                    }}
                                                    className="p-1.5 bg-[#F4F8FC] text-brand-error hover:bg-[#FEE2E2] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                                    title="Delete Assignment"
                                                >
                                                    <Trash2 size={16} strokeWidth={1.5} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {tempAssignments.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="py-12 text-center text-slate-500">
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
            {activeTab === 'login-history' && (() => {
                const filtered = loginLogs.filter(l =>
                    (loginSelectedRole === '--ALL--' || l.role === loginSelectedRole) &&
                    (!loginUserSearch || l.userName.toLowerCase().includes(loginUserSearch.toLowerCase()) || l.name.toLowerCase().includes(loginUserSearch.toLowerCase()))
                );
                const totalLoginPages = Math.max(1, Math.ceil(filtered.length / loginsPerPage));
                const paginatedLogs = filtered.slice((loginPage - 1) * loginsPerPage, loginPage * loginsPerPage);

                const handleExportCsv = () => {
                    const headers = ['SR.NO.', 'LOGIN DATE', 'LOGIN TIME', 'USER ROLE', 'USER NAME', 'NAME', 'REMARK', 'IP ADDRESS'];
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
                };

                return (
                    <div key={activeTab} className="tab-transition-wrapper space-y-4">
                        <div className="bg-white rounded-[10px] border border-brand-border shadow-sm overflow-hidden flex flex-col w-full min-w-0">
                            {/* Table Header Toolbar: Search + Role Filter Dropdown + Date Range + Show + Export (matching View Agent in Registration) */}
                            <div className="p-3.5 sm:p-4 bg-white border-b border-brand-border flex flex-wrap items-center justify-between gap-4">
                                {/* Left: Search Input & Role Filter Dropdown */}
                                <div className="flex items-center gap-3 flex-wrap">
                                    {/* Search Input */}
                                    <div className="relative w-72 sm:w-80 md:w-[320px] h-[38px]">
                                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
                                        <input
                                            type="text"
                                            value={loginUserSearch}
                                            onChange={(e) => {
                                                setLoginUserSearch(e.target.value);
                                                setLoginPage(1);
                                            }}
                                            placeholder="Search by User Name or Name..."
                                            className="w-full h-[38px] pl-10 pr-9 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                        />
                                        {loginUserSearch && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setLoginUserSearch('');
                                                    setLoginPage(1);
                                                }}
                                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Role Filter Dropdown matching View Agent */}
                                    <div className="relative inline-flex items-center h-[38px]">
                                        <Filter size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                                        <select
                                            value={loginSelectedRole}
                                            onChange={(e) => {
                                                setLoginSelectedRole(e.target.value);
                                                setLoginPage(1);
                                            }}
                                            className="h-[38px] pl-9 pr-8 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent cursor-pointer transition-all appearance-none"
                                        >
                                            {loginRoleOptions.map((r) => (
                                                <option key={r} value={r}>
                                                    {r === '--ALL--' ? 'All Roles' : r}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown size={14} className="absolute right-2.5 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Right: Date Filters & Action Buttons matching View Agent */}
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    {/* From Date */}
                                    <div className="relative inline-flex items-center h-[38px]">
                                        <Calendar size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={loginFromDate}
                                            onChange={(e) => setLoginFromDate(e.target.value)}
                                            placeholder="From Date"
                                            title="From Date"
                                            className="h-[38px] w-[125px] sm:w-[135px] pl-8 pr-2.5 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                        />
                                    </div>

                                    <span className="text-slate-400 text-xs font-medium">to</span>

                                    {/* To Date */}
                                    <div className="relative inline-flex items-center h-[38px]">
                                        <Calendar size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
                                        <input
                                            type="text"
                                            value={loginToDate}
                                            onChange={(e) => setLoginToDate(e.target.value)}
                                            placeholder="To Date"
                                            title="To Date"
                                            className="h-[38px] w-[125px] sm:w-[135px] pl-8 pr-2.5 bg-white border border-[#CBD5E1] rounded-[6px] text-[13px] text-slate-800 text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                        />
                                    </div>

                                    {/* Show Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setLoginPage(1);
                                            showToast('Login history records updated');
                                        }}
                                        className="h-[38px] flex items-center justify-center px-4 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                    >
                                        <span>Show</span>
                                    </button>

                                    {/* Export Button matching View Agent */}
                                    <button
                                        type="button"
                                        onClick={handleExportCsv}
                                        className="h-[38px] flex items-center gap-1.5 px-4 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                                    >
                                        <Download size={15} />
                                        <span>Export</span>
                                    </button>
                                </div>
                            </div>

                                <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                                    <table className="w-full text-left border-collapse min-w-[1000px]">
                                        <thead className="sticky top-0 z-10 shadow-xs">
                                            <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                                                <th className="py-3 px-4 w-[80px]">SR.NO.</th>
                                                <th className="py-3 px-4">LOGIN DATE</th>
                                                <th className="py-3 px-4">USER ROLE</th>
                                                <th className="py-3 px-4">USER NAME</th>
                                                <th className="py-3 px-4">NAME</th>
                                                <th className="py-3 px-4">REMARK</th>
                                                <th className="py-3 px-4">IP ADDRESS</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-brand-border text-[13px]">
                                            {paginatedLogs.map((item, idx) => (
                                                <tr key={item.id} className="h-[48px] hover:bg-brand-mainbg transition-colors bg-white">
                                                    <td className="py-2 px-4 text-brand-muted">
                                                        {(loginPage - 1) * loginsPerPage + idx + 1}
                                                    </td>
                                                    <td className="py-2 px-4 text-brand-navy">
                                                        <div className="leading-snug">
                                                            <div className="font-medium">{item.loginDate}</div>
                                                            <div className="text-[12px] text-brand-muted font-mono">{item.loginTime}</div>
                                                        </div>
                                                    </td>
                                                    <td className="py-2 px-4 font-semibold text-[#12284A] uppercase">
                                                        {item.role}
                                                    </td>
                                                    <td className="py-2 px-4 text-brand-navy uppercase">
                                                        {item.userName}
                                                    </td>
                                                    <td className="py-2 px-4 text-brand-navy uppercase">
                                                        {item.name}
                                                    </td>
                                                    <td className="py-2 px-4 text-brand-muted">
                                                        {item.remark}
                                                    </td>
                                                    <td className="py-2 px-4 text-brand-navy font-mono text-xs">
                                                        {item.ipAddress}
                                                    </td>
                                                </tr>
                                            ))}
                                            {paginatedLogs.length === 0 && (
                                                <tr>
                                                    <td colSpan={7} className="py-12 text-center text-slate-500">
                                                        No login history records found{loginUserSearch ? ` matching "${loginUserSearch}"` : ''}.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination matching Designation Master */}
                                <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                                        <span>Records per page:</span>
                                        <select
                                            value={loginsPerPage}
                                            onChange={(e) => {
                                                setLoginsPerPage(Number(e.target.value));
                                                setLoginPage(1);
                                            }}
                                            className="px-2 py-1 bg-white border border-brand-border rounded-md text-sm font-semibold text-brand-navy focus:outline-none focus:ring-1 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
                                        >
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                            <option value={100}>100</option>
                                        </select>
                                    </div>

                                    <span className="text-sm text-brand-muted font-medium">
                                        Showing {filtered.length === 0 ? 0 : (loginPage - 1) * loginsPerPage + 1} - {Math.min(loginPage * loginsPerPage, filtered.length)} of {filtered.length} records
                                    </span>

                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setLoginPage(prev => Math.max(prev - 1, 1))}
                                            disabled={loginPage === 1}
                                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        >
                                            &lt;
                                        </button>
                                        {Array.from({ length: totalLoginPages || 1 }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setLoginPage(page)}
                                                className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${loginPage === page
                                                    ? 'bg-brand-primary text-white shadow-sm'
                                                    : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setLoginPage(prev => Math.min(prev + 1, totalLoginPages))}
                                            disabled={loginPage === totalLoginPages || totalLoginPages === 0}
                                            className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })()}

            {/* MODALS RENDERED IN PORTAL TO COVER FULL VIEWPORT */}
            {modalType && createPortal(
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 overflow-y-auto animate-in fade-in duration-150"
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
