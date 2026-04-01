
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardView } from '@/components/DashboardView';
import { TransactionsView } from '@/components/TransactionsView';
import { InsightsView } from '@/components/InsightsView';
import { SettingsView } from '@/components/SettingsView';
import { Zap } from 'lucide-react';

export default function Home() {
  const { isLoading, activeView } = useFinance();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="relative animate-bounce">
            <div className="bg-indigo-600 p-4 rounded-[1.5rem] rotate-3 shadow-xl shadow-indigo-500/20">
              <Zap className="w-10 h-10 text-white fill-white/20" />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-black uppercase tracking-[8px] text-slate-400">Syncing Node</p>
            <div className="w-24 h-1 bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 animate-progress origin-left"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-body">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
        <div className="max-w-6xl mx-auto">
          {activeView === 'Dashboard' && <DashboardView />}
          {activeView === 'Transactions' && <TransactionsView />}
          {activeView === 'Insights' && <InsightsView />}
          {activeView === 'Settings' && <SettingsView />}
        </div>
      </main>
    </div>
  );
}
