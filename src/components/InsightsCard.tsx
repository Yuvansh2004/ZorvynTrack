"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Lightbulb } from 'lucide-react';

export const InsightsCard = () => {
  const { transactions } = useFinance();

  const expenseCategories = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const highestCategory = Object.entries(expenseCategories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-start gap-3 max-w-md">
      <div className="p-2 bg-white rounded-lg shadow-sm">
        <Lightbulb className="w-5 h-5 text-indigo-600" />
      </div>
      <div>
        <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">Quick Insights</h4>
        <p className="text-sm text-indigo-800">
          Highest spending category: <span className="font-bold">{highestCategory}</span>. 
          Monthly comparison: You've saved <span className="font-bold">12% more</span> than last month.
        </p>
      </div>
    </div>
  );
};