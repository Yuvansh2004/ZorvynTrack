"use client";

import React, { useState } from 'react';
import { useFinance, DEMO_ACCOUNTS } from '@/context/FinanceContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, Mail, Lock, Eye, EyeOff, Info, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogTrigger 
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

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
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password || '');
    setIsModalOpen(false);
  };

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-8 relative overflow-hidden font-body transition-colors duration-500",
      isDarkMode ? "bg-slate-950" : "bg-slate-50"
    )}>
      {/* Background Mesh */}
      <div className={cn(
        "absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-[0.03]",
        isDarkMode ? "text-indigo-500" : "text-slate-300"
      )}></div>
      
      {/* Theme Toggle */}
      <div className="absolute top-8 right-8 z-20">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={cn(
            "rounded-full border shadow-sm",
            isDarkMode ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-indigo-600"
          )}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10 space-y-8"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative"
          >
            <div className={cn(
              "p-6 rounded-[2rem] mb-6 border transition-all duration-500",
              isDarkMode 
                ? "bg-indigo-600/10 border-indigo-500/20 shadow-[0_0_80px_rgba(79,70,229,0.3)]" 
                : "bg-white border-indigo-100 shadow-[0_20px_40px_rgba(0,0,0,0.05)]"
            )}>
              <ZorvynLogo className="w-12 h-12 text-indigo-600" />
            </div>
          </motion.div>
          <h1 className={cn(
            "text-3xl font-black tracking-tighter italic uppercase",
            isDarkMode ? "text-white" : "text-slate-900"
          )}>
            Zorvyn<span className="text-indigo-600">Track</span>
          </h1>
          <p className="text-slate-400 text-[10px] mt-2 font-black uppercase tracking-[6px] opacity-70">Unified Assets Kernel</p>
        </div>

        <div className={cn(
          "backdrop-blur-xl p-10 rounded-[2.5rem] border shadow-2xl relative overflow-hidden",
          isDarkMode ? "bg-slate-900/50 border-slate-800/50" : "bg-white border-slate-100"
        )}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2.5">
              <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-400">Identity (Email)</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input 
                  type="email" 
                  placeholder="corporate@zorvyn.com" 
                  className={cn(
                    "pl-12 focus:ring-indigo-600 h-12 text-sm font-bold tracking-tight rounded-xl transition-all",
                    isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                  )}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label className="text-[10px] font-black uppercase tracking-[2px] text-slate-400">Secure Key</Label>
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[10px] font-black uppercase tracking-[1px] text-indigo-500 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                >
                  {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className={cn(
                    "pl-12 focus:ring-indigo-600 h-12 font-bold rounded-xl transition-all",
                    isDarkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                  )}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-[11px] tracking-[3px] h-12 rounded-xl shadow-lg transition-all active:scale-[0.98]"
            >
              {isSubmitting ? "SYNCING..." : "SECURE ENTRY"}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-3" />}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 hover:text-indigo-500 uppercase tracking-[2px] transition-colors">
                  <Info className="w-3.5 h-3.5" /> Forgot Key or Need Demo?
                </button>
              </DialogTrigger>
              <DialogContent className={cn(
                "sm:max-w-[400px] border-none",
                isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"
              )}>
                <DialogHeader>
                  <DialogTitle className="text-xl font-black italic uppercase tracking-tight">Sector <span className="text-indigo-600">Manifest</span></DialogTitle>
                  <DialogDescription className="text-xs text-slate-400">
                    Use these official demo credentials to audit the system roles.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[300px] pr-4 mt-4">
                  <div className="space-y-3">
                    {DEMO_ACCOUNTS.map((acc) => (
                      <div 
                        key={acc.email} 
                        className={cn(
                          "p-4 rounded-2xl border transition-all cursor-pointer group",
                          isDarkMode 
                            ? "bg-slate-950/50 border-slate-800 hover:border-indigo-500/50" 
                            : "bg-slate-50 border-slate-100 hover:border-indigo-200 hover:bg-white"
                        )}
                        onClick={() => fillDemo(acc)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="text-xs font-black uppercase tracking-tight">{acc.name}</p>
                            <p className="text-[10px] text-slate-400">{acc.email}</p>
                          </div>
                          <span className={cn(
                            "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                            acc.role === 'Admin' ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                          )}>
                            {acc.role}
                          </span>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 font-bold">Key: <code className="text-indigo-500">{acc.password}</code></span>
                          <span className="text-[9px] font-black uppercase text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">Auto-fill →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
