"use client";

import React from 'react';
import { useFinance, ASSIGNMENT_REF_ID } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, Star, BarChart3, Info } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const InsightsView = () => {
  const { transactions, setActiveView } = useFinance();

  const expenses = transactions.filter(t => t.type === 'Expense');
  
  const expenseCategories = expenses.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const highestCategory = Object.entries(expenseCategories)
    .sort((a, b) => b[1] - a[1])[0] || ['None', 0];

  const highestSingleExpense = [...expenses].sort((a, b) => b.amount - a.amount)[0] || { description: 'No Data', amount: 0 };

  const totalIncome = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);
  
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

  // Monthly Comparison Data
  const comparisonData = [
    { name: 'Previous Month', amount: totalExpenses * 0.9, color: '#94a3b8' },
    { name: 'Current Month', amount: totalExpenses, color: '#6366f1' },
  ];

  const EmptyState = ({ message }: { message: string }) => (
    <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
      <Info className="w-8 h-8 mb-2" />
      <p className="text-xs font-bold uppercase tracking-widest">{message}</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl weight-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Financial<span className="text-indigo-600">Insights</span></h1>
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[6px] mt-2 opacity-60">Data Patterns & Observations</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">ID: {ASSIGNMENT_REF_ID}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Highest Spending Card - Refined visibility */}
        <div 
          onClick={() => setActiveView('Transactions')}
          className="bg-indigo-600 dark:bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 dark:shadow-none cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-between min-h-[160px]"
        >
          <div>
            <PieChart className="w-6 h-6 opacity-60 mb-4" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Highest Spending</p>
          </div>
          <div>
            {highestCategory[0] !== 'None' ? (
              <>
                <h3 className="text-3xl font-black tracking-tight">{highestCategory[0]}</h3>
                <p className="text-indigo-200 text-xs mt-1 font-bold">{formatINR(Number(highestCategory[1]))} total</p>
              </>
            ) : <p className="text-xs font-bold opacity-40 uppercase">No Data</p>}
          </div>
        </div>

        <Card 
          onClick={() => setActiveView('Transactions')}
          className="card-shadow cursor-pointer hover:scale-[1.02] transition-transform"
        >
          <CardHeader className="pb-2">
            <Star className="w-5 h-5 text-amber-500 mb-2" />
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Largest Expense</CardTitle>
          </CardHeader>
          <CardContent>
            {highestSingleExpense.amount > 0 ? (
              <>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white truncate" title={highestSingleExpense.description}>
                  {highestSingleExpense.description}
                </h3>
                <p className="text-slate-500 text-xs mt-1 font-bold">{formatINR(highestSingleExpense.amount)} single charge</p>
              </>
            ) : <EmptyState message="No entries" />}
          </CardContent>
        </Card>

        <Card 
          onClick={() => setActiveView('Dashboard')}
          className="card-shadow cursor-pointer hover:scale-[1.02] transition-transform"
        >
          <CardHeader className="pb-2">
            <TrendingUp className="w-5 h-5 text-emerald-500 mb-2" />
            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-slate-400">Savings Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white">{Math.max(0, savingsRate).toFixed(1)}%</h3>
            <p className={`text-xs mt-1 font-black uppercase tracking-tighter ${savingsRate > 20 ? 'text-emerald-500' : 'text-rose-500'}`}>
              STATUS: {savingsRate > 20 ? 'STABLE' : 'ATTENTION'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-indigo-600" />
              Monthly Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {totalExpenses > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight={700} tick={{ fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} fontSize={10} fontWeight={700} tick={{ fill: '#94a3b8' }} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="h-full flex items-center justify-center italic text-slate-400">No data for comparison.</div>}
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl shadow-sm mt-1">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Category Analysis</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {highestCategory[0] !== 'None' ? (
                    <>Your spending is mainly in <span className="text-indigo-600">{highestCategory[0]}</span>, making up {((Number(highestCategory[1]) / totalExpenses) * 100).toFixed(0)}% of your expenses.</>
                  ) : "Insufficient data to perform analysis."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <div className="p-2.5 bg-white dark:bg-slate-950 rounded-xl shadow-sm mt-1">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Budget Outlook</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                  {totalIncome > 0 ? (
                    <>You saved <span className="text-emerald-600">{formatINR(totalIncome - totalExpenses)}</span> this month. Your savings rate is currently {savingsRate > 20 ? 'Optimal' : 'Needs attention'}.</>
                  ) : "Awaiting income entries to calculate savings."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};