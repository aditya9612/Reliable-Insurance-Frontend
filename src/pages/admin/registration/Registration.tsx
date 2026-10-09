import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import DeleteVehicleTab from './DeleteVehicleTab';
import DeactivatedAgentListTab from './DeactivatedAgentListTab';
import {
    Search, Plus, Trash2, X, CheckCircle2,
    RefreshCw, Download, AlertTriangle, Eye, EyeOff,
    ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Edit2
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
    status: 'ACTIVE' | 'INACTIVE' | 'ON LEAVE' | 'PROBATION';
    // ERP View Employee 37 Columns
    erpId?: number;
    address?: string;
    gender?: 'MALE' | 'FEMALE';
    maritalStatus?: 'MARRIED' | 'UNMARRIED' | 'SINGLE';
    officeNo?: string;
    panNo?: string;
    aadharNo?: string;
    bankName?: string;
    bankBranch?: string;
    ifscCode?: string;
    accountNo?: string;
    branchName?: string;
    userName?: string;
    userPassword?: string;
    coordinator?: string;
    quotationCoordinator?: string;
    inspectionCoordinator?: string;
    endorsementCoordinator?: string;
    locationHead?: string;
    businessProcess?: string;
    lineOfBusiness?: string;
    functionType?: string;
    employeeClass?: string;
    reporting?: string;
    joiningDate?: string;
    docsStatus?: 'VIEW' | 'NA';
    executiveType?: string;
    dateOfBirth?: string;
    exitDate?: string;
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
    // ERP View Agent 25 Columns
    erpId?: number;
    address?: string;
    gender?: 'MALE' | 'FEMALE';
    aadharNo?: string;
    bankName?: string;
    accHolderName?: string;
    bankBranch?: string;
    ifscCode?: string;
    accountNo?: string;
    branchName?: string;
    userName?: string;
    userPassword?: string;
    salesExecutive?: string;
    coordinator?: string;
    quotationCoordinator?: string;
    inspectionCoordinator?: string;
    endorsementCoordinator?: string;
    agentTsds?: string;
    exitDate?: string;
    location?: string;
}

interface BankBeneficiaryItem {
    id: number;
    beneficiaryName: string;
    entityType: 'AGENT' | 'FRANCHISE' | 'FRANCHISE_AGENT' | 'EMPLOYEE' | 'VENDOR';
    entityCode: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountType?: 'SAVINGS' | 'CURRENT';
    branch: string;
    branchName?: string;
    address?: string;
    mobile?: string;
    verificationStatus?: 'VERIFIED' | 'PENDING' | 'REJECTED';
    otherAccHolderName?: string;
    otherBankName?: string;
    otherBranch?: string;
    otherAccountNo?: string;
    otherIfscCode?: string;
    aadharCardDoc?: string;
    panCardDoc?: string;
    chequeDoc?: string;
}

