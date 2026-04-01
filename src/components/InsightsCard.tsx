"use client";

import React, { useState, useEffect } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Lightbulb, ArrowRight, Zap, Target, TrendingUp } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export const InsightsCard = () => {
  const { transactions, setActiveView, currentUser } = useFinance();
  const [insightType, setInsightType] = useState(0);

  useEffect(() => {
    // Rotate insight on login/mount
    setInsightType(Math.floor(Math.random() * 3));
  }, [currentUser]);

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

  const getInsightContent = () => {
    if (transactions.length === 0) {
      return {
        label: 'Awaiting Telemetry',
        text: 'Record transactions to generate personalized financial observations.',
        icon: Zap
      };
    }

    switch (insightType) {
      case 0:
        return {
          label: 'Spending Focus',
          text: highestCategory 
            ? `Your primary expenditure is ${highestCategory[0]} (${formatINR(Number(highestCategory[1]))}).` 
            : 'Expenditure telemetry is currently flat.',
          icon: Target
        };
      case 1:
        return {
          label: 'Retention Logic',
          text: `You are currently retaining ${Math.max(0, savingsRate).toFixed(0)}% of your total inflow this cycle.`,
          icon: TrendingUp
        };
      case 2:
      default:
        return {
          label: 'Budget Horizon',
          text: savingsAmount > 0 
            ? `Your net liquidity grew by ${formatINR(savingsAmount)} since the last cycle update.`
            : 'Your outflow currently matches or exceeds your inflow total.',
          icon: Lightbulb
        };
    }
  };

  const content = getInsightContent();

  return (
    <div 
      onClick={() => setActiveView('Insights')}
      className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 p-4 rounded-xl flex items-start gap-3 max-w-md cursor-pointer hover:shadow-lg transition-all group animate-in fade-in slide-in-from-right-4 duration-500"
    >
      <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm group-hover:scale-110 transition-transform">
        <content.icon className="w-5 h-5 text-indigo-600" />
      </div>
      <div className="flex-1">
        <h4 className="text-[10px] font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest mb-1">{content.label}</h4>
        <p className="text-sm text-indigo-800 dark:text-indigo-300 leading-snug font-medium">
          {content.text}
        </p>
      </div>
      <ArrowRight className="w-4 h-4 text-indigo-300 group-hover:text-indigo-600 self-center" />
    </div>
  );
};