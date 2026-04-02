"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Switch } from '@/components/ui/switch';
import { Shield, Eye } from 'lucide-react';

export const Navbar = () => {
  const { userRole, setUserRole, currentUser, adminUser } = useFinance();

  // Fallback nodes synchronized from Admin Profile
  const defaultName = adminUser?.name || 'Yuvansh Dashrath Koli';
  const defaultEmail = adminUser?.email || 'Admin@DemoZorvynTrack.io';

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-indigo-600 p-1.5 rounded-lg">
          <Shield className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">ZorvynTrack</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full">
          <div className="flex items-center gap-2">
            {userRole === 'Admin' ? (
              <Shield className="w-4 h-4 text-indigo-600" />
            ) : (
              <Eye className="w-4 h-4 text-slate-400" />
            )}
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              {userRole} Mode
            </span>
          </div>
          <div className="h-4 w-px bg-slate-200"></div>
          <Switch 
            checked={userRole === 'Admin'} 
            onCheckedChange={(checked) => setUserRole(checked ? 'Admin' : 'Viewer')}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900">{currentUser?.name || defaultName}</p>
            <p className="text-[10px] font-medium text-slate-500">{currentUser?.email || defaultEmail}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            {(currentUser?.name || defaultName)[0]}
          </div>
        </div>
      </div>
    </nav>
  );
};
