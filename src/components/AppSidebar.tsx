"use client";

import React from 'react';
import { 
  LayoutDashboard, 
  History, 
  Lightbulb, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useFinance, ViewType } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const ZorvynLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L80 20L20 80L80 80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" />
  </svg>
);

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

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-[60]">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <aside className={cn(
        "bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col h-screen sticky top-0 z-50 overflow-hidden",
        isOpen ? "w-64" : "w-0 md:w-20"
      )}>
        <div className="p-6 border-b border-slate-50 dark:border-slate-900 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl shrink-0">
            <ZorvynLogo className="w-5 h-5 text-white" />
          </div>
          {isOpen && (
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              ZorvynTrack
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveView(item.view)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                activeView === item.view 
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none" 
                  : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {isOpen && <span className="text-sm font-semibold">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100 dark:border-slate-900">
          <div className={cn(
            "flex items-center gap-3 p-3 rounded-xl",
            isOpen ? "bg-slate-50 dark:bg-slate-900" : "justify-center"
          )}>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shrink-0">
              {currentUser.name[0]}
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{currentUser.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{currentUser.role}</p>
              </div>
            )}
            {isOpen && (
              <Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:text-rose-500">
                <LogOut className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}