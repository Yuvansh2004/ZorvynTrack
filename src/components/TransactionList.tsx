
"use client";

import React, { useState, useEffect } from 'react';
import { useFinance, Transaction } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Search, Plus, Trash2, Download, FileSpreadsheet, Calendar as CalendarIcon, X, Pencil, ArrowRight, ListFilter, Clock } from 'lucide-react';
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
  const { transactions, userRole, deleteTransaction, currentUser } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [rowsLimit, setRowsLimit] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered = transactions.filter(t => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      t.category.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term) ||
      t.amount.toString().includes(term) ||
      t.date.includes(term) ||
      t.ownerEmail.toLowerCase().includes(term);
    
    const matchesType = typeFilter === 'All' || t.type === typeFilter;
    
    const itemTime = new Date(t.date).getTime();
    const startTime = startDate ? new Date(startDate).getTime() : -Infinity;
    const endTime = endDate ? new Date(endDate).getTime() : Infinity;
    const matchesDateRange = itemTime >= startTime && itemTime <= endTime;
    
    return matchesSearch && matchesType && matchesDateRange;
  });

  const displayData = rowsLimit === 'All' ? filtered : filtered.slice(0, parseInt(rowsLimit));

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

  const canEdit = (t: Transaction) => {
    if (userRole === 'Admin') return true;
    const isOwner = currentUser && t.ownerEmail === currentUser.email;
    const isWithinWindow = (now - t.createdAt) < 30000;
    return !!(isOwner && isWithinWindow);
  };

  const hasAnyActions = displayData.some(t => canEdit(t)) || userRole === 'Admin';

  return (
    <Card className="border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
      <CardHeader className="space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">Transaction Ledger</CardTitle>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold flex items-center gap-2">
              {userRole === 'Admin' ? 'Management Mode (Full Access)' : 'Audit Mode (Grace Edit Enabled)'}
              {userRole !== 'Admin' && <Clock className="w-3 h-3 text-amber-500" />}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {userRole === 'Admin' && (
              <Button variant="outline" size="sm" onClick={exportCSV} className="h-9 text-xs font-bold uppercase tracking-tight rounded-xl">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            )}
            <Button size="sm" onClick={() => setIsModalOpen(true)} className="h-9 bg-indigo-600 hover:bg-indigo-700 text-xs font-bold uppercase tracking-tight rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
          <div className="relative col-span-1 md:col-span-2 xl:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search records..." 
              className="pl-9 h-10 w-full text-xs font-bold rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 col-span-1 md:col-span-2 xl:col-span-2">
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input 
                type="date"
                className="h-10 pl-9 pr-3 w-full text-[11px] font-bold rounded-xl"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Start Date"
              />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300 shrink-0" />
            <div className="relative flex-1">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <Input 
                type="date"
                className="h-10 pl-9 pr-3 w-full text-[11px] font-bold rounded-xl"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="End Date"
              />
            </div>
          </div>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="h-10 text-xs font-bold rounded-xl">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Income">Income</SelectItem>
              <SelectItem value="Expense">Expense</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Select value={rowsLimit} onValueChange={setRowsLimit}>
              <SelectTrigger className="h-10 text-xs font-bold rounded-xl">
                <div className="flex items-center gap-2">
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>Rows: {rowsLimit}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Rows</SelectItem>
                <SelectItem value="5">Top 5</SelectItem>
                <SelectItem value="10">Top 10</SelectItem>
                <SelectItem value="25">Top 25</SelectItem>
                <SelectItem value="50">Top 50</SelectItem>
              </SelectContent>
            </Select>
            {(startDate || endDate || searchTerm || typeFilter !== 'All') && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => {
                  setStartDate('');
                  setEndDate('');
                  setSearchTerm('');
                  setTypeFilter('All');
                }}
                className="h-10 w-10 text-slate-400 hover:text-rose-500 shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
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
                {hasAnyActions && <th className="pb-4 text-right font-black uppercase text-[10px] tracking-widest">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              <AnimatePresence mode="popLayout">
                {displayData.map((t) => {
                  const editable = canEdit(t);
                  return (
                    <motion.tr 
                      key={t.id} 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors"
                    >
                      <td className="py-4 text-slate-500 font-bold tabular-nums">{t.date}</td>
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
                      {hasAnyActions && (
                        <td className="py-4 text-right">
                          {editable ? (
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
                          ) : (
                            <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest italic pr-2">Permanent</span>
                          )}
                        </td>
                      )}
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          {displayData.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center gap-3 opacity-40">
              <FileSpreadsheet className="w-10 h-10" />
              <p className="text-xs font-black uppercase tracking-widest">No matching records found</p>
            </div>
          )}
        </div>
      </CardContent>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {editingTransaction && (
        <EditTransactionModal 
          isOpen={!!editingTransaction} 
          onClose={() => setEditingTransaction(null)} 
          transaction={editingTransaction}
        />
      )}
    </Card>
  );
};
