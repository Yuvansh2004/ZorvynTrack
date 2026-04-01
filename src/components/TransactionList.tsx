"use client";

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Search, Plus, Trash2, Download, Lock, FileSpreadsheet, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AddTransactionModal } from './AddTransactionModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

export const TransactionList = () => {
  const { transactions, userRole, deleteTransaction, currentUser } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = transactions.filter(t => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      t.category.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term) ||
      t.amount.toString().includes(term);
    
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    const matchesDate = !dateFilter || t.date === dateFilter;
    
    return matchesSearch && matchesType && matchesDate;
  });

  const exportCSV = () => {
    const headers = ["DATE,DESCRIPTION,CATEGORY,AMOUNT,TYPE\n"];
    const rows = filtered.map(t => 
      `${t.date},"${t.description}",${t.category},${t.amount},${t.type}`
    ).join("\n");
    const blob = new Blob([...headers, rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions.csv`;
    a.click();
  };

  return (
    <Card className="border-slate-100 dark:border-slate-800">
      <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
          <p className="text-xs text-slate-500 mt-1">Manage and track your financial activity</p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search..." 
              className="pl-9 h-9 w-full sm:w-[180px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[110px] h-9">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          {userRole === 'Admin' && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportCSV} className="h-9">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={() => setIsModalOpen(true)} className="h-9 bg-indigo-600 hover:bg-indigo-700">
                <Plus className="w-4 h-4 mr-2" />
                New Entry
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <th className="pb-4 font-semibold">Date</th>
                <th className="pb-4 font-semibold">Description</th>
                <th className="pb-4 font-semibold">Category</th>
                <th className="pb-4 font-semibold">Amount</th>
                {userRole === 'Admin' && <th className="pb-4 text-right font-semibold">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              <AnimatePresence mode="popLayout">
                {filtered.map((t) => (
                  <motion.tr 
                    key={t.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-4 text-slate-500">{t.date}</td>
                    <td className="py-4 font-medium">{t.description}</td>
                    <td className="py-4">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        {t.category}
                      </span>
                    </td>
                    <td className={`py-4 font-bold ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {t.type === 'Income' ? '+' : '-'}{formatINR(t.amount)}
                    </td>
                    {userRole === 'Admin' && (
                      <td className="py-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteTransaction(t.id)}
                          className="text-slate-300 hover:text-rose-500 hover:bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-3">
              <FileSpreadsheet className="w-10 h-10 text-slate-200" />
              <p className="text-slate-400 font-medium">No transactions found.</p>
            </div>
          )}
        </div>
      </CardContent>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};
