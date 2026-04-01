"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardView } from '@/components/DashboardView';
import { TransactionsView } from '@/components/TransactionsView';
import { InsightsView } from '@/components/InsightsView';
import { SettingsView } from '@/components/SettingsView';
import { LoginPage } from '@/components/LoginPage';
import { AppFooter } from '@/components/AppFooter';
import { Tutorial } from '@/components/Tutorial';

const ZorvynLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L80 20L20 80L80 80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" />
  </svg>
);

export default function Home() {
  const { isLoading, activeView, currentUser } = useFinance();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-indigo-600 rounded-2xl shadow-lg">
            <ZorvynLogo className="w-10 h-10 text-white" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading System...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-body">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-6xl mx-auto min-h-screen flex flex-col">
          <div className="flex-1">
            {activeView === 'Dashboard' && <DashboardView />}
            {activeView === 'Transactions' && <TransactionsView />}
            {activeView === 'Insights' && <InsightsView />}
            {activeView === 'Settings' && <SettingsView />}
          </div>
          <AppFooter />
        </div>
      </main>
      <Tutorial />
    </div>
  );
}