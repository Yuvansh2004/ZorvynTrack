"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, Wallet, ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export const InsightsView = () => {
  const { transactions } = useFinance();

  const expenses = transactions.filter(t => t.type === 'Expense');
  const expenseCategories = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(expenseCategories)
    .sort((a, b) => b[1] - a[1])[0] || ['N/A', 0];

  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tighter">Spending Patterns</h1>
        <p className="text-slate-500 text-sm mt-1">Deep analysis of your financial telemetry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-indigo-600 text-white">
          <CardHeader>
            <PieChart className="w-5 h-5 opacity-80 mb-2" />
            <CardTitle className="text-xs font-black uppercase tracking-widest opacity-80">Top Expenditure</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-black">{highestCategory[0]}</h3>
            <p className="text-indigo-200 text-xs mt-1 font-medium">{formatINR(Number(highestCategory[1]))} total this month</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-emerald-600 text-white">
          <CardHeader>
            <TrendingUp className="w-5 h-5 opacity-80 mb-2" />
            <CardTitle className="text-xs font-black uppercase tracking-widest opacity-80">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-black">{Math.max(0, savingsRate).toFixed(1)}%</h3>
            <p className="text-emerald-200 text-xs mt-1 font-medium">Accumulation of assets</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-slate-900 text-white">
          <CardHeader>
            <Wallet className="w-5 h-5 opacity-80 mb-2" />
            <CardTitle className="text-xs font-black uppercase tracking-widest opacity-80">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-black">Stable</h3>
            <p className="text-slate-400 text-xs mt-1 font-medium">Standard operating parameters</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Monthly Comparison Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-sm text-slate-600">
              Your spending in <span className="font-bold text-indigo-600">{highestCategory[0]}</span> is currently higher than previous nodes. 
              Recommendation: Reduce discretionary spending to increase quarterly savings.
            </p>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-sm text-slate-600">
              Savings rate has {savingsRate > 20 ? 'exceeded' : 'stabilized at'} internal benchmarks. Your internship stipend provides a solid baseline for asset building.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
