/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CommitteeMeetingLog,
  ComplaintDocket,
  EvidencePassportItem,
  InstitutionIndicatorsProfile,
  IntraBureauBatchCluster,
  OverlapComparisonPair,
  RBACRoleConfig,
  RBACRoleId,
} from './types';

export const RBAC_ROLES: Record<RBACRoleId, RBACRoleConfig> = {
  AICTE_HQ: {
    id: 'AICTE_HQ',
    label: 'AICTE HQ (Senior Management - Omniscient View)',
    shortName: 'AICTE HQ (Senior Management)',
    accessLevel: 'Full National & Appellate',
    officerName: 'Prof. R. K. Verma',
    officerTitle: 'Member Secretary · AICTE HQ',
    description:
      'Full national oversight across all bureaus, total overlap alerts (7), cross-bureau heatmap, taxpayer budget/man-hour savings, and appellate override authority.',
  },
  RB_OFFICER: {
    id: 'RB_OFFICER',
    label: 'Regulation Bureau (RB Officer)',
    shortName: 'Regulation Bureau (RB Officer)',
    accessLevel: 'Scoped (Regulatory & Norms)',
    officerName: 'Dr. S. Menon',
    officerTitle: 'Director · Regulation Bureau',
    description:
      'Scoped to Regulatory & Norm Compliance dockets (Certificate Retention APH violations, Faculty Qualification & Pay Norms). Includes EVC Inspection triggers and Show-Cause Notice generators.',
  },
  PGRC_OFFICER: {
    id: 'PGRC_OFFICER',
    label: 'Public Grievance Cell (PGRC Officer)',
    shortName: 'Public Grievance Cell (PGRC Officer)',
    accessLevel: 'Scoped (Student & Faculty Petitions)',
    officerName: 'Officer M. Khanna',
    officerTitle: 'Nodal Officer · Public Grievance Cell',
    description:
      'Scoped to Student, Parent, and Faculty petitions (Fee Refunds, Certificate Release, Scholarships). Highlights Predictive SLA Breach warnings (<48h) and Student Resolution Receipts.',
  },
  RO_SOUTHERN: {
    id: 'RO_SOUTHERN',
    label: 'Regional Office (Southern Region Officer)',
    shortName: 'Regional Office (Southern Region)',
    accessLevel: 'Scoped (Southern Region)',
    officerName: 'Dr. V. Subramanian',
    officerTitle: 'Regional Officer · SRO Chennai',
    jurisdictionBadge: 'Jurisdiction: Southern Region (Tamil Nadu / Puducherry)',
    description:
      'Scoped to Southern Region institutions (Tamil Nadu & Puducherry). Displays localized campus inspection schedules and regional AICTE Permanent IDs (PIDs).',
  },
  SHC_MEMBER: {
    id: 'SHC_MEMBER',
    label: 'Standing Hearing Committee (SHC Member)',
    shortName: 'Standing Hearing Committee (SHC)',
    accessLevel: 'Scoped (Appellate & Policy Review)',
    officerName: 'Justice (Retd.) R. Mahadevan',
    officerTitle: 'Chairperson · Standing Hearing Committee',
    description:
      'Focused on Committee Hearing Logs, AI Audio Transcript Summarizer, Ownerless Case Watchdog escalations, and Policy Review Required flags on repeat-offender institutions.',
  },
};

export const FIVE_DAY_COMPLIANCE_TREND = [
  { day: 'Oct 19', score: 86.2, verifiedRemedyRate: 71 },
  { day: 'Oct 20', score: 87.8, verifiedRemedyRate: 74 },
  { day: 'Oct 21', score: 89.1, verifiedRemedyRate: 78 },
  { day: 'Oct 22', score: 90.8, verifiedRemedyRate: 81 },
  { day: 'Oct 23', score: 92.4, verifiedRemedyRate: 84 },
];

export const SOUTHERN_INSPECTION_SCHEDULES = [
  {
    scheduleId: 'SRO-INSP-401',
    pid: 'PID-1-20381992',
    institution: 'PSG Institute of Advanced Technology',
    city: 'Coimbatore, TN',
    date: '26 Oct 2026',
    panelLead: 'Dr. V. Subramanian (SRO Chennai)',
    scope: 'Verify Original Certificate Register (EVD-2026-401) & CNC Workshop Lab',
    status: 'Consolidated Joint RB-SRO Visit',
  },
  {
    scheduleId: 'SRO-INSP-405',
    pid: 'PID-1-50821900',
    institution: 'Lakshmi College of Engineering',
    city: 'Madurai, TN',
    date: '28 Oct 2026',
    panelLead: 'Prof. K. Natarajan (SRO EVC Team)',
    scope: 'Biometric Faculty Qualification Roster & Cadre Ratio Verification',
    status: 'Mandatory Show-Cause Inspection',
  },
  {
    scheduleId: 'SRO-INSP-409',
    pid: 'PID-1-40112333',
    institution: 'SRM Institute of Science & Technology',
    city: 'Kattankulathur, TN',
    date: '30 Oct 2026',
    panelLead: 'SRO Audit Cell (Puducherry / TN)',
    scope: 'Audit Counselling Fee Refund Ledger & Disputed UTR Shortfalls',
    status: 'Scheduled (Desk + On-Site)',
  },
];

export const INITIAL_OVERLAP_PAIRS: OverlapComparisonPair[] = [
  {
    id: 'OVR-PAIR-01',
    institutionName: 'Lakshmi College of Engineering',
    pid: 'PID-1-50821900',
    caseA: {
      id: 'CMP-2026-0102',
      quote:
        '"Faculty member alleges several lecturers do not meet AICTE qualification norms and lack mandatory M.Tech/Ph.D credentials."',
      bureau: 'RB',
      complainantType: 'Faculty Member',
      status: 'Under Process',
    },
    caseB: {
      id: 'CMP-2026-0114',
      quote:
        '"Students complain that unqualified staff are teaching core engineering subjects in 3rd year Computer Science."',
      bureau: 'PGRC',
      complainantType: 'Student Batch',
      status: 'Pending',
    },
    whySuggestsLink: [
      'Same institution ID (PID-1-50821900 - Lakshmi College of Engineering)',
      'Same category: Faculty Qualification & Cadre Norms',
      'Overlapping keywords: unqualified, faculty, norms, core engineering',
      'Different Bureaus: RB and PGRC',
    ],
    differencesToConsider: [
      'Complainant types differ (Faculty vs Student)',
      'Case CMP-2026-0102 is already under process at Regulation Bureau (RB)',
    ],
    decisionState: 'Pending',
    policyFlagged: false,
  },
  {
    id: 'OVR-PAIR-02',
    institutionName: 'PSG Institute of Advanced Technology',
    pid: 'PID-1-20381992',
    caseA: {
      id: 'CMP-1002',
      quote:
        '"The college is refusing to return my original 10th, 12th marksheets and degree unless I pay extra hostel dues! My PSU joining is tomorrow!"',
      bureau: 'RB',
      complainantType: 'Final Year Student',
      status: 'Under Process',
    },
    caseB: {
      id: 'CMP-2003',
      quote:
        '"Original Transfer Certificate and marksheets withheld by Registrar office demanding full 4-year tuition after admission withdrawal."',
      bureau: 'PGRC',
      complainantType: 'Parent / Student',
      status: 'Under Process',
    },
    whySuggestsLink: [
      'Same institution ID (PID-1-20381992)',
      'Same category: Retention of Original Certificates',
      'Colliding document deadlines issued by RB (28 Oct) and PGRC (25 Oct)',
      'Different Bureaus: RB and PGRC',
    ],
    differencesToConsider: [
      'CMP-1002 has an external 24-hour PSU job-joining deadline requiring immediate interim relief',
      'CMP-1009 at the same college is about Mechanical Lab CNC machines and is explicitly kept separate',
    ],
    decisionState: 'Confirmed Related',
    policyFlagged: true,
  },
];

