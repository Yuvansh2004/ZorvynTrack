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
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <h1 className="text-4xl lg:text-5xl weight-black text-slate-900 dark:text-white tracking-[-0.05em] leading-none">
            Welcome back, {currentUser?.name.split(' ')[0]}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 font-medium uppercase tracking-widest opacity-60">
            Zorvyn Scan Technology
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <InsightsCard />
        </motion.div>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <AnalyticsCharts />
      </div>
    </div>
  );
};
