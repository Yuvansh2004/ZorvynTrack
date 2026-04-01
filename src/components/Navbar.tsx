"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, Eye, Bell, Search, SidebarIcon } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';

export const Navbar = () => {
  const { userRole, setUserRole } = useFinance();

  return (
    <nav className="border-b border-slate-800/50 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-40 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-slate-800" />
        <div className="h-6 w-px bg-slate-800 hidden md:block"></div>
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input 
            placeholder="Search analytics..." 
            className="w-80 pl-10 bg-slate-900/50 border-slate-800 h-9 text-xs focus:ring-primary transition-all focus:w-96"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-slate-900/50 p-1 rounded-full border border-slate-800 px-3 h-9">
            <div className="flex items-center gap-2">
              {userRole === 'Admin' ? (
                <Shield className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-slate-400" />
              )}
              <Label htmlFor="role-mode" className="text-[10px] font-bold uppercase cursor-pointer text-slate-400">
                {userRole}
              </Label>
            </div>
            <Switch
              id="role-mode"
              checked={userRole === 'Admin'}
              onCheckedChange={(checked) => setUserRole(checked ? 'Admin' : 'Viewer')}
              className="scale-75"
            />
          </div>
          
          <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#020617]"></span>
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-800"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white">Yuvansh Dashrath Koli</p>
            <p className="text-[10px] text-muted-foreground font-medium">yuvanshkoli1011@gmail.com</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center font-bold text-white text-sm shadow-lg border-2 border-slate-800">
            YK
          </div>
        </div>
      </div>
    </nav>
  );
};