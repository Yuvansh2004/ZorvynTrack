
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
  TrendingUp, 
  Target,
  Calendar,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
        <h2 className="text-3xl font-bold tracking-tight text-white">Consolidated Outlook</h2>
        <p className="text-slate-400 text-sm mt-1">Real-time telemetry of global financial movements.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl text-xs font-medium text-slate-300">
          <Calendar className="w-4 h-4 text-primary" />
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
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
              <Target className="w-4 h-4" /> ASSET ALLOCATION TARGETS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span>Capital Preservation</span>
                <span className="text-white">72%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[72%]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <span>Operational Runway</span>
                <span className="text-rose-400">95%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[95%]"></div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800">
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">AI SYSTEM ANALYSIS: Liquidity remains high. Diversification into emerging markets suggested for Q3.</p>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Audit Ledger</h2>
      <p className="text-slate-400 text-sm mt-1">Immutable record of all historical and pending transactions.</p>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Quantum Intelligence</h2>
      <p className="text-slate-400 text-sm mt-1">Statistical modeling and behavioral expenditure analysis.</p>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Digital Vault</h2>
      <p className="text-slate-400 text-sm mt-1">Encrypted card management and virtual liquidity nodes.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="h-56 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-900 p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform"></div>
        <div className="flex justify-between items-start">
          <ShieldCheck className="w-10 h-10 text-white/80" />
          <span className="text-white/60 font-bold tracking-widest text-xs uppercase">Corporate Platinum</span>
        </div>
        <div className="space-y-1">
          <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Card Interface</p>
          <p className="text-2xl font-mono text-white tracking-[4px]">**** **** **** 8842</p>
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-white/40 text-[8px] uppercase font-bold">Authorized User</p>
            <p className="text-sm font-bold text-white uppercase">ZORVYN CORP SECURE</p>
          </div>
          <div className="w-12 h-8 bg-amber-400/20 rounded flex items-center justify-center border border-amber-400/30 text-amber-400 text-[10px] font-bold italic">
            ZORVYN
          </div>
        </div>
      </div>
      <div className="glass-card h-56 rounded-3xl p-8 flex flex-col justify-center items-center border-dashed border-2 border-slate-700 hover:border-primary transition-colors cursor-pointer group">
        <div className="p-4 bg-slate-800 rounded-full group-hover:bg-primary/20 group-hover:text-primary transition-all">
          <Zap className="w-8 h-8" />
        </div>
        <p className="mt-4 font-bold text-slate-400 group-hover:text-white transition-colors">PROVISION VIRTUAL NODE</p>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Portfolio Optimization</h2>
      <p className="text-slate-400 text-sm mt-1">Real-time asset exposure and quantitative market tracking.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-8 rounded-2xl border border-slate-800/50">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h4 className="font-bold text-white">Global Equity Nodes</h4>
            <p className="text-xs text-slate-500">Tier-1 Exchange Connectivity</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
            <span className="text-sm text-slate-300">Zorvyn Capital Alpha</span>
            <span className="text-sm font-bold text-emerald-400">+12.4%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg">
            <span className="text-sm text-slate-300">S&P 500 Index</span>
            <span className="text-sm font-bold text-emerald-400">+1.2%</span>
          </div>
        </div>
      </div>
      <div className="glass-card p-8 rounded-2xl border border-slate-800/50 flex flex-col justify-center items-center text-center">
        <Globe className="w-12 h-12 text-primary mb-4" />
        <h4 className="font-bold text-white">Global Markets Active</h4>
        <p className="text-sm text-slate-500 mt-2 max-w-[240px]">Quantitative analysis engine processing 1.4M transactions/sec.</p>
        <Button className="mt-6 bg-primary text-primary-foreground font-bold px-8">SYSTEM STATUS: LIVE</Button>
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
      <h2 className="text-3xl font-bold tracking-tight text-white">Kernel Configuration</h2>
      <p className="text-slate-400 text-sm mt-1">Adjust system parameters and encryption protocols.</p>
    </div>
    <div className="max-w-2xl space-y-6">
      <div className="glass-card p-6 rounded-2xl border border-slate-800/50 space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-white">256-bit GCM Encryption</span>
          </div>
          <div className="w-10 h-6 bg-primary rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <Server className="w-5 h-5 text-slate-400" />
            <span className="text-sm font-medium text-white">Multi-Region Redundancy</span>
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
            <p>© 2024 ZORVYN FINANCIAL SYSTEMS INC.</p>
            <p className="text-slate-600">ISO 27001 CERTIFIED PLATFORM</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex flex-col gap-1">
              <p className="text-slate-400">NETWORK STATUS: OPTIMAL</p>
              <p className="text-slate-600">REGION: ASIA-SOUTH-1</p>
            </div>
            <div className="h-8 w-px bg-slate-800 hidden md:block"></div>
            <div className="flex flex-col gap-1 text-right">
              <p className="text-slate-400">ENCRYPTION: AES-256-GCM</p>
              <p className="text-slate-600">SESSION: SECURE SHA-2</p>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </div>
  </SidebarProvider>
);

export default function Home() {
  const { isLoggedIn, isLoading } = useFinance();

  if (isLoading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white font-bold tracking-widest animate-pulse">ZORVYN KERNEL v2.4 INITIALISING...</div>;

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
