import React from 'react';
import { SharedPortalProps } from '../types';
import { INSTITUTION_PROFILES } from '../mockData';
import {
  KpiCardsRow,
  ComplaintsCardList,
  ExecutiveComplaintsPreview,
  SharedNonDashboardTabs,
} from '../components/SharedWorkspace';

export const ShcCommitteePortal: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const {
    activeNav,
    setActiveNav,
    complaints,
    committeeLogs,
    setActiveTranscriptLog,
    setSelectedInstitution,
    handleForceAssignOwner,
  } = props;

  const unacceptedCases = complaints.filter(
    (c) => !c.ownerWatchdog.acceptedByOwner && c.status !== 'Disposed'
  );

  return (
    <>
      {activeNav === 'dashboard' && (
        <div className="space-y-8">
          <KpiCardsRow props={props} />

          {/* SHC COMMITTEE DEDICATED CONSOLE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Committee Transcript Summarizer Quick Card */}
            <div className="lg:col-span-7 bg-white border border-purple-200 rounded-2xl p-6 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                    <i className="fa-solid fa-microphone-lines text-sm"></i>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800">
                      Committee Logs &amp; AI Transcript Summarizer
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Standing Hearing Committee (SHC) Appellate Proceedings
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveNav('committee')}
                  className="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 text-xs font-bold transition cursor-pointer"
                >
                  Open All Transcripts
                </button>
              </div>
              <div className="space-y-3">
                {committeeLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {log.id}: {log.meetingTitle} ({log.institutionName})
                      </span>
                      {log.policyReviewFlagged && (
                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold">
                          Policy Review Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 mb-2">
                      <strong className="text-purple-800">AI Key Talking Point:</strong>{' '}
                      {log.keyPoint1}
                    </p>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 font-bold">
                        Resolution: {log.resolution}
                      </span>
                      <button
                        onClick={() => setActiveTranscriptLog(log)}
                        className="text-purple-700 hover:text-purple-900 font-bold cursor-pointer shrink-0 ml-2"
                      >
                        Read Verbatim Transcript →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Ownerless Case Watchdog Alerts & Policy Review Repeat Offenders */}
            <div className="lg:col-span-5 bg-white border border-red-200 rounded-2xl p-6 flex flex-col justify-between shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-dog text-red-600"></i>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-red-700">
                      Ownerless Case Watchdog &amp; Policy Flags
                    </h4>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-[11px] font-bold">
                    {unacceptedCases.length} Unaccepted
                  </span>
                </div>
                <div className="space-y-2.5 mb-4">
                  {unacceptedCases.slice(0, 2).map((orphan) => (
                    <div
                      key={orphan.id}
                      className="bg-red-50/70 border border-red-200 rounded-xl p-3.5 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {orphan.id} • {orphan.institutionName}
                        </div>
                        <div className="text-[11px] text-red-700 font-medium mt-0.5">
                          Unaccepted for {orphan.ownerWatchdog.unacceptedHours}h ({orphan.bureau})
                        </div>
                      </div>
                      <button
                        onClick={() => handleForceAssignOwner(orphan)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shrink-0 cursor-pointer"
                      >
                        Force Assign
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-amber-800 mb-2">
                  <i className="fa-solid fa-flag mr-1.5"></i> Repeat-Offender Colleges Flagged for
                  Policy Review:
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.values(INSTITUTION_PROFILES)
                    .filter((p) => p.policyReviewRequired)
                    .map((prof) => (
                      <button
                        key={prof.pid}
                        onClick={() => setSelectedInstitution(prof)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-[11px] font-bold cursor-pointer transition"
                      >
                        {prof.name} ({prof.pid}) • Policy Review Required
                      </button>
                    ))}
                </div>
              </div>
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
