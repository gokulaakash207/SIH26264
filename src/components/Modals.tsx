/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { INSTITUTION_PROFILES } from '../mockData';
import { TimelineView } from './TimelineView';
import { AuditTrailView } from './AuditTrailView';
import {
  CommitteeMeetingLog,
  ComplaintDocket,
  DetailTab,
  EvidencePassportItem,
  InstitutionIndicatorsProfile,
  NavSection,
  RBACRoleConfig,
} from '../types';

export interface ModalsProps {
  selectedCase: ComplaintDocket | null;
  setSelectedCase: React.Dispatch<React.SetStateAction<ComplaintDocket | null>>;
  detailTab: DetailTab;
  setDetailTab: React.Dispatch<React.SetStateAction<DetailTab>>;
  expandedAuditIndices: Record<number, boolean>;
  setExpandedAuditIndices: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  unmaskedIds: Record<string, string>;
  setUnmaskPromptCase: React.Dispatch<React.SetStateAction<ComplaintDocket | null>>;
  unmaskPromptCase: ComplaintDocket | null;
  unmaskReason: string;
  setUnmaskReason: React.Dispatch<React.SetStateAction<string>>;
  handleConfirmUnmaskIdentity: (e: React.FormEvent) => void;
  overrideReason: string;
  setOverrideReason: React.Dispatch<React.SetStateAction<string>>;
  handleApproveConflictCoordination: (targetCase: ComplaintDocket) => void;
  handleAssignFollowUpForDisputedRemedy: (record: ComplaintDocket) => void;
  handleToggleSpecialPolicyFlag: (targetCase: ComplaintDocket) => void;
  handleForceAssignOwner: (targetCase: ComplaintDocket) => void;
  newAuditBureau: string;
  setNewAuditBureau: React.Dispatch<React.SetStateAction<string>>;
  newAuditNote: string;
  setNewAuditNote: React.Dispatch<React.SetStateAction<string>>;
  handleAppendAuditComment: (e: React.FormEvent) => void;
  committeeLogs: CommitteeMeetingLog[];
  handleDownloadTranscriptTxt: (log: CommitteeMeetingLog) => void;
  followUpModalCase: ComplaintDocket | null;
  setFollowUpModalCase: React.Dispatch<React.SetStateAction<ComplaintDocket | null>>;
  followUpEmailInput: string;
  setFollowUpEmailInput: React.Dispatch<React.SetStateAction<string>>;
  followUpQuestionText: string;
  setFollowUpQuestionText: React.Dispatch<React.SetStateAction<string>>;
  handleSendFollowUpQuestion: (e: React.FormEvent) => void;
  transferModalCase: ComplaintDocket | null;
  setTransferModalCase: React.Dispatch<React.SetStateAction<ComplaintDocket | null>>;
  transferTargetBureau: string;
  setTransferTargetBureau: React.Dispatch<React.SetStateAction<string>>;
  transferTargetOfficer: string;
  setTransferTargetOfficer: React.Dispatch<React.SetStateAction<string>>;
  transferReasonText: string;
  setTransferReasonText: React.Dispatch<React.SetStateAction<string>>;
  transferChecklistConfirmed: boolean;
  setTransferChecklistConfirmed: React.Dispatch<React.SetStateAction<boolean>>;
  handleExecuteProperTransfer: (e: React.FormEvent) => void;
  massAllocationModalOpen: boolean;
  setMassAllocationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  massFocusRegion: string;
  setMassFocusRegion: React.Dispatch<React.SetStateAction<string>>;
  allocatedOfficers: number;
  setAllocatedOfficers: React.Dispatch<React.SetStateAction<number>>;
  allocatedResearchers: number;
  setAllocatedResearchers: React.Dispatch<React.SetStateAction<number>>;
  allocatedEvcTeams: number;
  setAllocatedEvcTeams: React.Dispatch<React.SetStateAction<number>>;
  setMassAllocationDeployed: React.Dispatch<React.SetStateAction<boolean>>;
  activeTranscriptLog: CommitteeMeetingLog | null;
  setActiveTranscriptLog: React.Dispatch<React.SetStateAction<CommitteeMeetingLog | null>>;
  inspectDocketsDrawerInst: InstitutionIndicatorsProfile | null;
  setInspectDocketsDrawerInst: React.Dispatch<
    React.SetStateAction<InstitutionIndicatorsProfile | null>
  >;
  complaints: ComplaintDocket[];
  openCaseDetails: (item: ComplaintDocket, initialTab?: DetailTab) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setCameFromInstitutionPid: React.Dispatch<React.SetStateAction<string | null>>;
  setActiveNav: React.Dispatch<React.SetStateAction<NavSection>>;
  requestEvidenceModalOpen: boolean;
  setRequestEvidenceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newEvidencePid: string;
  setNewEvidencePid: React.Dispatch<React.SetStateAction<string>>;
  newEvidenceDocTitle: string;
  setNewEvidenceDocTitle: React.Dispatch<React.SetStateAction<string>>;
  evidenceList: EvidencePassportItem[];
  setEvidenceList: React.Dispatch<React.SetStateAction<EvidencePassportItem[]>>;
  activeRoleConfig: RBACRoleConfig;
  selectedInstitution: InstitutionIndicatorsProfile | null;
  setSelectedInstitution: React.Dispatch<
    React.SetStateAction<InstitutionIndicatorsProfile | null>
  >;
  triggerToast: (msg: string) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  selectedCase,
  setSelectedCase,
  detailTab,
  setDetailTab,
  expandedAuditIndices,
  setExpandedAuditIndices,
  unmaskedIds,
  setUnmaskPromptCase,
  unmaskPromptCase,
  unmaskReason,
  setUnmaskReason,
  handleConfirmUnmaskIdentity,
  overrideReason,
  setOverrideReason,
  handleApproveConflictCoordination,
  handleAssignFollowUpForDisputedRemedy,
  handleToggleSpecialPolicyFlag,
  handleForceAssignOwner,
  newAuditBureau,
  setNewAuditBureau,
  newAuditNote,
  setNewAuditNote,
  handleAppendAuditComment,
  committeeLogs,
  handleDownloadTranscriptTxt,
  followUpModalCase,
  setFollowUpModalCase,
  followUpEmailInput,
  setFollowUpEmailInput,
  followUpQuestionText,
  setFollowUpQuestionText,
  handleSendFollowUpQuestion,
  transferModalCase,
  setTransferModalCase,
  transferTargetBureau,
  setTransferTargetBureau,
  transferTargetOfficer,
  setTransferTargetOfficer,
  transferReasonText,
  setTransferReasonText,
  transferChecklistConfirmed,
  setTransferChecklistConfirmed,
  handleExecuteProperTransfer,
  massAllocationModalOpen,
  setMassAllocationModalOpen,
  massFocusRegion,
  setMassFocusRegion,
  allocatedOfficers,
  setAllocatedOfficers,
  allocatedResearchers,
  setAllocatedResearchers,
  allocatedEvcTeams,
  setAllocatedEvcTeams,
  setMassAllocationDeployed,
  activeTranscriptLog,
  setActiveTranscriptLog,
  inspectDocketsDrawerInst,
  setInspectDocketsDrawerInst,
  complaints,
  openCaseDetails,
  setSearchQuery,
  setCameFromInstitutionPid,
  setActiveNav,
  requestEvidenceModalOpen,
  setRequestEvidenceModalOpen,
  newEvidencePid,
  setNewEvidencePid,
  newEvidenceDocTitle,
  setNewEvidenceDocTitle,
  evidenceList,
  setEvidenceList,
  activeRoleConfig,
  selectedInstitution,
  setSelectedInstitution,
  triggerToast,
}) => {
  return (
    <>
      {/* UNIFIED SPACIOUS SCROLLABLE CASE INSPECTION MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full shadow-2xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Top Header */}
            <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/60 flex items-start justify-between gap-4 shrink-0">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono font-bold text-amber-700 text-sm bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                    {selectedCase.id}
                  </span>
                  <span className="text-xs font-semibold text-blue-800 bg-blue-50/80 px-2.5 py-1 rounded-lg border border-blue-200">
                    AI: {selectedCase.aiClassification}
                  </span>
                  {selectedCase.masterIncidentId && (
                    <span className="font-mono font-bold text-slate-700 text-xs bg-white px-3 py-1 rounded-lg border border-slate-200">
                      Master Incident: {selectedCase.masterIncidentId}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  {selectedCase.category} - {selectedCase.institutionName} ({selectedCase.pid})
                </h3>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => handleToggleSpecialPolicyFlag(selectedCase)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border cursor-pointer flex items-center gap-1.5 ${
                    selectedCase.specialPolicyFlag
                      ? 'bg-purple-600 text-white border-purple-600'
                      : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <i className="fa-solid fa-flag"></i>
                  <span>
                    {selectedCase.specialPolicyFlag
                      ? 'Policy Review Flagged'
                      : 'Flag Policy Review'}
                  </span>
                </button>

                <button
                  onClick={() => setTransferModalCase(selectedCase)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                >
                  Proper Transfer
                </button>

                <button
                  onClick={() => setSelectedCase(null)}
                  className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            {/* Modal Sub-Navigation Tabs */}
            <div className="px-8 border-b border-amber-200/80 bg-white flex flex-wrap gap-7 shrink-0">
              <button
                onClick={() => setDetailTab('overview')}
                className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  detailTab === 'overview'
                    ? 'border-amber-600 text-amber-900 font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                1. Overview &amp; Watchdog
              </button>

              <button
                onClick={() => setDetailTab('timeline')}
                className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  detailTab === 'timeline'
                    ? 'border-amber-600 text-amber-900 font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <i className="fa-solid fa-timeline text-xs text-amber-600"></i>
                <span>2. Lifecycle &amp; SLA Timeline</span>
              </button>

              <button
                onClick={() => setDetailTab('conflict')}
                className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-2 ${
                  detailTab === 'conflict'
                    ? 'border-red-600 text-red-600 font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <span>3. Conflict Radar &amp; Overlap</span>
                {selectedCase.conflictRadar?.hasConflict && (
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                )}
              </button>

              <button
                onClick={() => setDetailTab('regulatory')}
                className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  detailTab === 'regulatory'
                    ? 'border-amber-600 text-amber-900 font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                4. AI Regulatory Evidence Card
              </button>

              <button
                onClick={() => setDetailTab('remedy')}
                className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  detailTab === 'remedy'
                    ? 'border-amber-600 text-amber-900 font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                5. Resolution Receipt
              </button>

              <button
                onClick={() => setDetailTab('history')}
                className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  detailTab === 'history'
                    ? 'border-amber-600 text-amber-900 font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <i className="fa-solid fa-shield-halved text-xs text-amber-600"></i>
                <span>6. Certified Audit Trail ({selectedCase.auditHistory.length})</span>
              </button>

              <button
                onClick={() => setDetailTab('committee')}
                className={`py-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors cursor-pointer ${
                  detailTab === 'committee'
                    ? 'border-purple-600 text-purple-700 font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                7. Committee Transcript
              </button>
            </div>

            {/* Spacious Scrollable Body */}
            <div className="p-8 overflow-y-auto space-y-6 flex-1">
              {/* TAB 1: OVERVIEW */}
              {detailTab === 'overview' && (
                <div className="space-y-6">
                  {/* Time-To-Harm Rescue Queue Banner */}
                  {selectedCase.deadlineRescue?.hasUrgentHarm && (
                    <div className="p-6 rounded-2xl bg-red-50/80 border-2 border-red-300 space-y-4 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-red-200 pb-3">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
                            <i className="fa-solid fa-triangle-exclamation"></i>
                          </span>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 font-mono">
                              Time-To-Harm Rescue Queue · Critical Window Active
                            </span>
                            <h4 className="text-sm font-extrabold text-red-950">
                              {selectedCase.deadlineRescue.timeToHarmLabel}
                            </h4>
                          </div>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-mono font-bold border border-red-300">
                          External Deadline: {selectedCase.deadlineRescue.externalDeadlineDate}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 bg-white rounded-xl border border-red-200 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                            Consequence If Missed:
                          </span>
                          <p className="text-stone-800 font-medium leading-relaxed">
                            {selectedCase.deadlineRescue.consequenceIfMissed}
                          </p>
                        </div>
                        <div className="p-3.5 bg-white rounded-xl border border-red-200 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                            Interim Emergency Action:
                          </span>
                          <p className="text-stone-800 font-medium leading-relaxed">
                            {selectedCase.deadlineRescue.interimAction}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between pt-1 text-[11px] text-red-800 gap-2">
                        <span className="flex items-center gap-1.5 font-medium">
                          <i className="fa-solid fa-file-shield text-red-600"></i>
                          <span>Supporting Evidence: {selectedCase.deadlineRescue.supportingEvidence}</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => triggerToast(`Provisional Emergency Directive dispatched for ${selectedCase.id}: Release certificates within 24h.`)}
                          className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition cursor-pointer shadow-xs"
                        >
                          Execute Interim Rescue Directive
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-amber-800 flex items-center justify-center shrink-0">
                        <i className="fa-solid fa-robot"></i>
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                          AI Complaint Classification &amp; Intake Sufficiency
                        </span>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">
                          {selectedCase.aiClassification}
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {selectedCase.infoSufficiency.isSufficient
                            ? `Student contact verified (${selectedCase.infoSufficiency.studentEmailCollected}).`
                            : selectedCase.infoSufficiency.missingInfoPrompt}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setFollowUpModalCase(selectedCase);
                        setFollowUpEmailInput(selectedCase.unmaskedIdentity.email);
                        setFollowUpQuestionText(
                          selectedCase.infoSufficiency.missingInfoPrompt ||
                            'Please confirm your student roll number and upload supporting fee / certificate receipt.'
                        );
                      }}
                      className="px-4 py-2.5 bg-white hover:bg-blue-50 text-amber-800 border border-blue-300 rounded-xl text-xs font-bold cursor-pointer shrink-0 shadow-2xs"
                    >
                      Ask Follow-up Question (Get Student Email)
                    </button>
                  </div>

                  <div
                    className={`p-6 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      selectedCase.ownerWatchdog.isUnclaimedOrDelayed
                        ? 'bg-amber-50 border-amber-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Ownerless Case Watchdog - Routing &amp; Acceptance Verification
                      </div>
                      <p className="text-sm font-bold text-slate-900">
                        Recommended Owner: {selectedCase.ownerWatchdog.recommendedOwnerBureau} (
                        {selectedCase.ownerWatchdog.recommendedOfficer})
                      </p>
                      <p className="text-xs text-slate-600 italic">
                        {selectedCase.ownerWatchdog.watchdogReason}
                      </p>
                    </div>
                    {selectedCase.ownerWatchdog.isUnclaimedOrDelayed ? (
                      <button
                        onClick={() => handleForceAssignOwner(selectedCase)}
                        className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold rounded-xl cursor-pointer shrink-0"
                      >
                        Force Assign to {selectedCase.ownerWatchdog.recommendedOwnerBureau}
                      </button>
                    ) : (
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
                        Ownership Accepted
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Confidentiality Shield Card */}
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                          Confidentiality Shield
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          Least-Privilege PII Protection
                        </span>
                      </div>

                      {unmaskedIds[selectedCase.id] ? (
                        <div className="space-y-1.5 pt-1">
                          <div className="text-base font-bold text-slate-900">
                            {selectedCase.unmaskedIdentity.name}
                          </div>
                          <div className="text-xs text-slate-600">
                            {selectedCase.unmaskedIdentity.program}
                          </div>
                          <div className="text-xs font-mono text-slate-600">
                            {selectedCase.unmaskedIdentity.contact} |{' '}
                            {selectedCase.unmaskedIdentity.email}
                          </div>
                          <div className="mt-2 pt-2 border-t border-slate-200 text-[11px] font-mono text-emerald-700">
                            Logged Unmask Reason: &ldquo;{unmaskedIds[selectedCase.id]}&rdquo;
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3 pt-1">
                          <div className="text-sm font-mono font-bold text-slate-800">
                            {selectedCase.complainantRef}
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Complainant personal details are masked during routine cross-bureau
                            coordination to prevent retaliation.
                          </p>
                          <button
                            onClick={() => setUnmaskPromptCase(selectedCase)}
                            className="px-4 py-2 bg-white border border-slate-300 hover:border-blue-400 text-amber-700 rounded-xl text-xs font-semibold cursor-pointer"
                          >
                            Request Authorized Identity Unmask →
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Supporting Documents Card */}
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Supporting Documents &amp; Evidence
                        </span>
                        <span className="text-xs font-mono text-amber-800 font-semibold">
                          {selectedCase.supportingDocs.length} Attached
                        </span>
                      </div>
                      <div className="space-y-2.5 pt-1">
                        {selectedCase.supportingDocs.map((doc, idx) => (
                          <div
                            key={idx}
                            onClick={() =>
                              triggerToast(
                                `Opened verified attachment: ${doc.name} (${doc.size})`
                              )
                            }
                            className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs hover:border-blue-300 cursor-pointer"
                          >
                            <div className="flex items-center gap-2.5 font-medium text-slate-800">
                              <i
                                className={`fa-regular ${
                                  doc.type === 'PDF'
                                    ? 'fa-file-pdf text-red-500'
                                    : 'fa-file-zipper text-slate-500'
                                }`}
                              ></i>
                              <span>{doc.name}</span>
                            </div>
                            <span className="font-mono text-slate-400">{doc.size}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* High-level Lifecycle & SLA Timeline Preview */}
                  <div className="pt-2">
                    <TimelineView
                      complaint={selectedCase}
                      variant="compact"
                      onNavigateToAudit={() => setDetailTab('history')}
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: LIFECYCLE & SLA TIMELINE */}
              {detailTab === 'timeline' && (
                <div className="space-y-6">
                  <TimelineView
                    complaint={selectedCase}
                    variant="full"
                    onNavigateToAudit={() => setDetailTab('history')}
                  />
                </div>
              )}

              {/* TAB 3: CONFLICT RADAR & RELATIONSHIP CLASSIFIER */}
              {detailTab === 'conflict' && (
                <div className="space-y-6">
                  {selectedCase.conflictRadar?.hasConflict ? (
                    <div className="p-6 rounded-2xl bg-red-50/70 border border-red-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-red-700 flex items-center gap-2">
                          <i className="fa-solid fa-tower-observation"></i>
                          <span>
                            Active Bureau Collision: {selectedCase.conflictRadar.conflictType}
                          </span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-white rounded-xl border border-red-200 space-y-1">
                          <span className="text-[11px] font-bold uppercase text-slate-400">
                            Directive A
                          </span>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">
                            {selectedCase.conflictRadar.bureauAInstruction}
                          </p>
                        </div>
                        <div className="p-4 bg-white rounded-xl border border-red-200 space-y-1">
                          <span className="text-[11px] font-bold uppercase text-slate-400">
                            Directive B
                          </span>
                          <p className="text-xs text-slate-800 leading-relaxed font-medium">
                            {selectedCase.conflictRadar.bureauBInstruction}
                          </p>
                        </div>
                      </div>

                      <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                        <strong className="block mb-1">Recommended Coordination Plan:</strong>
                        {selectedCase.conflictRadar.suggestedCoordinationStep}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                        <input
                          type="text"
                          value={overrideReason}
                          onChange={(e) => setOverrideReason(e.target.value)}
                          placeholder="Optional coordinator note or override reason..."
                          className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs"
                        />
                        <button
                          onClick={() => handleApproveConflictCoordination(selectedCase)}
                          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold rounded-xl cursor-pointer shrink-0"
                        >
                          Approve Coordinated Plan &amp; Reuse Evidence Passport
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-xs text-emerald-900">
                      <strong>No Active Bureau Conflict:</strong> Investigation tasks for{' '}
                      {selectedCase.id} are synchronized across bureaus.
                    </div>
                  )}

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Relationship Classifier: {selectedCase.relationshipType}
                      </span>
                      <span className="text-xs font-mono text-amber-800 font-semibold">
                        {selectedCase.relationshipExplanation.similarityBand}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                        <strong className="text-slate-900 block">
                          Why the System Suggests a Link:
                        </strong>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-600 leading-relaxed">
                          {selectedCase.relationshipExplanation.matchingFacts.map((f, i) => (
                            <li key={i}>{f}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                        <strong className="text-slate-900 block">
                          Differences to Consider / Separation Safeguards:
                        </strong>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-600 leading-relaxed">
                          {selectedCase.relationshipExplanation.conflictingOrDistinctFacts.map(
                            (f, i) => (
                              <li key={i}>{f}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SOURCE-BACKED REGULATORY EVIDENCE CARD */}
              {detailTab === 'regulatory' && (
                <div className="space-y-5">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Student’s Original Wording
                    </span>
                    <p className="text-sm italic text-slate-800 leading-relaxed">
                      {selectedCase.regulatoryEvidenceCard.studentOriginalWording}
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                        Retrieved Regulatory Source
                      </span>
                      <span className="text-xs font-mono bg-white px-2.5 py-1 rounded-md border border-blue-200 text-blue-800">
                        {selectedCase.regulatoryEvidenceCard.officerVerificationState}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-slate-900">
                      {selectedCase.regulatoryEvidenceCard.sourceDocumentTitle}
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-blue-200 font-mono text-xs text-slate-700 leading-relaxed">
                      {selectedCase.regulatoryEvidenceCard.sourceExcerpt}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                    <strong className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
                      Facts Officer Must Verify Before Issuing Notice:
                    </strong>
                    <ul className="list-disc pl-5 text-xs text-amber-950 space-y-1.5 leading-relaxed">
                      {selectedCase.regulatoryEvidenceCard.missingFactsToVerify.map((m, i) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: RESOLUTION RECEIPT */}
              {detailTab === 'remedy' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 block">
                        1. Official Administrative File Status
                      </span>
                      <span className="text-base font-bold text-slate-900 mt-1 block">
                        {selectedCase.status}
                      </span>
                    </div>
                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200">
                      <span className="text-xs text-amber-800 block">
                        2. Complainant Resolution Receipt
                      </span>
                      <span className="text-base font-bold text-red-700 mt-1 block">
                        {selectedCase.remedyState}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <strong className="text-slate-900 block">Promised / Required Remedy:</strong>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedCase.remedyDetails.promisedRemedy}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <strong className="text-slate-900 block">Institution Proof Uploaded:</strong>
                    <p className="text-slate-700 leading-relaxed">
                      {selectedCase.remedyDetails.institutionProof}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 space-y-2 text-xs">
                    <strong className="text-red-900 block">
                      Complainant Confirmation Response:
                    </strong>
                    <p className="text-red-950 leading-relaxed">
                      {selectedCase.remedyDetails.studentResponse}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleAssignFollowUpForDisputedRemedy(selectedCase)}
                      className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Assign Follow-Up Remedy Reconciliation Task
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 6: CERTIFIED IMMUTABLE AUDIT TRAIL */}
              {detailTab === 'history' && (
                <AuditTrailView
                  complaint={selectedCase}
                  expandedIndices={expandedAuditIndices}
                  onToggleExpand={(idx) =>
                    setExpandedAuditIndices((prev) => ({ ...prev, [idx]: !prev[idx] }))
                  }
                  newAuditBureau={newAuditBureau}
                  setNewAuditBureau={setNewAuditBureau}
                  newAuditNote={newAuditNote}
                  setNewAuditNote={setNewAuditNote}
                  onAppendComment={handleAppendAuditComment}
                  triggerToast={triggerToast}
                />
              )}

              {/* TAB 6: COMMITTEE MEETING LOG & AI TRANSCRIPT SUMMARY */}
              {detailTab === 'committee' && (
                <div className="space-y-5">
                  {committeeLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-amber-700">
                          <i className="fa-solid fa-microphone-lines mr-1.5"></i>
                          Audio Transcript Processed ({log.audioDuration})
                        </span>
                        <span className="font-mono text-slate-500">{log.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">{log.meetingTitle}</h4>
                      <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs leading-relaxed">
                        <div>
                          <strong>Key Point 1:</strong> {log.keyPoint1}
                        </div>
                        <div>
                          <strong>Key Point 2:</strong> {log.keyPoint2}
                        </div>
                        <div>
                          <strong>Resolution:</strong> {log.resolution}
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs whitespace-pre-line leading-relaxed">
                        {log.fullTranscript}
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDownloadTranscriptTxt(log)}
                          className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
                        >
                          Download full transcript (.txt)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ASK FOLLOW-UP QUESTION */}
      {followUpModalCase && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSendFollowUpQuestion}
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-7 shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">
                  AI INTAKE SUFFICIENCY ASSISTANT - FOLLOW-UP DISPATCH
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Ask Follow-Up Question &amp; Verify Student Email ({followUpModalCase.id})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setFollowUpModalCase(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              When a complaint lacks required documentary specifics (such as UTR number, roll
              number, or submission date), the system sends a structured follow-up question to the
              complainant’s email so the investigation never stalls.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Student / Complainant Registered Email:
              </label>
              <input
                type="email"
                required
                value={followUpEmailInput}
                onChange={(e) => setFollowUpEmailInput(e.target.value)}
                placeholder="student@college.edu"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                AI-Suggested Follow-Up Question to Student:
              </label>
              <textarea
                rows={3}
                required
                value={followUpQuestionText}
                onChange={(e) => setFollowUpQuestionText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setFollowUpModalCase(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl cursor-pointer"
              >
                Send Follow-Up &amp; Log Email
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: PROPER TRANSFER WITH REQUIRED HANDOVER DETAILS */}
      {transferModalCase && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleExecuteProperTransfer}
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-7 shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">
                  ANTI-ORPHAN HANDOVER PROTOCOL - PROPER BUREAU TRANSFER
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Transfer {transferModalCase.id} With Mandatory Ownership Handover
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTransferModalCase(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
              <strong>Safeguard:</strong> Elapsed SLA time (
              {transferModalCase.policyClock.elapsedDays} {transferModalCase.policyClock.basis})
              will be preserved across this transfer, and the receiving officer is explicitly
              recorded.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target AICTE Bureau:
                </label>
                <select
                  value={transferTargetBureau}
                  onChange={(e) => setTransferTargetBureau(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
                >
                  <option value="Regulation Bureau (RB)">Regulation Bureau (RB)</option>
                  <option value="Public Grievance (PGRC)">Public Grievance (PGRC)</option>
                  <option value="Approval Bureau (AB)">Approval Bureau (AB)</option>
                  <option value="Regional Office (Southern)">Regional Office (Southern)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Receiving Accountable Officer:
                </label>
                <input
                  type="text"
                  required
                  value={transferTargetOfficer}
                  onChange={(e) => setTransferTargetOfficer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mandatory Statutory Reason &amp; Fact Summary for Transfer:
              </label>
              <textarea
                rows={3}
                required
                value={transferReasonText}
                onChange={(e) => setTransferReasonText(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={transferChecklistConfirmed}
                onChange={(e) => setTransferChecklistConfirmed(e.target.checked)}
                className="rounded border-slate-300"
              />
              <span>
                Attach gathered facts, Evidence Passport links, and preserve elapsed SLA clock
              </span>
            </label>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setTransferModalCase(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Confirm Proper Transfer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: RECURRING ISSUE RADAR - ALLOCATE MASS RESOURCES */}
      {massAllocationModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-7 shadow-xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-purple-600">
                  RECURRING ISSUE RADAR - MONTHLY MASS RESOURCE ALLOCATION
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  Allocate Taskforce to &ldquo;Faculty Salary Delays&rdquo; (400% Spike)
                </h3>
              </div>
              <button
                onClick={() => setMassAllocationModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Deploy a coordinated monthly taskforce of Regulation Bureau officers, policy
              researchers, and regional auditors to resolve all 12 Southern Region institutions in a
              single synchronized drive.
            </p>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">Target Jurisdiction Cluster:</span>
                <input
                  type="text"
                  value={massFocusRegion}
                  onChange={(e) => setMassFocusRegion(e.target.value)}
                  className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono text-right"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">
                  Allocate Senior Investigating Officers (RB &amp; PGRC):
                </span>
                <input
                  type="number"
                  min={1}
                  max={25}
                  value={allocatedOfficers}
                  onChange={(e) => setAllocatedOfficers(Number(e.target.value) || 6)}
                  className="w-16 px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-mono text-right"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">
                  Allocate Policy &amp; Financial Audit Researchers:
                </span>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={allocatedResearchers}
                  onChange={(e) => setAllocatedResearchers(Number(e.target.value) || 4)}
                  className="w-16 px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-mono text-right"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-semibold text-slate-700">
                  Allocate Regional EVC Verification Panels:
                </span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={allocatedEvcTeams}
                  onChange={(e) => setAllocatedEvcTeams(Number(e.target.value) || 3)}
                  className="w-16 px-2.5 py-1 bg-white border border-slate-300 rounded-lg font-mono text-right"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                onClick={() => setMassAllocationModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setMassAllocationDeployed(true);
                  setMassAllocationModalOpen(false);
                  triggerToast(
                    `Deployed Monthly Focus Taskforce: ${allocatedOfficers} Officers, ${allocatedResearchers} Researchers, and ${allocatedEvcTeams} EVC Panels assigned to ${massFocusRegion}.`
                  );
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl cursor-pointer"
              >
                Confirm &amp; Deploy Mass Resources
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FULL COMMITTEE TRANSCRIPT VIEWER */}
      {activeTranscriptLog && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-7 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-purple-600">
                  AI PROCESSED COMMITTEE HEARING TRANSCRIPT ({activeTranscriptLog.id})
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {activeTranscriptLog.meetingTitle}
                </h3>
              </div>
              <button
                onClick={() => setActiveTranscriptLog(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs whitespace-pre-line leading-relaxed">
              {activeTranscriptLog.fullTranscript}
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => handleDownloadTranscriptTxt(activeTranscriptLog)}
                className="px-4 py-2 text-xs font-semibold text-amber-800 bg-blue-50 rounded-xl cursor-pointer"
              >
                Download .txt
              </button>
              <button
                onClick={() => setActiveTranscriptLog(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIDENTIALITY SHIELD IDENTITY UNMASK PROMPT */}
      {unmaskPromptCase && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleConfirmUnmaskIdentity}
            className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-7 shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">
                  CONFIDENTIALITY SHIELD - LEAST-PRIVILEGE ACCESS
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Authorized Identity Access ({unmaskPromptCase.complainantRef})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setUnmaskPromptCase(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Unmasking student identity requires an official investigative reason and records an
              attributable access event in the audit trail.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Reason for Accessing Student Identity:
              </label>
              <textarea
                rows={2}
                value={unmaskReason}
                onChange={(e) => setUnmaskReason(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setUnmaskPromptCase(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl cursor-pointer"
              >
                Log Reason &amp; Reveal Identity
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: IN-PLACE INSTITUTION DOCKETS DRAWER */}
      {inspectDocketsDrawerInst && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-7 shadow-2xl space-y-5 max-h-[88vh] flex flex-col overflow-hidden">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4 shrink-0">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">
                  CENTRALIZED INSTITUTION DOSSIER ({inspectDocketsDrawerInst.pid})
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {inspectDocketsDrawerInst.name} — Consolidated Complaint History
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Approval: {inspectDocketsDrawerInst.approvalStatus} | Scheduled EVC:{' '}
                  {inspectDocketsDrawerInst.inspectionSchedule}
                </p>
              </div>
              <button
                onClick={() => setInspectDocketsDrawerInst(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="overflow-y-auto space-y-3.5 pr-1 flex-1">
              {complaints
                .filter((c) => c.pid === inspectDocketsDrawerInst.pid)
                .map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-mono font-bold text-amber-800">{c.id}</span>
                        <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-semibold text-slate-700">
                          {c.bureau}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-amber-800 font-semibold">
                          Status: {c.status}
                        </span>
                        <span className="font-mono text-slate-500">
                          SLA: Day {c.policyClock.elapsedDays}/{c.policyClock.prescribedDays}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-900">{c.category}</div>
                      <p className="text-xs text-slate-600 italic">
                        {c.regulatoryEvidenceCard.studentOriginalWording}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          const target = c;
                          setInspectDocketsDrawerInst(null);
                          openCaseDetails(target, 'overview');
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Inspect Full Case
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => {
                  const pid = inspectDocketsDrawerInst.pid;
                  setInspectDocketsDrawerInst(null);
                  setSearchQuery(pid);
                  setCameFromInstitutionPid(pid);
                  setActiveNav('dashboard');
                }}
                className="px-4 py-2 text-xs font-semibold text-amber-800 bg-blue-50 hover:bg-blue-100 rounded-xl cursor-pointer"
              >
                Open in Command Center Table (With Back Button) →
              </button>
              <button
                onClick={() => setInspectDocketsDrawerInst(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REQUEST MISSING STATUTORY EVIDENCE FROM COLLEGE */}
      {requestEvidenceModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newId = `EVD-2026-40${evidenceList.length + 1}`;
              const instName =
                INSTITUTION_PROFILES[newEvidencePid]?.name || 'Lakshmi College of Engineering';
              const newItem: EvidencePassportItem = {
                id: newId,
                title: newEvidenceDocTitle.trim(),
                pid: newEvidencePid,
                institutionName: instName,
                uploadedBy: `Requested by ${activeRoleConfig.officerName} (${activeRoleConfig.shortName})`,
                uploadedAt: '25 Oct 2026 - Just Now',
                periodCovered: 'Academic Year 2026-27',
                sha256: 'a41e92bc...6610df12 (Pending Upload)',
                reviewState: 'Submitted',
                usedByBureaus: ['Regulation Bureau (RB)', 'Public Grievance (PGRC)'],
                accessLevel: 'Shared Across Linked Tasks',
              };
              setEvidenceList((prev) => [newItem, ...prev]);
              setRequestEvidenceModalOpen(false);
              triggerToast(
                `Issued shared single-window evidence demand (${newId}) to ${instName}. Both RB & PGRC will automatically share the uploaded file.`
              );
            }}
            className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-7 shadow-xl space-y-4"
          >
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">
                  SINGLE-WINDOW EVIDENCE DEMAND · PREVENT DUPLICATE BUREAU REQUESTS
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Request Statutory Document into Shared Evidence Vault
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRequestEvidenceModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Institution (AICTE Permanent ID):
              </label>
              <select
                value={newEvidencePid}
                onChange={(e) => setNewEvidencePid(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="PID-1-50821900">
                  PID-1-50821900 — Lakshmi College of Engineering
                </option>
                <option value="PID-1-20381992">
                  PID-1-20381992 — PSG Institute of Advanced Technology
                </option>
                <option value="PID-1-40112333">
                  PID-1-40112333 — SRM Institute of Science &amp; Technology
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Required Statutory Document / Register Title:
              </label>
              <textarea
                rows={3}
                required
                value={newEvidenceDocTitle}
                onChange={(e) => setNewEvidenceDocTitle(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setRequestEvidenceModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 rounded-xl cursor-pointer"
              >
                Issue Shared Evidence Request
              </button>
            </div>
          </form>
        </div>
      )}

      {/* INSTITUTION INDICATORS MODAL */}
      {selectedInstitution && (
        <div className="fixed inset-0 bg-slate-900/45 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-7 shadow-xl space-y-5">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-700">
                  EXPLAINABLE INSTITUTIONAL REVIEW INDICATORS ({selectedInstitution.pid})
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedInstitution.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInstitution(null)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Unverified Allegations</span>
                <span className="text-lg font-bold font-mono text-slate-900 mt-0.5 block">
                  {selectedInstitution.indicators.unverifiedAllegations}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-amber-800 block">Substantiated Findings</span>
                <span className="text-lg font-bold font-mono text-amber-900 mt-0.5 block">
                  {selectedInstitution.indicators.substantiatedFindings}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <span className="text-red-700 block">Recurring Established Issues</span>
                <span className="text-lg font-bold font-mono text-red-800 mt-0.5 block">
                  {selectedInstitution.indicators.recurringEstablishedIssues}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 block">Institution Response Quality</span>
                <span className="text-xs font-bold text-slate-900 mt-1 block">
                  {selectedInstitution.indicators.responseQuality}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 leading-relaxed">
              <strong>Authorized Review Recommendation:</strong>{' '}
              {selectedInstitution.reviewRecommendation}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedInstitution(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl cursor-pointer"
              >
                Close Workspace
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
