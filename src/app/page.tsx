
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
  BellRing,
  Target,
  Info,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { LoginPage } from '@/components/LoginPage';

const DashboardView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Financial Pulse</h2>
        <p className="text-slate-400 text-sm mt-1">Real-time overview of your capital and cashflow.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl text-xs font-medium text-slate-300">
          <Calendar className="w-4 h-4 text-primary" />
          {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <SummaryCards />
        <AnalyticsCharts />
      </div>
      <div className="space-y-6">
        <Card className="glass-card border-none text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-primary">
              <Target className="w-4 h-4" /> MONTHLY TARGETS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span>Savings Goal</span>
                <span className="text-white">72%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[72%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span>Expense Limit</span>
                <span className="text-rose-400">95%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[95%]"></div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-400 font-medium">You are currently ₹2,400 under your monthly discretionary budget.</p>
            </div>
          </CardContent>
        </Card>
        <InsightsCard />
      </div>
    </div>
    
    <TransactionList />
  </motion.div>
);

const TransactionsView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-6"
  >
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-white">Ledger</h2>
      <p className="text-slate-400 text-sm mt-1">Full audit trail of all financial movements.</p>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Intelligence</h2>
      <p className="text-slate-400 text-sm mt-1">Deep dive into spending habits and savings performance.</p>
    </div>
    <div className="grid grid-cols-1 gap-8">
      <SummaryCards />
      <AnalyticsCharts />
      <InsightsCard />
    </div>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Wallet Management</h2>
      <p className="text-slate-400 text-sm mt-1">Connected accounts and virtual card security.</p>
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
            <p className="text-sm font-bold text-white uppercase">Yuvansh Dashrath Koli</p>
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
        <p className="mt-4 font-bold text-slate-400 group-hover:text-white transition-colors">Provision New Card</p>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Portfolio</h2>
      <p className="text-slate-400 text-sm mt-1">Real-time asset tracking and market exposure.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-8 rounded-2xl border border-slate-800/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h4 className="font-bold text-white">Equity Holdings</h4>
            <p className="text-xs text-slate-500">BSE/NSE Markets</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
            <span className="text-sm text-slate-300">Reliance Industries</span>
            <span className="text-sm font-bold text-emerald-400">+4.2%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
            <span className="text-sm text-slate-300">TCS</span>
            <span className="text-sm font-bold text-rose-400">-1.5%</span>
          </div>
        </div>
      </div>
      <div className="glass-card p-8 rounded-2xl border border-slate-800/50 flex flex-col justify-center items-center text-center">
        <Zap className="w-12 h-12 text-primary mb-4" />
        <h4 className="font-bold text-white">Market Insights Locked</h4>
        <p className="text-sm text-slate-500 mt-2 max-w-[240px]">Access to proprietary Zorvyn algorithm insights requires Pro tier.</p>
        <Button className="mt-6 bg-primary text-primary-foreground font-bold px-8">Upgrade Access</Button>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Configuration</h2>
      <p className="text-slate-400 text-sm mt-1">Adjust your environment and security parameters.</p>
    </div>
    <div className="max-w-2xl space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800/50 space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-white">System Notifications</span>
          </div>
          <div className="w-10 h-6 bg-primary rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
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

const AuthenticatedApp = () => (
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
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-slate-500 text-[10px] gap-4 font-bold uppercase tracking-[2px]">
          <div className="flex flex-col gap-1">
            <p>© 2024 ZORVYNTRACK PRO</p>
            <p className="text-slate-600">TECHNICAL SCREENING ASSESSMENT</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-slate-400 uppercase">Yuvansh Dashrath Koli</p>
              <p className="text-slate-600">TERNA ENGINEERING COLLEGE</p>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </div>
  </SidebarProvider>
);

export default function Home() {
  const { isLoggedIn, isLoading } = useFinance();

  if (isLoading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">Initialising Zorvyn Engine...</div>;

  return (
    <AnimatePresence mode="wait">
      {isLoggedIn ? (
        <AuthenticatedApp key="app" />
      ) : (
        <LoginPage key="login" />
      )}
    </AnimatePresence>
  );
}
