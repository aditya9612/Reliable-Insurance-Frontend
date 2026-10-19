export interface ClusterItem {
  id: number;
  insuranceCompany: string;
  clusterName: string;
  state: string;
  locations: string[]; // e.g. ['MH-12 PUNE', 'MH-14 PIMPRI CHINCHWAD', 'MH-42 BARAMATI']
}

export interface BrokerGridRule {
  id: number;
  broker: string;
  insuranceCompany: string;
  vehicleType: string;
  validFrom: string;
  state: string;
  clusterName: string;
  fuelType: string;
  odRate: string;
  tpRate: string;
  netRate: string;
  status: 'Active' | 'Inactive';
}

export interface AgentGridRule {
  id: number;
  broker: string;
  insuranceCompany: string;
  branch: string;
  agentName: string;
  vehicleType: string;
  validFrom: string;
  state: string;
  clusterName: string;
  fuelType: string;
  odRate: string;
  tpRate: string;
  netRate: string;
  status: 'Active' | 'Inactive';
}

export const initialClusters: ClusterItem[] = [
  {
    id: 1,
    insuranceCompany: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
    clusterName: 'PUNE R1',
    state: 'MAHARASHTRA',
    locations: ['MH-12 PUNE', 'MH-14 PIMPRI CHINCHWAD', 'MH-42 BARAMATI']
  },
  {
    id: 2,
    insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
    clusterName: 'MUMBAI AND SURROUNDING + PUNE',
    state: 'MAHARASHTRA',
    locations: ['MH-01 MUMBAI CENTRAL', 'MH-02 MUMBAI WESTERN', 'MH-03 MUMBAI EASTERN', 'MH-04 THANE']
  },
  {
    id: 3,
    insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
    clusterName: 'WESTERN MAHARASHTRA CLUSTER',
    state: 'MAHARASHTRA',
    locations: ['MH-09 KOLHAPUR', 'MH-10 SANGLI', 'MH-11 SATARA', 'MH-13 SOLAPUR']
  },
  {
    id: 4,
    insuranceCompany: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
    clusterName: 'VIDARBHA & MARATHWADA',
    state: 'MAHARASHTRA',
    locations: ['MH-20 AURANGABAD', 'MH-27 AMRAVATI', 'MH-31 NAGPUR', 'MH-26 NANDED']
  },
  {
    id: 5,
    insuranceCompany: 'ICICI LOMBARD GENERAL INSURANCE CO. LTD',
    clusterName: 'AHMEDABAD METRO',
    state: 'GUJARAT',
    locations: ['GJ-01 AHMEDABAD', 'GJ-27 AHMEDABAD EAST', 'GJ-06 VADODARA']
  }
];

export const initialBrokerGridRules: BrokerGridRule[] = [
  {
    id: 1,
    broker: 'RELIABLE INSURANCE BROKERS',
    insuranceCompany: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
    vehicleType: '4W PRIVATE CAR (COMPREHENSIVE)',
    validFrom: '01/04/2026',
    state: 'MAHARASHTRA',
    clusterName: 'PUNE R1',
    fuelType: 'PETROL / DIESEL',
    odRate: '18.5%',
    tpRate: '2.5%',
    netRate: '16.0%',
    status: 'Active'
  },
  {
    id: 2,
    broker: 'RELIABLE INSURANCE BROKERS',
    insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
    vehicleType: 'COMMERCIAL GOODS VEHICLE (GCV)',
    validFrom: '15/04/2026',
    state: 'MAHARASHTRA',
    clusterName: 'MUMBAI AND SURROUNDING + PUNE',
    fuelType: 'DIESEL',
    odRate: '15.0%',
    tpRate: '2.0%',
    netRate: '13.5%',
    status: 'Active'
  },
  {
    id: 3,
    broker: 'DIRECT BROKERAGE DIVISION',
    insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
    vehicleType: '2W MOTORCYCLE',
    validFrom: '01/05/2026',
    state: 'MAHARASHTRA',
    clusterName: 'WESTERN MAHARASHTRA CLUSTER',
    fuelType: 'PETROL',
    odRate: '21.0%',
    tpRate: '2.5%',
    netRate: '19.5%',
    status: 'Active'
  },
  {
    id: 4,
    broker: 'RELIABLE INSURANCE BROKERS',
    insuranceCompany: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
    vehicleType: 'PASSENGER CARRYING (PCV)',
    validFrom: '01/05/2026',
    state: 'MAHARASHTRA',
    clusterName: 'VIDARBHA & MARATHWADA',
    fuelType: 'CNG / DIESEL',
    odRate: '14.5%',
    tpRate: '2.0%',
    netRate: '13.0%',
    status: 'Active'
  }
];

