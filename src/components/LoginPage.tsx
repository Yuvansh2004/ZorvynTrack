"use client";

import React, { useState } from 'react';
import { useFinance, DEMO_ACCOUNTS } from '@/context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Mail, Lock, Info, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const ZorvynLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20L80 20L20 80L80 80" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="10" fill="currentColor" />
  </svg>
);

export const LoginPage = () => {
  const { login, isDarkMode, setIsDarkMode } = useFinance();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast({
          title: "Access Granted",
          description: "Welcome to your personalized terminal.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid credentials.",
        });
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-8 relative overflow-hidden font-body">
      {/* Background Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-10"></div>
      
      {/* Theme Toggle in Login */}
      <div className="absolute top-8 right-8 z-20">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="rounded-full bg-slate-900/50 border-slate-800 text-slate-400 hover:text-white"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[460px] z-10 space-y-8"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <div className="p-8 bg-indigo-600/10 rounded-[2.5rem] mb-8 border border-indigo-500/20 shadow-[0_0_80px_rgba(79,70,229,0.3)]">
              <ZorvynLogo className="w-16 h-16 text-indigo-500" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">Zorvyn<span className="text-indigo-500">Track</span></h1>
          <p className="text-slate-500 text-[10px] mt-3 font-black uppercase tracking-[6px] opacity-70">Unified Assets Kernel</p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[2rem] border border-slate-800/50 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500">Identity (Email)</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
                <Input 
                  type="email" 
                  placeholder="corporate@zorvyn.com" 
                  className="bg-slate-950 border-slate-800 pl-12 focus:ring-indigo-500 h-14 text-sm font-bold tracking-tight rounded-xl transition-all text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500">Secure Key</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-slate-950 border-slate-800 pl-12 focus:ring-indigo-500 h-14 font-bold rounded-xl transition-all text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-[11px] tracking-[3px] h-14 rounded-xl shadow-lg"
            >
              {isSubmitting ? "SYNCING..." : "SECURE ENTRY"}
              <ArrowRight className="w-4 h-4 ml-3" />
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800/50">
            <button 
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full flex items-center justify-between text-[10px] font-black text-indigo-400 uppercase tracking-[2px]"
            >
              <span className="flex items-center gap-2 italic"><Info className="w-3.5 h-3.5" /> Sector Manifest</span>
              {showDemoAccounts ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            <AnimatePresence>
              {showDemoAccounts && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <ScrollArea className="h-48 mt-6">
                    <div className="space-y-2 pr-4">
                      {DEMO_ACCOUNTS.map((acc) => (
                        <div 
                          key={acc.email} 
                          className="p-3 bg-slate-950/50 border border-slate-800 rounded-xl text-[10px] cursor-pointer hover:border-indigo-500/50 transition-all"
                          onClick={() => setEmail(acc.email)}
                        >
                          <div className="flex justify-between font-black mb-1">
                            <span className="text-white">{acc.name}</span>
                            <span className="text-indigo-400">{acc.role}</span>
                          </div>
                          <span className="text-slate-500">{acc.email}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};