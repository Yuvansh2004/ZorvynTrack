
"use client";

import { FinanceProvider, useFinance } from '@/context/FinanceContext';
import { Navbar } from '@/components/Navbar';
import { SummaryCards } from '@/components/SummaryCards';
import { AnalyticsCharts } from '@/components/AnalyticsCharts';
import { TransactionList } from '@/components/TransactionList';
import { InsightsCard } from '@/components/InsightsCard';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  Settings as SettingsIcon, 
  LayoutDashboard,
  ShieldCheck,
  Zap,
  BellRing
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
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
);

const TransactionsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white">Full Transaction History</h2>
      <p className="text-slate-400 text-sm mt-1">Manage and audit your complete financial record.</p>
    </div>
    <TransactionList />
  </motion.div>
);

const AnalyticsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white">Deep Analytics</h2>
      <p className="text-slate-400 text-sm mt-1">Visualize your spending patterns over time.</p>
    </div>
    <SummaryCards />
    <AnalyticsCharts />
    <InsightsCard />
  </motion.div>
);

const CardsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white">Virtual Cards</h2>
      <p className="text-slate-400 text-sm mt-1">Manage your connected bank cards and wallets.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="h-56 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-900 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform"></div>
        <div className="flex justify-between items-start">
          <ShieldCheck className="w-10 h-10 text-white/80" />
          <span className="text-white/60 font-bold tracking-widest text-xs uppercase">Premium Visa</span>
        </div>
        <div className="space-y-1">
          <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Card Number</p>
          <p className="text-2xl font-mono text-white tracking-[4px]">**** **** **** 1011</p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/40 text-[8px] uppercase font-bold">Card Holder</p>
            <p className="text-sm font-bold text-white uppercase">Yuvansh Koli</p>
          </div>
          <div className="w-12 h-8 bg-amber-400/20 rounded flex items-center justify-center border border-amber-400/30 text-amber-400 text-[10px] font-bold italic">
            Zorvyn
          </div>
        </div>
      </div>
      <div className="glass-card h-56 rounded-3xl p-8 flex flex-col justify-center items-center border-dashed border-2 border-slate-700 hover:border-primary transition-colors cursor-pointer group">
        <div className="p-4 bg-slate-800 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-all">
          <Zap className="w-8 h-8" />
        </div>
        <p className="mt-4 font-bold text-slate-400 group-hover:text-white transition-colors">Add New Card</p>
      </div>
    </div>
  </motion.div>
);

const InvestmentsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white">Investments</h2>
      <p className="text-slate-400 text-sm mt-1">Track your portfolio performance across stocks and crypto.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-8 rounded-2xl border border-slate-800/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h4 className="font-bold text-white">Stock Portfolio</h4>
            <p className="text-xs text-slate-500">Global Markets</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
            <span className="text-sm text-slate-300">Reliance Ind.</span>
            <span className="text-sm font-bold text-emerald-400">+4.2%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
            <span className="text-sm text-slate-300">TCS Ltd.</span>
            <span className="text-sm font-bold text-rose-400">-1.5%</span>
          </div>
        </div>
      </div>
      <div className="glass-card p-8 rounded-2xl border border-slate-800/50 flex flex-col justify-center items-center text-center">
        <Zap className="w-12 h-12 text-primary mb-4" />
        <h4 className="font-bold text-white">Pro Insights Required</h4>
        <p className="text-sm text-slate-500 mt-2 max-w-[240px]">Upgrade to Zorvyn Premium to unlock detailed investment tracking.</p>
        <Button className="mt-6 bg-primary text-white font-bold px-8">Upgrade Now</Button>
      </div>
    </div>
  </motion.div>
);

const SettingsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white">Account Settings</h2>
      <p className="text-slate-400 text-sm mt-1">Configure your personal preferences and security.</p>
    </div>
    <div className="max-w-2xl space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800/50 space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <BellRing className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-white">Push Notifications</span>
          </div>
          <div className="w-10 h-6 bg-primary rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-white">Two-Factor Authentication</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">Enabled</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const ViewSwitcher = () => {
  const { activeView } = useFinance();
  
  switch (activeView) {
    case 'Dashboard': return <DashboardView />;
    case 'Transactions': return <TransactionsView />;
    case 'Analytics': return <AnalyticsView />;
    case 'Cards': return <CardsView />;
    case 'Investments': return <InvestmentsView />;
    case 'Settings': return <SettingsView />;
    default: return <DashboardView />;
  }
};

export default function Home() {
  return (
    <FinanceProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-[#020617] text-slate-100 font-body w-full">
          <AppSidebar />
          
          <SidebarInset className="flex-1 overflow-auto bg-[#020617]">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 py-8">
              <AnimatePresence mode="wait">
                <ViewSwitcher />
              </AnimatePresence>
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
