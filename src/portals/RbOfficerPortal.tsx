import React from 'react';
import { SharedPortalProps } from '../types';
import { RB_WORKLOAD_STATS } from '../mockData';
import {
  KpiCardsRow,
  ComplaintsCardList,
  ExecutiveComplaintsPreview,
  SharedNonDashboardTabs,
} from '../components/SharedWorkspace';

export const RbOfficerPortal: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const {
    activeNav,
    setActiveNav,
    complaints,
    setComplaints,
    setStatusFilter,
    setTableTab,
    openCaseDetails,
    triggerToast,
    handleExportCSV,
    setRequestEvidenceModalOpen,
  } = props;

  const incomingHandovers = complaints.filter(
    (c) =>
      c.bureau === 'RB' &&
      !c.ownerWatchdog.acceptedByOwner &&
      c.status !== 'Disposed'
  );

  return (
    <>
      {activeNav === 'dashboard' && (
        <>
          <KpiCardsRow props={props} />

          {/* INCOMING BUREAU HANDOVERS AWAITING RB ACCEPTANCE */}
          {incomingHandovers.length > 0 && (
            <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-6 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <i className="fa-solid fa-inbox text-lg"></i>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                        Incoming Bureau Handover Queue (Action Required by Dr. S. Menon)
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[11px] font-bold animate-pulse">
                        {incomingHandovers.length} Awaiting RB Acceptance
                      </span>
                    </div>
                    <p className="text-xs text-amber-900/80 mt-1">
                      These cases were routed to Regulation Bureau (RB) by PGRC or AI Triage. Under
                      the No-Orphan-Case rule, the transferring bureau remains accountable until you
                      formally accept ownership or return with reasons.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {incomingHandovers.map((inc) => (
                  <div
                    key={inc.id}
                    className="bg-white border border-amber-200 rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-2xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-blue-700">{inc.id}</span>
                        <span className="text-xs font-bold text-slate-900">{inc.category}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-mono text-slate-700">
                          {inc.institutionName} ({inc.pid})
                        </span>
                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 text-[11px] font-bold">
                          Idle {inc.ownerWatchdog.unacceptedHours}h without RB Acceptance
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{inc.ownerWatchdog.watchdogReason}</p>
                      <div className="text-[11px] text-amber-700 font-medium">
                        <i className="fa-solid fa-scale-balanced mr-1.5"></i>
                        Candidate Clause:{' '}
                        <span className="font-semibold">
                          {inc.regulatoryEvidenceCard.candidateProvision}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setComplaints((prev) =>
                            prev.map((item) =>
                              item.id === inc.id
                                ? {
                                    ...item,
                                    status: 'Under Process',
                                    leadCoordinator: 'Dr. S. Menon (Regulation Bureau)',
                                    ownerWatchdog: {
                                      ...item.ownerWatchdog,
                                      isUnclaimedOrDelayed: false,
                                      acceptedByOwner: true,
                                      unacceptedHours: 0,
                                    },
                                    auditHistory: [
                                      {
                                        timestamp: 'Just now',
                                        actor: 'Dr. S. Menon (RB Officer)',
                                        bureau: 'RB',
                                        eventType: 'Incoming Handover Accepted',
                                        note: 'Formally accepted incoming bureau handover into RB Regulatory Docket. SLA accountability active.',
                                        isCoordinationEvent: true,
                                      },
                                      ...item.auditHistory,
                                    ],
                                  }
                                : item
                            )
                          );
                          triggerToast(
                            `Handover Accepted: ${inc.id} is now formally under Dr. S. Menon (Regulation Bureau) investigation.`
                          );
                        }}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <i className="fa-solid fa-check-double"></i> Accept into RB Docket
                      </button>
                      <button
                        onClick={() => {
                          setComplaints((prev) =>
                            prev.map((item) =>
                              item.id === inc.id
                                ? {
                                    ...item,
                                    bureau: 'PGRC',
                                    leadCoordinator: 'Returned to PGRC Desk (Jurisdiction Note)',
                                    ownerWatchdog: {
                                      ...item.ownerWatchdog,
                                      isUnclaimedOrDelayed: false,
                                      acceptedByOwner: true,
                                      unacceptedHours: 0,
                                    },
                                    auditHistory: [
                                      {
                                        timestamp: 'Just now',
                                        actor: 'Dr. S. Menon (RB Officer)',
                                        bureau: 'RB',
                                        eventType: 'Handover Returned to PGRC',
                                        note: 'Returned handover to PGRC — individual student fee relief required before RB statutory action.',
                                        isCoordinationEvent: true,
                                      },
                                      ...item.auditHistory,
                                    ],
                                  }
                                : item
                            )
                          );
                          triggerToast(
                            `Handover Returned: ${inc.id} routed back to PGRC with statutory jurisdiction note.`
                          );
                        }}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 text-xs font-bold transition cursor-pointer"
                      >
                        Return to PGRC
                      </button>
                      <button
                        onClick={() => openCaseDetails(inc, 'overview')}
                        className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold transition cursor-pointer"
                      >
                        Inspect File
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* QUICK RB LIFECYCLE PIPELINE MINI-STRIP */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                RB Statutory Lifecycle Pipeline:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {[
                {
                  label: '1. Handover Intake',
                  count: incomingHandovers.length,
                  filterVal: 'Pending',
                  color: 'text-amber-800 bg-amber-50 border-amber-200',
                },
                {
                  label: '2. Under Process & Show-Cause',
                  count: complaints.filter(
                    (c) => c.bureau === 'RB' && c.status === 'Under Process'
                  ).length,
                  filterVal: 'Under Process',
                  color: 'text-amber-800 bg-amber-50 border-amber-200',
                },
                {
                  label: '3. Disputed Remedy Audit',
                  count: complaints.filter(
                    (c) =>
                      c.bureau === 'RB' &&
                      c.remedyState === 'Received Partially - Outcome Disputed'
                  ).length,
                  filterVal: 'ALL',
                  color: 'text-red-800 bg-red-50 border-red-200',
                },
                {
                  label: '4. Verified Compliant',
                  count: complaints.filter((c) => c.bureau === 'RB' && c.status === 'Disposed')
                    .length,
                  filterVal: 'Disposed',
                  color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
                },
              ].map((step, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setStatusFilter(step.filterVal);
                    setTableTab('all');
                    triggerToast(`Filtered RB Table by lifecycle stage: ${step.label}`);
                  }}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition hover:scale-105 cursor-pointer flex items-center gap-1.5 ${step.color}`}
                >
                  <span>{step.label}</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/80 font-mono text-[11px]">
                    {step.count}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setActiveNav('analytics')}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition cursor-pointer"
              >
                Full RB Funnel <i className="fa-solid fa-arrow-right ml-1"></i>
              </button>
            </div>
          </div>

          {/* RB OFFICER DEDICATED CONSOLE */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <i className="fa-solid fa-gavel text-lg"></i>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900">
                    Regulation Bureau (RB) — Statutory Enforcement &amp; Norm Compliance Console
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase bg-amber-100 text-amber-800 border border-amber-200">
                    AICTE APH 2026 Chapter VII
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Filtered exclusively to institutional norm violations, faculty cadre deficiencies,
                  and lab deficit dockets. Individual student fee petitions are suppressed so RB
                  officers can focus on Show-Cause Notices and EVC triggers.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => {
                  const target = complaints.find((c) => c.id === 'CMP-1002') || complaints[0];
                  if (target) openCaseDetails(target, 'regulatory');
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <i className="fa-solid fa-file-signature"></i> Draft Show-Cause Notice (SCN)
              </button>
              <button
                onClick={() => {
                  setRequestEvidenceModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <i className="fa-solid fa-building-shield"></i> Request Statutory Proof / EVC
              </button>
            </div>
          </div>

          <ExecutiveComplaintsPreview props={props} />
        </>
      )}

      {activeNav === 'complaints' && (
        <ComplaintsCardList props={props} />
      )}

      {/* RB WORKLOAD & LIFECYCLE FUNNEL ABOVE ANALYTICS TAB */}
      {activeNav === 'analytics' && (
        <div className="bg-white border border-amber-200 rounded-2xl p-8 shadow-2xs mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider">
                  <i className="fa-solid fa-scale-balanced mr-1.5"></i> Regulation Bureau (RB)
                  Operational Intelligence
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  FY 2025-26 Total RB Dockets Processed: 131 Cases
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-2">
                Regulation Bureau Case Lifecycle Funnel &amp; Statutory Enforcement Analytics
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Real-time breakdown of how complaints registered or transferred to Regulation Bureau
                progress from intake to Show-Cause Notice (SCN), EVC inspection, and verified
                institutional compliance.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportCSV}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-file-csv"></i> Export RB Workload CSV
              </button>
            </div>
          </div>

          {/* 6-STAGE RB LIFECYCLE FUNNEL CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 uppercase">
                <span>1. Solved &amp; Disposed</span>
                <i className="fa-solid fa-circle-check text-emerald-600"></i>
              </div>
              <div className="text-2xl font-extrabold text-emerald-900 mt-2 font-mono">
                {RB_WORKLOAD_STATS.solvedDisposed}
              </div>
              <div className="text-[11px] text-emerald-700 mt-1.5 font-medium">
                67.9% Verified Compliant
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 uppercase">
                <span>2. Show-Cause Active</span>
                <i className="fa-solid fa-file-signature text-amber-600"></i>
              </div>
              <div className="text-2xl font-extrabold text-amber-900 mt-2 font-mono">
                {RB_WORKLOAD_STATS.underProcessShowCause}
              </div>
              <div className="text-[11px] text-amber-700 mt-1.5 font-medium">
                15-Day Principal Reply Window
              </div>
            </div>

            <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-purple-800 uppercase">
                <span>3. EVC Inspected</span>
                <i className="fa-solid fa-building-shield text-purple-600"></i>
              </div>
              <div className="text-2xl font-extrabold text-purple-900 mt-2 font-mono">
                {RB_WORKLOAD_STATS.inspectedEvc}
              </div>
              <div className="text-[11px] text-purple-700 mt-1.5 font-medium">
                Joint RB-SRO Verification
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 uppercase">
                <span>4. Pending Intake</span>
                <i className="fa-solid fa-hourglass-half text-amber-600"></i>
              </div>
              <div className="text-2xl font-extrabold text-amber-900 mt-2 font-mono">
                {RB_WORKLOAD_STATS.pendingIntake}
              </div>
              <div className="text-[11px] text-amber-700 mt-1.5 font-medium">
                Awaiting Handover Sign-Off
              </div>
            </div>

            <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-blue-800 uppercase">
                <span>5. Transferred Out</span>
                <i className="fa-solid fa-right-left text-blue-600"></i>
              </div>
              <div className="text-2xl font-extrabold text-blue-900 mt-2 font-mono">
                {RB_WORKLOAD_STATS.transferredProperly}
              </div>
              <div className="text-[11px] text-blue-700 mt-1.5 font-medium">
                Zero-Orphan Handshake
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase">
                <span>6. Non-Violation</span>
                <i className="fa-solid fa-ban text-slate-500"></i>
              </div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2 font-mono">
                {RB_WORKLOAD_STATS.dismissedNonViolation}
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5 font-medium">
                Closed with Audit Note
              </div>
            </div>
          </div>

          {/* APH CHAPTER VII BREAKDOWN & INTERNAL RB OFFICER CELL TABLE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-book-bookmark"></i> RB Cases by AICTE Approval Process
                Handbook (APH) Violation Clause
              </h4>
              <div className="space-y-3">
                {RB_WORKLOAD_STATS.categoryBreakdown.map((v, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-slate-900">{v.label}</span>
                      <span className="font-mono text-amber-700 font-bold">
                        {v.count} Cases ({v.pct}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                      <div
                        className={`${v.color} h-full rounded-full`}
                        style={{ width: `${v.pct}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Statutory Priority Tag:</span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                        {v.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-4 flex items-center gap-2">
                <i className="fa-solid fa-users-gear"></i> Regulation Bureau Internal Officer &amp;
                Cell Workload Distribution
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] font-bold uppercase text-slate-500">
                      <th className="py-2.5 pr-2">RB Officer / Cell</th>
                      <th className="py-2.5 px-2 text-center">Active</th>
                      <th className="py-2.5 px-2 text-center">Disposed</th>
                      <th className="py-2.5 px-2 text-center">Avg Velocity</th>
                      <th className="py-2.5 pl-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/70 text-xs">
                    {RB_WORKLOAD_STATS.internalCells.map((cell, idx) => (
                      <tr key={idx} className="hover:bg-white">
                        <td className="py-3 pr-2">
                          <div className="font-bold text-slate-900">{cell.officer}</div>
                          <div className="text-[11px] text-slate-500">{cell.unit}</div>
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-amber-700 font-bold">
                          {cell.activeDockets}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-emerald-700 font-bold">
                          {cell.disposedMonth}
                        </td>
                        <td className="py-3 px-2 text-center font-mono text-slate-700">
                          {cell.avgVelocity}
                        </td>
                        <td className="py-3 pl-2 text-right">
                          <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-mono text-[10px] font-bold">
                            {cell.loadStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <SharedNonDashboardTabs props={props} />
    </>
  );
};
