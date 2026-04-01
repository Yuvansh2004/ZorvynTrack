"use client";

import React, { useState } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Search, Plus, Trash2, Download, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AddTransactionModal } from './AddTransactionModal';
import { motion, AnimatePresence } from 'framer-motion';

export const TransactionList = () => {
  const { transactions, userRole, deleteTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = transactions.filter(t => 
    t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["Date,Description,Category,Amount,Type\n"];
    const rows = filtered.map(t => `${t.date},${t.description},${t.category},${t.amount},${t.type}`).join("\n");
    const blob = new Blob([...headers, rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ZorvynTrack_Export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-7">
        <CardTitle className="text-lg font-bold">Recent Ledger Activity</CardTitle>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by description..." 
              className="pl-9 w-full sm:w-[250px] bg-slate-50 border-slate-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" onClick={exportCSV} className="text-slate-600">
            <Download className="w-4 h-4 mr-2" />
            CSV
          </Button>
          {userRole === 'Admin' && (
            <Button size="sm" onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add Data
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                <th className="pb-4 font-black">Temporal Node (Date)</th>
                <th className="pb-4 font-black">Entity (Description)</th>
                <th className="pb-4 font-black">Classification</th>
                <th className="pb-4 font-black">Quantum (Amount)</th>
                <th className="pb-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {filtered.map((t) => (
                  <motion.tr 
                    key={t.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="py-4 text-slate-500 font-medium">{t.date}</td>
                    <td className="py-4 font-bold text-slate-900">{t.description}</td>
                    <td className="py-4">
                      <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight">
                        {t.category}
                      </span>
                    </td>
                    <td className={`py-4 font-black ${t.type === 'Income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                      {t.type === 'Income' ? '+' : '-'}{formatINR(t.amount)}
                    </td>
                    <td className="py-4 text-right">
                      {userRole === 'Admin' ? (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteTransaction(t.id)}
                          className="text-slate-300 hover:text-rose-500 hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        <div className="flex justify-end pr-2">
                          <AlertCircle className="w-4 h-4 text-slate-200" />
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center">
                        <Search className="w-6 h-6 text-slate-200" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">No transactions found</p>
                        <p className="text-xs text-slate-500">Audit criteria returned zero nodes.</p>
                      </div>
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
