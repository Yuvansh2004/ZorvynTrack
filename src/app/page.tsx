
"use client";

import { useFinance } from '@/context/FinanceContext';
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
  User,
  Bell,
  HardDrive,
  Database,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginPage } from '@/components/LoginPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DashboardView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-4xl font-black tracking-tighter text-white italic uppercase">Market Intelligence</h2>
        <p className="text-slate-500 text-xs font-bold tracking-widest mt-1">REAL-TIME GLOBAL TELEMETRY ENGINE v4.0</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-xl text-[10px] font-black text-slate-300 tracking-[1px]">
          <Calendar className="w-3.5 h-3.5 text-primary" />
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase()}
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <SummaryCards />
        <AnalyticsCharts />
      </div>
      <div className="space-y-6">
        <Card className="glass-card border-none text-white overflow-hidden relative group">
          <div className="absolute top-0 right-0 p-12 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-black flex items-center gap-2 text-primary tracking-[2px] uppercase">
              <Target className="w-4 h-4" /> Capital Allocation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 pt-2">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-[1px] text-slate-400">
                <span>Infrastructure</span>
                <span className="text-white">72%</span>
              </div>
              <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[72%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-[1px] text-slate-400">
                <span>R&D Operational</span>
                <span className="text-rose-400">95%</span>
              </div>
              <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[95%] shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-800/50">
              <p className="text-[10px] text-slate-400 font-bold leading-relaxed italic uppercase opacity-60">System Analysis: Liquidity index stable. Protocol Z-9 engaged.</p>
            </div>
          </CardContent>
        </Card>
        <InsightsCard />
      </div>
    </div>
    
    <TransactionList />
  </motion.div>
);

const SettingsView = () => {
  const { user } = useFinance();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-4xl font-black tracking-tighter text-white italic uppercase">Account Control</h2>
        <p className="text-slate-500 text-xs font-bold tracking-widest mt-1">IDENTITY & ENCRYPTION PARAMETERS</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-slate-900/50 border border-slate-800 p-1 h-12 rounded-xl">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-8 font-bold text-xs uppercase tracking-widest transition-all">Identity</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-8 font-bold text-xs uppercase tracking-widest transition-all">Security</TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg px-8 font-bold text-xs uppercase tracking-widest transition-all">Network</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-8 rounded-3xl border border-slate-800/50 space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center border-2 border-primary shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                  <User className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{user?.name}</h3>
                  <p className="text-xs font-bold text-primary uppercase tracking-[2px]">{user?.role} Access Mode</p>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Global Identifier</p>
                  <p className="text-sm font-bold text-white bg-slate-900/50 p-3 rounded-xl border border-slate-800">{user?.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Regional Location</p>
                  <p className="text-sm font-bold text-white bg-slate-900/50 p-3 rounded-xl border border-slate-800">Asia-South-1 (Mumbai)</p>
                </div>
              </div>
              <Button className="w-full bg-primary font-black uppercase text-[10px] tracking-widest h-12 rounded-xl">Update Node Identity</Button>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl border border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl">
                    <Bell className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Neural Alerts</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Real-time Node Signals</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
              </div>
              <div className="glass-card p-6 rounded-2xl border border-slate-800/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-xl">
                    <Database className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Auto-Sync Global</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cross-Node Ledger Sync</p>
                  </div>
                </div>
                <div className="w-12 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div></div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-8">
          <div className="glass-card p-8 rounded-3xl border border-slate-800/50 max-w-2xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" /> Encryption & Keys
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">AES-256 Hardware Root</p>
                  <p className="text-[10px] text-slate-500 font-bold">Standard cryptographic module active</p>
                </div>
                <div className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full uppercase">Locked</div>
              </div>
              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Multi-Factor Hardware Key</p>
                  <p className="text-[10px] text-slate-500 font-bold">Physical YubiNode verification</p>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-[9px] border-slate-700 uppercase font-black">Configure</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

const ViewSwitcher = () => {
  const { activeView } = useFinance();
  
  switch (activeView) {
    case 'Dashboard': return <DashboardView />;
    case 'Transactions': return <TransactionList />; // Use full list for transactions page
    case 'Analytics': return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white italic uppercase">Quantum Analytics</h2>
          <p className="text-slate-500 text-xs font-bold tracking-widest mt-1">BEHAVIORAL CAPITAL MODELLING</p>
        </div>
        <AnalyticsCharts />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <InsightsCard />
           <div className="md:col-span-2 glass-card p-8 rounded-3xl border border-slate-800/50 flex flex-col justify-center items-center text-center">
             <Cpu className="w-12 h-12 text-primary mb-4 animate-pulse" />
             <h4 className="font-black text-white uppercase tracking-widest">Neural Prediction Engine</h4>
             <p className="text-xs text-slate-500 mt-2 max-w-[300px] font-bold italic">Processing historical ledger nodes to forecast Q3 liquidity event horizons.</p>
           </div>
        </div>
      </motion.div>
    );
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
        <main className="max-w-7xl mx-auto px-6 py-12">
          <AnimatePresence mode="wait">
            <ViewSwitcher />
          </AnimatePresence>
        </main>
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between text-slate-600 text-[10px] gap-6 font-black uppercase tracking-[3px]">
          <div className="flex flex-col gap-1">
            <p className="text-slate-500">© 2024 ZORVYN FINANCIAL SYSTEMS INC.</p>
            <p className="opacity-50">QUANTUM LEDGER CORE v9.2.4</p>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <HardDrive className="w-3.5 h-3.5 text-primary" />
              <p className="text-slate-400">STATUS: NOMINAL</p>
            </div>
            <div className="h-10 w-px bg-slate-900 hidden md:block"></div>
            <div className="flex flex-col gap-1 text-right">
              <p className="text-slate-400">REGION: ASIA-SOUTH-1</p>
              <p className="opacity-50">ENCRYPTION: AES-256-GCM</p>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </div>
  </SidebarProvider>
);

export default function Home() {
  const { isLoggedIn, isLoading } = useFinance();

  if (isLoading) return <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white font-black tracking-[8px] animate-pulse">
    <Zap className="w-12 h-12 text-primary mb-6 animate-bounce" />
    ZORVYN KERNEL v9.0 INITIALISING
  </div>;

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
