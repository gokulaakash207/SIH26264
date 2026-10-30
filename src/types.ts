/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

declare global {
  interface Window {
    Chart: any;
  }
}

export type NavSection =
  | 'dashboard'
  | 'complaints'
  | 'coordination'
  | 'watchdog'
  | 'committee'
  | 'institutions'
  | 'evidence'
  | 'analytics'
  | 'reports';

export type RBACRoleId =
  | 'AICTE_HQ'
  | 'RB_OFFICER'
  | 'PGRC_OFFICER'
  | 'RO_SOUTHERN'
  | 'SHC_MEMBER';

export type TableTab =
  | 'all'
  | 'shared_incident'
  | 'conflict_radar'
  | 'disputed_remedy'
  | 'deadline_rescue'
  | 'ownerless_watchdog';

export type DetailTab =
  | 'overview'
  | 'timeline'
  | 'conflict'
  | 'regulatory'
  | 'remedy'
  | 'history'
  | 'committee';

export interface RBACRoleConfig {
  id: RBACRoleId;
  label: string;
  shortName: string;
  accessLevel: string;
  officerName: string;
  officerTitle: string;
  jurisdictionBadge?: string;
  description: string;
}

export type OfficialStatus = 'Pending' | 'Under Process' | 'Disposed' | 'Transferred';

export type RiskLevel = 'High' | 'Medium' | 'Low';

export type AIComplaintClassification =
  | 'True Complaint (Actionable)'
  | 'Improvement / Suggestion'
  | 'General Enquiry';

export type RegionName =
  | 'Southern Region'
  | 'Northern Region'
  | 'Western Region'
  | 'Eastern Region';

export type RemedyVerificationState =
  | 'Complainant Confirms Receipt'
  | 'Received Partially - Outcome Disputed'
  | 'Institution Reports Completion'
  | 'Remedy Awaiting Verification'
  | 'Confirmation Unavailable';

export type RelationshipCategory =
  | 'Shared Incident (Link & Coordinate)'
  | 'Duplicate Submission (Same Student)'
  | 'Related Pattern (Different Academic Year)'
  | 'Same Institution Only (Keep Separate)'
  | 'Conflicting Account (Human Review)';

export interface AuditEvent {
  timestamp: string;
  actor: string;
  bureau: string;
  eventType: string;
  note: string;
  isCoordinationEvent?: boolean;
  actionCategory?: 'TRANSFER' | 'TRIAGE' | 'DIRECTIVE' | 'REMEDY' | 'AUDIT' | 'SECURITY' | 'HEARTBEAT';
  statusTransition?: { from: string; to: string };
  hash?: string;
  officerSignature?: string;
  expandedDetails?: {
    routingRule: string;
    officerSessionId: string;
    slaSnapshot: string;
    handoverStatus: string;
    attachedFiles?: { name: string; size: string }[];
  };
}

export interface CommitteeMeetingLog {
  id: string;
  caseId: string;
  institutionName: string;
  pid: string;
  meetingTitle: string;
  date: string;
  chairperson: string;
  attendees: string[];
  audioDuration: string;
  keyPoint1: string;
  keyPoint2: string;
  resolution: string;
  fullTranscript: string;
  policyReviewFlagged?: boolean;
}

export interface OverlapComparisonPair {
  id: string;
  institutionName: string;
  pid: string;
  caseA: {
    id: string;
    quote: string;
    bureau: string;
    complainantType: string;
    status: string;
  };
  caseB: {
    id: string;
    quote: string;
    bureau: string;
    complainantType: string;
    status: string;
  };
  whySuggestsLink: string[];
  differencesToConsider: string[];
  decisionState: 'Pending' | 'Confirmed Related' | 'Rejected' | 'Further Review';
  policyFlagged: boolean;
}

export interface EvidencePassportItem {
  id: string;
  title: string;
  pid: string;
  institutionName: string;
  uploadedBy: string;
  uploadedAt: string;
  periodCovered: string;
  sha256: string;
  reviewState: 'Reviewed' | 'Submitted' | 'Disputed' | 'Superseded';
  usedByBureaus: string[];
  accessLevel: 'Shared Across Linked Tasks' | 'Restricted (PII Redacted)';
}

