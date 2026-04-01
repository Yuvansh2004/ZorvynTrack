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

  const data = [
    { title: 'Total Balance', amount: balance, icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
    { title: 'Total Income', amount: income, icon: ArrowUpCircle, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { title: 'Total Expenses', amount: expenses, icon: ArrowDownCircle, color: 'text-rose-600', bg: 'bg-rose-50/50' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setActiveView('Transactions')}
          className="cursor-pointer group"
        >
          <Card className="border-none shadow-sm hover:shadow-md transition-all group-hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${item.bg}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="text-slate-400 text-[10px] font-black uppercase tracking-[2px]">Audit Ledger</span>
              </div>
              <span className="text-slate-500 text-xs font-semibold">{item.title}</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {formatINR(item.amount)}
              </h3>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
