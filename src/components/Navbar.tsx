
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Shield, Eye, Bell, Search, SidebarIcon, GraduationCap } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';

export const Navbar = () => {
  const { userRole, setUserRole } = useFinance();

  return (
    <nav className="border-b border-slate-800/50 bg-[#020617]/50 backdrop-blur-xl sticky top-0 z-40 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="hover:bg-slate-800 text-slate-400" />
        <div className="h-6 w-px bg-slate-800 hidden md:block"></div>
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
          <Input 
            placeholder="Search transactions, insights..." 
            className="w-72 pl-10 bg-slate-900/30 border-slate-800 h-9 text-xs focus:ring-primary focus:w-80 transition-all border-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-full border border-slate-800 px-3 h-9 shadow-inner">
            <div className="flex items-center gap-2">
              {userRole === 'Admin' ? (
                <Shield className="w-3.5 h-3.5 text-primary" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-slate-400" />
              )}
              <Label htmlFor="role-mode" className="text-[10px] font-bold uppercase cursor-pointer text-slate-400 tracking-tighter">
                {userRole} MODE
              </Label>
            </div>
            <Switch
              id="role-mode"
              checked={userRole === 'Admin'}
              onCheckedChange={(checked) => setUserRole(checked ? 'Admin' : 'Viewer')}
              className="scale-75 data-[state=checked]:bg-primary"
            />
          </div>
          
          <button className="p-2 rounded-xl hover:bg-slate-800 text-slate-500 transition-colors relative group">
            <Bell className="w-5 h-5 group-hover:text-white transition-colors" />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
          </button>
        </div>
        
        <div className="h-8 w-px bg-slate-800"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none">Yuvansh Koli</p>
            <p className="text-[9px] text-primary font-bold uppercase mt-1 tracking-widest">Dev / Terna EC</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-700 flex items-center justify-center font-bold text-white text-sm shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/10">
            YK
          </div>
        </div>
      </div>
    </nav>
  );
};
