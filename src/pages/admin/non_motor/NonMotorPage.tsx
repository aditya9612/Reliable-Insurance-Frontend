import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/page-header/PageHeader';
import UnderlineTabs, { TabItem } from '../../../components/tabs/UnderlineTabs';
import { NonMotorSubTab } from './types';
import { NonMotorCommissionTab } from './tabs/NonMotorCommissionTab';
import { InsuranceTypeTab } from './tabs/InsuranceTypeTab';
import { InsuranceSubTypeTab } from './tabs/InsuranceSubTypeTab';
import { InsuranceTypeOfSubTypeTab } from './tabs/InsuranceTypeOfSubTypeTab';
import { NonMotorRecalculationTab } from './tabs/NonMotorRecalculationTab';
import { CheckCircle2 } from 'lucide-react';

const tabs: TabItem[] = [
  { id: 'commission', label: 'Non Motor Commission' },
  { id: 'insurance-type', label: 'Insurance Type' },
  { id: 'insurance-sub-type', label: 'Insurance Sub Type' },
  { id: 'insurance-type-of-sub-type', label: 'Insurance Type of Sub Type' },
  { id: 'recalculation', label: 'Non Motor Recalculation' },
];

export const NonMotorPage: React.FC = () => {
  const { tab } = useParams<{ tab?: string }>();
  const navigate = useNavigate();

  const getNormalizedTab = (rawTab?: string): NonMotorSubTab => {
    if (rawTab === 'insurance-type') return 'insurance-type';
    if (rawTab === 'insurance-sub-type') return 'insurance-sub-type';
    if (rawTab === 'insurance-type-of-sub-type') return 'insurance-type-of-sub-type';
    if (rawTab === 'recalculation' || rawTab === 'commission-recalculation' || rawTab === 'commission-report') {
      return 'recalculation';
    }
    return 'commission';
  };

  const activeTab = getNormalizedTab(tab);

  const handleTabChange = (newTabId: string) => {
    navigate(`/non-motor/${newTabId}`);
  };

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-[#102A4C] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs border border-blue-400/30 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 size={16} className="text-blue-400 shrink-0" />
          <span className="font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Page Header with Blue Theme */}
      <PageHeader
        title="Non Motor Management"
        description="Configure non-motor commission grids, insurance types, sub types, granular risk classifications, and commission recalculations"
      />

      {/* Navigation Submenu Tabs in sequence */}
      <UnderlineTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      {/* Tab Panels */}
      <div className="pt-1">
        {activeTab === 'commission' && (
          <NonMotorCommissionTab showToast={showToast} />
        )}

        {activeTab === 'insurance-type' && (
          <InsuranceTypeTab showToast={showToast} />
        )}

        {activeTab === 'insurance-sub-type' && (
          <InsuranceSubTypeTab showToast={showToast} />
        )}

        {activeTab === 'insurance-type-of-sub-type' && (
          <InsuranceTypeOfSubTypeTab showToast={showToast} />
        )}

        {activeTab === 'recalculation' && (
          <NonMotorRecalculationTab showToast={showToast} />
        )}
      </div>
    </div>
  );
};

export default NonMotorPage;
