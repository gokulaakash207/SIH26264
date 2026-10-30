/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  DEPARTMENT_HEATMAP,
  FIVE_DAY_COMPLIANCE_TREND,
  INSTITUTION_PROFILES,
} from '../mockData';
import { SharedPortalProps } from '../types';
import { TimelineView } from './TimelineView';

export const KpiCardsRow: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const { selectedRole, liveKpiMetrics, filteredComplaints, setTableTab, setActiveNav } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* KPI 1: Total Active Cases */}
      <div
        onClick={() => {
          setTableTab('all');
          setActiveNav('complaints');
        }}
        className="bg-white border border-amber-200/90 rounded-2xl p-7 shadow-xs flex items-start justify-between cursor-pointer hover:border-amber-400 transition-all group hover:shadow-md"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-800 group-hover:text-amber-900">
            {selectedRole === 'AICTE_HQ'
              ? 'Total Active Cases (National)'
              : 'Role-Scoped Active Dockets'}
          </p>
          <h3 className="text-3xl font-bold text-stone-900 mt-3 font-mono tabular-nums">
            {selectedRole === 'AICTE_HQ'
              ? liveKpiMetrics.activeCasesCount
              : filteredComplaints.length}
          </h3>
          <p className="text-xs font-medium text-stone-500 mt-3 leading-relaxed flex items-center gap-1.5">
            <span>View in Complaints Hub</span>
            <i className="fa-solid fa-arrow-right text-[10px] text-amber-600"></i>
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 text-base shrink-0 group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:to-amber-600 group-hover:text-white transition-all shadow-xs">
          <i className="fa-solid fa-folder-open"></i>
        </div>
      </div>

      {/* KPI 2: Cases Disposed & Verified Remedy */}
      <div
        onClick={() => {
          setTableTab('disputed_remedy');
          setActiveNav('complaints');
        }}
        className="bg-white border border-amber-200/90 rounded-2xl p-7 shadow-xs flex items-start justify-between cursor-pointer hover:border-emerald-300 transition-all group hover:shadow-md"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Cases Disposed &amp; Verified
          </p>
          <div className="flex items-baseline gap-2.5 mt-3">
            <h3 className="text-3xl font-bold text-stone-900 font-mono tabular-nums">
              {liveKpiMetrics.disposedCasesCount}
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-700">
              ({liveKpiMetrics.verifiedRemedyPct}% Receipt Verified)
            </span>
          </div>
          <p className="text-xs font-medium text-stone-500 mt-3 leading-relaxed">
            1 Disputed disposal flagged for partial refund
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-700 text-base shrink-0">
          <i className="fa-solid fa-receipt"></i>
        </div>
      </div>

      {/* KPI 3: Predictive SLA Breaches (<48h) */}
      <div
        onClick={() => {
          setTableTab('deadline_rescue');
          setActiveNav('complaints');
        }}
        className="bg-white border border-red-200/90 rounded-2xl p-7 shadow-xs flex items-start justify-between cursor-pointer hover:border-red-400 transition-all group hover:shadow-md"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-red-600">
            Predictive SLA Breaches (&lt;48h)
          </p>
          <h3 className="text-3xl font-bold text-red-600 mt-3 font-mono tabular-nums">
            {liveKpiMetrics.slaBreachesCount} Cases
          </h3>
          <p className="text-xs font-medium text-stone-500 mt-3 leading-relaxed flex items-center gap-1.5">
            <span>Includes &lt;24h PSU joining</span>
            <i className="fa-solid fa-arrow-right text-[10px] text-red-500"></i>
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200/60 flex items-center justify-center text-red-600 text-base shrink-0 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xs">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>
      </div>

      {/* KPI 4: Cross-Bureau Overlaps Detected */}
      <div
        onClick={() => {
          setTableTab('conflict_radar');
          setActiveNav('complaints');
        }}
        className="bg-white border border-amber-200/90 rounded-2xl p-7 shadow-xs flex items-start justify-between cursor-pointer hover:border-amber-400 transition-all group hover:shadow-md"
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-900">
            Cross-Bureau Overlaps Detected
          </p>
          <h3 className="text-3xl font-bold text-amber-900 mt-3 font-mono tabular-nums">
            {liveKpiMetrics.overlapCount} Alerts
          </h3>
          <p className="text-xs font-medium text-stone-500 mt-3 leading-relaxed flex items-center gap-1.5">
            <span>Inspect Collision Radar</span>
            <i className="fa-solid fa-arrow-right text-[10px] text-amber-600"></i>
          </p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-800 text-base shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-xs">
          <i className="fa-solid fa-tower-observation"></i>
        </div>
      </div>
    </div>
  );
};

