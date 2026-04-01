"use client";

import React from 'react';
import { SummaryCards } from './SummaryCards';
import { AnalyticsCharts } from './AnalyticsCharts';
import { InsightsCard } from './InsightsCard';
import { useFinance } from '@/context/FinanceContext';

export const DashboardView = () => {
  const { currentUser } = useFinance();
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome back, {currentUser?.name.split(' ')[0]}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Financial summary for {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        
        <InsightsCard />
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AnalyticsCharts />
      </div>
    </div>
  );
};