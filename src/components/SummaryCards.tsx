"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Wallet, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const SummaryCards = () => {
  const { transactions, setActiveView } = useFinance();

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
      bg: 'bg-indigo-50/50',
    },
    { 
      title: 'Total Income', 
      amount: income, 
      icon: ArrowUpCircle, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50/50',
    },
    { 
      title: 'Total Expenses', 
      amount: expenses, 
      icon: ArrowDownCircle, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50/50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {summaryData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          onClick={() => setActiveView('Transactions')}
          className="cursor-pointer"
        >
          <Card className="hover:shadow-md transition-shadow overflow-hidden border-slate-100 dark:border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${item.bg}`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.title}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
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
