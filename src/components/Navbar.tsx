"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Shield, Eye, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { userRole, setUserRole } = useFinance();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary tracking-tight">ZorvynTrack</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
              {userRole === 'Admin' ? <Shield className="w-4 h-4 text-primary" /> : <Eye className="w-4 h-4 text-slate-500" />}
              <Label className="text-xs font-semibold text-slate-700">
                {userRole} Mode
              </Label>
              <Switch 
                checked={userRole === 'Admin'} 
                onCheckedChange={(checked) => setUserRole(checked ? 'Admin' : 'Viewer')}
              />
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Yuvansh Dashrath Koli</p>
                <p className="text-xs text-slate-500">yuvanshkoli1011@gmail.com</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold border border-slate-200">
                Y
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};