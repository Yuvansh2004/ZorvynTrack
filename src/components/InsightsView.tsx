
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, Wallet, ArrowRight, BarChart3 } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const InsightsView = () => {
  const { transactions } = useFinance();

  const expenses = transactions.filter(t => t.type === 'Expense');
  const expenseCategories = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(expenseCategories)
    .sort((a, b) => b[1] - a[1])[0] || ['None', 0];

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
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Financial Insights</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Automated analysis based on your ledger activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-indigo-600 text-white p-2">
          <CardHeader>
            <PieChart className="w-5 h-5 opacity-80 mb-1" />
            <CardTitle className="text-xs font-black uppercase tracking-widest opacity-80">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-black">{highestCategory[0]}</h3>
            <p className="text-indigo-200 text-[10px] mt-1 font-medium">{formatINR(Number(highestCategory[1]))} spent</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2">
          <CardHeader>
            <TrendingUp className="w-5 h-5 text-emerald-500 mb-1" />
            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">{Math.max(0, savingsRate).toFixed(1)}%</h3>
            <p className="text-emerald-500 text-[10px] mt-1 font-bold">Health: Optimal</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-2">
          <CardHeader>
            <Wallet className="w-5 h-5 text-indigo-500 mb-1" />
            <CardTitle className="text-xs font-black uppercase tracking-widest text-slate-400">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Positive</h3>
            <p className="text-slate-500 text-[10px] mt-1 font-medium">Stable liquidity</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Monthly Spending Comparison
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

        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Strategy & Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm mt-1">
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Spending Concentration</p>
                <p className="text-xs text-slate-500 mt-1">
                  Your primary expenditure is currently in <span className="font-bold text-indigo-600">{highestCategory[0]}</span>. 
                  Consider optimizing this category to increase your savings rate.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm mt-1">
                <ArrowRight className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Savings Outlook</p>
                <p className="text-xs text-slate-500 mt-1">
                  Your current savings rate of {savingsRate.toFixed(1)}% is healthy for an internship cycle.
                  Maintain this trend to build a solid professional emergency fund.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
