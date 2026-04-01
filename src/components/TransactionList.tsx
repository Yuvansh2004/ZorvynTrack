"use client";

import React, { useState } from 'react';
import { useFinance, Transaction } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Search, Plus, Trash2, Download, FileSpreadsheet, Calendar as CalendarIcon, X, Pencil } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AddTransactionModal } from './AddTransactionModal';
import { EditTransactionModal } from './EditTransactionModal';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

export const TransactionList = () => {
  const { transactions, userRole, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const filtered = transactions.filter(t => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      t.category.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term) ||
      t.amount.toString().includes(term) ||
      t.date.includes(term) ||
      t.ownerEmail.toLowerCase().includes(term);
    
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    const matchesDate = !dateFilter || t.date === dateFilter;
    
    return matchesSearch && matchesType && matchesDate;
  });

  const exportCSV = () => {
    const headers = ["DATE,DESCRIPTION,CATEGORY,AMOUNT,TYPE,OWNER_NODE\n"];
    const rows = filtered.map(t => 
      `${t.date},"${t.description}",${t.category},${t.amount},${t.type},${t.ownerEmail}`
    ).join("\n");
    const blob = new Blob([...headers, rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zorvyn_ledger_export.csv`;
    a.click();
  };

  return (
    <Card className="border-slate-100 dark:border-slate-800 shadow-sm">
      <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Transaction Ledger</CardTitle>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">
            {userRole === 'Admin' ? 'Management Mode (Full Access)' : 'Audit Mode (Read Only)'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 min-w-[200px] sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search amount, category, user..." 
              className="pl-9 h-9 w-full sm:w-[240px] text-xs font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative flex items-center">
            <CalendarIcon className="absolute left-3 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input 
              type="date"
              className="h-9 pl-9 pr-8 w-[190px] text-[11px] font-bold"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            {dateFilter && (
              <button 
                onClick={() => setDateFilter('')}
                className="absolute right-2 text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[120px] h-9 text-xs font-medium">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          {userRole === 'Admin' && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportCSV} className="h-9 text-xs font-bold uppercase tracking-tight">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" onClick={() => setIsModalOpen(true)} className="h-9 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold uppercase tracking-tight">
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
              <tr className="text-slate-400 border-b border-slate-50 dark:border-slate-900">
                <th className="pb-4 font-black uppercase text-[10px] tracking-widest">Date</th>
                <th className="pb-4 font-black uppercase text-[10px] tracking-widest">Description</th>
                <th className="pb-4 font-black uppercase text-[10px] tracking-widest">Category</th>
                <th className="pb-4 font-black uppercase text-[10px] tracking-widest">Amount</th>
                {userRole === 'Admin' && (
                  <th className="pb-4 font-black uppercase text-[10px] tracking-widest">Owner</th>
                )}
                {userRole === 'Admin' && <th className="pb-4 text-right font-black uppercase text-[10px] tracking-widest">Action</th>}
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
                    <td className="py-4 text-slate-500 font-medium tabular-nums">{t.date}</td>
                    <td className="py-4 font-bold text-slate-800 dark:text-slate-200">{t.description}</td>
                    <td className="py-4">
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest">
                        {t.category}
                      </span>
                    </td>
                    <td className={`py-4 font-black tabular-nums ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {t.type === 'Income' ? '+' : '-'}{formatINR(t.amount)}
                    </td>
                    {userRole === 'Admin' && (
                      <td className="py-4">
                        <span className="text-[10px] text-indigo-500 font-bold italic truncate block max-w-[120px]" title={t.ownerEmail}>
                          {t.ownerEmail.split('@')[0]}
                        </span>
                      </td>
                    )}
                    {userRole === 'Admin' && (
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setEditingTransaction(t)}
                            className="text-slate-300 hover:text-indigo-600 hover:bg-transparent transition-colors"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => deleteTransaction(t.id)}
                            className="text-slate-300 hover:text-rose-500 hover:bg-transparent transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-3 opacity-40">
              <FileSpreadsheet className="w-10 h-10" />
              <p className="text-xs font-black uppercase tracking-widest">No matching records found</p>
            </div>
          )}
        </div>
      </CardContent>
      {userRole === 'Admin' && (
        <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {userRole === 'Admin' && editingTransaction && (
        <EditTransactionModal 
          isOpen={!!editingTransaction} 
          onClose={() => setEditingTransaction(null)} 
          transaction={editingTransaction}
        />
      )}
    </Card>
  );
};
