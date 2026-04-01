
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
  Eye,
  UserCircle
} from 'lucide-react';
import { useFinance, ViewType, UserRole } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function AppSidebar() {
  const { activeView, setActiveView, userRole, setUserRole } = useFinance();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard' as ViewType },
    { icon: History, label: 'Transactions', view: 'Transactions' as ViewType },
    { icon: Lightbulb, label: 'Insights', view: 'Insights' as ViewType },
    { icon: Settings, label: 'Settings', view: 'Settings' as ViewType },
  ];

  return (
    <aside className={cn(
      "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-screen sticky top-0 z-50",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between border-b border-slate-50 dark:border-slate-800">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-sm shadow-indigo-200">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">ZorvynTrack</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400"
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
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
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

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        {!isCollapsed ? (
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="role-toggle" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                System Role
              </Label>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-tight px-2 py-0.5 rounded-full",
                userRole === 'Admin' ? "bg-indigo-100 text-indigo-700" : "bg-slate-200 text-slate-600"
              )}>
                {userRole}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Switch 
                id="role-toggle"
                checked={userRole === 'Admin'} 
                onCheckedChange={(checked) => setUserRole(checked ? 'Admin' : 'Viewer')}
              />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Admin Mode
              </span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button variant="ghost" size="icon" onClick={() => setUserRole(userRole === 'Admin' ? 'Viewer' : 'Admin')}>
              {userRole === 'Admin' ? <Shield className="w-5 h-5 text-indigo-600" /> : <Eye className="w-5 h-5 text-slate-400" />}
            </Button>
          </div>
        )}

        <div className={cn(
          "flex items-center gap-3 transition-opacity",
          isCollapsed ? "justify-center" : "px-2"
        )}>
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            YK
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Yuvansh Koli</p>
              <p className="text-[10px] text-slate-500 truncate">Admin Node</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
