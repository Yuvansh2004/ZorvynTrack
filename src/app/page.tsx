"use client";

import { FinanceProvider } from '@/context/FinanceContext';
import { Navbar } from '@/components/Navbar';
import { SummaryCards } from '@/components/SummaryCards';
import { AnalyticsCharts } from '@/components/AnalyticsCharts';
import { TransactionList } from '@/components/TransactionList';
import { InsightsCard } from '@/components/InsightsCard';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <FinanceProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-[#020617] text-slate-100 font-body w-full">
          <AppSidebar />
          
          <SidebarInset className="flex-1 overflow-auto bg-[#020617]">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 py-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
                  <p className="text-slate-400 text-sm mt-1">Welcome back, Yuvansh. Here's your financial status today.</p>
                </div>

                <SummaryCards />
                <AnalyticsCharts />
                
                <div className="grid grid-cols-1 gap-8">
                  <InsightsCard />
                  <TransactionList />
                </div>
              </motion.div>
            </main>
            
            <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-slate-500 text-xs gap-4 font-medium uppercase tracking-wider">
              <p>© 2024 ZorvynTrack. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <span>Next.js • Framer Motion • Recharts</span>
                <div className="h-4 w-px bg-slate-800"></div>
                <span className="text-slate-400">Developer: Yuvansh Dashrath Koli</span>
              </div>
            </footer>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </FinanceProvider>
  );
}