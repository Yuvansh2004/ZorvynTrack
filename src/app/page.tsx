"use client";

import { useFinance } from '@/context/FinanceContext';
import { Navbar } from '@/components/Navbar';
import { SummaryCards } from '@/components/SummaryCards';
import { AnalyticsCharts } from '@/components/AnalyticsCharts';
import { TransactionList } from '@/components/TransactionList';
import { InsightsCard } from '@/components/InsightsCard';
import { motion } from 'framer-motion';

export default function Home() {
  const { isLoading } = useFinance();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
              <p className="text-slate-500 text-sm">Welcome back, Yuvansh Dashrath Koli</p>
            </div>
            <InsightsCard />
          </div>

          <SummaryCards />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnalyticsCharts />
          </div>

          <TransactionList />
        </motion.div>
      </main>
    </div>
  );
}