export const INITIAL_RB_BATCH_CLUSTERS: IntraBureauBatchCluster[] = [
  {
    id: 'BATCH-RB-2026-01',
    bureau: 'Regulation Bureau (RB)',
    pid: 'PID-1-50821900',
    institutionName: 'Lakshmi College of Engineering',
    city: 'Madurai, TN',
    violationCategory: 'Faculty 7th CPC Salary Delays & Cadre Ratio Deficiency',
    canonicalClause: 'AICTE-APH-2026-CH7-CL-6.1 (Non-Payment of Prescribed Scale)',
    similarityScore: '96.8% Intra-Bureau Semantic Match',
    complaintCount: 8,
    docketIds: [
      'CMP-2026-0102',
      'CMP-2026-0108',
      'CMP-2026-0119',
      'CMP-2026-0124',
      'CMP-2026-0129',
      'CMP-2026-0133',
      'CMP-2026-0138',
      'CMP-2026-0142',
    ],
    sampleQuotes: [
      {
        caseId: 'CMP-2026-0119',
        role: 'Associate Prof (ECE)',
        text: '"Institution has withheld 7th CPC salary arrears for Aug, Sept, and Oct 2026 despite full fee collection."',
      },
      {
        caseId: 'CMP-2026-0124',
        role: 'Assistant Prof (CSE)',
        text: '"Three months salary unpaid; biometric roster includes visiting lecturers as full-time faculty."',
      },
      {
        caseId: 'CMP-2026-0102',
        role: 'Senior Faculty (Mech)',
        text: '"Several newly hired lecturers lack mandatory M.Tech/Ph.D qualifications required under AICTE norms."',
      },
    ],
    recommendedBatchAction:
      'Consolidate all 8 RB dockets into Master Batch INC-RB-2026-22 and issue 1 unified Show-Cause Notice + Bank PFMS Audit Directive.',
    status: 'Ready to Merge',
  },
  {
    id: 'BATCH-RB-2026-02',
    bureau: 'Regulation Bureau (RB)',
    pid: 'PID-1-20381992',
    institutionName: 'PSG Institute of Advanced Technology',
    city: 'Coimbatore, TN',
    violationCategory: 'Withholding Original Certificates & Marksheets (APH Clause 4.2)',
    canonicalClause: 'AICTE-REG-2019-CL-4.2 (Prohibition on Document Retention)',
    similarityScore: '98.1% Intra-Bureau Semantic Match',
    complaintCount: 9,
    docketIds: [
      'CMP-1002',
      'CMP-1015',
      'CMP-1018',
      'CMP-1022',
      'CMP-1029',
      'CMP-1034',
      'CMP-1041',
      'CMP-1048',
      'CMP-1055',
    ],
    sampleQuotes: [
      {
        caseId: 'CMP-1002',
        role: 'Final Year B.E. (CS)',
        text: '"College is refusing to return original 10th, 12th marksheets and degree unless extra hostel dues are paid."',
      },
      {
        caseId: 'CMP-1015',
        role: 'Final Year B.E. (ECE)',
        text: '"Registrar office holding my original Transfer Certificate and degree certificate over disputed mess charges."',
      },
    ],
    recommendedBatchAction:
      'Cluster all 9 student complaints into Master Incident INC-2026-09; issue 1 combined 24h Document Release Order to Principal.',
    status: 'Merged into Master Batch',
  },
  {
    id: 'BATCH-RB-2026-03',
    bureau: 'Regulation Bureau (RB)',
    pid: 'PID-1-20381992',
    institutionName: 'PSG Institute of Advanced Technology',
    city: 'Coimbatore, TN',
    violationCategory: 'Mechanical Workshop CNC Lab & Safety Equipment Deficiency',
    canonicalClause: 'AICTE-APH-APPENDIX-4 (Mandatory Lab Equipment Norms)',
    similarityScore: '92.4% Intra-Bureau Semantic Match',
    complaintCount: 5,
    docketIds: ['CMP-1009', 'CMP-1061', 'CMP-1064', 'CMP-1068', 'CMP-1072'],
    sampleQuotes: [
      {
        caseId: 'CMP-1009',
        role: '3rd Year B.E. (Mech)',
        text: '"Four CNC machines in our mechanical lab have been out of order for two months; practicals stalled."',
      },
      {
        caseId: 'CMP-1061',
        role: '3rd Year Batch Rep',
        text: '"Workshop lathes uncalibrated and safety guards missing ahead of semester practical exams."',
      },
    ],
    recommendedBatchAction:
      'Group 5 lab norm complaints into a single Technical EVC Desk Audit (Keep separate from Certificate Retention batch).',
    status: 'Ready to Merge',
  },
];

export const RB_WORKLOAD_STATS = {
  solvedDisposed: 89,
  underProcessShowCause: 18,
  inspectedEvc: 12,
  pendingIntake: 4,
  transferredProperly: 3,
  dismissedNonViolation: 5,
  categoryBreakdown: [
    {
      label: 'Certificate Retention (APH Clause 4.2)',
      count: 29,
      pct: 38,
      color: 'bg-red-600',
      badge: 'Critical Priority',
    },
    {
      label: 'Infrastructure & Lab Equipment Gaps (APH App. 4)',
      count: 22,
      pct: 29,
      color: 'bg-amber-500',
      badge: 'EVC Verification',
    },
    {
      label: 'Faculty Qualification & 7th CPC Salary Norms',
      count: 19,
      pct: 25,
      color: 'bg-blue-600',
      badge: '400% Regional Spike',
    },
    {
      label: 'Sanctioned Intake & Capitation Norm Audits',
      count: 6,
      pct: 8,
      color: 'bg-purple-600',
      badge: 'Joint AB-RB Audit',
    },
  ],
  internalCells: [
    {
      officer: 'Dr. S. Menon (Director · RB Lead)',
      unit: 'APH Clause 4.2 & Statutory Show-Cause Cell',
      activeDockets: 7,
      disposedMonth: 34,
      avgVelocity: '9.4 Working Days',
      loadStatus: 'High Load (2 Incoming Handovers)',
    },
    {
      officer: 'Dr. K. Deshmukh (Deputy Director · RB)',
      unit: 'Laboratory & Technical Infrastructure Norms (Appendix 4)',
      activeDockets: 5,
      disposedMonth: 28,
      avgVelocity: '11.2 Working Days',
      loadStatus: 'Balanced',
    },
    {
      officer: 'Prof. A. R. Nair (Senior Vigilance Officer · RB)',
      unit: 'Faculty Cadre Ratio & 7th CPC Pay-Scale Cell',
      activeDockets: 6,
      disposedMonth: 19,
      avgVelocity: '13.1 Working Days',
      loadStatus: 'Spike Alert (Southern Region)',
    },
    {
      officer: 'Joint RB-SRO EVC Inspection Coordination Desk',
      unit: 'On-Site & Digital Evidence Passport Verification',
      activeDockets: 4,
      disposedMonth: 8,
      avgVelocity: '7.5 Working Days',
      loadStatus: '3 Duplicate Visits Canceled',
    },
  ],
};

