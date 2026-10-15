import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import { FranchiseSubTab } from './types';
import { initialFranchises, initialFranchiseCommissions } from './mockData';
import { FranchiseMasterTab } from './tabs/FranchiseMasterTab';
import { ViewFranchiseTab } from './tabs/ViewFranchiseTab';
import { FranchiseCommissionTab } from './tabs/FranchiseCommissionTab';
import { CheckCircle2 } from 'lucide-react';

const tabs: TabItem[] = [
  { id: 'franchise-master', label: 'Franchise Master' },
  { id: 'view-franchise', label: 'View Franchise' },
  { id: 'franchise-commission', label: 'Franchise Commision' }
];

export const FranchisePage: React.FC = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();

  // Normalize active tab
  const getNormalizedTab = (rawTab?: string): FranchiseSubTab => {
    if (rawTab === 'view-franchise' || rawTab === 'view') return 'view-franchise';
    if (rawTab === 'franchise-commission' || rawTab === 'commission') return 'franchise-commission';
    return 'franchise-master';
  };

  const activeTab = getNormalizedTab(tab);

  const handleTabChange = (newTabId: string) => {
    navigate(`/franchise/${newTabId}`);
  };

  // Shared state
  const [franchises, setFranchises] = useState(initialFranchises);
  const [commissions, setCommissions] = useState(initialFranchiseCommissions);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2.5 text-xs border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Franchise Management"
        description="Manage franchise master records, directory of franchise branches, and calculate franchise commission payouts"
      />

      {/* Tabs */}
      <UnderlineTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Tab Panels */}
      <div className="pt-1">
        {activeTab === 'franchise-master' && (
          <FranchiseMasterTab
            franchises={franchises}
            setFranchises={setFranchises}
            showToast={showToast}
          />
        )}

        {activeTab === 'view-franchise' && (
          <ViewFranchiseTab
            franchises={franchises}
            setFranchises={setFranchises}
            showToast={showToast}
          />
        )}

        {activeTab === 'franchise-commission' && (
          <FranchiseCommissionTab
            franchises={franchises}
            commissions={commissions}
            setCommissions={setCommissions}
            showToast={showToast}
          />
        )}
      </div>
    </div>
  );
};

export default FranchisePage;
