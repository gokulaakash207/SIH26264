import React from 'react';
import { SharedPortalProps } from '../types';
import {
  KpiCardsRow,
  ComplaintsCardList,
  ExecutiveComplaintsPreview,
  SharedNonDashboardTabs,
} from '../components/SharedWorkspace';

export const AicteHqPortal: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const { activeNav } = props;

  return (
    <>
      {activeNav === 'dashboard' && (
        <div className="space-y-8">
          <KpiCardsRow props={props} />
          <ExecutiveComplaintsPreview props={props} />
        </div>
      )}
      {activeNav === 'complaints' && (
        <ComplaintsCardList props={props} />
      )}
      <SharedNonDashboardTabs props={props} />
    </>
  );
};