export interface ComplaintDocket {
  id: string;
  masterIncidentId?: string;
  complainantRef: string;
  unmaskedIdentity: {
    name: string;
    program: string;
    contact: string;
    email: string;
    narrativeRiskWarning?: string;
  };
  category: string;
  institutionName: string;
  pid: string;
  city: string;
  region: RegionName;
  bureau: string;
  caseDomain: 'REGULATORY_NORMS' | 'PETITION_GRIEVANCE' | 'BOTH';
  predictiveSlaBreach48h: boolean;
  riskLevel: RiskLevel;
  aiClassification: AIComplaintClassification;
  infoSufficiency: {
    isSufficient: boolean;
    missingInfoPrompt?: string;
    followUpSent?: boolean;
    studentEmailCollected?: string;
  };
  ownerWatchdog: {
    isUnclaimedOrDelayed: boolean;
    unacceptedHours: number;
    recommendedOwnerBureau: string;
    recommendedOfficer: string;
    acceptedByOwner: boolean;
    watchdogReason: string;
  };
  specialPolicyFlag?: boolean;
  supportingDocs: { name: string; size: string; type: string }[];
  leadCoordinator?: string;
  status: OfficialStatus;
  remedyState: RemedyVerificationState;
  remedyDetails: {
    promisedRemedy: string;
    institutionProof: string;
    studentResponse: string;
    disputeNote?: string;
  };
  relationshipType: RelationshipCategory;
  relationshipExplanation: {
    suggestedLinkTarget?: string;
    matchingFacts: string[];
    conflictingOrDistinctFacts: string[];
    similarityBand: string;
    officerDecision: 'Approved Link' | 'Pending Officer Review' | 'Kept Separate';
  };
  conflictRadar?: {
    hasConflict: boolean;
    conflictType: string;
    bureauAInstruction: string;
    bureauBInstruction: string;
    suggestedCoordinationStep: string;
    resolved?: boolean;
  };
  deadlineRescue?: {
    hasUrgentHarm: boolean;
    timeToHarmLabel: string;
    externalDeadlineDate: string;
    consequenceIfMissed: string;
    supportingEvidence: string;
    interimAction: string;
  };
  policyClock: {
    policyName: string;
    policyVersion: string;
    basis: 'Working Days' | 'Calendar Days';
    prescribedDays: number;
    elapsedDays: number;
    dueDate: string;
    transferNote?: string;
    riskEstimateSummary: string;
    highRiskFlag: boolean;
  };
  regulatoryEvidenceCard: {
    studentOriginalWording: string;
    extractedAllegation: string;
    suggestedCategory: string;
    candidateProvision: string;
    sourceDocumentTitle: string;
    sourceExcerpt: string;
    missingFactsToVerify: string[];
    officerVerificationState: 'Verified Applicable' | 'Pending Officer Verification' | 'Abstained';
  };
  auditHistory: AuditEvent[];
}

export interface InstitutionIndicatorsProfile {
  pid: string;
  name: string;
  city: string;
  state: string;
  region: RegionName;
  approvalStatus: string;
  cibilIllustrativeScore: number;
  openCasesCount: number;
  totalCasesCount: number;
  policyReviewRequired?: boolean;
  inspectionSchedule?: string;
  reviewRecommendation: string;
  indicators: {
    unverifiedAllegations: number;
    substantiatedFindings: number;
    recurringEstablishedIssues: number;
    overdueRemedialActions: number;
    responseQuality: string;
  };
  consolidatedRequests: {
    requestId: string;
    documentRequested: string;
    bureausSharing: string[];
    dueDate: string;
    status: string;
  }[];
}

export interface IntraBureauBatchCluster {
  id: string;
  bureau: string;
  pid: string;
  institutionName: string;
  city: string;
  violationCategory: string;
  canonicalClause: string;
  similarityScore: string;
  complaintCount: number;
  docketIds: string[];
  sampleQuotes: { caseId: string; role: string; text: string }[];
  recommendedBatchAction: string;
  status: 'Ready to Merge' | 'Merged into Master Batch';
}

export interface LiveKpiMetrics {
  activeCasesCount: number;
  disposedCasesCount: number;
  overlapCount: number;
  slaBreachesCount: number;
  verifiedRemedyPct: number;
}

