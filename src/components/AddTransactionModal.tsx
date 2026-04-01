
"use client";

import React, { useState } from 'react';
import { useFinance, TransactionType } from '@/context/FinanceContext';
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter 
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { CreditCard, IndianRupee, Tag, Calendar as CalendarIcon, FileText, Send } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTransactionModal = ({ isOpen, onClose }: Props) => {
  const { addTransaction } = useFinance();
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    type: 'Expense' as TransactionType,
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) return;

    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
      date: formData.date
    });

    setFormData({
      description: '',
      amount: '',
      category: '',
      type: 'Expense',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-[480px] bg-[#020617] border-slate-800 text-white shadow-2xl p-0 flex flex-col font-body">
        <SheetHeader className="p-10 pb-6 border-b border-slate-800/50">
          <SheetTitle className="text-3xl font-black italic tracking-tighter uppercase flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20">
              <IndianRupee className="w-6 h-6 text-primary" />
            </div>
            Terminal Entry
          </SheetTitle>
          <SheetDescription className="text-slate-500 font-bold text-[10px] uppercase tracking-[2px] mt-2">
            Append verified data node to the global ledger.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-10 py-8 space-y-8">
          <div className="space-y-3">
            <Label htmlFor="description" className="text-[10px] font-black uppercase text-slate-500 tracking-[2px]">Data Identifier (Description)</Label>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <Input 
                id="description" 
                placeholder="e.g. UPI to Ramesh" 
                className="bg-slate-900/50 border-slate-800 pl-12 h-14 text-sm font-bold rounded-xl focus:ring-primary focus:border-primary transition-all"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-[10px] font-black uppercase text-slate-500 tracking-[2px]">Quantum (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00" 
                  className="bg-slate-900/50 border-slate-800 pl-12 h-14 text-sm font-bold rounded-xl focus:ring-primary"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="type" className="text-[10px] font-black uppercase text-slate-500 tracking-[2px]">Vector Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(val: TransactionType) => setFormData(prev => ({ ...prev, type: val }))}
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-800 h-14 rounded-xl font-bold text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-950 border-slate-800 text-white">
                  <SelectItem value="Income" className="font-bold">Income (+)</SelectItem>
                  <SelectItem value="Expense" className="font-bold">Expense (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="category" className="text-[10px] font-black uppercase text-slate-500 tracking-[2px]">Sector Class</Label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <Input 
                id="category" 
                placeholder="e.g. Food, Tech, Salary" 
                className="bg-slate-900/50 border-slate-800 pl-12 h-14 text-sm font-bold rounded-xl focus:ring-primary"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="date" className="text-[10px] font-black uppercase text-slate-500 tracking-[2px]">Temporal Stamp</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <Input 
                id="date" 
                type="date" 
                className="bg-slate-900/50 border-slate-800 pl-12 h-14 text-sm font-bold rounded-xl focus:ring-primary"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>
        </form>

        <SheetFooter className="p-10 bg-slate-900/40 border-t border-slate-800/50 flex flex-row gap-4">
          <Button type="button" variant="ghost" onClick={onClose} className="h-14 font-black uppercase text-[10px] tracking-widest flex-1 border border-slate-800">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 h-14 font-black uppercase text-[10px] tracking-widest shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            Commit Node <Send className="w-3.5 h-3.5 ml-2" />
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
