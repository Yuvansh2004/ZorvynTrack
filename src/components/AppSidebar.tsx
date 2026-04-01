
"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  Lightbulb, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Shield,
  Zap,
  LogOut,
  LineChart,
  Bell
} from 'lucide-react';
import { useFinance, ViewType, UserRole } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export function AppSidebar() {
  const { activeView, setActiveView, userRole, currentUser, logout } = useFinance();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard' as ViewType },
    { icon: History, label: 'Ledger Terminal', view: 'Transactions' as ViewType },
    { icon: LineChart, label: 'Alpha Portfolios', view: 'Insights' as ViewType },
    { icon: Settings, label: 'System Settings', view: 'Settings' as ViewType },
  ];

  return (
    <aside className={cn(
      "bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 transition-all duration-300 flex flex-col h-screen sticky top-0 z-50",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between border-b border-slate-50 dark:border-slate-900">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="relative flex items-center justify-center">
              <div className="bg-indigo-600 p-1.5 rounded-xl rotate-3 shadow-lg shadow-indigo-500/20">
                <Zap className="w-4 h-4 text-white fill-white/20" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-950 rounded-full p-0.5 border border-slate-100 dark:border-slate-800">
                <Shield className="w-2.5 h-2.5 text-indigo-600" />
              </div>
            </div>
            <span className="text-sm font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">Zorvyn<span className="text-indigo-600">Track</span></span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveView(item.view)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
              activeView === item.view 
                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-colors",
              activeView === item.view ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500 group-hover:text-indigo-400"
            )} />
            {!isCollapsed && (
              <span className="text-sm font-semibold tracking-tight">{item.label}</span>
            )}
            {activeView === item.view && !isCollapsed && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-900 space-y-4">
        {!isCollapsed && (
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Identity Profile
              </Label>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-tight px-2 py-0.5 rounded-full",
                userRole === 'Admin' ? "bg-indigo-100 text-indigo-700" : "bg-slate-200 text-slate-600"
              )}>
                {userRole}
              </span>
            </div>
            <p className="text-[9px] text-slate-400 italic">
              {userRole === 'Admin' ? 'Audit & Management unlocked.' : 'Standard read/write terminal access.'}
            </p>
          </div>
        )}

        <div className={cn(
          "flex items-center gap-3 transition-opacity",
          isCollapsed ? "justify-center" : "px-2"
        )}>
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold ring-2 ring-white dark:ring-slate-900">
            {currentUser?.name.split(' ').map(n => n[0]).join('')}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser?.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser?.email}</p>
            </div>
          )}
          {!isCollapsed && (
            <Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:text-rose-500">
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}
