"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, Wallet, ArrowRight, BarChart3, Star } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const InsightsView = () => {
  const { transactions } = useFinance();

  const expenses = transactions.filter(t => t.type === 'Expense');
  
  // Highest Spending Category
  const expenseCategories = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(expenseCategories)
    .sort((a, b) => b[1] - a[1])[0] || ['None', 0];

  // Highest Single Expense
  const highestSingleExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0] || { description: 'None', amount: 0 };

  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Comparison Mock Data logic
  const comparisonData = [
    { name: 'Last Month', amount: totalExpenses * 0.9, color: '#94a3b8' },
    { name: 'This Month', amount: totalExpenses, color: '#6366f1' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Financial Insights</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Key observations based on your spending patterns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-shadow bg-indigo-600 text-white border-none">
          <CardHeader className="pb-2">
            <PieChart className="w-5 h-5 opacity-80 mb-1" />
            <CardTitle className="text-xs font-bold uppercase tracking-widest opacity-80">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold">{highestCategory[0]}</h3>
            <p className="text-indigo-200 text-xs mt-1">{formatINR(Number(highestCategory[1]))} total spent</p>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader className="pb-2">
            <Star className="w-5 h-5 text-amber-500 mb-1" />
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Largest Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white truncate" title={highestSingleExpense.description}>
              {highestSingleExpense.description}
            </h3>
            <p className="text-slate-500 text-xs mt-1">{formatINR(highestSingleExpense.amount)}</p>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader className="pb-2">
            <TrendingUp className="w-5 h-5 text-emerald-500 mb-1" />
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-slate-400">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{Math.max(0, savingsRate).toFixed(1)}%</h3>
            <p className="text-emerald-500 text-xs mt-1 font-semibold">Health: {savingsRate > 20 ? 'Optimal' : 'Needs attention'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Monthly Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(v) => `₹${v}`} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {comparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Smart Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm mt-1">
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Spending Alert</p>
                <p className="text-xs text-slate-500 mt-1">
                  Your primary expenditure is in <span className="font-bold text-indigo-600">{highestCategory[0]}</span>. 
                  This accounts for {((Number(highestCategory[1]) / totalExpenses) * 100).toFixed(1)}% of total monthly expenses.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm mt-1">
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Savings Outlook</p>
                <p className="text-xs text-slate-500 mt-1">
                  You have saved <span className="font-bold text-emerald-600">{formatINR(totalIncome - totalExpenses)}</span> this month. 
                  Maintain this trend to build your emergency fund.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};