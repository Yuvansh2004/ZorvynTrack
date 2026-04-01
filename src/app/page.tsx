"use client";

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Navbar } from '@/components/Navbar';
import { AppSidebar } from '@/components/AppSidebar';
import { DashboardView } from '@/components/DashboardView';
import { TransactionsView } from '@/components/TransactionsView';
import { InsightsView } from '@/components/InsightsView';
import { SettingsView } from '@/components/SettingsView';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { isLoading, activeView } = useFinance();
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    setIsSwitching(true);
    const timer = setTimeout(() => setIsSwitching(false), 400);
    return () => clearTimeout(timer);
  }, [activeView]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Synchronizing Kernel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-body">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          <AnimatePresence mode="wait">
            {isSwitching ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-slate-50/50 z-10"
              >
                <div className="h-1 w-24 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="h-full w-1/2 bg-indigo-600"
                  />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {activeView === 'Dashboard' && <DashboardView />}
            {activeView === 'Transactions' && <TransactionsView />}
            {activeView === 'Insights' && <InsightsView />}
            {activeView === 'Settings' && <SettingsView />}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
