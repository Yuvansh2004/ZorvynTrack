
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR, cn } from '@/lib/utils';
import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const SummaryCards = () => {
  const { transactions, isSidebarOpen } = useFinance();

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8">
      {summaryData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.5 }}
        >
          <Card className="card-shadow overflow-hidden group hover:border-indigo-400 hover:scale-[1.01] transition-all h-full">
            <CardContent className="p-6 lg:p-10 flex flex-col justify-center h-full">
              <div className="flex items-center gap-4 lg:gap-8">
                <div className={`p-4 lg:p-5 rounded-[1.5rem] lg:rounded-[2rem] ${item.bg} group-hover:rotate-6 transition-transform shrink-0`}>
                  <item.icon className={`w-6 h-6 lg:w-10 lg:h-10 ${item.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] lg:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] truncate">{item.title}</p>
                  <h3 className={cn(
                    "font-black text-slate-900 dark:text-white mt-2 lg:mt-3 tracking-tighter tabular-nums italic truncate transition-all duration-300",
                    isSidebarOpen 
                      ? "text-lg md:text-xl lg:text-3xl" 
                      : "text-xl md:text-2xl lg:text-4xl"
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