export interface SharedPortalProps {
  activeNav: NavSection;
  setActiveNav: React.Dispatch<React.SetStateAction<NavSection>>;
  selectedRole: RBACRoleId;
  activeRoleConfig: RBACRoleConfig;
  complaints: ComplaintDocket[];
  setComplaints: React.Dispatch<React.SetStateAction<ComplaintDocket[]>>;
  filteredComplaints: ComplaintDocket[];
  overlapPairs: OverlapComparisonPair[];
  setOverlapPairs: React.Dispatch<React.SetStateAction<OverlapComparisonPair[]>>;
  rbBatchClusters: IntraBureauBatchCluster[];
  setRbBatchClusters: React.Dispatch<React.SetStateAction<IntraBureauBatchCluster[]>>;
  overlapSubTab: 'cross_bureau' | 'same_dept_batch';
  setOverlapSubTab: React.Dispatch<React.SetStateAction<'cross_bureau' | 'same_dept_batch'>>;
  committeeLogs: CommitteeMeetingLog[];
  executedDirectives: Record<string, boolean>;
  setExecutedDirectives: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  showAllCommitteeLogsInRB: boolean;
  setShowAllCommitteeLogsInRB: React.Dispatch<React.SetStateAction<boolean>>;
  showAllInstitutionsInRB: boolean;
  setShowAllInstitutionsInRB: React.Dispatch<React.SetStateAction<boolean>>;
  cameFromInstitutionPid: string | null;
  setCameFromInstitutionPid: React.Dispatch<React.SetStateAction<string | null>>;
  setInspectDocketsDrawerInst: React.Dispatch<
    React.SetStateAction<InstitutionIndicatorsProfile | null>
  >;
  evidenceList: EvidencePassportItem[];
  reusedEvidenceIds: Record<string, boolean>;
  setReusedEvidenceIds: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  setRequestEvidenceModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showCrossBureauHeatmapInRB: boolean;
  setShowCrossBureauHeatmapInRB: React.Dispatch<React.SetStateAction<boolean>>;
  rbSpikeEscalatedToHQ: boolean;
  setRbSpikeEscalatedToHQ: React.Dispatch<React.SetStateAction<boolean>>;
  liveKpiMetrics: LiveKpiMetrics;
  avoidedVisitsCount: number;
  setAvoidedVisitsCount: React.Dispatch<React.SetStateAction<number>>;
  hoursPerVisitAssumption: number;
  setHoursPerVisitAssumption: React.Dispatch<React.SetStateAction<number>>;
  costPerVisitAssumption: number;
  setCostPerVisitAssumption: React.Dispatch<React.SetStateAction<number>>;
  massAllocationDeployed: boolean;
  allocatedOfficers: number;
  allocatedResearchers: number;
  allocatedEvcTeams: number;
  setMassAllocationModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  tableTab: TableTab;
  setTableTab: React.Dispatch<React.SetStateAction<TableTab>>;
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  bureauFilter: string;
  setBureauFilter: React.Dispatch<React.SetStateAction<string>>;
  riskFilter: string;
  setRiskFilter: React.Dispatch<React.SetStateAction<string>>;
  aiClassFilter: string;
  setAiClassFilter: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  unmaskedIds: Record<string, string>;
  chartCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  triggerToast: (msg: string) => void;
  openCaseDetails: (item: ComplaintDocket, initialTab?: DetailTab) => void;
  handleExportCSV: () => void;
  handleDownloadTranscriptTxt: (log: CommitteeMeetingLog) => void;
  handleForceAssignOwner: (targetCase: ComplaintDocket) => void;
  handleAssignFollowUpForDisputedRemedy: (record: ComplaintDocket) => void;
  setTransferModalCase: React.Dispatch<React.SetStateAction<ComplaintDocket | null>>;
  setFollowUpModalCase: React.Dispatch<React.SetStateAction<ComplaintDocket | null>>;
  setFollowUpEmailInput: React.Dispatch<React.SetStateAction<string>>;
  setFollowUpQuestionText: React.Dispatch<React.SetStateAction<string>>;
  setSelectedInstitution: React.Dispatch<
    React.SetStateAction<InstitutionIndicatorsProfile | null>
  >;
  setActiveTranscriptLog: React.Dispatch<React.SetStateAction<CommitteeMeetingLog | null>>;
}