export const initialAgentGridRules: AgentGridRule[] = [
  {
    id: 1,
    broker: 'RELIABLE INSURANCE BROKERS',
    insuranceCompany: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
    branch: 'BARAMATI BRANCH',
    agentName: 'RAEES KHAN (AG-10024)',
    vehicleType: '4W PRIVATE CAR (COMPREHENSIVE)',
    validFrom: '01/04/2026',
    state: 'MAHARASHTRA',
    clusterName: 'PUNE R1',
    fuelType: 'PETROL / DIESEL',
    odRate: '15.5%',
    tpRate: '2.0%',
    netRate: '14.0%',
    status: 'Active'
  },
  {
    id: 2,
    broker: 'RELIABLE INSURANCE BROKERS',
    insuranceCompany: 'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
    branch: 'PUNE CITY HUB',
    agentName: 'VIKAS PRATAP KALE (AG-10018)',
    vehicleType: 'COMMERCIAL GOODS VEHICLE (GCV)',
    validFrom: '15/04/2026',
    state: 'MAHARASHTRA',
    clusterName: 'MUMBAI AND SURROUNDING + PUNE',
    fuelType: 'DIESEL',
    odRate: '12.5%',
    tpRate: '1.5%',
    netRate: '11.5%',
    status: 'Active'
  },
  {
    id: 3,
    broker: 'RELIABLE INSURANCE BROKERS',
    insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD',
    branch: 'SOLAPUR BRANCH',
    agentName: 'PRADEEP SAMBHAJI JADHAV (AG-10031)',
    vehicleType: '2W MOTORCYCLE',
    validFrom: '01/05/2026',
    state: 'MAHARASHTRA',
    clusterName: 'WESTERN MAHARASHTRA CLUSTER',
    fuelType: 'PETROL',
    odRate: '18.0%',
    tpRate: '2.0%',
    netRate: '17.0%',
    status: 'Active'
  },
  {
    id: 4,
    broker: 'DIRECT BROKERAGE DIVISION',
    insuranceCompany: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
    branch: 'NAGPUR BRANCH',
    agentName: 'PRACHI SWAPNIL PANDULE (AG-10052)',
    vehicleType: 'PASSENGER CARRYING (PCV)',
    validFrom: '01/05/2026',
    state: 'MAHARASHTRA',
    clusterName: 'VIDARBHA & MARATHWADA',
    fuelType: 'CNG / DIESEL',
    odRate: '11.5%',
    tpRate: '1.5%',
    netRate: '10.5%',
    status: 'Active'
  }
];

export const insuranceCompaniesList = [
  'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD',
  'MAGMA HDI GENERAL INSURANCE COMPANY LIMITED',
  'TATA AIG GENERAL INSURANCE CO. LTD',
  'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD',
  'ICICI LOMBARD GENERAL INSURANCE CO. LTD',
  'HDFC ERGO GENERAL INSURANCE COMPANY LIMITED',
  'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED',
  'GO DIGIT GENERAL INSURANCE LIMITED',
  'UNITED INDIA INSURANCE CO. LTD',
  'THE NEW INDIA ASSURANCE CO. LTD'
];

export const statesList = [
  'MAHARASHTRA',
  'GUJARAT',
  'KARNATAKA',
  'MADHYA PRADESH',
  'GOA',
  'DELHI NCR',
  'RAJASTHAN',
  'TAMIL NADU'
];

export const rtoListMaharashtra = [
  'MH-01 MUMBAI CENTRAL',
  'MH-02 MUMBAI WESTERN',
  'MH-03 MUMBAI EASTERN',
  'MH-04 THANE',
  'MH-05 KALYAN',
  'MH-06 RAIGAD',
  'MH-09 KOLHAPUR',
  'MH-10 SANGLI',
  'MH-11 SATARA',
  'MH-12 PUNE',
  'MH-13 SOLAPUR',
  'MH-14 PIMPRI CHINCHWAD',
  'MH-20 AURANGABAD',
  'MH-26 NANDED',
  'MH-27 AMRAVATI',
  'MH-31 NAGPUR',
  'MH-42 BARAMATI',
  'MH-43 NAVI MUMBAI',
  'MH-50 KARAD'
];

export const brokersList = [
  'RELIABLE INSURANCE BROKERS',
  'DIRECT BROKERAGE DIVISION',
  'MAHARASHTRA AGGREGATOR HUB',
  'PRIME RISK BROKERS'
];

export const vehicleTypesList = [
  '4W PRIVATE CAR (COMPREHENSIVE)',
  '4W PRIVATE CAR (TP ONLY)',
  '4W PRIVATE CAR (SAOD)',
  '2W MOTORCYCLE (COMPREHENSIVE)',
  '2W MOTORCYCLE (TP ONLY)',
  '2W SCOOTER (ELECTRIC / EV)',
  'COMMERCIAL GOODS VEHICLE (GCV)',
  'PASSENGER CARRYING (PCV)',
  'MISCELLANEOUS D CLASS VEHICLE',
  'SCHOOL BUS / STAFF BUS'
];

export const branchesList = [
  'BARAMATI BRANCH',
  'PUNE CITY HUB',
  'SOLAPUR BRANCH',
  'NAGPUR BRANCH',
  'KOLHAPUR BRANCH',
  'SATARA BRANCH'
];

export const agentsList = [
  'RAEES KHAN (AG-10024)',
  'VIKAS PRATAP KALE (AG-10018)',
  'PRADEEP SAMBHAJI JADHAV (AG-10031)',
  'PRACHI SWAPNIL PANDULE (AG-10052)',
  'SHEKHAR DAGADU KADAM (AG-10009)',
  'ABHISHEK VILAS GAIKWAD (AG-10005)',
  'VAIBHAV RAMCHANDRA SONMALE (AG-10012)'
];
