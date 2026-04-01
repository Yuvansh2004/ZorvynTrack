
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 md:p-10 rounded-[2.5rem] border border-slate-800/50 h-[450px] relative overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-primary/20"></div>
        <h3 className="text-[10px] font-black mb-10 text-white uppercase tracking-[3px] italic opacity-80">Velocity Telemetry (7D)</h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ left: -20, right: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="name" 
                stroke="#475569" 
                fontSize={9} 
                fontWeight="black"
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#475569" 
                fontSize={9} 
                fontWeight="black"
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `₹${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.8)' }}
                itemStyle={{ color: '#3b82f6', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '9px', letterSpacing: '1px' }}
                cursor={{ stroke: '#1e293b', strokeWidth: 1 }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                stroke="#3b82f6" 
                strokeWidth={5} 
                dot={{ r: 5, fill: '#3b82f6', strokeWidth: 0 }}
                activeDot={{ r: 8, strokeWidth: 0, shadow: '0 0 25px rgba(59,130,246,0.8)' }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 md:p-10 rounded-[2.5rem] border border-slate-800/50 h-[450px] relative overflow-hidden flex flex-col"
      >
        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/20"></div>
        <h3 className="text-[10px] font-black mb-10 text-white uppercase tracking-[3px] italic opacity-80">Sector Distribution</h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={6}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '16px' }}
                itemStyle={{ color: '#fff', fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase' }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={50} 
                iconType="circle"
                wrapperStyle={{ fontSize: '9px', fontWeight: 'black', color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', paddingTop: '20px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};
