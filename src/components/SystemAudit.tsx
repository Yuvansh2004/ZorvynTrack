
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useFinance, ASSIGNMENT_REF_ID } from '@/context/FinanceContext';
import { Activity, Terminal, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const SystemAudit = () => {
  const { showAudit, setShowAudit, currentUser, userRole } = useFinance();

  const auditLogs = [
    { time: "09:42:12", event: "Node Authentication", status: "Verified", color: "text-emerald-500" },
    { time: "09:42:15", event: "Master Ledger Sync", status: "Active", color: "text-indigo-500" },
    { time: "09:43:01", event: "Security Token Refresh", status: "Success", color: "text-emerald-500" },
    { time: "09:44:20", event: "Telemetry Validation", status: "Complete", color: "text-emerald-500" },
    { time: "09:45:00", event: "RBAC Module Check", status: "Secure", color: "text-indigo-500" },
  ];

  return (
    <Dialog open={showAudit} onOpenChange={setShowAudit}>
      <DialogContent className="sm:max-w-[550px] rounded-[2.5rem] bg-slate-950 p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-slate-900 p-10 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-5">
            <div className="bg-indigo-600 p-3.5 rounded-2xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">System<span className="text-indigo-500">Audit</span></h2>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-1">Real-Time Node Diagnostics</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ref: {ASSIGNMENT_REF_ID}</p>
          </div>
        </div>
        
        <div className="p-10 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-indigo-500">
              <Terminal className="w-4 h-4" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em]">Diagnostic Console</h4>
            </div>
            <div className="bg-black/50 border border-slate-800 rounded-2xl p-6 font-mono text-[11px] space-y-3">
              {auditLogs.map((log, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-600">[{log.time}]</span>
                    <span className="text-slate-300 font-bold uppercase">{log.event}</span>
                  </div>
                  <span className={log.color}>{log.status}</span>
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-indigo-500 animate-pulse font-black uppercase tracking-widest">Active Scan in Progress...</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              </div>
            </div>
          </div>

          <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl flex items-start gap-5">
            <ShieldAlert className="w-6 h-6 text-indigo-500 mt-1" />
            <div>
              <h4 className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">Auth Protocol Status</h4>
              <p className="text-xs text-indigo-100 font-medium mt-1 leading-relaxed">
                Active Session: {currentUser?.name} ({userRole} node)
              </p>
            </div>
          </div>

          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-700 text-center">
            ZorvynTrack System Security Technology • Institutional Node
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
