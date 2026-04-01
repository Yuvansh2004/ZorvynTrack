
"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  CreditCard, 
  TrendingUp,
  PieChart,
  Shield,
  Zap
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import { useFinance, ViewType } from '@/context/FinanceContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Market Intelligence', view: 'Dashboard' as ViewType },
  { icon: History, label: 'Ledger Terminal', view: 'Transactions' as ViewType },
  { icon: PieChart, label: 'Quantum Analytics', view: 'Analytics' as ViewType },
  { icon: CreditCard, label: 'Asset Vault', view: 'Cards' as ViewType },
  { icon: TrendingUp, label: 'Alpha Portfolios', view: 'Investments' as ViewType },
];

const settingsItems = [
  { icon: Settings, label: 'Kernel Config', view: 'Settings' as ViewType },
];

export function AppSidebar() {
  const { activeView, setActiveView } = useFinance();

  return (
    <Sidebar className="border-r border-slate-800/50 bg-[#020617] font-body">
      <SidebarHeader className="p-8">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => setActiveView('Dashboard')}>
          <div className="relative">
            <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all shadow-[0_0_30px_rgba(59,130,246,0.2)] border border-primary/20">
              <Zap className="w-7 h-7 text-primary fill-primary/10 italic" />
            </div>
            <div className="absolute -top-1 -right-1 bg-[#020617] rounded-full p-1 border border-primary/40">
              <Shield className="w-3 h-3 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">Zorvyn</h1>
            <p className="text-[9px] text-primary font-black uppercase tracking-[4px] mt-1.5 opacity-70">Global Terminal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[3px] mb-4">Operations Interface</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    isActive={activeView === item.view}
                    onClick={() => setActiveView(item.view)}
                    className="hover:bg-slate-900/50 transition-all rounded-xl h-14 px-5 data-[active=true]:bg-primary/10 data-[active=true]:text-primary border border-transparent data-[active=true]:border-primary/10"
                  >
                    <item.icon className={`w-5 h-5 ${activeView === item.view ? 'text-primary' : 'text-slate-500'}`} />
                    <span className="font-bold uppercase text-[10px] tracking-widest">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto pb-8">
          <SidebarGroupLabel className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[3px] mb-4">Core Kernel</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    isActive={activeView === item.view}
                    onClick={() => setActiveView(item.view)}
                    className="hover:bg-slate-900/50 transition-all rounded-xl h-14 px-5 border border-transparent"
                  >
                    <item.icon className="w-5 h-5 text-slate-500" />
                    <span className="font-bold uppercase text-[10px] tracking-widest">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
