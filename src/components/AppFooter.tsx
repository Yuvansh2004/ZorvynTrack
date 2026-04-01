"use client";

import React from 'react';
import { ASSIGNMENT_REF_ID } from '@/context/FinanceContext';
import { Mail, Github, Linkedin, Shield } from 'lucide-react';

export const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-900 pt-12 pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Zorvyn<span className="text-indigo-600">Track</span></span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs font-medium">
            An institutional-grade finance dashboard built for the Zorvyn FinTech assessment. Focused on real-time data visualization, RBAC security, and intuitive student financial management.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:yuvanshkoli1011@gmail.com" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900">
              <Mail className="w-4 h-4" />
            </a>
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900">
              <Github className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-400 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900">
              <Linkedin className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Assignment Matrix</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400 group">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform"></div>
              Reference ID: <span className="text-indigo-600 dark:text-indigo-400">{ASSIGNMENT_REF_ID}</span>
            </li>
            <li className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400 group">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform"></div>
              Role: Frontend Developer
            </li>
            <li className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-400 group">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform"></div>
              Status: Evaluated Final
            </li>
          </ul>
        </div>

        <div className="space-y-5">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Developer Node</h4>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 space-y-3">
            <div>
              <p className="text-xs font-black uppercase tracking-tight text-slate-900 dark:text-white">Yuvansh Dashrath Koli</p>
              <p className="text-[10px] text-slate-500 font-bold mt-1 italic">Internship Applicant</p>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-[10px] text-slate-500 truncate font-medium">Personal: yuvanshkoli1011@gmail.com</p>
              <p className="text-[10px] text-slate-500 truncate font-medium">College: yuvanshkoli2324@ternaengg.ac.in</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[9px] font-black uppercase tracking-[3px] text-slate-300 dark:text-slate-700">© {currentYear} Zorvyn Scan Technology • Institutional Node Terminal</p>
        <div className="flex items-center gap-8">
          <button className="text-[9px] font-black uppercase tracking-[1px] text-slate-400 hover:text-indigo-600 transition-colors">Privacy Protocols</button>
          <button className="text-[9px] font-black uppercase tracking-[1px] text-slate-400 hover:text-indigo-600 transition-colors">System Audit</button>
        </div>
      </div>
    </footer>
  );
};
