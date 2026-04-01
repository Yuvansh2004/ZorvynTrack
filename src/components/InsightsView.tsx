"use client";

import React from 'react';
import { useFinance, ASSIGNMENT_REF_ID } from '@/context/FinanceContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, PieChart, Star, BarChart3, Info } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion } from 'framer-motion';

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

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div>
          <h1 className="text-5xl weight-black text-slate-900 dark:text-white tracking-tighter italic uppercase">Financial<span className="text-indigo-600">Insights</span></h1>
          <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[6px] mt-4 opacity-60">Strategic Data Observations</p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Node Cluster: {ASSIGNMENT_REF_ID}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setActiveView('Transactions')}
          className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 dark:shadow-none cursor-pointer flex flex-col justify-between min-h-[200px]"
        >
          <div>
            <PieChart className="w-8 h-8 opacity-40 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Highest Spending</p>
          </div>
          <div>
            {highestCategory[0] !== 'None' ? (
              <>
                <h3 className="text-3xl font-black tracking-tighter uppercase italic">{highestCategory[0]}</h3>
                <p className="text-indigo-200 text-xs mt-2 font-bold">{formatINR(Number(highestCategory[1]))} total outflow</p>
              </>
            ) : <p className="text-xs font-bold opacity-40 uppercase">Awaiting Data</p>}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setActiveView('Transactions')}
          className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 dark:shadow-none cursor-pointer flex flex-col justify-between min-h-[200px]"
        >
          <div>
            <Star className="w-8 h-8 opacity-40 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Largest Expense</p>
          </div>
          <div>
            {highestSingleExpense.amount > 0 ? (
              <>
                <h3 className="text-3xl font-black tracking-tighter truncate uppercase italic" title={highestSingleExpense.description}>
                  {highestSingleExpense.description}
                </h3>
                <p className="text-indigo-200 text-xs mt-2 font-bold">{formatINR(highestSingleExpense.amount)} single charge</p>
              </>
            ) : <p className="text-xs font-bold opacity-40 uppercase">No Entries</p>}
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -5 }}
          onClick={() => setActiveView('Dashboard')}
          className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 dark:shadow-none cursor-pointer flex flex-col justify-between min-h-[200px]"
        >
          <div>
            <TrendingUp className="w-8 h-8 opacity-40 mb-6" />
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Savings Rate</p>
          </div>
          <div>
            <h3 className="text-5xl font-black tracking-tighter italic">{Math.max(0, savingsRate).toFixed(1)}%</h3>
            <p className={`text-[10px] mt-2 font-black uppercase tracking-widest ${savingsRate > 20 ? 'text-emerald-300' : 'text-rose-300'}`}>
              HEALTH: {savingsRate > 20 ? 'OPTIMAL' : 'BELOW PAR'}
            </p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Card className="card-shadow p-2">
          <CardHeader>
            <CardTitle className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <BarChart3 className="w-4 h-4 text-indigo-600" />
              </div>
              Telemetry Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[350px] pt-6">
            {totalExpenses > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} fontWeight={900} tick={{ fill: '#94a3b8' }} />
                  <YAxis axisLine={false} tickLine={false} fontSize={10} fontWeight={900} tick={{ fill: '#94a3b8' }} tickFormatter={(v) => `₹${v}`} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px' }}
                  />
                  <Bar dataKey="amount" radius={[12, 12, 0, 0]}>
                    {comparisonData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : <div className="h-full flex items-center justify-center italic text-slate-400 font-bold uppercase text-[10px] tracking-widest">Awaiting comparison telemetry</div>}
          </CardContent>
        </Card>

        <Card className="card-shadow p-2">
          <CardHeader>
            <CardTitle className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400">System Observations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-6">
            <div className="flex items-start gap-5 p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all hover:border-indigo-200">
              <div className="p-3.5 bg-white dark:bg-slate-950 rounded-2xl shadow-sm mt-1">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Concentration Analysis</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-relaxed">
                  {highestCategory[0] !== 'None' ? (
                    <>Your spending is heavily modulated towards <span className="text-indigo-600">{highestCategory[0]}</span>, accounting for {((Number(highestCategory[1]) / totalExpenses) * 100).toFixed(0)}% of total verified outflow.</>
                  ) : "Insufficient telemetry to perform concentration analysis."}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-5 p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all hover:border-emerald-200">
              <div className="p-3.5 bg-white dark:bg-slate-950 rounded-2xl shadow-sm mt-1">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Liquidity Horizon</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white mt-2 leading-relaxed">
                  {totalIncome > 0 ? (
                    <>Net liquidity growth of <span className="text-emerald-600">{formatINR(totalIncome - totalExpenses)}</span> detected. Your retention rate is considered {savingsRate > 20 ? 'Optimal' : 'Sub-optimal'}.</>
                  ) : "Awaiting income nodes to calculate liquidity retention."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};