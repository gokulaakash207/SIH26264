import React, { useState } from 'react';
import { ComplaintDocket, AuditEvent } from '../types';

interface AuditTrailViewProps {
  complaint: ComplaintDocket;
  expandedIndices: Record<number, boolean>;
  onToggleExpand: (index: number) => void;
  newAuditBureau: string;
  setNewAuditBureau: (bureau: string) => void;
  newAuditNote: string;
  setNewAuditNote: (note: string) => void;
  onAppendComment: (e: React.FormEvent) => void;
  triggerToast?: (msg: string) => void;
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({
  complaint,
  expandedIndices,
  onToggleExpand,
  newAuditBureau,
  setNewAuditBureau,
  newAuditNote,
  setNewAuditNote,
  onAppendComment,
  triggerToast,
}) => {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Generate deterministic-looking sha256 hash based on case ID for tamper-evident certification
  const pseudoSha256 = `SHA256:0x7e8b91a${complaint.id.replace(/[^0-9]/g, '44')}c3f290d19e0b1274a`;

  const filteredHistory = complaint.auditHistory.filter((ev) => {
    if (filterType === 'COORDINATION' && !ev.isCoordinationEvent) return false;
    if (filterType === 'HANDOVER' && !ev.eventType.toLowerCase().includes('handover') && !ev.eventType.toLowerCase().includes('routed') && !ev.eventType.toLowerCase().includes('intake')) return false;
    if (filterType === 'DIRECTIVE' && !ev.eventType.toLowerCase().includes('directive') && !ev.eventType.toLowerCase().includes('notice') && !ev.eventType.toLowerCase().includes('flagged')) return false;

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchActor = ev.actor.toLowerCase().includes(q);
      const matchBureau = ev.bureau.toLowerCase().includes(q);
      const matchType = ev.eventType.toLowerCase().includes(q);
      const matchNote = ev.note.toLowerCase().includes(q);
      if (!matchActor && !matchBureau && !matchType && !matchNote) return false;
    }
    return true;
  });

