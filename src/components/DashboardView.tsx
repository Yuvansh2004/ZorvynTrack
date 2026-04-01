"use client";

import React from 'react';
import { SummaryCards } from './SummaryCards';
import { AnalyticsCharts } from './AnalyticsCharts';
import { InsightsCard } from './InsightsCard';

export const DashboardView = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Dashboard Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Welcome back, Yuvansh Dashrath Koli</p>
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
