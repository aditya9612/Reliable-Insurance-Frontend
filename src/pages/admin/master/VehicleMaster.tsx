import React, { useState } from 'react';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs from '../../../components/tabs/UnderlineTabs';
import { Edit2, Trash2, Search, X } from 'lucide-react';

type SubTab = 'vehicleType' | 'vehicleMake' | 'vehicleFuel' | 'vehicleModel' | 'vehicleVariant' | 'updateVehicleVariant';

interface SimpleItem {
  id: number;
  name: string;
  code?: string;
  type?: string;
  make?: string;
  fuel?: string;
  model?: string;
}

const VehicleMaster: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SubTab>('vehicleType');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMakeQuery, setSearchMakeQuery] = useState('');
  const [searchModelQuery, setSearchModelQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter View State for View Vehicle Variants (Image 5)
  const [viewFilterType, setViewFilterType] = useState('');
  const [viewFilterModel, setViewFilterModel] = useState('');

  // Data States
  const [vehicleTypes, setVehicleTypes] = useState<SimpleItem[]>([
    { id: 1, name: 'TWO WHEELER' },
    { id: 2, name: 'PRIVATE CAR' },
    { id: 3, name: 'COMMERCIAL VEHICLE' },
    { id: 4, name: 'PASSENGER CARRYING' },
    { id: 5, name: 'MISCELLANEOUS D.W.' },
    { id: 6, name: 'THREE WHEELER' },
    { id: 7, name: 'GOODS CARRYING' },
  ]);

  const [vehicleMakes, setVehicleMakes] = useState<any[]>([
    { id: 1, makeName: 'ASHOK LEYLAND', gcv: 0, miscD: 1, pcv: 0, pvtCar: 0, twoWheeler: 0, bus: 0, threeWheelerGcv: 0, threeWheelerPcv: 0 },
    { id: 2, makeName: 'DAEWOO', gcv: 0, miscD: 0, pcv: 0, pvtCar: 1, twoWheeler: 0, bus: 0, threeWheelerGcv: 0, threeWheelerPcv: 0 },
    { id: 3, makeName: 'HIND AGRO INDUSTRIES', gcv: 0, miscD: 1, pcv: 0, pvtCar: 0, twoWheeler: 0, bus: 0, threeWheelerGcv: 0, threeWheelerPcv: 0 },
    { id: 4, makeName: 'MARUTI SUZUKI', gcv: 0, miscD: 0, pcv: 0, pvtCar: 1, twoWheeler: 0, bus: 0, threeWheelerGcv: 0, threeWheelerPcv: 0 },
    { id: 5, makeName: 'HONDA', gcv: 0, miscD: 0, pcv: 0, pvtCar: 0, twoWheeler: 1, bus: 0, threeWheelerGcv: 0, threeWheelerPcv: 0 },
  ]);

  const [vehicleFuels, setVehicleFuels] = useState<any[]>([
    { id: 1, type: 'CNG' },
    { id: 2, type: 'DIESEL' },
    { id: 3, type: 'ELECTRIC' },
    { id: 4, type: 'PETROL' },
  ]);

  const [vehicleModels, setVehicleModels] = useState<any[]>([
    { id: 1, makeName: 'ASHOK LEYLAND', modelName: '1616 BOREWELL', rMakeId: 0, type: 'MISC-D' },
    { id: 2, makeName: 'ASHOK LEYLAND', modelName: '2518', rMakeId: 0, type: 'MISC-D' },
    { id: 3, makeName: 'DAEWOO', modelName: 'MATIZ', rMakeId: 0, type: 'CAR' },
    { id: 4, makeName: 'MARUTI SUZUKI', modelName: 'SWIFT', rMakeId: 0, type: 'PRIVATE CAR' },
  ]);

  const [vehicleVariants, setVehicleVariants] = useState<SimpleItem[]>([
    { id: 1, name: 'VXI 1.2L', model: 'SWIFT', make: 'MARUTI SUZUKI', fuel: 'PETROL' },
    { id: 2, name: 'ZXI PLUS', model: 'SWIFT', make: 'MARUTI SUZUKI', fuel: 'PETROL' },
    { id: 3, name: 'SX(O) DIESEL', model: 'CRETA', make: 'HYUNDAI', fuel: 'DIESEL' },
  ]);

  // Form State for Vehicle Make
  const [companyNameInput, setCompanyNameInput] = useState('');
  const [rMakeIdInput, setRMakeIdInput] = useState('1');
  const [makeGcv, setMakeGcv] = useState(false);
  const [makeMiscD, setMakeMiscD] = useState(false);
  const [makePcv, setMakePcv] = useState(false);
  const [makePvtCar, setMakePvtCar] = useState(false);
  const [makeTwoWheeler, setMakeTwoWheeler] = useState(false);
  const [makeBus, setMakeBus] = useState(false);
  const [makeThreeWheelerGcv, setMakeThreeWheelerGcv] = useState(false);
  const [makeThreeWheelerPcv, setMakeThreeWheelerPcv] = useState(false);

  // Form State for Vehicle Model (Image 1 & 2)
  const [modelVehicleType, setModelVehicleType] = useState('');
  const [modelMakeName, setModelMakeName] = useState('');
  const [modelNameInput, setModelNameInput] = useState('');

  // Form State for Vehicle Variant (Image 3 - 28 fields)
  const [variantVehicleType, setVariantVehicleType] = useState('');
  const [variantSubtype, setVariantSubtype] = useState('');
  const [variantMake, setVariantMake] = useState('');
  const [variantModel, setVariantModel] = useState('');
  const [variance, setVariance] = useState('');
  const [wheels, setWheels] = useState('');
  const [mfgYear, setMfgYear] = useState('');
  const [operatedBy, setOperatedBy] = useState('');
  const [amp, setAmp] = useState('');
  const [cc, setCc] = useState('');
  const [unitName, setUnitName] = useState('');
  const [batteryMfg, setBatteryMfg] = useState('');
  const [grossWeight, setGrossWeight] = useState('');
  const [seatingCap, setSeatingCap] = useState('');
  const [carryingCap, setCarryingCap] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [minSeatingCap, setMinSeatingCap] = useState('');
  const [maxSeatingCap, setMaxSeatingCap] = useState('');
  const [minCarryingCap, setMinCarryingCap] = useState('');
  const [maxCarryingCap, setMaxCarryingCap] = useState('');
  const [isInBlackListed, setIsInBlackListed] = useState('YES');
  const [isObsolete, setIsObsolete] = useState('YES');
  const [isImported, setIsImported] = useState('YES');
  const [segmentName, setSegmentName] = useState('');
  const [comSegment, setComSegment] = useState('');
  const [bodyPrice, setBodyPrice] = useState('');
  const [modelPrice, setModelPrice] = useState('');
  const [chasisPrice, setChasisPrice] = useState('');

  const getTabLabel = (tab: SubTab) => {
    switch (tab) {
      case 'vehicleType': return 'Vehicle Type';
      case 'vehicleMake': return 'Vehicle Make';
      case 'vehicleFuel': return 'Vehicle Fuel';
      case 'vehicleModel': return 'Vehicle Model';
      case 'vehicleVariant': return 'Vehicle Variant';
      case 'updateVehicleVariant': return 'Update Vehicle Variant';
    }
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setCompanyNameInput('');
    setRMakeIdInput('1');
    setMakeGcv(false);
    setMakeMiscD(false);
    setMakePcv(false);
    setMakePvtCar(false);
    setMakeTwoWheeler(false);
    setMakeBus(false);
    setMakeThreeWheelerGcv(false);
    setMakeThreeWheelerPcv(false);

    // Vehicle Model resets
    setModelVehicleType('');
    setModelMakeName('');
    setModelNameInput('');

    // Vehicle Variant resets
    setVariantVehicleType('');
    setVariantSubtype('');
    setVariantMake('');
    setVariantModel('');
    setVariance('');
    setWheels('');
    setMfgYear('');
    setOperatedBy('');
    setAmp('');
    setCc('');
    setUnitName('');
    setBatteryMfg('');
    setGrossWeight('');
    setSeatingCap('');
    setCarryingCap('');
    setBodyType('');
    setMinSeatingCap('');
    setMaxSeatingCap('');
    setMinCarryingCap('');
    setMaxCarryingCap('');
    setIsInBlackListed('YES');
    setIsObsolete('YES');
    setIsImported('YES');
    setSegmentName('');
    setComSegment('');
    setBodyPrice('');
    setModelPrice('');
    setChasisPrice('');

    setShowModal(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    if (activeTab === 'vehicleMake') {
      setCompanyNameInput(item.makeName || '');
      setRMakeIdInput(String(item.rMakeId || item.id || 1));
      setMakeGcv(Boolean(item.gcv));
      setMakeMiscD(Boolean(item.miscD));
      setMakePcv(Boolean(item.pcv));
      setMakePvtCar(Boolean(item.pvtCar));
      setMakeTwoWheeler(Boolean(item.twoWheeler));
      setMakeBus(Boolean(item.bus));
      setMakeThreeWheelerGcv(Boolean(item.threeWheelerGcv));
      setMakeThreeWheelerPcv(Boolean(item.threeWheelerPcv));
    } else if (activeTab === 'vehicleModel') {
      setModelVehicleType(item.type || 'MISC-D');
      setModelMakeName(item.makeName || '');
      setModelNameInput(item.modelName || '');
    } else {
      setCompanyNameInput(item.name || item.type || item.modelName || '');
    }
    setShowModal(true);
  };

  const handleDeleteItem = (id: number) => {
    if (activeTab === 'vehicleMake') setVehicleMakes(prev => prev.filter(m => m.id !== id));
    else if (activeTab === 'vehicleFuel') setVehicleFuels(prev => prev.filter(f => f.id !== id));
    else if (activeTab === 'vehicleModel') setVehicleModels(prev => prev.filter(m => m.id !== id));
    else if (activeTab === 'vehicleType') setVehicleTypes(prev => prev.filter(t => t.id !== id));
    else setVehicleVariants(prev => prev.filter(v => v.id !== id));
  };

  const handleSaveModalForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === 'vehicleMake') {
      if (!companyNameInput.trim()) return;
      const makeData = {
        makeName: companyNameInput.toUpperCase(),
        rMakeId: Number(rMakeIdInput) || 1,
        gcv: makeGcv ? 1 : 0,
        miscD: makeMiscD ? 1 : 0,
        pcv: makePcv ? 1 : 0,
        pvtCar: makePvtCar ? 1 : 0,
        twoWheeler: makeTwoWheeler ? 1 : 0,
        bus: makeBus ? 1 : 0,
        threeWheelerGcv: makeThreeWheelerGcv ? 1 : 0,
        threeWheelerPcv: makeThreeWheelerPcv ? 1 : 0,
      };
      if (editingItem) {
        setVehicleMakes(prev => prev.map(m => (m.id === editingItem.id ? { ...m, ...makeData } : m)));
      } else {
        setVehicleMakes(prev => [...prev, { id: Date.now(), ...makeData }]);
      }
    } else if (activeTab === 'vehicleFuel') {
      if (!companyNameInput.trim()) return;
      if (editingItem) {
        setVehicleFuels(prev => prev.map(f => (f.id === editingItem.id ? { ...f, type: companyNameInput.toUpperCase() } : f)));
      } else {
        setVehicleFuels(prev => [...prev, { id: Date.now(), type: companyNameInput.toUpperCase() }]);
      }
    } else if (activeTab === 'vehicleModel') {
      if (!modelNameInput.trim()) return;
      const modelData = {
        makeName: modelMakeName || 'ASHOK LEYLAND',
        modelName: modelNameInput.toUpperCase(),
        rMakeId: 0,
        type: modelVehicleType || 'MISC-D',
      };
      if (editingItem) {
        setVehicleModels(prev => prev.map(m => (m.id === editingItem.id ? { ...m, ...modelData } : m)));
      } else {
        setVehicleModels(prev => [...prev, { id: Date.now(), ...modelData }]);
      }
    } else if (activeTab === 'vehicleVariant') {
      const variantName = variance || variantModel || 'NEW VARIANT';
      if (editingItem) {
        setVehicleVariants(prev => prev.map(v => (v.id === editingItem.id ? { ...v, name: variantName.toUpperCase() } : v)));
      } else {
        setVehicleVariants(prev => [...prev, { id: Date.now(), name: variantName.toUpperCase(), model: variantModel, make: variantMake, fuel: 'PETROL' }]);
      }
    } else {
      if (!companyNameInput.trim()) return;
      if (editingItem) {
        setVehicleTypes(prev => prev.map(t => (t.id === editingItem.id ? { ...t, name: companyNameInput.toUpperCase() } : t)));
      } else {
        setVehicleTypes(prev => [...prev, { id: Date.now(), name: companyNameInput.toUpperCase() }]);
      }
    }

    setShowModal(false);
    setEditingItem(null);
  };

  // Dataset calculation & Pagination
  const getActiveDataset = (): any[] => {
    switch (activeTab) {
      case 'vehicleType':
        return vehicleTypes.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      case 'vehicleMake':
        return vehicleMakes.filter(m => m.makeName.toLowerCase().includes(searchQuery.toLowerCase()));
      case 'vehicleFuel':
        return vehicleFuels.filter(f => f.type.toLowerCase().includes(searchQuery.toLowerCase()));
      case 'vehicleModel':
        return vehicleModels.filter(m =>
          m.makeName.toLowerCase().includes(searchMakeQuery.toLowerCase()) &&
          m.modelName.toLowerCase().includes(searchModelQuery.toLowerCase())
        );
      case 'vehicleVariant':
      case 'updateVehicleVariant':
        return vehicleVariants.filter(v => (!viewFilterModel || v.model === viewFilterModel));
    }
  };

  const currentDataset = getActiveDataset();
  const totalPages = Math.ceil(currentDataset.length / itemsPerPage);
  const paginatedData = currentDataset.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const subTabs: SubTab[] = ['vehicleType', 'vehicleMake', 'vehicleFuel', 'vehicleModel', 'vehicleVariant', 'updateVehicleVariant'];

  return (
    <div className="w-full max-w-full overflow-x-hidden flex flex-col space-y-5">
      {/* Top Header */}
      <PageHeader
        title="Vehicle Master"
        description="Manage vehicle types, makes, fuels, models and variants"
      />

      {/* Navigation Sub-Tabs Bar */}
      <UnderlineTabs
        tabs={subTabs.map(tab => ({ id: tab, label: getTabLabel(tab) }))}
        activeTab={activeTab}
        onTabChange={(tabId) => { setActiveTab(tabId as SubTab); setCurrentPage(1); setSearchQuery(''); setSearchMakeQuery(''); setSearchModelQuery(''); }}
      />

      {/* Main Unified Card for all Sub-Tabs */}
      <div key={activeTab} className="tab-transition-wrapper w-full max-w-full">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full max-w-full">

          {/* Special UI layout for Vehicle Variant Tab (Image 4: List Table removed) */}
          {activeTab === 'vehicleVariant' ? (
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-base font-bold text-brand-navy">Vehicle Variant Master</h3>
                <button
                  onClick={handleOpenCreateModal}
                  className="px-5 py-2.5 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-semibold text-sm shadow-sm transition-all duration-200 cursor-pointer"
                >
                  Add New Vehicle Variant
                </button>
              </div>

              {/* Form Card embedded directly in place of deleted table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="bg-[#17A2B8] text-white px-5 py-3 font-semibold text-sm">
                  » Vehicle Variant Form
                </div>

                <form onSubmit={handleSaveModalForm} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Type</label>
                      <select
                        value={variantVehicleType}
                        onChange={(e) => setVariantVehicleType(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Vehicle Type--</option>
                        {vehicleTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Sub type</label>
                      <select
                        value={variantSubtype}
                        onChange={(e) => setVariantSubtype(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Sub Type--</option>
                        <option value="SUB_TYPE_1">SUB TYPE 1</option>
                        <option value="SUB_TYPE_2">SUB TYPE 2</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Make</label>
                      <select
                        value={variantMake}
                        onChange={(e) => setVariantMake(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Vehicle Make--</option>
                        {vehicleMakes.map(m => <option key={m.id} value={m.makeName}>{m.makeName}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Model Name</label>
                      <select
                        value={variantModel}
                        onChange={(e) => setVariantModel(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                      >
                        <option value="">--Select Model--</option>
                        {vehicleModels.map(m => <option key={m.id} value={m.modelName}>{m.modelName}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Variance</label>
                      <input type="text" value={variance} onChange={(e) => setVariance(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Wheels</label>
                      <input type="text" value={wheels} onChange={(e) => setWheels(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Manufacturing Year</label>
                      <input type="text" value={mfgYear} onChange={(e) => setMfgYear(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Operated By</label>
                      <input type="text" value={operatedBy} onChange={(e) => setOperatedBy(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Amp</label>
                      <input type="text" value={amp} onChange={(e) => setAmp(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">CC</label>
                      <input type="text" value={cc} onChange={(e) => setCc(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Unit_Name</label>
                      <input type="text" value={unitName} onChange={(e) => setUnitName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Battery_Manufacturer</label>
                      <input type="text" value={batteryMfg} onChange={(e) => setBatteryMfg(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Gross Weight</label>
                      <input type="text" value={grossWeight} onChange={(e) => setGrossWeight(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Seating Capacity</label>
                      <input type="text" value={seatingCap} onChange={(e) => setSeatingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Carrying Capacity</label>
                      <input type="text" value={carryingCap} onChange={(e) => setCarryingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Body Type</label>
                      <input type="text" value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Min Seating Capacity</label>
                      <input type="text" value={minSeatingCap} onChange={(e) => setMinSeatingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Max Seating Capacity</label>
                      <input type="text" value={maxSeatingCap} onChange={(e) => setMaxSeatingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Min carrying Capacity</label>
                      <input type="text" value={minCarryingCap} onChange={(e) => setMinCarryingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Max carrying Capacity</label>
                      <input type="text" value={maxCarryingCap} onChange={(e) => setMaxCarryingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Is_In_Black_Listed</label>
                      <select value={isInBlackListed} onChange={(e) => setIsInBlackListed(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">IsObsolete</label>
                      <select value={isObsolete} onChange={(e) => setIsObsolete(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">IsImported</label>
                      <select value={isImported} onChange={(e) => setIsImported(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                        <option value="YES">YES</option>
                        <option value="NO">NO</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Segment Name</label>
                      <input type="text" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">COM Segment</label>
                      <input type="text" value={comSegment} onChange={(e) => setComSegment(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Body Price</label>
                      <input type="text" value={bodyPrice} onChange={(e) => setBodyPrice(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Model Price</label>
                      <input type="text" value={modelPrice} onChange={(e) => setModelPrice(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Chasis Price</label>
                      <input type="text" value={chasisPrice} onChange={(e) => setChasisPrice(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                    </div>
                  </div>

                  <div className="flex items-center justify-start gap-3 pt-4 border-t border-slate-200">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#0056B3] hover:bg-[#004085] text-white font-semibold rounded-md text-sm shadow-md transition-all cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : activeTab === 'updateVehicleVariant' ? (
            /* Special UI layout for Update Vehicle Variant Tab (Image 5: List Table removed, button renamed to View) */
            <div className="p-6 space-y-6">
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm p-6">
                <h3 className="text-sm font-bold text-brand-primary mb-4 pb-2 border-b border-slate-200">View Vehicle Variants</h3>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-64">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Type <span className="text-red-500">*</span></label>
                    <select
                      value={viewFilterType}
                      onChange={(e) => setViewFilterType(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">--Select Vehicle Type--</option>
                      {vehicleTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>
                  </div>

                  <div className="w-full sm:w-64">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Model <span className="text-red-500">*</span></label>
                    <select
                      value={viewFilterModel}
                      onChange={(e) => setViewFilterModel(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary"
                    >
                      <option value="">--Select Vehicle Model--</option>
                      {vehicleModels.map(m => <option key={m.id} value={m.modelName}>{m.modelName}</option>)}
                    </select>
                  </div>

                  <div className="sm:self-end mt-2 sm:mt-0">
                    <button
                      type="button"
                      className="px-6 py-2 bg-[#0056B3] hover:bg-[#004085] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Table Search & Add Button Toolbar for standard sub-tabs */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                {activeTab === 'vehicleModel' ? (
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search Make Name Here"
                      value={searchMakeQuery}
                      onChange={(e) => setSearchMakeQuery(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                    <input
                      type="text"
                      placeholder="Search Model Name Here"
                      value={searchModelQuery}
                      onChange={(e) => setSearchModelQuery(e.target.value)}
                      className="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                ) : (
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="text"
                      placeholder={`Search ${getTabLabel(activeTab)}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                    />
                  </div>
                )}

                <button
                  onClick={handleOpenCreateModal}
                  className="w-full sm:w-auto flex items-center justify-center px-5 py-2.5 bg-brand-primary hover:bg-[#0654B0] text-white rounded-lg font-medium text-sm shadow-sm transition-all duration-200 cursor-pointer"
                >
                  <span>Add New {getTabLabel(activeTab)}</span>
                </button>
              </div>

              {/* Dynamic Directory Tables */}
              <div className="overflow-x-auto w-full custom-scrollbar">
                {activeTab === 'vehicleMake' ? (
                  <table className="w-full text-left border-collapse min-w-[850px]">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                        <th className="py-3.5 px-6">MAKE NAME</th>
                        <th className="py-3.5 px-4 text-center">GCV</th>
                        <th className="py-3.5 px-4 text-center">MISC_D</th>
                        <th className="py-3.5 px-4 text-center">PCV</th>
                        <th className="py-3.5 px-4 text-center">PVT CAR</th>
                        <th className="py-3.5 px-4 text-center">TWO WHEELER</th>
                        <th className="py-3.5 px-4 text-center">BUS</th>
                        <th className="py-3.5 px-4 text-center">THREE WHEELER GCV</th>
                        <th className="py-3.5 px-4 text-center">THREE WHEELER PCV</th>
                        <th className="py-3.5 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                      {paginatedData.map((m: any) => (
                        <tr key={m.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                          <td className="py-3.5 px-6 font-semibold text-[#12284A]">{m.makeName}</td>
                          <td className="py-3.5 px-4 text-center font-medium">{m.gcv}</td>
                          <td className="py-3.5 px-4 text-center font-medium">{m.miscD}</td>
                          <td className="py-3.5 px-4 text-center font-medium">{m.pcv}</td>
                          <td className="py-3.5 px-4 text-center font-medium">{m.pvtCar}</td>
                          <td className="py-3.5 px-4 text-center font-medium">{m.twoWheeler}</td>
                          <td className="py-3.5 px-4 text-center font-medium">{m.bus}</td>
                          <td className="py-3.5 px-4 text-center font-medium">{m.threeWheelerGcv}</td>
                          <td className="py-3.5 px-4 text-center font-medium">{m.threeWheelerPcv}</td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => handleOpenEditModal(m)}
                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                title="Edit Vehicle Make"
                              >
                                <Edit2 size={18} strokeWidth={1.5} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(m.id)}
                                className="p-1.5 bg-[#F4F8FC] text-brand-error hover:bg-[#FEE2E2] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                title="Delete Vehicle Make"
                              >
                                <Trash2 size={18} strokeWidth={1.5} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : activeTab === 'vehicleFuel' ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                        <th className="py-3.5 px-6">TYPE</th>
                        <th className="py-3.5 px-6 text-right w-24">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                      {paginatedData.map((f: any) => (
                        <tr key={f.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                          <td className="py-3.5 px-6 font-semibold text-[#12284A]">{f.type}</td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => handleOpenEditModal(f)}
                              className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                              title="Edit Vehicle Fuel"
                            >
                              <Edit2 size={18} strokeWidth={1.5} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : activeTab === 'vehicleModel' ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                        <th className="py-3.5 px-6">MAKE NAME</th>
                        <th className="py-3.5 px-6">MODEL NAME</th>
                        <th className="py-3.5 px-4">R MAKEID</th>
                        <th className="py-3.5 px-6">TYPE</th>
                        <th className="py-3.5 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                      {paginatedData.map((m: any) => (
                        <tr key={m.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                          <td className="py-3.5 px-6 font-semibold text-[#12284A]">{m.makeName}</td>
                          <td className="py-3.5 px-6 font-medium text-slate-700">{m.modelName}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-500">{m.rMakeId}</td>
                          <td className="py-3.5 px-6 text-slate-600 font-semibold">{m.type}</td>
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => handleOpenEditModal(m)}
                                className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                title="Edit Model"
                              >
                                <Edit2 size={18} strokeWidth={1.5} />
                              </button>
                              <button
                                onClick={() => handleDeleteItem(m.id)}
                                className="p-1.5 bg-[#F4F8FC] text-brand-error hover:bg-[#FEE2E2] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                                title="Delete Model"
                              >
                                <Trash2 size={18} strokeWidth={1.5} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-brand-lightbg text-brand-navy text-[14px] font-semibold uppercase border-b border-brand-border">
                        <th className="py-3.5 px-6 w-20">Sr. No.</th>
                        <th className="py-3.5 px-6">{getTabLabel(activeTab).toUpperCase()}</th>
                        <th className="py-3.5 px-6 text-right w-24">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                      {paginatedData.map((item: any, idx: number) => (
                        <tr key={item.id} className="hover:bg-brand-mainbg h-[52px] transition-colors bg-white">
                          <td className="py-3.5 px-6 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                          <td className="py-3.5 px-6 font-semibold text-[#12284A]">{item.name || item.title}</td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="p-1.5 bg-brand-lightbg text-brand-primary hover:bg-[#E2E8F0] rounded-[6px] transition-colors cursor-pointer inline-flex items-center justify-center"
                              title={`Edit ${getTabLabel(activeTab)}`}
                            >
                              <Edit2 size={18} strokeWidth={1.5} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Standard Footer Pagination Bar */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                  <span>Records per page:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 bg-white border border-slate-300 rounded-md text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                <span className="text-xs text-slate-500 font-medium">
                  Showing {currentDataset.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, currentDataset.length)} of {currentDataset.length} records
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-md transition-all ${currentPage === page
                        ? 'bg-brand-primary text-white shadow-sm'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="w-8 h-8 flex items-center justify-center text-xs font-semibold text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    &gt;
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Clean Modal Form for Add & Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className={`bg-white rounded-xl border border-slate-200 shadow-xl w-full overflow-hidden animate-in fade-in zoom-in duration-150 max-h-[90vh] flex flex-col my-auto ${activeTab === 'vehicleVariant' ? 'max-w-5xl' : 'max-w-lg'}`}>
            <div className="bg-brand-navy text-white px-5 sm:px-6 py-4 flex items-center justify-between shrink-0">
              <h2 className="text-base sm:text-lg font-bold">
                {activeTab === 'vehicleMake'
                  ? '» Vehicle Make Form'
                  : activeTab === 'vehicleFuel'
                  ? '» Vehicle Fuel Form'
                  : activeTab === 'vehicleModel'
                  ? '» Vehicle Model Form'
                  : activeTab === 'vehicleVariant'
                  ? '» Vehicle Variant Form'
                  : editingItem
                  ? `Edit ${getTabLabel(activeTab)}`
                  : `Add New ${getTabLabel(activeTab)}`}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white p-1 rounded-lg shrink-0 cursor-pointer border-none bg-transparent">
                <X size={20} />
              </button>
            </div>

            {activeTab === 'vehicleMake' ? (
              <form onSubmit={handleSaveModalForm} className="p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-65px)] custom-scrollbar">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Company Name"
                    value={companyNameInput}
                    onChange={(e) => setCompanyNameInput(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">R Make ID</label>
                  <input
                    type="text"
                    placeholder="1"
                    value={rMakeIdInput}
                    onChange={(e) => setRMakeIdInput(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-primary font-mono"
                  />
                </div>

                <div className="pt-1">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-700 font-medium">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={makeGcv} onChange={(e) => setMakeGcv(e.target.checked)} className="accent-brand-primary rounded" />
                      <span>GCV</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={makeMiscD} onChange={(e) => setMakeMiscD(e.target.checked)} className="accent-brand-primary rounded" />
                      <span>Misc_D</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={makePcv} onChange={(e) => setMakePcv(e.target.checked)} className="accent-brand-primary rounded" />
                      <span>PCV</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={makePvtCar} onChange={(e) => setMakePvtCar(e.target.checked)} className="accent-brand-primary rounded" />
                      <span>PvtCar</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={makeTwoWheeler} onChange={(e) => setMakeTwoWheeler(e.target.checked)} className="accent-brand-primary rounded" />
                      <span>Two_Wheeler</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={makeBus} onChange={(e) => setMakeBus(e.target.checked)} className="accent-brand-primary rounded" />
                      <span>Bus</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={makeThreeWheelerGcv} onChange={(e) => setMakeThreeWheelerGcv(e.target.checked)} className="accent-brand-primary rounded" />
                      <span>Three_Wheeler_GCV</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={makeThreeWheelerPcv} onChange={(e) => setMakeThreeWheelerPcv(e.target.checked)} className="accent-brand-primary rounded" />
                      <span>Three_Wheeler_Pcv</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer">
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            ) : activeTab === 'vehicleFuel' ? (
              <form onSubmit={handleSaveModalForm} className="p-6 space-y-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Vehicle Fuel</label>
                  <input
                    type="text"
                    required
                    placeholder="Vehicle Fuel"
                    value={companyNameInput}
                    onChange={(e) => setCompanyNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer">Save</button>
                </div>
              </form>
            ) : activeTab === 'vehicleModel' ? (
              /* Vehicle Model Add & Edit Form (Image 1 & 2) */
              <form onSubmit={handleSaveModalForm} className="p-6 space-y-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Type</label>
                  <select
                    value={modelVehicleType}
                    onChange={(e) => setModelVehicleType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">--Select Vehicle Type--</option>
                    {vehicleTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Make Name</label>
                  <select
                    value={modelMakeName}
                    onChange={(e) => setModelMakeName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white text-slate-800 focus:ring-2 focus:ring-brand-primary"
                  >
                    <option value="">--Select Vehicle Make--</option>
                    {vehicleMakes.map(m => <option key={m.id} value={m.makeName}>{m.makeName}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Model Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Model Name"
                    value={modelNameInput}
                    onChange={(e) => setModelNameInput(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-800 focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div className="flex items-center justify-start gap-3 pt-4 border-t border-slate-100">
                  <button type="submit" className="px-6 py-2 bg-[#0056B3] hover:bg-[#004085] text-white font-semibold rounded-md text-sm shadow-md transition-all cursor-pointer">
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                  {editingItem && (
                    <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-sm cursor-pointer">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            ) : activeTab === 'vehicleVariant' ? (
              /* Modal Vehicle Variant Form matching Image 3 */
              <form onSubmit={handleSaveModalForm} className="p-6 space-y-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Type</label>
                    <select value={variantVehicleType} onChange={(e) => setVariantVehicleType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                      <option value="">--Select Vehicle Type--</option>
                      {vehicleTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Sub type</label>
                    <select value={variantSubtype} onChange={(e) => setVariantSubtype(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                      <option value="">--Select Sub Type--</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Make</label>
                    <select value={variantMake} onChange={(e) => setVariantMake(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                      <option value="">--Select Vehicle Make--</option>
                      {vehicleMakes.map(m => <option key={m.id} value={m.makeName}>{m.makeName}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Model Name</label>
                    <select value={variantModel} onChange={(e) => setVariantModel(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                      <option value="">--Select Model--</option>
                      {vehicleModels.map(m => <option key={m.id} value={m.modelName}>{m.modelName}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Variance</label>
                    <input type="text" value={variance} onChange={(e) => setVariance(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Wheels</label>
                    <input type="text" value={wheels} onChange={(e) => setWheels(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Manufacturing Year</label>
                    <input type="text" value={mfgYear} onChange={(e) => setMfgYear(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Operated By</label>
                    <input type="text" value={operatedBy} onChange={(e) => setOperatedBy(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Amp</label>
                    <input type="text" value={amp} onChange={(e) => setAmp(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">CC</label>
                    <input type="text" value={cc} onChange={(e) => setCc(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Unit_Name</label>
                    <input type="text" value={unitName} onChange={(e) => setUnitName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Battery_Manufacturer</label>
                    <input type="text" value={batteryMfg} onChange={(e) => setBatteryMfg(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Gross Weight</label>
                    <input type="text" value={grossWeight} onChange={(e) => setGrossWeight(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Seating Capacity</label>
                    <input type="text" value={seatingCap} onChange={(e) => setSeatingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Carrying Capacity</label>
                    <input type="text" value={carryingCap} onChange={(e) => setCarryingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Body Type</label>
                    <input type="text" value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Min Seating Capacity</label>
                    <input type="text" value={minSeatingCap} onChange={(e) => setMinSeatingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Max Seating Capacity</label>
                    <input type="text" value={maxSeatingCap} onChange={(e) => setMaxSeatingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Min carrying Capacity</label>
                    <input type="text" value={minCarryingCap} onChange={(e) => setMinCarryingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Max carrying Capacity</label>
                    <input type="text" value={maxCarryingCap} onChange={(e) => setMaxCarryingCap(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Is_In_Black_Listed</label>
                    <select value={isInBlackListed} onChange={(e) => setIsInBlackListed(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">IsObsolete</label>
                    <select value={isObsolete} onChange={(e) => setIsObsolete(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">IsImported</label>
                    <select value={isImported} onChange={(e) => setIsImported(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white text-slate-800">
                      <option value="YES">YES</option>
                      <option value="NO">NO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Segment Name</label>
                    <input type="text" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">COM Segment</label>
                    <input type="text" value={comSegment} onChange={(e) => setComSegment(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Body Price</label>
                    <input type="text" value={bodyPrice} onChange={(e) => setBodyPrice(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Model Price</label>
                    <input type="text" value={modelPrice} onChange={(e) => setModelPrice(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Chasis Price</label>
                    <input type="text" value={chasisPrice} onChange={(e) => setChasisPrice(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs text-slate-800" />
                  </div>
                </div>

                <div className="flex items-center justify-start gap-3 pt-4 border-t border-slate-100">
                  <button type="submit" className="px-6 py-2 bg-[#0056B3] hover:bg-[#004085] text-white font-semibold rounded-md text-sm shadow-md transition-all cursor-pointer">Save</button>
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer">Cancel</button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSaveModalForm} className="p-6 space-y-4 overflow-y-auto max-h-[80vh] custom-scrollbar">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{getTabLabel(activeTab)} Name</label>
                  <input
                    type="text"
                    required
                    placeholder={`Enter ${getTabLabel(activeTab)} Name`}
                    value={companyNameInput}
                    onChange={(e) => setCompanyNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-brand-primary hover:bg-[#0654B0] text-white font-semibold rounded-lg text-sm shadow-md transition-all cursor-pointer">
                    {editingItem ? 'Update' : 'Save'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleMaster;
