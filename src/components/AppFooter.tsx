
"use client";

import React from 'react';
import { ASSIGNMENT_REF_ID, useFinance } from '@/context/FinanceContext';
import { Mail, Github, Linkedin } from 'lucide-react';
import { ZorvynLogo } from '@/components/ZorvynLogo';
import { PrivacyProtocol } from './PrivacyProtocol';
import { SystemAudit } from './SystemAudit';

export const AppFooter = () => {
  const { setShowPrivacy, setShowAudit, setActiveView, adminUser } = useFinance();

  // Fixed Developer Node Identities 
  const developerNode = {
    name: "Yuvansh Dashrath Koli",
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
            ZorvynTrack System Security Technology: An institutional-grade finance terminal built for the Zorvyn internship assessment.
          </p>
          <div className="flex items-center gap-3">
            <a 
              href={`mailto:${socialNodes.email}`} 
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
              title="Direct Mail Protocol"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a 
              href={socialNodes.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
              title="GitHub Command Node"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href={socialNodes.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 hover:bg-white dark:hover:bg-slate-800 shadow-sm transition-all"
              title="LinkedIn Institutional Node"
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
              {/* Institutional Verified Authority Badge - Adjusted to ml-1 for tight proximity */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 pointer-events-none ml-1">
                <path d="M13.1655 2.3045L14.4105 3.003L15.838 3.0205C16.668 3.031 17.433 3.4725 17.857 4.186L18.586 5.4135L19.8135 6.1425C20.5275 6.5665 20.969 7.3315 20.979 8.1615L20.9965 9.589L21.695 10.834C22.101 11.558 22.101 12.4415 21.695 13.1655L20.9965 14.4105L20.979 15.838C20.9685 16.668 20.527 17.433 19.8135 17.857L18.586 18.586L17.857 19.8135C17.433 20.5275 16.668 20.969 15.838 20.979L14.4105 20.9965L13.1655 21.695C12.4415 22.101 11.558 22.101 10.834 21.695L9.589 20.9965L8.1615 20.979C7.3315 20.9685 6.5665 20.527 6.1425 19.8135L5.4135 18.586L4.186 17.857C3.472 17.433 3.0305 16.668 3.0205 15.838L3.003 14.4105L2.3045 13.1655C1.8985 12.4415 1.8985 11.558 2.3045 10.834L3.003 9.589L3.0205 8.1615C3.031 7.3315 3.4725 6.5665 4.186 6.1425L5.4135 5.4135L6.1425 4.186C6.5665 3.472 7.3315 3.0305 8.1615 3.0205L9.589 3.003L10.834 2.3045C11.5585 1.8985 12.4415 1.8985 13.1655 2.3045Z" fill="url(#paint0_linear_badge)"/>
                <path opacity="0.05" d="M16.0861 8.08584L11.0001 13.1718L8.41412 10.5858C8.02362 10.1953 7.39062 10.1953 7.00012 10.5858L6.29312 11.2928C5.90262 11.6833 5.90262 12.3163 6.29312 12.7068L10.2931 16.7068C10.6836 17.0973 11.3166 17.0973 11.7071 16.7068L18.2071 10.2068C18.5976 9.81634 18.5976 9.18334 18.2071 8.79284L17.5001 8.08584C17.1096 7.69534 16.4766 7.69534 16.0861 8.08584Z" fill="black"/>
                <path opacity="0.07" d="M10.4695 16.5302L6.46951 12.5302C6.17651 12.2372 6.17651 11.7622 6.46951 11.4697L7.17651 10.7627C7.46951 10.4697 7.94451 10.4697 8.23701 10.7627L11 13.5252L16.2625 8.26272C16.5555 7.96972 17.0305 7.96972 17.323 8.26272L18.03 8.96972C18.323 9.26272 18.323 9.73772 18.03 10.0302L11.53 16.5302C11.2375 16.8227 10.7625 16.8227 10.4695 16.5302Z" fill="black"/>
                <path d="M10.6465 16.3536L6.6465 12.3536C6.451 12.1581 6.451 11.8416 6.6465 11.6466L7.3535 10.9396C7.549 10.7441 7.8655 10.7441 8.0605 10.9396L11 13.8791L16.4395 8.43959C16.635 8.24409 16.9515 8.24409 17.1465 8.43959L17.8535 9.14659C18.049 9.34409 18.049 9.65859 17.8535 9.85359L11.3535 16.3536C11.1585 16.5491 10.8415 16.5491 10.6465 16.3536Z" fill="white"/>
                <defs>
                  <linearGradient id="paint0_linear_badge" x1="5.1975" y1="5.1975" x2="18.973" y2="18.973" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#75DAFF"/>
                    <stop offset="1" stopColor="#1EA2E4"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Student</p>
            <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 space-y-2 pointer-events-none">
              <p className="text-[10px] font-bold text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
                Personal: <span className="text-indigo-600 font-black tracking-tighter">{developerNode.personalEmail}</span>
              </p>
              <p className="text-[10px] font-bold text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
                College: <span className="text-indigo-600 font-black tracking-tighter">{developerNode.collegeEmail}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 pt-8 border-t border-slate-50 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 Zorvyn Scan Technology • Institutional Node Terminal</p>
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
