
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
  Target,
  Calendar as CalendarIcon,
  User,
  Bell,
  HardDrive,
  Database,
  Cpu,
  Lock,
  Zap,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  CircleDollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginPage } from '@/components/LoginPage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const DashboardView = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8 w-full max-w-full overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white italic uppercase">Market Intelligence</h2>
          <p className="text-slate-500 text-[10px] font-black tracking-[4px] mt-1.5 opacity-70">REAL-TIME GLOBAL TELEMETRY ENGINE v9.4</p>
        </div>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex items-center gap-3 bg-slate-900/80 border border-slate-800 px-5 py-3 rounded-2xl text-[10px] font-black text-primary tracking-[2px] uppercase hover:bg-slate-800 transition-all shadow-xl group">
                <CalendarIcon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                {date ? date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase() : 'SELECT EPOCH'}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-slate-950 border-slate-800 shadow-2xl" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-xl border border-slate-800 bg-[#020617] text-white"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 min-w-0">
          <SummaryCards />
          <AnalyticsCharts />
        </div>
        <div className="space-y-6 min-w-0">
          <Card className="glass-card border-none text-white overflow-hidden relative group rounded-[2rem]">
            <div className="absolute top-0 right-0 p-12 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
            <CardHeader className="pb-4">
              <CardTitle className="text-[10px] font-black flex items-center gap-2 text-primary tracking-[3px] uppercase">
                <Target className="w-4 h-4" /> Capital Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                  <span>Infrastructure</span>
                  <span className="text-white italic">72%</span>
                </div>
                <div className="h-2 w-full bg-slate-800/30 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-primary w-[72%] shadow-[0_0_15px_rgba(59,130,246,0.6)] rounded-full"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-[2px] text-slate-500">
                  <span>R&D Operational</span>
                  <span className="text-rose-400 italic">95%</span>
                </div>
                <div className="h-2 w-full bg-slate-800/30 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-rose-500 w-[95%] shadow-[0_0_15px_rgba(244,63,94,0.6)] rounded-full"></div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-800/50">
                <p className="text-[9px] text-slate-600 font-black leading-relaxed italic uppercase tracking-[1px] opacity-80">
                  Protocol Z-9: High liquidity pressure detected in R&D sector. Node rebalancing recommended.
                </p>
              </div>
            </CardContent>
          </Card>
          <InsightsCard />
        </div>
      </div>
      
      <TransactionList />
    </motion.div>
  );
};

