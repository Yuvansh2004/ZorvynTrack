
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ZorvynLogo } from '@/components/ZorvynLogo';

export const GreetingPopup = () => {
  const { showGreeting, closeGreeting, currentUser } = useFinance();

  if (!currentUser) return null;

  const userName = currentUser.name.split(' ')[0];

  return (
    <Dialog open={showGreeting} onOpenChange={(open) => !open && closeGreeting()}>
      <DialogContent className="sm:max-w-[480px] border-none shadow-2xl p-0 overflow-hidden rounded-[3rem] bg-white dark:bg-slate-950">
        <div className="bg-indigo-600 p-12 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_0%,transparent_100%)]" />
          <motion.div
            initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="bg-white p-6 rounded-[2rem] shadow-2xl relative z-10 mb-6"
          >
            <ZorvynLogo className="w-12 h-12 text-indigo-600" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-[10px] font-black uppercase tracking-[0.4em] relative z-10"
          >
            System Security Technology
          </motion.p>
        </div>
        
        <div className="p-10 space-y-8 text-center">
          <DialogHeader>
            <DialogTitle className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">
              Namaste, {userName}!
            </DialogTitle>
            <DialogDescription className="text-lg font-bold text-slate-500 dark:text-slate-400 mt-4">
              How is your day today?
            </DialogDescription>
          </DialogHeader>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
              "Your secure financial node is synchronized and ready for management."
            </p>
          </div>

          <DialogFooter>
            <Button 
              onClick={closeGreeting} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] tracking-[3px] h-14 rounded-2xl transition-all shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] active:scale-95"
            >
              INITIALIZE TERMINAL
            </Button>
          </DialogFooter>
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400">
            ZorvynTrack Institutional Terminal
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
