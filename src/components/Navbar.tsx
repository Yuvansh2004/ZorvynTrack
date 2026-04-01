
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Shield, Eye } from 'lucide-react';

export const Navbar = () => {
  const { userRole, setUserRole } = useFinance();

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/20 rounded-lg">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">ZorvynTrack</h1>
          <p className="text-xs text-muted-foreground">Personal Finance Dashboard</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium text-white">Yuvansh Dashrath Koli</span>
          <span className="text-xs text-muted-foreground">yuvanshkoli1011@gmail.com</span>
        </div>
        
        <div className="h-8 w-px bg-slate-800 hidden sm:block"></div>

        <div className="flex items-center gap-3 bg-slate-900/50 p-1.5 rounded-full border border-slate-800 px-4">
          <div className="flex items-center gap-2">
            {userRole === 'Admin' ? (
              <Shield className="w-4 h-4 text-primary" />
            ) : (
              <Eye className="w-4 h-4 text-slate-400" />
            )}
            <Label htmlFor="role-mode" className="text-xs font-semibold uppercase cursor-pointer">
              {userRole}
            </Label>
          </div>
          <Switch
            id="role-mode"
            checked={userRole === 'Admin'}
            onCheckedChange={(checked) => setUserRole(checked ? 'Admin' : 'Viewer')}
          />
        </div>
      </div>
    </nav>
  );
};
