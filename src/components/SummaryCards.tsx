
"use client";

import React from 'react';
import { useFinance } from '@/context/FinanceContext';
import { formatINR } from '@/lib/utils';
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const SummaryCards = () => {
  const { transactions } = useFinance();

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'Expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = income - expenses;

  const cardData = [
    {
      title: 'Global Liquidity',
      amount: balance,
      icon: Activity,
      color: 'text-primary',
      bg: 'bg-primary/10',
      border: 'border-primary/20',
      trend: '+12.4%',
      isPositive: true,
    },
    {
      title: 'Net Inflow',
      amount: income,
      icon: TrendingUp,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'border-emerald-400/20',
      trend: '+8.2%',
      isPositive: true,
    },
    {
      title: 'System Cost',
      amount: expenses,
      icon: TrendingDown,
      color: 'text-rose-400',
      bg: 'bg-rose-400/10',
      border: 'border-rose-400/20',
      trend: '+4.1%',
      isPositive: false,
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {cardData.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
          className={`glass-card p-6 md:p-8 rounded-[2.5rem] border ${card.border} group min-h-[180px] flex flex-col justify-between relative overflow-hidden backdrop-blur-3xl`}
        >
          <div className="absolute top-0 right-0 p-12 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
          
          <div className="flex items-center justify-between mb-4 z-10">
            <div className={`p-4 ${card.bg} rounded-2xl group-hover:rotate-6 transition-all border border-white/5`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div className={`flex items-center gap-1.5 text-[9px] font-black px-3 py-1.5 rounded-full ${card.isPositive ? 'bg-emerald-400/10 text-emerald-400' : 'bg-rose-400/10 text-rose-400'} uppercase tracking-[2px] border border-white/5`}>
              {card.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {card.trend}
            </div>
          </div>
          
          <div className="z-10 min-w-0">
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[3px] mb-2">{card.title}</p>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tighter leading-none italic truncate overflow-hidden">
              {formatINR(card.amount)}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
