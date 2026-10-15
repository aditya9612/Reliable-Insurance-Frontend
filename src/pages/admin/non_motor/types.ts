export type NonMotorSubTab =
  | 'commission'
  | 'insurance-type'
  | 'insurance-sub-type'
  | 'insurance-type-of-sub-type'
  | 'recalculation';

export type CommissionGridFor =
  | 'Broker'
  | 'Self'
  | 'Reliable Agent'
  | 'Franchise'
  | 'Franchise Agent'
  | 'Insurance Exective';

export interface NonMotorCommissionGridItem {
  id: number;
  gridFor: CommissionGridFor;
  entityName: string;
  companyName: string;
  policyType: string;
  policySubType: string;
  validFrom: string;
  commissionPercent: number;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface InsuranceTypeItem {
  id: number;
  insuranceType: string;
  insuranceCompany: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface InsuranceSubTypeItem {
  id: number;
  insuranceType: string;
  insuranceSubType: string;
  insuranceCompany: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface InsuranceTypeOfSubTypeItem {
  id: number;
  insuranceCompany: string;
  insuranceType: string;
  insuranceSubType: string;
  insuranceTypeOfSubType: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface NonMotorRecalculationItem {
  id: number;
  policyNo: string;
  clientName: string;
  companyName: string;
  policyType: string;
  policySubType: string;
  transactionDate: string;
  netPremium: number;
  currentCommPercent: number;
  newCommPercent: number;
  diffAmount: number;
  status: 'Pending' | 'Recalculated' | 'Approved' | 'Locked';
  recalculatedDate?: string;
  recalculatedBy?: string;
}

// Backward-compatibility alias
export type NonMotorCommissionRule = NonMotorCommissionGridItem;
