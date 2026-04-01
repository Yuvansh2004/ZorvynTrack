"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export const InsightsCard = () => {
  const { transactions, setActiveView } = useFinance();

  const expenses = transactions.filter(t => t.type === 'Expense');
  const income = transactions.filter(t => t.type === 'Income');

  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const expenseCategories = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(expenseCategories).sort((a, b) => b[1] - a[1])[0];
  const savingsAmount = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? (savingsAmount / totalIncome) * 100 : 0;

  return (
    <div 
      onClick={() => setActiveView('Insights')}
      className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 p-4 rounded-xl flex items-start gap-3 max-w-md cursor-pointer hover:shadow-lg transition-all group"
    >
      <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
        <Lightbulb className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="flex-1">
        <h4 className="text-[10px] font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest mb-1">Autonomous Insight</h4>
        {highestCategory ? (
          <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-snug">
            Your top expenditure is <span className="font-bold text-indigo-950 dark:text-white">{highestCategory[0]}</span>. 
            You've retained <span className="font-bold text-emerald-600">{Math.max(0, savingsRate).toFixed(0)}%</span> of your total inflow this cycle.
          </p>
        ) : (
          <p className="text-sm text-indigo-800 dark:text-indigo-300 italic">
            Telemetry pending. Add expenses to generate node insights.
          </p>
        )}
      </div>
      <ArrowRight className="w-4 h-4 text-indigo-300 group-hover:text-indigo-600 self-center" />
    </div>
  );
};
