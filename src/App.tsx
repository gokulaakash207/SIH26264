import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  NavSection,
  RBACRoleId,
  TableTab,
  DetailTab,
  ComplaintDocket,
  InstitutionIndicatorsProfile,
  CommitteeMeetingLog,
  EvidencePassportItem,
  OverlapComparisonPair,
  IntraBureauBatchCluster,
  SharedPortalProps,
} from './types';
import {
  RBAC_ROLES,
  INITIAL_OVERLAP_PAIRS,
  INITIAL_RB_BATCH_CLUSTERS,
  INITIAL_COMMITTEE_LOGS,
  INITIAL_EVIDENCE_PASSPORTS,
  INITIAL_COMPLAINTS,
  LIVE_INCOMING_COMPLAINTS_POOL,
} from './mockData';
import { AicteHqPortal } from './portals/AicteHqPortal';
import { RbOfficerPortal } from './portals/RbOfficerPortal';
import { PgrcOfficerPortal } from './portals/PgrcOfficerPortal';
import { RegionalOfficerPortal } from './portals/RegionalOfficerPortal';
import { ShcCommitteePortal } from './portals/ShcCommitteePortal';
import { Modals } from './components/Modals';

export default function App() {
  const [activeNav, setActiveNav] = useState<NavSection>('dashboard');
  const [selectedRole, setSelectedRole] = useState<RBACRoleId>('AICTE_HQ');
  const [roleSwitchBanner, setRoleSwitchBanner] = useState<string | null>(null);
  const roleBannerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [complaints, setComplaints] = useState<ComplaintDocket[]>(INITIAL_COMPLAINTS);
  const [overlapPairs, setOverlapPairs] = useState<OverlapComparisonPair[]>(INITIAL_OVERLAP_PAIRS);
  const [rbBatchClusters, setRbBatchClusters] = useState<IntraBureauBatchCluster[]>(
    INITIAL_RB_BATCH_CLUSTERS
  );
  const [overlapSubTab, setOverlapSubTab] = useState<'cross_bureau' | 'same_dept_batch'>(
    'cross_bureau'
  );
  const [committeeLogs] = useState<CommitteeMeetingLog[]>(INITIAL_COMMITTEE_LOGS);
  const [executedDirectives, setExecutedDirectives] = useState<Record<string, boolean>>({});
  const [showAllCommitteeLogsInRB, setShowAllCommitteeLogsInRB] = useState(false);
  const [showAllInstitutionsInRB, setShowAllInstitutionsInRB] = useState(false);
  const [cameFromInstitutionPid, setCameFromInstitutionPid] = useState<string | null>(null);
  const [inspectDocketsDrawerInst, setInspectDocketsDrawerInst] =
    useState<InstitutionIndicatorsProfile | null>(null);
  const [evidenceList, setEvidenceList] = useState<EvidencePassportItem[]>(
    INITIAL_EVIDENCE_PASSPORTS
  );
  const [reusedEvidenceIds, setReusedEvidenceIds] = useState<Record<string, boolean>>({});
  const [requestEvidenceModalOpen, setRequestEvidenceModalOpen] = useState(false);
  const [newEvidencePid, setNewEvidencePid] = useState('PID-1-20381992');
  const [newEvidenceDocTitle, setNewEvidenceDocTitle] = useState(
    'AICTE Chapter VII Statutory Compliance Affidavit & Bank Scroll (FY 2025-26)'
  );
  const [showCrossBureauHeatmapInRB, setShowCrossBureauHeatmapInRB] = useState(false);
  const [rbSpikeEscalatedToHQ, setRbSpikeEscalatedToHQ] = useState(false);

  // Interactive Filters for 'Active Complaints & Overlaps' Table
  const [tableTab, setTableTab] = useState<TableTab>('all');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [bureauFilter, setBureauFilter] = useState<string>('ALL');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [aiClassFilter, setAiClassFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Real-Time Simulation State (Updates every 30s via setInterval)
  const [liveRefreshEnabled, setLiveRefreshEnabled] = useState<boolean>(true);
  const [secondsUntilNextTick, setSecondsUntilNextTick] = useState<number>(30);
  const [lastLiveEventText, setLastLiveEventText] = useState<string>(
    'Live stream active — polling CPGRAMS, PGRC & Bureau gateways every 30s'
  );
  const [liveKpiMetrics, setLiveKpiMetrics] = useState({
    activeCasesCount: 1245,
    disposedCasesCount: 4120,
    overlapCount: 7,
    slaBreachesCount: 23,
    verifiedRemedyPct: 68,
  });

  // Modals & Interactive States
  const [selectedCase, setSelectedCase] = useState<ComplaintDocket | null>(null);
  const [detailTab, setDetailTab] = useState<DetailTab>('overview');
  const [expandedAuditIndices, setExpandedAuditIndices] = useState<Record<number, boolean>>({});
  const [selectedInstitution, setSelectedInstitution] =
    useState<InstitutionIndicatorsProfile | null>(null);

  // Follow-up Questions Modal State
  const [followUpModalCase, setFollowUpModalCase] = useState<ComplaintDocket | null>(null);
  const [followUpEmailInput, setFollowUpEmailInput] = useState<string>('');
  const [followUpQuestionText, setFollowUpQuestionText] = useState<string>('');

  // Proper Transfer Modal State
  const [transferModalCase, setTransferModalCase] = useState<ComplaintDocket | null>(null);
  const [transferTargetBureau, setTransferTargetBureau] = useState<string>('RB');
  const [transferTargetOfficer, setTransferTargetOfficer] = useState<string>(
    'Dr. S. Menon (Director · RB)'
  );
  const [transferReasonText, setTransferReasonText] = useState<string>(
    'Establishing primary statutory jurisdiction based on AICTE Approval Process Handbook Chapter VII norms.'
  );
  const [transferChecklistConfirmed, setTransferChecklistConfirmed] = useState<boolean>(true);

  // Transcript Full View Modal
  const [activeTranscriptLog, setActiveTranscriptLog] = useState<CommitteeMeetingLog | null>(null);

  // Identity Unmasking & Audit Append State
  const [unmaskedIds, setUnmaskedIds] = useState<Record<string, string>>({});
  const [unmaskPromptCase, setUnmaskPromptCase] = useState<ComplaintDocket | null>(null);
  const [unmaskReason, setUnmaskReason] = useState(
    'Authorized statutory verification for PSU joining / fee refund bank audit'
  );
  const [overrideReason, setOverrideReason] = useState('');
  const [newAuditBureau, setNewAuditBureau] = useState('AICTE HQ Coordination Cell');
  const [newAuditNote, setNewAuditNote] = useState('');

  // Illustrative What-If Savings Calculator Assumptions
  const [avoidedVisitsCount, setAvoidedVisitsCount] = useState<number>(12);
  const [hoursPerVisitAssumption, setHoursPerVisitAssumption] = useState<number>(24);
  const [costPerVisitAssumption, setCostPerVisitAssumption] = useState<number>(85000);

  // Mass Resource Allocation Modal State
  const [massAllocationModalOpen, setMassAllocationModalOpen] = useState<boolean>(false);
  const [massFocusRegion, setMassFocusRegion] = useState<string>(
    'Southern & Northern Regions (High-Density Clusters)'
  );
  const [allocatedOfficers, setAllocatedOfficers] = useState<number>(14);
  const [allocatedResearchers, setAllocatedResearchers] = useState<number>(8);
  const [allocatedEvcTeams, setAllocatedEvcTeams] = useState<number>(5);
  const [massAllocationDeployed, setMassAllocationDeployed] = useState<boolean>(false);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<{ destroy: () => void } | null>(null);
  const incomingPoolIdxRef = useRef<number>(0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // 30-Second Real-Time Simulation using setInterval
  useEffect(() => {
    if (!liveRefreshEnabled) return;

    const countdownInterval = setInterval(() => {
      setSecondsUntilNextTick((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 1000);

    const refreshInterval = setInterval(() => {
      setLiveKpiMetrics((prev) => {
        const deltaActive = Math.floor(Math.random() * 5) - 1;
        const deltaDisposed = Math.floor(Math.random() * 4) + 1;
        const deltaSla = Math.random() > 0.65 ? 1 : 0;
        return {
          activeCasesCount: prev.activeCasesCount + deltaActive,
          disposedCasesCount: prev.disposedCasesCount + deltaDisposed,
          overlapCount: prev.overlapCount,
          slaBreachesCount: Math.max(18, prev.slaBreachesCount + deltaSla),
          verifiedRemedyPct: Math.min(
            94,
            Math.max(64, prev.verifiedRemedyPct + (Math.random() > 0.5 ? 1 : 0))
          ),
        };
      });

      setComplaints((prevComplaints) => {
        const poolIdx = incomingPoolIdxRef.current;
        if (poolIdx < LIVE_INCOMING_COMPLAINTS_POOL.length) {
          const incomingCase = LIVE_INCOMING_COMPLAINTS_POOL[poolIdx];
          incomingPoolIdxRef.current += 1;
          if (!prevComplaints.some((c) => c.id === incomingCase.id)) {
            setLastLiveEventText(
              `[LIVE INCOMING] New Docket ${incomingCase.id} (${incomingCase.institutionName}) ingested & scanned by AI Triage`
            );
            return [incomingCase, ...prevComplaints];
          }
        }

        const updated = [...prevComplaints];
        const targetIdx = updated.findIndex(
          (c) => c.status === 'Under Process' || c.status === 'Pending'
        );
        if (targetIdx !== -1) {
          const item = { ...updated[targetIdx] };
          item.auditHistory = [
            {
              timestamp: 'Just now (30s Sync)',
              actor: 'AICTE Telemetry Sync',
              bureau: item.bureau,
              eventType: 'Automated SLA Heartbeat',
              note: '30-second real-time polling verified current docket queue position and checked for new cross-bureau duplicate filings.',
            },
            ...item.auditHistory,
          ];
          updated[targetIdx] = item;
          setLastLiveEventText(
            `[LIVE HEARTBEAT] Docket ${item.id} (${item.institutionName}) SLA clock & cross-bureau index refreshed`
          );
        }
        return updated;
      });
    }, 30000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(refreshInterval);
    };
  }, [liveRefreshEnabled]);

  // Initialize Chart.js when on Analytics view
  useEffect(() => {
    if (activeNav !== 'analytics' && activeNav !== 'dashboard') return;
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    const ChartConstructor = window.Chart;
    if (!ChartConstructor) return;

    const isRbView = selectedRole === 'RB_OFFICER';

    chartInstanceRef.current = new ChartConstructor(ctx, {
      type: 'bar',
      data: {
        labels: isRbView
          ? [
              'Certificate Retention (APH Cl. 4.2)',
              'Lab / Infrastructure Deficit',
              'Faculty Cadre & 7th CPC Norms',
              'Unapproved Intake / Excess Seats',
              'Mandatory Disclosure Audit',
            ]
          : [
              'Original Document Retention',
              'Fee Refund After Withdrawal',
              'Faculty Salary & Cadre Shortage',
              'Lab / Infrastructure Deficit',
              'Scholarship / Stipend Delay',
            ],
        datasets: [
          {
            label: isRbView
              ? 'Active RB Show-Cause / Investigation Dockets'
              : 'Active Unresolved Cases',
            data: isRbView ? [29, 22, 19, 11, 8] : [42, 35, 28, 19, 14],
            backgroundColor: '#4f46e5',
            borderRadius: 6,
          },
          {
            label: isRbView
              ? 'Disposed & Verified Statutory Compliance'
              : 'Verified Remedy Completed',
            data: isRbView ? [52, 41, 34, 19, 15] : [68, 54, 41, 33, 29],
            backgroundColor: '#10b981',
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#475569',
              font: { size: 11 },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#e2e8f0' },
            ticks: { color: '#64748b' },
          },
          x: {
            grid: { display: false },
            ticks: { color: '#334155', font: { size: 11 } },
          },
        },
      },
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [activeNav, selectedRole]);

  const activeRoleConfig = useMemo(() => RBAC_ROLES[selectedRole], [selectedRole]);

  const handleRoleChange = (newRole: RBACRoleId) => {
    setSelectedRole(newRole);
    setTableTab('all');
    setStatusFilter('ALL');
    setBureauFilter('ALL');
    setRiskFilter('ALL');
    setAiClassFilter('ALL');
    const cfg = RBAC_ROLES[newRole];
    if (cfg) {
      if (roleBannerTimeoutRef.current) {
        clearTimeout(roleBannerTimeoutRef.current);
      }
      setRoleSwitchBanner(`Switched RBAC View to: ${cfg.label} (${cfg.accessLevel})`);
      roleBannerTimeoutRef.current = setTimeout(() => {
        setRoleSwitchBanner(null);
      }, 3000);
    }
  };

  // Filtered complaints based on RBAC Role + Tab + Interactive Dropdown Filters + Search
  const filteredComplaints = useMemo(() => {
    return complaints.filter((item) => {
      const isRbDocket =
        item.bureau === 'RB' ||
        item.bureau === 'Regulation Bureau (RB)' ||
        item.bureau.includes('Regulation Bureau');
      const isPgrcDocket =
        item.bureau === 'PGRC' ||
        item.bureau === 'Public Grievance (PGRC)' ||
        item.bureau.includes('Public Grievance');

      // Strict Role-Based Bureau Access Scoping:
      // AICTE_HQ: Oversees BOTH bureaus' complaints simultaneously!
      // RB_OFFICER: Respective bureau can ONLY see complaints given to Regulation Bureau (RB).
      // PGRC_OFFICER: Respective bureau can ONLY see complaints given to Public Grievance Cell (PGRC).
      if (selectedRole === 'RB_OFFICER') {
        if (!isRbDocket) return false;
      } else if (selectedRole === 'PGRC_OFFICER') {
        if (!isPgrcDocket) return false;
      } else if (selectedRole === 'RO_SOUTHERN') {
        if (item.region !== 'Southern Region') return false;
      } else if (selectedRole === 'SHC_MEMBER') {
        const isShcRelevant =
          !item.ownerWatchdog.acceptedByOwner ||
          item.specialPolicyFlag ||
          item.remedyState === 'Received Partially - Outcome Disputed' ||
          item.riskLevel === 'High';
        if (!isShcRelevant) return false;
      }

      if (
        tableTab === 'shared_incident' &&
        item.relationshipType !== 'Shared Incident (Link & Coordinate)'
      ) {
        return false;
      }
      if (tableTab === 'conflict_radar' && !item.conflictRadar?.hasConflict) {
        return false;
      }
      if (
        tableTab === 'disputed_remedy' &&
        item.remedyState !== 'Received Partially - Outcome Disputed'
      ) {
        return false;
      }
      if (tableTab === 'deadline_rescue' && !item.deadlineRescue?.hasUrgentHarm) {
        return false;
      }
      if (tableTab === 'ownerless_watchdog' && item.ownerWatchdog.acceptedByOwner) {
        return false;
      }

      if (statusFilter !== 'ALL' && statusFilter !== 'All' && item.status !== statusFilter) {
        return false;
      }

      // Bureau Oversight Filter:
      if (bureauFilter !== 'ALL' && bureauFilter !== 'All Bureaus') {
        if (bureauFilter === 'Regulation Bureau (RB)' || bureauFilter === 'RB') {
          if (!isRbDocket) return false;
        } else if (bureauFilter === 'Public Grievance (PGRC)' || bureauFilter === 'PGRC') {
          if (!isPgrcDocket) return false;
        } else if (item.bureau !== bureauFilter) {
          return false;
        }
      }
      if (riskFilter !== 'ALL' && item.riskLevel !== riskFilter) {
        return false;
      }
      if (aiClassFilter !== 'ALL' && item.aiClassification !== aiClassFilter) {
        return false;
      }

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchId = item.id.toLowerCase().includes(q);
        const matchCollege = item.institutionName.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchPid = item.pid.toLowerCase().includes(q);
        if (!matchId && !matchCollege && !matchCategory && !matchPid) return false;
      }

      return true;
    });
  }, [
    complaints,
    selectedRole,
    tableTab,
    statusFilter,
    bureauFilter,
    riskFilter,
    aiClassFilter,
    searchQuery,
  ]);

  const openCaseDetails = (item: ComplaintDocket, initialTab: DetailTab = 'overview') => {
    setSelectedCase(item);
    setDetailTab(initialTab);
    setExpandedAuditIndices({});
  };

  // CSV Export Handler for Reports & Filtered Table
  const handleExportCSV = () => {
    const headers = [
      'Case_ID',
      'Institution_PID',
      'Institution_Name',
      'City',
      'Region',
      'Category',
      'Assigned_Bureau',
      'Lead_Coordinator',
      'Owner_Accepted',
      'Status',
      'Risk_Level',
      'AI_Classification',
      'Policy_Review_Required',
      'Remedy_Verification_Status',
      'Due_Date',
    ];

    const rows = filteredComplaints.map((c) => [
      c.id,
      c.pid,
      `"${c.institutionName.replace(/"/g, '""')}"`,
      `"${c.city}"`,
      `"${c.region}"`,
      `"${c.category.replace(/"/g, '""')}"`,
      `"${c.bureau}"`,
      `"${c.leadCoordinator || c.ownerWatchdog.recommendedOfficer}"`,
      c.ownerWatchdog.acceptedByOwner ? 'YES' : 'NO_UNACCEPTED',
      c.status,
      c.riskLevel,
      `"${c.aiClassification}"`,
      c.specialPolicyFlag ? 'YES' : 'NO',
      `"${c.remedyState}"`,
      `"${c.policyClock.dueDate}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `AICTE_Grievance_Coordination_Report_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerToast(
      `Exported ${filteredComplaints.length} dockets to CSV report (AICTE_Grievance_Coordination_Report.csv).`
    );
  };

  const handleDownloadTranscriptTxt = (log: CommitteeMeetingLog) => {
    const content = [
      `====================================================================`,
      `AICTE STANDING HEARING COMMITTEE (SHC) / EVC OFFICIAL TRANSCRIPT`,
      `====================================================================`,
      `Meeting ID      : ${log.id}`,
      `Meeting Title   : ${log.meetingTitle}`,
      `Date            : ${log.date}`,
      `Institution     : ${log.institutionName} (${log.pid})`,
      `Case Docket     : ${log.caseId}`,
      `Chair Officer   : ${log.chairperson}`,
      `Attendees       : ${log.attendees.join(', ')}`,
      `Resolution      : ${log.resolution}`,
      ``,
      `--- KEY TALKING POINTS EXTRACTED BY AI ---`,
      `1. ${log.keyPoint1}`,
      `2. ${log.keyPoint2}`,
      ``,
      `--- VERBATIM TRANSCRIPT ---`,
      log.fullTranscript,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${log.id}_Committee_Transcript_Summary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast(`Downloaded AI Summary & Verbatim Transcript for ${log.id}`);
  };

  // Proper Transfer Execution (Guarantees No Ownerless Gap)
  const handleExecuteProperTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferModalCase) return;
    if (!transferReasonText.trim() || !transferChecklistConfirmed) {
      triggerToast('Please provide the statutory transfer reason and confirm the dossier checklist.');
      return;
    }

    const newEvent = {
      timestamp: 'Just now',
      actor: activeRoleConfig.officerName,
      bureau: transferTargetBureau,
      eventType: 'Proper Handover Protocol (Enforced)',
      note: `Formally transferred to ${transferTargetBureau} (${transferTargetOfficer}). Reason: ${transferReasonText}`,
      isCoordinationEvent: true,
    };

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== transferModalCase.id) return c;
        return {
          ...c,
          bureau: transferTargetBureau,
          leadCoordinator: transferTargetOfficer,
          status: 'Transferred',
          ownerWatchdog: {
            ...c.ownerWatchdog,
            isUnclaimedOrDelayed: false,
            acceptedByOwner: true,
            unacceptedHours: 0,
            recommendedOwnerBureau: transferTargetBureau,
            recommendedOfficer: transferTargetOfficer,
          },
          auditHistory: [newEvent, ...c.auditHistory],
        };
      })
    );

    if (selectedCase && selectedCase.id === transferModalCase.id) {
      setSelectedCase((prev) =>
        prev
          ? {
              ...prev,
              bureau: transferTargetBureau,
              leadCoordinator: transferTargetOfficer,
              status: 'Transferred',
              auditHistory: [newEvent, ...prev.auditHistory],
            }
          : null
      );
    }

    triggerToast(
      `Proper Transfer Completed: ${transferModalCase.id} handed over to ${transferTargetBureau} (${transferTargetOfficer}) with zero ownerless gap.`
    );
    setTransferModalCase(null);
  };

  // Send Follow-up Question to Student Email
  const handleSendFollowUpQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpModalCase) return;
    const emailToUse =
      followUpEmailInput.trim() ||
      followUpModalCase.unmaskedIdentity.email ||
      'student.petitioner@aicte-portal.edu.in';
    const questionToUse =
      followUpQuestionText.trim() ||
      'Please upload the legible scan of your fee receipt / original admission acknowledgement within 48 hours so the Lead Bureau can issue the statutory order.';

    const newEvent = {
      timestamp: 'Just now',
      actor: activeRoleConfig.officerName,
      bureau: followUpModalCase.bureau,
      eventType: 'Follow-Up Clarification Sent',
      note: `Dispatched follow-up question to ${emailToUse}: "${questionToUse}"`,
      isCoordinationEvent: true,
    };

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== followUpModalCase.id) return c;
        return {
          ...c,
          infoSufficiency: {
            ...c.infoSufficiency,
            followUpSent: true,
            studentEmailCollected: emailToUse,
          },
          auditHistory: [newEvent, ...c.auditHistory],
        };
      })
    );

    if (selectedCase && selectedCase.id === followUpModalCase.id) {
      setSelectedCase((prev) =>
        prev
          ? {
              ...prev,
              infoSufficiency: {
                ...prev.infoSufficiency,
                followUpSent: true,
                studentEmailCollected: emailToUse,
              },
              auditHistory: [newEvent, ...prev.auditHistory],
            }
          : null
      );
    }

    triggerToast(
      `Follow-up clarification email sent to ${emailToUse} for Case ${followUpModalCase.id}.`
    );
    setFollowUpModalCase(null);
    setFollowUpQuestionText('');
  };

  // Force Assign Owner on Ownerless Case Watchdog
  const handleForceAssignOwner = (targetCase: ComplaintDocket) => {
    const newEvent = {
      timestamp: 'Just now',
      actor: 'Ownerless Case Watchdog',
      bureau: targetCase.ownerWatchdog.recommendedOwnerBureau,
      eventType: 'Watchdog SLA Override — Forced Ownership Acceptance',
      note: `Case was unaccepted for ${targetCase.ownerWatchdog.unacceptedHours}h. Bound to ${targetCase.ownerWatchdog.recommendedOfficer}.`,
      isCoordinationEvent: true,
    };

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== targetCase.id) return c;
        return {
          ...c,
          status: 'Under Process',
          leadCoordinator: c.ownerWatchdog.recommendedOfficer,
          ownerWatchdog: {
            ...c.ownerWatchdog,
            isUnclaimedOrDelayed: false,
            unacceptedHours: 0,
            acceptedByOwner: true,
          },
          auditHistory: [newEvent, ...c.auditHistory],
        };
      })
    );
    triggerToast(
      `Watchdog Override: ${targetCase.id} locked to ${targetCase.ownerWatchdog.recommendedOfficer} (${targetCase.bureau}). Case is no longer ownerless.`
    );
  };

  // Assign Follow-Up Officer for Disputed Remedy
  const handleAssignFollowUpForDisputedRemedy = (record: ComplaintDocket) => {
    const newEvent = {
      timestamp: 'Just now',
      actor: 'Verified Remedy Gatekeeper',
      bureau: record.bureau,
      eventType: 'Disputed Remedy Re-Opened & Follow-Up Assigned',
      note: 'Student disputed institutional closure ("Disposed != Satisfied"). Assigned Follow-Up Enforcement Officer & issued 24h UTR/Receipt demand.',
      isCoordinationEvent: true,
    };

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== record.id) return c;
        return {
          ...c,
          status: 'Under Process',
          leadCoordinator: 'Officer M. Khanna (PGRC Compliance Enforcement)',
          auditHistory: [newEvent, ...c.auditHistory],
        };
      })
    );

    if (selectedCase && selectedCase.id === record.id) {
      setSelectedCase((prev) =>
        prev
          ? {
              ...prev,
              status: 'Under Process',
              leadCoordinator: 'Officer M. Khanna (PGRC Compliance Enforcement)',
              auditHistory: [newEvent, ...prev.auditHistory],
            }
          : null
      );
    }

    triggerToast(
      `Follow-up Enforcement Officer assigned to ${record.id}. 24h UTR/Receipt demand dispatched to ${record.institutionName}.`
    );
  };

  const handleApproveConflictCoordination = (targetCase: ComplaintDocket) => {
    const newEvent = {
      timestamp: 'Just now',
      actor: activeRoleConfig.officerName,
      bureau: targetCase.bureau,
      eventType: 'Cross-Bureau Conflict Resolved',
      note:
        overrideReason.trim() ||
        'Unified lead bureau ownership and merged duplicate document deadlines.',
      isCoordinationEvent: true,
    };

    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id !== targetCase.id) return c;
        return {
          ...c,
          conflictRadar: c.conflictRadar ? { ...c.conflictRadar, resolved: true } : undefined,
          auditHistory: [newEvent, ...c.auditHistory],
        };
      })
    );

    if (selectedCase && selectedCase.id === targetCase.id) {
      setSelectedCase((prev) =>
        prev
          ? {
              ...prev,
              conflictRadar: prev.conflictRadar
                ? { ...prev.conflictRadar, resolved: true }
                : undefined,
              auditHistory: [newEvent, ...prev.auditHistory],
            }
          : null
      );
    }

    setOverrideReason('');
    triggerToast(`Cross-Bureau Conflict resolved for ${targetCase.id}. Single Lead Owner locked.`);
  };

  const handleToggleSpecialPolicyFlag = (targetCase: ComplaintDocket) => {
    const nextState = !targetCase.specialPolicyFlag;
    setComplaints((prev) =>
      prev.map((c) => (c.id === targetCase.id ? { ...c, specialPolicyFlag: nextState } : c))
    );
    if (selectedCase && selectedCase.id === targetCase.id) {
      setSelectedCase((prev) => (prev ? { ...prev, specialPolicyFlag: nextState } : null));
    }
    triggerToast(
      nextState
        ? `Flagged ${targetCase.id} for Standing Hearing Committee Policy Review.`
        : `Cleared Policy Review flag on ${targetCase.id}.`
    );
  };

  const handleAppendAuditComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCase || !newAuditNote.trim()) return;
    const newEvent = {
      timestamp: 'Just now',
      actor: activeRoleConfig.officerName,
      bureau: newAuditBureau,
      eventType: 'Inter-Bureau Coordination Directive',
      note: newAuditNote.trim(),
      isCoordinationEvent: true,
    };
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedCase.id ? { ...c, auditHistory: [newEvent, ...c.auditHistory] } : c
      )
    );
    setSelectedCase((prev) =>
      prev ? { ...prev, auditHistory: [newEvent, ...prev.auditHistory] } : null
    );
    setNewAuditNote('');
    triggerToast('Inter-bureau coordination directive logged to immutable audit trail.');
  };

  const handleConfirmUnmaskIdentity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unmaskPromptCase) return;
    if (!unmaskReason.trim()) {
      triggerToast('Please enter an official justification for the audit log.');
      return;
    }

    const revealedName = unmaskPromptCase.unmaskedIdentity.name;
    setUnmaskedIds((prev) => ({ ...prev, [unmaskPromptCase.id]: revealedName }));

    const newEvent = {
      timestamp: 'Just now',
      actor: activeRoleConfig.officerName,
      bureau: activeRoleConfig.shortName,
      eventType: 'Complainant Identity Unmasked (Logged)',
      note: `Unmasked identity (${revealedName}). Reason: "${unmaskReason}"`,
      isCoordinationEvent: true,
    };

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === unmaskPromptCase.id ? { ...c, auditHistory: [newEvent, ...c.auditHistory] } : c
      )
    );
    if (selectedCase && selectedCase.id === unmaskPromptCase.id) {
      setSelectedCase((prev) =>
        prev ? { ...prev, auditHistory: [newEvent, ...prev.auditHistory] } : null
      );
    }

    setUnmaskPromptCase(null);
    triggerToast('Identity unmasked. Immutable entry recorded in Audit Trail.');
  };

  const sharedPortalProps: SharedPortalProps = {
    activeNav,
    setActiveNav,
    selectedRole,
    activeRoleConfig,
    complaints,
    setComplaints,
    filteredComplaints,
    overlapPairs,
    setOverlapPairs,
    rbBatchClusters,
    setRbBatchClusters,
    overlapSubTab,
    setOverlapSubTab,
    committeeLogs,
    executedDirectives,
    setExecutedDirectives,
    showAllCommitteeLogsInRB,
    setShowAllCommitteeLogsInRB,
    showAllInstitutionsInRB,
    setShowAllInstitutionsInRB,
    cameFromInstitutionPid,
    setCameFromInstitutionPid,
    setInspectDocketsDrawerInst,
    evidenceList,
    reusedEvidenceIds,
    setReusedEvidenceIds,
    setRequestEvidenceModalOpen,
    showCrossBureauHeatmapInRB,
    setShowCrossBureauHeatmapInRB,
    rbSpikeEscalatedToHQ,
    setRbSpikeEscalatedToHQ,
    liveKpiMetrics,
    avoidedVisitsCount,
    setAvoidedVisitsCount,
    hoursPerVisitAssumption,
    setHoursPerVisitAssumption,
    costPerVisitAssumption,
    setCostPerVisitAssumption,
    massAllocationDeployed,
    allocatedOfficers,
    allocatedResearchers,
    allocatedEvcTeams,
    setMassAllocationModalOpen,
    tableTab,
    setTableTab,
    statusFilter,
    setStatusFilter,
    bureauFilter,
    setBureauFilter,
    riskFilter,
    setRiskFilter,
    aiClassFilter,
    setAiClassFilter,
    searchQuery,
    setSearchQuery,
    unmaskedIds,
    chartCanvasRef,
    triggerToast,
    openCaseDetails,
    handleExportCSV,
    handleDownloadTranscriptTxt,
    handleForceAssignOwner,
    handleAssignFollowUpForDisputedRemedy,
    setTransferModalCase,
    setFollowUpModalCase,
    setFollowUpEmailInput,
    setFollowUpQuestionText,
    setSelectedInstitution,
    setActiveTranscriptLog,
  };

  const roleList = Object.values(RBAC_ROLES);

  return (
    <div className="bg-[#fcfbfa] text-stone-900 font-sans antialiased flex h-screen overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-stone-900 text-amber-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 max-w-md border border-amber-500/40">
          <i className="fa-solid fa-circle-check text-amber-400 text-lg shrink-0"></i>
          <div className="text-xs font-medium leading-relaxed">{toastMessage}</div>
        </div>
      )}

      {/* Role Switch Floating Banner */}
      {roleSwitchBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white border-2 border-amber-500 text-amber-950 px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 transition-all">
          <i className="fa-solid fa-user-shield text-amber-600"></i>
          <span className="text-xs font-bold tracking-wide">{roleSwitchBanner}</span>
          <button
            type="button"
            onClick={() => {
              if (roleBannerTimeoutRef.current) clearTimeout(roleBannerTimeoutRef.current);
              setRoleSwitchBanner(null);
            }}
            className="ml-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            title="Dismiss notification"
          >
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        </div>
      )}

      {/* SIDEBAR — Regal Gold & Crisp White Theme */}
      <aside className="w-72 bg-white text-stone-800 border-r border-amber-200/80 flex flex-col justify-between shrink-0 shadow-xs">
        <div>
          <div className="h-20 flex items-center px-5 border-b border-amber-200/80 gap-3.5 bg-gradient-to-r from-amber-50/70 to-white">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-600 to-yellow-500 flex items-center justify-center font-bold text-white shadow-md shadow-amber-500/25 shrink-0 border border-amber-400/40">
              <i className="fa-solid fa-scale-balanced text-base"></i>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-sm tracking-wide text-amber-950 leading-tight">
                  BureauSync
                </h1>
                <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 text-[9px] font-mono font-bold border border-amber-300">
                  2.0
                </span>
              </div>
              <p className="text-[10px] text-amber-700 font-mono tracking-wider uppercase mt-0.5 font-semibold">
                Cross-Bureau Redressal
              </p>
            </div>
          </div>

          <div className="p-3.5 space-y-6">
            <div>
              <p className="text-[10px] font-bold text-amber-900/70 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
                <span>Core Workspace</span>
                <span className="text-[9px] text-amber-700 font-mono font-bold">REGISTRIES</span>
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveNav('dashboard')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'dashboard'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <i className={`fa-solid fa-gauge-high w-5 text-center ${activeNav === 'dashboard' ? 'text-white' : 'text-amber-600'}`}></i>
                  <span>Command Center</span>
                </button>

                <button
                  onClick={() => setActiveNav('complaints')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'complaints'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`fa-solid fa-folder-tree w-5 text-center ${activeNav === 'complaints' ? 'text-white' : 'text-amber-600'}`}></i>
                    <span>Complaints Hub</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                    activeNav === 'complaints'
                      ? 'bg-white/25 text-white'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    {filteredComplaints.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveNav('coordination')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'coordination'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`fa-solid fa-code-merge w-5 text-center ${activeNav === 'coordination' ? 'text-white' : 'text-amber-600'}`}></i>
                    <span>Overlap Comparator</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                    activeNav === 'coordination'
                      ? 'bg-white/25 text-white'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    {selectedRole === 'RB_OFFICER'
                      ? `${overlapPairs.length}+${rbBatchClusters.length}`
                      : overlapPairs.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveNav('watchdog')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'watchdog'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`fa-solid fa-shield-dog w-5 text-center ${activeNav === 'watchdog' ? 'text-white' : 'text-amber-600'}`}></i>
                    <span>Ownerless Watchdog</span>
                  </div>
                  <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono animate-pulse">
                    {
                      complaints.filter(
                        (c) => !c.ownerWatchdog.acceptedByOwner && c.status !== 'Disposed'
                      ).length
                    }
                  </span>
                </button>
              </nav>
            </div>

            <div>
              <p className="text-[10px] font-bold text-amber-900/70 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
                <span>Statutory &amp; Intelligence</span>
                <span className="text-[9px] text-amber-700 font-mono font-bold">MODULES</span>
              </p>
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveNav('committee')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'committee'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <i className={`fa-solid fa-microphone-lines w-5 text-center ${activeNav === 'committee' ? 'text-white' : 'text-amber-600'}`}></i>
                    <span>Committee Logs &amp; AI</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full font-mono ${
                    activeNav === 'committee'
                      ? 'bg-white/25 text-white'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    {committeeLogs.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveNav('institutions')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'institutions'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <i className={`fa-solid fa-building-columns w-5 text-center ${activeNav === 'institutions' ? 'text-white' : 'text-amber-600'}`}></i>
                  <span>Institution Dossiers</span>
                </button>

                <button
                  onClick={() => setActiveNav('evidence')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'evidence'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <i className={`fa-solid fa-passport w-5 text-center ${activeNav === 'evidence' ? 'text-white' : 'text-amber-600'}`}></i>
                  <span>Shared Evidence Vault</span>
                </button>

                <button
                  onClick={() => setActiveNav('analytics')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'analytics'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <i className={`fa-solid fa-chart-column w-5 text-center ${activeNav === 'analytics' ? 'text-white' : 'text-amber-600'}`}></i>
                  <span>Recurring Issue Radar</span>
                </button>

                <button
                  onClick={() => setActiveNav('reports')}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                    activeNav === 'reports'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm font-semibold shadow-amber-500/25'
                      : 'text-stone-700 hover:bg-amber-50/80 hover:text-amber-950'
                  }`}
                >
                  <i className={`fa-solid fa-file-csv w-5 text-center ${activeNav === 'reports' ? 'text-white' : 'text-amber-600'}`}></i>
                  <span>CSV Reports &amp; Export</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Left: RBAC Login Simulator + Active Officer Profile */}
        <div className="p-3.5 border-t border-amber-200/80 bg-gradient-to-b from-white to-amber-50/50 space-y-3">
          <div className="bg-white border border-amber-300 rounded-xl p-2.5 shadow-2xs">
            <label
              htmlFor="rbac-role-selector"
              className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-amber-900 mb-1.5"
            >
              <span className="flex items-center gap-1.5">
                <i className="fa-solid fa-user-shield text-amber-600"></i>
                Simulate Active Role
              </span>
              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[9px] font-mono font-bold border border-amber-200">
                RBAC
              </span>
            </label>
            <select
              id="rbac-role-selector"
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value as RBACRoleId)}
              className="w-full bg-amber-50/50 border border-amber-200 hover:border-amber-400 rounded-lg px-2.5 py-2 text-xs text-stone-900 font-semibold focus:outline-none focus:border-amber-500 cursor-pointer transition"
            >
              {roleList.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
            <div className="mt-1.5 text-[10px] text-stone-500 leading-tight flex items-center justify-between">
              <span>Access:</span>
              <span className="font-mono text-amber-800 font-bold truncate max-w-[160px]">
                {activeRoleConfig.accessLevel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-500 border border-amber-300 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-2xs">
              {activeRoleConfig.officerName
                .split(' ')
                .slice(0, 2)
                .map((s) => s[0])
                .join('')}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-stone-900 truncate">
                {activeRoleConfig.officerName}
              </p>
              <p className="text-[11px] text-stone-500 truncate">{activeRoleConfig.officerTitle}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#fcfbfa]">
        {/* TOP GOVERNMENT OF INDIA / AICTE OFFICIAL HEADER */}
        <header className="min-h-20 py-3 bg-white border-b border-amber-200/80 flex flex-wrap items-center justify-between px-8 gap-4 shadow-2xs">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-600 to-yellow-500 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-amber-300 shrink-0">
                <i className="fa-solid fa-landmark"></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-amber-800/80 font-mono">
                    GOVERNMENT OF INDIA • MINISTRY OF EDUCATION
                  </span>
                  <span className="w-1 h-1 rounded-full bg-amber-300"></span>
                  <span className="text-[10px] font-bold text-amber-700 uppercase">
                    BureauSync
                  </span>
                </div>
                <h2 className="text-sm font-extrabold text-stone-900 tracking-tight leading-tight">
                  All India Council for Technical Education
                </h2>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
              <i className="fa-solid fa-id-badge text-amber-600"></i>
              <span>{activeRoleConfig.jurisdictionBadge || activeRoleConfig.shortName}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* 30-Second Real-Time Simulation Status Indicator */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs shadow-2xs"
              title={lastLiveEventText}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  liveRefreshEnabled ? 'bg-amber-500 animate-pulse' : 'bg-stone-300'
                }`}
              ></span>
              <span className="text-stone-700 font-medium text-[11px]">
                Live Sync:{' '}
                <strong className="text-amber-800 font-mono font-bold">{secondsUntilNextTick}s</strong>
              </span>
              <button
                onClick={() => setLiveRefreshEnabled((prev) => !prev)}
                className="text-[10px] px-2 py-0.5 rounded-md bg-white hover:bg-amber-50 text-amber-900 border border-amber-200 font-semibold cursor-pointer shadow-2xs"
              >
                {liveRefreshEnabled ? 'Pause' : 'Resume'}
              </button>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-file-csv"></i>
              <span>Export CSV</span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-[1600px] w-full mx-auto">
          {/* RENDER ACTIVE ROLE PORTAL */}
          {selectedRole === 'AICTE_HQ' && <AicteHqPortal props={sharedPortalProps} />}
          {selectedRole === 'RB_OFFICER' && <RbOfficerPortal props={sharedPortalProps} />}
          {selectedRole === 'PGRC_OFFICER' && <PgrcOfficerPortal props={sharedPortalProps} />}
          {selectedRole === 'RO_SOUTHERN' && <RegionalOfficerPortal props={sharedPortalProps} />}
          {selectedRole === 'SHC_MEMBER' && <ShcCommitteePortal props={sharedPortalProps} />}
        </div>
      </main>

      {/* SHARED MODALS & DRAWERS */}
      <Modals
        selectedCase={selectedCase}
        setSelectedCase={setSelectedCase}
        detailTab={detailTab}
        setDetailTab={setDetailTab}
        expandedAuditIndices={expandedAuditIndices}
        setExpandedAuditIndices={setExpandedAuditIndices}
        unmaskedIds={unmaskedIds}
        setUnmaskPromptCase={setUnmaskPromptCase}
        unmaskPromptCase={unmaskPromptCase}
        unmaskReason={unmaskReason}
        setUnmaskReason={setUnmaskReason}
        handleConfirmUnmaskIdentity={handleConfirmUnmaskIdentity}
        overrideReason={overrideReason}
        setOverrideReason={setOverrideReason}
        handleApproveConflictCoordination={handleApproveConflictCoordination}
        handleAssignFollowUpForDisputedRemedy={handleAssignFollowUpForDisputedRemedy}
        handleToggleSpecialPolicyFlag={handleToggleSpecialPolicyFlag}
        handleForceAssignOwner={handleForceAssignOwner}
        newAuditBureau={newAuditBureau}
        setNewAuditBureau={setNewAuditBureau}
        newAuditNote={newAuditNote}
        setNewAuditNote={setNewAuditNote}
        handleAppendAuditComment={handleAppendAuditComment}
        committeeLogs={committeeLogs}
        handleDownloadTranscriptTxt={handleDownloadTranscriptTxt}
        followUpModalCase={followUpModalCase}
        setFollowUpModalCase={setFollowUpModalCase}
        followUpEmailInput={followUpEmailInput}
        setFollowUpEmailInput={setFollowUpEmailInput}
        followUpQuestionText={followUpQuestionText}
        setFollowUpQuestionText={setFollowUpQuestionText}
        handleSendFollowUpQuestion={handleSendFollowUpQuestion}
        transferModalCase={transferModalCase}
        setTransferModalCase={setTransferModalCase}
        transferTargetBureau={transferTargetBureau}
        setTransferTargetBureau={setTransferTargetBureau}
        transferTargetOfficer={transferTargetOfficer}
        setTransferTargetOfficer={setTransferTargetOfficer}
        transferReasonText={transferReasonText}
        setTransferReasonText={setTransferReasonText}
        transferChecklistConfirmed={transferChecklistConfirmed}
        setTransferChecklistConfirmed={setTransferChecklistConfirmed}
        handleExecuteProperTransfer={handleExecuteProperTransfer}
        massAllocationModalOpen={massAllocationModalOpen}
        setMassAllocationModalOpen={setMassAllocationModalOpen}
        massFocusRegion={massFocusRegion}
        setMassFocusRegion={setMassFocusRegion}
        allocatedOfficers={allocatedOfficers}
        setAllocatedOfficers={setAllocatedOfficers}
        allocatedResearchers={allocatedResearchers}
        setAllocatedResearchers={setAllocatedResearchers}
        allocatedEvcTeams={allocatedEvcTeams}
        setAllocatedEvcTeams={setAllocatedEvcTeams}
        setMassAllocationDeployed={setMassAllocationDeployed}
        activeTranscriptLog={activeTranscriptLog}
        setActiveTranscriptLog={setActiveTranscriptLog}
        inspectDocketsDrawerInst={inspectDocketsDrawerInst}
        setInspectDocketsDrawerInst={setInspectDocketsDrawerInst}
        complaints={complaints}
        openCaseDetails={openCaseDetails}
        setSearchQuery={setSearchQuery}
        setCameFromInstitutionPid={setCameFromInstitutionPid}
        setActiveNav={setActiveNav}
        requestEvidenceModalOpen={requestEvidenceModalOpen}
        setRequestEvidenceModalOpen={setRequestEvidenceModalOpen}
        newEvidencePid={newEvidencePid}
        setNewEvidencePid={setNewEvidencePid}
        newEvidenceDocTitle={newEvidenceDocTitle}
        setNewEvidenceDocTitle={setNewEvidenceDocTitle}
        evidenceList={evidenceList}
        setEvidenceList={setEvidenceList}
        activeRoleConfig={activeRoleConfig}
        selectedInstitution={selectedInstitution}
        setSelectedInstitution={setSelectedInstitution}
        triggerToast={triggerToast}
      />
    </div>
  );
}