
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

export const AnalyticsCharts = () => {
  const { transactions } = useFinance();

  // Area chart data: Chronological trend of the last 10 transactions
  const areaData = [...transactions]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-10)
    .map(t => ({
      name: new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      amount: t.type === 'Income' ? t.amount : -t.amount,
      displayAmount: t.amount
    }));

  // Pie chart data: Category breakdown for Expenses
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
      <Card className="card-shadow overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Transaction Velocity (Last 10)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] pt-4">
          {areaData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94a3b8' }}
                />
                <YAxis 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tick={{ fill: '#94a3b8' }}
                  tickFormatter={(value) => `₹${Math.abs(value)}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹${Math.abs(value)}`, 'Value']}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#6366f1" 
                  fillOpacity={1} 
                  fill="url(#colorAmount)" 
                  strokeWidth={3}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm italic">
              Insufficient telemetry for trend analysis
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="card-shadow overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold uppercase tracking-wider text-slate-500">Expenditure Classification</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] pt-4">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  animationDuration={1000}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹${value}`, 'Total']}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '10px' }}
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