export const INITIAL_COMMITTEE_LOGS: CommitteeMeetingLog[] = [
  {
    id: 'MTG-2026-101',
    caseId: 'CMP-2026-0114 / CMP-1002',
    institutionName: 'Lakshmi College of Engineering & PSG Tech',
    pid: 'PID-1-50821900',
    meetingTitle: 'Standing Hearing Committee - Document Retention & Faculty Norms Review',
    date: 'Oct 16, 2026 - 15:00 IST',
    chairperson: 'Justice (Retd.) R. Mahadevan - AICTE Standing Appellate Committee',
    attendees: [
      'Dr. S. Menon (Regulation Bureau)',
      'Officer M. Khanna (PGRC)',
      'Registrar Representative',
    ],
    audioDuration: '42m 18s (Audio Transcript Processed)',
    keyPoint1:
      'Institution admits delay in document return due to "administrative backlog" during October counselling round.',
    keyPoint2:
      'Committee requested digital evidence of fee clearance and faculty qualification roster by Oct 20th.',
    resolution:
      'Provisional warning issued; physical EVC inspection bypassed to save INR 45,000 & 14 officer hours by reusing verified digital Evidence Passport.',
    fullTranscript: `[00:01:12] CHAIRPERSON: We are reviewing linked dockets regarding original certificate retention and faculty qualification norms.\n[00:04:45] REGISTRAR: Sir, the delay in returning marksheets was due to an administrative backlog in the accounts section, not intentional withholding.\n[00:09:30] RB OFFICER (DR. S. MENON): Under AICTE APH norms, administrative backlog is not a valid ground to hold original certificates past 24 hours when a student has a PSU joining deadline.\n[00:18:10] COMMITTEE RESOLUTION: Directing institution to upload digital handover receipts by Oct 20th; physical EVC campus visit bypassed as documentary admission is on record.`,
    policyReviewFlagged: true,
  },
  {
    id: 'MTG-2026-102',
    caseId: 'CMP-2003 / CMP-1004',
    institutionName: 'SRM Institute of Science & Technology',
    pid: 'PID-1-40112333',
    meetingTitle: 'Joint RB-PGRC Fee Refund Reconciliation Hearing (Master Incident INC-2026-14)',
    date: 'Oct 22, 2026 - 11:30 IST',
    chairperson: 'Prof. V. K. Saraswat - Regional Grievance Oversight Chair',
    attendees: ['Officer S. Sharma (RB)', 'Officer M. Khanna (PGRC)', 'Finance Controller (SRM)'],
    audioDuration: '31m 05s (Audio Transcript Processed)',
    keyPoint1:
      'Institution claimed ticket CMP-1004 was Disposed, but Student Resolution Receipt proved only INR 85,000 of INR 1,40,000 was refunded.',
    keyPoint2:
      'Committee rejected unauthorized INR 54,000 hostel/mess deduction for students who withdrew before session commencement.',
    resolution:
      'Directed Finance Officer to issue supplementary NEFT UTR for remaining INR 54,000 within 72 hours; administrative file kept under Remedy Watch.',
    fullTranscript: `[00:02:05] PGRC OFFICER: The institution marked CMP-1004 as Disposed on Oct 20, yet the student's Resolution Receipt shows a shortfall of INR 54,000.\n[00:07:19] FINANCE CONTROLLER: We deducted pro-rata hostel booking and mess advance charges.\n[00:12:40] CHAIRPERSON: AICTE Refund Policy strictly limits processing deductions to INR 1,000 before session start. Issue balance INR 54,000 refund immediately and upload individual UTR proof.`,
    policyReviewFlagged: false,
  },
  {
    id: 'MTG-2026-103',
    caseId: 'CMP-2026-0102 / CMP-2026-0108 / CMP-2026-0119',
    institutionName: 'Lakshmi College of Engineering',
    pid: 'PID-1-50821900',
    meetingTitle:
      'Standing Hearing Committee - Mandatory EVC & Faculty Cadre Compliance Directive',
    date: 'Oct 23, 2026 - 16:15 IST',
    chairperson: 'Justice (Retd.) R. Mahadevan - AICTE Standing Appellate Committee',
    attendees: [
      'Dr. S. Menon (Regulation Bureau)',
      'Dr. V. Subramanian (SRO Chennai)',
      'Principal (Lakshmi College of Engineering)',
    ],
    audioDuration: '38m 40s (Audio Transcript Processed)',
    keyPoint1:
      'Biometric attendance audit confirmed 14% shortfall in Ph.D./M.Tech qualified cadre faculty in CSE & ECE departments.',
    keyPoint2:
      'Institution failed to produce PFMS/NEFT salary disbursement proof for Aug-Oct 2026 within the 15-day statutory window.',
    resolution:
      'Directed Regulation Bureau (RB) to issue Final Show-Cause Notice under APH Chapter 7 and freeze 2027-28 EoA intake expansion until arrears are cleared.',
    fullTranscript: `[00:01:40] CHAIRPERSON: This hearing concerns 8 clustered dockets at PID-1-50821900 regarding faculty qualification norms and 3-month salary delays.\n[00:08:15] RB DIRECTOR (DR. S. MENON): Both faculty and student batches reported unqualified staff teaching core 3rd-year CSE courses. Furthermore, CMP-2026-0108 sat unaccepted for 72h during transfer from Approval Bureau.\n[00:19:50] COMMITTEE DIRECTIVE TO RB: Issue statutory Show-Cause Notice today, lock EoA renewal status to Under Scrutiny, and conduct mandatory biometric EVC verification on Oct 28.`,
    policyReviewFlagged: true,
  },
];

export const INITIAL_EVIDENCE_PASSPORTS: EvidencePassportItem[] = [
  {
    id: 'EVD-2026-401',
    title: 'Admission Withdrawal & Original Certificate Register (Batch 2022-26)',
    pid: 'PID-1-20381992',
    institutionName: 'PSG Institute of Advanced Technology',
    uploadedBy: 'Registrar Office (Collected via PGRC)',
    uploadedAt: '16 Oct 2026 - 14:20 IST',
    periodCovered: 'Academic Year 2025-26',
    sha256: '8f9a4c2e...7b31c904',
    reviewState: 'Reviewed',
    usedByBureaus: ['Public Grievance (PGRC)', 'Regulation Bureau (RB)'],
    accessLevel: 'Shared Across Linked Tasks',
  },
  {
    id: 'EVD-2026-402',
    title: 'Hostel & Mess Fee Structure Circular + Trust Bank Ledger',
    pid: 'PID-1-40112333',
    institutionName: 'SRM Institute of Science & Technology',
    uploadedBy: 'Finance Officer (Collected via RB)',
    uploadedAt: '14 Oct 2026 - 11:10 IST',
    periodCovered: 'Odd Semester 2026-27',
    sha256: '3d12e88a...920fa11b',
    reviewState: 'Disputed',
    usedByBureaus: ['Regulation Bureau (RB)', 'Public Grievance (PGRC)'],
    accessLevel: 'Shared Across Linked Tasks',
  },
  {
    id: 'EVD-2026-403',
    title: 'Student PSU Offer Letter & Document Verification Deadline Proof',
    pid: 'PID-1-20381992',
    institutionName: 'PSG Institute of Advanced Technology',
    uploadedBy: 'Complainant Ref #REF-8941-A (PII Redacted)',
    uploadedAt: '22 Oct 2026 - 09:05 IST',
    periodCovered: 'Joining Deadline: 24 Oct 2026',
    sha256: 'c77109be...4412a09d',
    reviewState: 'Reviewed',
    usedByBureaus: ['Regulation Bureau (RB)'],
    accessLevel: 'Restricted (PII Redacted)',
  },
];

export const INSTITUTION_PROFILES: Record<string, InstitutionIndicatorsProfile> = {
  'PID-1-20381992': {
    pid: 'PID-1-20381992',
    name: 'PSG Institute of Advanced Technology',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    region: 'Southern Region',
    approvalStatus: 'EoA 2026-27 Active',
    cibilIllustrativeScore: 420,
    openCasesCount: 3,
    totalCasesCount: 3,
    policyReviewRequired: true,
    inspectionSchedule: '26 Oct 2026 (Joint RB-SRO Panel)',
    reviewRecommendation:
      'Authorized Review Recommended: 9 complaints linked to Master Incident INC-2026-09 (Certificate Retention). Recommend joint RB-PGRC verification prior to EoA 2027-28 renewal.',
    indicators: {
      unverifiedAllegations: 3,
      substantiatedFindings: 6,
      recurringEstablishedIssues: 2,
      overdueRemedialActions: 1,
      responseQuality: 'Partial (Uploaded Register; 2 Deadlines Missed)',
    },
    consolidatedRequests: [
      {
        requestId: 'REQ-901',
        documentRequested: 'Original Degree & TC Return Acknowledgement Log (9 Complainants)',
        bureausSharing: ['Regulation Bureau (RB)', 'Public Grievance (PGRC)'],
        dueDate: '2026-10-26 (Unified Deadline)',
        status: 'Single Shared Request Issued (Replaced 2 Conflicting Notices)',
      },
    ],
  },
  'PID-1-50821900': {
    pid: 'PID-1-50821900',
    name: 'Lakshmi College of Engineering',
    city: 'Madurai',
    state: 'Tamil Nadu',
    region: 'Southern Region',
    approvalStatus: 'EoA 2026-27 Under Scrutiny',
    cibilIllustrativeScore: 340,
    openCasesCount: 2,
    totalCasesCount: 2,
    policyReviewRequired: true,
    inspectionSchedule: '28 Oct 2026 (Mandatory Show-Cause EVC)',
    reviewRecommendation:
      'Urgent Escalation: Case CMP-2026-0108 was unaccepted for 72h after transfer & 33 days beyond timeline.',
    indicators: {
      unverifiedAllegations: 2,
      substantiatedFindings: 5,
      recurringEstablishedIssues: 4,
      overdueRemedialActions: 3,
      responseQuality: 'Delayed (33 Days Overdue on Faculty Norms Docket)',
    },
    consolidatedRequests: [
      {
        requestId: 'REQ-912',
        documentRequested: 'AICTE Biometric Faculty Attendance & Qualification Roster',
        bureausSharing: ['Regulation Bureau (RB)', 'Public Grievance (PGRC)'],
        dueDate: '2026-10-25',
        status: 'Overdue - Escalated to Standing Hearing Committee',
      },
    ],
  },
  'PID-1-40112333': {
    pid: 'PID-1-40112333',
    name: 'SRM Institute of Science & Technology',
    city: 'Kattankulathur',
    state: 'Tamil Nadu',
    region: 'Southern Region',
    approvalStatus: 'EoA 2026-27 Active',
    cibilIllustrativeScore: 385,
    openCasesCount: 2,
    totalCasesCount: 2,
    policyReviewRequired: true,
    inspectionSchedule: '30 Oct 2026 (Fee Ledger Audit)',
    reviewRecommendation:
      'Authorized Review Recommended: Disputed Resolution Receipt on CMP-2003 / CMP-1004 (Partial refund reported by students despite institution disposal claim).',
    indicators: {
      unverifiedAllegations: 4,
      substantiatedFindings: 8,
      recurringEstablishedIssues: 3,
      overdueRemedialActions: 2,
      responseQuality: 'Disputed (Complainants Contested Refund Proof)',
    },
    consolidatedRequests: [
      {
        requestId: 'REQ-904',
        documentRequested: 'Individual NEFT/RTGS Refund UTR Numbers for 9 Linked Complainants',
        bureausSharing: ['Public Grievance (PGRC)', 'Regulation Bureau (RB)'],
        dueDate: '2026-10-25',
        status: 'Awaiting UTR Reconciliation',
      },
    ],
  },
  'PID-1-30911221': {
    pid: 'PID-1-30911221',
    name: 'VIT Chennai Campus',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'Southern Region',
    approvalStatus: 'EoA 2026-27 Active',
    cibilIllustrativeScore: 865,
    openCasesCount: 1,
    totalCasesCount: 2,
    policyReviewRequired: false,
    inspectionSchedule: 'No Inspection Required (100% Verified)',
    reviewRecommendation:
      'No Special Intervention Needed: 100% Remedy Confirmation Rate by students over the past 2 academic sessions.',
    indicators: {
      unverifiedAllegations: 0,
      substantiatedFindings: 0,
      recurringEstablishedIssues: 0,
      overdueRemedialActions: 0,
      responseQuality: 'Verified High (Student Receipt Confirmed)',
    },
    consolidatedRequests: [],
  },
};

