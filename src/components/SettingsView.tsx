"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, Bell, Shield, User } from 'lucide-react';

export const SettingsView = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">System Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Configure your personal dashboard parameters</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Moon className="w-4 h-4" /> Interface
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-xs text-slate-500">Enable high-contrast dark theme</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between opacity-50 pointer-events-none">
              <div className="space-y-0.5">
                <Label>Compact View</Label>
                <p className="text-xs text-slate-500">Reduce padding across all views</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Budget Alerts</Label>
                <p className="text-xs text-slate-500">Notify when spending exceeds threshold</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Monthly Reports</Label>
                <p className="text-xs text-slate-500">Receive automated PDF audit reports</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <User className="w-4 h-4" /> Account Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Developer Name</p>
                <p className="text-sm font-bold text-slate-900">Yuvansh Dashrath Koli</p>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Registered Email</p>
                <p className="text-sm font-bold text-slate-900">yuvanshkoli@zorvyn.com</p>
              </div>
            </div>
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50 flex items-center gap-4">
              <Shield className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-sm font-bold text-indigo-900">Internship Project Access</p>
                <p className="text-xs text-indigo-700">All data is currently stored locally for assessment purposes.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
