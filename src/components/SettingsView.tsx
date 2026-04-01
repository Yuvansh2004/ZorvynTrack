"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Shield, UserCircle, Mail, User, BadgeCheck, Briefcase, Globe, GraduationCap, MapPin } from 'lucide-react';
import { useFinance, ASSIGNMENT_REF_ID } from '@/context/FinanceContext';
import { Separator } from '@/components/ui/separator';

export const SettingsView = () => {
  const { isDarkMode, setIsDarkMode, userRole } = useFinance();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-900 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            User<span className="text-indigo-600">Profile</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Reference ID: {ASSIGNMENT_REF_ID}</p>
        </div>
        <div className="bg-indigo-600/10 px-4 py-2 rounded-xl border border-indigo-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Zorvyn Assessment Mode</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* 1. Identity Records */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-indigo-600" /> Identity Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Full Name</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Yuvansh Dashrath Koli</p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1.5"><Mail className="w-3 h-3"/> Personal Communication</p>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">yuvanshkoli1011@gmail.com</p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 md:col-span-2">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><Shield className="w-3 h-3"/> Active Session Node</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{userRole} Terminal (ZorvynTrack Kernel)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Preferences (Settings) */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-600" /> System Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Dark Theme</Label>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Modulate Interface Appearance</p>
                </div>
                <Switch 
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* 3. About the Developer */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Globe className="w-32 h-32" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-600" /> About the Developer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-indigo-200 dark:shadow-none shrink-0">
                  YK
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">Yuvansh Dashrath Koli</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                        <GraduationCap className="w-3.5 h-3.5" /> 3rd Year Student
                      </p>
                      <p className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                        <MapPin className="w-3 h-3" /> Terna Engineering College, Nerul West
                      </p>
                      <p className="text-[11px] font-medium text-slate-500 ml-5">
                        Department of Computer Engineering
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    I am a passionate student developer focused on crafting clean, data-driven financial interfaces. This dashboard demonstrates my expertise in frontend state management, responsive design, and building intuitive user experiences as part of my computer engineering curriculum.
                  </p>
                  <div className="flex flex-col gap-3 pt-2">
                    <div className="flex flex-wrap gap-4">
                      <a href="mailto:yuvanshkoli1011@gmail.com" className="flex items-center gap-2 text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest">
                        <Mail className="w-3.5 h-3.5" /> Personal: yuvanshkoli1011@gmail.com
                      </a>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <a href="mailto:yuvanshkoli2324@ternaengg.ac.in" className="flex items-center gap-2 text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest">
                        <Mail className="w-3.5 h-3.5" /> College: yuvanshkoli2324@ternaengg.ac.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Security Status - Sidebar Card */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" /> Node Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-2xl bg-indigo-600 text-white relative overflow-hidden">
                <Shield className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
                <p className="text-[10px] font-black uppercase opacity-60 mb-2">Authenticated Access</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase">{userRole}</h3>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <Separator className="my-4 bg-white/20" />
                <p className="text-[10px] font-bold leading-relaxed opacity-80">
                  Terminal behavior is currently modulated by {userRole === 'Admin' ? 'Management' : 'Audit-only'} protocols for the Zorvyn assessment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};