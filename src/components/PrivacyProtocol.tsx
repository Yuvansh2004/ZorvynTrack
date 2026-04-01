
"use client";

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useFinance } from '@/context/FinanceContext';
import { ShieldCheck, Lock, EyeOff, Database } from 'lucide-react';

export const PrivacyProtocol = () => {
  const { showPrivacy, setShowPrivacy } = useFinance();

  return (
    <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
      <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] bg-white dark:bg-slate-950 p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-indigo-600 p-10 flex items-center gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-xl">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">Privacy<span className="text-indigo-200">Protocols</span></h2>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-100 mt-1">ZorvynTrack Institutional Security</p>
          </div>
        </div>
        
        <div className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Lock className="w-5 h-5 text-indigo-600 mb-4" />
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Encrypted Nodes</h4>
              <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">All transaction telemetry is processed through institutional-grade encryption protocols to ensure data integrity.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <EyeOff className="w-5 h-5 text-indigo-600 mb-4" />
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Audit Confidentiality</h4>
              <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">Viewer nodes are restricted to local telemetry only. Admin overrides are strictly logged for auditing purposes.</p>
            </div>
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <Database className="w-5 h-5 text-indigo-600 mb-4" />
              <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white">Data Retention</h4>
              <p className="text-xs text-slate-500 font-medium mt-2 leading-relaxed">Master ledger records are maintained in secure session vaults to prevent unauthorized synchronization leaks.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-900">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">© 2026 Zorvyn Scan Technology • Institutional Node Terminal</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
