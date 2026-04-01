
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
  Zap,
  Cpu
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
    <Sidebar className="border-r border-slate-800/30 bg-[#020617] font-body transition-all duration-500">
      <SidebarHeader className="p-8 pt-10">
        <div 
          className="flex items-center gap-5 group cursor-pointer transition-all active:scale-95" 
          onClick={() => setActiveView('Dashboard')}
        >
          <div className="relative">
            <div className="p-4 bg-primary/10 rounded-[1.5rem] group-hover:bg-primary/20 transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] border border-primary/20 group-hover:rotate-6">
              <Zap className="w-8 h-8 text-primary fill-primary/10 italic" />
            </div>
            <div className="absolute -top-1 -right-1 bg-[#020617] rounded-full p-1.5 border border-primary/40 shadow-lg">
              <Shield className="w-3.5 h-3.5 text-primary" />
            </div>
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">Zorvyn</h1>
            <p className="text-[9px] text-primary font-black uppercase tracking-[5px] mt-2 opacity-60">Global Hub</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-5 mt-10">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black text-slate-700 uppercase tracking-[4px] mb-6">Interface Control</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    isActive={activeView === item.view}
                    onClick={() => setActiveView(item.view)}
                    className="hover:bg-slate-900/40 transition-all rounded-2xl h-14 px-6 data-[active=true]:bg-primary/10 data-[active=true]:text-primary border border-transparent data-[active=true]:border-primary/10"
                  >
                    <item.icon className={`w-5 h-5 transition-all ${activeView === item.view ? 'text-primary' : 'text-slate-600'}`} />
                    <span className="font-black uppercase text-[10px] tracking-[2px]">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto pb-10">
          <SidebarGroupLabel className="px-4 text-[10px] font-black text-slate-700 uppercase tracking-[4px] mb-6">System Parameters</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    isActive={activeView === item.view}
                    onClick={() => setActiveView(item.view)}
                    className="hover:bg-slate-900/40 transition-all rounded-2xl h-14 px-6 border border-transparent"
                  >
                    <item.icon className={`w-5 h-5 ${activeView === item.view ? 'text-primary' : 'text-slate-600'}`} />
                    <span className="font-black uppercase text-[10px] tracking-[2px]">{item.label}</span>
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
