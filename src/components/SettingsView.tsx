"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Shield, UserCircle, Mail, User, BadgeCheck, Github, Linkedin, Briefcase, Globe } from 'lucide-react';
import { useFinance, ASSIGNMENT_REF_ID } from '@/context/FinanceContext';
import { Separator } from '@/components/ui/separator';

export const SettingsView = () => {
  const { isDarkMode, setIsDarkMode, userRole, currentUser } = useFinance();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end border-b border-slate-100 dark:border-slate-900 pb-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            User<span className="text-indigo-600">Profile</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Assignment Ref: {ASSIGNMENT_REF_ID}</p>
        </div>
        <div className="bg-indigo-600/10 px-4 py-2 rounded-xl border border-indigo-500/20">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Zorvyn Assessment Mode</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* About the Developer - Genuine Student Bio */}
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
                    <p className="text-sm text-indigo-600 font-bold">Frontend Engineering Enthusiast</p>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    As a dedicated student developer, I focus on building intuitive, data-driven interfaces that solve real-world problems. This ZorvynTrack project represents my approach to clean code, responsive design, and effective state management. I am passionate about crafting user experiences that are both functional and visually engaging.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <a href="mailto:yuvanshkoli1011@gmail.com" className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </a>
                    <div className="w-px h-3 bg-slate-200 dark:bg-slate-800 self-center" />
                    <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                      <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                    </button>
                    <div className="w-px h-3 bg-slate-200 dark:bg-slate-800 self-center" />
                    <button className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
                      <Github className="w-3.5 h-3.5" /> GitHub
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Identification */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <UserCircle className="w-4 h-4 text-indigo-600" /> Identity Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Name</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Yuvansh Dashrath Koli</p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1.5"><Mail className="w-3 h-3"/> Personal Communication</p>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">yuvanshkoli1011@gmail.com</p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><BadgeCheck className="w-3 h-3"/> Demo Persona</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser?.email}</p>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1 flex items-center gap-1"><Shield className="w-3 h-3"/> Session Node</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{userRole} Terminal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Preferences */}
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-600" /> Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <Label className="text-sm font-bold">Dark Theme</Label>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">System Appearance</p>
                </div>
                <Switch 
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Status */}
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
                  Terminal behavior is currently modulated by {userRole === 'Admin' ? 'Management' : 'Audit-only'} protocols as per Zorvyn security guidelines.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
