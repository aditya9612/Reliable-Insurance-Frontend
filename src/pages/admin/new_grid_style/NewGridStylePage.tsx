import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import { CheckCircle2 } from 'lucide-react';

import { ClusterMasterTab } from './tabs/ClusterMasterTab';
import { BrokerGridMasterTab } from './tabs/BrokerGridMasterTab';
import { ViewBrokerGridTab } from './tabs/ViewBrokerGridTab';
import { AgentGridMasterTab } from './tabs/AgentGridMasterTab';
import { ViewAgentGridTab } from './tabs/ViewAgentGridTab';

const tabs: TabItem[] = [
  { id: 'cluster-master', label: 'Cluster Master' },
  { id: 'broker-grid-master', label: 'Broker Grid Master' },
  { id: 'view-broker-grid', label: 'View Broker Grid' },
  { id: 'agent-grid-master', label: 'Agent Grid Master' },
  { id: 'view-agent-grid', label: 'View Agent Grid' }
];

export const NewGridStylePage: React.FC = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();

  // Validate active tab or fallback to 'cluster-master'
  const activeTab = tabs.some(t => t.id === tab) ? (tab as string) : 'cluster-master';

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleTabChange = (newTabId: string) => {
    navigate(`/new-grid-style/${newTabId}`);
  };

  return (
    <div className="w-full flex flex-col space-y-4 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-[#0B203C] text-white px-5 py-3 rounded-xl shadow-xl border border-blue-500/30 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="New Grid Style"
        description="Cluster-wise commission management for brokers and agents with regional RTO mapping"
      />

      {/* Underline Sub-Tabs (All 5 options from New Grid Style dropdown) */}
      <UnderlineTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Main Tab Content */}
      <div key={activeTab} className="tab-transition-wrapper w-full">
        {activeTab === 'cluster-master' && <ClusterMasterTab showToast={showToast} />}
        {activeTab === 'broker-grid-master' && <BrokerGridMasterTab showToast={showToast} />}
        {activeTab === 'view-broker-grid' && <ViewBrokerGridTab showToast={showToast} />}
        {activeTab === 'agent-grid-master' && <AgentGridMasterTab showToast={showToast} />}
        {activeTab === 'view-agent-grid' && <ViewAgentGridTab showToast={showToast} />}
      </div>
    </div>
  );
};

export default NewGridStylePage;
