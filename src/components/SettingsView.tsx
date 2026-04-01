
"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Moon, Shield, UserCircle, Mail, User, ShieldCheck, 
  Trash2, Database, AlertCircle, Pencil, Save, X 
} from 'lucide-react';
import { useFinance, ASSIGNMENT_REF_ID } from '@/context/FinanceContext';
import { useToast } from '@/hooks/use-toast';

export const SettingsView = () => {
  const { currentUser, isDarkMode, setIsDarkMode, userRole, resetLedger, updateProfile } = useFinance();
  const { toast } = useToast();
  
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(currentUser?.name || '');

  if (!currentUser) return null;

  const handleSaveName = () => {
    if (tempName.trim()) {
      updateProfile(tempName.trim());
      setIsEditingName(false);
      toast({
        title: "Profile Updated",
        description: "Your name has been successfully updated in the system.",
      });
    }
  };

  const handleCancelName = () => {
    setTempName(currentUser.name);
    setIsEditingName(false);
  };

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

      <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/50 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl shadow-sm">
            <AlertCircle className="w-5 h-5 text-rose-600" />
          </div>
          <div className="max-w-xl">
            <h4 className="text-sm font-black uppercase tracking-tight text-rose-900 dark:text-rose-400">System Disclaimer</h4>
            <p className="text-xs text-rose-800 dark:text-rose-300 font-medium mt-1 leading-relaxed">
              This terminal currently contains mock telemetry and dummy entries for demonstration. If you wish to delete the mock data or reset the system ledger to a clean state, execute the wipe command.
            </p>
          </div>
        </div>
        <Button 
          variant="destructive" 
          onClick={resetLedger}
          className="rounded-xl font-black uppercase text-[10px] tracking-[2px] px-8 h-11 shadow-lg shadow-rose-200 dark:shadow-none hover:scale-105 transition-transform"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Mock Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
            <CardHeader className="border-b border-slate-50 dark:border-slate-800">
              <CardTitle className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2 text-slate-800 dark:text-white">
                <UserCircle className="w-5 h-5 text-indigo-600" /> Identity Records
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 group relative">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1.5 flex items-center gap-1.5"><User className="w-3.5 h-3.5"/> Full Name</p>
                  
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <Input 
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="h-8 font-bold text-sm rounded-lg"
                        autoFocus
                      />
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-emerald-600" onClick={handleSaveName}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-600" onClick={handleCancelName}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-7 w-7 text-slate-400 hover:text-indigo-600 hover:bg-transparent"
                        onClick={() => setIsEditingName(true)}
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1.5 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/> System Identity</p>
                  <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 break-all">{currentUser.email}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Read-Only Secure Handle</p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1.5 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5"/> Active Session Node</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tighter">{userRole} Terminal</p>
                </div>

                <div className="p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1.5 flex items-center gap-1.5"><Database className="w-3.5 h-3.5"/> Reference ID</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{ASSIGNMENT_REF_ID}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader className="border-b border-slate-50 dark:border-slate-800">
              <CardTitle className="text-lg font-black italic uppercase tracking-tight flex items-center gap-2 text-slate-800 dark:text-white">
                <Moon className="w-5 h-5 text-indigo-600" /> System Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
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
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600" /> Node Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-2xl bg-indigo-600 text-white relative overflow-hidden shadow-xl shadow-indigo-200 dark:shadow-none">
                <Shield className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
                <p className="text-[10px] font-black uppercase opacity-60 mb-2">Authenticated Access</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-2xl font-black italic tracking-tighter uppercase">{userRole}</h3>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="my-4 h-px bg-white/20" />
                <p className="text-[10px] font-bold leading-relaxed opacity-80">
                  Terminal behavior is currently modulated by {userRole === 'Admin' ? 'Management' : 'Audit-only'} protocols. 
                  Deletion and modification are restricted per node roles.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
