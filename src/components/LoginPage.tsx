"use client";

import React, { useState } from 'react';
import { useFinance, DEMO_ACCOUNTS } from '@/context/FinanceContext';
import { Shield, Mail, Lock, Eye, EyeOff, Info, Sun, Moon } from 'lucide-react';
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
          title: "Login Successful",
          description: "Welcome to ZorvynTrack.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid email or password.",
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
      "min-h-screen flex items-center justify-center p-6 relative font-body transition-colors duration-300",
      isDarkMode ? "bg-slate-950" : "bg-slate-50"
    )}>
      <div className="absolute top-6 right-6 z-20">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="rounded-full"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg mb-4">
            <ZorvynLogo className="w-8 h-8 text-white" />
          </div>
          <h1 className={cn(
            "text-3xl font-bold tracking-tight",
            isDarkMode ? "text-white" : "text-slate-900"
          )}>
            Zorvyn<span className="text-indigo-600">Track</span>
          </h1>
          <p className="text-slate-500 text-sm">Student Finance Dashboard</p>
        </div>

        <div className={cn(
          "p-8 rounded-2xl border shadow-sm",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        )}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-6 rounded-xl transition-all"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="link" className="w-full text-slate-400 text-xs font-medium">
                  <Info className="w-3.5 h-3.5 mr-2" /> View Demo Credentials
                </Button>
              </DialogTrigger>
              <DialogContent className={isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900"}>
                <DialogHeader>
                  <DialogTitle>Demo Accounts</DialogTitle>
                  <DialogDescription>Use these accounts to test different roles.</DialogDescription>
                </DialogHeader>
                <div className="space-y-3 mt-4">
                  {DEMO_ACCOUNTS.map((acc) => (
                    <div 
                      key={acc.email} 
                      className={cn(
                        "p-4 rounded-xl border cursor-pointer transition-colors",
                        isDarkMode ? "border-slate-800 hover:bg-slate-800" : "border-slate-100 hover:bg-slate-50"
                      )}
                      onClick={() => fillDemo(acc)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold">{acc.name}</p>
                          <p className="text-xs text-slate-500">{acc.email}</p>
                        </div>
                        <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-2 py-1 rounded uppercase tracking-wider">
                          {acc.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};