const InvestmentView = () => {
  const assets = [
    { name: 'NIFTY 50 ETF', ticker: 'NIFTYBEES', exchange: 'NSE', allocation: '35%', pnl: '+18.4%', trend: 'up' },
    { name: 'HDFC BANK', ticker: 'HDFCBANK', exchange: 'BSE', allocation: '25%', pnl: '-2.1%', trend: 'down' },
    { name: 'RELIANCE IND', ticker: 'RELIANCE', exchange: 'NSE', allocation: '20%', pnl: '+12.5%', trend: 'up' },
    { name: 'TATA MOTORS', ticker: 'TATAMOTORS', exchange: 'NSE', allocation: '10%', pnl: '+42.8%', trend: 'up' },
    { name: 'ZOMATO LTD', ticker: 'ZOMATO', exchange: 'NSE', allocation: '10%', pnl: '+65.2%', trend: 'up' },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white italic uppercase">Alpha Portfolios</h2>
          <p className="text-slate-500 text-[10px] font-black tracking-[6px] mt-1.5 opacity-70">INDIAN EQUITY & DERIVATIVE PARAMETERS</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl flex items-center gap-3">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
             <span className="text-[9px] font-black text-white uppercase tracking-[2px]">NSE/BSE LIVE</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-10 rounded-[2.5rem] border border-slate-800/50 overflow-hidden relative">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-[10px] font-black text-primary uppercase tracking-[4px] italic">Dynamic Exposure Graph</h3>
                <TrendingUp className="w-5 h-5 text-primary" />
             </div>
             <div className="h-64 w-full bg-slate-950/50 rounded-2xl border border-slate-800/50 flex items-center justify-center">
                <p className="text-[10px] text-slate-700 font-black uppercase tracking-[5px] animate-pulse">Neural Market Feed Synchronizing...</p>
             </div>
          </div>

          <div className="glass-card rounded-[2.5rem] border border-slate-800/50 overflow-hidden">
             <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-500 text-[9px] font-black uppercase tracking-[3px]">
                    <th className="px-8 py-6">Asset Class</th>
                    <th className="px-8 py-6">Exchange</th>
                    <th className="px-8 py-6">Allocation</th>
                    <th className="px-8 py-6">P&L (α)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/30">
                  {assets.map((asset) => (
                    <tr key={asset.ticker} className="hover:bg-slate-900/40 transition-all">
                      <td className="px-8 py-6">
                        <div>
                          <p className="text-sm font-black text-white italic">{asset.name}</p>
                          <p className="text-[9px] text-slate-600 font-black uppercase tracking-[2px] mt-1">{asset.ticker}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-[10px] font-black text-slate-500 uppercase">{asset.exchange}</td>
                      <td className="px-8 py-6 text-sm font-black text-white italic">{asset.allocation}</td>
                      <td className={`px-8 py-6 text-sm font-black italic ${asset.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {asset.pnl}
                      </td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="glass-card border-none p-10 rounded-[2.5rem] space-y-6">
             <div className="flex items-center gap-4 text-primary">
                <CircleDollarSign className="w-6 h-6" />
                <h4 className="text-[10px] font-black uppercase tracking-[3px]">Margin Utility</h4>
             </div>
             <div className="space-y-4">
                <div className="flex justify-between items-end">
                   <p className="text-[9px] font-black text-slate-600 uppercase tracking-[2px]">Available Collateral</p>
                   <p className="text-xl font-black text-white italic">₹8,42,000</p>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                   <div className="h-full bg-primary w-[65%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                </div>
             </div>
             <Button className="w-full bg-slate-900 hover:bg-primary transition-all h-14 rounded-2xl font-black uppercase text-[10px] tracking-[4px] border border-slate-800">
                Execute Rebalance
             </Button>
          </Card>

          <Card className="glass-card border-none p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-primary/10">
             <div className="flex items-center gap-4 text-white mb-6">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <h4 className="text-[10px] font-black uppercase tracking-[3px]">Risk Mitigation</h4>
             </div>
             <p className="text-[10px] text-slate-500 font-black uppercase tracking-[1px] leading-relaxed">
                HEDGE-NODE Q10 ACTIVE. PROTECTION LEVEL: <span className="text-emerald-400">OPTIMAL</span>. NO LIQUIDITY THREATS DETECTED ON NSE/BSE EXCHANGES.
             </p>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

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
        <h2 className="text-4xl font-black tracking-tighter text-white italic uppercase">Account Terminal</h2>
        <p className="text-slate-500 text-[10px] font-black tracking-[6px] mt-1.5 opacity-70">IDENTITY & ENCRYPTION PARAMETERS</p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="bg-slate-900/50 border border-slate-800 p-1.5 h-14 rounded-2xl mb-8">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl px-10 font-black text-[10px] uppercase tracking-[2px] transition-all h-full">Identity</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl px-10 font-black text-[10px] uppercase tracking-[2px] transition-all h-full">Security</TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-xl px-10 font-black text-[10px] uppercase tracking-[2px] transition-all h-full">Network</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-10 rounded-[2.5rem] border border-slate-800/50 space-y-8">
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-slate-900 rounded-[2rem] flex items-center justify-center border-2 border-primary shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white italic tracking-tight">{user?.name}</h3>
                  <p className="text-[10px] font-black text-primary uppercase tracking-[3px] mt-2 opacity-80">{user?.role} NODE ACTIVE</p>
                </div>
              </div>
              <div className="space-y-6 pt-4">
                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[3px]">Global ID</p>
                  <p className="text-sm font-bold text-white bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">{user?.email}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[3px]">Deployment Zone</p>
                  <p className="text-sm font-bold text-white bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">Asia-South-1 (Mumbai Hub)</p>
                </div>
              </div>
              <Button className="w-full bg-primary font-black uppercase text-[10px] tracking-[3px] h-14 rounded-2xl shadow-xl">Synchronize Node Identity</Button>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card p-8 rounded-[2rem] border border-slate-800/50 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                    <Bell className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-tight">Neural Alerts</p>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-[2px] mt-1 opacity-70">REAL-TIME TELEMETRY</p>
                  </div>
                </div>
                <div className="w-14 h-7 bg-primary rounded-full relative shadow-lg"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div></div>
              </div>
              <div className="glass-card p-8 rounded-[2rem] border border-slate-800/50 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                <div className="flex items-center gap-5">
                  <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                    <Database className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-white uppercase tracking-tight">Auto-Sync Core</p>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-[2px] mt-1 opacity-70">DISTRIBUTED LEDGER</p>
                  </div>
                </div>
                <div className="w-14 h-7 bg-primary rounded-full relative shadow-lg"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div></div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="glass-card p-10 rounded-[2.5rem] border border-slate-800/50 max-w-3xl space-y-8">
            <h3 className="text-xl font-black text-white flex items-center gap-4 italic uppercase">
              <Lock className="w-6 h-6 text-primary" /> Cryptographic Parameters
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-slate-950/50 rounded-[2rem] border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-white uppercase">Hardware Root of Trust</p>
                  <p className="text-[10px] text-slate-600 font-black uppercase tracking-[1px] mt-1">AES-256-GCM ACTIVE</p>
                </div>
                <div className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-4 py-1.5 rounded-full uppercase border border-emerald-400/20 tracking-[2px]">Secured</div>
              </div>
              <div className="p-6 bg-slate-950/50 rounded-[2rem] border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-white uppercase">Physical Auth Node</p>
                  <p className="text-[10px] text-slate-600 font-black uppercase tracking-[1px] mt-1">YUBINODE DISCOVERED</p>
                </div>
                <Button variant="outline" size="sm" className="h-10 text-[9px] border-slate-700 uppercase font-black tracking-[2px] px-6 rounded-xl hover:bg-primary hover:text-white transition-all">Configure</Button>
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
    case 'Transactions': return <TransactionList />;
    case 'Analytics': return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white italic uppercase">Quantum Analytics</h2>
          <p className="text-slate-500 text-[10px] font-black tracking-[6px] mt-1.5 opacity-70">PREDICTIVE CAPITAL MODELLING</p>
        </div>
        <AnalyticsCharts />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <InsightsCard />
           <div className="md:col-span-2 glass-card p-12 rounded-[2.5rem] border border-slate-800/50 flex flex-col justify-center items-center text-center">
             <Cpu className="w-16 h-16 text-primary mb-6 animate-pulse" />
             <h4 className="text-xl font-black text-white uppercase tracking-[4px] italic">Neural Engine Processing</h4>
             <p className="text-[10px] text-slate-600 mt-4 max-w-[400px] font-black uppercase tracking-[2px] leading-relaxed italic opacity-80">Scanning distributed ledger nodes to forecast Q4 liquidity event horizons and behavioral spending patterns.</p>
           </div>
        </div>
      </motion.div>
    );
    case 'Investments': return <InvestmentView />;
    case 'Settings': return <SettingsView />;
    default: return <DashboardView />;
  }
};

const AuthenticatedApp = () => (
  <SidebarProvider>
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-body w-full overflow-hidden">
      <AppSidebar />
      <SidebarInset className="flex-1 overflow-auto bg-[#020617] relative">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 md:px-10 py-12">
          <AnimatePresence mode="wait">
            <ViewSwitcher />
          </AnimatePresence>
        </main>
        <footer className="max-w-7xl mx-auto px-10 py-16 border-t border-slate-800/30 flex flex-col md:flex-row items-center justify-between text-slate-600 text-[10px] gap-10 font-black uppercase tracking-[4px]">
          <div className="flex flex-col gap-2">
            <p className="text-slate-400">© 2024 ZORVYN FINANCIAL SYSTEMS INC.</p>
            <p className="opacity-40">DISTRIBUTED KERNEL CORE v9.2.4</p>
          </div>
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <HardDrive className="w-4 h-4 text-primary" />
              <p className="text-slate-400">NODE STATUS: NOMINAL</p>
            </div>
            <div className="h-12 w-px bg-slate-900 hidden md:block opacity-50"></div>
            <div className="flex flex-col gap-2 text-right">
              <p className="text-slate-400">REGION: ASIA-SOUTH-1</p>
              <p className="opacity-40">ENCRYPTION: AES-256-GCM</p>
            </div>
          </div>
        </footer>
      </SidebarInset>
    </div>
  </SidebarProvider>
);

export default function Home() {
  const { isLoggedIn, isLoading } = useFinance();

  if (isLoading) return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white font-black tracking-[12px] animate-pulse uppercase">
      <Zap className="w-16 h-16 text-primary mb-10 animate-bounce" />
      ZORVYN KERNEL v9.0 LOADING
    </div>
  );

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
