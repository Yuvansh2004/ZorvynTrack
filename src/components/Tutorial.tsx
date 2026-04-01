
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
import { History, Menu, Home, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ZorvynLogo } from '@/components/ZorvynLogo';

const steps = [
  {
    title: "Onboarding Protocol",
    description: "Welcome to ZorvynTrack. This point-to-point tutorial will initialize your session and guide you through the terminal architecture.",
    icon: ZorvynLogo,
    color: "text-indigo-600",
    detail: "System identification confirmed. Let's explore the core navigation nodes."
  },
  {
    title: "Sidebar Navigation",
    description: "The sidebar on the left is your institutional command handle. Use the Z logo for identification and the Arrow toggle to switch between expanded and compact modes.",
    icon: Menu,
    color: "text-indigo-600",
    detail: "The arrow beside the logo allows for seamless layout modulation."
  },
  {
    title: "Dashboard Telemetry",
    description: "Your Homepage Hub. Monitor Balance, Income Velocity, and Expenditure classification cards here in real-time.",
    icon: Home,
    color: "text-indigo-600",
    detail: "Telemetry is automatically updated across all institutional views."
  },
  {
    title: "Institutional Ledger",
    description: "The Transactions view is your secure record. Filter, search, and manage financial entries with precision.",
    icon: History,
    color: "text-indigo-600",
    detail: "Viewers have a 30-second window to correct errors before entries become permanent."
  },
  {
    title: "Protocol Complete",
    description: "Initialization complete. You are now fully authorized to manage your student finances with ZorvynTrack precision.",
    icon: CheckCircle2,
    color: "text-emerald-600",
    detail: "Your session node is active and synchronized."
  }
];

export const Tutorial = () => {
  const { hasSeenTutorial, completeTutorial, currentUser, isTransitioning } = useFinance();
  const [currentStep, setCurrentStep] = useState(0);

  // Show tutorial ONLY if hasSeenTutorial is false and we aren't currently loading
  if (hasSeenTutorial || !currentUser || isTransitioning) return null;

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={!hasSeenTutorial} onOpenChange={(open) => !open && completeTutorial()}>
      <DialogContent className="sm:max-w-[520px] border-none shadow-2xl p-0 overflow-hidden rounded-[3rem] bg-white dark:bg-slate-950">
        <div className="bg-indigo-600 p-12 flex items-center justify-center relative overflow-hidden">
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
              <step.icon className={cn("w-12 h-12", step.color)} />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 px-4">
            {steps.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === currentStep ? "w-8 bg-white" : "w-1.5 bg-white/30"
                )} 
              />
            ))}
          </div>
        </div>
        
        <div className="p-10 space-y-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black italic uppercase tracking-tighter text-center text-slate-900 dark:text-white">
              {step.title}
            </DialogTitle>
            <DialogDescription className="text-sm font-bold text-slate-500 dark:text-slate-400 leading-relaxed text-center pt-2">
              {step.description}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-black uppercase tracking-widest text-indigo-600 mb-2 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              Institutional Protocol
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
              "{step.detail}"
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-4">
            {currentStep > 0 && (
              <Button 
                variant="outline"
                onClick={handleBack}
                className="flex-1 rounded-2xl font-black uppercase text-[10px] tracking-widest h-14 border-slate-200"
              >
                Previous
              </Button>
            )}
            <Button 
              onClick={handleNext} 
              className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[10px] tracking-[3px] h-14 rounded-2xl transition-all shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] active:scale-95"
            >
              {currentStep === steps.length - 1 ? "FINALIZE INITIALIZATION" : "NEXT NODE"}
            </Button>
          </DialogFooter>
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-slate-400 text-center">
            ZorvynTrack System Security Technology
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
