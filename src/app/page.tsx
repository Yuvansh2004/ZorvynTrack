
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
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center transition-colors duration-500">
        <div className="text-center space-y-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: 1,
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="inline-flex p-16 bg-indigo-600 rounded-[4rem] shadow-2xl relative"
          >
            <ZorvynLogo className="w-28 h-28 text-white" />
          </motion.div>

          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-xl font-black italic uppercase tracking-[0.2em] text-slate-900 dark:text-white">
                Zorvyn<span className="text-indigo-600">Track</span>
              </p>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
                System Security Technology
              </p>
            </div>

            <div className="w-64 h-1.5 bg-slate-100 dark:bg-slate-900 mx-auto rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <motion.p 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-600"
            >
              System Initialization Active
            </motion.p>
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
