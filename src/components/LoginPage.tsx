"use client";

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Mail, Lock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export const LoginPage = () => {
  const { login } = useFinance();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulating authentication delay
    setTimeout(() => {
      login(email);
      toast({
        title: "Access Authorised",
        description: `Welcome back, ${email.split('@')[0]}`,
      });
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden font-body">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-primary/20 rounded-2xl mb-4 border border-primary/20">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">ZorvynTrack</h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Technical Screening Portal</p>
        </div>

        <div className="glass-card p-8 rounded-3xl border border-slate-800/50 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Corporate Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="bg-slate-900/50 border-slate-800 pl-10 focus:ring-primary h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Access Key</Label>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline cursor-pointer">Forgot?</span>
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
              {isSubmitting ? "Authorising..." : "Authorise Access"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-6 p-3 bg-primary/5 border border-primary/10 rounded-xl flex items-start gap-3">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[9px] text-slate-400 leading-tight">
              <span className="font-bold text-primary uppercase">Demo Access:</span> For the purpose of this technical screening, any credentials will be accepted. Use your corporate email to proceed.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/50 text-center">
            <p className="text-xs text-slate-500 leading-relaxed italic">
              Developed by <span className="text-white font-bold">Yuvansh Dashrath Koli</span> for the Zorvyn FinTech assessment.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <span className="hover:text-slate-400 cursor-pointer">Privacy Protocol</span>
          <span className="hover:text-slate-400 cursor-pointer">System Status</span>
        </div>
      </motion.div>
    </div>
  );
};