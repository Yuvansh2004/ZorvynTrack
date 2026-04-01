
"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  Lightbulb, 
  User, 
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useFinance, ViewType } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ZorvynLogo } from '@/components/ZorvynLogo';

export function AppSidebar() {
  const { activeView, setActiveView, currentUser, logout } = useFinance();
  const [isOpen, setIsOpen] = React.useState(true);

  if (!currentUser) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard' as ViewType },
    { icon: History, label: 'Transactions', view: 'Transactions' as ViewType },
    { icon: Lightbulb, label: 'Insights', view: 'Insights' as ViewType },
    { icon: User, label: 'Profile Settings', view: 'Settings' as ViewType },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <aside className={cn(
      "bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900 transition-all duration-500 flex flex-col h-screen sticky top-0 z-50 overflow-hidden",
      isOpen ? "w-72" : "w-20"
    )}>
      <div className={cn(
        "h-24 flex items-center border-b border-slate-50 dark:border-slate-900 transition-all",
        isOpen ? "px-4" : "px-1.5"
      )}>
        <div className={cn(
          "flex w-full items-center",
          isOpen ? "justify-between" : "justify-center gap-1"
        )}>
          <div className="flex items-center gap-2 overflow-hidden">
            <div className={cn(
              "bg-indigo-600 rounded-xl shrink-0 shadow-lg shadow-indigo-100 dark:shadow-none transition-all",
              isOpen ? "p-2" : "p-1.5"
            )}>
              <ZorvynLogo className={cn("text-white transition-all", isOpen ? "w-5 h-5" : "w-4 h-4")} />
            </div>
            {isOpen && (
              <span className="text-lg font-black italic tracking-tighter text-slate-900 dark:text-white uppercase whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                Zorvyn<span className="text-indigo-600">Track</span>
              </span>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className={cn(
              "shrink-0 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-indigo-600 transition-all duration-300",
              isOpen ? "h-9 w-9" : "h-7 w-7"
            )}
          >
            {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveView(item.view)}
            className={cn(
              "w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group",
              activeView === item.view 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none" 
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110", 
              activeView === item.view ? "opacity-100" : "opacity-60"
            )} />
            {isOpen && (
              <span className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap animate-in fade-in duration-300">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-2 border-t border-slate-50 dark:border-slate-900">
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-xl transition-all",
          isOpen ? "bg-slate-50 dark:bg-slate-900" : "justify-center"
        )}>
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-black shrink-0 shadow-lg shadow-indigo-100 dark:shadow-none">
            {currentUser.name[0]}
          </div>
          {isOpen && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black uppercase tracking-tight truncate text-slate-900 dark:text-white">{currentUser.name}</p>
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest truncate">{currentUser.role}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors shrink-0 h-8 w-8">
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
