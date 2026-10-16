import React, { useState } from 'react';
import {
  Percent, Search, CheckCircle2, RotateCcw, Eye, Save, Trash2, Edit2,
  AlertCircle, Download, Check
} from 'lucide-react';
import { FranchiseItem, FranchiseCommissionRecord, FranchiseCommissionGridRule } from '../types';
import { initialFranchiseCommissionRules } from '../mockData';

interface FranchiseCommissionTabProps {
  franchises: FranchiseItem[];
  commissions?: FranchiseCommissionRecord[];
  setCommissions?: React.Dispatch<React.SetStateAction<FranchiseCommissionRecord[]>>;
  showToast: (msg: string) => void;
}

const brokerList = [
  '--Select Broker--',
  'RELIABLE - ASSOCIATES',
  'RELIABLE INSURANCE BROKERS PVT LTD',
  'SHARVARI MARKETING',
  'SHARVARI MOTORS',
  'JPB'
];

const branchList = [
  '--Select Branch--',
  'BARAMATI',
  'PUNE',
  'MUMBAI',
  'SOLAPUR',
  'AHILYANAGAR',
  'KOLHAPUR',
  'SATARA',
  'NASHIK',
  'NAGPUR',
  'CHHATRAPATI SAMBHAJINAGAR'
];

const companyList = [
  '--Select Company--',
  'BAJAJ ALLIANZ GEN INS',
  'TATA AIG GEN INS',
  'HDFC ERGO GENERAL',
  'ICICI LOMBARD GEN INS',
  'GO DIGIT GEN INS',
  'RELIANCE GENERAL INS',
  'SBI GENERAL INSURANCE',
  'NEW INDIA ASSURANCE',
  'STAR HEALTH INSURANCE'
];

const vehicleTypeList = [
  '--Select Vehicle Type--',
  '4W PRIVATE CAR',
  '2W MOTORCYCLE',
  '2W SCOOTER',
  'COMMERCIAL GOODS (GCV)',
  'PASSENGER CARRYING (PCV)',
  'MISC-D TRACTOR / AGRI',
  'ELECTRIC VEHICLE (EV)'
];

const policyTypeList = [
  '--Select Policy Type--',
  'COMPREHENSIVE',
  'TP ONLY (LIABILITY)',
  'STANDALONE OD (SAOD)',
  'PACKAGE',
  'BUNDLED'
];

const makeList = [
  '--Select Vehicle Make--',
  'MARUTI SUZUKI',
  'HYUNDAI',
  'TATA MOTORS',
  'MAHINDRA',
  'HONDA',
  'TOYOTA',
  'KIA',
  'HERO',
  'BAJAJ',
  'TVS',
  'ROYAL ENFIELD'
];

const modelList = [
  '--Select Vehicle Model--',
  'SWIFT',
  'BALENO',
  'DZIRE',
  'CRETA',
  'VENUE',
  'NEXON',
  'PUNCH',
  'SCORPIO',
  'THAR',
  'SPLENDOR PLUS',
  'ACTIVA 6G',
  'PULSAR 150',
  'ALL MODELS'
];

const fuelTypeList = [
  'PETROL',
  'DIESEL',
  'CNG',
  'ELECTRIC',
  'HYBRID',
  'ALL'
];

const productTypeList = [
  '--Select Product--',
  'MOTOR PRIVATE CAR',
  'MOTOR TWO WHEELER',
  'COMMERCIAL VEHICLE',
  'NON MOTOR & FIRE',
  'HEALTH INSURANCE'
];

const yearSlabList = [
  '0 to 1 Year (Brand New)',
  '1 to 3 Years',
  '3 to 5 Years',
  '5 to 10 Years',
  '10+ Years'
];

