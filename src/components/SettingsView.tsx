
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, Bell, Shield, UserCircle, Database, HelpCircle, BookOpen } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { Button } from '@/components/ui/button';

export const SettingsView = () => {
  const { isDarkMode, setIsDarkMode, userRole } = useFinance();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">System Settings</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Personalize your terminal experience.</p>
        </div>
        <div className="bg-indigo-600/10 px-4 py-2 rounded-xl border border-indigo-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Kernel V.2.1</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Appearance Card */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-600" /> Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">Dark Mode</Label>
                <p className="text-xs text-slate-500">Switch between light and high-contrast themes.</p>
              </div>
              <Switch 
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Access Card */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-600" /> Security & Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Active Role</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{userRole}</p>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Switch roles in the sidebar footer to test the Role-Based Access Control logic.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Operational Guide Card */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" /> Operational Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-black">1</div>
              <p className="text-sm font-bold">Dashboard Audit</p>
              <p className="text-xs text-slate-500">Monitor Net Liquidity and Expenditure trends in real-time. Click cards to drill down into the ledger.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-black">2</div>
              <p className="text-sm font-bold">Ledger Terminal</p>
              <p className="text-xs text-slate-500">Search, filter, and add transactions. Admins can delete records and export statements as original CSVs.</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-black">3</div>
              <p className="text-sm font-bold">RBAC Testing</p>
              <p className="text-xs text-slate-500">Toggle "Viewer" mode to see how the system locks down data entry and deletion capabilities automatically.</p>
            </div>
          </CardContent>
        </Card>

        {/* Student Identification Card */}
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-indigo-600" /> Student Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Developer Name</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Yuvansh Dashrath Koli</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Corporate Email</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">yuvanshkoli1011@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800">
              <Database className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm font-bold text-indigo-900 dark:text-indigo-400">LocalStorage Persistence Active</p>
                <p className="text-xs text-indigo-700 dark:text-indigo-500">
                  Data is stored locally in your browser to simulate a real-world backend environment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
