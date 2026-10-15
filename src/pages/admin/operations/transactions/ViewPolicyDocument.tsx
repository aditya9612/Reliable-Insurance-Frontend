import React from 'react';
import PageHeader from '../../../../components/page-header/PageHeader';
import ViewPolicyTab from '../../reports_analysis/ViewPolicyTab';

const ViewPolicyDocument: React.FC = () => {
  return (
    <div className="w-full flex flex-col space-y-5">
      <PageHeader
        title="View Policy Document"
        description="Search customer policy transactions, vehicle particulars, cheque numbers & download policy schedules."
      />
      <ViewPolicyTab />
    </div>
  );
};

export default ViewPolicyDocument;
