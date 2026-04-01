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
import { CreditCard, IndianRupee, Tag, Calendar as CalendarIcon, FileText } from 'lucide-react';

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
      <SheetContent className="sm:max-w-[440px] bg-[#020617] border-slate-800 text-white shadow-2xl p-0 flex flex-col">
        <SheetHeader className="p-8 pb-4">
          <SheetTitle className="text-2xl font-bold flex items-center gap-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <IndianRupee className="w-5 h-5 text-primary" />
            </div>
            New Transaction
          </SheetTitle>
          <SheetDescription className="text-slate-400">
            Enter the details of your latest income or expense to keep your dashboard accurate.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-8 py-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-bold uppercase text-slate-500">Description</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                id="description" 
                placeholder="e.g. Swiggy Lunch" 
                className="bg-slate-900/50 border-slate-800 pl-10 focus:ring-primary"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-xs font-bold uppercase text-slate-500">Amount (₹)</Label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00" 
                  className="bg-slate-900/50 border-slate-800 pl-10 focus:ring-primary"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type" className="text-xs font-bold uppercase text-slate-500">Type</Label>
              <Select 
                value={formData.type} 
                onValueChange={(val: TransactionType) => setFormData(prev => ({ ...prev, type: val }))}
              >
                <SelectTrigger className="bg-slate-900/50 border-slate-800">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-white">
                  <SelectItem value="Income">Income</SelectItem>
                  <SelectItem value="Expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-xs font-bold uppercase text-slate-500">Category</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                id="category" 
                placeholder="e.g. Food, Bills, Salary" 
                className="bg-slate-900/50 border-slate-800 pl-10 focus:ring-primary"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-xs font-bold uppercase text-slate-500">Date</Label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input 
                id="date" 
                type="date" 
                className="bg-slate-900/50 border-slate-800 pl-10 focus:ring-primary"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>
        </form>

        <SheetFooter className="p-8 bg-slate-900/50 border-t border-slate-800">
          <Button type="button" variant="ghost" onClick={onClose} className="hover:bg-slate-800 flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 font-bold"
          >
            Save Record
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};