import React from 'react';
import { SharedPortalProps } from '../types';
import {
  KpiCardsRow,
  ComplaintsCardList,
  ExecutiveComplaintsPreview,
  SharedNonDashboardTabs,
} from '../components/SharedWorkspace';

export const PgrcOfficerPortal: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const { activeNav, complaints, setTableTab, openCaseDetails } = props;

  return (
    <>
      {activeNav === 'dashboard' && (
        <div className="space-y-8">
          <KpiCardsRow props={props} />

          {/* PGRC OFFICER DEDICATED CONSOLE */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <i className="fa-solid fa-user-check text-lg"></i>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Public Grievance Redressal Cell (PGRC) — Student Remedy &amp; SLA Protection
                    Desk
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-red-600 text-white animate-pulse">
                    Predictive SLA Breach Watch (&lt;48h)
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Prioritizing student certificate retention, tuition fee refund petitions, and
                  faculty salary grievances. Cases with &lt;48h to external admission/counselling
                  harm or disputed remedies are highlighted first.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  setTableTab('deadline_rescue');
                }}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <i className="fa-solid fa-bolt"></i> Filter &lt;48h SLA Breach Watch
              </button>
              <button
                onClick={() => {
                  const target = complaints.find((c) => c.id === 'CMP-2003') || complaints[0];
                  if (target) openCaseDetails(target, 'remedy');
                }}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <i className="fa-solid fa-receipt"></i> Inspect Disputed Fee Refund (CMP-2003)
              </button>
            </div>
          </div>

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
