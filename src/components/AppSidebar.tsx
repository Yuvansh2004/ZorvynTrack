
"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  CreditCard, 
  TrendingUp,
  Zap,
  PieChart,
  ShieldCheck
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
  { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard' as ViewType },
  { icon: History, label: 'Transactions', view: 'Transactions' as ViewType },
  { icon: PieChart, label: 'Analytics', view: 'Analytics' as ViewType },
  { icon: CreditCard, label: 'Digital Vault', view: 'Cards' as ViewType },
  { icon: TrendingUp, label: 'Portfolios', view: 'Investments' as ViewType },
];

const settingsItems = [
  { icon: Settings, label: 'Terminal Settings', view: 'Settings' as ViewType },
];

export function AppSidebar() {
  const { activeView, setActiveView } = useFinance();

  return (
    <Sidebar className="border-r border-slate-800/50 bg-[#020617]">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveView('Dashboard')}>
          <div className="p-2.5 bg-primary/20 rounded-2xl group-hover:bg-primary/30 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-primary/20">
            <Zap className="w-6 h-6 text-primary fill-primary/20" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">Zorvyn</h1>
            <p className="text-[9px] text-primary font-black uppercase tracking-[3px] mt-1">Quantum Node</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-[10px] font-black text-slate-600 uppercase tracking-[2px] mb-2">Systems Interface</SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    isActive={activeView === item.view}
                    onClick={() => setActiveView(item.view)}
                    className="hover:bg-slate-900/50 transition-all rounded-xl h-12 px-4 data-[active=true]:bg-primary/10 data-[active=true]:text-primary border border-transparent data-[active=true]:border-primary/10"
                  >
                    <item.icon className={`w-5 h-5 ${activeView === item.view ? 'text-primary' : 'text-slate-500'}`} />
                    <span className="font-bold tracking-tight uppercase text-[11px] tracking-widest">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-6 text-[10px] font-black text-slate-600 uppercase tracking-[2px] mb-2">Kernel</SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    isActive={activeView === item.view}
                    onClick={() => setActiveView(item.view)}
                    className="hover:bg-slate-900/50 transition-all rounded-xl h-12 px-4 border border-transparent"
                  >
                    <item.icon className="w-5 h-5 text-slate-500" />
                    <span className="font-bold tracking-tight uppercase text-[11px] tracking-widest">{item.label}</span>
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