interface VehicleRecord {
    id: number;
    erpId?: number;
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
    makeModel?: string;
    vehicleClass?: string;
    policyStatus?: string;
    addedDate?: string;
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

const empBranchOptions = [
    'BARAMATI',
    'CHHATRAPATI SAMBHAJINAGAR',
    'AKLUJ',
    'AHILYANAGAR',
    'PUNE',
    'MUMBAI',
    'SATARA',
    'KOLHAPUR',
    'NASHIK',
];

const empRoleOptions = [
    'ACCOUNT',
    'ACCOUNT HEAD',
    'ADMIN',
    'AGENT',
    'ALL USER',
    'ASSISTANT MANAGER',
    'BACK OFFICE',
    'BRANCH MANAGER',
    'CASHIER',
    'DEVELOPER',
    'EXECUTIVE',
    'FIELD AGENT',
    'HR MANAGER',
    'OPERATOR',
    'SALES HEAD',
    'SUPER ADMIN',
    'TELECALLER',
    'UNDERWRITER',
];

const empExecutiveTypeOptions = [
    'DIRECT',
    'INHOUSE',
    'CHANNEL PARTNER',
    'FIELD EXECUTIVE',
    'TELECALLING EXECUTIVE',
    'CORPORATE EXECUTIVE',
];

const empGenderOptions = ['Male', 'Female', 'Other'];
const empMaritalStatusOptions = ['Married', 'Single', 'Divorced', 'Widowed'];

const empStateOptions = [
    'Maharashtra',
    'Gujarat',
    'Karnataka',
    'Madhya Pradesh',
    'Goa',
    'Telangana',
];

const empDistrictOptions = [
    'Pune',
    'Solapur',
    'Ahmednagar',
    'Chhatrapati Sambhajinagar',
    'Satara',
    'Kolhapur',
    'Mumbai Suburban',
    'Nashik',
    'Thane',
    'Sangli',
];

const empTalukaOptions = [
    'NA',
    'Baramati',
    'Haveli',
    'Daund',
    'Indapur',
    'Shirur',
    'Purandar',
    'Bhor',
    'Malshiras',
    'Karjat',
];

const empBankOptions = [
    'STATE BANK OF INDIA',
    'HDFC BANK',
    'ICICI BANK',
    'AXIS BANK',
    'BANK OF MAHARASHTRA',
    'KOTAK MAHINDRA BANK',
    'PUNJAB NATIONAL BANK',
    'BANK OF BARODA',
    'CANARA BANK',
    'UNION BANK OF INDIA',
];

const agentRoleOptions = [
    'AGENT',
    'POSP',
    'BROKER',
    'FRANCHISE',
    'DIRECT',
];

const agentSalesExecutiveOptions = [
    'Rahul Patil',
    'Amit Shinde',
    'Priya Deshmukh',
    'Sagar Pawar',
    'Vikram More',
    'Sachin Kulkarni',
    'Pooja Jadhav',
];

const agentCoordinatorOptions = [
    'Mahesh Joshi',
    'Sneha Kulkarni',
    'Pooja Jadhav',
    'Nilesh Gaikwad',
    'Kiran Bhosale',
    'Santosh Jagtap',
];

const agentQuotationCoordinatorOptions = [
    'Aniket Kale',
    'Swati Chavan',
    'Kiran Bhosale',
    'Deepali Mane',
    'Rupali Thorat',
    'Siddharth Shinde',
];

const agentInspectionCoordinatorOptions = [
    'Sandeep Jagtap',
    'Rohit Sonawane',
    'Vishal Salunke',
    'Rupali Thorat',
    'Manoj Ghadge',
];

const agentEndorsementCoordinatorOptions = [
    'Tushar More',
    'Snehal Shinde',
    'Ganesh Bankar',
    'Prachi Kadam',
    'Omkar Pawar',
];

const agentCampaignOptions = [
    'Standard Campaign',
    'Summer Drive 2024',
    'Monsoon Special',
    'Diwali Festival Offer',
    'POSP Growth Drive',
    'Direct Referral',
];

const agentLocationOptions = [
    'Baramati Main Office',
    'Pune Regional Office',
    'Chhatrapati Sambhajinagar Branch',
    'Akluj City Branch',
    'Ahilyanagar Branch',
    'Mumbai Corporate',
    'Western Maharashtra Zone',
];

const agentCategoryOptions = [
    'Motor Specialist',
    'Non-Motor Specialist',
    'Life & Health',
    'Comprehensive All-Line',
    'General Insurance',
];

const agentPospTypeOptions = [
    'Certified POSP',
    'Direct Agent',
    'Corporate Agency',
    'Sub-Broker',
    'Franchise Associate',
];

const agentFranchiseOptions = [
    'RA',
    'FC001 - Baramati South',
    'FC002 - Pune Metro',
    'FC003 - Sambhajinagar East',
    'NA',
];

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
        {
            id: 1,
            erpId: 6,
            empCode: 'END0001',
            fullName: 'KOMAL ABA DANANE',
            address: 'BARAMATI 7758900234, ,NA,PUNE,MAHARASHTRA',
            gender: 'FEMALE',
            maritalStatus: 'MARRIED',
            officeNo: '9225658205',
            mobile: '9130241856',
            email: 'dananekomal724@gmail.com',
            panNo: 'ALFPB1846B',
            aadharNo: '4422-9273-4562',
            bankName: 'BANK OF BARODA',
            bankBranch: 'BARAMATI',
            ifscCode: 'BARB0RASPOO',
            accountNo: '10510100012387',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'endors',
            userPassword: 'endors',
            coordinator: '-',
            quotationCoordinator: '-',
            inspectionCoordinator: '-',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            locationHead: '-',
            businessProcess: '-',
            lineOfBusiness: '-',
            functionType: 'OPERATIONS',
            designation: 'TEAM LEADER',
            department: 'Operations',
            employeeClass: 'CLASS 5',
            reporting: 'JYOTI C SONAWANE',
            joiningDate: '26/12/2020 00:00:00',
            doj: '26/12/2020',
            docsStatus: 'NA',
            executiveType: 'OPERATIONAL SUPPORT',
            dateOfBirth: '12/05/1996 10:19:54',
            status: 'ACTIVE'
        },
        {
            id: 2,
            erpId: 8,
            empCode: 'OPT0006',
            fullName: 'KIRAN PANDURANG MALI',
            address: 'A/P- MALSHIRAS TAL-MALSHIRAS DIST-SOLAPUR,PUNE,MAHARASHTRA-413107',
            gender: 'MALE',
            maritalStatus: 'MARRIED',
            officeNo: '7721946111',
            mobile: '9075185790',
            email: 'kiranpmali2014@gmail.com',
            panNo: 'DIYPM2804R',
            aadharNo: '1452-3625-8569',
            bankName: 'IDBI BANK',
            bankBranch: 'BARAMATI',
            ifscCode: 'IBKL000471',
            accountNo: '471104000150901',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'kiran.mali',
            userPassword: 'kiran@2022',
            coordinator: 'RUTUJA NITIN MANE',
            quotationCoordinator: 'RUTUJA NITIN MANE',
            inspectionCoordinator: 'RUTUJA NITIN MANE',
            endorsementCoordinator: '-',
            locationHead: '-',
            businessProcess: 'AGENCY',
            lineOfBusiness: 'MOTOR',
            functionType: 'OPERATIONS',
            designation: 'TEAM LEADER',
            department: 'Operations',
            employeeClass: 'CLASS 5',
            reporting: 'JYOTI C SONAWANE',
            joiningDate: '26/12/2020 00:00:00',
            doj: '26/12/2020',
            docsStatus: 'VIEW',
            executiveType: 'OPERATIONAL SUPPORT',
            dateOfBirth: '24/08/1994 00:00:00',
            status: 'ACTIVE'
        },
        {
            id: 3,
            erpId: 9,
            empCode: 'OPT0004',
            fullName: 'SARIKA NAMDEO BHANDALKAR',
            address: 'A/P- GUNAVADI ROAD,BARAMATI TAL-BARAMATI DIST-PUNE,PUNE,MAHARASHTRA-413102',
            gender: 'FEMALE',
            maritalStatus: 'MARRIED',
            officeNo: '9763998855',
            mobile: '9657607937',
            email: 'bhandalkarsarika@gmail.com',
            panNo: 'CWWPB7043N',
            aadharNo: '2630-8974-2186',
            bankName: 'AXIS BANK',
            bankBranch: 'BARAMATI',
            ifscCode: 'UTIB0000404',
            accountNo: '916010050819284',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'sarika.bhandalkar',
            userPassword: 'sarika@2022',
            coordinator: 'SANTOSH PHULCHAND BANSODE',
            quotationCoordinator: 'SANTOSH PHULCHAND BANSODE',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: '-',
            locationHead: '-',
            businessProcess: 'AGENCY',
            lineOfBusiness: 'MOTOR',
            functionType: 'OPERATIONS',
            designation: 'TEAM LEADER',
            department: 'Operations',
            employeeClass: 'CLASS 5',
            reporting: 'JYOTI C SONAWANE',
            joiningDate: '26/12/2020 00:00:00',
            doj: '26/12/2020',
            docsStatus: 'VIEW',
            executiveType: 'OPERATIONAL SUPPORT',
            dateOfBirth: '01/10/2024 10:19:54',
            status: 'ACTIVE'
        },
        {
            id: 4,
            erpId: 12,
            empCode: 'INS0001',
            fullName: 'MANGESH RAVINDRA KAMBLE',
            address: 'A/P - KANHERI TAL - BARAMATI DIST - PUNE 413102',
            gender: 'MALE',
            maritalStatus: 'UNMARRIED',
            officeNo: '9225658205',
            mobile: '9822334455',
            email: 'mangesh.kamble@reliable.in',
            panNo: 'BPZPK4512M',
            aadharNo: '3698-5214-7412',
            bankName: 'BANK OF MAHARASHTRA',
            bankBranch: 'BARAMATI',
            ifscCode: 'MAHB0001409',
            accountNo: '60040969402',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'insp',
            userPassword: 'insp@2022',
            coordinator: '-',
            quotationCoordinator: '-',
            inspectionCoordinator: 'MANGESH RAVINDRA KAMBLE',
            endorsementCoordinator: '-',
            locationHead: '-',
            businessProcess: '-',
            lineOfBusiness: '-',
            functionType: 'OPERATIONS',
            designation: 'OPERATIONS ASSISTANT',
            department: 'Operations',
            employeeClass: 'CLASS 6',
            reporting: 'JYOTI C SONAWANE',
            joiningDate: '06/12/2021 00:00:00',
            doj: '06/12/2021',
            docsStatus: 'NA',
            executiveType: 'OPERATIONAL SUPPORT',
            dateOfBirth: '12/05/1996 10:19:54',
            status: 'ACTIVE'
        },
        {
            id: 5,
            erpId: 14,
            empCode: 'RSM0001',
            fullName: 'AVINASH BHARAT KORATKAR',
            address: 'A/P - KARAD TAL - KARAD DIST - SATARA 415110',
            gender: 'MALE',
            maritalStatus: 'MARRIED',
            officeNo: '7721946111',
            mobile: '9850123456',
            email: 'avi.koratkar@gmail.com',
            panNo: 'AVPKK9876Q',
            aadharNo: '7896-5412-3214',
            bankName: 'THE BARAMATI SAHAKARI BANK LTD',
            bankBranch: 'KARAD',
            ifscCode: 'BARA0000002',
            accountNo: '160924',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'avi.koratkar',
            userPassword: 'avi@2022',
            coordinator: 'RUTUJA NITIN MANE',
            quotationCoordinator: 'RUTUJA NITIN MANE',
            inspectionCoordinator: '-',
            endorsementCoordinator: '-',
            locationHead: '-',
            businessProcess: 'AGENCY',
            lineOfBusiness: 'MOTOR',
            functionType: 'OPERATIONS',
            designation: 'OPERATIONS ASSISTANT',
            department: 'Operations',
            employeeClass: 'CLASS 6',
            reporting: 'JYOTI C SONAWANE',
            joiningDate: '26/12/2020 00:00:00',
            doj: '26/12/2020',
            docsStatus: 'VIEW',
            executiveType: 'OPERATIONAL SUPPORT',
            dateOfBirth: '05/04/1988 10:19:54',
            status: 'ACTIVE'
        },
        {
            id: 6,
            erpId: 30,
            empCode: 'RSM0002',
            fullName: 'SANTOSH PHULCHAND BANSODE',
            address: 'A/P - JALOCHI ROAD, TAL - BARAMATI DIST - PUNE 413102',
            gender: 'MALE',
            maritalStatus: 'MARRIED',
            officeNo: '9763998855',
            mobile: '9422001122',
            email: 'santosh.bansode@reliable.in',
            panNo: 'SPBPB3214R',
            aadharNo: '8521-9632-7410',
            bankName: 'ICICI BANK',
            bankBranch: 'JALOCHI',
            ifscCode: 'ICIC0000337',
            accountNo: '33701511875',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'santosh.bansode',
            userPassword: 'santosh@2022',
            coordinator: 'SANTOSH PHULCHAND BANSODE',
            quotationCoordinator: 'SANTOSH PHULCHAND BANSODE',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            locationHead: 'ABHISHEK VILAS GAIKWAD (LOCATION HEAD)',
            businessProcess: 'AGENCY',
            lineOfBusiness: 'MOTOR',
            functionType: 'SALES',
            designation: 'RELATIONSHIP MANAGER',
            department: 'Sales',
            employeeClass: 'CLASS 6',
            reporting: 'ABHISHEK VILAS GAIKWAD (LOCATION HEAD)',
            joiningDate: '26/12/2020 00:00:00',
            doj: '26/12/2020',
            docsStatus: 'NA',
            executiveType: 'FIELD SALES EXECUTIVE',
            dateOfBirth: '10/05/1988 10:19:54',
            status: 'ACTIVE'
        },
        {
            id: 7,
            erpId: 32,
            empCode: 'RSM0003',
            fullName: 'ARVIND DNYANESHWAR GAWADE',
            address: 'A/P - AKLUJ TAL - MALSHIRAS DIST - SOLAPUR 413101',
            gender: 'MALE',
            maritalStatus: 'MARRIED',
            officeNo: '9225658205',
            mobile: '9890112233',
            email: 'arvind.gawade@reliable.in',
            panNo: 'ADGPG6541S',
            aadharNo: '9632-1478-5236',
            bankName: 'STATE BANK OF INDIA',
            bankBranch: 'AKLUJ',
            ifscCode: 'SBIN0000312',
            accountNo: '20145698712',
            branchName: 'AKLUJ',
            branch: 'AKLUJ',
            userName: 'arvind.gawade',
            userPassword: 'arvind@2022',
            coordinator: '-',
            quotationCoordinator: '-',
            inspectionCoordinator: '-',
            endorsementCoordinator: '-',
            locationHead: 'ABHISHEK VILAS GAIKWAD (LOCATION HEAD)',
            businessProcess: 'AGENCY',
            lineOfBusiness: 'MOTOR',
            functionType: 'SALES',
            designation: 'RELATIONSHIP MANAGER',
            department: 'Sales',
            employeeClass: 'CLASS 6',
            reporting: 'ABHISHEK VILAS GAIKWAD (LOCATION HEAD)',
            joiningDate: '26/12/2020 00:00:00',
            doj: '26/12/2020',
            docsStatus: 'NA',
            executiveType: 'OPERATIONAL SUPPORT',
            dateOfBirth: '20/11/1979 10:19:54',
            status: 'ACTIVE'
        },
        {
            id: 8,
            erpId: 35,
            empCode: 'RSM0004',
            fullName: 'SHEKHAR RAJENDRA KUMBHAR',
            address: 'A/P - INDAPUR DIST - PUNE 413106',
            gender: 'MALE',
            maritalStatus: 'MARRIED',
            officeNo: '7721946111',
            mobile: '9765443322',
            email: 'shekhar.kumbhar@reliable.in',
            panNo: 'SRKPK7894D',
            aadharNo: '7412-5896-3214',
            bankName: 'HDFC BANK',
            bankBranch: 'INDAPUR',
            ifscCode: 'HDFC0001452',
            accountNo: '5020006541239',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'shekhar.kumbhar',
            userPassword: 'shekhar@2022',
            coordinator: 'KOMAL ABA DANANE',
            quotationCoordinator: 'KOMAL ABA DANANE',
            inspectionCoordinator: '-',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            locationHead: 'ABHISHEK VILAS GAIKWAD (LOCATION HEAD)',
            businessProcess: 'AGENCY',
            lineOfBusiness: 'MOTOR',
            functionType: 'SALES',
            designation: 'RELATIONSHIP MANAGER',
            department: 'Sales',
            employeeClass: 'CLASS 6',
            reporting: 'ABHISHEK VILAS GAIKWAD (LOCATION HEAD)',
            joiningDate: '01/01/2021 00:00:00',
            doj: '01/01/2021',
            docsStatus: 'VIEW',
            executiveType: 'FIELD SALES EXECUTIVE',
            dateOfBirth: '15/08/1990 00:00:00',
            status: 'ACTIVE'
        },
        {
            id: 9,
            erpId: 3,
            empCode: 'OPT0002',
            fullName: 'VIKRAM DNYANESHWAR SHINDE',
            address: 'A/P - SOMESHWAR NAGAR, BARAMATI, PUNE-412306',
            gender: 'MALE',
            maritalStatus: 'MARRIED',
            officeNo: '9225658205',
            mobile: '9822114477',
            email: 'vikram.shinde@reliable.in',
            panNo: 'VDSPS1234A',
            aadharNo: '6541-2365-9874',
            bankName: 'BANK OF BARODA',
            bankBranch: 'SOMESHWAR',
            ifscCode: 'BARB0SOMESH',
            accountNo: '10510100099881',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'vikram.shinde',
            userPassword: 'vikram@2021',
            coordinator: '-',
            quotationCoordinator: '-',
            inspectionCoordinator: '-',
            endorsementCoordinator: '-',
            locationHead: '-',
            businessProcess: 'AGENCY',
            lineOfBusiness: 'MOTOR',
            functionType: 'OPERATIONS',
            designation: 'OPERATIONS EXECUTIVE',
            department: 'Operations',
            employeeClass: 'CLASS 6',
            reporting: 'JYOTI C SONAWANE',
            joiningDate: '15/03/2020 00:00:00',
            doj: '15/03/2020',
            docsStatus: 'NA',
            executiveType: 'OPERATIONAL SUPPORT',
            dateOfBirth: '18/06/1992 00:00:00',
            status: 'INACTIVE',
            exitDate: '31/03/2023 00:00:00'
        },
        {
            id: 10,
            erpId: 5,
            empCode: 'OPT0003',
            fullName: 'PRIYA SUNIL PAWAR',
            address: 'A/P - KASBA, BARAMATI, PUNE-413102',
            gender: 'FEMALE',
            maritalStatus: 'MARRIED',
            officeNo: '7721946111',
            mobile: '9850223344',
            email: 'priya.pawar@reliable.in',
            panNo: 'PSPPP5678B',
            aadharNo: '3214-7896-5412',
            bankName: 'AXIS BANK',
            bankBranch: 'BARAMATI',
            ifscCode: 'UTIB0000404',
            accountNo: '916010050112233',
            branchName: 'BARAMATI',
            branch: 'BARAMATI',
            userName: 'priya.pawar',
            userPassword: 'priya@2021',
            coordinator: '-',
            quotationCoordinator: '-',
            inspectionCoordinator: '-',
            endorsementCoordinator: '-',
            locationHead: '-',
            businessProcess: 'AGENCY',
            lineOfBusiness: 'MOTOR',
            functionType: 'OPERATIONS',
            designation: 'BACK OFFICE EXECUTIVE',
            department: 'Operations',
            employeeClass: 'CLASS 6',
            reporting: 'JYOTI C SONAWANE',
            joiningDate: '10/05/2020 00:00:00',
            doj: '10/05/2020',
            docsStatus: 'VIEW',
            executiveType: 'OPERATIONAL SUPPORT',
            dateOfBirth: '22/11/1995 00:00:00',
            status: 'INACTIVE',
            exitDate: '15/12/2023 00:00:00'
        }
    ]);
    const [employeeForm, setEmployeeForm] = useState({ fullName: '', designation: 'Operations Executive', department: 'Operations', branch: 'BARAMATI', mobile: '', email: '', doj: new Date().toISOString().split('T')[0] });

    const initialEmpInfoState = {
        // Employee Details
        branch: '',
        role: '',
        empCode: '',
        dateOfJoining: '',
        executiveType: '',

        // Personal Details
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        officeMobile: '',
        mobile: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        district: '',
        taluka: 'NA',
        panNo: '',
        aadharNo: '',
        email: '',

        // Bank Details
        bankName: '',
        bankBranch: '',
        ifscCode: '',
        bankAccountNo: '',

        // User Details
        username: '',
        password: '',
        rePassword: '',

        // KYC File names
        aadharFront: '',
        aadharBack: '',
        panCard: '',
        cancelCheque1: '',
        cancelCheque2: '',
    };

    const [empInfoForm, setEmpInfoForm] = useState(initialEmpInfoState);
    const [usernameChecked, setUsernameChecked] = useState<boolean | null>(null);

    const handleCheckUsername = () => {
        if (!empInfoForm.username.trim()) {
            showToast('Please enter a username to check');
            return;
        }
        const exists = employees.some(e => e.fullName.toLowerCase().includes(empInfoForm.username.toLowerCase()));
        if (exists) {
            setUsernameChecked(false);
            showToast(`Username "${empInfoForm.username}" is already taken`);
        } else {
            setUsernameChecked(true);
            showToast(`Username "${empInfoForm.username}" is available!`);
        }
    };

    const handleEmpFileChange = (field: 'aadharFront' | 'aadharBack' | 'panCard' | 'cancelCheque1' | 'cancelCheque2', file?: File) => {
        if (file) {
            setEmpInfoForm(prev => ({ ...prev, [field]: file.name }));
            showToast(`Selected file: ${file.name}`);
        } else {
            setEmpInfoForm(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSaveEmpInfo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!empInfoForm.branch) {
            showToast('Please select Branch Name');
            return;
        }
        if (!empInfoForm.role) {
            showToast('Please select Role Name');
            return;
        }
        if (!empInfoForm.firstName.trim()) {
            showToast('Please enter First Name');
            return;
        }
        if (!empInfoForm.middleName.trim()) {
            showToast('Please enter Middle Name');
            return;
        }
        if (!empInfoForm.lastName.trim()) {
            showToast('Please enter Last Name');
            return;
        }
        if (!empInfoForm.dateOfBirth.trim()) {
            showToast('Please enter Date of Birth');
            return;
        }
        if (empInfoForm.password && empInfoForm.rePassword && empInfoForm.password !== empInfoForm.rePassword) {
            showToast('Password and Re-Password do not match');
            return;
        }

        const fullName = `${empInfoForm.firstName.trim()} ${empInfoForm.middleName.trim()} ${empInfoForm.lastName.trim()}`.toUpperCase();
        const code = empInfoForm.empCode.trim() || `EMP00${employees.length + 15}`;

        const newEmp: EmployeeItem = {
            id: Date.now(),
            empCode: code,
            fullName,
            designation: empInfoForm.role || 'Executive',
            department: 'Operations',
            branch: empInfoForm.branch,
            mobile: empInfoForm.mobile || empInfoForm.officeMobile || '9822001122',
            email: empInfoForm.email || `${code.toLowerCase()}@reliable.in`,
            doj: empInfoForm.dateOfJoining || new Date().toLocaleDateString('en-GB'),
            status: 'ACTIVE'
        };

        setEmployees(prev => [newEmp, ...prev]);
        showToast(`Employee ${fullName} registered successfully!`);
        setEmpInfoForm(initialEmpInfoState);
        setUsernameChecked(null);
    };

    const handleResetEmpInfo = () => {
        setEmpInfoForm(initialEmpInfoState);
        setUsernameChecked(null);
        showToast('Employee registration form has been reset.');
    };

    // ==========================================
    // 2 & 3: AGENT STATE
    // ==========================================
    const [agents, setAgents] = useState<AgentItem[]>([
        {
            id: 1,
            erpId: 3,
            agentCode: 'AGT0003',
            fullName: 'PRAMOD BHIMARAO DONGARE',
            address: 'A/P - LONI DEOKAR ,PUNE,PUNE,MAHARASHTRA-413132',
            email: 'BARAMATI.RELIABLE@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '293600902825',
            panNo: '-',
            bankName: 'HDFC BANK',
            accHolderName: 'PRAMOD BHIMARAO DONGARE',
            bankBranch: 'INDAPUR',
            ifscCode: 'HDFC0004354',
            accountNo: '50200033224045',
            branchName: 'BARAMATI',
            userName: 'pramod.dogare',
            userPassword: 'pramod@0101',
            salesExecutive: 'SHEKHAR RAJENDRA KUMBHAR',
            coordinator: 'SANTOSH PHULCHAND BANSODE',
            quotationCoordinator: 'SANTOSH PHULCHAND BANSODE',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9822145678',
            kycStatus: 'VERIFIED',
            totalPolicies: 142,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 2,
            erpId: 4,
            agentCode: 'AGT0004',
            fullName: 'YOGESH ASHOK KHOPKAR',
            address: 'A/P - SHRIRAM NAGAR,BARAMATI,PUNE,MAHARASHTRA-413102',
            email: 'BARAMATI.RELIABLE@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '641575135814',
            panNo: '-',
            bankName: 'ANDHRA BANK',
            accHolderName: 'YOGESH ASHOK KHOPKAR',
            bankBranch: '0',
            ifscCode: '-',
            accountNo: '-',
            branchName: 'BARAMATI',
            userName: 'yogesh.khopkar',
            userPassword: 'yogesh@0801',
            salesExecutive: 'TANOJ SHASHIKANT POTE',
            coordinator: 'PRANALI GANESH GAIKWAD',
            quotationCoordinator: 'PRANALI GANESH GAIKWAD',
            inspectionCoordinator: 'PRANALI GANESH GAIKWAD',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9890451234',
            kycStatus: 'VERIFIED',
            totalPolicies: 88,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 3,
            erpId: 5,
            agentCode: 'AGT0005',
            fullName: 'DNYANESHWAR SUDAM KONDALKAR',
            address: 'A/P GHAR NO 559 DERE WASTI,TANDULWADI BARAMATI,PUNE,MAHARASHTRA-413102',
            email: 'DNYANESHWAR.KONDALKAR85@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '732454104286',
            panNo: '-',
            bankName: 'STATE BANK OF INDIA',
            accHolderName: 'DNYANESHWAR SUDAM KONDALKAR',
            bankBranch: 'MIDC',
            ifscCode: 'SBIN0001918',
            accountNo: '30994298148',
            branchName: 'BARAMATI',
            userName: 'dnyaneshwar.kondalkar',
            userPassword: 'dnyaneshwar@5501',
            salesExecutive: 'SHEKHAR RAJENDRA KUMBHAR',
            coordinator: 'SANTOSH PHULCHAND BANSODE',
            quotationCoordinator: 'SANTOSH PHULCHAND BANSODE',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9423567890',
            kycStatus: 'VERIFIED',
            totalPolicies: 24,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 4,
            erpId: 6,
            agentCode: 'AGT0006',
            fullName: 'MANGESH ARJUNRAO GIRAME',
            address: 'A/P HARIKRUPA NAGAR,BARAMTI ,PUNE,MAHARASHTRA-413102',
            email: 'BARAMATI.RELIABLE@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '0',
            panNo: '-',
            bankName: 'ANDHRA BANK',
            accHolderName: 'MANGESH ARJUNRAO GIRAME',
            bankBranch: '0',
            ifscCode: '-',
            accountNo: '-',
            branchName: 'BARAMATI',
            userName: 'mangesh.girame',
            userPassword: 'mangesh@3801',
            salesExecutive: 'DEEPAK SOPAN KUDALE',
            coordinator: 'SUJATA SOMNATH SHINDE',
            quotationCoordinator: 'SUJATA SOMNATH SHINDE',
            inspectionCoordinator: 'SUJATA SOMNATH SHINDE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9765123987',
            kycStatus: 'VERIFIED',
            totalPolicies: 215,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 5,
            erpId: 10,
            agentCode: 'AGT0010',
            fullName: 'SUPRIYA SUNIL GADE',
            address: 'A/P BARAMATI,DIST - PUNE,PUNE,MAHARASHTRA-413102',
            email: 'BARAMATI.RELIABLE@GMAIL.COM',
            gender: 'FEMALE',
            aadharNo: '452136987412',
            panNo: '-',
            bankName: 'HDFC BANK',
            accHolderName: 'SUPRIYA SUNIL GADE',
            bankBranch: 'BARAMATI',
            ifscCode: 'HDFC0001234',
            accountNo: '50100234567890',
            branchName: 'BARAMATI',
            userName: 'supriya.gade',
            userPassword: 'supriya@1001',
            salesExecutive: 'SHEKHAR RAJENDRA KUMBHAR',
            coordinator: 'KOMAL ABA DANANE',
            quotationCoordinator: 'PRANALI GANESH GAIKWAD',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9850987123',
            kycStatus: 'VERIFIED',
            totalPolicies: 67,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 6,
            erpId: 12,
            agentCode: 'AGT0012',
            fullName: 'KIRAN PRABHAKAR JATHAR',
            address: 'A/P - BARAMATI,DIST - PUNE,PUNE,MAHARASHTRA-413102',
            email: 'KIRAN.JATHAR@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '874512369854',
            panNo: '-',
            bankName: 'BANK OF MAHARASHTRA',
            accHolderName: 'KIRAN PRABHAKAR JATHAR',
            bankBranch: 'BARAMATI',
            ifscCode: 'MAHB0000123',
            accountNo: '60123456789',
            branchName: 'BARAMATI',
            userName: 'kiran.jathar',
            userPassword: 'kiran@1201',
            salesExecutive: 'TANOJ SHASHIKANT POTE',
            coordinator: 'SANTOSH PHULCHAND BANSODE',
            quotationCoordinator: 'SANTOSH PHULCHAND BANSODE',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9850123984',
            kycStatus: 'VERIFIED',
            totalPolicies: 179,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 7,
            erpId: 19,
            agentCode: 'AGT0019',
            fullName: 'SANDIP HANUMANT GHORPADE',
            address: 'A/P - PANDARE TAL - BARAMATI,BARAMATI,PUNE,MAHARASHTRA-413110',
            email: 'BARAMATI.RELIABLE@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '321456987412',
            panNo: '-',
            bankName: 'ICICI BANK',
            accHolderName: 'SANDIP HANUMANT GHORPADE',
            bankBranch: 'PANDARE',
            ifscCode: 'ICIC0000456',
            accountNo: '045601523456',
            branchName: 'BARAMATI',
            userName: 'sandip.ghorpade',
            userPassword: 'sandip@1901',
            salesExecutive: 'DEEPAK SOPAN KUDALE',
            coordinator: 'SUJATA SOMNATH SHINDE',
            quotationCoordinator: 'PRANALI GANESH GAIKWAD',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9822765432',
            kycStatus: 'VERIFIED',
            totalPolicies: 110,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 8,
            erpId: 21,
            agentCode: 'AGT0021',
            fullName: 'VINAYAK DIGAMBAR TARU',
            address: 'A/P - SHRIRAM NAGAR,BARAMATI,PUNE,MAHARASHTRA-413102',
            email: 'BARAMATI.RELIABLE@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '987456321456',
            panNo: '-',
            bankName: 'AXIS BANK',
            accHolderName: 'VINAYAK DIGAMBAR TARU',
            bankBranch: 'BARAMATI',
            ifscCode: 'UTIB0000789',
            accountNo: '918020012345678',
            branchName: 'BARAMATI',
            userName: 'vinayak.taru',
            userPassword: 'vinayak@2101',
            salesExecutive: 'SHEKHAR RAJENDRA KUMBHAR',
            coordinator: 'PRANALI GANESH GAIKWAD',
            quotationCoordinator: 'SANTOSH PHULCHAND BANSODE',
            inspectionCoordinator: 'PRANALI GANESH GAIKWAD',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9890123456',
            kycStatus: 'VERIFIED',
            totalPolicies: 94,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 9,
            erpId: 23,
            agentCode: 'AGT0023',
            fullName: 'ANWAR GULAMHUSEN BAGWAN',
            address: 'A/P - KACHERI ROAD BABAR BOL,BARAMATI,PUNE,MAHARASHTRA-413102',
            email: 'BARAMATI.RELIABLE@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '654123987456',
            panNo: '-',
            bankName: 'CANARA BANK',
            accHolderName: 'ANWAR GULAMHUSEN BAGWAN',
            bankBranch: 'BARAMATI',
            ifscCode: 'CNRB0001234',
            accountNo: '1234101012345',
            branchName: 'BARAMATI',
            userName: 'anwar.bagwan',
            userPassword: 'anwar@2301',
            salesExecutive: 'TANOJ SHASHIKANT POTE',
            coordinator: 'SANTOSH PHULCHAND BANSODE',
            quotationCoordinator: 'SUJATA SOMNATH SHINDE',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9423123456',
            kycStatus: 'VERIFIED',
            totalPolicies: 76,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 10,
            erpId: 25,
            agentCode: 'AGT0025',
            fullName: 'SAMPAT UTTAMRAO KALE',
            address: 'A/P - BHIGWAN SAI NATH COMPLEX TAL- INDAPUR,DIST - PUNE,PUNE,MAHARASHTRA-413130',
            email: 'BARAMATI.RELIABLE@GMAIL.COM',
            gender: 'MALE',
            aadharNo: '369852147852',
            panNo: '-',
            bankName: 'STATE BANK OF INDIA',
            accHolderName: 'SAMPAT UTTAMRAO KALE',
            bankBranch: 'BHIGWAN',
            ifscCode: 'SBIN0000567',
            accountNo: '20123456789',
            branchName: 'BARAMATI',
            userName: 'sampat.kale',
            userPassword: 'sampat@2501',
            salesExecutive: 'DEEPAK SOPAN KUDALE',
            coordinator: 'PRANALI GANESH GAIKWAD',
            quotationCoordinator: 'PRANALI GANESH GAIKWAD',
            inspectionCoordinator: 'SUJATA SOMNATH SHINDE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '01/11/2021 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9765987654',
            kycStatus: 'VERIFIED',
            totalPolicies: 125,
            regDate: '01/11/2021',
            status: 'ACTIVE'
        },
        {
            id: 11,
            erpId: 1,
            agentCode: 'AGT0001',
            fullName: 'MAHESH RAMCHANDRA JADHAV',
            address: 'A/P SOMESHWAR NAGAR, TAL- BARAMATI, DIST - PUNE 412306',
            email: 'MAHESH.JADHAV@RELIABLE.IN',
            gender: 'MALE',
            aadharNo: '123456789012',
            panNo: 'ABCDE1111J',
            bankName: 'BANK OF BARODA',
            accHolderName: 'MAHESH RAMCHANDRA JADHAV',
            bankBranch: 'SOMESHWAR',
            ifscCode: 'BARB0SOMESH',
            accountNo: '987654321012',
            branchName: 'BARAMATI',
            userName: 'mahesh.jadhav',
            userPassword: 'mahesh@0001',
            salesExecutive: 'SHEKHAR RAJENDRA KUMBHAR',
            coordinator: 'SANTOSH PHULCHAND BANSODE',
            quotationCoordinator: 'SANTOSH PHULCHAND BANSODE',
            inspectionCoordinator: 'SANTOSH PHULCHAND BANSODE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '15/06/2023 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9822001122',
            kycStatus: 'VERIFIED',
            totalPolicies: 45,
            regDate: '01/01/2021',
            status: 'INACTIVE'
        },
        {
            id: 12,
            erpId: 2,
            agentCode: 'AGT0002',
            fullName: 'SURESH PANDURANG PATIL',
            address: 'A/P BHIGWAN ROAD, INDAPUR, DIST - PUNE 413106',
            email: 'SURESH.PATIL@RELIABLE.IN',
            gender: 'MALE',
            aadharNo: '987654321098',
            panNo: 'PQRST2222P',
            bankName: 'HDFC BANK',
            accHolderName: 'SURESH PANDURANG PATIL',
            bankBranch: 'INDAPUR',
            ifscCode: 'HDFC0000999',
            accountNo: '50100999888777',
            branchName: 'BARAMATI',
            userName: 'suresh.patil',
            userPassword: 'suresh@0002',
            salesExecutive: 'TANOJ SHASHIKANT POTE',
            coordinator: 'PRANALI GANESH GAIKWAD',
            quotationCoordinator: 'PRANALI GANESH GAIKWAD',
            inspectionCoordinator: 'SUJATA SOMNATH SHINDE',
            endorsementCoordinator: 'KOMAL ABA DANANE',
            agentTsds: '2',
            exitDate: '20/12/2023 00:00:00',
            location: 'BARAMATI',
            type: 'POSP',
            branch: 'BARAMATI',
            mobile: '9850112233',
            kycStatus: 'VERIFIED',
            totalPolicies: 18,
            regDate: '10/02/2021',
            status: 'INACTIVE'
        }
    ]);
    const [agentForm, setAgentForm] = useState({ fullName: '', type: 'POSP' as const, branch: 'BARAMATI', mobile: '', email: '', panNo: '' });
    const [agentViewFilter, setAgentViewFilter] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
    const [agentSearchQuery, setAgentSearchQuery] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const agentTableScrollRef = useRef<HTMLDivElement>(null);

    const scrollAgentTable = (amount: number) => {
        if (agentTableScrollRef.current) {
            agentTableScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    const scrollAgentTableToEdge = (edge: 'start' | 'end') => {
        if (agentTableScrollRef.current) {
            agentTableScrollRef.current.scrollTo({
                left: edge === 'start' ? 0 : agentTableScrollRef.current.scrollWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleToggleAgentStatus = (id: number) => {
        setAgents(prev => prev.map(a => {
            if (a.id === id) {
                const nextStatus: 'ACTIVE' | 'INACTIVE' = a.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                showToast(`Agent ${a.fullName} set to ${nextStatus}`);
                return { ...a, status: nextStatus };
            }
            return a;
        }));
    };

    const handleExportAgents = () => {
        const targetAgents = agents.filter(a => a.status === agentViewFilter);
        const headers = [
            'STATUS', 'CODE', 'AGENT NAME', 'ADDRESS', 'EMAILID', 'GENDER',
            'ADHAR NO', 'PAN NO', 'SELF BANK NAME', 'SELF ACC HOLDER NAME',
            'SELF BANK BRANCH', 'SELF IFSC_CODE', 'SELF ACCOUNT NO', 'BRANCH NAME',
            'USER NAME', 'SALES EXECUTIVE NAME', 'CO-ORDINATOR NAME',
            'QUOTATION CO-ORDINATOR NAME', 'INSPECTION CO-ORDINATOR NAME',
            'ENDROSMENT CO-ORDINATOR NAME', 'AGENT TSDS', 'EXIT DATE', 'ID', 'LOCATION'
        ];
        const rows = targetAgents.map(a => [
            a.status,
            a.agentCode,
            `"${(a.fullName || '').replace(/"/g, '""')}"`,
            `"${(a.address || '').replace(/"/g, '""')}"`,
            a.email || '',
            a.gender || 'MALE',
            a.aadharNo || '-',
            a.panNo || '-',
            `"${a.bankName || ''}"`,
            `"${a.accHolderName || a.fullName || ''}"`,
            a.bankBranch || '',
            a.ifscCode || '-',
            a.accountNo || '-',
            a.branchName || a.branch || 'BARAMATI',
            a.userName || '',
            `"${a.salesExecutive || ''}"`,
            `"${a.coordinator || ''}"`,
            `"${a.quotationCoordinator || ''}"`,
            `"${a.inspectionCoordinator || ''}"`,
            `"${a.endorsementCoordinator || ''}"`,
            a.agentTsds || '2',
            a.exitDate || '',
            a.erpId || a.id,
            a.location || a.branch || 'BARAMATI'
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `reliable_agents_${agentViewFilter.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Exported ${targetAgents.length} ${agentViewFilter.toLowerCase()} agents to CSV`);
    };

    // ==========================================
    // VIEW EMPLOYEE ERP STATE & HANDLERS (37 COLUMNS)
    // ==========================================
    const [empViewFilter, setEmpViewFilter] = useState<'ACTIVE' | 'INACTIVE'>('ACTIVE');
    const [empSearchQuery, setEmpSearchQuery] = useState('');
    const [showEmpPasswords, setShowEmpPasswords] = useState(false);
    const empTableScrollRef = useRef<HTMLDivElement>(null);

    const scrollEmpTable = (amount: number) => {
        if (empTableScrollRef.current) {
            empTableScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    const scrollEmpTableToEdge = (edge: 'start' | 'end') => {
        if (empTableScrollRef.current) {
            empTableScrollRef.current.scrollTo({
                left: edge === 'start' ? 0 : empTableScrollRef.current.scrollWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleToggleEmpStatus = (id: number) => {
        setEmployees(prev => prev.map(e => {
            if (e.id === id) {
                const nextStatus: 'ACTIVE' | 'INACTIVE' = e.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
                showToast(`Employee ${e.fullName} marked as ${nextStatus}`);
                return { ...e, status: nextStatus };
            }
            return e;
        }));
    };

    const handleDeleteEmp = (id: number) => {
        const target = employees.find(e => e.id === id);
        if (target && window.confirm(`Are you sure you want to delete employee ${target.fullName} (${target.empCode})?`)) {
            setEmployees(prev => prev.filter(e => e.id !== id));
            showToast(`Employee ${target.fullName} deleted successfully`);
        }
    };

    const handleExportEmployees = () => {
        const targetEmps = employees.filter(e => e.status === empViewFilter);
        const headers = [
            'EMP CODE', 'EMPLOYEE NAME', 'ADDRESS', 'GENDER', 'MARITAL STATUS',
            'OFFICE NO', 'MOBLIE NO', 'EMAIL ID', 'PAN NO', 'AADHAR NO',
            'BANK NAME', 'BANK BRANCH', 'IFSC CODE', 'ACCOUNT NO', 'BRANCH NAME',
            'USER NAME', 'CO-ORDINATOR NAME', 'QUOTATION CO-ORDINATOR NAME',
            'INSPECTION CO-ORDINATOR NAME', 'ENDROSMENT CO-ORDINATOR NAME',
            'LOCATION HEAD NAME', 'BUSINESS PROCESS', 'LINE OF BUSINESS',
            'FUNCTION TYPE', 'DESIGNATION', 'CLASS', 'REPORTING', 'JOINING DATE',
            'DOCS STATUS', 'ID', 'EXECUTIVE TYPE', 'DATE OF BIRTH', 'STATUS', 'EXIT DATE'
        ];
        const rows = targetEmps.map(e => [
            e.empCode,
            `"${(e.fullName || '').replace(/"/g, '""')}"`,
            `"${(e.address || '').replace(/"/g, '""')}"`,
            e.gender || 'MALE',
            e.maritalStatus || 'MARRIED',
            e.officeNo || '',
            e.mobile || '',
            e.email || '',
            e.panNo || '-',
            e.aadharNo || '-',
            `"${e.bankName || ''}"`,
            e.bankBranch || '',
            e.ifscCode || '-',
            e.accountNo || '-',
            e.branchName || e.branch || 'BARAMATI',
            e.userName || '',
            `"${e.coordinator || '-'}"`,
            `"${e.quotationCoordinator || '-'}"`,
            `"${e.inspectionCoordinator || '-'}"`,
            `"${e.endorsementCoordinator || '-'}"`,
            `"${e.locationHead || '-'}"`,
            e.businessProcess || '-',
            e.lineOfBusiness || '-',
            e.functionType || 'OPERATIONS',
            `"${e.designation || ''}"`,
            e.employeeClass || 'CLASS 5',
            `"${e.reporting || ''}"`,
            e.joiningDate || e.doj || '',
            e.docsStatus || 'NA',
            e.erpId || e.id,
            e.executiveType || 'OPERATIONAL SUPPORT',
            e.dateOfBirth || '',
            e.status,
            e.exitDate || ''
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `reliable_employees_${empViewFilter.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Exported ${targetEmps.length} ${empViewFilter.toLowerCase()} employees to CSV`);
    };

    const initialAgentInfoState = {
        // Agent Details
        branch: '',
        role: 'AGENT',
        agentCode: 'AGT3100',
        salesExecutive: '',
        coordinator: '',
        quotationCoordinator: '',
        inspectionCoordinator: '',
        endorsementCoordinator: '',
        dateOfJoining: '',
        agentTds: '',
        campaign: '',
        location: '',
        category: '',
        pospType: '',
        pospName: '',
        franchiseCode: 'RA',

        // Personal Details
        firstName: '',
        middleName: '',
        lastName: '',
        nickName: '',
        gender: '',
        mobile: '',
        alternateMobile: '',
        aadharNo: '',
        addressLine1: '',
        addressLine2: '',
        state: '',
        district: '',
        taluka: 'NA',
        pincode: '',
        email: '',
        panNo: '',

        // Bank Details - Self Details
        bankName: '',
        accountHolderName: '',
        bankBranch: '',
        ifscCode: '',
        bankAccountNo: '',

        // Bank Details - Other Account Details
        otherBankName: '',
        otherAccountHolderName: '',
        otherBankBranch: '',
        otherIfscCode: '',
        otherBankAccountNo: '',

        // Login Details
        username: '',
        password: '',
        rePassword: '',

        // KYC File names
        aadharFront: '',
        aadharBack: '',
        panCard: '',
        cancelCheque1: '',
        cancelCheque2: '',
        passportPhoto: '',
    };

    const [agentInfoForm, setAgentInfoForm] = useState(initialAgentInfoState);
    const [agentUsernameChecked, setAgentUsernameChecked] = useState<boolean | null>(null);

    const handleCheckAgentUsername = () => {
        if (!agentInfoForm.username.trim()) {
            showToast('Please enter a username to check');
            return;
        }
        const exists = agents.some(a => a.fullName.toLowerCase().includes(agentInfoForm.username.toLowerCase()) || a.agentCode.toLowerCase() === agentInfoForm.username.toLowerCase());
        if (exists) {
            setAgentUsernameChecked(false);
            showToast(`Username "${agentInfoForm.username}" is already taken`);
        } else {
            setAgentUsernameChecked(true);
            showToast(`Username "${agentInfoForm.username}" is available!`);
        }
    };

    const handleAgentFileChange = (field: 'aadharFront' | 'aadharBack' | 'panCard' | 'cancelCheque1' | 'cancelCheque2' | 'passportPhoto', file?: File) => {
        if (file) {
            setAgentInfoForm(prev => ({ ...prev, [field]: file.name }));
            showToast(`Selected file: ${file.name}`);
        } else {
            setAgentInfoForm(prev => ({ ...prev, [field]: '' }));
        }
    };

    const handleSaveAgentInfo = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agentInfoForm.branch) {
            showToast('Please select Branch Name');
            return;
        }
        if (!agentInfoForm.role) {
            showToast('Please select Role Name');
            return;
        }
        if (!agentInfoForm.firstName.trim()) {
            showToast('Please enter First Name');
            return;
        }
        if (!agentInfoForm.lastName.trim()) {
            showToast('Please enter Last Name');
            return;
        }
        if (!agentInfoForm.mobile.trim()) {
            showToast('Please enter Mobile No');
            return;
        }
        if (agentInfoForm.password && agentInfoForm.rePassword && agentInfoForm.password !== agentInfoForm.rePassword) {
            showToast('Password and Re-Password do not match');
            return;
        }

        const fullName = `${agentInfoForm.firstName.trim()} ${agentInfoForm.middleName ? agentInfoForm.middleName.trim() + ' ' : ''}${agentInfoForm.lastName.trim()}`.toUpperCase();
        const code = agentInfoForm.agentCode.trim() || `AGT${3100 + agents.length + 1}`;

        const newAgent: AgentItem = {
            id: Date.now(),
            agentCode: code,
            fullName,
            type: (agentInfoForm.pospType ? 'POSP' : 'DIRECT') as any,
            branch: agentInfoForm.branch,
            mobile: agentInfoForm.mobile || '9822145678',
            email: agentInfoForm.email || `${code.toLowerCase()}@reliable.in`,
            panNo: agentInfoForm.panNo || 'ABCDE1234F',
            kycStatus: 'VERIFIED',
            totalPolicies: 0,
            regDate: agentInfoForm.dateOfJoining || new Date().toLocaleDateString('en-GB'),
            status: 'ACTIVE'
        };

        setAgents(prev => [newAgent, ...prev]);
        showToast(`Agent ${fullName} registered successfully!`);
        setAgentInfoForm(initialAgentInfoState);
        setAgentUsernameChecked(null);
    };

    const handleResetAgentInfo = () => {
        setAgentInfoForm(initialAgentInfoState);
        setAgentUsernameChecked(null);
        showToast('Agent registration form has been reset.');
    };

    // ==========================================
    // 5: BANK BENEFICIARY STATE
    // ==========================================
    const [beneficiaries, setBeneficiaries] = useState<BankBeneficiaryItem[]>([
        // FRANCHISE (From screenshots 1 & 2)
        {
            id: 1,
            entityCode: 'FA1016',
            beneficiaryName: 'STANDARD OFFICE FRANCHISE',
            entityType: 'FRANCHISE',
            branchName: 'FRANCHISES',
            address: 'NA,NA,PUNE,MAHARASHTRA-444410',
            mobile: '9623345512',
            bankName: 'HDFC BANK',
            branch: 'PUNE',
            accountNumber: '50200012345678',
            ifscCode: 'HDFC0000123',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 2,
            entityCode: 'FA1018',
            beneficiaryName: 'MOHAN BALU KHAIRNAR',
            entityType: 'FRANCHISE',
            branchName: 'FRANCHISES',
            address: 'KUKANE,, NASHIK 423105,NASHIK,MAHARASHTRA-423105',
            mobile: '9764123890',
            bankName: 'STATE BANK OF INDIA',
            branch: 'NASHIK',
            accountNumber: '30124567891',
            ifscCode: 'SBIN0001234',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 3,
            entityCode: 'FA1028',
            beneficiaryName: 'MALLIKARJUN HANUMANT KALAPNUR',
            entityType: 'FRANCHISE',
            branchName: 'FRANCHISES',
            address: 'VANITA BUILDING,BATTAD HOSPITAL,PANCHSHIL ROAD,PUNE,MAHARASHTRA-413801',
            mobile: '9765112233',
            bankName: 'AXIS BANK',
            branch: 'PUNE',
            accountNumber: '918010023456789',
            ifscCode: 'UTIB0000234',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 4,
            entityCode: 'FA1029',
            beneficiaryName: 'SAVITA PRABHAKAR BAGUL',
            entityType: 'FRANCHISE',
            branchName: 'FRANCHISES',
            address: '350 WARD NO 5, SAMTA NAGAR ,KASARA,THANE,SHAHAPUR,THANE,MAHARASHTRA-421602',
            mobile: '9503223344',
            bankName: 'BANK OF BARODA',
            branch: 'KASARA',
            accountNumber: '10510100023456',
            ifscCode: 'BARB0KASARA',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 5,
            entityCode: 'FA1031',
            beneficiaryName: 'PRAJAKTA SWAPNIL PANSE',
            entityType: 'FRANCHISE',
            branchName: 'FRANCHISES',
            address: 'B-6 /201,ATULNAGAR,MUMBAI BANGLOREHIGHWAY,NEAR VINAYAK HOSPITAL ,WARJE,PUNE,MAHARASHTRA-411058',
            mobile: '9421887766',
            bankName: 'ICICI BANK',
            branch: 'WARJE PUNE',
            accountNumber: '045601567890',
            ifscCode: 'ICIC0000456',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 6,
            entityCode: 'FA1032',
            beneficiaryName: 'PRACHI SWAPNIL PANDULE',
            entityType: 'FRANCHISE',
            branchName: 'FRANCHISES',
            address: '5022,SHERKAR GALLI,BARATOTI KARANJA,,MALIWADA NAGAR,AHMEDNAGAR,MAHARASHTRA-414001',
            mobile: '9503998877',
            bankName: 'IDBI BANK',
            branch: 'AHMEDNAGAR',
            accountNumber: '471104000234567',
            ifscCode: 'IBKL0000471',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 7,
            entityCode: 'FA1033',
            beneficiaryName: 'PRADEEP SAMBHAJI JADHAV',
            entityType: 'FRANCHISE',
            branchName: 'FRANCHISES',
            address: 'S/O SAMBHAJI JADHAV, NEAR KARKHANA ,KAYGAON,GANGAPUR ,AURANGABAD,MAHARASHTRA-431110',
            mobile: '8380112233',
            bankName: 'BANK OF MAHARASHTRA',
            branch: 'GANGAPUR',
            accountNumber: '60050123456',
            ifscCode: 'MAHB0000123',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 8,
            entityCode: 'FA1034',
            beneficiaryName: 'VIKAS PRATAP KALE',
            entityType: 'FRANCHISE',
            branchName: 'FRANCHISES',
            address: 'A/P - KHADAKI (SHANKAR),TAL - DAUND DIST - PUNE,PUNE,MAHARASHTRA-413108',
            mobile: '7675112244',
            bankName: 'THE BARAMATI SAHAKARI BANK LTD',
            branch: 'DAUND',
            accountNumber: '160987',
            ifscCode: 'BARA0000002',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },

        // AGENT
        {
            id: 9,
            entityCode: 'AGT0605',
            beneficiaryName: 'SURESH BABURAO JADHAV',
            entityType: 'AGENT',
            branchName: 'BARAMATI',
            address: 'A/P MALIEGAON TAL BARAMATI PUNE 413115',
            mobile: '9822334455',
            bankName: 'HDFC BANK',
            branch: 'BARAMATI',
            accountNumber: '50100451234567',
            ifscCode: 'HDFC0000123',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 10,
            entityCode: 'AGT0875',
            beneficiaryName: 'ANITA VIJAY SHINDE',
            entityType: 'AGENT',
            branchName: 'PUNE',
            address: 'FLAT NO 402, KOTHRUD, PUNE 411038',
            mobile: '9890112233',
            bankName: 'ICICI BANK',
            branch: 'KOTHRUD',
            accountNumber: '000701554433',
            ifscCode: 'ICIC0000007',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 11,
            entityCode: 'AGT1022',
            beneficiaryName: 'DINESH POPAT MORE',
            entityType: 'AGENT',
            branchName: 'KARAD',
            address: 'NEAR BUS STAND, KARAD 415110',
            mobile: '9422556677',
            bankName: 'AXIS BANK',
            branch: 'KARAD',
            accountNumber: '918020011223344',
            ifscCode: 'UTIB0000456',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 12,
            entityCode: 'AGT1045',
            beneficiaryName: 'KAVITA RAJESH DESHMUKH',
            entityType: 'AGENT',
            branchName: 'PUNE CAMP',
            address: 'CAMP AREA, M.G. ROAD, PUNE 411001',
            mobile: '9822998877',
            bankName: 'STATE BANK OF INDIA',
            branch: 'PUNE CAMP',
            accountNumber: '309988776655',
            ifscCode: 'SBIN0001234',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 13,
            entityCode: 'AGT1089',
            beneficiaryName: 'BALASAHEB K. SHINDE',
            entityType: 'AGENT',
            branchName: 'AHILYANAGAR',
            address: 'STATION ROAD, AHILYANAGAR 414001',
            mobile: '9850114422',
            bankName: 'BANK OF MAHARASHTRA',
            branch: 'AHILYANAGAR',
            accountNumber: '60123456789',
            ifscCode: 'MAHB0000789',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },

        // FRANCHISE AGENT (Including Goatamchand Gulabchand Bardiya from ERP Screenshot!)
        {
            id: 14,
            entityCode: 'FA-AGT03',
            beneficiaryName: 'GOATAMCHAND GULABCHAND BARDIYA',
            entityType: 'FRANCHISE_AGENT',
            branchName: 'SANGLI',
            address: 'MARKET YARD, NEAR GANPATI TEMPLE, SANGLI 416416',
            mobile: '9822445566',
            bankName: 'UNION BANK OF INDIA',
            branch: 'SANGLI',
            accountNumber: '520101060064354',
            ifscCode: 'UBIN0921131',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 15,
            entityCode: 'FA-AGT01',
            beneficiaryName: 'GANESH TUKARAM RAUT',
            entityType: 'FRANCHISE_AGENT',
            branchName: 'PUNE',
            address: 'WARJE HIGHWAY NEAR BRIDGE, PUNE 411058',
            mobile: '9765223344',
            bankName: 'STATE BANK OF INDIA',
            branch: 'WARJE',
            accountNumber: '30451239871',
            ifscCode: 'SBIN0004561',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        },
        {
            id: 16,
            entityCode: 'FA-AGT02',
            beneficiaryName: 'POOJA MAHESH DESHMUKH',
            entityType: 'FRANCHISE_AGENT',
            branchName: 'AHMEDNAGAR',
            address: 'MALIWADA ROAD, AHMEDNAGAR 414001',
            mobile: '9850445566',
            bankName: 'BANK OF BARODA',
            branch: 'AHMEDNAGAR',
            accountNumber: '10510100087654',
            ifscCode: 'BARB0AHMEDN',
            verificationStatus: 'VERIFIED',
            otherAccHolderName: '-',
            otherBankName: '-',
            otherBranch: '-',
            otherAccountNo: '-',
            otherIfscCode: '-'
        }
    ]);
    const [beneficiaryTypeFilter, setBeneficiaryTypeFilter] = useState<'AGENT' | 'FRANCHISE' | 'FRANCHISE_AGENT'>('FRANCHISE');
    const [beneficiarySearchQuery, setBeneficiarySearchQuery] = useState('');
    const [viewingBeneficiary, setViewingBeneficiary] = useState<BankBeneficiaryItem | null>(null);
    const [selectedDocPreview, setSelectedDocPreview] = useState<{ title: string; type: string } | null>(null);
    const beneficiaryTableScrollRef = useRef<HTMLDivElement>(null);

    const scrollBeneficiaryTable = (amount: number) => {
        if (beneficiaryTableScrollRef.current) {
            beneficiaryTableScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    const scrollBeneficiaryTableToEdge = (edge: 'start' | 'end') => {
        if (beneficiaryTableScrollRef.current) {
            beneficiaryTableScrollRef.current.scrollTo({
                left: edge === 'start' ? 0 : beneficiaryTableScrollRef.current.scrollWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleExportBeneficiaries = () => {
        const targetItems = beneficiaries.filter(b => b.entityType === beneficiaryTypeFilter);
        const headers = ['CODE', 'NAME', 'BRANCH NAME', 'ADDRESS', 'MOBILE NO', 'BANK NAME', 'BANK BRANCH', 'ACCOUNT NO', 'IFSC CODE', 'STATUS'];
        const rows = targetItems.map(b => [
            b.entityCode,
            `"${(b.beneficiaryName || '').replace(/"/g, '""')}"`,
            `"${(b.branchName || b.branch || '').replace(/"/g, '""')}"`,
            `"${(b.address || '').replace(/"/g, '""')}"`,
            b.mobile || '',
            `"${b.bankName || ''}"`,
            `"${b.branch || ''}"`,
            b.accountNumber || '',
            b.ifscCode || '',
            b.verificationStatus || 'VERIFIED'
        ]);
        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `reliable_bank_beneficiaries_${beneficiaryTypeFilter.toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast(`Exported ${targetItems.length} ${beneficiaryTypeFilter.toLowerCase()} beneficiaries to CSV`);
    };

    const [beneficiaryForm, setBeneficiaryForm] = useState({
        beneficiaryName: '',
        entityType: 'FRANCHISE' as 'AGENT' | 'FRANCHISE' | 'FRANCHISE_AGENT',
        entityCode: '',
        bankName: 'HDFC BANK',
        accountNumber: '',
        ifscCode: '',
        accountType: 'SAVINGS' as const,
        branch: 'PUNE',
        branchName: 'FRANCHISES',
        address: '',
        mobile: ''
    });

    // ==========================================
    // 6: DELETE VEHICLE STATE
    // ==========================================
    const [vehicles, setVehicles] = useState<VehicleRecord[]>([
        {
            id: 1,
            erpId: 427,
            custName: 'RAVINDRA APPASOBELANKE',
            regNo: 'MH09BX2340',
            chassisNo: 'NA',
            engineNo: 'NA',
            mfgMonth: 'NA',
            mfgYear: '2011',
            exShowroomPrice: '-',
            fuelType: 'PETROL',
            vehTypeName: 'CAR',
            vehSubTypeName: 'NA',
            makeName: 'TATA',
            modelName: 'INDICA VISTA',
            variance: 'MACHISMO 350',
            vehiclePurDate: '01/04/2020 00:00:00',
            seatsCapacity: '5',
            transTonnageCapacity: '-',
            vehicleWeight: '1248',
            vehicleRegDate: '12/06/2020 14:18:00',
            rtoLocation: 'MH-09 KOLHAPUR',
            branchName: 'BARAMATI',
            makeModel: 'TATA INDICA VISTA',
            vehicleClass: '4-WHEELER PRIVATE CAR'
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
            transTonnageCapacity: '-',
            vehicleWeight: '980',
            vehicleRegDate: '20/05/2018 11:30:00',
            rtoLocation: 'MH-12 PUNE',
            branchName: 'BARAMATI',
            makeModel: 'MARUTI SUZUKI SWIFT',
            vehicleClass: '4-WHEELER PRIVATE CAR'
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
            branchName: 'PUNE',
            makeModel: 'MAHINDRA BOLERO',
            vehicleClass: 'GOODS CARRYING VEHICLE'
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
            transTonnageCapacity: '-',
            vehicleWeight: '144',
            vehicleRegDate: '18/03/2019 12:15:00',
            rtoLocation: 'MH-42 BARAMATI',
            branchName: 'BARAMATI',
            makeModel: 'BAJAJ PULSAR 150',
            vehicleClass: '2-WHEELER MOTORCYCLE'
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
            transTonnageCapacity: '-',
            vehicleWeight: '1340',
            vehicleRegDate: '28/11/2022 15:45:00',
            rtoLocation: 'MH-16 AHMEDNAGAR',
            branchName: 'AHILYANAGAR',
            makeModel: 'HYUNDAI CRETA SX',
            vehicleClass: '4-WHEELER PRIVATE CAR'
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
            branchName: 'CHHATRAPATI SAMBHAJINAGAR',
            makeModel: 'TATA ACE GOLD',
            vehicleClass: 'GOODS CARRYING VEHICLE'
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
            transTonnageCapacity: '-',
            vehicleWeight: '107',
            vehicleRegDate: '10/07/2021 13:00:00',
            rtoLocation: 'MH-13 SOLAPUR',
            branchName: 'AKLUJ',
            makeModel: 'HONDA ACTIVA 6G',
            vehicleClass: '2-WHEELER SCOOTER'
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
            transTonnageCapacity: '-',
            vehicleWeight: '1850',
            vehicleRegDate: '20/09/2023 17:10:00',
            rtoLocation: 'MH-11 SATARA',
            branchName: 'SATARA',
            makeModel: 'MAHINDRA SCORPIO-N',
            vehicleClass: '4-WHEELER PRIVATE CAR'
        }
    ]);
    const [selectedVehicleToDelete, setSelectedVehicleToDelete] = useState<VehicleRecord | null>(null);
    const [deleteReason, setDeleteReason] = useState('Duplicate registration entry');
    const [vehCustSearchQuery, setVehCustSearchQuery] = useState('');
    const [vehNoSearchQuery, setVehNoSearchQuery] = useState('');
    const vehTableScrollRef = useRef<HTMLDivElement>(null);

    const scrollVehTable = (amount: number) => {
        if (vehTableScrollRef.current) {
            vehTableScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    const scrollVehTableToEdge = (edge: 'start' | 'end') => {
        if (vehTableScrollRef.current) {
            vehTableScrollRef.current.scrollTo({
                left: edge === 'start' ? 0 : vehTableScrollRef.current.scrollWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleExportVehicles = () => {
        const headers = [
            'ID', 'CUSTNAME', 'REGISTRATIONNO', 'CHAISENO', 'ENGINENO', 'MFGMONTH', 'MFGYEAR',
            'EX_SHOWROOMPRICE', 'FUELTYPE', 'VEH_TYPE_NAME', 'VEH_SUB_TYPE_NAME', 'MAKE_NAME',
            'MODEL_NAME', 'VARIANCE', 'VEHICLEPURDATE', 'SEATSCAPACITY', 'TRANSTONNAGECAPACITY',
            'VEHICLEWEIGHT', 'VEHICLEREGDATE', 'RTOLOCATION', 'BRANCHNAME'
        ];
        const rows = vehicles.map(v => [
            v.erpId || v.id,
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
        showToast(`Exported ${vehicles.length} vehicle records to CSV`);
    };

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
        <div className="w-full max-w-full flex flex-col space-y-5 min-w-0">
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
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-[8px] text-[14px] font-semibold hover:bg-[#1D4ED8] shadow-sm transition-all cursor-pointer border-none"
                        >
                            <Plus size={16} /> Register New Employee
                        </button>
                    ) : activeTab === 'agent' || activeTab === 'view-agent' ? (
                        <button
                            onClick={() => {
                                setAgentForm({ fullName: '', type: 'POSP', branch: 'BARAMATI', mobile: '', email: '', panNo: '' });
                                setModalType('AGENT');
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-[8px] text-[14px] font-semibold hover:bg-[#1D4ED8] shadow-sm transition-all cursor-pointer border-none"
                        >
                            <Plus size={16} /> Register New Agent
                        </button>
                    ) : activeTab === 'bank-beneficiary' ? (
                        <button
                            onClick={() => {
                                setBeneficiaryForm({ beneficiaryName: '', entityType: 'AGENT', entityCode: '', bankName: 'HDFC BANK', accountNumber: '', ifscCode: '', accountType: 'SAVINGS', branch: '' });
                                setModalType('BENEFICIARY');
                            }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-[8px] text-[14px] font-semibold hover:bg-[#1D4ED8] shadow-sm transition-all cursor-pointer border-none"
                        >
                            <Plus size={16} /> Add Beneficiary
                        </button>
                    ) : activeTab === 'delete-vehicle' ? (
                        <button
                            onClick={() => showToast('Vehicle database synced')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-[8px] text-[14px] font-semibold hover:bg-slate-900 shadow-sm transition-all cursor-pointer border-none"
                        >
                            <RefreshCw size={16} /> Refresh Vehicle List
                        </button>
                    ) : (
                        <button
                            onClick={() => showToast('Deactivated agent records exported as CSV')}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-[8px] text-[14px] font-semibold hover:bg-slate-900 shadow-sm transition-all cursor-pointer border-none"
                        >
                            <Download size={16} /> Export List
                        </button>
                    )
                }
            />

            {/* Horizontal Tabs - Matching User Master */}
            <UnderlineTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
            />            {/* TAB 1: EMPLOYEE REGISTRATION FORM MATCHING ERP adm_EmployeeInformation.aspx */}
            {activeTab === 'employee' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-6">
                    <form onSubmit={handleSaveEmpInfo} className="space-y-6 w-full min-w-0">
                        {/* 1. » Employee Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>Employee Details
                            </div>

                            <div className="space-y-5">
                                {/* Row 1: Branch & Role */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Branch</label>
                                        <div className="relative">
                                            <select
                                                value={empInfoForm.branch}
                                                onChange={(e) => setEmpInfoForm({ ...empInfoForm, branch: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Branch Name--</option>
                                                {empBranchOptions.map(b => (
                                                    <option key={b} value={b}>{b}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Role</label>
                                        <div className="relative">
                                            <select
                                                value={empInfoForm.role}
                                                onChange={(e) => setEmpInfoForm({ ...empInfoForm, role: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Role Name--</option>
                                                {empRoleOptions.map(r => (
                                                    <option key={r} value={r}>{r}</option>
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

                                {/* Row 2: Emp Code & Date Of Joining */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Emp Code</label>
                                        <input
                                            type="text"
                                            placeholder=""
                                            value={empInfoForm.empCode}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, empCode: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Date Of Joining</label>
                                        <input
                                            type="text"
                                            placeholder="dd/MM/yyyy"
                                            value={empInfoForm.dateOfJoining}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, dateOfJoining: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Executive Type */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Executive Type</label>
                                        <div className="relative">
                                            <select
                                                value={empInfoForm.executiveType}
                                                onChange={(e) => setEmpInfoForm({ ...empInfoForm, executiveType: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--SELECT EXECTIVE TYPE--</option>
                                                {empExecutiveTypeOptions.map(t => (
                                                    <option key={t} value={t}>{t}</option>
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
                        </div>

                        {/* 2. » Personal Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>Personal Details
                            </div>

                            <div className="space-y-5">
                                {/* Row 1: First Name, Middle Name, Last Name */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            First Name <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={empInfoForm.firstName}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, firstName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Middle Name <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={empInfoForm.middleName}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, middleName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Last Name <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={empInfoForm.lastName}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, lastName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: DOB, Gender, Marital Status */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Date of Birth <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="dd/mm/yyyy"
                                            value={empInfoForm.dateOfBirth}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, dateOfBirth: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Gender</label>
                                        <div className="relative">
                                            <select
                                                value={empInfoForm.gender}
                                                onChange={(e) => setEmpInfoForm({ ...empInfoForm, gender: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">SELECT</option>
                                                {empGenderOptions.map(g => (
                                                    <option key={g} value={g}>{g.toUpperCase()}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Marital Status</label>
                                        <div className="relative">
                                            <select
                                                value={empInfoForm.maritalStatus}
                                                onChange={(e) => setEmpInfoForm({ ...empInfoForm, maritalStatus: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">SELECT</option>
                                                {empMaritalStatusOptions.map(m => (
                                                    <option key={m} value={m}>{m.toUpperCase()}</option>
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

                                {/* Row 3: Spacers & Mobile Numbers matching Screenshot 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="hidden md:block">
                                        {/* Blank column as in screenshot 2 */}
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">office Mob No</label>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            value={empInfoForm.officeMobile}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, officeMobile: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Mobile No</label>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            value={empInfoForm.mobile}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, mobile: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 4: AddressLine1 & AddressLine2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">AddressLine1</label>
                                        <input
                                            type="text"
                                            value={empInfoForm.addressLine1}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, addressLine1: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">AddressLine2</label>
                                        <input
                                            type="text"
                                            value={empInfoForm.addressLine2}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, addressLine2: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 5: State, District, Taluka */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">State</label>
                                        <div className="relative">
                                            <select
                                                value={empInfoForm.state}
                                                onChange={(e) => setEmpInfoForm({ ...empInfoForm, state: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select State--</option>
                                                {empStateOptions.map(s => (
                                                    <option key={s} value={s}>{s}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">District</label>
                                        <div className="relative">
                                            <select
                                                value={empInfoForm.district}
                                                onChange={(e) => setEmpInfoForm({ ...empInfoForm, district: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select District--</option>
                                                {empDistrictOptions.map(d => (
                                                    <option key={d} value={d}>{d}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Taluka</label>
                                        <div className="relative">
                                            <select
                                                value={empInfoForm.taluka}
                                                onChange={(e) => setEmpInfoForm({ ...empInfoForm, taluka: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                {empTalukaOptions.map(t => (
                                                    <option key={t} value={t}>{t}</option>
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

                                {/* Row 6: PAN No, Aadhar No, EmailID */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">PAN No</label>
                                        <input
                                            type="text"
                                            maxLength={10}
                                            value={empInfoForm.panNo}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, panNo: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Aadhar No</label>
                                        <input
                                            type="text"
                                            maxLength={12}
                                            value={empInfoForm.aadharNo}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, aadharNo: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">EmailID</label>
                                        <input
                                            type="email"
                                            value={empInfoForm.email}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, email: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. » Bank Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>Bank Details
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Bank Name</label>
                                    <div className="relative">
                                        <select
                                            value={empInfoForm.bankName}
                                            onChange={(e) => setEmpInfoForm({ ...empInfoForm, bankName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                        >
                                            <option value="">--Select Bank Type--</option>
                                            {empBankOptions.map(b => (
                                                <option key={b} value={b}>{b}</option>
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
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Bank Branch</label>
                                    <input
                                        type="text"
                                        value={empInfoForm.bankBranch}
                                        onChange={(e) => setEmpInfoForm({ ...empInfoForm, bankBranch: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">IFSC Code</label>
                                    <input
                                        type="text"
                                        maxLength={11}
                                        value={empInfoForm.ifscCode}
                                        onChange={(e) => setEmpInfoForm({ ...empInfoForm, ifscCode: e.target.value.toUpperCase() })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Bank Account No</label>
                                    <input
                                        type="text"
                                        value={empInfoForm.bankAccountNo}
                                        onChange={(e) => setEmpInfoForm({ ...empInfoForm, bankAccountNo: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 4. » User Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>User Details
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Username</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={empInfoForm.username}
                                            onChange={(e) => {
                                                setEmpInfoForm({ ...empInfoForm, username: e.target.value });
                                                setUsernameChecked(null);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleCheckUsername}
                                            className="px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white text-[13px] font-semibold rounded-[6px] shadow-sm transition-colors cursor-pointer border-none whitespace-nowrap"
                                        >
                                            Check
                                        </button>
                                    </div>
                                    {usernameChecked === true && (
                                        <p className="text-[11px] text-emerald-600 mt-1 font-medium">✓ Username is available</p>
                                    )}
                                    {usernameChecked === false && (
                                        <p className="text-[11px] text-rose-600 mt-1 font-medium">✕ Username is already taken</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Password</label>
                                    <input
                                        type="password"
                                        value={empInfoForm.password}
                                        onChange={(e) => setEmpInfoForm({ ...empInfoForm, password: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Re-Password</label>
                                    <input
                                        type="password"
                                        value={empInfoForm.rePassword}
                                        onChange={(e) => setEmpInfoForm({ ...empInfoForm, rePassword: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 5. » KYC Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>KYC Details
                            </div>

                            <div className="space-y-4 max-w-lg">
                                {/* Adhar Card Front */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">Adhar Card</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleEmpFileChange('aadharFront', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {empInfoForm.aadharFront || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Adhar Card Back */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">Adhar Card</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleEmpFileChange('aadharBack', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {empInfoForm.aadharBack || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Pan Card */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">Pan Card</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleEmpFileChange('panCard', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {empInfoForm.panCard || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Cancel Cheque 1 */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">CANCEL CHEQUE</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleEmpFileChange('cancelCheque1', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {empInfoForm.cancelCheque1 || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Cancel Cheque 2 */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">CANCEL CHEQUE</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleEmpFileChange('cancelCheque2', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {empInfoForm.cancelCheque2 || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Buttons: Save (Blue) & Reset (Orange) matching Screenshot 4 */}
                        <div className="flex items-center justify-center gap-4 pt-2 pb-6">
                            <button
                                type="submit"
                                className="px-9 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none min-w-[100px]"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleResetEmpInfo}
                                className="px-9 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none min-w-[100px]"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* TAB 2: AGENT REGISTRATION FORM MATCHING ERP adm_AgentMaster.aspx */}
            {activeTab === 'agent' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-6">
                    <form onSubmit={handleSaveAgentInfo} className="space-y-6 w-full min-w-0">
                        {/* 1. » Agent Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>Agent Details
                            </div>

                            <div className="space-y-5">
                                {/* Row 1: Branch, Role, Agent Code */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Branch <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.branch}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, branch: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Branch Name--</option>
                                                {empBranchOptions.map(b => (
                                                    <option key={b} value={b}>{b}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Role <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.role}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, role: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                {agentRoleOptions.map(r => (
                                                    <option key={r} value={r}>{r}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Agent Code <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.agentCode}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, agentCode: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Sales Executive, Co-Ordinator, Quotation Co-Ordinator */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Sales Executive <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.salesExecutive}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, salesExecutive: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Sales Executive--</option>
                                                {agentSalesExecutiveOptions.map(se => (
                                                    <option key={se} value={se}>{se}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Co-Ordinator <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.coordinator}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, coordinator: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Coordinate--</option>
                                                {agentCoordinatorOptions.map(co => (
                                                    <option key={co} value={co}>{co}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Quotation Co-Ordinator <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.quotationCoordinator}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, quotationCoordinator: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Quotation Cordinator --</option>
                                                {agentQuotationCoordinatorOptions.map(qc => (
                                                    <option key={qc} value={qc}>{qc}</option>
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

                                {/* Row 3: Inspection Co-Ordinator, Endrosment Co-Ordinator, Date Of Joining */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Inspection Co-Ordinator <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.inspectionCoordinator}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, inspectionCoordinator: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Inspection Cordinator --</option>
                                                {agentInspectionCoordinatorOptions.map(ic => (
                                                    <option key={ic} value={ic}>{ic}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Endrosment Co-Ordinator <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.endorsementCoordinator}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, endorsementCoordinator: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Endrosment Cordinator --</option>
                                                {agentEndorsementCoordinatorOptions.map(ec => (
                                                    <option key={ec} value={ec}>{ec}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Date Of Joining <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="dd/MM/yyyy"
                                            value={agentInfoForm.dateOfJoining}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, dateOfJoining: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 4: Agent Tds, Champaign, Location */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Agent Tds <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.agentTds}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, agentTds: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Champaign <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.campaign}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, campaign: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Champaign--</option>
                                                {agentCampaignOptions.map(c => (
                                                    <option key={c} value={c}>{c}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Location <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.location}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, location: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Location--</option>
                                                {agentLocationOptions.map(l => (
                                                    <option key={l} value={l}>{l}</option>
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

                                {/* Row 5: Category, POSP Type, POSP Name */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Category <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.category}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, category: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Category--</option>
                                                {agentCategoryOptions.map(cat => (
                                                    <option key={cat} value={cat}>{cat}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            POSP Type <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.pospType}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, pospType: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select POSP Type--</option>
                                                {agentPospTypeOptions.map(pt => (
                                                    <option key={pt} value={pt}>{pt}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            POSP Name <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.pospName}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, pospName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 6: Franchise Code */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Franchise Code <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.franchiseCode}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, franchiseCode: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                {agentFranchiseOptions.map(fc => (
                                                    <option key={fc} value={fc}>{fc}</option>
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
                        </div>

                        {/* 2. » Personal Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>Personal Details
                            </div>

                            <div className="space-y-5">
                                {/* Row 1: First Name, Middle Name, Last Name */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            First Name <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.firstName}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, firstName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Middle Name
                                        </label>
                                        <input
                                            type="text"
                                            value={agentInfoForm.middleName}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, middleName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Last Name <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.lastName}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, lastName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 2: Nick Name, Gender, Mobile No, Alternate Mobile No */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Nick Name</label>
                                        <input
                                            type="text"
                                            value={agentInfoForm.nickName}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, nickName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Gender <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.gender}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, gender: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">SELECT</option>
                                                {empGenderOptions.map(g => (
                                                    <option key={g} value={g}>{g.toUpperCase()}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Mobile No <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            maxLength={10}
                                            value={agentInfoForm.mobile}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, mobile: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Alternate Mobile No <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            maxLength={10}
                                            value={agentInfoForm.alternateMobile}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, alternateMobile: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Aadhar No & AddressLine1 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Aadhar No <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={12}
                                            value={agentInfoForm.aadharNo}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, aadharNo: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            AddressLine1 <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.addressLine1}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, addressLine1: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 4: AddressLine2 & State */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            AddressLine2 <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.addressLine2}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, addressLine2: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            State <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.state}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, state: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select State--</option>
                                                {empStateOptions.map(s => (
                                                    <option key={s} value={s}>{s}</option>
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

                                {/* Row 5: District, Taluka, Pin code */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            District <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.district}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, district: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select District--</option>
                                                {empDistrictOptions.map(d => (
                                                    <option key={d} value={d}>{d}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Taluka</label>
                                        <div className="relative">
                                            <select
                                                value={agentInfoForm.taluka}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, taluka: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                {empTalukaOptions.map(t => (
                                                    <option key={t} value={t}>{t}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Pin code <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={6}
                                            value={agentInfoForm.pincode}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, pincode: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Row 6: Email Id, Pan No. */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Email Id <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={agentInfoForm.email}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, email: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Pan No. <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={10}
                                            value={agentInfoForm.panNo}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, panNo: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. » Bank Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>Bank Details
                            </div>

                            {/* Section 1: Self Details */}
                            <div className="mb-6">
                                <h4 className="text-[14px] font-semibold text-slate-800 mb-3">Self Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Bank Name <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                required
                                                value={agentInfoForm.bankName}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, bankName: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Bank Type--</option>
                                                {empBankOptions.map(b => (
                                                    <option key={b} value={b}>{b}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Account Holder Name <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.accountHolderName}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, accountHolderName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Bank Branch <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.bankBranch}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, bankBranch: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            IFSC Code <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={11}
                                            value={agentInfoForm.ifscCode}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, ifscCode: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                            Bank Account No <span className="text-red-500 font-bold">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.bankAccountNo}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, bankAccountNo: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Other Account Details */}
                            <div>
                                <h4 className="text-[14px] font-semibold text-slate-800 mb-3">Other Account Details</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Bank Name</label>
                                        <div className="relative">
                                            <select
                                                value={agentInfoForm.otherBankName}
                                                onChange={(e) => setAgentInfoForm({ ...agentInfoForm, otherBankName: e.target.value })}
                                                className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner cursor-pointer appearance-none pr-9"
                                            >
                                                <option value="">--Select Bank Type--</option>
                                                {empBankOptions.map(b => (
                                                    <option key={b} value={b}>{b}</option>
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
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Account Holder Name</label>
                                        <input
                                            type="text"
                                            value={agentInfoForm.otherAccountHolderName}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, otherAccountHolderName: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Bank Branch</label>
                                        <input
                                            type="text"
                                            value={agentInfoForm.otherBankBranch}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, otherBankBranch: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">IFSC Code</label>
                                        <input
                                            type="text"
                                            maxLength={11}
                                            value={agentInfoForm.otherIfscCode}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, otherIfscCode: e.target.value.toUpperCase() })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] text-slate-700 font-normal mb-1.5">Bank Account No</label>
                                        <input
                                            type="text"
                                            value={agentInfoForm.otherBankAccountNo}
                                            onChange={(e) => setAgentInfoForm({ ...agentInfoForm, otherBankAccountNo: e.target.value })}
                                            className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] font-mono text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 4. » Login Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>Login Details
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                        Username <span className="text-red-500 font-bold">*</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            required
                                            value={agentInfoForm.username}
                                            onChange={(e) => {
                                                setAgentInfoForm({ ...agentInfoForm, username: e.target.value });
                                                setAgentUsernameChecked(null);
                                            }}
                                            className="flex-1 px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleCheckAgentUsername}
                                            className="px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white text-[13px] font-semibold rounded-[6px] shadow-sm transition-colors cursor-pointer border-none whitespace-nowrap"
                                        >
                                            Check
                                        </button>
                                    </div>
                                    {agentUsernameChecked === true && (
                                        <p className="text-[11px] text-emerald-600 mt-1 font-medium">✓ Username is available</p>
                                    )}
                                    {agentUsernameChecked === false && (
                                        <p className="text-[11px] text-rose-600 mt-1 font-medium">✕ Username is already taken</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                        Password <span className="text-red-500 font-bold">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={agentInfoForm.password}
                                        onChange={(e) => setAgentInfoForm({ ...agentInfoForm, password: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1.5">
                                        Re-Password <span className="text-red-500 font-bold">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={agentInfoForm.rePassword}
                                        onChange={(e) => setAgentInfoForm({ ...agentInfoForm, rePassword: e.target.value })}
                                        className="w-full px-4 py-2 bg-white border border-slate-300 rounded-[22px] text-[13px] text-slate-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-inner"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 5. » KYC Details */}
                        <div className="bg-white rounded-[10px] p-6 sm:p-7 shadow-sm border border-slate-200/80">
                            {/* Blue Banner Header */}
                            <div className="bg-brand-primary text-white px-4 py-2.5 rounded-[6px] font-normal text-[15px] flex items-center shadow-xs mb-6">
                                <span className="mr-0.5 text-base font-serif">&raquo;</span>KYC Details
                            </div>

                            <div className="space-y-4 max-w-lg">
                                {/* Adhar Card 1 */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">Adhar Card</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleAgentFileChange('aadharFront', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {agentInfoForm.aadharFront || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Adhar Card 2 */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">Adhar Card</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleAgentFileChange('aadharBack', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {agentInfoForm.aadharBack || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Pan Card */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">Pan Card</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleAgentFileChange('panCard', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {agentInfoForm.panCard || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Cancel Cheque 1 */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">CANCEL CHEQUE</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleAgentFileChange('cancelCheque1', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {agentInfoForm.cancelCheque1 || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Cancel Cheque 2 */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">CANCEL CHEQUE</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleAgentFileChange('cancelCheque2', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {agentInfoForm.cancelCheque2 || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>

                                {/* Passport Photo */}
                                <div>
                                    <label className="block text-[13px] text-slate-700 font-normal mb-1">Passport Photo</label>
                                    <div className="flex items-center gap-3">
                                        <label className="cursor-pointer inline-flex items-center justify-center px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-[4px] text-[12px] font-medium text-slate-700 transition-colors shadow-2xs">
                                            Choose File
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => handleAgentFileChange('passportPhoto', e.target.files?.[0])}
                                            />
                                        </label>
                                        <span className="text-[12px] text-slate-500 italic truncate max-w-xs">
                                            {agentInfoForm.passportPhoto || 'No file chosen'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Buttons: Save (Blue) & Reset (Orange) matching Screenshot 4 */}
                        <div className="flex items-center justify-center gap-4 pt-2 pb-6">
                            <button
                                type="submit"
                                className="px-9 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none min-w-[100px]"
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={handleResetAgentInfo}
                                className="px-9 py-2.5 bg-[#F59E0B] hover:bg-[#D97706] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none min-w-[100px]"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            )}


            {/* TAB 3: VIEW AGENT */}
            {activeTab === 'view-agent' && (
                <div key={activeTab} className="tab-transition-wrapper flex flex-col w-full min-w-0">
                    {/* Top Tab Switcher: Active Agent | Inactive Agent */}
                    <div className="flex justify-center mb-6">
                        <div className="inline-flex rounded-lg overflow-hidden border border-brand-border bg-white shadow-sm p-1 gap-1">
                            <button
                                type="button"
                                onClick={() => setAgentViewFilter('ACTIVE')}
                                className={`px-10 py-2.5 text-[15px] font-bold tracking-wide transition-all cursor-pointer rounded-[6px] flex items-center gap-2.5 ${
                                    agentViewFilter === 'ACTIVE'
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-transparent text-slate-600 hover:text-brand-primary hover:bg-blue-50/60'
                                }`}
                            >
                                <span>Active Agent</span>
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                    agentViewFilter === 'ACTIVE'
                                        ? 'bg-white text-brand-primary'
                                        : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {agents.filter(a => a.status === 'ACTIVE').length}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setAgentViewFilter('INACTIVE')}
                                className={`px-10 py-2.5 text-[15px] font-bold tracking-wide transition-all cursor-pointer rounded-[6px] flex items-center gap-2.5 ${
                                    agentViewFilter === 'INACTIVE'
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-transparent text-slate-600 hover:text-brand-primary hover:bg-blue-50/60'
                                }`}
                            >
                                <span>Inactive Agent</span>
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                    agentViewFilter === 'INACTIVE'
                                        ? 'bg-white text-brand-primary'
                                        : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {agents.filter(a => a.status === 'INACTIVE').length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Toolbar: Search Agent Name Here + Export Button + Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="relative w-72 sm:w-80">
                                <input
                                    type="text"
                                    value={agentSearchQuery}
                                    onChange={(e) => setAgentSearchQuery(e.target.value)}
                                    placeholder="Search Agent Name Here"
                                    className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-[6px] text-[14px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                />
                                {agentSearchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setAgentSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleExportAgents}
                                className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none flex items-center gap-2"
                            >
                                <Download size={15} />
                                <span>Export</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Horizontal Quick Scroll Navigation Controls */}
                            <div className="inline-flex items-center bg-white border border-brand-border rounded-[6px] p-0.5 shadow-sm">
                                <button
                                    type="button"
                                    onClick={() => scrollAgentTableToEdge('start')}
                                    className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded cursor-pointer border-none transition-colors"
                                    title="Scroll to beginning (Column 1: STATUS)"
                                >
                                    <ChevronsLeft size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollAgentTable(-600)}
                                    className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded flex items-center gap-1 cursor-pointer border-none transition-colors"
                                    title="Scroll left by 600px"
                                >
                                    <ChevronLeft size={14} />
                                    <span>Scroll Left</span>
                                </button>
                                <span className="h-4 w-px bg-slate-200 mx-0.5"></span>
                                <button
                                    type="button"
                                    onClick={() => scrollAgentTable(600)}
                                    className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded flex items-center gap-1 cursor-pointer border-none transition-colors"
                                    title="Scroll right by 600px"
                                >
                                    <span>Scroll Right</span>
                                    <ChevronRight size={14} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollAgentTableToEdge('end')}
                                    className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded cursor-pointer border-none transition-colors"
                                    title="Scroll to end (Column 25: LOCATION)"
                                >
                                    <ChevronsRight size={16} />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowPasswords(prev => !prev)}
                                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-blue-50/50 text-slate-700 border border-brand-border rounded-[6px] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                                title="Toggle password masking in table"
                            >
                                {showPasswords ? <EyeOff size={14} className="text-amber-600" /> : <Eye size={14} className="text-brand-primary" />}
                                <span>{showPasswords ? 'Hide Passwords' : 'Show Passwords'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setAgentForm({ fullName: '', type: 'POSP', branch: 'BARAMATI', mobile: '', email: '', panNo: '' });
                                    setModalType('AGENT');
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                            >
                                <Plus size={15} />
                                <span>Add New Agent</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Card Container with Horizontal Scroll */}
                    <div className="bg-white rounded-[8px] border border-brand-border shadow-sm overflow-hidden flex flex-col w-full min-w-0">
                        {/* Notice & Horizontal Scroll Indicator */}
                        <div className="bg-white px-4 py-2.5 border-b border-brand-border flex items-center justify-between text-xs text-brand-navy">
                            <div className="flex items-center gap-2 font-medium">
                                <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                                <span>
                                    Displaying <strong className="text-slate-900">{
                                        agents.filter(a => {
                                            const matchesStatus = a.status === agentViewFilter;
                                            if (!matchesStatus) return false;
                                            if (!agentSearchQuery.trim()) return true;
                                            const q = agentSearchQuery.toLowerCase();
                                            return (
                                                (a.fullName && a.fullName.toLowerCase().includes(q)) ||
                                                (a.agentCode && a.agentCode.toLowerCase().includes(q)) ||
                                                (a.email && a.email.toLowerCase().includes(q)) ||
                                                (a.mobile && a.mobile.includes(q)) ||
                                                (a.branch && a.branch.toLowerCase().includes(q)) ||
                                                (a.address && a.address.toLowerCase().includes(q)) ||
                                                (a.userName && a.userName.toLowerCase().includes(q)) ||
                                                (a.bankName && a.bankName.toLowerCase().includes(q)) ||
                                                (a.salesExecutive && a.salesExecutive.toLowerCase().includes(q))
                                            );
                                        }).length
                                    }</strong> {agentViewFilter.toLowerCase()} agents
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-brand-primary bg-white px-2.5 py-1 rounded border border-blue-200/80 font-medium">
                                <span>↔</span>
                                <span>Use scrollbar below or navigation buttons above to scroll fully across all 25 ERP columns</span>
                            </div>
                        </div>

                        {/* Horizontally scrolling table area */}
                        <div
                            ref={agentTableScrollRef}
                            className="w-full overflow-x-auto min-w-0 erp-horizontal-scrollbar"
                            style={{ maxWidth: '100%' }}
                        >
                            <table className="text-left border-collapse min-w-[5000px] w-full text-[13px]">
                                <thead>
                                    <tr className="bg-brand-primary text-white font-bold text-[12px] tracking-wider uppercase border-b-2 border-blue-700">
                                        {/* Column 1: STATUS */}
                                        <th className="py-3.5 px-3.5 w-[100px] min-w-[100px] text-center border-r border-white/20 whitespace-nowrap">
                                            STATUS
                                        </th>
                                        {/* Column 2: CODE */}
                                        <th className="py-3.5 px-3.5 w-[110px] min-w-[110px] border-r border-white/20 whitespace-nowrap">
                                            CODE
                                        </th>
                                        {/* Column 3: AGENT NAME */}
                                        <th className="py-3.5 px-3.5 w-[270px] min-w-[270px] border-r border-white/20 whitespace-nowrap">
                                            AGENT NAME
                                        </th>
                                        {/* Column 4: ADDRESS */}
                                        <th className="py-3.5 px-3.5 w-[440px] min-w-[440px] border-r border-white/20 whitespace-nowrap">
                                            ADDRESS
                                        </th>
                                        {/* Column 5: EMAILID */}
                                        <th className="py-3.5 px-3.5 w-[290px] min-w-[290px] border-r border-white/20 whitespace-nowrap">
                                            EMAILID
                                        </th>
                                        {/* Column 6: GENDER */}
                                        <th className="py-3.5 px-3.5 w-[110px] min-w-[110px] text-center border-r border-white/20 whitespace-nowrap">
                                            GENDER
                                        </th>
                                        {/* Column 7: ADHAR NO */}
                                        <th className="py-3.5 px-3.5 w-[150px] min-w-[150px] border-r border-white/20 whitespace-nowrap">
                                            ADHAR NO
                                        </th>
                                        {/* Column 8: PAN NO */}
                                        <th className="py-3.5 px-3.5 w-[130px] min-w-[130px] border-r border-white/20 whitespace-nowrap">
                                            PAN NO
                                        </th>
                                        {/* Column 9: SELF BANK NAME */}
                                        <th className="py-3.5 px-3.5 w-[210px] min-w-[210px] border-r border-white/20 whitespace-nowrap">
                                            SELF BANK NAME
                                        </th>
                                        {/* Column 10: SELF ACC HOLDER NAME */}
                                        <th className="py-3.5 px-3.5 w-[260px] min-w-[260px] border-r border-white/20 whitespace-nowrap">
                                            SELF ACC HOLDER NAME
                                        </th>
                                        {/* Column 11: SELF BANK BRANCH */}
                                        <th className="py-3.5 px-3.5 w-[160px] min-w-[160px] border-r border-white/20 whitespace-nowrap">
                                            SELF BANK BRANCH
                                        </th>
                                        {/* Column 12: SELF IFSC_CODE */}
                                        <th className="py-3.5 px-3.5 w-[150px] min-w-[150px] border-r border-white/20 whitespace-nowrap">
                                            SELF IFSC_CODE
                                        </th>
                                        {/* Column 13: SELF ACCOUNT NO */}
                                        <th className="py-3.5 px-3.5 w-[180px] min-w-[180px] border-r border-white/20 whitespace-nowrap">
                                            SELF ACCOUNT NO
                                        </th>
                                        {/* Column 14: BRANCH NAME */}
                                        <th className="py-3.5 px-3.5 w-[140px] min-w-[140px] border-r border-white/20 whitespace-nowrap">
                                            BRANCH NAME
                                        </th>
                                        {/* Column 15: USER NAME */}
                                        <th className="py-3.5 px-3.5 w-[170px] min-w-[170px] border-r border-white/20 whitespace-nowrap">
                                            USER NAME
                                        </th>
                                        {/* Column 16: USER PASSWORD */}
                                        <th className="py-3.5 px-3.5 w-[170px] min-w-[170px] border-r border-white/20 whitespace-nowrap">
                                            USER PASSWORD
                                        </th>
                                        {/* Column 17: SALES EXECUTIVE NAME */}
                                        <th className="py-3.5 px-3.5 w-[250px] min-w-[250px] border-r border-white/20 whitespace-nowrap">
                                            SALES EXECUTIVE NAME
                                        </th>
                                        {/* Column 18: CO-ORDINATOR NAME */}
                                        <th className="py-3.5 px-3.5 w-[250px] min-w-[250px] border-r border-white/20 whitespace-nowrap">
                                            CO-ORDINATOR NAME
                                        </th>
                                        {/* Column 19: QUOTATION CO-ORDINATOR NAME */}
                                        <th className="py-3.5 px-3.5 w-[250px] min-w-[250px] border-r border-white/20 whitespace-nowrap">
                                            QUOTATION CO-ORDINATOR NAME
                                        </th>
                                        {/* Column 20: INSPECTION CO-ORDINATOR NAME */}
                                        <th className="py-3.5 px-3.5 w-[250px] min-w-[250px] border-r border-white/20 whitespace-nowrap">
                                            INSPECTION CO-ORDINATOR NAME
                                        </th>
                                        {/* Column 21: ENDROSMENT CO-ORDINATOR NAME */}
                                        <th className="py-3.5 px-3.5 w-[250px] min-w-[250px] border-r border-white/20 whitespace-nowrap">
                                            ENDROSMENT CO-ORDINATOR NAME
                                        </th>
                                        {/* Column 22: AGENT TSDS */}
                                        <th className="py-3.5 px-3.5 w-[120px] min-w-[120px] text-center border-r border-white/20 whitespace-nowrap">
                                            AGENT TSDS
                                        </th>
                                        {/* Column 23: EXIT DATE */}
                                        <th className="py-3.5 px-3.5 w-[190px] min-w-[190px] border-r border-white/20 whitespace-nowrap">
                                            EXIT DATE
                                        </th>
                                        {/* Column 24: ID */}
                                        <th className="py-3.5 px-3.5 w-[80px] min-w-[80px] text-center border-r border-white/20 whitespace-nowrap">
                                            ID
                                        </th>
                                        {/* Column 25: LOCATION */}
                                        <th className="py-3.5 px-3.5 w-[140px] min-w-[140px] whitespace-nowrap">
                                            LOCATION
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-[13px]">
                                    {(() => {
                                        const visibleAgents = agents.filter(a => {
                                            const matchesStatus = a.status === agentViewFilter;
                                            if (!matchesStatus) return false;
                                            if (!agentSearchQuery.trim()) return true;
                                            const q = agentSearchQuery.toLowerCase();
                                            return (
                                                (a.fullName && a.fullName.toLowerCase().includes(q)) ||
                                                (a.agentCode && a.agentCode.toLowerCase().includes(q)) ||
                                                (a.email && a.email.toLowerCase().includes(q)) ||
                                                (a.mobile && a.mobile.includes(q)) ||
                                                (a.branch && a.branch.toLowerCase().includes(q)) ||
                                                (a.address && a.address.toLowerCase().includes(q)) ||
                                                (a.userName && a.userName.toLowerCase().includes(q)) ||
                                                (a.bankName && a.bankName.toLowerCase().includes(q)) ||
                                                (a.salesExecutive && a.salesExecutive.toLowerCase().includes(q))
                                            );
                                        });

                                        if (visibleAgents.length === 0) {
                                            return (
                                                <tr>
                                                    <td colSpan={25} className="py-12 text-center text-slate-500 bg-white">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <Search className="w-8 h-8 text-slate-300" />
                                                            <p className="font-medium text-slate-700 text-sm">
                                                                No {agentViewFilter.toLowerCase()} agents found matching "{agentSearchQuery}"
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                Try searching by agent name, code, bank, location or clear the search input.
                                                            </p>
                                                            {agentSearchQuery && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setAgentSearchQuery('')}
                                                                    className="mt-2 text-xs font-semibold text-brand-primary hover:underline cursor-pointer"
                                                                >
                                                                    Clear Search Query
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        return visibleAgents.map((a, idx) => {
                                            const isEven = idx % 2 === 0;
                                            const rowBg = isEven ? 'bg-white' : 'bg-[#F8FAFC]';

                                            return (
                                                <tr
                                                    key={a.id}
                                                    className={`hover:bg-[#EAF2FF] ${rowBg} transition-colors border-b border-slate-200`}
                                                >
                                                    {/* 1: STATUS */}
                                                    <td className="py-2.5 px-3.5 text-center border-r border-slate-200 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleAgentStatus(a.id)}
                                                            className="text-brand-primary hover:text-blue-900 hover:underline font-bold text-[12px] tracking-wider uppercase transition-colors cursor-pointer"
                                                            title={`Click to toggle: ${a.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'}`}
                                                        >
                                                            {a.status}
                                                        </button>
                                                    </td>

                                                    {/* 2: CODE */}
                                                    <td className="py-2.5 px-3.5 font-mono font-medium text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.agentCode}
                                                    </td>

                                                    {/* 3: AGENT NAME */}
                                                    <td className="py-2.5 px-3.5 font-semibold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                                                        {a.fullName}
                                                    </td>

                                                    {/* 4: ADDRESS */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.address || '-'}
                                                    </td>

                                                    {/* 5: EMAILID */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 font-medium border-r border-slate-200 whitespace-nowrap">
                                                        {a.email}
                                                    </td>

                                                    {/* 6: GENDER */}
                                                    <td className="py-2.5 px-3.5 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.gender || 'MALE'}
                                                    </td>

                                                    {/* 7: ADHAR NO */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.aadharNo || '-'}
                                                    </td>

                                                    {/* 8: PAN NO */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.panNo || '-'}
                                                    </td>

                                                    {/* 9: SELF BANK NAME */}
                                                    <td className="py-2.5 px-3.5 font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {a.bankName || '-'}
                                                    </td>

                                                    {/* 10: SELF ACC HOLDER NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.accHolderName || a.fullName}
                                                    </td>

                                                    {/* 11: SELF BANK BRANCH */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.bankBranch || '0'}
                                                    </td>

                                                    {/* 12: SELF IFSC_CODE */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.ifscCode || '-'}
                                                    </td>

                                                    {/* 13: SELF ACCOUNT NO */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.accountNo || '-'}
                                                    </td>

                                                    {/* 14: BRANCH NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-800 font-medium border-r border-slate-200 whitespace-nowrap">
                                                        {a.branchName || a.branch || 'BARAMATI'}
                                                    </td>

                                                    {/* 15: USER NAME */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.userName || `${a.agentCode.toLowerCase()}`}
                                                    </td>

                                                    {/* 16: USER PASSWORD */}
                                                    <td className="py-2.5 px-3.5 font-mono border-r border-slate-200 whitespace-nowrap">
                                                        {showPasswords ? (
                                                            <span className="text-slate-800 font-semibold">{a.userPassword || '******'}</span>
                                                        ) : (
                                                            <span className="text-slate-400 tracking-widest text-xs">••••••••</span>
                                                        )}
                                                    </td>

                                                    {/* 17: SALES EXECUTIVE NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.salesExecutive || '-'}
                                                    </td>

                                                    {/* 18: CO-ORDINATOR NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.coordinator || '-'}
                                                    </td>

                                                    {/* 19: QUOTATION CO-ORDINATOR NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.quotationCoordinator || '-'}
                                                    </td>

                                                    {/* 20: INSPECTION CO-ORDINATOR NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.inspectionCoordinator || '-'}
                                                    </td>

                                                    {/* 21: ENDROSMENT CO-ORDINATOR NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.endorsementCoordinator || '-'}
                                                    </td>

                                                    {/* 22: AGENT TSDS */}
                                                    <td className="py-2.5 px-3.5 text-center font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.agentTsds || '2'}
                                                    </td>

                                                    {/* 23: EXIT DATE */}
                                                    <td className="py-2.5 px-3.5 font-mono text-xs text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {a.exitDate || '-'}
                                                    </td>

                                                    {/* 24: ID */}
                                                    <td className="py-2.5 px-3.5 text-center font-mono font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {a.erpId || a.id}
                                                    </td>

                                                    {/* 25: LOCATION */}
                                                    <td className="py-2.5 px-3.5 text-slate-800 font-medium whitespace-nowrap">
                                                        {a.location || a.branch || 'BARAMATI'}
                                                    </td>
                                                </tr>
                                            );
                                        });
                                    })()}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Bar */}
                        <div className="p-3 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                            <div className="flex items-center gap-3">
                                <span>Showing <strong>{agents.filter(a => a.status === agentViewFilter).length}</strong> {agentViewFilter.toLowerCase()} agents</span>
                                <span>•</span>
                                <span>All 25 ERP Columns Loaded</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => scrollAgentTableToEdge('start')}
                                    className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                >
                                    ⏮ To Start
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollAgentTable(-600)}
                                    className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                >
                                    ◀ Scroll Left
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollAgentTable(600)}
                                    className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                >
                                    Scroll Right ▶
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollAgentTableToEdge('end')}
                                    className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                >
                                    To End (Col 25) ⏭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 4: VIEW EMPLOYEE (ERP 37 COLUMNS) */}
            {activeTab === 'view-employee' && (
                <div key={activeTab} className="tab-transition-wrapper">
                    {/* Top Tab Bar: Active Employee / Inactive Employee in Blue Theme */}
                    <div className="flex items-center justify-start border-b border-brand-border bg-white p-2 rounded-t-[10px] mb-4">
                        <div className="inline-flex p-1 bg-slate-100/80 rounded-[8px] gap-1">
                            <button
                                type="button"
                                onClick={() => setEmpViewFilter('ACTIVE')}
                                className={`px-10 py-2.5 text-[15px] font-bold tracking-wide transition-all cursor-pointer rounded-[6px] flex items-center gap-2.5 ${
                                    empViewFilter === 'ACTIVE'
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-transparent text-slate-600 hover:text-brand-primary hover:bg-blue-50/60'
                                }`}
                            >
                                <span>Active Employee</span>
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                    empViewFilter === 'ACTIVE'
                                        ? 'bg-white text-brand-primary'
                                        : 'bg-slate-200 text-slate-700'
                                }`}>
                                    {employees.filter(e => e.status === 'ACTIVE').length}
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setEmpViewFilter('INACTIVE')}
                                className={`px-10 py-2.5 text-[15px] font-bold tracking-wide transition-all cursor-pointer rounded-[6px] flex items-center gap-2.5 ${
                                    empViewFilter === 'INACTIVE'
                                        ? 'bg-brand-primary text-white shadow-sm'
                                        : 'bg-transparent text-slate-600 hover:text-brand-primary hover:bg-blue-50/60'
                                }`}
                            >
                                <span>Inactive Employee</span>
                                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                                    empViewFilter === 'INACTIVE'
                                        ? 'bg-white text-brand-primary'
                                        : 'bg-slate-100 text-slate-600'
                                }`}>
                                    {employees.filter(e => e.status === 'INACTIVE').length}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Toolbar: Search Employee Name Here + Export Button + Navigation + Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <div className="relative w-72 sm:w-80">
                                <input
                                    type="text"
                                    value={empSearchQuery}
                                    onChange={(e) => setEmpSearchQuery(e.target.value)}
                                    placeholder="Search Employee Name Here"
                                    className="w-full px-4 py-2 bg-white border border-[#CBD5E1] rounded-[6px] text-[14px] text-slate-800 placeholder-[#94A3B8] shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
                                />
                                {empSearchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setEmpSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={handleExportEmployees}
                                className="px-6 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[14px] rounded-[6px] shadow-sm transition-all duration-150 cursor-pointer border-none flex items-center gap-2"
                            >
                                <Download size={15} />
                                <span>Export</span>
                            </button>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Horizontal Quick Scroll Navigation Controls */}
                            <div className="inline-flex items-center bg-white border border-brand-border rounded-[6px] p-0.5 shadow-sm">
                                <button
                                    type="button"
                                    onClick={() => scrollEmpTableToEdge('start')}
                                    className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded cursor-pointer border-none transition-colors"
                                    title="Scroll to beginning (Column 1: VIEW)"
                                >
                                    <ChevronsLeft size={16} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollEmpTable(-600)}
                                    className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded flex items-center gap-1 cursor-pointer border-none transition-colors"
                                    title="Scroll left by 600px"
                                >
                                    <ChevronLeft size={14} />
                                    <span>Scroll Left</span>
                                </button>
                                <span className="h-4 w-px bg-slate-200 mx-0.5"></span>
                                <button
                                    type="button"
                                    onClick={() => scrollEmpTable(600)}
                                    className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded flex items-center gap-1 cursor-pointer border-none transition-colors"
                                    title="Scroll right by 600px"
                                >
                                    <span>Scroll Right</span>
                                    <ChevronRight size={14} />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollEmpTableToEdge('end')}
                                    className="p-1.5 text-slate-600 hover:text-brand-primary hover:bg-blue-50 rounded cursor-pointer border-none transition-colors"
                                    title="Scroll to end (Column 37: DELETE)"
                                >
                                    <ChevronsRight size={16} />
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowEmpPasswords(prev => !prev)}
                                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-blue-50/50 text-slate-700 border border-brand-border rounded-[6px] text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                                title="Toggle password masking in table"
                            >
                                {showEmpPasswords ? <EyeOff size={14} className="text-amber-600" /> : <Eye size={14} className="text-brand-primary" />}
                                <span>{showEmpPasswords ? 'Hide Passwords' : 'Show Passwords'}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setEmployeeForm({ fullName: '', designation: 'Operations Executive', department: 'Operations', branch: 'BARAMATI', mobile: '', email: '', doj: new Date().toISOString().split('T')[0] });
                                    setModalType('EMPLOYEE');
                                }}
                                className="flex items-center gap-1.5 px-4 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white font-semibold text-[13px] rounded-[6px] shadow-sm transition-colors cursor-pointer border-none"
                            >
                                <Plus size={15} />
                                <span>Add New Employee</span>
                            </button>
                        </div>
                    </div>

                    {/* Table Card Container with Full Horizontal Scroll */}
                    <div className="bg-white rounded-[8px] border border-brand-border shadow-sm overflow-hidden flex flex-col w-full min-w-0">
                        {/* Notice & Horizontal Scroll Indicator */}
                        <div className="bg-white px-4 py-2.5 border-b border-brand-border flex items-center justify-between text-xs text-brand-navy">
                            <div className="flex items-center gap-2 font-medium">
                                <span className="inline-block w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                                <span>
                                    Displaying <strong className="text-slate-900">{
                                        employees.filter(e => {
                                            const matchesStatus = e.status === empViewFilter;
                                            if (!matchesStatus) return false;
                                            if (!empSearchQuery.trim()) return true;
                                            const q = empSearchQuery.toLowerCase();
                                            return (
                                                (e.fullName && e.fullName.toLowerCase().includes(q)) ||
                                                (e.empCode && e.empCode.toLowerCase().includes(q)) ||
                                                (e.email && e.email.toLowerCase().includes(q)) ||
                                                (e.mobile && e.mobile.includes(q)) ||
                                                (e.branch && e.branch.toLowerCase().includes(q)) ||
                                                (e.address && e.address.toLowerCase().includes(q)) ||
                                                (e.designation && e.designation.toLowerCase().includes(q)) ||
                                                (e.panNo && e.panNo.toLowerCase().includes(q)) ||
                                                (e.bankName && e.bankName.toLowerCase().includes(q)) ||
                                                (e.reporting && e.reporting.toLowerCase().includes(q)) ||
                                                (e.userName && e.userName.toLowerCase().includes(q))
                                            );
                                        }).length
                                    }</strong> {empViewFilter.toLowerCase()} employees
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-brand-primary bg-white px-2.5 py-1 rounded border border-blue-200/80 font-medium">
                                <span>↔</span>
                                <span>Use scrollbar below or navigation buttons above to scroll fully across all 37 ERP columns</span>
                            </div>
                        </div>

                        {/* Horizontally scrolling table area */}
                        <div
                            ref={empTableScrollRef}
                            className="w-full overflow-x-auto min-w-0 erp-horizontal-scrollbar"
                            style={{ maxWidth: '100%' }}
                        >
                            <table className="text-left border-collapse min-w-[6300px] w-full text-[13px]">
                                <thead>
                                    <tr className="bg-brand-primary text-white font-bold text-[12px] tracking-wider uppercase border-b-2 border-blue-700">
                                        {/* Column 1: VIEW */}
                                        <th className="py-3.5 px-3.5 w-[70px] min-w-[70px] text-center border-r border-white/20 whitespace-nowrap">
                                            VIEW
                                        </th>
                                        {/* Column 2: EDIT */}
                                        <th className="py-3.5 px-3.5 w-[65px] min-w-[65px] text-center border-r border-white/20 whitespace-nowrap">
                                            EDIT
                                        </th>
                                        {/* Column 3: EMP CODE */}
                                        <th className="py-3.5 px-3.5 w-[120px] min-w-[120px] border-r border-white/20 whitespace-nowrap">
                                            EMP CODE
                                        </th>
                                        {/* Column 4: EMPLOYEE NAME */}
                                        <th className="py-3.5 px-3.5 w-[260px] min-w-[260px] border-r border-white/20 whitespace-nowrap">
                                            EMPLOYEE NAME
                                        </th>
                                        {/* Column 5: ADDRESS */}
                                        <th className="py-3.5 px-3.5 w-[420px] min-w-[420px] border-r border-white/20 whitespace-nowrap">
                                            ADDRESS
                                        </th>
                                        {/* Column 6: GENDER */}
                                        <th className="py-3.5 px-3.5 w-[90px] min-w-[90px] text-center border-r border-white/20 whitespace-nowrap">
                                            GENDER
                                        </th>
                                        {/* Column 7: MARITAL STATUS */}
                                        <th className="py-3.5 px-3.5 w-[130px] min-w-[130px] text-center border-r border-white/20 whitespace-nowrap">
                                            MARITAL STATUS
                                        </th>
                                        {/* Column 8: OFFICE NO */}
                                        <th className="py-3.5 px-3.5 w-[130px] min-w-[130px] border-r border-white/20 whitespace-nowrap">
                                            OFFICE NO
                                        </th>
                                        {/* Column 9: MOBLIE NO */}
                                        <th className="py-3.5 px-3.5 w-[130px] min-w-[130px] border-r border-white/20 whitespace-nowrap">
                                            MOBLIE NO
                                        </th>
                                        {/* Column 10: EMAIL ID */}
                                        <th className="py-3.5 px-3.5 w-[250px] min-w-[250px] border-r border-white/20 whitespace-nowrap">
                                            EMAIL ID
                                        </th>
                                        {/* Column 11: PAN NO */}
                                        <th className="py-3.5 px-3.5 w-[130px] min-w-[130px] border-r border-white/20 whitespace-nowrap">
                                            PAN NO
                                        </th>
                                        {/* Column 12: AADHAR NO */}
                                        <th className="py-3.5 px-3.5 w-[160px] min-w-[160px] border-r border-white/20 whitespace-nowrap">
                                            AADHAR NO
                                        </th>
                                        {/* Column 13: BANK NAME */}
                                        <th className="py-3.5 px-3.5 w-[240px] min-w-[240px] border-r border-white/20 whitespace-nowrap">
                                            BANK NAME
                                        </th>
                                        {/* Column 14: BANK BRANCH */}
                                        <th className="py-3.5 px-3.5 w-[150px] min-w-[150px] border-r border-white/20 whitespace-nowrap">
                                            BANK BRANCH
                                        </th>
                                        {/* Column 15: IFSC CODE */}
                                        <th className="py-3.5 px-3.5 w-[140px] min-w-[140px] border-r border-white/20 whitespace-nowrap">
                                            IFSC CODE
                                        </th>
                                        {/* Column 16: ACCOUNT NO */}
                                        <th className="py-3.5 px-3.5 w-[170px] min-w-[170px] border-r border-white/20 whitespace-nowrap">
                                            ACCOUNT NO
                                        </th>
                                        {/* Column 17: BRANCH NAME */}
                                        <th className="py-3.5 px-3.5 w-[140px] min-w-[140px] border-r border-white/20 whitespace-nowrap">
                                            BRANCH NAME
                                        </th>
                                        {/* Column 18: USER NAME */}
                                        <th className="py-3.5 px-3.5 w-[150px] min-w-[150px] border-r border-white/20 whitespace-nowrap">
                                            USER NAME
                                        </th>
                                        {/* Column 19: USER PASSWORD */}
                                        <th className="py-3.5 px-3.5 w-[150px] min-w-[150px] border-r border-white/20 whitespace-nowrap">
                                            USER PASSWORD
                                        </th>
                                        {/* Column 20: CO-ORDINATOR NAME */}
                                        <th className="py-3.5 px-3.5 w-[230px] min-w-[230px] border-r border-white/20 whitespace-nowrap">
                                            CO-ORDINATOR NAME
                                        </th>
                                        {/* Column 21: QUOTATION CO-ORDINATOR NAME */}
                                        <th className="py-3.5 px-3.5 w-[240px] min-w-[240px] border-r border-white/20 whitespace-nowrap">
                                            QUOTATION CO-ORDINATOR NAME
                                        </th>
                                        {/* Column 22: INSPECTION CO-ORDINATOR NAME */}
                                        <th className="py-3.5 px-3.5 w-[240px] min-w-[240px] border-r border-white/20 whitespace-nowrap">
                                            INSPECTION CO-ORDINATOR NAME
                                        </th>
                                        {/* Column 23: ENDROSMENT CO-ORDINATOR NAME */}
                                        <th className="py-3.5 px-3.5 w-[240px] min-w-[240px] border-r border-white/20 whitespace-nowrap">
                                            ENDROSMENT CO-ORDINATOR NAME
                                        </th>
                                        {/* Column 24: LOCATION HEAD NAME */}
                                        <th className="py-3.5 px-3.5 w-[280px] min-w-[280px] border-r border-white/20 whitespace-nowrap">
                                            LOCATION HEAD NAME
                                        </th>
                                        {/* Column 25: BUSINESS PROCESS */}
                                        <th className="py-3.5 px-3.5 w-[160px] min-w-[160px] border-r border-white/20 whitespace-nowrap">
                                            BUSINESS PROCESS
                                        </th>
                                        {/* Column 26: LINE OF BUSINESS */}
                                        <th className="py-3.5 px-3.5 w-[150px] min-w-[150px] border-r border-white/20 whitespace-nowrap">
                                            LINE OF BUSINESS
                                        </th>
                                        {/* Column 27: FUNCTION TYPE */}
                                        <th className="py-3.5 px-3.5 w-[140px] min-w-[140px] border-r border-white/20 whitespace-nowrap">
                                            FUNCTION TYPE
                                        </th>
                                        {/* Column 28: DESIGNATION */}
                                        <th className="py-3.5 px-3.5 w-[190px] min-w-[190px] border-r border-white/20 whitespace-nowrap">
                                            DESIGNATION
                                        </th>
                                        {/* Column 29: CLASS */}
                                        <th className="py-3.5 px-3.5 w-[100px] min-w-[100px] border-r border-white/20 whitespace-nowrap">
                                            CLASS
                                        </th>
                                        {/* Column 30: REPORTING */}
                                        <th className="py-3.5 px-3.5 w-[260px] min-w-[260px] border-r border-white/20 whitespace-nowrap">
                                            REPORTING
                                        </th>
                                        {/* Column 31: JOINING DATE */}
                                        <th className="py-3.5 px-3.5 w-[170px] min-w-[170px] border-r border-white/20 whitespace-nowrap">
                                            JOINING DATE
                                        </th>
                                        {/* Column 32: DOCS */}
                                        <th className="py-3.5 px-3.5 w-[100px] min-w-[100px] text-center border-r border-white/20 whitespace-nowrap">
                                            DOCS
                                        </th>
                                        {/* Column 33: ID */}
                                        <th className="py-3.5 px-3.5 w-[70px] min-w-[70px] text-center border-r border-white/20 whitespace-nowrap">
                                            ID
                                        </th>
                                        {/* Column 34: EXECUTIVE TYPE */}
                                        <th className="py-3.5 px-3.5 w-[190px] min-w-[190px] border-r border-white/20 whitespace-nowrap">
                                            EXECUTIVE TYPE
                                        </th>
                                        {/* Column 35: DATE OF BIRTH */}
                                        <th className="py-3.5 px-3.5 w-[170px] min-w-[170px] border-r border-white/20 whitespace-nowrap">
                                            DATE OF BIRTH
                                        </th>
                                        {/* Column 36: EXIT */}
                                        <th className="py-3.5 px-3.5 w-[80px] min-w-[80px] text-center border-r border-white/20 whitespace-nowrap">
                                            EXIT
                                        </th>
                                        {/* Column 37: DELETE */}
                                        <th className="py-3.5 px-3.5 w-[100px] min-w-[100px] text-center whitespace-nowrap">
                                            DELETE
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(() => {
                                        const visibleEmployees = employees.filter(e => {
                                            const matchesStatus = e.status === empViewFilter;
                                            if (!matchesStatus) return false;
                                            if (!empSearchQuery.trim()) return true;
                                            const q = empSearchQuery.toLowerCase();
                                            return (
                                                (e.fullName && e.fullName.toLowerCase().includes(q)) ||
                                                (e.empCode && e.empCode.toLowerCase().includes(q)) ||
                                                (e.email && e.email.toLowerCase().includes(q)) ||
                                                (e.mobile && e.mobile.includes(q)) ||
                                                (e.branch && e.branch.toLowerCase().includes(q)) ||
                                                (e.address && e.address.toLowerCase().includes(q)) ||
                                                (e.designation && e.designation.toLowerCase().includes(q)) ||
                                                (e.panNo && e.panNo.toLowerCase().includes(q)) ||
                                                (e.bankName && e.bankName.toLowerCase().includes(q)) ||
                                                (e.reporting && e.reporting.toLowerCase().includes(q)) ||
                                                (e.userName && e.userName.toLowerCase().includes(q))
                                            );
                                        });

                                        if (visibleEmployees.length === 0) {
                                            return (
                                                <tr>
                                                    <td colSpan={37} className="py-12 text-center text-slate-500 bg-white">
                                                        <div className="flex flex-col items-center justify-center gap-2">
                                                            <Search className="w-8 h-8 text-slate-300" />
                                                            <p className="font-medium text-slate-700 text-sm">
                                                                No {empViewFilter.toLowerCase()} employees found matching "{empSearchQuery}"
                                                            </p>
                                                            <p className="text-xs text-slate-400">
                                                                Try searching by employee name, code, designation, bank, or clear the search input.
                                                            </p>
                                                            {empSearchQuery && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setEmpSearchQuery('')}
                                                                    className="mt-2 text-xs font-semibold text-brand-primary hover:underline cursor-pointer"
                                                                >
                                                                    Clear Search Query
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }

                                        return visibleEmployees.map((e, idx) => {
                                            const isEven = idx % 2 === 0;
                                            const rowBg = isEven ? 'bg-white' : 'bg-[#F8FAFC]';

                                            return (
                                                <tr
                                                    key={e.id}
                                                    className={`hover:bg-[#EAF2FF] ${rowBg} transition-colors border-b border-slate-200`}
                                                >
                                                    {/* 1: VIEW */}
                                                    <td className="py-2.5 px-3 text-center border-r border-slate-200 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => showToast(`Viewing profile for ${e.fullName} (${e.empCode})`)}
                                                            className="text-brand-primary hover:text-blue-900 hover:underline font-bold text-xs uppercase cursor-pointer"
                                                        >
                                                            VIEW
                                                        </button>
                                                    </td>

                                                    {/* 2: EDIT */}
                                                    <td className="py-2.5 px-2 text-center border-r border-slate-200 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setEmployeeForm({
                                                                    fullName: e.fullName,
                                                                    designation: e.designation || 'Operations Executive',
                                                                    department: e.department || 'Operations',
                                                                    branch: e.branch || 'BARAMATI',
                                                                    mobile: e.mobile || '',
                                                                    email: e.email || '',
                                                                    doj: e.doj || new Date().toISOString().split('T')[0]
                                                                });
                                                                setModalType('EMPLOYEE');
                                                            }}
                                                            className="text-brand-primary hover:text-blue-900 hover:bg-blue-50 p-1.5 rounded transition-colors cursor-pointer inline-flex items-center justify-center"
                                                            title={`Edit ${e.fullName}`}
                                                        >
                                                            <Edit2 size={14} />
                                                        </button>
                                                    </td>

                                                    {/* 3: EMP CODE */}
                                                    <td className="py-2.5 px-3.5 font-mono font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {e.empCode}
                                                    </td>

                                                    {/* 4: EMPLOYEE NAME */}
                                                    <td className="py-2.5 px-3.5 font-bold text-slate-900 border-r border-slate-200 whitespace-nowrap">
                                                        {e.fullName}
                                                    </td>

                                                    {/* 5: ADDRESS */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.address || '-'}
                                                    </td>

                                                    {/* 6: GENDER */}
                                                    <td className="py-2.5 px-3.5 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.gender || 'MALE'}
                                                    </td>

                                                    {/* 7: MARITAL STATUS */}
                                                    <td className="py-2.5 px-3.5 text-center text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.maritalStatus || 'MARRIED'}
                                                    </td>

                                                    {/* 8: OFFICE NO */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.officeNo || '-'}
                                                    </td>

                                                    {/* 9: MOBLIE NO */}
                                                    <td className="py-2.5 px-3.5 font-mono font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {e.mobile || '-'}
                                                    </td>

                                                    {/* 10: EMAIL ID */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 font-medium border-r border-slate-200 whitespace-nowrap">
                                                        {e.email || '-'}
                                                    </td>

                                                    {/* 11: PAN NO */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.panNo || '-'}
                                                    </td>

                                                    {/* 12: AADHAR NO */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.aadharNo || '-'}
                                                    </td>

                                                    {/* 13: BANK NAME */}
                                                    <td className="py-2.5 px-3.5 font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {e.bankName || '-'}
                                                    </td>

                                                    {/* 14: BANK BRANCH */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.bankBranch || '-'}
                                                    </td>

                                                    {/* 15: IFSC CODE */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.ifscCode || '-'}
                                                    </td>

                                                    {/* 16: ACCOUNT NO */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.accountNo || '-'}
                                                    </td>

                                                    {/* 17: BRANCH NAME */}
                                                    <td className="py-2.5 px-3.5 font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {e.branchName || e.branch || 'BARAMATI'}
                                                    </td>

                                                    {/* 18: USER NAME */}
                                                    <td className="py-2.5 px-3.5 font-mono font-medium text-brand-primary border-r border-slate-200 whitespace-nowrap">
                                                        {e.userName || '-'}
                                                    </td>

                                                    {/* 19: USER PASSWORD */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {showEmpPasswords ? (
                                                            <span className="text-slate-800">{e.userPassword || '••••••••'}</span>
                                                        ) : (
                                                            <span className="text-slate-400 tracking-widest font-mono">••••••••</span>
                                                        )}
                                                    </td>

                                                    {/* 20: CO-ORDINATOR NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.coordinator || '-'}
                                                    </td>

                                                    {/* 21: QUOTATION CO-ORDINATOR NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.quotationCoordinator || '-'}
                                                    </td>

                                                    {/* 22: INSPECTION CO-ORDINATOR NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.inspectionCoordinator || '-'}
                                                    </td>

                                                    {/* 23: ENDROSMENT CO-ORDINATOR NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.endorsementCoordinator || '-'}
                                                    </td>

                                                    {/* 24: LOCATION HEAD NAME */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.locationHead || '-'}
                                                    </td>

                                                    {/* 25: BUSINESS PROCESS */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.businessProcess || '-'}
                                                    </td>

                                                    {/* 26: LINE OF BUSINESS */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.lineOfBusiness || '-'}
                                                    </td>

                                                    {/* 27: FUNCTION TYPE */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.functionType || 'OPERATIONS'}
                                                    </td>

                                                    {/* 28: DESIGNATION */}
                                                    <td className="py-2.5 px-3.5 font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {e.designation || '-'}
                                                    </td>

                                                    {/* 29: CLASS */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.employeeClass || 'CLASS 5'}
                                                    </td>

                                                    {/* 30: REPORTING */}
                                                    <td className="py-2.5 px-3.5 font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {e.reporting || '-'}
                                                    </td>

                                                    {/* 31: JOINING DATE */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.joiningDate || e.doj || '-'}
                                                    </td>

                                                    {/* 32: DOCS */}
                                                    <td className="py-2.5 px-3.5 text-center border-r border-slate-200 whitespace-nowrap">
                                                        {e.docsStatus === 'VIEW' ? (
                                                            <button
                                                                type="button"
                                                                onClick={() => showToast(`Viewing uploaded documents for ${e.fullName}`)}
                                                                className="text-red-600 hover:text-red-800 font-bold text-xs uppercase hover:underline cursor-pointer"
                                                            >
                                                                VIEW
                                                            </button>
                                                        ) : (
                                                            <span className="text-red-500 font-bold text-xs">NA</span>
                                                        )}
                                                    </td>

                                                    {/* 33: ID */}
                                                    <td className="py-2.5 px-3.5 text-center font-mono font-medium text-slate-800 border-r border-slate-200 whitespace-nowrap">
                                                        {e.erpId || e.id}
                                                    </td>

                                                    {/* 34: EXECUTIVE TYPE */}
                                                    <td className="py-2.5 px-3.5 text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.executiveType || 'OPERATIONAL SUPPORT'}
                                                    </td>

                                                    {/* 35: DATE OF BIRTH */}
                                                    <td className="py-2.5 px-3.5 font-mono text-slate-700 border-r border-slate-200 whitespace-nowrap">
                                                        {e.dateOfBirth || '-'}
                                                    </td>

                                                    {/* 36: EXIT */}
                                                    <td className="py-2.5 px-3.5 text-center border-r border-slate-200 whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleToggleEmpStatus(e.id)}
                                                            className="text-brand-primary hover:text-blue-900 hover:underline font-bold text-xs tracking-wider uppercase cursor-pointer"
                                                            title={`Click to mark as ${e.status === 'ACTIVE' ? 'INACTIVE (Exit)' : 'ACTIVE'}`}
                                                        >
                                                            EXIT
                                                        </button>
                                                    </td>

                                                    {/* 37: DELETE */}
                                                    <td className="py-2.5 px-3.5 text-center whitespace-nowrap">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteEmp(e.id)}
                                                            className="text-brand-primary hover:text-red-600 hover:underline font-bold text-xs inline-flex items-center gap-1 cursor-pointer transition-colors"
                                                            title={`Delete ${e.fullName}`}
                                                        >
                                                            <Trash2 size={13} className="text-brand-primary" />
                                                            <span>DELETE</span>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        });
                                    })()}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Bar */}
                        <div className="p-3 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                            <div className="flex items-center gap-3">
                                <span>Showing <strong>{employees.filter(e => e.status === empViewFilter).length}</strong> {empViewFilter.toLowerCase()} employees</span>
                                <span>•</span>
                                <span>All 37 ERP Columns Loaded</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => scrollEmpTableToEdge('start')}
                                    className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                >
                                    ⏮ To Start
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollEmpTable(-600)}
                                    className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                >
                                    ◀ Scroll Left
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollEmpTable(600)}
                                    className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                >
                                    Scroll Right ▶
                                </button>
                                <button
                                    type="button"
                                    onClick={() => scrollEmpTableToEdge('end')}
                                    className="px-2.5 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                >
                                    To End (Col 37) ⏭
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 5: BANK BENEFICIARY */}

            {activeTab === 'bank-beneficiary' && (
                <div key={activeTab} className="tab-transition-wrapper space-y-6">
                    {/* Top Selector Card: » Bank Beneficiary Details (Matches Legacy ERP with Modern Blue Theme) */}
                    <div className="bg-white rounded-[12px] border border-brand-border shadow-sm overflow-hidden">
                        <div className="bg-brand-primary px-4 py-2.5 flex items-center justify-between text-white">
                            <span className="font-bold text-[14px] tracking-wide flex items-center gap-1.5">
                                <span className="text-blue-200 font-extrabold text-base">»</span> Bank Beneficiary Details
                            </span>
                            <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                                {beneficiaryTypeFilter === 'FRANCHISE' ? 'Franchise View' : beneficiaryTypeFilter === 'AGENT' ? 'Agent View' : 'Franchise Agent View'}
                            </span>
                        </div>
                        <div className="p-4 sm:p-5 flex flex-wrap items-center gap-8 bg-white border-b border-brand-border/60">
                            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-brand-navy select-none hover:text-brand-primary transition-colors">
                                <input
                                    type="radio"
                                    name="beneficiaryTypeFilterRadio"
                                    value="AGENT"
                                    checked={beneficiaryTypeFilter === 'AGENT'}
                                    onChange={() => {
                                        setBeneficiaryTypeFilter('AGENT');
                                        setViewingBeneficiary(null);
                                    }}
                                    className="w-4 h-4 text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                />
                                <span>Agent</span>
                            </label>
                            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-brand-navy select-none hover:text-brand-primary transition-colors">
                                <input
                                    type="radio"
                                    name="beneficiaryTypeFilterRadio"
                                    value="FRANCHISE"
                                    checked={beneficiaryTypeFilter === 'FRANCHISE'}
                                    onChange={() => {
                                        setBeneficiaryTypeFilter('FRANCHISE');
                                        setViewingBeneficiary(null);
                                    }}
                                    className="w-4 h-4 text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                />
                                <span>Franchise</span>
                            </label>
                            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-brand-navy select-none hover:text-brand-primary transition-colors">
                                <input
                                    type="radio"
                                    name="beneficiaryTypeFilterRadio"
                                    value="FRANCHISE_AGENT"
                                    checked={beneficiaryTypeFilter === 'FRANCHISE_AGENT'}
                                    onChange={() => {
                                        setBeneficiaryTypeFilter('FRANCHISE_AGENT');
                                        setViewingBeneficiary(null);
                                    }}
                                    className="w-4 h-4 text-brand-primary focus:ring-brand-primary cursor-pointer accent-blue-600"
                                />
                                <span>Franchise Agent</span>
                            </label>
                        </div>
                    </div>

                    {/* VIEW BENEFICIARY BANK DETAILS CARD (When viewing a specific record) */}
                    {viewingBeneficiary ? (
                        <div className="bg-white rounded-[12px] border border-brand-border shadow-sm overflow-hidden animate-in fade-in duration-200">
                            {/* Blue Header: » Bank Details */}
                            <div className="bg-brand-primary px-4 py-2.5 flex items-center justify-between text-white">
                                <span className="font-bold text-[14px] tracking-wide flex items-center gap-1.5">
                                    <span className="text-blue-200 font-extrabold text-base">»</span> Bank Details
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-semibold">
                                        {viewingBeneficiary.entityCode}
                                    </span>
                                    <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-blue-100 hidden sm:inline">
                                        {viewingBeneficiary.beneficiaryName}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 space-y-6">
                                {/* Beneficiary Meta Header */}
                                <div className="bg-[#F8FAFC] border border-blue-100 rounded-[10px] p-4 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <div className="text-xs font-semibold uppercase text-brand-muted tracking-wider">Beneficiary Name & Code</div>
                                        <div className="text-base font-bold text-brand-navy flex items-center gap-2 mt-0.5">
                                            <span>{viewingBeneficiary.beneficiaryName}</span>
                                            <span className="px-2 py-0.5 bg-blue-100 text-brand-primary rounded text-xs font-mono font-bold">
                                                {viewingBeneficiary.entityCode}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-brand-muted">
                                        <span className="font-medium text-brand-navy">Branch:</span> {viewingBeneficiary.branchName || viewingBeneficiary.branch || 'FRANCHISES'} &nbsp;|&nbsp;
                                        <span className="font-medium text-brand-navy"> Mobile:</span> {viewingBeneficiary.mobile || 'N/A'}
                                    </div>
                                </div>

                                {/* PRIMARY BANK DETAILS TABLE */}
                                <div>
                                    <div className="w-full overflow-x-auto rounded-[8px] border border-brand-border">
                                        <table className="w-full text-left border-collapse min-w-[700px]">
                                            <thead>
                                                <tr className="bg-brand-primary text-white text-[12px] font-bold uppercase tracking-wider">
                                                    <th className="py-2.5 px-3.5 border-r border-blue-500/40 w-[24%]">Account Holder Name</th>
                                                    <th className="py-2.5 px-3.5 border-r border-blue-500/40 w-[24%]">Bank Name</th>
                                                    <th className="py-2.5 px-3.5 border-r border-blue-500/40 w-[18%]">Branch</th>
                                                    <th className="py-2.5 px-3.5 border-r border-blue-500/40 w-[20%]">Account No.</th>
                                                    <th className="py-2.5 px-3.5 w-[14%]">Ifsc_code</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-[13px] text-brand-navy divide-y divide-brand-border bg-white">
                                                <tr className="hover:bg-blue-50/40 transition-colors">
                                                    <td className="py-3 px-3.5 font-semibold text-brand-navy border-r border-brand-border/60">
                                                        {viewingBeneficiary.beneficiaryName}
                                                    </td>
                                                    <td className="py-3 px-3.5 font-medium text-brand-navy border-r border-brand-border/60">
                                                        {viewingBeneficiary.bankName}
                                                    </td>
                                                    <td className="py-3 px-3.5 text-brand-navy border-r border-brand-border/60">
                                                        {viewingBeneficiary.branch || viewingBeneficiary.branchName || 'PUNE'}
                                                    </td>
                                                    <td className="py-3 px-3.5 font-mono font-semibold text-brand-primary border-r border-brand-border/60">
                                                        {viewingBeneficiary.accountNumber}
                                                    </td>
                                                    <td className="py-3 px-3.5 font-mono font-medium text-brand-navy">
                                                        {viewingBeneficiary.ifscCode}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* OTHER BANK DETAILS SECTION (Matches authentic ERP heading color #8B0000) */}
                                <div>
                                    <h4 className="text-[13px] font-bold text-[#8B0000] uppercase tracking-wide mb-2">
                                        Other Bank Details
                                    </h4>
                                    <div className="w-full overflow-x-auto rounded-[8px] border border-brand-border">
                                        <table className="w-full text-left border-collapse min-w-[700px]">
                                            <thead>
                                                <tr className="bg-brand-primary text-white text-[12px] font-bold uppercase tracking-wider">
                                                    <th className="py-2.5 px-3.5 border-r border-blue-500/40 w-[24%]">Account Holder Name</th>
                                                    <th className="py-2.5 px-3.5 border-r border-blue-500/40 w-[24%]">Bank Name</th>
                                                    <th className="py-2.5 px-3.5 border-r border-blue-500/40 w-[18%]">Branch</th>
                                                    <th className="py-2.5 px-3.5 border-r border-blue-500/40 w-[20%]">Account No.</th>
                                                    <th className="py-2.5 px-3.5 w-[14%]">Ifsc_code</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-[13px] text-brand-navy divide-y divide-brand-border bg-white">
                                                <tr className="hover:bg-blue-50/40 transition-colors">
                                                    <td className="py-3 px-3.5 font-semibold text-brand-navy border-r border-brand-border/60">
                                                        {viewingBeneficiary.otherAccHolderName || '-'}
                                                    </td>
                                                    <td className="py-3 px-3.5 font-medium text-brand-navy border-r border-brand-border/60">
                                                        {viewingBeneficiary.otherBankName || '-'}
                                                    </td>
                                                    <td className="py-3 px-3.5 text-brand-navy border-r border-brand-border/60">
                                                        {viewingBeneficiary.otherBranch || '-'}
                                                    </td>
                                                    <td className="py-3 px-3.5 font-mono text-brand-navy border-r border-brand-border/60">
                                                        {viewingBeneficiary.otherAccountNo || '-'}
                                                    </td>
                                                    <td className="py-3 px-3.5 font-mono text-brand-navy">
                                                        {viewingBeneficiary.otherIfscCode || '-'}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* DOCUMENT ATTACHMENTS (Captured from ERP screenshot) */}
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-[13px] font-bold text-brand-navy uppercase tracking-wide">
                                            KYC & Verification Attachments
                                        </h4>
                                        <span className="text-xs text-brand-muted">Click thumbnail to inspect document</span>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {/* Aadhar Card Card */}
                                        <div className="border border-brand-border rounded-[10px] p-3.5 bg-white hover:border-brand-primary hover:shadow-sm transition-all group">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-brand-navy">Aadhar Card</span>
                                                <span className="text-[10px] bg-blue-50 text-brand-primary px-2 py-0.5 rounded font-semibold">ID PROOF</span>
                                            </div>
                                            <div
                                                onClick={() => setSelectedDocPreview({ title: `Aadhar Card - ${viewingBeneficiary.beneficiaryName}`, type: 'AADHAR' })}
                                                className="h-28 bg-gradient-to-br from-blue-50 to-indigo-50 border border-dashed border-blue-200 rounded-[8px] flex flex-col items-center justify-center cursor-pointer group-hover:bg-blue-100/50 transition-colors p-2 text-center"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-xs mb-1 shadow-sm">
                                                    ID
                                                </div>
                                                <span className="text-xs font-bold text-brand-navy">UIDAI Aadhar</span>
                                                <span className="text-[11px] text-brand-muted font-mono mt-0.5">XXXX-XXXX-4512</span>
                                                <span className="text-[10px] text-brand-primary font-semibold mt-1 group-hover:underline">Click to Zoom</span>
                                            </div>
                                        </div>

                                        {/* PAN Card Card */}
                                        <div className="border border-brand-border rounded-[10px] p-3.5 bg-white hover:border-brand-primary hover:shadow-sm transition-all group">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-brand-navy">PAN Card</span>
                                                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-semibold">TAX ID</span>
                                            </div>
                                            <div
                                                onClick={() => setSelectedDocPreview({ title: `PAN Card - ${viewingBeneficiary.beneficiaryName}`, type: 'PAN' })}
                                                className="h-28 bg-gradient-to-br from-emerald-50 to-teal-50 border border-dashed border-emerald-200 rounded-[8px] flex flex-col items-center justify-center cursor-pointer group-hover:bg-emerald-100/50 transition-colors p-2 text-center"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-1 shadow-sm">
                                                    PAN
                                                </div>
                                                <span className="text-xs font-bold text-brand-navy">Income Tax Dept</span>
                                                <span className="text-[11px] text-brand-muted font-mono mt-0.5">ABCDE1234F</span>
                                                <span className="text-[10px] text-emerald-700 font-semibold mt-1 group-hover:underline">Click to Zoom</span>
                                            </div>
                                        </div>

                                        {/* Cancel Cheque / Passbook Card */}
                                        <div className="border border-brand-border rounded-[10px] p-3.5 bg-white hover:border-brand-primary hover:shadow-sm transition-all group">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs font-bold text-brand-navy">Cancelled Cheque</span>
                                                <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-semibold">BANK PROOF</span>
                                            </div>
                                            <div
                                                onClick={() => setSelectedDocPreview({ title: `Cancelled Cheque / Passbook - ${viewingBeneficiary.beneficiaryName}`, type: 'CHEQUE' })}
                                                className="h-28 bg-gradient-to-br from-amber-50 to-orange-50 border border-dashed border-amber-200 rounded-[8px] flex flex-col items-center justify-center cursor-pointer group-hover:bg-amber-100/50 transition-colors p-2 text-center"
                                            >
                                                <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs mb-1 shadow-sm">
                                                    CHK
                                                </div>
                                                <span className="text-xs font-bold text-brand-navy">{viewingBeneficiary.bankName}</span>
                                                <span className="text-[11px] text-brand-muted font-mono mt-0.5">Acc: {viewingBeneficiary.accountNumber}</span>
                                                <span className="text-[10px] text-amber-700 font-semibold mt-1 group-hover:underline">Click to Zoom</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ACTION BUTTONS: DONE & BACK */}
                                <div className="flex items-center justify-center gap-4 pt-6 border-t border-brand-border">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            showToast(`Bank Details for ${viewingBeneficiary.beneficiaryName} confirmed.`);
                                            setViewingBeneficiary(null);
                                        }}
                                        className="px-8 py-2.5 bg-brand-primary hover:bg-[#1D4ED8] text-white font-bold text-sm rounded-[8px] shadow-sm transition-all cursor-pointer border-none flex items-center gap-2"
                                    >
                                        <CheckCircle2 size={16} />
                                        <span>DONE</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewingBeneficiary(null)}
                                        className="px-8 py-2.5 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm rounded-[8px] shadow-sm transition-all cursor-pointer border-none flex items-center gap-2"
                                    >
                                        <ChevronLeft size={16} />
                                        <span>Back</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* BENEFICIARY LIST / TABLE VIEW */
                        <div className="bg-white rounded-[12px] border border-brand-border shadow-sm overflow-hidden flex flex-col w-full min-w-0">
                            {/* Table Toolbar */}
                            <div className="p-4 bg-white border-b border-brand-border flex flex-col lg:flex-row items-center justify-between gap-4">
                                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                                    <div className="relative w-full sm:w-80">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-primary" size={17} />
                                        <input
                                            type="text"
                                            placeholder={`Search ${beneficiaryTypeFilter === 'FRANCHISE' ? 'Franchise' : 'Agent'} Name / Code / Mobile...`}
                                            value={beneficiarySearchQuery}
                                            onChange={(e) => setBeneficiarySearchQuery(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2 bg-white border border-brand-border rounded-[8px] text-[13px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        />
                                    </div>
                                    <div className="text-xs font-semibold text-brand-muted whitespace-nowrap bg-brand-lightbg px-3 py-2 rounded-[8px]">
                                        Total {beneficiaryTypeFilter.replace('_', ' ')}: <span className="text-brand-primary font-bold">{beneficiaries.filter(b => b.entityType === beneficiaryTypeFilter).length}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                                    {/* Horizontal Scroll Quick Controls */}
                                    <div className="hidden sm:flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-[8px] border border-brand-border">
                                        <button
                                            type="button"
                                            onClick={() => scrollBeneficiaryTableToEdge('start')}
                                            title="Scroll to Start"
                                            className="px-2 py-1 text-xs font-semibold text-brand-navy hover:text-brand-primary hover:bg-white rounded cursor-pointer transition-all border-none bg-transparent"
                                        >
                                            ⏮ Start
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => scrollBeneficiaryTable(-300)}
                                            title="Scroll Left"
                                            className="px-2 py-1 text-xs font-semibold text-brand-navy hover:text-brand-primary hover:bg-white rounded cursor-pointer transition-all border-none bg-transparent"
                                        >
                                            ◀ Left
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => scrollBeneficiaryTable(300)}
                                            title="Scroll Right"
                                            className="px-2 py-1 text-xs font-semibold text-brand-navy hover:text-brand-primary hover:bg-white rounded cursor-pointer transition-all border-none bg-transparent"
                                        >
                                            Right ▶
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => scrollBeneficiaryTableToEdge('end')}
                                            title="Scroll to End"
                                            className="px-2 py-1 text-xs font-semibold text-brand-navy hover:text-brand-primary hover:bg-white rounded cursor-pointer transition-all border-none bg-transparent"
                                        >
                                            End ⏭
                                        </button>
                                    </div>

                                    {/* CSV Export Button */}
                                    <button
                                        type="button"
                                        onClick={handleExportBeneficiaries}
                                        className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[8px] font-semibold text-xs transition-colors cursor-pointer border-none shadow-sm"
                                        title="Export records to CSV"
                                    >
                                        <Download size={14} />
                                        <span>Export</span>
                                    </button>

                                    {/* Add Beneficiary Button */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setBeneficiaryForm({
                                                beneficiaryName: '',
                                                entityType: beneficiaryTypeFilter,
                                                entityCode: beneficiaryTypeFilter === 'FRANCHISE' ? `FA${1035 + beneficiaries.length}` : `AGT${1100 + beneficiaries.length}`,
                                                bankName: 'HDFC BANK',
                                                accountNumber: '',
                                                ifscCode: '',
                                                accountType: 'SAVINGS',
                                                branch: 'PUNE',
                                                branchName: beneficiaryTypeFilter === 'FRANCHISE' ? 'FRANCHISES' : 'BARAMATI',
                                                address: '',
                                                mobile: ''
                                            });
                                            setModalType('BENEFICIARY');
                                        }}
                                        className="flex items-center gap-1.5 px-3.5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-[8px] font-semibold text-xs shadow-sm transition-all cursor-pointer border-none"
                                    >
                                        <Plus size={14} />
                                        <span>Add Beneficiary</span>
                                    </button>
                                </div>
                            </div>

                            {/* Full ERP Beneficiary Table with Horizontal Scroll */}
                            <div
                                ref={beneficiaryTableScrollRef}
                                className="w-full overflow-x-auto erp-horizontal-scrollbar min-w-0 bg-white"
                            >
                                <table className="w-full text-left border-collapse min-w-[1250px]">
                                    <thead>
                                        <tr className="bg-brand-primary text-white text-[12px] font-bold uppercase tracking-wider sticky top-0 z-10 select-none shadow-sm">
                                            <th className="py-3 px-3 text-center border-r border-blue-500/30 w-[80px]">VIEW</th>
                                            <th className="py-3 px-3 border-r border-blue-500/30 w-[110px]">CODE</th>
                                            <th className="py-3 px-4 border-r border-blue-500/30 w-[280px]">
                                                {beneficiaryTypeFilter === 'FRANCHISE' ? 'FRANCHISE' : 'AGENT NAME'}
                                            </th>
                                            <th className="py-3 px-3 border-r border-blue-500/30 w-[160px]">BRANCH NAME</th>
                                            <th className="py-3 px-4 border-r border-blue-500/30 min-w-[420px]">ADDRESS</th>
                                            <th className="py-3 px-3 w-[150px]">MOBLIE NO</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-brand-border text-[13px] bg-white">
                                        {beneficiaries
                                            .filter(b => {
                                                if (b.entityType !== beneficiaryTypeFilter) return false;
                                                if (!beneficiarySearchQuery.trim()) return true;
                                                const q = beneficiarySearchQuery.toLowerCase();
                                                return (
                                                    b.beneficiaryName?.toLowerCase().includes(q) ||
                                                    b.entityCode?.toLowerCase().includes(q) ||
                                                    b.mobile?.includes(q) ||
                                                    b.address?.toLowerCase().includes(q) ||
                                                    b.branchName?.toLowerCase().includes(q) ||
                                                    b.branch?.toLowerCase().includes(q)
                                                );
                                            })
                                            .map((b) => (
                                                <tr
                                                    key={b.id}
                                                    className="hover:bg-blue-50/50 transition-colors h-[48px]"
                                                >
                                                    {/* VIEW Link (Matches ERP blue VIEW action) */}
                                                    <td className="py-2.5 px-3 text-center border-r border-brand-border/60">
                                                        <button
                                                            type="button"
                                                            onClick={() => setViewingBeneficiary(b)}
                                                            className="text-brand-primary hover:text-blue-800 font-bold text-xs underline cursor-pointer bg-transparent border-none p-0 tracking-wide"
                                                        >
                                                            VIEW
                                                        </button>
                                                    </td>
                                                    {/* CODE */}
                                                    <td className="py-2.5 px-3 font-semibold text-brand-navy border-r border-brand-border/60 whitespace-nowrap">
                                                        {b.entityCode}
                                                    </td>
                                                    {/* FRANCHISE / AGENT NAME */}
                                                    <td className="py-2.5 px-4 font-semibold text-brand-navy border-r border-brand-border/60">
                                                        {b.beneficiaryName}
                                                    </td>
                                                    {/* BRANCH NAME */}
                                                    <td className="py-2.5 px-3 text-brand-navy border-r border-brand-border/60 whitespace-nowrap">
                                                        {b.branchName || b.branch || 'FRANCHISES'}
                                                    </td>
                                                    {/* ADDRESS */}
                                                    <td className="py-2.5 px-4 text-xs text-brand-muted border-r border-brand-border/60 leading-relaxed">
                                                        {b.address || 'NA,NA,PUNE,MAHARASHTRA'}
                                                    </td>
                                                    {/* MOBLIE NO */}
                                                    <td className="py-2.5 px-3 font-mono text-xs text-brand-navy whitespace-nowrap">
                                                        {b.mobile || 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        {beneficiaries.filter(b => b.entityType === beneficiaryTypeFilter).length === 0 && (
                                            <tr>
                                                <td colSpan={6} className="py-12 text-center text-brand-muted">
                                                    No {beneficiaryTypeFilter.replace('_', ' ').toLowerCase()} records found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Table Footer with scroll buttons & counter */}
                            <div className="p-3 bg-[#F8FAFC] border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-muted">
                                <div>
                                    Showing <strong className="text-brand-navy">{beneficiaries.filter(b => b.entityType === beneficiaryTypeFilter).length}</strong> {beneficiaryTypeFilter.replace('_', ' ').toLowerCase()} records
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => scrollBeneficiaryTableToEdge('start')}
                                        className="px-2 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                    >
                                        ⏮ Start
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => scrollBeneficiaryTable(-400)}
                                        className="px-2 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                    >
                                        ◀ Left
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => scrollBeneficiaryTable(400)}
                                        className="px-2 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                    >
                                        Right ▶
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => scrollBeneficiaryTableToEdge('end')}
                                        className="px-2 py-1 text-xs font-semibold text-brand-primary bg-white hover:bg-blue-50 border border-blue-200 rounded cursor-pointer transition-colors"
                                    >
                                        End ⏭
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* TAB 6: DELETE VEHICLE */}
            {activeTab === 'delete-vehicle' && (
                <DeleteVehicleTab />
            )}

            {/* TAB 7: DEACTIVATED AGENT LIST */}
            {activeTab === 'deactivated-agent-list' && (
                <DeactivatedAgentListTab />
            )}

            {/* PORTAL MODALS */}
            {typeof document !== 'undefined' && createPortal(
                <>
                    {/* MODAL: DELETE VEHICLE CONFIRMATION */}
                    {modalType === 'DELETE_VEHICLE' && selectedVehicleToDelete && (
                        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="bg-white rounded-[16px] max-w-md w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                                    <h3 className="font-bold text-brand-navy text-base">Confirm Vehicle Deletion</h3>
                                    <button onClick={() => setModalType(null)} className="p-1 text-brand-muted hover:text-brand-navy rounded-lg cursor-pointer">
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    <p className="text-sm text-brand-muted">
                                        Are you sure you want to delete vehicle <strong className="text-brand-navy font-mono">{selectedVehicleToDelete.regNo}</strong> ({selectedVehicleToDelete.makeModel})?
                                    </p>
                                    <div>
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Reason for Deletion</label>
                                        <select
                                            value={deleteReason}
                                            onChange={(e) => setDeleteReason(e.target.value)}
                                            className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm text-brand-navy focus:ring-1 focus:ring-rose-500 focus:outline-none"
                                        >
                                            <option value="Duplicate registration entry">Duplicate registration entry</option>
                                            <option value="Data entry typing error">Data entry typing error</option>
                                            <option value="Vehicle scrapped / Total loss">Vehicle scrapped / Total loss</option>
                                            <option value="RTO unlinked transfer">RTO unlinked transfer</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2">
                                        <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-brand-border text-brand-navy text-sm font-medium rounded-[8px] hover:bg-brand-mainbg cursor-pointer">Cancel</button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setVehicles(prev => prev.filter(v => v.id !== selectedVehicleToDelete.id));
                                                showToast(`Vehicle ${selectedVehicleToDelete.regNo} removed from records.`);
                                                setModalType(null);
                                            }}
                                            className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-[8px] cursor-pointer border-none"
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
                        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="bg-white rounded-[16px] max-w-lg w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                                    <h3 className="font-bold text-brand-navy text-base">Add Bank Beneficiary</h3>
                                    <button onClick={() => setModalType(null)} className="p-1 text-brand-muted hover:text-brand-navy rounded-lg cursor-pointer">
                                        <X size={18} />
                                    </button>
                                </div>
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    const newBeneficiary: BankBeneficiaryItem = {
                                        id: Date.now(),
                                        beneficiaryName: beneficiaryForm.beneficiaryName,
                                        entityType: beneficiaryForm.entityType as any,
                                        entityCode: beneficiaryForm.entityCode || (beneficiaryForm.entityType === 'FRANCHISE' ? `FA${1035 + beneficiaries.length}` : `AGT${1100 + beneficiaries.length}`),
                                        bankName: beneficiaryForm.bankName,
                                        accountNumber: beneficiaryForm.accountNumber,
                                        ifscCode: beneficiaryForm.ifscCode,
                                        branch: beneficiaryForm.branch,
                                        branchName: beneficiaryForm.branchName || (beneficiaryForm.entityType === 'FRANCHISE' ? 'FRANCHISES' : beneficiaryForm.branch),
                                        address: beneficiaryForm.address || 'PUNE, MAHARASHTRA',
                                        mobile: beneficiaryForm.mobile || '9822001122',
                                        verificationStatus: 'VERIFIED',
                                        otherAccHolderName: '-',
                                        otherBankName: '-',
                                        otherBranch: '-',
                                        otherAccountNo: '-',
                                        otherIfscCode: '-'
                                    };
                                    setBeneficiaries([newBeneficiary, ...beneficiaries]);
                                    showToast(`Beneficiary account for ${beneficiaryForm.beneficiaryName} added successfully.`);
                                    setModalType(null);
                                }} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto">
                                    <div>
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Beneficiary Legal Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={beneficiaryForm.beneficiaryName}
                                            onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, beneficiaryName: e.target.value.toUpperCase() })}
                                            placeholder="e.g. STANDARD OFFICE FRANCHISE"
                                            className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Entity Type</label>
                                            <select
                                                value={beneficiaryForm.entityType}
                                                onChange={(e) => {
                                                    const val = e.target.value as any;
                                                    setBeneficiaryForm({
                                                        ...beneficiaryForm,
                                                        entityType: val,
                                                        entityCode: val === 'FRANCHISE' ? `FA${1035 + beneficiaries.length}` : val === 'FRANCHISE_AGENT' ? `FA-AGT0${beneficiaries.length}` : `AGT${1100 + beneficiaries.length}`
                                                    });
                                                }}
                                                className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                            >
                                                <option value="FRANCHISE">FRANCHISE</option>
                                                <option value="AGENT">AGENT</option>
                                                <option value="FRANCHISE_AGENT">FRANCHISE AGENT</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Entity Code</label>
                                            <input
                                                type="text"
                                                required
                                                value={beneficiaryForm.entityCode}
                                                onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, entityCode: e.target.value.toUpperCase() })}
                                                placeholder="e.g. FA1035"
                                                className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm font-mono text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Mobile No</label>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                value={beneficiaryForm.mobile}
                                                onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, mobile: e.target.value })}
                                                placeholder="10-digit mobile"
                                                className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Bank Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={beneficiaryForm.bankName}
                                                onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, bankName: e.target.value.toUpperCase() })}
                                                placeholder="e.g. HDFC BANK"
                                                className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Account Number</label>
                                            <input
                                                type="text"
                                                required
                                                value={beneficiaryForm.accountNumber}
                                                onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, accountNumber: e.target.value })}
                                                placeholder="Bank Account No"
                                                className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm font-mono text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">IFSC Code</label>
                                            <input
                                                type="text"
                                                required
                                                value={beneficiaryForm.ifscCode}
                                                onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, ifscCode: e.target.value.toUpperCase() })}
                                                placeholder="e.g. HDFC0000123"
                                                className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm font-mono text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Branch</label>
                                            <input
                                                type="text"
                                                required
                                                value={beneficiaryForm.branch}
                                                onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, branch: e.target.value.toUpperCase() })}
                                                placeholder="e.g. PUNE"
                                                className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Branch Category</label>
                                            <input
                                                type="text"
                                                value={beneficiaryForm.branchName}
                                                onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, branchName: e.target.value.toUpperCase() })}
                                                placeholder="e.g. FRANCHISES"
                                                className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Address</label>
                                        <input
                                            type="text"
                                            value={beneficiaryForm.address}
                                            onChange={(e) => setBeneficiaryForm({ ...beneficiaryForm, address: e.target.value.toUpperCase() })}
                                            placeholder="Complete Address"
                                            className="w-full px-3.5 py-2 border border-brand-border rounded-[8px] text-sm text-brand-navy focus:ring-1 focus:ring-brand-primary focus:outline-none"
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
                                        <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-brand-border text-brand-navy text-sm font-medium rounded-[8px] hover:bg-brand-mainbg cursor-pointer">Cancel</button>
                                        <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-[8px] hover:bg-[#1D4ED8] cursor-pointer border-none">Add Beneficiary</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* MODAL: KYC & BANKING DOCUMENT PREVIEW */}
                    {selectedDocPreview && (
                        <div className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="bg-white rounded-[16px] max-w-2xl w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                <div className="bg-brand-primary px-6 py-4 flex items-center justify-between text-white">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-base">{selectedDocPreview.title}</span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedDocPreview(null)}
                                        className="p-1 rounded-full hover:bg-white/20 text-white cursor-pointer border-none bg-transparent"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                                <div className="p-6 space-y-4">
                                    {/* Simulated high quality document preview */}
                                    {selectedDocPreview.type === 'AADHAR' && (
                                        <div className="border-2 border-dashed border-blue-200 rounded-[12px] p-6 bg-gradient-to-b from-blue-50/50 to-white space-y-4">
                                            <div className="border-b border-blue-200 pb-3 flex items-center justify-between">
                                                <div className="text-xs font-bold text-brand-navy">GOVERNMENT OF INDIA / UIDAI</div>
                                                <div className="text-[11px] font-semibold text-brand-primary bg-blue-100 px-2 py-0.5 rounded">AADHAR - VERIFIED</div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-28 bg-blue-100 border border-blue-300 rounded flex flex-col items-center justify-center text-brand-muted text-xs font-semibold">
                                                    <span>PHOTO</span>
                                                </div>
                                                <div className="space-y-1.5 text-xs text-brand-navy">
                                                    <div><span className="text-brand-muted">Name:</span> <strong>{viewingBeneficiary?.beneficiaryName || 'MEMBER NAME'}</strong></div>
                                                    <div><span className="text-brand-muted">Entity Code:</span> <strong>{viewingBeneficiary?.entityCode || 'FA1016'}</strong></div>
                                                    <div><span className="text-brand-muted">DOB:</span> 15/08/1988</div>
                                                    <div><span className="text-brand-muted">Gender:</span> MALE</div>
                                                    <div><span className="text-brand-muted">Address:</span> {viewingBeneficiary?.address || 'PUNE, MAHARASHTRA'}</div>
                                                </div>
                                            </div>
                                            <div className="pt-3 border-t border-blue-200 flex items-center justify-between text-xs font-mono font-bold text-brand-navy tracking-widest">
                                                <span>XXXX</span>
                                                <span>XXXX</span>
                                                <span>8923</span>
                                            </div>
                                        </div>
                                    )}

                                    {selectedDocPreview.type === 'PAN' && (
                                        <div className="border-2 border-dashed border-emerald-200 rounded-[12px] p-6 bg-gradient-to-b from-emerald-50/50 to-white space-y-4">
                                            <div className="border-b border-emerald-200 pb-3 flex items-center justify-between">
                                                <div className="text-xs font-bold text-emerald-900">INCOME TAX DEPARTMENT - GOVT. OF INDIA</div>
                                                <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">PAN CARD</div>
                                            </div>
                                            <div className="space-y-2 text-xs text-brand-navy">
                                                <div><span className="text-brand-muted">Permanent Account Number (PAN):</span> <strong className="font-mono text-sm text-emerald-900 tracking-wider">ABCDE8912F</strong></div>
                                                <div><span className="text-brand-muted">Name:</span> <strong>{viewingBeneficiary?.beneficiaryName || 'MEMBER NAME'}</strong></div>
                                                <div><span className="text-brand-muted">Father's Name:</span> RAMCHANDRA</div>
                                                <div><span className="text-brand-muted">Date of Birth:</span> 15/08/1988</div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedDocPreview.type === 'CHEQUE' && (
                                        <div className="border-2 border-dashed border-amber-200 rounded-[12px] p-6 bg-gradient-to-b from-amber-50/50 to-white space-y-4">
                                            <div className="border-b border-amber-200 pb-3 flex items-center justify-between">
                                                <div className="text-xs font-bold text-brand-navy">{viewingBeneficiary?.bankName || 'BANK'} - CTS 2010</div>
                                                <div className="text-[11px] font-semibold text-rose-700 border border-rose-400 px-2 py-0.5 rounded font-mono font-bold tracking-wider">CANCELLED</div>
                                            </div>
                                            <div className="space-y-2 text-xs text-brand-navy">
                                                <div><span className="text-brand-muted">Account Holder:</span> <strong>{viewingBeneficiary?.beneficiaryName || 'MEMBER NAME'}</strong></div>
                                                <div><span className="text-brand-muted">Account Number:</span> <strong className="font-mono text-sm text-brand-primary">{viewingBeneficiary?.accountNumber || '50200012345678'}</strong></div>
                                                <div><span className="text-brand-muted">IFSC Code:</span> <strong className="font-mono text-brand-navy">{viewingBeneficiary?.ifscCode || 'HDFC0000123'}</strong></div>
                                                <div><span className="text-brand-muted">Branch:</span> {viewingBeneficiary?.branch || 'PUNE'}</div>
                                            </div>
                                            <div className="pt-3 border-t border-amber-200 text-center font-mono text-[11px] text-brand-muted tracking-widest">
                                                ⑈ 104523 ⑈ 411240012 ⑈ 003412 ⑈ 31
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-end pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setSelectedDocPreview(null)}
                                            className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-[8px] hover:bg-[#1D4ED8] cursor-pointer border-none"
                                        >
                                            Close Preview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* MODAL: REGISTER EMPLOYEE */}
                    {modalType === 'EMPLOYEE' && (
                        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="bg-white rounded-[16px] max-w-lg w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                                    <h3 className="font-bold text-brand-navy text-base">Register New Employee</h3>
                                    <button onClick={() => setModalType(null)} className="p-1 text-brand-muted hover:text-brand-navy rounded-lg cursor-pointer">
                                        <X size={18} />
                                    </button>
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
                                    setModalType(null);
                                }} className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. Ramesh S. Shinde"
                                            value={employeeForm.fullName}
                                            onChange={(e) => setEmployeeForm({ ...employeeForm, fullName: e.target.value })}
                                            className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Mobile</label>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                placeholder="10-digit mobile"
                                                value={employeeForm.mobile}
                                                onChange={(e) => setEmployeeForm({ ...employeeForm, mobile: e.target.value })}
                                                className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Branch</label>
                                            <select
                                                value={employeeForm.branch}
                                                onChange={(e) => setEmployeeForm({ ...employeeForm, branch: e.target.value })}
                                                className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
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
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Work Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="name@reliable.in"
                                            value={employeeForm.email}
                                            onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                                            className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Designation</label>
                                            <select
                                                value={employeeForm.designation}
                                                onChange={(e) => setEmployeeForm({ ...employeeForm, designation: e.target.value })}
                                                className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                            >
                                                <option value="Operations Executive">Operations Executive</option>
                                                <option value="Branch Manager">Branch Manager</option>
                                                <option value="Accountant">Accountant</option>
                                                <option value="Underwriter">Underwriter</option>
                                                <option value="Telecaller">Telecaller</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Department</label>
                                            <select
                                                value={employeeForm.department}
                                                onChange={(e) => setEmployeeForm({ ...employeeForm, department: e.target.value })}
                                                className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
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
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Date of Joining</label>
                                        <input
                                            type="date"
                                            required
                                            value={employeeForm.doj}
                                            onChange={(e) => setEmployeeForm({ ...employeeForm, doj: e.target.value })}
                                            className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-brand-border text-brand-navy text-sm font-medium rounded-[8px] hover:bg-brand-mainbg cursor-pointer">Cancel</button>
                                        <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-[8px] hover:bg-[#1D4ED8] cursor-pointer border-none">Register Employee</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {/* MODAL: REGISTER AGENT */}
                    {modalType === 'AGENT' && (
                        <div className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="bg-white rounded-[16px] max-w-lg w-full shadow-2xl border border-brand-border overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border">
                                    <h3 className="font-bold text-brand-navy text-base">Register New Agent</h3>
                                    <button onClick={() => setModalType(null)} className="p-1 text-brand-muted hover:text-brand-navy rounded-lg cursor-pointer">
                                        <X size={18} />
                                    </button>
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
                                    setModalType(null);
                                }} className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Partner Type</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {(['POSP', 'DIRECT', 'FRANCHISE', 'BROKER'] as const).map(t => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => setAgentForm({ ...agentForm, type: t })}
                                                    className={`py-2 px-3 text-xs font-semibold rounded-[8px] border transition-all cursor-pointer ${agentForm.type === t ? 'border-brand-primary bg-blue-50 text-brand-primary' : 'border-brand-border text-brand-muted hover:bg-brand-mainbg'}`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Full Legal Name</label>
                                        <input
                                            type="text"
                                            required
                                            placeholder="As per PAN card"
                                            value={agentForm.fullName}
                                            onChange={(e) => setAgentForm({ ...agentForm, fullName: e.target.value })}
                                            className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Mobile No</label>
                                            <input
                                                type="tel"
                                                required
                                                maxLength={10}
                                                placeholder="Mobile"
                                                value={agentForm.mobile}
                                                onChange={(e) => setAgentForm({ ...agentForm, mobile: e.target.value })}
                                                className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">PAN Card</label>
                                            <input
                                                type="text"
                                                required
                                                maxLength={10}
                                                placeholder="PAN No"
                                                value={agentForm.panNo}
                                                onChange={(e) => setAgentForm({ ...agentForm, panNo: e.target.value.toUpperCase() })}
                                                className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] font-mono text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Email ID</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="agent@example.com"
                                            value={agentForm.email}
                                            onChange={(e) => setAgentForm({ ...agentForm, email: e.target.value })}
                                            className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy placeholder-[#66809F] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-semibold text-brand-navy uppercase mb-1.5">Sponsoring Branch</label>
                                        <select
                                            value={agentForm.branch}
                                            onChange={(e) => setAgentForm({ ...agentForm, branch: e.target.value })}
                                            className="w-full px-3.5 py-2 bg-white border border-brand-border rounded-[8px] text-[14px] text-brand-navy focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                                        >
                                            <option value="BARAMATI">BARAMATI</option>
                                            <option value="CHHATRAPATI SAMBHAJINAGAR">SAMBHAJINAGAR</option>
                                            <option value="AKLUJ">AKLUJ</option>
                                            <option value="AHILYANAGAR">AHILYANAGAR</option>
                                            <option value="PUNE">PUNE</option>
                                            <option value="MUMBAI">MUMBAI</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-end gap-2 pt-2">
                                        <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 border border-brand-border text-brand-navy text-sm font-medium rounded-[8px] hover:bg-brand-mainbg cursor-pointer">Cancel</button>
                                        <button type="submit" className="px-5 py-2 bg-brand-primary text-white text-sm font-semibold rounded-[8px] hover:bg-[#1D4ED8] cursor-pointer border-none">Register Agent</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>,
                document.body
            )}
        </div>
    );
};

export default Registration;