export const ExecutiveComplaintsPreview: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const { filteredComplaints, setActiveNav, openCaseDetails, selectedRole } = props;
  const topPriorityCases = filteredComplaints.slice(0, 3);

  return (
    <div className="bg-white border border-amber-200/90 rounded-3xl p-7 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center text-sm shadow-xs border border-amber-400/40">
              <i className="fa-solid fa-folder-tree"></i>
            </span>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Active Complaints &amp; Priority Stream
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {selectedRole === 'AICTE_HQ'
                  ? 'Omniscient oversight supervising both Regulation Bureau (RB) and Public Grievance (PGRC) queues.'
                  : selectedRole === 'RB_OFFICER'
                  ? 'Scoped view: Only Regulation Bureau (RB) dockets are displayed.'
                  : 'Scoped view: Only Public Grievance Redressal Cell (PGRC) petitions are displayed.'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveNav('complaints')}
          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-2.5 shadow-sm self-start sm:self-auto shrink-0"
        >
          <span>Open Dedicated Complaints Hub</span>
          <span className="px-2 py-0.5 rounded-full bg-white/25 text-white text-[11px] font-mono font-bold">
            {filteredComplaints.length} Dockets
          </span>
          <i className="fa-solid fa-arrow-right text-[11px]"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {topPriorityCases.map((c) => (
          <div
            key={c.id}
            onClick={() => openCaseDetails(c, 'overview')}
            className="p-5 rounded-2xl bg-amber-50/20 hover:bg-amber-50/60 border border-amber-200/80 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-xs group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-lg border border-amber-300 group-hover:bg-amber-600 group-hover:text-white transition">
                  {c.id}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-amber-200 text-amber-900">
                  {c.bureau.split(' ')[0]}
                </span>
              </div>
              <h4 className="text-xs font-bold text-stone-900 line-clamp-2 leading-snug">
                {c.category}
              </h4>
              <p className="text-[11px] text-stone-600 truncate flex items-center gap-1.5">
                <i className="fa-solid fa-building-columns text-[10px] text-amber-600/70"></i>
                <span className="truncate">{c.institutionName}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-amber-200/60">
              <TimelineView complaint={c} variant="mini" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ActiveComplaintsTable: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const {
    selectedRole,
    activeRoleConfig,
    filteredComplaints,
    cameFromInstitutionPid,
    setCameFromInstitutionPid,
    setActiveNav,
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
    triggerToast,
    openCaseDetails,
    handleExportCSV,
    setFollowUpModalCase,
    setFollowUpEmailInput,
    setFollowUpQuestionText,
    setSelectedInstitution,
  } = props;

  return (
    <div className="space-y-6">
      {/* BREADCRUMB BANNER WHEN NAVIGATING FROM INSTITUTION PROFILES */}
      {cameFromInstitutionPid && (
        <div className="bg-blue-900 text-white rounded-2xl px-7 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-700 flex items-center justify-center text-xs">
              <i className="fa-solid fa-building-columns"></i>
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-blue-200 block">
                Filtered by Institution Master Dossier
              </span>
              <p className="text-sm font-bold">
                Showing Dockets for{' '}
                {INSTITUTION_PROFILES[cameFromInstitutionPid]?.name || cameFromInstitutionPid} (
                {cameFromInstitutionPid})
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setCameFromInstitutionPid(null);
              setActiveNav('institutions');
            }}
            className="px-4 py-2 bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to Institution Profiles</span>
          </button>
        </div>
      )}

      {/* AICTE HQ DUAL-BUREAU SUPERVISORY OVERSIGHT CONSOLE */}
      {selectedRole === 'AICTE_HQ' && (
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-50 rounded-3xl p-6 sm:p-7 border border-amber-400/50 shadow-xl space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center text-xl shadow-lg shadow-amber-500/30 shrink-0 border border-amber-400/40">
                <i className="fa-solid fa-building-shield"></i>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 border border-amber-400/30 font-mono">
                    Omniscient Clearance Active
                  </span>
                  <span className="text-xs text-amber-200 font-medium">
                    National Cross-Bureau Grievance Authority
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  AICTE Central Oversight Console — Dual Bureau Supervisory Control
                </h3>
              </div>
            </div>

            {/* Fast Bureau Scope Toggles for AICTE HQ */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white/10 p-1.5 rounded-2xl border border-white/15 shrink-0">
              <button
                type="button"
                onClick={() => setBureauFilter('ALL')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                  bureauFilter === 'ALL' || bureauFilter === 'All Bureaus'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                    : 'text-amber-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>Both Bureaus (Consolidated)</span>
              </button>
              <button
                type="button"
                onClick={() => setBureauFilter('Regulation Bureau (RB)')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                  bureauFilter === 'Regulation Bureau (RB)' || bureauFilter === 'RB'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                    : 'text-amber-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className="fa-solid fa-scale-balanced text-amber-400 text-xs"></i>
                <span>Regulation Bureau (RB)</span>
              </button>
              <button
                type="button"
                onClick={() => setBureauFilter('Public Grievance (PGRC)')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 ${
                  bureauFilter === 'Public Grievance (PGRC)' || bureauFilter === 'PGRC'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md'
                    : 'text-amber-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className="fa-solid fa-users-viewfinder text-yellow-400 text-xs"></i>
                <span>Public Grievance (PGRC)</span>
              </button>
            </div>
          </div>
          <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-amber-200/80 gap-3">
            <p className="max-w-3xl leading-relaxed">
              As AICTE HQ Staff, you have universal authority overseeing all dockets across both bureaus. The individual bureaus (Regulation Bureau and Public Grievance Cell) are isolated by role-based access control and can only see the complaints assigned to them.
            </p>
            <span className="font-mono text-amber-300 text-[11px] bg-white/5 px-3 py-1 rounded-lg border border-white/10">
              Current Filter: {bureauFilter === 'ALL' || bureauFilter === 'All Bureaus' ? 'All Bureaus Active' : bureauFilter}
            </span>
          </div>
        </div>
      )}

      {/* REGULATION BUREAU SCOPED NOTICE */}
      {selectedRole === 'RB_OFFICER' && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
              <i className="fa-solid fa-shield-halved"></i>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wider">
                  Regulation Bureau (RB) Scoped Docket Console
                </h3>
                <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-400/50">
                  Strict Bureau Isolation
                </span>
              </div>
              <p className="text-xs text-amber-900/90 mt-1">
                Access Scoped to Regulatory &amp; Norms Dockets (Certificate Retention, Faculty Cadre &amp; Pay Norms, Approval Verification). Under least-privilege security, Public Grievance (PGRC) dockets are restricted to PGRC officers.
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-mono font-bold shrink-0">
            {filteredComplaints.length} RB Dockets Accessible
          </span>
        </div>
      )}

      {/* PGRC OFFICER SCOPED NOTICE */}
      {selectedRole === 'PGRC_OFFICER' && (
        <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <span className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-lg shadow-sm shrink-0">
              <i className="fa-solid fa-user-check"></i>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wider">
                  Public Grievance Redressal Cell (PGRC) Scoped Docket Console
                </h3>
                <span className="text-[10px] font-mono font-bold bg-emerald-200 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-400/50">
                  Strict Bureau Isolation
                </span>
              </div>
              <p className="text-xs text-emerald-900/90 mt-1">
                Access Scoped to Student &amp; Parent Petitions (Fee Refunds, Document Release, Scholarship Grievances). Under least-privilege security, Regulation Bureau (RB) dockets are restricted to RB directors.
              </p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-900 text-xs font-mono font-bold shrink-0">
            {filteredComplaints.length} PGRC Petitions Accessible
          </span>
        </div>
      )}

      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs flex flex-col overflow-hidden">
        {/* Table Title Bar */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Active Complaints &amp; Overlaps Registry ({filteredComplaints.length} Dockets in
              Current Role View)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Dynamically scoped to{' '}
              <span className="font-semibold text-slate-800">{activeRoleConfig.shortName}</span>.
              Use the dropdowns below to filter by Status, Assigned Bureau, or Risk Level, or click
              any row for full scrollable details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {selectedRole === 'RB_OFFICER' && (
              <button
                onClick={() =>
                  triggerToast(
                    'Bulk Show-Cause Notice issued for Master Incident INC-2026-09 (9 Linked Cases).'
                  )
                }
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                1-Click Bulk Show-Cause
              </button>
            )}
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer"
            >
              <i className="fa-solid fa-file-csv"></i>
              <span>Download Filtered CSV</span>
            </button>
          </div>
        </div>

        {/* Interactive Filter Dropdowns Bar */}
        <div className="px-8 py-6 border-b border-slate-200 bg-slate-50/70 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                Search Keyword / PID / Case ID
              </label>
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search institution, PID, or case ID..."
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Filter 1: Status Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Under Process">Under Process</option>
                <option value="Disposed">Disposed</option>
                <option value="Transferred">Transferred</option>
              </select>
            </div>

            {/* Filter 2: Assigned Bureau Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5 flex items-center justify-between">
                <span>Assigned Bureau</span>
                {selectedRole !== 'AICTE_HQ' && (
                  <span className="text-[9px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                    SCOPED
                  </span>
                )}
              </label>
              {selectedRole === 'RB_OFFICER' ? (
                <div className="w-full px-3 py-2.5 bg-amber-50/70 border border-amber-300 rounded-xl text-xs font-bold text-amber-900 flex items-center justify-between">
                  <span className="truncate">Regulation Bureau (RB)</span>
                  <i className="fa-solid fa-lock text-[10px] text-amber-700"></i>
                </div>
              ) : selectedRole === 'PGRC_OFFICER' ? (
                <div className="w-full px-3 py-2.5 bg-emerald-50/70 border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 flex items-center justify-between">
                  <span className="truncate">Public Grievance (PGRC)</span>
                  <i className="fa-solid fa-lock text-[10px] text-emerald-700"></i>
                </div>
              ) : (
                <select
                  value={bureauFilter}
                  onChange={(e) => setBureauFilter(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="ALL">All Bureaus (Consolidated)</option>
                  <option value="Regulation Bureau (RB)">Regulation Bureau (RB)</option>
                  <option value="Public Grievance (PGRC)">Public Grievance (PGRC)</option>
                </select>
              )}
            </div>

            {/* Filter 3: Risk Level Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                Risk Level
              </label>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All Risk Levels">All Risk Levels</option>
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Low">Low Risk</option>
              </select>
            </div>

            {/* Filter 4: AI Classification Dropdown */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1.5">
                AI Wording Type
              </label>
              <select
                value={aiClassFilter}
                onChange={(e) => setAiClassFilter(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value="All Classifications">All AI Types</option>
                <option value="True Complaint (Actionable)">True Complaint (Actionable)</option>
                <option value="Improvement / Suggestion">Improvement / Suggestion</option>
                <option value="General Enquiry">General Enquiry</option>
              </select>
            </div>
          </div>

          {/* Quick Coordination View Sub-Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setTableTab('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  tableTab === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                All Role Dockets ({filteredComplaints.length})
              </button>

              <button
                onClick={() => setTableTab('shared_incident')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  tableTab === 'shared_incident'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                Master Incident Links
              </button>

              <button
                onClick={() => setTableTab('conflict_radar')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  tableTab === 'conflict_radar'
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                }`}
              >
                Conflict Radar
              </button>

              <button
                onClick={() => setTableTab('deadline_rescue')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  tableTab === 'deadline_rescue'
                    ? 'bg-amber-600 text-white'
                    : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                Predictive SLA Breach (&lt;48h)
              </button>

              <button
                onClick={() => setTableTab('ownerless_watchdog')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  tableTab === 'ownerless_watchdog'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-purple-700 border border-purple-200 hover:bg-purple-50'
                }`}
              >
                {selectedRole === 'RB_OFFICER' ? 'Pending My Acceptance' : 'Ownerless Watchdog'}
              </button>
            </div>

            {(statusFilter !== 'All' ||
              bureauFilter !== 'All Bureaus' ||
              riskFilter !== 'All Risk Levels' ||
              aiClassFilter !== 'All Classifications' ||
              searchQuery !== '' ||
              tableTab !== 'all') && (
              <button
                onClick={() => {
                  setStatusFilter('All');
                  setBureauFilter('All Bureaus');
                  setRiskFilter('All Risk Levels');
                  setAiClassFilter('All Classifications');
                  setSearchQuery('');
                  setTableTab('all');
                }}
                className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Clean, Spacious Summary Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider">
                <th className="py-5 pl-8 pr-4">Case ID &amp; Issue Summary</th>
                <th className="py-5 px-6">Institution (PID) &amp; Bureau Owner</th>
                <th className="py-5 px-6">Coordination &amp; Watchdog</th>
                <th className="py-5 px-6">Status &amp; Resolution Receipt</th>
                <th className="py-5 px-6">Risk &amp; Predictive SLA</th>
                <th className="py-5 pl-4 pr-8 text-right">Role Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredComplaints.map((item) => {
                const isUnmasked = Boolean(unmaskedIds[item.id]);

                const officialStatusBadge =
                  item.status === 'Disposed'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : item.status === 'Under Process'
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : item.status === 'Transferred'
                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200';

                const shortRemedyLabel =
                  item.remedyState === 'Complainant Confirms Receipt'
                    ? 'Receipt: Confirmed in Full'
                    : item.remedyState === 'Received Partially - Outcome Disputed'
                    ? 'Receipt: Disputed (Partial)'
                    : 'Receipt: Awaiting Verification';

                const remedyBadgeStyle =
                  item.remedyState === 'Complainant Confirms Receipt'
                    ? 'text-emerald-700 bg-emerald-50/80 border-emerald-200'
                    : item.remedyState === 'Received Partially - Outcome Disputed'
                    ? 'text-red-700 bg-red-50 border-red-200 font-bold'
                    : 'text-slate-600 bg-slate-100 border-slate-200';

                return (
                  <tr
                    key={item.id}
                    onClick={() =>
                      openCaseDetails(
                        item,
                        item.conflictRadar?.hasConflict ? 'conflict' : 'overview'
                      )
                    }
                    className={`group transition-colors cursor-pointer ${
                      item.ownerWatchdog.isUnclaimedOrDelayed
                        ? 'bg-amber-50/25 hover:bg-amber-50/50'
                        : item.conflictRadar?.hasConflict
                        ? 'bg-red-50/15 hover:bg-red-50/35'
                        : 'hover:bg-slate-50/90'
                    }`}
                  >
                    {/* Col 1: Case ID, Category, AI Classification */}
                    <td className="py-7 pl-8 pr-4 align-middle">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono font-bold text-blue-600 text-sm group-hover:underline">
                          {item.id}
                        </span>
                        {item.masterIncidentId && (
                          <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 font-mono text-[11px] font-semibold">
                            {item.masterIncidentId}
                          </span>
                        )}
                        {item.specialPolicyFlag && (
                          <span className="px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold">
                            Policy Review Required
                          </span>
                        )}
                      </div>
                      <div className="font-semibold text-slate-900 mt-2 text-sm">
                        {item.category}
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="text-blue-700 font-medium">{item.aiClassification}</span>
                        <span>-</span>
                        {isUnmasked ? (
                          <span className="text-amber-700 font-medium">
                            {item.unmaskedIdentity.name}
                          </span>
                        ) : (
                          <span className="font-mono text-[11px] text-slate-500">
                            {item.complainantRef}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Col 2: Institution, PID, Bureau & Owner Acceptance */}
                    <td className="py-7 px-6 align-middle">
                      <div className="font-semibold text-slate-900 text-sm">
                        {item.institutionName}
                      </div>
                      <div className="mt-1.5 flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            const prof = INSTITUTION_PROFILES[item.pid];
                            if (prof) setSelectedInstitution(prof);
                          }}
                          className="font-mono font-semibold text-blue-600 hover:underline cursor-pointer"
                        >
                          {item.pid}
                        </button>
                        <span className="text-slate-300">|</span>
                        <span className="text-slate-600 font-medium">{item.bureau}</span>
                      </div>
                      <div className="mt-1.5 text-[11px] text-slate-500">
                        {item.ownerWatchdog.acceptedByOwner ? (
                          <span className="text-emerald-700 font-medium">
                            Owner Accepted ({item.ownerWatchdog.recommendedOfficer})
                          </span>
                        ) : (
                          <span className="text-red-600 font-bold">
                            Unaccepted for {item.ownerWatchdog.unacceptedHours}h
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Col 3: Coordination, Conflict & Info Sufficiency */}
                    <td className="py-7 px-6 align-middle">
                      <div className="flex flex-col items-start gap-2">
                        <span className="text-xs font-semibold text-slate-700">
                          {item.relationshipType}
                        </span>

                        {item.conflictRadar?.hasConflict && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCaseDetails(item, 'conflict');
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-100/90 hover:bg-red-200/80 text-red-800 border border-red-300 text-xs font-bold transition-colors cursor-pointer"
                          >
                            <i className="fa-solid fa-tower-observation text-red-600 text-[11px]"></i>
                            <span>{item.conflictRadar.conflictType}</span>
                          </button>
                        )}

                        {!item.infoSufficiency.isSufficient && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFollowUpModalCase(item);
                              setFollowUpEmailInput(item.unmaskedIdentity.email);
                              setFollowUpQuestionText(
                                item.infoSufficiency.missingInfoPrompt ||
                                  'Kindly provide supporting fee receipt / document submission proof.'
                              );
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-[11px] font-semibold cursor-pointer"
                          >
                            <i className="fa-regular fa-envelope"></i>
                            <span>
                              {item.infoSufficiency.followUpSent
                                ? 'Follow-Up Sent to Student'
                                : 'Ask Follow-Up (Get Email)'}
                            </span>
                          </button>
                        )}
                      </div>
                    </td>

                    {/* Col 4: Official Status & Resolution Receipt */}
                    <td className="py-7 px-6 align-middle">
                      <div className="flex flex-col items-start gap-2.5">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${officialStatusBadge}`}
                        >
                          Status: {item.status}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openCaseDetails(item, 'remedy');
                          }}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border transition-colors cursor-pointer ${remedyBadgeStyle}`}
                        >
                          <i className="fa-solid fa-receipt text-[10px]"></i>
                          <span>{shortRemedyLabel}</span>
                        </button>
                      </div>
                    </td>

                    {/* Col 5: Lifecycle Stepper & SLA Clock */}
                    <td className="py-7 px-6 align-middle">
                      <div className="space-y-2">
                        <TimelineView complaint={item} variant="mini" />
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span className="font-mono truncate max-w-[120px]">
                            Due: {item.policyClock.dueDate.split(' ')[0]}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCaseDetails(item, 'timeline');
                            }}
                            className="text-[10px] font-bold text-amber-700 hover:text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <i className="fa-solid fa-timeline"></i>
                            <span>Details</span>
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Col 6: Role-Specific Actions */}
                    <td className="py-7 pl-4 pr-8 align-middle text-right whitespace-nowrap">
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCaseDetails(
                                item,
                                item.conflictRadar?.hasConflict ? 'conflict' : 'overview'
                              );
                            }}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-2xs transition cursor-pointer flex items-center gap-1.5"
                          >
                            <span>Dossier</span>
                            <i className="fa-solid fa-arrow-right text-[10px]"></i>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCaseDetails(item, 'timeline');
                            }}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 border border-slate-200 transition cursor-pointer"
                            title="Open Lifecycle & SLA Timeline"
                          >
                            <i className="fa-solid fa-timeline"></i>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCaseDetails(item, 'history');
                            }}
                            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 border border-slate-200 transition cursor-pointer"
                            title="Open Immutable Audit Trail"
                          >
                            <i className="fa-solid fa-shield-halved"></i>
                          </button>
                        </div>

                        {selectedRole === 'RB_OFFICER' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerToast(
                                `Show-Cause Notice & EVC Trigger dispatched for ${item.id} (${item.institutionName}).`
                              );
                            }}
                            className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-[11px] font-semibold cursor-pointer"
                          >
                            Show-Cause / EVC
                          </button>
                        )}

                        {selectedRole === 'AICTE_HQ' && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerToast(
                                `Appellate Override executed by AICTE HQ on ${item.id}.`
                              );
                            }}
                            className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[11px] font-semibold cursor-pointer"
                          >
                            Appellate Override
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPLAINTS HUB — Clean Card-Based List (replaces dense table for /complaints)
// ─────────────────────────────────────────────────────────────────────────────
export const ComplaintsCardList: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const {
    selectedRole,
    activeRoleConfig,
    filteredComplaints,
    cameFromInstitutionPid,
    setCameFromInstitutionPid,
    setActiveNav,
    statusFilter,
    setStatusFilter,
    bureauFilter,
    setBureauFilter,
    riskFilter,
    setRiskFilter,
    searchQuery,
    setSearchQuery,
    unmaskedIds,
    openCaseDetails,
    handleExportCSV,
  } = props;

  const statusColor = (s: string) => {
    if (s === 'Disposed') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (s === 'Under Process') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (s === 'Transferred') return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-amber-50 text-amber-800 border-amber-200';
  };

  const riskColor = (r: string) => {
    if (r === 'High') return 'bg-red-100 text-red-700 border-red-200';
    if (r === 'Medium') return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const slaPercent = (c: { policyClock: { elapsedDays: number; totalDays: number } }) => {
    return Math.min(100, Math.round((c.policyClock.elapsedDays / c.policyClock.totalDays) * 100));
  };

  const slaBarColor = (pct: number) => {
    if (pct >= 90) return 'bg-red-500';
    if (pct >= 70) return 'bg-amber-400';
    return 'bg-emerald-500';
  };

  const hasActiveFilters =
    statusFilter !== 'All' ||
    (bureauFilter !== 'All Bureaus' && bureauFilter !== 'ALL') ||
    riskFilter !== 'All Risk Levels' ||
    searchQuery !== '';

  return (
    <div className="space-y-6">
      {/* Breadcrumb when navigating from institution */}
      {cameFromInstitutionPid && (
        <div className="bg-blue-900 text-white rounded-2xl px-7 py-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-blue-700 flex items-center justify-center text-xs">
              <i className="fa-solid fa-building-columns"></i>
            </span>
            <div>
              <span className="text-[11px] font-mono uppercase text-blue-200 block">
                Filtered by Institution Master Dossier
              </span>
              <p className="text-sm font-bold">
                Showing Dockets for {INSTITUTION_PROFILES[cameFromInstitutionPid]?.name || cameFromInstitutionPid} ({cameFromInstitutionPid})
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setCameFromInstitutionPid(null);
              setActiveNav('institutions');
            }}
            className="px-4 py-2 bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold rounded-xl cursor-pointer flex items-center gap-2"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to Institution Profiles</span>
          </button>
        </div>
      )}

      {/* AICTE HQ dual-bureau console */}
      {selectedRole === 'AICTE_HQ' && (
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-50 rounded-2xl p-6 border border-amber-400/50 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-500 text-white flex items-center justify-center text-lg shadow-lg shrink-0 border border-amber-400/40">
                <i className="fa-solid fa-building-shield"></i>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 font-mono">
                  Omniscient Clearance Active · National Cross-Bureau Authority
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  AICTE Central Oversight Console — Dual Bureau Supervisory Control
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 bg-white/10 p-1.5 rounded-xl border border-white/15 shrink-0">
              <button
                type="button"
                onClick={() => setBureauFilter('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  bureauFilter === 'ALL' || bureauFilter === 'All Bureaus'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow'
                    : 'text-amber-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                Both Bureaus
              </button>
              <button
                type="button"
                onClick={() => setBureauFilter('Regulation Bureau (RB)')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  bureauFilter === 'Regulation Bureau (RB)'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow'
                    : 'text-amber-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className="fa-solid fa-scale-balanced text-amber-400 text-[10px]"></i>
                RB
              </button>
              <button
                type="button"
                onClick={() => setBureauFilter('Public Grievance (PGRC)')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  bureauFilter === 'Public Grievance (PGRC)'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow'
                    : 'text-amber-200/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className="fa-solid fa-users-viewfinder text-yellow-400 text-[10px]"></i>
                PGRC
              </button>
            </div>
          </div>
          <p className="mt-3 pt-3 border-t border-white/10 text-xs text-amber-200/80 max-w-3xl leading-relaxed">
            As AICTE HQ Staff, you have universal authority overseeing all dockets across both bureaus. Individual bureaus are isolated by role-based access control.
          </p>
        </div>
      )}

      {/* RB scoped notice */}
      {selectedRole === 'RB_OFFICER' && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center text-lg shrink-0 shadow-xs border border-amber-400/40">
              <i className="fa-solid fa-shield-halved"></i>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">Regulation Bureau (RB) Docket Console</h3>
                <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full border border-amber-400/50">Strict Bureau Isolation</span>
              </div>
              <p className="text-xs text-amber-900/90 mt-0.5">Access scoped to Regulatory &amp; Norms Dockets. PGRC dockets are restricted to PGRC officers.</p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-mono font-bold shrink-0">
            {filteredComplaints.length} RB Dockets
          </span>
        </div>
      )}

      {/* PGRC scoped notice */}
      {selectedRole === 'PGRC_OFFICER' && (
        <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-gradient-to-tr from-yellow-500 to-amber-600 text-white flex items-center justify-center text-lg shrink-0 shadow-xs border border-amber-400/40">
              <i className="fa-solid fa-user-check"></i>
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-amber-950 uppercase tracking-wide">Public Grievance (PGRC) Docket Console</h3>
                <span className="text-[10px] font-mono font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full border border-amber-400/50">Strict Bureau Isolation</span>
              </div>
              <p className="text-xs text-amber-900/90 mt-0.5">Access scoped to Student &amp; Parent Petitions. RB dockets are restricted to RB directors.</p>
            </div>
          </div>
          <span className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-900 text-xs font-mono font-bold shrink-0">
            {filteredComplaints.length} PGRC Petitions
          </span>
        </div>
      )}

      {/* Main card list container */}
      <div className="bg-white border border-amber-200/90 rounded-2xl shadow-xs overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-3">
              Complaints Hub
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold border border-amber-300">
                {filteredComplaints.length} dockets
              </span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Scoped to <span className="font-semibold text-stone-700">{activeRoleConfig.shortName}</span>. Click any complaint to view full details.
            </p>
          </div>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shrink-0 shadow-xs"
          >
            <i className="fa-solid fa-file-csv"></i>
            <span>Export CSV</span>
          </button>
        </div>

        {/* Filters */}
        <div className="px-6 py-4 bg-amber-50/30 border-b border-amber-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-2">
              <div className="relative">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-700/60 text-xs"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by case ID, institution, PID..."
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-amber-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Process">Under Process</option>
              <option value="Disposed">Disposed</option>
              <option value="Transferred">Transferred</option>
            </select>
            <select
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="px-3.5 py-2.5 bg-white border border-amber-200 rounded-xl text-xs font-semibold text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="All Risk Levels">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>
          </div>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setStatusFilter('All');
                setBureauFilter('All Bureaus');
                setRiskFilter('All Risk Levels');
                setSearchQuery('');
              }}
              className="mt-2.5 text-xs font-semibold text-amber-700 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Complaint Cards stacked */}
        <div className="divide-y divide-amber-100/70">
          {filteredComplaints.length === 0 ? (
            <div className="py-20 text-center text-stone-400">
              <i className="fa-solid fa-inbox text-4xl mb-4 block opacity-40 text-amber-600"></i>
              <p className="text-sm font-medium">No complaints match the current filters.</p>
              <p className="text-xs mt-1 opacity-70">Try adjusting the search or filter criteria above.</p>
            </div>
          ) : (
            filteredComplaints.map((item) => {
              const isUnmasked = Boolean(unmaskedIds[item.id]);
              const pct = slaPercent(item);
              return (
                <div
                  key={item.id}
                  onClick={() => openCaseDetails(item, item.conflictRadar?.hasConflict ? 'conflict' : 'overview')}
                  className={`group px-6 py-5 cursor-pointer transition-colors hover:bg-amber-50/40 ${
                    item.conflictRadar?.hasConflict
                      ? 'border-l-[3px] border-l-red-500'
                      : item.ownerWatchdog.isUnclaimedOrDelayed
                      ? 'border-l-[3px] border-l-amber-500'
                      : 'border-l-[3px] border-l-amber-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    {/* Left: Case info */}
                    <div className="flex-1 min-w-0 space-y-2.5">
                      {/* Row 1: ID + status badges */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono font-bold text-amber-900 text-sm group-hover:underline">
                          {item.id}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${statusColor(item.status)}`}>
                          {item.status}
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md border ${riskColor(item.riskLevel)}`}>
                          {item.riskLevel} Risk
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                          {item.bureau.split(' ')[0]}
                        </span>
                        {item.conflictRadar?.hasConflict && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                            <i className="fa-solid fa-tower-observation text-[9px]"></i>
                            Conflict Alert
                          </span>
                        )}
                        {item.specialPolicyFlag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                            Policy Review
                          </span>
                        )}
                      </div>

                      {/* Row 2: Category title */}
                      <h3 className="text-sm font-semibold text-stone-900 leading-snug">{item.category}</h3>

                      {/* Row 3: Institution + PID + complainant */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                        <span className="flex items-center gap-1.5">
                          <i className="fa-solid fa-building-columns text-[10px] text-amber-600/70"></i>
                          <span className="font-medium text-stone-700">{item.institutionName}</span>
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="font-mono text-stone-600">{item.pid}</span>
                        <span className="text-stone-300">·</span>
                        {isUnmasked
                          ? <span className="text-amber-800 font-medium">{item.unmaskedIdentity.name}</span>
                          : <span className="font-mono">{item.complainantRef}</span>
                        }
                      </div>

                      {/* SLA progress bar */}
                      <div className="pt-1">
                        <div className="flex items-center justify-between mb-1.5 text-[10px] text-stone-400">
                          <span className="font-medium text-stone-600">SLA Progress</span>
                          <span className={`font-mono font-bold ${pct >= 90 ? 'text-red-600' : pct >= 70 ? 'text-amber-700' : 'text-emerald-700'}`}>
                            {pct}% elapsed · Due {item.policyClock.dueDate.split(' ')[0]}
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${slaBarColor(pct)}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right: Action buttons */}
                    <div className="flex sm:flex-col items-center gap-2 shrink-0 pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCaseDetails(item, item.conflictRadar?.hasConflict ? 'conflict' : 'overview');
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-xs transition cursor-pointer flex items-center gap-2 whitespace-nowrap"
                      >
                        <span>View Details</span>
                        <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCaseDetails(item, 'timeline');
                        }}
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-amber-50 hover:bg-amber-100 hover:text-amber-950 text-amber-900 border border-amber-200 transition cursor-pointer whitespace-nowrap"
                      >
                        <i className="fa-solid fa-timeline mr-1.5 text-amber-600"></i>
                        Timeline
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export const SharedNonDashboardTabs: React.FC<{ props: SharedPortalProps }> = ({ props }) => {
  const {
    activeNav,
    setActiveNav,
    selectedRole,
    complaints,
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
    setCameFromInstitutionPid,
    setInspectDocketsDrawerInst,
    evidenceList,
    reusedEvidenceIds,
    setReusedEvidenceIds,
    setRequestEvidenceModalOpen,
    showCrossBureauHeatmapInRB,
    rbSpikeEscalatedToHQ,
    setRbSpikeEscalatedToHQ,
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
    setSearchQuery,
    chartCanvasRef,
    triggerToast,
    openCaseDetails,
    handleExportCSV,
    handleDownloadTranscriptTxt,
    handleForceAssignOwner,
    setTransferModalCase,
    setActiveTranscriptLog,
  } = props;

  return (
    <>
      {/* TAB 2: OVERLAP ALERTS & BATCHING */}
      {activeNav === 'coordination' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-9 shadow-2xs space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-base">
                <i className="fa-solid fa-code-branch"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {selectedRole === 'RB_OFFICER'
                    ? 'Regulation Bureau Overlap & Same-Department Batching Engine'
                    : 'AI Routing & Side-by-Side Overlap Detection (7 Active Alerts)'}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  {selectedRole === 'RB_OFFICER'
                    ? 'Coordinate cross-bureau overlaps (RB vs. PGRC) AND batch multiple similar complaints filed within Regulation Bureau into a single Master Show-Cause Docket.'
                    : 'Review system-suggested case linkages across bureaus to prevent dual investigations while preserving individual student rights.'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-2xl self-start">
              <button
                onClick={() => setOverlapSubTab('cross_bureau')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  overlapSubTab === 'cross_bureau'
                    ? 'bg-white text-blue-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Cross-Bureau Overlaps (RB ↔ PGRC)
              </button>
              <button
                onClick={() => setOverlapSubTab('same_dept_batch')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  overlapSubTab === 'same_dept_batch'
                    ? 'bg-white text-purple-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>2. Same-Dept Batch Clusters (RB Batching)</span>
                <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-mono">
                  3 Batches
                </span>
              </button>
            </div>
          </div>

          {overlapSubTab === 'same_dept_batch' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-purple-800 uppercase">
                    INTRA-BUREAU SEMANTIC CLUSTERING · SAME DEPARTMENT BATCH ACTION
                  </span>
                  <p className="text-xs text-slate-700 mt-1">
                    When multiple students or faculty members file separate complaints to{' '}
                    <strong>Regulation Bureau (RB)</strong> about the same violation at the same
                    college, the AI groups them into a <strong>Batch Docket</strong> so you can
                    issue a single Show-Cause Notice or EVC order for the entire batch.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {rbBatchClusters.map((batch) => (
                  <div
                    key={batch.id}
                    className="p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200/80 pb-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono font-bold text-xs bg-purple-600 text-white px-3 py-1 rounded-lg">
                            {batch.id} ({batch.complaintCount} Similar RB Complaints)
                          </span>
                          <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                            {batch.canonicalClause}
                          </span>
                          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 font-bold">
                            {batch.similarityScore}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-3">
                          {batch.violationCategory} — {batch.institutionName} ({batch.pid})
                        </h3>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                          batch.status === 'Merged into Master Batch'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {batch.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase text-slate-400 block mb-2">
                        Clustered RB Dockets in This Batch ({batch.docketIds.length} Tickets):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {batch.docketIds.map((id) => (
                          <span
                            key={id}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono text-xs font-semibold text-slate-700"
                          >
                            {id}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {batch.sampleQuotes.map((q) => (
                        <div
                          key={q.caseId}
                          className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs"
                        >
                          <div className="flex items-center justify-between font-mono text-[11px] text-slate-500">
                            <span className="font-bold text-blue-700">{q.caseId}</span>
                            <span>{q.role}</span>
                          </div>
                          <p className="text-slate-800 italic leading-relaxed">{q.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-xs text-blue-950">
                        <strong className="block mb-0.5">Recommended Batch Action:</strong>
                        {batch.recommendedBatchAction}
                      </div>
                      <button
                        onClick={() => {
                          setRbBatchClusters((prev) =>
                            prev.map((b) =>
                              b.id === batch.id
                                ? { ...b, status: 'Merged into Master Batch' }
                                : b
                            )
                          );
                          triggerToast(
                            `Merged ${batch.complaintCount} RB complaints (${batch.id}) at ${batch.institutionName} into 1 Master Batch Docket & issued unified Show-Cause Notice.`
                          );
                        }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer shrink-0 ${
                          batch.status === 'Merged into Master Batch'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        {batch.status === 'Merged into Master Batch'
                          ? `Batch Merged (${batch.complaintCount} Dockets Unified)`
                          : `Merge ${batch.complaintCount} RB Complaints & Issue 1 Show-Cause`}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {overlapSubTab === 'cross_bureau' && (
            <div className="space-y-8">
              {overlapPairs.map((pair) => (
                <div
                  key={pair.id}
                  className="p-8 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Card A */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-7 shadow-2xs flex flex-col justify-between space-y-5">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-semibold uppercase">
                          <span>COMPLAINT {pair.caseA.id}</span>
                          <span className="text-slate-600">{pair.caseA.complainantType}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mt-3.5 leading-relaxed">
                          {pair.caseA.quote}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          <i className="fa-regular fa-building mr-1.5"></i>
                          {pair.institutionName} ({pair.pid})
                        </span>
                        <span className="font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-md">
                          {pair.caseA.bureau}
                        </span>
                      </div>
                    </div>

                    {/* Card B */}
                    <div className="bg-white border border-amber-200 rounded-2xl p-7 shadow-2xs flex flex-col justify-between space-y-5">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-semibold uppercase">
                          <span>COMPLAINT {pair.caseB.id}</span>
                          <span className="text-slate-600">{pair.caseB.complainantType}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-900 mt-3.5 leading-relaxed">
                          {pair.caseB.quote}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">
                          <i className="fa-regular fa-building mr-1.5"></i>
                          {pair.institutionName} ({pair.pid})
                        </span>
                        <span className="font-mono font-bold text-amber-800 bg-amber-50 px-3 py-1 rounded-md">
                          {pair.caseB.bureau}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200 rounded-2xl p-7 grid grid-cols-1 lg:grid-cols-2 gap-8 text-xs">
                    <div className="space-y-3">
                      <h4 className="font-bold uppercase tracking-wider text-slate-500">
                        Why the System Suggests a Link
                      </h4>
                      <ul className="space-y-2.5 text-slate-700 font-medium">
                        {pair.whySuggestsLink.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <i className="fa-solid fa-check text-emerald-600 mt-0.5"></i>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-bold uppercase tracking-wider text-slate-500">
                        Differences to Consider
                      </h4>
                      <ul className="space-y-2.5 text-slate-700 font-medium list-disc pl-4">
                        {pair.differencesToConsider.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => {
                          setOverlapPairs((prev) =>
                            prev.map((p) =>
                              p.id === pair.id ? { ...p, decisionState: 'Confirmed Related' } : p
                            )
                          );
                          triggerToast(
                            `Tickets Consolidated (${pair.caseA.id} & ${pair.caseB.id}). Estimated Saving: 14 Officer Man-Hours & INR 45,000 (Redundant EVC Campus Visit Canceled).`
                          );
                        }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                          pair.decisionState === 'Confirmed Related'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {pair.decisionState === 'Confirmed Related'
                          ? 'Confirmed Related (Linked)'
                          : 'Confirm Related'}
                      </button>

                      <button
                        onClick={() => {
                          setOverlapPairs((prev) =>
                            prev.map((p) =>
                              p.id === pair.id ? { ...p, decisionState: 'Rejected' } : p
                            )
                          );
                          triggerToast(
                            `Suggestion rejected for ${pair.caseA.id} & ${pair.caseB.id}. Cases kept separate.`
                          );
                        }}
                        className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Reject Suggestion
                      </button>

                      <button
                        onClick={() =>
                          triggerToast(
                            `Requested senior appellate review for overlap pair ${pair.id}.`
                          )
                        }
                        className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Request Further Review
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        setOverlapPairs((prev) =>
                          prev.map((p) =>
                            p.id === pair.id ? { ...p, policyFlagged: !p.policyFlagged } : p
                          )
                        );
                        triggerToast(
                          `Toggled Special AICTE Policy & Procedure Review Flag on ${pair.id}.`
                        );
                      }}
                      className={`px-5 py-2.5 rounded-xl text-xs font-semibold border flex items-center gap-2 cursor-pointer transition-colors ${
                        pair.policyFlagged
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
                      }`}
                    >
                      <i className="fa-solid fa-flag"></i>
                      <span>
                        {pair.policyFlagged
                          ? 'Flagged for AICTE Policy Review'
                          : 'Special Policy Review Flag'}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: OWNERLESS WATCHDOG */}
      {activeNav === 'watchdog' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-9 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-5">
            <span className="text-xs font-mono font-bold text-amber-700 uppercase">
              ANTI-ORPHAN GOVERNANCE - DO NOT LET ANY CASE BECOME OWNERLESS
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-1">
              Ownerless Case Watchdog &amp; Mandatory Handover Verification
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Flags complaints that have been raised or transferred across bureaus without receiving
              formal officer acceptance.
            </p>
          </div>

          <div className="space-y-5">
            {complaints.map((c) => (
              <div
                key={c.id}
                className={`p-7 rounded-2xl border flex flex-col lg:flex-row lg:items-center justify-between gap-6 ${
                  c.ownerWatchdog.isUnclaimedOrDelayed
                    ? 'bg-amber-50/40 border-amber-300'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span
                      className={`font-mono font-bold uppercase ${
                        c.ownerWatchdog.isUnclaimedOrDelayed ? 'text-red-600' : 'text-emerald-700'
                      }`}
                    >
                      {c.ownerWatchdog.isUnclaimedOrDelayed
                        ? `UNACCEPTED FOR ${c.ownerWatchdog.unacceptedHours} HOURS`
                        : 'OWNERSHIP VERIFIED & ACCEPTED'}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="font-mono font-bold text-blue-600">{c.id}</span>
                    <span className="text-slate-700 font-semibold">{c.institutionName}</span>
                  </div>

                  <p className="text-sm font-bold text-slate-900">
                    Recommended Bureau: {c.ownerWatchdog.recommendedOwnerBureau} (
                    {c.ownerWatchdog.recommendedOfficer})
                  </p>

                  <p className="text-xs italic text-slate-600 leading-relaxed">
                    {c.ownerWatchdog.watchdogReason}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  {c.ownerWatchdog.isUnclaimedOrDelayed && (
                    <button
                      onClick={() => handleForceAssignOwner(c)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-2xs"
                    >
                      Force Assign to {c.ownerWatchdog.recommendedOwnerBureau}
                    </button>
                  )}
                  <button
                    onClick={() => setTransferModalCase(c)}
                    className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Proper Transfer
                  </button>
                  <button
                    onClick={() => openCaseDetails(c, 'overview')}
                    className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    View Gathered Facts
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: COMMITTEE LOGS & AI TRANSCRIPT SUMMARIZER */}
      {activeNav === 'committee' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-9 shadow-2xs space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-xs font-mono font-bold text-purple-600 uppercase">
                {selectedRole === 'RB_OFFICER'
                  ? 'STANDING HEARING COMMITTEE (SHC) · ACTIONABLE DIRECTIVES FOR REGULATION BUREAU'
                  : 'STANDING HEARING COMMITTEE - AI AUDIO TRANSCRIPT SUMMARIZER'}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                {selectedRole === 'RB_OFFICER'
                  ? 'SHC Key Talking Points & Mandatory RB Compliance Directives'
                  : 'Committee Meeting Logs & Key Talking Points'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {selectedRole === 'RB_OFFICER'
                  ? 'Filtered to Standing Hearing Committee resolutions requiring Regulation Bureau enforcement (Show-Cause orders, EVC bypass decisions, and EoA scrutiny flags). Unrelated PGRC fee-only hearings are hidden.'
                  : 'Automatically transcribes committee hearings and extracts admissions, deadlines, and cost-saving resolutions.'}
              </p>
            </div>

            {selectedRole === 'RB_OFFICER' && (
              <button
                onClick={() => setShowAllCommitteeLogsInRB((prev) => !prev)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer shrink-0"
              >
                {showAllCommitteeLogsInRB
                  ? 'Filter to RB-Actionable Hearings Only (2)'
                  : 'Show All Hearings Including PGRC Fee Reconciliations (3)'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {committeeLogs
              .filter((log) => {
                if (selectedRole === 'RB_OFFICER' && !showAllCommitteeLogsInRB) {
                  return log.id !== 'MTG-2026-102';
                }
                return true;
              })
              .map((log) => (
                <div
                  key={log.id}
                  className="p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-amber-700 flex items-center gap-2">
                        <i className="fa-solid fa-microphone-lines"></i>
                        <span>
                          {selectedRole === 'RB_OFFICER'
                            ? `AI Key-Points Extracted (${log.id})`
                            : log.audioDuration}
                        </span>
                      </span>
                      <span className="font-mono text-slate-500">{log.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900">{log.meetingTitle}</h3>
                    <p className="text-xs text-slate-500">
                      <strong>Chair:</strong> {log.chairperson} | <strong>Dockets:</strong>{' '}
                      {log.caseId}
                    </p>

                    <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-2.5 text-xs leading-relaxed">
                      <div>
                        <strong className="text-slate-900">Key Point 1:</strong>{' '}
                        <span className="text-slate-700">{log.keyPoint1}</span>
                      </div>
                      <div>
                        <strong className="text-slate-900">Key Point 2:</strong>{' '}
                        <span className="text-slate-700">{log.keyPoint2}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-100">
                        <strong className="text-emerald-800 block mb-0.5">
                          {selectedRole === 'RB_OFFICER'
                            ? 'Mandatory Action Directive for RB Officer:'
                            : 'Resolution:'}
                        </strong>{' '}
                        <span className="text-slate-900 font-semibold">{log.resolution}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      {selectedRole === 'RB_OFFICER' && (
                        <button
                          onClick={() => {
                            setExecutedDirectives((prev) => ({ ...prev, [log.id]: true }));
                            triggerToast(
                              `Executed SHC Directive for ${log.id} (${log.institutionName}) and logged action in RB docket audit trail.`
                            );
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                            executedDirectives[log.id]
                              ? 'bg-emerald-700 text-white'
                              : 'bg-blue-600 hover:bg-blue-700 text-white'
                          }`}
                        >
                          {executedDirectives[log.id]
                            ? 'SHC Directive Executed ✓'
                            : 'Execute RB Directive'}
                        </button>
                      )}
                      <button
                        onClick={() => setActiveTranscriptLog(log)}
                        className="text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
                      >
                        Inspect Full Verbatim Transcript →
                      </button>
                    </div>
                    <button
                      onClick={() => handleDownloadTranscriptTxt(log)}
                      className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Download full transcript (.txt)
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 5: INSTITUTION PROFILES */}
      {activeNav === 'institutions' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase">
                {selectedRole === 'RB_OFFICER'
                  ? 'REGULATION BUREAU INSTITUTION WATCHLIST · ZERO-COMPLAINT COLLEGES HIDDEN'
                  : 'CENTRALIZED INSTITUTION MASTER DOSSIERS (AICTE PERMANENT ID)'}
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                {selectedRole === 'RB_OFFICER' && !showAllInstitutionsInRB
                  ? 'Institutions with Active Regulation Bureau Dockets (2 Flagged Colleges)'
                  : 'All Registered Technical Institutions (4 PIDs)'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {selectedRole === 'RB_OFFICER'
                  ? 'Showing only institutions with active regulatory norm complaints (PSG Tech & Lakshmi College). Compliant zero-complaint colleges (like VIT Chennai) are automatically filtered out.'
                  : 'Click any institution below to inspect its consolidated complaint history across all bureaus without losing your place.'}
              </p>
            </div>

            {selectedRole === 'RB_OFFICER' && (
              <button
                onClick={() => setShowAllInstitutionsInRB((prev) => !prev)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer shrink-0"
              >
                {showAllInstitutionsInRB
                  ? 'Hide Zero-Complaint & Non-RB Colleges (Show 2 RB Active)'
                  : 'Show All 4 Directory Colleges (Include 0-Complaint VIT)'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.values(INSTITUTION_PROFILES)
              .filter((inst) => {
                if (selectedRole === 'RB_OFFICER' && !showAllInstitutionsInRB) {
                  return inst.pid === 'PID-1-20381992' || inst.pid === 'PID-1-50821900';
                }
                return true;
              })
              .map((inst) => (
                <div
                  key={inst.pid}
                  className="bg-white border border-slate-200 rounded-2xl p-8 shadow-2xs flex flex-col justify-between space-y-6"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                        {inst.pid}
                      </span>
                      <div className="flex items-center gap-2">
                        {inst.policyReviewRequired && (
                          <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-bold">
                            Policy Review Required
                          </span>
                        )}
                        <span className="text-xs font-mono text-slate-500">
                          {inst.city}, {inst.state}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mt-4">{inst.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Approval Status: {inst.approvalStatus} | Scheduled Inspection:{' '}
                      <span className="font-semibold text-slate-700">
                        {inst.inspectionSchedule}
                      </span>
                    </p>

                    <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center">
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">Unverified</span>
                        <span className="text-base font-bold font-mono text-slate-800 mt-1 block">
                          {inst.indicators.unverifiedAllegations}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200">
                        <span className="text-[11px] text-amber-800 block">Substantiated</span>
                        <span className="text-base font-bold font-mono text-amber-900 mt-1 block">
                          {inst.indicators.substantiatedFindings}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-red-50/70 border border-red-200">
                        <span className="text-[11px] text-red-700 block">Recurring Issues</span>
                        <span className="text-base font-bold font-mono text-red-800 mt-1 block">
                          {inst.indicators.recurringEstablishedIssues}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <span className="text-[11px] text-slate-500 block">Overdue Remedies</span>
                        <span className="text-base font-bold font-mono text-red-600 mt-1 block">
                          {inst.indicators.overdueRemedialActions}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs text-slate-700 leading-relaxed">
                      <strong className="text-blue-950 block mb-1">
                        Authorized Review Recommendation (Compliance Score:{' '}
                        {inst.cibilIllustrativeScore}/1000):
                      </strong>
                      {inst.reviewRecommendation}
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-2.5">
                    <button
                      onClick={() => setInspectDocketsDrawerInst(inst)}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Quick-View Dockets Here (
                      {complaints.filter((c) => c.pid === inst.pid).length})
                    </button>
                    <button
                      onClick={() => {
                        setSearchQuery(inst.pid);
                        setCameFromInstitutionPid(inst.pid);
                        setActiveNav('dashboard');
                      }}
                      className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer"
                    >
                      Inspect All Dockets for {inst.pid} →
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* TAB 6: EVIDENCE PASSPORT */}
      {activeNav === 'evidence' && (
        <div className="bg-white border border-blue-200 rounded-2xl p-9 shadow-2xs space-y-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">
                SHARED INTER-BUREAU EVIDENCE VAULT · ASK ONCE, REUSE SAFELY
              </span>
              <h2 className="text-lg font-bold text-slate-900 mt-1">
                {selectedRole === 'RB_OFFICER'
                  ? 'Regulation Bureau Shared Inspection & Evidence Vault'
                  : 'Evidence Passport Registry'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Why this exists: When PGRC already collected an institution’s Admission Register or
                Fee Circular, Regulation Bureau can reuse that exact verified file here instead of
                sending a duplicate Show-Cause demand to the college.
              </p>
            </div>

            <button
              onClick={() => setRequestEvidenceModalOpen(true)}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer shrink-0 flex items-center gap-2"
            >
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Request Missing Statutory Proof</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-xs space-y-1">
              <span className="font-mono font-bold text-blue-700 block">STEP 1 · COLLECT ONCE</span>
              <p className="text-slate-700">
                Partner bureau (e.g., PGRC) or student uploads a required institutional register or
                offer letter once.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs space-y-1">
              <span className="font-mono font-bold text-emerald-800 block">
                STEP 2 · SHA-256 INTEGRITY LOCK
              </span>
              <p className="text-slate-700">
                System stamps a cryptographic SHA-256 hash so the college cannot alter registers
                between PGRC and RB hearings.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 text-xs space-y-1">
              <span className="font-mono font-bold text-purple-800 block">
                STEP 3 · 1-CLICK RB REUSE
              </span>
              <p className="text-slate-700">
                RB Officer attaches the verified document directly to an APH Show-Cause docket —
                canceling redundant EVC visits.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {evidenceList.map((ev) => {
              const isReused = Boolean(reusedEvidenceIds[ev.id]);
              return (
                <div
                  key={ev.id}
                  className="p-7 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-5"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-blue-700">{ev.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-md font-semibold text-[11px] ${
                          ev.reviewState === 'Reviewed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ev.reviewState === 'Submitted'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        State: {ev.reviewState}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-3 leading-snug">
                      {ev.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5">
                      {ev.institutionName} ({ev.pid})
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-[11px] text-slate-600 font-mono">
                      <div>Uploaded By: {ev.uploadedBy}</div>
                      <div>Period: {ev.periodCovered}</div>
                      <div>Integrity Hash: {ev.sha256}</div>
                      <div>Access: {ev.accessLevel}</div>
                      <div>Reused By: {ev.usedByBureaus.join(' + ')}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setReusedEvidenceIds((prev) => ({ ...prev, [ev.id]: true }));
                      triggerToast(
                        `Linked Evidence Passport ${ev.id} to active investigation task without re-requesting from institution.`
                      );
                    }}
                    className={`w-full py-2.5 px-4 border text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
                      isReused
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white border-slate-300 hover:bg-blue-50 hover:border-blue-300 text-slate-800'
                    }`}
                  >
                    {isReused ? 'Attached to Active RB Task ✓' : 'Reuse in Current Bureau Task →'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 7: ANALYTICS & HEATMAP */}
      {activeNav === 'analytics' && (
        <div className="space-y-9">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-8 shadow-2xs">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Multi-Bureau Inflow &amp; Disposal Velocity
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Regulation Bureau (RB) vs. Public Grievance (PGRC)
                  </p>
                </div>
              </div>
              <div className="relative h-64 w-full">
                <canvas ref={chartCanvasRef}></canvas>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white border border-slate-200/90 rounded-2xl p-8 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  5-Day Momentum
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">
                  SLA &amp; Verified Remedy Trend
                </h2>
                <div className="mt-5 flex items-end justify-between gap-3 h-36 px-2">
                  {FIVE_DAY_COMPLIANCE_TREND.map((item, idx) => {
                    const heightPct = Math.round(((item.score - 80) / 15) * 100);
                    const isToday = idx === FIVE_DAY_COMPLIANCE_TREND.length - 1;
                    return (
                      <div
                        key={item.day}
                        className="flex-1 flex flex-col items-center gap-2 h-full justify-end"
                      >
                        <span className="text-[10px] font-mono tabular-nums font-bold text-slate-700">
                          {item.score}%
                        </span>
                        <div className="w-full bg-slate-100 rounded-t-lg flex items-end h-20 overflow-hidden">
                          <div
                            style={{ height: `${heightPct}%` }}
                            className={`w-full rounded-t-lg ${
                              isToday ? 'bg-blue-600' : 'bg-blue-300/80'
                            }`}
                          ></div>
                        </div>
                        <span className="text-[10px] font-medium text-slate-500">{item.day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {(selectedRole !== 'RB_OFFICER' || showCrossBureauHeatmapInRB) && (
            <div className="bg-white border border-slate-200/90 rounded-2xl p-8 shadow-2xs">
              <div className="mb-6">
                <h2 className="text-base font-bold text-slate-900">
                  AICTE Department vs. Issue Category Heatmap
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Identifies cross-bureau complaint hotspots across AICTE divisions
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                      <th className="py-4 pr-6">AICTE Department / Bureau</th>
                      <th className="py-4 px-4 text-center">Fee Refund</th>
                      <th className="py-4 px-4 text-center">Certificate Withheld</th>
                      <th className="py-4 px-4 text-center">Infrastructure Gap</th>
                      <th className="py-4 px-4 text-center">Scholarship Delay</th>
                      <th className="py-4 px-4 text-center">Faculty / Salary</th>
                      <th className="py-4 px-4 text-right">Policy Clock Basis</th>
                      <th className="py-4 pl-4 text-right">Shared Incidents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {DEPARTMENT_HEATMAP.map((row) => (
                      <tr key={row.dept} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 pr-6 font-semibold text-slate-800 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-mono text-xs flex items-center justify-center font-bold">
                              {row.short}
                            </span>
                            <span>{row.dept}</span>
                          </div>
                        </td>
                        {row.cells.map((cell) => {
                          const cellStyle =
                            cell.intensity === 'critical'
                              ? 'bg-red-50 text-red-700 border-red-200 font-bold'
                              : cell.intensity === 'high'
                              ? 'bg-amber-50 text-amber-800 border-amber-200 font-semibold'
                              : cell.intensity === 'medium'
                              ? 'bg-blue-50 text-blue-700 border-blue-200 font-medium'
                              : 'bg-slate-50 text-slate-500 border-slate-200/70';
                          return (
                            <td key={cell.category} className="py-3.5 px-3 text-center">
                              <div
                                className={`py-2 px-3 rounded-xl border text-xs font-mono tabular-nums ${cellStyle}`}
                              >
                                {cell.count} cases
                              </div>
                            </td>
                          );
                        })}
                        <td className="py-4 px-4 text-right font-mono text-xs text-slate-600 tabular-nums whitespace-nowrap">
                          {row.avgDays}
                        </td>
                        <td className="py-4 pl-4 text-right whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 tabular-nums">
                            {row.overlaps} linked
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 8: REPORTS & TAXPAYER SAVINGS LEDGER */}
      {activeNav === 'reports' && (
        <div className="space-y-8">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-9 shadow-2xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 uppercase">
                  BUREAU COLLISION AVOIDANCE SYSTEM (BCAS) - FINANCIAL &amp; RESOURCE LEDGER
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  Explainable Resource &amp; Taxpayer Cost-Savings Calculator
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust planning assumptions below to audit officer man-hours and EVC campus
                  inspection travel funds saved by cross-bureau coordination.
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-2 shrink-0"
              >
                <i className="fa-solid fa-file-csv"></i>
                <span>Export Full CSV Report</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Avoided Duplicate EVC Campus Visits:
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={avoidedVisitsCount}
                  onChange={(e) => setAvoidedVisitsCount(Number(e.target.value) || 3)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold"
                />
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Officer Man-Hours per EVC Visit:
                </label>
                <input
                  type="number"
                  min={4}
                  max={40}
                  value={hoursPerVisitAssumption}
                  onChange={(e) => setHoursPerVisitAssumption(Number(e.target.value) || 14)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold"
                />
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <label className="text-xs font-semibold text-slate-600 block">
                  Travel &amp; Inspection Cost per Visit (INR):
                </label>
                <input
                  type="number"
                  step={5000}
                  value={costPerVisitAssumption}
                  onChange={(e) => setCostPerVisitAssumption(Number(e.target.value) || 45000)}
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl font-mono text-base font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-xs font-bold uppercase text-emerald-800 block">
                  Total Estimated Officer Time Saved
                </span>
                <span className="text-3xl font-bold font-mono text-emerald-950 mt-2 block">
                  {avoidedVisitsCount * hoursPerVisitAssumption} Officer Man-Hours
                </span>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-xs font-bold uppercase text-emerald-800 block">
                  Total Projected EVC Travel &amp; Inspection Savings
                </span>
                <span className="text-3xl font-bold font-mono text-emerald-950 mt-2 block">
                  INR {(avoidedVisitsCount * costPerVisitAssumption).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-purple-200 rounded-2xl p-8 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-purple-700 uppercase">
                {selectedRole === 'AICTE_HQ'
                  ? 'RECURRING ISSUE RADAR · AICTE HQ NATIONAL TASKFORCE ALLOCATION'
                  : 'RECURRING ISSUE RADAR · BUREAU ESCALATION TO AICTE HQ'}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                400% Spike in &ldquo;Faculty Salary Delays&rdquo; Across 12 Southern Region
                Institutions
              </h3>
              <p className="text-xs text-slate-500">
                {selectedRole === 'AICTE_HQ'
                  ? massAllocationDeployed
                    ? `Active Taskforce Deployed by AICTE HQ: ${allocatedOfficers} Officers, ${allocatedResearchers} Researchers, and ${allocatedEvcTeams} EVC Panels.`
                    : 'AICTE HQ Exclusive Authority: Click Allocate Mass Resources to deploy a multi-bureau taskforce across all 12 Southern Region colleges.'
                  : rbSpikeEscalatedToHQ
                  ? 'Escalation Logged: Formal request sent by Dr. S. Menon (RB) to AICTE HQ Member Secretary for multi-bureau taskforce & budget sanction.'
                  : 'Role Scope Notice: Individual bureaus cannot unilaterally allocate cross-bureau budgets or taskforces. Escalate this systemic cluster to AICTE HQ for mass deployment.'}
              </p>
            </div>
            {selectedRole === 'AICTE_HQ' ? (
              <button
                onClick={() => setMassAllocationModalOpen(true)}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl cursor-pointer shrink-0"
              >
                Allocate Mass Resources
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => {
                    setRbSpikeEscalatedToHQ(true);
                    triggerToast(
                      'Escalated 12-Institution Faculty Salary Spike to AICTE HQ (Prof. R. K. Verma) for Mass Taskforce Allocation.'
                    );
                  }}
                  className={`px-5 py-2.5 text-xs font-semibold rounded-xl cursor-pointer ${
                    rbSpikeEscalatedToHQ
                      ? 'bg-emerald-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {rbSpikeEscalatedToHQ
                    ? 'Escalated to AICTE HQ ✓'
                    : 'Escalate Spike to AICTE HQ for Mass Allocation'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
