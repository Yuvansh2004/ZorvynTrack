"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

export const AnalyticsCharts = () => {
  const { transactions, setActiveView } = useFinance();

  const areaData = [...transactions]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-10)
    .map(t => ({
      name: new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      amount: t.type === 'Income' ? t.amount : -t.amount,
      displayAmount: t.amount
    }));

  const categoryMap = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc: Record<string, number>, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const pieData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card 
          className="card-shadow overflow-hidden cursor-pointer hover:border-indigo-200 transition-colors group"
          onClick={() => setActiveView('Transactions')}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-[11px] weight-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-indigo-600 transition-colors">Transaction Velocity (Trend)</CardTitle>
            </div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">View Ledger →</span>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="h-[350px] w-full">
              {areaData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={areaData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#94a3b8', fontWeight: 700 }}
                    />
                    <YAxis 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false} 
                      tick={{ fill: '#94a3b8', fontWeight: 700 }}
                      tickFormatter={(value) => `₹${Math.abs(value)}`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '12px' }}
                      formatter={(value: number) => [`₹${Math.abs(value)}`, 'Value']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#6366f1" 
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                      strokeWidth={4}
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
                  Insufficient telemetry for trend analysis
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card 
        className="card-shadow overflow-hidden h-fit cursor-pointer hover:border-indigo-200 transition-colors group"
        onClick={() => setActiveView('Transactions')}
      >
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-[11px] weight-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-indigo-600 transition-colors">Expenditure Classification</CardTitle>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1500}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹${value}`, 'Total']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={60} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
              No expenditure classified
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};