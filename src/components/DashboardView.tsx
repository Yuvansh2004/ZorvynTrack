"use client";

import React from 'react';
import { SummaryCards } from './SummaryCards';
import { AnalyticsCharts } from './AnalyticsCharts';
import { InsightsCard } from './InsightsCard';
import { useFinance } from '@/context/FinanceContext';
import { motion } from 'framer-motion';

export const DashboardView = () => {
  const { currentUser } = useFinance();
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
            Hi, {currentUser?.name.split(' ')[0]}!
          </h1>
          <p className="text-slate-500 text-sm mt-3 font-semibold uppercase tracking-widest opacity-70">
            ZorvynTrack System Security Technology
          </p>
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
