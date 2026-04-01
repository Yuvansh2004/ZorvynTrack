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
  Eye
} from 'lucide-react';
import { useFinance, ViewType } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function AppSidebar() {
  const { activeView, setActiveView, userRole, setUserRole, currentUser, logout } = useFinance();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  if (!currentUser) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard' as ViewType },
    { icon: History, label: 'Transactions', view: 'Transactions' as ViewType },
    { icon: Lightbulb, label: 'Insights', view: 'Insights' as ViewType },
    { icon: Settings, label: 'Settings', view: 'Settings' as ViewType },
  ];

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <aside className={cn(
      "bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-900 transition-all duration-300 flex flex-col h-screen sticky top-0 z-50",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between border-b border-slate-50 dark:border-slate-900">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-md shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Zorvyn<span className="text-indigo-600">Track</span></span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-slate-400"
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
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all",
              activeView === item.view 
                ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400" 
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeView === item.view ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500"
            )} />
            {!isCollapsed && (
              <span className="text-sm font-semibold">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100 dark:border-slate-900 space-y-4">
        {!isCollapsed && (
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Current Role
              </Label>
              <div className="flex items-center gap-2">
                {userRole === 'Admin' ? <Shield className="w-3 h-3 text-indigo-600" /> : <Eye className="w-3 h-3 text-slate-400" />}
                <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300">{userRole}</span>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <p className="text-[10px] text-slate-400 italic">Toggle for Demo RBAC</p>
              <Switch 
                checked={userRole === 'Admin'} 
                onCheckedChange={(checked) => setUserRole(checked ? 'Admin' : 'Viewer')}
                className="scale-75 origin-right"
              />
            </div>
          </div>
        )}

        <div className={cn(
          "flex items-center gap-3",
          isCollapsed ? "justify-center" : "px-2"
        )}>
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            {getInitials(currentUser.name)}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
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