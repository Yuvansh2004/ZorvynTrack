
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
import { GreetingPopup } from '@/components/GreetingPopup';
import { ZorvynLogo } from '@/components/ZorvynLogo';
import { motion } from 'framer-motion';

export default function Home() {
  const { isLoading, isTransitioning, activeView, currentUser, isDarkMode, hasSeenTutorial } = useFinance();

  if (isLoading || isTransitioning) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-slate-950' : 'bg-white'} flex items-center justify-center transition-colors duration-500 p-6`}>
        <div className="text-center space-y-12 w-full max-w-sm">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <p className="text-4xl md:text-5xl font-black italic uppercase tracking-[0.15em] text-slate-900 dark:text-white">
              Zorvyn<span className="text-indigo-600">Track</span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: 1,
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="inline-flex p-10 md:p-12 bg-indigo-600 rounded-[3rem] shadow-2xl relative"
          >
            <ZorvynLogo className="w-16 h-16 md:w-20 md:h-20 text-white" />
          </motion.div>

          <div className="space-y-8">
            <div className="w-48 md:w-64 h-1.5 bg-slate-100 dark:bg-slate-900 mx-auto rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-indigo-600"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
            
            <div className="space-y-3">
              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600"
              >
                System Synchronization Active
              </motion.p>
              <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600">
                ZorvynTrack System Security Technology
              </p>
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row font-body transition-colors duration-300">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
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
      {/* Onboarding Flow: Tutorial first for new users, then Greeting triggers after tutorial */}
      <Tutorial />
      <GreetingPopup />
    </div>
  );
}
