
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Wallet, ArrowUpCircle, ArrowDownCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const SummaryCards = () => {
  const { transactions, setActiveView } = useFinance();

  // Real-time calculation from global state
  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  const summaryData = [
    { 
      title: 'Net Liquidity', 
      amount: balance, 
      icon: Wallet, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50/50',
      label: 'Current Balance'
    },
    { 
      title: 'Inflow Total', 
      amount: income, 
      icon: ArrowUpCircle, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50/50',
      label: 'Gross Income'
    },
    { 
      title: 'Outflow Total', 
      amount: expenses, 
      icon: ArrowDownCircle, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50/50',
      label: 'Total Expenses'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          onClick={() => setActiveView('Transactions')}
          className="cursor-pointer group"
        >
          <Card className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 bg-white overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-1 h-full ${item.color.replace('text-', 'bg-')}`}></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3 rounded-2xl ${item.bg} transition-colors group-hover:bg-white border border-transparent group-hover:border-slate-100`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100">
                  <TrendingUp className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Live Node</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter break-words">
                  {formatINR(item.amount)}
                </h3>
              </div>
              <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Audit Ledger</span>
                <div className="flex-1 h-px bg-indigo-100"></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
