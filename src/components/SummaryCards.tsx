
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full">
      {summaryData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
          className="w-full"
        >
          <Card className="card-shadow overflow-hidden group hover:border-indigo-400 hover:scale-[1.01] transition-all h-full border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[2.5rem]">
            <CardContent className="p-10 lg:p-14 flex flex-col justify-center h-full">
              <div className="flex items-center gap-8 lg:gap-10">
                <div className={`p-6 lg:p-8 rounded-[2.2rem] ${item.bg} group-hover:rotate-6 transition-transform shrink-0 shadow-lg shadow-slate-100 dark:shadow-none`}>
                  <item.icon className={`w-10 h-10 lg:w-14 lg:h-14 ${item.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] lg:text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] whitespace-nowrap mb-2">
                    {item.title}
                  </p>
                  <div className="overflow-x-auto no-scrollbar py-1">
                    <h3 className={cn(
                      "font-black text-slate-900 dark:text-white tracking-tighter tabular-nums italic whitespace-nowrap",
                      "text-4xl md:text-5xl lg:text-6xl"
                    )} title={formatINR(item.amount)}>
                      {formatINR(item.amount)}
                    </h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