export const INITIAL_COMPLAINTS: ComplaintDocket[] = [
  {
    id: 'CMP-1002',
    masterIncidentId: 'INC-2026-09 (9 Linked Cases)',
    complainantRef: 'REF-8941-A (Identity Protected)',
    unmaskedIdentity: {
      name: 'Arjun Subramanian (Roll: 22CS048)',
      program: 'B.E. Computer Science (Final Year)',
      contact: '+91-98401-XXXXX',
      email: 'arjun.s@student.edu',
      narrativeRiskWarning:
        'Narrative mentions specific PSU offer roll number; keep identity masked in routine cross-bureau views.',
    },
    category: 'Retention of Original Certificates (APH Clause 4.2)',
    institutionName: 'PSG Institute of Advanced Technology',
    pid: 'PID-1-20381992',
    city: 'Coimbatore, TN',
    region: 'Southern Region',
    bureau: 'Regulation Bureau (RB)',
    caseDomain: 'BOTH',
    predictiveSlaBreach48h: true,
    riskLevel: 'High',
    aiClassification: 'True Complaint (Actionable)',
    infoSufficiency: {
      isSufficient: true,
      studentEmailCollected: 'arjun.s@student.edu',
    },
    ownerWatchdog: {
      isUnclaimedOrDelayed: false,
      unacceptedHours: 1,
      recommendedOwnerBureau: 'Regulation Bureau (RB)',
      recommendedOfficer: 'Dr. S. Menon (RB Lead)',
      acceptedByOwner: true,
      watchdogReason:
        'Owner verified and accepted within 1 hour due to 24h external job-joining deadline.',
    },
    specialPolicyFlag: true,
    supportingDocs: [
      { name: 'Complaint_CMP-1002_PSU_Offer.pdf', size: '240 KB', type: 'PDF' },
      { name: 'Hostel_NoDues_Rejection_Slip.zip', size: '1.1 MB', type: 'ZIP' },
    ],
    leadCoordinator: 'Dr. S. Menon (RB Lead - PGRC Shared Task)',
    status: 'Under Process',
    remedyState: 'Remedy Awaiting Verification',
    remedyDetails: {
      promisedRemedy:
        'Return Original 10th, 12th Marksheets, B.E. Provisional & Transfer Certificate',
      institutionProof: 'Awaiting signed student handover receipt (Unified Due Date: 26 Oct 2026)',
      studentResponse: 'Pending return of documents before PSU joining deadline tomorrow',
    },
    relationshipType: 'Shared Incident (Link & Coordinate)',
    relationshipExplanation: {
      suggestedLinkTarget:
        'Master Incident INC-2026-09 (Links 9 of 12 complaints at PID-1-20381992; keeps 2 from AY 2024-25 and 1 Lab complaint separate)',
      matchingFacts: [
        'Same Permanent ID (PID-1-20381992) & same Oct 2026 admission-withdrawal window',
        'Both PGRC (CMP-2003) and RB (CMP-1002) allege retention of original marksheets against fee demand',
      ],
      conflictingOrDistinctFacts: [
        'Kept separate from CMP-1009 (Lab CNC shortage at same college - unrelated issue)',
        'Kept separate from 2 alumni complaints from 2024 batch (Related Pattern, different year)',
      ],
      similarityBand: 'High Semantic & Fact Overlap (Illustrative Prototype Match)',
      officerDecision: 'Approved Link',
    },
    conflictRadar: {
      hasConflict: true,
      conflictType: 'Colliding Document Requests & Dual EVC Visit Scheduled',
      bureauAInstruction:
        'Regulation Bureau (RB): Demanded Original Certificate Register by 28 Oct + nominated EVC team.',
      bureauBInstruction:
        'Public Grievance Cell (PGRC): Demanded same Certificate Register by 25 Oct under separate Show-Cause.',
      suggestedCoordinationStep:
        'Issue 1 Consolidated Evidence Request (EVD-2026-401) with unified 26 Oct deadline & combine EVC verification scope.',
    },
    deadlineRescue: {
      hasUrgentHarm: true,
      timeToHarmLabel: 'PREDICTIVE SLA / HARM BREACH (<24h)',
      externalDeadlineDate: '24 Oct 2026 - 17:00 IST',
      consequenceIfMissed:
        'Complainant loses PSU Graduate Engineer Trainee offer if original certificates are not produced at verification.',
      supportingEvidence: 'Verified PSU Appointment Letter (Passport EVD-2026-403)',
      interimAction:
        'Issue Immediate Provisional Directive to Registrar to release originals within 24h while fee dispute is adjudicated.',
    },
    policyClock: {
      policyName: 'AICTE / UGC Student Grievance Redressal Regulations, 2019 (Clause 8)',
      policyVersion: 'SGRR-2019-v1.2',
      basis: 'Working Days',
      prescribedDays: 15,
      elapsedDays: 14,
      dueDate: '2026-10-26 (<48h Remaining)',
      riskEstimateSummary:
        'Predictive SLA Breach within 48 hours based on historical bureau processing times; prioritized in Deadline Rescue Queue.',
      highRiskFlag: true,
    },
    regulatoryEvidenceCard: {
      studentOriginalWording:
        '"The college is blackmailing me and refusing to return my original 10th, 12th marksheets and degree unless I pay extra hostel dues! My PSU joining is tomorrow!"',
      extractedAllegation:
        'Institution is retaining original academic certificates and marksheets as leverage for disputed fee recovery.',
      suggestedCategory: 'Document Retention / Withholding Certificates',
      candidateProvision:
        'AICTE Approval Process Handbook & Student Grievance Redressal Framework - Prohibition on Retention of Original Certificates',
      sourceDocumentTitle: 'AICTE Approval Process Handbook (2024-27 Consolidated Norms)',
      sourceExcerpt:
        '"Institutions shall not retain original certificates, marksheets, or testimonials of any student at the time of admission or thereafter under any circumstances..."',
      missingFactsToVerify: [
        'Confirm whether student completed formal no-dues clearance for library/lab equipment',
        'Verify exact date of written request submitted to Principal',
      ],
      officerVerificationState: 'Verified Applicable',
    },
    auditHistory: [
      {
        timestamp: '21 Oct 2026 - 10:15 IST',
        actor: 'Complainant Ref #REF-8941-A',
        bureau: 'Centralized Portal (PII Shield Active)',
        eventType: 'Complaint Registered (Identity Redacted)',
        note: 'Filed complaint with PSU joining offer proof. Personal contact masked under Confidentiality Shield.',
        expandedDetails: {
          routingRule: 'Intake Rule v2.4 (Auto-PII Masking & Urgency Scan)',
          officerSessionId: 'PORTAL-INTAKE-8941A',
          slaSnapshot: 'Day 0 of 15 Working Days (External 24h Harm Flagged)',
          handoverStatus: 'Routed to RB Lead Coordinator',
          attachedFiles: [{ name: 'Complaint_CMP-1002_PSU_Offer.pdf', size: '240 KB' }],
        },
      },
      {
        timestamp: '21 Oct 2026 - 10:16 IST',
        actor: 'Relationship Classifier',
        bureau: 'Coordination Engine',
        eventType: 'Classified as Shared Incident (9 of 12 Cases)',
        note: 'Suggested linking with CMP-2003 (PGRC) under Master Incident INC-2026-09. Explicitly excluded CMP-1009 (Lab issue at same PID) from link.',
        isCoordinationEvent: true,
        expandedDetails: {
          routingRule: 'Semantic & PID Fact Linker v1.8',
          officerSessionId: 'SYS-COORD-INC202609',
          slaSnapshot: 'Day 0 of 15 Working Days',
          handoverStatus: 'Joint RB + PGRC Workspace Linked',
        },
      },
      {
        timestamp: '22 Oct 2026 - 11:30 IST',
        actor: 'Conflict Radar',
        bureau: 'Cross-Bureau Coordinator',
        eventType: 'Action Collision Flagged (RB vs. PGRC)',
        note: 'Detected duplicate requests for Certificate Register with conflicting deadlines (25 Oct vs 28 Oct) and overlapping EVC visit proposals.',
        isCoordinationEvent: true,
        expandedDetails: {
          routingRule: 'Directive Collision Detector v1.2',
          officerSessionId: 'RADAR-ALERT-772',
          slaSnapshot: 'Day 14 of 15 Working Days',
          handoverStatus: 'Awaiting Coordinator Single-Directive Approval',
        },
      },
    ],
  },
  {
    id: 'CMP-2026-0108',
    masterIncidentId: 'INC-2026-19 (Faculty & Document Norms)',
    complainantRef: 'REF-5082-F (Identity Protected)',
    unmaskedIdentity: {
      name: 'Raghavendra S. (Roll: 23EE014)',
      program: 'B.E. Electrical & Electronics',
      contact: '+91-94421-XXXXX',
      email: 'raghav.eee@student.edu',
    },
    category: 'Faculty Qualification Norms & Unaccepted Transfer',
    institutionName: 'Lakshmi College of Engineering',
    pid: 'PID-1-50821900',
    city: 'Madurai, TN',
    region: 'Southern Region',
    bureau: 'Regulation Bureau (RB)',
    caseDomain: 'REGULATORY_NORMS',
    predictiveSlaBreach48h: true,
    riskLevel: 'High',
    aiClassification: 'True Complaint (Actionable)',
    infoSufficiency: {
      isSufficient: false,
      missingInfoPrompt:
        'Missing exact date of original diploma certificate submission and student alternate email for interim relief copy.',
      followUpSent: false,
    },
    ownerWatchdog: {
      isUnclaimedOrDelayed: true,
      unacceptedHours: 72,
      recommendedOwnerBureau: 'Regulation Bureau (RB)',
      recommendedOfficer: 'Dr. S. Menon (Regulation Bureau)',
      acceptedByOwner: false,
      watchdogReason:
        '"The student does not know which bureau handles document retention. The system gathers the facts, recommends Regulation Bureau (RB) as the owner, and checks that the owner actually accepts the case."',
    },
    specialPolicyFlag: true,
    supportingDocs: [
      { name: 'Complaint_CMP-2026-0108.pdf', size: '220 KB', type: 'PDF' },
      { name: 'Supporting_evidence.zip', size: '1.4 MB', type: 'ZIP' },
    ],
    leadCoordinator: 'UNCLAIMED (Pending Acceptance for 72h)',
    status: 'Transferred',
    remedyState: 'Remedy Awaiting Verification',
    remedyDetails: {
      promisedRemedy: 'Assign accountable bureau owner and verify faculty cadre norms',
      institutionProof: 'No response requested yet - case stuck in unaccepted transfer state',
      studentResponse:
        'Student waiting for an officer to accept ownership of the transferred docket',
    },
    relationshipType: 'Shared Incident (Link & Coordinate)',
    relationshipExplanation: {
      suggestedLinkTarget:
        'Linked with CMP-2026-0102 & CMP-2026-0114 at Lakshmi College of Engineering',
      matchingFacts: [
        'Same Institution PID-1-50821900 undergoing regulatory scrutiny',
        'Student misrouted filing to Approval Bureau; AI Routing recommends Regulation Bureau (RB)',
      ],
      conflictingOrDistinctFacts: [
        'Case was transferred 72 hours ago without receiving officer acceptance',
      ],
      similarityBand: 'Ownerless Watchdog Alert - Routing Recommendation Ready',
      officerDecision: 'Pending Officer Review',
    },
    conflictRadar: {
      hasConflict: true,
      conflictType: 'Ownerless Case Warning (Unaccepted for 72 Hours)',
      bureauAInstruction:
        'Approval Bureau (AB): Transferred docket out stating document retention falls outside EoA infrastructure scope.',
      bureauBInstruction:
        'Regulation Bureau (RB): Docket sitting in incoming transfer queue for 72 hours without officer acceptance.',
      suggestedCoordinationStep:
        'Enforce "No Ownerless Case" rule: Force-assign to Dr. S. Menon (RB) with preserved 33-day elapsed SLA clock.',
    },
    policyClock: {
      policyName: 'AICTE Student Grievance Redressal Regulations (Ownerless Watchdog Active)',
      policyVersion: 'SGRR-2019-Watchdog',
      basis: 'Working Days',
      prescribedDays: 15,
      elapsedDays: 33,
      dueDate: 'OVERDUE (+18 Days Past Timeline)',
      transferNote:
        'WARNING: Transferred to Approval Bureau but not accepted for 72 hours. Elapsed clock (33 days) preserved.',
      riskEstimateSummary:
        'Case is 33 days beyond the prescribed timeline and unaccepted for 72 hours.',
      highRiskFlag: true,
    },
    regulatoryEvidenceCard: {
      studentOriginalWording:
        '"I submitted my complaint about my original diploma certificate and unqualified faculty at Lakshmi College, but my case keeps getting passed between departments with no officer accepting it!"',
      extractedAllegation:
        'Unlawful retention of original diploma certificate and faculty norm deficiency compounded by transfer delay.',
      suggestedCategory: 'Document Retention / Ownerless Transfer Escalation',
      candidateProvision: 'AICTE APH Chapter 7 & Citizens Charter - Mandatory Single-Window Ownership',
      sourceDocumentTitle: 'AICTE Citizens Charter & Grievance Redressal Protocol',
      sourceExcerpt:
        '"No grievance shall remain unassigned or unaccepted across bureaus for more than 24 hours; the originating bureau retains accountability until the receiving officer formally accepts handover."',
      missingFactsToVerify: [
        'Collect student email & diploma roll number via AI Follow-Up Question',
        'Confirm RB Officer acceptance in Watchdog log',
      ],
      officerVerificationState: 'Pending Officer Verification',
    },
    auditHistory: [
      {
        timestamp: '20 Sept 2026 - 09:30 IST',
        actor: 'Complainant Ref #REF-5082-F',
        bureau: 'Complaints Desk',
        eventType: 'Complaint Registered',
        note: 'Registered by student; student selected Approval Bureau by mistake.',
        expandedDetails: {
          routingRule: 'Portal Public Intake v1.2',
          officerSessionId: 'DESK-2026-0108',
          slaSnapshot: 'Day 0 of 15 Working Days',
          handoverStatus: 'Initial Filing Logged',
          attachedFiles: [{ name: 'Complaint_CMP-2026-0108.pdf', size: '220 KB' }],
        },
      },
      {
        timestamp: '21 Oct 2026 - 11:00 IST',
        actor: 'Ownerless Case Watchdog',
        bureau: 'Approval Bureau -> Regulation Bureau',
        eventType: 'OWNERLESS CASE WARNING (Unaccepted for 72 Hours)',
        note: 'The student does not know which bureau handles document retention. The system gathered the facts, recommends Regulation Bureau (RB) as the owner, and checks that the owner actually accepts the case.',
        isCoordinationEvent: true,
        expandedDetails: {
          routingRule: 'Routing Rule v1.2 (Anti-Orphan Handover Protocol)',
          officerSessionId: 'WATCHDOG-72H-ALERT',
          slaSnapshot: '33 Days Elapsed (Overdue)',
          handoverStatus: 'UNACCEPTED FOR 72 HOURS - Force Assignment Recommended',
          attachedFiles: [{ name: 'Supporting_evidence.zip', size: '1.4 MB' }],
        },
      },
    ],
  },
  {
    id: 'CMP-2003',
    masterIncidentId: 'INC-2026-14 (9 Linked Cases)',
    complainantRef: 'REF-4011-B (Identity Protected)',
    unmaskedIdentity: {
      name: 'Priya Darshini K. (Roll: 25EC112)',
      program: 'B.Tech Electronics (1st Year Withdrawal)',
      contact: '+91-94432-XXXXX',
      email: 'priya.k@student.edu',
    },
    category: 'Admission Cancellation Fee Refund & Certificate Petition',
    institutionName: 'SRM Institute of Science & Technology',
    pid: 'PID-1-40112333',
    city: 'Kattankulathur, TN',
    region: 'Southern Region',
    bureau: 'Public Grievance (PGRC)',
    caseDomain: 'PETITION_GRIEVANCE',
    predictiveSlaBreach48h: true,
    riskLevel: 'High',
    aiClassification: 'True Complaint (Actionable)',
    infoSufficiency: {
      isSufficient: false,
      missingInfoPrompt:
        'Need student bank account cancelled cheque / UTR screenshot via email to reconcile the INR 54,000 shortfall.',
      followUpSent: false,
    },
    ownerWatchdog: {
      isUnclaimedOrDelayed: false,
      unacceptedHours: 2,
      recommendedOwnerBureau: 'Public Grievance (PGRC)',
      recommendedOfficer: 'Officer M. Khanna',
      acceptedByOwner: true,
      watchdogReason: 'Accepted by PGRC Lead Officer M. Khanna.',
    },
    specialPolicyFlag: true,
    supportingDocs: [{ name: 'Fee_Receipt_And_Partial_UTR.pdf', size: '310 KB', type: 'PDF' }],
    leadCoordinator: 'Officer M. Khanna (PGRC Lead)',
    status: 'Disposed',
    remedyState: 'Received Partially - Outcome Disputed',
    remedyDetails: {
      promisedRemedy: 'Full refund of INR 1,40,000 tuition fee (minus INR 1,000 processing fee)',
      institutionProof: 'Institution marked completed on 20 Oct; uploaded bulk payment advice.',
      studentResponse:
        'Complainant Response (22 Oct): "Received Partially - Only INR 85,000 credited; INR 54,000 unlawfully deducted as hostel/mess charges."',
      disputeNote:
        'Administrative status is Disposed, but Resolution Receipt is DISPUTED. Follow-up reconciliation task automatically opened.',
    },
    relationshipType: 'Shared Incident (Link & Coordinate)',
    relationshipExplanation: {
      suggestedLinkTarget: 'Master Incident INC-2026-14 (Counselling Withdrawal Batch 2026)',
      matchingFacts: [
        '9 students withdrew before AICTE last date of cancellation and allege INR 54,000 deduction',
      ],
      conflictingOrDistinctFacts: [
        'Each student has a distinct payment UTR and refund amount requiring individual Resolution Receipt verification',
      ],
      similarityBand: 'Shared Institutional Practice (Individual Remedy Tracked)',
      officerDecision: 'Approved Link',
    },
    conflictRadar: {
      hasConflict: true,
      conflictType: 'Premature Closure While Partner Bureau Has Open Dispute',
      bureauAInstruction: 'PGRC marked file Disposed based on Institution bulk compliance letter.',
      bureauBInstruction:
        'Regulation Bureau (RB) still holds open disputed evidence (EVD-2026-402) showing INR 54,000 unapproved deduction.',
      suggestedCoordinationStep:
        'Keep administrative history intact, flag Resolution Receipt as Disputed, and assign RB-PGRC joint UTR reconciliation task.',
    },
    policyClock: {
      policyName: 'DARPG CPGRAMS Public Grievance Redressal Guidelines (21-Day Clock)',
      policyVersion: 'DARPG-2024-Circular',
      basis: 'Calendar Days',
      prescribedDays: 21,
      elapsedDays: 20,
      dueDate: '2026-10-25 (<48h SLA Breach Warning)',
      riskEstimateSummary:
        'Predictive SLA Breach <48h: Student Resolution Receipt triggered an active reconciliation deadline.',
      highRiskFlag: true,
    },
    regulatoryEvidenceCard: {
      studentOriginalWording:
        '"They closed my ticket saying refund is done, but they only sent INR 85,000 and kept INR 54,000 of my parents\' money!"',
      extractedAllegation:
        'Partial fee refund upon admission withdrawal prior to cutoff; unauthorized deduction of hostel/ancillary fees.',
      suggestedCategory: 'Fee Refund Reconciliation / Disputed Disposal',
      candidateProvision:
        'AICTE Refund Policy Guidelines - Full Refund Before Commencement of Session',
      sourceDocumentTitle: 'AICTE Academic Calendar & Fee Refund Policy Notification',
      sourceExcerpt:
        '"In the event of a student withdrawing before the starting of the course, the entire fee collected from the student, after a deduction of the processing fee of not more than INR 1,000, shall be refunded..."',
      missingFactsToVerify: [
        'Verify date of withdrawal application against official AICTE cutoff date',
        'Reconcile bank UTR amount (INR 85,000) against receipt amount (INR 1,40,000)',
      ],
      officerVerificationState: 'Verified Applicable',
    },
    auditHistory: [
      {
        timestamp: '04 Oct 2026 - 09:12 IST',
        actor: 'Complainant Ref #REF-4011-B',
        bureau: 'PGRC Portal',
        eventType: 'Complaint Registered (21-Day DARPG Clock Started)',
        note: 'Student requested INR 1,40,000 refund following admission withdrawal.',
        expandedDetails: {
          routingRule: 'Routing Rule v1.2 (Fee Refund Auto-Categorizer)',
          officerSessionId: 'PGRC-2026-2003',
          slaSnapshot: 'Day 0 of 21 Calendar Days',
          handoverStatus: 'Assigned to Officer M. Khanna (PGRC)',
        },
      },
      {
        timestamp: '20 Oct 2026 - 16:00 IST',
        actor: 'Officer M. Khanna',
        bureau: 'Public Grievance (PGRC)',
        eventType: 'Status Changed to Disposed (Institution Reported Completion)',
        note: 'Institution uploaded compliance letter stating refund processed.',
        expandedDetails: {
          routingRule: 'Standard Disposal Workflow v1.0',
          officerSessionId: 'MKHANNA-PGRC-88',
          slaSnapshot: 'Day 16 of 21 Calendar Days',
          handoverStatus: 'Triggered Automated Student Resolution Receipt Check',
        },
      },
      {
        timestamp: '22 Oct 2026 - 10:30 IST',
        actor: 'Resolution Receipt Engine (Complainant Feedback)',
        bureau: 'Remedy Verification Layer',
        eventType: 'OUTCOME DISPUTED BY STUDENT (Partial Refund Only)',
        note: 'Student confirmed receiving only INR 85,000 (INR 54,000 short). Dashboard prevented silent closure and opened Follow-Up Verification Task.',
        isCoordinationEvent: true,
        expandedDetails: {
          routingRule: 'Remedy Verification Protocol v2.0',
          officerSessionId: 'RECEIPT-DISPUTE-2003',
          slaSnapshot: 'Day 20 of 21 Calendar Days (<48h SLA Breach Warning)',
          handoverStatus: 'Escalated to Joint RB-PGRC Hearing Committee',
          attachedFiles: [{ name: 'Fee_Receipt_And_Partial_UTR.pdf', size: '310 KB' }],
        },
      },
    ],
  },
  {
    id: 'CMP-1009',
    complainantRef: 'REF-2038-C (Identity Protected)',
    unmaskedIdentity: {
      name: 'Karthik V. (Roll: 23ME019)',
      program: 'B.E. Mechanical Engineering (3rd Year)',
      contact: '+91-98940-XXXXX',
      email: 'karthik.v@student.edu',
    },
    category: 'Laboratory Equipment & Safety Norms (APH Appendix 4)',
    institutionName: 'PSG Institute of Advanced Technology',
    pid: 'PID-1-20381992',
    city: 'Coimbatore, TN',
    region: 'Southern Region',
    bureau: 'Regulation Bureau (RB)',
    caseDomain: 'REGULATORY_NORMS',
    predictiveSlaBreach48h: false,
    riskLevel: 'Medium',
    aiClassification: 'Improvement / Suggestion',
    infoSufficiency: {
      isSufficient: true,
      studentEmailCollected: 'karthik.v@student.edu',
    },
    ownerWatchdog: {
      isUnclaimedOrDelayed: false,
      unacceptedHours: 4,
      recommendedOwnerBureau: 'Regulation Bureau (RB)',
      recommendedOfficer: 'Dr. K. Deshmukh',
      acceptedByOwner: true,
      watchdogReason:
        'Properly transferred from PGRC with full handover details and accepted in 4 hours.',
    },
    specialPolicyFlag: false,
    supportingDocs: [{ name: 'Workshop_CNC_Calibration_Log.pdf', size: '410 KB', type: 'PDF' }],
    leadCoordinator: 'Dr. K. Deshmukh (Technical Norms)',
    status: 'Transferred',
    remedyState: 'Institution Reports Completion',
    remedyDetails: {
      promisedRemedy: 'Calibration & replacement of 4 CNC lathe units in Mechanical Workshop',
      institutionProof: 'Uploaded vendor calibration certificate & purchase invoice.',
      studentResponse: 'Awaiting student class representative confirmation poll',
    },
    relationshipType: 'Same Institution Only (Keep Separate)',
    relationshipExplanation: {
      suggestedLinkTarget: 'DO NOT LINK to INC-2026-09 (Certificate Retention Incident)',
      matchingFacts: ['Shares AICTE Permanent ID (PID-1-20381992) with CMP-1002'],
      conflictingOrDistinctFacts: [
        'Concerns Mechanical Workshop CNC equipment, not admission withdrawal or certificate retention',
        'Requires technical EVC assessment rather than Registrar document release',
      ],
      similarityBand: 'Low Fact Overlap (Same PID Only - Kept Separate)',
      officerDecision: 'Kept Separate',
    },
    policyClock: {
      policyName: 'AICTE Approval Process Handbook - Technical Deficiency Review Clock',
      policyVersion: 'APH-2024-27-Ch7',
      basis: 'Working Days',
      prescribedDays: 15,
      elapsedDays: 11,
      dueDate: '2026-10-27',
      transferNote:
        'Transferred on Day 4 - Original 11-day elapsed clock preserved (Not reset to zero).',
      riskEstimateSummary:
        '11 of 15 working days elapsed (Preserved across transfer). Pending student remedy confirmation.',
      highRiskFlag: false,
    },
    regulatoryEvidenceCard: {
      studentOriginalWording:
        '"Four CNC machines in our mechanical lab have been out of order for two months; please upgrade lab timings and equipment."',
      extractedAllegation:
        'Non-functional core workshop machinery required for curriculum practicals.',
      suggestedCategory: 'Laboratory & Workshop Deficiency',
      candidateProvision: 'AICTE Approval Process Handbook Appendix 4 - Laboratory Equipment Norms',
      sourceDocumentTitle: 'AICTE Approval Process Handbook Appendix 4',
      sourceExcerpt:
        '"All approved institutions shall maintain working laboratory equipment matching prescribed curriculum intake norms..."',
      missingFactsToVerify: ['Verify whether alternative lab batch slots were provided'],
      officerVerificationState: 'Verified Applicable',
    },
    auditHistory: [
      {
        timestamp: '08 Oct 2026 - 11:00 IST',
        actor: 'Complainant Ref #REF-2038-C',
        bureau: 'PGRC Portal',
        eventType: 'Complaint Filed (Clock Started: Day 0)',
        note: 'Reported non-functional CNC machinery at PID-1-20381992.',
        expandedDetails: {
          routingRule: 'Routing Rule v1.2',
          officerSessionId: 'PGRC-1009-INIT',
          slaSnapshot: 'Day 0 of 15 Working Days',
          handoverStatus: 'Logged at PGRC',
        },
      },
      {
        timestamp: '12 Oct 2026 - 14:30 IST',
        actor: 'Policy-Aware Clock Engine',
        bureau: 'PGRC -> Regulation / Technical Cell',
        eventType: 'Proper Transfer With Handover Details (Day 4 Preserved)',
        note: 'Transferred with complete lab inventory checklist. Elapsed age (4 working days) carried forward transparently and accepted by Dr. K. Deshmukh.',
        isCoordinationEvent: true,
        expandedDetails: {
          routingRule: 'Anti-Orphan Transfer Protocol v2.1',
          officerSessionId: 'TRANS-PGRC-RB-402',
          slaSnapshot: 'Day 4 of 15 Working Days (Preserved)',
          handoverStatus: 'Accepted by Dr. K. Deshmukh',
        },
      },
    ],
  },
  {
    id: 'CMP-1003',
    complainantRef: 'REF-3091-D (Identity Protected)',
    unmaskedIdentity: {
      name: 'Meera Krishnan (Roll: 24AI008)',
      program: 'M.Tech Artificial Intelligence',
      contact: '+91-97890-XXXXX',
      email: 'meera.k@student.edu',
    },
    category: 'Scholarship Nodal Verification Petition',
    institutionName: 'VIT Chennai Campus',
    pid: 'PID-1-30911221',
    city: 'Chennai, TN',
    region: 'Southern Region',
    bureau: 'Public Grievance (PGRC)',
    caseDomain: 'PETITION_GRIEVANCE',
    predictiveSlaBreach48h: false,
    riskLevel: 'Low',
    aiClassification: 'General Enquiry',
    infoSufficiency: {
      isSufficient: true,
      studentEmailCollected: 'meera.k@student.edu',
    },
    ownerWatchdog: {
      isUnclaimedOrDelayed: false,
      unacceptedHours: 1,
      recommendedOwnerBureau: 'Public Grievance (PGRC)',
      recommendedOfficer: 'Officer D. Mohanty',
      acceptedByOwner: true,
      watchdogReason: 'Accepted and verified within 4 working days.',
    },
    specialPolicyFlag: false,
    supportingDocs: [
      { name: 'NSP_Scholarship_Verification_Batch.pdf', size: '185 KB', type: 'PDF' },
    ],
    leadCoordinator: 'Officer D. Mohanty (Scholarship Cell)',
    status: 'Disposed',
    remedyState: 'Complainant Confirms Receipt',
    remedyDetails: {
      promisedRemedy: 'Institute Level-1 Nodal Verification on National Scholarship Portal',
      institutionProof: 'Uploaded signed NSP verification batch certificate on 18 Oct 2026.',
      studentResponse:
        'Complainant Response (19 Oct): "Received in Full - My Pragati scholarship status is now verified on NSP portal."',
    },
    relationshipType: 'Duplicate Submission (Same Student)',
    relationshipExplanation: {
      matchingFacts: ['Student submitted reminder ticket CMP-1003-B 24 hours after initial filing'],
      conflictingOrDistinctFacts: ['Same complainant, same scholarship application ID'],
      similarityBand: 'Exact Same Complainant & Application ID',
      officerDecision: 'Approved Link',
    },
    policyClock: {
      policyName: 'AICTE Pragati & Saksham Scholarship Grievance Protocol',
      policyVersion: 'SCH-2026-v2',
      basis: 'Working Days',
      prescribedDays: 10,
      elapsedDays: 4,
      dueDate: '2026-10-22',
      riskEstimateSummary: 'Resolved and confirmed by student within 4 working days.',
      highRiskFlag: false,
    },
    regulatoryEvidenceCard: {
      studentOriginalWording:
        '"My AICTE Pragati scholarship form is stuck at institute verification stage; kindly confirm portal verification timeline."',
      extractedAllegation: 'Pending institutional nodal verification on NSP portal.',
      suggestedCategory: 'Scholarship Verification',
      candidateProvision: 'AICTE Pragati Scheme Guidelines - Institutional Nodal Officer Duties',
      sourceDocumentTitle: 'AICTE Pragati Scholarship Guidelines',
      sourceExcerpt:
        '"The host institution Nodal Officer shall verify eligible applications online within the prescribed portal window..."',
      missingFactsToVerify: ['Verified NSP Application ID'],
      officerVerificationState: 'Verified Applicable',
    },
    auditHistory: [
      {
        timestamp: '14 Oct 2026 - 10:00 IST',
        actor: 'Complainant Ref #REF-3091-D',
        bureau: 'Scholarship Cell',
        eventType: 'Complaint Logged',
        note: 'Requested urgent NSP Level-1 verification.',
        expandedDetails: {
          routingRule: 'Scholarship Desk Auto-Router v1.1',
          officerSessionId: 'SCH-1003-INIT',
          slaSnapshot: 'Day 0 of 10 Working Days',
          handoverStatus: 'Accepted by Officer D. Mohanty',
        },
      },
      {
        timestamp: '19 Oct 2026 - 11:15 IST',
        actor: 'Complainant Ref #REF-3091-D',
        bureau: 'Resolution Receipt Portal',
        eventType: 'COMPLAINANT CONFIRMED RECEIPT IN FULL',
        note: 'Student verified that NSP portal status updated to Approved. Both administrative status and Resolution Receipt closed cleanly.',
        isCoordinationEvent: true,
        expandedDetails: {
          routingRule: 'Verified Closure Protocol v2.0',
          officerSessionId: 'RECEIPT-VERIFIED-1003',
          slaSnapshot: 'Closed on Day 4 of 10 Working Days',
          handoverStatus: 'Verified & Archived',
        },
      },
    ],
  },
];

