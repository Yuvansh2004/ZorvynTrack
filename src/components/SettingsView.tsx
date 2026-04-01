"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Shield, UserCircle, Mail, User, BadgeCheck } from 'lucide-react';
import { useFinance, ASSIGNMENT_REF_ID } from '@/context/FinanceContext';

export const SettingsView = () => {
  const { isDarkMode, setIsDarkMode, userRole, currentUser } = useFinance();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            User<span className="text-indigo-600">Profile</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Ref ID: {ASSIGNMENT_REF_ID}</p>
        </div>
        <div className="bg-indigo-600/10 px-4 py-2 rounded-xl border border-indigo-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Active Session</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-600" /> Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-sm font-bold">Dark Mode</Label>
                <p className="text-xs text-slate-500">Adjust the visual theme of the dashboard.</p>
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
              <Shield className="w-4 h-4 text-indigo-600" /> Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Access Level</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{userRole}</p>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Your role determines which financial records and management tools are available to you.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <UserCircle className="w-4 h-4 text-indigo-600" /> Account Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Name</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Yuvansh Dashrath Koli</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1.5"><Mail className="w-3 h-3"/> Personal Email</p>
                <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">yuvanshkoli1011@gmail.com</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><BadgeCheck className="w-3 h-3"/> Demo Identity</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">yuvanshkoli@demozorvyn.com</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
