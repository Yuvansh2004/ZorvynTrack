"use client";

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Search, Plus, Trash2, Download, Lock, FileSpreadsheet } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AddTransactionModal } from './AddTransactionModal';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionList = () => {
  const { transactions, userRole, deleteTransaction, currentUser } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = transactions.filter(t => 
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = [
      "ZORVYN FINANCE - OFFICIAL TRANSACTION STATEMENT\n",
      `ACCOUNT HOLDER: ${currentUser?.name || 'N/A'}\n`,
      `ACCOUNT EMAIL: ${currentUser?.email || 'N/A'}\n`,
      `STATEMENT PERIOD: ${new Date().toLocaleDateString()}\n`,
      `SECURITY PROTOCOL: AES-256-INTERNAL-AUDIT\n\n`,
      "TRANS_DATE,DESCRIPTION,CATEGORY,AMOUNT(INR),TX_TYPE\n"
    ];
    
    const rows = filtered.map(t => 
      `${t.date},"${t.description.replace(/"/g, '""')}","${t.category}",${t.amount},${t.type}`
    ).join("\n");
    
    const blob = new Blob([...headers, rows], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Zorvyn_Statement_${currentUser?.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="border-none shadow-sm bg-white dark:bg-slate-950">
      <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-7">
        <div className="space-y-1">
          <CardTitle className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Ledger Repository</CardTitle>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
            {userRole === 'Admin' ? (
              <><span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" /> Full Read/Write Authority</>
            ) : (
              <><span className="w-1.5 h-1.5 rounded-full bg-slate-300" /> Standard Account Node</>
            )}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search statements..." 
              className="pl-9 w-full sm:w-[250px] bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={exportCSV} 
            className="text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Statement
          </Button>

          <Button 
            size="sm" 
            onClick={() => setIsModalOpen(true)} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg rounded-xl px-5"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50 dark:border-slate-900">
                <th className="pb-4">TX_DATE</th>
                <th className="pb-4">TX_DESCRIPTION</th>
                <th className="pb-4">CLASSIFICATION</th>
                <th className="pb-4">QUANTUM_AMOUNT</th>
                <th className="pb-4 text-right">PROTOCOL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              <AnimatePresence>
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
                          <span className="text-[10px] font-bold uppercase tracking-tighter">Locked</span>
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
                      <p className="text-slate-400 text-sm font-bold">No statement entries detected.</p>
                      <p className="text-slate-300 text-[10px] uppercase tracking-widest">Adjust filters or add a new entry.</p>
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