// Silent 30-second live incoming pool
export const LIVE_INCOMING_COMPLAINTS_POOL: ComplaintDocket[] = [
  {
    id: 'CMP-2026-0119',
    masterIncidentId: 'INC-2026-22 (Southern Region Salary Watch)',
    complainantRef: 'REF-6120-K (Identity Protected)',
    unmaskedIdentity: {
      name: 'Dr. Anitha Rajasekaran (Emp: ECE-402)',
      program: 'Associate Professor - ECE Dept',
      contact: '+91-98422-XXXXX',
      email: 'anitha.r@faculty.edu',
    },
    category: 'Faculty 7th CPC Salary Delays (3 Months Pending)',
    institutionName: 'Lakshmi College of Engineering',
    pid: 'PID-1-50821900',
    city: 'Madurai, TN',
    region: 'Southern Region',
    bureau: 'Regulation Bureau (RB)',
    caseDomain: 'BOTH',
    predictiveSlaBreach48h: true,
    riskLevel: 'High',
    aiClassification: 'True Complaint (Actionable)',
    infoSufficiency: {
      isSufficient: false,
      missingInfoPrompt:
        'Request last 3 months bank salary credit statement & appointment order copy from complainant email.',
      followUpSent: false,
    },
    ownerWatchdog: {
      isUnclaimedOrDelayed: true,
      unacceptedHours: 48,
      recommendedOwnerBureau: 'Regulation Bureau (RB)',
      recommendedOfficer: 'Dr. S. Menon (Regulation Bureau)',
      acceptedByOwner: false,
      watchdogReason:
        'System detected 6th salary delay complaint in Southern Region; recommends RB Pay-Scale Compliance Cell ownership.',
    },
    specialPolicyFlag: true,
    supportingDocs: [{ name: 'Faculty_Representation_Oct2026.pdf', size: '195 KB', type: 'PDF' }],
    leadCoordinator: 'Pending RB Acceptance (48h)',
    status: 'Pending',
    remedyState: 'Remedy Awaiting Verification',
    remedyDetails: {
      promisedRemedy: 'Release pending 3-month 7th CPC scale salary arrears with bank proof',
      institutionProof: 'Show-cause notice drafted under AICTE 7th CPC Pay Norms',
      studentResponse: 'Awaiting salary disbursement confirmation',
    },
    relationshipType: 'Shared Incident (Link & Coordinate)',
    relationshipExplanation: {
      suggestedLinkTarget: 'Linked to Recurring Issue Radar: Southern Region Faculty Salary Spike',
      matchingFacts: [
        'Matches 400% regional spike in Faculty Salary Delays across 12 Southern Region institutions',
      ],
      conflictingOrDistinctFacts: ['Requires bank PFMS/NEFT audit by Regulation Bureau'],
      similarityBand: 'High Regional Cluster Match',
      officerDecision: 'Approved Link',
    },
    policyClock: {
      policyName: 'AICTE 7th CPC Faculty Service & Pay Norms Redressal Clock',
      policyVersion: 'APH-2026-Ch6',
      basis: 'Working Days',
      prescribedDays: 15,
      elapsedDays: 14,
      dueDate: '2026-10-26 (<48h SLA Breach)',
      riskEstimateSummary:
        'Predictive SLA Breach within 48 hours; flagged under Recurring Issue Radar.',
      highRiskFlag: true,
    },
    regulatoryEvidenceCard: {
      studentOriginalWording:
        '"Our institution has withheld faculty salaries for August, September, and October 2026 despite full student fee collection."',
      extractedAllegation: 'Non-payment of prescribed faculty salaries for 3 consecutive months.',
      suggestedCategory: 'Faculty Salary & Service Norms Violation',
      candidateProvision: 'AICTE Approval Process Handbook Chapter 7 - Non-Payment of Salary',
      sourceDocumentTitle: 'AICTE APH 2024-27 Chapter 7 (Penal Action for Non-Payment of Salary)',
      sourceExcerpt:
        '"Non-payment of salary or disbursement below prescribed pay scales to faculty members shall invite punitive action including withdrawal of approval or reduction in intake..."',
      missingFactsToVerify: ['Verify bank disbursement ledger for Aug-Oct 2026'],
      officerVerificationState: 'Verified Applicable',
    },
    auditHistory: [
      {
        timestamp: 'Live 30s Sync',
        actor: 'Real-Time Intake Stream',
        bureau: 'Regulation Bureau (RB)',
        eventType: 'Live Complaint Ingested & Classified',
        note: 'Automatically classified as True Complaint (Actionable) and linked to Southern Region Faculty Salary Delay cluster.',
        isCoordinationEvent: true,
        expandedDetails: {
          routingRule: 'Live AI Classifier v2.4',
          officerSessionId: 'LIVE-STREAM-0119',
          slaSnapshot: 'Day 14 of 15 Working Days (<48h Remaining)',
          handoverStatus: 'Recommended Owner: Dr. S. Menon (RB)',
        },
      },
    ],
  },
];

