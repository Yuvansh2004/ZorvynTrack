
"use client";

import React, { useMemo } from 'react';
import { useFinance } from '@/context/FinanceContext';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LabelList
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = [
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Rose
  '#8b5cf6', // Violet
  '#06b6d4', // Cyan
  '#ec4899', // Pink
  '#3b82f6', // Blue
  '#f97316', // Orange
  '#84cc16', // Lime
];

export const AnalyticsCharts = () => {
  const { transactions, setActiveView } = useFinance();

  // Memoize chart data to ensure absolute accuracy and prevent jitter
  const areaData = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-15) // Show a wider window of recent velocity
      .map(t => ({
        name: new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        amount: t.type === 'Income' ? t.amount : -t.amount,
        absAmount: t.amount
      }));
  }, [transactions]);

  const pieData = useMemo(() => {
    const categoryMap = transactions
      .filter(t => t.type === 'Expense')
      .reduce((acc: Record<string, number>, curr) => {
        const cat = curr.category || 'Uncategorized';
        acc[cat] = (acc[cat] || 0) + curr.amount;
        return acc;
      }, {});

    return Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.15;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="#94a3b8" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-[9px] font-black uppercase tracking-tighter"
      >
        {`${name}: ₹${value}`}
      </text>
    );
  };

  return (
    <>
      <div className="lg:col-span-2 space-y-6">
        <Card 
          className="card-shadow overflow-hidden cursor-pointer hover:border-indigo-200 transition-all group"
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
                      dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                      animationDuration={1500}
                    >
                      <LabelList 
                        dataKey="absAmount" 
                        position="top" 
                        offset={10}
                        fontSize={9} 
                        fontWeight={800} 
                        fill="#6366f1" 
                        formatter={(val: number) => `₹${val}`}
                      />
                    </Area>
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
        className="card-shadow overflow-hidden cursor-pointer hover:border-indigo-200 transition-all group"
        onClick={() => setActiveView('Transactions')}
      >
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-[11px] weight-black uppercase tracking-[0.25em] text-slate-400 group-hover:text-indigo-600 transition-colors">Expenditure Classification</CardTitle>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">View Details →</span>
        </CardHeader>
        <CardContent className="h-[350px] pt-4 w-full flex items-center justify-center">
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius="55%"
                  outerRadius="75%"
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                  label={renderCustomizedLabel}
                  labelLine={false}
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
                  wrapperStyle={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', paddingTop: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-sm italic text-center px-4">
              No expenditure telemetry detected for classification.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
