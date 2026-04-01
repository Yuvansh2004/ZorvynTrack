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
    const headers = [
      "ZORVYN FINANCE - TRANSACTION STATEMENT\n",
      `USER: ${currentUser?.name || 'N/A'}\n`,
      `DATE: ${new Date().toLocaleDateString()}\n\n`,
      "DATE,DESCRIPTION,CATEGORY,AMOUNT(INR),TYPE\n"
    ];
    
    const rows = filtered.map(t => 
      `${t.date},"${t.description.replace(/"/g, '""')}","${t.category}",${t.amount},${t.type}`
    ).join("\n");
    
    const blob = new Blob([...headers, rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Statement_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-950">
      <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Transaction Ledger</CardTitle>
          <div className="flex items-center gap-3">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
              {userRole === 'Admin' ? (
                <><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Admin Mode (Full Access)</>
              ) : (
                <><span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Viewer Mode (Read-Only)</>
              )}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search description, category..." 
                className="pl-9 w-full sm:w-[200px] bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative flex-1 sm:flex-none">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input 
                type="date"
                className="pl-9 w-full sm:w-[160px] bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-xl text-xs"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
              {dateFilter && (
                <button 
                  onClick={() => setDateFilter('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-indigo-500 hover:text-indigo-600"
                >
                  Clear
                </button>
              )}
            </div>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[110px] bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-xl">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Type</SelectItem>
                <SelectItem value="Income">Income</SelectItem>
                <SelectItem value="Expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            {userRole === 'Admin' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportCSV} 
                className="text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}

            {userRole === 'Admin' && (
              <Button 
                size="sm" 
                onClick={() => setIsModalOpen(true)} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg rounded-xl px-5"
              >
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50 dark:border-slate-900">
                <th className="pb-4">DATE</th>
                <th className="pb-4">DESCRIPTION</th>
                <th className="pb-4">CATEGORY</th>
                <th className="pb-4">AMOUNT</th>
                <th className="pb-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              <AnimatePresence mode="popLayout">
                {filtered.map((t) => (
                  <motion.tr 
                    key={t.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="text-sm group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-4 text-slate-500 font-mono text-[12px]">{t.date}</td>
                    <td className="py-4 font-bold text-slate-900 dark:text-slate-200">{t.description}</td>
                    <td className="py-4">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight">
                        {t.category}
                      </span>
                    </td>
                    <td className={`py-4 font-black ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {t.type === 'Income' ? '+' : '-'}{formatINR(t.amount)}
                    </td>
                    <td className="py-4 text-right">
                      {userRole === 'Admin' ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteTransaction(t.id)}
                          className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        <div className="flex items-center justify-end gap-2 text-slate-300 dark:text-slate-700">
                          <Lock className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Read-Only</span>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <FileSpreadsheet className="w-10 h-10 text-slate-200" />
                      <p className="text-slate-400 text-sm font-bold">No entries found matching criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Card>
  );
};
