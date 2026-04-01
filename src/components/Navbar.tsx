
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, Eye, Bell, Search, LogOut, Terminal, Zap } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { userRole, setUserRole, user, logout } = useFinance();

  return (
    <nav className="border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-2xl sticky top-0 z-40 px-6 py-4 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-6">
        <SidebarTrigger className="hover:bg-slate-800 text-slate-400 h-10 w-10 rounded-xl" />
        <div className="h-6 w-px bg-slate-800 hidden md:block"></div>
        <div className="relative hidden lg:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Query network nodes..." 
            className="w-72 pl-10 bg-slate-900/50 border-none h-10 text-[10px] font-bold tracking-[1px] uppercase focus:ring-1 focus:ring-primary focus:w-96 transition-all rounded-xl"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-5">
           <div className="flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 px-4 h-10 shadow-inner">
            <div className="flex items-center gap-2">
              {userRole === 'Admin' ? (
                <Shield className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-slate-500" />
              )}
              <Label htmlFor="role-mode" className="text-[10px] font-black uppercase cursor-pointer text-slate-300 tracking-[1px]">
                {userRole}
              </Label>
            </div>
            <Switch
              id="role-mode"
              checked={userRole === 'Admin'}
              onCheckedChange={(checked) => setUserRole(checked ? 'Admin' : 'Viewer')}
              className="scale-90 data-[state=checked]:bg-primary"
            />
          </div>
          
          <button className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-500 transition-colors relative group border border-transparent hover:border-slate-700">
            <Bell className="w-5 h-5 group-hover:text-white transition-colors" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></span>
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-800"></div>

        <div className="flex items-center gap-4 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-white leading-none tracking-tight">{user?.name || 'NODE UNKNOWN'}</p>
            <p className="text-[9px] text-primary font-black uppercase mt-1.5 tracking-[2px] leading-none flex items-center justify-end gap-1.5 italic">
              <Terminal className="w-2.5 h-2.5" /> {user?.email || 'OFFLINE'}
            </p>
          </div>
          <div className="relative group">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary font-black group-hover:border-primary transition-all">
              {user?.name?.[0] || 'Z'}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-950 border border-slate-800 rounded-lg hover:bg-rose-500 hover:text-white transition-all text-[8px]"
            >
              <LogOut className="w-2.5 h-2.5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
