"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  Lightbulb, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useFinance, ViewType } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
  const { activeView, setActiveView } = useFinance();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard' as ViewType },
    { icon: History, label: 'Transactions', view: 'Transactions' as ViewType },
    { icon: Lightbulb, label: 'Insights', view: 'Insights' as ViewType },
    { icon: Settings, label: 'Settings', view: 'Settings' as ViewType },
  ];

  return (
    <aside className={cn(
      "bg-white border-r border-slate-200 transition-all duration-300 flex flex-col h-full sticky top-0",
      isCollapsed ? "w-20" : "w-64"
    )}>
      <div className="p-6 flex items-center justify-between border-b border-slate-50">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600 fill-indigo-600/10" />
            <span className="text-sm font-black uppercase tracking-[3px] text-slate-900">Interface</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hover:bg-slate-50 text-slate-400"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveView(item.view)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group",
              activeView === item.view 
                ? "bg-indigo-50 text-indigo-600" 
                : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeView === item.view ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-400"
            )} />
            {!isCollapsed && (
              <span className="text-sm font-semibold tracking-tight">{item.label}</span>
            )}
            {activeView === item.view && !isCollapsed && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-600" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 border-t border-slate-50">
        <div className={cn(
          "bg-slate-950 rounded-2xl p-4 transition-all overflow-hidden",
          isCollapsed ? "opacity-0" : "opacity-100"
        )}>
          <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Student Node</p>
          <p className="text-xs text-white/50 truncate">Zorvyn Assignment 2024</p>
        </div>
      </div>
    </aside>
  );
}
