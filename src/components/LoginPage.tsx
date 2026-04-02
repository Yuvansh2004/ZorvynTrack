
"use client";

import React, { useState } from 'react';
import { useFinance, DEMO_ACCOUNTS } from '@/context/FinanceContext';
import { Mail, Lock, Eye, EyeOff, Info, Sun, Moon } from 'lucide-react';
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
import { cn } from '@/lib/utils';
import { ZorvynLogo } from '@/components/ZorvynLogo';

export const LoginPage = () => {
  const { login, isDarkMode, setIsDarkMode, adminUser } = useFinance();
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
          title: "Access Verified",
          description: "System access verified.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: "Invalid institutional credentials.",
        });
        setIsSubmitting(false);
      }
    }, 800);
  };

  const fillDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(acc.email);
    setPassword(acc.password || '');
    setIsModalOpen(false);
  };

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-6 relative font-body transition-all duration-700",
      isDarkMode ? "bg-slate-950" : "bg-slate-50"
    )}>
      <div className="absolute top-8 right-8 z-20">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="rounded-2xl w-12 h-12 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200 dark:shadow-none border-none"
        >
          {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-indigo-600" />}
        </Button>
      </div>

      <div className="w-full max-w-md space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-5 bg-indigo-600 rounded-[2.5rem] shadow-2xl shadow-indigo-200 dark:shadow-none mb-6 rotate-3">
            <ZorvynLogo className="w-10 h-10 text-white" />
          </div>
          <h1 className={cn(
            "text-5xl font-black italic tracking-tighter uppercase",
            isDarkMode ? "text-white" : "text-slate-900"
          )}>
            Zorvyn<span className="text-indigo-600">Track</span>
          </h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Institutional Finance Terminal</p>
        </div>

        <div className={cn(
          "p-10 rounded-[3rem] border shadow-2xl",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
        )}>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Identity Handle</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input 
                  type="email" 
                  placeholder="name@zorvyn.com" 
                  className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Security Key</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-12 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none font-bold text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs tracking-[0.3em] h-16 rounded-[1.5rem] transition-all shadow-xl shadow-indigo-100 dark:shadow-none hover:scale-[1.02] active:scale-95"
            >
              {isSubmitting ? "Verifying..." : "Initialize Session"}
            </Button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 dark:border-slate-800">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="w-full text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 hover:bg-transparent">
                  <Info className="w-3.5 h-3.5 mr-2" /> Sector Credentials
                </Button>
              </DialogTrigger>
              <DialogContent className={cn("rounded-[2rem] border-none max-h-[80vh] overflow-y-auto", isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900")}>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">Demo <span className="text-indigo-600">Sectors</span></DialogTitle>
                  <DialogDescription className="font-bold text-xs uppercase tracking-widest">Select a node to synchronize credentials.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-6">
                  {DEMO_ACCOUNTS.map((acc) => {
                    // Pull dynamic name from adminUser if this is the global admin account
                    const isGlobalAdmin = acc.role === 'Admin';
                    const displayName = isGlobalAdmin && adminUser ? adminUser.name : acc.name;
                    
                    return (
                      <div 
                        key={acc.email} 
                        className={cn(
                          "p-5 rounded-3xl border transition-all cursor-pointer group",
                          isDarkMode ? "border-slate-800 hover:bg-slate-800" : "border-slate-100 hover:bg-slate-50 hover:border-indigo-200"
                        )}
                        onClick={() => fillDemo(acc)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-black uppercase italic tracking-tight group-hover:text-indigo-600 transition-colors">
                                {displayName}
                              </p>
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold">{acc.email}</p>
                            <p className="text-[9px] text-indigo-500 font-black mt-1 uppercase tracking-tighter">Key: {acc.password}</p>
                          </div>
                          <span className={cn(
                            "text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest shadow-lg dark:shadow-none bg-slate-100 dark:bg-slate-800 text-slate-500"
                          )}>
                            {acc.role}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