// Department Heatmap Data
export const DEPARTMENT_HEATMAP = [
  {
    dept: 'Regulation Bureau (RB)',
    short: 'RB',
    avgDays: '11.8d (Working)',
    overlaps: 4,
    cells: [
      { category: 'Fee Refund', count: 14, intensity: 'medium' },
      { category: 'Certificate Withheld', count: 29, intensity: 'critical' },
      { category: 'Infrastructure Gap', count: 22, intensity: 'high' },
      { category: 'Scholarship Delay', count: 8, intensity: 'low' },
      { category: 'Faculty / Salary', count: 19, intensity: 'high' },
    ],
  },
  {
    dept: 'Public Grievance (PGRC)',
    short: 'PGRC',
    avgDays: '13.4d (Calendar)',
    overlaps: 5,
    cells: [
      { category: 'Fee Refund', count: 34, intensity: 'critical' },
      { category: 'Certificate Withheld', count: 26, intensity: 'critical' },
      { category: 'Infrastructure Gap', count: 9, intensity: 'low' },
      { category: 'Scholarship Delay', count: 24, intensity: 'high' },
      { category: 'Faculty / Salary', count: 15, intensity: 'medium' },
    ],
  },
  {
    dept: 'Approval Bureau (AB)',
    short: 'AB',
    avgDays: '9.2d (Working)',
    overlaps: 2,
    cells: [
      { category: 'Fee Refund', count: 4, intensity: 'low' },
      { category: 'Certificate Withheld', count: 6, intensity: 'low' },
      { category: 'Infrastructure Gap', count: 31, intensity: 'critical' },
      { category: 'Scholarship Delay', count: 3, intensity: 'low' },
      { category: 'Faculty / Salary', count: 27, intensity: 'critical' },
    ],
  },
  {
    dept: 'Regional Office (RO)',
    short: 'RO',
    avgDays: '12.5d (Working)',
    overlaps: 3,
    cells: [
      { category: 'Fee Refund', count: 11, intensity: 'medium' },
      { category: 'Certificate Withheld', count: 18, intensity: 'high' },
      { category: 'Infrastructure Gap', count: 25, intensity: 'critical' },
      { category: 'Scholarship Delay', count: 7, intensity: 'low' },
      { category: 'Faculty / Salary', count: 32, intensity: 'critical' },
    ],
  },
];
