import React from 'react';
import { SharedPortalProps } from '../types';
import { SOUTHERN_INSPECTION_SCHEDULES, INSTITUTION_PROFILES } from '../mockData';
import {
  KpiCardsRow,
  ComplaintsCardList,
  ExecutiveComplaintsPreview,
  SharedNonDashboardTabs,
} from '../components/SharedWorkspace';

export const RegionalOfficerPortal: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const { activeNav, setSelectedInstitution } = props;

  return (
    <>
      {activeNav === 'dashboard' && (
        <div className="space-y-8">
          <KpiCardsRow props={props} />

          {/* REGIONAL OFFICER (SRO CHENNAI) DEDICATED CONSOLE */}
          <div className="bg-cyan-50/70 border border-cyan-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <i className="fa-solid fa-map-location-dot text-lg"></i>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      Southern Regional Office (SRO Chennai) — Localized Inspection &amp; PID Roster
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-cyan-100 text-cyan-900 border border-cyan-300">
                      Jurisdiction: Tamil Nadu / Puducherry
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Displaying regional institution PIDs and scheduled physical Expert Visit
                    Committee (EVC) inspections under SRO Chennai jurisdiction.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {SOUTHERN_INSPECTION_SCHEDULES.map((sched) => (
                <div
                  key={sched.scheduleId}
                  className="bg-white border border-cyan-200 rounded-xl p-4 flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-cyan-800">{sched.pid}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        {sched.date}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-slate-900">{sched.institution}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {sched.city} • {sched.panelLead}
                    </div>
                    <p className="text-[11px] text-slate-600 mt-2">{sched.scope}</p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-700 font-bold">{sched.status}</span>
                    <button
                      onClick={() => {
                        const prof = INSTITUTION_PROFILES[sched.pid];
                        if (prof) setSelectedInstitution(prof);
                      }}
                      className="text-cyan-800 hover:text-cyan-600 font-bold cursor-pointer"
                    >
                      Open PID Dossier →
                    </button>
                  </div>
                </div>
              ))}
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