export const FranchiseCommissionTab: React.FC<FranchiseCommissionTabProps> = ({
  franchises,
  showToast
}) => {
  // --- CARD 1: TOP FILTER STATE ---
  const [rtoType, setRtoType] = useState<'REGULAR' | 'RTO'>('REGULAR');
  const [franchiseTarget, setFranchiseTarget] = useState<'Franchise' | 'Franchise Agent'>('Franchise');
  const [selectedBroker, setSelectedBroker] = useState('--Select Broker--');
  const [selectedBranch, setSelectedBranch] = useState('--Select Branch--');
  const [selectedFranchiseName, setSelectedFranchiseName] = useState('--Select Franchise Name--');
  const [selectedCompany, setSelectedCompany] = useState('--Select Company--');

  // --- CARD 2: COMMISSION DETAILS STATE ---
  const [commDate, setCommDate] = useState('14/10/2026');
  const [referenceType, setReferenceType] = useState('Franchise');
  const [vehicleType, setVehicleType] = useState('--Select Vehicle Type--');
  const [policyType, setPolicyType] = useState('--Select Policy Type--');
  const [make, setMake] = useState('--Select Vehicle Make--');
  const [model, setModel] = useState('--Select Vehicle Model--');
  const [ncb, setNcb] = useState('NO');
  const [yearSlabApplicable, setYearSlabApplicable] = useState(false);
  const [yearSlab, setYearSlab] = useState('1 to 3 Years');
  const [fuelType, setFuelType] = useState('PETROL');
  const [productType, setProductType] = useState('--Select Product--');

  // Percentage Inputs
  const [raOdDiscount, setRaOdDiscount] = useState('');
  const [odDiscount, setOdDiscount] = useState('');
  const [raTpCommission, setRaTpCommission] = useState('');
  const [tpCommission, setTpCommission] = useState('');
  const [raOdCommission, setRaOdCommission] = useState('');
  const [odCommission, setOdCommission] = useState('');
  const [raNetCommission, setRaNetCommission] = useState('');
  const [netCommission, setNetCommission] = useState('');
  const [misp, setMisp] = useState('NO');
  const [ndNnd, setNdNnd] = useState('NND');

  // Commission Rules Grid State
  const [rules, setRules] = useState<FranchiseCommissionGridRule[]>(initialFranchiseCommissionRules);
  const [showGridTable, setShowGridTable] = useState(false);

  // Handle Top Card "View" Button
  const handleViewGrid = () => {
    setShowGridTable(true);
    showToast(`Displaying commission rules for: ${rtoType} | ${franchiseTarget}`);
  };

  // Handle Top Card "Reset" Button
  const handleTopReset = () => {
    setRtoType('REGULAR');
    setFranchiseTarget('Franchise');
    setSelectedBroker('--Select Broker--');
    setSelectedBranch('--Select Branch--');
    setSelectedFranchiseName('--Select Franchise Name--');
    setSelectedCompany('--Select Company--');
    setShowGridTable(false);
    showToast('Filter criteria reset.');
  };

  // Handle Section 2 "Save" Button
  const handleSaveCommissionDetails = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFranchiseName === '--Select Franchise Name--') {
      showToast('Please select a Franchise from the top filter before saving.');
      return;
    }

    const newRule: FranchiseCommissionGridRule = {
      id: Date.now(),
      rtoType,
      franchiseTarget,
      broker: selectedBroker !== '--Select Broker--' ? selectedBroker : 'RELIABLE - ASSOCIATES',
      branch: selectedBranch !== '--Select Branch--' ? selectedBranch : 'BARAMATI',
      franchiseName: selectedFranchiseName,
      companyName: selectedCompany !== '--Select Company--' ? selectedCompany : 'BAJAJ ALLIANZ GEN INS',
      commDate,
      referenceType,
      vehicleType: vehicleType !== '--Select Vehicle Type--' ? vehicleType : '4W PRIVATE CAR',
      policyType: policyType !== '--Select Policy Type--' ? policyType : 'COMPREHENSIVE',
      make: make !== '--Select Vehicle Make--' ? make : 'ALL MAKES',
      model: model !== '--Select Vehicle Model--' ? model : 'ALL MODELS',
      ncb,
      yearSlabApplicable,
      yearSlab,
      fuelType,
      productType: productType !== '--Select Product--' ? productType : 'MOTOR',
      raOdDiscount: raOdDiscount || '0',
      odDiscount: odDiscount || '0',
      raTpCommission: raTpCommission || '0',
      tpCommission: tpCommission || '0',
      raOdCommission: raOdCommission || '0',
      odCommission: odCommission || '0',
      raNetCommission: raNetCommission || '0',
      netCommission: netCommission || '0',
      misp,
      ndNnd,
      status: 'ACTIVE'
    };

    setRules(prev => [newRule, ...prev]);
    setShowGridTable(true);
    showToast(`Franchise commission grid rule saved successfully for ${selectedFranchiseName}!`);
  };

  // Filtered Rules
  const filteredRules = rules.filter(rule => {
    const matchesRto = rule.rtoType === rtoType;
    const matchesTarget = rule.franchiseTarget === franchiseTarget;
    const matchesBranch = selectedBranch === '--Select Branch--' || rule.branch.toLowerCase().includes(selectedBranch.toLowerCase());
    const matchesFranchise = selectedFranchiseName === '--Select Franchise Name--' || rule.franchiseName === selectedFranchiseName;

    return matchesRto && matchesTarget && matchesBranch && matchesFranchise;
  });

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* ========================================================= */}
      {/* CARD 1: TOP FILTER SELECTION CARD                        */}
      {/* ========================================================= */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-5 sm:p-6 space-y-4">
        {/* Row 1: Radio Groups & Broker Dropdown */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          {/* Radio Group 1: REGULAR vs RTO */}
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="radio"
                name="rtoType"
                value="REGULAR"
                checked={rtoType === 'REGULAR'}
                onChange={() => setRtoType('REGULAR')}
                className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
              />
              <span>REGULAR</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="radio"
                name="rtoType"
                value="RTO"
                checked={rtoType === 'RTO'}
                onChange={() => setRtoType('RTO')}
                className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
              />
              <span>RTO</span>
            </label>
          </div>

          {/* Radio Group 2: Franchise vs Franchise Agent */}
          <div className="flex items-center gap-6">
            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="radio"
                name="franchiseTarget"
                value="Franchise"
                checked={franchiseTarget === 'Franchise'}
                onChange={() => {
                  setFranchiseTarget('Franchise');
                  setReferenceType('Franchise');
                }}
                className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
              />
              <span>Franchise</span>
            </label>

            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-800">
              <input
                type="radio"
                name="franchiseTarget"
                value="Franchise Agent"
                checked={franchiseTarget === 'Franchise Agent'}
                onChange={() => {
                  setFranchiseTarget('Franchise Agent');
                  setReferenceType('Franchise Agent');
                }}
                className="w-4 h-4 text-brand-primary focus:ring-brand-primary"
              />
              <span>Franchise Agent</span>
            </label>
          </div>

          {/* Broker Dropdown */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Broker
            </label>
            <select
              value={selectedBroker}
              onChange={e => setSelectedBroker(e.target.value)}
              className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
            >
              {brokerList.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Branch, Franchise, Company Name & View/Reset Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end pt-2 border-t border-brand-border">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Branch
            </label>
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
            >
              {branchList.map(br => (
                <option key={br} value={br}>{br}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Franchise
            </label>
            <select
              value={selectedFranchiseName}
              onChange={e => setSelectedFranchiseName(e.target.value)}
              className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
            >
              <option value="--Select Franchise Name--">--Select Franchise Name--</option>
              {franchises.map(f => (
                <option key={f.code} value={`${f.name} (${f.code})`}>
                  {f.name} ({f.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Company Name
            </label>
            <select
              value={selectedCompany}
              onChange={e => setSelectedCompany(e.target.value)}
              className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
            >
              {companyList.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Action Buttons: View (Amber) & Reset (Red) */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleViewGrid}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs py-2 px-5 rounded-md shadow-xs transition-colors cursor-pointer text-center"
            >
              View
            </button>
            <button
              type="button"
              onClick={handleTopReset}
              className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2 px-5 rounded-md shadow-xs transition-colors cursor-pointer text-center"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CARD 2: » Commission Details (Themed Header)              */}
      {/* ========================================================= */}
      <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden w-full">
        {/* Section Header */}
        <div className="p-3.5 bg-slate-50 border-b border-brand-border flex items-center">
          <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wide text-brand-navy">
            <span className="text-brand-navy/70 text-sm font-serif">»</span>
            <span>Commission Details</span>
          </div>
        </div>

        <form onSubmit={handleSaveCommissionDetails} className="p-5 sm:p-6 space-y-4">
          {/* Row 1: Comm. Date, Reference Type, Vehicle Type, Policy Type, Make */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Comm. Date
              </label>
              <input
                type="text"
                value={commDate}
                onChange={e => setCommDate(e.target.value)}
                placeholder="dd/mm/yyyy"
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Reference Type
              </label>
              <select
                value={referenceType}
                onChange={e => setReferenceType(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                <option value="Franchise">Franchise</option>
                <option value="Franchise Agent">Franchise Agent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Vehicle Type
              </label>
              <select
                value={vehicleType}
                onChange={e => setVehicleType(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                {vehicleTypeList.map(vt => (
                  <option key={vt} value={vt}>{vt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Policy Type
              </label>
              <select
                value={policyType}
                onChange={e => setPolicyType(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                {policyTypeList.map(pt => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Make
              </label>
              <select
                value={make}
                onChange={e => setMake(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                {makeList.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Model, NCB, Year Slab, Fuel Type, Product Type, RA OD Discount(%) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Model
              </label>
              <select
                value={model}
                onChange={e => setModel(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                {modelList.map(md => (
                  <option key={md} value={md}>{md}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                NCB
              </label>
              <select
                value={ncb}
                onChange={e => setNcb(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                <option value="NO">NO</option>
                <option value="YES">YES</option>
                <option value="0%">0%</option>
                <option value="20%">20%</option>
                <option value="25%">25%</option>
                <option value="35%">35%</option>
                <option value="45%">45%</option>
                <option value="50%">50%</option>
              </select>
            </div>

            {/* Year Slab Checkbox + Dropdown */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <input
                  type="checkbox"
                  id="yearSlabCheck"
                  checked={yearSlabApplicable}
                  onChange={e => setYearSlabApplicable(e.target.checked)}
                  className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                />
                <label htmlFor="yearSlabCheck" className="text-xs font-medium text-slate-700 cursor-pointer">
                  Year Slab
                </label>
              </div>
              <select
                disabled={!yearSlabApplicable}
                value={yearSlab}
                onChange={e => setYearSlab(e.target.value)}
                className={`w-full px-3.5 py-1.5 border border-slate-300 rounded-full text-xs shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                  yearSlabApplicable ? 'bg-white text-slate-800 cursor-pointer' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                {yearSlabList.map(ys => (
                  <option key={ys} value={ys}>{ys}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Fuel Type
              </label>
              <select
                value={fuelType}
                onChange={e => setFuelType(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                {fuelTypeList.map(ft => (
                  <option key={ft} value={ft}>{ft}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Product Type
              </label>
              <select
                value={productType}
                onChange={e => setProductType(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                {productTypeList.map(pt => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                RA OD Discount(%)
              </label>
              <input
                type="text"
                value={raOdDiscount}
                onChange={e => setRaOdDiscount(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Row 3: OD Discount(%), RA TP Comm, TP Comm, RA OD Comm, OD Comm, RA Net Comm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                OD Discount(%)
              </label>
              <input
                type="text"
                value={odDiscount}
                onChange={e => setOdDiscount(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                RA TP Commission(%)
              </label>
              <input
                type="text"
                value={raTpCommission}
                onChange={e => setRaTpCommission(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                TP Commission(%)
              </label>
              <input
                type="text"
                value={tpCommission}
                onChange={e => setTpCommission(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                RA OD Commission(%)
              </label>
              <input
                type="text"
                value={raOdCommission}
                onChange={e => setRaOdCommission(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                OD Commission(%)
              </label>
              <input
                type="text"
                value={odCommission}
                onChange={e => setOdCommission(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                RA Net Commission(%)
              </label>
              <input
                type="text"
                value={raNetCommission}
                onChange={e => setRaNetCommission(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>
          </div>

          {/* Row 4: Net Commission(%), MISP, ND/NND */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                Net Commission(%)
              </label>
              <input
                type="text"
                value={netCommission}
                onChange={e => setNetCommission(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                MISP
              </label>
              <select
                value={misp}
                onChange={e => setMisp(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                <option value="NO">NO</option>
                <option value="YES">YES</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">
                ND/NND
              </label>
              <select
                value={ndNnd}
                onChange={e => setNdNnd(e.target.value)}
                className="w-full px-3.5 py-1.5 bg-white border border-slate-300 rounded-full text-xs text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary cursor-pointer"
              >
                <option value="NND">NND</option>
                <option value="ND">ND</option>
              </select>
            </div>
          </div>

          {/* Action Button: Save (aligned left as in photo 2) */}
          <div className="pt-2">
            <button
              type="submit"
              className="bg-brand-primary hover:bg-blue-700 text-white font-bold text-xs py-2 px-9 rounded-md shadow-sm transition-colors cursor-pointer"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {/* ========================================================= */}
      {/* CARD 3: COMMISSION GRID TABLE (Active / Configured Grid)  */}
      {/* ========================================================= */}
      {showGridTable && (
        <div className="bg-white rounded-[12px] border border-brand-border shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-3.5 border-b border-brand-border bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Percent size={16} className="text-brand-navy" />
              <h3 className="font-bold text-brand-navy text-xs uppercase tracking-wide">
                Configured Franchise Commission Rates ({filteredRules.length} Rules)
              </h3>
            </div>
            <button
              onClick={() => {
                showToast('Exporting franchise commission grid...');
              }}
              className="text-xs text-slate-600 hover:text-brand-navy font-semibold flex items-center gap-1"
            >
              <Download size={13} /> Export Grid
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
              <thead>
                <tr className="bg-brand-lightbg text-brand-navy font-semibold uppercase tracking-wider text-[11px] border-b border-brand-border">
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Target</th>
                  <th className="py-2.5 px-3">Branch</th>
                  <th className="py-2.5 px-3">Franchise</th>
                  <th className="py-2.5 px-3">Company</th>
                  <th className="py-2.5 px-3">Vehicle Type</th>
                  <th className="py-2.5 px-3">Make / Model</th>
                  <th className="py-2.5 px-3 text-right">RA OD %</th>
                  <th className="py-2.5 px-3 text-right">Comm OD %</th>
                  <th className="py-2.5 px-3 text-right">RA TP %</th>
                  <th className="py-2.5 px-3 text-right">Comm TP %</th>
                  <th className="py-2.5 px-3 text-right font-bold">Net Comm %</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border text-slate-700">
                {filteredRules.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="py-8 text-center text-slate-400">
                      <AlertCircle size={24} className="mx-auto mb-1 text-slate-300" />
                      No commission rules matched for the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredRules.map(r => (
                    <tr key={r.id} className="hover:bg-brand-mainbg transition-colors bg-white">
                      <td className="py-2 px-3 font-mono text-slate-500">{r.commDate}</td>
                      <td className="py-2 px-3 font-semibold text-slate-800">{r.franchiseTarget}</td>
                      <td className="py-2 px-3">{r.branch}</td>
                      <td className="py-2 px-3 font-medium text-brand-navy">{r.franchiseName}</td>
                      <td className="py-2 px-3">{r.companyName}</td>
                      <td className="py-2 px-3">{r.vehicleType}</td>
                      <td className="py-2 px-3">{r.make} / {r.model}</td>
                      <td className="py-2 px-3 text-right font-medium">{r.raOdCommission}%</td>
                      <td className="py-2 px-3 text-right font-bold text-emerald-700">{r.odCommission}%</td>
                      <td className="py-2 px-3 text-right font-medium">{r.raTpCommission}%</td>
                      <td className="py-2 px-3 text-right font-bold text-blue-700">{r.tpCommission}%</td>
                      <td className="py-2 px-3 text-right font-bold text-slate-900">{r.netCommission}%</td>
                      <td className="py-2 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