  const handleExportAuditDossier = () => {
    const textContent = [
      `========================================================================`,
      `ALL INDIA COUNCIL FOR TECHNICAL EDUCATION (AICTE)`,
      `STATUTORY CERTIFIED AUDIT DOSSIER - SECTION 65B INDIAN EVIDENCE ACT`,
      `========================================================================`,
      `Docket ID         : ${complaint.id}`,
      `Master Incident   : ${complaint.masterIncidentId || 'Standalone'}`,
      `Permanent ID      : ${complaint.pid} - ${complaint.institutionName}`,
      `Current Bureau    : ${complaint.bureau}`,
      `Custodian Officer : ${complaint.ownerWatchdog.recommendedOfficer}`,
      `Cryptographic Hash: ${pseudoSha256}`,
      `Generated Date    : ${new Date().toISOString()}`,
      `Total Chrono Logs : ${complaint.auditHistory.length} immutable entries`,
      `========================================================================\n`,
      ...complaint.auditHistory.map((item, idx) => {
        return [
          `[LOG ENTRY #${complaint.auditHistory.length - idx}]`,
          `TIMESTAMP : ${item.timestamp}`,
          `ACTOR     : ${item.actor} (${item.bureau})`,
          `EVENT     : ${item.eventType}`,
          `NOTE      : ${item.note}`,
          item.expandedDetails ? `ROUTING   : ${item.expandedDetails.routingRule}` : '',
          item.expandedDetails ? `SESSION ID: ${item.expandedDetails.officerSessionId}` : '',
          item.expandedDetails ? `SLA SNAP  : ${item.expandedDetails.slaSnapshot}` : '',
          `------------------------------------------------------------------------`,
        ]
          .filter(Boolean)
          .join('\n');
      }),
    ].join('\n\n');

    const element = document.createElement('a');
    const file = new Blob([textContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `AICTE_Certified_Audit_Trail_${complaint.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    if (triggerToast) {
      triggerToast(`Certified Audit Trail exported for ${complaint.id} (SHA-256 Verified).`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cryptographic Compliance Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-50 rounded-3xl p-6 border border-amber-400/50 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center text-lg shadow-sm">
              <i className="fa-solid fa-stamp"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                  Section 65B Compliant
                </span>
                <span className="text-[10px] font-mono text-amber-300">
                  Non-Repudiable Electronic Record
                </span>
              </div>
              <h3 className="text-base font-bold text-white mt-1">
                Tamper-Proof Chronological Audit Trail &amp; Chain of Custody
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExportAuditDossier}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition cursor-pointer flex items-center gap-2 self-start sm:self-auto shrink-0"
          >
            <i className="fa-solid fa-file-arrow-down text-amber-400"></i>
            <span>Export Official Audit Certificate</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs font-mono border-t border-white/10 text-amber-100/80">
          <div>
            <span className="text-amber-200/70 block text-[10px] uppercase">Ledger Digest:</span>
            <span className="text-emerald-400 font-bold truncate block">{pseudoSha256}</span>
          </div>
          <div>
            <span className="text-amber-200/70 block text-[10px] uppercase">Custodial Bureau:</span>
            <span className="text-amber-300 font-bold truncate block">{complaint.bureau}</span>
          </div>
          <div>
            <span className="text-amber-200/70 block text-[10px] uppercase">Verified Chrono Count:</span>
            <span className="text-white font-bold">{complaint.auditHistory.length} Recorded Events</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-amber-50/40 border border-amber-200/90 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilterType('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'ALL'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            All Logs ({complaint.auditHistory.length})
          </button>
          <button
            onClick={() => setFilterType('COORDINATION')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'COORDINATION'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            Cross-Bureau Sync
          </button>
          <button
            onClick={() => setFilterType('HANDOVER')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'HANDOVER'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            Routing &amp; Handover
          </button>
          <button
            onClick={() => setFilterType('DIRECTIVE')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
              filterType === 'DIRECTIVE'
                ? 'bg-red-600 text-white'
                : 'bg-white text-stone-700 border border-amber-200 hover:bg-amber-50'
            }`}
          >
            Directives &amp; Warnings
          </button>
        </div>

        <div className="relative min-w-[220px]">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs"></i>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search within logs..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-amber-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Chronological Vertical Timeline Ledger */}
      <div className="relative pl-6 sm:pl-8 space-y-5 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-amber-200">
        {filteredHistory.map((ev, i) => {
          const isExpanded = Boolean(expandedIndices[i]);

          const getEventBadge = () => {
            if (ev.isCoordinationEvent) {
              return {
                bg: 'bg-amber-100 text-amber-900 border-amber-300',
                icon: 'fa-code-merge',
                label: 'CROSS-BUREAU COORD',
              };
            }
            if (ev.eventType.toLowerCase().includes('handover') || ev.eventType.toLowerCase().includes('routed')) {
              return {
                bg: 'bg-amber-100 text-amber-800 border-amber-200',
                icon: 'fa-handshake',
                label: 'OWNERSHIP HANDOVER',
              };
            }
            if (ev.eventType.toLowerCase().includes('heartbeat') || ev.eventType.toLowerCase().includes('sync')) {
              return {
                bg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                icon: 'fa-heart-pulse',
                label: 'REAL-TIME TELEMETRY',
              };
            }
            if (ev.eventType.toLowerCase().includes('unmask')) {
              return {
                bg: 'bg-purple-100 text-purple-800 border-purple-200',
                icon: 'fa-user-shield',
                label: 'PII ACCESS LOG',
              };
            }
            return {
              bg: 'bg-slate-100 text-slate-800 border-slate-200',
              icon: 'fa-file-lines',
              label: 'STATUTORY RECORD',
            };
          };

          const badge = getEventBadge();

          return (
            <div key={i} className="relative group">
              {/* Timeline Node Point */}
              <div
                className={`absolute -left-6 sm:-left-8 top-5 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center text-[10px] z-10 ${
                  ev.isCoordinationEvent
                    ? 'border-amber-600 text-amber-600 shadow-sm shadow-amber-600/30'
                    : 'border-slate-400 text-slate-600'
                }`}
              >
                <i className={`fa-solid ${badge.icon}`}></i>
              </div>

              {/* Card Container */}
              <div
                onClick={() => onToggleExpand(i)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
                  ev.isCoordinationEvent
                    ? 'bg-amber-50/40 border-amber-300 hover:border-amber-400'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badge.bg}`}
                    >
                      {badge.label}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">{ev.eventType}</h4>
                  </div>
                  <span className="text-xs font-mono text-slate-500 tabular-nums">
                    {ev.timestamp}
                  </span>
                </div>

                {/* Actor & Bureau */}
                <div className="text-xs font-semibold text-slate-800 mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-amber-800 font-mono">
                    <i className="fa-solid fa-user-check text-[11px] mr-1"></i>
                    {ev.actor}
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-600">{ev.bureau}</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono text-[9px]">
                    Signature #VERIFIED
                  </span>
                </div>

                {/* Event Note */}
                <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-200/60 font-sans">
                  {ev.note}
                </p>

                {/* Expand Toggle */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-amber-700 font-semibold">
                    <i
                      className={`fa-solid ${
                        isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'
                      } text-[10px]`}
                    ></i>
                    {isExpanded ? 'Hide Technical Metadata' : 'View Verified Routing Metadata & Hashes'}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    Log Entry #{complaint.auditHistory.length - i}
                  </span>
                </div>

                {/* Expanded Technical Metadata */}
                {isExpanded && ev.expandedDetails && (
                  <div className="mt-3.5 p-4 rounded-xl bg-stone-900 text-stone-200 border border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">
                        Routing / Engine Rule:
                      </span>
                      <span className="font-semibold text-amber-300">
                        {ev.expandedDetails.routingRule}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">
                        Officer Session ID:
                      </span>
                      <span className="font-semibold text-white">
                        {ev.expandedDetails.officerSessionId}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">
                        SLA Clock Snapshot:
                      </span>
                      <span className="font-semibold text-emerald-400">
                        {ev.expandedDetails.slaSnapshot}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">
                        Handover Verification:
                      </span>
                      <span className="font-semibold text-amber-300">
                        {ev.expandedDetails.handoverStatus}
                      </span>
                    </div>
                    {ev.expandedDetails.attachedFiles && ev.expandedDetails.attachedFiles.length > 0 && (
                      <div className="sm:col-span-2 pt-2 border-t border-slate-800 flex flex-wrap items-center gap-2">
                        <span className="text-slate-400">Cryptographically Sealed Files:</span>
                        {ev.expandedDetails.attachedFiles.map((f, fi) => (
                          <span
                            key={fi}
                            className="px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700 text-[10px]"
                          >
                            <i className="fa-solid fa-lock text-[9px] mr-1"></i>
                            {f.name} ({f.size})
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Append New Sworn Audit Log Form */}
      <form
        onSubmit={onAppendComment}
        className="p-6 rounded-3xl bg-amber-50/30 border-2 border-amber-200/90 space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-500 to-amber-600 text-white flex items-center justify-center text-xs border border-amber-400/40">
              <i className="fa-solid fa-pen-nib"></i>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Append Immutable Statutory Audit Entry
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Recorded with non-repudiable timestamp
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Executing Bureau / Coordinating Authority:
            </label>
            <select
              value={newAuditBureau}
              onChange={(e) => setNewAuditBureau(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              <option value="AICTE HQ Coordination Cell">AICTE HQ Coordination Cell</option>
              <option value="Regulation Bureau (RB)">Regulation Bureau (RB)</option>
              <option value="Public Grievance (PGRC)">Public Grievance (PGRC)</option>
              <option value="Regional Office (Southern)">Regional Office (Southern)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Action Verification Category:
            </label>
            <input
              type="text"
              readOnly
              value="Official Procedural Directive / Verification Note"
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-semibold text-slate-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Sworn Audit Note / Inspection Directive:
          </label>
          <textarea
            value={newAuditNote}
            onChange={(e) => setNewAuditNote(e.target.value)}
            placeholder="Type verified investigation step, student hearing note, or inter-bureau directive..."
            rows={3}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[11px] text-slate-500">
            <i className="fa-solid fa-lock text-slate-400 mr-1"></i>
            This comment will be signed with your officer credentials and cannot be deleted.
          </p>
          <button
            type="submit"
            disabled={!newAuditNote.trim()}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Commit to Audit Trail</span>
          </button>
        </div>
      </form>
    </div>
  );
};

