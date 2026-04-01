
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Shield, UserCircle, Database, BookOpen, Mail, Smartphone } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';

export const SettingsView = () => {
  const { isDarkMode, setIsDarkMode, userRole, currentUser } = useFinance();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            Assignment<span className="text-indigo-600">Preferences</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Zorvyn FinTech Evaluation Node • Project ID: Z-992-KOLI</p>
        </div>
        <div className="bg-indigo-600/10 px-4 py-2 rounded-xl border border-indigo-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Final Submission V.2.2</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-600" /> UI Customization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">Dark Mode Simulation</Label>
                <p className="text-xs text-slate-500">Toggles high-contrast Institutional Slate theme.</p>
              </div>
              <Switch 
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" /> RBAC Logic
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Active Simulation Role</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{userRole}</p>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Viewer: Read-only access to isolated personal data.<br/>
                Admin: Full CRUD capabilities (Add/Delete/Global View).
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-indigo-600" /> Student Identification (Zorvyn HR)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Full Name</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Yuvansh Dashrath Koli</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:border-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1.5"><Mail className="w-3 h-3"/> Personal Communication</p>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">yuvanshkoli1011@gmail.com</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Demo Corporate Identity</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">yuvanshkoli@demozorvyn.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <Database className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm font-bold text-indigo-900 dark:text-indigo-400">Persistent Storage Engine</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-500">
                  Assignment Data Persistence: Utilizing `localStorage` to ensure Admin entries and Role selections persist across browser sessions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Requirement Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <p className="text-xs font-black text-emerald-600 uppercase">✓ Dashboards</p>
              <p className="text-[10px] text-slate-500">Summary cards (Balance, Income, Exp) & Time-based/Categorical charts.</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black text-emerald-600 uppercase">✓ Ledger</p>
              <p className="text-[10px] text-slate-500">Searchable table with Date, Amount, Category, and Transaction Types.</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black text-emerald-600 uppercase">✓ RBAC</p>
              <p className="text-[10px] text-slate-500">Viewer read-only isolation vs Admin CRUD management simulated.</p>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-black text-emerald-600 uppercase">✓ Insights</p>
              <p className="text-[10px] text-slate-500">Highest category identification & Monthly Comparison Kernel.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
