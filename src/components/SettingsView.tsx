"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Shield, UserCircle, Database, BookOpen, Mail, Smartphone, Info } from 'lucide-react';
import { useFinance, ASSIGNMENT_REF_ID } from '@/context/FinanceContext';

export const SettingsView = () => {
  const { isDarkMode, setIsDarkMode, userRole, currentUser } = useFinance();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            Project<span className="text-indigo-600">Settings</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Assignment Reference ID: {ASSIGNMENT_REF_ID}</p>
        </div>
        <div className="bg-indigo-600/10 px-4 py-2 rounded-xl border border-indigo-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Student Submission</p>
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
                <Label className="text-sm font-bold">Dark Mode</Label>
                <p className="text-xs text-slate-500">Toggle theme for comfortable viewing.</p>
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
              <Shield className="w-4 h-4 text-indigo-600" /> Role-Based Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Current User Role</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{userRole}</p>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Viewer: Read-only access to specific personal data.<br/>
                Admin: Full access to add, view, and delete transactions.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-indigo-600" /> Student Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Name</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Yuvansh Dashrath Koli</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1.5"><Mail className="w-3 h-3"/> Personal Email</p>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">yuvanshkoli1011@gmail.com</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Demo Email</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">yuvanshkoli@demozorvyn.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <Database className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm font-bold text-indigo-900 dark:text-indigo-400">Data Persistence</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-500">
                  This project uses `localStorage` to persist transaction data and user roles across browser sessions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-600" /> Project Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <p className="text-xs font-black text-emerald-600 uppercase">✓ Dashboard</p>
                <p className="text-[10px] text-slate-500">Summary cards and interactive Recharts visualizations.</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-emerald-600 uppercase">✓ Ledger</p>
                <p className="text-[10px] text-slate-500">Filterable and searchable transaction table.</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-emerald-600 uppercase">✓ RBAC</p>
                <p className="text-[10px] text-slate-500">UI behavior changes based on Admin or Viewer role.</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-emerald-600 uppercase">✓ Insights</p>
                <p className="text-[10px] text-slate-500">Spending patterns and monthly data comparisons.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
