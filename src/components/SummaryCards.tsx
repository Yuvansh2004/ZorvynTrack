"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Wallet, ArrowUpCircle, ArrowDownCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const SummaryCards = () => {
  const { transactions, setActiveView } = useFinance();

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  const summaryData = [
    { 
      title: 'Net Liquidity', 
      amount: balance, 
      icon: Wallet, 
      color: 'text-indigo-600', 
      bg: 'bg-indigo-50/50',
      label: 'Portfolio Value'
    },
    { 
      title: 'Inflow Total', 
      amount: income, 
      icon: ArrowUpCircle, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50/50',
      label: 'Gross Inflow'
    },
    { 
      title: 'Outflow Total', 
      amount: expenses, 
      icon: ArrowDownCircle, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50/50',
      label: 'Gross Outflow'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {summaryData.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.15, duration: 0.8, ease: "circOut" }}
          onClick={() => setActiveView('Transactions')}
          className="cursor-pointer group"
        >
          <Card className="card-shadow hover:shadow-2xl hover:-translate-y-3 relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-1.5 h-full ${item.color.replace('text-', 'bg-')}`}></div>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-[1.25rem] ${item.bg} transition-colors group-hover:bg-white border border-transparent group-hover:border-slate-100`}>
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100">
                  <TrendingUp className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-400 text-[10px] weight-black uppercase tracking-[0.2em]">Node V1</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-slate-400 text-[11px] weight-black uppercase tracking-[0.3em] opacity-60">{item.label}</p>
                <h3 className="text-3xl lg:text-4xl weight-black text-slate-900 dark:text-white tracking-[-0.04em] leading-none truncate" title={formatINR(item.amount)}>
                  {formatINR(item.amount)}
                </h3>
              </div>
              <div className="mt-8 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="text-[10px] weight-black text-indigo-600 uppercase tracking-widest">Audit Terminal</span>
                <div className="flex-1 h-[2px] bg-indigo-50"></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
