
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Mail, Github, Linkedin } from 'lucide-react';
import { ZorvynLogo } from '@/components/ZorvynLogo';
import { PrivacyProtocol } from './PrivacyProtocol';
import { SystemAudit } from './SystemAudit';

export const AppFooter = () => {
  const { setShowPrivacy, setShowAudit, setActiveView, adminUser } = useFinance();

  // Permanent Developer Node Identity - Hardcoded for Attribution Integrity
  const developerNode = {
    name: "YUVANSH DASHRATH KOLI",
    personalEmail: "yuvanshkoli1011@gmail.com",
    collegeEmail: "yuvanshkoli2324@ternaengg.ac.in"
  };

  // Global Social Nodes synchronized from Admin Settings Command Center
  const socialNodes = {
    email: adminUser?.personalEmail || developerNode.personalEmail,
    github: adminUser?.github || "https://github.com/yuvanshkoli",
    linkedin: adminUser?.linkedin || "https://linkedin.com/in/yuvanshkoli"
  };

  return (
    <footer className="mt-20 border-t border-slate-100 dark:border-slate-900 pt-12 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveView('Settings')}
          >
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none group-hover:scale-110 transition-transform">
              <ZorvynLogo className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase">Zorvyn<span className="text-indigo-600">Track</span></span>
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-xs">
            ZorvynTrack Institutional Node Terminal: A professional auditing tool built for student finance management.
          </p>
          <div className="flex items-center gap-3">
            <a 
              href={socialNodes.email.includes('@') ? `mailto:${socialNodes.email}` : socialNodes.email} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
              title="Mail Protocol"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href={socialNodes.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
              title="GitHub Node"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={socialNodes.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
              title="LinkedIn Node"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Developed By</h4>
          <div 
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm select-none"
            onContextMenu={(e) => e.preventDefault()}
          >
            <div className="flex items-center mb-1">
              <p className="text-sm font-black text-slate-900 dark:text-white uppercase italic tracking-tight">
                {developerNode.name}
              </p>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Student</p>
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 space-y-2">
              <p className="text-[10px] font-bold text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
                Personal: <span className="text-indigo-600 font-black tracking-tighter">{developerNode.personalEmail}</span>
              </p>
              <p className="text-[10px] font-black text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
                College: <span className="text-indigo-600 font-black tracking-tighter">{developerNode.collegeEmail}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-slate-50 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 Zorvyn Scan Technology • Institutional Terminal Node</p>
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setShowPrivacy(true)}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
          >
            Privacy Protocols
          </button>
          <button 
            onClick={() => setShowAudit(true)}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors"
          >
            System Audit
          </button>
        </div>
      </div>
      <PrivacyProtocol />
      <SystemAudit />
    </footer>
  );
};
