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

  // Filter View State for View Vehicle Variants (Image 2)
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
    { id: 5, type: 'LPG' },
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

  // Form State for Modal Form
  const [companyNameInput, setCompanyNameInput] = useState('');
  const [rMakeIdInput, setRMakeIdInput] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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
    setRMakeIdInput('0');
    setSelectedTypes([]);
    setShowModal(true);
  };

  const handleOpenEditModal = (item: any) => {
    setEditingItem(item);
    setCompanyNameInput(item.name || item.makeName || item.type || item.modelName || '');
    setRMakeIdInput(String(item.rMakeId || 0));
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
    if (!companyNameInput.trim()) return;

    if (activeTab === 'vehicleMake') {
      if (editingItem) {
        setVehicleMakes(prev => prev.map(m => (m.id === editingItem.id ? { ...m, makeName: companyNameInput.toUpperCase() } : m)));
      } else {
        setVehicleMakes(prev => [...prev, { id: Date.now(), makeName: companyNameInput.toUpperCase(), gcv: 0, miscD: 1, pcv: 0, pvtCar: 0, twoWheeler: 0, bus: 0, threeWheelerGcv: 0, threeWheelerPcv: 0 }]);
      }
    } else if (activeTab === 'vehicleFuel') {
      if (editingItem) {
        setVehicleFuels(prev => prev.map(f => (f.id === editingItem.id ? { ...f, type: companyNameInput.toUpperCase() } : f)));
      } else {
        setVehicleFuels(prev => [...prev, { id: Date.now(), type: companyNameInput.toUpperCase() }]);
      }
    } else if (activeTab === 'vehicleModel') {
      if (editingItem) {
        setVehicleModels(prev => prev.map(m => (m.id === editingItem.id ? { ...m, modelName: companyNameInput.toUpperCase() } : m)));
      } else {
        setVehicleModels(prev => [...prev, { id: Date.now(), makeName: 'MARUTI SUZUKI', modelName: companyNameInput.toUpperCase(), rMakeId: 0, type: 'CAR' }]);
      }
    } else {
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
    <div className="w-full flex flex-col space-y-5">
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

      {/* Main Unified Card for all Sub-Tabs matching BranchMaster */}
      <div key={activeTab} className="tab-transition-wrapper">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col w-full">
          {/* Table Search & Add Button Toolbar */}
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
            ) : activeTab === 'updateVehicleVariant' ? (
              <div className="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
                <select
                  value={viewFilterType}
                  onChange={(e) => setViewFilterType(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                >
                  <option value="">--Select Vehicle Type--</option>
                  {vehicleTypes.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                </select>
                <select
                  value={viewFilterModel}
                  onChange={(e) => setViewFilterModel(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                >
                  <option value="">--Select Vehicle Model--</option>
                  {vehicleModels.map(m => <option key={m.id} value={m.modelName}>{m.modelName}</option>)}
                </select>
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
          <div className="overflow-x-auto w-full">
            {activeTab === 'vehicleMake' ? (
              <table className="w-full text-left border-collapse">
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
        </div>
      </div>

      {/* Clean Modal Form for Add & Edit (Matching BranchMaster) */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingItem ? `Edit ${getTabLabel(activeTab)}` : `Add New ${getTabLabel(activeTab)}`}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-white/80 hover:text-white p-1 rounded-lg shrink-0">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveModalForm} className="p-6 space-y-4 overflow-y-auto custom-scrollbar">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {getTabLabel(activeTab)} Name
                </label>
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
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleMaster;
