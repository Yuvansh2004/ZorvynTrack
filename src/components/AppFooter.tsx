"use client";

import React from 'react';
import { ASSIGNMENT_REF_ID } from '@/context/FinanceContext';
import { Mail, Github, Linkedin, Shield, Lock, Activity } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

const ZorvynLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L80 20L20 80L80 80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" />
  </svg>
);

export const AppFooter = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm">
              <ZorvynLogo className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">ZorvynTrack</span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
            Institutional student finance tracker built for the Zorvyn assessment. 
            Clean, secure, and data-driven management for modern learners.
          </p>
          <div className="flex items-center gap-3">
            <a href="mailto:yuvanshkoli1011@gmail.com" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-indigo-600 transition-colors">
              <Mail className="w-4 h-4" />
            </a>
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-indigo-600 transition-colors">
              <Github className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:text-indigo-600 transition-colors">
              <Linkedin className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Assignment Details</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
            <li>Ref ID: <span className="text-indigo-600 font-bold">{ASSIGNMENT_REF_ID}</span></li>
            <li>Role: Frontend Developer</li>
            <li>Status: Verified Assessment</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Developer Info</h4>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <p className="text-sm font-bold text-slate-900 dark:text-white">Yuvansh Dashrath Koli</p>
            <p className="text-xs text-slate-500 mt-1">Student Intern Applicant</p>
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Personal: <span className="text-indigo-600 font-semibold">yuvanshkoli1011@gmail.com</span>
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                College: <span className="text-indigo-600 font-semibold">yuvanshkoli2324@ternaengg.ac.in</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-400">© {currentYear} Zorvyn Scan Technology • Built by Yuvansh Koli</p>
        <div className="flex items-center gap-6">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xs font-bold text-slate-400 hover:text-indigo-600">Privacy Policy</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="p-2 w-fit bg-indigo-50 rounded-lg mb-2">
                  <Lock className="w-5 h-5 text-indigo-600" />
                </div>
                <DialogTitle>Privacy Protocols</DialogTitle>
                <DialogDescription>
                  Your financial data is stored locally within your secure session. 
                  We follow zero-knowledge principles for student data safety.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <button className="text-xs font-bold text-slate-400 hover:text-indigo-600">Audit Logs</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="p-2 w-fit bg-indigo-50 rounded-lg mb-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                </div>
                <DialogTitle>System Audit</DialogTitle>
                <DialogDescription>
                  Continuous monitoring active for node {ASSIGNMENT_REF_ID}. 
                  Ledger integrity is verified and action-logged.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
};