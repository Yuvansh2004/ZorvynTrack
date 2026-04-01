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
import { Shield, BarChart3, History, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

// Unified Z Logo
const ZorvynLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L80 20L20 80L80 80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" />
  </svg>
);

const steps = [
  {
    title: "Welcome to ZorvynTrack",
    description: "Your institutional-grade kernel for student finance management. Let's explore your terminal.",
    icon: ZorvynLogo,
    color: "text-indigo-600",
    isBrand: true
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
      <DialogContent className="sm:max-w-[440px] border-none shadow-2xl p-0 overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-950">
        <div className="bg-indigo-600 p-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
              className="bg-white p-6 rounded-[2rem] shadow-2xl relative z-10"
            >
              <step.icon className={cn("w-12 h-12", step.color)} />
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="p-10 space-y-6">
          <DialogHeader>
            <div className="flex justify-center gap-1.5 mb-4">
              {steps.map((_, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "h-1 rounded-full transition-all duration-300",
                    i === currentStep ? "w-8 bg-indigo-600" : "w-2 bg-slate-200 dark:bg-slate-800"
                  )} 
                />
              ))}
            </div>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tight text-center text-slate-900 dark:text-white">
              {step.title.split(' ')[0]} <span className="text-indigo-600">{step.title.split(' ').slice(1).join(' ')}</span>
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed text-center pt-2">
              {step.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleNext} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[11px] tracking-[3px] h-12 rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              {currentStep === steps.length - 1 ? "INITIALIZE TERMINAL" : "NEXT STEP"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};