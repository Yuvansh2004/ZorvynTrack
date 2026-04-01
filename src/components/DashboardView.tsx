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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">
            Hi, <span className="text-indigo-600">{currentUser?.name.split(' ')[0]}!</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">
            Here's what's happening with your finances today.
          </p>
        </motion.div>
        
        <InsightsCard />
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AnalyticsCharts />
      </div>
    </div>
  );
};