
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
import { Wallet, Shield, BarChart3, History, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: "Welcome to ZorvynTrack",
    description: "Your institutional-grade kernel for student finance management. Let's explore your terminal.",
    icon: Zap,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    title: "Dashboard Summary",
    description: "Get a real-time pulse on your total balance, income velocity, and expenditure classification.",
    icon: BarChart3,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    title: "Transaction Ledger",
    description: "Record new entries, filter by date ranges, and export your history to CSV formats.",
    icon: History,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
  },
  {
    title: "RBAC Security",
    description: "The system modulates based on your role (Admin vs Viewer). Admins maintain full ledger authority.",
    icon: Shield,
    color: "text-indigo-600",
    bg: "bg-indigo-50"
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
      <DialogContent className="sm:max-w-[440px] border-none shadow-2xl p-0 overflow-hidden rounded-[2.5rem]">
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
                    i === currentStep ? "w-8 bg-indigo-600" : "w-2 bg-slate-200"
                  )} 
                />
              ))}
            </div>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tight text-center">
              {step.title.split(' ')[0]} <span className="text-indigo-600">{step.title.split(' ').slice(1).join(' ')}</span>
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-slate-500 leading-relaxed text-center pt-2">
              {step.description}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={handleNext} 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[11px] tracking-[3px] h-12 rounded-xl transition-all"
            >
              {currentStep === steps.length - 1 ? "INITIALIZE TERMINAL" : "NEXT STEP"}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Internal utility to handle classes within this file if needed
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
