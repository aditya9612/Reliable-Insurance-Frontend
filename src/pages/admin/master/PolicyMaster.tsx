import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Edit2, Trash2, Search, X } from 'lucide-react';

type SubTab =
  | 'businessType'
  | 'productType'
  | 'insuranceCompany'
  | 'policyMode'
  | 'policyType'
  | 'rto'
  | 'paymentMode'
  | 'paToOwnerDriver'
  | 'companyPortal'
  | 'brokerTds'
  | 'agentTds'
  | 'serviceCharge'
  | 'creditMaster'
  | 'locationMaster';

interface SimpleItem { id: number; title: string; }
interface InsuranceCompanyItem { id: number; company: string; branchName: string; branchCode: string; mailId: string; }
interface PolicyTypeItem { id: number; title: string; vehicleType: string; }
interface RtoItem { id: number; location: string; regCode: string; state: string; district: string; }
interface PaOwnerDriverItem { id: number; company: string; rate: number; }
interface LocationItem { id: number; location: string; }
interface BrokerTdsItem {
  id: number;
  tdsId: number;
  brokerName: string;
  insuranceCompany: string;
  tdsCut: number | string;
  validFrom: string;
}

const PolicyMaster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('businessType');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Filters State
  const [tdsTarget, setTdsTarget] = useState<'Agent' | 'Franchise' | 'FranchiseAgent'>('Agent');
  const [serviceChargeTargets, setServiceChargeTargets] = useState<{ agent: boolean; franchise: boolean; franchiseAgent: boolean }>({ agent: true, franchise: false, franchiseAgent: false });
  const [selectedBroker, setSelectedBroker] = useState('RELIABLE ASSOCIATES');
  const [creditCategory, setCreditCategory] = useState<'Executive' | 'Agent'>('Executive');
  const [selectedExecutive, setSelectedExecutive] = useState('');

  // Form Details States for TDS & Service Charge
  const [tdsDetailsCompany, setTdsDetailsCompany] = useState('');
  const [tdsDetailsBranch, setTdsDetailsBranch] = useState('');
  const [tdsValidFrom, setTdsValidFrom] = useState('');
  const [tdsRate, setTdsRate] = useState('');

  // Broker TDS Rate State (from adm_tdsrateforBroker.aspx)
  const [brokerTdsList, setBrokerTdsList] = useState<BrokerTdsItem[]>([
    { id: 1, tdsId: 1, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'ICICI LOMBARD GENERAL INSURANCE CO. LTD', tdsCut: 7.5, validFrom: '31/10/2021' },
    { id: 2, tdsId: 2, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'HDFC ERGO GENERAL INSURANCE CO. LTD', tdsCut: 0.1, validFrom: '01/11/2022' },
    { id: 3, tdsId: 3, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'INDUSIND GENERAL INSURANCE CO. LTD', tdsCut: 7.5, validFrom: '01/11/2020' },
    { id: 4, tdsId: 4, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED', tdsCut: 1, validFrom: '01/11/2020' },
    { id: 5, tdsId: 5, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD', tdsCut: 7.5, validFrom: '01/11/2020' },
    { id: 6, tdsId: 6, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD', tdsCut: 7.5, validFrom: '01/11/2020' },
    { id: 7, tdsId: 7, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'BHARTI AXA GENERAL INSURANCE COMPANY LIMITED', tdsCut: 1, validFrom: '01/11/2020' },
    { id: 8, tdsId: 8, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'GO DIGIT GENERAL INSURANCE LIMITED', tdsCut: 2, validFrom: '01/11/2021' },
    { id: 9, tdsId: 10, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'RAHEJA QBE GENERAL INSURANCE COMPANY LIMITED', tdsCut: 0.1, validFrom: '01/11/2020' },
    { id: 10, tdsId: 27, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'TATA AIG GENERAL INSURANCE CO. LTD', tdsCut: 0.01, validFrom: '15/11/2021' },
    { id: 11, tdsId: 28, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'INDUSIND GENERAL INSURANCE CO. LTD', tdsCut: 0.01, validFrom: '15/11/2021' },
    { id: 12, tdsId: 29, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'HDFC ERGO GENERAL INSURANCE CO. LTD', tdsCut: 0.1, validFrom: '15/11/2021' },
    { id: 13, tdsId: 30, brokerName: 'RELIABLE - ASSOCIATES', insuranceCompany: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED', tdsCut: 0.01, validFrom: '15/11/2021' },
  ]);
  const [editingBrokerTdsItem, setEditingBrokerTdsItem] = useState<BrokerTdsItem | null>(null);
  const [brokerTdsSearch, setBrokerTdsSearch] = useState('');
  const [brokerTdsPage, setBrokerTdsPage] = useState(1);
  const [brokerTdsPerPage, setBrokerTdsPerPage] = useState(10);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [scSelectedBranches, setScSelectedBranches] = useState<string[]>(['AHILYANAGAR', 'BARAMATI']);
  const [scValidFrom, setScValidFrom] = useState('');
  const [scRate, setScRate] = useState('0');
  const [creditValue, setCreditValue] = useState('');

  // Sample Branches list for Service Charge
  const sampleBranchesList = [
    'AHILYANAGAR', 'AKLUJ', 'AKOLA', 'AMRAVATI', 'BARAMATI', 'BARSHI', 'BEED', 'BHIGWAN',
    'BULDHANA', 'CHANDRAPUR', 'CHHATRAPATI SAMBHAJINAGAR', 'CHOWPHULA', 'DHULE', 'FRANCHISES',
    'GOA', 'JALGOAN', 'JALNA', 'KARAD', 'KEY CHANNEL', 'KHAMGOAN', 'KOLHAPUR', 'LATUR', 'LATUR A', 'MUMBAI',
    'NAGPUR', 'NANDURBAR', 'NASHIK', 'PARBHANI', 'PUNE', 'RAJKOT(GJ)', 'SANGLI', 'SATARA', 'SOLAPUR', 'SURAT(GJ)', 'YAVATMAL'
  ];

  // Data Lists
  const [businessTypes, setBusinessTypes] = useState<SimpleItem[]>([
    { id: 1, title: 'NEW' },
    { id: 2, title: 'RENEWAL' },
    { id: 3, title: 'ROLL OVER' },
  ]);

  const [productTypes, setProductTypes] = useState<SimpleItem[]>([
    { id: 1, title: 'COMPREHENSIVE' },
    { id: 2, title: 'SAOD' },
    { id: 3, title: 'STP' },
  ]);

  const [policyModes, setPolicyModes] = useState<SimpleItem[]>([
    { id: 1, title: 'BREAKING' },
    { id: 2, title: 'CONTINUE' },
    { id: 3, title: 'NEW' },
  ]);

  const [paymentModes, setPaymentModes] = useState<SimpleItem[]>([
    { id: 1, title: 'CASH' },
    { id: 2, title: 'CHEQUE' },
    { id: 3, title: 'DD' },
    { id: 4, title: 'E-WALLET' },
    { id: 5, title: 'EMI' },
    { id: 6, title: 'NEFT' },
    { id: 7, title: 'ONLINE TO BROKER' },
    { id: 8, title: 'ONLINE TO INSURANCE COMPANY' },
  ]);

  const [policyTypes, setPolicyTypes] = useState<PolicyTypeItem[]>([
    { id: 1, title: 'PRIVATE CAR', vehicleType: 'PRIVATE CAR' },
    { id: 2, title: 'GCV 0 - 2500 GVW', vehicleType: 'COMMERCIAL' },
    { id: 3, title: 'GCV 0 - 2000 GVW', vehicleType: 'COMMERCIAL' },
    { id: 4, title: 'GCV 2501 -3000 GVW', vehicleType: 'COMMERCIAL' },
    { id: 5, title: 'GCV 2501 - 3500 GVW', vehicleType: 'COMMERCIAL' },
    { id: 6, title: 'GCV 3000 - 7000 GVW', vehicleType: 'COMMERCIAL' },
    { id: 7, title: 'GCV 3500 - 7500 GVW', vehicleType: 'COMMERCIAL' },
    { id: 8, title: 'GCV 0-2600 GVW', vehicleType: 'COMMERCIAL' },
    { id: 9, title: 'GCV 2601-4000 GVW', vehicleType: 'COMMERCIAL' },
    { id: 10, title: 'GCV 20001-35000 GVW', vehicleType: 'COMMERCIAL' },
    { id: 11, title: 'GCV 35001-45000 GVW', vehicleType: 'COMMERCIAL' },
  ]);

  const [rtos, setRtos] = useState<RtoItem[]>([
    { id: 1, location: 'AN-01 PORT BLAIR', regCode: 'AN-01', state: 'ANDAMAN AND NICOBAR', district: 'PORT BLAIR' },
    { id: 2, location: 'AN-02 CAR NICOBAR', regCode: 'AN-02', state: 'ANDAMAN AND NICOBAR', district: 'CAR NICOBAR' },
    { id: 3, location: 'AP-01 ADILABAD', regCode: 'AP-01', state: 'ANDHRA PRADESH', district: 'ADILABAD' },
    { id: 4, location: 'AP-02 ANANTAPUR', regCode: 'AP-02', state: 'ANDHRA PRADESH', district: 'ANANTAPUR' },
    { id: 5, location: 'AP-03 CHITTOOR', regCode: 'AP-03', state: 'ANDHRA PRADESH', district: 'CHITTOOR' },
    { id: 6, location: 'AP-04 KADAPA', regCode: 'AP-04', state: 'ANDHRA PRADESH', district: 'KADAPA' },
    { id: 7, location: 'AP-05 EAST GODAVARI DISTRICT', regCode: 'AP-05', state: 'ANDHRA PRADESH', district: 'EAST GODAVARI' },
    { id: 8, location: 'AP-07 GUNTUR', regCode: 'AP-07', state: 'ANDHRA PRADESH', district: 'GUNTUR' },
    { id: 9, location: 'AP-09 PX STATE POLICE', regCode: 'AP-09', state: 'ANDHRA PRADESH', district: 'HYDERABAD' },
    { id: 10, location: 'AP-10 SECUNDERABAD', regCode: 'AP-10', state: 'ANDHRA PRADESH', district: 'SECUNDERABAD' },
  ]);

  const [paOwnerDrivers, setPaOwnerDrivers] = useState<PaOwnerDriverItem[]>([
    { id: 1, company: 'TATA AIG GENERAL INSURANCE CO. LTD', rate: 375 },
    { id: 2, company: 'INDUSIND GENERAL INSURANCE CO. LTD', rate: 375 },
    { id: 3, company: 'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED', rate: 375 },
    { id: 4, company: 'ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED', rate: 315 },
    { id: 5, company: 'ICICI LOMBARD GENERAL INSURANCE CO. LTD', rate: 326 },
  ]);

  const [insuranceCompanies, setInsuranceCompanies] = useState<InsuranceCompanyItem[]>([
    { id: 1, company: 'ICICI LOMBARD GENERAL INSURANCE CO. LTD', branchName: 'MUMBAI', branchCode: '01', mailId: 'icici@reliable.com' },
    { id: 2, company: 'HDFC ERGO GENERAL INSURANCE CO. LTD', branchName: 'PUNE', branchCode: '02', mailId: 'hdfc@reliable.com' },
    { id: 3, company: 'INDUSIND GENERAL INSURANCE CO. LTD', branchName: 'BARAMATI', branchCode: '03', mailId: 'indusind@reliable.com' },
    { id: 4, company: 'ROYAL SUNDARAM GENERAL INSURANCE CO. LIMITED', branchName: 'CHENNAI', branchCode: '04', mailId: 'royalsundaram@reliable.com' },
    { id: 5, company: 'TATA AIG GENERAL INSURANCE CO. LTD', branchName: 'MUMBAI', branchCode: '05', mailId: 'tataaig@reliable.com' },
    { id: 6, company: 'BAJAJ ALLIANZ GENERAL INSURANCE CO. LTD', branchName: 'PUNE', branchCode: '06', mailId: 'bajaj@reliable.com' },
    { id: 7, company: 'BHARTI AXA GENERAL INSURANCE COMPANY LIMITED', branchName: 'BANGALORE', branchCode: '07', mailId: 'bharti@reliable.com' },
    { id: 8, company: 'GO DIGIT GENERAL INSURANCE LIMITED', branchName: 'BENGALURU', branchCode: '08', mailId: 'godigit@reliable.com' },
    { id: 9, company: 'RAHEJA QBE GENERAL INSURANCE COMPANY LIMITED', branchName: 'MUMBAI', branchCode: '09', mailId: 'raheja@reliable.com' },
    { id: 10, company: 'CHOLAMANDALAM MS GENERAL INSURANCE CO. LTD', branchName: 'NA', branchCode: '12', mailId: 'chola@reliable.com' },
    { id: 11, company: 'FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED', branchName: 'NA', branchCode: '12', mailId: 'future@reliable.com' },
  ]);

  const [locations, setLocations] = useState<LocationItem[]>([
    { id: 1, location: 'AHILYANAGAR' },
    { id: 2, location: 'AKLUJ' },
    { id: 3, location: 'AKOLA' },
    { id: 4, location: 'AMARAVATI' },
    { id: 5, location: 'BARAMATI' },
    { id: 6, location: 'BARSHI' },
    { id: 7, location: 'BEED' },
    { id: 8, location: 'BELGAUM' },
    { id: 9, location: 'BHANDARA' },
    { id: 10, location: 'BHIGWAN' },
    { id: 11, location: 'BULDHANA' },
    { id: 12, location: 'CHAKAN' },
    { id: 13, location: 'CHANDGAD' },
    { id: 14, location: 'CHANDRAPUR' },
  ]);

  // Form Inputs
  const [singleTitleInput, setSingleTitleInput] = useState('');
  const [ptVehicleTypeInput, setPtVehicleTypeInput] = useState('');
  const [rtoLocationInput, setRtoLocationInput] = useState('');
  const [rtoRegCodeInput, setRtoRegCodeInput] = useState('');
  const [rtoStateInput, setRtoStateInput] = useState('');
  const [rtoDistrictInput, setRtoDistrictInput] = useState('');
  const [paCompanyInput, setPaCompanyInput] = useState('');
  const [paRateInput, setPaRateInput] = useState<number>(0);
  const [icCompanyInput, setIcCompanyInput] = useState('');
  const [icBranchNameInput, setIcBranchNameInput] = useState('NA');
  const [icBranchCodeInput, setIcBranchCodeInput] = useState('12');
  const [icMailIdInput, setIcMailIdInput] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const getTabLabel = (tab: SubTab) => {
    switch (tab) {
      case 'businessType': return 'Business Type';
      case 'productType': return 'Product Type';
      case 'insuranceCompany': return 'Insurance Company';
      case 'policyMode': return 'Policy Mode';
      case 'policyType': return 'Policy Type';
      case 'rto': return 'RTO';
      case 'paymentMode': return 'Payment Mode';
      case 'paToOwnerDriver': return 'PA To Owner Driver';
      case 'companyPortal': return 'Company Portal';
      case 'brokerTds': return 'Broker TDS Rate';
      case 'agentTds': return 'Agent TDS Rate';
      case 'serviceCharge': return 'Service Charge';
      case 'creditMaster': return 'Credit Master';
      case 'locationMaster': return 'Location Master';
    }
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setSingleTitleInput('');
    setPtVehicleTypeInput('');
    setRtoLocationInput('');
    setRtoRegCodeInput('');
    setRtoStateInput('');
    setRtoDistrictInput('');
    setPaCompanyInput('');
    setPaRateInput(0);
    setIcCompanyInput('');
    setIcBranchNameInput('NA');
    setIcBranchCodeInput('12');
    setIcMailIdInput('');
    setShowModal(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'insuranceCompany') {
      setIcCompanyInput(item.company);
      setIcBranchNameInput(item.branchName);
      setIcBranchCodeInput(item.branchCode);
      setIcMailIdInput(item.mailId);
    } else if (activeTab === 'policyType') {
      setSingleTitleInput(item.title);
      setPtVehicleTypeInput(item.vehicleType);
    } else if (activeTab === 'rto') {
      setRtoLocationInput(item.location);
      setRtoRegCodeInput(item.regCode);
      setRtoStateInput(item.state);
      setRtoDistrictInput(item.district);
    } else if (activeTab === 'paToOwnerDriver') {
      setPaCompanyInput(item.company);
      setPaRateInput(item.rate);
    } else if (activeTab === 'locationMaster') {
      setSingleTitleInput(item.location);
    } else {
      setSingleTitleInput(item.title);
    }
    setShowModal(true);
  };

  const handleDeleteItem = (id: number) => {
    if (activeTab === 'locationMaster') {
      setLocations(prev => prev.filter(l => l.id !== id));
    }
  };

  const handleSaveBrokerTds = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tdsDetailsCompany) {
      showToast('Please select a Company Name');
      return;
    }
    if (!tdsRate) {
      showToast('Please enter TDS Rate(%)');
      return;
    }

    if (editingBrokerTdsItem) {
      setBrokerTdsList(prev => prev.map(item => item.id === editingBrokerTdsItem.id ? {
        ...item,
        insuranceCompany: tdsDetailsCompany,
        validFrom: tdsValidFrom || item.validFrom,
        tdsCut: parseFloat(tdsRate) || tdsRate
      } : item));
      showToast(`Updated TDS Rate for ${tdsDetailsCompany} successfully!`);
      setEditingBrokerTdsItem(null);
    } else {
      const nextId = brokerTdsList.length > 0 ? Math.max(...brokerTdsList.map(b => b.id)) + 1 : 1;
      const nextTdsId = brokerTdsList.length > 0 ? Math.max(...brokerTdsList.map(b => b.tdsId)) + 1 : 1;
      const newItem: BrokerTdsItem = {
        id: nextId,
        tdsId: nextTdsId,
        brokerName: selectedBroker || 'RELIABLE - ASSOCIATES',
        insuranceCompany: tdsDetailsCompany,
        tdsCut: parseFloat(tdsRate) || tdsRate,
        validFrom: tdsValidFrom || '01/11/2026'
      };
      setBrokerTdsList(prev => [newItem, ...prev]);
      showToast(`Added TDS Rate for ${tdsDetailsCompany} successfully!`);
    }

    setTdsDetailsCompany('');
    setTdsValidFrom('');
    setTdsRate('');
  };

  const handleEditBrokerTds = (item: BrokerTdsItem) => {
    setEditingBrokerTdsItem(item);
    setTdsDetailsCompany(item.insuranceCompany);
    setTdsValidFrom(item.validFrom);
    setTdsRate(String(item.tdsCut));
    showToast(`Loaded TDS record #${item.tdsId} for editing`);
  };

  const handleResetBrokerTdsForm = () => {
    setEditingBrokerTdsItem(null);
    setTdsDetailsCompany('');
    setTdsValidFrom('');
    setTdsRate('');
    showToast('Form reset');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'insuranceCompany') {
      if (!icCompanyInput.trim()) return;
      if (editingItem) {
        setInsuranceCompanies(prev =>
          prev.map(c => (c.id === editingItem.id ? { ...c, company: icCompanyInput.toUpperCase(), branchName: icBranchNameInput, branchCode: icBranchCodeInput, mailId: icMailIdInput } : c))
        );
      } else {
        setInsuranceCompanies([
          ...insuranceCompanies,
          { id: insuranceCompanies.length + 1, company: icCompanyInput.toUpperCase(), branchName: icBranchNameInput || 'NA', branchCode: icBranchCodeInput || '12', mailId: icMailIdInput }
        ]);
      }
    } else if (activeTab === 'policyType') {
      if (!singleTitleInput.trim()) return;
      if (editingItem) {
        setPolicyTypes(prev => prev.map(p => (p.id === editingItem.id ? { ...p, title: singleTitleInput.toUpperCase(), vehicleType: ptVehicleTypeInput || 'PRIVATE CAR' } : p)));
      } else {
        setPolicyTypes([...policyTypes, { id: policyTypes.length + 1, title: singleTitleInput.toUpperCase(), vehicleType: ptVehicleTypeInput || 'PRIVATE CAR' }]);
      }
    } else if (activeTab === 'rto') {
      if (!rtoLocationInput.trim()) return;
      if (editingItem) {
        setRtos(prev => prev.map(r => (r.id === editingItem.id ? { ...r, location: rtoLocationInput.toUpperCase(), regCode: rtoRegCodeInput.toUpperCase(), state: rtoStateInput, district: rtoDistrictInput } : r)));
      } else {
        setRtos([...rtos, { id: rtos.length + 1, location: rtoLocationInput.toUpperCase(), regCode: rtoRegCodeInput.toUpperCase() || 'AN-01', state: rtoStateInput || 'ANDAMAN AND NICOBAR', district: rtoDistrictInput || 'PORT BLAIR' }]);
      }
    } else if (activeTab === 'paToOwnerDriver') {
      if (!paCompanyInput.trim()) return;
      if (editingItem) {
        setPaOwnerDrivers(prev => prev.map(pa => (pa.id === editingItem.id ? { ...pa, company: paCompanyInput.toUpperCase(), rate: Number(paRateInput) } : pa)));
      } else {
        setPaOwnerDrivers([...paOwnerDrivers, { id: paOwnerDrivers.length + 1, company: paCompanyInput.toUpperCase(), rate: Number(paRateInput) }]);
      }
    } else if (activeTab === 'locationMaster') {
      if (!singleTitleInput.trim()) return;
      if (editingItem) {
        setLocations(prev => prev.map(l => (l.id === editingItem.id ? { ...l, location: singleTitleInput.toUpperCase() } : l)));
      } else {
        setLocations([...locations, { id: locations.length + 1, location: singleTitleInput.toUpperCase() }]);
      }
    } else {
      if (!singleTitleInput.trim()) return;
      const titleUpper = singleTitleInput.toUpperCase();
      const updateList = (list: SimpleItem[], setList: React.Dispatch<React.SetStateAction<SimpleItem[]>>) => {
        if (editingItem) {
          setList(prev => prev.map(item => (item.id === editingItem.id ? { ...item, title: titleUpper } : item)));
        } else {
          setList([...list, { id: list.length + 1, title: titleUpper }]);
        }
      };

      if (activeTab === 'businessType') updateList(businessTypes, setBusinessTypes);
      else if (activeTab === 'productType') updateList(productTypes, setProductTypes);
      else if (activeTab === 'policyMode') updateList(policyModes, setPolicyModes);
      else if (activeTab === 'paymentMode') updateList(paymentModes, setPaymentModes);
    }

    setShowModal(false);
    setEditingItem(null);
  };

  // Current List
  let currentList: any[] = [];
  if (activeTab === 'businessType') currentList = businessTypes;
  else if (activeTab === 'productType') currentList = productTypes;
  else if (activeTab === 'policyMode') currentList = policyModes;
  else if (activeTab === 'paymentMode') currentList = paymentModes;
  else if (activeTab === 'policyType') currentList = policyTypes;
  else if (activeTab === 'rto') currentList = rtos;
  else if (activeTab === 'paToOwnerDriver') currentList = paOwnerDrivers;
  else if (activeTab === 'insuranceCompany') currentList = insuranceCompanies;
  else if (activeTab === 'locationMaster') currentList = locations;

  const filteredList = currentList.filter(item => {
    const search = searchQuery.toLowerCase();
    if (activeTab === 'insuranceCompany') {
      return item.company.toLowerCase().includes(search) || item.mailId.toLowerCase().includes(search);
    } else if (activeTab === 'rto') {
      return item.location.toLowerCase().includes(search) || item.regCode.toLowerCase().includes(search);
    } else if (activeTab === 'paToOwnerDriver') {
      return item.company.toLowerCase().includes(search);
    } else if (activeTab === 'locationMaster') {
      return item.location.toLowerCase().includes(search);
    }
    return item.title?.toLowerCase().includes(search);
  });

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedData = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const tabsList: SubTab[] = [
    'businessType',
    'productType',
    'insuranceCompany',
    'policyMode',
    'policyType',
    'rto',
    'paymentMode',
    'paToOwnerDriver',
    'companyPortal',
    'brokerTds',
    'agentTds',
    'serviceCharge',
    'creditMaster',
    'locationMaster',
  ];

  const handleBranchCheckboxToggle = (b: string) => {
    setScSelectedBranches(prev =>
      prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]
    );
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5">
      {/* Header Bar */}
      <PageHeader
        title="Policy Master"
        description="Manage insurance policy modes, TDS rates, service charges and master records"
      />

      {/* 2-Row Full-Width Sub-Tabs Navigation */}
      <div className="bg-white rounded-2xl border border-brand-border p-3 space-y-2.5 shadow-sm w-full max-w-full">
        {/* Row 1: First 8 Tabs - Spreading Full Width in 8 Equal Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 w-full border-b border-slate-200 pb-2.5">
          {tabsList.slice(0, 8).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                  setSearchQuery('');
                }}
                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                  }`}
                title={getTabLabel(tab)}
              >
                <span className="truncate">{getTabLabel(tab)}</span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Remaining 6 Tabs - Spreading Full Width in 6 Equal Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full">
          {tabsList.slice(8).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                  setSearchQuery('');
                }}
                className={`w-full py-2.5 px-2 rounded-xl text-[11px] xl:text-[12px] transition-all cursor-pointer border-none text-center font-bold flex items-center justify-center ${isActive
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-[#F1F5F9] hover:bg-slate-200 text-[#0F172A]'
                  }`}
                title={getTabLabel(tab)}
              >
                <span className="truncate">{getTabLabel(tab)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Animated Wrapper */}
      <div key={activeTab} className="tab-transition-wrapper flex flex-col space-y-5 w-full">
        {/* SPECIAL CONTENT VIEW: BROKER TDS (adm_tdsrateforBroker.aspx) */}
        {activeTab === 'brokerTds' && (
          <div className="flex flex-col space-y-5 w-full">
            {/* Top Filter Card */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 w-full">
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-700 shrink-0">TDS Rate For</span>
                  <label className="flex items-center gap-1.5 cursor-pointer text-sm text-slate-700">
                    <input
                      type="radio"
                      name="brokerTdsFor"
                      checked
                      readOnly
                      className="accent-[#0869D8] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-semibold text-slate-800">Broker</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-700 shrink-0">Broker</span>
                  <select
                    value={selectedBroker}
                    onChange={(e) => setSelectedBroker(e.target.value)}
                    className="w-56 sm:w-64 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white font-medium text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  >
                    <option value="RELIABLE ASSOCIATES">RELIABLE ASSOCIATES</option>
                    <option value="APEX INSURANCE BROKERS">APEX INSURANCE BROKERS</option>
                    <option value="ZENITH BROKERAGE">ZENITH BROKERAGE</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <button
                  type="button"
                  onClick={() => showToast(`Viewing TDS Rates for ${selectedBroker}`)}
                  className="px-5 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-xs transition-all cursor-pointer border-none"
                >
                  View
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBroker('RELIABLE ASSOCIATES');
                    handleResetBrokerTdsForm();
                  }}
                  className="px-5 py-2 bg-slate-500 hover:bg-slate-600 text-white font-semibold text-sm rounded-lg shadow-xs transition-all cursor-pointer border-none"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Details Form Card */}
            <form onSubmit={handleSaveBrokerTds} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
              <div className="bg-brand-primary text-white px-5 py-1.5 font-semibold text-sm flex items-center justify-between">
                <span>» Details</span>
                {editingBrokerTdsItem && (
                  <span className="text-xs bg-white/20 px-2.5 py-1 rounded-md font-medium">
                    Editing TDS ID #{editingBrokerTdsItem.tdsId}
                  </span>
                )}
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <select
                    value={tdsDetailsCompany}
                    onChange={(e) => setTdsDetailsCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  >
                    <option value="">--Select Company--</option>
                    {insuranceCompanies.map(c => <option key={c.id} value={c.company}>{c.company}</option>)}
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Valid From</label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={tdsValidFrom}
                    onChange={(e) => setTdsValidFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">TDS Rate(%)</label>
                  <input
                    type="text"
                    placeholder="Rate e.g. 7.5"
                    value={tdsRate}
                    onChange={(e) => setTdsRate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  />
                </div>

                <div className="sm:col-span-1 flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-6 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer border-none h-[38px] flex items-center justify-center"
                  >
                    {editingBrokerTdsItem ? 'Update' : 'Save'}
                  </button>
                  {editingBrokerTdsItem && (
                    <button
                      type="button"
                      onClick={handleResetBrokerTdsForm}
                      className="py-2 px-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-sm rounded-lg transition-all cursor-pointer border-none h-[38px]"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Standardized Table View (Matching Branch Master Specs) */}
            {(() => {
              const filtered = brokerTdsList.filter(item =>
              (!brokerTdsSearch ||
                item.insuranceCompany.toLowerCase().includes(brokerTdsSearch.toLowerCase()) ||
                item.brokerName.toLowerCase().includes(brokerTdsSearch.toLowerCase()) ||
                String(item.tdsId).includes(brokerTdsSearch) ||
                item.validFrom.includes(brokerTdsSearch))
              );

              const totalRecords = filtered.length;
              const totalPages = Math.ceil(totalRecords / brokerTdsPerPage) || 1;
              const startIndex = (brokerTdsPage - 1) * brokerTdsPerPage;
              const paginatedRows = filtered.slice(startIndex, startIndex + brokerTdsPerPage);

              return (
                <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
                  {/* Table Toolbar */}
                  <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-[400px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input
                        type="text"
                        placeholder="Search company, broker or TDS ID..."
                        value={brokerTdsSearch}
                        onChange={(e) => {
                          setBrokerTdsSearch(e.target.value);
                          setBrokerTdsPage(1);
                        }}
                        className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                      />
                    </div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      Records: <span className="text-brand-primary font-bold">{totalRecords}</span>
                    </div>
                  </div>

                  {/* Full Width Table View */}
                  <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                          <th className="py-3 px-4 w-[90px]">TDSID</th>
                          <th className="py-3 px-4">BROKER NAME</th>
                          <th className="py-3 px-4">INSURANCE COMPANY</th>
                          <th className="py-3 px-4 w-[120px]">TDSCUT</th>
                          <th className="py-3 px-4 w-[140px]">VALID FROMR</th>
                          <th className="py-3 px-4 text-center w-[100px]">ACTION</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border text-[13px]">
                        {paginatedRows.map((item) => (
                          <tr key={item.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                            <td className="py-2 px-4 font-mono font-medium text-brand-muted">{item.tdsId}</td>
                            <td className="py-2 px-4 font-semibold text-[#12284A] uppercase">{item.brokerName}</td>
                            <td className="py-2 px-4 text-brand-navy uppercase">{item.insuranceCompany}</td>
                            <td className="py-2 px-4 font-mono font-medium text-slate-700">{item.tdsCut}</td>
                            <td className="py-2 px-4 font-mono text-xs text-brand-navy">{item.validFrom}</td>
                            <td className="py-2 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => handleEditBrokerTds(item)}
                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                                title="Edit Broker TDS Rate"
                              >
                                <Edit2 size={16} strokeWidth={1.5} />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {paginatedRows.length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-slate-500">
                              No Broker TDS Rate records found matching "{brokerTdsSearch}"
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Standardized Pagination Controls (Matching Branch Master) */}
                  <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
                    <div className="flex items-center gap-2">
                      <span>Records per page:</span>
                      <select
                        value={brokerTdsPerPage}
                        onChange={(e) => {
                          setBrokerTdsPerPage(Number(e.target.value));
                          setBrokerTdsPage(1);
                        }}
                        className="border border-slate-300 rounded px-2 py-1 text-xs bg-white text-slate-800 outline-none"
                      >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </select>
                    </div>

                    <div className="font-medium text-slate-600">
                      Showing {totalRecords === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + brokerTdsPerPage, totalRecords)} of {totalRecords} records
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setBrokerTdsPage(prev => Math.max(prev - 1, 1))}
                        disabled={brokerTdsPage <= 1}
                        className="px-2.5 py-1 border border-brand-border rounded hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        &lt;
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setBrokerTdsPage(p)}
                          className={`w-7 h-7 rounded text-xs font-semibold transition-colors cursor-pointer ${brokerTdsPage === p
                            ? 'bg-brand-primary text-white border border-brand-primary'
                            : 'border border-brand-border hover:bg-slate-50 text-slate-700'
                            }`}
                        >
                          {p}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setBrokerTdsPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={brokerTdsPage >= totalPages}
                        className="px-2.5 py-1 border border-brand-border rounded hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-not-allowed"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* SPECIAL CONTENT VIEW: AGENT TDS */}
        {activeTab === 'agentTds' && (
          <div className="flex flex-col space-y-5 w-full">
            {/* Top Filter Card */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 w-full">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-slate-700 shrink-0">TDS Rate For</span>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="tdsTarget"
                        checked={tdsTarget === 'Agent'}
                        onChange={() => setTdsTarget('Agent')}
                        className="accent-[#0869D8]"
                      />
                      <span>Agent</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="tdsTarget"
                        checked={tdsTarget === 'Franchise'}
                        onChange={() => setTdsTarget('Franchise')}
                        className="accent-[#0869D8]"
                      />
                      <span>Franchise</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="tdsTarget"
                        checked={tdsTarget === 'FranchiseAgent'}
                        onChange={() => setTdsTarget('FranchiseAgent')}
                        className="accent-[#0869D8]"
                      />
                      <span>Franchise Agent</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 shrink-0">Broker</span>
                  <select
                    value={selectedBroker}
                    onChange={(e) => setSelectedBroker(e.target.value)}
                    className="w-48 sm:w-56 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  >
                    <option value="">--Select Broker--</option>
                    <option value="broker1">Reliable Brokerage Ltd</option>
                    <option value="broker2">Apex Insurance Brokers</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <button className="px-5 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-medium text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                  View
                </button>
                <button
                  onClick={() => { setSelectedBroker(''); setTdsTarget('Agent'); }}
                  className="px-5 py-2 bg-slate-500 hover:bg-slate-600 text-white font-medium text-sm rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Details Form Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
              <div className="bg-brand-primary text-white px-5 py-1.5 font-semibold text-sm">
                » Details
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company Name</label>
                  <select
                    value={tdsDetailsCompany}
                    onChange={(e) => setTdsDetailsCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  >
                    <option value="">--Select Company--</option>
                    {insuranceCompanies.map(c => <option key={c.id} value={c.company}>{c.company}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Branch Name</label>
                  <select
                    value={tdsDetailsBranch}
                    onChange={(e) => setTdsDetailsBranch(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  >
                    <option value="">--Select Branch--</option>
                    <option value="BARAMATI">BARAMATI</option>
                    <option value="MUMBAI">MUMBAI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Valid From</label>
                  <input
                    type="text"
                    placeholder="DD/MM/YYYY"
                    value={tdsValidFrom}
                    onChange={(e) => setTdsValidFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-700 mb-1">TDS Rate(%)</label>
                    <input
                      type="text"
                      placeholder="Rate"
                      value={tdsRate}
                      onChange={(e) => setTdsRate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                    />
                  </div>
                  <button className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPECIAL CONTENT VIEW: SERVICE CHARGE */}
        {activeTab === 'serviceCharge' && (
          <div className="flex flex-col space-y-5 w-full">
            {/* Top Filter Card (Responsive flex-wrap layout) */}
            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4 w-full">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-slate-700 shrink-0">Service Charge For</span>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={serviceChargeTargets.agent}
                        onChange={(e) => setServiceChargeTargets({ ...serviceChargeTargets, agent: e.target.checked })}
                        className="accent-[#0869D8] rounded"
                      />
                      <span>Agent</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={serviceChargeTargets.franchise}
                        onChange={(e) => setServiceChargeTargets({ ...serviceChargeTargets, franchise: e.target.checked })}
                        className="accent-[#0869D8] rounded"
                      />
                      <span>Franchise</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={serviceChargeTargets.franchiseAgent}
                        onChange={(e) => setServiceChargeTargets({ ...serviceChargeTargets, franchiseAgent: e.target.checked })}
                        className="accent-[#0869D8] rounded"
                      />
                      <span>Franchise Agent</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 shrink-0">Broker</span>
                  <select
                    value={selectedBroker}
                    onChange={(e) => setSelectedBroker(e.target.value)}
                    className="w-48 sm:w-56 px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  >
                    <option value="">--Select Broker--</option>
                    <option value="b1">Reliable Brokerage</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <button className="px-5 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-medium text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                  View
                </button>
                <button
                  onClick={() => setSelectedBroker('')}
                  className="px-5 py-2 bg-slate-500 hover:bg-slate-600 text-white font-medium text-sm rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Service Charge Details Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
              <div className="bg-brand-primary text-white px-5 py-1.5 font-semibold text-sm">
                » Service Charge Details
              </div>
              <div className="p-5 flex flex-col space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">Select Branch Names:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-48 overflow-y-auto custom-scrollbar">
                    {sampleBranchesList.map(b => (
                      <label key={b} className="flex items-center gap-1.5 text-xs text-slate-700 font-medium cursor-pointer hover:text-blue-600">
                        <input
                          type="checkbox"
                          checked={scSelectedBranches.includes(b)}
                          onChange={() => handleBranchCheckboxToggle(b)}
                          className="accent-brand-primary rounded"
                        />
                        <span className="truncate">{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end pt-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Valid From</label>
                    <input
                      type="text"
                      placeholder="DD/MM/YYYY"
                      value={scValidFrom}
                      onChange={(e) => setScValidFrom(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Service Charge(%)</label>
                    <input
                      type="text"
                      value={scRate}
                      onChange={(e) => setScRate(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none font-mono"
                    />
                  </div>

                  <div>
                    <button className="w-full sm:w-auto px-8 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SPECIAL CONTENT VIEW: CREDIT MASTER (Image 4) */}
        {activeTab === 'creditMaster' && (
          <div className="flex flex-col space-y-5 w-full">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
              <div className="bg-brand-primary text-white px-5 py-1.5 font-semibold text-sm">
                » Credit Details
              </div>
              <div className="p-5 grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Commission Grid For</label>
                  <div className="flex items-center gap-4 pt-2 text-sm text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="creditCategory"
                        checked={creditCategory === 'Executive'}
                        onChange={() => setCreditCategory('Executive')}
                        className="accent-[#0869D8]"
                      />
                      <span>Executive</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="creditCategory"
                        checked={creditCategory === 'Agent'}
                        onChange={() => setCreditCategory('Agent')}
                        className="accent-[#0869D8]"
                      />
                      <span>Agent</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Executive / Agent</label>
                  <select
                    value={selectedExecutive}
                    onChange={(e) => setSelectedExecutive(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  >
                    <option value="">--Select Sales Executive--</option>
                    <option value="ex1">Ranjeet Bankar</option>
                    <option value="ex2">Amit Kumar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Credits</label>
                  <input
                    type="text"
                    placeholder="Enter Credits"
                    value={creditValue}
                    onChange={(e) => setCreditValue(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                  />
                </div>

                <div>
                  <button className="w-full sm:w-auto px-8 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold text-sm rounded-lg shadow-sm transition-all cursor-pointer">
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center text-slate-500 font-medium">
              NO DATA FOUND
            </div>
          </div>
        )}

        {/* DEFAULT DIRECTORY TABLES FOR OTHER SUB-TABS (INCLUDING LOCATION MASTER Image 5 WITH DELETE) */}
        {activeTab !== 'brokerTds' && activeTab !== 'agentTds' && activeTab !== 'serviceCharge' && activeTab !== 'creditMaster' && (
          <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col w-full">
            {/* Table Toolbar */}
            <div className="p-4 bg-slate-50 border-b border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-[400px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder={`Search ${getTabLabel(activeTab)}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-brand-navy placeholder-[#94a3b8] focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all h-[40px]"
                />
              </div>

              <button
                onClick={handleOpenCreateModal}
                className="w-full sm:w-auto px-5 py-2 bg-brand-primary hover:bg-[#1D4ED8] text-white rounded-lg font-semibold text-sm shadow-xs transition-all duration-200 cursor-pointer border-none h-[40px] flex items-center justify-center gap-2 shrink-0"
              >
                <span>Add New {getTabLabel(activeTab)}</span>
              </button>
            </div>

            {/* Full Width Table View */}
            <div className="overflow-x-auto w-full custom-scrollbar min-h-[400px]">
              {activeTab === 'insuranceCompany' ? (
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4">Insurance Company</th>
                      <th className="py-3 px-4">Branch Name</th>
                      <th className="py-3 px-4">Branch Code</th>
                      <th className="py-3 px-4">Mail ID</th>
                      <th className="py-3 px-4 text-center w-[120px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[13px]">
                    {(paginatedData as InsuranceCompanyItem[]).map((c) => (
                      <tr key={c.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                        <td className="py-2 px-4 font-semibold text-[#12284A]">{c.company}</td>
                        <td className="py-2 px-4 text-slate-600">{c.branchName}</td>
                        <td className="py-2 px-4 text-slate-600 font-mono">{c.branchCode}</td>
                        <td className="py-2 px-4 text-blue-600 font-medium">{c.mailId}</td>
                        <td className="py-2 px-4 text-center">
                          <button
                            onClick={() => handleOpenEditModal(c)}
                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                            title="Edit Insurance Company"
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : activeTab === 'locationMaster' ? (
                /* LOCATION MASTER TABLE WITH EDIT AND DELETE (Image 5) */
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4">LOCATION</th>
                      <th className="py-3 px-4 text-center w-[120px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[13px]">
                    {(paginatedData as LocationItem[]).map((loc) => (
                      <tr key={loc.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                        <td className="py-2 px-4 font-semibold text-[#12284A]">{loc.location}</td>
                        <td className="py-2 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenEditModal(loc)}
                              className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                              title="Edit Location"
                            >
                              <Edit2 size={16} strokeWidth={1.5} />
                            </button>
                            <button
                              onClick={() => handleDeleteItem(loc.id)}
                              className="p-1.5 bg-[#F4F8FC] text-brand-error hover:bg-[#FEE2E2] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                              title="Delete Location"
                            >
                              <Trash2 size={16} strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : activeTab === 'rto' ? (
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Reg Code</th>
                      <th className="py-3 px-4 text-center w-[120px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[13px]">
                    {(paginatedData as RtoItem[]).map((r) => (
                      <tr key={r.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                        <td className="py-2 px-4 font-semibold text-[#12284A]">{r.location}</td>
                        <td className="py-2 px-4 font-mono font-medium text-brand-primary">{r.regCode}</td>
                        <td className="py-2 px-4 text-center">
                          <button
                            onClick={() => handleOpenEditModal(r)}
                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                            title="Edit RTO"
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : activeTab === 'paToOwnerDriver' ? (
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4">Insurance Company</th>
                      <th className="py-3 px-4">Rate</th>
                      <th className="py-3 px-4 text-center w-[120px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[13px]">
                    {(paginatedData as PaOwnerDriverItem[]).map((pa) => (
                      <tr key={pa.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                        <td className="py-2 px-4 font-semibold text-[#12284A]">{pa.company}</td>
                        <td className="py-2 px-4 font-medium text-slate-800">{pa.rate}</td>
                        <td className="py-2 px-4 text-center">
                          <button
                            onClick={() => handleOpenEditModal(pa)}
                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                            title="Edit PA Owner Driver Rate"
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="bg-brand-lightbg text-brand-navy text-[13px] font-semibold uppercase border-b border-brand-border whitespace-nowrap">
                      <th className="py-3 px-4 w-[100px]">Sr. No.</th>
                      <th className="py-3 px-4">TYPE</th>
                      <th className="py-3 px-4 text-center w-[120px]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-[13px]">
                    {(paginatedData as SimpleItem[]).map((item, idx) => (
                      <tr key={item.id} className="hover:bg-brand-mainbg h-[48px] transition-colors bg-white">
                        <td className="py-2 px-4 font-medium text-brand-primary">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                        <td className="py-2 px-4 font-semibold text-[#12284A]">{item.title}</td>
                        <td className="py-2 px-4 text-center">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center border-none"
                            title={`Edit ${getTabLabel(activeTab)}`}
                          >
                            <Edit2 size={16} strokeWidth={1.5} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Footer Pagination (Matching BranchMaster standard) */}
            <div className="p-4 bg-white border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-brand-muted font-medium">
                <span>Records per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
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
                Showing {filteredList.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredList.length)} of {filteredList.length} records
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${currentPage === page
                      ? 'bg-brand-primary text-white shadow-sm'
                      : 'bg-white text-brand-navy border border-brand-border hover:bg-slate-100'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-brand-navy bg-white border border-brand-border rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Form Modal (Create / Edit) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md my-auto max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <span>
                  » {activeTab === 'rto'
                    ? 'RTO Form'
                    : activeTab === 'paymentMode'
                      ? (editingItem ? 'Edit Payment Mode Form' : 'Payment Mode Form')
                      : activeTab === 'paToOwnerDriver'
                        ? 'PA To Owner Driver Form'
                        : editingItem
                          ? `Edit ${getTabLabel(activeTab)} Form`
                          : `${getTabLabel(activeTab)} Form`}
                </span>
              </h3>
              <button
                onClick={() => { setShowModal(false); setEditingItem(null); }}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Content */}
            {activeTab === 'insuranceCompany' ? (
              <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Insurance Company</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Insurance Company Name"
                    value={icCompanyInput}
                    onChange={(e) => setIcCompanyInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch Name</label>
                  <input
                    type="text"
                    placeholder="Branch Name (e.g. NA)"
                    value={icBranchNameInput}
                    onChange={(e) => setIcBranchNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Branch Code</label>
                  <input
                    type="text"
                    placeholder="Branch Code"
                    value={icBranchCodeInput}
                    onChange={(e) => setIcBranchCodeInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Mail ID</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter Email Address"
                    value={icMailIdInput}
                    onChange={(e) => setIcMailIdInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'rto' ? (
              /* RTO FORM MODAL (Image 2) */
              <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">RTO</label>
                  <input
                    type="text"
                    required
                    placeholder="AN-01 PORT BLAIR"
                    value={rtoLocationInput}
                    onChange={(e) => setRtoLocationInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">State *</label>
                  <select
                    value={rtoStateInput}
                    onChange={(e) => setRtoStateInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all bg-white"
                  >
                    <option value="">--Select State--</option>
                    <option value="ANDAMAN NICOBAR ISLANDS">ANDAMAN NICOBAR ISLANDS</option>
                    <option value="ANDHRA PRADESH">ANDHRA PRADESH</option>
                    <option value="MAHARASHTRA">MAHARASHTRA</option>
                    <option value="GUJARAT">GUJARAT</option>
                    <option value="DELHI">DELHI</option>
                    <option value="KARNATAKA">KARNATAKA</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">District *</label>
                  <select
                    value={rtoDistrictInput}
                    onChange={(e) => setRtoDistrictInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all bg-white"
                  >
                    <option value="">--Select District--</option>
                    <option value="PORT BLAIR">PORT BLAIR</option>
                    <option value="CAR NICOBAR">CAR NICOBAR</option>
                    <option value="ADILABAD">ADILABAD</option>
                    <option value="ANANTAPUR">ANANTAPUR</option>
                    <option value="CHITTOOR">CHITTOOR</option>
                    <option value="KADAPA">KADAPA</option>
                    <option value="EAST GODAVARI">EAST GODAVARI</option>
                    <option value="GUNTUR">GUNTUR</option>
                    <option value="PUNE">PUNE</option>
                    <option value="MUMBAI">MUMBAI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">REG Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="AN-01"
                    value={rtoRegCodeInput}
                    onChange={(e) => setRtoRegCodeInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all font-mono"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'paToOwnerDriver' ? (
              /* PA TO OWNER DRIVER FORM MODAL (Image 4) */
              <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Insurance Company</label>
                  <select
                    value={paCompanyInput}
                    onChange={(e) => setPaCompanyInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all bg-white"
                    required
                  >
                    <option value="">--Select Company--</option>
                    {insuranceCompanies.map(c => (
                      <option key={c.id} value={c.company}>{c.company}</option>
                    ))}
                    <option value="TATA AIG GENERAL INSURANCE CO. LTD">TATA AIG GENERAL INSURANCE CO. LTD</option>
                    <option value="INDUSIND GENERAL INSURANCE CO. LTD">INDUSIND GENERAL INSURANCE CO. LTD</option>
                    <option value="FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED">FUTURE GENERALI INDIA INSURANCE COMPANY LIMITED</option>
                    <option value="ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED">ROYAL SUNDARAMA GENERAL INSURANCE CO. LIMITED</option>
                    <option value="ICICI LOMBARD GENERAL INSURANCE CO. LTD">ICICI LOMBARD GENERAL INSURANCE CO. LTD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Rate</label>
                  <input
                    type="number"
                    required
                    placeholder="0"
                    value={paRateInput}
                    onChange={(e) => setPaRateInput(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              /* GENERIC MASTER FORM (Payment Mode, etc.) */
              <form onSubmit={handleSaveForm} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">{getTabLabel(activeTab)}</label>
                  <input
                    type="text"
                    required
                    placeholder={`Enter ${getTabLabel(activeTab)}`}
                    value={singleTitleInput}
                    onChange={(e) => setSingleTitleInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setShowModal(false); setEditingItem(null); }}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                  >
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-[#12284A] text-white px-5 py-3 rounded-lg shadow-xl border border-blue-400/30 text-sm font-medium animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default PolicyMaster;
