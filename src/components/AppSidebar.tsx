
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
  Menu
} from 'lucide-react';
import { useFinance, ViewType } from '@/context/FinanceContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ZorvynLogo } from '@/components/ZorvynLogo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function AppSidebar() {
  const { activeView, setActiveView, currentUser, logout } = useFinance();
  const [isOpen, setIsOpen] = React.useState(true);
  const isMobile = useIsMobile();

  if (!currentUser) return null;

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', view: 'Dashboard' as ViewType },
    { icon: History, label: 'Transactions', view: 'Transactions' as ViewType },
    { icon: Lightbulb, label: 'Insights', view: 'Insights' as ViewType },
    { icon: User, label: 'Profile Settings', view: 'Settings' as ViewType },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SidebarContentNode = () => (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      <div className="h-24 flex items-center border-b border-slate-50 dark:border-slate-900 px-4 md:px-6">
        <div className={cn(
          "flex w-full items-center",
          isMobile || isOpen ? "justify-between" : "justify-center gap-2"
        )}>
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-indigo-600 rounded-xl p-2 shrink-0 shadow-lg shadow-indigo-100 dark:shadow-none">
              <ZorvynLogo className="w-4 h-4 text-white" />
            </div>
            {(isMobile || isOpen) && (
              <span className="text-[14px] font-black italic tracking-tighter text-slate-900 dark:text-white uppercase whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                Zorvyn<span className="text-indigo-600">Track</span>
              </span>
            )}
          </div>

          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className={cn(
                "shrink-0 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-indigo-600 transition-all duration-300",
                isOpen ? "h-9 w-9" : "h-8 w-8"
              )}
            >
              {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-2 mt-6">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActiveView(item.view);
              // On mobile, the sheet will likely close if handled by parent or by logic here
            }}
            className={cn(
              "w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
              activeView === item.view 
                ? "bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none" 
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 shrink-0 transition-transform duration-300 group-hover:scale-110", 
              activeView === item.view ? "opacity-100" : "opacity-60"
            )} />
            {(isMobile || isOpen) && (
              <span className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap animate-in fade-in duration-300">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-50 dark:border-slate-900">
        <div className={cn(
          "flex items-center gap-3 p-4 rounded-2xl transition-all",
          isMobile || isOpen ? "bg-slate-50 dark:bg-slate-900" : "justify-center"
        )}>
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-sm font-black shrink-0 shadow-lg shadow-indigo-100 dark:shadow-none">
            {currentUser.name[0]}
          </div>
          {(isMobile || isOpen) && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-black uppercase tracking-tight truncate text-slate-900 dark:text-white">{currentUser.name}</p>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest truncate">{currentUser.role}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors shrink-0 h-9 w-9">
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 z-40">
        <div className="flex items-center gap-2">
          <ZorvynLogo className="w-5 h-5 text-indigo-600" />
          <span className="text-[12px] font-black italic tracking-tighter text-slate-900 dark:text-white uppercase">
            Zorvyn<span className="text-indigo-600">Track</span>
          </span>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-none">
            <SidebarContentNode />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <aside className={cn(
      "bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-900 transition-all duration-500 flex flex-col h-screen sticky top-0 z-50 overflow-hidden",
      isOpen ? "w-72" : "w-24"
    )}>
      <SidebarContentNode />
    </aside>
  );
}
