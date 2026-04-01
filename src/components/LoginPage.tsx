
"use client";

import React, { useState } from 'react';
import { useFinance, DEMO_ACCOUNTS } from '@/context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Mail, Lock, Info, ChevronDown, ChevronUp } from 'lucide-react';
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
          title: "Network Authenticated",
          description: "Encrypted session established successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "Invalid credentials or unauthorized account.",
        });
        setIsSubmitting(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10 space-y-6"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="p-4 bg-primary/20 rounded-2xl mb-4 border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tighter">ZORVYN FINANCIAL</h1>
          <p className="text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-[4px]">Enterprise Asset Management</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-slate-800/50 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Node Identifier (Email)</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <Input 
                  type="email" 
                  placeholder="corp@zorvyn.com" 
                  className="bg-slate-900/50 border-slate-800 pl-10 focus:ring-primary h-12 text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Secure Access Key</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="bg-slate-900/50 border-slate-800 pl-10 focus:ring-primary h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 rounded-xl group transition-all"
            >
              {isSubmitting ? "ESTABLISHING SESSION..." : "SECURE LOGIN"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Demo Accounts List - Professional Implementation */}
          <div className="mt-8 pt-6 border-t border-slate-800/50">
            <button 
              onClick={() => setShowDemoAccounts(!showDemoAccounts)}
              className="w-full flex items-center justify-between text-[10px] font-bold text-primary uppercase tracking-widest hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2"><Info className="w-3 h-3" /> System Access Manifest</span>
              {showDemoAccounts ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
            
            <AnimatePresence>
              {showDemoAccounts && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <ScrollArea className="h-48 mt-4 pr-4">
                    <div className="space-y-2 pb-2">
                      <p className="text-[9px] text-slate-500 italic mb-2">Access Key for all: zorvyn2024</p>
                      {DEMO_ACCOUNTS.map((acc) => (
                        <div 
                          key={acc.email} 
                          className="p-2 bg-slate-900/50 border border-slate-800 rounded-lg text-[9px] cursor-pointer hover:border-primary transition-colors"
                          onClick={() => setEmail(acc.email)}
                        >
                          <div className="flex justify-between font-bold mb-1">
                            <span className="text-white">{acc.name}</span>
                            <span className={acc.role === 'Admin' ? 'text-primary' : 'text-slate-400'}>{acc.role}</span>
                          </div>
                          <span className="text-slate-500 lowercase">{acc.email}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 opacity-40">
          <p className="text-[8px] font-bold text-slate-600 uppercase tracking-[4px]">Encrypted with AES-256-GCM Standards</p>
        </div>
      </motion.div>
    </div>
  );
};
