export interface AgentBusinessSummaryRecord {
  id: number;
  agent: string;
  location: string;
  salesExecutive: string;
  category: 'STANDARD' | 'SPECIAL' | 'KEY CHANNEL';
  pospName: string;
  championType: 'Regular' | 'Champion' | 'Super Champion';
  months: {
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    october: number;
    november: number;
    december: number;
    january: number;
    february: number;
    march: number;
  };
  total: number;
}

export interface AgentAnalyticsProfile {
  agentName: string;
  agentCode: string;
  location: string;
  category: 'STANDARD' | 'SPECIAL' | 'KEY CHANNEL';
  salesExecutive: string;
  pospCount: number;
  joinedDate: string;
  totalNetPremium: number;
  totalPolicies: number;
  growthRate: number;
  avgTicketSize: number;
  monthlyTrend: { month: string; premium: number; policies: number }[];
  productMix: { product: string; percent: number; premium: number }[];
  topPosps: { name: string; code: string; policies: number; premium: number; status: 'Active' | 'Inactive' }[];
}

export interface ExecutiveAnalyticsProfile {
  executiveName: string;
  employeeCode: string;
  location: string;
  designation: string;
  targetAmount: number;
  achievedAmount: number;
  achievementRate: number;
  managedAgentsCount: number;
  policiesIssued: number;
  incentiveEarned: number;
  rank: number;
  monthlyTrend: { month: string; target: number; achieved: number }[];
  agentsRoster: { agentName: string; location: string; category: string; premium: number; policies: number }[];
  productSplit: { product: string; percent: number }[];
}

export interface LocationAnalyticsProfile {
  locationName: string;
  region: string;
  branchHead: string;
  totalAgents: number;
  totalPosps: number;
  totalNetPremium: number;
  totalPolicies: number;
  branchRank: number;
  lossRatio: number;
  yoyGrowth: number;
  monthlyTrend: { month: string; premium: number; policies: number }[];
  topAgents: { name: string; pospName: string; category: string; premium: number }[];
  companyDistribution: { company: string; share: number; premium: number }[];
}

