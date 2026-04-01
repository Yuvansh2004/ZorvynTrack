
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { motion } from 'framer-motion';

const PIE_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'];

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

  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 rounded-2xl border border-slate-800/50 h-[400px]"
      >
        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-tight">Financial Velocity</h3>
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
              contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
              itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
            />
            <Line 
              type="step" 
              dataKey="balance" 
              stroke="#3b82f6" 
              strokeWidth={4} 
              dot={false}
              activeDot={{ r: 6, strokeWidth: 0 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 rounded-2xl border border-slate-800/50 h-[400px]"
      >
        <h3 className="text-lg font-bold mb-6 text-white uppercase tracking-tight">Category Breakdown</h3>
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="40%"
              innerRadius={60}
              outerRadius={75}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={50} 
              iconType="circle"
              wrapperStyle={{ fontSize: '10px', paddingTop: '10px', fontWeight: 'bold', color: '#64748b' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};
