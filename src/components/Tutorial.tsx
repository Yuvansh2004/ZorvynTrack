"use client";

import React, { useState } from 'react';
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
import { Shield, BarChart3, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ZorvynLogo } from '@/components/ZorvynLogo';

const steps = [
  {
    title: "Welcome to ZorvynTrack",
    description: "Your institutional-grade terminal for student finance management. Let's explore your terminal.",
    icon: ZorvynLogo,
    color: "text-indigo-600",
  },
  {
    title: "Dashboard Summary",
    description: "Get a real-time pulse on your total balance, income velocity, and expenditure classification.",
    icon: BarChart3,
    color: "text-indigo-600",
  },
  {
    title: "Transaction Ledger",
    description: "Record new entries, filter by date ranges, and export your history to CSV formats.",
    icon: History,
    color: "text-indigo-600",
  },
  {
    title: "RBAC Security",
    description: "The system modulates based on your role (Admin vs Viewer). Admins maintain full ledger authority.",
    icon: Shield,
    color: "text-indigo-600",
  }
];

export const Tutorial = () => {
  const { hasSeenTutorial, completeTutorial, currentUser } = useFinance();
  const [currentStep, setCurrentStep] = useState(0);

  if (hasSeenTutorial || !currentUser) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  return (
    <Dialog open={!hasSeenTutorial} onOpenChange={(open) => !open && completeTutorial()}>
      <DialogContent className="sm:max-w-[480px] border-none shadow-2xl p-0 overflow-hidden rounded-[3rem] bg-white dark:bg-slate-950">
        <div className="bg-indigo-600 p-16 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_0%,transparent_100%)]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 15 }}
              transition={{ type: "spring", damping: 12 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-2xl relative z-10"
            >
              <step.icon className={cn("w-16 h-16", step.color)} />
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="p-12 space-y-8">
          <DialogHeader>
            <div className="flex justify-center gap-2 mb-6">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    i === currentStep ? "w-10 bg-indigo-600" : "w-2 bg-slate-200 dark:bg-slate-800"
                  )} 
                />
              ))}
            </div>
            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-center text-slate-900 dark:text-white">
              {step.title.split(' ')[0]} <span className="text-indigo-600">{step.title.split(' ').slice(1).join(' ')}</span>
            </DialogTitle>
            <DialogDescription className="text-base font-bold text-slate-500 dark:text-slate-400 leading-relaxed text-center pt-4">
              {step.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-row gap-4 pt-6">
            <Button 
              onClick={handleNext} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-[4px] h-14 rounded-2xl transition-all shadow-xl shadow-indigo-200 dark:shadow-none hover:scale-[1.02] active:scale-95"
            >
              {currentStep === steps.length - 1 ? "INITIALIZE TERMINAL" : "NEXT PROTOCOL"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
