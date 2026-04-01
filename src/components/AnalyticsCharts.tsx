
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { motion } from 'framer-motion';

const PIE_COLORS = [
  '#3b82f6', // Primary Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ef4444', // Rose
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4'  // Cyan
];

export const AnalyticsCharts = () => {
  const { transactions } = useFinance();

  // Prepare line chart data (last 7 days trend)
  const lineData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    
    const dayBalance = transactions
      .filter(t => t.date <= dateStr)
      .reduce((acc, curr) => acc + (curr.type === 'Income' ? curr.amount : -curr.amount), 0);
      
    return {
      name: date.toLocaleDateString('en-IN', { weekday: 'short' }),
      balance: dayBalance
    };
  });

  // Prepare pie chart data (expense category breakdown)
  const expenseTransactions = transactions.filter(t => t.type === 'Expense');
  const categoryMap = expenseTransactions.reduce((acc: Record<string, number>, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 rounded-3xl border border-slate-800/50 h-[450px] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-primary/20"></div>
        <h3 className="text-sm font-black mb-8 text-white uppercase tracking-[2px] italic">Financial Velocity (7D)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="#475569" 
              fontSize={10} 
              fontWeight="bold"
              tickLine={false} 
              axisLine={false} 
              dy={10}
            />
            <YAxis 
              stroke="#475569" 
              fontSize={10} 
              fontWeight="bold"
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `₹${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
              itemStyle={{ color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px' }}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#3b82f6" 
              strokeWidth={4} 
              dot={{ r: 4, fill: '#3b82f6', strokeWidth: 0 }}
              activeDot={{ r: 8, strokeWidth: 0, shadow: '0 0 20px rgba(59,130,246,0.5)' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-8 rounded-3xl border border-slate-800/50 h-[450px] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500/20"></div>
        <h3 className="text-sm font-black mb-8 text-white uppercase tracking-[2px] italic">Sector Allocation</h3>
        <ResponsiveContainer width="100%" height="80%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="45%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }}
              itemStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
