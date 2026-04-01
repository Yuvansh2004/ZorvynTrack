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
import { ZorvynLogo } from '@/components/ZorvynLogo';
import { motion } from 'framer-motion';

export default function Home() {
  const { isLoading, activeView, currentUser } = useFinance();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: 1,
              rotate: [0, 2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="inline-flex p-10 bg-indigo-600 rounded-[3rem] shadow-2xl shadow-indigo-200 dark:shadow-none"
          >
            <ZorvynLogo className="w-24 h-24 text-white" />
          </motion.div>
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.6em] text-indigo-600/60">ZorvynTrack System Security Technology</p>
            <div className="w-48 h-1 bg-slate-200 dark:bg-slate-800 mx-auto rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
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
