
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Label } from '@/components/ui/label';
import { Shield, Eye, Bell, Search, LogOut, Terminal, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const { userRole, user, logout, setActiveView } = useFinance();

  return (
    <nav className="border-b border-slate-800/50 bg-[#020617]/90 backdrop-blur-2xl sticky top-0 z-40 px-8 py-5 flex items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)] font-body">
      <div className="flex items-center gap-8">
        <SidebarTrigger className="hover:bg-slate-800 text-slate-400 h-11 w-11 rounded-2xl border border-slate-800/50" />
        <div className="h-8 w-px bg-slate-800/50 hidden md:block"></div>
        <div className="relative hidden xl:block group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-primary transition-all" />
          <Input 
            placeholder="Query Node ID / TX Hash..." 
            className="w-80 pl-12 bg-slate-900/50 border-none h-11 text-[10px] font-black tracking-[2px] uppercase focus:ring-1 focus:ring-primary focus:w-[480px] transition-all rounded-2xl placeholder:text-slate-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-3 bg-slate-900/80 p-2 rounded-2xl border border-slate-800 px-5 h-11 shadow-inner group">
            {userRole === 'Admin' ? (
              <Shield className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
            ) : (
              <Eye className="w-4 h-4 text-slate-500" />
            )}
            <Label className="text-[10px] font-black uppercase text-slate-300 tracking-[1.5px] italic">
              {userRole} Node
            </Label>
          </div>
          
          <button 
            onClick={() => setActiveView('Notifications')}
            className="p-3 rounded-2xl hover:bg-slate-800 text-slate-500 transition-all relative group border border-transparent hover:border-slate-800"
          >
            <Bell className="w-5 h-5 group-hover:text-white transition-colors" />
            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,1)]"></span>
          </button>
        </div>
        
        <div className="h-10 w-px bg-slate-800/50"></div>

        <div className="flex items-center gap-5 pl-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-white leading-none tracking-tight italic">{user?.name?.toUpperCase() || 'ANONYMOUS'}</p>
            <p className="text-[9px] text-primary font-black uppercase mt-2 tracking-[2px] leading-none flex items-center justify-end gap-2 italic opacity-80">
              <Terminal className="w-3 h-3" /> {user?.email || 'OFFLINE'}
            </p>
          </div>
          <div className="relative group">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center text-primary font-black group-hover:border-primary transition-all group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] cursor-pointer">
              {user?.name?.[0] || <User className="w-6 h-6" />}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={logout}
              className="absolute -bottom-1.5 -right-1.5 w-6 h-6 bg-[#020617] border-2 border-slate-800 rounded-xl hover:bg-rose-500 hover:text-white transition-all text-rose-400 shadow-xl"
            >
              <LogOut className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
