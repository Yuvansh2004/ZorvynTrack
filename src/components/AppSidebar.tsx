"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  Settings, 
  CreditCard, 
  TrendingUp,
  Shield,
  PieChart
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

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: History, label: 'Transactions' },
  { icon: PieChart, label: 'Analytics' },
  { icon: CreditCard, label: 'Cards' },
  { icon: TrendingUp, label: 'Investments' },
];

const settingsItems = [
  { icon: Settings, label: 'Settings' },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-800/50">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">ZorvynTrack</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Pro Edition</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-xs font-bold text-slate-500 uppercase">General</SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    isActive={item.active}
                    className="hover:bg-slate-800/50 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className="px-6 text-xs font-bold text-slate-500 uppercase">Account</SidebarGroupLabel>
          <SidebarGroupContent className="px-3">
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton className="hover:bg-slate-800/50 transition-colors">
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
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