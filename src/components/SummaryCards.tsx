
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR, cn } from '@/lib/utils';
import { Wallet, ArrowUpCircle, ArrowDownCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const SummaryCards = () => {
  const { transactions, setActiveView, isSidebarOpen } = useFinance();

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
    <div className="w-full pb-8 overflow-x-auto no-scrollbar">
      <div className="flex gap-10 min-w-max pb-4 px-1">
        {summaryData.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="flex-1"
          >
            <Card 
              onClick={() => setActiveView('Transactions')}
              className="card-shadow min-w-[400px] overflow-hidden group hover:border-indigo-400 hover:shadow-2xl hover:-translate-y-1 cursor-pointer transition-all border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-[2.5rem]"
            >
              <CardContent className="p-10 lg:p-14 flex items-center gap-10 h-full relative">
                <div className={cn(
                  "rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-slate-50 dark:shadow-none transition-all duration-500 p-6",
                  item.bg
                )}>
                  <item.icon className={cn(
                    "w-8 h-8 transition-all duration-500",
                    item.color
                  )} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em] mb-2">
                    {item.title}
                  </p>
                  <h3 className={cn(
                    "font-black text-slate-900 dark:text-white tracking-tighter tabular-nums italic transition-all duration-500 whitespace-nowrap",
                    isSidebarOpen 
                      ? "text-3xl lg:text-4xl" 
                      : "text-4xl lg:text-5xl"
                  )}>
                    {formatINR(item.amount)}
                  </h3>
                </div>

                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all">
                  <ArrowRight className="w-6 h-6 text-indigo-300" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
