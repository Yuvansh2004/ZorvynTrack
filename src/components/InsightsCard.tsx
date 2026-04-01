
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const InsightsCard = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const categoryExpenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const highestCategory = Object.entries(categoryExpenses).length > 0
    ? Object.entries(categoryExpenses).sort((a, b) => b[1] - a[1])[0][0]
    : 'None';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 rounded-2xl border border-slate-800/50"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-400/10 rounded-lg">
          <Lightbulb className="w-5 h-5 text-amber-400" />
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">Intelligence</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-1.5 p-4 bg-slate-900/40 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">Top Expenditure</span>
          </div>
          <p className="text-xl font-bold text-white truncate">{highestCategory}</p>
          <p className="text-[10px] text-slate-500 font-medium italic">Primary cost driver this month.</p>
        </div>

        <div className="space-y-1.5 p-4 bg-slate-900/40 rounded-xl border border-white/5">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-70">Savings Efficiency</span>
          </div>
          <p className="text-xl font-bold text-white">{savingsRate.toFixed(1)}%</p>
          <p className="text-[10px] text-slate-500 font-medium italic leading-tight">
            {savingsRate > 20 ? 'Optimal savings performance.' : 'Review discretionary spending.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
