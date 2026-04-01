"use client";

import React from 'react';
import { SummaryCards } from './SummaryCards';
import { AnalyticsCharts } from './AnalyticsCharts';
import { InsightsCard } from './InsightsCard';
import { useFinance } from '@/context/FinanceContext';

export const DashboardView = () => {
  const { currentUser } = useFinance();
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
            Welcome back, {currentUser?.name.split(' ')[0]}!
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Here is your financial status for the current session.</p>
        </div>
        <InsightsCard />
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnalyticsCharts />
      </div>
    </div>
  );
};