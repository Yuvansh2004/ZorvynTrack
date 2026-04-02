
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR, cn } from '@/lib/utils';
import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const SummaryCards = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  const summaryData = [
    { 
      title: 'Total Balance', 
      amount: balance, 
      icon: Wallet, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    },
    { 
      title: 'Total Income', 
      amount: income, 
      icon: ArrowUpCircle, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    },
    { 
      title: 'Total Expenses', 
      amount: expenses, 
      icon: ArrowDownCircle, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50 dark:bg-rose-950/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
      {summaryData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
        >
          <Card className="card-shadow overflow-hidden group hover:border-indigo-400 hover:scale-[1.01] transition-all h-full border-slate-100 dark:border-slate-800">
            <CardContent className="p-8 lg:p-12 flex flex-col justify-center h-full">
              <div className="flex items-center gap-6 lg:gap-10">
                <div className={`p-5 lg:p-6 rounded-[2rem] ${item.bg} group-hover:rotate-6 transition-transform shrink-0 shadow-sm`}>
                  <item.icon className={`w-8 h-8 lg:w-12 lg:h-12 ${item.color}`} />
                </div>
                <div className="min-w-0 flex-1 overflow-x-auto no-scrollbar">
                  <p className="text-[10px] lg:text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] whitespace-nowrap mb-1">
                    {item.title}
                  </p>
                  <h3 className={cn(
                    "font-black text-slate-900 dark:text-white tracking-tighter tabular-nums italic whitespace-nowrap transition-all duration-300",
                    "text-3xl md:text-4xl lg:text-5xl"
                  )} title={formatINR(item.amount)}>
                    {formatINR(item.amount)}
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