// Data exactly matching Screenshots 4 & 5: reliable-erp.com/Clerk/DashboardAgentSummery.aspx
export const initialAgentBusinessRecords: AgentBusinessSummaryRecord[] = [
  {
    id: 1,
    agent: 'PALLAVI HEMANT KAKULTE',
    location: 'NASHIK',
    salesExecutive: 'HEMANT RAJU KAKULTE',
    category: 'STANDARD',
    pospName: 'ASHUTOSH RAJENDRA KAKULTE',
    championType: 'Regular',
    months: {
      april: 1200189.55,
      may: 1609172.41,
      june: 1705337.62,
      july: 1182398.06,
      august: 800325.46,
      september: 1934232.28,
      october: 528522.70,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 8960178.08,
  },
  {
    id: 2,
    agent: 'ARBAJ RAFIK SHAIKH',
    location: 'DAUND',
    salesExecutive: 'MAYURI RAJENDRA MULE',
    category: 'SPECIAL',
    pospName: 'SANIYA ARIF SHAIKH',
    championType: 'Regular',
    months: {
      april: 1147268.48,
      may: 445159.33,
      june: 1008697.73,
      july: 841103.97,
      august: 667669.68,
      september: 1578790.08,
      october: 916557.17,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 6605246.44,
  },
  {
    id: 3,
    agent: 'MANOJ MAHENDER SINGH KUMAR',
    location: 'DHULE',
    salesExecutive: 'HEMANT ARUN PATIL',
    category: 'KEY CHANNEL',
    pospName: 'POONAM KUMARI',
    championType: 'Regular',
    months: {
      april: 1292071.83,
      may: 974065.44,
      june: 1218342.11,
      july: 1130957.33,
      august: 1215687.20,
      september: 596276.89,
      october: 98275.70,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 6525676.50,
  },
  {
    id: 4,
    agent: 'SAMIT',
    location: 'KARAD',
    salesExecutive: 'SHEKHAR DAGADU',
    category: 'KEY CHANNEL',
    pospName: 'SOMANATH SHANKAR SALUNKHE',
    championType: 'Regular',
    months: {
      april: 1388681.66,
      may: 821201.25,
      june: 880348.86,
      july: 690902.02,
      august: 1065326.00,
      september: 1050892.84,
      october: 499989.67,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 6397342.30,
  },
  {
    id: 5,
    agent: 'HEENA IRFAN MULLA',
    location: 'PUNE',
    salesExecutive: 'VIKAS RAWAT',
    category: 'SPECIAL',
    pospName: 'HEENA IRFAN MULLA',
    championType: 'Regular',
    months: {
      april: 691754.93,
      may: 691663.55,
      june: 753868.42,
      july: 924619.45,
      august: 871566.97,
      september: 1278593.11,
      october: 513498.35,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 5725564.78,
  },
  {
    id: 6,
    agent: 'NACHIKET RAJENDRA DHURI',
    location: 'KOLHAPUR',
    salesExecutive: 'NEHA SINGHAL',
    category: 'SPECIAL',
    pospName: 'NACHIKET RAJENDRA DHURI',
    championType: 'Regular',
    months: {
      april: 630541.09,
      may: 775810.88,
      june: 926815.79,
      july: 546340.68,
      august: 1012372.98,
      september: 908974.52,
      october: 343183.65,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 5144039.59,
  },
  {
    id: 7,
    agent: 'MURALIDHAR VITTHAL REVANE',
    location: 'SOLAPUR',
    salesExecutive: 'ANAND DESHMUKH',
    category: 'SPECIAL',
    pospName: 'MURALIDHAR VITTHAL REVANE',
    championType: 'Regular',
    months: {
      april: 897004.17,
      may: 589011.72,
      june: 649182.65,
      july: 719172.92,
      august: 1018125.03,
      september: 852301.65,
      october: 387925.41,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 5112723.55,
  },
  {
    id: 8,
    agent: 'BHAKTI BALIRAM',
    location: 'NASHIK',
    salesExecutive: 'HEMANT RAJU KAKULTE',
    category: 'STANDARD',
    pospName: 'BHAKTI BALIRAM',
    championType: 'Regular',
    months: {
      april: 0.00,
      may: 0.00,
      june: 0.00,
      july: 0.00,
      august: 0.00,
      september: 3257426.64,
      october: 1675964.99,
      november: 0.00,
      december: 0.00,
      january: 0.00,
      february: 0.00,
      march: 0.00,
    },
    total: 4933391.63,
  },
];

// Mock agent profiles for AnalyticDashboardAgent
export const mockAgentProfiles: Record<string, AgentAnalyticsProfile> = {
  'PALLAVI HEMANT KAKULTE': {
    agentName: 'PALLAVI HEMANT KAKULTE',
    agentCode: 'AG-9021',
    location: 'NASHIK',
    category: 'STANDARD',
    salesExecutive: 'HEMANT RAJU KAKULTE',
    pospCount: 14,
    joinedDate: '12 Jan 2023',
    totalNetPremium: 8960178.08,
    totalPolicies: 432,
    growthRate: 24.8,
    avgTicketSize: 20741,
    monthlyTrend: [
      { month: 'Apr', premium: 1200189, policies: 58 },
      { month: 'May', premium: 1609172, policies: 74 },
      { month: 'Jun', premium: 1705337, policies: 81 },
      { month: 'Jul', premium: 1182398, policies: 62 },
      { month: 'Aug', premium: 800325, policies: 41 },
      { month: 'Sep', premium: 1934232, policies: 92 },
      { month: 'Oct', premium: 528522, policies: 24 },
    ],
    productMix: [
      { product: 'Commercial Vehicle', percent: 42, premium: 3763274 },
      { product: 'Private Car Motor', percent: 28, premium: 2508849 },
      { product: 'Health Insurance', percent: 18, premium: 1612832 },
      { product: 'Two Wheeler', percent: 7, premium: 627212 },
      { product: 'Non Motor (Fire/Marine)', percent: 5, premium: 448008 },
    ],
    topPosps: [
      { name: 'ASHUTOSH RAJENDRA KAKULTE', code: 'POSP-1102', policies: 148, premium: 3120450, status: 'Active' },
      { name: 'SURESH PATIL', code: 'POSP-1188', policies: 96, premium: 1980300, status: 'Active' },
      { name: 'ANITA SHINDE', code: 'POSP-1240', policies: 74, premium: 1540120, status: 'Active' },
      { name: 'VIJAY BORSE', code: 'POSP-1309', policies: 62, premium: 1280400, status: 'Active' },
    ],
  },
  'ARBAJ RAFIK SHAIKH': {
    agentName: 'ARBAJ RAFIK SHAIKH',
    agentCode: 'AG-8814',
    location: 'DAUND',
    category: 'SPECIAL',
    salesExecutive: 'MAYURI RAJENDRA MULE',
    pospCount: 11,
    joinedDate: '05 Mar 2023',
    totalNetPremium: 6605246.44,
    totalPolicies: 320,
    growthRate: 19.4,
    avgTicketSize: 20641,
    monthlyTrend: [
      { month: 'Apr', premium: 1147268, policies: 52 },
      { month: 'May', premium: 445159, policies: 26 },
      { month: 'Jun', premium: 1008697, policies: 48 },
      { month: 'Jul', premium: 841103, policies: 42 },
      { month: 'Aug', premium: 667669, policies: 34 },
      { month: 'Sep', premium: 1578790, policies: 76 },
      { month: 'Oct', premium: 916557, policies: 42 },
    ],
    productMix: [
      { product: 'Private Car Motor', percent: 45, premium: 2972360 },
      { product: 'Commercial Vehicle', percent: 30, premium: 1981573 },
      { product: 'Health Insurance', percent: 15, premium: 990786 },
      { product: 'Non Motor', percent: 10, premium: 660524 },
    ],
    topPosps: [
      { name: 'SANIYA ARIF SHAIKH', code: 'POSP-2201', policies: 165, premium: 3410200, status: 'Active' },
      { name: 'RAHUL CHAVAN', code: 'POSP-2245', policies: 82, premium: 1720400, status: 'Active' },
      { name: 'KAVITA NAIK', code: 'POSP-2290', policies: 73, premium: 1474646, status: 'Active' },
    ],
  },
};

// Mock Sales Executives
export const mockSalesExecutives: string[] = [
  'HEMANT RAJU KAKULTE',
  'MAYURI RAJENDRA MULE',
  'HEMANT ARUN PATIL',
  'SHEKHAR DAGADU',
  'VIKAS RAWAT',
  'NEHA SINGHAL',
  'ANAND DESHMUKH',
];

export const mockExecutiveProfiles: Record<string, ExecutiveAnalyticsProfile> = {
  'HEMANT RAJU KAKULTE': {
    executiveName: 'HEMANT RAJU KAKULTE',
    employeeCode: 'EMP-3041',
    location: 'NASHIK',
    designation: 'Senior Area Sales Manager',
    targetAmount: 13000000,
    achievedAmount: 13893569.71,
    achievementRate: 106.8,
    managedAgentsCount: 18,
    policiesIssued: 670,
    incentiveEarned: 185400,
    rank: 1,
    monthlyTrend: [
      { month: 'Apr', target: 1800000, achieved: 1200189 },
      { month: 'May', target: 1800000, achieved: 1609172 },
      { month: 'Jun', target: 1900000, achieved: 1705337 },
      { month: 'Jul', target: 1800000, achieved: 1182398 },
      { month: 'Aug', target: 1800000, achieved: 800325 },
      { month: 'Sep', target: 2000000, achieved: 5191658 },
      { month: 'Oct', target: 1900000, achieved: 2204487 },
    ],
    agentsRoster: [
      { agentName: 'PALLAVI HEMANT KAKULTE', location: 'NASHIK', category: 'STANDARD', premium: 8960178.08, policies: 432 },
      { agentName: 'BHAKTI BALIRAM', location: 'NASHIK', category: 'STANDARD', premium: 4933391.63, policies: 238 },
      { agentName: 'SUNIL KSHIRSAGAR', location: 'NASHIK', category: 'STANDARD', premium: 1450200.00, policies: 64 },
    ],
    productSplit: [
      { product: 'Commercial Vehicle', percent: 40 },
      { product: 'Private Car Motor', percent: 32 },
      { product: 'Health Insurance', percent: 16 },
      { product: 'Non Motor', percent: 12 },
    ],
  },
  'MAYURI RAJENDRA MULE': {
    executiveName: 'MAYURI RAJENDRA MULE',
    employeeCode: 'EMP-3092',
    location: 'DAUND / PUNE',
    designation: 'Area Sales Manager',
    targetAmount: 8000000,
    achievedAmount: 8240500.00,
    achievementRate: 103.0,
    managedAgentsCount: 12,
    policiesIssued: 410,
    incentiveEarned: 112000,
    rank: 3,
    monthlyTrend: [
      { month: 'Apr', target: 1100000, achieved: 1147268 },
      { month: 'May', target: 1100000, achieved: 445159 },
      { month: 'Jun', target: 1200000, achieved: 1008697 },
      { month: 'Jul', target: 1100000, achieved: 841103 },
      { month: 'Aug', target: 1100000, achieved: 667669 },
      { month: 'Sep', target: 1300000, achieved: 1578790 },
      { month: 'Oct', target: 1100000, achieved: 916557 },
    ],
    agentsRoster: [
      { agentName: 'ARBAJ RAFIK SHAIKH', location: 'DAUND', category: 'SPECIAL', premium: 6605246.44, policies: 320 },
      { agentName: 'GANESH JADHAV', location: 'BARAMATI', category: 'STANDARD', premium: 1635253.56, policies: 90 },
    ],
    productSplit: [
      { product: 'Private Car Motor', percent: 48 },
      { product: 'Commercial Vehicle', percent: 28 },
      { product: 'Health Insurance', percent: 14 },
      { product: 'Non Motor', percent: 10 },
    ],
  },
};

// Mock Locations / Branches
export const mockLocations: string[] = [
  'NASHIK',
  'DAUND',
  'DHULE',
  'KARAD',
  'PUNE',
  'KOLHAPUR',
  'SOLAPUR',
  'MUMBAI CENTRAL',
  'NOIDA',
  'JAIPUR',
  'AHMEDABAD',
];

export const mockLocationProfiles: Record<string, LocationAnalyticsProfile> = {
  NASHIK: {
    locationName: 'NASHIK BRANCH',
    region: 'North Maharashtra',
    branchHead: 'Rajeshwar Patil',
    totalAgents: 42,
    totalPosps: 98,
    totalNetPremium: 13893569.71,
    totalPolicies: 670,
    branchRank: 1,
    lossRatio: 38.4,
    yoyGrowth: 28.5,
    monthlyTrend: [
      { month: 'Apr', premium: 1200189, policies: 58 },
      { month: 'May', premium: 1609172, policies: 74 },
      { month: 'Jun', premium: 1705337, policies: 81 },
      { month: 'Jul', premium: 1182398, policies: 62 },
      { month: 'Aug', premium: 800325, policies: 41 },
      { month: 'Sep', premium: 5191658, policies: 248 },
      { month: 'Oct', premium: 2204487, policies: 106 },
    ],
    topAgents: [
      { name: 'PALLAVI HEMANT KAKULTE', pospName: 'ASHUTOSH RAJENDRA KAKULTE', category: 'STANDARD', premium: 8960178.08 },
      { name: 'BHAKTI BALIRAM', pospName: 'BHAKTI BALIRAM', category: 'STANDARD', premium: 4933391.63 },
    ],
    companyDistribution: [
      { company: 'HDFC ERGO GENERAL INSURANCE', share: 34, premium: 4723813 },
      { company: 'TATA AIG GENERAL INSURANCE', share: 26, premium: 3612328 },
      { company: 'BAJAJ ALLIANZ GENERAL INSURANCE', share: 20, premium: 2778713 },
      { company: 'INDUSIND GENERAL INSURANCE', share: 12, premium: 1667228 },
      { company: 'NATIONAL INSURANCE CO.', share: 8, premium: 1111485 },
    ],
  },
  PUNE: {
    locationName: 'PUNE HEAD OFFICE',
    region: 'Western Maharashtra',
    branchHead: 'Vikram Joshi',
    totalAgents: 64,
    totalPosps: 142,
    totalNetPremium: 18240500.00,
    totalPolicies: 940,
    branchRank: 2,
    lossRatio: 41.2,
    yoyGrowth: 32.1,
    monthlyTrend: [
      { month: 'Apr', premium: 2100000, policies: 110 },
      { month: 'May', premium: 2400000, policies: 125 },
      { month: 'Jun', premium: 2650000, policies: 138 },
      { month: 'Jul', premium: 2300000, policies: 118 },
      { month: 'Aug', premium: 2500000, policies: 130 },
      { month: 'Sep', premium: 3800000, policies: 195 },
      { month: 'Oct', premium: 2490500, policies: 124 },
    ],
    topAgents: [
      { name: 'HEENA IRFAN MULLA', pospName: 'HEENA IRFAN MULLA', category: 'SPECIAL', premium: 5725564.78 },
      { name: 'RAKESH KULKARNI', pospName: 'SACHIN KULKARNI', category: 'KEY CHANNEL', premium: 4210400.00 },
    ],
    companyDistribution: [
      { company: 'TATA AIG GENERAL INSURANCE', share: 32, premium: 5836960 },
      { company: 'HDFC ERGO GENERAL INSURANCE', share: 28, premium: 5107340 },
      { company: 'ICICI LOMBARD GENERAL INSURANCE', share: 22, premium: 4012910 },
      { company: 'UNITED INDIA INSURANCE', share: 18, premium: 3283290 },
    ],
  },
};
