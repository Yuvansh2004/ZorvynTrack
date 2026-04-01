
"use client";

import React, { useState } from 'react';
import { useFinance, DEMO_ACCOUNTS } from '@/context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Mail, Lock, Info, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

export const LoginPage = () => {
  const { login } = useFinance();
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
          title: "Session Established",
          description: "Biometric and cryptographic handshake complete.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Access Terminated",
          description: "Invalid credentials or unauthorized hardware node.",
        });
        setIsSubmitting(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-8 relative overflow-hidden font-body">
      {/* Background Tech Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>
      
      {/* Animated Glow Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse transition-all duration-1000"></div>

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
            <div className="p-8 bg-indigo-600/10 rounded-[2.5rem] mb-8 border border-indigo-500/20 shadow-[0_0_80px_rgba(79,70,229,0.3)] rotate-3">
              <Zap className="w-16 h-16 text-indigo-500 fill-indigo-500/10" />
            </div>
            <div className="absolute -bottom-2 -right-2 p-2.5 bg-[#020617] rounded-full border-2 border-slate-800 shadow-xl">
              <Shield className="w-8 h-8 text-indigo-500" />
            </div>
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">Zorvyn<span className="text-indigo-500">Track</span></h1>
          <p className="text-slate-500 text-[10px] mt-3 font-black uppercase tracking-[6px] opacity-70">Unified Assets Kernel</p>
        </div>

        <div className="glass-card p-10 rounded-[2rem] border border-slate-800/50 shadow-2xl relative backdrop-blur-3xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500">Node Identity (Email)</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
                <Input 
                  type="email" 
                  placeholder="corporate@zorvyn.com" 
                  className="bg-slate-900/40 border-slate-800 pl-12 focus:ring-indigo-500 h-14 text-sm font-bold tracking-tight rounded-xl transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-500">Secure Access Hash</Label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within:text-indigo-500 transition-colors" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-slate-900/40 border-slate-800 pl-12 focus:ring-indigo-500 h-14 font-bold rounded-xl transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-[11px] tracking-[3px] h-14 rounded-xl group transition-all shadow-[0_10px_20px_rgba(79,70,229,0.2)]"
            >
              {isSubmitting ? "SYNCHRONIZING..." : "SECURE ENTRY"}
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-800/50">
            <button 
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full flex items-center justify-between text-[10px] font-black text-indigo-400 uppercase tracking-[2px] hover:text-white transition-colors"
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
                  className="overflow-hidden"
                >
                  <ScrollArea className="h-56 mt-6 pr-4">
                    <div className="space-y-3 pb-4">
                      <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[1px] mb-4">Auth Key: <span className="text-white italic">zorvyn2024</span></p>
                      {DEMO_ACCOUNTS.map((acc) => (
                        <motion.div 
                          key={acc.email} 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl text-[10px] cursor-pointer hover:border-indigo-500/50 hover:bg-slate-900 transition-all group"
                          onClick={() => setEmail(acc.email)}
                        >
                          <div className="flex justify-between font-black mb-1.5">
                            <span className="text-white group-hover:text-indigo-400 transition-colors">{acc.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[8px] ${acc.role === 'Admin' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}>{acc.role}</span>
                          </div>
                          <span className="text-slate-500 font-medium">{acc.email}</span>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 opacity-30 select-none">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[5px]">Quantum Ledger Core v9.0.2</p>
        </div>
      </motion.div>
    </div>
  );
};
