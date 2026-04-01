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
  Menu,
  X
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
      isOpen ? "w-72" : "w-0 md:w-24"
    )}>
      <div className={cn(
        "p-6 border-b border-slate-50 dark:border-slate-900 flex flex-col",
        isOpen ? "gap-4" : "gap-6 justify-center items-center"
      )}>
        <div className={cn(
          "flex items-center w-full",
          isOpen ? "justify-between" : "flex-col gap-6"
        )}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="bg-indigo-600 p-2.5 rounded-xl shrink-0 shadow-lg shadow-indigo-100 dark:shadow-none rotate-3">
              <ZorvynLogo className="w-5 h-5 text-white" />
            </div>
            {isOpen && (
              <span className="text-xl font-black italic tracking-tighter text-slate-900 dark:text-white uppercase truncate animate-in fade-in slide-in-from-left-2 duration-300">
                Zorvyn<span className="text-indigo-600">Track</span>
              </span>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar} 
            className="shrink-0 h-10 w-10 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-indigo-600 transition-all duration-300"
          >
            {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setActiveView(item.view)}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group",
              activeView === item.view 
                ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 dark:shadow-none" 
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

      <div className="p-4 border-t border-slate-50 dark:border-slate-900">
        <div className={cn(
          "flex items-center gap-3 p-4 rounded-[1.5rem] transition-all",
          isOpen ? "bg-slate-50 dark:bg-slate-900" : "flex-col justify-center"
        )}>
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shrink-0 shadow-lg shadow-indigo-100 dark:shadow-none">
            {currentUser.name[0]}
          </div>
          {isOpen ? (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black uppercase tracking-tight truncate text-slate-900 dark:text-white">{currentUser.name}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate">{currentUser.role}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0">
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0">
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </aside>
  );
}