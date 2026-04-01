
"use client";

import { FinanceProvider } from '@/context/FinanceContext';
import { Navbar } from '@/components/Navbar';
import { SummaryCards } from '@/components/SummaryCards';
import { AnalyticsCharts } from '@/components/AnalyticsCharts';
import { TransactionList } from '@/components/TransactionList';
import { InsightsCard } from '@/components/InsightsCard';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <FinanceProvider>
      <div className="min-h-screen bg-[#020617] text-slate-100 font-body">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryCards />
            <AnalyticsCharts />
            
            <div className="grid grid-cols-1 gap-6">
              <InsightsCard />
              <TransactionList />
            </div>
          </motion.div>
        </main>
        
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm gap-4">
          <p>© 2024 ZorvynTrack. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Powered by Next.js & Framer Motion</span>
            <div className="h-4 w-px bg-slate-800"></div>
            <span>Developer: Yuvansh Dashrath Koli</span>
          </div>
        </footer>
      </div>
    </FinanceProvider>
  );
}
