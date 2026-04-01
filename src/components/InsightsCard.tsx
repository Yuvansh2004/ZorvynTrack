
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
      className="glass-card p-6 rounded-2xl border border-slate-800/50 mt-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-amber-400/10 rounded-lg">
          <Lightbulb className="w-6 h-6 text-amber-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Financial Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 p-4 bg-slate-800/20 rounded-xl border border-slate-800/50">
          <div className="flex items-center gap-2 text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Top Spending</span>
          </div>
          <p className="text-2xl font-bold text-white">{highestCategory}</p>
          <p className="text-sm text-muted-foreground italic">You spend the most on this category.</p>
        </div>

        <div className="space-y-2 p-4 bg-slate-800/20 rounded-xl border border-slate-800/50">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold uppercase tracking-wider">Savings Rate</span>
          </div>
          <p className="text-2xl font-bold text-white">{savingsRate.toFixed(1)}%</p>
          <p className="text-sm text-muted-foreground italic">
            {savingsRate > 20 ? 'Great job! You are saving a healthy amount.' : 'Try to cut expenses to increase savings.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
