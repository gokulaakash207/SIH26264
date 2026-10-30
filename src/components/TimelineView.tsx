import React, { useState } from 'react';
import { ComplaintDocket } from '../types';

interface TimelineViewProps {
  complaint: ComplaintDocket;
  variant?: 'full' | 'compact' | 'mini';
  onNavigateToAudit?: () => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  complaint,
  variant = 'full',
  onNavigateToAudit,
}) => {
  const [activeStage, setActiveStage] = useState<number>(
    complaint.status === 'Disposed'
      ? 5
      : complaint.status === 'Under Process'
      ? 3
      : 2
  );

  const elapsedPercent = Math.min(
    100,
    Math.round((complaint.policyClock.elapsedDays / complaint.policyClock.prescribedDays) * 100)
  );

  const isUrgentHarm = Boolean(complaint.deadlineRescue?.hasUrgentHarm);
  const isOverdue = complaint.policyClock.elapsedDays >= complaint.policyClock.prescribedDays;
  const isDisputed = complaint.remedyState === 'Received Partially - Outcome Disputed';

  // 5-Stage Lifecycle Definition
  const stages = [
    {
      stage: 1,
      title: 'Intake & AI Triage',
      shortTitle: 'AI Triage',
      subtitle: 'NLP classification, PII masking & sufficiency scan',
      timestamp: 'Day 0 • 21 Oct 2026 10:15 IST',
      bureau: 'Central Intake Gateway',
      officer: 'AI Triage Engine v2.4',
      status: 'completed' as const,
      icon: 'fa-robot',
      details: [
        `AI Classification: ${complaint.aiClassification}`,
        `Confidentiality Shield: ${complaint.complainantRef} (PII auto-masked)`,
        complaint.infoSufficiency.isSufficient
          ? `Intake Sufficiency: Verified complete (${complaint.infoSufficiency.studentEmailCollected || 'Direct Portal'})`
          : `Sufficiency Warning: Missing data (${complaint.infoSufficiency.missingInfoPrompt})`,
      ],
      evidence: complaint.supportingDocs.map((d) => `${d.name} (${d.size})`),
    },
    {
      stage: 2,
      title: 'Bureau Allocation & Handover',
      shortTitle: 'Bureau Handover',
      subtitle: 'No-Orphan watchdog routing & ownership confirmation',
      timestamp: 'Day 1 • 21 Oct 2026 11:30 IST',
      bureau: complaint.ownerWatchdog.recommendedOwnerBureau,
      officer: complaint.ownerWatchdog.recommendedOfficer,
      status: complaint.ownerWatchdog.acceptedByOwner ? ('completed' as const) : ('critical' as const),
      icon: 'fa-handshake-angle',
      details: [
        `Target Bureau: ${complaint.ownerWatchdog.recommendedOwnerBureau}`,
        `Designated Officer: ${complaint.ownerWatchdog.recommendedOfficer}`,
        complaint.ownerWatchdog.acceptedByOwner
          ? `Ownership Status: Formally accepted within 1h by assigned officer`
          : `Watchdog Alert: Unaccepted for ${complaint.ownerWatchdog.unacceptedHours}h across bureaus`,
        `Originating Routing Note: ${complaint.ownerWatchdog.watchdogReason}`,
      ],
      evidence: ['Official Routing Envelope & Timestamp Token #RT-2026-901'],
    },
    {
      stage: 3,
      title: 'Investigation & Overlap Radar',
      shortTitle: 'Overlap Check',
      subtitle: 'Permanent ID cross-referencing & single directive sync',
      timestamp: 'Day 3 • 22 Oct 2026 14:00 IST',
      bureau: 'Joint Coordination Desk (RB + PGRC)',
      officer: complaint.leadCoordinator || 'Senior Coordination Officer',
      status:
        complaint.status === 'Disposed'
          ? ('completed' as const)
          : complaint.status === 'Under Process'
          ? ('in_progress' as const)
          : ('pending' as const),
      icon: 'fa-code-compare',
      details: [
        `Institution Cross-Reference: ${complaint.institutionName} (${complaint.pid})`,
        `Relationship Classifier: ${complaint.relationshipType}`,
        complaint.conflictRadar?.hasConflict
          ? `Conflict Radar Warning: ${complaint.conflictRadar.conflictType} flagged between bureaus`
          : `Radar Status: Directives synchronized, no conflicting actions detected`,
        complaint.conflictRadar?.suggestedCoordinationStep
          ? `Coordinated Resolution Step: ${complaint.conflictRadar.suggestedCoordinationStep}`
          : `Unified Dossier Passport active across bureaus`,
      ],
      evidence: ['Unified Evidence Passport EVD-2026-401', 'Permanent ID History Snapshot'],
    },
    {
      stage: 4,
      title: 'Statutory Directives & Hearings',
      shortTitle: 'Directives / Hearing',
      subtitle: 'Show-cause notices, EVC inspections & interim relief',
      timestamp: `Day 8 • 24 Oct 2026 16:30 IST`,
      bureau: complaint.bureau,
      officer: complaint.leadCoordinator || complaint.ownerWatchdog.recommendedOfficer,
      status:
        complaint.status === 'Disposed'
          ? ('completed' as const)
          : complaint.status === 'Under Process'
          ? ('in_progress' as const)
          : ('pending' as const),
      icon: 'fa-gavel',
      details: [
        `Regulatory Clause Invoked: ${complaint.regulatoryEvidenceCard.candidateProvision}`,
        `Statutory Basis: ${complaint.policyClock.policyName}`,
        isUrgentHarm
          ? `Emergency Interim Action: ${complaint.deadlineRescue?.interimAction}`
          : `Inspection / Compliance Notice issued with unified compliance date`,
        `Verification Status: ${complaint.regulatoryEvidenceCard.officerVerificationState}`,
      ],
      evidence: [
        complaint.regulatoryEvidenceCard.sourceDocumentTitle,
        'Statutory Notice Dispatch Certificate #DIR-2026-44',
      ],
    },
    {
      stage: 5,
      title: 'Remedy Delivery & Final Disposal',
      shortTitle: 'Remedy & Disposal',
      subtitle: 'Complainant resolution receipt & statutory closure',
      timestamp: `Due: ${complaint.policyClock.dueDate}`,
      bureau: complaint.bureau,
      officer: 'Nodal Verification Officer',
      status:
        complaint.status === 'Disposed'
          ? ('completed' as const)
          : isDisputed
          ? ('critical' as const)
          : complaint.status === 'Under Process'
          ? ('in_progress' as const)
          : ('pending' as const),
      icon: 'fa-circle-check',
      details: [
        `Promised Remedy: ${complaint.remedyDetails.promisedRemedy}`,
        `Institution Proof: ${complaint.remedyDetails.institutionProof}`,
        `Student Confirmation: ${complaint.remedyDetails.studentResponse}`,
        complaint.remedyDetails.disputeNote
          ? `Dispute Flag: ${complaint.remedyDetails.disputeNote}`
          : `Final Status: ${complaint.status} (${complaint.remedyState})`,
      ],
      evidence: ['Resolution Receipt #REC-8902', 'Signed Handover Affidavit'],
    },
  ];

  // MINI VARIANT (for table rows)
  if (variant === 'mini') {
    return (
      <div className="space-y-1.5 min-w-[200px]">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700">
            Lifecycle: Stage {complaint.status === 'Disposed' ? 5 : complaint.status === 'Under Process' ? 3 : 2}/5
          </span>
          <span
            className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
              isUrgentHarm || isOverdue
                ? 'bg-red-100 text-red-800 animate-pulse'
                : elapsedPercent > 80
                ? 'bg-amber-100 text-amber-800'
                : 'bg-emerald-100 text-emerald-800'
            }`}
          >
            Day {complaint.policyClock.elapsedDays}/{complaint.policyClock.prescribedDays}d ({elapsedPercent}%)
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 flex">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isUrgentHarm || isOverdue
                ? 'bg-gradient-to-r from-amber-500 to-red-600'
                : elapsedPercent > 80
                ? 'bg-gradient-to-r from-blue-500 to-amber-500'
                : 'bg-gradient-to-r from-blue-500 to-emerald-500'
            }`}
            style={{ width: `${Math.max(15, elapsedPercent)}%` }}
          ></div>
        </div>
        {/* 5 mini step dots */}
        <div className="flex items-center justify-between px-0.5">
          {stages.map((st) => (
            <span
              key={st.stage}
              title={`${st.stage}. ${st.title} (${st.status})`}
              className={`w-2 h-2 rounded-full transition-all ${
                st.status === 'completed'
                  ? 'bg-emerald-600'
                  : st.status === 'in_progress'
                  ? 'bg-blue-600 ring-2 ring-blue-200 ring-offset-1 animate-pulse'
                  : st.status === 'critical'
                  ? 'bg-red-600 ring-2 ring-red-200 animate-pulse'
                  : 'bg-slate-300'
              }`}
            ></span>
          ))}
        </div>
      </div>
    );
  }

  // COMPACT VARIANT (for overview card)
  if (variant === 'compact') {
    return (
      <div className="bg-white border border-amber-200/90 rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-xs border border-amber-300">
              <i className="fa-solid fa-timeline text-amber-700"></i>
            </span>
            <div>
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                Docket Lifecycle &amp; Statutory SLA Clock
              </h4>
              <p className="text-[11px] text-stone-500 font-mono">
                {complaint.policyClock.policyName}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${
              isUrgentHarm || isOverdue
                ? 'bg-red-50 text-red-700 border-red-300 animate-pulse'
                : elapsedPercent > 80
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-emerald-50 text-emerald-700 border-emerald-300'
            }`}
          >
            {isUrgentHarm
              ? 'CRITICAL: <24h External Breach'
              : `Day ${complaint.policyClock.elapsedDays} of ${complaint.policyClock.prescribedDays} ${complaint.policyClock.basis}`}
          </span>
        </div>

        {/* Visual Stepper */}
        <div className="grid grid-cols-5 gap-2 relative">
          {stages.map((st, idx) => (
            <div
              key={st.stage}
              onClick={() => setActiveStage(st.stage)}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all ${
                activeStage === st.stage
                  ? 'border-amber-500 bg-amber-50/60 shadow-xs ring-2 ring-amber-500/20'
                  : st.status === 'completed'
                  ? 'border-emerald-200 bg-emerald-50/30 hover:border-emerald-300'
                  : st.status === 'critical'
                  ? 'border-red-200 bg-red-50/30 hover:border-red-300'
                  : st.status === 'in_progress'
                  ? 'border-amber-300 bg-amber-50/40 hover:border-amber-400'
                  : 'border-stone-200 bg-stone-50/40 opacity-70'
              }`}
            >
              <div
                className={`w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold mb-1.5 ${
                  st.status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : st.status === 'critical'
                    ? 'bg-red-600 text-white animate-pulse'
                    : st.status === 'in_progress'
                    ? 'bg-gradient-to-tr from-amber-500 to-amber-600 text-white animate-pulse'
                    : 'bg-stone-200 text-stone-600'
                }`}
              >
                {st.status === 'completed' ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  st.stage
                )}
              </div>
              <div className="text-[11px] font-bold text-stone-800 leading-tight truncate">
                {st.shortTitle}
              </div>
              <div className="text-[9px] text-stone-500 uppercase mt-0.5 truncate">
                {st.status === 'completed' ? 'Done' : st.status === 'in_progress' ? 'Active' : st.status === 'critical' ? 'Alert' : 'Pending'}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // FULL INTERACTIVE TIMELINE VARIANT
  const selectedStageData = stages[activeStage - 1] || stages[0];

  return (
    <div className="space-y-6">
      {/* SLA Policy Clock Dashboard Gauge */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-50 rounded-3xl p-7 border border-amber-400/50 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-mono font-bold">
                <i className="fa-solid fa-clock-rotate-left mr-1.5"></i>
                Statutory SLA Clock
              </span>
              <span className="text-xs text-amber-200/70 font-mono">
                Prescribed under: {complaint.policyClock.policyVersion || 'AICTE Regulations'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              {complaint.policyClock.policyName}
            </h3>
            <p className="text-xs text-amber-100/80 max-w-2xl leading-relaxed">
              {complaint.policyClock.riskEstimateSummary}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 min-w-[280px] shrink-0 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-200/80">Statutory Window:</span>
              <strong className="text-white">
                {complaint.policyClock.prescribedDays} {complaint.policyClock.basis}
              </strong>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-amber-200/80">Elapsed Time:</span>
              <strong
                className={`font-bold ${
                  isUrgentHarm || isOverdue ? 'text-red-400 animate-pulse' : 'text-emerald-400'
                }`}
              >
                Day {complaint.policyClock.elapsedDays} ({elapsedPercent}% used)
              </strong>
            </div>
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">Hard Due Date:</span>
              <span className="text-amber-300 font-bold">{complaint.policyClock.dueDate}</span>
            </div>

            {/* Gauge Bar */}
            <div className="h-2.5 w-full bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isUrgentHarm || isOverdue
                    ? 'bg-red-500 shadow-lg shadow-red-500/50'
                    : elapsedPercent > 80
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
                style={{ width: `${Math.max(12, elapsedPercent)}%` }}
              ></div>
            </div>

            {isUrgentHarm && (
              <div className="pt-2 border-t border-white/10 text-[11px] text-red-300 flex items-center gap-1.5 font-bold">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <span>Predictive SLA / External Harm Breach Active</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 5-Step Visual Stepper Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Interactive 5-Stage Complaint Lifecycle Tracker
            </h4>
            <p className="text-xs text-slate-500">
              Click any milestone to inspect verified officer actions, timestamps, and evidentiary records
            </p>
          </div>
          <span className="text-xs font-mono text-amber-900 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full font-bold">
            Current Stage: {complaint.status === 'Disposed' ? 'Stage 5 (Closed)' : complaint.status === 'Under Process' ? 'Stage 3 (Under Investigation)' : 'Stage 2 (Pending Handover)'}
          </span>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {stages.map((st) => {
            const isSelected = activeStage === st.stage;
            return (
              <div
                key={st.stage}
                onClick={() => setActiveStage(st.stage)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-amber-500 bg-amber-50/60 shadow-md ring-2 ring-amber-500/20'
                    : st.status === 'completed'
                    ? 'border-emerald-200 bg-emerald-50/30 hover:border-emerald-300'
                    : st.status === 'critical'
                    ? 'border-red-200 bg-red-50/40 hover:border-red-300 animate-pulse'
                    : st.status === 'in_progress'
                    ? 'border-amber-300 bg-amber-50/40 hover:border-amber-400'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                        st.status === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : st.status === 'critical'
                          ? 'bg-red-600 text-white'
                          : st.status === 'in_progress'
                          ? 'bg-gradient-to-tr from-amber-500 to-amber-600 text-white'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {st.status === 'completed' ? (
                        <i className="fa-solid fa-check"></i>
                      ) : (
                        st.stage
                      )}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        st.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : st.status === 'critical'
                          ? 'bg-red-100 text-red-800'
                          : st.status === 'in_progress'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {st.status === 'completed'
                        ? 'Completed'
                        : st.status === 'critical'
                        ? 'Alert'
                        : st.status === 'in_progress'
                        ? 'In Progress'
                        : 'Upcoming'}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-stone-900 leading-snug">
                    {st.title}
                  </h5>
                  <p className="text-[11px] text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                    {st.subtitle}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between text-[10px] font-mono text-stone-500">
                  <span className="truncate max-w-[100px]">{st.bureau.split(' ')[0]}</span>
                  <i
                    className={`fa-solid ${
                      isSelected ? 'fa-circle-chevron-down text-amber-600' : 'fa-chevron-right text-stone-400'
                    }`}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Deep-Dive Card */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-7 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center text-lg shadow-md shadow-amber-500/20 border border-amber-400/40">
              <i className={`fa-solid ${selectedStageData.icon}`}></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-mono font-bold border border-amber-200">
                  Stage {selectedStageData.stage} of 5
                </span>
                <span className="text-xs font-semibold text-stone-500">
                  {selectedStageData.timestamp}
                </span>
              </div>
              <h4 className="text-lg font-bold text-stone-900 mt-1">
                {selectedStageData.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onNavigateToAudit && (
              <button
                type="button"
                onClick={onNavigateToAudit}
                className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-xl border border-amber-200 transition cursor-pointer flex items-center gap-2"
              >
                <i className="fa-solid fa-list-check text-amber-600"></i>
                <span>Jump to Immutable Audit Log</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Officer and Actions taken */}
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50/30 border border-amber-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                Accountable Custodian &amp; Bureau
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-900">{selectedStageData.officer}</span>
                <span className="text-xs font-mono font-semibold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300">
                  {selectedStageData.bureau}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Stage Milestones &amp; Rule Verifications:
              </span>
              <ul className="space-y-2.5 text-xs text-stone-700">
                {selectedStageData.details.map((item, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-amber-50/20 border border-amber-200/60 flex items-start gap-2.5"
                  >
                    <i className="fa-solid fa-circle-check text-emerald-600 mt-0.5 text-xs shrink-0"></i>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Evidentiary Records & Certificates */}
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Attached Statutory Artifacts &amp; Evidence:
              </span>
              <div className="space-y-2.5">
                {selectedStageData.evidence.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-amber-200/80 flex items-center justify-between text-xs text-stone-800 hover:border-amber-400 transition shadow-2xs"
                  >
                    <div className="flex items-center gap-2.5 font-medium truncate">
                      <i className="fa-solid fa-file-shield text-amber-600"></i>
                      <span className="truncate">{ev}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold shrink-0">
                      VERIFIED
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Guidance Note */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-900">
                <i className="fa-solid fa-shield-halved text-amber-600"></i>
                <span>Procedural Safeguard:</span>
              </div>
              <p className="leading-relaxed text-amber-900/90 text-[11px]">
                Under AICTE Grievance Norms 2026, transitions between Stage 2 and Stage 4 are automatically synchronised with the Central Overlap Radar to prevent conflicting directives from being issued to the institution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

