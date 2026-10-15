export type FranchiseSubTab =
  | 'franchise-master'
  | 'view-franchise'
  | 'franchise-commission';

export interface KycDocItem {
  id: string;
  name: string;
  fileName?: string;
  fileSize?: string;
  uploadDate?: string;
}

export interface FranchiseItem {
  id: number;
  // Coordinator Details
  franchiseType?: string;
  branch: string;
  salesExecutive?: string;
  classType?: string;
  reporting?: string;
  coordinator?: string;
  quotationCoordinator?: string;
  inspectionCoordinator?: string;
  endorsementCoordinator?: string;
  dateOfJoining?: string;
  agentTds?: string;

  // Franchise Details
  code: string;
  initial?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name: string;
  gender?: string;
  addressLine1?: string;
  addressLine2?: string;
  address?: string;
  state?: string;
  district?: string;
  taluka?: string;
  pincode?: string;
  dob?: string;
  maritalStatus?: string;
  mobile1?: string;
  mobile2?: string;
  mobile: string;
  email: string;
  panNo: string;
  aadharNo?: string;
  nomineeName?: string;

  // Commercial / Category
  category?: 'Platinum' | 'Gold' | 'Silver' | 'Standard';
  commissionRate?: number;
  securityDeposit?: number;

  // Bank Details
  bankName: string;
  bankBranch?: string;
  accountNo: string;
  ifscCode: string;

  // User Details
  username?: string;
  password?: string;

  // KYC
  kycDocuments?: KycDocItem[];

  // ERP System Process Fields
  businessProcess?: string;
  lineOfBusiness?: string;
  functionType?: string;
  designation?: string;
  userRole?: string;
  franchiseTds?: string;

  // Stats / Status
  totalAgents?: number;
  activePolicies?: number;
  monthlyTurnover?: number;
  status: 'ACTIVE' | 'INACTIVE';
  joinedDate: string;
  city?: string;
  gstNo?: string;
  contactPerson?: string;
}

export interface FranchiseCommissionRecord {
  id: number;
  voucherNo: string;
  franchiseCode: string;
  franchiseName: string;
  policyNo: string;
  insuredName: string;
  company: string;
  segment: string;
  grossPremium: number;
  netPremium: number;
  odPercent: number;
  odAmount: number;
  tpPercent: number;
  tpAmount: number;
  commissionPercent: number;
  franchiseCommission: number;
  tdsPercent: number;
  tdsAmount: number;
  netPayable: number;
  payoutDate: string;
  status: 'Paid' | 'Pending' | 'Processing';
  paymentMode: 'NEFT' | 'RTGS' | 'Cheque' | 'Pending';
}

export interface FranchiseCommissionGridRule {
  id: number;
  rtoType: 'REGULAR' | 'RTO';
  franchiseTarget: 'Franchise' | 'Franchise Agent';
  broker: string;
  branch: string;
  franchiseName: string;
  companyName: string;
  commDate: string;
  referenceType: string;
  vehicleType: string;
  policyType: string;
  make: string;
  model: string;
  ncb: string;
  yearSlabApplicable: boolean;
  yearSlab: string;
  fuelType: string;
  productType: string;
  raOdDiscount: string;
  odDiscount: string;
  raTpCommission: string;
  tpCommission: string;
  raOdCommission: string;
  odCommission: string;
  raNetCommission: string;
  netCommission: string;
  misp: string;
  ndNnd: string;
  status: 'ACTIVE' | 'INACTIVE';
}
