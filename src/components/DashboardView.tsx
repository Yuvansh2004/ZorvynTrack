
"use client";

import React from 'react';
import { SummaryCards } from './SummaryCards';
import { AnalyticsCharts } from './AnalyticsCharts';
import { InsightsCard } from './InsightsCard';
import { useFinance } from '@/context/FinanceContext';
import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Mail } from 'lucide-react';

export const DashboardView = () => {
  const { currentUser } = useFinance();
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
              Hi, {currentUser?.name.split(' ')[0]}!
            </h1>
            <p className="text-slate-500 text-sm mt-3 font-semibold uppercase tracking-widest opacity-70">
              ZorvynTrack System Security Technology
            </p>
          </div>

          {/* Personal Node Cluster - Visible to all users */}
          <div className="flex items-center gap-3">
            {(currentUser?.github || currentUser?.linkedin || currentUser?.personalEmail) ? (
              <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm animate-in fade-in slide-in-from-left-4 duration-700">
                <div className="px-3 py-1 bg-indigo-600 rounded-xl flex items-center gap-2">
                  <ExternalLink className="w-3 h-3 text-white" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">Personal Cluster</span>
                </div>
                <div className="flex items-center gap-1.5 px-2">
                  {currentUser?.personalEmail && (
                    <a href={`mailto:${currentUser.personalEmail}`} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Mail className="w-4 h-4" />
                    </a>
                  )}
                  {currentUser?.github && (
                    <a href={currentUser.github} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {currentUser?.linkedin && (
                    <a href={currentUser.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic ml-1">No personal external nodes linked</p>
            )}
          </div>
        </motion.div>
        
        <InsightsCard />
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <AnalyticsCharts />
      </div>
    </div>
  );
};
